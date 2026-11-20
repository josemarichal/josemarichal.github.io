"""50-state discovery of state legislative candidates/legislators on TikTok.

1. Downloads OpenStates `openstates/people` zip (all 50 states' sitting legislators)
   and imports any TikTok links directly listed there.
2. Runs targeted `site:tiktok.com` searches via DuckDuckGo HTML across all 50 states
   for state house / state senate / state assembly / challenger TikTok accounts,
   matching handles back to the 50-state roster and saving to SQLite + CSV.
"""

import argparse
import csv
import io
import pathlib
import re
import sqlite3
import time
import urllib.parse
import zipfile
import requests
import yaml
from bs4 import BeautifulSoup

from init_db import DB_PATH, DATA_DIR, init_database

OPENSTATES_ZIP_URL = "https://github.com/openstates/people/archive/refs/heads/main.zip"
OPENSTATES_ZIP_PATH = DATA_DIR / "openstates_people_main.zip"

US_STATES = {
    "AL": "Alabama", "AK": "Alaska", "AZ": "Arizona", "AR": "Arkansas", "CA": "California",
    "CO": "Colorado", "CT": "Connecticut", "DE": "Delaware", "FL": "Florida", "GA": "Georgia",
    "HI": "Hawaii", "ID": "Idaho", "IL": "Illinois", "IN": "Indiana", "IA": "Iowa",
    "KS": "Kansas", "KY": "Kentucky", "LA": "Louisiana", "ME": "Maine", "MD": "Maryland",
    "MA": "Massachusetts", "MI": "Michigan", "MN": "Minnesota", "MS": "Mississippi", "MO": "Missouri",
    "MT": "Montana", "NE": "Nebraska", "NV": "Nevada", "NH": "New Hampshire", "NJ": "New Jersey",
    "NM": "New Mexico", "NY": "New York", "NC": "North Carolina", "ND": "North Dakota", "OH": "Ohio",
    "OK": "Oklahoma", "OR": "Oregon", "PA": "Pennsylvania", "RI": "Rhode Island", "SC": "South Carolina",
    "SD": "South Dakota", "TN": "Tennessee", "TX": "Texas", "UT": "Utah", "VT": "Vermont",
    "VA": "Virginia", "WA": "Washington", "WV": "West Virginia", "WI": "Wisconsin", "WY": "Wyoming",
}

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
    )
}

TIKTOK_HANDLE_RE = re.compile(r"tiktok\.com/@([A-Za-z0-9_.]+)", re.I)
SKIP_HANDLES = {"share", "tag", "music", "discover", "explore", "live", "tiktok", "foryou"}


def ensure_openstates_zip() -> pathlib.Path:
    if OPENSTATES_ZIP_PATH.exists() and OPENSTATES_ZIP_PATH.stat().st_size > 1_000_000:
        return OPENSTATES_ZIP_PATH
    print(f"Downloading OpenStates 50-state legislator dataset from {OPENSTATES_ZIP_URL} ...")
    resp = requests.get(OPENSTATES_ZIP_URL, headers=HEADERS, timeout=60)
    resp.raise_for_status()
    OPENSTATES_ZIP_PATH.write_bytes(resp.content)
    print(f"Saved {OPENSTATES_ZIP_PATH.stat().st_size // 1024} KB to {OPENSTATES_ZIP_PATH}")
    return OPENSTATES_ZIP_PATH


def load_openstates_into_db(conn: sqlite3.Connection, zip_path: pathlib.Path) -> dict[str, list[dict]]:
    """Parse OpenStates YAML files into `candidates` and return state-indexed lookup."""
    by_state: dict[str, list[dict]] = {st: [] for st in US_STATES}
    inserted_cands = 0
    found_tiktok = 0

    with zipfile.ZipFile(zip_path, "r") as zf:
        for member in zf.namelist():
            # e.g. people-main/data/ca/legislature/Alan-Lowenthal-....yml
            parts = member.split("/")
            if len(parts) < 5 or parts[1] != "data" or parts[3] != "legislature" or not member.endswith(".yml"):
                continue
            st = parts[2].upper()
            if st not in US_STATES:
                continue

            raw = zf.read(member)
            try:
                doc = yaml.safe_load(raw)
            except Exception:
                continue
            if not isinstance(doc, dict) or not doc.get("name"):
                continue

            name = str(doc["name"]).strip()
            party = ""
            if doc.get("party") and isinstance(doc["party"], list):
                party = str(doc["party"][0].get("name") or "")

            chamber = "Lower"
            district = "0"
            for role in (doc.get("roles") or []):
                rtype = str(role.get("type") or "").lower()
                if rtype in ("upper", "lower") and not role.get("end_date"):
                    chamber = "Senate" if rtype == "upper" else "House"
                    district = str(role.get("district") or "0")
                    break
            else:
                # Fallback to most recent role if end_date set
                roles = [r for r in (doc.get("roles") or []) if str(r.get("type") or "").lower() in ("upper", "lower")]
                if roles:
                    rtype = str(roles[-1].get("type") or "").lower()
                    chamber = "Senate" if rtype == "upper" else "House"
                    district = str(roles[-1].get("district") or "0")

            # Check for any direct TikTok URL in links
            tiktok_handles = []
            campaign_url = None
            for link in (doc.get("links") or []):
                url = str(link.get("url") or "")
                m = TIKTOK_HANDLE_RE.search(url)
                if m:
                    h = m.group(1).lower().rstrip(".")
                    if h not in SKIP_HANDLES:
                        tiktok_handles.append(f"@{h}")
                elif not campaign_url and url.startswith("http"):
                    campaign_url = url

            conn.execute(
                """
                INSERT INTO candidates (full_name, state, chamber, district, party, incumbent_status, campaign_url)
                VALUES (?, ?, ?, ?, ?, 'Incumbent', ?)
                ON CONFLICT(full_name, state, chamber, district) DO UPDATE SET
                    party = COALESCE(NULLIF(excluded.party, ''), candidates.party),
                    campaign_url = COALESCE(excluded.campaign_url, candidates.campaign_url)
                """,
                (name, st, chamber, district, party, campaign_url),
            )
            inserted_cands += 1

            row_id = conn.execute(
                "SELECT candidate_id FROM candidates WHERE full_name=? AND state=? AND chamber=? AND district=?",
                (name, st, chamber, district),
            ).fetchone()[0]

            for h in set(tiktok_handles):
                conn.execute(
                    """
                    INSERT INTO tiktok_accounts (candidate_id, tiktok_handle, profile_url, account_type, discovery_source)
                    VALUES (?, ?, ?, 'official', 'openstates_yaml')
                    ON CONFLICT(candidate_id, tiktok_handle) DO NOTHING
                    """,
                    (row_id, h, f"https://www.tiktok.com/{h}"),
                )
                found_tiktok += 1

            by_state[st].append({
                "candidate_id": row_id,
                "name": name,
                "name_tokens": [t.lower() for t in re.findall(r"[A-Za-z]+", name) if len(t) > 2],
                "chamber": chamber,
                "district": district,
                "party": party,
            })

    conn.commit()
    print(f"Loaded {inserted_cands} OpenStates 50-state legislators ({found_tiktok} direct TikTok links).")
    return by_state


def ddg_search_tiktok(query: str, sleep_sec: float = 1.5) -> list[dict]:
    """Query DuckDuckGo HTML endpoint for TikTok URLs + titles/snippets."""
    time.sleep(sleep_sec)
    resp = requests.post(
        "https://html.duckduckgo.com/html/",
        data={"q": query},
        headers=HEADERS,
        timeout=20,
    )
    if resp.status_code != 200:
        return []
    soup = BeautifulSoup(resp.text, "html.parser")
    hits = []
    for res in soup.select(".result"):
        a = res.select_one("a.result__a")
        snip = res.select_one(".result__snippet")
        if not a:
            continue
        href = a.get("href") or ""
        # DuckDuckGo wraps links in uddg=...
        if "uddg=" in href:
            qs = urllib.parse.parse_qs(urllib.parse.urlparse(href).query)
            href = qs.get("uddg", [href])[0]
        m = TIKTOK_HANDLE_RE.search(href)
        if not m:
            continue
        handle = m.group(1).lower().rstrip(".")
        if handle in SKIP_HANDLES:
            continue
        hits.append({
            "handle": f"@{handle}",
            "title": a.get_text(" ", strip=True),
            "snippet": snip.get_text(" ", strip=True) if snip else "",
            "url": f"https://www.tiktok.com/@{handle}",
        })
    return hits


def match_or_create_candidate(
    conn: sqlite3.Connection,
    st: str,
    hit: dict,
    roster: list[dict],
) -> tuple[int, str]:
    """Match a discovered TikTok account to an existing OpenStates/Ballotpedia candidate,
    or create a new Challenger/Candidate record from the TikTok title/snippet.
    """
    blob = f"{hit['title']} {hit['snippet']} {hit['handle']}".lower()
    for cand in roster:
        tokens = cand["name_tokens"]
        if len(tokens) >= 2 and tokens[0] in blob and tokens[-1] in blob:
            return cand["candidate_id"], cand["name"]

    # Extract clean display name from TikTok title like "Jane Doe (@janedoe) | TikTok"
    display = re.split(r"\s*\(@|\s*\|\s*TikTok", hit["title"])[0].strip()
    if not display or len(display) > 60:
        display = hit["handle"]
    chamber = "Senate" if "senat" in blob else "House"
    inc_status = "Challenger" if any(k in blob for k in ("running for", "candidate for", "for state", "campaign")) else "Unknown"
    party = "Democratic" if "democrat" in blob else ("Republican" if "republican" in blob else "")

    conn.execute(
        """
        INSERT INTO candidates (full_name, state, chamber, district, party, incumbent_status)
        VALUES (?, ?, ?, '0', ?, ?)
        ON CONFLICT(full_name, state, chamber, district) DO NOTHING
        """,
        (display, st, chamber, party, inc_status),
    )
    cid = conn.execute(
        "SELECT candidate_id FROM candidates WHERE full_name=? AND state=? AND chamber=? AND district='0'",
        (display, st, chamber),
    ).fetchone()[0]
    return cid, display


def main() -> None:
    parser = argparse.ArgumentParser(description="50-state TikTok discovery for state legislative candidates.")
    parser.add_argument("--sleep", type=float, default=1.5, help="Seconds between DuckDuckGo searches.")
    parser.add_argument("--target-handles", type=int, default=200, help="Stop early once this many handles are stored.")
    args = parser.parse_args()

    db_path = init_database(DB_PATH)
    zip_path = ensure_openstates_zip()

    with sqlite3.connect(db_path) as conn:
        by_state = load_openstates_into_db(conn, zip_path)

        current_handles = conn.execute("SELECT COUNT(DISTINCT tiktok_handle) FROM tiktok_accounts").fetchone()[0]
        print(f"Starting search discovery (currently {current_handles} handles in DB, target {args.target_handles})...")

        for st, st_name in US_STATES.items():
            if current_handles >= args.target_handles:
                break
            queries = [
                f'site:tiktok.com "{st_name}" ("state representative" OR "state senator" OR "state assembly")',
                f'site:tiktok.com "{st_name}" ("running for state" OR "house district" OR "senate district") 2026',
            ]
            for q in queries:
                if current_handles >= args.target_handles:
                    break
                hits = ddg_search_tiktok(q, sleep_sec=args.sleep)
                for hit in hits:
                    cid, cname = match_or_create_candidate(conn, st, hit, by_state.get(st, []))
                    conn.execute(
                        """
                        INSERT INTO tiktok_accounts (candidate_id, tiktok_handle, profile_url, account_type, discovery_source)
                        VALUES (?, ?, ?, 'unknown', ?)
                        ON CONFLICT(candidate_id, tiktok_handle) DO NOTHING
                        """,
                        (cid, hit["handle"], hit["url"], f"ddg:{st}"),
                    )
                conn.commit()
                new_count = conn.execute("SELECT COUNT(DISTINCT tiktok_handle) FROM tiktok_accounts").fetchone()[0]
                if new_count > current_handles:
                    print(f"  [{st}] +{new_count - current_handles} handles (total: {new_count})")
                    current_handles = new_count

        # Export updated 50-state handles CSV
        handles_csv = DATA_DIR / "ca_2026_tiktok_handles.csv"
        h_rows = conn.execute(
            """
            SELECT c.candidate_id, c.state, c.full_name, c.chamber, c.district, c.party, c.incumbent_status,
                   a.tiktok_handle, a.profile_url, a.account_type, a.discovery_source
            FROM tiktok_accounts a
            JOIN candidates c ON a.candidate_id = c.candidate_id
            ORDER BY c.state, c.chamber, c.district, c.full_name
            """
        ).fetchall()
        with handles_csv.open("w", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow(["candidate_id", "state", "full_name", "chamber", "district", "party", "incumbent_status", "tiktok_handle", "profile_url", "account_type", "discovery_source"])
            writer.writerows(h_rows)

    print(f"Discovery complete: {len(h_rows)} TikTok handles saved to {handles_csv}")


if __name__ == "__main__":
    main()

