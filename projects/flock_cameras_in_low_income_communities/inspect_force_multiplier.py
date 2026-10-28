import pandas as pd

df = pd.read_csv('projects/flock_cameras_in_low_income_communities/data/flock_snippets_stone_with_census.csv')
fm = df[df['primary_metaphor'] == 'FORCE_MULTIPLIER_TOOL']

print(f"Total Force Multiplier snippets: {len(fm)}")
print("\nForce Multiplier by Income Tier:")
print(fm['income_tier'].value_counts())

print("\nForce Multiplier by Speaker Clues:")
print(fm['speaker_clues'].value_counts(dropna=False))

print("\nSample Force Multiplier from Low Income Tier (<$60k):")
for idx, r in fm[fm['income_tier'] == 'Low Income (<$60k)'].head(3).iterrows():
    print(f"\nPlace: {r['place_names']} | Income: ${r['median_household_income']:,.0f} | Poverty: {r['poverty_rate_pct']}%")
    print(f"Snippet: {r['snippet_100_words']}")
    print("-" * 60)

print("\nSample Force Multiplier from Affluent Tier (>$90k):")
for idx, r in fm[fm['income_tier'] == 'Affluent (>$90k)'].head(3).iterrows():
    print(f"\nPlace: {r['place_names']} | Income: ${r['median_household_income']:,.0f} | Poverty: {r['poverty_rate_pct']}%")
    print(f"Snippet: {r['snippet_100_words']}")
    print("-" * 60)
