---
name: guide-llm-transparency
description: >-
  Generates and appends standardized GUIDE-LLM AI Transparency checklists
  (Feuerriegel et al., 2026, Nature Human Behaviour, DOI: 10.1038/s41562-026-02492-7)
  to research project HTML pages and project documentation. Use whenever creating,
  updating, or publishing a research project or dataset page in this workspace.
---

# GUIDE-LLM AI Transparency Reporting Skill

Whenever a research project, empirical audit, simulation, or dataset portal is created or uploaded to GitHub in this workspace, append a standardized **AI Transparency & Reporting Checklist (GUIDE-LLM)** section at the end of the project's HTML page (just before `</main>`).

## Core Principles
1. **Strict Empirical Accuracy (Never Guess):** Pull exact model IDs, providers, temperatures, `max_tokens`, system prompts, post-processing steps, and API call counts directly from the project's Python scripts and `AGENTS.md`. If a parameter (e.g., exact access date or temperature from an older run) is not recorded in the repo, state `Not specified in repository scripts` or `N/A`—never invent values.
2. **Separate Distinct LLM Roles (per GUIDE-LLM instructions):**
   - **Role 1 — Agentic Code & Pipeline Generation:** Document Antigravity (Google DeepMind) used under PI human-in-the-loop oversight (`Dr. Jose Marichal`) to write scrapers, HTML portals, or data pipelines.
   - **Role 2 — LLM as Research Object (if applicable):** Document audited/simulated models (exact Hugging Face / API model IDs, parameters, stateless vs. chat mode).
   - **Role 3 — LLM as Evaluator / Classifier (if applicable):** Document judge or labeling models (e.g., `meta-llama/Llama-3.3-70B-Instruct`, zero-shot NLI, or supervised classifiers), including masking/de-identification and JSON parsing.
   - If no LLMs were used for empirical generation or labeling (e.g., pure web scraping + human student rubric coding), state clearly that LLM use was restricted to **agentic code/pipeline authoring**, while data coding is performed by humans or deterministic scripts.

## Required Checklist Items (Feuerriegel et al., 2026)
Include a clean, collapsible `<details>` or `.section-card` table at the bottom of `<main>` covering:
- **A.1 Scope of LLM use** (Research design, Data processing, Analysis/code generation, LLM as research object, LLM as evaluator, Participant-facing, Communication)
- **A.2 Degree of automation** (Human-in-the-loop oversight by PI vs. automated batch inference)
- **B.1 Model details** (Provider, model size, exact ID, access date, Hugging Face / API source link, separated by role)
- **B.2 Model access & context mode** (API vs. web UI vs. local; stateless single-turn calls vs. multi-turn chat)
- **B.3 Configurations** (`temperature`, `max_tokens`, `seed`, number of runs, reasoning settings)
- **B.4 Customizations** (Base/instruct model, RAG, tool/function calling, web search, agentic workflows)
- **B.5 Persistent memory** (`Yes` / `No` / `N/A`)
- **C.1 Exact prompts reported** (Inline or linked directly to repository `.py` / `.csv` files)
- **C.2 System-wide instructions** (Exact `SYSTEM_PROMPT` or `None`)
- **D.1 Personal or sensitive data & privacy** (Public records / synthetic vignettes / `[PERSON]` masking; no private human-subjects PII)
- **E.1 Human validation** (PI inspection, student rubric coding, or inter-coder overlap)
- **E.2 Post-processing** (Regex JSON extraction, empty/timeout filtering, deduplication)
- **F.1 Reproducibility (Code & scripts shared)** (`Yes` + direct GitHub/download links, credentials excluded)
- **G.1 Competing interests & funding** (`No competing financial relationships with LLM providers; standard academic/self-funded API access`)
- **Optional Items Summary:** Model selection justification (open-weight transparency/cost), prompt design rationale, multi-model comparison, training-data leakage controls (e.g., 2024 vs. 2026 temporal split), bias/ethical safeguards, and computational resources (call counts & estimated cost).
- **Citation:** Feuerriegel, S., Barrie, C., Crockett, M. J., Globig, L. K., McLoughlin, K. L., Mirea, D.-M., Spirling, A., Yang, D., ..., Rathje, S., & Ribeiro, M. H. (2026). A reporting checklist for large language models in behavioural science. *Nature Human Behaviour*. DOI: `10.1038/s41562-026-02492-7`
