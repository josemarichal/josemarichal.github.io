"""Export the 51 paired Instagram profile & Reels URLs into a student-ready CSV & clickable HTML sheet."""

import csv
import html
import pathlib

BASE_DIR = pathlib.Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
IN_CSV = DATA_DIR / "paired_54_instagram_handles.csv"
OUT_CSV = DATA_DIR / "paired_ig_student_sheet.csv"
OUT_HTML = DATA_DIR / "paired_ig_student_sheet.html"


def main() -> None:
    with IN_CSV.open("r", encoding="utf-8") as f:
        rows = [r for r in csv.DictReader(f) if (r.get("instagram_handle") or "").strip()]

    headers = [
        "candidate_id", "state", "full_name", "chamber", "district", "party",
        "incumbent_status", "tiktok_handle", "tiktok_window_videos",
        "instagram_handle", "instagram_profile_url", "instagram_reels_url",
        "ig_discovery_source", "coder_id", "ig_post_url", "posted_at",
        "strategy_type", "perceived_authenticity_1_5", "coding_notes",
    ]

    with OUT_CSV.open("w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(headers)
        for r in rows:
            handle = r["instagram_handle"].strip().lstrip("@")
            prof_url = f"https://www.instagram.com/{handle}/"
            reels_url = f"https://www.instagram.com/{handle}/reels/"
            w.writerow([
                r["candidate_id"], r["state"], r["full_name"], r["chamber"],
                r["district"], r["party"], r["incumbent_status"],
                r["tiktok_handle"], r["tiktok_window_videos"],
                r["instagram_handle"], prof_url, reels_url,
                r["ig_discovery_source"], "", "", "", "", "", "",
            ])

    tr_html = []
    for r in rows:
        handle = r["instagram_handle"].strip().lstrip("@")
        prof_url = f"https://www.instagram.com/{handle}/"
        reels_url = f"https://www.instagram.com/{handle}/reels/"
        tr_html.append(
            f"<tr>"
            f"<td>{html.escape(r['state'])} {html.escape(r['chamber'])} {html.escape(r['district'])}</td>"
            f"<td>{html.escape(r['full_name'])}</td>"
            f"<td>{html.escape(r['incumbent_status'])}</td>"
            f"<td>{html.escape(r['tiktok_handle'])} ({html.escape(r['tiktok_window_videos'])})</td>"
            f"<td><a href=\"{html.escape(prof_url)}\" target=\"_blank\" rel=\"noopener\">@{html.escape(handle)}</a></td>"
            f"<td><a href=\"{html.escape(reels_url)}\" target=\"_blank\" rel=\"noopener\">Open Reels Tab</a></td>"
            f"</tr>"
        )

    doc = f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>2026 State Legislative Paired Instagram Coding Sheet (n={len(rows)})</title>
  <style>
    body {{ font-family: system-ui, sans-serif; margin: 2rem; color: #1e293b; }}
    h1 {{ font-size: 1.4rem; margin-bottom: 0.4rem; }}
    p {{ color: #475569; margin-top: 0; }}
    table {{ border-collapse: collapse; width: 100%; font-size: 0.88rem; margin-top: 1rem; }}
    th, td {{ border: 1px solid #cbd5e1; padding: 0.5rem 0.6rem; text-align: left; }}
    th {{ background: #f1f5f9; position: sticky; top: 0; }}
    tr:nth-child(even) {{ background: #f8fafc; }}
    a {{ color: #0284c7; font-weight: 600; text-decoration: none; }}
    a:hover {{ text-decoration: underline; }}
  </style>
</head>
<body>
  <h1>2026 State Legislative Candidates — Paired Instagram Profile &amp; Reels Sheet</h1>
  <p>Total paired candidates: <strong>{len(rows)}</strong>. Open each candidate's Reels tab in your browser, filter visually to <code>2026-06-03</code> – <code>2026-11-15</code>, and record post URLs and rubric scores in <code>paired_ig_student_sheet.csv</code>.</p>
  <table>
    <thead>
      <tr>
        <th>Race</th><th>Candidate</th><th>Status</th><th>TikTok (Window Vids)</th>
        <th>Instagram Profile</th><th>Reels Tab</th>
      </tr>
    </thead>
    <tbody>
      {"".join(tr_html)}
    </tbody>
  </table>
</body>
</html>
"""
    OUT_HTML.write_text(doc, encoding="utf-8")
    print(f"Exported {len(rows)} paired Instagram profile/Reels URLs -> {OUT_CSV} & {OUT_HTML}")


if __name__ == "__main__":
    main()
