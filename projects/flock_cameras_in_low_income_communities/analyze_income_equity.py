import pandas as pd
import numpy as np

df = pd.read_csv('projects/flock_cameras_in_low_income_communities/data/flock_snippets_stone_with_census.csv')

print("="*60)
print("1. OVERALL SNIPPET AND DELIBERATION VOLUME BY INCOME TIER")
print("="*60)

tier_vol = df.groupby('income_tier').agg(
    total_snippets=('video_id', 'count'),
    unique_meetings=('video_id', 'nunique'),
    unique_jurisdictions=('st_fips', 'nunique'),
    mean_income=('median_household_income', 'mean'),
    mean_poverty=('poverty_rate_pct', 'mean')
).reindex(['Low Income (<$60k)', 'Middle Income ($60k-$90k)', 'Affluent (>$90k)'])

print(tier_vol)

print("\n" + "="*60)
print("2. STONE METAPHOR FAMILIES BY INCOME TIER (COUNTS & PERCENTAGES)")
print("="*60)

# Filter for explicit metaphors (excluding literal procedural)
df_metaphors = df[df['primary_metaphor'] != 'LITERAL_PROCEDURAL']

ct = pd.crosstab(df_metaphors['primary_metaphor'], df_metaphors['income_tier'], margins=True)
cols = ['Low Income (<$60k)', 'Middle Income ($60k-$90k)', 'Affluent (>$90k)', 'All']
cols = [c for c in cols if c in ct.columns]
ct = ct[cols]
print("\nAbsolute Metaphor Counts by Income Tier:")
print(ct)

ct_pct = pd.crosstab(df_metaphors['primary_metaphor'], df_metaphors['income_tier'], normalize='columns') * 100
cols_pct = ['Low Income (<$60k)', 'Middle Income ($60k-$90k)', 'Affluent (>$90k)']
cols_pct = [c for c in cols_pct if c in ct_pct.columns]
ct_pct = ct_pct[cols_pct]
print("\nColumn % (Metaphor Mix within each Income Tier):")
print(ct_pct.round(1))

print("\n" + "="*60)
print("3. JUSTIFICATION VS REJECTION STANCE BY INCOME TIER")
print("="*60)

ct_stance = pd.crosstab(df['dominant_stance'], df['income_tier'], margins=True)[cols]
print(ct_stance)

ct_stance_pct = pd.crosstab(df['dominant_stance'], df['income_tier'], normalize='columns') * 100
print("\nStance % within each Income Tier:")
print(ct_stance_pct[cols_pct].round(1))

print("\n" + "="*60)
print("4. SPEAKER PROFILE BY INCOME TIER")
print("="*60)
ct_speaker = pd.crosstab(df['speaker_clues'], df['income_tier'], margins=True)[cols]
print(ct_speaker)

