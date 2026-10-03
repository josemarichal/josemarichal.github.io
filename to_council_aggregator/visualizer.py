"""
Visualizer for Thousand Oaks Municipal Knowledge Graph & Civic Dashboard.
Generates a standalone, highly aesthetic interactive HTML application.
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
    """Render HTML cards for the news briefing tab."""
    cards_html = []
    for s in summaries:
        title = s.get("title", "Meeting")
        display_date = s.get("display_date", s.get("meeting_date", ""))
        duration = s.get("duration_str", "")
        body_name = s.get("body_name", "")
        url = s.get("url", "")
        exec_summary = s.get("executive_summary", "")

        chips = []
        for item in s.get("agenda_items", []):
            item_id = item.get("identifier", "Item")
            item_title = item.get("title", "")
            jump_url = item.get("jump_url", "")
            timestamp = item.get("timestamp", "00:00")
            chips.append(f"""
              <div class="item-chip">
                <span>{item_id}: {item_title}</span>
                <a href="{jump_url}" target="_blank">&#9201; {timestamp}</a>
              </div>
            """)

        chips_html = "".join(chips) if chips else "<p style='color: var(--text-muted); font-size: 0.8rem;'>No individual items indexed.</p>"

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

          <h4 style="font-size: 0.8rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.65rem;">Key Agenda Actions &amp; Timestamps</h4>
          <div>
            {chips_html}
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

    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thousand Oaks Civic Knowledge Graph &amp; Meeting Tracker</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <script src="https://unpkg.com/vis-network/standalone/umd/vis-network.min.js"></script>
  <style>
    :root {{
      --bg-dark: #090d16;
      --bg-card: #131b2e;
      --bg-card-hover: #1c2742;
      --border-color: rgba(255, 255, 255, 0.08);
      --border-accent: rgba(56, 189, 248, 0.25);
      --text-main: #f1f5f9;
      --text-muted: #94a3b8;
      --accent-cyan: #38bdf8;
      --accent-emerald: #10b981;
      --accent-purple: #a855f7;
      --accent-amber: #f59e0b;
      --accent-rose: #f43f5e;
      --accent-indigo: #6366f1;
    }}

    * {{
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    }}

    body {{
      background-color: var(--bg-dark);
      color: var(--text-main);
      min-height: 100vh;
      overflow-x: hidden;
      display: flex;
      flex-direction: column;
    }}

    header {{
      background: rgba(19, 27, 46, 0.85);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border-color);
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
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
      padding: 0.25rem 0.65rem;
      border-radius: 999px;
      font-size: 0.75rem;
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
      font-size: 1.25rem;
      font-weight: 700;
      letter-spacing: -0.02em;
    }}

    .source-sub {{
      color: var(--text-muted);
      font-size: 0.8rem;
    }}

    .nav-tabs {{
      display: flex;
      gap: 0.5rem;
      background: rgba(0, 0, 0, 0.3);
      padding: 0.3rem;
      border-radius: 10px;
      border: 1px solid var(--border-color);
    }}

    .tab-btn {{
      background: transparent;
      border: none;
      color: var(--text-muted);
      padding: 0.5rem 1rem;
      border-radius: 7px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }}

    .tab-btn.active {{
      background: var(--accent-cyan);
      color: #090d16;
    }}

    .app-body {{
      display: flex;
      flex: 1;
      height: calc(100vh - 72px);
      position: relative;
    }}

    #view-graph {{
      display: flex;
      flex: 1;
      width: 100%;
      height: 100%;
    }}

    #network-container {{
      flex: 1;
      height: 100%;
      position: relative;
      background: radial-gradient(circle at 50% 50%, #151e36 0%, #090d16 100%);
    }}

    .graph-controls {{
      position: absolute;
      top: 1.25rem;
      left: 1.25rem;
      z-index: 10;
      background: rgba(19, 27, 46, 0.88);
      backdrop-filter: blur(10px);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      width: 290px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }}

    .search-input {{
      width: 100%;
      background: #090d16;
      border: 1px solid var(--border-color);
      color: var(--text-main);
      padding: 0.6rem 0.85rem;
      border-radius: 8px;
      font-size: 0.85rem;
      outline: none;
    }}

    .search-input:focus {{
      border-color: var(--accent-cyan);
    }}

    .legend-list {{
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      font-size: 0.78rem;
    }}

    .legend-item {{
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--text-muted);
      cursor: pointer;
      user-select: none;
    }}

    .legend-color {{
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }}

    .inspector-panel {{
      width: 420px;
      background: var(--bg-card);
      border-left: 1px solid var(--border-color);
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow-y: auto;
      padding: 1.5rem;
      box-shadow: -5px 0 25px rgba(0, 0, 0, 0.3);
    }}

    .inspector-title {{
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 0.35rem;
      color: var(--text-main);
    }}

    .node-badge {{
      display: inline-block;
      padding: 0.2rem 0.6rem;
      border-radius: 6px;
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
      margin-bottom: 1rem;
    }}

    .badge-official {{ background: rgba(16, 185, 129, 0.2); color: var(--accent-emerald); border: 1px solid var(--accent-emerald); }}
    .badge-meeting {{ background: rgba(56, 189, 248, 0.2); color: var(--accent-cyan); border: 1px solid var(--accent-cyan); }}
    .badge-agenda_item {{ background: rgba(99, 102, 241, 0.2); color: var(--accent-indigo); border: 1px solid var(--accent-indigo); }}
    .badge-organization {{ background: rgba(245, 158, 11, 0.2); color: var(--accent-amber); border: 1px solid var(--accent-amber); }}

    .dossier-card {{
      background: rgba(9, 13, 22, 0.6);
      border: 1px solid var(--border-color);
      border-radius: 10px;
      padding: 1rem;
      margin-bottom: 1rem;
    }}

    .dossier-card h4 {{
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-muted);
      margin-bottom: 0.5rem;
    }}

    .relations-list {{
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }}

    .rel-item {{
      background: var(--bg-card-hover);
      padding: 0.65rem 0.85rem;
      border-radius: 7px;
      font-size: 0.82rem;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      border: 1px solid rgba(255, 255, 255, 0.04);
      cursor: pointer;
    }}

    .rel-tag {{
      font-size: 0.68rem;
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
      padding: 0.55rem 0.9rem;
      border-radius: 8px;
      font-size: 0.82rem;
      margin-top: 0.75rem;
      transition: background 0.2s;
    }}

    .yt-btn:hover {{
      background: #b91c1c;
    }}

    #view-briefings {{
      display: none;
      flex: 1;
      overflow-y: auto;
      padding: 2.5rem;
      background: var(--bg-dark);
    }}

    .briefings-grid {{
      max-width: 1000px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }}

    .briefing-card {{
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 14px;
      padding: 1.75rem;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
    }}

    .briefing-header {{
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
      border-bottom: 1px solid var(--border-color);
      padding-bottom: 1rem;
    }}

    .briefing-title {{
      font-size: 1.35rem;
      font-weight: 700;
      color: var(--accent-cyan);
      margin-bottom: 0.35rem;
    }}

    .item-chip {{
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(255, 255, 255, 0.05);
      padding: 0.4rem 0.75rem;
      border-radius: 6px;
      font-size: 0.8rem;
      margin-bottom: 0.5rem;
      margin-right: 0.5rem;
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
          <h1>Thousand Oaks Civic Graph</h1>
          <span class="badge-live">Live Feed: @ctomeetings</span>
        </div>
        <div class="source-sub">Automated Municipal Intelligence &bull; City Council, Planning Commission, COSCA</div>
      </div>
    </div>

    <div class="nav-tabs">
      <button class="tab-btn active" onclick="switchTab('graph')">&#127760; Interactive Knowledge Graph</button>
      <button class="tab-btn" onclick="switchTab('briefings')">&#128240; Meeting Briefings &amp; News</button>
    </div>
  </header>

  <div class="app-body">
    <!-- GRAPH VIEW -->
    <div id="view-graph">
      <div id="network-container">
        <div class="graph-controls">
          <input type="text" id="nodeSearch" class="search-input" placeholder="&#128269; Search official, project, developer..." oninput="handleSearch(this.value)">
          <div class="legend-list">
            <div class="legend-item" onclick="filterType('all')">
              <span class="legend-color" style="background: white;"></span> Show All ({node_count} Nodes)
            </div>
            <div class="legend-item" onclick="filterType('official')">
              <span class="legend-color" style="background: var(--accent-emerald);"></span> Officials &amp; Staff
            </div>
            <div class="legend-item" onclick="filterType('agenda_item')">
              <span class="legend-color" style="background: var(--accent-indigo);"></span> Ordinances &amp; Projects
            </div>
            <div class="legend-item" onclick="filterType('organization')">
              <span class="legend-color" style="background: var(--accent-amber);"></span> Organizations &amp; Applicants
            </div>
            <div class="legend-item" onclick="filterType('meeting')">
              <span class="legend-color" style="background: var(--accent-cyan);"></span> Council &amp; Commission Meetings
            </div>
          </div>
        </div>
      </div>

      <!-- SIDEBAR INSPECTOR -->
      <div class="inspector-panel" id="inspector">
        <div id="empty-state" style="text-align: center; color: var(--text-muted); margin-top: 4rem;">
          <div style="font-size: 2.5rem; margin-bottom: 1rem;">&#127963;&#65039;</div>
          <h3>Select a Civic Entity</h3>
          <p style="font-size: 0.85rem; margin-top: 0.5rem; line-height: 1.5;">Click on any Councilmember, Ordinance, Meeting, or Developer node in the graph to view voting dossiers, relations, and exact video jump points.</p>
        </div>

        <div id="dossier-content" style="display: none;">
          <div id="dossier-badge" class="node-badge"></div>
          <h2 id="dossier-title" class="inspector-title"></h2>
          <div id="dossier-sub" style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 1.25rem;"></div>

          <div class="dossier-card">
            <h4>Primary Dossier</h4>
            <div id="dossier-attributes" style="font-size: 0.85rem; line-height: 1.6;"></div>
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
        <h2 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 0.5rem;">Recent Municipal Briefings</h2>
        <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Synthesized summaries and timestamped roll calls extracted directly from the City of Thousand Oaks YouTube broadcasts.</p>

        {briefings_html}
      </div>
    </div>
  </div>

  <script>
    // Raw graph data injected from Python
    const graphData = {graph_json_str};

    // Map node types to visual styles
    const typeColors = {{
      official: {{ background: '#10b981', border: '#059669', font: '#ffffff' }},
      agenda_item: {{ background: '#6366f1', border: '#4f46e5', font: '#ffffff' }},
      organization: {{ background: '#f59e0b', border: '#d97706', font: '#ffffff' }},
      meeting: {{ background: '#38bdf8', border: '#0284c7', font: '#090d16' }}
    }};

    // Prepare Vis.js DataSet
    const visNodes = new vis.DataSet(
      (graphData.nodes || []).map(n => {{
        const style = typeColors[n.type] || {{ background: '#64748b', border: '#475569', font: '#fff' }};
        return {{
          id: n.id,
          label: n.label,
          type: n.type,
          shape: n.type === 'meeting' ? 'box' : (n.type === 'official' ? 'circle' : 'dot'),
          size: n.type === 'meeting' ? 24 : (n.type === 'official' ? 20 : 15),
          color: {{
            background: style.background,
            border: style.border,
            highlight: {{ background: '#ffffff', border: style.background }}
          }},
          font: {{ color: style.font || '#fff', size: 12, face: 'Plus Jakarta Sans', bold: true }},
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
        color: {{ color: 'rgba(255, 255, 255, 0.2)', highlight: '#38bdf8' }},
        arrows: 'to',
        raw: l
      }}))
    );

    // Initialize Network
    const container = document.getElementById('network-container');
    const options = {{
      nodes: {{ borderWidth: 2 }},
      edges: {{ smooth: {{ type: 'continuous' }} }},
      physics: {{
        barnesHut: {{
          gravitationalConstant: -3500,
          centralGravity: 0.35,
          springLength: 130,
          springConstant: 0.04
        }},
        stabilization: {{ iterations: 150 }}
      }},
      interaction: {{ hover: true, tooltipDelay: 200 }}
    }};

    const network = new vis.Network(container, {{ nodes: visNodes, edges: visEdges }}, options);

    // Click handler for sidebar inspector
    network.on('click', function(params) {{
      if (params.nodes.length > 0) {{
        const nodeId = params.nodes[0];
        showNodeInspector(nodeId);
      }}
    }});

    function showNodeInspector(nodeId) {{
      const node = visNodes.get(nodeId);
      if (!node) return;
      const raw = node.raw;

      document.getElementById('empty-state').style.display = 'none';
      document.getElementById('dossier-content').style.display = 'block';

      // Title & Badge
      document.getElementById('dossier-title').innerText = raw.label;
      const badge = document.getElementById('dossier-badge');
      badge.innerText = (raw.type || '').replace('_', ' ');
      badge.className = `node-badge badge-${{raw.type}}`;

      // Attributes
      let attrHtml = '';
      if (raw.type === 'official') {{
        attrHtml = `<strong>Role:</strong> ${{raw.role || 'City Official'}}<br><strong>Status:</strong> ${{raw.status || 'Active'}}<br><strong>Centrality Score:</strong> ${{raw.centrality || 'N/A'}}`;
      }} else if (raw.type === 'meeting') {{
        attrHtml = `<strong>Body:</strong> ${{raw.body || 'Municipal'}}<br><strong>Date:</strong> ${{raw.date || 'Recent'}}<br><strong>Video Broadcast:</strong> Available`;
      }} else if (raw.type === 'agenda_item') {{
        attrHtml = `<strong>Item Type:</strong> ${{raw.item_type || 'Ordinance / Hearing'}}<br><strong>Action:</strong> ${{raw.status || 'Deliberated'}}<br><strong>Timestamp:</strong> ${{raw.timestamp || 'N/A'}}`;
      }} else if (raw.type === 'organization') {{
        attrHtml = `<strong>Category:</strong> ${{raw.subtype || 'Organization'}}<br><strong>Jurisdiction:</strong> Conejo Valley / Ventura County`;
      }}
      document.getElementById('dossier-attributes').innerHTML = attrHtml;

      // Jump Button
      const actionContainer = document.getElementById('dossier-action-btn');
      if (raw.jump_url) {{
        actionContainer.innerHTML = `<a href="${{raw.jump_url}}" target="_blank" class="yt-btn">&#9654; Jump to Timestamp (${{raw.timestamp}})</a>`;
      }} else if (raw.url) {{
        actionContainer.innerHTML = `<a href="${{raw.url}}" target="_blank" class="yt-btn">&#9654; Open Full Meeting Recording</a>`;
      }} else {{
        actionContainer.innerHTML = '';
      }}

      // Connected Links
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

    // Search
    function handleSearch(query) {{
      if (!query.trim()) return;
      const matched = visNodes.get({{
        filter: n => n.label.toLowerCase().includes(query.toLowerCase())
      }});
      if (matched.length > 0) {{
        const targetId = matched[0].id;
        network.selectNodes([targetId]);
        network.focus(targetId, {{ scale: 1.2, animation: true }});
        showNodeInspector(targetId);
      }}
    }}

    // Filter
    function filterType(type) {{
      if (type === 'all') {{
        visNodes.forEach(n => visNodes.update({{ id: n.id, hidden: false }}));
      }} else {{
        visNodes.forEach(n => {{
          visNodes.update({{ id: n.id, hidden: n.type !== type }});
        }});
      }}
    }}

    // Tab switching
    function switchTab(tab) {{
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      if (tab === 'graph') {{
        document.querySelector('.tab-btn:nth-child(1)').classList.add('active');
        document.getElementById('view-graph').style.display = 'flex';
        document.getElementById('view-briefings').style.display = 'none';
        network.fit();
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

    print(f"Generated Interactive Dashboard at {DASHBOARD_HTML_FILE}")
    return DASHBOARD_HTML_FILE


if __name__ == "__main__":
    generate_dashboard_html()
