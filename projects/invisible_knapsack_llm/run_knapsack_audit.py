"""
Hugging Face Multi-Model Audit: Unpacking the Invisible Knapsack of LLMs
------------------------------------------------------------------------
Runs paired Peggy McIntosh (1989) everyday-privilege probes across open-weight
LLMs via Hugging Face InferenceClient.

Usage:
  set HF_TOKEN=hf_...
  python run_knapsack_audit.py --pilot
  python run_knapsack_audit.py --full
"""

import argparse
import csv
import os
import pathlib
import time
from datetime import datetime, timezone

from huggingface_hub import InferenceClient

BASE_DIR = pathlib.Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
PROBES_CSV = BASE_DIR / "mcintosh_probes.csv"

PILOT_MODELS = [
    ("meta-llama/Llama-3.1-8B-Instruct", "8B"),
    ("Qwen/Qwen3.5-9B", "9B"),
    ("google/gemma-3-12b-it", "12B"),
    ("openai/gpt-oss-20b", "20B-OSS"),
    ("deepseek-ai/DeepSeek-V3.2", "Frontier-MoE"),
]

FULL_MODELS = PILOT_MODELS + [
    ("meta-llama/Llama-3.2-3B-Instruct", "3B"),
    ("google/gemma-3-4b-it", "4B"),
    ("microsoft/phi-4", "14B"),
    ("Qwen/Qwen3-32B", "32B"),
    ("meta-llama/Llama-3.3-70B-Instruct", "70B"),
    ("openai/gpt-oss-120b", "120B-OSS"),
    ("CohereLabs/c4ai-command-a-03-2025", "Command-A"),
]

SYSTEM_PROMPT = "You are a helpful, concise assistant. Follow the user's length instructions."

FIELDNAMES = [
    "run_id",
    "timestamp_utc",
    "model_id",
    "model_size",
    "probe_id",
    "pair_id",
    "dimension",
    "mcintosh_anchor",
    "condition",
    "name_cue",
    "prompt_text",
    "response_text",
    "status",
]


def query_model(client: InferenceClient, model_id: str, prompt_text: str) -> tuple[str, str]:
    try:
        resp = client.chat_completion(
            model=model_id,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": prompt_text},
            ],
            max_tokens=320,
            temperature=0.3,
        )
        content = (resp.choices[0].message.content or "").strip()
        return content, ("ok" if content else "empty")
    except Exception as exc:
        return f"ERROR: {exc}", "error"


def main() -> None:
    parser = argparse.ArgumentParser(description="Run Invisible Knapsack LLM audit via Hugging Face.")
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--pilot", action="store_true", help="Run 5 pilot models (140 queries).")
    group.add_argument("--full", action="store_true", help="Run all 12 models (336 queries).")
    parser.add_argument("--sleep", type=float, default=0.3, help="Delay between API calls.")
    args = parser.parse_args()

    token = os.environ.get("HF_TOKEN")
    if not token:
        raise SystemExit("HF_TOKEN environment variable is required.")

    DATA_DIR.mkdir(parents=True, exist_ok=True)
    with PROBES_CSV.open("r", encoding="utf-8") as f:
        probes = list(csv.DictReader(f))

    models = FULL_MODELS if args.full else PILOT_MODELS
    run_id = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    out_csv = DATA_DIR / ("knapsack_responses_full.csv" if args.full else "knapsack_responses_pilot.csv")

    client = InferenceClient(token=token)
    total = len(models) * len(probes)
    done = 0

    with out_csv.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=FIELDNAMES)
        writer.writeheader()
        for model_id, model_size in models:
            print(f"=== Model: {model_id} ({model_size}) ===")
            for p in probes:
                text, status = query_model(client, model_id, p["prompt_text"])
                done += 1
                writer.writerow({
                    "run_id": run_id,
                    "timestamp_utc": datetime.now(timezone.utc).isoformat(),
                    "model_id": model_id,
                    "model_size": model_size,
                    "probe_id": p["probe_id"],
                    "pair_id": p["pair_id"],
                    "dimension": p["dimension"],
                    "mcintosh_anchor": p["mcintosh_anchor"],
                    "condition": p["condition"],
                    "name_cue": p["name_cue"],
                    "prompt_text": p["prompt_text"],
                    "response_text": text,
                    "status": status,
                })
                f.flush()
                if done % 10 == 0 or done == total:
                    print(f"  Progress: {done}/{total} ({status})")
                time.sleep(args.sleep)

    print(f"Saved {done} responses to {out_csv}")


if __name__ == "__main__":
    main()

