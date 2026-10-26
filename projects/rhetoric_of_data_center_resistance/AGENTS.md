# Project: Rhetoric of Data Center Resistance
**Category / Focus:** Environmental Justice • AI Infrastructure  
**Workspace Location:** `projects/rhetoric_of_data_center_resistance/`  
**Live Interface / URL:** [`data_center_narrative_qca.html`](file:///c:/Users/jfmar/josemarichal/github.io/data_center_narrative_qca.html)

> **Antigravity Context Rule**: This file is the primary memory and decision log for this project. Whenever the user modifies, reviews, or makes architectural decisions regarding this project, the agent must update this document.

---

## 1. Project Overview & Research Mission
Critical discourse and policy analysis of grassroots civic resistance against hyperscale AI data centers. Investigating community mobilization over millions of gallons of daily cooling water, electrical grid strain, local tax abatements, and the physical material footprint of planetary AI compute.

---

## 2. Key Files & Resources
- **Card Image:** `images/data_center_resistance.jpg`
- **Core File:** `projects.html`
- **Core File:** `data_center_moratoriums.csv`
- **Interactive Simulator:** `data_center_narrative_qca.html`
- **Research Summary & Findings:** `projects/rhetoric_of_data_center_resistance/research_summary.md`
- **Related App:** `conference_paper_explorer.html` (Conference Paper Explorer & Field Interview Hub)
- **Knowledge Graph:** `conference_knowledge_graph.html` (4S 2026 Technopower Knowledge Graph & Top 10 Technology Hubs)
- **Graph Dataset:** `conference_knowledge_graph_data.js`
- **Card Image:** `images/data_center_resistance.jpg`

---

## 3. Decision Log & Project Memory
| Date | Decision / Architectural Choice | Rationale & Context |
| :--- | :--- | :--- |
| 2026-10-04 | **Linked Environmental & Grid Datasets** | Connected project to `data_center_moratoriums.csv` tracking local municipal moratoriums and utility disputes across the US. |
| 2026-10-04 | **Discursive Analysis Framing** | Focusing on local rhetoric around water consumption, grid reliability, and tax abatements vs. tech industry modernization narratives. |
| 2026-10-12 | **Integrated 4S 2026 Conference Papers & Interview Kits** | Connected Panel 286 papers (Livio on multispecies assemblages, Khalatbari on thermolabour, Sørensen on university data centres, Mirrlees & Szeman on Green AI) into `conference_paper_explorer.html` with field expert interview protocols. |
| 2026-10-12 | **Macro-Topology Knowledge Graph Built** | Created `conference_knowledge_graph.html` mapping 646 conference panels with vis-network, highlighting Hyperscale Data Centers & Cloud as the #2 largest technology node (58 papers), connecting directly to energy transition and digital sovereignty. |
| 2026-10-12 | **Granular Paper-Level Graph Breakdown & Deck Modal** | Extracted 2,118 conference papers and structured 741 papers across all 10 technology hubs in `conference_knowledge_graph_data.js`. Updated `conference_knowledge_graph.html` to list papers instead of static panel titles, added in-drawer search & panel accordion, and built a fullscreen "Browse Papers by Node" Deck modal with node switcher, panel jump pills, and live search. Excluded panel times and room locations. |
| 2026-10-19 | **Deborah Stone Causal Stories Framework Integration** | Reframed project showcase card as "Rhetoric of Data Centers and Causal Stories", applying Deborah Stone's policy paradox taxonomy to classify city council transcripts on data center resistance into the four causal story narratives (inadvertent, accidental, mechanical, intentional). |
| 2026-10-14 | **California Regulatory Framework Synthesis** | Analyzed California's landmark September 2026 data center legislative package (SB 887, SB 1168, AB 1577, AB 2469, AB 2619, SB 886, AB 2383) closing CEQA categorical exemptions, protecting residential electricity ratepayers, mandating water scarcity plans, and interfacing with Title 24 Energy Code & Air District diesel generator permits. |

| 2026-10-20 | **GSS 2022 Ingestion & Empirical Archetype Extraction** | Downloaded official NORC GSS 2022 cross-section (`GSS2022.dta`, $N=4,149$, 1,297 vars). Cleaned and clustered $N=3,784$ respondents across ideology, party ID, education, income, urbanicity, institutional trust (`conbus`, `confed`, `consci`), and environmental spending (`natenvir`). Extracted four distinct archetypes: (0) Educated Progressive Conservationist ($24.8\%$), (1) Traditional Pro-Growth Property Conservative ($12.1\%$), (2) Vulnerable Working-Class Community Defender ($35.2\%$), and (3) Conservative Conservationist & Ratepayer Skeptic ($28.0\%$). Serialized definitions to `data/archetypes_summary.json` and persona records to `data/personas_sample.jsonl`. |
| 2026-10-21 | **Narrative Action Space, Deliberation Environment & QCA Minimization Pipeline** | Built `action_space.py` ($1,600$ combinatorial NPF configurations), `narrative_realizer.py` (Deborah Stone domain templates + LLM hook), and `persona_environment.py` (calibrated on GSS priors). Executed $N=500$ simulation episodes across all 4 archetypes (`simulate_episodes.py`) and ran Boolean truth-table minimization (`qca_analyzer.py`). Discovered key equifinal recipes: (1) Pro-Growth Conservatives are persuaded exclusively through `Liberty Frame AND Lived Testimonial` (85.7% consistency); (2) Progressive Conservationists require `Intentional Story` paired with `Fairness` or `Harm/Legal Precedent` (80-100% consistency); (3) Working-Class Defenders exhibit equifinality across `Inadvertent`, `Intentional`, and `Mechanical` stories when paired with `Fairness Frame AND Lived Testimonial` (100% consistency). Results saved in `data/qca_results.json`. |
| 2026-10-21 | **Interactive Narrative QCA Web Simulator Deployed** | Designed and launched [`data_center_narrative_qca.html`](file:///c:/Users/jfmar/josemarichal/github.io/data_center_narrative_qca.html). Features interactive GSS 2022 Archetype explorer, real-time NPF Causal Story synthesizer, live in-silico deliberation reaction meters ($\Delta Y$), interactive Charles Ragin fsQCA Truth Tables with Boolean formula minimizer, and a searchable database of 430 US municipal moratoriums from `data_center_moratoriums.csv`. Linked in `projects.html`. |
*(Agent instruction: When the user makes key decisions, adds dependencies, or changes project directions, append a new row above).* 

---

## 4. Current Status & Next Steps
- [x] Registered in `projects.html` showcase grid
- [ ] Detail data collection / code implementation
- [ ] Create interactive demonstrator / policy report

---

## 5. Agent Instructions for Antigravity
1. When answering questions about this project, read this file to immediately get up to speed on the current state and prior decisions.
2. Keep the **Key Files & Resources** list updated whenever new scripts, data files, or HTML pages are created.
3. Maintain the **Decision Log** with clear dates and rationales whenever the user approves changes.