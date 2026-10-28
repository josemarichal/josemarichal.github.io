import pandas as pd
import re

df = pd.read_csv('projects/flock_cameras_in_low_income_communities/data/flock_snippets_stone_coded.csv')
print(f"Total snippets: {len(df)}")

places = df[['st_fips', 'place_names', 'government_type']].drop_duplicates(subset=['st_fips'])
print(f"Total unique st_fips entries: {len(places)}")

target_geo_ids = set()
fips_to_geo = {}

for _, row in places.iterrows():
    raw_fips = str(row['st_fips']).strip()
    # Split on semicolon or whitespace
    parts = [p.strip() for p in re.split(r'[;\s]+', raw_fips) if p.strip()]
    
    geos = []
    for p in parts:
        if len(p) == 7: # Place
            geos.append(f"1600000US{p}")
        elif len(p) <= 5: # County
            geos.append(f"0500000US{p.zfill(5)}")
        elif len(p) == 6: # Place with missing leading 0
            geos.append(f"1600000US0{p}")
        else:
            print(f"Unrecognized fips format: {p} in {raw_fips}")
            
    fips_to_geo[raw_fips] = geos
    target_geo_ids.update(geos)

print(f"Total unique target GEO_IDs to query: {len(target_geo_ids)}")
sample_geos = list(target_geo_ids)[:10]
print("Sample target GEO_IDs:", sample_geos)
