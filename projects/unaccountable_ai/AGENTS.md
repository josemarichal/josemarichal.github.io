# Project: Unaccountable AI
**Category / Focus:** Civic AI Prototype  
**Workspace Location:** `projects/unaccountable_ai/`  
**Live Interface / URL:** `projects/unaccountable_ai/meta_takedowns_map.html`

> **Antigravity Context Rule**: This file is the primary memory and decision log for this project. Whenever the user modifies, reviews, or makes architectural decisions regarding this project, the agent must update this document.

---

## 1. Project Overview & Research Mission
Should we let AI go rogue? Investigating opaque automated moderation, algorithmic deplatforming, and unaccountable AI enforcement across civic, community, and small-business spaces.

---

## 2. Key Files & Resources
- **Card Image:** `images/synthetic_citizen.jpg`
- **Harvester Script:** `projects/unaccountable_ai/harvest_meta_takedowns.py`
- **Clustering & Map Script:** `projects/unaccountable_ai/cluster_meta_takedowns.py`
- **Raw Takedown Dataset:** `projects/unaccountable_ai/meta_takedowns_raw.csv`
- **Clustered Takedown Catalog:** `projects/unaccountable_ai/meta_takedowns_catalog.csv`
- **Interactive Cluster Distance Map:** `projects/unaccountable_ai/meta_takedowns_map.html`

---

## 3. Decision Log & Project Memory
| Date | Decision / Architectural Choice | Rationale & Context |
| :--- | :--- | :--- |
| 2026-10-04 | **Card Added to Civic AI Portfolio** | Added to projects.html under Civic AI Prototype. |
| 2026-11-02 | **Meta Page Takedown Exhaust Harvester & UMAP Clustering** | Built a multi-source "takedown exhaust" pipeline (`harvest_meta_takedowns.py` + `cluster_meta_takedowns.py`) harvesting 429 press/community reports of Facebook & Instagram pages shut down or suspended by Meta's automated moderation, embedding them with `all-MiniLM-L6-v2` + UMAP, and clustering into 7 page-type & moderation-trigger archetypes (`meta_takedowns_map.html`). |

*(Agent instruction: When the user makes key decisions, adds dependencies, or changes project directions, append a new row above).* 

---

## 4. Current Status & Next Steps
- [x] Registered in `projects.html` showcase grid
- [x] Detail data collection / code implementation (`harvest_meta_takedowns.py`, `cluster_meta_takedowns.py`)
- [x] Create interactive demonstrator / cluster map (`meta_takedowns_map.html`)

---

## 5. Agent Instructions for Antigravity
1. When answering questions about this project, read this file to immediately get up to speed on the current state and prior decisions.
2. Keep the **Key Files & Resources** list updated whenever new scripts, data files, or HTML pages are created.
3. Maintain the **Decision Log** with clear dates and rationales whenever the user approves changes.
