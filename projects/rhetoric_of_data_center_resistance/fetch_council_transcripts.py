"""
City Council & County Commission Transcript Snippet Extractor for Data Center Deliberations
Authors: Jose Marichal / Antigravity
Data Source: Harvard LocalView Corpus Metadata + YouTube Closed Caption Transcripts
"""

import os
import re
import json
import time
import pandas as pd
from concurrent.futures import ThreadPoolExecutor, as_completed
from youtube_transcript_api import YouTubeTranscriptApi

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
TARGETS_CSV = os.path.join(DATA_DIR, "target_council_meetings.csv")
OUT_CSV = os.path.join(DATA_DIR, "council_transcript_snippets.csv")
OUT_JSONL = os.path.join(DATA_DIR, "council_transcript_snippets.jsonl")

# Primary regex for explicit data center / hyperscale / compute infrastructure mentions
EXPLICIT_DC_REGEX = re.compile(
    r'\b(data\s+centers?|datacenter|hyperscal(e|ers?)|server\s+farms?|'
    r'crypto\s*min(ing|ers?)|bitcoin\s+min(ing|ers?)|ai\s+campus|digital\s+gateway|'
    r'applied\s+digital|coreweave|qts|vantage\s+data|compass\s+data)\b',
    re.IGNORECASE
)

# Secondary regex for meetings explicitly titled around Data Centers (captures broader hearing arguments)
HEARING_TOPIC_REGEX = re.compile(
    r'\b(moratorium|megawatts?|substations?|cooling\s+water|aquifer|'
    r'eminent\s+domain|transmission\s+lines?|non-?disclosure|nda|'
    r'ratepayers?|diesel\s+generators?|noise\s+ordinance|setbacks?)\b',
    re.IGNORECASE
)

def extract_snippets_from_text(text, is_explicit_dc_meeting=False, window=100):
    words = text.split()
    total_words = len(words)
    if total_words < 20:
        return []

    has_dc = bool(EXPLICIT_DC_REGEX.search(text))
    if not has_dc and not is_explicit_dc_meeting:
        return []

    results = []
    seen_positions = set()

    for i in range(total_words):
        chunk = " ".join(words[i:min(total_words, i + 4)])
        m = EXPLICIT_DC_REGEX.match(chunk)
        matched_term = None
        if m:
            matched_term = m.group(0)
        elif is_explicit_dc_meeting and has_dc:
            m2 = HEARING_TOPIC_REGEX.match(chunk)
            if m2:
                matched_term = m2.group(0)

        if matched_term:
            # Avoid overlapping windows within 85 words
            if any(abs(i - p) < 85 for p in seen_positions):
                continue
            seen_positions.add(i)

            start_idx = max(0, i - window)
            end_idx = min(total_words, i + window + 2)
            snippet_str = " ".join(words[start_idx:end_idx])

            results.append({
                "matched_term": matched_term,
                "word_position": i,
                "snippet_text": snippet_str
            })

    return results

def fetch_one_meeting(row):
    vid = str(row["id"]).strip()
    title = str(row.get("title", ""))
    is_explicit = (row.get("source_match") == "explicit_title_or_agenda") or ("data center" in title.lower())
    try:
        api = YouTubeTranscriptApi()
        transcript = api.fetch(vid)
        full_text = " ".join([seg.text.replace("\n", " ") for seg in transcript])
        hits = extract_snippets_from_text(full_text, is_explicit_dc_meeting=is_explicit, window=100)
        records = []
        for idx, h in enumerate(hits):
            records.append({
                "snippet_id": f"LV-{vid}-{idx+1:02d}",
                "video_id": vid,
                "meeting_date": str(row.get("meeting_date", "")),
                "place_names": str(row.get("place_names", "")),
                "st_fips": str(row.get("st_fips", "")),
                "government_type": str(row.get("government_type", "")),
                "meeting_title": title,
                "source_match": str(row.get("source_match", "")),
                "matched_term": h["matched_term"],
                "word_position": h["word_position"],
                "snippet_text": h["snippet_text"],
                "youtube_url": f"https://www.youtube.com/watch?v={vid}"
            })
        return vid, len(records), records, None
    except Exception as e:
        return vid, 0, [], str(e)

def main():
    df = pd.read_csv(TARGETS_CSV)
    print(f"Loaded {len(df)} candidate municipal meetings.")

    all_records = []
    meetings_with_hits = 0
    completed = 0

    with ThreadPoolExecutor(max_workers=6) as ex:
        futures = {ex.submit(fetch_one_meeting, row): row for _, row in df.iterrows()}
        for fut in as_completed(futures):
            completed += 1
            vid, count, recs, err = fut.result()
            if count > 0:
                meetings_with_hits += 1
                all_records.extend(recs)
                row = futures[fut]
                print(f"[{completed}/{len(df)}] HIT: {row['place_names']} ({row['meeting_date']}) -> {count} snippets | {row['title'][:55]}")
            elif completed % 25 == 0:
                print(f"[{completed}/{len(df)}] Processed... (Meetings with hits so far: {meetings_with_hits}, Snippets: {len(all_records)})")

    df_out = pd.DataFrame(all_records)
    df_out.to_csv(OUT_CSV, index=False, encoding="utf-8")
    with open(OUT_JSONL, "w", encoding="utf-8") as f:
        for r in all_records:
            f.write(json.dumps(r, ensure_ascii=False) + "\n")

    print("=" * 65)
    print(f"DONE! Extracted {len(all_records)} verbatim council hearing snippets across {meetings_with_hits} municipal meetings.")
    print(f"Saved to: {OUT_CSV}")
    print("=" * 65)

if __name__ == "__main__":
    main()

