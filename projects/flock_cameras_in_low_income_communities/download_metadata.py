import urllib.request
import os
import sys

def download_file(file_id, dest_path, expected_name):
    url = f"https://dataverse.harvard.edu/api/access/datafile/{file_id}"
    print(f"Downloading {expected_name} from {url} to {dest_path}...")
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    
    with urllib.request.urlopen(req) as resp, open(dest_path, 'wb') as out_f:
        total = int(resp.headers.get('content-length', 0))
        downloaded = 0
        chunk_size = 1024 * 1024
        while True:
            chunk = resp.read(chunk_size)
            if not chunk:
                break
            out_f.write(chunk)
            downloaded += len(chunk)
            if total > 0:
                percent = (downloaded / total) * 100
                mb = downloaded / (1024 * 1024)
                sys.stdout.write(f"\r  Downloaded: {mb:.1f} MB / {total / (1024*1024):.1f} MB ({percent:.1f}%)")
            else:
                sys.stdout.write(f"\r  Downloaded: {downloaded / (1024*1024):.1f} MB")
            sys.stdout.flush()
    print("\nDownload complete!")

if __name__ == "__main__":
    out_dir = r"projects\flock_cameras_in_low_income_communities\data"
    os.makedirs(out_dir, exist_ok=True)
    
    # Download codebook
    codebook_dest = os.path.join(out_dir, "codebook.md")
    if not os.path.exists(codebook_dest):
        download_file("14077924", codebook_dest, "codebook.md")
        
    # Download meta_localview.parquet
    parquet_dest = os.path.join(out_dir, "meta_localview.parquet")
    if not os.path.exists(parquet_dest):
        download_file("14374515", parquet_dest, "meta_localview.parquet")
    else:
        print(f"{parquet_dest} already exists ({os.path.getsize(parquet_dest)/(1024*1024):.2f} MB)")
