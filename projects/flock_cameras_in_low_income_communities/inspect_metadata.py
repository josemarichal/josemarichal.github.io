import pandas as pd
import numpy as np

parquet_path = r"projects\flock_cameras_in_low_income_communities\data\meta_localview.parquet"
df = pd.read_parquet(parquet_path)

print("="*60)
print(f"Total Rows in Dataset: {len(df):,}")
print("Columns and Data Types:")
print(df.dtypes)
print("="*60)

# Inspect Dates
print("Date Column Exploration:")
meeting_dt = pd.to_datetime(df['meeting_date'], errors='coerce')
pub_dt = pd.to_datetime(df['published_at'], errors='coerce').dt.tz_localize(None)

# Combine: use meeting_date, fallback to published_at
combined_dt = meeting_dt.fillna(pub_dt)
df['clean_date'] = combined_dt

cutoff = pd.Timestamp('2025-01-01')
df_2025 = df[df['clean_date'] >= cutoff].copy()

print(f"Total meetings in LocalView: {len(df):,}")
print(f"Total meetings with Date >= 2025-01-01: {len(df_2025):,} ({len(df_2025)/len(df)*100:.2f}% of total corpus)")

# Breakdown of 2025+ by Year and Month
df_2025['year_month'] = df_2025['clean_date'].dt.to_period('M')
print("\nMonthly Distribution for 2025+:")
print(df_2025['year_month'].value_counts().sort_index())

# Check Top Places / Cities
print("\nTop 15 Cities / Places in 2025+:")
print(df_2025['place_names'].value_counts().head(15))

# Check Government Types
print("\nGovernment Types in 2025+:")
print(df_2025['government_type'].value_counts())

# Check mention of Flock or surveillance keywords in title or description!
flock_mask = (
    df_2025['title'].fillna('').str.contains(r'\b(flock|license\s*plate|alpr|surveillance)\b', case=False, regex=True) |
    df_2025['description'].fillna('').str.contains(r'\b(flock|license\s*plate|alpr|surveillance)\b', case=False, regex=True)
)
print(f"\nMeetings with Flock/ALPR/Surveillance directly in Title or Description: {flock_mask.sum():,}")
if flock_mask.sum() > 0:
    print("\nSample meetings where title/description explicitly flags surveillance:")
    sample_flock = df_2025[flock_mask][['clean_date', 'place_names', 'title']].head(10)
    for idx, row in sample_flock.iterrows():
        print(f" - [{row['clean_date'].strftime('%Y-%m-%d')}] {row['place_names']}: {row['title']}")

# Save 2025 metadata subset so we have it for fast lookup
subset_path = r"projects\flock_cameras_in_low_income_communities\data\meta_2025_plus.csv"
df_2025[['id', 'clean_date', 'place_names', 'st_fips', 'government_type', 'title', 'view_count', 'duration']].to_csv(subset_path, index=False)
print(f"\nSaved 2025 metadata subset to: {subset_path} ({df_2025.shape[0]:,} rows)")
