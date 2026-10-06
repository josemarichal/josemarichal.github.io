# Project: Thousand Oaks Civic Knowledge Graph
**Category / Focus:** Civic AI • Open Governance  
**Workspace Location:** `projects/thousand_oaks_civic_knowledge_graph/`  
**Live Interface / URL:** [thousand_oaks_civic_graph.html](thousand_oaks_civic_graph.html)

> **Antigravity Context Rule**: This file is the primary memory and decision log for this project. Whenever the user modifies, reviews, or makes architectural decisions regarding this project, the agent must update this document.

---

## 1. Project Overview & Research Mission
An automated civic intelligence pipeline and interactive knowledge graph tracking Thousand Oaks City Council, Planning Commission, and COSCA meetings from @ctomeetings. Visualizes voting records, ordinances, developers, and deep links into video timestamps.

---

## 2. Key Files & Resources
- **Card Image:** `images/to_civic_graph.jpg`
- **Core File:** `thousand_oaks_civic_graph.html`
- **Core File:** `to_council_aggregator/scraper.py`
- **Core File:** `to_council_aggregator/council_sessions.json`
- **Core File:** `images/to_civic_graph.jpg`

---

## 3. Decision Log & Project Memory
| Date | Decision / Architectural Choice | Rationale & Context |
| :--- | :--- | :--- |
| 2026-10-03 | **Adapted Council Data Project for Thousand Oaks** | Switched from complex cloud infra to a lightweight, zero-dependency local Python aggregator (`to_council_aggregator/`) tracking @ctomeetings. |
| 2026-10-03 | **Restructured Knowledge Graph by Policy Topics** | Reorganized the visual graph from purely meeting-session nodes to policy domain hubs: Affordable Housing, Open Space, Economic Development, Public Safety, and Governance. |
| 2026-10-03 | **Deployed Fullscreen Interactive Graph on GitHub Pages** | Added full-screen cytoscape canvas, auto-fit controls, searchable topic dossiers, and timestamped video deep links at `thousand_oaks_civic_graph.html`. |
| 2026-10-05 | **Synthesized Agenda Action Summaries in Municipal Briefings** | Enhanced both the Briefings view and Graph Node Inspector with in-depth summaries, formal outcomes (e.g. Ordinance 1750-NS 5-0 vote, Amgen Specific Plan Oct 13 hearing, Hillcrest Homes DDA, COSCA Native Plant Palooza), policy category pills, and deep timestamp links. |
| 2026-10-05 | **Universal Paragraph Summaries Across All Graph Nodes** | Enriched every node in the knowledge graph (all 45 topics, elected officials, planning commissioners, COSCA trustees, organizations, and meeting sessions) with dedicated substantive paragraph summaries displayed in the inspector drawer upon opening. |
| 2026-10-06 | **Hillcrest Homes DDA Policy Analysis** | Synthesized legal and municipal brief for the Hillcrest Homes Disposition & Development Agreement (DDA), detailing its link to Ordinance 1750-NS fee waivers, Planning Commission approval, and Oct 13 City Council hearing. |
| 2026-10-06 | **Analysis of 5 Pressing Housing Policy Issues** | Profiled the top 5 affordable housing challenges confronting City Council: PSH continuum bottleneck, Ordinance 1750-NS fee waivers, corridor infill DDAs vs neighborhood buffers, state ADU preemption vs affordability, and mobile home preservation. |
| 2026-10-06 | **Showcase Realignment to AI Tools** | Realigned from the critical research cluster in `projects.html` into `ai_tools.html` under Featured Applications and Custom AI Tools & Assistants. |

*(Agent instruction: When the user makes key decisions, adds dependencies, or changes project directions, append a new row above).* 

---

## 4. Current Status & Next Steps
- [x] Registered in `ai_tools.html` featured showcase grid
- [ ] Detail data collection / code implementation
- [ ] Create interactive demonstrator / policy report

---

## 5. Agent Instructions for Antigravity
1. When answering questions about this project, read this file to immediately get up to speed on the current state and prior decisions.
2. Keep the **Key Files & Resources** list updated whenever new scripts, data files, or HTML pages are created.
3. Maintain the **Decision Log** with clear dates and rationales whenever the user approves changes.