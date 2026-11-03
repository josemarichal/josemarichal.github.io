import json
import os
import re
import time
from datetime import datetime, timezone
import pandas as pd
import requests

OUT_DIR = r"c:\Users\jfmar\josemarichal\github.io\projects\deepfake_ai_s_impact_on_political_campaigns"
os.makedirs(OUT_DIR, exist_ok=True)

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) CivicAIResearch/1.0"
}

ARCTIC_POSTS_URL = "https://arctic-shift.photon-reddit.com/api/posts/search"
ARCTIC_COMMENTS_URL = "https://arctic-shift.photon-reddit.com/api/comments/search"

AI_POLITICAL_REGEX = re.compile(
    r"\b(deepfake|deep fake|ai ad|ai ads|ai-generated|ai generated|ai video|ai videos|"
    r"ai attack|ai voice|voice clone|ai robocall|robocalls|synthetic media|slopaganda|ai slop|"
    r"fake video|manipulated video|altered video|sora|elevenlabs|midjourney|chat-gpt|chatgpt)\b",
    re.I,
)

CANDIDATE_OR_POL_REGEX = re.compile(
    r"\b(campaign|candidate|senate|congress|governor|election|midterm|midterms|pac|super pac|"
    r"ad|ads|commercial|talarico|paxton|cornyn|ossoff|platner|collins|flanagan|rogers|el-sayed|"
    r"stevens|hilton|becerra|pratt|bass|shapiro|ramaswamy|acton|sununu|pappas|peltola|sullivan|"
    r"cooper|whatley|trump|vance|harris|newsom|biden|musk|gop|democrat|republican)\b",
    re.I,
)

COMMENT_AI_DEBATE_REGEX = re.compile(
    r"\b(ai|a\.i\.|deepfake|fake|generated|slop|voice clone|robocall|illegal|law|ban|regulated|"
    r"deceptive|misinformation|disinformation|fool|boomers|believe|real|satire|parody|pac)\b",
    re.I,
)


def query_arctic_posts(params, retries=2):
    for attempt in range(retries + 1):
        try:
            r = requests.get(ARCTIC_POSTS_URL, params=params, headers=HEADERS, timeout=18)
            if r.status_code == 200:
                return r.json().get("data", [])
            elif r.status_code in (422, 429, 502, 503, 504):
                time.sleep(2.2 * (attempt + 1))
        except Exception:
            time.sleep(2.0)
    return []


def fetch_arctic_comments_for_post(post_id, limit=35):
    """Uses the fast B-tree indexed link_id parameter on Arctic Shift to pull comments for a Reddit post."""
    try:
        r = requests.get(
            ARCTIC_COMMENTS_URL,
            params={"link_id": post_id, "limit": limit},
            headers=HEADERS,
            timeout=12,
        )
        if r.status_code == 200:
            return r.json().get("data", [])
    except Exception:
        pass
    return []


def main():
    print("=== Phase 1: Querying Arctic Shift Reddit API for 2026 Political AI & Deepfake Threads ===")
    collected_posts = {}

    # Strategy A: Targeted Subreddit + Title keyword searches with narrow date window (after=2026-05-01)
    targeted_queries = [
        # Battleground State Subreddits + Specific 2026 Candidates/AI controversies
        {"subreddit": "TexasPolitics", "title": "Talarico", "after": "2026-05-01", "limit": 100},
        {"subreddit": "TexasPolitics", "title": "Paxton", "after": "2026-08-01", "limit": 100},
        {"subreddit": "texas", "title": "Talarico", "after": "2026-05-01", "limit": 100},
        {"subreddit": "Georgia", "title": "Ossoff", "after": "2026-05-01", "limit": 100},
        {"subreddit": "Atlanta", "title": "Ossoff", "after": "2026-05-01", "limit": 50},
        {"subreddit": "Maine", "title": "Platner", "after": "2026-05-01", "limit": 100},
        {"subreddit": "Maine", "title": "ad", "after": "2026-08-01", "limit": 100},
        {"subreddit": "minnesota", "title": "Flanagan", "after": "2026-05-01", "limit": 100},
        {"subreddit": "Michigan", "title": "El-Sayed", "after": "2026-05-01", "limit": 100},
        {"subreddit": "Michigan", "title": "Rogers", "after": "2026-07-01", "limit": 100},
        {"subreddit": "Ohio", "title": "Ramaswamy", "after": "2026-07-01", "limit": 100},
        {"subreddit": "Ohio", "title": "Acton", "after": "2026-07-01", "limit": 100},
        {"subreddit": "NorthCarolina", "title": "ad", "after": "2026-08-01", "limit": 100},
        {"subreddit": "asheville", "title": "Ager", "after": "2026-05-01", "limit": 100},
        {"subreddit": "California_Politics", "title": "AI", "after": "2026-01-01", "limit": 100},
        {"subreddit": "California_Politics", "title": "Hilton", "after": "2026-05-01", "limit": 100},
        {"subreddit": "LosAngeles", "title": "Spencer Pratt", "after": "2026-05-01", "limit": 100},
        {"subreddit": "Pennsylvania", "title": "Shapiro", "after": "2026-07-01", "limit": 100},
        {"subreddit": "wisconsin", "title": "Van Orden", "after": "2026-05-01", "limit": 100},
        # Election & Political Analysis Subreddits
        {"subreddit": "YAPms", "title": "AI", "after": "2026-01-01", "limit": 100},
        {"subreddit": "YAPms", "title": "ad", "after": "2026-06-01", "limit": 100},
        {"subreddit": "YAPms", "title": "deepfake", "after": "2025-01-01", "limit": 100},
        {"subreddit": "AngryObservation", "title": "AI", "after": "2025-01-01", "limit": 100},
        {"subreddit": "AngryObservation", "title": "ad", "after": "2026-01-01", "limit": 100},
        {"subreddit": "PoliticalHumor", "title": "AI", "after": "2026-08-01", "limit": 100},
        {"subreddit": "Conservative", "title": "AI", "after": "2026-08-01", "limit": 100},
        {"subreddit": "politics", "title": "deepfake", "after": "2026-07-01", "limit": 100},
        {"subreddit": "politics", "title": "robocall", "after": "2026-05-01", "limit": 100},
        {"subreddit": "technology", "title": "deepfake", "after": "2026-07-01", "limit": 100},
        {"subreddit": "artificial", "title": "campaign", "after": "2025-06-01", "limit": 100},
        {"subreddit": "singularity", "title": "political ad", "after": "2025-06-01", "limit": 100},
    ]

    for q in targeted_queries:
        posts = query_arctic_posts(q)
        matched = 0
        for p in posts:
            pid = p.get("id")
            if not pid or pid in collected_posts:
                continue
            title = (p.get("title") or "").strip()
            selftext = (p.get("selftext") or "").strip()
            combined = f"{title} {selftext}"

            # Keep if it matches AI/deepfake/synthetic terms OR is explicitly about a known 2026 AI ad controversy
            is_ai_match = bool(AI_POLITICAL_REGEX.search(combined))
            is_known_ad = bool(
                re.search(
                    r"\b(talarico|platner|flanagan|spencer pratt|steve hilton|jamie ager|drag queen|estranged mother|salon|in his own words|no kings)\b",
                    combined,
                    re.I,
                )
                and re.search(r"\b(ad|ads|video|ai|deepfake|robocall|commercial|pac|attack)\b", combined, re.I)
            )
            if (is_ai_match and CANDIDATE_OR_POL_REGEX.search(combined)) or is_known_ad:
                collected_posts[pid] = p
                matched += 1

        print(
            f"[ArcticShift] r/{q['subreddit']} (title='{q.get('title','')}') -> "
            f"fetched {len(posts):2d}, matched +{matched:2d} (total {len(collected_posts):3d})"
        )
        time.sleep(1.4)

    print(f"\n=== Phase 2: Fetching Reddit Comment Threads for {len(collected_posts)} Matched Posts ===")
    rows = []
    for idx, (pid, p) in enumerate(collected_posts.items(), start=1):
        sub_name = p.get("subreddit", "")
        title = re.sub(r"\s+", " ", p.get("title") or "").strip()
        selftext = re.sub(r"\s+", " ", p.get("selftext") or "").strip()
        created_utc = p.get("created_utc", 0)
        date_str = (
            datetime.fromtimestamp(created_utc, tz=timezone.utc).strftime("%Y-%m-%d")
            if created_utc
            else ""
        )
        score = p.get("score", 0)
        num_comments = p.get("num_comments", 0)
        permalink = f"https://www.reddit.com{p.get('permalink', '')}"
        linked_url = p.get("url_overridden_by_dest") or p.get("url") or ""
        domain = p.get("domain", "")

        # Fetch top comments via fast link_id B-tree lookup
        comments_raw = fetch_arctic_comments_for_post(pid, limit=35)
        valid_comments = []
        for c in comments_raw:
            body = re.sub(r"\s+", " ", c.get("body") or "").strip()
            if body and body not in ("[deleted]", "[removed]") and "I am a bot" not in body:
                valid_comments.append(body)

        ai_debate_comments = [c for c in valid_comments if COMMENT_AI_DEBATE_REGEX.search(c)]
        n_sampled = len(valid_comments)
        n_ai_debate = len(ai_debate_comments)
        debate_pct = round((n_ai_debate / n_sampled) * 100, 1) if n_sampled > 0 else 0.0

        rows.append({
            "post_id": pid,
            "subreddit": f"r/{sub_name}",
            "created_date": date_str,
            "title": title,
            "reddit_score": score,
            "total_comments_on_reddit": num_comments,
            "comments_sampled": n_sampled,
            "ai_debate_comments_count": n_ai_debate,
            "ai_debate_comment_pct": debate_pct,
            "linked_media_domain": domain,
            "linked_media_url": linked_url,
            "reddit_permalink": permalink,
            "post_selftext_snippet": selftext[:450],
            "sample_voter_debate_comments": " || ".join(c[:180] for c in ai_debate_comments[:3]),
        })

        if idx % 15 == 0 or idx == len(collected_posts):
            print(f"  Pulled comment threads for {idx}/{len(collected_posts)} Reddit posts...")
        time.sleep(0.35)

    df = pd.DataFrame(rows)
    if not df.empty:
        df = df.sort_values(
            ["ai_debate_comments_count", "reddit_score", "total_comments_on_reddit"],
            ascending=[False, False, False],
        ).reset_index(drop=True)

    out_csv = os.path.join(OUT_DIR, "reddit_political_ai_campaign_threads.csv")
    df.to_csv(out_csv, index=False, encoding="utf-8")
    print(f"\n=== Complete! Saved {len(df)} Reddit Political AI Threads + Voter Comment Debates to {out_csv} ===")
    if not df.empty:
        print("\nBreakdown by Subreddit:")
        print(df["subreddit"].value_counts().to_string())
        print("\nBreakdown by Linked Media Domain:")
        print(df["linked_media_domain"].value_counts().head(12).to_string())


if __name__ == "__main__":
    main()

