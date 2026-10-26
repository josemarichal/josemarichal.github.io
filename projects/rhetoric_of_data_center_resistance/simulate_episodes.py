"""
Simulation Orchestrator Module.
Executes batch Monte Carlo simulation runs across the 4 GSS citizen archetypes,
evaluating narrative actions and compiling the episode log for Charles Ragin's QCA truth table minimization.
"""

import os
import json
import random
from typing import List, Dict, Any
from action_space import ActionSpace, NarrativeAction
from narrative_realizer import NarrativeRealizer
from persona_environment import PersonaEnvironment

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
EPISODES_FILE = os.path.join(DATA_DIR, "simulation_episodes.jsonl")

def run_simulation(num_episodes_per_archetype: int = 100):
    env = PersonaEnvironment()
    space = ActionSpace()
    realizer = NarrativeRealizer(use_llm=False)

    # Unique archetypes
    archetypes = list(set(p["archetype"] for p in env.personas))
    print(f"Starting simulation: {num_episodes_per_archetype} episodes across {len(archetypes)} archetypes...")

    total_episodes = 0
    episodes_data = []

    for arch in sorted(archetypes):
        arch_personas = env.get_personas_by_archetype(arch)
        print(f"  Simulating archetype '{arch}' ({len(arch_personas)} persona profiles available)...")

        for ep in range(num_episodes_per_archetype):
            persona = random.choice(arch_personas)
            action = space.sample_random()
            narrative = realizer.realize(action)

            y_pre, y_post, delta_y, reasoning = env.evaluate_narrative_shift(persona, action, narrative)

            # Persuasion outcome threshold: +1.50 shift on 7-point scale
            persuaded = 1 if delta_y >= 1.50 else 0

            episode_record = {
                "episode_id": total_episodes + 1,
                "archetype": arch,
                "cluster_id": persona["cluster_id"],
                "respondent_id": persona["respondent_id"],
                "demographics": persona["demographics"],
                "action": action.to_dict(),
                "narrative_preview": narrative[:180] + "...",
                "y_pre": y_pre,
                "y_post": y_post,
                "delta_y": delta_y,
                "persuaded": persuaded,
                "reasoning": reasoning
            }

            episodes_data.append(episode_record)
            total_episodes += 1

    # Save to JSONL
    with open(EPISODES_FILE, "w", encoding="utf-8") as f:
        for ep in episodes_data:
            f.write(json.dumps(ep) + "\n")

    print(f"\n[DONE] Successfully executed {total_episodes} simulation episodes.")
    print(f"Saved dataset to: {EPISODES_FILE}")

    # Summary statistics
    import pandas as pd
    df_ep = pd.DataFrame(episodes_data)
    print("\n--- SIMULATION SUMMARY BY ARCHETYPE ---")
    summary = df_ep.groupby('archetype').agg(
        total_runs=('persuaded', 'count'),
        persuasion_rate=('persuaded', 'mean'),
        avg_delta=('delta_y', 'mean'),
        max_delta=('delta_y', 'max')
    ).round(3)
    summary['persuasion_rate_pct'] = (summary['persuasion_rate'] * 100).round(1).astype(str) + "%"
    print(summary[['total_runs', 'persuasion_rate_pct', 'avg_delta', 'max_delta']])

if __name__ == "__main__":
    run_simulation(num_episodes_per_archetype=125) # 500 total episodes
