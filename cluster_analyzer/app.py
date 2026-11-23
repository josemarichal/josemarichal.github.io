"""
Multi-Algorithm Cluster Analyzer - Hugging Face Space App
An interactive computational text analysis & unsupervised machine learning studio
implementing five foundational clustering algorithms:
  1. K-Means Clustering (plus outlier-robust K-Medians variant)
  2. Mean-Shift Clustering (sliding-window density peaks)
  3. DBSCAN (density-based spatial clustering with noise detection)
  4. Expectation-Maximization (EM) with Gaussian Mixture Models (GMM)
  5. Agglomerative Hierarchical Clustering (HAC with Dendrogram)

Supports Hugging Face Serverless Inference (neural embeddings & AI cluster naming),
fast local TF-IDF + SVD fallback, numeric tabular CSV datasets, and a
Scikit-Learn-style 2D benchmark playground. Optimized for the Free CPU Tier.
"""

import inspect
import json
import os
import re
import tempfile
import time
import warnings

import gradio as gr
import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import seaborn as sns
from huggingface_hub import HfApi, InferenceClient
from matplotlib.patches import Circle, Ellipse
from scipy.cluster.hierarchy import dendrogram, fcluster, linkage
from scipy.spatial.distance import pdist
from sklearn.cluster import DBSCAN, AgglomerativeClustering, KMeans, MeanShift, estimate_bandwidth
from sklearn.datasets import make_blobs, make_circles, make_moons
from sklearn.decomposition import PCA, TruncatedSVD
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics import (
    adjusted_rand_score,
    calinski_harabasz_score,
    davies_bouldin_score,
    silhouette_score,
)
from sklearn.mixture import GaussianMixture
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import StandardScaler, normalize

warnings.filterwarnings("ignore")

# -------------------------------------------------------------
# Paths & Constants
# -------------------------------------------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SAMPLE_DIR = os.path.join(BASE_DIR, "sample_data")
SAMPLE_TEXT_CSV = os.path.join(SAMPLE_DIR, "civic_policy_corpus.csv")
SAMPLE_NUMERIC_CSV = os.path.join(SAMPLE_DIR, "municipal_indicators_numeric.csv")
EXPORT_DIR = os.path.join(tempfile.gettempdir(), "cluster_analyzer_exports")
os.makedirs(EXPORT_DIR, exist_ok=True)

EMBEDDING_MODELS = {
    "sentence-transformers/all-MiniLM-L6-v2 (Fast · 384d Recommended)": "sentence-transformers/all-MiniLM-L6-v2",
    "BAAI/bge-small-en-v1.5 (High-Precision · 384d)": "BAAI/bge-small-en-v1.5",
    "BAAI/bge-base-en-v1.5 (Rich Semantic · 768d)": "BAAI/bge-base-en-v1.5",
    "intfloat/e5-small-v2 (Compact Retrieval · 384d)": "intfloat/e5-small-v2",
    "sentence-transformers/all-mpnet-base-v2 (SOTA Sentence · 768d)": "sentence-transformers/all-mpnet-base-v2",
}

LLM_LABEL_MODELS = {
    "Qwen/Qwen2.5-7B-Instruct (Recommended · JSON Naming)": "Qwen/Qwen2.5-7B-Instruct",
    "meta-llama/Llama-3.2-3B-Instruct (Fast Edge LLM)": "meta-llama/Llama-3.2-3B-Instruct",
    "mistralai/Mistral-7B-Instruct-v0.3 (General Instruction)": "mistralai/Mistral-7B-Instruct-v0.3",
}

ALGORITHMS = [
    "K-Means / K-Medians",
    "Mean-Shift",
    "DBSCAN",
    "GMM (Expectation-Maximization)",
    "Agglomerative Hierarchical (HAC)",
]

COMPLEXITY_NOTES = {
    "K-Means": "O(n · k · t) — Linear",
    "K-Medians": "O(n · log(n) · t) — Sorting per iter",
    "Mean-Shift": "O(n² · t) — Window shifting",
    "DBSCAN": "O(n log n) — Spatial index (O(n²) worst)",
    "GMM (EM)": "O(n · k · d² · t) — Linear in n",
    "Agglomerative (HAC)": "O(n³) — Pairwise merges (O(n² log n) opt.)",
}

PALETTE = [
    "#2563eb",  # Royal Blue
    "#0d9488",  # Teal
    "#ea580c",  # Burnt Orange
    "#7c3aed",  # Violet
    "#db2777",  # Rose
    "#ca8a04",  # Amber
    "#16a34a",  # Emerald
    "#0284c7",  # Sky
    "#9333ea",  # Purple
    "#dc2626",  # Crimson
    "#4f46e5",  # Indigo
    "#65a30d",  # Lime
]


def get_cluster_color(label):
    if label == -1:
        return "#1f2937"
    return PALETTE[int(label) % len(PALETTE)]


def resolve_token(hf_token):
    return (hf_token or "").strip() or os.environ.get("HF_TOKEN", "").strip()


# -------------------------------------------------------------
# Helper: Hugging Face Token Validation
# -------------------------------------------------------------
def validate_token(hf_token):
    token = resolve_token(hf_token)
    if not token:
        return (
            "<div style='padding: 10px 14px; background: rgba(245, 158, 11, 0.12); "
            "border-left: 4px solid #f59e0b; border-radius: 6px; font-size: 0.9rem;'>"
            "<strong>⚠️ No Token Provided:</strong> Running in <strong>Local Mode</strong> "
            "(TF-IDF + SVD text vectorization &amp; c-TF-IDF cluster labels). Paste a Hugging Face "
            "User Access Token (<code>hf_...</code> with Read/Inference permission) to unlock "
            "Serverless Neural Embeddings and AI Cluster Naming.</div>"
        )
    try:
        api = HfApi()
        info = api.whoami(token=token)
        username = info.get("name", "Authenticated User")
        user_type = info.get("type", "user")
        return (
            "<div style='padding: 10px 14px; background: rgba(34, 197, 94, 0.12); "
            "border-left: 4px solid #22c55e; border-radius: 6px; font-size: 0.9rem;'>"
            f"<strong>✅ Authenticated:</strong> Connected as <code>@{username}</code> ({user_type}). "
            "Hugging Face Serverless Embeddings &amp; AI Cluster Naming are ready.</div>"
        )
    except Exception as exc:
        return (
            "<div style='padding: 10px 14px; background: rgba(239, 68, 68, 0.12); "
            "border-left: 4px solid #ef4444; border-radius: 6px; font-size: 0.9rem;'>"
            f"<strong>❌ Authentication Failed:</strong> {str(exc)[:180]}. "
            "Verify your token at huggingface.co/settings/tokens or use Local Mode.</div>"
        )


# -------------------------------------------------------------
# Helper: File Loading (CSV, TSV, XLSX, JSONL, JSON, TXT)
# -------------------------------------------------------------
def load_uploaded_file(file_obj):
    if file_obj is None:
        return None, "No file uploaded."
    try:
        path = file_obj.name if hasattr(file_obj, "name") else str(file_obj)
        lower = path.lower()
        if lower.endswith(".csv"):
            df = pd.read_csv(path)
        elif lower.endswith(".tsv"):
            df = pd.read_csv(path, sep="\t")
        elif lower.endswith(".xlsx") or lower.endswith(".xls"):
            df = pd.read_excel(path)
        elif lower.endswith(".jsonl"):
            df = pd.read_json(path, lines=True)
        elif lower.endswith(".json"):
            df = pd.read_json(path)
        elif lower.endswith(".txt"):
            with open(path, "r", encoding="utf-8", errors="replace") as fh:
                lines = [ln.strip() for ln in fh.readlines() if ln.strip()]
            df = pd.DataFrame({"id": range(1, len(lines) + 1), "text": lines})
        else:
            df = pd.read_csv(path)
        return df, f"Loaded {len(df):,} rows and {len(df.columns)} columns."
    except Exception as exc:
        return None, f"Error reading file: {exc}"


# -------------------------------------------------------------
# Helper: Text Vectorization (HF Serverless Embeddings + TF-IDF)
# -------------------------------------------------------------
def compute_local_tfidf_vectors(texts, max_svd_dim=20):
    clean_texts = [str(t).strip() if pd.notna(t) else "" for t in texts]
    n_samples = len(clean_texts)
    vectorizer = TfidfVectorizer(
        max_features=2500,
        stop_words="english",
        ngram_range=(1, 2),
        min_df=1,
        max_df=0.95 if n_samples > 4 else 1.0,
        sublinear_tf=True,
    )
    try:
        tfidf = vectorizer.fit_transform(clean_texts)
    except ValueError:
        # Fallback if all tokens are stop words
        vectorizer = TfidfVectorizer(max_features=1000, min_df=1)
        tfidf = vectorizer.fit_transform(clean_texts)

    n_feats = tfidf.shape[1]
    if n_samples >= 4 and n_feats >= 3:
        n_comp = max(2, min(max_svd_dim, n_samples - 1, n_feats - 1))
        svd = TruncatedSVD(n_components=n_comp, random_state=42)
        X = svd.fit_transform(tfidf)
        var_explained = float(np.sum(svd.explained_variance_ratio_))
        X = normalize(X, norm="l2")
        desc = f"Local TF-IDF ({n_feats} terms) → TruncatedSVD ({n_comp}d, {var_explained*100:.1f}% var, L2-norm)"
    else:
        X = normalize(tfidf.toarray(), norm="l2")
        desc = f"Local TF-IDF ({n_feats}d, L2-norm)"
    return X, tfidf, vectorizer, desc


def compute_hf_embeddings(texts, model_id, hf_token, progress=None):
    token = resolve_token(hf_token)
    if not token:
        return None, "No Hugging Face token provided; fell back to Local TF-IDF + SVD."

    client = InferenceClient(token=token)
    clean_texts = [str(t).strip()[:1200] if pd.notna(t) else " " for t in texts]
    batch_size = 16
    all_vecs = []

    try:
        for start in range(0, len(clean_texts), batch_size):
            batch = clean_texts[start : start + batch_size]
            if progress is not None:
                progress(
                    min(0.95, (start + len(batch)) / max(1, len(clean_texts))),
                    desc=f"Fetching HF embeddings ({start + len(batch)}/{len(clean_texts)}) via {model_id}...",
                )
            raw = client.feature_extraction(batch, model=model_id)
            if (
                isinstance(raw, list)
                and len(raw) == len(batch)
                and len(raw) > 0
                and isinstance(raw[0], list)
                and len(raw[0]) > 0
                and isinstance(raw[0][0], list)
            ):
                # Ragged 3D token-level embeddings: mean-pool each sequence independently
                arr = np.vstack([np.asarray(item, dtype=np.float64).mean(axis=0) for item in raw])
            else:
                arr = np.asarray(raw, dtype=np.float64)
                if arr.ndim == 1:
                    arr = arr.reshape(1, -1)
                elif arr.ndim == 3:
                    # Token-level embeddings: mean-pool across sequence length
                    arr = arr.mean(axis=1)
            if arr.shape[0] != len(batch):
                # Fallback to item-by-item if API returned single pooled vector
                sub_vecs = []
                for item in batch:
                    r_item = np.asarray(client.feature_extraction(item, model=model_id), dtype=np.float64)
                    if r_item.ndim == 2:
                        r_item = r_item.mean(axis=0)
                    elif r_item.ndim == 3:
                        r_item = r_item.mean(axis=(0, 1))
                    sub_vecs.append(r_item.ravel())
                arr = np.vstack(sub_vecs)
            all_vecs.append(arr)
            if start + batch_size < len(clean_texts):
                time.sleep(0.05)

        X = np.vstack(all_vecs)
        X = np.nan_to_num(X, nan=0.0, posinf=0.0, neginf=0.0)
        X = normalize(X, norm="l2")
        return X, f"HF Serverless Embeddings: {model_id} ({X.shape[1]}d, L2-normalized)"
    except Exception as exc:
        return None, f"HF Serverless Embedding API unavailable ({str(exc)[:140]}); automatically fell back to Local TF-IDF + SVD."


def project_to_2d(X):
    n_samples, n_dims = X.shape
    if n_dims == 2:
        return X.copy(), "Original 2D Features (X1, X2)", None
    if n_dims == 1:
        return np.column_stack([X[:, 0], np.zeros(n_samples)]), "1D Feature + Zero Axis", None
    pca = PCA(n_components=2, random_state=42)
    coords = pca.fit_transform(X)
    ev = pca.explained_variance_ratio_
    label = f"PCA 2D Projection (PC1: {ev[0]*100:.1f}%, PC2: {ev[1]*100:.1f}%)"
    return coords, label, pca


# -------------------------------------------------------------
# Core Algorithms: All 5 Techniques (+ K-Medians)
# -------------------------------------------------------------
def fit_kmedians(X, n_clusters=4, n_init=10, max_iter=150, random_state=42):
    """Exact K-Medians clustering using L1 (Manhattan) distance & coordinate-wise medians."""
    n_samples, n_dims = X.shape
    k = max(1, min(int(n_clusters), n_samples))
    best_labels = None
    best_centers = None
    best_inertia = np.inf
    best_iters = 0

    for restart in range(max(1, int(n_init))):
        rng = np.random.default_rng(int(random_state) + restart * 997)
        init_idx = rng.choice(n_samples, size=k, replace=False)
        centers = X[init_idx].copy()

        labels = np.zeros(n_samples, dtype=int)
        iters = 0
        for it in range(1, max_iter + 1):
            iters = it
            # Manhattan (L1) distance matrix: (n_samples, k)
            dists = np.sum(np.abs(X[:, None, :] - centers[None, :, :]), axis=2)
            new_labels = np.argmin(dists, axis=1)

            new_centers = centers.copy()
            for c in range(k):
                mask = new_labels == c
                if np.any(mask):
                    new_centers[c] = np.median(X[mask], axis=0)
                else:
                    # Re-seed empty cluster to point farthest from its assigned center
                    min_d = np.min(dists, axis=1)
                    new_centers[c] = X[int(np.argmax(min_d))]

            shift = np.max(np.abs(new_centers - centers))
            centers = new_centers
            if np.array_equal(new_labels, labels) and shift < 1e-6:
                break
            labels = new_labels

        final_dists = np.sum(np.abs(X[:, None, :] - centers[None, :, :]), axis=2)
        inertia = float(np.sum(np.min(final_dists, axis=1)))
        if inertia < best_inertia:
            best_inertia = inertia
            best_labels = labels.copy()
            best_centers = centers.copy()
            best_iters = iters

    return best_labels, best_centers, best_inertia, best_iters


def suggest_dbscan_eps(X, min_samples=4, metric="euclidean"):
    """Estimate DBSCAN epsilon using sorted k-distance knee detection."""
    n_samples = len(X)
    k = max(2, min(int(min_samples), n_samples - 1))
    nn = NearestNeighbors(n_neighbors=k, metric=metric)
    nn.fit(X)
    distances, _ = nn.kneighbors(X)
    k_dists = np.sort(distances[:, -1])

    if len(k_dists) < 4 or (k_dists[-1] - k_dists[0]) < 1e-9:
        eps_est = float(np.median(k_dists)) if len(k_dists) else 0.5
        return max(eps_est, 0.05), k_dists, max(0, len(k_dists) // 2)

    # Maximum perpendicular distance to chord connecting endpoints (Kneedle)
    x_norm = np.linspace(0.0, 1.0, len(k_dists))
    y_norm = (k_dists - k_dists[0]) / (k_dists[-1] - k_dists[0] + 1e-12)
    # Distance below the diagonal line from (0,0) to (1,1)
    perp = x_norm - y_norm
    knee_idx = int(np.argmax(perp))
    # Clamp knee away from extreme 0/end artifacts
    knee_idx = max(int(0.15 * len(k_dists)), min(int(0.92 * len(k_dists)), knee_idx))
    eps_est = float(k_dists[knee_idx])
    return max(eps_est, 1e-3), k_dists, knee_idx


def run_single_algorithm(X, coords_2d, algo_name, params, pca_model=None):
    """
    Execute one of the 5 clustering algorithms and return a rich result dictionary:
      labels, extras (centers, probs, linkage_matrix, etc.), runtime_ms, algo_label, notes
    """
    n_samples, n_dims = X.shape
    t0 = time.perf_counter()
    extras = {}
    notes = []

    if algo_name == "K-Means / K-Medians":
        k = max(2, min(int(params.get("k", 4)), n_samples - 1))
        variant = params.get("kmeans_variant", "K-Means (Mean Centroids)")
        n_init = max(1, int(params.get("n_init", 10)))
        seed = int(params.get("seed") if params.get("seed") is not None else 42)

        if "Medians" in variant:
            labels, centers_hd, inertia, n_iter = fit_kmedians(
                X, n_clusters=k, n_init=n_init, random_state=seed
            )
            algo_label = "K-Medians"
            metric_label = "Total L1 Distortion"
        else:
            km = KMeans(n_clusters=k, n_init=n_init, max_iter=300, random_state=seed)
            labels = km.fit_predict(X)
            centers_hd = km.cluster_centers_
            inertia = float(km.inertia_)
            n_iter = int(km.n_iter_)
            algo_label = "K-Means"
            metric_label = "Inertia (WCSS)"

        if pca_model is not None:
            centers_2d = pca_model.transform(centers_hd)
        elif n_dims == 2:
            centers_2d = centers_hd
        else:
            centers_2d = np.array(
                [coords_2d[labels == c].mean(axis=0) for c in sorted(set(labels))]
            )

        # Compute elbow curve across k=2..min(10, n_samples-1)
        max_k = min(10, n_samples - 1)
        elbow_ks, elbow_inertias, elbow_sils = [], [], []
        for tk in range(2, max_k + 1):
            if "Medians" in variant:
                tl, _, tin, _ = fit_kmedians(X, n_clusters=tk, n_init=min(4, n_init), random_state=seed)
            else:
                tkm = KMeans(n_clusters=tk, n_init=5, random_state=seed)
                tl = tkm.fit_predict(X)
                tin = float(tkm.inertia_)
            elbow_ks.append(tk)
            elbow_inertias.append(tin)
            if len(set(tl)) >= 2:
                elbow_sils.append(float(silhouette_score(X, tl)))
            else:
                elbow_sils.append(np.nan)

        extras = {
            "centers_2d": centers_2d,
            "centers_hd": centers_hd,
            "inertia": inertia,
            "metric_label": metric_label,
            "n_iter": n_iter,
            "elbow_ks": elbow_ks,
            "elbow_inertias": elbow_inertias,
            "elbow_sils": elbow_sils,
            "selected_k": k,
        }
        notes.append(f"{algo_label} converged in {n_iter} iterations across {n_init} random initializations ({metric_label}: {inertia:.2f}).")

    elif algo_name == "Mean-Shift":
        auto_bw = bool(params.get("ms_auto_bw", True))
        quantile = float(params.get("ms_quantile", 0.25))
        manual_bw = float(params.get("ms_bandwidth", 0.8))
        bin_seeding = bool(params.get("ms_bin_seeding", False))
        cluster_all = bool(params.get("ms_cluster_all", True))

        # Work in compact subspace for very high-dim embeddings to avoid curse of dimensionality
        if n_dims > 15:
            pca_ms = PCA(n_components=min(10, n_samples - 1, n_dims), random_state=42)
            X_work = pca_ms.fit_transform(X)
            notes.append(f"Projected {n_dims}d vectors to {X_work.shape[1]}d PCA space for stable Mean-Shift kernel density estimation.")
        else:
            pca_ms = None
            X_work = X

        if auto_bw:
            bw = float(
                estimate_bandwidth(
                    X_work, quantile=quantile, n_samples=min(500, n_samples), random_state=42
                )
            )
            if bw <= 1e-6:
                dists = pdist(X_work)
                bw = float(np.percentile(dists, 25)) if len(dists) and np.max(dists) > 0 else 0.5
        else:
            bw = max(manual_bw, 0.05)

        try:
            ms = MeanShift(bandwidth=bw, bin_seeding=bin_seeding, cluster_all=cluster_all)
            labels = ms.fit_predict(X_work)
        except ValueError:
            ms = MeanShift(bandwidth=bw, bin_seeding=False, cluster_all=cluster_all)
            labels = ms.fit_predict(X_work)
            notes.append("Automatic fallback from bin_seeding=True to full kernel seeding for sparse window radius.")

        centers_work = ms.cluster_centers_
        if pca_ms is None and pca_model is not None and len(centers_work) > 0:
            centers_2d = pca_model.transform(centers_work)
        elif n_dims == 2:
            centers_2d = centers_work
        else:
            centers_2d = np.array(
                [
                    coords_2d[labels == c].mean(axis=0)
                    for c in sorted([u for u in set(labels) if u != -1])
                ]
            ) if any(u != -1 for u in set(labels)) else np.empty((0, 2))

        # Compute 2D display radius approximating the window radius r
        if n_dims == 2:
            display_radius = bw
        else:
            # Scale bandwidth proportionally to 2D projected spread vs working spread
            work_std = float(np.mean(np.std(X_work, axis=0))) + 1e-9
            disp_std = float(np.mean(np.std(coords_2d, axis=0))) + 1e-9
            display_radius = bw * (disp_std / work_std) * 0.65

        algo_label = "Mean-Shift"
        extras = {
            "bandwidth": bw,
            "display_radius": display_radius,
            "centers_2d": centers_2d,
            "auto_bw": auto_bw,
            "quantile": quantile,
        }
        n_found = len([c for c in set(labels) if c != -1])
        notes.append(
            f"Mean-Shift automatically discovered {n_found} density peak(s) using sliding-window radius r = {bw:.3f}."
        )

    elif algo_name == "DBSCAN":
        auto_eps = bool(params.get("db_auto_eps", True))
        manual_eps = float(params.get("db_eps", 0.5))
        min_samples = max(2, int(params.get("db_min_samples", 4)))
        metric = params.get("db_metric", "euclidean")

        suggested_eps, k_dists, knee_idx = suggest_dbscan_eps(
            X, min_samples=min_samples, metric=metric
        )
        eps_used = suggested_eps if auto_eps else max(manual_eps, 1e-3)

        db = DBSCAN(eps=eps_used, min_samples=min_samples, metric=metric)
        labels = db.fit_predict(X)
        core_mask = np.zeros(n_samples, dtype=bool)
        if hasattr(db, "core_sample_indices_") and len(db.core_sample_indices_) > 0:
            core_mask[db.core_sample_indices_] = True

        roles = []
        for i in range(n_samples):
            if labels[i] == -1:
                roles.append("Noise / Outlier")
            elif core_mask[i]:
                roles.append("Core Point")
            else:
                roles.append("Border Point")

        algo_label = "DBSCAN"
        extras = {
            "eps": eps_used,
            "suggested_eps": suggested_eps,
            "min_samples": min_samples,
            "metric": metric,
            "k_dists": k_dists,
            "knee_idx": knee_idx,
            "core_mask": core_mask,
            "roles": roles,
        }
        n_found = len([c for c in set(labels) if c != -1])
        n_noise = int(np.sum(labels == -1))
        notes.append(
            f"DBSCAN ({metric}, ε = {eps_used:.3f}, minPoints = {min_samples}) found {n_found} cluster(s) "
            f"and isolated {n_noise} noise/outlier point(s)."
        )

    elif algo_name == "GMM (Expectation-Maximization)":
        k = max(2, min(int(params.get("gmm_k", 4)), n_samples - 1))
        cov_type = params.get("gmm_cov_type", "full")
        n_init = max(1, int(params.get("gmm_n_init", 5)))
        seed = int(params.get("seed") if params.get("seed") is not None else 42)

        # Reduce dimensionality for well-conditioned covariance estimation on high-dim embeddings
        max_safe_dim = max(2, min(10, n_samples // 3))
        if n_dims > max_safe_dim and cov_type in ("full", "tied"):
            pca_gmm = PCA(n_components=min(max_safe_dim, n_samples - 1, n_dims), random_state=seed)
            X_work = pca_gmm.fit_transform(X)
            notes.append(
                f"Projected {n_dims}d vectors to {X_work.shape[1]}d PCA subspace for numerically stable '{cov_type}' covariance estimation."
            )
        else:
            X_work = X

        gmm = GaussianMixture(
            n_components=k,
            covariance_type=cov_type,
            n_init=n_init,
            max_iter=250,
            reg_covar=1e-4,
            random_state=seed,
        )
        gmm.fit(X_work)
        labels = gmm.predict(X_work)
        probs = gmm.predict_proba(X_work)

        # Compute AIC/BIC across k=2..min(9, n_samples-1)
        max_k = min(9, n_samples - 1)
        ic_ks, aics, bics = [], [], []
        for tk in range(2, max_k + 1):
            try:
                tg = GaussianMixture(
                    n_components=tk,
                    covariance_type=cov_type,
                    n_init=2,
                    reg_covar=1e-4,
                    random_state=seed,
                ).fit(X_work)
                ic_ks.append(tk)
                aics.append(float(tg.aic(X_work)))
                bics.append(float(tg.bic(X_work)))
            except Exception:
                continue

        # 2D ellipses computed in display plane weighted by EM responsibilities
        ellipses_2d = []
        for comp in range(k):
            w = probs[:, comp]
            w_sum = float(np.sum(w))
            if w_sum < 1e-6:
                continue
            mean_2d = np.average(coords_2d, axis=0, weights=w)
            diff = coords_2d - mean_2d
            cov_2d = (diff.T * w) @ diff / w_sum + np.eye(2) * 1e-5
            if cov_type == "spherical":
                avg_v = float(np.trace(cov_2d) / 2.0)
                cov_2d = np.eye(2) * avg_v
            elif cov_type == "diag":
                cov_2d = np.diag(np.diag(cov_2d))
            ellipses_2d.append((comp, mean_2d, cov_2d))

        # Mixed membership diagnostics
        sorted_idx = np.argsort(-probs, axis=1)
        top1_p = probs[np.arange(n_samples), sorted_idx[:, 0]]
        top2_c = sorted_idx[:, 1] if k >= 2 else sorted_idx[:, 0]
        top2_p = probs[np.arange(n_samples), top2_c] if k >= 2 else np.zeros(n_samples)
        mixed_mask = top1_p < 0.80

        algo_label = "GMM (EM)"
        extras = {
            "probs": probs,
            "top1_p": top1_p,
            "top2_c": top2_c,
            "top2_p": top2_p,
            "mixed_mask": mixed_mask,
            "ellipses_2d": ellipses_2d,
            "cov_type": cov_type,
            "aic": float(gmm.aic(X_work)),
            "bic": float(gmm.bic(X_work)),
            "ic_ks": ic_ks,
            "aics": aics,
            "bics": bics,
            "selected_k": k,
            "n_iter": int(gmm.n_iter_),
        }
        notes.append(
            f"EM converged in {gmm.n_iter_} iterations ({cov_type} covariance, BIC={extras['bic']:.1f}). "
            f"Detected {int(np.sum(mixed_mask))} mixed-membership / boundary item(s) with max cluster probability < 80%."
        )

    else:
        # Agglomerative Hierarchical Clustering (HAC)
        link_method = params.get("hac_linkage", "average")
        metric = params.get("hac_metric", "euclidean")
        cut_mode = params.get("hac_cut_mode", "Number of Clusters (K)")
        k = max(2, min(int(params.get("hac_k", 4)), n_samples - 1))
        dist_thresh = float(params.get("hac_dist_thresh", 1.2))

        metric_eff = metric
        if link_method == "ward" and metric != "euclidean":
            metric_eff = "euclidean"
            notes.append("Ward linkage requires Euclidean distance; automatically switched metric to Euclidean.")

        # Build linkage matrix Z with SciPy so dendrogram and cluster labels align 100%
        if n_samples > 1500:
            notes.append(
                f"Dataset has {n_samples:,} rows — Agglomerative HAC has O(n³) complexity; "
                "using scikit-learn for labels and truncated dendrogram preview on a 300-row sample."
            )
            ac_kwargs = {"linkage": link_method}
            if link_method != "ward":
                ac_kwargs["metric"] = metric_eff
            if cut_mode == "Distance Threshold":
                ac = AgglomerativeClustering(n_clusters=None, distance_threshold=dist_thresh, **ac_kwargs)
            else:
                ac = AgglomerativeClustering(n_clusters=k, **ac_kwargs)
            labels = ac.fit_predict(X)
            sub_idx = np.random.default_rng(42).choice(n_samples, size=300, replace=False)
            Z = linkage(pdist(X[sub_idx], metric=metric_eff), method=link_method)
            cut_height = dist_thresh if cut_mode == "Distance Threshold" else float(Z[-(k - 1), 2]) if k > 1 else 0.0
        else:
            dists = pdist(X, metric=metric_eff)
            dists = np.nan_to_num(dists, nan=1.0, posinf=1.0, neginf=0.0)
            Z = linkage(dists, method=link_method)
            if cut_mode == "Distance Threshold":
                raw_labels = fcluster(Z, t=dist_thresh, criterion="distance")
                cut_height = dist_thresh
            else:
                raw_labels = fcluster(Z, t=k, criterion="maxclust")
                if k >= 2 and len(Z) >= k:
                    cut_height = float(0.5 * (Z[-(k - 1), 2] + Z[-k, 2]))
                elif len(Z) >= 1:
                    cut_height = float(Z[-1, 2] * 0.5)
                else:
                    cut_height = 0.0
            # Remap 1-indexed fcluster labels to clean 0..m-1
            uniq = sorted(set(raw_labels))
            remap = {old: idx for idx, old in enumerate(uniq)}
            labels = np.array([remap[v] for v in raw_labels], dtype=int)

        algo_label = "Agglomerative (HAC)"
        extras = {
            "Z": Z,
            "linkage": link_method,
            "metric": metric_eff,
            "cut_height": cut_height,
            "cut_mode": cut_mode,
        }
        n_found = len(set(labels))
        notes.append(
            f"Agglomerative HAC ({link_method} linkage, {metric_eff} distance) merged bottom-up and cut at height {cut_height:.3f} → {n_found} cluster(s)."
        )

    runtime_ms = (time.perf_counter() - t0) * 1000.0
    metrics = evaluate_clustering(X, labels)
    return {
        "algo_label": algo_label,
        "labels": np.asarray(labels, dtype=int),
        "metrics": metrics,
        "runtime_ms": runtime_ms,
        "extras": extras,
        "notes": notes,
    }


def evaluate_clustering(X, labels):
    labels = np.asarray(labels, dtype=int)
    noise_mask = labels == -1
    n_noise = int(np.sum(noise_mask))
    valid_mask = ~noise_mask
    valid_labels = labels[valid_mask]
    unique_clusters = sorted(set(valid_labels.tolist()))
    n_clusters = len(unique_clusters)
    n_valid = int(np.sum(valid_mask))

    sil, ch, db = None, None, None
    if 2 <= n_clusters < n_valid:
        X_val = X[valid_mask]
        try:
            sil = float(silhouette_score(X_val, valid_labels))
        except Exception:
            sil = None
        try:
            ch = float(calinski_harabasz_score(X_val, valid_labels))
        except Exception:
            ch = None
        try:
            db = float(davies_bouldin_score(X_val, valid_labels))
        except Exception:
            db = None

    return {
        "n_clusters": n_clusters,
        "n_noise": n_noise,
        "silhouette": sil,
        "calinski_harabasz": ch,
        "davies_bouldin": db,
    }


# -------------------------------------------------------------
# Cluster Interpretation: c-TF-IDF Keywords + Optional HF LLM
# -------------------------------------------------------------
def extract_cluster_keywords(texts, labels, top_n=7):
    """Compute class-contrastive TF-IDF keywords per cluster."""
    clean_texts = [str(t) if pd.notna(t) else "" for t in texts]
    vec = TfidfVectorizer(
        max_features=2000,
        stop_words="english",
        ngram_range=(1, 2),
        min_df=1,
        max_df=0.90 if len(clean_texts) > 5 else 1.0,
    )
    try:
        mat = vec.fit_transform(clean_texts).toarray()
        terms = np.array(vec.get_feature_names_out())
    except ValueError:
        return {}

    global_mean = mat.mean(axis=0)
    kw_map = {}
    for cid in sorted(set(labels)):
        mask = labels == cid
        if cid == -1:
            kw_map[cid] = ["outlier", "unclustered noise"]
            continue
        cluster_mean = mat[mask].mean(axis=0)
        # Contrastive score rewards terms concentrated in this cluster
        score = cluster_mean - 0.35 * global_mean
        top_idx = np.argsort(-score)[:top_n]
        kws = [terms[i] for i in top_idx if cluster_mean[i] > 0]
        kw_map[cid] = kws if kws else ["(general terms)"]
    return kw_map


def synthesize_llm_cluster_name(cluster_id, keywords, exemplars, llm_model_id, hf_token):
    """Call Hugging Face Serverless Chat API to produce a thematic cluster title & summary."""
    token = resolve_token(hf_token)
    if not token:
        return None, None
    client = InferenceClient(token=token)
    kw_str = ", ".join(keywords[:8])
    ex_str = "\n".join([f"- {e[:220]}" for e in exemplars[:4]])
    system_msg = (
        "You are an expert computational social scientist and NLP analyst. "
        "Name and summarize an unsupervised text cluster concisely. "
        'Respond ONLY with valid JSON: {"title": "3-5 word thematic title", "summary": "1 concise sentence explaining the unifying theme."}'
    )
    user_msg = (
        f"CLUSTER {cluster_id}\n"
        f"TOP KEYWORDS: {kw_str}\n"
        f"REPRESENTATIVE DOCUMENTS:\n{ex_str}\n\n"
        "JSON OUTPUT:"
    )
    try:
        resp = client.chat.completions.create(
            model=llm_model_id,
            messages=[
                {"role": "system", "content": system_msg},
                {"role": "user", "content": user_msg},
            ],
            max_tokens=140,
            temperature=0.2,
        )
        content = resp.choices[0].message.content.strip()
        m = re.search(r"\{.*\}", content, re.DOTALL)
        if m:
            data = json.loads(m.group(0))
            title = str(data.get("title", "")).strip()
            summary = str(data.get("summary", "")).strip()
            if title:
                return title, summary
    except Exception:
        pass
    return None, None


def build_cluster_profiles(state, result, use_llm_naming=False, llm_model_choice=None, hf_token=""):
    """Produce a structured Cluster Profiles DataFrame & cluster title mapping."""
    df = state["df"]
    X = state["X"]
    mode = state["mode"]
    labels = result["labels"]
    n_total = len(labels)

    kw_map = {}
    if mode == "text":
        texts = df[state["text_col"]].astype(str).tolist()
        kw_map = extract_cluster_keywords(texts, labels, top_n=7)

    llm_id = LLM_LABEL_MODELS.get(llm_model_choice, "Qwen/Qwen2.5-7B-Instruct")
    has_token = bool(resolve_token(hf_token))

    rows = []
    cluster_names = {}
    for cid in sorted(set(labels.tolist())):
        mask = labels == cid
        idxs = np.where(mask)[0]
        count = len(idxs)
        share = f"{(count / max(1, n_total)) * 100:.1f}%"

        if cid == -1:
            cluster_names[-1] = "Noise / Outliers (-1)"
            sample_preview = ""
            if mode == "text":
                sample_preview = str(df.iloc[idxs[0]][state["text_col"]])[:150]
            else:
                lbl_c = state.get("label_col")
                sample_preview = ", ".join(
                    [str(df.iloc[i][lbl_c]) for i in idxs[:3]]
                ) if lbl_c and lbl_c in df.columns else f"Rows {idxs[:3].tolist()}"
            rows.append(
                {
                    "Cluster": "Noise (-1)",
                    "Size": count,
                    "Share": share,
                    "Theme / Signature": "Isolated Outliers (DBSCAN Noise)",
                    "Representative Exemplar / Centroid": sample_preview,
                }
            )
            continue

        # Find representative exemplar closest to cluster centroid
        sub_X = X[idxs]
        centroid = sub_X.mean(axis=0)
        dists = np.linalg.norm(sub_X - centroid, axis=1)
        order = np.argsort(dists)
        rep_idxs = [idxs[o] for o in order[:4]]

        if mode == "text":
            kws = kw_map.get(cid, [])
            exemplar_texts = [str(df.iloc[i][state["text_col"]]) for i in rep_idxs]
            default_title = " / ".join([k.title() for k in kws[:3]]) if kws else f"Cluster {cid}"
            theme_str = f"{default_title}  [{', '.join(kws[:6])}]"

            if use_llm_naming and has_token:
                ai_title, ai_summary = synthesize_llm_cluster_name(
                    cid, kws, exemplar_texts, llm_id, hf_token
                )
                if ai_title:
                    cluster_names[cid] = f"C{cid}: {ai_title}"
                    theme_str = f"✨ {ai_title} — {ai_summary} (Terms: {', '.join(kws[:5])})"
                else:
                    cluster_names[cid] = f"C{cid}: {default_title}"
            else:
                cluster_names[cid] = f"C{cid}: {default_title}"

            rep_display = exemplar_texts[0][:165] + ("…" if len(exemplar_texts[0]) > 165 else "")
        else:
            feat_cols = state["feature_cols"]
            sub_df = df.iloc[idxs][feat_cols]
            global_means = df[feat_cols].mean()
            global_stds = df[feat_cols].std().replace(0, 1.0)
            z_means = (sub_df.mean() - global_means) / global_stds
            top_feats = z_means.abs().sort_values(ascending=False).head(3).index.tolist()
            sig_parts = [
                f"{f}: {sub_df[f].mean():.1f} ({'+' if z_means[f] >= 0 else ''}{z_means[f]:.1f}σ)"
                for f in top_feats
            ]
            theme_str = " | ".join(sig_parts)
            cluster_names[cid] = f"Cluster {cid}"
            lbl_c = state.get("label_col")
            if lbl_c and lbl_c in df.columns:
                rep_display = ", ".join([str(df.iloc[i][lbl_c]) for i in rep_idxs[:3]])
            else:
                rep_display = f"Row #{rep_idxs[0] + 1}"

        rows.append(
            {
                "Cluster": f"Cluster {cid}",
                "Size": count,
                "Share": share,
                "Theme / Signature": theme_str,
                "Representative Exemplar / Centroid": rep_display,
            }
        )

    return pd.DataFrame(rows), cluster_names


# -------------------------------------------------------------
# Visualization Generators (Publication-Grade Matplotlib)
# -------------------------------------------------------------
def draw_cov_ellipse(ax, mean_2d, cov_2d, color, n_std=1.5, alpha=0.18, lw=1.6):
    vals, vecs = np.linalg.eigh(cov_2d)
    vals = np.maximum(vals, 1e-6)
    order = vals.argsort()[::-1]
    vals, vecs = vals[order], vecs[:, order]
    theta = np.degrees(np.arctan2(vecs[1, 0], vecs[0, 0]))
    width, height = 2.0 * n_std * np.sqrt(vals)
    ell = Ellipse(
        xy=mean_2d,
        width=width,
        height=height,
        angle=theta,
        facecolor=color,
        edgecolor=color,
        alpha=alpha,
        linewidth=lw,
    )
    ax.add_patch(ell)
    ell_edge = Ellipse(
        xy=mean_2d,
        width=width,
        height=height,
        angle=theta,
        facecolor="none",
        edgecolor=color,
        alpha=0.85,
        linewidth=lw,
        linestyle="--" if n_std > 1.5 else "-",
    )
    ax.add_patch(ell_edge)


def plot_primary_clusters(coords_2d, proj_label, result, cluster_names=None, item_labels=None):
    fig, ax = plt.subplots(figsize=(7.2, 5.4), dpi=130)
    labels = result["labels"]
    extras = result["extras"]
    algo = result["algo_label"]

    unique_labels = sorted(set(labels.tolist()))
    # Plot GMM covariance ellipses behind scatter points
    if algo == "GMM (EM)" and "ellipses_2d" in extras:
        for comp, mean_2d, cov_2d in extras["ellipses_2d"]:
            col = get_cluster_color(comp)
            draw_cov_ellipse(ax, mean_2d, cov_2d, col, n_std=2.0, alpha=0.09, lw=1.2)
            draw_cov_ellipse(ax, mean_2d, cov_2d, col, n_std=1.0, alpha=0.19, lw=1.6)

    # Plot Mean-Shift sliding windows behind scatter points
    if algo == "Mean-Shift" and "centers_2d" in extras and len(extras["centers_2d"]) > 0:
        rad = extras.get("display_radius", 0.5)
        for idx, center in enumerate(extras["centers_2d"]):
            col = get_cluster_color(idx)
            circ = Circle(
                center,
                radius=rad,
                facecolor=col,
                edgecolor=col,
                alpha=0.09,
                linewidth=1.5,
                linestyle="--",
            )
            ax.add_patch(circ)
            circ_edge = Circle(
                center,
                radius=rad,
                facecolor="none",
                edgecolor=col,
                alpha=0.75,
                linewidth=1.3,
                linestyle="--",
            )
            ax.add_patch(circ_edge)

    # Plot points per cluster
    for cid in unique_labels:
        mask = labels == cid
        col = get_cluster_color(cid)
        lbl_text = (
            cluster_names.get(cid, f"Cluster {cid}")
            if cluster_names
            else ("Noise / Outlier (-1)" if cid == -1 else f"Cluster {cid}")
        )
        if len(lbl_text) > 34:
            lbl_text = lbl_text[:32] + "…"

        if cid == -1:
            ax.scatter(
                coords_2d[mask, 0],
                coords_2d[mask, 1],
                c="#111827",
                marker="x",
                s=75,
                linewidths=2.0,
                label=f"{lbl_text} (n={int(np.sum(mask))})",
                zorder=5,
            )
        elif algo == "DBSCAN" and "core_mask" in extras:
            core_m = mask & extras["core_mask"]
            border_m = mask & (~extras["core_mask"])
            if np.any(core_m):
                ax.scatter(
                    coords_2d[core_m, 0],
                    coords_2d[core_m, 1],
                    c=col,
                    s=64,
                    alpha=0.90,
                    edgecolors="white",
                    linewidths=0.7,
                    label=f"{lbl_text} (n={int(np.sum(mask))})",
                    zorder=4,
                )
            if np.any(border_m):
                ax.scatter(
                    coords_2d[border_m, 0],
                    coords_2d[border_m, 1],
                    facecolors="white",
                    edgecolors=col,
                    s=54,
                    linewidths=1.8,
                    label=None if np.any(core_m) else f"{lbl_text} (n={int(np.sum(mask))})",
                    zorder=4,
                )
        else:
            ax.scatter(
                coords_2d[mask, 0],
                coords_2d[mask, 1],
                c=col,
                s=60,
                alpha=0.88,
                edgecolors="white",
                linewidths=0.6,
                label=f"{lbl_text} (n={int(np.sum(mask))})",
                zorder=4,
            )

    # Highlight GMM mixed-membership points
    if algo == "GMM (EM)" and "mixed_mask" in extras and np.any(extras["mixed_mask"]):
        mm = extras["mixed_mask"]
        ax.scatter(
            coords_2d[mm, 0],
            coords_2d[mm, 1],
            facecolors="none",
            edgecolors="#f59e0b",
            s=145,
            linewidths=2.0,
            linestyle="--",
            label=f"Mixed Membership <80% (n={int(np.sum(mm))})",
            zorder=6,
        )

    # Centroids for K-Means / K-Medians / Mean-Shift
    if algo in ("K-Means", "K-Medians") and "centers_2d" in extras:
        c2d = extras["centers_2d"]
        ax.scatter(
            c2d[:, 0],
            c2d[:, 1],
            c="#111827",
            marker="X",
            s=190,
            edgecolors="white",
            linewidths=1.4,
            label="Cluster Centers (X)",
            zorder=7,
        )
    elif algo == "Mean-Shift" and "centers_2d" in extras and len(extras["centers_2d"]) > 0:
        c2d = extras["centers_2d"]
        ax.scatter(
            c2d[:, 0],
            c2d[:, 1],
            c="#111827",
            marker="*",
            s=230,
            edgecolors="white",
            linewidths=1.0,
            label=f"Density Peaks (r={extras['bandwidth']:.2f})",
            zorder=7,
        )

    # Annotate sparse datasets (<= 65 items) lightly with short labels
    if item_labels is not None and len(coords_2d) <= 65:
        for i in range(len(coords_2d)):
            txt = str(item_labels[i])
            if len(txt) > 16:
                txt = txt[:15] + "…"
            ax.annotate(
                txt,
                (coords_2d[i, 0], coords_2d[i, 1]),
                xytext=(4, 3),
                textcoords="offset points",
                fontsize=6.5,
                color="#334155",
                alpha=0.78,
            )

    sil = result["metrics"]["silhouette"]
    sil_txt = f"Silhouette: {sil:.3f}" if sil is not None else "Silhouette: N/A"
    ax.set_title(f"{algo} — Cluster Map ({sil_txt})", fontsize=12, fontweight="bold", pad=10, color="#0f172a")
    ax.set_xlabel(proj_label, fontsize=9, color="#334155")
    ax.set_ylabel("Dimension 2", fontsize=9, color="#334155")
    ax.grid(True, linestyle=":", alpha=0.35, color="#94a3b8")
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)
    ax.legend(
        loc="upper left",
        bbox_to_anchor=(0.0, -0.14),
        ncol=2,
        frameon=True,
        facecolor="#f8fafc",
        edgecolor="#e2e8f0",
        fontsize=8,
    )
    plt.tight_layout()
    return fig


def plot_algorithm_diagnostic(result, item_labels=None):
    """Render the dedicated diagnostic visualization tailored to the active clustering technique."""
    algo = result["algo_label"]
    extras = result["extras"]
    labels = result["labels"]
    fig, ax = plt.subplots(figsize=(6.8, 5.0), dpi=130)

    if algo in ("K-Means", "K-Medians"):
        ks = extras["elbow_ks"]
        inertias = extras["elbow_inertias"]
        sils = extras["elbow_sils"]
        sel_k = extras["selected_k"]

        color1 = "#2563eb"
        ax.plot(ks, inertias, marker="o", linewidth=2.2, color=color1, label=extras["metric_label"])
        ax.axvline(sel_k, color="#dc2626", linestyle="--", linewidth=1.5, label=f"Selected K = {sel_k}")
        ax.set_xlabel("Number of Clusters (K)", fontsize=9.5)
        ax.set_ylabel(extras["metric_label"], fontsize=9.5, color=color1)
        ax.tick_params(axis="y", labelcolor=color1)
        ax.set_xticks(ks)
        ax.grid(True, linestyle=":", alpha=0.35)

        ax2 = ax.twinx()
        color2 = "#0d9488"
        ax2.plot(ks, sils, marker="s", linestyle="-.", linewidth=2.0, color=color2, label="Silhouette Score")
        ax2.set_ylabel("Silhouette Score (Higher = Better)", fontsize=9.5, color=color2)
        ax2.tick_params(axis="y", labelcolor=color2)
        ax2.set_ylim(-0.1, 1.0)

        ax.set_title(f"{algo}: Elbow Curve & Silhouette Guide", fontsize=11.5, fontweight="bold", pad=10)
        lines1, lbls1 = ax.get_legend_handles_labels()
        lines2, lbls2 = ax2.get_legend_handles_labels()
        ax.legend(lines1 + lines2, lbls1 + lbls2, loc="upper right", fontsize=8.5, frameon=True)

    elif algo == "Mean-Shift":
        uniq, counts = np.unique(labels, return_counts=True)
        bar_labels = ["Unassigned (-1)" if u == -1 else f"Peak C{u}" for u in uniq]
        colors = [get_cluster_color(u) for u in uniq]
        bars = ax.bar(bar_labels, counts, color=colors, edgecolor="#0f172a", linewidth=0.7, alpha=0.9)
        for b, cnt in zip(bars, counts):
            ax.text(
                b.get_x() + b.get_width() / 2.0,
                cnt + max(counts) * 0.02,
                str(cnt),
                ha="center",
                va="bottom",
                fontsize=9,
                fontweight="bold",
            )
        ax.set_title(
            f"Mean-Shift: Density Window Populations (r = {extras['bandwidth']:.3f})",
            fontsize=11.5,
            fontweight="bold",
            pad=10,
        )
        ax.set_ylabel("Points Captured Inside Converged Window", fontsize=9.5)
        ax.set_xlabel("Auto-Discovered Density Peaks (No Pre-set K Required)", fontsize=9.5)
        ax.grid(axis="y", linestyle=":", alpha=0.4)
        ax.spines["top"].set_visible(False)
        ax.spines["right"].set_visible(False)

    elif algo == "DBSCAN":
        k_dists = extras["k_dists"]
        eps_used = extras["eps"]
        sugg_eps = extras["suggested_eps"]
        knee_idx = extras["knee_idx"]
        min_pts = extras["min_samples"]

        xs = np.arange(len(k_dists))
        ax.plot(xs, k_dists, color="#2563eb", linewidth=2.2, label=f"Sorted {min_pts}-NN Distance")
        ax.axhline(eps_used, color="#dc2626", linestyle="--", linewidth=1.8, label=f"Active ε = {eps_used:.3f}")
        ax.scatter(
            [knee_idx],
            [sugg_eps],
            color="#f59e0b",
            edgecolors="#111827",
            s=95,
            zorder=6,
            label=f"Suggested Knee ε = {sugg_eps:.3f}",
        )
        ax.set_title(
            f"DBSCAN: Sorted k-Distance Knee Plot (minPoints = {min_pts})",
            fontsize=11.5,
            fontweight="bold",
            pad=10,
        )
        ax.set_xlabel("Data Points Sorted by Neighbor Distance", fontsize=9.5)
        ax.set_ylabel(f"Distance to {min_pts}-th Nearest Neighbor ({extras['metric']})", fontsize=9.5)
        ax.grid(True, linestyle=":", alpha=0.4)
        ax.spines["top"].set_visible(False)
        ax.spines["right"].set_visible(False)
        ax.legend(loc="upper left", fontsize=8.5, frameon=True)

    elif algo == "GMM (EM)":
        ic_ks = extras["ic_ks"]
        aics = extras["aics"]
        bics = extras["bics"]
        sel_k = extras["selected_k"]
        if ic_ks:
            ax.plot(ic_ks, bics, marker="o", linewidth=2.2, color="#7c3aed", label="BIC (Lower = Better)")
            ax.plot(ic_ks, aics, marker="s", linestyle="--", linewidth=1.8, color="#0d9488", label="AIC (Lower = Better)")
            ax.axvline(sel_k, color="#dc2626", linestyle=":", linewidth=1.8, label=f"Selected K = {sel_k}")
            ax.set_xticks(ic_ks)
        ax.set_title(
            f"GMM (EM): Model Selection (AIC / BIC) · Cov: '{extras['cov_type']}'",
            fontsize=11.5,
            fontweight="bold",
            pad=10,
        )
        ax.set_xlabel("Number of Gaussian Components (K)", fontsize=9.5)
        ax.set_ylabel("Information Criterion Score (Lower = Better Fit)", fontsize=9.5)
        ax.grid(True, linestyle=":", alpha=0.4)
        ax.spines["top"].set_visible(False)
        ax.spines["right"].set_visible(False)
        ax.legend(loc="best", fontsize=8.5, frameon=True)

    else:
        # Agglomerative Hierarchical Dendrogram
        Z = extras["Z"]
        cut_h = extras["cut_height"]
        n_leaves = Z.shape[0] + 1
        d_kwargs = {
            "Z": Z,
            "ax": ax,
            "color_threshold": cut_h,
            "above_threshold_color": "#64748b",
        }
        if n_leaves > 45:
            d_kwargs["truncate_mode"] = "lastp"
            d_kwargs["p"] = 35
            d_kwargs["show_contracted"] = True
            d_kwargs["leaf_rotation"] = 60
            d_kwargs["leaf_font_size"] = 7.5
        else:
            if item_labels is not None and len(item_labels) == n_leaves:
                short_lbls = [
                    (str(lbl)[:15] + "…" if len(str(lbl)) > 15 else str(lbl)) for lbl in item_labels
                ]
                d_kwargs["labels"] = short_lbls
            d_kwargs["leaf_rotation"] = 75
            d_kwargs["leaf_font_size"] = 7.0

        dendrogram(**d_kwargs)
        ax.axhline(
            cut_h,
            color="#dc2626",
            linestyle="--",
            linewidth=1.8,
            label=f"Tree Cut Height = {cut_h:.3f}",
        )
        ax.set_title(
            f"Agglomerative HAC Dendrogram ({extras['linkage'].title()} Linkage · {extras['metric']})",
            fontsize=11.2,
            fontweight="bold",
            pad=10,
        )
        ax.set_ylabel("Merge Distance", fontsize=9.5)
        ax.spines["top"].set_visible(False)
        ax.spines["right"].set_visible(False)
        ax.legend(loc="upper right", fontsize=8.5, frameon=True)

    plt.tight_layout()
    return fig


# -------------------------------------------------------------
# Tab 1: Data Ingestion & Vectorization Handlers
# -------------------------------------------------------------
def load_text_sample_ui():
    df = pd.read_csv(SAMPLE_TEXT_CSV)
    cols = list(df.columns)
    return (
        df,
        gr.Dropdown(choices=cols, value="text"),
        gr.Dropdown(choices=["(None)"] + cols, value="title"),
        f"✅ Loaded bundled **Civic & Tech-Policy Corpus** ({len(df)} documents: 4 policy domains + 2 outliers + 1 bridge document).",
        df.head(10),
    )


def on_text_file_upload(file_obj):
    df, msg = load_uploaded_file(file_obj)
    if df is None:
        return None, gr.Dropdown(choices=[]), gr.Dropdown(choices=["(None)"]), f"⚠️ {msg}", pd.DataFrame()
    cols = list(df.columns)
    # Auto-detect best text column
    text_candidates = [c for c in cols if any(k in c.lower() for k in ["text", "doc", "comment", "content", "body", "abstract"])]
    default_text = text_candidates[0] if text_candidates else cols[0]
    label_candidates = [c for c in cols if any(k in c.lower() for k in ["title", "name", "id", "label"]) and c != default_text]
    default_lbl = label_candidates[0] if label_candidates else "(None)"
    return (
        df,
        gr.Dropdown(choices=cols, value=default_text),
        gr.Dropdown(choices=["(None)"] + cols, value=default_lbl),
        f"✅ {msg}",
        df.head(10),
    )


def load_pasted_texts(raw_text):
    lines = [ln.strip() for ln in (raw_text or "").splitlines() if ln.strip()]
    if len(lines) < 4:
        return (
            None,
            gr.Dropdown(choices=[]),
            gr.Dropdown(choices=["(None)"]),
            "⚠️ Please paste at least 4 lines/documents (one document per line).",
            pd.DataFrame(),
        )
    df = pd.DataFrame({"id": [f"Doc {i+1}" for i in range(len(lines))], "text": lines})
    return (
        df,
        gr.Dropdown(choices=["id", "text"], value="text"),
        gr.Dropdown(choices=["(None)", "id", "text"], value="id"),
        f"✅ Parsed **{len(df)} pasted documents** ready for vectorization.",
        df.head(10),
    )


def load_numeric_sample_ui():
    df = pd.read_csv(SAMPLE_NUMERIC_CSV)
    num_cols = df.select_dtypes(include=[np.number]).columns.tolist()
    all_cols = list(df.columns)
    return (
        df,
        gr.CheckboxGroup(choices=num_cols, value=num_cols),
        gr.Dropdown(choices=["(None)"] + all_cols, value="neighborhood_name"),
        f"✅ Loaded bundled **Municipal Indicators Dataset** ({len(df)} tracts × {len(num_cols)} numeric indicators, including 4 structural outliers).",
        df.head(10),
    )


def on_numeric_file_upload(file_obj):
    df, msg = load_uploaded_file(file_obj)
    if df is None:
        return None, gr.CheckboxGroup(choices=[], value=[]), gr.Dropdown(choices=["(None)"]), f"⚠️ {msg}", pd.DataFrame()
    num_cols = df.select_dtypes(include=[np.number]).columns.tolist()
    all_cols = list(df.columns)
    non_num = [c for c in all_cols if c not in num_cols]
    default_lbl = non_num[0] if non_num else "(None)"
    return (
        df,
        gr.CheckboxGroup(choices=num_cols, value=num_cols[: min(8, len(num_cols))]),
        gr.Dropdown(choices=["(None)"] + all_cols, value=default_lbl),
        f"✅ {msg} Detected **{len(num_cols)} numeric column(s)**.",
        df.head(10),
    )


def vectorize_text_dataset(
    raw_df,
    text_col,
    label_col,
    vector_engine,
    embed_model_choice,
    hf_token,
    progress=gr.Progress(),
):
    if raw_df is None or not text_col or text_col not in raw_df.columns:
        return None, "⚠️ Load a text file, paste documents, or click **Load Bundled Civic Corpus** first."

    df = raw_df.dropna(subset=[text_col]).reset_index(drop=True)
    if len(df) < 4:
        return None, "⚠️ Dataset needs at least 4 non-empty documents for clustering."

    texts = df[text_col].astype(str).tolist()
    progress(0.1, desc="Vectorizing text corpus...")

    fallback_notice = ""
    if "Hugging Face" in vector_engine:
        model_id = EMBEDDING_MODELS.get(embed_model_choice, "sentence-transformers/all-MiniLM-L6-v2")
        X_hf, msg = compute_hf_embeddings(texts, model_id, hf_token, progress=progress)
        if X_hf is not None:
            X = X_hf
            vec_desc = msg
        else:
            fallback_notice = f"\n> ℹ️ *{msg}*"
            X, _, _, vec_desc = compute_local_tfidf_vectors(texts)
    else:
        X, _, _, vec_desc = compute_local_tfidf_vectors(texts)

    progress(0.95, desc="Computing 2D PCA layout...")
    coords_2d, proj_label, pca_model = project_to_2d(X)

    active_state = {
        "mode": "text",
        "df": df,
        "text_col": text_col,
        "label_col": None if label_col == "(None)" else label_col,
        "X": X,
        "coords_2d": coords_2d,
        "proj_label": proj_label,
        "pca_model": pca_model,
        "vec_desc": vec_desc,
    }
    status_md = (
        f"### ✅ Text Corpus Ready for Clustering\n"
        f"- **Documents:** `{len(df):,}`\n"
        f"- **Representation:** `{vec_desc}`\n"
        f"- **Vector Matrix Shape:** `{X.shape[0]} × {X.shape[1]}`\n"
        f"- **2D Display Map:** `{proj_label}`{fallback_notice}\n\n"
        "👉 Proceed to **Tab 2 (Single-Algorithm Deep Dive)** or **Tab 3 (Compare All 5 Side-by-Side)**."
    )
    return active_state, status_md


def prepare_numeric_dataset(raw_df, feature_cols, label_col, standardize):
    if raw_df is None or not feature_cols:
        return None, "⚠️ Load a numeric CSV/Excel file (or click **Load Bundled Municipal Indicators**) and select at least 2 numeric columns."

    valid_cols = [c for c in feature_cols if c in raw_df.columns]
    if len(valid_cols) < 2:
        return None, "⚠️ Please select at least 2 numeric feature columns."

    df = raw_df.dropna(subset=valid_cols).reset_index(drop=True)
    if len(df) < 4:
        return None, "⚠️ Dataset needs at least 4 complete rows for clustering."

    X_raw = df[valid_cols].astype(float).values
    if standardize:
        scaler = StandardScaler()
        X = scaler.fit_transform(X_raw)
        vec_desc = f"Numeric Features ({len(valid_cols)} cols, Z-Score Standardized)"
    else:
        X = X_raw
        vec_desc = f"Numeric Features ({len(valid_cols)} cols, Raw Scale)"

    coords_2d, proj_label, pca_model = project_to_2d(X)
    active_state = {
        "mode": "numeric",
        "df": df,
        "feature_cols": valid_cols,
        "label_col": None if label_col == "(None)" else label_col,
        "X": X,
        "coords_2d": coords_2d,
        "proj_label": proj_label,
        "pca_model": pca_model,
        "vec_desc": vec_desc,
    }
    status_md = (
        f"### ✅ Numeric Dataset Ready for Clustering\n"
        f"- **Observations:** `{len(df):,}`\n"
        f"- **Selected Features ({len(valid_cols)}):** `{', '.join(valid_cols)}`\n"
        f"- **Scaling:** `{'Z-Score Standardized' if standardize else 'Raw Units'}`\n"
        f"- **2D Display Map:** `{proj_label}`\n\n"
        "👉 Proceed to **Tab 2 (Single-Algorithm Deep Dive)** or **Tab 3 (Compare All 5 Side-by-Side)**."
    )
    return active_state, status_md


# -------------------------------------------------------------
# Tab 2: Single-Algorithm Deep Dive Handlers
# -------------------------------------------------------------
def toggle_algorithm_controls(algo_name):
    return (
        gr.update(visible=(algo_name == "K-Means / K-Medians")),
        gr.update(visible=(algo_name == "Mean-Shift")),
        gr.update(visible=(algo_name == "DBSCAN")),
        gr.update(visible=(algo_name == "GMM (Expectation-Maximization)")),
        gr.update(visible=(algo_name == "Agglomerative Hierarchical (HAC)")),
    )


def run_deep_dive(
    active_state,
    algo_name,
    km_k,
    km_variant,
    km_n_init,
    km_seed,
    ms_auto_bw,
    ms_quantile,
    ms_bw,
    ms_bin_seed,
    ms_cluster_all,
    db_auto_eps,
    db_eps,
    db_min_samples,
    db_metric,
    gmm_k,
    gmm_cov,
    gmm_n_init,
    hac_linkage,
    hac_metric,
    hac_cut_mode,
    hac_k,
    hac_thresh,
    use_llm_naming,
    llm_model_choice,
    hf_token,
    progress=gr.Progress(),
):
    plt.close("all")
    # If user hasn't vectorized yet, auto-load bundled civic text corpus so it works on 1 click!
    auto_loaded_note = ""
    if active_state is None:
        df_default = pd.read_csv(SAMPLE_TEXT_CSV)
        X, _, _, vec_desc = compute_local_tfidf_vectors(df_default["text"].astype(str).tolist())
        coords_2d, proj_label, pca_model = project_to_2d(X)
        active_state = {
            "mode": "text",
            "df": df_default,
            "text_col": "text",
            "label_col": "title",
            "X": X,
            "coords_2d": coords_2d,
            "proj_label": proj_label,
            "pca_model": pca_model,
            "vec_desc": vec_desc,
        }
        auto_loaded_note = "> ℹ️ *Auto-loaded bundled Civic & Tech-Policy Corpus (51 docs) via Local TF-IDF + SVD. Switch datasets anytime in Tab 1.*\n\n"

    progress(0.2, desc=f"Running {algo_name}...")
    params = {
        "k": km_k,
        "kmeans_variant": km_variant,
        "n_init": km_n_init,
        "seed": km_seed,
        "ms_auto_bw": ms_auto_bw,
        "ms_quantile": ms_quantile,
        "ms_bandwidth": ms_bw,
        "ms_bin_seeding": ms_bin_seed,
        "ms_cluster_all": ms_cluster_all,
        "db_auto_eps": db_auto_eps,
        "db_eps": db_eps,
        "db_min_samples": db_min_samples,
        "db_metric": db_metric,
        "gmm_k": gmm_k,
        "gmm_cov_type": gmm_cov,
        "gmm_n_init": gmm_n_init,
        "hac_linkage": hac_linkage,
        "hac_metric": hac_metric,
        "hac_cut_mode": hac_cut_mode,
        "hac_k": hac_k,
        "hac_dist_thresh": hac_thresh,
    }

    res = run_single_algorithm(
        active_state["X"],
        active_state["coords_2d"],
        algo_name,
        params,
        pca_model=active_state["pca_model"],
    )

    progress(0.65, desc="Generating cluster profiles & visualizations...")
    profile_df, cluster_names = build_cluster_profiles(
        active_state,
        res,
        use_llm_naming=use_llm_naming,
        llm_model_choice=llm_model_choice,
        hf_token=hf_token,
    )

    df = active_state["df"]
    lbl_col = active_state.get("label_col")
    item_labels = df[lbl_col].astype(str).tolist() if lbl_col and lbl_col in df.columns else None

    fig_scatter = plot_primary_clusters(
        active_state["coords_2d"],
        active_state["proj_label"],
        res,
        cluster_names=cluster_names,
        item_labels=item_labels,
    )
    fig_diag = plot_algorithm_diagnostic(res, item_labels=item_labels)

    # Assemble item-level assignment table
    assign_df = df.copy()
    assign_df["cluster_id"] = res["labels"]
    assign_df["cluster_label"] = [cluster_names.get(int(c), f"Cluster {c}") for c in res["labels"]]

    if res["algo_label"] == "DBSCAN":
        assign_df["dbscan_role"] = res["extras"]["roles"]
    elif res["algo_label"] == "GMM (EM)":
        t1_p = res["extras"]["top1_p"]
        t2_c = res["extras"]["top2_c"]
        t2_p = res["extras"]["top2_p"]
        assign_df["primary_prob"] = np.round(t1_p, 3)
        assign_df["mixed_membership"] = [
            f"C{int(c1)}: {p1*100:.0f}% | C{int(c2)}: {p2*100:.0f}%"
            if p1 < 0.995
            else f"C{int(c1)}: 100%"
            for c1, p1, c2, p2 in zip(res["labels"], t1_p, t2_c, t2_p)
        ]
        assign_df["boundary_flag"] = ["MIXED (<80%)" if m else "SOLID" for m in res["extras"]["mixed_mask"]]

    # Export CSV & JSONL safely with timestamped file names
    ts = int(time.time() * 1000)
    safe_slug = re.sub(r"[^a-z0-9]+", "_", res["algo_label"].lower()).strip("_")
    csv_path = os.path.join(EXPORT_DIR, f"clusters_{safe_slug}_{ts}.csv")
    jsonl_path = os.path.join(EXPORT_DIR, f"clusters_{safe_slug}_{ts}.jsonl")
    assign_df.to_csv(csv_path, index=False)
    assign_df.to_json(jsonl_path, orient="records", lines=True)

    m = res["metrics"]
    sil_str = f"{m['silhouette']:.3f}" if m["silhouette"] is not None else "N/A"
    ch_str = f"{m['calinski_harabasz']:.1f}" if m["calinski_harabasz"] is not None else "N/A"
    db_str = f"{m['davies_bouldin']:.3f}" if m["davies_bouldin"] is not None else "N/A"
    notes_md = "\n".join([f"- {n}" for n in res["notes"]])

    summary_md = (
        f"{auto_loaded_note}"
        f"### 🔬 {res['algo_label']} Results\n"
        f"- **Clusters Discovered:** `{m['n_clusters']}` &nbsp;|&nbsp; **Noise / Outliers (`-1`):** `{m['n_noise']}`\n"
        f"- **Silhouette Score (↑):** `{sil_str}` &nbsp;|&nbsp; **Calinski-Harabasz (↑):** `{ch_str}` &nbsp;|&nbsp; **Davies-Bouldin (↓):** `{db_str}`\n"
        f"- **Runtime:** `{res['runtime_ms']:.1f} ms` &nbsp;|&nbsp; **Time Complexity:** `{COMPLEXITY_NOTES.get(res['algo_label'], 'N/A')}`\n"
        f"- **Vector Space:** `{active_state['vec_desc']}`\n\n"
        f"**Algorithm Notes:**\n{notes_md}"
    )

    return active_state, summary_md, fig_scatter, fig_diag, profile_df, assign_df.head(60), csv_path, jsonl_path


# -------------------------------------------------------------
# Tab 3: Side-by-Side Comparison of All 5 Algorithms
# -------------------------------------------------------------
def run_all_five_comparison(
    active_state,
    comp_k,
    comp_ms_quantile,
    comp_db_min_samples,
    comp_gmm_cov,
    comp_hac_linkage,
    progress=gr.Progress(),
):
    plt.close("all")
    auto_note = ""
    if active_state is None:
        df_default = pd.read_csv(SAMPLE_TEXT_CSV)
        X, _, _, vec_desc = compute_local_tfidf_vectors(df_default["text"].astype(str).tolist())
        coords_2d, proj_label, pca_model = project_to_2d(X)
        active_state = {
            "mode": "text",
            "df": df_default,
            "text_col": "text",
            "label_col": "title",
            "X": X,
            "coords_2d": coords_2d,
            "proj_label": proj_label,
            "pca_model": pca_model,
            "vec_desc": vec_desc,
        }
        auto_note = "> ℹ️ *Auto-loaded bundled Civic & Tech-Policy Corpus (51 docs) via Local TF-IDF + SVD.*\n\n"

    X = active_state["X"]
    coords_2d = active_state["coords_2d"]
    pca_model = active_state["pca_model"]

    shared_params = {
        "k": comp_k,
        "kmeans_variant": "K-Means (Mean Centroids)",
        "n_init": 10,
        "seed": 42,
        "ms_auto_bw": True,
        "ms_quantile": comp_ms_quantile,
        "ms_bin_seeding": False,
        "ms_cluster_all": True,
        "db_auto_eps": True,
        "db_min_samples": comp_db_min_samples,
        "db_metric": "euclidean",
        "gmm_k": comp_k,
        "gmm_cov_type": comp_gmm_cov,
        "gmm_n_init": 5,
        "hac_linkage": comp_hac_linkage,
        "hac_metric": "euclidean",
        "hac_cut_mode": "Number of Clusters (K)",
        "hac_k": comp_k,
    }

    results = []
    for idx, algo_name in enumerate(ALGORITHMS):
        progress((idx + 1) / len(ALGORITHMS), desc=f"Running {algo_name}...")
        results.append(run_single_algorithm(X, coords_2d, algo_name, shared_params, pca_model=pca_model))

    # Build 2x3 figure: 5 scatter plots + 6th panel ARI agreement heatmap
    fig, axes = plt.subplots(2, 3, figsize=(15.5, 9.6), dpi=125)
    axes_flat = axes.ravel()

    for idx, res in enumerate(results):
        ax = axes_flat[idx]
        lbls = res["labels"]
        algo = res["algo_label"]
        extras = res["extras"]

        if algo == "GMM (EM)" and "ellipses_2d" in extras:
            for comp, mean_2d, cov_2d in extras["ellipses_2d"]:
                draw_cov_ellipse(ax, mean_2d, cov_2d, get_cluster_color(comp), n_std=1.5, alpha=0.14, lw=1.2)

        for cid in sorted(set(lbls.tolist())):
            mask = lbls == cid
            if cid == -1:
                ax.scatter(coords_2d[mask, 0], coords_2d[mask, 1], c="#111827", marker="x", s=45, linewidths=1.5, zorder=5)
            else:
                ax.scatter(
                    coords_2d[mask, 0],
                    coords_2d[mask, 1],
                    c=get_cluster_color(cid),
                    s=38,
                    alpha=0.88,
                    edgecolors="white",
                    linewidths=0.4,
                    zorder=4,
                )

        if algo == "K-Means" and "centers_2d" in extras:
            ax.scatter(extras["centers_2d"][:, 0], extras["centers_2d"][:, 1], c="#111827", marker="X", s=110, edgecolors="white", zorder=6)
        elif algo == "Mean-Shift" and "centers_2d" in extras and len(extras["centers_2d"]) > 0:
            ax.scatter(extras["centers_2d"][:, 0], extras["centers_2d"][:, 1], c="#111827", marker="*", s=140, edgecolors="white", zorder=6)

        m = res["metrics"]
        sil_s = f"{m['silhouette']:.2f}" if m["silhouette"] is not None else "N/A"
        ax.set_title(
            f"{idx+1}. {algo}\nK={m['n_clusters']} | Noise={m['n_noise']} | Sil={sil_s} | {res['runtime_ms']:.0f}ms",
            fontsize=10.5,
            fontweight="bold",
            color="#0f172a",
        )
        ax.grid(True, linestyle=":", alpha=0.3)
        ax.set_xticks([])
        ax.set_yticks([])

    # 6th Panel: Pairwise Adjusted Rand Index (ARI) Heatmap
    ax_ari = axes_flat[5]
    short_names = [r["algo_label"].replace("Agglomerative (HAC)", "HAC") for r in results]
    n_alg = len(results)
    ari_mat = np.zeros((n_alg, n_alg))
    for i in range(n_alg):
        for j in range(n_alg):
            ari_mat[i, j] = adjusted_rand_score(results[i]["labels"], results[j]["labels"])

    sns.heatmap(
        ari_mat,
        annot=True,
        fmt=".2f",
        cmap="YlGnBu",
        vmin=-0.1,
        vmax=1.0,
        xticklabels=short_names,
        yticklabels=short_names,
        ax=ax_ari,
        cbar=True,
        square=True,
        annot_kws={"size": 9, "weight": "bold"},
    )
    ax_ari.set_title("Pairwise Agreement (Adjusted Rand Index)", fontsize=10.5, fontweight="bold", color="#0f172a")
    ax_ari.tick_params(axis="x", rotation=25, labelsize=8.5)
    ax_ari.tick_params(axis="y", rotation=0, labelsize=8.5)

    plt.suptitle(
        f"5-Algorithm Clustering Comparison — {active_state['vec_desc']}",
        fontsize=13,
        fontweight="bold",
        y=0.995,
    )
    plt.tight_layout(rect=[0, 0, 1, 0.97])

    # Leaderboard table
    board_rows = []
    for r in results:
        m = r["metrics"]
        board_rows.append(
            {
                "Algorithm": r["algo_label"],
                "Pre-set K?": "No (Auto)" if r["algo_label"] in ("Mean-Shift", "DBSCAN") else "Yes / Cut Tree",
                "Clusters Found": m["n_clusters"],
                "Noise (-1)": m["n_noise"],
                "Silhouette (↑)": round(m["silhouette"], 3) if m["silhouette"] is not None else None,
                "Calinski-Harabasz (↑)": round(m["calinski_harabasz"], 1) if m["calinski_harabasz"] is not None else None,
                "Davies-Bouldin (↓)": round(m["davies_bouldin"], 3) if m["davies_bouldin"] is not None else None,
                "Runtime (ms)": round(r["runtime_ms"], 1),
                "Time Complexity": COMPLEXITY_NOTES.get(r["algo_label"], ""),
            }
        )
    board_df = pd.DataFrame(board_rows)

    valid_sils = [(r["algo_label"], r["metrics"]["silhouette"]) for r in results if r["metrics"]["silhouette"] is not None]
    best_str = ""
    if valid_sils:
        best_algo, best_sil = max(valid_sils, key=lambda x: x[1])
        best_str = f"🏆 **Highest Silhouette Score:** `{best_algo}` (`{best_sil:.3f}`). "

    summary_md = (
        f"{auto_note}"
        f"### ⚖️ Side-by-Side Evaluation Summary\n"
        f"{best_str}Inspect the **Adjusted Rand Index (ARI)** matrix (bottom-right) to see where density-based, "
        f"probabilistic, centroid, and hierarchical methods agree or diverge on `{len(X)}` observations."
    )
    return active_state, summary_md, fig, board_df


# -------------------------------------------------------------
# Tab 4: 2D Benchmark Playground (Scikit-Learn Style)
# -------------------------------------------------------------
BENCHMARK_SHAPES = {
    "Concentric Circles (K-Means Failure Case)": "circles",
    "Interleaving Moons (Non-Convex Manifolds)": "moons",
    "Anisotropic Ellipses (GMM Advantage)": "aniso",
    "Varying-Density Blobs (DBSCAN Challenge)": "varied",
    "Isotropic Blobs + Outliers (Noise Detection)": "blobs_outliers",
}

BENCHMARK_TAKEAWAYS = {
    "circles": (
        "**Concentric Circles (Write-up Failure Case):** Both rings share the exact same center mean! "
        "**K-Means** slices linearly across the origin and fails completely. **DBSCAN** and **Single-Linkage HAC** "
        "trace the connected manifolds cleanly, while **Mean-Shift** and **GMM** struggle because the outer ring is non-Gaussian."
    ),
    "moons": (
        "**Interleaving Moons:** Two curved, non-convex crescent clusters. Centroid-based **K-Means** and elliptical **GMM** "
        "cut straight across the crescents, whereas density-connected **DBSCAN** and **Single/Average HAC** recover both moons accurately."
    ),
    "aniso": (
        "**Anisotropic Elongated Ellipses (Write-up Failure Case):** **K-Means** assumes spherical circular clusters of equal radius "
        "and cuts diagonal ellipses in half. **GMM (EM)** models full 2D covariance matrices (mean + standard deviation + rotation) "
        "and wraps each skewed cluster effortlessly!"
    ),
    "varied": (
        "**Varying-Density Blobs (DBSCAN Drawback):** One tight dense cluster sits near a sparse wide cluster. "
        "**DBSCAN** uses a single global ε threshold, so a small ε fragments the sparse blob into noise while a large ε merges dense blobs. "
        "**GMM (EM)** handles differing variances cleanly via component-specific standard deviations."
    ),
    "blobs_outliers": (
        "**Isotropic Blobs + Uniform Outliers:** Well-separated circular clusters contaminated by random background noise. "
        "**DBSCAN** excels by isolating stray points as **Noise (`-1`)**, whereas **K-Means** and **Mean-Shift** fold outliers into clusters."
    ),
}


def generate_benchmark_2d(shape_key, n_samples=260, noise=0.06, seed=42):
    rng = np.random.default_rng(seed)
    n = int(n_samples)
    if shape_key == "circles":
        X, _ = make_circles(n_samples=n, factor=0.48, noise=noise, random_state=seed)
        rec_k = 2
    elif shape_key == "moons":
        X, _ = make_moons(n_samples=n, noise=noise, random_state=seed)
        rec_k = 2
    elif shape_key == "aniso":
        X_raw, _ = make_blobs(n_samples=n, centers=3, random_state=170)
        transform = np.array([[0.62, -0.64], [-0.41, 0.85]])
        X = X_raw @ transform + rng.normal(0, noise * 1.5, size=X_raw.shape)
        rec_k = 3
    elif shape_key == "varied":
        X, _ = make_blobs(n_samples=n, cluster_std=[0.45, 2.2, 0.85], centers=[[-4, -2], [1, 3], [5, -2]], random_state=seed)
        rec_k = 3
    else:
        n_core = int(n * 0.90)
        n_out = n - n_core
        X_core, _ = make_blobs(n_samples=n_core, centers=3, cluster_std=0.65 + noise * 2.0, random_state=seed)
        low, high = X_core.min(axis=0) - 2.0, X_core.max(axis=0) + 2.0
        X_out = rng.uniform(low, high, size=(n_out, 2))
        X = np.vstack([X_core, X_out])
        rec_k = 3

    X = StandardScaler().fit_transform(X)
    return X, rec_k


def run_benchmark_single(shape_choice, n_samples, noise, k_override, db_eps, ms_quantile, hac_linkage):
    plt.close("all")
    shape_key = BENCHMARK_SHAPES[shape_choice]
    X, rec_k = generate_benchmark_2d(shape_key, n_samples=n_samples, noise=noise, seed=42)
    use_k = rec_k if k_override == 0 else int(k_override)

    params = {
        "k": use_k,
        "kmeans_variant": "K-Means (Mean Centroids)",
        "n_init": 10,
        "seed": 42,
        "ms_auto_bw": True,
        "ms_quantile": ms_quantile,
        "ms_bin_seeding": True,
        "ms_cluster_all": True,
        "db_auto_eps": (db_eps <= 0.01),
        "db_eps": db_eps if db_eps > 0.01 else 0.3,
        "db_min_samples": 5,
        "db_metric": "euclidean",
        "gmm_k": use_k,
        "gmm_cov_type": "full",
        "gmm_n_init": 5,
        "hac_linkage": hac_linkage,
        "hac_metric": "euclidean",
        "hac_cut_mode": "Number of Clusters (K)",
        "hac_k": use_k,
    }

    fig, axes = plt.subplots(1, 5, figsize=(17.5, 3.9), dpi=130)
    rows = []
    for idx, algo_name in enumerate(ALGORITHMS):
        res = run_single_algorithm(X, X, algo_name, params)
        ax = axes[idx]
        lbls = res["labels"]
        extras = res["extras"]
        algo = res["algo_label"]

        if algo == "GMM (EM)" and "ellipses_2d" in extras:
            for comp, mean_2d, cov_2d in extras["ellipses_2d"]:
                draw_cov_ellipse(ax, mean_2d, cov_2d, get_cluster_color(comp), n_std=1.8, alpha=0.14, lw=1.1)

        for cid in sorted(set(lbls.tolist())):
            mask = lbls == cid
            if cid == -1:
                ax.scatter(X[mask, 0], X[mask, 1], c="#111827", marker="x", s=26, linewidths=1.2, zorder=5)
            else:
                ax.scatter(X[mask, 0], X[mask, 1], c=get_cluster_color(cid), s=18, alpha=0.88, zorder=4)

        if algo == "K-Means" and "centers_2d" in extras:
            ax.scatter(extras["centers_2d"][:, 0], extras["centers_2d"][:, 1], c="#111827", marker="X", s=85, edgecolors="white", zorder=6)
        elif algo == "Mean-Shift" and "centers_2d" in extras and len(extras["centers_2d"]) > 0:
            ax.scatter(extras["centers_2d"][:, 0], extras["centers_2d"][:, 1], c="#111827", marker="*", s=110, edgecolors="white", zorder=6)

        m = res["metrics"]
        ax.set_title(f"{algo}\nK={m['n_clusters']} | Noise={m['n_noise']} | {res['runtime_ms']:.1f}ms", fontsize=9.8, fontweight="bold")
        ax.set_xticks([])
        ax.set_yticks([])
        ax.set_aspect("equal", adjustable="datalim")

        rows.append(
            {
                "Algorithm": algo,
                "Clusters Found": m["n_clusters"],
                "Noise (-1)": m["n_noise"],
                "Silhouette": round(m["silhouette"], 3) if m["silhouette"] is not None else None,
                "Runtime (ms)": round(res["runtime_ms"], 1),
            }
        )

    plt.suptitle(f"2D Geometry Benchmark: {shape_choice} (N={int(n_samples)})", fontsize=12.5, fontweight="bold", y=1.02)
    plt.tight_layout()
    takeaway = f"### 💡 Diagnostic Takeaway\n{BENCHMARK_TAKEAWAYS[shape_key]}"
    return takeaway, fig, pd.DataFrame(rows)


def run_benchmark_full_matrix(n_samples, noise, db_eps, ms_quantile, hac_linkage, progress=gr.Progress()):
    """Generate the classic 5 Datasets x 5 Algorithms Scikit-Learn style visual comparison matrix."""
    plt.close("all")
    shape_items = list(BENCHMARK_SHAPES.items())
    fig, axes = plt.subplots(len(shape_items), 5, figsize=(16.5, 14.5), dpi=120)

    total_steps = len(shape_items) * 5
    step = 0
    for row_i, (shape_title, shape_key) in enumerate(shape_items):
        X, rec_k = generate_benchmark_2d(shape_key, n_samples=n_samples, noise=noise, seed=42)
        params = {
            "k": rec_k,
            "kmeans_variant": "K-Means (Mean Centroids)",
            "n_init": 8,
            "seed": 42,
            "ms_auto_bw": True,
            "ms_quantile": ms_quantile,
            "ms_bin_seeding": True,
            "ms_cluster_all": True,
            "db_auto_eps": (db_eps <= 0.01),
            "db_eps": db_eps if db_eps > 0.01 else 0.30,
            "db_min_samples": 5,
            "db_metric": "euclidean",
            "gmm_k": rec_k,
            "gmm_cov_type": "full",
            "gmm_n_init": 4,
            "hac_linkage": hac_linkage,
            "hac_metric": "euclidean",
            "hac_cut_mode": "Number of Clusters (K)",
            "hac_k": rec_k,
        }
        for col_j, algo_name in enumerate(ALGORITHMS):
            step += 1
            progress(step / total_steps, desc=f"Benchmarking {shape_key} × {algo_name}...")
            res = run_single_algorithm(X, X, algo_name, params)
            ax = axes[row_i, col_j]
            lbls = res["labels"]
            extras = res["extras"]
            algo = res["algo_label"]

            if algo == "GMM (EM)" and "ellipses_2d" in extras:
                for comp, mean_2d, cov_2d in extras["ellipses_2d"]:
                    draw_cov_ellipse(ax, mean_2d, cov_2d, get_cluster_color(comp), n_std=1.7, alpha=0.12, lw=0.9)

            for cid in sorted(set(lbls.tolist())):
                mask = lbls == cid
                if cid == -1:
                    ax.scatter(X[mask, 0], X[mask, 1], c="#111827", marker="x", s=20, linewidths=1.0)
                else:
                    ax.scatter(X[mask, 0], X[mask, 1], c=get_cluster_color(cid), s=13, alpha=0.88)

            if row_i == 0:
                ax.set_title(algo, fontsize=11, fontweight="bold", pad=8, color="#0f172a")
            if col_j == 0:
                short_row = shape_title.split(" (")[0]
                ax.set_ylabel(short_row, fontsize=9.5, fontweight="bold", color="#1e293b")

            ax.text(
                0.97,
                0.04,
                f"K={res['metrics']['n_clusters']} | {res['runtime_ms']:.0f}ms",
                transform=ax.transAxes,
                fontsize=7.5,
                ha="right",
                va="bottom",
                bbox=dict(boxstyle="round,pad=0.2", facecolor="white", edgecolor="#cbd5e1", alpha=0.88),
            )
            ax.set_xticks([])
            ax.set_yticks([])

    plt.suptitle(
        "Scikit-Learn Style 5×5 Clustering Benchmark Matrix (5 Geometries × 5 Algorithms)",
        fontsize=14,
        fontweight="bold",
        y=0.995,
    )
    plt.tight_layout(rect=[0, 0, 1, 0.975])
    return (
        "### 🏁 Complete 5×5 Benchmark Matrix Generated\n"
        "Compare how **K-Means**, **Mean-Shift**, **DBSCAN**, **GMM (EM)**, and **Agglomerative HAC** "
        "behave across circular rings, curved moons, skewed ellipses, varying densities, and noisy blobs."
    ), fig


# -------------------------------------------------------------
# Gradio Interface Construction
# -------------------------------------------------------------
CUSTOM_CSS = """
.gradio-container {
    max-width: 1280px !important;
    margin: 0 auto !important;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
.hero-box {
    background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 45%, #0f766e 100%);
    color: white;
    padding: 24px 28px;
    border-radius: 12px;
    margin-bottom: 18px;
    box-shadow: 0 6px 18px rgba(15, 23, 42, 0.20);
}
.hero-box h1 {
    color: #ffffff !important;
    font-size: 1.85rem !important;
    margin: 0 0 6px 0 !important;
    font-weight: 700;
}
.hero-box p {
    color: #cbd5e1 !important;
    font-size: 0.96rem !important;
    margin: 0;
}
.hero-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 12px;
}
.hero-pill {
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    padding: 3px 9px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.14);
    border: 1px solid rgba(255, 255, 255, 0.22);
    color: #f8fafc;
}
"""


def build_interface():
    blocks_kwargs = {"title": "Multi-Algorithm Cluster Analyzer"}
    if "theme" in inspect.signature(gr.Blocks.__init__).parameters:
        blocks_kwargs["theme"] = gr.themes.Soft(primary_hue="indigo", secondary_hue="teal")
    if "css" in inspect.signature(gr.Blocks.__init__).parameters:
        blocks_kwargs["css"] = CUSTOM_CSS

    with gr.Blocks(**blocks_kwargs) as demo:
        # Persistent session states
        raw_text_df_state = gr.State(None)
        raw_num_df_state = gr.State(None)
        active_dataset_state = gr.State(None)

        # Header Hero Box
        gr.HTML(
            """
            <div class="hero-box">
                <h1>🔬 Multi-Algorithm Cluster Analyzer</h1>
                <p>Explore, compare, and interpret unsupervised clusters across text corpora, numeric CSV datasets, and 2D benchmark shapes using five foundational clustering techniques.</p>
                <div class="hero-pills">
                    <span class="hero-pill">1. K-Means &amp; K-Medians</span>
                    <span class="hero-pill">2. Mean-Shift</span>
                    <span class="hero-pill">3. DBSCAN</span>
                    <span class="hero-pill">4. GMM (EM)</span>
                    <span class="hero-pill">5. Agglomerative HAC</span>
                    <span class="hero-pill">HF Serverless Embeddings + LLM Naming</span>
                </div>
            </div>
            """
        )

        # Hugging Face Authentication & NLP Inference Panel
        with gr.Accordion("🔑 Hugging Face Token & Serverless NLP Settings (Optional)", open=True):
            with gr.Row():
                with gr.Column(scale=3):
                    hf_token_input = gr.Textbox(
                        label="Hugging Face User Access Token (HF_TOKEN)",
                        type="password",
                        placeholder="Paste your hf_... token here (Read / Inference permission)",
                        info="Kept strictly in memory for your session. Get a free token at huggingface.co/settings/tokens.",
                    )
                with gr.Column(scale=1):
                    validate_btn = gr.Button("🔍 Validate Token", variant="secondary")
                    use_llm_naming_cb = gr.Checkbox(
                        label="✨ AI Cluster Naming (HF LLM)",
                        value=False,
                        info="Synthesize titles & summaries for text clusters (requires HF Token)",
                    )

            token_status_html = gr.HTML(
                "<div style='padding: 8px 12px; background: #f1f5f9; border-radius: 6px; font-size: 0.88rem; color: #475569;'>"
                "ℹ️ Paste a Hugging Face Token to unlock Serverless Neural Sentence Embeddings and AI Cluster Naming, "
                "or run immediately offline with Local TF-IDF + SVD, Numeric CSVs, and the 2D Benchmark Playground.</div>"
            )

            with gr.Row():
                vector_engine_radio = gr.Radio(
                    label="Text Embedding Backend",
                    choices=[
                        "Local TF-IDF + TruncatedSVD (Fast · No Token Needed)",
                        "Hugging Face Neural Embeddings (Serverless API · Requires HF Token)",
                    ],
                    value="Local TF-IDF + TruncatedSVD (Fast · No Token Needed)",
                )
                embed_model_dropdown = gr.Dropdown(
                    label="Hugging Face Embedding Model",
                    choices=list(EMBEDDING_MODELS.keys()),
                    value=list(EMBEDDING_MODELS.keys())[0],
                    info="Used when 'Hugging Face Neural Embeddings' is selected.",
                )
                llm_model_dropdown = gr.Dropdown(
                    label="AI Cluster Naming LLM",
                    choices=list(LLM_LABEL_MODELS.keys()),
                    value=list(LLM_LABEL_MODELS.keys())[0],
                    info="Used when 'AI Cluster Naming' is checked.",
                )

        # Main 5-Tab Workspace
        with gr.Tabs():
            # ---------------------------------------------------------
            # TAB 1: DATA INGESTION & VECTORIZATION
            # ---------------------------------------------------------
            with gr.Tab("📂 1. Data Ingestion & Vectorization"):
                gr.Markdown(
                    "Choose **Text Corpus (NLP)** to embed documents with Hugging Face models or local TF-IDF, "
                    "or switch to **Numeric Tabular CSV** for quantitative socio-spatial / statistical clustering."
                )

                with gr.Tabs():
                    with gr.Tab("📝 Mode A: Text Corpus (NLP)"):
                        with gr.Row():
                            with gr.Column(scale=2):
                                text_file_upload = gr.File(
                                    label="Upload Text Dataset (.csv, .tsv, .xlsx, .jsonl, .txt)",
                                    file_types=[".csv", ".tsv", ".xlsx", ".jsonl", ".json", ".txt"],
                                )
                            with gr.Column(scale=1):
                                load_text_sample_btn = gr.Button(
                                    "📂 Load Bundled Civic & Tech-Policy Corpus (51 docs)",
                                    variant="secondary",
                                )
                                text_load_status = gr.Markdown("No text file loaded yet.")

                        with gr.Accordion("📋 Or Paste Raw Documents Directly (One Document Per Line)", open=False):
                            pasted_text_box = gr.Textbox(
                                label="Paste Documents (1 per line)",
                                lines=6,
                                placeholder="Paste 5+ sentences, comments, abstracts, or headlines — one document per line...",
                            )
                            parse_pasted_btn = gr.Button("📥 Load Pasted Texts", variant="secondary")

                        with gr.Row():
                            text_col_dd = gr.Dropdown(label="Text Column to Embed & Cluster", choices=[], interactive=True)
                            text_label_dd = gr.Dropdown(label="Optional Document Title / ID Column", choices=["(None)"], value="(None)", interactive=True)
                            vectorize_text_btn = gr.Button("⚙️ Vectorize Text Corpus", variant="primary")

                        text_preview_df = gr.DataFrame(label="Text Corpus Preview (First 10 Rows)", interactive=False)

                    with gr.Tab("📊 Mode B: Numeric Tabular CSV"):
                        with gr.Row():
                            with gr.Column(scale=2):
                                num_file_upload = gr.File(
                                    label="Upload Numeric Dataset (.csv, .tsv, .xlsx, .jsonl)",
                                    file_types=[".csv", ".tsv", ".xlsx", ".jsonl", ".json"],
                                )
                            with gr.Column(scale=1):
                                load_num_sample_btn = gr.Button(
                                    "📂 Load Bundled Municipal Indicators (60 tracts)",
                                    variant="secondary",
                                )
                                num_load_status = gr.Markdown("No numeric dataset loaded yet.")

                        with gr.Row():
                            num_features_cbg = gr.CheckboxGroup(label="Select Numeric Feature Columns (≥ 2)", choices=[], value=[])
                        with gr.Row():
                            num_label_dd = gr.Dropdown(label="Optional Row Label / Name Column", choices=["(None)"], value="(None)", interactive=True)
                            standardize_cb = gr.Checkbox(
                                label="Standardize Features (Z-Score: μ=0, σ=1)",
                                value=True,
                                info="Strongly recommended when columns use different units/scales.",
                            )
                            prepare_num_btn = gr.Button("⚙️ Prepare Numeric Matrix", variant="primary")

                        num_preview_df = gr.DataFrame(label="Numeric Dataset Preview (First 10 Rows)", interactive=False)

                active_dataset_status = gr.Markdown(
                    "### ℹ️ Active Dataset Status\n*Load and vectorize a dataset above (or jump straight to Tab 2 to auto-run on the bundled Civic Corpus).*"
                )

            # ---------------------------------------------------------
            # TAB 2: SINGLE-ALGORITHM DEEP DIVE
            # ---------------------------------------------------------
            with gr.Tab("🔬 2. Single-Algorithm Deep Dive"):
                with gr.Row():
                    algo_selector = gr.Radio(
                        label="Select Clustering Technique (All 5 Algorithms)",
                        choices=ALGORITHMS,
                        value=ALGORITHMS[0],
                    )

                # Dynamic Algorithm Parameter Groups
                with gr.Group(visible=True) as grp_kmeans:
                    gr.Markdown("#### ⚙️ K-Means / K-Medians Parameters — *Centroid Partitioning*")
                    with gr.Row():
                        km_k = gr.Slider(label="Number of Clusters (K)", minimum=2, maximum=12, value=4, step=1)
                        km_variant = gr.Radio(
                            label="Centroid Variant",
                            choices=[
                                "K-Means (Mean Centroids — Fast O(n))",
                                "K-Medians (Median Centroids — Outlier-Robust L1)",
                            ],
                            value="K-Means (Mean Centroids — Fast O(n))",
                        )
                        km_n_init = gr.Slider(label="Random Restarts (n_init)", minimum=1, maximum=25, value=10, step=1)
                        km_seed = gr.Number(label="Random Seed", value=42, precision=0)

                with gr.Group(visible=False) as grp_meanshift:
                    gr.Markdown("#### ⚙️ Mean-Shift Parameters — *Sliding-Window Density Peaks (Auto-Discovers K)*")
                    with gr.Row():
                        ms_auto_bw = gr.Checkbox(label="Auto-Estimate Window Radius (r)", value=True)
                        ms_quantile = gr.Slider(
                            label="Bandwidth Quantile (Auto Mode)",
                            minimum=0.08,
                            maximum=0.55,
                            value=0.25,
                            step=0.01,
                            info="Lower quantile → tighter windows & more clusters.",
                        )
                        ms_bw = gr.Slider(
                            label="Manual Window Radius r",
                            minimum=0.1,
                            maximum=3.0,
                            value=0.8,
                            step=0.05,
                            info="Used when Auto-Estimate is unchecked.",
                        )
                    with gr.Row():
                        ms_bin_seed = gr.Checkbox(label="Use Bin Seeding (Faster on Large N)", value=False)
                        ms_cluster_all = gr.Checkbox(label="Assign All Points to Nearest Peak (cluster_all)", value=True)

                with gr.Group(visible=False) as grp_dbscan:
                    gr.Markdown("#### ⚙️ DBSCAN Parameters — *Neighborhood Density & Outlier/Noise Detection (Auto-Discovers K)*")
                    with gr.Row():
                        db_auto_eps = gr.Checkbox(
                            label="Auto-Suggest ε from k-Distance Knee",
                            value=True,
                            info="Detects optimal elbow distance automatically.",
                        )
                        db_eps = gr.Slider(
                            label="Manual Neighborhood Radius (ε)",
                            minimum=0.05,
                            maximum=3.0,
                            value=0.55,
                            step=0.02,
                        )
                        db_min_samples = gr.Slider(label="Minimum Neighborhood Points (minPoints)", minimum=2, maximum=20, value=4, step=1)
                        db_metric = gr.Dropdown(
                            label="Distance Metric",
                            choices=["euclidean", "cosine", "manhattan"],
                            value="euclidean",
                        )

                with gr.Group(visible=False) as grp_gmm:
                    gr.Markdown("#### ⚙️ GMM (Expectation-Maximization) Parameters — *Elliptical Covariance & Mixed Membership*")
                    with gr.Row():
                        gmm_k = gr.Slider(label="Number of Gaussian Components (K)", minimum=2, maximum=12, value=4, step=1)
                        gmm_cov = gr.Dropdown(
                            label="Covariance Shape",
                            choices=["full", "tied", "diag", "spherical"],
                            value="full",
                            info="'full' = arbitrary rotated ellipses; 'spherical' = K-Means-like circles.",
                        )
                        gmm_n_init = gr.Slider(label="EM Restarts (n_init)", minimum=1, maximum=15, value=5, step=1)

                with gr.Group(visible=False) as grp_hac:
                    gr.Markdown("#### ⚙️ Agglomerative Hierarchical (HAC) Parameters — *Bottom-Up Tree & Dendrogram*")
                    with gr.Row():
                        hac_linkage = gr.Dropdown(
                            label="Linkage Criterion",
                            choices=["average", "ward", "complete", "single"],
                            value="average",
                            info="Average linkage is the classic write-up default; Ward minimizes within-cluster variance.",
                        )
                        hac_metric = gr.Dropdown(
                            label="Distance Metric",
                            choices=["euclidean", "cosine", "manhattan"],
                            value="euclidean",
                        )
                        hac_cut_mode = gr.Radio(
                            label="Tree Cut Criterion",
                            choices=["Number of Clusters (K)", "Distance Threshold"],
                            value="Number of Clusters (K)",
                        )
                        hac_k = gr.Slider(label="Target Clusters (K)", minimum=2, maximum=12, value=4, step=1)
                        hac_thresh = gr.Slider(label="Cut Distance Threshold", minimum=0.1, maximum=5.0, value=1.2, step=0.05)

                run_deep_dive_btn = gr.Button("🚀 Run Cluster Analysis", variant="primary", size="lg")

                deep_summary_md = gr.Markdown("### 📊 Analysis Output\n*Configure an algorithm above and click **Run Cluster Analysis**.*")

                with gr.Row():
                    primary_plot = gr.Plot(label="2D Cluster Visualization")
                    diagnostic_plot = gr.Plot(label="Algorithm-Specific Diagnostic Plot")

                profiles_df_out = gr.DataFrame(label="Cluster Profiles, Top Keywords / Signatures & Exemplars", interactive=False)
                assignments_df_out = gr.DataFrame(label="Item-Level Cluster Assignments (First 60 Rows — Includes GMM Probabilities / DBSCAN Roles)", interactive=False)

                with gr.Row():
                    export_csv_file = gr.File(label="📥 Download Clustered Results (.csv)")
                    export_jsonl_file = gr.File(label="📥 Download Clustered Results (.jsonl)")

            # ---------------------------------------------------------
            # TAB 3: SIDE-BY-SIDE COMPARISON (ALL 5 ALGORITHMS)
            # ---------------------------------------------------------
            with gr.Tab("⚖️ 3. Compare All 5 Side-by-Side"):
                gr.Markdown(
                    "Execute **K-Means, Mean-Shift, DBSCAN, GMM (EM), and Agglomerative HAC** simultaneously on your active dataset "
                    "to compare cluster geometries, quality metrics, runtimes, and **Pairwise Adjusted Rand Index (ARI)** agreement."
                )
                with gr.Row():
                    comp_k = gr.Slider(label="Target K (for K-Means, GMM, HAC)", minimum=2, maximum=10, value=4, step=1)
                    comp_ms_quantile = gr.Slider(label="Mean-Shift Bandwidth Quantile", minimum=0.10, maximum=0.50, value=0.25, step=0.02)
                    comp_db_min_samples = gr.Slider(label="DBSCAN minPoints (Auto-ε)", minimum=2, maximum=15, value=4, step=1)
                    comp_gmm_cov = gr.Dropdown(label="GMM Covariance", choices=["full", "diag", "tied", "spherical"], value="full")
                    comp_hac_linkage = gr.Dropdown(label="HAC Linkage", choices=["average", "ward", "complete", "single"], value="average")

                run_comp_btn = gr.Button("⚖️ Run All 5 Algorithms & Compare", variant="primary", size="lg")
                comp_summary_md = gr.Markdown("*Click above to compare all five techniques on your active dataset.*")
                comp_grid_plot = gr.Plot(label="5-Algorithm Visual Grid + ARI Agreement Matrix")
                comp_leaderboard_df = gr.DataFrame(label="Comparative Metrics Leaderboard", interactive=False)

            # ---------------------------------------------------------
            # TAB 4: 2D BENCHMARK PLAYGROUND (SCIKIT-LEARN STYLE)
            # ---------------------------------------------------------
            with gr.Tab("🧪 4. 2D Benchmark Playground"):
                gr.Markdown(
                    "Recreate the classic **Scikit-Learn clustering benchmark** and test the exact edge cases discussed in the write-up: "
                    "*concentric circles*, *interleaving moons*, *elongated anisotropic ellipses*, *varying densities*, and *outlier contamination*."
                )
                with gr.Row():
                    bench_shape_dd = gr.Dropdown(
                        label="2D Benchmark Geometry",
                        choices=list(BENCHMARK_SHAPES.keys()),
                        value=list(BENCHMARK_SHAPES.keys())[0],
                    )
                    bench_n = gr.Slider(label="Sample Size (N)", minimum=120, maximum=500, value=260, step=20)
                    bench_noise = gr.Slider(label="Noise Level", minimum=0.01, maximum=0.15, value=0.06, step=0.01)

                with gr.Row():
                    bench_k = gr.Slider(
                        label="Override K (0 = Shape Default)",
                        minimum=0,
                        maximum=6,
                        value=0,
                        step=1,
                    )
                    bench_db_eps = gr.Slider(
                        label="DBSCAN ε (0 = Auto-Knee)",
                        minimum=0.0,
                        maximum=0.80,
                        value=0.30,
                        step=0.02,
                    )
                    bench_ms_q = gr.Slider(label="Mean-Shift Quantile", minimum=0.10, maximum=0.45, value=0.22, step=0.02)
                    bench_hac_link = gr.Dropdown(
                        label="HAC Linkage",
                        choices=["average", "single", "ward", "complete"],
                        value="average",
                    )

                with gr.Row():
                    run_bench_single_btn = gr.Button("🎯 Compare All 5 on Selected Geometry", variant="primary")
                    run_bench_matrix_btn = gr.Button("🏁 Generate Full 5×5 Scikit-Learn Benchmark Matrix", variant="secondary")

                bench_takeaway_md = gr.Markdown("*Select a 2D benchmark geometry and click a button above to observe algorithm strengths and failure modes.*")
                bench_plot = gr.Plot(label="2D Benchmark Visualization")
                bench_metrics_df = gr.DataFrame(label="Benchmark Quantitative Summary", interactive=False)

            # ---------------------------------------------------------
            # TAB 5: ALGORITHM REFERENCE, PROS & CONS
            # ---------------------------------------------------------
            with gr.Tab("📚 5. Algorithm Reference & Guide"):
                gr.Markdown(
                    """
                    ### 🧠 Five Foundational Clustering Algorithms Compared

                    | Algorithm | Core Mechanism | Pre-set $K$? | Cluster Geometry | Outlier / Noise Handling | Mixed Membership | Time Complexity | Key Hyperparameter(s) |
                    | :--- | :--- | :---: | :--- | :--- | :---: | :--- | :--- |
                    | **1. K-Means** *(+ K-Medians)* | Iterative nearest-centroid assignment & mean (or L1 median) update | **Yes** | Spherical / convex Voronoi cells | Sensitive *(K-Medians is more robust)* | No (Hard) | **$O(n)$** *(linear; K-Medians slower due to sorting)* | `K`, `n_init` |
                    | **2. Mean-Shift** | Hill-climbing circular sliding windows shifted toward peak density | **No (Auto)** | Density modes / arbitrary peaks | Absorbs outliers into clusters | No (Hard) | $O(n^2 \\cdot t)$ | Window radius / bandwidth `r` |
                    | **3. DBSCAN** | Neighborhood expansion within distance $\\varepsilon$ requiring `minPoints` | **No (Auto)** | Arbitrary non-convex shapes (rings, moons) | **Explicit Noise (`-1`)** | No (Hard) | $O(n \\log n)$ typical | `ε` (epsilon), `minPoints` |
                    | **4. GMM (EM)** | Expectation–Maximization fitting Gaussian means & covariance ellipses | **Yes** | **Elliptical** (`full`, `diag`, `tied`, `spherical`) | Soft down-weighting | **Yes (Probabilities)** | **$O(n)$** in samples | `K`, `covariance_type` |
                    | **5. Agglomerative (HAC)** | Bottom-up pairwise merging of closest clusters into a Dendrogram tree | **No (Cut Tree)** | Flexible via linkage (`average`, `ward`, `single`, `complete`) | Isolated late merges in tree | No (Hierarchy) | **$O(n^3)$** *(expensive at huge N)* | `linkage`, `distance metric` / cut height |

                    ---

                    ### 🔍 Key Takeaways for Computational Text & Social Science Research
                    1. **K-Means & K-Medians:** Fast first pass for large document collections, but requires choosing $K$ (use the built-in **Elbow + Silhouette Curve**) and multiple random restarts (`n_init`) because random seeding makes single runs inconsistent. Use **K-Medians** when extreme outliers distort cluster means.
                    2. **Mean-Shift:** Ideal when you do *not* know how many latent themes exist and want centers pinned to true high-density modes—just watch sensitivity to the sliding-window radius $r$.
                    3. **DBSCAN:** Indispensable for messy social media, open-ended survey responses, or civic public comments containing off-topic spam/outliers—it tags them as **Noise (`-1`)** instead of polluting real clusters. Be cautious when themes vary sharply in density or dimensionality.
                    4. **Expectation–Maximization (GMM):** Solves K-Means's rigid circular assumption by learning cluster covariance (ellipses) *and* yields **soft mixed-membership probabilities**—ideal for interdisciplinary policy documents spanning two themes (e.g., *58% Housing / 42% Climate*).
                    5. **Agglomerative Hierarchical Clustering (HAC):** The only technique among the five that recovers an explicit **nested taxonomy (Dendrogram)**, allowing researchers to slice the tree at coarse macro-themes or fine sub-themes without retraining from scratch.

                    ---

                    ### 🤗 Hugging Face Token & Free CPU Tier Architecture
                    * **Serverless Neural Embeddings:** Supplying your Hugging Face Token (`hf_...`) sends document batches to Hugging Face's Serverless `feature_extraction` endpoint (e.g. `all-MiniLM-L6-v2` or `bge-small-en-v1.5`), keeping CPU/RAM footprints tiny on the Free Tier.
                    * **AI Cluster Naming:** Enabling `✨ AI Cluster Naming` passes top c-TF-IDF terms and representative exemplars to an instruction LLM (`Qwen2.5-7B-Instruct`) to propose crisp thematic titles.
                    * **Zero-Friction Offline Mode:** Without a token, the studio automatically uses **Local TF-IDF + TruncatedSVD** and c-TF-IDF keyword signatures so every single algorithm works instantaneously.
                    """
                )

        # -------------------------------------------------------------
        # Event Wiring
        # -------------------------------------------------------------
        validate_btn.click(fn=validate_token, inputs=[hf_token_input], outputs=[token_status_html])

        # Tab 1: Text Corpus
        text_file_upload.upload(
            fn=on_text_file_upload,
            inputs=[text_file_upload],
            outputs=[raw_text_df_state, text_col_dd, text_label_dd, text_load_status, text_preview_df],
        )
        load_text_sample_btn.click(
            fn=load_text_sample_ui,
            outputs=[raw_text_df_state, text_col_dd, text_label_dd, text_load_status, text_preview_df],
        )
        parse_pasted_btn.click(
            fn=load_pasted_texts,
            inputs=[pasted_text_box],
            outputs=[raw_text_df_state, text_col_dd, text_label_dd, text_load_status, text_preview_df],
        )
        vectorize_text_btn.click(
            fn=vectorize_text_dataset,
            inputs=[
                raw_text_df_state,
                text_col_dd,
                text_label_dd,
                vector_engine_radio,
                embed_model_dropdown,
                hf_token_input,
            ],
            outputs=[active_dataset_state, active_dataset_status],
        )

        # Tab 1: Numeric CSV
        num_file_upload.upload(
            fn=on_numeric_file_upload,
            inputs=[num_file_upload],
            outputs=[raw_num_df_state, num_features_cbg, num_label_dd, num_load_status, num_preview_df],
        )
        load_num_sample_btn.click(
            fn=load_numeric_sample_ui,
            outputs=[raw_num_df_state, num_features_cbg, num_label_dd, num_load_status, num_preview_df],
        )
        prepare_num_btn.click(
            fn=prepare_numeric_dataset,
            inputs=[raw_num_df_state, num_features_cbg, num_label_dd, standardize_cb],
            outputs=[active_dataset_state, active_dataset_status],
        )

        # Tab 2: Single-Algorithm Deep Dive
        algo_selector.change(
            fn=toggle_algorithm_controls,
            inputs=[algo_selector],
            outputs=[grp_kmeans, grp_meanshift, grp_dbscan, grp_gmm, grp_hac],
        )
        run_deep_dive_btn.click(
            fn=run_deep_dive,
            inputs=[
                active_dataset_state,
                algo_selector,
                km_k,
                km_variant,
                km_n_init,
                km_seed,
                ms_auto_bw,
                ms_quantile,
                ms_bw,
                ms_bin_seed,
                ms_cluster_all,
                db_auto_eps,
                db_eps,
                db_min_samples,
                db_metric,
                gmm_k,
                gmm_cov,
                gmm_n_init,
                hac_linkage,
                hac_metric,
                hac_cut_mode,
                hac_k,
                hac_thresh,
                use_llm_naming_cb,
                llm_model_dropdown,
                hf_token_input,
            ],
            outputs=[
                active_dataset_state,
                deep_summary_md,
                primary_plot,
                diagnostic_plot,
                profiles_df_out,
                assignments_df_out,
                export_csv_file,
                export_jsonl_file,
            ],
        )

        # Tab 3: Side-by-Side Comparison
        run_comp_btn.click(
            fn=run_all_five_comparison,
            inputs=[
                active_dataset_state,
                comp_k,
                comp_ms_quantile,
                comp_db_min_samples,
                comp_gmm_cov,
                comp_hac_linkage,
            ],
            outputs=[active_dataset_state, comp_summary_md, comp_grid_plot, comp_leaderboard_df],
        )

        # Tab 4: 2D Benchmark Playground
        run_bench_single_btn.click(
            fn=run_benchmark_single,
            inputs=[
                bench_shape_dd,
                bench_n,
                bench_noise,
                bench_k,
                bench_db_eps,
                bench_ms_q,
                bench_hac_link,
            ],
            outputs=[bench_takeaway_md, bench_plot, bench_metrics_df],
        )
        run_bench_matrix_btn.click(
            fn=run_benchmark_full_matrix,
            inputs=[bench_n, bench_noise, bench_db_eps, bench_ms_q, bench_hac_link],
            outputs=[bench_takeaway_md, bench_plot],
        )

    return demo


demo = build_interface()

if __name__ == "__main__":
    launch_kwargs = {}
    launch_params = inspect.signature(demo.launch).parameters
    if "theme" in launch_params:
        launch_kwargs["theme"] = gr.themes.Soft(primary_hue="indigo", secondary_hue="teal")
    if "css" in launch_params:
        launch_kwargs["css"] = CUSTOM_CSS
    demo.queue().launch(**launch_kwargs)
