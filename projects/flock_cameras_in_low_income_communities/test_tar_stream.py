import urllib.request
import tarfile

url = "https://dataverse.harvard.edu/api/access/datafile/14374516" # part 1
print("Connecting to Dataverse tar stream via mode='r|*'...")
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})

count = 0
try:
    with urllib.request.urlopen(req) as resp:
        with tarfile.open(fileobj=resp, mode="r|*") as tar:
            for member in tar:
                count += 1
                print(f"[{count}] {member.name} ({member.size} bytes)")
                if count >= 10:
                    break
except Exception as e:
    print(f"Error: {e}")
