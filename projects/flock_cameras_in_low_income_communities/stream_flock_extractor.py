"""
Streaming Flock Camera Transcript Extractor for LocalView V3
Authors: Jose Marichal / Antigravity
Data Source: Harvard Dataverse (DOI: 10.7910/DVN/NJTBEM)

Features:
- Zero local disk bloat: Streams tar archives over HTTP directly in memory.
- Instant skipping: Only decompresses transcripts for meetings from Jan 1, 2025 onward (37,655 meetings).
- Snippet extraction: Extracts the matching Flock/ALPR discussion + 100 words before and after.
- False positive rejection: Eliminates colloquial "flock to/into" and bird idioms.
- Incremental flush: Saves matches immediately to CSV/JSONL.
- Windows-safe encoding: UTF-8 stream output with ASCII console fallbacks.
"""

import urllib.request
import tarfile
import gzip
import re
import os
import json
import pandas as pd
import time
import sys

# Ensure UTF-8 output on Windows consoles
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

# Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
META_2025_PATH = os.path.join(DATA_DIR, "meta_2025_plus.csv")
OUTPUT_CSV = os.path.join(DATA_DIR, "flock_snippets_2025.csv")
OUTPUT_JSONL = os.path.join(DATA_DIR, "flock_snippets_2025.jsonl")

# Harvard Dataverse Tar File IDs
TAR_PARTS = [
    {"name": "part1", "file_id": "14374516", "size_mb": 2036.25},
    {"name": "part2", "file_id": "14374517", "size_mb": 2037.29},
    {"name": "part3", "file_id": "14374522", "size_mb": 1088.16}
]

# 1. Unambiguous explicit phrases for Flock & ALPR surveillance
EXPLICIT_SURVEILLANCE_REGEX = re.compile(
    r'\b(flock\s+safety|flock\s+cameras?|flock\s+system|flock\s+contracts?|flock\s+alpr|'
    r'flock\s+technolog(y|ies)|flock\s+network|flock\s+readers?|flock\s+devices?|'
    r'alpr|automated\s+license\s+plate(\s+readers?)?|license\s+plate\s+readers?|'
    r'license\s+plate\s+cameras?)\b',
    re.IGNORECASE
)

# 2. Standalone "flock"
STANDALONE_FLOCK_REGEX = re.compile(r'\bflock\b', re.IGNORECASE)

# Words indicating law enforcement / camera surveillance context within 35 words of "flock"
SURVEILLANCE_CONTEXT_WORDS = re.compile(
    r'\b(camera|cameras|license|plate|plates|alpr|reader|readers|surveillance|police|'
    r'law\s+enforcement|tracking|vehicle|vehicles|stolen|hit|hot\s*list|chief|patrol|'
    r'investigation|contract|contracts|privacy|civil\s+liberties|vendor|fips|pd)\b',
    re.IGNORECASE
)

# Reject colloquial verbs and bird idioms
VERB_OR_BIRD_REJECT = re.compile(
    r'\b(flock\s+(to|into|in|towards?|together)|people\s+flock|they\s+flock|residents\s+flock|'
    r'shoppers\s+flock|visitors\s+flock|birds?\s+flock|flock\s+of)\b',
    re.IGNORECASE
)

def load_metadata():
    if not os.path.exists(META_2025_PATH):
        raise FileNotFoundError(f"Missing {META_2025_PATH}. Run inspect_metadata.py first.")
    
    print(f"Loading metadata from {META_2025_PATH}...")
    df = pd.read_csv(META_2025_PATH)
    meta_dict = df.set_index('id').to_dict(orient='index')
    target_ids = set(df['id'].dropna().astype(str).tolist())
    print(f"Loaded {len(target_ids):,} target meeting IDs (2025-01-01 to present).")
    return target_ids, meta_dict

def extract_flock_mentions(text, window=100):
    """
    Extracts Flock & ALPR surveillance mentions with 100 words before and after.
    Applies rigorous false-positive rejection for colloquial verbs ("flock into").
    """
    words = text.split()
    total_words = len(words)
    results = []
    seen_positions = set()

    # Pre-check if any surveillance terms exist anywhere in the text
    has_explicit = bool(EXPLICIT_SURVEILLANCE_REGEX.search(text))
    has_flock = bool(STANDALONE_FLOCK_REGEX.search(text))
    
    if not (has_explicit or has_flock):
        return results

    for i in range(total_words):
        word_window = " ".join(words[i:min(total_words, i + 5)])
        
        # Check explicit multi-word and single-word surveillance phrases
        explicit_match = EXPLICIT_SURVEILLANCE_REGEX.match(word_window)
        if explicit_match:
            matched_phrase = explicit_match.group(0)
            # Avoid overlapping windows within 50 words
            if any(abs(i - p) < 50 for p in seen_positions):
                continue
            seen_positions.add(i)
            
            start_idx = max(0, i - window)
            end_idx = min(total_words, i + window + len(matched_phrase.split()))
            snippet_str = " ".join(words[start_idx:end_idx])
            
            results.append({
                "matched_term": matched_phrase,
                "word_position": i,
                "snippet_window": snippet_str
            })
            continue

        # Check standalone "flock"
        if re.match(r'^flock[^\w]*$', words[i], re.IGNORECASE):
            local_context = " ".join(words[max(0, i - 3):min(total_words, i + 5)])
            
            # Reject if colloquial verb or bird reference
            if VERB_OR_BIRD_REJECT.search(local_context):
                continue
                
            # Must have surveillance context within 35 words
            surrounding_context = " ".join(words[max(0, i - 35):min(total_words, i + 35)])
            if SURVEILLANCE_CONTEXT_WORDS.search(surrounding_context):
                if any(abs(i - p) < 50 for p in seen_positions):
                    continue
                seen_positions.add(i)
                
                start_idx = max(0, i - window)
                end_idx = min(total_words, i + window + 1)
                snippet_str = " ".join(words[start_idx:end_idx])
                
                results.append({
                    "matched_term": words[i],
                    "word_position": i,
                    "snippet_window": snippet_str
                })

    return results

def process_tar_stream(part_info, target_ids, meta_dict, existing_ids):
    file_id = part_info["file_id"]
    part_name = part_info["name"]
    url = f"https://dataverse.harvard.edu/api/access/datafile/{file_id}"
    
    print(f"\n{'='*70}")
    print(f"Streaming {part_name.upper()} ({part_info['size_mb']} MB) directly from Dataverse...")
    print(f"URL: {url}")
    print(f"{'='*70}")
    
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    
    inspected_count = 0
    matched_meetings_count = 0
    extracted_snippets = []
    start_time = time.time()
    
    try:
        with urllib.request.urlopen(req) as resp:
            with tarfile.open(fileobj=resp, mode="r|*") as tar:
                for member in tar:
                    try:
                        if not member.name.endswith(".txt.gz"):
                            continue
                        
                        # Member format: {channel_id}__{video_id}.txt.gz
                        filename = member.name.split("/")[-1]
                        video_id = filename.replace(".txt.gz", "").split("__")[-1]
                        
                        # 1. Skip if not in our 2025+ subset
                        if video_id not in target_ids:
                            continue
                            
                        inspected_count += 1
                        
                        # 2. Extract and decompress text in RAM
                        f = tar.extractfile(member)
                        if f is None:
                            continue
                        raw_gz = f.read()
                        text = gzip.decompress(raw_gz).decode('utf-8', errors='ignore')
                        
                        # 3. Check for Flock / ALPR mentions
                        hits = extract_flock_mentions(text, window=100)
                        if hits:
                            matched_meetings_count += 1
                            meta = meta_dict.get(video_id, {})
                            
                            for h in hits:
                                record = {
                                    "video_id": video_id,
                                    "meeting_date": meta.get("clean_date", ""),
                                    "place_names": meta.get("place_names", ""),
                                    "st_fips": meta.get("st_fips", ""),
                                    "government_type": meta.get("government_type", ""),
                                    "meeting_title": meta.get("title", ""),
                                    "matched_term": h["matched_term"],
                                    "word_position": h["word_position"],
                                    "snippet_100_words": h["snippet_window"],
                                    "youtube_url": f"https://youtube.com/watch?v={video_id}",
                                    "tar_part": part_name
                                }
                                extracted_snippets.append(record)
                                
                                # Append directly to JSONL for instant persistence
                                with open(OUTPUT_JSONL, "a", encoding="utf-8") as jf:
                                    jf.write(json.dumps(record) + "\n")
                                    
                            safe_place = str(meta.get('place_names', 'Unknown')).encode('ascii', 'replace').decode('ascii')
                            safe_date = str(meta.get('clean_date', ''))
                            print(f"  * [HIT #{matched_meetings_count}] {safe_place} | Date: {safe_date} | Mentions: {len(hits)} | Term: {hits[0]['matched_term']}")
                        
                        if inspected_count % 500 == 0:
                            elapsed = time.time() - start_time
                            sys.stdout.write(f"\r  Inspected {inspected_count:,} 2025 meetings | Hits: {matched_meetings_count} | Elapsed: {elapsed/60:.1f}m")
                            sys.stdout.flush()
                            
                    except Exception as member_err:
                        # Log and continue next member without halting stream
                        continue
                        
    except Exception as stream_err:
        print(f"\nStream disconnected on {part_name}: {stream_err}")
        
    print(f"\nFinished {part_name}: Inspected {inspected_count:,} target meetings, found {matched_meetings_count} meetings with Flock/ALPR discussions.")
    return extracted_snippets

def run():
    target_ids, meta_dict = load_metadata()
    
    # Check already collected IDs if resuming
    existing_records = []
    if os.path.exists(OUTPUT_JSONL):
        with open(OUTPUT_JSONL, "r", encoding="utf-8") as f:
            for line in f:
                if line.strip():
                    try:
                        existing_records.append(json.loads(line))
                    except:
                        pass
        print(f"Found {len(existing_records)} existing snippets in {OUTPUT_JSONL}.")
    
    all_snippets = list(existing_records)
    
    # Filter parts if specified in command line (e.g. 2 3 or 2,3)
    parts_to_run = TAR_PARTS
    if len(sys.argv) > 1:
        requested_names = set()
        for arg in sys.argv[1:]:
            for item in arg.replace(",", " ").split():
                clean_item = item.lower().replace("--part=", "").replace("--part", "").replace("part", "")
                if clean_item in ["1", "2", "3"]:
                    requested_names.add(f"part{clean_item}")
        if requested_names:
            parts_to_run = [p for p in TAR_PARTS if p["name"] in requested_names]
            print(f"Filtered to run: {[p['name'] for p in parts_to_run]}")

    for part in parts_to_run:
        new_hits = process_tar_stream(part, target_ids, meta_dict, set([r["video_id"] for r in all_snippets]))
        all_snippets.extend(new_hits)
        
        # Save cumulative CSV
        if all_snippets:
            df_out = pd.DataFrame(all_snippets)
            df_out.to_csv(OUTPUT_CSV, index=False, encoding="utf-8")
            print(f"Updated CSV: {OUTPUT_CSV} ({len(df_out):,} rows total)")
            
    print("\n" + "="*70)
    print(f"EXTRACTION RUN COMPLETE! Total Flock/ALPR Snippets: {len(all_snippets):,}")
    print(f"CSV saved at: {OUTPUT_CSV}")
    print(f"JSONL saved at: {OUTPUT_JSONL}")
    print("="*70)

if __name__ == "__main__":
    run()
