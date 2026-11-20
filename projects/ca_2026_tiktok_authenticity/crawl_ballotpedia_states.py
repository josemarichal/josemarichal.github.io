"""Polite, resumable Ballotpedia + campaign-website crawler across major 2026 state legislative races."""

import argparse
import csv
import pathlib
import re
import sqlite3
import time
import requests
from bs4 import BeautifulSoup

from init_db import DB_PATH, DATA_DIR, init_database

CHECKPOINT_PATH = DATA_DIR / "bp_checked_urls.txt"

STATE_CHAMBER_URLS = [
    ("CA", "Assembly", "https://ballotpedia.org/California_State_Assembly_elections,_2026"),
    ("CA", "Senate", "https://ballotpedia.org/California_State_Senate_elections,_2026"),
    ("TX", "House", "https://ballotpedia.org/Texas_House_of_Representatives_elections,_2026"),
    ("TX", "Senate", "https://ballotpedia.org/Texas_State_Senate_elections,_2026"),
    ("NY", "Assembly", "https://ballotpedia.org/New_York_State_Assembly_elections,_2026"),
    ("NY", "Senate", "https://ballotpedia.org/New_York_State_Senate_elections,_2026"),
    ("FL", "House", "https://ballotpedia.org/Florida_House_of_Representatives_elections,_2026"),
    ("FL", "Senate", "https://ballotpedia.org/Florida_State_Senate_elections,_2026"),
    ("PA", "House", "https://ballotpedia.org/Pennsylvania_House_of_Representatives_elections,_2026"),
    ("PA", "Senate", "https://ballotpedia.org/Pennsylvania_State_Senate_elections,_2026"),
    ("MI", "House", "https://ballotpedia.org/Michigan_House_of_Representatives_elections,_2026"),
    ("MI", "Senate", "https://ballotpedia.org/Michigan_State_Senate_elections,_2026"),
    ("WI", "Assembly", "https://ballotpedia.org/Wisconsin_State_Assembly_elections,_2026"),
    ("WI", "Senate", "https://ballotpedia.org/Wisconsin_State_Senate_elections,_2026"),
    ("AZ", "House", "https://ballotpedia.org/Arizona_House_of_Representatives_elections,_2026"),
    ("AZ", "Senate", "https://ballotpedia.org/Arizona_State_Senate_elections,_2026"),
    ("GA", "House", "https://ballotpedia.org/Georgia_House_of_Representatives_elections,_2026"),
    ("GA", "Senate", "https://ballotpedia.org/Georgia_State_Senate_elections,_2026"),
    ("NC", "House", "https://ballotpedia.org/North_Carolina_House_of_Representatives_elections,_2026"),
    ("NC", "Senate", "https://ballotpedia.org/North_Carolina_State_Senate_elections,_2026"),
    ("WA", "House", "https://ballotpedia.org/Washington_House_of_Representatives_elections,_2026"),
    ("WA", "Senate", "https://ballotpedia.org/Washington_State_Senate_elections,_2026"),
    ("CO", "House", "https://ballotpedia.org/Colorado_House_of_Representatives_elections,_2026"),
    ("CO", "Senate", "https://ballotpedia.org/Colorado_State_Senate_elections,_2026"),
    ("MN", "House", "https://ballotpedia.org/Minnesota_House_of_Representatives_elections,_2026"),
    ("MN", "Senate", "https://ballotpedia.org/Minnesota_State_Senate_elections,_2026"),
    ("OH", "House", "https://ballotpedia.org/Ohio_House_of_Representatives_elections,_2026"),
    ("OH", "Senate", "https://ballotpedia.org/Ohio_State_Senate_elections,_2026"),
    ("IL", "House", "https://ballotpedia.org/Illinois_House_of_Representatives_elections,_2026"),
    ("IL", "Senate", "https://ballotpedia.org/Illinois_State_Senate_elections,_2026"),
    ("NV", "Assembly", "https://ballotpedia.org/Nevada_Assembly_elections,_2026"),
    ("NV", "Senate", "https://ballotpedia.org/Nevada_State_Senate_elections,_2026"),
]

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
    )
}

TIKTOK_RE = re.compile(r"https?://(?:www\.)?tiktok\.com/@([A-Za-z0-9_.]+)", re.I)
DISTRICT_RE = re.compile(r"District\s+(\d+[A-Za-z]?)", re.I)
SKIP_HANDLES = {"share", "tag", "music", "discover", "explore", "live", "tiktok", "foryou"}


def fetch_with_backoff(url: str, timeout: int = 20, max_retries: int = 3) -> str | None:
    delay = 15
    for attempt in range(max_retries):
        try:
            resp = requests.get(url, headers=HEADERS, timeout=timeout)
            if resp.status_code == 200:
                return resp.text
            if resp.status_code in (429, 403, 503):
                print(f"  [backoff {resp.status_code}] sleeping {delay}s for {url}")
                time.sleep(delay)
                delay *= 2
                continue
            return None
        except Exception:
            time.sleep(2)
    return None


def clean_name(raw: str) -> tuple[str, str]:
    is_incumbent = "Incumbent" if ("(i)" in raw.lower() or "incumbent" in raw.lower()) else "Challenger"
    name = re.sub(r"\([^)]*\)", "", raw)
    name = re.sub(r"✔|✓", "", name)
    name = re.sub(r"^Did not make the ballot:\s*", "", name, flags=re.I)
    name = re.sub(r"\s+", " ", name).strip(" ,;-")
    return name, is_incumbent


def parse_party(text: str) -> str:
    t = text.lower()
    if "(d)" in t or "democratic" in t:
        return "Democratic"
    if "(r)" in t or "republican" in t:
        return "Republican"
    if "(l)" in t or "libertarian" in t:
        return "Libertarian"
    if "(g)" in t or "green" in t:
        return "Green"
    if "no party preference" in t or "(npp)" in t or "independent" in t:
        return "Independent"
    return ""


def parse_chamber_overview(state: str, chamber: str, html: str) -> list[dict]:
    soup = BeautifulSoup(html, "html.parser")
    results = []
    seen = set()

    for table in soup.find_all("table"):
        prev_heading = table.find_previous(["h2", "h3", "h4"])
        heading_txt = prev_heading.get_text(" ", strip=True) if prev_heading else ""
        current_district = None
        m_head = DISTRICT_RE.search(heading_txt)
        if m_head:
            current_district = m_head.group(1)

        for tr in table.find_all("tr"):
            row_text = tr.get_text(" ", strip=True)
            if "did not make the ballot" in row_text.lower():
                continue
            m_row = DISTRICT_RE.search(row_text)
            if m_row and len(tr.find_all(["td", "th"])) <= 4:
                current_district = m_row.group(1)
            if not current_district:
                continue

            for a in tr.find_all("a", href=True):
                href = a["href"]
                if not href.startswith("http"):
                    href = f"https://ballotpedia.org{href}"
                text = a.get_text(" ", strip=True)
                if not text or len(text.split()) < 2:
                    continue
                if any(s in text.lower() for s in ("district", "ballotpedia", "general election", "primary", "incumbent")):
                    continue
                parent_text = a.parent.get_text(" ", strip=True) if a.parent else text
                name, inc_status = clean_name(parent_text if len(parent_text) < 80 else text)
                if not name or len(name.split()) < 2:
                    continue
                key = (state, chamber, current_district, name)
                if key in seen:
                    continue
                seen.add(key)
                results.append({
                    "full_name": name,
                    "state": state,
                    "chamber": chamber,
                    "district": str(current_district),
                    "party": parse_party(row_text),
                    "incumbent_status": inc_status,
                    "ballotpedia_url": href,
                })
    return results


def discover_from_profile(bp_url: str) -> tuple[str | None, list[tuple[str, str]]]:
    html = fetch_with_backoff(bp_url, timeout=15)
    if not html:
        return None, []
    found = []
    seen = set()
    for m in TIKTOK_RE.finditer(html):
        h = m.group(1).lower().rstrip(".")
        if h not in seen and h not in SKIP_HANDLES:
            seen.add(h)
            found.append((f"@{h}", "ballotpedia_profile"))

    campaign_url = None
    soup = BeautifulSoup(html, "html.parser")
    for a in soup.find_all("a", href=True):
        label = a.get_text(" ", strip=True).lower()
        href = a["href"]
        if ("campaign website" in label or "official website" in label) and href.startswith("http"):
            if not campaign_url:
                campaign_url = href
            try:
                r = requests.get(href, headers=HEADERS, timeout=8)
                if r.status_code == 200:
                    for m in TIKTOK_RE.finditer(r.text):
                        h = m.group(1).lower().rstrip(".")
                        if h not in seen and h not in SKIP_HANDLES:
                            seen.add(h)
                            found.append((f"@{h}", f"campaign_site:{href}"))
            except Exception:
                pass
    return campaign_url, found


def load_checked() -> set[str]:
    if not CHECKPOINT_PATH.exists():
        return set()
    return {line.strip() for line in CHECKPOINT_PATH.read_text(encoding="utf-8").splitlines() if line.strip()}


def mark_checked(url: str) -> None:
    with CHECKPOINT_PATH.open("a", encoding="utf-8") as f:
        f.write(url + "\n")


def main() -> None:
    parser = argparse.ArgumentParser(description="Polite 2026 Ballotpedia + campaign website crawler.")
    parser.add_argument("--sleep", type=float, default=1.5, help="Seconds between Ballotpedia requests.")
    parser.add_argument("--target-handles", type=int, default=200, help="Stop once total DB handles reaches this target.")
    args = parser.parse_args()

    db_path = init_database(DB_PATH)
    checked = load_checked()

    with sqlite3.connect(db_path) as conn:
        for state, chamber, url in STATE_CHAMBER_URLS:
            print(f"Fetching {state} {chamber} overview...")
            html = fetch_with_backoff(url)
            time.sleep(args.sleep)
            if not html:
                continue
            cands = parse_chamber_overview(state, chamber, html)
            print(f"  Parsed {len(cands)} candidates for {state} {chamber}.")
            for c in cands:
                conn.execute(
                    """
                    INSERT INTO candidates (full_name, state, chamber, district, party, incumbent_status, ballotpedia_url)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                    ON CONFLICT(full_name, state, chamber, district) DO UPDATE SET
                        party = COALESCE(NULLIF(excluded.party, ''), candidates.party),
                        ballotpedia_url = COALESCE(excluded.ballotpedia_url, candidates.ballotpedia_url)
                    """,
                    (c["full_name"], c["state"], c["chamber"], c["district"], c["party"], c["incumbent_status"], c["ballotpedia_url"]),
                )
            conn.commit()

        # Crawl candidate Ballotpedia profiles + campaign websites politely
        rows = conn.execute(
            """
            SELECT candidate_id, state, full_name, chamber, district, ballotpedia_url
            FROM candidates
            WHERE ballotpedia_url IS NOT NULL
            ORDER BY CASE WHEN state='CA' THEN 0 ELSE 1 END, state, chamber, district
            """
        ).fetchall()

        total_handles = conn.execute("SELECT COUNT(DISTINCT tiktok_handle) FROM tiktok_accounts").fetchone()[0]
        print(f"Crawling up to {len(rows)} candidate profiles (currently {total_handles} handles, target {args.target_handles})...")

        for cid, st, name, chamber, dist, bp_url in rows:
            if total_handles >= args.target_handles:
                print(f"Reached target of {args.target_handles} handles!")
                break
            if bp_url in checked:
                continue
            camp_url, handles = discover_from_profile(bp_url)
            mark_checked(bp_url)
            if camp_url:
                conn.execute("UPDATE candidates SET campaign_url = COALESCE(campaign_url, ?) WHERE candidate_id = ?", (camp_url, cid))
            for h, src in handles:
                conn.execute(
                    """
                    INSERT INTO tiktok_accounts (candidate_id, tiktok_handle, profile_url, account_type, discovery_source)
                    VALUES (?, ?, ?, 'campaign', ?)
                    ON CONFLICT(candidate_id, tiktok_handle) DO NOTHING
                    """,
                    (cid, h, f"https://www.tiktok.com/{h}", src),
                )
            conn.commit()
            if handles:
                total_handles = conn.execute("SELECT COUNT(DISTINCT tiktok_handle) FROM tiktok_accounts").fetchone()[0]
                print(f"  [{st} {chamber} {dist}] {name}: {[h[0] for h in handles]} (total: {total_handles})")
            time.sleep(args.sleep)

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

        print(f"Saved {len(h_rows)} handles to {handles_csv}")


if __name__ == "__main__":
    main()

