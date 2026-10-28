import pandas as pd
pd.set_option('display.max_columns', None)
pd.set_option('display.width', 1000)

df = pd.read_csv('projects/flock_cameras_in_low_income_communities/data/flock_snippets_stone_with_census.csv')

print("="*80)
print("TABLE 1: JURISDICTIONS & DELIBERATION VOLUME BY INCOME TIER")
print("="*80)
tier_vol = df.groupby('income_tier').agg(
    jurisdictions=('st_fips', 'nunique'),
    meetings=('video_id', 'nunique'),
    snippets=('video_id', 'count'),
    mean_income=('median_household_income', 'mean'),
    median_income=('median_household_income', 'median'),
    mean_poverty=('poverty_rate_pct', 'mean')
).reindex(['Low Income (<$60k)', 'Middle Income ($60k-$90k)', 'Affluent (>$90k)'])
print(tier_vol)

print("\n" + "="*80)
print("TABLE 2: METAPHOR COUNTS BY INCOME TIER (EXCLUDING NONE)")
print("="*80)
df_met = df[df['primary_metaphor'] != 'NONE']
ct = pd.crosstab(df_met['primary_metaphor'], df_met['income_tier'], margins=True)
ct = ct[['Low Income (<$60k)', 'Middle Income ($60k-$90k)', 'Affluent (>$90k)', 'All']]
print(ct)

print("\n" + "="*80)
print("TABLE 3: METAPHOR PROPORTIONS AMONG COGNITIVE METAPHORS (COLUMN %)")
print("="*80)
ct_pct = pd.crosstab(df_met['primary_metaphor'], df_met['income_tier'], normalize='columns') * 100
ct_pct = ct_pct[['Low Income (<$60k)', 'Middle Income ($60k-$90k)', 'Affluent (>$90k)']]
print(ct_pct.round(1))

print("\n" + "="*80)
print("TABLE 4: STANCE BREAKDOWN BY INCOME TIER")
print("="*80)
st_ct = pd.crosstab(df['dominant_stance'], df['income_tier'], margins=True)
st_ct = st_ct[['Low Income (<$60k)', 'Middle Income ($60k-$90k)', 'Affluent (>$90k)', 'All']]
print(st_ct)

print("\n" + "="*80)
print("TABLE 5: TOP CITIES IN EACH TIER")
print("="*80)
for tier in ['Low Income (<$60k)', 'Middle Income ($60k-$90k)', 'Affluent (>$90k)']:
    print(f"\n--- {tier} ---")
    sub = df[df['income_tier'] == tier]
    top = sub.groupby(['place_names', 'st_fips', 'median_household_income', 'poverty_rate_pct']).size().reset_index(name='snippets').sort_values('snippets', ascending=False).head(5)
    print(top.to_string(index=False))
