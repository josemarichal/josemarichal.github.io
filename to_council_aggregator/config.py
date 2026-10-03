"""
Configuration for Thousand Oaks Municipal Meeting Aggregator & Knowledge Graph.
Target: Thousand Oaks, CA (@ctomeetings YouTube Channel)
"""

import os

# YouTube Channel & Metadata
CHANNEL_ID = "UC0qtc6h-BkH9X-20Fs9sWHg"
CHANNEL_HANDLE = "@ctomeetings"
CHANNEL_NAME = "CTO Meetings - City of Thousand Oaks"
RSS_FEED_URL = f"https://www.youtube.com/feeds/videos.xml?channel_id={CHANNEL_ID}"
YOUTUBE_BASE_URL = "https://www.youtube.com/watch?v="

# Municipal Bodies in Thousand Oaks
BODIES = {
    "city_council": "Thousand Oaks City Council",
    "planning_commission": "Planning Commission",
    "traffic_commission": "Traffic Commission",
    "cosca": "Conejo Open Space Conservation Agency (COSCA)",
    "gpac": "General Plan Advisory Committee (GPAC)",
    "other": "Other Municipal Meeting"
}

# Known Thousand Oaks Key Officials (for entity resolution & tagging)
KEY_OFFICIALS = {
    "Mikey Taylor": {"role": "Mayor / Councilmember", "body": "City Council"},
    "Bob Engler": {"role": "Mayor Pro Tem / Councilmember", "body": "City Council"},
    "Al Adam": {"role": "Councilmember", "body": "City Council"},
    "David Newman": {"role": "Councilmember", "body": "City Council"},
    "Kyle Gutierrez": {"role": "Councilmember", "body": "City Council"},
    "Kevin McNamee": {"role": "Councilmember (Former/Alternate)", "body": "City Council"},
    "Tracy Noonan": {"role": "City Attorney", "body": "Staff"},
    "Andrew Powers": {"role": "City Manager", "body": "Staff"},
    "Jonathan Syrett": {"role": "Cultural & Community Services Director", "body": "Staff"},
    "Kelvin Parker": {"role": "Community Development Director", "body": "Staff"},
}

# Local LLM / Ollama Configuration
OLLAMA_BASE_URL = os.environ.get("OLLAMA_HOST", "http://localhost:11434")
OLLAMA_MODEL = os.environ.get("OLLAMA_MODEL", "llama3:latest")
OLLAMA_TIMEOUT = int(os.environ.get("OLLAMA_TIMEOUT", "2"))

# Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
TRANSCRIPTS_DIR = os.path.join(DATA_DIR, "transcripts")
SUMMARIES_DIR = os.path.join(DATA_DIR, "summaries")
REPORTS_DIR = os.path.join(DATA_DIR, "reports")
GRAPH_DATA_FILE = os.path.join(DATA_DIR, "knowledge_graph.json")
DASHBOARD_HTML_FILE = os.path.join(BASE_DIR, "thousand_oaks_civic_graph.html")

# Create data directories if needed
for d in [DATA_DIR, TRANSCRIPTS_DIR, SUMMARIES_DIR, REPORTS_DIR]:
    os.makedirs(d, exist_ok=True)
