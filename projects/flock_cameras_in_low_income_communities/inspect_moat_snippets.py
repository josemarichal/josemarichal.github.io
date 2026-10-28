import pandas as pd

df = pd.read_csv('projects/flock_cameras_in_low_income_communities/data/flock_snippets_stone_with_census.csv')
moat = df[df['primary_metaphor'] == 'VIRTUAL_MOAT_FORTRESS']

print(f"Total VIRTUAL_MOAT_FORTRESS snippets: {len(moat)}")
for idx, r in moat.iterrows():
    print(f"\nPlace: {r['place_names']} (FIPS {r['st_fips']})")
    print(f"Income: ${r['median_household_income']:,.0f} | Poverty: {r['poverty_rate_pct']}% | Tier: {r['income_tier']}")
    print(f"Speaker Clues: {r['speaker_clues']}")
    print(f"Snippet: {r['snippet_100_words']}\n" + "-"*70)
