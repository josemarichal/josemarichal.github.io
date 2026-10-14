/**
 * Pre-computed Exemplar Runs for IdeaScientist-SocSci
 * Enables instant 1-click simulation without needing an immediate API key.
 */

window.IDEASCIENTIST_EXEMPLARS = {
  mokyr_stagnation: {
    id: "mokyr_stagnation",
    title: "The Innovation-Stagnation Paradox (Mokyr's Loop)",
    problem: "Why has exponential technological innovation in computation and AI failed to produce historical increases in median wages, broad living standards, and institutional productivity?",
    domain: "Macro-Economics, Innovation Studies & Economic History",
    paradigm: "Neoclassical Endogenous Growth Theory & Solow Residual Accounting",
    selectedModels: ["thermodynamics_entropy", "friction_viscosity", "red_queen_effect", "second_order_thinking"],
    artifacts: {
      tensions: `### Stage 1: Paradigm Tension Mapper (\`tensions.md\`)

#### 1. The Dominant Paradigm & Its Circularity
The reigning consensus in economic growth theory (Solow, Romer, Aghion) presumes an **endogenous accumulation model**: technological innovation drives total factor productivity (TFP), which monotonically translates into real output, capital deepening, and wage gains after brief adjustment lags.
* **The Circularity:** When productivity stagnates despite rapid patenting and AI breakthroughs, the paradigm tautologically asserts "measurement error" or "implementation lags" (the modern Gordon/Brynjolfsson debate). It refuses to consider that the institutional apparatus of innovation itself may be producing negative net drag.

#### 2. The Rival Theoretical Fault Lines
* **School A: Techno-Pessimism / Depletion of Ideas (Gordon, Bloom et al., 2020)**
  * *Claim:* "Ideas are getting harder to find." Low-hanging fruit has been picked; maintaining historical growth now demands exponentially more researchers and capital, yielding diminishing returns.
* **School B: Institutional Drag & Rent-Extraction Sclerosis (Mokyr 2025, Acemoglu & Johnson)**
  * *Claim:* The production function of discovery has been captured by defensive monopolization, regulatory compliance, and speculative financialization, redirecting technical progress into zero-sum extraction.

#### 3. The Epistemic Impasse
Empirical growth accounting cannot adjudicate this debate because both schools look at the same macroeconomic aggregate (TFP). We need an empirical model that tracks the **internal dissipative energy** of economic institutions rather than gross patent output.`,

      isomorphisms: `### Stage 2: Isomorphic Transducer (\`isomorphisms.md\`)

#### 1. Abstract Dynamical Signature
\`[Accelerating informational input] -> [Exponential growth in internal coordination friction] -> [Kinetic output dissipated as heat] -> [Zero net structural displacement]\`

#### 2. Structural Isomorphisms from the Latticework Vault
* **Thermodynamics: Entropy & Viscosity (Physics)**
  * *Entity Mapping:* Free Energy $\\iff$ Productive Capital/Talent; Entropy $\\iff$ Administrative/Compliance Friction; Shear Stress $\\iff$ Jurisdictional veto points.
  * *Dynamical Law:* In a closed administrative system, every additional layer of technical complexity generates non-linear increases in organizational viscosity, dissipating productive velocity into frictional overhead.
* **The Red Queen Effect (Evolutionary Biology)**
  * *Entity Mapping:* Predator/Prey $\\iff$ Competing corporate R&D & regulatory compliance departments.
  * *Dynamical Law:* Firms and institutions invest billions in frontier AI models not to expand consumer surplus, but to erect defensive moats and navigate legal hurdles against rivals doing the exact same thing. Expenditure explodes while aggregate societal velocity remains static.

#### 3. Synthesized Theoretical Mechanism
**The Thermomechanical Trap of High-Tech Institutions:** As technological systems become hyper-complex, the energy required to coordinate and comply with them scales exponentially ($O(n^2)$), whereas productivity gains scale logarithmically ($O(\\log n)$). Societies reach a state of **hyper-viscosity** where 90% of technical talent is consumed merely sustaining equilibrium against entropy.`,

      counterinduction: `### Stage 3: Feyerabendian Counterinductive Dissident (\`counterinduction.md\`)

#### 1. The Undisputed "Observational Fact"
*"Technological advancement naturally expands economic efficiency and societal capacity."*

#### 2. The Counterinductive Inversion
**PROPOSITION:** *Advanced technological specialization systematically degrades civilizational state capacity and lowers long-run economic resilience by suffocating generalist coordination.*

#### 3. Exposing Theory-Laden Data
Standard national accounting counts all R&D expenditure, patent filings, and software consulting as positive additions to Gross Domestic Product (GDP). 
* **The Measurement Mirage:** An economy spending \$50 billion on patent litigation, defensive AI cybersecurity, and compliance algorithms records this as massive economic "growth," when it is physically identical to spending energy on frictional heat. The metric counts systemic friction as economic output.

#### 4. The Radical Counter-Hypothesis ($H_{\\text{alt}}$)
Across OECD economies from 1990 to 2026, the adoption of complex digital administrative systems caused a **statistically significant net decline in physical infrastructure delivery speed and real median wage gains per dollar of R&D capital**, because internal organizational viscosity outpaced computational acceleration.`,

      stress_test: `### Stage 4: Popperian Stress-Tester (\`stress_test.md\`)

#### 1. Causal DAG & Confounder Audit
* **Treatment ($T$):** Organizational computational complexity / digitial compliance overhead.
* **Outcome ($Y$):** Delivery speed of real infrastructure & median real wage growth.
* **Key Confounders ($Z$):** Demographic aging, globalization/trade shocks, interest rate regimes.
* **Collider Trap:** Conditioning on "firm survival" creates massive survivorship bias, making tech-heavy survivors look artificially productive. We must sample across the full universe of establishment births and deaths.

#### 2. Decisive Falsification Criteria (*Experimentum Crucis*)
If an exogenous shock that forces organizational deregulation and radical simplification (e.g., municipal emergency waivers or sunsetting compliance regimes) results in *no increase or a decrease* in physical capital delivery velocity, the **Thermomechanical Viscosity Hypothesis is decisively refuted**.

#### 3. Identification Strategy
* **Natural Experiment:** Staggered state-level implementation of digital procurement and mandatory algorithmic compliance mandates across US state transport agencies (1998–2024).
* **Instrument:** Pre-existing municipal administrative staffing ratios interacted with broadband rollout timing.`,

      proposal: `# The Thermomechanical Trap: Measuring Organizational Viscosity and the Innovation-Stagnation Paradox

**Principal Investigator:** Computational Social Science & Political Economy Lab  
**Target Program:** National Science Foundation (NSF) Science of Science: Discovery, Communication & Knowledge (SoS:DCK)  
**Methodological Paradigm:** Causal Identification via Staggered Difference-in-Differences & Administrative Log Telemetry  

---

## 1. Executive Summary & The Grand Societal Challenge
Over the past four decades, advanced industrial democracies have experienced an unprecedented paradox: while technological computational capacity has grown by orders of magnitude, real economic productivity growth has slowed, infrastructure construction costs have exploded, and median living standards have stagnated (Mokyr 2025; Draghi 2024). Mainstream economics attributes this to lag effects or measurement error. 

This proposal tests a transformative counter-hypothesis: **advanced technological complexity generates thermodynamic viscosity in administrative structures**, where the energy required to coordinate, audit, and regulate activity scales quadratically, absorbing the productivity gains of frontier discovery.

---

## 2. Theoretical Framework & Formal Hypotheses
Drawing on physical thermodynamics and evolutionary Red Queen dynamics, we model an organization's net productivity as:
$$\\text{Velocity} = \\frac{\\text{Force (Technical Capability)}}{\\text{Viscosity (Coordination & Compliance Shear Stress)}}$$

* **Hypothesis 1 ($H_1$ - Viscosity Overload):** As digital administrative oversight tools are introduced into public and private infrastructure procurement, time-to-completion increases and capital productivity falls, driven by an expansion of intra-firm compliance checks.
* **Hypothesis 2 ($H_2$ - The Red Queen Equilibrium):** Firm-level investment in predictive AI tools is driven by defensive parity against market rivals, producing statistically zero industry-wide consumer surplus while increasing overhead expenditures.
* **Hypothesis 3 ($H_3$ - Inversion Leverage):** Exogenous regulatory simplification shocks (emergency procedural suspensions) produce non-linear increases in physical delivery velocity without degrading safety metrics.

---

## 3. Empirical Identification Strategy & Data Architecture
We exploit a multi-decade staggered policy rollout across all 50 U.S. State Departments of Transportation (DOTs) that adopted digital algorithmic procurement and automated environmental review management systems between 2002 and 2022.

### Estimating Specification:
$$Y_{ist} = \\alpha_i + \\lambda_t + \\beta \\text{DigitalCompliance}_{it} + \\mathbf{X}'_{ist}\\gamma + \\varepsilon_{ist}$$
Where:
* $Y_{ist}$ is the days-to-completion per lane-mile of public highway project $s$ in state $i$ at year $t$.
* $\\text{DigitalCompliance}_{it}$ is the staggered adoption of centralized algorithmic compliance management.
* $\\mathbf{X}'_{ist}$ controls for terrain ruggedness, labor costs, material input indices, and project scope.

---

## 4. Decisive Falsification Thresholds
This study pre-commits to the following falsification bounds:
* If $\\beta \\le 0$ with $p < 0.05$ (meaning digital compliance tools decreased project duration or costs), the **Thermomechanical Viscosity Hypothesis is fully refuted**.
* If the ratio of compliance labor to project engineers remains flat across treated cohorts, the Red Queen mechanism is rejected.

---

## 5. Expected Value of Information (EVOI)
If confirmed, this project shifts the global policy paradigm from subsidizing raw R&D input to **systematic institutional decantation**—reforming the administrative production function of democratic states so that 21st-century technology can once again translate into human progress.`
    }
  },

  democratic_backsliding: {
    id: "democratic_backsliding",
    title: "The Networked Legitimacy Paradox (Political Science)",
    problem: "Why do open, frictionless digital communication networks accelerate affective polarization and institutional decay rather than deliberative democratic consensus?",
    domain: "Political Communication, Democratic Institutions & Computational Politics",
    paradigm: "Habermasian Deliberative Democracy & The Information-Deficit Model",
    selectedModels: ["genre_conventions", "multiply_by_zero", "asymmetric_warfare", "greshams_law"],
    artifacts: {
      tensions: `### Stage 1: Paradigm Tension Mapper (\`tensions.md\`)

#### 1. The Dominant Paradigm
The liberal democratic model posits that information scarcity is the primary barrier to informed citizenship. Reducing communication friction should create a vibrant "marketplace of ideas" where truth prevails through deliberation.
* **The Circularity:** When digital openness produces demagoguery, the mainstream paradigm diagnoses "misinformation" and "foreign interference," recommending more fact-checking and automated content curation—doubling down on the exact information-filtering paradigm that triggered the revolt.

#### 2. The Rival Theoretical Fault Lines
* **School A: Algorithmic Radicalization (Zuboff, Vosoughi et al.)**
  * *Claim:* Profit-maximizing recommender systems optimize for moral outrage, trapping citizens in psychological echo chambers.
* **School B: Institutional Representation Failure (Mair, Streeck, Turchin)**
  * *Claim:* Parties abandoned working-class economic representation decades ago; the internet simply stripped away the illusion of elite consensus, exposing raw institutional illegitimacy.`,

      isomorphisms: `### Stage 2: Isomorphic Transducer (\`isomorphisms.md\`)

#### 1. Abstract Dynamical Signature
\`[High formal legitimacy] \\times [Single discrete integrity breach] = [Zero effective authority] ; [Frictionless dissemination of counterfeit signals driving out costly authentic deliberation]\`

#### 2. Structural Isomorphisms
* **Dramaturgy: Genre Conventions & Violations (Art & Poetics)**
  * *Mapping:* Constitutional Government $\\iff$ Heroic Drama / Sacred Covenant; Technocratic Guidance $\\iff$ Procedural Script.
  * *Law:* When political institutions market themselves as "Neutral Technocratic Arbiters" (Genre: Scientific Truth) but govern via political bargaining and pragmatic reversals (Genre: Satirical Farce), the genre violation shatters audience suspension of disbelief.
* **Mathematics: Multiply by Zero**
  * *Mapping:* Institutional authority is strictly multiplicative: $\\text{Authority} = \\text{Competence} \\times \\text{Resources} \\times \\text{Perceived Sincerity}$. If perceived sincerity hits zero, authority is instantly zero.
* **Economics: Gresham's Law**
  * *Mapping:* Cheap, low-cognition outrage drives out high-cost, nuanced deliberation when both circulate at zero marginal distribution cost.`,

      counterinductive: `### Stage 3: Feyerabendian Counterinductive Dissident (\`counterinduction.md\`)

#### 1. The Undisputed "Observational Fact"
*"Affective polarization is driven by political ignorance, echo chambers, and exposure to online misinformation."*

#### 2. The Counterinductive Inversion
**PROPOSITION:** *Political polarization is driven by high political information and transparency. Ignorance and communication friction are the essential lubricants of democratic stability.*

#### 3. Exposing Theory-Laden Data
Surveys measuring "democratic norms support" equate trust in incumbent institutions with support for democracy. Dissent from technocratic consensus is categorized by researchers as "democratic backsliding," automatically baking the conclusion into the metric.`,

      stress_test: `### Stage 4: Popperian Stress-Tester (\`stress_test.md\`)

#### 1. Causal DAG & Threats
* Exogenous variation in broadband access is heavily confounded by urban density and economic restructuring.
* We must isolate idiosyncratic technical delays in broadband subsidy auctions or fiber-optic backbone terrain topography.

#### 2. Decisive Falsification
If citizens exposed to radical institutional transparency (unfiltered live committee deliberations, unredacted transcripts) exhibit *increased* trust in legislative compromise, the **Genre Violation Hypothesis is refuted**.`,

      proposal: `# The Genre of Governance: Dramaturgical Violation and the Collapse of Democratic Authority

**Principal Investigator:** Democracy & Computational Epistemology Initiative  
**Target Program:** National Science Foundation (NSF) Accountable Institutions and Behavior (AIB)  
**Methodological Paradigm:** Field Experiments with Algorithmic Information Feeds & Natural Language Stance Auditing  

---

## 1. Executive Summary & The Grand Challenge
Why has universal access to political information destabilized liberal democracy? This research demonstrates that the collapse of institutional legitimacy is not driven by misinformation, but by a catastrophic **dramaturgical genre violation**: digital transparency exposed that modern democratic institutions were performing a sacred script of deliberative consensus while operating as cynical bargaining machines.

---

## 2. Hypotheses & Isomorphic Mechanics
* **$H_1$ (The Multiply-by-Zero Effect):** Exposure to official public communications that conceal pragmatic political trade-offs beneath moralistic assertions causes an irreversible step-function drop in institutional compliance.
* **$H_2$ (Gresham's Law of Civic Discourse):** Algorithmic reduction of communication friction systematically favors hyperbolic moral framing over evidentiary reasoning regardless of user ideology.

---

## 3. Empirical Design & Identification
A multi-site randomized field experiment measuring civic engagement and institutional trust across 12,000 participants exposed to alternative framing genres of local municipal governance over a 12-month period.`
    }
  },

  institutional_trust: {
    id: "institutional_trust",
    title: "The Technocratic Transparency Paradox (Public Policy)",
    problem: "Why do standard transparency initiatives and audit disclosures paradoxically deepen citizen cynicism and institutional delegitimization?",
    domain: "Public Administration, Sociology of Organizations & Policy Evaluation",
    paradigm: "Principal-Agent Theory & Open Government Transparency Frameworks",
    selectedModels: ["hanlons_razor", "critical_mass_tipping", "inversion", "seeing_the_front"],
    artifacts: {
      tensions: `### Stage 1: Paradigm Tension Mapper (\`tensions.md\`)

#### 1. The Dominant Paradigm
Principal-Agent theory in economics and public administration argues that informational asymmetry between citizens (principals) and bureaucrats (agents) breeds corruption and cynicism. The prescribed cure is absolute transparency: disclosure portals, FOIA expansions, and open data dashboards.
* **The Circularity:** When transparency initiatives correlate with cratering institutional trust, proponents argue that institutions are simply "not transparent enough" or that citizens suffer from "cynicism bias," endlessly prescribing the medicine that causes the symptom.

#### 2. Rival Theoretical Fault Lines
* **School A: Sunshine Governance (Brandeis, Hood, Fung)**
  * *Claim:* Sunshine is the best disinfectant. Exposure disciplines agents, aligns incentives, and ultimately produces accountable equilibrium.
* **School B: Surveillance Sclerosis & Cynicism Feedback (O'Neill, Strathern, Power)**
  * *Claim:* Public auditing incentivizes defensive record-keeping, paralyzes administrative initiative, and produces millions of trivial "anomalies" that weaponize partisan outrage.`,

      isomorphisms: `### Stage 2: Isomorphic Transducer (\`isomorphisms.md\`)

#### 1. Abstract Dynamical Signature
\`[Inversion of Goal] -> [Low-signal noise flood interpreted through Malice Prior] -> [Critical Mass Tipping into Defection]\`

#### 2. Structural Isomorphisms
* **Human Nature: Hanlon's Razor (Psychology)**
  * *Law:* When complex bureaucratic processes are exposed without context, the public violates Hanlon's razor: ordinary administrative friction and human incompetence are overwhelmingly interpreted as deliberate elite malice.
* **Military Strategy: Seeing the Front Line Personally**
  * *Mapping:* Citizens don't experience government through statistical dashboards; they experience it at the DMV, the passport office, and the broken transit stop. When dashboards claim 98% efficiency while the physical front line is crumbling, transparency is decoded as gaslighting.
* **Systems: Inversion (Strategy)**
  * *Inversion Question:* How would an adversary design an information portal to ensure maximum public demoralization and cynicism? Answer: Publish 500,000 pages of uncontextualized raw receipts, red tape rules, and procedural audit footnotes.`,

      counterinductive: `### Stage 3: Feyerabendian Counterinductive Dissident (\`counterinduction.md\`)

#### 1. The Undisputed "Observational Fact"
*"Institutional legitimacy is positively reinforced by proactive procedural transparency."*

#### 2. The Counterinductive Inversion
**PROPOSITION:** *Democratic authority requires institutional opacity and administrative discretion. Transparency is a tool for ritualized public paranoia that paralyzes proactive governance.*

#### 3. Exposing Theory-Laden Data
Trust metrics in political science survey questionnaires ask: *"Do you trust government to do what is right?"* This question is theory-laden because it assumes trust is a general moral evaluation rather than a transactional assessment of whether the bus arrives on time.`,

      stress_test: `### Stage 4: Popperian Stress-Tester (\`stress_test.md\`)

#### 1. Causal DAG
* *Instrument:* Staggered municipal compliance with state-mandated digital transparency and open expenditure portals (2010–2022).
* *Exogeneity Threat:* Cities with higher fiscal distress might be forced into early transparency agreements. We control for pre-treatment municipal bond yields and tax revenue trends.

#### 2. Falsification Criterion
If municipalities that mandate open line-item expenditure portals experience an *increase* in bond ratings, citizen satisfaction surveys, and civil service recruitment, the **Surveillance Sclerosis Hypothesis is decisively refuted**.`,

      proposal: `# The Transparency Trap: Surveillance Sclerosis, Hanlon's Inversion, and the Delegitimization of the State

**Principal Investigator:** Administrative Ethics & Public Accountability Group  
**Target Program:** National Science Foundation (NSF) Decision, Risk and Management Sciences (DRMS)  
**Methodological Paradigm:** Regression Discontinuity Design (RDD) on Municipal Disclosure Population Thresholds  

---

## 1. Executive Summary
This proposal investigates the unintended consequences of radical government transparency. By tracking municipal performance and civic sentiment across towns subjected to mandatory open-expenditure laws, we demonstrate that raw informational disclosure overwhelms citizen cognitive bandwidth, activates malignant interpretations of banal administrative errors, and drives talented civil servants out of public service.`
    }
  }
};
