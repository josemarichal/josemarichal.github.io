# Project: Performative Authenticity on Social Media (2026 State Legislative TikTok / Instagram Authenticity Database)
**Category / Focus:** Political Communication • Visual Authenticity • Short-Form Video  
**Workspace Location:** `projects/ca_2026_tiktok_authenticity/`  
**Live Interface / URL:** [`state_leg_tiktok_2026.html`](file:///c:/Users/jfmar/josemarichal/github.io/state_leg_tiktok_2026.html)

> **Antigravity Context Rule**: This file is the primary memory and decision log for this project. Whenever the user modifies, reviews, or makes architectural decisions regarding this project, the agent must update this document.

---

## 1. Project Overview & Research Mission
Investigating how state legislative candidates perform, stage, and negotiate "authenticity" across short-form video platforms (TikTok and Instagram Reels) during competitive election cycles. Bypassing the visual omission of official APIs (which only provide text captions/transcripts per Qi, Dave, & Ling 2025), this project archives direct clickable video URLs alongside objective metadata (views, likes, shares, original sounds, duration) for human student coding across a four-tier authenticity framework:
1. **Relinquished Control / UGC-Style:** Handheld selfie-cam, car/kitchen vlogs, unscripted walk-and-talks, Gen-Z staffer trends.
2. **Trend-Jacking:** Trending audios, CapCut templates, lip-syncs, viral meme formats.
3. **Campaign-Led Informational:** Direct-to-camera policy explainers, legislative breakdowns, town hall clips.
4. **Polished Promotional:** Cross-posted horizontal TV ads, rally sizzle reels, scripted teleprompter monologues, drone B-roll.

---

## 2. Key Files & Resources
- **Live Methodology & Dataset Page:** `state_leg_tiktok_2026.html`
- **Showcase Card Image:** `images/tiktok.png`
- **Root CSV Dataset Download:** `tiktok_authenticity_dataset_2026.csv` (and `student_coding_sheet.csv`)
- **Primary Student Coding Sheet (CSV):** `projects/ca_2026_tiktok_authenticity/data/student_coding_sheet.csv` ($N = 745$ campaign-window videos)
- **Interactive Browser Coding View (HTML):** `projects/ca_2026_tiktok_authenticity/data/student_coding_sheet.html`
- **Candidate & Handle Catalog (CSV):** `projects/ca_2026_tiktok_authenticity/data/ca_2026_tiktok_handles.csv` ($N = 201$ unique handles)
- **Paired Instagram Coding Sheet (HTML/CSV):** `projects/ca_2026_tiktok_authenticity/data/paired_ig_student_sheet.html` & `.csv` ($51/54$ candidates matched)
- **Master SQLite Database:** `projects/ca_2026_tiktok_authenticity/data/ca_2026_tiktok.db` ($12,075$ candidates, $201$ handles, $2,643$ total videos)
- **Harvester & Scraper Scripts:**
  - `projects/ca_2026_tiktok_authenticity/collect_tiktok_urls.py` (`yt-dlp` deduplicated collector)
  - `projects/ca_2026_tiktok_authenticity/crawl_ballotpedia_states.py` (Candidate & handle crawler)
  - `projects/ca_2026_tiktok_authenticity/discover_ig_for_54.py` (Instagram cross-platform matcher)
  - `projects/ca_2026_tiktok_authenticity/export_student_sheet.py` (HTML/CSV coding view exporter)

---

## 3. Decision Log & Project Memory
| Date | Decision / Architectural Choice | Rationale & Context |
| :--- | :--- | :--- |
| 2026-11-25 | **Published Showcase Card on Technology & Society Working Group Page (`projects.html`)** | Added "Performative Authenticity on Social Media" card to `projects.html` featuring `images/tiktok.png`, linking directly to `state_leg_tiktok_2026.html`, `student_coding_sheet.html`, and `tiktok_authenticity_dataset_2026.csv`. |
| 2026-11-24 | **Paired Instagram Profile & Reels Tab Matching ($51/54$ Candidates)** | Built `discover_ig_for_54.py` cross-referencing TikTok-active candidates against OpenStates and campaign web profiles, matching 51 candidates to Instagram handles for cross-platform visual authenticity comparison in `paired_ig_student_sheet.html`. |
| 2026-11-20 | **Exported Interactive Pre-Filled Student Coding Sheet ($N = 745$)** | Generated `student_coding_sheet.csv` and clickable `student_coding_sheet.html` bounded to the general-election campaign window (`2026-06-03` to `2026-11-15`) across CA ($35.8\%$), FL ($22.3\%$), CO ($21.2\%$), AZ ($16.6\%$), and CT ($4.0\%$). |
| 2026-11-19 | **Initialized Multi-State Legislative Candidate Roster & yt-dlp Collector** | Established SQLite schema (`ca_2026_tiktok.db`), indexed 12,075 state legislative candidates from OpenStates and Ballotpedia, discovered 201 unique handles, and archived 2,643 total videos via `collect_tiktok_urls.py`. |

---

## 4. Current Status & Next Steps
- [x] Registered in `projects.html` showcase grid
- [x] Methodology portal and live dataset published (`state_leg_tiktok_2026.html`)
- [x] Pre-filled student coding sheets generated for TikTok and Instagram
- [ ] Student human rubric coding batches deployed for inter-coder reliability checks
