/**
 * IdeaScientist-SocSci - Client Application Logic
 * Supports Option A: Google AI Studio Gemini API (Free Tier) & Instant Exemplar Simulation
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
  let activePreset = 'mokyr_stagnation';
  let selectedModelIds = ['thermodynamics_entropy', 'friction_viscosity', 'red_queen_effect', 'second_order_thinking'];
  let isRunning = false;

  // --- Elements ---
  const problemInput = document.getElementById('problem-input');
  const domainInput = document.getElementById('domain-input');
  const paradigmInput = document.getElementById('paradigm-input');
  const selectedModelsContainer = document.getElementById('selected-models-container');
  const artifactViewer = document.getElementById('artifact-viewer');
  const launchBtn = document.getElementById('launch-btn');
  const simulateBtn = document.getElementById('simulate-btn');
  const copyBtn = document.getElementById('copy-btn');
  const downloadBtn = document.getElementById('download-btn');
  const keyStatusBadge = document.getElementById('key-status-badge');
  const keyStatusDot = document.getElementById('key-status-dot');
  const apiKeyModal = document.getElementById('api-key-modal');
  const apiKeyInput = document.getElementById('api-key-input');
  const saveKeyBtn = document.getElementById('save-key-btn');
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
  loadPreset(activePreset);
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
      keyStatusBadge.textContent = "Demo / Simulation Mode";
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
      keyStatusBadge.textContent = "Demo / Simulation Mode";
      keyStatusDot.classList.remove('active');
      showToast("API Key removed. Switched to Simulation Mode.");
    }
    apiKeyModal.classList.remove('active');
  }

  // --- Preset Loading ---
  function loadPreset(presetKey) {
    activePreset = presetKey;
    const exemplar = window.IDEASCIENTIST_EXEMPLARS[presetKey];
    if (!exemplar) return;

    problemInput.value = exemplar.problem;
    domainInput.value = exemplar.domain;
    paradigmInput.value = exemplar.paradigm;
    selectedModelIds = [...exemplar.selectedModels];
    activeArtifacts = { ...exemplar.artifacts };

    // Update preset card UI
    document.querySelectorAll('.preset-card').forEach(card => {
      card.classList.toggle('active', card.dataset.preset === presetKey);
    });

    renderSelectedModelPills();
    renderArtifact(currentTab);
    resetStepperToCompleted();
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
  async function runPipeline(forceSimulate = false) {
    if (isRunning) return;
    const apiKey = localStorage.getItem('gemini_api_key');
    const problem = problemInput.value.trim();
    const domain = domainInput.value.trim();
    const paradigm = paradigmInput.value.trim();

    if (!problem) {
      alert("Please enter a research problem or grand challenge.");
      return;
    }

    isRunning = true;
    launchBtn.disabled = true;
    simulateBtn.disabled = true;
    launchBtn.textContent = "Pipeline Running...";

    resetStepperToIdle();

    const modelsObjects = selectedModelIds.map(id => window.LATTICEWORK_MODELS.find(m => m.id === id)).filter(Boolean);

    // If no API key or user clicked simulate, run realistic simulation
    if (!apiKey || forceSimulate) {
      await runSimulatedPipeline(problem, domain, paradigm, modelsObjects);
    } else {
      try {
        await runGeminiLivePipeline(apiKey, problem, domain, paradigm, modelsObjects);
      } catch (err) {
        console.error("Gemini API Error:", err);
        showToast("Gemini API error. Falling back to simulation mode.");
        await runSimulatedPipeline(problem, domain, paradigm, modelsObjects);
      }
    }

    isRunning = false;
    launchBtn.disabled = false;
    simulateBtn.disabled = false;
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

  // --- High-Depth Simulation Mode (Zero API Key needed) ---
  async function runSimulatedPipeline(problem, domain, paradigm, models) {
    // Check if the current problem matches a known exemplar
    const matchedExemplar = window.IDEASCIENTIST_EXEMPLARS[activePreset];

    const sleep = ms => new Promise(res => setTimeout(res, ms));

    for (let step = 1; step <= 5; step++) {
      setStepState(step, 'running');
      await sleep(750); // brief UI pacing animation

      if (step === 1) {
        activeArtifacts.tensions = matchedExemplar ? matchedExemplar.artifacts.tensions : generateCustomTensions(problem, domain, paradigm);
        switchTab('tensions');
      } else if (step === 2) {
        activeArtifacts.isomorphisms = matchedExemplar ? matchedExemplar.artifacts.isomorphisms : generateCustomIsomorphisms(problem, models);
        switchTab('isomorphisms');
      } else if (step === 3) {
        activeArtifacts.counterinduction = matchedExemplar ? matchedExemplar.artifacts.counterinduction : generateCustomCounterinduction(problem);
        switchTab('counterinduction');
      } else if (step === 4) {
        activeArtifacts.stress_test = matchedExemplar ? matchedExemplar.artifacts.stress_test : generateCustomStressTest(problem);
        switchTab('stress_test');
      } else if (step === 5) {
        activeArtifacts.proposal = matchedExemplar ? matchedExemplar.artifacts.proposal : generateCustomProposal(problem, domain, models);
        switchTab('proposal');
      }
      setStepState(step, 'completed');
    }
  }

  function generateCustomTensions(problem, domain, paradigm) {
    return `### Stage 1: Paradigm Tension Mapper (\`tensions.md\`)

#### 1. Analysis of Dominant Paradigm (${paradigm})
The reigning consensus reduces "${problem.slice(0, 60)}..." to an informational optimization problem or institutional coordination failure. It relies on standard equilibrium assumptions, presuming that stakeholders possess rational expectations and that friction dissipates linearly with policy adjustments.

#### 2. Structural Contradictions & Rival Schools
* **Perspective A (Structural-Materialist):** Argues that the phenomenon is driven by resource concentration and path-dependent institutional lock-in, where legacy power centers veto optimal solutions.
* **Perspective B (Behavioral-Cognitive):** Argues that the barrier is cognitive bounded rationality and asymmetric heuristics, where citizens and bureaucrats respond to perceived status threats rather than objective payoffs.

#### 3. The Epistemic Impasse
Existing quantitative literature is trapped in an empirical deadlock because conventional metrics capture only formal compliance while missing informal dissipative losses.`;
  }

  function generateCustomIsomorphisms(problem, models) {
    const modelNames = models.map(m => m.name).join(", ");
    return `### Stage 2: Isomorphic Transducer (\`isomorphisms.md\`)

#### 1. Abstract Dynamical Signature
\`[High Systemic Complexity] -> [Non-linear Threshold Effect] -> [Dissipation of Intended Energy] -> [Unintended Equilibrium Lock-in]\`

#### 2. Cross-Disciplinary Mappings from Latticework (${modelNames})
${models.map(m => `* **${m.name} (${m.discipline}):** 
  - *Essence:* ${m.essence}
  - *Social Isomorphism:* ${m.social_isomorphism}
  - *Structural Law:* Explains why linear interventions in "${problem.slice(0, 40)}..." generate unintended second-order backlashes.`).join('\n\n')}

#### 3. Integrated Theoretical Mechanism
By mapping non-social dynamics onto institutional actors, we observe that the problem is not a deficit of technical information, but a systemic structural mismatch between institutional velocity and human cognitive capacity.`;
  }

  function generateCustomCounterinduction(problem) {
    return `### Stage 3: Feyerabendian Counterinductive Dissident (\`counterinduction.md\`)

#### 1. The Undisputed "Observational Fact"
*"Mainstream empirical consensus treats the existing status quo as an inevitable consequence of demographic or technological necessity."*

#### 2. The Counterinductive Inversion
**PROPOSITION:** *The prevailing 'fact' is an artifact of the measurement apparatus itself. Inverting the core assumption reveals that current policy interventions directly cultivate the very dysfunction they claim to combat.*

#### 3. Deconstructing Theory-Laden Observation
Standard survey and administrative metrics define success circularly: when policies fail, the methodology assumes incomplete implementation rather than systemic structural flaw.`;
  }

  function generateCustomStressTest(problem) {
    return `### Stage 4: Popperian Stress-Tester (\`stress_test.md\`)

#### 1. Causal DAG & Confounder Audit
* **Treatment ($T$):** Structural intervention derived from the cross-disciplinary isomorphism.
* **Outcome ($Y$):** Direct measurable shift in institutional capacity and citizen welfare.
* **Potential Colliders:** Organizational survival bias; endogenous selection into reform programs.

#### 2. Decisive Falsification Thresholds (*Experimentum Crucis*)
If empirical testing demonstrates that baseline groups achieve identical outcomes without structural realignment, the **Isomorphic Hypothesis is decisively refuted**.`;
  }

  function generateCustomProposal(problem, domain, models) {
    return `# Structural Transformation in Social Dynamics: An Isomorphic Approach

**Principal Investigator:** Computational Social Science & Applied Epistemology Lab  
**Domain:** ${domain}  
**Framework:** Cross-Disciplinary Mental Models & Counterinductive Verification  

---

## 1. Executive Summary & The Grand Societal Challenge
Addressing: "${problem}".  
Rather than applying another incremental regression model to established datasets, this research formulates a foundational redesign of the analytical paradigm, leveraging structural isomorphisms from ${models.map(m => m.name).join(", ")}.

## 2. Core Theoretical Hypotheses
* **$H_1$:** Interventions targeting root structural constraints yield non-linear improvements in systemic velocity compared to conventional procedural subsidies.
* **$H_2$:** The dominant paradigm's failure is driven by self-reinforcing measurement feedback loops.

## 3. Empirical Design & Identification
Exploiting natural policy discontinuities across regional jurisdictions to isolate exogenous shocks, avoiding classical omitted variable bias through staggered rollout and instrumental variables.`;
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
    // Preset cards
    document.querySelectorAll('.preset-card').forEach(card => {
      card.addEventListener('click', () => {
        loadPreset(card.dataset.preset);
      });
    });

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
    simulateBtn.addEventListener('click', () => runPipeline(true));

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
      a.download = `ideascientist_proposal_${activePreset || 'custom'}.md`;
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
