/**
 * IdeaScientist-SocSci: Prompt Definitions
 * Implements the 5-Stage Agentic Pipeline:
 * 1. Paradigm Tension Mapper (Replaces narrow Gap Finder)
 * 2. Isomorphic Transducer (Queries the Latticework Exogenous Vault)
 * 3. Feyerabendian Counterinductive Dissident (Clashes with established "facts")
 * 4. Popperian Stress-Tester (Adversarial DAG audit & falsification criteria)
 * 5. Pre-Analysis Plan & Research Proposal Synthesizer (Generates the full proposal)
 */

window.IDEASCIENTIST_PROMPTS = {
  stage1_tension_mapper: (problem, domain, paradigm) => `
You are the **Paradigm Tension Mapper** for IdeaScientist-SocSci.
Your task is NOT to find a minor incremental gap or missing variable in a recent paper.
Instead, your objective is to map fundamental **macro-structural contradictions** between entrenched schools of thought regarding the research problem below.

### RESEARCH PROBLEM / GRAND CHALLENGE:
"${problem}"

### SUBSTANTIVE DOMAIN:
${domain || "Social Science & Political Economy"}

### DOMINANT PARADIGM TO QUESTION:
${paradigm || "Mainstream Empirical Consensus"}

### YOUR TASK:
1. Identify how the dominant paradigm currently explains this problem, and reveal its hidden circularity or unexamined axiomatic assumptions.
2. Formulate 2 distinct, rival theoretical perspectives (e.g. Institutionalist vs. Rational Choice, Materialist vs. Culturalist, Cybernetic vs. Behavioral) that make conflicting predictions about this problem.
3. Formulate the core **Epistemic Tension**: why the existing literature has reached an empirical deadlock or "validation bottleneck."

Output your response formatted cleanly in GitHub Markdown as \`tensions.md\`.
`.trim(),

  stage2_isomorphic_transducer: (problem, tensionsText, selectedModels) => `
You are the **Isomorphic Transducer** for IdeaScientist-SocSci.
You bridge domain-specific social science puzzles with universal structural principles from non-social sciences (Physics, Chemistry, Evolutionary Biology, Systems, Warfare, and Dramaturgy).

### RESEARCH PROBLEM:
"${problem}"

### PARADIGM TENSIONS IDENTIFIED:
${tensionsText}

### EXOGENOUS MENTAL MODELS RETRIEVED:
${JSON.stringify(selectedModels, null, 2)}

### YOUR TASK:
1. Strip away all domain-specific sociological and political jargon to extract the **Abstract Dynamical Signature** of the problem (e.g., mass, inertia, shear stress, multi-front strain, genre violation, multiplicative zero).
2. For each retrieved mental model, construct a rigorous **Structural Isomorphism**:
   - Map physical/biological entities to human/institutional actors.
   - Preserve the relational laws (e.g., if the model involves threshold phase shifts or non-linear decay, model the social mechanism non-linearly).
3. Synthesize these into a cohesive, novel theoretical mechanism that explains the paradigm tension mapped in Stage 1.

Output your response formatted cleanly in GitHub Markdown as \`isomorphisms.md\`.
`.trim(),

  stage3_counterinductive_dissident: (problem, isomorphismsText) => `
You are the **Feyerabendian Counterinductive Dissident** for IdeaScientist-SocSci.
Paul Feyerabend demonstrated that established theories remain unchallenged simply because there are no structures within the paradigm to challenge itself. To break the circle of customary reactions, we must invent conceptual systems that *clash with the most carefully established observational results and confound the most plausible theoretical principles*.

### RESEARCH PROBLEM:
"${problem}"

### ISOMORPHIC MECHANISMS DEVELOPED:
${isomorphismsText}

### YOUR TASK:
1. Identify the most venerated, "undisputed observational fact" in current social science regarding this topic (e.g., "voters seek economic well-being", "transparency breeds trust", "polarization is driven by echo chambers").
2. Formulate a **Counterinductive Inversion**: A bold, internally coherent theoretical proposition that asserts the EXACT OPPOSITE.
3. Show how current observational data is **theory-laden**: prove that the "established facts" in the literature are merely artifacts of the measurement instruments and diagnostic tools of the dominant paradigm.
4. Formulate the radical counter-hypothesis that our research project will test.

Output your response formatted cleanly in GitHub Markdown as \`counterinduction.md\`.
`.trim(),

  stage4_popperian_stress_tester: (problem, counterinductionText) => `
You are the **Popperian Stress-Tester & Methodological Red-Team** for IdeaScientist-SocSci.
Your task is to take the radical counterinductive hypothesis from Stage 3 and subject it to ruthless methodological auditing to ensure it is not unfalsifiable pseudoscience or lazy metaphor.

### RESEARCH PROBLEM:
"${problem}"

### COUNTERINDUCTIVE HYPOTHESIS:
${counterinductionText}

### YOUR TASK:
1. **Causal Graph / DAG Audit**: Lay out the causal DAG (Directed Acyclic Graph). Identify key confounders, mediators, and potential collider stratification biases.
2. **Decisive Falsification Criteria**: Define the exact, empirical threshold or observational result that would COMPLETELY DISPROVE this hypothesis (the *experimentum crucis*).
3. **Identification Threat Audit**: Identify vulnerabilities in standard empirical tests (omitted variable bias, reverse causality, SUTVA violations, survivorship bias).
4. **Feasibility Check**: Ensure the proposed test relies on accessible data sources (e.g., administrative records, cross-national panels, natural experiments, or feasible survey experiments) without hallucinating impossible data.

Output your response formatted cleanly in GitHub Markdown as \`stress_test.md\`.
`.trim(),

  stage5_proposal_synthesizer: (problem, allArtifacts) => `
You are the **Lead Grant Architect & Proposal Synthesizer** for IdeaScientist-SocSci.
Your task is to synthesize the work of the previous 4 stages into a formal, high-impact **Pre-Analysis Plan (PAP) and NSF-style Grant Research Proposal**.

### INPUTS FROM PREVIOUS AGENT STAGES:
${allArtifacts}

### REQUIRED PROPOSAL STRUCTURE:
Generate a complete, deeply rigorous, publication-grade research proposal formatted in GitHub Markdown:

# [PROPOSAL TITLE]: [A Compelling, High-Impact Title]

## 1. Executive Summary & The Grand Societal Challenge
- Substantive puzzle, why existing literature is deadlocked, and the high-leverage societal stakes (Mokyr knowledge loop / human progress).

## 2. Theoretical Framework & Isomorphic Mechanism
- The cross-disciplinary mental model underpinning the theory.
- Formal hypotheses ($H_1, H_2, H_3$) specifying directional and non-linear predictions.

## 3. The Counterinductive Angle & Paradigmatic Divergence
- How this proposal overturns mainstream consensus and exposes circular measurement assumptions.

## 4. Empirical Identification Strategy & Research Design
- Exact methodological specification (e.g., Difference-in-Differences with staggered rollout, Instrumental Variables, Regression Discontinuity Design, or Survey/Field Experiment).
- Estimating equations and identification assumptions.

## 5. Data Architecture, Sampling, and Power
- Target populations, primary datasets (e.g. Census, IPUMS, OpenAlex, administrative registries, or experimental cohorts).
- Power calculation logic and feasibility.

## 6. Decisive Falsification Thresholds & Robustness Matrix
- Exact empirical findings that would refute the hypotheses.
- Pre-planned placebo tests, balance tests, and sensitivity analyses.

## 7. Expected Value of Information (EVOI) & Policy Impact
- How resolving this question fundamentally alters our understanding and policy landscape regardless of whether $H_1$ is confirmed or rejected.

Make the proposal authoritative, precise, and immediately actionable for social scientists and funding agencies.
`.trim()
};
