#!/usr/bin/env python3
"""
fetch_census_income.py
Acquires Census ACS 5-Year (2018-2022) socio-economic indicators for all 270 jurisdictions
in the Flock Camera deliberation corpus by streaming official US Census Bureau summary files.

Target Metrics:
- B19013_E001: Median Household Income in the past 12 months (inflation-adjusted)
- B01003_E001: Total Population
- B17001_E001: Poverty Universe (population for whom poverty status is determined)
- B17001_E002: Number of individuals with income below poverty level
- poverty_rate_pct: (B17001_E002 / B17001_E001) * 100
- income_tier: Low Income (<$60k), Middle Income ($60k-$90k), Affluent (>$90k)
"""

import sys
import re
import time
import urllib.request
import pandas as pd
import numpy as np

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

BASE_URL = "https://www2.census.gov/programs-surveys/acs/summary_file/2022/table-based-SF/data/5YRData/"

# Specific Minor Civil Divisions (MCDs) and special place mappings
SPECIAL_GEO_MAPPINGS = {
    '3650078': ['0600000US3611950078'], # New Castle town, Westchester County, NY
    '3447500': ['0600000US3401347500'], # Montclair township, Essex County, NJ
    '2541165': ['0600000US2502741165'], # Milford town, Worcester County, MA
    '4452480': ['0600000US4400752480'], # North Smithfield town, Providence County, RI
    '3479800': ['0600000US3401379800'], # West Orange township, Essex County, NJ
    '2689160': ['0600000US2616189160'], # Ypsilanti township, Washtenaw County, MI
    '4867400': ['1600000US4867400', '0500000US48339'], # Shenandoah city + Montgomery County fallback
}

def load_jurisdictions():
    snippets_path = "projects/flock_cameras_in_low_income_communities/data/flock_snippets_stone_coded.csv"
    df = pd.read_csv(snippets_path)
    print(f"Loaded {len(df)} snippets from {snippets_path}")
    
    unique_places = df[['st_fips', 'place_names', 'government_type']].drop_duplicates(subset=['st_fips']).copy()
    print(f"Identified {len(unique_places)} unique jurisdiction entries.")
    
    fips_to_geos = {}
    all_target_geos = set()
    
    for _, row in unique_places.iterrows():
        raw_fips = str(row['st_fips']).strip()
        
        if raw_fips in SPECIAL_GEO_MAPPINGS:
            geos = SPECIAL_GEO_MAPPINGS[raw_fips]
        else:
            parts = [p.strip() for p in re.split(r'[;\s]+', raw_fips) if p.strip()]
            geos = []
            for p in parts:
                if len(p) == 7: # Place FIPS
                    geos.append(f"1600000US{p}")
                elif len(p) <= 5: # County FIPS
                    geos.append(f"0500000US{p.zfill(5)}")
                elif len(p) == 6: # Place with missing leading 0
                    geos.append(f"1600000US0{p}")
                    
        fips_to_geos[raw_fips] = geos
        all_target_geos.update(geos)
        
    print(f"Compiled {len(all_target_geos)} distinct target GEO_IDs for Census query.")
    return df, unique_places, fips_to_geos, all_target_geos

def stream_census_table(filename, target_geos, value_cols):
    """
    Streams a pipe-delimited table from Census FTP directly over HTTP.
    Extracts only lines matching target_geos without saving giant files to disk.
    """
    url = BASE_URL + filename
    print(f"\nStreaming {filename} from {url}...")
    t0 = time.time()
    
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    results = {}
    
    with urllib.request.urlopen(req, timeout=60) as resp:
        header_line = resp.readline().decode('utf-8', errors='replace').strip()
        headers = header_line.split('|')
        
        col_indices = {col: headers.index(col) for col in value_cols if col in headers}
        
        lines_checked = 0
        hits = 0
        for raw_line in resp:
            lines_checked += 1
            line = raw_line.decode('utf-8', errors='replace').strip()
            if not line:
                continue
            
            pipe_pos = line.find('|')
            if pipe_pos == -1:
                continue
            geo_id = line[:pipe_pos]
            
            if geo_id in target_geos:
                parts = line.split('|')
                row_data = {}
                for col_name, idx in col_indices.items():
                    val_str = parts[idx] if idx < len(parts) else None
                    try:
                        val = float(val_str) if val_str not in (None, '', '.', 'null', '-') else np.nan
                        # Filter out Census special missing codes (negative numbers like -666666666)
                        if not np.isnan(val) and val < 0:
                            val = np.nan
                        row_data[col_name] = val
                    except ValueError:
                        row_data[col_name] = np.nan
                results[geo_id] = row_data
                hits += 1
                
    elapsed = time.time() - t0
    print(f"Finished {filename}: scanned {lines_checked:,} lines, captured {hits} target records in {elapsed:.1f}s.")
    return results

def main():
    df_snippets, unique_places, fips_to_geos, all_target_geos = load_jurisdictions()
    
    # 1. Stream Median Household Income (B19013)
    income_data = stream_census_table("acsdt5y2022-b19013.dat", all_target_geos, ["B19013_E001"])
    
    # 2. Stream Total Population (B01003)
    pop_data = stream_census_table("acsdt5y2022-b01003.dat", all_target_geos, ["B01003_E001"])
    
    # 3. Stream Poverty Universe and Poverty Count (B17001)
    poverty_data = stream_census_table("acsdt5y2022-b17001.dat", all_target_geos, ["B17001_E001", "B17001_E002"])
    
    # Aggregate onto unique jurisdictions
    jurisdiction_rows = []
    
    for _, row in unique_places.iterrows():
        raw_fips = str(row['st_fips']).strip()
        place_name = row['place_names']
        govt_type = row['government_type']
        candidate_geos = fips_to_geos.get(raw_fips, [])
        
        best_income = np.nan
        best_pop = np.nan
        best_pov_univ = np.nan
        best_pov_count = np.nan
        matched_geo = None
        
        # Priority order: MCD (0600000US) -> Place (1600000US) -> County (0500000US)
        def geo_rank(g):
            if g.startswith("0600000US"): return 0
            if g.startswith("1600000US"): return 1
            return 2
            
        candidate_geos_sorted = sorted(candidate_geos, key=geo_rank)
        
        for geo in candidate_geos_sorted:
            inc = income_data.get(geo, {}).get("B19013_E001", np.nan)
            pop = pop_data.get(geo, {}).get("B01003_E001", np.nan)
            pov_u = poverty_data.get(geo, {}).get("B17001_E001", np.nan)
            pov_c = poverty_data.get(geo, {}).get("B17001_E002", np.nan)
            
            if not np.isnan(inc) or not np.isnan(pop):
                if np.isnan(best_income) and not np.isnan(inc):
                    best_income = inc
                if np.isnan(best_pop) and not np.isnan(pop):
                    best_pop = pop
                if np.isnan(best_pov_univ) and not np.isnan(pov_u):
                    best_pov_univ = pov_u
                    best_pov_count = pov_c
                if matched_geo is None:
                    matched_geo = geo
                    
        poverty_rate = (best_pov_count / best_pov_univ * 100.0) if (best_pov_univ and best_pov_univ > 0) else np.nan
        
        # Define Income Tier
        # Low Income: < $60,000 | Middle Income: $60,000 - $90,000 | Affluent: > $90,000
        if np.isnan(best_income):
            income_tier = "Unknown"
        elif best_income < 60000:
            income_tier = "Low Income (<$60k)"
        elif best_income <= 90000:
            income_tier = "Middle Income ($60k-$90k)"
        else:
            income_tier = "Affluent (>$90k)"
            
        jurisdiction_rows.append({
            "st_fips": raw_fips,
            "place_name": place_name,
            "government_type": govt_type,
            "matched_geo_id": matched_geo,
            "median_household_income": best_income,
            "total_population": best_pop,
            "poverty_universe": best_pov_univ,
            "poverty_count": best_pov_count,
            "poverty_rate_pct": round(poverty_rate, 2) if not np.isnan(poverty_rate) else np.nan,
            "income_tier": income_tier
        })
        
    df_jurisdictions = pd.DataFrame(jurisdiction_rows)
    out_jur_csv = "projects/flock_cameras_in_low_income_communities/data/jurisdiction_census_metrics.csv"
    df_jurisdictions.to_csv(out_jur_csv, index=False)
    print(f"\nSaved jurisdiction metrics to {out_jur_csv}")
    print("\nIncome Tier Distribution across all 270 Jurisdictions:")
    print(df_jurisdictions['income_tier'].value_counts(dropna=False))
    print("\nSummary Statistics of Matched Jurisdictions:")
    print(df_jurisdictions[['median_household_income', 'poverty_rate_pct', 'total_population']].describe())
    
    # Merge onto the full 3,581 snippet corpus
    df_merged = df_snippets.merge(
        df_jurisdictions[['st_fips', 'matched_geo_id', 'median_household_income', 'total_population', 'poverty_rate_pct', 'income_tier']],
        on='st_fips',
        how='left'
    )
    
    out_snippets_csv = "projects/flock_cameras_in_low_income_communities/data/flock_snippets_stone_with_census.csv"
    df_merged.to_csv(out_snippets_csv, index=False)
    print(f"\nMerged Census indicators onto all {len(df_merged)} snippets -> {out_snippets_csv}")

if __name__ == "__main__":
    main()
