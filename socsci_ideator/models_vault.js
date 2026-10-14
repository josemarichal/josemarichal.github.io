/**
 * Exogenous Latticework Vault: Cross-Disciplinary Mental Models
 * Compiled from Charlie Munger's Latticework, Physics, Biology, Systems Thinking, 
 * Military Strategy, Dramaturgy, and Behavioral Psychology.
 * 
 * Each model includes:
 * - id: unique slug
 * - name: model title
 * - discipline: primary source discipline
 * - category: conceptual domain
 * - essence: core mechanism
 * - social_isomorphism: structural mapping into human societies & institutions
 * - counterinductive_angle: how this model challenges mainstream social science orthodoxy
 */

window.LATTICEWORK_MODELS = [
  // ==========================================
  // 1. GENERAL THINKING TOOLS
  // ==========================================
  {
    id: "map_territory",
    name: "The Map is Not the Territory",
    discipline: "Epistemology / General Thinking",
    category: "General Thinking",
    essence: "Abstractions and representations are not the complex, shifting reality they describe.",
    social_isomorphism: "Social statistics (GDP, polling, crime rates) are reductionist maps. Treating the metric as the social phenomenon blinds researchers to unmeasured ground-level shifts.",
    counterinductive_angle: "Assert that what standard datasets measure is merely institutional vanity; the critical causal action is happening entirely in the unmapped territory."
  },
  {
    id: "circle_competence",
    name: "Circle of Competence",
    discipline: "Epistemology",
    category: "General Thinking",
    essence: "Knowing where your deep understanding ends and where speculation begins.",
    social_isomorphism: "Technocratic policymaking fails when quantitative modelers mistake mathematical sophistication for deep domain expertise in local social realities.",
    counterinductive_angle: "Institutions collapse not from lack of expertise, but from the hubris of expanding formal modeling into areas governed by tacit cultural knowledge."
  },
  {
    id: "first_principles",
    name: "First Principles Thinking",
    discipline: "Philosophy / Physics",
    category: "General Thinking",
    essence: "Boiling a system down to its most fundamental, immutable truths and reasoning up from there.",
    social_isomorphism: "Stripping away institutional dogma and historical inertia to deduce how individuals coordinate when existing legal apparatuses fail.",
    counterinductive_angle: "Reject inherited sociological categories (e.g. 'class', 'party') and reconstruct social behavior purely from basic survival and informational incentives."
  },
  {
    id: "thought_experiment",
    name: "Thought Experiment (Gedankenexperiment)",
    discipline: "Physics / Philosophy",
    category: "General Thinking",
    essence: "Testing hypotheses in a simplified, friction-free mental sandbox to expose core mechanics.",
    social_isomorphism: "Constructing counterfactual societies (e.g., Rawls' Veil of Ignorance) to reveal latent ethical and institutional assumptions.",
    counterinductive_angle: "Explore an extreme counterfactual where a core social law is reversed to uncover why the status quo appears inevitable."
  },
  {
    id: "second_order_thinking",
    name: "Second-Order Thinking",
    discipline: "Systems / Strategy",
    category: "General Thinking",
    essence: "Looking beyond immediate, visible reactions to anticipate downstream ripple effects ('And then what?').",
    social_isomorphism: "Well-intentioned public policies (e.g., rent control, speech bans) often produce perverse equilibria that harm the intended beneficiaries.",
    counterinductive_angle: "The primary consequence of any major institutional reform is almost always the exact opposite of its declared objective."
  },
  {
    id: "probabilistic_thinking",
    name: "Probabilistic Thinking & Updating",
    discipline: "Mathematics / Statistics",
    category: "General Thinking",
    essence: "Navigating uncertainty through continuous Bayesian belief revision rather than binary certainty.",
    social_isomorphism: "Ideological polarization occurs when social groups treat political beliefs as identity badges rather than probability distributions open to updating.",
    counterinductive_angle: "Public institutions that express certainty to maintain authority actually accelerate delegitimization when unexpected shocks occur."
  },
  {
    id: "inversion",
    name: "Inversion",
    discipline: "Mathematics / Strategy",
    category: "General Thinking",
    essence: "Instead of asking how to achieve success, ask what would guarantee absolute failure.",
    social_isomorphism: "To understand democratic resilience, study how to guarantee democratic collapse; avoid those conditions systematically.",
    counterinductive_angle: "Rather than seeking the drivers of economic development, model what institutional arrangements most effectively preserve poverty."
  },
  {
    id: "occams_razor",
    name: "Occam's Razor",
    discipline: "Philosophy of Science",
    category: "General Thinking",
    essence: "Prefer the explanation that makes the fewest assumptions until evidence demands complexity.",
    social_isomorphism: "Complex conspiratorial or grand-ideological explanations of political failure are usually explainable by basic coordination friction.",
    counterinductive_angle: "In bureaucratic systems, assume institutional paralysis is caused by the simplest organizational bottleneck, not malicious grand designs."
  },
  {
    id: "hanlons_razor",
    name: "Hanlon's Razor",
    discipline: "Philosophy / Psychology",
    category: "General Thinking",
    essence: "Never attribute to malice that which is adequately explained by stupidity or incompetence.",
    social_isomorphism: "Public outrage often models state actions as hostile conspiracies, missing the banal reality of administrative miscommunication and fatigue.",
    counterinductive_angle: "Bureaucratic dysfunction is not a predatory capture by elites; it is the natural accumulation of cognitive and organizational decay."
  },

  // ==========================================
  // 2. PHYSICS, CHEMISTRY, AND THERMODYNAMICS
  // ==========================================
  {
    id: "relativity",
    name: "Relativity & Reference Frames",
    discipline: "Physics",
    category: "Physics & Chemistry",
    essence: "Observations and measurements depend fundamentally on the observer's motion and coordinate frame.",
    social_isomorphism: "Political values and perceived crises are entirely relative to socioeconomic position; there is no 'neutral' baseline in policy evaluation.",
    counterinductive_angle: "Objective consensus in policy is physically impossible; politics is the continuous reconciliation of mutually non-interchangeable reference frames."
  },
  {
    id: "thermodynamics_entropy",
    name: "Thermodynamics: Entropy & The Second Law",
    discipline: "Physics",
    category: "Physics & Chemistry",
    essence: "In any closed system, disorder and entropy increase over time; maintaining order requires continuous external energy input.",
    social_isomorphism: "Institutions, legal norms, and social capital do not self-sustain. Without constant civic energy and maintenance, they naturally decay into factional chaos.",
    counterinductive_angle: "Institutional failure is not an anomaly caused by 'bad actors'; it is the thermodynamic default of human systems when maintenance energy drops."
  },
  {
    id: "inertia_momentum",
    name: "Inertia & Momentum",
    discipline: "Physics",
    category: "Physics & Chemistry",
    essence: "Objects with mass resist changes in velocity; moving mass carries momentum that resists sudden redirection.",
    social_isomorphism: "Large bureaucracies and cultural practices possess massive sociological inertia. Passing a new law does not overcome centuries of institutional mass.",
    counterinductive_angle: "Radical policy reform fails not from lack of political will, but because the kinetic energy required to deflect bureaucratic mass exceeds available social energy."
  },
  {
    id: "friction_viscosity",
    name: "Friction & Viscosity",
    discipline: "Physics / Fluid Dynamics",
    category: "Physics & Chemistry",
    essence: "Internal shear resistance in fluids and surface roughness that dissipates kinetic energy into heat.",
    social_isomorphism: "Administrative compliance, legal red tape, and social mistrust act as societal viscosity, turning political momentum into wasted frictional heat.",
    counterinductive_angle: "The failure of state capacity is rarely a lack of fiscal funding; it is hyper-viscosity in administrative execution that strangles execution."
  },
  {
    id: "velocity_vs_speed",
    name: "Velocity vs. Speed (Vector Direction)",
    discipline: "Physics",
    category: "Physics & Chemistry",
    essence: "Speed is scalar magnitude; velocity is speed with a definite direction. High speed in circles yields zero displacement.",
    social_isomorphism: "Frenzied legislative activity, frantic regulatory output, and endless commission meetings often produce high civic speed with zero positive velocity.",
    counterinductive_angle: "Most modern institutional 'activity' is high-velocity circular acceleration designed to consume resources while avoiding structural displacement."
  },
  {
    id: "leverage_fulcrum",
    name: "Leverage & The Fulcrum",
    discipline: "Physics / Mechanics",
    category: "Physics & Chemistry",
    essence: "A small force applied at a long distance from a pivot moves an immense load.",
    social_isomorphism: "Small, well-positioned institutional levers (e.g., court rulings, procedural rules like the filibuster) allow tiny interest groups to move entire economies.",
    counterinductive_angle: "Democratic majoritarianism is an illusion; real power belongs entirely to whoever controls the structural fulcrum of procedure."
  },
  {
    id: "activation_energy",
    name: "Activation Energy",
    discipline: "Chemistry",
    category: "Physics & Chemistry",
    essence: "The minimum energetic barrier that must be overcome for a chemical transformation to initiate.",
    social_isomorphism: "Substantive social changes that benefit everyone never start because the initial barrier (organizing costs, legal risk, fear) exceeds everyday citizen capacity.",
    counterinductive_angle: "Societal stagnation is caused by elevated activation barriers, not citizen apathy. Lower the initial transaction cost, and spontaneous self-organization ignites."
  },
  {
    id: "catalysts",
    name: "Catalysts & Reaction Pathways",
    discipline: "Chemistry",
    category: "Physics & Chemistry",
    essence: "Substances that accelerate reactions by providing an alternative low-energy pathway without being consumed.",
    social_isomorphism: "Charismatic leaders, independent media platforms, or catastrophic events act as civic catalysts, collapsing the activation energy for mass collective action.",
    counterinductive_angle: "Social movements cannot be organized through brute force; they require structural catalysts that alter the energetic pathway of participation."
  },
  {
    id: "alloying_metallurgy",
    name: "Alloying & Composite Materials",
    discipline: "Materials Science / Chemistry",
    category: "Physics & Chemistry",
    essence: "Combining two distinct elements creates a crystalline lattice far stronger and less brittle than either pure component.",
    social_isomorphism: "Ideologically 'pure' regimes or parties are brittle and shatter under shock. Enduring constitutions are composite alloys of competing traditions.",
    counterinductive_angle: "Bipartisanship is not moral compromise; it is the structural metallurgical alloying required to prevent constitutional fracture."
  },

  // ==========================================
  // 3. EVOLUTIONARY BIOLOGY & ECOLOGY
  // ==========================================
  {
    id: "natural_selection",
    name: "Natural Selection & Extinction",
    discipline: "Evolutionary Biology",
    category: "Biology & Evolution",
    essence: "Differential survival and reproduction of variants in an environment of scarce resources.",
    social_isomorphism: "Political organizations and corporate structures that refuse to adapt to demographic and technological shifts face institutional extinction.",
    counterinductive_angle: "Saving legacy institutions through bailouts halts evolutionary pruning, accumulating systemic fragility that guarantees catastrophic collapse."
  },
  {
    id: "red_queen_effect",
    name: "The Red Queen Effect",
    discipline: "Evolutionary Biology",
    category: "Biology & Evolution",
    essence: "In a co-evolving ecosystem, a species must continuously run at full speed just to maintain its relative position against evolving competitors.",
    social_isomorphism: "Political campaign spending, military buildup, and algorithmic advertising: each party spends exponentially more merely to maintain a 50-50 deadlock.",
    counterinductive_angle: "Technological escalation in political communication produces zero net voter enlightenment—it is pure Red Queen waste."
  },
  {
    id: "ecosystem_interdependence",
    name: "Ecosystems & Trophic Cascades",
    discipline: "Ecology",
    category: "Biology & Evolution",
    essence: "Complex webs of mutual dependence where removing a single top predator radically alters the entire flora and fauna.",
    social_isomorphism: "Targeted policy interventions (e.g., removing a regulatory rule or criminalizing an informal sector) trigger unforeseen cascades across informal economies.",
    counterinductive_angle: "Isolated social problems do not exist. Any policy that treats a symptom without modeling the whole trophic web triggers severe counter-effects."
  },
  {
    id: "niche_differentiation",
    name: "Niches & Competitive Exclusion",
    discipline: "Ecology",
    category: "Biology & Evolution",
    essence: "Two species competing for the exact same resource cannot coexist stably; one will either differentiate or go extinct.",
    social_isomorphism: "Political parties and media outlets survive by differentiating their ideological niches to monopolize distinct psychological demographics.",
    counterinductive_angle: "Political polarization is an inevitable ecological response to media saturation: moderate overlap causes extinction, forcing radical niche specialization."
  },
  {
    id: "self_preservation",
    name: "Self-Preservation & Homeostasis",
    discipline: "Biology",
    category: "Biology & Evolution",
    essence: "The universal drive of living systems to maintain internal stability and protect their own existence at all costs.",
    social_isomorphism: "Every government agency’s primary unwritten mission is the preservation and expansion of its own budget and staff, regardless of declared goals.",
    counterinductive_angle: "Government programs never die because bureaucratic self-preservation overrides any objective metric of public utility."
  },
  {
    id: "replication_errors",
    name: "Replication & Mutational Drift",
    discipline: "Genetics",
    category: "Biology & Evolution",
    essence: "Faithful reproduction of blueprints, where occasional copying errors provide the raw material for adaptation.",
    social_isomorphism: "Cultural traditions and institutional norms mutate as they are transmitted across generations; deviations are the seeds of institutional innovation.",
    counterinductive_angle: "Orthodox adherence to founding texts guarantees institutional death; mutational errors in policy interpretation are what keep societies adaptable."
  },
  {
    id: "cooperation_reciprocity",
    name: "Cooperation & Tit-for-Tat",
    discipline: "Evolutionary Game Theory",
    category: "Biology & Evolution",
    essence: "Mutual benefit through conditional reciprocity in repeated interactions, paired with punishment of defectors.",
    social_isomorphism: "Rule of law and civil society are game-theoretic equilibria of repeated plays. When social mobility or anonymity destroys repeated interaction, defection explodes.",
    counterinductive_angle: "Civic breakdown is not moral decay; it is the mathematical consequence of shifting from repeated local games to anonymous, one-shot digital interactions."
  },
  {
    id: "hierarchical_organization",
    name: "Hierarchical Organization & Modularity",
    discipline: "Biology / Systems",
    category: "Biology & Evolution",
    essence: "Structuring complex wholes into nested modules to manage information flow and prevent systemic contagion.",
    social_isomorphism: "Federalism and local self-governance act as biological cell walls, preventing an institutional crisis in one state from crashing the entire nation.",
    counterinductive_angle: "National centralization destroys institutional modularity, converting localized policy errors into existential systemic crises."
  },

  // ==========================================
  // 4. SYSTEMS THINKING
  // ==========================================
  {
    id: "feedback_loops",
    name: "Feedback Loops (Balancing & Reinforcing)",
    discipline: "Cybernetics / Systems",
    category: "Systems Thinking",
    essence: "Outputs loop back into inputs. Reinforcing loops cause runaway exponential growth/decay; balancing loops preserve equilibrium.",
    social_isomorphism: "Wealth inequality and political access form a reinforcing loop (money buys policy, policy protects wealth), overpowering democratic balancing feedback.",
    counterinductive_angle: "Unless a policy deliberately breaks the reinforcing wealth-influence circuit, incremental tax reforms are neutralized by systemic adaptation."
  },
  {
    id: "equilibrium_dynamic",
    name: "Dynamic Equilibrium & Hysteresis",
    discipline: "Systems Dynamics",
    category: "Systems Thinking",
    essence: "Equilibrium is not static peace, but continuous opposing forces in tension; history alters future equilibria (hysteresis).",
    social_isomorphism: "Societies do not 'return to normal' after a major trauma (e.g. pandemic, war). The baseline itself shifts permanently.",
    counterinductive_angle: "Efforts to 'restore' pre-crisis civic norms fail because institutional memory has altered the friction coefficients of the system."
  },
  {
    id: "bottlenecks_toc",
    name: "Bottlenecks & The Theory of Constraints",
    discipline: "Operations Research",
    category: "Systems Thinking",
    essence: "A system's throughput is dictated entirely by its single narrowest constraint; optimizing non-bottlenecks yields zero improvement.",
    social_isomorphism: "Throwing billions at public education yields zero gains if the true bottleneck is childhood nutrition or municipal housing instability.",
    counterinductive_angle: "Most social policy spending is wasted optimizing non-binding constraints while leaving the single core bottleneck untouched."
  },
  {
    id: "scale_allometry",
    name: "Scale & Allometric Breakdown",
    discipline: "Complex Systems / Physics",
    category: "Systems Thinking",
    essence: "Systems change qualitatively as they scale quantitatively; a giant insect suffocates because volume outpaces surface area.",
    social_isomorphism: "Direct participatory democracy works brilliantly in a Swiss canton or town hall of 5,000, but degenerates into demagoguery at a scale of 330 million.",
    counterinductive_angle: "National political dysfunction is not ideological; it is the physical impossibility of operating city-state democratic mechanisms at continental scale."
  },
  {
    id: "margin_safety",
    name: "Margin of Safety & Redundancy",
    discipline: "Structural Engineering",
    category: "Systems Thinking",
    essence: "Building buffers and slack into a structure to withstand unpredictable external shocks beyond expected loads.",
    social_isomorphism: "Hyper-efficient 'just-in-time' governance removes administrative slack and fiscal reserves, leaving public health and supply chains brittle.",
    counterinductive_angle: "Institutional efficiency is the enemy of civilizational survival; long-term resilience requires deliberately maintaining seemingly wasteful redundancies."
  },
  {
    id: "churn_turnover",
    name: "Churn & Renewal",
    discipline: "Systems Dynamics",
    category: "Systems Thinking",
    essence: "Continuous replacement of system components to prevent ossification and maintain adaptive vigor.",
    social_isomorphism: "Without healthy turnover in legislative bodies and civil service leadership, institutions become captured by gerontocracies.",
    counterinductive_angle: "A lack of institutional turnover creates an internal cognitive sclerosis that makes sudden, catastrophic collapse inevitable."
  },
  {
    id: "critical_mass_tipping",
    name: "Critical Mass & Phase Shifts",
    discipline: "Nuclear Physics / Systems",
    category: "Systems Thinking",
    essence: "Accumulating small quantitative changes until a threshold is crossed, triggering an explosive, self-sustaining phase transition.",
    social_isomorphism: "Social revolutions and paradigm shifts simmer invisibly for decades, then erupt overnight when the latent tipping point is crossed.",
    counterinductive_angle: "Public opinion appears stable right up to the minute it flips irreversibly; linear polling models are blind to non-linear phase shifts."
  },
  {
    id: "emergence_irreducibility",
    name: "Emergence & Irreducibility",
    discipline: "Complexity Science",
    category: "Systems Thinking",
    essence: "Macro-properties arise from interactions between micro-agents that cannot be predicted by analyzing the agents in isolation ('More is different').",
    social_isomorphism: "Macroeconomic phenomena (inflation, bank runs, panics) are emergent properties of collective psychology, irreducible to individual utility curves.",
    counterinductive_angle: "Micro-foundational economics and individualist sociology are fundamentally incapable of modeling macro-institutional breakdowns."
  },

  // ==========================================
  // 5. MATHEMATICS & NUMERACY
  // ==========================================
  {
    id: "multiply_by_zero",
    name: "Multiply by Zero",
    discipline: "Mathematics",
    category: "Mathematics",
    essence: "No matter how large your numbers are, multiplying by zero reduces everything to zero. A single fatal flaw voids all strengths.",
    social_isomorphism: "A public agency can possess world-class expertise, unlimited funding, and cutting-edge tech; if public trust drops to zero, total efficacy is zero.",
    counterinductive_angle: "Technocratic capacity is not additive. A single breach of perceived integrity multiplies years of institutional competence by zero."
  },
  {
    id: "regression_to_mean",
    name: "Regression to the Mean",
    discipline: "Statistics",
    category: "Mathematics",
    essence: "Extreme outcomes are naturally followed by more typical ones purely due to the dissipation of random chance.",
    social_isomorphism: "Policy interventions instituted after a crisis (e.g. violent crime spike) are falsely credited with the subsequent decline, which was natural regression.",
    counterinductive_angle: "Most heralded policy 'miracles' are statistical illusions created by adopting programs at the absolute apex of a random crisis wave."
  },
  {
    id: "global_local_maxima",
    name: "Global vs. Local Maxima",
    discipline: "Optimization / Topology",
    category: "Mathematics",
    essence: "To reach a much higher peak, you must first be willing to descend through the valley and accept short-term worse performance.",
    social_isomorphism: "Incremental reform traps a welfare or tax system on an inefficient local maximum because real transformation requires temporary disruption.",
    counterinductive_angle: "Gradualism in institutional reform guarantees permanent mediocrity; achieving a superior social contract requires crossing an electoral valley."
  },
  {
    id: "surface_area_exposure",
    name: "Surface Area & Exposure",
    discipline: "Geometry / Physics",
    category: "Mathematics",
    essence: "Greater surface area increases interaction with the environment, boosting both opportunity and vulnerability to external attack.",
    social_isomorphism: "Hyper-connected global cities enjoy immense economic dynamism but possess massive vulnerability to supply shocks and viral transmission.",
    counterinductive_angle: "National resiliency in a hostile century requires strategically minimizing unshielded surface area rather than chasing unbounded integration."
  },

  // ==========================================
  // 6. ECONOMICS & ALLOCATION
  // ==========================================
  {
    id: "creative_destruction",
    name: "Creative Destruction",
    discipline: "Economics (Schumpeter)",
    category: "Economics",
    essence: "Inherent dynamic of capitalism where new innovations relentlessly dismantle and replace obsolete economic and social orders.",
    social_isomorphism: "Technological disruptions do not just replace gadgets; they dismantle the political coalitions and moral conventions of the old economic regime.",
    counterinductive_angle: "Political polarization is the inevitable friction caused by creative destruction wiping out the social basis of the 20th-century middle class."
  },
  {
    id: "greshams_law",
    name: "Gresham's Law",
    discipline: "Monetary Economics",
    category: "Economics",
    essence: "Bad money drives out good money when legal exchange rates force both to circulate at par.",
    social_isomorphism: "In attention economies where inflammatory outrage and nuanced analysis circulate at zero marginal cost, sensationalism drives out rigorous scholarship.",
    counterinductive_angle: "Unregulated public discourse does not produce a 'marketplace of ideas'; it mathematically ensures that degraded outrage drives out deep deliberation."
  },
  {
    id: "speculative_bubbles",
    name: "Speculative Bubbles & Mania",
    discipline: "Behavioral Economics",
    category: "Economics",
    essence: "Asset valuations detach from underlying fundamentals, driven by FOMO, narrative momentum, and self-reinforcing delusion until collapse.",
    social_isomorphism: "Ideological movements and academic fads operate identically to speculative asset bubbles, trading on social capital until consensus punctures.",
    counterinductive_angle: "Academic and philanthropic funding priorities follow speculative bubble cycles that systematically misallocate human intellect."
  },

  // ==========================================
  // 7. ART, DRAMATURGY & NARRATIVE
  // ==========================================
  {
    id: "audience_cocreation",
    name: "The Audience as Co-Creator",
    discipline: "Aesthetics / Literary Theory",
    category: "Art & Narrative",
    essence: "An artwork possesses no static meaning in isolation; meaning is actively co-generated through the subjective interpretation of the observer.",
    social_isomorphism: "A law or public decree has no intrinsic authority; its real-world effect depends on how citizens interpret, resist, or satirize its enforcement.",
    counterinductive_angle: "The state does not govern citizens; the state performs a dramatic script that citizens either validate or heckle into irrelevance."
  },
  {
    id: "genre_conventions",
    name: "Genre Conventions & Violations",
    discipline: "Poetics / Narratology",
    category: "Art & Narrative",
    essence: "Genres establish an unspoken covenant of rules between artist and audience. Breaking the genre breaks the contract, provoking anger.",
    social_isomorphism: "When public health or constitutional courts frame their guidance as 'Pure Science' (objective, infallible) but deliver iterative, political adjustments, the genre violation shatters legitimacy.",
    counterinductive_angle: "Institutional trust collapsed not because of policy error, but because technocrats committed a fatal genre violation by disguising political value judgments as science."
  },
  {
    id: "framing_context",
    name: "Framing & The Camera Angle",
    discipline: "Visual Arts / Cognitive Linguistics",
    category: "Art & Narrative",
    essence: "What is placed inside the frame dictates emotional reaction and meaning; what is left outside ceases to exist for the viewer.",
    social_isomorphism: "Policy debates are won or lost entirely at the framing stage. Defining a problem as 'national security' versus 'public health' totally pre-determines the budget.",
    counterinductive_angle: "Never debate policy solutions within the opponent's frame; victory requires demolishing the frame and repositioning the camera angle."
  },
  {
    id: "plot_crucible",
    name: "The Plot Crucible & Character Arc",
    discipline: "Dramatic Writing",
    category: "Art & Narrative",
    essence: "Characters transform only when trapped in a narrative crucible where their existing coping mechanisms completely fail.",
    social_isomorphism: "Political leaders and nation-states do not undergo fundamental institutional evolution through gradual insight, but through the crucible of unresolvable crises.",
    counterinductive_angle: "Deep institutional evolution is impossible without severe existential crisis; stability breeds character stagnation and systemic fragility."
  },

  // ==========================================
  // 8. MILITARY STRATEGY & WARFARE
  // ==========================================
  {
    id: "asymmetric_warfare",
    name: "Asymmetric Warfare",
    discipline: "Military Strategy",
    category: "Military & Strategy",
    essence: "When a weaker force defeats a conventional power by refusing to engage on its terms, using speed, ambiguity, and disproportionate friction.",
    social_isomorphism: "Insurgent political factions and digital subcultures outmaneuver multi-billion-dollar bureaucratic parties by refusing conventional electoral decorum.",
    counterinductive_angle: "Conventional party infrastructure is a defensive liability; modern political warfare is won by asymmetric insurgencies operating outside party rules."
  },
  {
    id: "two_front_war",
    name: "The Two-Front War Dilemma",
    discipline: "Military History",
    category: "Military & Strategy",
    essence: "Splitting forces across two simultaneous, distinct operational theatres rapidly dilutes resources and guarantees strategic exhaustion.",
    social_isomorphism: "A political movement that simultaneously wages war on economic elites and cultural traditionalists exhausts its political capital and collapses.",
    counterinductive_angle: "Political survival requires ruthlessly avoiding a two-front cultural-economic conflict by forming an asymmetric coalition with one adversary."
  },
  {
    id: "seeing_the_front",
    name: "Seeing the Front Line Personally",
    discipline: "Military Leadership",
    category: "Military & Strategy",
    essence: "Never rely solely on headquarters briefings, polished memos, and aggregated reports; physically inspect the front line to see reality.",
    social_isomorphism: "National policymakers who govern via aggregated statistical dashboards become completely untethered from the lived reality of their citizens.",
    counterinductive_angle: "The crisis of democratic representation is a direct result of leadership relying on abstract dashboard telemetry rather than direct front-line immersion."
  },
  {
    id: "mutually_assured_destruction",
    name: "Mutually Assured Destruction (MAD)",
    discipline: "Strategic Deterrence / Game Theory",
    category: "Military & Strategy",
    essence: "Two adversaries possessing overwhelming second-strike retaliatory capacity make direct conflict suicidal, preserving tense stability.",
    social_isomorphism: "Legislative procedural weapons (the filibuster, government shutdowns) prevent totalitarian dominance because both factions fear retaliation.",
    counterinductive_angle: "Partisan gridlock is not a dysfunction; it is the democratic version of Mutually Assured Destruction preventing either faction from imposing tyranny."
  },

  // ==========================================
  // 9. HUMAN NATURE & COGNITIVE BIASES
  // ==========================================
  {
    id: "bias_from_incentives",
    name: "Bias from Incentives & Reinforcement",
    discipline: "Behavioral Psychology (Munger / Skinner)",
    category: "Human Nature & Judgment",
    essence: "People are extraordinarily responsive to incentives, and subconsciously warp their moral reasoning to align with what pays them.",
    social_isomorphism: "Experts do not consciously lie; their intellectual frameworks subconsciously mutate to justify the policies that fund their research institutions.",
    counterinductive_angle: "Never audit the ideology of an academic department or think tank; audit their funding mechanisms and the ideology explains itself."
  },
  {
    id: "narrative_instinct",
    name: "The Narrative Fallacy & Storytelling Animal",
    discipline: "Cognitive Psychology (Kahneman / Fisher)",
    category: "Human Nature & Judgment",
    essence: "Humans cannot process raw stochastic noise; we compulsively impose a cause-and-effect hero's journey onto random events.",
    social_isomorphism: "Citizens do not vote on economic statistics; they vote for the candidate whose personal biography best mirrors their mythic moral story.",
    counterinductive_angle: "Policy debate conducted in spreadsheets is dead on arrival; political reality is an unceasing clash between competing mythic narratives."
  },
  {
    id: "first_conclusion_bias",
    name: "First-Conclusion Bias & Cognitive Closure",
    discipline: "Psychology (Munger)",
    category: "Human Nature & Judgment",
    essence: "The mind acts like a sperm and egg: when the first idea gets in, the receptor slams shut against all competing ideas.",
    social_isomorphism: "Political crises are framed during the first 48 hours; all subsequent factual discovery is rejected to protect the initial narrative imprint.",
    counterinductive_angle: "Public inquiry commissions are ceremonial theater; the collective social conclusion was locked in on day one by first-conclusion bias."
  },
  {
    id: "survivorship_bias",
    name: "Survivorship Bias & The Silent Grave",
    discipline: "Statistical Psychology",
    category: "Human Nature & Judgment",
    essence: "Judging a strategy by studying only the visible winners while ignoring the massive graveyard of identical failures.",
    social_isomorphism: "Studying only successful democracies or thriving startups leads to catastrophic policy advice, because their failures did the exact same things.",
    counterinductive_angle: "Mainstream political science is poisoned by survivorship bias; studying failed states reveals more about governance than studying Switzerland."
  }
];
