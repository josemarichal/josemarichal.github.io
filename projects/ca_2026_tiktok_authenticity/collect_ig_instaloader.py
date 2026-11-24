"""Polite, resumable Instagram post/Reel collector via instaloader for the 51 paired candidates."""

import argparse
import csv
import datetime as dt
import pathlib
import time
import instaloader

BASE_DIR = pathlib.Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
HANDLES_CSV = DATA_DIR / "paired_54_instagram_handles.csv"
OUT_CSV = DATA_DIR / "paired_54_instagram_posts.csv"
CHECKPOINT_TXT = DATA_DIR / "ig_checked_handles.txt"

FIELDNAMES = [
    "candidate_id", "state", "full_name", "chamber", "district", "party",
    "incumbent_status", "tiktok_handle", "instagram_handle", "shortcode",
    "ig_url", "post_type", "posted_at", "in_campaign_window", "caption",
    "likes", "comments", "video_view_count",
]


def load_checked() -> set[str]:
    if not CHECKPOINT_TXT.exists():
        return set()
    return {x.strip().lower() for x in CHECKPOINT_TXT.read_text(encoding="utf-8").splitlines() if x.strip()}


def mark_checked(handle: str) -> None:
    with CHECKPOINT_TXT.open("a", encoding="utf-8") as f:
        f.write(handle.lower() + "\n")


def main() -> None:
    parser = argparse.ArgumentParser(description="Collect 2026 campaign-window Instagram posts via instaloader.")
    parser.add_argument("--start-date", default="2026-06-03")
    parser.add_argument("--end-date", default="2026-11-15")
    parser.add_argument("--sleep-account", type=float, default=8.0, help="Seconds between accounts.")
    parser.add_argument("--max-posts", type=int, default=80, help="Max posts inspected per account.")
    args = parser.parse_args()

    start_d = dt.date.fromisoformat(args.start_date)
    end_d = dt.date.fromisoformat(args.end_date)

    with HANDLES_CSV.open("r", encoding="utf-8") as f:
        targets = [r for r in csv.DictReader(f) if (r.get("instagram_handle") or "").strip()]

    checked = load_checked()
    write_header = not OUT_CSV.exists()
    loader = instaloader.Instaloader(
        download_pictures=False,
        download_videos=False,
        download_video_thumbnails=False,
        download_geotags=False,
        download_comments=False,
        save_metadata=False,
        quiet=True,
    )

    total_window = 0
    consecutive_blocks = 0

    with OUT_CSV.open("a", newline="", encoding="utf-8") as out_f:
        writer = csv.DictWriter(out_f, fieldnames=FIELDNAMES)
        if write_header:
            writer.writeheader()

        for row in targets:
            ig_handle = row["instagram_handle"].strip().lstrip("@").lower()
            if ig_handle in checked:
                continue

            print(f"Checking @{ig_handle} ({row['full_name']}, {row['state']})...")
            try:
                profile = instaloader.Profile.from_username(loader.context, ig_handle)
                consecutive_blocks = 0
            except Exception as exc:
                msg = str(exc)
                print(f"  [error] @{ig_handle}: {msg[:140]}")
                if any(k in msg.lower() for k in ("429", "401", "login", "wait a few minutes", "checkpoint")):
                    consecutive_blocks += 1
                    if consecutive_blocks >= 2:
                        print("Hit repeated Instagram rate/login wall; stopping cleanly to preserve progress.")
                        break
                    print("  Sleeping 45s before continuing...")
                    time.sleep(45)
                else:
                    mark_checked(ig_handle)
                continue

            inspected = 0
            older_streak = 0
            in_win = 0
            try:
                for post in profile.get_posts():
                    inspected += 1
                    post_date = post.date_utc.date()
                    if post_date < start_d:
                        older_streak += 1
                        if older_streak >= 3:
                            break
                    else:
                        older_streak = 0

                    in_window = 1 if (start_d <= post_date <= end_d) else 0
                    if in_window:
                        in_win += 1
                    is_vid = post.is_video
                    ig_url = f"https://www.instagram.com/{'reel' if is_vid else 'p'}/{post.shortcode}/"
                    writer.writerow({
                        "candidate_id": row["candidate_id"],
                        "state": row["state"],
                        "full_name": row["full_name"],
                        "chamber": row["chamber"],
                        "district": row["district"],
                        "party": row["party"],
                        "incumbent_status": row["incumbent_status"],
                        "tiktok_handle": row["tiktok_handle"],
                        "instagram_handle": f"@{ig_handle}",
                        "shortcode": post.shortcode,
                        "ig_url": ig_url,
                        "post_type": "reel_video" if is_vid else ("carousel" if post.typename == "GraphSidecar" else "image"),
                        "posted_at": post_date.isoformat(),
                        "in_campaign_window": in_window,
                        "caption": (post.caption or "").replace("\n", " ")[:500],
                        "likes": post.likes,
                        "comments": post.comments,
                        "video_view_count": post.video_view_count if is_vid else "",
                    })
                    if inspected >= args.max_posts:
                        break
            except Exception as exc:
                print(f"  [post-iter warn] @{ig_handle}: {str(exc)[:140]}")

            out_f.flush()
            mark_checked(ig_handle)
            total_window += in_win
            print(f"  Inspected {inspected} posts, {in_win} inside {args.start_date}..{args.end_date}.")
            time.sleep(args.sleep_account)

    print(f"Finished run. New campaign-window Instagram posts saved: {total_window} -> {OUT_CSV}")


if __name__ == "__main__":
    main()
