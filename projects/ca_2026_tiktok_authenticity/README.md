# 2026 California State Legislative TikTok Authenticity Database

Database and collection pipeline for archiving **TikTok URLs** and objective metadata across all **80 California State Assembly** and **20 up-for-election California State Senate** general-election races in 2026 (both incumbents and challengers), bounded to the **2026 campaign window** (`2026-06-03` post-primary through `2026-11-15`).

Designed so students can click straight through to each TikTok video and apply an authenticity rubric without having to manually log objective metadata.

## Workflow

1. **Initialize SQLite schema**
   ```powershell
   python init_db.py
   ```
   Creates `data/ca_2026_tiktok.db` with `candidates`, `tiktok_accounts`, `videos`, and `student_coding_view`.

2. **Build the 2026 CA Assembly & Senate Candidate Roster + Auto-Discover TikTok Handles**
   ```powershell
   python fetch_ca_2026_candidates.py
   ```
   - Parses Ballotpedia's 2026 California State Assembly & State Senate general election tables.
   - Crawls candidate campaign/Ballotpedia links for `tiktok.com/@...` handles.
   - Outputs `data/ca_2026_candidates.csv` and `data/ca_2026_tiktok_handles.csv` (where you can also manually add any missing `campaign` or `personal` handles—per Qi, Dave & Ling 2025, directories miss many non-official accounts).

3. **Collect Campaign-Window TikTok Video URLs via `yt-dlp`**
   ```powershell
   python collect_tiktok_urls.py --start-date 2026-06-03 --end-date 2026-11-15
   ```
   - Pulls video URLs and metadata for every handle in `data/ca_2026_tiktok_handles.csv` (or SQLite `tiktok_accounts`).
   - Flags `in_campaign_window = 1` for posts between `--start-date` and `--end-date`.

4. **Export Student Coding Sheet (CSV + Clickable HTML)**
   ```powershell
   python export_student_sheet.py
   ```
   - Generates `data/student_coding_sheet.csv` (with blank rubric columns for Excel/Google Sheets) and `data/student_coding_sheet.html` (sortable/filterable table with direct TikTok links).

