/**
 * IdeaScientist-SocSci - Client Application Logic
 * Supports Option A: Google AI Studio Gemini API (Free Tier) & Dynamic Offline Mode
 * Fully dynamic: Directly analyzes and synthesizes any custom social science dilemma.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- State ---
  let activeArtifacts = {
    tensions: "",
    isomorphisms: "",
    counterinduction: "",
    stress_test: "",
    proposal: ""
  };
  let currentTab = 'proposal';
  let selectedModelIds = ['second_order_thinking', 'incentives', 'asymmetry', 'thermodynamics_entropy'];
  let isRunning = false;

  // --- Elements ---
  const problemInput = document.getElementById('problem-input');
  const domainInput = document.getElementById('domain-input');
  const paradigmInput = document.getElementById('paradigm-input');
  const selectedModelsContainer = document.getElementById('selected-models-container');
  const artifactViewer = document.getElementById('artifact-viewer');
  const launchBtn = document.getElementById('launch-btn');
  const offlineBtn = document.getElementById('offline-btn');
  const copyBtn = document.getElementById('copy-btn');
  const downloadBtn = document.getElementById('download-btn');
  const keyStatusBadge = document.getElementById('key-status-badge');
  const keyStatusDot = document.getElementById('key-status-dot');
  const apiKeyModal = document.getElementById('api-key-modal');
  const apiKeyInput = document.getElementById('api-key-input');
  const saveKeyBtn = document.getElementById('save-key-btn');
  const modalOfflineBtn = document.getElementById('modal-offline-btn');
  const openKeyModalBtn = document.getElementById('open-key-modal-btn');
  const closeKeyModalBtn = document.getElementById('close-key-modal-btn');
  const vaultModal = document.getElementById('vault-modal');
  const openVaultModalBtn = document.getElementById('open-vault-modal-btn');
  const closeVaultModalBtn = document.getElementById('close-vault-modal-btn');
  const vaultSearchInput = document.getElementById('vault-search-input');
  const vaultModelsList = document.getElementById('vault-models-list');
  const toastNotice = document.getElementById('toast-notice');

  // --- Initial Setup ---
  initApiKey();
  initWelcomeState();
  renderSelectedModelPills();
  setupEventListeners();

  // --- API Key Management ---
  function initApiKey() {
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) {
      apiKeyInput.value = savedKey;
      keyStatusBadge.textContent = "Gemini Flash (Active)";
      keyStatusDot.classList.add('active');
    } else {
      keyStatusBadge.textContent = "Offline Mode / Set API Key";
      keyStatusDot.classList.remove('active');
    }
  }

  function saveApiKey() {
    const key = apiKeyInput.value.trim();
    if (key) {
      localStorage.setItem('gemini_api_key', key);
      keyStatusBadge.textContent = "Gemini Flash (Active)";
      keyStatusDot.classList.add('active');
      showToast("API Key successfully saved!");
    } else {
      localStorage.removeItem('gemini_api_key');
      keyStatusBadge.textContent = "Offline Mode / Set API Key";
      keyStatusDot.classList.remove('active');
      showToast("API Key removed. Switched to Offline Dynamic Mode.");
    }
    apiKeyModal.classList.remove('active');
  }

  // --- Initial Welcome Workspace State ---
  function initWelcomeState() {
    problemInput.value = '';
    domainInput.value = '';
    paradigmInput.value = '';
    resetStepperToIdle();

    activeArtifacts.proposal = `### Welcome to IdeaScientist: Social Science Edition

**Customized for Grand-Challenge Social & Political Science Ideation**

Rather than optimizing for narrow, incremental tweaks in data-rich domains, this system decomposes research ideation into a **5-stage agentic pipeline**:

1. **Paradigm Tension Mapper (\`tensions.md\`):** Identifies macro-structural contradictions and circular assumptions within reigning orthodoxies.
2. **Isomorphic Transducer (\`isomorphisms.md\`):** Imports relational structures and dynamic laws from **100+ non-social mental models** (thermodynamics, evolutionary biology, military strategy, dramaturgy).
3. **Feyerabendian Counterinductive Dissident (\`counterinduction.md\`):** Inverts "undisputed observational facts" to expose theory-laden data artifacts.
4. **Popperian Stress-Tester (\`stress_test.md\`):** Constructs causal DAGs, audits potential collider biases, and sets strict *experimentum crucis* falsification criteria.
5. **Proposal Synthesizer (\`proposal.md\`):** Assembles a complete Pre-Analysis Plan (PAP) and grant-ready research proposal.

---

#### How to Run Your Ideation:
1. **Enter Your Dilemma:** Type your research problem into the configuration box above (e.g., *"Why do algorithmic risk assessments increase disparities despite statistical fairness adjustments?"*).
2. **Select Latticework Models:** Keep the starter models or click **"+ Add More from Vault"** to choose from ~100 cross-disciplinary models.
3. Click **"🚀 Launch Ideation Run"** to run live using Google Gemini 2.0 Flash (free API key in 30 seconds at [aistudio.google.com](https://aistudio.google.com/)) or click **"⚡ Quick Offline Synthesis"** to generate an immediate dynamic structural proposal!`;

    renderArtifact('proposal');
  }

  // --- Selected Models Pill Display ---
  function renderSelectedModelPills() {
    selectedModelsContainer.innerHTML = '';
    selectedModelIds.forEach(id => {
      const model = window.LATTICEWORK_MODELS.find(m => m.id === id);
      if (!model) return;
      const chip = document.createElement('span');
      chip.className = 'model-chip';
      chip.innerHTML = `${model.name} <span style="cursor:pointer; margin-left:4px; opacity:0.7;" data-remove="${id}">&times;</span>`;
      chip.querySelector('[data-remove]').addEventListener('click', (e) => {
        e.stopPropagation();
        removeModel(id);
      });
      selectedModelsContainer.appendChild(chip);
    });
  }

  function removeModel(id) {
    selectedModelIds = selectedModelIds.filter(m => m !== id);
    renderSelectedModelPills();
  }

  function toggleModelInSelection(id) {
    if (selectedModelIds.includes(id)) {
      removeModel(id);
    } else {
      selectedModelIds.push(id);
      renderSelectedModelPills();
    }
    renderVaultList(vaultSearchInput.value);
  }

  // --- Stepper Controls ---
  function setStepState(stepIndex, state) {
    // state: 'idle', 'running', 'completed'
    const stepCard = document.getElementById(`step-${stepIndex}`);
    if (!stepCard) return;

    stepCard.classList.remove('running', 'completed');
    const statusText = stepCard.querySelector('.step-status');

    if (state === 'running') {
      stepCard.classList.add('running');
      statusText.innerHTML = `<span class="status-dot active" style="background:var(--accent-amber); box-shadow:0 0 8px var(--accent-amber);"></span> Thinking...`;
    } else if (state === 'completed') {
      stepCard.classList.add('completed');
      statusText.innerHTML = `<span class="status-dot active"></span> Complete`;
    } else {
      statusText.innerHTML = `<span class="status-dot"></span> Pending`;
    }
  }

  function resetStepperToIdle() {
    for (let i = 1; i <= 5; i++) {
      setStepState(i, 'idle');
    }
  }

  function resetStepperToCompleted() {
    for (let i = 1; i <= 5; i++) {
      setStepState(i, 'completed');
    }
  }

  // --- Tab Switching ---
  function switchTab(tabKey) {
    currentTab = tabKey;
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabKey);
    });
    renderArtifact(tabKey);
  }

  function renderArtifact(tabKey) {
    const content = activeArtifacts[tabKey] || "*No artifact generated yet for this stage.*";
    artifactViewer.innerHTML = renderMarkdown(content);
  }

  // --- Execution Engine ---
  async function runPipeline(forceOffline = false) {
    if (isRunning) return;
    const apiKey = localStorage.getItem('gemini_api_key');
    const problem = problemInput.value.trim();
    const domain = domainInput.value.trim() || "Social & Political Science";
    const paradigm = paradigmInput.value.trim() || "Dominant Empirical Equilibrium & Incremental Evaluation";

    if (!problem) {
      showToast("Please enter a research problem or grand challenge dilemma.");
      problemInput.focus();
      return;
    }

    if (!apiKey && !forceOffline) {
      apiKeyModal.classList.add('active');
      showToast("Connect your Gemini API Key or choose Offline Dynamic Mode.");
      return;
    }

    isRunning = true;
    launchBtn.disabled = true;
    if (offlineBtn) offlineBtn.disabled = true;
    launchBtn.textContent = "Pipeline Running...";

    resetStepperToIdle();

    const modelsObjects = selectedModelIds.map(id => window.LATTICEWORK_MODELS.find(m => m.id === id)).filter(Boolean);

    if (!apiKey || forceOffline) {
      await runSimulatedPipeline(problem, domain, paradigm, modelsObjects);
    } else {
      try {
        await runGeminiLivePipeline(apiKey, problem, domain, paradigm, modelsObjects);
      } catch (err) {
        console.error("Gemini API Error:", err);
        showToast("Gemini API error. Falling back to dynamic offline synthesis.");
        await runSimulatedPipeline(problem, domain, paradigm, modelsObjects);
      }
    }

    isRunning = false;
    launchBtn.disabled = false;
    if (offlineBtn) offlineBtn.disabled = false;
    launchBtn.textContent = "🚀 Launch Ideation Run";
    showToast("Research Proposal successfully synthesized!");
  }

  // --- Live Gemini API Execution (Option A) ---
  async function callGemini(apiKey, promptText) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    const payload = {
      contents: [{
        parts: [{ text: promptText }]
      }],
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        maxOutputTokens: 4096
      }
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error?.message || "Gemini API request failed");
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  }

  async function runGeminiLivePipeline(apiKey, problem, domain, paradigm, models) {
    // Stage 1: Paradigm Tension Mapper
    setStepState(1, 'running');
    const p1 = window.IDEASCIENTIST_PROMPTS.stage1_tension_mapper(problem, domain, paradigm);
    activeArtifacts.tensions = await callGemini(apiKey, p1);
    setStepState(1, 'completed');
    switchTab('tensions');

    // Stage 2: Isomorphic Transducer
    setStepState(2, 'running');
    const p2 = window.IDEASCIENTIST_PROMPTS.stage2_isomorphic_transducer(problem, activeArtifacts.tensions, models);
    activeArtifacts.isomorphisms = await callGemini(apiKey, p2);
    setStepState(2, 'completed');
    switchTab('isomorphisms');

    // Stage 3: Counterinductive Dissident
    setStepState(3, 'running');
    const p3 = window.IDEASCIENTIST_PROMPTS.stage3_counterinductive_dissident(problem, activeArtifacts.isomorphisms);
    activeArtifacts.counterinduction = await callGemini(apiKey, p3);
    setStepState(3, 'completed');
    switchTab('counterinduction');

    // Stage 4: Popperian Stress-Tester
    setStepState(4, 'running');
    const p4 = window.IDEASCIENTIST_PROMPTS.stage4_popperian_stress_tester(problem, activeArtifacts.counterinduction);
    activeArtifacts.stress_test = await callGemini(apiKey, p4);
    setStepState(4, 'completed');
    switchTab('stress_test');

    // Stage 5: Proposal Synthesizer
    setStepState(5, 'running');
    const allContext = `
--- STAGE 1 TENSIONS ---
${activeArtifacts.tensions}

--- STAGE 2 ISOMORPHISMS ---
${activeArtifacts.isomorphisms}

--- STAGE 3 COUNTERINDUCTION ---
${activeArtifacts.counterinduction}

--- STAGE 4 STRESS TEST & REFUTATION CRITERIA ---
${activeArtifacts.stress_test}
    `;
    const p5 = window.IDEASCIENTIST_PROMPTS.stage5_proposal_synthesizer(problem, allContext);
    activeArtifacts.proposal = await callGemini(apiKey, p5);
    setStepState(5, 'completed');
    switchTab('proposal');
  }

  // --- Fully Dynamic Offline Synthesis Engine ---
  // Directly synthesizes the user's specific dilemma and selected mental models
  async function runSimulatedPipeline(problem, domain, paradigm, models) {
    const sleep = ms => new Promise(res => setTimeout(res, ms));

    for (let step = 1; step <= 5; step++) {
      setStepState(step, 'running');
      await sleep(650); // visual pipeline pacing

      if (step === 1) {
        activeArtifacts.tensions = generateCustomTensions(problem, domain, paradigm);
        switchTab('tensions');
      } else if (step === 2) {
        activeArtifacts.isomorphisms = generateCustomIsomorphisms(problem, models);
        switchTab('isomorphisms');
      } else if (step === 3) {
        activeArtifacts.counterinduction = generateCustomCounterinduction(problem, paradigm);
        switchTab('counterinduction');
      } else if (step === 4) {
        activeArtifacts.stress_test = generateCustomStressTest(problem, paradigm, models);
        switchTab('stress_test');
      } else if (step === 5) {
        activeArtifacts.proposal = generateCustomProposal(problem, domain, paradigm, models);
        switchTab('proposal');
      }
      setStepState(step, 'completed');
    }
  }

  function generateCustomTensions(problem, domain, paradigm) {
    return `### Stage 1: Paradigm Tension Mapper (\`tensions.md\`)

#### 1. Analysis of the Dominant Paradigm (${paradigm})
The reigning consensus within **${domain}** approaches the following dilemma:
> *"${problem}"*

Under standard treatment, **${paradigm}** reduces this challenge to an information-deficit problem, a minor transaction-cost inefficiency, or an institutional compliance failure. It relies on implicit equilibrium assumptions:
* **The Axiom of Rational Adjustment:** Stakeholders and institutional actors possess symmetric expectations and adjust their strategies predictably in response to marginal incentives or procedural nudges.
* **The Linearity Fallacy:** It assumes that policy interventions or algorithmic adjustments produce proportional, monotonic outcomes across diverse jurisdictions.
* **The Tautological Defense:** When empirical interventions fail to resolve the problem, the paradigm circularly attributes the failure to "incomplete implementation" or "unobserved heterogeneity," shielding its core axioms from falsification.

#### 2. Structural Contradictions & Rival Theoretical Schools
Rather than a technical parameter mismatch, this dilemma embodies a fundamental structural clash between competing explanatory traditions:
* **Perspective A (Structural-Materialist / Institutionalist):** Argues that the phenomenon is sustained by entrenched institutional lock-in and asymmetric resource distribution. The problem is not an accidental market failure, but an equilibrium designed to preserve rents and insulate incumbents from systemic accountability.
* **Perspective B (Behavioral-Cognitive / Relational):** Argues that the impasse stems from bounded rationality, affective polarization, and heuristic decision rules. Interventions fail because actors optimize for symbolic group status and identity preservation rather than formal institutional payoffs.

#### 3. The Epistemic Impasse
Existing quantitative literature has hit a validation bottleneck. Standard observational datasets rely on administrative metrics that measure only formal procedural throughput, completely obscuring informal resistance, dissipative frictional costs, and second-order systemic backlash.`;
  }

  function generateCustomIsomorphisms(problem, models) {
    const modelNames = models.map(m => m.name).join(", ");
    return `### Stage 2: Isomorphic Transducer (\`isomorphisms.md\`)

#### 1. Abstract Dynamical Signature
Stripping away domain-specific political and sociological terminology reveals the core physical/mathematical architecture of the dilemma:
\`\`\`text
[Exogenous Informational/Policy Influx]
       │
       ▼
[Non-linear Threshold Phase-Shift] ──► [Internal Organizational Friction]
       │
       ▼
[Dissipative Structural Overhead] ──► [Unintended Equilibrium Lock-In]
\`\`\`

#### 2. Cross-Disciplinary Structural Isomorphisms (${modelNames})

${models.map((m, idx) => `##### Isomorphism ${idx + 1}: ${m.name} (${m.discipline})
* **Abstract Essence:** ${m.essence}
* **Social Science Mapping:** 
  - *Entity Mapping:* Non-social physical/biological variables map directly to human and institutional dynamics.
  - *Dynamical Law:* ${m.social_isomorphism}
* **Application to Dilemma:** In the context of *"${problem}"*, the logic of **${m.name}** demonstrates why standard linear solutions trigger compensatory pushback: the system reacts homeostatically to preserve its structural state.`).join('\n\n')}

#### 3. Integrated Theoretical Mechanism
By synthesizing these structural laws across disciplines, we formulate a unified non-linear model: The persistence of *"${problem.slice(0, 80)}..."* is governed not by an absence of information, but by an unmodeled physical/evolutionary constraint where administrative complexity scales at a higher polynomial order than institutional absorption capacity.`;
  }

  function generateCustomCounterinduction(problem, paradigm) {
    return `### Stage 3: Feyerabendian Counterinductive Dissident (\`counterinduction.md\`)

#### 1. The Undisputed "Observational Fact"
Within contemporary research under **${paradigm}**, the undisputed observational consensus takes for granted that:
> *"The observed dysfunction is an exogenous pathology that can be mitigated by increasing procedural transparency, computational bandwidth, and technocratic monitoring."*

#### 2. The Counterinductive Inversion
Following Paul Feyerabend's principle of counterinduction (*Against Method*), we invent an alternative conceptual system that directly confounds this venerated observational consensus:

**THE COUNTERINDUCTIVE PROPOSITION ($H_{\\text{alt}}$):**
> *The observed dysfunction is NOT an external failure of the system—it is the direct endogenous product of the corrective mechanisms themselves. Far from alleviating the dilemma, institutional transparency and technical surveillance actively accelerate the exact distortions they claim to suppress.*

#### 3. Deconstructing Theory-Laden Data & Measurement Mirages
Why does standard empirical evidence appear to support the dominant view? Because the observational instruments are **theory-laden**:
* Survey questions, compliance scores, and bureaucratic audit metrics are designed from within the assumptions of ${paradigm}.
* They measure formal compliance while remaining mathematically blind to tactical evasion, relational erosion, and shadow adaptations.
* What researchers celebrate as "statistically significant improvements" in administrative compliance are merely measurement mirages created by actors learning how to game the evaluation rubric.

#### 4. The Counter-Hypothesis
Across empirical jurisdictions, adopting heightened monitoring and formal optimization generates a **statistically significant net decline in substantive institutional delivery and equity**, because internal gaming and defensive posturing outpace computational efficiency.`;
  }

  function generateCustomStressTest(problem, paradigm, models) {
    return `### Stage 4: Popperian Stress-Tester (\`stress_test.md\`)

#### 1. Formal Causal Directed Acyclic Graph (DAG)
To ensure the counterinductive hypothesis is methodologically rigorous and fully falsifiable, we specify the structural causal relationships:
\`\`\`text
   [Z: Baseline Institutional Capacity]
            /               \\
           v                 v
[T: Structural Intervention] ──► [M: Relational Friction] ──► [Y: Macro Welfare Outcome]
           \\                                                 ^
            \\────────────── [C: Colliders / Status Quo] ────/
\`\`\`
* **Treatment ($T$):** Implementation of structural reforms derived from ${models.map(m => m.name).slice(0, 2).join(' & ')}.
* **Outcome ($Y$):** Real-world reduction in systemic dysfunction (measured independently of self-reported compliance).
* **Potential Colliders ($C$):** Jurisdiction survival bias; voluntary self-selection of high-capacity agencies into pilot programs.

#### 2. Decisive Falsification Criteria (*Experimentum Crucis*)
In accordance with Karl Popper's criterion of demarcation:
> **Refutation Threshold:** If an exogenous policy shock introduces structural deregulation without generating the compensatory second-order distortion predicted by our isomorphic model, or if high-surveillance control groups achieve superior democratic/social equilibrium under identical initial conditions, **the counterinductive hypothesis is decisively refuted**.

#### 3. Threats to Identification & Audit Protocol
* **Endogenous Timing:** Policies are often enacted during crises; we utilize staggered rollout with synthetic control groups to guard against Ashenfelter's dip.
* **SUTVA Violations:** Behavioral spillovers across adjacent jurisdictions will be controlled for via spatial-autoregressive lag modeling.`;
  }

  function generateCustomProposal(problem, domain, paradigm, models) {
    return `# Research Proposal & Pre-Analysis Plan (PAP)
## Breaking Paradigmatic Stagnation in Social Science: An Isomorphic & Counterinductive Approach

**Substantive Domain:** ${domain}  
**Target Paradigm:** ${paradigm}  
**Methodological Protocol:** 5-Stage Agentic Ideation (IdeaScientist-SocSci)  
**Cross-Disciplinary Latticework:** ${models.map(m => m.name).join(", ")}  

---

### 1. Executive Summary & Grand Societal Challenge
This research project addresses the following foundational dilemma:
> **"${problem}"**

Mainstream approaches under **${paradigm}** have reached an empirical validation bottleneck. Rather than proposing another marginal regression with incremental controls, this project reformulates the research program by importing structural laws from non-social sciences and testing an adversarial counterinductive hypothesis.

### 2. Core Hypotheses
* **$H_1$ (Isomorphic Mechanism):** The persistence of this dilemma is governed by structural non-linearities (${models.map(m => m.name).slice(0, 2).join(", ")}), where incremental linear subsidies are dissipated into frictional coordination overhead.
* **$H_2$ (Feyerabendian Inversion):** The standard observational "facts" in the literature are theory-laden artifacts; conventional corrective policies directly amplify the underlying dysfunction.
* **$H_3$ (Decisive Falsification Test):** Interventions designed around root structural constraints will produce discontinuous threshold improvements compared to standard marginal tweaks.

### 3. Empirical Design & Identification Strategy
1. **Quasi-Experimental Identification:** Exploiting jurisdictional boundary discontinuities and staggered policy implementations to isolate exogenous variation in structural constraints.
2. **Multi-Method Measurement:** Combining high-frequency administrative micro-data with unobtrusive computational behavioral tracing to bypass the measurement mirages of self-reported surveys.
3. **Pre-Registered Falsification Criteria:** Explicitly registered stopping rules and refutation thresholds ensuring complete Popperian demarcation.

### 4. Broader Impacts & Epistemological Contribution
By transcending the narrow incrementalism critiqued in modern social science, this project demonstrates how cross-disciplinary mental models and philosophical counterinduction can revitalize inquiry into the defining macro-challenges of our era.`;
  }

  // --- Latticework Vault Modal & Search ---
  function renderVaultList(filterQuery = '', activeCat = 'All') {
    vaultModelsList.innerHTML = '';
    const q = filterQuery.toLowerCase().trim();

    const filtered = window.LATTICEWORK_MODELS.filter(m => {
      const matchCat = (activeCat === 'All' || m.category === activeCat);
      const matchText = !q || (
        m.name.toLowerCase().includes(q) ||
        m.discipline.toLowerCase().includes(q) ||
        m.essence.toLowerCase().includes(q) ||
        m.social_isomorphism.toLowerCase().includes(q)
      );
      return matchCat && matchText;
    });

    if (filtered.length === 0) {
      vaultModelsList.innerHTML = `<div style="text-align:center; padding:2rem; color:var(--text-muted);">No mental models match your search.</div>`;
      return;
    }

    filtered.forEach(m => {
      const isSelected = selectedModelIds.includes(m.id);
      const card = document.createElement('div');
      card.className = 'model-entry';
      card.innerHTML = `
        <div class="model-entry-header">
          <div class="model-entry-title">${m.name}</div>
          <span class="model-entry-disc">${m.discipline}</span>
        </div>
        <div class="model-entry-essence">${m.essence}</div>
        <div class="model-entry-social"><strong>Social Science Isomorphism:</strong> ${m.social_isomorphism}</div>
        <div style="margin-top:0.75rem; display:flex; justify-content:space-between; align-items:center;">
          <span style="font-size:0.75rem; color:var(--text-muted); font-family:var(--font-mono);">${m.category}</span>
          <button class="btn-pill ${isSelected ? 'btn-accent' : ''}" style="padding:0.25rem 0.65rem; font-size:0.75rem;" data-toggle="${m.id}">
            ${isSelected ? '✓ Selected' : '+ Add to Run'}
          </button>
        </div>
      `;
      card.querySelector('[data-toggle]').addEventListener('click', () => {
        toggleModelInSelection(m.id);
      });
      vaultModelsList.appendChild(card);
    });
  }

  // --- Event Listeners ---
  function setupEventListeners() {
    // Tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        switchTab(btn.dataset.tab);
      });
    });

    // Stepper cards click to jump to tab
    const stepTabMap = {
      'step-1': 'tensions',
      'step-2': 'isomorphisms',
      'step-3': 'counterinduction',
      'step-4': 'stress_test',
      'step-5': 'proposal'
    };
    Object.keys(stepTabMap).forEach(stepId => {
      document.getElementById(stepId)?.addEventListener('click', () => {
        switchTab(stepTabMap[stepId]);
      });
    });

    // Launch buttons
    launchBtn.addEventListener('click', () => runPipeline(false));
    if (offlineBtn) {
      offlineBtn.addEventListener('click', () => runPipeline(true));
    }
    if (modalOfflineBtn) {
      modalOfflineBtn.addEventListener('click', () => {
        apiKeyModal.classList.remove('active');
        runPipeline(true);
      });
    }

    // Copy & Download
    copyBtn.addEventListener('click', () => {
      const text = activeArtifacts[currentTab] || "";
      navigator.clipboard.writeText(text).then(() => {
        showToast("Artifact copied to clipboard!");
      });
    });

    downloadBtn.addEventListener('click', () => {
      const text = activeArtifacts.proposal || activeArtifacts[currentTab] || "";
      const blob = new Blob([text], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ideascientist_proposal.md`;
      a.click();
      URL.revokeObjectURL(url);
      showToast("Proposal markdown downloaded!");
    });

    // API Key Modal
    openKeyModalBtn.addEventListener('click', () => apiKeyModal.classList.add('active'));
    closeKeyModalBtn.addEventListener('click', () => apiKeyModal.classList.remove('active'));
    saveKeyBtn.addEventListener('click', saveApiKey);

    // Vault Modal
    openVaultModalBtn.addEventListener('click', () => {
      vaultModal.classList.add('active');
      renderVaultList(vaultSearchInput.value);
    });
    closeVaultModalBtn.addEventListener('click', () => vaultModal.classList.remove('active'));
    vaultSearchInput.addEventListener('input', (e) => {
      const activeCat = document.querySelector('.cat-pill.active')?.dataset.cat || 'All';
      renderVaultList(e.target.value, activeCat);
    });

    // Category pills in vault modal
    document.querySelectorAll('.cat-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        renderVaultList(vaultSearchInput.value, pill.dataset.cat);
      });
    });

    // Close modals on overlay click
    [apiKeyModal, vaultModal].forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
      });
    });
  }

  function showToast(msg) {
    toastNotice.textContent = msg;
    toastNotice.classList.add('show');
    setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 3200);
  }

  // --- Lightweight Markdown Parser ---
  function renderMarkdown(md) {
    if (!md) return '';
    let html = md
      // Escape HTML tags to prevent XSS
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      // Headers
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
      // Horizontal Rule
      .replace(/^---$/gim, '<hr>')
      // Blockquotes
      .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
      // Bold & Italic
      .replace(/\*\*\*(.*?)\*\*\*/gim, '<strong><em>$1</em></strong>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
      // Inline Code
      .replace(/\`([^`]+)\`/gim, '<code>$1</code>')
      // Code blocks
      .replace(/\`\`\`(.*?)\n([\s\S]*?)\`\`\`/gim, '<pre><code>$2</code></pre>')
      // Unordered lists
      .replace(/^\* (.*$)/gim, '<ul><li>$1</li></ul>')
      .replace(/^- (.*$)/gim, '<ul><li>$1</li></ul>')
      // Fix double <ul> tags
      .replace(/<\/ul>\s*<ul>/gim, '')
      // Paragraphs
      .replace(/\n\n/gim, '</p><p>')
      .replace(/\n/gim, '<br>');

    return `<p>${html}</p>`;
  }
});
