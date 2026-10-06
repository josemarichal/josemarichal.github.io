"""
Visualizer for Thousand Oaks Municipal Knowledge Graph & Civic Dashboard.
Generates an expansive, full-screen, topic-centric interactive HTML application.
Supports viewing the graph organized by Policy Domain (Housing, Economy, Environment, etc.)
or by Council Session.
"""

import os
import json
import glob
from config import (
    GRAPH_DATA_FILE,
    SUMMARIES_DIR,
    DASHBOARD_HTML_FILE
)


def render_briefing_cards(summaries):
    """Render HTML cards for the news briefing tab with substantive summaries for each agenda action."""
    cards_html = []
    for s in summaries:
        title = s.get("title", "Meeting")
        display_date = s.get("display_date", s.get("meeting_date", ""))
        duration = s.get("duration_str", "")
        body_name = s.get("body_name", "")
        url = s.get("url", "")
        exec_summary = s.get("executive_summary", "")

        action_cards = []
        seen_items = set()
        for item in s.get("agenda_items", []):
            item_id = item.get("identifier", "Item")
            item_title = item.get("title", "")
            jump_url = item.get("jump_url", "")
            timestamp = item.get("timestamp", "00:00")
            item_type = item.get("type", "Agenda Action")
            action_type = item.get("action_type", item_type)
            summary = item.get("summary", "")
            outcome = item.get("outcome", item.get("status", "Deliberated"))

            # Deduplicate repeated identical speaker items in the same session
            dedup_key = (item_id.strip().lower(), item_title.strip().lower(), action_type.strip().lower())
            if dedup_key in seen_items:
                continue
            seen_items.add(dedup_key)

            # Clean display heading
            if item_id and item_id.lower() not in item_title.lower() and not item_id.lower().startswith("speaker:"):
                display_heading = f"{item_id}: {item_title}"
            else:
                display_heading = item_title

            # Determine pill badge styling
            type_lower = f"{action_type} {item_type}".lower()
            if "ordinance" in type_lower:
                pill_class = "pill-ordinance"
            elif "development" in type_lower or "project" in type_lower or "housing" in type_lower or "plan" in type_lower:
                pill_class = "pill-development"
            elif "open space" in type_lower or "park" in type_lower or "conservation" in type_lower:
                pill_class = "pill-openspace"
            elif "public comment" in type_lower or "testimony" in type_lower or "forum" in type_lower:
                pill_class = "pill-comment"
            elif "legal" in type_lower or "litigation" in type_lower or "closed session" in type_lower:
                pill_class = "pill-legal"
            else:
                pill_class = "pill-hearing"

            if summary:
                summary_html = f'<div class="action-summary-text">{summary}</div>'
            else:
                raw_ctx = item.get("context", "Deliberated during municipal proceedings.")
                summary_html = f'<div class="action-summary-text" style="color: var(--text-muted);">{raw_ctx[:180]}...</div>'

            outcome_html = f'<div class="action-outcome-badge"><span>⚖️ {outcome}</span></div>' if outcome else ""

            action_cards.append(f"""
              <div class="agenda-action-card">
                <div class="action-card-header">
                  <div class="action-card-title">
                    <span>{display_heading}</span>
                    <span class="action-type-pill {pill_class}">{action_type}</span>
                  </div>
                  <a href="{jump_url}" target="_blank" class="action-timestamp-btn">&#9654; &#9201; {timestamp}</a>
                </div>
                {summary_html}
                <div class="action-meta-footer">
                  {outcome_html}
                  <span style="font-size: 0.72rem; color: var(--text-muted);">&#128197; {display_date} &bull; {body_name}</span>
                </div>
              </div>
            """)

        actions_html = "".join(action_cards) if action_cards else "<p style='color: var(--text-muted); font-size: 0.8rem;'>No individual items indexed.</p>"

        cards_html.append(f"""
        <div class="briefing-card">
          <div class="briefing-header">
            <div>
              <div class="briefing-title">{title}</div>
              <div style="color: var(--text-muted); font-size: 0.85rem;">&#128197; {display_date} &bull; &#9201; {duration} &bull; {body_name}</div>
            </div>
            <a href="{url}" target="_blank" class="yt-btn" style="margin-top: 0;">&#9654; Watch Broadcast</a>
          </div>

          <div style="margin-bottom: 1.25rem; font-size: 0.95rem; line-height: 1.6; color: #cbd5e1;">
            {exec_summary}
          </div>

          <h4 style="font-size: 0.8rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.85rem; letter-spacing: 0.05em;">Key Agenda Actions &amp; Synthesized Summaries</h4>
          <div class="agenda-actions-container">
            {actions_html}
          </div>
        </div>
        """)

    return "".join(cards_html)


def generate_dashboard_html():
    """Build the standalone interactive HTML dashboard."""
    # Load knowledge graph data
    if not os.path.exists(GRAPH_DATA_FILE):
        graph_data = {"nodes": [], "links": [], "meta": {}}
    else:
        with open(GRAPH_DATA_FILE, "r", encoding="utf-8") as f:
            graph_data = json.load(f)

    # Load meeting summaries for news feed tab
    summaries = []
    for s_file in glob.glob(os.path.join(SUMMARIES_DIR, "*.json")):
        try:
            with open(s_file, "r", encoding="utf-8") as f:
                summaries.append(json.load(f))
        except Exception:
            pass

    # Sort summaries newest first
    summaries.sort(key=lambda x: x.get("meeting_date", ""), reverse=True)
    briefings_html = render_briefing_cards(summaries)
    graph_json_str = json.dumps(graph_data)
    node_count = len(graph_data.get("nodes", []))
    edge_count = len(graph_data.get("links", []))

    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thousand Oaks Civic Knowledge Graph &amp; Policy Tracker</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <script src="https://unpkg.com/vis-network/standalone/umd/vis-network.min.js"></script>
  <style>
    :root {{
      --bg-dark: #070a12;
      --bg-card: rgba(19, 27, 46, 0.94);
      --bg-card-hover: #1c2742;
      --border-color: rgba(255, 255, 255, 0.1);
      --border-accent: rgba(56, 189, 248, 0.35);
      --text-main: #f1f5f9;
      --text-muted: #94a3b8;
      --accent-cyan: #38bdf8;
      --accent-emerald: #10b981;
      --accent-purple: #a855f7;
      --accent-amber: #f59e0b;
      --accent-rose: #f43f5e;
      --accent-indigo: #818cf8;
    }}

    * {{
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    }}

    html, body {{
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      overflow: hidden;
      background-color: var(--bg-dark);
      color: var(--text-main);
    }}

    body {{
      display: flex;
      flex-direction: column;
    }}

    header {{
      height: 64px;
      flex-shrink: 0;
      background: rgba(15, 23, 42, 0.95);
      backdrop-filter: blur(14px);
      border-bottom: 1px solid var(--border-color);
      padding: 0 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 100;
    }}

    .logo-area {{
      display: flex;
      align-items: center;
      gap: 1rem;
    }}

    .badge-live {{
      background: rgba(16, 185, 129, 0.15);
      border: 1px solid rgba(16, 185, 129, 0.4);
      color: var(--accent-emerald);
      padding: 0.2rem 0.65rem;
      border-radius: 999px;
      font-size: 0.72rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }}

    .badge-live::before {{
      content: '';
      width: 7px;
      height: 7px;
      background: var(--accent-emerald);
      border-radius: 50%;
      animation: pulse 2s infinite;
    }}

    @keyframes pulse {{
      0% {{ opacity: 1; transform: scale(1); }}
      50% {{ opacity: 0.4; transform: scale(1.3); }}
      100% {{ opacity: 1; transform: scale(1); }}
    }}

    h1 {{
      font-size: 1.15rem;
      font-weight: 700;
      letter-spacing: -0.02em;
    }}

    .source-sub {{
      color: var(--text-muted);
      font-size: 0.75rem;
    }}

    .nav-tabs {{
      display: flex;
      gap: 0.4rem;
      background: rgba(0, 0, 0, 0.4);
      padding: 0.25rem;
      border-radius: 8px;
      border: 1px solid var(--border-color);
    }}

    .tab-btn {{
      background: transparent;
      border: none;
      color: var(--text-muted);
      padding: 0.45rem 0.9rem;
      border-radius: 6px;
      font-size: 0.82rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }}

    .tab-btn.active {{
      background: var(--accent-cyan);
      color: #090d16;
    }}

    .app-body {{
      position: relative;
      width: 100%;
      height: calc(100% - 64px);
      overflow: hidden;
      display: flex;
    }}

    #view-graph {{
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      overflow: hidden;
    }}

    #network-container {{
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      background: radial-gradient(circle at 50% 50%, #111827 0%, #060913 100%);
    }}

    /* Floating Graph Controls */
    .graph-controls {{
      position: absolute;
      top: 1rem;
      left: 1rem;
      z-index: 20;
      background: var(--bg-card);
      backdrop-filter: blur(12px);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 0.9rem;
      display: flex;
      flex-direction: column;
      gap: 0.65rem;
      width: 300px;
      box-shadow: 0 12px 35px rgba(0, 0, 0, 0.6);
    }}

    /* Perspective Mode Switcher */
    .perspective-switcher {{
      display: flex;
      background: rgba(0, 0, 0, 0.45);
      padding: 0.25rem;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.08);
      gap: 0.25rem;
    }}

    .perspective-btn {{
      flex: 1;
      background: transparent;
      border: none;
      color: var(--text-muted);
      padding: 0.4rem 0.5rem;
      border-radius: 6px;
      font-size: 0.72rem;
      font-weight: 700;
      cursor: pointer;
      text-align: center;
      transition: all 0.2s;
    }}

    .perspective-btn.active {{
      background: rgba(56, 189, 248, 0.2);
      color: var(--accent-cyan);
      border: 1px solid rgba(56, 189, 248, 0.4);
    }}

    .search-input {{
      width: 100%;
      background: #090d16;
      border: 1px solid var(--border-color);
      color: var(--text-main);
      padding: 0.55rem 0.8rem;
      border-radius: 8px;
      font-size: 0.82rem;
      outline: none;
    }}

    .search-input:focus {{
      border-color: var(--accent-cyan);
    }}

    .legend-list {{
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      font-size: 0.75rem;
    }}

    .legend-item {{
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--text-muted);
      cursor: pointer;
      user-select: none;
      padding: 0.25rem 0.4rem;
      border-radius: 5px;
      transition: background 0.15s;
    }}

    .legend-item:hover {{
      background: rgba(255, 255, 255, 0.06);
      color: var(--text-main);
    }}

    .legend-color {{
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }}

    /* Zoom & Fit Toolbar */
    .view-actions {{
      position: absolute;
      bottom: 1.25rem;
      left: 1rem;
      z-index: 20;
      display: flex;
      gap: 0.5rem;
    }}

    .action-chip-btn {{
      background: var(--bg-card);
      backdrop-filter: blur(10px);
      border: 1px solid var(--border-color);
      color: var(--text-main);
      padding: 0.45rem 0.75rem;
      border-radius: 8px;
      font-size: 0.78rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
      transition: all 0.2s ease;
    }}

    .action-chip-btn:hover {{
      background: var(--accent-cyan);
      color: #090d16;
      border-color: var(--accent-cyan);
    }}

    /* Floating Inspector Panel (Right Drawer) */
    .inspector-panel {{
      position: absolute;
      top: 1rem;
      right: 1rem;
      bottom: 1rem;
      width: 410px;
      max-width: 90vw;
      background: var(--bg-card);
      backdrop-filter: blur(16px);
      border: 1px solid var(--border-color);
      border-radius: 14px;
      z-index: 30;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      padding: 1.25rem;
      box-shadow: -10px 15px 40px rgba(0, 0, 0, 0.6);
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease;
    }}

    .inspector-panel.collapsed {{
      transform: translateX(calc(100% + 1.5rem));
      pointer-events: none;
      opacity: 0;
    }}

    .inspector-header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
    }}

    .close-inspector-btn {{
      background: rgba(255, 255, 255, 0.08);
      border: none;
      color: var(--text-muted);
      width: 28px;
      height: 28px;
      border-radius: 6px;
      font-size: 1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
    }}

    .close-inspector-btn:hover {{
      background: rgba(255, 255, 255, 0.18);
      color: #fff;
    }}

    .inspector-title {{
      font-size: 1.2rem;
      font-weight: 700;
      margin-bottom: 0.25rem;
      color: var(--text-main);
    }}

    .node-badge {{
      display: inline-block;
      padding: 0.2rem 0.55rem;
      border-radius: 6px;
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      margin-bottom: 0.85rem;
    }}

    .badge-topic {{ background: rgba(244, 63, 94, 0.2); color: var(--accent-rose); border: 1px solid var(--accent-rose); }}
    .badge-official {{ background: rgba(16, 185, 129, 0.2); color: var(--accent-emerald); border: 1px solid var(--accent-emerald); }}
    .badge-meeting {{ background: rgba(56, 189, 248, 0.2); color: var(--accent-cyan); border: 1px solid var(--accent-cyan); }}
    .badge-agenda_item {{ background: rgba(129, 140, 248, 0.2); color: var(--accent-indigo); border: 1px solid var(--accent-indigo); }}
    .badge-organization {{ background: rgba(245, 158, 11, 0.2); color: var(--accent-amber); border: 1px solid var(--accent-amber); }}

    .dossier-card {{
      background: rgba(9, 13, 22, 0.75);
      border: 1px solid var(--border-color);
      border-radius: 10px;
      padding: 0.9rem;
      margin-bottom: 0.85rem;
    }}

    .dossier-card h4 {{
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-muted);
      margin-bottom: 0.5rem;
    }}

    .relations-list {{
      display: flex;
      flex-direction: column;
      gap: 0.45rem;
      max-height: 280px;
      overflow-y: auto;
    }}

    .rel-item {{
      background: var(--bg-card-hover);
      padding: 0.6rem 0.75rem;
      border-radius: 7px;
      font-size: 0.78rem;
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      border: 1px solid rgba(255, 255, 255, 0.04);
      cursor: pointer;
      transition: border-color 0.15s;
    }}

    .rel-item:hover {{
      border-color: var(--accent-cyan);
    }}

    .rel-tag {{
      font-size: 0.65rem;
      font-weight: 700;
      color: var(--accent-cyan);
      font-family: 'JetBrains Mono', monospace;
    }}

    .yt-btn {{
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      background: #dc2626;
      color: white;
      text-decoration: none;
      font-weight: 600;
      padding: 0.5rem 0.85rem;
      border-radius: 8px;
      font-size: 0.78rem;
      margin-top: 0.65rem;
      transition: background 0.2s;
    }}

    .yt-btn:hover {{
      background: #b91c1c;
    }}

    .toggle-inspector-pill {{
      position: absolute;
      top: 1rem;
      right: 1rem;
      z-index: 25;
      background: var(--bg-card);
      backdrop-filter: blur(10px);
      border: 1px solid var(--border-color);
      color: var(--text-main);
      padding: 0.5rem 0.9rem;
      border-radius: 10px;
      font-size: 0.82rem;
      font-weight: 600;
      cursor: pointer;
      display: none;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
    }}

    #view-briefings {{
      display: none;
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      overflow-y: auto;
      padding: 2.5rem;
      background: var(--bg-dark);
      z-index: 10;
    }}

    .briefings-grid {{
      max-width: 950px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 1.75rem;
    }}

    .briefing-card {{
      background: rgba(19, 27, 46, 0.85);
      border: 1px solid var(--border-color);
      border-radius: 14px;
      padding: 1.5rem;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
    }}

    .briefing-header {{
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
      border-bottom: 1px solid var(--border-color);
      padding-bottom: 0.85rem;
    }}

    .briefing-title {{
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--accent-cyan);
      margin-bottom: 0.35rem;
    }}

    .agenda-actions-container {{
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }}

    .agenda-action-card {{
      background: rgba(13, 20, 36, 0.75);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      padding: 1.1rem 1.25rem;
      transition: all 0.2s ease;
    }}

    .agenda-action-card:hover {{
      border-color: rgba(56, 189, 248, 0.4);
      background: rgba(17, 26, 46, 0.95);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
    }}

    .action-card-header {{
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 0.75rem;
      margin-bottom: 0.65rem;
      flex-wrap: wrap;
    }}

    .action-card-title {{
      font-size: 0.95rem;
      font-weight: 700;
      color: #f1f5f9;
      display: flex;
      align-items: center;
      gap: 0.6rem;
      flex-wrap: wrap;
    }}

    .action-type-pill {{
      font-size: 0.68rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      padding: 0.22rem 0.6rem;
      border-radius: 9999px;
      line-height: 1.2;
    }}

    .pill-ordinance {{ background: rgba(129, 140, 248, 0.2); color: #a5b4fc; border: 1px solid rgba(129, 140, 248, 0.45); }}
    .pill-development {{ background: rgba(244, 63, 94, 0.2); color: #fda4af; border: 1px solid rgba(244, 63, 94, 0.45); }}
    .pill-hearing {{ background: rgba(245, 158, 11, 0.2); color: #fcd34d; border: 1px solid rgba(245, 158, 11, 0.45); }}
    .pill-openspace {{ background: rgba(16, 185, 129, 0.2); color: #6ee7b7; border: 1px solid rgba(16, 185, 129, 0.45); }}
    .pill-comment {{ background: rgba(56, 189, 248, 0.2); color: #7dd3fc; border: 1px solid rgba(56, 189, 248, 0.45); }}
    .pill-legal {{ background: rgba(168, 85, 247, 0.2); color: #d8b4fe; border: 1px solid rgba(168, 85, 247, 0.45); }}

    .action-timestamp-btn {{
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      background: rgba(220, 38, 38, 0.15);
      color: #f87171;
      border: 1px solid rgba(220, 38, 38, 0.4);
      padding: 0.3rem 0.65rem;
      border-radius: 6px;
      font-size: 0.75rem;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.15s;
    }}

    .action-timestamp-btn:hover {{
      background: #dc2626;
      color: white;
    }}

    .action-summary-text {{
      font-size: 0.88rem;
      line-height: 1.6;
      color: #cbd5e1;
      margin-bottom: 0.75rem;
    }}

    .action-meta-footer {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      font-size: 0.76rem;
      color: var(--text-muted);
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      padding-top: 0.55rem;
      flex-wrap: wrap;
    }}

    .action-outcome-badge {{
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      font-weight: 600;
      color: #38bdf8;
    }}

    .item-chip {{
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      background: rgba(255, 255, 255, 0.05);
      padding: 0.35rem 0.65rem;
      border-radius: 6px;
      font-size: 0.78rem;
      margin-bottom: 0.4rem;
      margin-right: 0.4rem;
    }}

    .item-chip a {{
      color: var(--accent-cyan);
      text-decoration: none;
      font-weight: 600;
    }}
  </style>
</head>
<body>

  <header>
    <div class="logo-area">
      <div>
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <h1>Thousand Oaks Civic Policy Graph</h1>
          <span class="badge-live">Live: @ctomeetings</span>
        </div>
        <div class="source-sub">Topic-Centric Municipal Governance &bull; {node_count} Entities &bull; {edge_count} Policy Connections</div>
      </div>
    </div>

    <div class="nav-tabs">
      <button class="tab-btn active" onclick="switchTab('graph')">&#127760; Policy Knowledge Graph</button>
      <button class="tab-btn" onclick="switchTab('briefings')">&#128240; Meeting Briefings &amp; News</button>
    </div>
  </header>

  <div class="app-body">
    <!-- GRAPH VIEW -->
    <div id="view-graph">
      <div id="network-container"></div>

      <!-- FLOATING CONTROLS -->
      <div class="graph-controls">
        <label style="font-size: 0.7rem; text-transform: uppercase; font-weight: 700; color: var(--text-muted); letter-spacing: 0.05em;">Graph Organization Mode</label>
        <div class="perspective-switcher">
          <button class="perspective-btn active" id="btnModeTopic" onclick="setOrganizationMode('topic')">&#127991;&#65039; Policy Topics</button>
          <button class="perspective-btn" id="btnModeSession" onclick="setOrganizationMode('session')">&#128197; Council Sessions</button>
        </div>

        <input type="text" id="nodeSearch" class="search-input" placeholder="&#128269; Search housing, Amgen, Taylor, tree..." oninput="handleSearch(this.value)">

        <div class="legend-list">
          <div class="legend-item" onclick="filterType('all')">
            <span class="legend-color" style="background: white;"></span> Show All Entities ({node_count})
          </div>
          <div class="legend-item" onclick="filterType('topic')">
            <span class="legend-color" style="background: var(--accent-rose);"></span> Policy Topic Hubs
          </div>
          <div class="legend-item" onclick="filterType('official')">
            <span class="legend-color" style="background: var(--accent-emerald);"></span> Councilmembers &amp; Officials
          </div>
          <div class="legend-item" onclick="filterType('agenda_item')">
            <span class="legend-color" style="background: var(--accent-indigo);"></span> Specific Ordinances &amp; Projects
          </div>
          <div class="legend-item" onclick="filterType('organization')">
            <span class="legend-color" style="background: var(--accent-amber);"></span> Developers &amp; Stakeholders
          </div>
          <div class="legend-item" onclick="filterType('meeting')">
            <span class="legend-color" style="background: var(--accent-cyan);"></span> Council Sessions
          </div>
        </div>
      </div>

      <!-- ZOOM & FIT ACTIONS -->
      <div class="view-actions">
        <button class="action-chip-btn" onclick="fitGraph()">&#9974; Fit Graph</button>
        <button class="action-chip-btn" onclick="zoomIn()">&#10133; Zoom In</button>
        <button class="action-chip-btn" onclick="zoomOut()">&#10134; Zoom Out</button>
        <button class="action-chip-btn" onclick="resetPhysics()">&#128260; Re-cluster</button>
      </div>

      <button class="toggle-inspector-pill" id="toggleInspectorPill" onclick="toggleInspector(true)">
        &#128203; Open Policy Dossier
      </button>

      <!-- FLOATING SIDEBAR INSPECTOR -->
      <div class="inspector-panel" id="inspector">
        <div class="inspector-header">
          <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); font-weight: 700;">Policy &amp; Civic Dossier</span>
          <button class="close-inspector-btn" onclick="toggleInspector(false)" title="Collapse Panel">&times;</button>
        </div>

        <div id="empty-state" style="text-align: center; color: var(--text-muted); margin-top: 3rem;">
          <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">&#127963;&#65039;</div>
          <h3 style="font-size: 1.05rem; color: #cbd5e1;">Select a Policy or Official</h3>
          <p style="font-size: 0.8rem; margin-top: 0.5rem; line-height: 1.5;">Click any <strong>Policy Topic</strong> (Housing, Economy, Open Space), <strong>Councilmember</strong>, or <strong>Ordinance</strong> to inspect voting records, developer connections, and video timestamps.</p>
        </div>

        <div id="dossier-content" style="display: none;">
          <div id="dossier-badge" class="node-badge"></div>
          <h2 id="dossier-title" class="inspector-title"></h2>
          <div id="dossier-sub" style="color: var(--text-muted); font-size: 0.8rem; margin-bottom: 1rem;"></div>

          <div class="dossier-card">
            <h4>Primary Dossier</h4>
            <div id="dossier-attributes" style="font-size: 0.82rem; line-height: 1.6;"></div>
            <div id="dossier-action-btn"></div>
          </div>

          <div class="dossier-card">
            <h4 id="relations-heading">Connected Entities &amp; Actions</h4>
            <div class="relations-list" id="dossier-relations"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- BRIEFINGS VIEW -->
    <div id="view-briefings">
      <div class="briefings-grid">
        <h2 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 0.35rem;">Thousand Oaks Municipal Briefings</h2>
        <p style="color: var(--text-muted); margin-bottom: 1.5rem; font-size: 0.9rem;">Synthesized summaries and timestamped roll calls extracted directly from the City of Thousand Oaks YouTube broadcasts.</p>

        {briefings_html}
      </div>
    </div>
  </div>

  <script>
    const graphData = {graph_json_str};

    let currentMode = 'topic'; // 'topic' or 'session'

    // Node Visual Styling
    const typeColors = {{
      topic: {{ background: '#f43f5e', border: '#e11d48', font: '#ffffff' }},
      official: {{ background: '#10b981', border: '#059669', font: '#ffffff' }},
      agenda_item: {{ background: '#818cf8', border: '#6366f1', font: '#ffffff' }},
      organization: {{ background: '#f59e0b', border: '#d97706', font: '#ffffff' }},
      meeting: {{ background: '#38bdf8', border: '#0284c7', font: '#090d16' }}
    }};

    // Topic Custom Color Mapping
    const topicColors = {{
      topic_housing: {{ bg: '#f43f5e', border: '#e11d48' }},
      topic_economy: {{ bg: '#a855f7', border: '#9333ea' }},
      topic_openspace: {{ bg: '#10b981', border: '#059669' }},
      topic_publicsafety: {{ bg: '#f59e0b', border: '#d97706' }},
      topic_infrastructure: {{ bg: '#06b6d4', border: '#0891b2' }},
      topic_governance: {{ bg: '#38bdf8', border: '#0284c7' }}
    }};

    const visNodes = new vis.DataSet(
      (graphData.nodes || []).map(n => {{
        const isTopic = n.type === 'topic';
        const isOfficial = n.type === 'official';
        const isMeeting = n.type === 'meeting';
        const isOrg = n.type === 'organization';

        let bg = typeColors[n.type]?.background || '#64748b';
        let border = typeColors[n.type]?.border || '#475569';
        let fontColor = '#ffffff';

        if (isTopic && topicColors[n.id]) {{
          bg = topicColors[n.id].bg;
          border = topicColors[n.id].border;
        }}

        return {{
          id: n.id,
          label: n.label,
          type: n.type,
          shape: isTopic ? 'diamond' : (isMeeting ? 'box' : (isOfficial ? 'circle' : (isOrg ? 'hexagon' : 'dot'))),
          size: isTopic ? 38 : (isMeeting ? 26 : (isOfficial ? 24 : 16)),
          margin: isMeeting ? 8 : (isTopic ? 12 : 5),
          color: {{
            background: bg,
            border: border,
            highlight: {{ background: '#ffffff', border: bg }}
          }},
          font: {{
            color: fontColor,
            size: isTopic ? 14 : (isMeeting ? 12 : (isOfficial ? 13 : 11)),
            face: 'Plus Jakarta Sans',
            bold: isTopic || isOfficial
          }},
          raw: n
        }};
      }})
    );

    const visEdges = new vis.DataSet(
      (graphData.links || []).map(l => ({{
        from: l.source,
        to: l.target,
        label: l.relation || l.label || '',
        font: {{ size: 9, color: '#94a3b8', strokeWidth: 0, align: 'top' }},
        color: {{ color: l.relation === 'POLICY_DOMAIN' ? 'rgba(244, 63, 94, 0.4)' : 'rgba(255, 255, 255, 0.2)', highlight: '#38bdf8' }},
        arrows: 'to',
        width: l.relation === 'POLICY_DOMAIN' ? 2 : 1.2,
        raw: l
      }}))
    );

    const container = document.getElementById('network-container');
    const options = {{
      nodes: {{ borderWidth: 2 }},
      edges: {{
        smooth: {{ type: 'continuous' }}
      }},
      physics: {{
        barnesHut: {{
          gravitationalConstant: -7500,
          centralGravity: 0.16,
          springLength: 220,
          springConstant: 0.035,
          damping: 0.1
        }},
        stabilization: {{
          iterations: 160,
          updateInterval: 25
        }}
      }},
      interaction: {{
        hover: true,
        tooltipDelay: 150,
        zoomView: true,
        dragView: true
      }}
    }};

    const network = new vis.Network(container, {{ nodes: visNodes, edges: visEdges }}, options);

    // Initial setup: Default to Topic-centric layout
    network.once('stabilized', function() {{
      setOrganizationMode('topic');
      fitGraph();
    }});

    window.addEventListener('resize', function() {{
      network.fit();
    }});

    function fitGraph() {{
      network.fit({{
        animation: {{ duration: 700, easingFunction: 'easeInOutQuad' }}
      }});
    }}

    function zoomIn() {{
      const scale = network.getScale();
      network.moveTo({{ scale: scale * 1.3, animation: true }});
    }}

    function zoomOut() {{
      const scale = network.getScale();
      network.moveTo({{ scale: scale * 0.7, animation: true }});
    }}

    function resetPhysics() {{
      network.stabilize(100);
      setTimeout(fitGraph, 300);
    }}

    // Switch between Policy Topic Mode and Council Session Mode
    function setOrganizationMode(mode) {{
      currentMode = mode;
      document.getElementById('btnModeTopic').classList.toggle('active', mode === 'topic');
      document.getElementById('btnModeSession').classList.toggle('active', mode === 'session');

      if (mode === 'topic') {{
        // In Topic Mode: De-emphasize or hide meeting session nodes to put Policy Topics at the center
        visNodes.forEach(n => {{
          if (n.type === 'meeting') {{
            visNodes.update({{ id: n.id, hidden: true }});
          }} else if (n.type === 'topic') {{
            visNodes.update({{ id: n.id, hidden: false, size: 42 }});
          }} else {{
            visNodes.update({{ id: n.id, hidden: false }});
          }}
        }});
      }} else {{
        // In Session Mode: Show all meeting nodes as chronological hubs
        visNodes.forEach(n => {{
          visNodes.update({{ id: n.id, hidden: false }});
        }});
      }}

      network.stabilize(80);
      setTimeout(fitGraph, 250);
    }}

    // Toggle Inspector Drawer
    function toggleInspector(show) {{
      const panel = document.getElementById('inspector');
      const pill = document.getElementById('toggleInspectorPill');
      if (show) {{
        panel.classList.remove('collapsed');
        pill.style.display = 'none';
      }} else {{
        panel.classList.add('collapsed');
        pill.style.display = 'block';
      }}
    }}

    // Click handler for sidebar inspector
    network.on('click', function(params) {{
      if (params.nodes.length > 0) {{
        const nodeId = params.nodes[0];
        showNodeInspector(nodeId);
      }}
    }});

    function showNodeInspector(nodeId) {{
      toggleInspector(true);
      const node = visNodes.get(nodeId);
      if (!node) return;
      const raw = node.raw;

      document.getElementById('empty-state').style.display = 'none';
      document.getElementById('dossier-content').style.display = 'block';

      document.getElementById('dossier-title').innerText = raw.label;
      const badge = document.getElementById('dossier-badge');
      badge.innerText = (raw.type || '').replace('_', ' ');
      badge.className = `node-badge badge-${{raw.type}}`;

      let attrHtml = '';
      if (raw.type === 'topic') {{
        attrHtml = `<strong>Policy Domain:</strong> ${{raw.raw_label || raw.label}}<br><strong>Description:</strong> ${{raw.description || 'Major municipal policy area.'}}<br><strong>Centrality Score:</strong> ${{raw.centrality || '0.22'}}`;
      }} else if (raw.type === 'official') {{
        attrHtml = `<strong>Role:</strong> ${{raw.role || 'City Official'}}<br><strong>Status:</strong> ${{raw.status || 'Active'}}<br><strong>Centrality Score:</strong> ${{raw.centrality || 'N/A'}}`;
      }} else if (raw.type === 'meeting') {{
        attrHtml = `<strong>Body:</strong> ${{raw.body || 'Municipal'}}<br><strong>Date:</strong> ${{raw.date || 'Recent'}}<br><strong>Broadcaster:</strong> CTO Meetings`;
      }} else if (raw.type === 'agenda_item') {{
        attrHtml = `<strong>Item Type:</strong> ${{raw.action_type || raw.item_type || 'Ordinance / Hearing'}}<br><strong>Primary Topic:</strong> ${{raw.topic_label || 'Municipal'}}<br><strong>Action / Status:</strong> ${{raw.status || 'Deliberated'}}<br><strong>Timestamp:</strong> ${{raw.timestamp || 'N/A'}}${{raw.outcome ? `<br><strong>Outcome:</strong> <span style="color: #38bdf8;">${{raw.outcome}}</span>` : ''}}`;
      }} else if (raw.type === 'organization') {{
        attrHtml = `<strong>Category:</strong> ${{raw.subtype || 'Organization'}}<br><strong>Jurisdiction:</strong> Conejo Valley / Ventura County`;
      }}

      // Universal Substantive Paragraph Summary for every node
      if (raw.summary) {{
        let accentBorder = '#38bdf8';
        if (raw.type === 'topic') accentBorder = '#f43f5e';
        else if (raw.type === 'official') accentBorder = '#10b981';
        else if (raw.type === 'agenda_item') accentBorder = '#818cf8';
        else if (raw.type === 'organization') accentBorder = '#f59e0b';
        else if (raw.type === 'meeting') accentBorder = '#06b6d4';

        attrHtml += `<div style="margin-top: 0.85rem; padding: 0.85rem 1rem; background: rgba(255,255,255,0.04); border-radius: 8px; border-left: 3px solid ${{accentBorder}}; border-top: 1px solid rgba(255,255,255,0.06); border-right: 1px solid rgba(255,255,255,0.06); border-bottom: 1px solid rgba(255,255,255,0.06);">
          <div style="font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: ${{accentBorder}}; margin-bottom: 0.4rem;">
            &#128203; Summary &amp; Civic Context
          </div>
          <p style="font-size: 0.82rem; line-height: 1.6; color: #cbd5e1; margin: 0;">${{raw.summary}}</p>
        </div>`;
      }}

      document.getElementById('dossier-attributes').innerHTML = attrHtml;

      const actionContainer = document.getElementById('dossier-action-btn');
      if (raw.jump_url) {{
        actionContainer.innerHTML = `<a href="${{raw.jump_url}}" target="_blank" class="yt-btn">&#9654; Jump to Timestamp (${{raw.timestamp}})</a>`;
      }} else if (raw.url) {{
        actionContainer.innerHTML = `<a href="${{raw.url}}" target="_blank" class="yt-btn">&#9654; Open Full Broadcast</a>`;
      }} else {{
        actionContainer.innerHTML = '';
      }}

      // Find Connected Entities
      const connectedEdges = visEdges.get({{
        filter: e => e.from === nodeId || e.to === nodeId
      }});

      let relHtml = '';
      connectedEdges.forEach(e => {{
        const otherId = e.from === nodeId ? e.to : e.from;
        const otherNode = visNodes.get(otherId);
        const direction = e.from === nodeId ? '⟶' : '⟵';
        const label = e.label || (e.from === nodeId ? 'CONNECTED_TO' : 'REFERENCED_BY');

        relHtml += `
          <div class="rel-item" onclick="network.selectNodes(['${{otherId}}']); showNodeInspector('${{otherId}}');">
            <span class="rel-tag">${{direction}} ${{label}}</span>
            <strong>${{otherNode ? otherNode.label : otherId}}</strong>
          </div>
        `;
      }});

      document.getElementById('dossier-relations').innerHTML = relHtml || '<p style="color: var(--text-muted); font-size: 0.8rem;">No direct connections recorded.</p>';
    }}

    function handleSearch(query) {{
      if (!query.trim()) return;
      const matched = visNodes.get({{
        filter: n => n.label.toLowerCase().includes(query.toLowerCase())
      }});
      if (matched.length > 0) {{
        const targetId = matched[0].id;
        network.selectNodes([targetId]);
        network.focus(targetId, {{ scale: 1.1, animation: true }});
        showNodeInspector(targetId);
      }}
    }}

    function filterType(type) {{
      if (type === 'all') {{
        visNodes.forEach(n => visNodes.update({{ id: n.id, hidden: currentMode === 'topic' && n.type === 'meeting' }}));
      }} else {{
        visNodes.forEach(n => {{
          visNodes.update({{ id: n.id, hidden: n.type !== type }});
        }});
      }}
      setTimeout(fitGraph, 100);
    }}

    function switchTab(tab) {{
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      if (tab === 'graph') {{
        document.querySelector('.tab-btn:nth-child(1)').classList.add('active');
        document.getElementById('view-graph').style.display = 'flex';
        document.getElementById('view-briefings').style.display = 'none';
        setTimeout(fitGraph, 50);
      }} else {{
        document.querySelector('.tab-btn:nth-child(2)').classList.add('active');
        document.getElementById('view-graph').style.display = 'none';
        document.getElementById('view-briefings').style.display = 'block';
      }}
    }}
  </script>
</body>
</html>
"""

    with open(DASHBOARD_HTML_FILE, "w", encoding="utf-8") as f:
        f.write(html_content)

    # Sync to root repository file for GitHub Pages
    root_file = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "thousand_oaks_civic_graph.html")
    with open(root_file, "w", encoding="utf-8") as f:
        f.write(html_content)

    print(f"Generated Interactive Dashboard at {DASHBOARD_HTML_FILE} and {root_file}")
    return DASHBOARD_HTML_FILE


if __name__ == "__main__":
    generate_dashboard_html()
