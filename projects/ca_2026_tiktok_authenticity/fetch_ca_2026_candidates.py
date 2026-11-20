"""Fetch 2026 California State Assembly & Senate general-election candidates
(incumbents and challengers) and discover linked TikTok handles.
"""

import argparse
import csv
import pathlib
import re
import sqlite3
import time
import urllib.error
import urllib.request
from bs4 import BeautifulSoup

from init_db import DB_PATH, DATA_DIR, init_database

BALLOTPEDIA_URLS = {
    "Assembly": "https://ballotpedia.org/California_State_Assembly_elections,_2026",
    "Senate": "https://ballotpedia.org/California_State_Senate_elections,_2026",
}

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
    )
}

TIKTOK_RE = re.compile(r"https?://(?:www\.)?tiktok\.com/@([A-Za-z0-9_.]+)", re.I)
DISTRICT_RE = re.compile(r"District\s+(\d+)", re.I)


def fetch_html(url: str, timeout: int = 20) -> str:
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return resp.read().decode("utf-8", errors="replace")


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
    return "Other"


def clean_name(raw: str) -> tuple[str, str]:
    """Return (clean_name, incumbent_status) from a Ballotpedia candidate cell."""
    is_incumbent = "Incumbent" if ("(i)" in raw.lower() or "incumbent" in raw.lower()) else "Challenger"
    name = re.sub(r"\([^)]*\)", "", raw)
    name = re.sub(r"✔|✓", "", name)
    name = re.sub(r"\s+", " ", name).strip(" ,;-")
    return name, is_incumbent


def parse_ballotpedia_chamber(chamber: str, html: str) -> list[dict]:
    """Extract general election candidates by district from Ballotpedia chamber overview."""
    soup = BeautifulSoup(html, "html.parser")
    results = []
    seen = set()

    # Ballotpedia renders district race tables or votebox divs with District N headings
    for table in soup.find_all("table"):
        caption_or_prev = ""
        prev_heading = table.find_previous(["h2", "h3", "h4"])
        if prev_heading:
            caption_or_prev = prev_heading.get_text(" ", strip=True)

        rows = table.find_all("tr")
        current_district = None
        m_head = DISTRICT_RE.search(caption_or_prev)
        if m_head:
            current_district = int(m_head.group(1))

        for tr in rows:
            row_text = tr.get_text(" ", strip=True)
            m_row = DISTRICT_RE.search(row_text)
            if m_row and len(tr.find_all(["td", "th"])) <= 4:
                current_district = int(m_row.group(1))

            if current_district is None:
                continue

            # Look for candidate links inside General election cells/rows
            for a in tr.find_all("a", href=True):
                href = a["href"]
                if not href.startswith("http"):
                    href = f"https://ballotpedia.org{href}"
                text = a.get_text(" ", strip=True)
                if not text or len(text.split()) < 2:
                    continue
                if any(skip in text.lower() for skip in ("district", "ballotpedia", "general election", "primary", "california")):
                    continue

                parent_text = a.parent.get_text(" ", strip=True) if a.parent else text
                name, inc_status = clean_name(parent_text if len(parent_text) < 80 else text)
                if not name or len(name.split()) < 2:
                    continue

                key = (chamber, current_district, name)
                if key in seen:
                    continue
                seen.add(key)

                results.append({
                    "full_name": name,
                    "chamber": chamber,
                    "district": current_district,
                    "party": parse_party(tr.get_text(" ", strip=True)),
                    "incumbent_status": inc_status,
                    "ballotpedia_url": href,
                })
    return results


def discover_tiktok_handles(ballotpedia_url: str) -> list[tuple[str, str]]:
    """Scan a candidate's Ballotpedia page (and linked campaign site) for TikTok handles."""
    found = []
    seen_handles = set()
    try:
        html = fetch_html(ballotpedia_url, timeout=15)
    except Exception:
        return found

    for match in TIKTOK_RE.finditer(html):
        handle = match.group(1).lower().rstrip(".")
        if handle not in seen_handles and handle not in {"share", "tag", "music", "discover"}:
            seen_handles.add(handle)
            found.append((f"@{handle}", "ballotpedia_profile"))

    # Also check external campaign website links on the Ballotpedia contact sidebar
    soup = BeautifulSoup(html, "html.parser")
    for a in soup.find_all("a", href=True):
        label = a.get_text(" ", strip=True).lower()
        href = a["href"]
        if "campaign website" in label or "official website" in label:
            try:
                site_html = fetch_html(href, timeout=12)
                for match in TIKTOK_RE.finditer(site_html):
                    handle = match.group(1).lower().rstrip(".")
                    if handle not in seen_handles and handle not in {"share", "tag", "music", "discover"}:
                        seen_handles.add(handle)
                        found.append((f"@{handle}", f"website:{href}"))
            except Exception:
                pass
    return found


def main() -> None:
    parser = argparse.ArgumentParser(description="Build 2026 CA legislative candidate & TikTok handle tables.")
    parser.add_argument("--discover-handles", action="store_true", help="Crawl Ballotpedia + campaign sites for TikTok links.")
    parser.add_argument("--sleep", type=float, default=0.5, help="Delay between profile requests when discovering handles.")
    args = parser.parse_args()

    db_path = init_database(DB_PATH)
    all_candidates = []

    for chamber, url in BALLOTPEDIA_URLS.items():
        print(f"Fetching {chamber} candidates from {url} ...")
        html = fetch_html(url)
        rows = parse_ballotpedia_chamber(chamber, html)
        print(f"  Parsed {len(rows)} {chamber} candidate entries.")
        all_candidates.extend(rows)

    with sqlite3.connect(db_path) as conn:
        for row in all_candidates:
            conn.execute(
                """
                INSERT INTO candidates (full_name, chamber, district, party, incumbent_status, ballotpedia_url)
                VALUES (?, ?, ?, ?, ?, ?)
                ON CONFLICT(full_name, chamber, district) DO UPDATE SET
                    party = COALESCE(excluded.party, candidates.party),
                    incumbent_status = CASE
                        WHEN excluded.incumbent_status != 'Unknown' THEN excluded.incumbent_status
                        ELSE candidates.incumbent_status
                    END,
                    ballotpedia_url = COALESCE(excluded.ballotpedia_url, candidates.ballotpedia_url)
                """,
                (
                    row["full_name"],
                    row["chamber"],
                    row["district"],
                    row["party"],
                    row["incumbent_status"],
                    row["ballotpedia_url"],
                ),
            )
        conn.commit()

        if args.discover_handles:
            cands = conn.execute(
                "SELECT candidate_id, full_name, chamber, district, ballotpedia_url FROM candidates WHERE ballotpedia_url IS NOT NULL"
            ).fetchall()
            for cid, name, chamber, dist, bp_url in cands:
                handles = discover_tiktok_handles(bp_url)
                for handle, source in handles:
                    profile_url = f"https://www.tiktok.com/{handle}"
                    conn.execute(
                        """
                        INSERT INTO tiktok_accounts (candidate_id, tiktok_handle, profile_url, account_type, discovery_source)
                        VALUES (?, ?, ?, 'unknown', ?)
                        ON CONFLICT(candidate_id, tiktok_handle) DO NOTHING
                        """,
                        (cid, handle, profile_url, source),
                    )
                if handles:
                    print(f"  Found {len(handles)} TikTok handle(s) for {name} ({chamber} {dist}): {[h[0] for h in handles]}")
                conn.commit()
                time.sleep(args.sleep)

        # Export CSVs for manual inspection / handle supplementation
        cand_csv = DATA_DIR / "ca_2026_candidates.csv"
        c_rows = conn.execute(
            "SELECT candidate_id, full_name, chamber, district, party, incumbent_status, ballotpedia_url FROM candidates ORDER BY chamber, district, full_name"
        ).fetchall()
        with cand_csv.open("w", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow(["candidate_id", "full_name", "chamber", "district", "party", "incumbent_status", "ballotpedia_url"])
            writer.writerows(c_rows)

        handles_csv = DATA_DIR / "ca_2026_tiktok_handles.csv"
        h_rows = conn.execute(
            """
            SELECT c.candidate_id, c.full_name, c.chamber, c.district, c.party, c.incumbent_status,
                   a.tiktok_handle, a.profile_url, a.account_type, a.discovery_source
            FROM tiktok_accounts a
            JOIN candidates c ON a.candidate_id = c.candidate_id
            ORDER BY c.chamber, c.district, c.full_name
            """
        ).fetchall()
        with handles_csv.open("w", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow(["candidate_id", "full_name", "chamber", "district", "party", "incumbent_status", "tiktok_handle", "profile_url", "account_type", "discovery_source"])
            writer.writerows(h_rows)

    print(f"Saved {len(c_rows)} candidates to {cand_csv} and {len(h_rows)} TikTok handles to {handles_csv}.")


if __name__ == "__main__":
    main()

