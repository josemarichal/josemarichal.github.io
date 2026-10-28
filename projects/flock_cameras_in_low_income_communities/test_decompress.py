import urllib.request
import tarfile
import gzip
import re

url = "https://dataverse.harvard.edu/api/access/datafile/14374516" # part 1
print("Connecting to Dataverse tar stream to test decompression...")
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})

with urllib.request.urlopen(req) as resp:
    with tarfile.open(fileobj=resp, mode="r|*") as tar:
        for member in tar:
            if member.name.endswith(".txt.gz") and member.size > 1000:
                # Extract file ID: {channel_id}__{video_id}.txt.gz
                filename = member.name.split("/")[-1]
                video_id = filename.replace(".txt.gz", "").split("__")[-1]
                
                f = tar.extractfile(member)
                raw_gz = f.read()
                text = gzip.decompress(raw_gz).decode('utf-8', errors='ignore')
                
                print(f"File: {filename}")
                print(f"Extracted Video ID: {video_id}")
                print(f"Uncompressed Length: {len(text):,} characters / {len(text.split()):,} words")
                print("First 200 characters:")
                print(text[:200])
                break
