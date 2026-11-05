# Project: Stakeholder Policy Analyst
**Category / Focus:** Civic AI Prototype  
**Workspace Location:** `projects/stakeholder_policy_analyst/`  
**Live Interface / URL:** [`stakeholder_simulation_dashboard.html`](file:///c:/Users/jfmar/josemarichal/github.io/stakeholder_simulation_dashboard.html) &bull; [Gemini Gem](https://gemini.google.com/gem/1djIRtKh7-yx1C3N4nKKTll2ARakavllK?usp=sharing)

> **Antigravity Context Rule**: This file is the primary memory and decision log for this project. Whenever the user modifies, reviews, or makes architectural decisions regarding this project, the agent must update this document.

---

## 1. Project Overview & Research Mission
Simulating diverse stakeholder reactions to proposed local government policies using an orthogonal, double-blind two-layer architecture: (1) Sabatier's Advocacy Coalition Framework (ACF) as the character constructor (`The Hydrator`), and (2) Deborah Stone's *Policy Paradox* (10 Causal Stories, Narrative Arcs, and Symbolic Devices) as the blinded experimental treatments (`The Strategist`). Includes an automated 4-stage Monte Carlo simulation pipeline (`N=500` runs / `4,000` stakeholder shifts) testing rhetorical strategies for terminating a suburban Automated License Plate Reader (ALPR) surveillance contract.

---

## 2. Key Files & Resources
- **Card Image:** `images/slide_1.png`
- **Interactive Dashboard:** [`stakeholder_simulation_dashboard.html`](file:///c:/Users/jfmar/josemarichal/github.io/stakeholder_simulation_dashboard.html)
- **External Prototype / Gem URL:** [https://gemini.google.com/gem/1djIRtKh7-yx1C3N4nKKTll2ARakavllK?usp=sharing](https://gemini.google.com/gem/1djIRtKh7-yx1C3N4nKKTll2ARakavllK?usp=sharing)
- **Rhetorical Library (10 Pure Stone Treatments):** [`projects/stakeholder_policy_analyst/rhetorical_library_stone.json`](file:///c:/Users/jfmar/josemarichal/github.io/projects/stakeholder_policy_analyst/rhetorical_library_stone.json)
- **Hydrator Control Baseline (8 Anonymized ACF Personas):** [`projects/stakeholder_policy_analyst/hydrator_controls.json`](file:///c:/Users/jfmar/josemarichal/github.io/projects/stakeholder_policy_analyst/hydrator_controls.json)
- **N=500 Agentic Loop Simulation Engine:** [`projects/stakeholder_policy_analyst/simulate_500_runs.py`](file:///c:/Users/jfmar/josemarichal/github.io/projects/stakeholder_policy_analyst/simulate_500_runs.py)
- **SQLite Experimental Database (500 runs / 4,000 stakeholder shifts):** [`projects/stakeholder_policy_analyst/policy_experiment.db`](file:///c:/Users/jfmar/josemarichal/github.io/projects/stakeholder_policy_analyst/policy_experiment.db)
- **CSV Exports:** [`projects/stakeholder_policy_analyst/simulation_runs_500.csv`](file:///c:/Users/jfmar/josemarichal/github.io/projects/stakeholder_policy_analyst/simulation_runs_500.csv) & [`projects/stakeholder_policy_analyst/stakeholder_shifts_4000.csv`](file:///c:/Users/jfmar/josemarichal/github.io/projects/stakeholder_policy_analyst/stakeholder_shifts_4000.csv)

---

## 3. Decision Log & Project Memory
| Date | Decision / Architectural Choice | Rationale & Context |
| :--- | :--- | :--- |
| 2026-10-04 | **Card Added to Civic AI Portfolio** | Added to projects.html under Civic AI Prototype. |
| 2026-11-05 | **4-Stage N=500 Experimental Pipeline & Stone Causal Story Library** | Built `hydrator_controls.json`, `rhetorical_library_stone.json`, `simulate_500_runs.py`, and `policy_experiment.db`. Decoupled PPI arithmetic from LLM generation so Python deterministically computes weighted PPI and Key Veto-Player neutrality (`Weight 10 >= 40`). |
| 2026-11-05 | **Double-Blind Orthogonal Suburban ALPR Termination Experiment & Dashboard** | Refactored the pipeline to eliminate tautological recursion and fully anonymized the municipality, stakeholder names, and quotes: (1) `The Hydrator` constructs 8 anonymized suburban council/civic personas (`S1`–`S8`) strictly via Sabatier's Advocacy Coalition Framework (ACF); (2) `The Strategist` contains 10 pure Deborah Stone *Policy Paradox* rhetorical treatments; (3) `The Arena` is double-blinded, receiving only the unlabeled podium speech text. Published `stakeholder_simulation_dashboard.html` and linked from `projects.html` and `ai_tools.html`. |

*(Agent instruction: When the user makes key decisions, adds dependencies, or changes project directions, append a new row above).* 

---

## 4. Current Status & Next Steps
- [x] Registered in `projects.html` and `ai_tools.html` showcase grids
- [x] Detail data collection / code implementation (`simulate_500_runs.py`, `rhetorical_library_stone.json`, `hydrator_controls.json`, `policy_experiment.db`)
- [x] Create interactive demonstrator / policy report (`stakeholder_simulation_dashboard.html`)

---

## 5. Agent Instructions for Antigravity
1. When answering questions about this project, read this file to immediately get up to speed on the current state and prior decisions.
2. Keep the **Key Files & Resources** list updated whenever new scripts, data files, or HTML pages are created.
3. Maintain the **Decision Log** with clear dates and rationales whenever the user approves changes.
