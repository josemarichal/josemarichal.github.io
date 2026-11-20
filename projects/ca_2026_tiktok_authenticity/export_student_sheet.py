"""Export campaign-window TikTok URLs and pre-filled metadata to CSV & HTML for student rubric coding."""

import csv
import html
import pathlib
import sqlite3

from init_db import DB_PATH, DATA_DIR

RUBRIC_COLS = [
    "coder_id",
    "strategy_type",            # Relinquished_Control_UGC | Trend_Jacking | Informational | Polished_Promotional
    "perceived_authenticity_1_5",
    "relinquished_control_yn",
    "coding_notes",
]


def export_sheets(db_path: pathlib.Path = DB_PATH) -> tuple[pathlib.Path, pathlib.Path]:
    csv_path = DATA_DIR / "student_coding_sheet.csv"
    html_path = DATA_DIR / "student_coding_sheet.html"

    with sqlite3.connect(db_path) as conn:
        conn.row_factory = sqlite3.Row
        rows = conn.execute("SELECT * FROM student_coding_view").fetchall()

    headers = (
        [
            "video_id", "tiktok_url", "state", "chamber", "district", "candidate_name",
            "party", "incumbent_status", "tiktok_handle", "account_type",
            "posted_at", "duration_sec", "caption", "sound_title",
            "is_original_sound", "views", "likes", "comments", "shares",
        ]
        + RUBRIC_COLS
    )

    with csv_path.open("w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(headers)
        for r in rows:
            writer.writerow([
                r["video_id"], r["tiktok_url"], r["state"], r["chamber"], r["district"],
                r["candidate_name"], r["party"], r["incumbent_status"],
                r["tiktok_handle"], r["account_type"], r["posted_at"],
                r["duration_sec"], r["caption"], r["sound_title"],
                r["is_original_sound"], r["views"], r["likes"],
                r["comments"], r["shares"], "", "", "", "", "",
            ])

    table_rows_html = []
    for r in rows:
        url = html.escape(r["tiktok_url"] or "")
        cap = html.escape((r["caption"] or "")[:140])
        table_rows_html.append(
            f"<tr>"
            f"<td>{html.escape(r['state'])} {html.escape(r['chamber'])} {html.escape(str(r['district']))}</td>"
            f"<td>{html.escape(r['candidate_name'])}</td>"
            f"<td>{html.escape(r['party'] or '')}</td>"
            f"<td>{html.escape(r['incumbent_status'] or '')}</td>"
            f"<td>{html.escape(r['tiktok_handle'])} ({html.escape(r['account_type'] or '')})</td>"
            f"<td>{html.escape(r['posted_at'] or '')}</td>"
            f"<td>{r['duration_sec'] or ''}s</td>"
            f"<td>{r['views'] or ''}</td>"
            f"<td>{cap}</td>"
            f"<td><a href=\"{url}\" target=\"_blank\" rel=\"noopener\">Open TikTok</a></td>"
            f"</tr>"
        )

    doc = f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>2026 US State Legislative TikTok Coding Sheet</title>
  <style>
    body {{ font-family: system-ui, sans-serif; margin: 2rem; color: #1e293b; }}
    h1 {{ font-size: 1.4rem; margin-bottom: 0.4rem; }}
    p {{ color: #475569; margin-top: 0; }}
    table {{ border-collapse: collapse; width: 100%; font-size: 0.88rem; margin-top: 1rem; }}
    th, td {{ border: 1px solid #cbd5e1; padding: 0.5rem 0.6rem; text-align: left; vertical-align: top; }}
    th {{ background: #f1f5f9; position: sticky; top: 0; }}
    tr:nth-child(even) {{ background: #f8fafc; }}
    a {{ color: #0284c7; font-weight: 600; text-decoration: none; }}
    a:hover {{ text-decoration: underline; }}
  </style>
</head>
<body>
  <h1>2026 US State Legislative Candidates — TikTok Campaign Window Coding Sheet</h1>
  <p>Total campaign-window videos: <strong>{len(rows)}</strong>. Use <code>student_coding_sheet.csv</code> to record rubric scores.</p>
  <table>
    <thead>
      <tr>
        <th>Race</th><th>Candidate</th><th>Party</th><th>Status</th>
        <th>Account</th><th>Posted</th><th>Len</th><th>Views</th>
        <th>Caption</th><th>Video URL</th>
      </tr>
    </thead>
    <tbody>
      {"".join(table_rows_html)}
    </tbody>
  </table>
</body>
</html>
"""
    html_path.write_text(doc, encoding="utf-8")
    return csv_path, html_path


if __name__ == "__main__":
    c_path, h_path = export_sheets()
    print(f"Exported {c_path} and {h_path}")
