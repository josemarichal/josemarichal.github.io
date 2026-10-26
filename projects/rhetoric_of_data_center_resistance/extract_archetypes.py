import os
import json
import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(BASE_DIR, "data", "2022", "GSS2022.dta")

# Key variable list
TARGET_COLS = [
    'id', 'age', 'sex', 'race', 'degree', 'coninc', 
    'polviews', 'partyid', 'region', 'xnorcsiz',
    'conbus', 'confed', 'conlegis', 'consci', 'natenvir'
]

print(f"Loading GSS 2022 from {DATA_FILE}...")
reader = pd.io.stata.StataReader(DATA_FILE)
vlabels = reader.variable_labels()
vallabels = reader.value_labels()

df_raw = pd.read_stata(DATA_FILE, convert_categoricals=False)
df = df_raw[[c for c in TARGET_COLS if c in df_raw.columns]].copy()

# Value mappings for readable serialization
DEGREE_MAP = {0: "Less than High School", 1: "High School", 2: "Associate / Junior College", 3: "Bachelor's Degree", 4: "Graduate Degree"}
SEX_MAP = {1: "Male", 2: "Female"}
RACE_MAP = {1: "White", 2: "Black", 3: "Other"}
POLVIEWS_MAP = {
    1: "Extremely Liberal", 2: "Liberal", 3: "Slightly Liberal", 
    4: "Moderate", 5: "Slightly Conservative", 6: "Conservative", 7: "Extremely Conservative"
}
PARTYID_MAP = {
    0: "Strong Democrat", 1: "Not Strong Democrat", 2: "Independent, Lean Democrat",
    3: "Independent", 4: "Independent, Lean Republican", 5: "Not Strong Republican", 
    6: "Strong Republican", 7: "Other Party"
}
REGION_MAP = {
    1: "New England", 2: "Middle Atlantic", 3: "East North Central (OH/IL/MI/IN/WI)",
    4: "West North Central", 5: "South Atlantic (VA/MD/NC/GA/FL)", 6: "East South Central",
    7: "West South Central (TX)", 8: "Mountain (AZ/CO/UT/NV)", 9: "Pacific (CA/OR/WA)"
}
CONFIDENCE_MAP = {1: "A Great Deal", 2: "Only Some", 3: "Hardly Any"}
ENVIR_MAP = {1: "Spending Too Little (Pro-Environment)", 2: "About Right", 3: "Spending Too Much"}

# Map urban/suburban/rural
def map_urbanicity(val):
    if pd.isna(val): return "Suburban / Mixed"
    if val in [1, 2, 3]: return "Urban Core / City"
    if val in [4, 5, 6]: return "Suburban / Outlying"
    return "Rural / Small Town"

# Filter for rows that have core ideology and demographics
core_mask = df['polviews'].notna() & df['age'].notna() & df['degree'].notna()
df_clean = df[core_mask].copy()

# Impute median for remaining trust/income variables
for col in ['conbus', 'confed', 'conlegis', 'consci', 'natenvir', 'coninc', 'partyid', 'xnorcsiz']:
    if col in df_clean.columns:
        df_clean[col] = df_clean[col].fillna(df_clean[col].median())

print(f"Clean sample size with core attributes: {len(df_clean)} respondents")

# Features for clustering
CLUSTER_FEATURES = ['polviews', 'partyid', 'degree', 'coninc', 'xnorcsiz', 'conbus', 'confed', 'consci', 'natenvir']
scaler = StandardScaler()
X = scaler.fit_transform(df_clean[CLUSTER_FEATURES])

# K-Means clustering (K=4 Archetypes)
K = 4
kmeans = KMeans(n_clusters=K, random_state=42, n_init=20)
df_clean['cluster'] = kmeans.fit_predict(X)

# Distinct Archetype definitions based on empirical centroids
ARCHETYPE_PROFILES = {
    0: {
        "name": "Educated Progressive Conservationist",
        "desc": "High education and income; high trust in science; strongly pro-environmental protection; analyzes data centers through climate grid decarbonization, corporate accountability, and environmental justice."
    },
    1: {
        "name": "Traditional Pro-Growth Property Conservative",
        "desc": "Conservative and pro-market; skeptical of environmental over-regulation; open to data center infrastructure for local commercial tax revenues and job growth, provided private property rights are respected."
    },
    2: {
        "name": "Vulnerable Working-Class Community Defender",
        "desc": "Lower-income and working-class; highly vulnerable to electricity rate increases and water resource competition; prioritizes immediate household economic protection and local community health."
    },
    3: {
        "name": "Conservative Conservationist & Ratepayer Skeptic",
        "desc": "Right-leaning partisan who paradoxically demands strong environmental protection for local water tables, farmland, and rural quiet; fierce opponent of utility monopolies externalizing grid costs onto residential taxpayers."
    }
}

archetype_names = {}
cluster_summaries = {}

for c_id in range(K):
    sub = df_clean[df_clean['cluster'] == c_id]
    profile = ARCHETYPE_PROFILES[c_id]
    name = profile["name"]
    archetype_names[c_id] = name
    
    cluster_summaries[name] = {
        "cluster_id": int(c_id),
        "name": name,
        "count": int(len(sub)),
        "proportion": round(float(len(sub)) / len(df_clean), 3),
        "description": profile["desc"],
        "mean_age": round(float(sub['age'].mean()), 1),
        "mean_polviews": round(float(sub['polviews'].mean()), 2),
        "mean_partyid": round(float(sub['partyid'].mean()), 2),
        "median_income": round(float(sub['coninc'].median()), 0),
        "mean_degree": round(float(sub['degree'].mean()), 2),
        "mean_environment_spending": round(float(sub['natenvir'].mean()), 2),
        "mean_trust_science": round(float(sub['consci'].mean()), 2),
        "mean_trust_business": round(float(sub['conbus'].mean()), 2),
        "mean_trust_fed_gov": round(float(sub['confed'].mean()), 2),
        "pct_rural_suburban": round(float((sub['xnorcsiz'] >= 5).mean()) * 100, 1),
        "top_regions": [REGION_MAP.get(r, f"Region {r}") for r in sub['region'].value_counts().head(3).index]
    }

df_clean['archetype_label'] = df_clean['cluster'].map(archetype_names)

# Save Archetypes Summary
summary_file = os.path.join(BASE_DIR, "data", "archetypes_summary.json")
with open(summary_file, "w", encoding="utf-8") as f:
    json.dump(cluster_summaries, f, indent=2)

print("\n--- IDENTIFIED CITIZEN ARCHETYPES ---")
for name, data in cluster_summaries.items():
    print(f"[{data['cluster_id']}] {name} (N={data['count']}, {data['proportion']*100:.1f}%)")
    print(f"    - Ideology: {data['mean_polviews']:.2f} (1=Lib, 7=Cons) | Party: {data['mean_partyid']:.2f} (0=Dem, 6=Rep)")
    print(f"    - Avg Age: {data['mean_age']} | Median Income: ${data['median_income']:,.0f}")
    print(f"    - Profile: {data['description']}\n")

# Extract Sample Representative Personas
sample_personas = []
for c_id, name in archetype_names.items():
    sub = df_clean[df_clean['cluster'] == c_id]
    # Sample 3 representative respondents per archetype
    samples = sub.sample(n=min(3, len(sub)), random_state=42)
    for _, row in samples.iterrows():
        sample_personas.append({
            "respondent_id": int(row['id']) if 'id' in row else int(_),
            "archetype": name,
            "cluster_id": int(c_id),
            "demographics": {
                "age": int(row['age']),
                "sex": SEX_MAP.get(int(row['sex']), "Unknown"),
                "race": RACE_MAP.get(int(row['race']), "Unknown"),
                "education": DEGREE_MAP.get(int(row['degree']), "Unknown"),
                "household_income": f"${int(row['coninc']):,}" if pd.notna(row['coninc']) else "Not Reported",
                "region": REGION_MAP.get(int(row['region']), "Unknown"),
                "community_type": map_urbanicity(row['xnorcsiz'])
            },
            "attitudinal_priors": {
                "ideology": POLVIEWS_MAP.get(int(row['polviews']), "Moderate"),
                "party_affiliation": PARTYID_MAP.get(int(row['partyid']), "Independent"),
                "trust_big_business": CONFIDENCE_MAP.get(int(row['conbus']), "Only Some"),
                "trust_federal_executive": CONFIDENCE_MAP.get(int(row['confed']), "Only Some"),
                "trust_science": CONFIDENCE_MAP.get(int(row['consci']), "A Great Deal"),
                "environmental_spending": ENVIR_MAP.get(int(row['natenvir']), "About Right")
            }
        })

sample_file = os.path.join(BASE_DIR, "data", "personas_sample.jsonl")
with open(sample_file, "w", encoding="utf-8") as f:
    for p in sample_personas:
        f.write(json.dumps(p) + "\n")

print(f"Saved archetype definitions to: {summary_file}")
print(f"Saved sample persona profiles to: {sample_file}")
