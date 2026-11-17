import os
import sys
from app import MediaRelationsExchangeApp

print("Testing MediaRelationsExchangeApp initialization and competition run...")
app = MediaRelationsExchangeApp()

# Verify initial data state
print(f"Loaded agencies: {len(app.agencies)}")
assert len(app.agencies) == 55, f"Expected 55 agencies, got {len(app.agencies)}"

# Check first agency
agency_0 = app.agencies[0]
print(f"Agency 0: {agency_0.get('agency_name')} (Specialty: {agency_0.get('agency_specialty')})")
assert "agency_name" in agency_0
assert "agency_specialty" in agency_0

# Test Research Snippet preset
app.set_preset_rfp("Notes on Race and Politics: Social construction of race, bonding vs. bridging social capital, hunkering, colorblindness, and carceral surveillance.")
print("Research snippet set:", app.rfp_text.get("1.0", "end-1c"))

# Run competition
app.run_agency_competition()

print(f"Competition completed with {len(app.current_competition_results)} results.")
assert len(app.current_competition_results) == 55

top1 = app.current_competition_results[0]
agency_top = top1["agency"]
prop = top1["proposal"]

print(f"Top Book Section: {agency_top.get('agency_name')} with {top1['proposal_fit']:.2f}% relevance!")
print(f"Paper Title: {prop['research_pitch']['title']}")
print(f"Bridging Moves: {len(prop['conceptual_bridge']['bridging_moves'])}")
print(f"Case Strategy: {prop['empirical_design']['case_strategy'][:90]}...")

assert prop["research_pitch"]["title"]
assert prop["conceptual_bridge"]["bridging_moves"]
assert prop["empirical_design"]["abstract_draft"]

# Check exchange tree rows
items = app.exchange_tree.get_children()
print(f"Exchange tree rows: {len(items)}")
assert len(items) == 55

# Check angles directory
angles = app.angles_tree.get_children()
print(f"Angles directory rows: {len(angles)}")
assert len(angles) >= 200

# Destroy cleanly
app.destroy()
print("All Media Relations Exchange verification checks PASSED successfully!")
