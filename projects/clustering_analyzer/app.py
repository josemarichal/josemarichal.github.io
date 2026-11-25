"""
Document & Artifact Clustering Analyzer (Gradio 6.0)
--------------------------------------------------
Implements all 5 clustering algorithms:
  1. K-Means
  2. Mean-Shift
  3. DBSCAN (density-based + noise/outlier detection)
  4. Expectation-Maximization using Gaussian Mixture Models (GMM)
  5. Hierarchical Agglomerative Clustering

Supports local TF-IDF vectors by default, or optional Hugging Face
sentence embeddings when an HF token is supplied.
"""

import os
import tempfile
import numpy as np
import pandas as pd
import plotly.express as px
import requests
import gradio as gr

from sklearn.cluster import AgglomerativeClustering, DBSCAN, KMeans, MeanShift, estimate_bandwidth
from sklearn.decomposition import PCA, TruncatedSVD
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.manifold import TSNE
from sklearn.mixture import GaussianMixture
from sklearn.preprocessing import StandardScaler

HF_EMBED_URL = (
    "https://router.huggingface.co/hf-inference/models/"
    "sentence-transformers/all-MiniLM-L6-v2/pipeline/feature-extraction"
)


def load_documents(file_obj, raw_text: str, mode: str) -> tuple[str, pd.DataFrame | None, str | None]:
    if mode == "Upload Dataset Sheet":
        if file_obj is None:
            return "Please upload a `.csv` or `.xlsx` file.", None, None
        path = file_obj.name if hasattr(file_obj, "name") else str(file_obj)
        df = pd.read_excel(path) if path.lower().endswith(".xlsx") else pd.read_csv(path)
        text_cols = [c for c in df.columns if df[c].dtype == object or str(df[c].dtype) == "string"]
        if not text_cols:
            return "No text column found in the uploaded sheet.", None, None
        # Prefer common text column names if present
        preferred = next((c for c in text_cols if c.lower() in {"text", "content", "snippet", "body", "document", "caption"}), text_cols[0])
        df = df.dropna(subset=[preferred]).copy()
        df[preferred] = df[preferred].astype(str)
        return "", df, preferred

    lines = [ln.strip() for ln in (raw_text or "").splitlines() if ln.strip()]
    if len(lines) < 3:
        return "Please enter at least 3 non-empty lines/documents.", None, None
    return "", pd.DataFrame({"Text": lines}), "Text"


def get_hf_embeddings(texts: list[str], hf_token: str) -> tuple[np.ndarray | None, str]:
    try:
        resp = requests.post(
            HF_EMBED_URL,
            headers={"Authorization": f"Bearer {hf_token.strip()}"},
            json={"inputs": texts, "options": {"wait_for_model": True}},
            timeout=30,
        )
        if resp.status_code != 200:
            return None, f"HF embeddings HTTP {resp.status_code}; fell back to TF-IDF."
        arr = np.array(resp.json(), dtype=float)
        if arr.ndim == 3:
            arr = arr.mean(axis=1)
        return arr, "Using Hugging Face embeddings (`all-MiniLM-L6-v2`)."
    except Exception as exc:
        return None, f"HF embeddings error ({exc}); fell back to TF-IDF."


def run_clustering(
    file_obj,
    raw_text: str,
    mode: str,
    algo: str,
    k: int,
    quantile: float,
    eps: float,
    min_samples: int,
    reduction: str,
    hf_token: str,
):
    err, df, text_col = load_documents(file_obj, raw_text, mode)
    if err:
        return err, None, None, None, None, ""

    texts = df[text_col].tolist()
    n_docs = len(texts)

    # Always fit TF-IDF for keyword summaries; optionally use HF embeddings for clustering
    vectorizer = TfidfVectorizer(stop_words="english", max_features=1500)
    tfidf_matrix = vectorizer.fit_transform(texts)
    X_tfidf = tfidf_matrix.toarray()

    embed_note = "Using local TF-IDF vectors."
    X = X_tfidf
    if hf_token and hf_token.strip():
        hf_vecs, embed_note = get_hf_embeddings(texts, hf_token)
        if hf_vecs is not None and len(hf_vecs) == n_docs:
            X = hf_vecs

    # Reduce to compact space for density/GMM stability when high-dimensional
    n_comp = min(20, max(2, n_docs - 1), X.shape[1])
    X_work = TruncatedSVD(n_components=n_comp, random_state=42).fit_transform(X) if X.shape[1] > n_comp else X
    X_work = StandardScaler().fit_transform(X_work)

    # 2D projection for visualization
    if reduction == "t-SNE" and n_docs >= 5:
        perp = min(30, max(2, n_docs // 3))
        coords = TSNE(n_components=2, perplexity=perp, random_state=42).fit_transform(X_work)
    else:
        coords = PCA(n_components=2, random_state=42).fit_transform(X_work)

    k_safe = min(int(k), max(2, n_docs - 1))
    probs_note = None

    if algo == "K-Means":
        labels = KMeans(n_clusters=k_safe, random_state=42, n_init="auto").fit_predict(X_work)
    elif algo == "Mean-Shift":
        bw = estimate_bandwidth(coords, quantile=float(quantile), n_samples=min(500, n_docs))
        if bw <= 0:
            bw = 1.0
        labels = MeanShift(bandwidth=bw, bin_seeding=True).fit_predict(coords)
    elif algo == "DBSCAN":
        labels = DBSCAN(eps=float(eps), min_samples=int(min_samples)).fit_predict(coords)
    elif algo == "Expectation-Maximization (GMM)":
        gmm = GaussianMixture(n_components=k_safe, covariance_type="full", random_state=42)
        labels = gmm.fit_predict(X_work)
        probs = gmm.predict_proba(X_work).max(axis=1)
        probs_note = np.round(probs, 3)
    else:  # Hierarchical Agglomerative
        labels = AgglomerativeClustering(n_clusters=k_safe, linkage="ward").fit_predict(X_work)

    df["Cluster"] = ["Noise / Outlier" if lb == -1 else f"Cluster {lb + 1}" for lb in labels]
    if probs_note is not None:
        df["Membership_Prob"] = probs_note
    df["x"] = coords[:, 0]
    df["y"] = coords[:, 1]
    df["Preview"] = df[text_col].str.slice(0, 120)

    fig = px.scatter(
        df,
        x="x",
        y="y",
        color="Cluster",
        hover_data=["Preview"],
        title=f"{algo} ({reduction}) — {n_docs} Documents",
        template="plotly_white",
    )
    fig.update_traces(marker=dict(size=10, opacity=0.85))
    fig.update_layout(height=480, margin=dict(l=20, r=20, t=50, b=20))

    # Representative TF-IDF keywords per cluster
    feature_names = np.array(vectorizer.get_feature_names_out())
    kw_rows = []
    for cl_label in sorted(df["Cluster"].unique()):
        mask = (df["Cluster"] == cl_label).to_numpy()
        mean_vec = np.asarray(tfidf_matrix[mask].mean(axis=0)).ravel()
        top_idx = mean_vec.argsort()[::-1][:6]
        top_words = ", ".join(feature_names[i] for i in top_idx if mean_vec[i] > 0)
        kw_rows.append({
            "Cluster": cl_label,
            "Document Count": int(mask.sum()),
            "Representative Keywords": top_words or "(none)",
        })
    df_keywords = pd.DataFrame(kw_rows)

    out_csv = tempfile.mktemp(suffix=".csv")
    df.drop(columns=["x", "y", "Preview"], errors="ignore").to_csv(out_csv, index=False)

    preview_cols = [text_col, "Cluster"] + (["Membership_Prob"] if probs_note is not None else [])
    df_preview = df[preview_cols].head(100)
    return "", fig, df_keywords, df_preview, out_csv, embed_note


theme = gr.themes.Soft(
    primary_hue="emerald",
    neutral_hue="slate",
)

with gr.Blocks(title="Clustering Analyzer") as demo:
    gr.Markdown(
        "# Document & Artifact Clustering Analyzer\n"
        "Compare **all 5 core clustering algorithms** (K-Means, Mean-Shift, DBSCAN, Expectation-Maximization GMM, and Hierarchical Agglomerative) on text datasets or transcripts."
    )

    error_msg = gr.Markdown("", visible=False)

    with gr.Row():
        with gr.Column(scale=1):
            data_type = gr.Radio(
                choices=["Upload Dataset Sheet", "Paste Raw Text (One Document Per Line)"],
                value="Paste Raw Text (One Document Per Line)",
                label="Data Input Mode",
            )
            with gr.Group(visible=False) as upload_group:
                file_obj = gr.File(label="Upload CSV or Excel sheet", file_types=[".csv", ".xlsx"])
            with gr.Group(visible=True) as text_group:
                raw_text_area = gr.Textbox(
                    label="Input Text Documents (one per line)",
                    value=(
                        "Romeo loves Juliet\n"
                        "Shakespeare wrote classic tragedies\n"
                        "Hamlet debates revenge in Denmark\n"
                        "Neural networks model nodes and edges\n"
                        "AI assistants write python scripts\n"
                        "Gradient descent optimizes model weights\n"
                        "City council voted on zoning moratorium\n"
                        "Residents protested the data center noise\n"
                        "Water usage at hyperscale campuses rose"
                    ),
                    lines=9,
                )

            algorithm = gr.Dropdown(
                choices=[
                    "K-Means",
                    "Mean-Shift",
                    "DBSCAN",
                    "Expectation-Maximization (GMM)",
                    "Hierarchical Agglomerative",
                ],
                value="K-Means",
                label="Clustering Algorithm (All 5 Techniques)",
            )

            num_clusters = gr.Slider(
                minimum=2, maximum=10, value=3, step=1,
                label="Number of Clusters (k) — K-Means, GMM, Hierarchical",
                visible=True,
            )
            ms_quantile = gr.Slider(
                minimum=0.1, maximum=0.6, value=0.3, step=0.05,
                label="Mean-Shift Bandwidth Quantile (auto-discovers k)",
                visible=False,
            )
            with gr.Row(visible=False) as dbscan_group:
                db_eps = gr.Slider(minimum=0.1, maximum=3.0, value=0.8, step=0.1, label="DBSCAN eps")
                db_min = gr.Slider(minimum=2, maximum=10, value=2, step=1, label="min_samples")

            reduction_method = gr.Radio(
                choices=["PCA (SVD)", "t-SNE"],
                value="PCA (SVD)",
                label="2D Dimensionality Reduction",
            )
            hf_token_box = gr.Textbox(
                label="Optional Hugging Face Token (uses HF embeddings instead of local TF-IDF)",
                placeholder="hf_... (leave blank for instant local TF-IDF)",
                type="password",
            )
            btn = gr.Button("Calculate and Visualize Clusters", variant="primary")
            status_note = gr.Markdown("")

        with gr.Column(scale=2):
            with gr.Tabs():
                with gr.TabItem("Interactive 2D Cluster Map"):
                    plot_box = gr.Plot()
                with gr.TabItem("Representative Cluster Keywords"):
                    table_keywords = gr.Dataframe(headers=["Cluster", "Document Count", "Representative Keywords"])
                with gr.TabItem("Labeled Documents Table"):
                    table_docs = gr.Dataframe(max_height=450)
                    download_btn = gr.File(label="Download Complete Labeled CSV")

    def toggle_input(mode):
        is_upload = mode == "Upload Dataset Sheet"
        return gr.update(visible=is_upload), gr.update(visible=not is_upload)

    def toggle_algo_params(algo):
        needs_k = algo in {"K-Means", "Expectation-Maximization (GMM)", "Hierarchical Agglomerative"}
        return (
            gr.update(visible=needs_k),
            gr.update(visible=(algo == "Mean-Shift")),
            gr.update(visible=(algo == "DBSCAN")),
        )

    data_type.change(toggle_input, inputs=[data_type], outputs=[upload_group, text_group])
    algorithm.change(toggle_algo_params, inputs=[algorithm], outputs=[num_clusters, ms_quantile, dbscan_group])

    def process(file_obj, text_area, mode, algo, k, quantile, eps, min_samples, reduction, hf_token):
        err, fig, kw, docs, csv_path, note = run_clustering(
            file_obj, text_area, mode, algo, k, quantile, eps, min_samples, reduction, hf_token
        )
        if err:
            return gr.update(value=err, visible=True), None, None, None, gr.update(visible=False), ""
        return gr.update(visible=False), fig, kw, docs, gr.update(value=csv_path, visible=True), note

    btn.click(
        process,
        inputs=[file_obj, raw_text_area, data_type, algorithm, num_clusters, ms_quantile, db_eps, db_min, reduction_method, hf_token_box],
        outputs=[error_msg, plot_box, table_keywords, table_docs, download_btn, status_note],
    )

if __name__ == "__main__":
    demo.launch(theme=theme)
