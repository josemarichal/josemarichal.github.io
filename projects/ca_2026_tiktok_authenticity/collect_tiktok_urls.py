"""Collect TikTok video URLs and objective metadata via yt-dlp,
filtered to the 2026 California campaign window.
"""

import argparse
import csv
import datetime as dt
import json
import pathlib
import sqlite3
import subprocess
import sys

from init_db import DB_PATH, DATA_DIR, init_database


def sync_handles_csv_to_db(conn: sqlite3.Connection, handles_csv: pathlib.Path) -> None:
    """Import any manually added handles from data/ca_2026_tiktok_handles.csv."""
    if not handles_csv.exists():
        return
    with handles_csv.open("r", encoding="utf-8-sig") as f:
        for row in csv.DictReader(f):
            handle = (row.get("tiktok_handle") or "").strip()
            cid = row.get("candidate_id")
            if not handle or not cid:
                continue
            if not handle.startswith("@"):
                handle = f"@{handle}"
            profile_url = (row.get("profile_url") or f"https://www.tiktok.com/{handle}").strip()
            acc_type = (row.get("account_type") or "unknown").strip().lower()
            source = (row.get("discovery_source") or "manual_csv").strip()
            conn.execute(
                """
                INSERT INTO tiktok_accounts (candidate_id, tiktok_handle, profile_url, account_type, discovery_source)
                VALUES (?, ?, ?, ?, ?)
                ON CONFLICT(candidate_id, tiktok_handle) DO UPDATE SET
                    account_type = excluded.account_type,
                    profile_url = excluded.profile_url
                """,
                (int(cid), handle, profile_url, acc_type, source),
            )
    conn.commit()


def parse_upload_date(entry: dict) -> str | None:
    """Return YYYY-MM-DD from yt-dlp upload_date or timestamp."""
    raw = entry.get("upload_date")
    if raw and len(str(raw)) == 8 and str(raw).isdigit():
        s = str(raw)
        return f"{s[:4]}-{s[4:6]}-{s[6:8]}"
    ts = entry.get("timestamp")
    if ts:
        return dt.datetime.fromtimestamp(int(ts), tz=dt.timezone.utc).strftime("%Y-%m-%d")
    return None


def fetch_profile_videos(profile_url: str, sleep_requests: float, cookies_from_browser: str | None, playlist_end: int = 150, timeout_sec: int = 60) -> list[dict]:
    """Run yt-dlp to extract JSON metadata for recent videos on a TikTok profile."""
    cmd = [
        "yt-dlp",
        "--dump-json",
        "--ignore-errors",
        "--no-warnings",
        "--playlist-end",
        str(playlist_end),
        "--sleep-requests",
        str(sleep_requests),
    ]
    if cookies_from_browser:
        cmd.extend(["--cookies-from-browser", cookies_from_browser])
    cmd.append(profile_url)

    try:
        proc = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="replace", timeout=timeout_sec)
    except subprocess.TimeoutExpired:
        print(f"  [warn] yt-dlp timed out after {timeout_sec}s for {profile_url}", file=sys.stderr)
        return []
    entries = []
    for line in proc.stdout.splitlines():
        line = line.strip()
        if not line.startswith("{"):
            continue
        try:
            entries.append(json.loads(line))
        except json.JSONDecodeError:
            continue
    if proc.returncode != 0 and not entries:
        print(f"  [warn] yt-dlp stderr for {profile_url}: {proc.stderr.strip()[:200]}", file=sys.stderr)
    return entries


def main() -> None:
    parser = argparse.ArgumentParser(description="Collect campaign-window TikTok URLs into SQLite.")
    parser.add_argument("--start-date", default="2026-06-03", help="Campaign window start YYYY-MM-DD (default: 2026-06-03 post-primary).")
    parser.add_argument("--end-date", default="2026-11-15", help="Campaign window end YYYY-MM-DD (default: 2026-11-15).")
    parser.add_argument("--sleep-requests", type=float, default=1.5, help="Seconds between yt-dlp requests.")
    parser.add_argument("--playlist-end", type=int, default=150, help="Max recent videos to inspect per account.")
    parser.add_argument("--timeout", type=int, default=60, help="Per-account yt-dlp timeout in seconds.")
    parser.add_argument("--resume", action="store_true", help="Skip accounts already checked.")
    parser.add_argument("--cookies-from-browser", default=None, help="Optional browser name for yt-dlp cookies (e.g. chrome, edge).")
    args = parser.parse_args()

    db_path = init_database(DB_PATH)
    now_iso = dt.datetime.now(dt.timezone.utc).isoformat()

    with sqlite3.connect(db_path) as conn:
        sync_handles_csv_to_db(conn, DATA_DIR / "ca_2026_tiktok_handles.csv")
        where_clause = "WHERE a.last_checked_at IS NULL" if args.resume else ""
        accounts = conn.execute(
            f"""
            SELECT MIN(a.account_id), MIN(a.candidate_id), MIN(c.full_name), a.tiktok_handle, MIN(a.profile_url)
            FROM tiktok_accounts a
            JOIN candidates c ON a.candidate_id = c.candidate_id
            {where_clause}
            GROUP BY a.tiktok_handle
            ORDER BY MIN(c.state), MIN(c.chamber), MIN(c.district), MIN(c.full_name)
            """
        ).fetchall()

        if not accounts:
            print("No TikTok accounts found in database. Populate data/ca_2026_tiktok_handles.csv or run fetch_ca_2026_candidates.py --discover-handles.")
            return

        total_in_window = 0
        for acc_id, cid, name, handle, profile_url in accounts:
            print(f"Collecting {handle} ({name}) ...")
            entries = fetch_profile_videos(profile_url, args.sleep_requests, args.cookies_from_browser, args.playlist_end, args.timeout)
            in_win_count = 0

            for e in entries:
                vid = str(e.get("id") or "")
                if not vid:
                    continue
                posted_at = parse_upload_date(e)
                in_window = 1 if (posted_at and args.start_date <= posted_at <= args.end_date) else 0
                if in_window:
                    in_win_count += 1

                tiktok_url = e.get("webpage_url") or f"https://www.tiktok.com/{handle}/video/{vid}"
                caption = e.get("description") or e.get("title") or ""
                hashtags = " ".join(re_tag for re_tag in caption.split() if re_tag.startswith("#"))
                sound_title = e.get("track") or ""
                sound_author = e.get("artist") or ""
                is_original = 1 if (sound_title and "original sound" in sound_title.lower()) else 0

                conn.execute(
                    """
                    INSERT INTO videos (
                        video_id, account_id, candidate_id, tiktok_url, posted_at, in_campaign_window,
                        caption, hashtags, duration_sec, sound_title, sound_author, is_original_sound,
                        views, likes, comments, shares, collected_at
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    ON CONFLICT(video_id) DO UPDATE SET
                        tiktok_url = excluded.tiktok_url,
                        posted_at = excluded.posted_at,
                        in_campaign_window = excluded.in_campaign_window,
                        views = COALESCE(excluded.views, videos.views),
                        likes = COALESCE(excluded.likes, videos.likes),
                        comments = COALESCE(excluded.comments, videos.comments),
                        shares = COALESCE(excluded.shares, videos.shares),
                        collected_at = excluded.collected_at
                    """,
                    (
                        vid, acc_id, cid, tiktok_url, posted_at, in_window,
                        caption, hashtags, e.get("duration"), sound_title, sound_author, is_original,
                        e.get("view_count"), e.get("like_count"), e.get("comment_count"), e.get("repost_count"),
                        now_iso,
                    ),
                )

            conn.execute("UPDATE tiktok_accounts SET last_checked_at = ? WHERE tiktok_handle = ?", (now_iso, handle))
            conn.commit()
            total_in_window += in_win_count
            print(f"  {len(entries)} total videos scraped, {in_win_count} inside {args.start_date}..{args.end_date}.")

    print(f"Done. Total campaign-window videos stored: {total_in_window}")


if __name__ == "__main__":
    main()

