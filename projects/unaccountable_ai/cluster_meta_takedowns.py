import html
import json
import math
import os
import re
import numpy as np
import pandas as pd
from sentence_transformers import SentenceTransformer
from sklearn.cluster import KMeans
from sklearn.feature_extraction.text import TfidfVectorizer
import umap

OUT_DIR = r"c:\Users\jfmar\josemarichal\github.io\projects\unaccountable_ai"
RAW_CSV = os.path.join(OUT_DIR, "meta_takedowns_raw.csv")
CATALOG_CSV = os.path.join(OUT_DIR, "meta_takedowns_catalog.csv")
HTML_MAP = os.path.join(OUT_DIR, "meta_takedowns_map.html")

PAGE_TYPE_RULES = [
    ("LGBTQ+ Bars, Queer Venues & Drag/Nightlife Spaces", r"\b(gay bar|gay bars|lgbt|lgbtq|queer|drag|pride|trans|lesbian|stud|oasis|nightclub|club pages)\b"),
    ("Political Protest, Activism, ICE-Tracking & Campaign Pages", r"\b(no kings|protest|activist|ice|doj|bondi|campaign|candidate|democratic|coalition|anti-trump|movement|palestine|gaza|abortion|union)\b"),
    ("Independent Local News, Journalists & Media Outlets", r"\b(bloomingtonian|media line|malaysiakini|wake up singapore|journalist|journalists|newspaper|news outlet|reporter|press|publication|wine report|radio)\b"),
    ("Elected Officials, Courts, Civic & Government Pages", r"\b(chief minister|high court|mp |minister|mayor|gov|government|city of|police department|sheriff|embassy|parliament|spokesperson)\b"),
    ("Local Restaurants, Bars, Diners, Retail & Small Businesses", r"\b(diner|restaurant|bakery|cafe|coffee|bar |pub |brewery|small business|business|shop|store|brand|livelihood|ad account|blink digital|entrepreneur)\b"),
    ("Nonprofits, Animal Rescues, Charities & Community Groups", r"\b(animal rescue|shelter|charity|nonprofit|non-profit|church|ministry|disability advocate|archivists|anti-racism|veterans|community group|group)\b"),
    ("Personal Creators, Impersonation False-Positives & AI Support Lockouts", r"\b(20-year|19 years|content creator|reach a human|ai customer service|paid support|mark zuckerberg sues|lawyer|hacked|impersonation|ai moderation)\b"),
]

VIOLATION_RULES = [
    ("CSE / Adult Sexual Solicitation False Positive", r"\b(cse|child sexual|sexual|nudity|adult|solicitation|explicit)\b"),
    ("AI Moderation Glitch / Paid Support Loop ('No Human')", r"\b(ai moderation|ai customer service|reach a human|paid support|automated|technical error|mistakenly)\b"),
    ("Government / DOJ / Law Enforcement Takedown Request", r"\b(doj|justice department|high court|govt|minister|government request|centre|imda)\b"),
    ("Account Integrity / Impersonation False Positive", r"\b(account integrity|integrity|impersonat|authentic|inauthentic|fake account|identity|pose as)\b"),
    ("Cybersecurity / Spam / Recommendation Throttle", r"\b(cybersecurity|spam|phishing|recommendation suspension|throttles|scam)\b"),
    ("Dangerous Organizations / Hate Speech / Terrorism Filter", r"\b(dangerous individuals|dangerous organizations|hate speech|violence|incitement|terrorism)\b"),
    ("Copyright / Counterfeit / Trademark Automated Strike", r"\b(copyright|dmca|trademark|intellectual property|counterfeit)\b"),
]


def classify_rule(text, rules, default_label):
    text_l = str(text).lower()
    for label, pattern in rules:
        if re.search(pattern, text_l):
            return label
    return default_label


def clean_for_clustering(df):
    df = df.copy()
    df["title"] = df["title"].fillna("").apply(lambda s: html.unescape(str(s)).replace("\xa0", " ").strip())
    df["text"] = df["text"].fillna("").apply(lambda s: html.unescape(str(s)).replace("\xa0", " "))
    df["text"] = df["text"].apply(lambda s: re.sub(r"\bnbsp\b", " ", s, flags=re.I))
    df["text"] = df["text"].apply(lambda s: re.sub(r"\s+", " ", s).strip())

    # Require that the headline/snippet explicitly mentions Facebook, Instagram, Meta, or Threads
    platform_pat = re.compile(r"\b(facebook|instagram|meta|threads|fb)\b", re.I)
    action_pat = re.compile(
        r"\b(suspend|disabled|disables|taken down|takes down|took down|shut down|shuts down|ban|banned|bans|banning|delet|remov|unpublish|lock|block|throttl|kick|kicking|restor)\w*\b",
        re.I,
    )
    exclude_pat = re.compile(
        r"\b(traffic stop|police officer suspended|mayor .* removed from office|banned book|rainbow gear|chaz bono)\b",
        re.I,
    )

    mask = (
        df["title"].str.contains(platform_pat)
        & df["title"].str.contains(action_pat)
        & (~df["title"].str.contains(exclude_pat))
    )
    df = df[mask].copy()
    df = df.drop_duplicates(subset=["title"]).reset_index(drop=True)

    df["inferred_page_type"] = df["text"].apply(
        lambda t: classify_rule(t, PAGE_TYPE_RULES, "Community Pages, Creators & General Accounts")
    )
    df["stated_or_suspected_reason"] = df["text"].apply(
        lambda t: classify_rule(t, VIOLATION_RULES, "No Reason Given / Opaque 'Community Standards'")
    )
    return df


def main():
    df = pd.read_csv(RAW_CSV)
    print(f"Loaded {len(df)} raw records.")
    df = clean_for_clustering(df)
    print(f"After strict Meta-takedown filtering & deduplication: {len(df)} verified takedown reports.")

    # Embed headline + page category + moderation pattern so clusters organize cleanly by page type & context
    docs = [
        f"{row['inferred_page_type']} | {row['title']} | {row['stated_or_suspected_reason']}"
        for _, row in df.iterrows()
    ]

    embedder = SentenceTransformer("all-MiniLM-L6-v2")
    embeddings = embedder.encode(docs, show_progress_bar=False)

    reducer = umap.UMAP(
        n_neighbors=14,
        min_dist=0.15,
        n_components=2,
        metric="cosine",
        random_state=42,
    )
    coords = reducer.fit_transform(embeddings)
    df["x"] = coords[:, 0]
    df["y"] = coords[:, 1]

    n_clusters = 7
    km = KMeans(n_clusters=n_clusters, random_state=42, n_init=25)
    raw_labels = km.fit_predict(embeddings)

    counts = pd.Series(raw_labels).value_counts()
    order_map = {old_c: new_c for new_c, old_c in enumerate(counts.index)}
    df["cluster_id"] = [order_map[c] for c in raw_labels]
    df["cluster_rank"] = df["cluster_id"] + 1

    stop_extra = {
        "facebook", "meta", "page", "pages", "account", "accounts", "instagram",
        "suspended", "disabled", "taken", "down", "shut", "banned", "deleted",
        "removed", "unpublished", "just", "like", "got", "has", "have", "was",
        "were", "our", "my", "their", "from", "with", "that", "this", "for",
        "and", "the", "are", "not", "can", "anyone", "help", "please", "know",
        "what", "why", "how", "after", "over", "about", "new", "news", "post",
        "posts", "nbsp", "says", "tells", "calls", "users", "social", "media",
    }
    vec = TfidfVectorizer(
        stop_words="english",
        ngram_range=(1, 2),
        max_features=1800,
        min_df=2,
    )
    X_tfidf = vec.fit_transform(df["title"])
    vocab = np.array(vec.get_feature_names_out())

    palette = [
        "#1d4ed8",  # #1 Royal Blue
        "#b91c1c",  # #2 Crimson
        "#047857",  # #3 Emerald
        "#7c3aed",  # #4 Violet
        "#d97706",  # #5 Amber
        "#0e7490",  # #6 Cyan
        "#be185d",  # #7 Magenta
    ]

    used_titles = set()
    cluster_meta = []

    for cid in range(n_clusters):
        sub = df[df["cluster_id"] == cid]
        pos_idxs = np.where(df["cluster_id"].values == cid)[0]
        word_scores = np.asarray(X_tfidf[pos_idxs].mean(axis=0)).ravel()
        top_word_idxs = word_scores.argsort()[::-1]
        top_words = []
        for wi in top_word_idxs:
            w = vocab[wi]
            tokens = set(w.split())
            if not (tokens & stop_extra) and len(w) > 2 and not w.isdigit():
                top_words.append(w)
            if len(top_words) >= 6:
                break

        # Pick the most common inferred_page_type not yet used, or refine with top keywords
        type_counts = sub["inferred_page_type"].value_counts()
        chosen_title = type_counts.index[0]
        if chosen_title in used_titles:
            for candidate in type_counts.index[1:]:
                if candidate not in used_titles:
                    chosen_title = candidate
                    break
            else:
                 chosen_title = f"{chosen_title} ({', '.join(top_words[:2]).title()})"
        used_titles.add(chosen_title)

        dom_reason = sub["stated_or_suspected_reason"].value_counts().index[0]
        cx = float(sub["x"].mean())
        cy = float(sub["y"].mean())
        samples = [ re.sub(r"\s+-\s+[^-]+$", "", t) for t in sub["title"].head(3).tolist() ]

        cluster_meta.append({
            "cid": cid,
            "rank": cid + 1,
            "count": len(sub),
            "color": palette[cid % len(palette)],
            "title": chosen_title,
            "dominant_reason": dom_reason,
            "keywords": ", ".join(top_words),
            "cx": cx,
            "cy": cy,
            "samples": samples,
        })

    cid_to_title = {m["cid"]: m["title"] for m in cluster_meta}
    df["cluster_name"] = df["cluster_id"].map(cid_to_title)
    df.to_csv(CATALOG_CSV, index=False, encoding="utf-8")
    print(f"Saved {len(df)} rows to {CATALOG_CSV}")
    for m in cluster_meta:
        print(f"  #{m['rank']} (n={m['count']}): {m['title']} | [{m['keywords']}]")

    build_interactive_html(df, cluster_meta)


def build_interactive_html(df, cluster_meta):
    traces = []
    for m in cluster_meta:
        sub = df[df["cluster_id"] == m["cid"]]
        hover_texts = [
            f"<b>Cluster #{m['rank']}: {m['title']}</b><br>"
            f"<b>Publisher:</b> {r['sub_source']} ({r['created_at'][:16]})<br>"
            f"<b>Headline:</b> {str(r['title'])[:115]}<br>"
            f"<b>Moderation Pattern:</b> {r['stated_or_suspected_reason']}"
            for _, r in sub.iterrows()
        ]
        traces.append({
            "type": "scatter",
            "mode": "markers",
            "name": f"#{m['rank']} {m['title'][:32]} (n={m['count']})",
            "x": [float(v) for v in sub["x"]],
            "y": [float(v) for v in sub["y"]],
            "text": hover_texts,
            "hoverinfo": "text",
            "marker": {
                "size": 10,
                "opacity": 0.72,
                "color": m["color"],
                "line": {"width": 0.8, "color": "#ffffff"},
            },
        })

    traces.append({
        "type": "scatter",
        "mode": "markers",
        "name": "Cluster Centroids (#1–#7)",
        "x": [m["cx"] for m in cluster_meta],
        "y": [m["cy"] for m in cluster_meta],
        "hoverinfo": "skip",
        "marker": {
            "size": [max(34, int(math.sqrt(m["count"]) * 9.0)) for m in cluster_meta],
            "color": [m["color"] for m in cluster_meta],
            "opacity": 0.22,
            "line": {"width": 3, "color": [m["color"] for m in cluster_meta]},
        },
        "showlegend": False,
    })

    annotations = []
    for m in cluster_meta:
        annotations.append({
            "x": m["cx"],
            "y": m["cy"],
            "xref": "x",
            "yref": "y",
            "text": f"<b>{m['rank']}</b>",
            "showarrow": False,
            "bgcolor": m["color"],
            "bordercolor": "#ffffff",
            "borderwidth": 2,
            "borderpad": 5,
            "font": {"family": "Arial Black, sans-serif", "size": 13, "color": "#ffffff"},
        })

    min_x, max_x = float(df["x"].min()), float(df["x"].max())
    min_y, max_y = float(df["y"].min()), float(df["y"].max())
    pad_x = (max_x - min_x) * 0.18
    pad_y = (max_y - min_y) * 0.18

    layout = {
        "title": {
            "text": "<b>Meta Page Takedowns — UMAP Cluster Distance Map (#1–#7)</b>",
            "font": {"size": 16, "color": "#0f172a"},
            "x": 0.5,
        },
        "width": 740,
        "height": 680,
        "margin": {"l": 60, "r": 30, "t": 55, "b": 55},
        "plot_bgcolor": "#f8fafc",
        "paper_bgcolor": "#ffffff",
        "xaxis": {
            "title": "UMAP Dimension 1",
            "range": [min_x - pad_x, max_x + pad_x],
            "gridcolor": "#e2e8f0",
            "zerolinecolor": "#cbd5e1",
        },
        "yaxis": {
            "title": "UMAP Dimension 2",
            "range": [min_y - pad_y, max_y + pad_y],
            "gridcolor": "#e2e8f0",
            "zerolinecolor": "#cbd5e1",
        },
        "annotations": annotations,
        "showlegend": False,
        "hovermode": "closest",
    }

    legend_items = []
    for m in cluster_meta:
        sample_li = "".join(
            f"<li style='margin-top:3px;font-size:11px;color:#334155'>• {s[:95]}{'...' if len(s)>95 else ''}</li>"
            for s in m["samples"][:2]
        )
        legend_items.append(f"""
        <li class="cluster-card" style="border-left: 5px solid {m['color']}">
          <div class="badge" style="background:{m['color']}">{m['rank']}</div>
          <div class="card-body">
            <div class="card-top">
              <span class="card-title">{m['title']}</span>
              <span class="card-count">n = {m['count']}</span>
            </div>
            <div class="card-reason"><b>Moderation Pattern:</b> {m['dominant_reason']}</div>
            <div class="card-words"><b>Keywords:</b> {m['keywords']}</div>
            <ul style="margin:4px 0 0 0;padding-left:4px;list-style:none">{sample_li}</ul>
          </div>
        </li>
        """)

    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Meta / Facebook Page Takedowns — Cluster Map & Catalog</title>
  <script src="https://cdn.plot.ly/plotly-2.32.0.min.js"></script>
  <style>
    body {{
      margin: 0;
      padding: 20px 28px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #f1f5f9;
      color: #0f172a;
    }}
    .header {{
      max-width: 1400px;
      margin: 0 auto 14px auto;
      padding-bottom: 10px;
      border-bottom: 2px solid #cbd5e1;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
    }}
    .header h1 {{ margin: 0; font-size: 21px; font-weight: 800; }}
    .header p {{ margin: 0; font-size: 13px; color: #475569; }}
    .main-grid {{
      max-width: 1400px;
      margin: 0 auto;
      display: flex;
      gap: 22px;
      align-items: flex-start;
      background: #ffffff;
      padding: 18px;
      border-radius: 12px;
      box-shadow: 0 4px 16px rgba(15,23,42,0.06);
      border: 1px solid #e2e8f0;
    }}
    #plot-div {{ flex: 1 1 720px; min-width: 640px; }}
    .legend-panel {{
      flex: 0 0 480px;
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      padding: 16px;
      max-height: 700px;
      overflow-y: auto;
    }}
    .legend-panel h2 {{ margin: 0 0 4px 0; font-size: 15px; }}
    .legend-panel .sub {{ margin: 0 0 12px 0; font-size: 12px; color: #64748b; }}
    .cluster-list {{ list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }}
    .cluster-card {{
      display: flex;
      gap: 11px;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 10px 12px;
    }}
    .badge {{
      flex: 0 0 26px;
      height: 26px;
      border-radius: 50%;
      color: #fff;
      font-weight: 800;
      font-size: 13px;
      display: flex;
      align-items: center;
      justify-content: center;
    }}
    .card-body {{ flex: 1; min-width: 0; }}
    .card-top {{ display: flex; justify-content: space-between; align-items: baseline; gap: 6px; margin-bottom: 3px; }}
    .card-title {{ font-size: 13px; font-weight: 700; color: #0f172a; }}
    .card-count {{ font-size: 11.5px; font-weight: 700; background: #e0f2fe; color: #0369a1; padding: 1px 6px; border-radius: 4px; white-space: nowrap; }}
    .card-reason {{ font-size: 11.5px; color: #b91c1c; margin-bottom: 2px; }}
    .card-words {{ font-size: 11px; color: #475569; font-family: monospace; }}
  </style>
</head>
<body>
  <div class="header">
    <h1>Unaccountable AI: Meta Page Takedown Cluster Map (n = {len(df):,} Verified Reports)</h1>
    <p>Timeframe: Last 6 Months (May – Nov 2026) | Harvested via Google News RSS | MiniLM-L6-v2 + UMAP (#1–#7)</p>
  </div>
  <div class="main-grid">
    <div id="plot-div"></div>
    <aside class="legend-panel">
      <h2>7 Clustered Page Takedown Archetypes</h2>
      <p class="sub">Numbers <b>1–7</b> match the cluster centroids on the map. Hover any point to inspect the individual takedown report.</p>
      <ul class="cluster-list">
        {"".join(legend_items)}
      </ul>
    </aside>
  </div>
  <script>
    const traces = {json.dumps(traces)};
    const layout = {json.dumps(layout)};
    Plotly.newPlot("plot-div", traces, layout, {{responsive: true}});
  </script>
</body>
</html>
"""
    with open(HTML_MAP, "w", encoding="utf-8") as f:
        f.write(html_content)
    print(f"Saved interactive cluster map to {HTML_MAP}")


if __name__ == "__main__":
    main()
