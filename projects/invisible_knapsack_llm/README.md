# Unpacking the Invisible Knapsack of LLMs

Pilot audit testing Peggy McIntosh's (1989) everyday-privilege mechanisms across open-weight and frontier LLMs via Hugging Face Inference Providers.

## Probe Set (`mcintosh_probes.csv`)
- **12 matched-guise pairs (`24` prompts):** Identical everyday scenarios varying `white_coded` vs. `black_coded` names across four McIntosh dimensions:
  1. `individual_vs_group_attribution` (McIntosh #11, #14)
  2. `entitlement_vs_deescalation` (McIntosh #5, #13, #23)
  3. `frictionless_belonging` (McIntosh #4, #5, #6, #10)
  4. `institutional_benefit_of_doubt` (McIntosh #11, #22)
- **4 unmarked baseline prompts (`28` total):** Measuring unmarked racial defaults and canonical centering (McIntosh #1, #7).

## Usage
```powershell
$env:HF_TOKEN = "hf_..."
python run_knapsack_audit.py --pilot
python score_knapsack_pilot.py data/knapsack_responses_pilot.csv
```

