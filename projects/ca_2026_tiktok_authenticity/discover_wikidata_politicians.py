"""Match Wikidata US politicians with TikTok usernames (P7085) against our 50-state DB."""

import csv
import sqlite3
import requests

from init_db import DB_PATH, DATA_DIR, init_database

SPARQL = """
SELECT DISTINCT ?personLabel ?tiktok WHERE {
  ?person wdt:P7085 ?tiktok .
  ?person wdt:P27 wd:Q30 .
  ?person wdt:P106 wd:Q82955 .
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}
LIMIT 5000
"""


def main() -> None:
    resp = requests.get(
        "https://query.wikidata.org/sparql",
        params={"query": SPARQL, "format": "json"},
        headers={"User-Agent": "AcademicResearchBot/1.0 (mailto:research@example.edu)"},
        timeout=30,
    )
    resp.raise_for_status()
    rows = resp.json().get("results", {}).get("bindings", [])
    print(f"Wikidata returned {len(rows)} US politicians with TikTok usernames.")

    db_path = init_database(DB_PATH)
    with sqlite3.connect(db_path) as conn:
        name_map = {
            r[0].lower(): r[1]
            for r in conn.execute("SELECT full_name, candidate_id FROM candidates").fetchall()
        }
        added = 0
        for row in rows:
            name = row["personLabel"]["value"].strip()
            handle = "@" + row["tiktok"]["value"].strip().lstrip("@").lower()
            cid = name_map.get(name.lower())
            if cid and len(handle) > 2:
                cur = conn.execute(
                    """
                    INSERT INTO tiktok_accounts (candidate_id, tiktok_handle, profile_url, account_type, discovery_source)
                    VALUES (?, ?, ?, 'unknown', 'wikidata_P7085')
                    ON CONFLICT(candidate_id, tiktok_handle) DO NOTHING
                    """,
                    (cid, handle, f"https://www.tiktok.com/{handle}"),
                )
                added += cur.rowcount
        conn.commit()

        h_rows = conn.execute(
            """
            SELECT c.candidate_id, c.state, c.full_name, c.chamber, c.district, c.party, c.incumbent_status,
                   a.tiktok_handle, a.profile_url, a.account_type, a.discovery_source
            FROM tiktok_accounts a
            JOIN candidates c ON a.candidate_id = c.candidate_id
            ORDER BY c.state, c.chamber, c.district, c.full_name
            """
        ).fetchall()
        handles_csv = DATA_DIR / "ca_2026_tiktok_handles.csv"
        with handles_csv.open("w", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow(["candidate_id", "state", "full_name", "chamber", "district", "party", "incumbent_status", "tiktok_handle", "profile_url", "account_type", "discovery_source"])
            writer.writerows(h_rows)

        print(f"Added {added} new handles from Wikidata. Total unique handles in DB: {len(h_rows)}")


if __name__ == "__main__":
    main()

