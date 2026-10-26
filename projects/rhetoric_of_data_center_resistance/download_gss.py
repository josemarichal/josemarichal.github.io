import os
import urllib.request
import zipfile

DATA_DIR = os.path.join(os.path.dirname(__file__), "data")
os.makedirs(DATA_DIR, exist_ok=True)

url_2022 = "https://gss.norc.org/content/dam/gss/get-the-data/documents/stata/2022_stata.zip"
zip_path = os.path.join(DATA_DIR, "2022_stata.zip")

print(f"Downloading GSS 2022 from {url_2022}...")
req = urllib.request.Request(url_2022, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
with urllib.request.urlopen(req) as resp, open(zip_path, "wb") as out_file:
    data = resp.read()
    out_file.write(data)
print(f"Downloaded {len(data) / 1024 / 1024:.2f} MB to {zip_path}")

print("Extracting zip file...")
with zipfile.ZipFile(zip_path, "r") as z:
    z.extractall(DATA_DIR)
    extracted = z.namelist()
    print("Extracted files:", extracted)

print("Done!")
