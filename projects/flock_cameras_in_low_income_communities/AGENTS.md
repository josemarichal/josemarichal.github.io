# Project: Flock Cameras in Low-Income Communities
**Category / Focus:** Automated Policing • Civil Liberties  
**Workspace Location:** `projects/flock_cameras_in_low_income_communities/`  
**Live Interface / URL:** In development

> **Antigravity Context Rule**: This file is the primary memory and decision log for this project. Whenever the user modifies, reviews, or makes architectural decisions regarding this project, the agent must update this document.

---

## 1. Project Overview & Research Mission
An empirical investigation into the spatial concentration of automated license plate readers (ALPR) across Southern California. Examines how privatized surveillance infrastructure disproportionately monitors marginalized neighborhoods, generates automated suspicion networks, and reshapes municipal civil rights.

---

## 2. Key Files & Resources
- **Card Image:** `images/flock_cameras.jpg`
- **Core File:** `projects.html`
- **Downloaded Metadata:** [`projects/flock_cameras_in_low_income_communities/data/meta_localview.parquet`](file:///c:/Users/jfmar/josemarichal/github.io/projects/flock_cameras_in_low_income_communities/data/meta_localview.parquet) (34.25 MB)
- **Filtered 2025 Metadata:** [`projects/flock_cameras_in_low_income_communities/data/meta_2025_plus.csv`](file:///c:/Users/jfmar/josemarichal/github.io/projects/flock_cameras_in_low_income_communities/data/meta_2025_plus.csv) (37,655 meetings)
- **Streaming Extractor Pipeline:** [`projects/flock_cameras_in_low_income_communities/stream_flock_extractor.py`](file:///c:/Users/jfmar/josemarichal/github.io/projects/flock_cameras_in_low_income_communities/stream_flock_extractor.py)
- **Stone Metaphor Classifier:** [`projects/flock_cameras_in_low_income_communities/classify_stone_metaphors.py`](file:///c:/Users/jfmar/josemarichal/github.io/projects/flock_cameras_in_low_income_communities/classify_stone_metaphors.py)
- **Census Socioeconomic Ingestion Pipeline:** [`projects/flock_cameras_in_low_income_communities/fetch_census_income.py`](file:///c:/Users/jfmar/josemarichal/github.io/projects/flock_cameras_in_low_income_communities/fetch_census_income.py)
- **Extracted National Dataset:** [`projects/flock_cameras_in_low_income_communities/data/flock_snippets_2025.csv`](file:///c:/Users/jfmar/josemarichal/github.io/projects/flock_cameras_in_low_income_communities/data/flock_snippets_2025.csv) (3,581 snippets, 852 meetings, 270 jurisdictions)
- **Stone Coded Dataset:** [`projects/flock_cameras_in_low_income_communities/data/flock_snippets_stone_coded.csv`](file:///c:/Users/jfmar/josemarichal/github.io/projects/flock_cameras_in_low_income_communities/data/flock_snippets_stone_coded.csv)
- **Census Indicators by Jurisdiction:** [`projects/flock_cameras_in_low_income_communities/data/jurisdiction_census_metrics.csv`](file:///c:/Users/jfmar/josemarichal/github.io/projects/flock_cameras_in_low_income_communities/data/jurisdiction_census_metrics.csv) (270 jurisdictions, 100% matched)
- **Merged Metaphor & Census Dataset:** [`projects/flock_cameras_in_low_income_communities/data/flock_snippets_stone_with_census.csv`](file:///c:/Users/jfmar/josemarichal/github.io/projects/flock_cameras_in_low_income_communities/data/flock_snippets_stone_with_census.csv)
- **Empirical Research Report:** [`projects/flock_cameras_in_low_income_communities/income_equity_narrative_report.md`](file:///c:/Users/jfmar/josemarichal/github.io/projects/flock_cameras_in_low_income_communities/income_equity_narrative_report.md)

---

## 3. Decision Log & Project Memory
| Date | Decision / Architectural Choice | Rationale & Context |
| :--- | :--- | :--- |
| 2026-10-27 | **Census ACS 5-Year Socioeconomic Integration & Cross-Tabulation Completed** | Successfully mapped all 270 deliberation jurisdictions to U.S. Census Bureau ACS 5-Year summary files (B19013 Median Household Income, B01003 Total Population, B17001 Poverty Status) via streaming FTP without saving large raw files. Achieved a 100.0% match rate (95 Low-Income <$60k, 96 Middle-Income $60k-$90k, 79 Affluent >$90k). Core empirical findings: (1) The "Virtual Moat / Fortress" justification is 100% concentrated in low-income jurisdictions seeking federal earmarks (Hopewell, VA; Chester County, SC); (2) "Force Multiplier" acts as an austerity labor-substitute in low-income cities vs. "Smart City" data integration in affluent suburbs; (3) Affluent cities exhibit less than half the deliberative contestation rate (98.1% routine procedural consent). Published full report in `income_equity_narrative_report.md`. |
| 2026-10-27 | **National Corpus Extraction & Stone Coding Completed** | Streamed all 3 LocalView tar archives (5.1 GB raw) directly in-memory across 37,655 candidate meetings (Jan 2025–Apr 2026). Extracted 3,581 Flock/ALPR discussion snippets across 852 public meetings in 267 US cities (e.g. Eugene, Burbank, El Paso, Tucson, Atlanta, Boston, Thornton). Classified 124 explicit Deborah Stone metaphor occurrences (54 Force Multiplier, 47 Slippery Slope/Surveillance State, 11 Digital Dragnet, 4 Virtual Moat/Fortress, 4 Sensory Organism, 4 Guilt Presumption). Disk footprint remained <5 MB total. |
| 2026-10-27 | **Harvard LocalView Corpus & Stone Metaphor Framework** | Integrated Harvard Dataverse LocalView V3 dataset (`meta_localview.parquet` + transcripts tar archives). Established research design to extract Flock camera debate snippets (≥ Jan 2025, ±100-word context window) and code them against Deborah Stone's metaphor taxonomy (*Policy Paradox* Ch. 6: Force Multiplier, Virtual Moat/Fortress, Extra Eyes/Ears vs. Digital Dragnet, Slippery Slope, Corporate Enclosure). Designed zero-bloat streaming pipeline to avoid multi-gigabyte local disk extraction. |
| 2026-10-04 | **Project Inception & Framing** | Established research initiative investigating the disproportionate spatial placement of automated license plate readers (ALPR) in low-income neighborhoods and its civil liberties consequences. |

*(Agent instruction: When the user makes key decisions, adds dependencies, or changes project directions, append a new row above).* 

---

## 4. Current Status & Next Steps
- [x] Registered in `projects.html` showcase grid
- [x] Downloaded and verified `meta_localview.parquet` (305,024 meetings total; 37,655 in 2025+)
- [x] Built and ran `stream_flock_extractor.py` across all 3 Dataverse tar archives (zero disk bloat)
- [x] Extracted 3,581 snippets (±100 words) from 852 meetings across 270 jurisdictions
- [x] Built and ran `classify_stone_metaphors.py` across all 3,581 snippets
- [x] Connect Census ACS data to `st_fips` to evaluate metaphor use vs. city median income & poverty rate (100% matched)
- [x] Produce empirical equity narrative report (`income_equity_narrative_report.md`)
- [ ] Build interactive research explorer / policy demonstrator for the Working Group showcase

---

## 5. Agent Instructions for Antigravity
1. When answering questions about this project, read this file to immediately get up to speed on the current state and prior decisions.
2. Keep the **Key Files & Resources** list updated whenever new scripts, data files, or HTML pages are created.
3. Maintain the **Decision Log** with clear dates and rationales whenever the user approves changes.