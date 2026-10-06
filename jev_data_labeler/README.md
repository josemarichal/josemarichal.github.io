---
title: JEV Decision Labeler
emoji: 🏷️
colorFrom: indigo
colorTo: blue
sdk: gradio
sdk_version: 6.5.1
app_file: app.py
pinned: false
license: mit
short_description: Rapid 3-stage text labeling (Train -> Test Validation -> Bulk Inference)
---

# 🏷️ JEV & Clef Decision Labeler (Hugging Face Space)

A high-speed graphical user interface (GUI) designed for **high-throughput, calibrated text labeling** utilizing modern **Decision Models (Cloudflare Clef-Flash 9B, Clef 27B)** and **Zero-Shot Foundation Classifiers (DeBERTa-v3, Qwen 2.5, Llama 3.2)**:
1. **Train Set**: Ingest labeled exemplars to extract category schemas, few-shot decision criteria, and calibration parameters.
2. **Test Set**: Run automated evaluation to calculate **Accuracy, Precision, Recall, Macro F1**, and calibrate confidence thresholds with an interactive confusion matrix.
3. **Bulk Unlabeled Set**: Stream batch inference across thousands of raw texts, flag low-confidence decisions for human review (`NEEDS_REVIEW`), and export clean, labeled CSV/JSONL files.

---

### 🤖 Supported Model Architectures
* **🚀 Decision Models (Joint-Schema):** `Cloudflare/clef-flash` (9B) & `Cloudflare/clef` (27B) — executes single-forward-pass routing over typed schema questions with calibrated logit probabilities.
* **🔀 Intent & Semantic Routers:** `llm-semantic-router/Decision-1.0-Lux-9B` — fine-tuned for classification and routing decisions.
* **🎯 State-of-the-Art Zero-Shot NLI:** `MoritzLaurer/DeBERTa-v3-large-mnli` & `facebook/bart-large-mnli` — classic high-accuracy entailment classifiers.
* **⚡ Structured Reasoning LLMs:** `Qwen/Qwen2.5-7B-Instruct`, `meta-llama/Llama-3.2-3B-Instruct`, and `mistralai/Mistral-7B-Instruct-v0.3`.

---

## ⚡ Deployment to Hugging Face Spaces (Free CPU Tier)

This application is optimized to run smoothly on the **Free CPU Tier** (2 vCPU / 16GB RAM) because it offloads model inference to the Hugging Face Serverless Inference API using your **Hugging Face Token**.

### Option A: Create Space via Web UI
1. Go to [Hugging Face Spaces](https://huggingface.co/new-space).
2. Choose a name (e.g., `jev-data-labeler`).
3. Select **Gradio** as the Space SDK.
4. Choose **CPU Basic (Free)**.
5. Clone the space repository locally or upload these files (`app.py`, `requirements.txt`, `README.md`, and `sample_data/`).
6. *(Optional)* Add your `HF_TOKEN` in **Settings > Variables and secrets > New secret** with the name `HF_TOKEN`.

### Option B: Push via Git CLI
```bash
git clone https://huggingface.co/spaces/<your-username>/jev-data-labeler
cd jev-data-labeler
# Copy app.py, requirements.txt, README.md, sample_data into this directory
git add .
git commit -m "Deploy JEV Decision Labeler"
git push
```

---

## 🔑 Hugging Face Token Setup
To run inference via the Serverless API:
1. Visit [Hugging Face Token Settings](https://huggingface.co/settings/tokens).
2. Generate a token with at least **Read** permissions.
3. Paste it directly into the **Hugging Face Token** input field in the app header (or set it as a Space Secret `HF_TOKEN`).

---

## 📁 Repository Structure
* `app.py`: Full interactive Gradio 6 GUI with 3-phase workflow, progress tracking, and validation charts.
* `requirements.txt`: Python package dependencies.
* `sample_data/`: Included demonstration CSVs (civic & policy feedback) for immediate testing.
