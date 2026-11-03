import json
import os
import re
import time
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
import pandas as pd

OUT_DIR = r"c:\Users\jfmar\josemarichal\github.io\projects\unaccountable_ai"
os.makedirs(OUT_DIR, exist_ok=True)

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) CivicAIResearch/1.0"
}

CUTOFF_DATE = pd.Timestamp("2026-05-01", tz="UTC")


def fetch_text(url, headers=None, timeout=15):
    req = urllib.request.Request(url, headers=headers or HEADERS)
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return resp.read().decode("utf-8", errors="replace")


def harvest_google_news_recent():
    """
    Query Google News RSS strictly restricted to after:2026-05-01 (last 6 months)
    across diverse community, business, queer, journalistic, civic, and creator takedown queries.
    """
    base_queries = [
        '"Facebook page" ("taken down" OR "shut down" OR "disabled" OR "suspended" OR "deleted") after:2026-05-01',
        '"Facebook page" ("suspended" OR "removed" OR "unpublished" OR "banned" OR "restored") Meta after:2026-05-01',
        '"Instagram account" ("taken down" OR "shut down" OR "disabled" OR "suspended" OR "banned") Meta after:2026-05-01',
        '("gay bar" OR "gay bars" OR "LGBTQ" OR "drag" OR "queer" OR "club" OR "venue") ("Facebook" OR "Instagram" OR "Meta") ("suspended" OR "taken down" OR "disabled" OR "banned" OR "kicking") after:2026-05-01',
        '("small business" OR "restaurant" OR "bar" OR "diner" OR "bakery" OR "brewery" OR "shop") ("Facebook" OR "Instagram" OR "Meta") ("disabled" OR "suspended" OR "taken down" OR "shut down" OR "banned") after:2026-05-01',
        '("nonprofit" OR "charity" OR "shelter" OR "animal rescue" OR "church" OR "museum" OR "bookstore") ("Facebook" OR "Instagram" OR "Meta") ("disabled" OR "suspended" OR "taken down" OR "deleted") after:2026-05-01',
        '("city" OR "town" OR "police" OR "school" OR "mayor" OR "minister" OR "candidate" OR "campaign") "Facebook page" ("suspended" OR "disabled" OR "taken down" OR "removed" OR "blocked") after:2026-05-01',
        '("newspaper" OR "journalist" OR "news" OR "media" OR "reporter" OR "publication") "Facebook page" ("suspended" OR "disabled" OR "taken down" OR "permanently") after:2026-05-01',
        '("protest" OR "activist" OR "coalition" OR "No Kings" OR "union" OR "movement") ("Facebook" OR "Instagram" OR "Meta") ("suspended" OR "shut down" OR "disabled" OR "taken down") after:2026-05-01',
        'Meta ("AI moderation" OR "wrongfully disabled" OR "reach a human" OR "disabled accounts" OR "account suspended" OR "mass suspension") ("Facebook" OR "Instagram") after:2026-05-01',
        '("Facebook account" OR "Instagram account" OR "Meta accounts") ("disabled" OR "suspended" OR "deleted") ("AI" OR "appeal" OR "no reason" OR "human" OR "lawsuit" OR "sues") after:2026-05-01',
    ]

    records = []
    seen_titles = set()

    for q in base_queries:
        encoded = urllib.parse.quote(q)
        url = f"https://news.google.com/rss/search?q={encoded}&hl=en-US&gl=US&ceid=US:en"
        try:
            xml_text = fetch_text(url)
            root = ET.fromstring(xml_text)
            added = 0
            for item in root.findall(".//item"):
                title = (item.findtext("title") or "").strip()
                link = (item.findtext("link") or "").strip()
                pub_date = (item.findtext("pubDate") or "").strip()
                ts = pd.to_datetime(pub_date, errors="coerce", utc=True)
                if pd.isna(ts) or ts < CUTOFF_DATE:
                    continue

                source_el = item.find("source")
                publisher = source_el.text.strip() if source_el is not None and source_el.text else "News"
                desc = re.sub(r"<[^>]+>", " ", item.findtext("description") or "").strip()
                desc = re.sub(r"\s+", " ", desc)

                norm_title = re.sub(r"\s+-\s+[^-]+$", "", title).strip().lower()
                if not norm_title or norm_title in seen_titles:
                    continue
                seen_titles.add(norm_title)

                records.append({
                    "source_platform": "Google News",
                    "sub_source": publisher,
                    "created_at": ts.strftime("%Y-%m-%d"),
                    "pub_date_raw": pub_date,
                    "title": title,
                    "text": f"{title}. {desc}",
                    "url": link,
                    "query_used": q,
                })
                added += 1
            print(f"[Google News >=2026-05-01] +{added:2d} (total {len(records):3d}) | {q[:58]}...")
        except Exception as e:
            print(f"[Google News] Error on query '{q[:40]}': {e}")
        time.sleep(0.4)

    return records


if __name__ == "__main__":
    print("=== Harvesting Meta Takedowns Strictly From Last 6 Months (May 1 – Nov 2, 2026) ===")
    recs = harvest_google_news_recent()
    df = pd.DataFrame(recs)
    df = df.sort_values("created_at", ascending=False).reset_index(drop=True)
    out_csv = os.path.join(OUT_DIR, "meta_takedowns_raw.csv")
    df.to_csv(out_csv, index=False, encoding="utf-8")
    print(f"\n=== Harvest Complete: {len(df)} records (100% >= 2026-05-01) saved to {out_csv} ===")
    print("Date range:", df["created_at"].min(), "to", df["created_at"].max())
    print("\nMonthly breakdown:")
    print(df["created_at"].str.slice(0, 7).value_counts().sort_index())
