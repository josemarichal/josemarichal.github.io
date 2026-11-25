"""
01_fetch_govinfo.py
Fetches all GovInfo CHRG hearing packages matching the AI query
with publishdate in [2023-11-15, 2026-11-15].
Resumable: skips already-downloaded summary and htm files.
"""

import os
import json
import time
import urllib.request
import urllib.error
from concurrent.futures import ThreadPoolExecutor, as_completed

BASE_DIR = r"c:\Users\jfmar\anaconda3\envs\topic_modeling\congressional_ai_rhetoric"
RAW_DIR = os.path.join(BASE_DIR, "raw")
SUM_DIR = os.path.join(RAW_DIR, "summaries")
HTM_DIR = os.path.join(RAW_DIR, "htm")
os.makedirs(SUM_DIR, exist_ok=True)
os.makedirs(HTM_DIR, exist_ok=True)

def load_env(path):
    with open(path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                os.environ[k.strip()] = v.strip()

load_env(os.path.join(BASE_DIR, ".env"))
API_KEY = os.environ["DATA_GOV_API_KEY"]

QUERY = (
    'collection:CHRG AND publishdate:range(2023-11-15,2026-11-15) AND ('
    '"artificial intelligence" OR "generative AI" OR "large language model" '
    'OR "foundation model" OR "machine learning" OR deepfake OR algorithmic OR "AI")'
)

def fetch_all_search_results():
    search_cache = os.path.join(RAW_DIR, "search_results.json")
    if os.path.exists(search_cache):
        with open(search_cache, "r", encoding="utf-8") as f:
            cached = json.load(f)
            print(f"Loaded cached search_results.json ({len(cached)} packages)", flush=True)
            return cached

    results = []
    offset_mark = "*"
    page = 0
    while True:
        page += 1
        payload = json.dumps({"query": QUERY, "pageSize": 100, "offsetMark": offset_mark}).encode("utf-8")
        req = urllib.request.Request(
            f"https://api.govinfo.gov/search?api_key={API_KEY}",
            data=payload,
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        with urllib.request.urlopen(req, timeout=60) as resp:
            data = json.loads(resp.read().decode("utf-8"))

        batch = data.get("results", [])
        results.extend(batch)
        total = data.get("count", 0)
        next_mark = data.get("offsetMark", None)
        print(f"Search page {page}: +{len(batch)} (total collected: {len(results)} / {total})", flush=True)

        if not batch or not next_mark or next_mark == offset_mark or len(results) >= total:
            break
        offset_mark = next_mark
        time.sleep(0.2)

    with open(search_cache, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2)
    return results

def fetch_with_retry(url, retries=4):
    for attempt in range(retries):
        try:
            with urllib.request.urlopen(url, timeout=45) as resp:
                return resp.read()
        except urllib.error.HTTPError as e:
            if e.code == 429:
                wait = 15 * (attempt + 1)
                print(f"  Rate limited (429), sleeping {wait}s...", flush=True)
                time.sleep(wait)
            elif e.code == 404:
                return None
            else:
                if attempt == retries - 1:
                    raise
                time.sleep(2 * (attempt + 1))
        except Exception:
            if attempt == retries - 1:
                raise
            time.sleep(2 * (attempt + 1))
    return None

def download_package(pkg_id):
    sum_path = os.path.join(SUM_DIR, f"{pkg_id}.json")
    htm_path = os.path.join(HTM_DIR, f"{pkg_id}.htm")

    if not os.path.exists(sum_path):
        raw_sum = fetch_with_retry(f"https://api.govinfo.gov/packages/{pkg_id}/summary?api_key={API_KEY}")
        if raw_sum is not None:
            with open(sum_path, "wb") as f:
                f.write(raw_sum)

    if not os.path.exists(htm_path):
        raw_htm = fetch_with_retry(f"https://api.govinfo.gov/packages/{pkg_id}/htm?api_key={API_KEY}")
        if raw_htm is not None:
            with open(htm_path, "wb") as f:
                f.write(raw_htm)

    return pkg_id

def main():
    results = fetch_all_search_results()
    pkg_ids = list(dict.fromkeys(r["packageId"] for r in results if "packageId" in r))
    print(f"Downloading summaries and transcripts for {len(pkg_ids)} unique packages...", flush=True)

    done = 0
    errors = []
    with ThreadPoolExecutor(max_workers=4) as ex:
        futures = {ex.submit(download_package, pid): pid for pid in pkg_ids}
        for fut in as_completed(futures):
            pid = futures[fut]
            try:
                fut.result()
            except Exception as e:
                errors.append((pid, str(e)))
            done += 1
            if done % 50 == 0 or done == len(pkg_ids):
                print(f"  Progress: {done}/{len(pkg_ids)} (errors: {len(errors)})", flush=True)

    if errors:
        err_path = os.path.join(RAW_DIR, "download_errors.json")
        with open(err_path, "w", encoding="utf-8") as f:
            json.dump(errors, f, indent=2)
        print(f"Saved {len(errors)} errors to {err_path}")
    print("Fetch complete!")

if __name__ == "__main__":
    main()
