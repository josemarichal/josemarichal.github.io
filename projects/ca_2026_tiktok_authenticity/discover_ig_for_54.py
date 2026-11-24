"""Discover Instagram handles for the 54 candidates who have campaign-window TikTok videos."""

import csv
import pathlib
import re
import sqlite3
import time
import zipfile
import requests
import yaml

BASE_DIR = pathlib.Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
DB_PATH = DATA_DIR / "ca_2026_tiktok.db"
OPENSTATES_ZIP = DATA_DIR / "openstates_people_main.zip"

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
    )
}

IG_RE = re.compile(r"https?://(?:www\.)?instagram\.com/([A-Za-z0-9_.]+)/?", re.I)
SKIP_IG = {"p", "reel", "reels", "stories", "explore", "accounts", "about", "legal", "privacy", "share", "ballotpedia"}


def load_openstates_ig() -> dict[str, str]:
    ig_by_name = {}
    if not OPENSTATES_ZIP.exists():
        return ig_by_name
    with zipfile.ZipFile(OPENSTATES_ZIP, "r") as zf:
        for n in zf.namelist():
            if not n.endswith(".yml") or "/legislature/" not in n:
                continue
            try:
                doc = yaml.safe_load(zf.read(n))
            except Exception:
                continue
            if not isinstance(doc, dict) or not doc.get("name"):
                continue
            name = str(doc["name"]).strip().lower()
            ig = (doc.get("ids") or {}).get("instagram")
            if ig:
                ig_by_name[name] = str(ig).strip().lstrip("@").lower()
            else:
                for lnk in (doc.get("links") or []):
                    m = IG_RE.search(str(lnk.get("url") or ""))
                    if m and m.group(1).lower() not in SKIP_IG:
                        ig_by_name[name] = m.group(1).lower()
                        break
    return ig_by_name


def find_ig_on_url(url: str) -> str | None:
    if not url:
        return None
    try:
        r = requests.get(url, headers=HEADERS, timeout=12)
        if r.status_code != 200:
            return None
        for m in IG_RE.finditer(r.text):
            h = m.group(1).lower().rstrip(".")
            if h not in SKIP_IG and len(h) >= 2:
                return h
    except Exception:
        return None
    return None


def main() -> None:
    os_ig = load_openstates_ig()
    with sqlite3.connect(DB_PATH) as conn:
        cands = conn.execute(
            """
            SELECT DISTINCT c.candidate_id, c.state, c.full_name, c.chamber, c.district,
                   c.party, c.incumbent_status, c.campaign_url, c.ballotpedia_url,
                   MIN(a.tiktok_handle) AS tiktok_handle,
                   COUNT(v.video_id) AS tiktok_window_videos
            FROM videos v
            JOIN candidates c ON v.candidate_id = c.candidate_id
            JOIN tiktok_accounts a ON v.account_id = a.account_id
            WHERE v.in_campaign_window = 1
            GROUP BY c.candidate_id
            ORDER BY c.state, c.chamber, c.district, c.full_name
            """
        ).fetchall()

    out_rows = []
    found = 0
    for cid, st, name, chamber, dist, party, status, camp_url, bp_url, tt_handle, tt_cnt in cands:
        ig = os_ig.get(name.lower())
        source = "openstates" if ig else ""
        if not ig and camp_url:
            ig = find_ig_on_url(camp_url)
            if ig:
                source = "campaign_url"
        if not ig and bp_url:
            ig = find_ig_on_url(bp_url)
            if ig:
                source = "ballotpedia"
            time.sleep(0.5)

        if ig:
            found += 1
        out_rows.append({
            "candidate_id": cid,
            "state": st,
            "full_name": name,
            "chamber": chamber,
            "district": dist,
            "party": party,
            "incumbent_status": status,
            "tiktok_handle": tt_handle,
            "tiktok_window_videos": tt_cnt,
            "instagram_handle": f"@{ig}" if ig else "",
            "instagram_url": f"https://www.instagram.com/{ig}/" if ig else "",
            "ig_discovery_source": source,
        })
        print(f"  [{st}] {name}: TT={tt_handle} ({tt_cnt}) | IG={'@'+ig if ig else 'NONE'} ({source})")

    out_csv = DATA_DIR / "paired_54_instagram_handles.csv"
    with out_csv.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(out_rows[0].keys()))
        w.writeheader()
        w.writerows(out_rows)
    print(f"Found Instagram handles for {found}/{len(out_rows)} candidates -> {out_csv}")


if __name__ == "__main__":
    main()
