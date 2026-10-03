"""
Scraper for Thousand Oaks Municipal Meetings (@ctomeetings YouTube Channel).
Extracts video metadata and timestamped closed captions / transcripts.
"""

import os
import json
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime
from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api._errors import VideoUnplayable, TranscriptsDisabled, NoTranscriptFound

from config import (
    CHANNEL_ID,
    RSS_FEED_URL,
    YOUTUBE_BASE_URL,
    BODIES,
    TRANSCRIPTS_DIR
)


def format_seconds(seconds: float) -> str:
    """Convert seconds to HH:MM:SS format."""
    total_sec = int(seconds)
    hours = total_sec // 3600
    minutes = (total_sec % 3600) // 60
    secs = total_sec % 60
    if hours > 0:
        return f"{hours:02d}:{minutes:02d}:{secs:02d}"
    return f"{minutes:02d}:{secs:02d}"


def categorize_title(title: str) -> str:
    """Determine municipal body from video title."""
    title_lower = title.lower()
    if "city council" in title_lower:
        return "city_council"
    elif "planning commission" in title_lower:
        return "planning_commission"
    elif "traffic commission" in title_lower:
        return "traffic_commission"
    elif "cosca" in title_lower or "conejo open space" in title_lower:
        return "cosca"
    elif "general plan" in title_lower or "gpac" in title_lower:
        return "gpac"
    return "other"


def fetch_channel_feed(limit: int = 15):
    """
    Fetch the latest videos from Thousand Oaks @ctomeetings RSS feed.
    Returns a list of dicts with video metadata.
    """
    print(f"Fetching RSS feed from {RSS_FEED_URL}...")
    req = urllib.request.Request(
        RSS_FEED_URL,
        headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
    )
    with urllib.request.urlopen(req) as resp:
        xml_content = resp.read()

    root = ET.fromstring(xml_content)
    ns = {
        "yt": "http://www.youtube.com/xml/schemas/2015",
        "atom": "http://www.w3.org/2005/Atom",
        "media": "http://search.yahoo.com/mrss/"
    }

    videos = []
    for entry in root.findall("atom:entry", ns)[:limit]:
        title = entry.find("atom:title", ns).text.strip()
        video_id = entry.find("yt:videoId", ns).text.strip()
        published_str = entry.find("atom:published", ns).text.strip()
        
        # Parse published date
        try:
            pub_date = datetime.fromisoformat(published_str.replace("Z", "+00:00"))
            date_str = pub_date.strftime("%Y-%m-%d")
            display_date = pub_date.strftime("%B %d, %Y")
        except Exception:
            date_str = published_str[:10]
            display_date = date_str

        body_key = categorize_title(title)
        body_name = BODIES.get(body_key, "Municipal Meeting")

        videos.append({
            "video_id": video_id,
            "title": title,
            "published_at": published_str,
            "meeting_date": date_str,
            "display_date": display_date,
            "body_key": body_key,
            "body_name": body_name,
            "url": f"{YOUTUBE_BASE_URL}{video_id}",
            "thumbnail": f"https://i.ytimg.com/vi/{video_id}/hqdefault.jpg"
        })

    print(f"Found {len(videos)} videos on @ctomeetings channel.")
    return videos


def fetch_meeting_transcript(video_id: str, force_refresh: bool = False):
    """
    Retrieve and cache full timestamped captions for a video.
    Returns a dictionary with full transcript, raw segments, and word count.
    """
    cache_path = os.path.join(TRANSCRIPTS_DIR, f"{video_id}.json")

    # Check cache first
    if not force_refresh and os.path.exists(cache_path):
        try:
            with open(cache_path, "r", encoding="utf-8") as f:
                cached_data = json.load(f)
                return cached_data
        except Exception as e:
            print(f"Cache read error for {video_id}: {e}")

    try:
        ytta = YouTubeTranscriptApi()
        raw_transcript = ytta.fetch(video_id)
        
        segments = []
        full_text_parts = []
        
        for item in raw_transcript:
            # Handle FetchedTranscriptSnippet objects or dicts
            text = getattr(item, "text", None) or (item.get("text") if isinstance(item, dict) else str(item))
            start = getattr(item, "start", None) or (item.get("start") if isinstance(item, dict) else 0.0)
            duration = getattr(item, "duration", None) or (item.get("duration") if isinstance(item, dict) else 0.0)
            
            clean_text = text.replace("\n", " ").strip()
            if not clean_text:
                continue

            timestamp_str = format_seconds(start)
            jump_url = f"{YOUTUBE_BASE_URL}{video_id}&t={int(start)}s"

            segments.append({
                "start": start,
                "duration": duration,
                "timestamp": timestamp_str,
                "text": clean_text,
                "jump_url": jump_url
            })
            full_text_parts.append(clean_text)

        full_text = " ".join(full_text_parts)
        total_duration = segments[-1]["start"] + segments[-1]["duration"] if segments else 0

        transcript_data = {
            "video_id": video_id,
            "status": "available",
            "segments_count": len(segments),
            "total_words": len(full_text.split()),
            "duration_seconds": total_duration,
            "duration_str": format_seconds(total_duration),
            "full_text": full_text,
            "segments": segments
        }

        # Save to disk
        with open(cache_path, "w", encoding="utf-8") as f:
            json.dump(transcript_data, f, indent=2)

        return transcript_data

    except (VideoUnplayable, TranscriptsDisabled, NoTranscriptFound) as e:
        # Expected for upcoming scheduled streams or meetings without captions
        reason = str(e).split("\n")[0]
        result = {
            "video_id": video_id,
            "status": "unavailable",
            "error": reason,
            "segments": [],
            "full_text": ""
        }
        return result
    except Exception as e:
        print(f"Error fetching transcript for {video_id}: {e}")
        return {
            "video_id": video_id,
            "status": "error",
            "error": str(e),
            "segments": [],
            "full_text": ""
        }


def sync_transcripts(limit: int = 6):
    """Scan channel and download transcripts for all completed meetings."""
    videos = fetch_channel_feed(limit=limit)
    synced = []

    for v in videos:
        vid = v["video_id"]
        print(f"\nProcessing '{v['title']}' ({vid})...")
        t_data = fetch_meeting_transcript(vid)

        if t_data.get("status") == "available":
            v_enriched = {**v, **t_data}
            synced.append(v_enriched)
            print(f"  [OK] {t_data['segments_count']} caption segments, {t_data['total_words']} words, {t_data['duration_str']}")
        else:
            print(f"  [SKIPPED] Transcript unavailable ({t_data.get('error', 'unknown')})")

    return synced


if __name__ == "__main__":
    print("Testing Thousand Oaks Meeting Scraper...")
    results = sync_transcripts(limit=5)
    print(f"\nSuccessfully synced {len(results)} meeting transcripts.")
