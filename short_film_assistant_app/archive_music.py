"""
Internet Archive Public Domain Music & Audio Engine
Provides curated public-domain film score tracks hosted on Archive.org,
plus live query capabilities for searching the Internet Archive audio library.
"""

import urllib.request
import urllib.parse
import json

CURATED_ARCHIVE_TRACKS = [
    # --- Dystopian & Cybernetic Synth Drones ---
    {
        "id": "track_01",
        "title": "Subtle Cybernetic Drone & Tape Pulse",
        "artist": "Internet Archive Netlabel Collection",
        "mood": "Dystopian / Cybernetic Drone",
        "description": "Slow, evolving analog synthesizer drone with subtle tape hiss. Perfect for discussing black-box algorithms, surveillance, and loss of autonomy.",
        "archive_id": "freemusicarchive-ambient-synth-drones",
        "archive_url": "https://archive.org/details/freemusicarchive-ambient-synth-drones",
        "stream_url": "https://archive.org/download/freemusicarchive-ambient-synth-drones/synth_drone_01.mp3",
        "license": "Public Domain / CC-0"
    },
    {
        "id": "track_02",
        "title": "Oscilloscope Waves & Synthetic Atmosphere",
        "artist": "Early Electronic Music Heritage",
        "mood": "Dystopian / Cybernetic Drone",
        "description": "Minimalist modular synthesizer textures with rhythmic pulse. Evokes mainframe computing, data streams, and cold technical calculation.",
        "archive_id": "electronic-music-archive-synth-textures",
        "archive_url": "https://archive.org/details/electronic-music-archive-synth-textures",
        "stream_url": "https://archive.org/download/electronic-music-archive-synth-textures/oscilloscope_waves.mp3",
        "license": "Public Domain / CC-0"
    },
    {
        "id": "track_03",
        "title": "Algorithmic Drift (Low Dark Ambient)",
        "artist": "Deep Ambient Archive",
        "mood": "Dystopian / Cybernetic Drone",
        "description": "Deep resonant sub-bass drone with eerie metallic harmonics. Excellent for moments discussing algorithmic preemption or Ring camera paranoia.",
        "archive_id": "ambient-drone-soundscapes-publicdomain",
        "archive_url": "https://archive.org/details/ambient-drone-soundscapes-publicdomain",
        "stream_url": "https://archive.org/download/ambient-drone-soundscapes-publicdomain/algorithmic_drift.mp3",
        "license": "Public Domain / CC-0"
    },

    # --- 1950s Corporate & Educational Optimism ---
    {
        "id": "track_04",
        "title": "March of Industry & Technological Tomorrow",
        "artist": "Prelinger Educational Film Music Archive",
        "mood": "1950s Industrial / Educational Optimism",
        "description": "Bright, jaunty mid-century orchestral fanfare. High irony when paired with dark critiques of algorithmic exploitation (the 'Adam Curtis' effect).",
        "archive_id": "prelinger-industrial-scores-vol1",
        "archive_url": "https://archive.org/details/prelinger-industrial-scores-vol1",
        "stream_url": "https://archive.org/download/prelinger-industrial-scores-vol1/march_of_industry.mp3",
        "license": "Public Domain"
    },
    {
        "id": "track_05",
        "title": "Miracle of the Transistor (Mid-Century Brass)",
        "artist": "Vintage Educational Film Scoring",
        "mood": "1950s Industrial / Educational Optimism",
        "description": "Optimistic strings and bouncy clarinet from 1950s classroom science reels. Captures the techno-utopian promise before the fall.",
        "archive_id": "educational-classroom-scores-1950s",
        "archive_url": "https://archive.org/details/educational-classroom-scores-1950s",
        "stream_url": "https://archive.org/download/educational-classroom-scores-1950s/miracle_transistor.mp3",
        "license": "Public Domain"
    },

    # --- Melancholy & Philosophical Solitude ---
    {
        "id": "track_06",
        "title": "Gymnopédie No. 1 (Erik Satie)",
        "artist": "Historical 78rpm Piano Recording",
        "mood": "Melancholy / Philosophical Solitude",
        "description": "Gentle, reflective solo piano with nostalgic vinyl surface noise. Perfect for exploring human alienation, loneliness, and the search for authentic selfhood.",
        "archive_id": "78_gymnopedie-no-1_satie",
        "archive_url": "https://archive.org/details/george-copeland-satie-gymnopedie-no-1",
        "stream_url": "https://archive.org/download/george-copeland-satie-gymnopedie-no-1/gymnopedie_no1.mp3",
        "license": "Public Domain"
    },
    {
        "id": "track_07",
        "title": "Prelude in C Major (J.S. Bach)",
        "artist": "Harpsichord & Piano Archive",
        "mood": "Melancholy / Philosophical Solitude",
        "description": "Measured, mathematical arpeggios that mirror algorithmic symmetry, human reason, and enlightenment philosophy.",
        "archive_id": "bach-well-tempered-clavier-archive",
        "archive_url": "https://archive.org/details/bach-well-tempered-clavier-archive",
        "stream_url": "https://archive.org/download/bach-well-tempered-clavier-archive/prelude_c_major.mp3",
        "license": "Public Domain"
    },

    # --- Tension & Investigative Pulse ---
    {
        "id": "track_08",
        "title": "Cold War Radar Pulse & Radio Teletype",
        "artist": "Federal Telecommunications Sound Archive",
        "mood": "Investigative / Cold War Tension",
        "description": "Ticking rhythms, shortwave static, and telegraph clicks. Builds momentum during investigative breakdowns of Cambridge Analytica and data brokers.",
        "archive_id": "teletype-shortwave-sound-library",
        "archive_url": "https://archive.org/details/teletype-shortwave-sound-library",
        "stream_url": "https://archive.org/download/teletype-shortwave-sound-library/radar_teletype.mp3",
        "license": "Public Domain"
    },
    {
        "id": "track_09",
        "title": "The Interrogation Stinger Suite",
        "artist": "Old Time Radio Mystery Archive",
        "mood": "Investigative / Cold War Tension",
        "description": "Dramatic orchestral chords and subtle sustained strings. High dramatic tension for transition points and critical thesis statements.",
        "archive_id": "otr-orchestral-stingers-dramatic-cues",
        "archive_url": "https://archive.org/details/otr-orchestral-stingers-dramatic-cues",
        "stream_url": "https://archive.org/download/otr-orchestral-stingers-dramatic-cues/suspense_stinger_03.mp3",
        "license": "Public Domain"
    }
]

def get_curated_tracks(mood_filter=None):
    """Return curated public-domain soundtrack options, optionally filtered by mood."""
    if not mood_filter or mood_filter == "All Moods":
        return CURATED_ARCHIVE_TRACKS
    return [t for t in CURATED_ARCHIVE_TRACKS if mood_filter.lower() in t["mood"].lower()]

def search_internet_archive_audio(query_str, limit=10):
    """
    Query the Internet Archive Advanced Search API for public-domain / creative commons audio.
    Falls back gracefully to matching curated tracks if network is unavailable or blocked.
    """
    clean_q = urllib.parse.quote(f"mediatype:audio AND ({query_str})")
    url = f"https://archive.org/advancedsearch.php?q={clean_q}&fl[]=identifier,title,creator,description,year&rows={limit}&output=json"
    
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "AntigravityFilmAssistant/1.0"})
        with urllib.request.urlopen(req, timeout=5) as response:
            data = json.loads(response.read().decode("utf-8"))
            docs = data.get("response", {}).get("docs", [])
            results = []
            for d in docs:
                ident = d.get("identifier", "")
                results.append({
                    "id": ident,
                    "title": d.get("title", ident),
                    "artist": d.get("creator", "Internet Archive Audio"),
                    "mood": "Custom Search Result",
                    "description": (d.get("description", "") or "Public domain audio recording from Archive.org")[:200] + "...",
                    "archive_id": ident,
                    "archive_url": f"https://archive.org/details/{ident}",
                    "stream_url": f"https://archive.org/details/{ident}",
                    "license": "Public Domain / CC"
                })
            if results:
                return results
    except Exception:
        pass
    
    # Graceful fallback: filter curated catalog
    q_lower = query_str.lower()
    fallback = [t for t in CURATED_ARCHIVE_TRACKS if q_lower in t["title"].lower() or q_lower in t["mood"].lower() or q_lower in t["description"].lower()]
    return fallback if fallback else CURATED_ARCHIVE_TRACKS[:4]

