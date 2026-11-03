import json
import os
import re
import time
import pandas as pd
import requests
from youtube_transcript_api import YouTubeTranscriptApi

OUT_DIR = r"c:\Users\jfmar\josemarichal\github.io\projects\deepfake_ai_s_impact_on_political_campaigns"
os.makedirs(OUT_DIR, exist_ok=True)

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
    "Content-Type": "application/json",
}

CLIENT_CONTEXT = {
    "client": {
        "hl": "en",
        "gl": "US",
        "clientName": "WEB",
        "clientVersion": "2.20250101.00.00",
    }
}

# Filter out mainstream legacy broadcast TV news channels so we isolate Influencers, Meme Creators, Partisan Channels & Campaigns/PACs
NEWS_OUTLET_EXCLUDE = re.compile(
    r"\b(NBC|CBS|ABC|FOX|CNN|MSNBC|PBS|CNBC|BBC|Reuters|Associated Press|AP Archive|Wall Street Journal|WSJ|"
    r"New York Times|Washington Post|Bloomberg|Yahoo Finance|Scripps|NewsNation|C-SPAN|Forbes| Guardian|"
    r"KVUE|KXAN|WFAA|WRAL|WCCO|KARE|WTHR|WOOD TV|WMTW|WESH|WLOS|WRDW|WAFB|WKYC|WHAS|WFXR|WOAY|KSL|"
    r"11Alive|ABC10|ABC7|CBS 13|Denver7|News 12|Local 12|News9|KBS WORLD|DW News|Al Jazeera|TODAY|"
    r"TED|TWiT|The Daily Show|Late Show|Tonight Show|Saturday Night Live)\b",
    re.I,
)

AI_COMMENT_REGEX = re.compile(
    r"\b(ai|a\.i\.|deepfake|deep fake|fake|generated|slop|cgi|voice clone|cloned|lip sync|"
    r"sora|runway|elevenlabs|midjourney|synthetic|not real|is this real|bot)\b",
    re.I,
)


def parse_duration_seconds(dur_str):
    if not dur_str:
        return 0
    parts = [int(p) for p in re.findall(r"\d+", str(dur_str))]
    if len(parts) == 3:
        return parts[0] * 3600 + parts[1] * 60 + parts[2]
    if len(parts) == 2:
        return parts[0] * 60 + parts[1]
    if len(parts) == 1:
        return parts[0]
    return 0


def search_youtube_creator_videos(query, max_results=20):
    url = "https://www.youtube.com/youtubei/v1/search?prettyPrint=false"
    # sp="EgIYAQ%3D%3D" filters to Short videos (< 4 minutes) + Type: Video
    payload = {
        "context": CLIENT_CONTEXT,
        "query": query,
        "params": "EgIYAQ%3D%3D",
    }
    resp = requests.post(url, json=payload, headers=HEADERS, timeout=15)
    resp.raise_for_status()
    data = resp.json()

    videos = []
    sections = (
        data.get("contents", {})
        .get("twoColumnSearchResultsRenderer", {})
        .get("primaryContents", {})
        .get("sectionListRenderer", {})
        .get("contents", [])
    )
    for sec in sections:
        items = sec.get("itemSectionRenderer", {}).get("contents", [])
        for item in items:
            vr = item.get("videoRenderer")
            if not vr:
                continue
            vid = vr.get("videoId")
            if not vid:
                continue
            title = "".join(r.get("text", "") for r in vr.get("title", {}).get("runs", []))
            channel = "".join(r.get("text", "") for r in vr.get("ownerText", {}).get("runs", []))
            if NEWS_OUTLET_EXCLUDE.search(channel):
                continue

            pub_time = vr.get("publishedTimeText", {}).get("simpleText", "")
            length_text = vr.get("lengthText", {}).get("simpleText", "")
            dur_sec = parse_duration_seconds(length_text)
            # Keep short-form videos (<= 240 seconds)
            if dur_sec > 240:
                continue

            view_text = vr.get("viewCountText", {}).get("simpleText", "")
            snip_runs = []
            for snip in vr.get("detailedMetadataSnippets", []):
                for r in snip.get("snippetText", {}).get("runs", []):
                    snip_runs.append(r.get("text", ""))
            snippet = "".join(snip_runs).strip()

            videos.append({
                "video_id": vid,
                "title": title,
                "creator_channel": channel,
                "published_relative": pub_time,
                "duration": length_text or "Shorts",
                "duration_seconds": dur_sec,
                "view_count_text": view_text,
                "snippet": snippet,
                "youtube_url": f"https://www.youtube.com/watch?v={vid}",
                "search_query": query,
            })
            if len(videos) >= max_results:
                return videos
    return videos


def find_comment_continuation_token(obj):
    """Recursively locate the comment section continuation token inside youtubei/v1/next JSON."""
    if isinstance(obj, dict):
        # Check if this is the comments itemSectionRenderer continuation
        if obj.get("targetId") == "comments-section" or obj.get("sectionIdentifier") == "comment-item-section":
            tokens = re.findall(r'"token"\s*:\s*"([^"]+)"', json.dumps(obj))
            if tokens:
                return tokens[0]
        for v in obj.values():
            res = find_comment_continuation_token(v)
            if res:
                return res
    elif isinstance(obj, list):
        for item in obj:
            res = find_comment_continuation_token(item)
            if res:
                return res
    return None


def fetch_video_details_and_comments(video_id):
    """
    Calls youtubei/v1/next to retrieve:
    1) Full video description
    2) Native YouTube 'Altered or synthetic content' badge presence
    3) Top viewer comments & Crowd AI Detection ratio
    """
    url = "https://www.youtube.com/youtubei/v1/next?prettyPrint=false"
    payload = {"context": CLIENT_CONTEXT, "videoId": video_id}
    full_desc = ""
    has_yt_synthetic_badge = False
    comments_list = []

    try:
        resp = requests.post(url, json=payload, headers=HEADERS, timeout=15)
        resp.raise_for_status()
        data = resp.json()
        raw_json_str = json.dumps(data)

        # Check for YouTube's native "Altered or synthetic content" disclosure panel
        if "Altered or synthetic content" in raw_json_str or "howThisWasMadeSectionViewModel" in raw_json_str:
            has_yt_synthetic_badge = True

        # Extract full description from videoSecondaryInfoRenderer
        m_desc = re.search(r'"attributedDescription"\s*:\s*\{\s*"content"\s*:\s*"((?:[^"\\]|\\.)*)"', raw_json_str)
        if m_desc:
            full_desc = json.loads(f'"{m_desc.group(1)}"')

        # Find comment continuation token
        token = find_comment_continuation_token(data)
        if token:
            c_resp = requests.post(
                url,
                json={"context": CLIENT_CONTEXT, "continuation": token},
                headers=HEADERS,
                timeout=15,
            )
            if c_resp.status_code == 200:
                c_json = c_resp.json()
                c_str = json.dumps(c_json)
                # Extract comment texts from frameworkUpdates / commentViewModel or contentText
                # In modern YouTube JSON, comment bodies appear under "content":{"content":"..."} inside commentEntityPayload
                for m in re.finditer(r'"commentId"\s*:\s*"[^"]+".*?"content"\s*:\s*\{\s*"content"\s*:\s*"((?:[^"\\]|\\.)*)"', c_str):
                    try:
                        c_txt = json.loads(f'"{m.group(1)}"').strip()
                        if c_txt and c_txt not in comments_list:
                            comments_list.append(c_txt)
                    except Exception:
                        pass
                # Fallback for older renderer format
                if not comments_list:
                    for m in re.finditer(r'"contentText"\s*:\s*\{\s*"runs"\s*:\s*(\[[^\]]+\])', c_str):
                        try:
                            runs = json.loads(m.group(1))
                            c_txt = "".join(r.get("text", "") for r in runs).strip()
                            if c_txt and c_txt not in comments_list:
                                comments_list.append(c_txt)
                        except Exception:
                            pass
    except Exception:
        pass

    return full_desc, has_yt_synthetic_badge, comments_list[:40]


def fetch_transcript_text(ytt_api, video_id):
    try:
        fetched = ytt_api.fetch(video_id, languages=["en", "en-US", "en-GB"])
        segments = []
        for seg in fetched:
            txt = getattr(seg, "text", None)
            if txt is None and isinstance(seg, dict):
                txt = seg.get("text", "")
            if txt:
                segments.append(str(txt).replace("\n", " ").strip())
        return re.sub(r"\s+", " ", " ".join(segments)).strip()
    except Exception:
        return ""


def main():
    queries = [
        # Partisan Influencer / Meme / Satire AI Political Videos
        'Trump AI parody video #shorts',
        'Kamala Harris AI parody video #shorts',
        'Gavin Newsom AI parody video',
        'JD Vance AI parody video #shorts',
        'AOC AI parody video #shorts',
        'Biden AI voice parody political',
        'Dilley Meme Team AI video',
        'political campaign AI satire ad',
        '2026 Senate AI attack ad',
        '2026 campaign AI deepfake ad',
        'candidate AI generated ad parody',
        'Super PAC AI attack ad',
        'Elon Musk Trump AI video #shorts',
        'politician AI song parody #shorts',
        'Sora AI political video',
        'ElevenLabs voice clone politician parody',
    ]

    all_videos = []
    seen_ids = set()

    print("=== Phase 1: Harvesting Short-Form Political Influencer / Campaign AI Videos ===")
    for q in queries:
        try:
            vids = search_youtube_creator_videos(q, max_results=15)
            added = 0
            for v in vids:
                if v["video_id"] not in seen_ids:
                    seen_ids.add(v["video_id"])
                    all_videos.append(v)
                    added += 1
            print(f"[Search] +{added:2d} creator videos (total {len(all_videos):3d}) | {q}")
        except Exception as e:
            print(f"[Search Error] {q}: {e}")
        time.sleep(0.35)

    print(f"\n=== Phase 2: Extracting Native AI Badges, Viewer Comments (Crowd AI Score) & Transcripts for {len(all_videos)} Videos ===")
    ytt_api = YouTubeTranscriptApi()

    for idx, v in enumerate(all_videos, start=1):
        vid = v["video_id"]
        full_desc, has_badge, comments = fetch_video_details_and_comments(vid)
        transcript = fetch_transcript_text(ytt_api, vid)

        ai_comments = [c for c in comments if AI_COMMENT_REGEX.search(c)]
        n_comments = len(comments)
        n_ai_comments = len(ai_comments)
        crowd_ratio = round((n_ai_comments / n_comments) * 100, 1) if n_comments > 0 else 0.0

        v["has_youtube_synthetic_badge"] = has_badge
        v["comments_sampled"] = n_comments
        v["ai_flagged_comments_count"] = n_ai_comments
        v["crowd_ai_comment_pct"] = crowd_ratio
        v["sample_ai_comments"] = " || ".join(c.replace("\n", " ")[:140] for c in ai_comments[:3])
        v["sample_general_comments"] = " || ".join(c.replace("\n", " ")[:120] for c in comments[:3])
        v["transcript_word_count"] = len(transcript.split()) if transcript else 0
        v["transcript"] = transcript
        v["full_description"] = full_desc[:600].replace("\n", " ") if full_desc else v["snippet"]

        if idx % 15 == 0 or idx == len(all_videos):
            print(f"  Enriched {idx}/{len(all_videos)} videos...")
        time.sleep(0.25)

    df = pd.DataFrame(all_videos)
    # Sort by has_youtube_synthetic_badge, ai_flagged_comments_count, and transcript_word_count
    df = df.sort_values(
        ["has_youtube_synthetic_badge", "ai_flagged_comments_count", "transcript_word_count"],
        ascending=[False, False, False],
    ).reset_index(drop=True)

    out_csv = os.path.join(OUT_DIR, "influencer_political_ai_videos_crowd_scored.csv")
    df.to_csv(out_csv, index=False, encoding="utf-8")

    badge_cnt = df["has_youtube_synthetic_badge"].sum()
    comment_flagged_cnt = (df["ai_flagged_comments_count"] > 0).sum()
    trans_cnt = (df["transcript_word_count"] > 0).sum()
    print(f"\n=== Complete! Saved {len(df)} Influencer/Creator Political AI Videos to {out_csv} ===")
    print(f"  - Videos with Native YouTube 'Altered/Synthetic Content' Badge: {badge_cnt}")
    print(f"  - Videos with Viewer Comments Calling Out / Debating AI: {comment_flagged_cnt}")
    print(f"  - Videos with Spoken Transcripts Extracted: {trans_cnt}")


if __name__ == "__main__":
    main()

