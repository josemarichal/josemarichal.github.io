# Thousand Oaks Civic Data Project & Municipal Knowledge Graph

An automated AI-powered news aggregator, legislative tracker, and relational knowledge graph built specifically for **Thousand Oaks, California**, ingesting directly from the City's official broadcast channel [CTO Meetings (@ctomeetings)](https://www.youtube.com/@ctomeetings).

---

## 🌟 Architecture Overview

```
       Thousand Oaks YouTube Broadcasts (@ctomeetings)
   (City Council • Planning Commission • Traffic Commission • COSCA)
                              │
                              ▼
                1. Scraper & Caption Fetcher
              (Instant timestamped transcript cache)
                              │
                              ▼
                2. Municipal Agenda Extractor
             (Roll Call • Ordinances • Motions • Votes)
                              │
              ┌───────────────┴───────────────┐
              ▼                               ▼
     3. Civic Knowledge Graph         4. Executive Briefings
         (NetworkX Graph)             (Markdown & Newsletters)
              │
              ▼
   5. Interactive Web Dashboard
   (Vis.js Force-Directed Graph)
```

---

## 🚀 Quick Start

### 1. Requirements
Ensure you have the required Python packages:
```bash
pip install youtube-transcript-api networkx requests
```

### 2. Run the Full End-to-End Pipeline
Run all 5 stages (scraping, transcript extraction, entity parsing, knowledge graph compilation, and interactive dashboard rendering) with a single command:

```bash
cd to_council_aggregator
python pipeline.py --all --limit 5
```

Or on Windows, simply run:
```cmd
run_pipeline.bat
```

---

## 🗂️ What Gets Generated

1. **Interactive Knowledge Graph & News Dashboard** (`thousand_oaks_civic_graph.html`):
   - Standalone force-directed interactive visualization of Councilmembers, Ordinances, Developers, Projects, and Meetings.
   - **Click any node** to inspect voting records, attendance, and jump straight to the exact second in the YouTube video!
   - Search bar and filtering by entity type.
   - "Meeting Briefings & News" tab with synthesized reports.

2. **Executive Civic Briefings** (`data/reports/briefing_<video_id>.md`):
   - Formatted journalistic reports ready for email newsletters, Substack, or local news portals.
   - Includes Quorum tables, Ordinance summaries, and voting tallies.

3. **Knowledge Graph Data** (`data/knowledge_graph.json`):
   - Standard node-link JSON format containing all entities and relationships.

4. **Cached Meeting Transcripts** (`data/transcripts/<video_id>.json`):
   - Offline archive with full word counts and millisecond timestamps.

---

## 🤖 Local LLM Support (Ollama)

The pipeline works out of the box with zero external dependencies. If you have **Ollama** running locally with `llama3` or `mistral`:
```bash
ollama run llama3
```
The pipeline automatically connects to `http://localhost:11434` to enrich the executive summaries with deep journalistic analysis. If Ollama is offline or times out, the pipeline falls back gracefully to structured heuristic extraction without crashing.

---

## 🏛️ Bodies Covered
- **Thousand Oaks City Council**
- **Planning Commission**
- **Traffic Commission**
- **Conejo Open Space Conservation Agency (COSCA)**
- **General Plan Advisory Committee (GPAC)**
