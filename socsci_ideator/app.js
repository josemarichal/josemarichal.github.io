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
  const copyBtn = document.getElementById('copy-btn');
  const downloadBtn = document.getElementById('download-btn');
  const keyStatusBadge = document.getElementById('key-status-badge');
  const keyStatusDot = document.getElementById('key-status-dot');
  const inlineApiKey = document.getElementById('inline-api-key');
  const saveInlineKeyBtn = document.getElementById('save-inline-key-btn');
  const clearInlineKeyBtn = document.getElementById('clear-inline-key-btn');
  const inlineKeyStatusDot = document.getElementById('inline-key-status-dot');
  const inlineKeyStatusText = document.getElementById('inline-key-status-text');
  const geminiModelSelect = document.getElementById('gemini-model-select');
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
  initWelcomeState();
  renderSelectedModelPills();
  setupEventListeners();

  // --- API Key Management ---
  function initApiKey() {
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) {
      if (apiKeyInput) apiKeyInput.value = savedKey;
      if (inlineApiKey) inlineApiKey.value = savedKey;
      if (keyStatusBadge) keyStatusBadge.textContent = "Gemini Flash (Connected)";
      if (keyStatusDot) keyStatusDot.classList.add('active');
      if (inlineKeyStatusDot) inlineKeyStatusDot.classList.add('active');
      if (inlineKeyStatusText) {
        inlineKeyStatusText.textContent = "✓ Key saved. Google Gemini 2.0 Flash is connected and ready to run.";
        inlineKeyStatusText.style.color = "var(--accent-color)";
      }
      if (clearInlineKeyBtn) clearInlineKeyBtn.style.display = "inline-block";
    } else {
      if (apiKeyInput) apiKeyInput.value = '';
      if (inlineApiKey) inlineApiKey.value = '';
      if (keyStatusBadge) keyStatusBadge.textContent = "Set API Key";
      if (keyStatusDot) keyStatusDot.classList.remove('active');
      if (inlineKeyStatusDot) inlineKeyStatusDot.classList.remove('active');
      if (inlineKeyStatusText) {
        inlineKeyStatusText.textContent = "Paste a free Gemini API key to run live multi-stage reasoning (takes 30 seconds at aistudio.google.com).";
        inlineKeyStatusText.style.color = "var(--text-muted)";
      }
      if (clearInlineKeyBtn) clearInlineKeyBtn.style.display = "none";
    }
  }

  function setApiKey(key) {
    const cleanKey = key.trim();
    if (cleanKey) {
      localStorage.setItem('gemini_api_key', cleanKey);
      initApiKey();
      showToast("Gemini API Key successfully saved!");
    } else {
      localStorage.removeItem('gemini_api_key');
      initApiKey();
      showToast("API Key cleared.");
    }
    if (apiKeyModal) apiKeyModal.classList.remove('active');
  }

  // --- Initial Welcome Workspace State ---
  function initWelcomeState() {
    problemInput.value = '';
    domainInput.value = '';
    paradigmInput.value = '';
    resetStepperToIdle();

    activeArtifacts.proposal = `### Welcome to IdeaScientist: Social Science Edition

**Customized for Grand-Challenge Social & Political Science Ideation**

Rather than optimizing for narrow, incremental tweaks in data-rich domains, this system decomposes research ideation into a **5-stage agentic pipeline** powered live by **Google Gemini 2.0 Flash**:

1. **Paradigm Tension Mapper (\`tensions.md\`):** Identifies macro-structural contradictions and circular assumptions within reigning orthodoxies.
2. **Isomorphic Transducer (\`isomorphisms.md\`):** Imports relational structures and dynamic laws from **100+ non-social mental models** (thermodynamics, evolutionary biology, military strategy, dramaturgy).
3. **Feyerabendian Counterinductive Dissident (\`counterinduction.md\`):** Inverts "undisputed observational facts" to expose theory-laden data artifacts.
4. **Popperian Stress-Tester (\`stress_test.md\`):** Constructs causal DAGs, audits potential collider biases, and sets strict *experimentum crucis* falsification criteria.
5. **Proposal Synthesizer (\`proposal.md\`):** Assembles a complete Pre-Analysis Plan (PAP) and grant-ready research proposal.

---

#### Quick Setup:
1. **API Key:** Paste your free Gemini API key from [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) in the configuration box above.
2. **Configure Your Dilemma:** Enter your research question, substantive domain, and the paradigm you wish to challenge.
3. **Select Latticework Models:** Keep the starter models or click **"+ Add More from Vault"** to choose relevant cross-disciplinary mental models.
4. **Click "🚀 Launch 5-Stage Ideation Run"** to watch each stage synthesize live!`;

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
  async function runPipeline() {
    if (isRunning) return;

    let keyToUse = localStorage.getItem('gemini_api_key');
    if (!keyToUse && inlineApiKey?.value?.trim()) {
      keyToUse = inlineApiKey.value.trim();
      localStorage.setItem('gemini_api_key', keyToUse);
      initApiKey();
    }

    const problem = problemInput.value.trim();
    const domain = domainInput.value.trim() || "Social & Political Science";
    const paradigm = paradigmInput.value.trim() || "Dominant Empirical Equilibrium & Incremental Evaluation";

    if (!problem) {
      showToast("Please enter a research problem or grand challenge dilemma.");
      problemInput.focus();
      return;
    }

    if (!keyToUse) {
      showToast("Please paste your free Google Gemini API key to launch live ideation.");
      if (inlineApiKey) {
        inlineApiKey.focus();
        inlineApiKey.style.border = '2px solid var(--accent-red)';
        setTimeout(() => {
          inlineApiKey.style.border = '1px solid var(--border-color)';
        }, 3500);
      }
      return;
    }

    isRunning = true;
    launchBtn.disabled = true;
    launchBtn.textContent = "Pipeline Running (Gemini 2.0 Flash)...";

    resetStepperToIdle();

    const modelsObjects = selectedModelIds.map(id => window.LATTICEWORK_MODELS.find(m => m.id === id)).filter(Boolean);

    try {
      await runGeminiLivePipeline(keyToUse, problem, domain, paradigm, modelsObjects);
      showToast("5-Stage Research Proposal successfully synthesized!");
    } catch (err) {
      console.error("Gemini API Error:", err);
      resetStepperToIdle();
      artifactViewer.innerHTML = `
        <div style="background:rgba(239, 68, 68, 0.08); border:1px solid rgba(239, 68, 68, 0.4); border-radius:var(--radius-sm); padding:1.5rem; margin:1rem 0;">
          <h3 style="color:#ef4444; margin-bottom:0.75rem;">⚠️ Live Model Generation Failed</h3>
          <p style="color:var(--text-heading); margin-bottom:0.75rem;"><strong>Error Message:</strong> ${err.message}</p>
          <div style="font-size:0.9rem; color:var(--text-main); margin-bottom:1rem; line-height:1.6;">
            <strong>Troubleshooting:</strong>
            <ul style="margin-left:1.5rem; margin-top:0.4rem;">
              <li><strong>Check Key Validity:</strong> Ensure your API key is correctly copied from <a href="https://aistudio.google.com/app/apikey" target="_blank" style="color:var(--accent-color); text-decoration:underline;">Google AI Studio</a>.</li>
              <li><strong>Free Tier Quota:</strong> Google AI Studio provides 15 Requests Per Minute (RPM) free. If you made rapid requests, wait 60 seconds and retry.</li>
              <li><strong>Ad-Blockers / Firewalls:</strong> Ensure your browser or network is not blocking calls to <code>generativelanguage.googleapis.com</code>.</li>
            </ul>
          </div>
          <button id="retry-launch-btn" class="btn-primary" style="margin-top:0.5rem; padding:0.5rem 1.25rem;">↻ Retry Launch</button>
        </div>
      `;
      document.getElementById('retry-launch-btn')?.addEventListener('click', () => runPipeline());
      showToast("Generation error: " + err.message);
    }

    isRunning = false;
    launchBtn.disabled = false;
    launchBtn.textContent = "🚀 Launch 5-Stage Ideation Run";
  }

  // --- Live Gemini API Execution with Auto-Fallback ---
  async function callGemini(apiKey, promptText) {
    const selectedModel = geminiModelSelect ? geminiModelSelect.value : 'gemini-1.5-flash';
    // Fallback list to guarantee execution even if one model is retired or at capacity
    const candidateModels = [selectedModel, 'gemini-1.5-flash', 'gemini-2.5-flash', 'gemini-1.5-pro'];
    const modelsToTry = [...new Set(candidateModels)];

    let lastError = null;

    for (const model of modelsToTry) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey.trim()}`;
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
          let errBody = "";
          try {
            const errData = await response.json();
            errBody = errData.error?.message || "";
          } catch (e) {}

          const isUnavailable = response.status === 404 || 
            errBody.toLowerCase().includes('not found') || 
            errBody.toLowerCase().includes('no longer available') ||
            errBody.toLowerCase().includes('is not supported');

          if (isUnavailable) {
            console.warn(`Model ${model} unavailable (${errBody}), trying fallback...`);
            lastError = new Error(errBody || `Model ${model} is not available`);
            continue; // try next candidate model
          }

          throw new Error(errBody || `HTTP ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
          throw new Error("Gemini returned an empty response or the response was filtered.");
        }

        // If a fallback model worked, sync the dropdown
        if (geminiModelSelect && geminiModelSelect.value !== model) {
          geminiModelSelect.value = model;
        }

        return data.candidates[0].content.parts[0].text;
      } catch (err) {
        const isUnavailable = err.message.toLowerCase().includes('not found') || 
          err.message.toLowerCase().includes('no longer available') ||
          err.message.toLowerCase().includes('is not supported');

        if (isUnavailable) {
          lastError = err;
          continue;
        }
        throw err;
      }
    }

    throw lastError || new Error("All candidate Gemini models failed. Please verify your API key.");
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

    // Launch button
    launchBtn.addEventListener('click', runPipeline);

    // Inline Key actions
    saveInlineKeyBtn?.addEventListener('click', () => setApiKey(inlineApiKey.value));
    clearInlineKeyBtn?.addEventListener('click', () => setApiKey(''));
    inlineApiKey?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        setApiKey(inlineApiKey.value);
      }
    });

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
    openKeyModalBtn?.addEventListener('click', () => apiKeyModal.classList.add('active'));
    closeKeyModalBtn?.addEventListener('click', () => apiKeyModal.classList.remove('active'));
    saveKeyBtn?.addEventListener('click', () => setApiKey(apiKeyInput.value));

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
