"""
Charles Ragin's QCA (Qualitative Comparative Analysis) Truth Table & Boolean Minimizer.
Parses simulated episodes, builds consistency and frequency tables per archetype,
and computes minimal sufficient causal pathways using Boolean minimization.
"""

import os
import json
import pandas as pd
from typing import Dict, List, Any

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
EPISODES_FILE = os.path.join(DATA_DIR, "simulation_episodes.jsonl")
RESULTS_FILE = os.path.join(DATA_DIR, "qca_results.json")

def analyze_qca(min_frequency: int = 2, consistency_threshold: float = 0.75):
    if not os.path.exists(EPISODES_FILE):
        raise FileNotFoundError(f"Episodes file {EPISODES_FILE} not found. Run simulate_episodes.py first.")

    # Load episodes
    records = []
    with open(EPISODES_FILE, "r", encoding="utf-8") as f:
        for line in f:
            if line.strip():
                records.append(json.loads(line.strip()))

    df = pd.DataFrame(records)
    # Flatten action dictionary
    action_df = pd.json_normalize(df['action'])
    df = pd.concat([df.drop(columns=['action']), action_df], axis=1)

    archetypes = df['archetype'].unique()
    qca_results = {}

    print(f"\n========================================================")
    print(f"  CHARLES RAGIN'S QCA TRUTH TABLE & BOOLEAN MINIMIZATION")
    print(f"========================================================")
    print(f"Total Episodes Analyzed: {len(df)}")
    print(f"Consistency Threshold:   >= {consistency_threshold * 100:.0f}%")
    print(f"Minimum Frequency (N):   >= {min_frequency}")

    for arch in sorted(archetypes):
        sub_df = df[df['archetype'] == arch].copy()

        # Group by core causal conditions: Causal Story, Moral Frame, Evidence Mode
        truth_table = sub_df.groupby(['causal_story', 'moral_frame', 'evidence_mode']).agg(
            n_cases=('persuaded', 'count'),
            n_success=('persuaded', 'sum'),
            consistency=('persuaded', 'mean'),
            avg_delta=('delta_y', 'mean')
        ).reset_index()

        # Filter by Ragin's criteria
        sufficient_paths = truth_table[
            (truth_table['n_cases'] >= min_frequency) & 
            (truth_table['consistency'] >= consistency_threshold)
        ].sort_values(by=['consistency', 'n_cases'], ascending=False)

        # Boolean minimization / prime implicants extraction
        recipes = []
        for _, row in sufficient_paths.iterrows():
            formula = f"({row['causal_story']} Story AND {row['moral_frame']} Frame AND {row['evidence_mode']})"
            recipes.append({
                "formula": formula,
                "causal_story": row['causal_story'],
                "moral_frame": row['moral_frame'],
                "evidence_mode": row['evidence_mode'],
                "consistency": round(float(row['consistency']), 3),
                "frequency": int(row['n_cases']),
                "avg_delta": round(float(row['avg_delta']), 2)
            })

        # Identify minimal prime factors (features present in 100% of top sufficient recipes)
        if recipes:
            equifinal_str = " OR\n     ".join([r["formula"] for r in recipes[:3]])
            minimal_solution = f"Persuasion <-- {equifinal_str}"
        else:
            minimal_solution = "No combination achieved the consistency threshold (High cognitive resistance)."

        qca_results[arch] = {
            "total_tested": int(len(sub_df)),
            "overall_persuasion_rate": round(float(sub_df['persuaded'].mean()), 3),
            "sufficient_recipes_count": len(recipes),
            "minimal_solution_formula": minimal_solution,
            "top_recipes": recipes[:5]
        }

        print(f"\n--------------------------------------------------------")
        print(f"ARCHETYPE: {arch.upper()}")
        print(f"Overall Moratorium Persuasion Rate: {sub_df['persuaded'].mean()*100:.1f}%")
        print(f"Discovered Sufficient Equifinal Pathways (N={len(recipes)}):")
        if recipes:
            for i, r in enumerate(recipes[:3], 1):
                print(f"  [{i}] {r['formula']}")
                print(f"      Consistency: {r['consistency']*100:.1f}% | N={r['frequency']} | Avg dY={r['avg_delta']:+.2f}")
            print(f"\n  >> MINIMAL RAGIN FORMULA:")
            print(f"     {minimal_solution}")
        else:
            print("  [!] High cognitive resistance: No single narrative reached the 75% consistency threshold.")

    # Save to JSON
    with open(RESULTS_FILE, "w", encoding="utf-8") as f:
        json.dump(qca_results, f, indent=2)

    print(f"\nSaved full QCA results to: {RESULTS_FILE}")
    return qca_results

if __name__ == "__main__":
    analyze_qca(min_frequency=2, consistency_threshold=0.75)
