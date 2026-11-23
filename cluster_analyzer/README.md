---
title: Multi-Algorithm Cluster Analyzer
emoji: 🔬
colorFrom: indigo
colorTo: teal
sdk: gradio
sdk_version: 6.5.1
app_file: app.py
pinned: false
license: mit
short_description: Interactive 5-algorithm clustering studio (K-Means/K-Medians, Mean-Shift, DBSCAN, GMM/EM, Agglomerative HAC) with Hugging Face embeddings & AI cluster naming
---

# 🔬 Multi-Algorithm Cluster Analyzer (Hugging Face Space)

An interactive machine learning and computational text analysis studio that implements **five foundational unsupervised clustering algorithms** side by side—designed for both **NLP text corpora** (powered by Hugging Face Serverless neural embeddings or local TF-IDF/SVD) and **numeric tabular / 2D benchmark datasets**:

1. **K-Means (and K-Medians)** — Fast $O(n)$ centroid-based partitioning using mean centers (or outlier-robust L1 median centers), with multi-start initialization (`n_init`) and an automated **Elbow & Silhouette Curve** diagnostic.
2. **Mean-Shift Clustering** — Sliding-window hill-climbing density estimator that **automatically discovers the number of clusters** without pre-setting $K$, visualizing converged density peaks and window radii $r$.
3. **DBSCAN (Density-Based Spatial Clustering of Applications with Noise)** — Neighborhood density expansion ($\varepsilon$, `minPoints`) capable of recovering arbitrary non-convex shapes while explicitly flagging outliers as **Noise (`-1`)**, paired with a sorted **$k$-Distance Knee Plot**.
4. **Expectation–Maximization (EM) with Gaussian Mixture Models (GMM)** — Probabilistic elliptical clustering parameterized by mean and covariance (`full`, `tied`, `diag`, `spherical`), supporting **mixed membership** (soft per-document cluster probabilities), fitted **1σ / 2σ confidence ellipses**, and **AIC/BIC** model selection.
5. **Agglomerative Hierarchical Clustering (HAC)** — Bottom-up $O(n^3)$ hierarchical merging (`average`, `ward`, `complete`, `single` linkage) that recovers full nested cluster structure via an interactive **Dendrogram Tree** cuttable by cluster count or distance threshold.

---

### 🤗 Hugging Face Serverless Integration (Optional Token)

Paste your **Hugging Face User Access Token (`hf_...`)** into the top authentication panel to unlock two cloud-accelerated NLP capabilities on the **Free CPU Tier**:

* **Neural Sentence Embeddings** (`feature_extraction` API): Embed raw text documents with `sentence-transformers/all-MiniLM-L6-v2`, `BAAI/bge-small-en-v1.5`, `BAAI/bge-base-en-v1.5`, `intfloat/e5-small-v2`, or `sentence-transformers/all-mpnet-base-v2`.
* **AI Semantic Cluster Naming & Summaries** (`chat.completions` API): Automatically synthesize human-readable thematic labels and concise sociological/policy summaries for each discovered cluster using `Qwen/Qwen2.5-7B-Instruct`, `meta-llama/Llama-3.2-3B-Instruct`, or `mistralai/Mistral-7B-Instruct-v0.3`.

> **Works Without a Token Too:** If no token is supplied (or Local Mode is selected), the app seamlessly runs **Local TF-IDF + TruncatedSVD** vectorization, **c-TF-IDF keyword labeling**, numeric CSV clustering, and the full **Scikit-Learn-style 2D Benchmark Playground** locally.

---

## ⚡ Deployment to Hugging Face Spaces (Free CPU Tier)

Optimized for the **Free CPU Tier** (2 vCPU / 16GB RAM) because neural embedding inference and LLM naming are offloaded to Hugging Face's Serverless Inference API.

### Option A: Create Space via Web UI
1. Go to [Hugging Face Spaces](https://huggingface.co/new-space).
2. Choose a Space name (e.g., `clustering_analyzer`).
3. Select **Gradio** as the Space SDK.
4. Choose **CPU Basic (Free)**.
5. Upload `app.py`, `requirements.txt`, `README.md`, and `sample_data/`.
6. *(Optional)* Add a default `HF_TOKEN` under **Settings → Variables and secrets → New secret**.

### Option B: Push via Git CLI
```bash
git clone https://huggingface.co/spaces/<your-username>/clustering_analyzer
cd clustering_analyzer
# Copy app.py, requirements.txt, README.md, sample_data/ into this directory
git add .
git commit -m "Deploy 5-Algorithm Cluster Analyzer"
git push
```

---

## 🔑 Hugging Face Token Setup
1. Visit [Hugging Face Token Settings](https://huggingface.co/settings/tokens).
2. Create a token with **Read** (or **Inference Providers**) permissions.
3. Paste it into the **Hugging Face User Access Token** input field in the app header (tokens stay strictly in memory and are never written to disk).

---

## 📁 Repository Structure
* `app.py`: Full interactive Gradio GUI implementing all 5 clustering algorithms (plus K-Medians), HF Serverless embeddings & LLM labeling, side-by-side comparison + ARI matrix, 5×5 Scikit-Learn-style 2D benchmark playground, and CSV/JSONL export.
* `requirements.txt`: Python package dependencies.
* `run_app.bat`: Windows local launch script.
* `sample_data/civic_policy_corpus.csv`: Bundled 51-document civic & technology-policy text corpus (4 domains + deliberate outliers & bridge document).
* `sample_data/municipal_indicators_numeric.csv`: Bundled 60-tract socioeconomic numeric dataset with 4 latent neighborhood typologies + 4 structural outliers.
