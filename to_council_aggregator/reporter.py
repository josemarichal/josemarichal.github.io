"""
Civic News Reporter for Thousand Oaks.
Generates structured Markdown and HTML briefings from municipal meeting summaries.
"""

import os
import json
import glob
from typing import Dict, Any

from config import (
    SUMMARIES_DIR,
    REPORTS_DIR,
    YOUTUBE_BASE_URL
)


def generate_markdown_report(summary: Dict[str, Any]) -> str:
    """Format meeting analysis into a clean, journalistic Markdown brief."""
    title = summary.get("title", "Municipal Meeting")
    body = summary.get("body_name", "City of Thousand Oaks")
    date_str = summary.get("display_date", summary.get("meeting_date", ""))
    url = summary.get("url", "")
    duration = summary.get("duration_str", "N/A")
    roll_call = summary.get("roll_call", [])
    items = summary.get("agenda_items", [])
    votes = summary.get("votes", [])
    exec_summary = summary.get("executive_summary", "")

    md = []
    md.append(f"# {body} Civic Brief")
    md.append(f"**Meeting Date:** {date_str}  ")
    md.append(f"**Full Broadcast:** [Watch on CTO Meetings ({duration})]({url})  \n")
    md.append("---\n")

    md.append("## Executive Summary")
    md.append(exec_summary)
    md.append("\n")

    # Attendance
    md.append("## Roll Call & Quorum")
    if roll_call:
        md.append("| Official | Status | Role |")
        md.append("| :--- | :--- | :--- |")
        for r in roll_call:
            status_badge = "🟢 Present" if r.get("status") == "Present" else "🔴 Absent"
            role = r.get("role", "Official")
            md.append(f"| **{r['name']}** | {status_badge} | {role} |")
    else:
        md.append("*Roll call transcription not recorded.*")
    md.append("\n")

    # Major Agenda Items
    md.append("## Key Agenda Items, Ordinances & Public Hearings")
    if items:
        for idx, itm in enumerate(items, 1):
            md.append(f"### {idx}. {itm['title']}")
            md.append(f"- **Item Category:** {itm['type']}")
            md.append(f"- **Outcome/Status:** `{itm.get('status', 'Action Taken')}`")
            md.append(f"- **Jump to Video:** [⏱️ Timestamp {itm['timestamp']}]({itm['jump_url']})")
            if itm.get("context"):
                # Clean up context excerpt
                excerpt = itm['context'].replace('\n', ' ')
                md.append(f"- **Discussion Excerpt:** *\"{excerpt[:240]}...\"*")
            md.append("")
    else:
        md.append("*No major standalone ordinances or public hearings indexed for this session.*")
    md.append("\n")

    # Voting Record
    if votes:
        md.append("## Voting Record & Tally")
        for v in votes:
            md.append(f"- **Action:** Outcome `{v['outcome']}` ({v['tally']})")
            if v.get("voters_aye"):
                md.append(f"  - **Ayes:** {', '.join(v['voters_aye'])}")
            if v.get("voters_no"):
                md.append(f"  - **Noes:** {', '.join(v['voters_no'])}")
        md.append("\n")

    md.append("---\n")
    md.append("*Report generated automatically via Thousand Oaks Council Data Aggregator & AI Pipeline.*")
    return "\n".join(md)


def generate_all_reports():
    """Generate Markdown and HTML reports for all processed summaries."""
    summary_files = glob.glob(os.path.join(SUMMARIES_DIR, "*.json"))
    generated = []

    for s_file in summary_files:
        try:
            with open(s_file, "r", encoding="utf-8") as f:
                summary = json.load(f)
            vid = summary.get("video_id", "meeting")
            md_content = generate_markdown_report(summary)

            out_md_path = os.path.join(REPORTS_DIR, f"briefing_{vid}.md")
            with open(out_md_path, "w", encoding="utf-8") as f:
                f.write(md_content)

            generated.append(out_md_path)
            print(f"Generated civic brief: {out_md_path}")
        except Exception as e:
            print(f"Error generating report for {s_file}: {e}")

    return generated


if __name__ == "__main__":
    generate_all_reports()
