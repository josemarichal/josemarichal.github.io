"""Fast multi-source 50-state TikTok handle discovery:
1. Query Wikidata SPARQL for US state legislators / politicians with TikTok usernames (P7085).
2. Concurrently scan OpenStates official/campaign URLs in SQLite for `tiktok.com/@...` links.
"""

import concurrent.futures
import csv
import re
import sqlite3
import requests

from init_db import DB_PATH, DATA_DIR, init_database

HEADERS = {
    "User-Agent": "AcademicResearchBot/1.0 (mailto:research@example.edu)",
    "Accept": "application/sparql-results+json",
}
WEB_HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
    )
}

TIKTOK_RE = re.compile(r"tiktok\.com/@([A-Za-z0-9_.]+)", re.I)
SKIP_HANDLES = {"share", "tag", "music", "discover", "explore", "live", "tiktok", "foryou"}


def query_wikidata_state_legislators() -> list[dict]:
    """Query Wikidata for US politicians/state legislators with a TikTok username (P7085)."""
    sparql = """
    SELECT DISTINCT ?personLabel ?tiktok ?officeLabel WHERE {
      ?person wdt:P7085 ?tiktok .
      ?person wdt:P27 wd:Q30 .
      ?person wdt:P39 ?office .
      ?office wdt:P31/wdt:P279* wd:Q4175034 .
      SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
    }
    LIMIT 1000
    """
    try:
        resp = requests.get(
            "https://query.wikidata.org/sparql",
            params={"query": sparql, "format": "json"},
            headers=HEADERS,
            timeout=30,
        )
        resp.raise_for_status()
        rows = resp.json().get("results", {}).get("bindings", [])
        out = []
        for r in rows:
            handle = r["tiktok"]["value"].strip().lstrip("@").lower()
            if handle and handle not in SKIP_HANDLES:
                out.append({
                    "name": r.get("personLabel", {}).get("value", ""),
                    "handle": f"@{handle}",
                    "office": r.get("officeLabel", {}).get("value", ""),
                })
        print(f"Wikidata SPARQL returned {len(out)} state legislator TikTok entries.")
        return out
    except Exception as exc:
        print(f"Wikidata SPARQL error: {exc}")
        return []


def scan_single_url(item: tuple[int, str, str]) -> tuple[int, str, list[str]]:
    cid, name, url = item
    try:
        resp = requests.get(url, headers=WEB_HEADERS, timeout=6, allow_redirects=True)
        if resp.status_code != 200:
            return cid, name, []
        handles = []
        for m in TIKTOK_RE.finditer(resp.text):
            h = m.group(1).lower().rstrip(".")
            if h not in SKIP_HANDLES and len(h) >= 3:
                handles.append(f"@{h}")
        return cid, name, sorted(set(handles))
    except Exception:
        return cid, name, []


def main() -> None:
    db_path = init_database(DB_PATH)
    with sqlite3.connect(db_path) as conn:
        # 1. Wikidata match against 50-state candidates
        wd_rows = query_wikidata_state_legislators()
        cands = conn.execute("SELECT candidate_id, full_name, state, chamber, district FROM candidates").fetchall()
        name_map = {c[1].lower(): c[0] for c in cands}

        wd_added = 0
        for w in wd_rows:
            cid = name_map.get(w["name"].lower())
            if not cid:
                continue
            conn.execute(
                """
                INSERT INTO tiktok_accounts (candidate_id, tiktok_handle, profile_url, account_type, discovery_source)
                VALUES (?, ?, ?, 'unknown', 'wikidata_P7085')
                ON CONFLICT(candidate_id, tiktok_handle) DO NOTHING
                """,
                (cid, w["handle"], f"https://www.tiktok.com/{w['handle']}"),
            )
            wd_added += 1
        conn.commit()
        print(f"Matched {wd_added} Wikidata handles to candidates in DB.")

        # 2. Scan OpenStates / campaign URLs concurrently (sample all 7,321 or until we have plenty)
        url_rows = conn.execute(
            """
            SELECT candidate_id, full_name, campaign_url
            FROM candidates
            WHERE campaign_url IS NOT NULL AND campaign_url != ''
            """
        ).fetchall()
        print(f"Scanning {len(url_rows)} candidate websites concurrently for TikTok links...")

        scanned = 0
        found_site = 0
        with concurrent.futures.ThreadPoolExecutor(max_workers=32) as pool:
            for cid, name, handles in pool.map(scan_single_url, url_rows):
                scanned += 1
                for h in handles:
                    conn.execute(
                        """
                        INSERT INTO tiktok_accounts (candidate_id, tiktok_handle, profile_url, account_type, discovery_source)
                        VALUES (?, ?, ?, 'official', 'official_site_scan')
                        ON CONFLICT(candidate_id, tiktok_handle) DO NOTHING
                        """,
                        (cid, h, f"https://www.tiktok.com/{h}"),
                    )
                    found_site += 1
                if scanned % 500 == 0:
                    conn.commit()
                    total_h = conn.execute("SELECT COUNT(DISTINCT tiktok_handle) FROM tiktok_accounts").fetchone()[0]
                    print(f"  Scanned {scanned}/{len(url_rows)} sites | total unique handles in DB: {total_h}")
        conn.commit()

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

        print(f"Finished! Total unique TikTok handles saved: {len(h_rows)} -> {handles_csv}")


if __name__ == "__main__":
    main()

