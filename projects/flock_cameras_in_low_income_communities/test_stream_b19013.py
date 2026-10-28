import urllib.request
import time

url = "https://www2.census.gov/programs-surveys/acs/summary_file/2022/table-based-SF/data/5YRData/acsdt5y2022-b19013.dat"
print(f"Connecting to {url}...")

t0 = time.time()
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
with urllib.request.urlopen(req, timeout=30) as response:
    header = response.readline().decode('utf-8')
    print("Header:", header.strip())
    count = 0
    bytes_read = 0
    for line in response:
        bytes_read += len(line)
        count += 1
        if count % 100000 == 0:
            print(f"Read {count} lines ({bytes_read / (1024*1024):.1f} MB) in {time.time()-t0:.1f}s")
            
print(f"Completed in {time.time()-t0:.1f}s: {count} lines, {bytes_read / (1024*1024):.1f} MB")
