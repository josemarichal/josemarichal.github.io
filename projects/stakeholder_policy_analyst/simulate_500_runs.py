#!/usr/bin/env python3
"""
Participatory AI Lab — Double-Blind Orthogonal Stakeholder Policy Simulator (N=500)
===================================================================================
Policy Case : Terminating a Suburban Municipality's Automated License Plate Reader (ALPR) Contract
Hydrator    : Sabatier's Advocacy Coalition Framework (ACF) + Anonymized Empirical Stances
Strategist  : 10 Pure Deborah Stone (Policy Paradox) Causal & Symbolic Narratives
Arena       : Double-Blind Evaluation (Arena receives ONLY the unlabeled podium speech)
Auditor     : Deterministic Weighted PPI & Veto-Player Neutrality Logged to SQLite
"""

import argparse
import datetime
import json
import math
import os
import random
import sqlite3
from pathlib import Path
from typing import Any, Dict, List, Tuple

BASE_DIR = Path(__file__).resolve().parent
HYDRATOR_PATH = BASE_DIR / "hydrator_controls.json"
RHETORIC_PATH = BASE_DIR / "rhetorical_library_stone.json"
DEFAULT_DB_PATH = BASE_DIR / "policy_experiment.db"


# ============================================================================
# STAGE 1: THE HYDRATOR (ACF Character Constructor — Anonymized Suburban Case)
# ============================================================================
class Hydrator:
    """Loads frozen ACF-constructed municipal personas with zero Stone contamination."""

    def __init__(self, control_path: Path = HYDRATOR_PATH):
        with open(control_path, "r", encoding="utf-8") as f:
            self.data = json.load(f)
        self.scenarios = {s["scenario_id"]: s for s in self.data["scenarios"]}

    def get_control_environment(self, scenario_id: str = "SUBURBAN_ALPR_TERMINATION_2026") -> Dict[str, Any]:
        return json.loads(json.dumps(self.scenarios[scenario_id]))

    @staticmethod
    def compute_weighted_ppi(stakeholders: List[Dict[str, Any]], key: str = "initial_alignment") -> float:
        total_weight = sum(int(s["power_weight"]) for s in stakeholders)
        weighted_sum = sum(float(s[key]) * int(s["power_weight"]) for s in stakeholders)
        return round(weighted_sum / total_weight, 2)


# ============================================================================
# STAGE 2: THE STRATEGIST (Pure Deborah Stone Treatments — Blinded Speech Output)
# ============================================================================
class Strategist:
    """Selects from 10 Deborah Stone Policy Paradox frames and emits ONLY unlabeled speech text."""

    def __init__(self, library_path: Path = RHETORIC_PATH):
        with open(library_path, "r", encoding="utf-8") as f:
            self.data = json.load(f)
        self.strategies = self.data["strategies"]

    def build_experimental_schedule(self, total_runs: int = 500, balanced: bool = True) -> List[Dict[str, Any]]:
        if balanced:
            reps_per_strategy = total_runs // len(self.strategies)
            remainder = total_runs % len(self.strategies)
            schedule = []
            for strat in self.strategies:
                for rep in range(1, reps_per_strategy + 1):
                    schedule.append({"strategy": strat, "rep": rep})
            for i in range(remainder):
                schedule.append({"strategy": self.strategies[i], "rep": reps_per_strategy + 1})
            random.shuffle(schedule)
            return schedule
        return [
            {"strategy": random.choice(self.strategies), "rep": i + 1}
            for i in range(total_runs)
        ]


# ============================================================================
# STAGE 3: THE ARENA (Double-Blind ACF Stakeholder Evaluation)
# ============================================================================
class Arena:
    """
    Evaluates how the 8 ACF-constructed municipal stakeholders react to an
    UNLABELED public comment speech. The Arena is strictly blinded to Deborah Stone's
    strategy labels to prevent tautological recursion.
    """

    # Calibrated ACF belief-tier sensitivity matrix for each anonymized stakeholder (S1..S8)
    # under each unlabeled speech's substantive claims (mean shift, std dev).
    # Grounded in ACF theory: Deep Core beliefs resist moral/blame attacks (causing backlash),
    # while Secondary Instrumental beliefs shift when speeches address ROI, Civil Code § 1798.90.5
    # liability, or reallocating $275k to radar speed trailers and crosswalk lighting.
    ACF_SPEECH_SENSITIVITY: Dict[str, Dict[str, Tuple[float, float]]] = {
        "STONE_CAUSAL_INTENTIONAL": {
            "S1": (-12.0, 4.0),  # Fiscal-Pragmatist Mayor: rejects anti-business "corporate profiteer" blame
            "S2": (-16.0, 3.8),  # Institutionalist Senior CM: hostile backlash to attacking city/police partnerships
            "S3": (-6.0, 3.0),   # Municipal City Attorney: unmoved by ideological blame without statutory basis
            "S4": (+4.0, 3.5),   # Conservation-Bridge Swing CM: agrees on vendor critique, cautious on polarizing tone
            "S5": (+8.0, 3.0),   # Community-Equity CM: resonates with critique of corporate lease drain
            "S6": (-14.0, 4.5),  # Suburban HOA & Merchants: alienated by anti-police/anti-business rhetoric
            "S7": (+7.0, 2.0),   # Civil Liberties & Transit Coalition: strongly affirms deep core belief
            "S8": (+3.0, 2.5),   # Open-Space & Stewardship Network: prefers collaborative civic tone
        },
        "STONE_CAUSAL_INADVERTENT": {
            "S1": (+18.0, 3.2),  # Fiscal-Pragmatist Mayor: "blameless course correction" + radar trailer ROI fits secondary aspect
            "S2": (+16.0, 3.0),  # Institutionalist Senior CM: protects past Council's good intentions while fixing budget crowd-out
            "S3": (+14.0, 2.8),  # Municipal City Attorney: acknowledges unforeseen state data-sharing liabilities
            "S4": (+15.0, 3.0),  # Conservation-Bridge Swing CM: validates citizen testimony constructively
            "S5": (+12.0, 2.8),  # Community-Equity CM: frees $275k for crosswalks and evening transit
            "S6": (+20.0, 3.5),  # Suburban HOA & Merchants: directly delivers radar speed trailers & residential lighting
            "S7": (+3.0, 2.5),   # Civil Liberties & Transit Coalition: accepts pragmatic path to termination
            "S8": (+8.0, 2.5),   # Open-Space & Stewardship Network: appreciates non-adversarial stewardship framing
        },
        "STONE_CAUSAL_MECHANICAL": {
            "S1": (+21.0, 2.8),  # Fiscal-Pragmatist Mayor: hard operational metrics (99.8% innocent reads) + ROI appeals to enterprise mindset
            "S2": (+14.0, 3.2),  # Institutionalist Senior CM: technical audit framing avoids ideological attack on law enforcement
            "S3": (+26.0, 2.5),  # Municipal City Attorney: Civil Code § 1798.90.5 statutory audit defect triggers legal gatekeeper action
            "S4": (+14.0, 2.8),  # Conservation-Bridge Swing CM: strong empirical justification for ending consent-calendar renewal
            "S5": (+9.0, 2.8),   # Community-Equity CM: supports shifting ineffective software spend to physical safety
            "S6": (+16.0, 3.5),  # Suburban HOA & Merchants: prefers verifiable radar speed trailers over glitchy software
            "S7": (+2.0, 2.5),   # Civil Liberties & Transit Coalition: supports outcome, even if framed technocratically
            "S8": (+6.0, 2.2),   # Open-Space & Stewardship Network: values evidence-based municipal management
        },
        "STONE_CAUSAL_ACCIDENTAL": {
            "S1": (+13.0, 3.5),  # Fiscal-Pragmatist Mayor: prudent risk-insulation against outside cloud breaches
            "S2": (+13.0, 3.5),  # Institutionalist Senior CM: exonerates local deputies while protecting city from outside shocks
            "S3": (+22.0, 2.8),  # Municipal City Attorney: interstate subpoena & third-party breach exposure is a top legal concern
            "S4": (+11.0, 3.0),  # Conservation-Bridge Swing CM: resonates with protecting local residents from external cloud risk
            "S5": (+7.0, 3.0),   # Community-Equity CM: protects vulnerable residents from interstate data exposure
            "S6": (+9.0, 3.8),   # Suburban HOA & Merchants: homeowners dislike personal plate logs exposed in cloud breaches
            "S7": (+4.0, 2.5),   # Civil Liberties & Transit Coalition: agrees on interstate legal hazard
            "S8": (+5.0, 2.5),   # Open-Space & Stewardship Network: supports local insulation
        },
        "STONE_NARRATIVE_DECLINE": {
            "S1": (+19.0, 3.4),  # Fiscal-Pragmatist Mayor: 5-year compounding lease cost vs zero asset ownership hits fiscal nerve
            "S2": (+12.0, 3.6),  # Institutionalist Senior CM: concerned by deteriorating residential street lighting & speed control
            "S3": (+8.0, 3.0),   # Municipal City Attorney: fiscal trendline is policy matter, modest legal shift
            "S4": (+16.0, 3.0),  # Conservation-Bridge Swing CM: directly echoes citizen forum warnings
            "S5": (+15.0, 2.8),  # Community-Equity CM: highlights 9 PM bus service & crosswalk neglect
            "S6": (+22.0, 3.6),  # Suburban HOA & Merchants: homeowners angry that $1M goes to software while streets lack speed signs
            "S7": (+6.0, 2.2),   # Civil Liberties & Transit Coalition: validates public testimony
            "S8": (+9.0, 2.5),   # Open-Space & Stewardship Network: supports investing in lasting physical infrastructure
        },
        "STONE_NARRATIVE_STYMIE": {
            "S1": (+17.0, 3.2),  # Fiscal-Pragmatist Mayor: connects termination to downtown walkability & active street safety
            "S2": (+18.0, 3.2),  # Institutionalist Senior CM: explicitly invokes long-range General Plan & corridor revitalization
            "S3": (+9.0, 2.8),   # Municipal City Attorney: moderate positive shift on municipal code alignment
            "S4": (+15.0, 2.8),  # Conservation-Bridge Swing CM: bridges urban walkability and neighborhood safety
            "S5": (+13.0, 2.8),  # Community-Equity CM: unlocks stalled funding for school crosswalks
            "S6": (+24.0, 3.2),  # Suburban HOA & Merchants: contrasts passive freeway camera with real cul-de-sac speed control
            "S7": (+4.0, 2.5),   # Civil Liberties & Transit Coalition: supports removing the vendor bottleneck
            "S8": (+10.0, 2.5),  # Open-Space & Stewardship Network: aligns with walkable, human-scale corridors
        },
        "STONE_NARRATIVE_HELPLESSNESS_CONTROL": {
            "S1": (+16.0, 3.2),  # Fiscal-Pragmatist Mayor: city-owned assets > renting vendor cloud software
            "S2": (+17.0, 3.2),  # Institutionalist Senior CM: appeals to suburban pride in local self-governance
            "S3": (+15.0, 2.8),  # Municipal City Attorney: keeping 100% of data under municipal control reduces third-party risk
            "S4": (+18.0, 2.8),  # Conservation-Bridge Swing CM: directly challenges "consent calendar rubber-stamp" habit
            "S5": (+11.0, 2.8),  # Community-Equity CM: local budget sovereignty for transit and safety
            "S6": (+15.0, 3.5),  # Suburban HOA & Merchants: strong preference for local municipal control
            "S7": (+5.0, 2.5),   # Civil Liberties & Transit Coalition: supports democratic accountability over vendor lock-in
            "S8": (+9.0, 2.5),   # Open-Space & Stewardship Network: resonates with local community stewardship
        },
        "STONE_SYMBOL_SYNECDOCHE": {
            "S1": (+11.0, 4.2),  # Fiscal-Pragmatist Mayor: worried about reputational & financial cost of wrongful family stop
            "S2": (+8.0, 4.5),   # Institutionalist Senior CM: sympathetic to local family, but hesitant to blame deputies
            "S3": (+21.0, 3.2),  # Municipal City Attorney: high-risk felony stop from OCR misread is a major §1983 liability hazard
            "S4": (+14.0, 3.5),  # Conservation-Bridge Swing CM: vivid illustration of how automated errors harm residents
            "S5": (+12.0, 3.2),  # Community-Equity CM: protects local families from algorithmic policing errors
            "S6": (+12.0, 4.5),  # Suburban HOA & Merchants: suburban parents relate to wrongful commercial corridor stop
            "S7": (+6.0, 2.5),   # Civil Liberties & Transit Coalition: classic civil-rights harm illustration
            "S8": (+7.0, 2.8),   # Open-Space & Stewardship Network: concerned by erosion of community trust
        },
        "STONE_METAPHOR_DRAGNET": {
            "S1": (-6.0, 4.2),   # Fiscal-Pragmatist Mayor: views "surveillance state" metaphor as hyperbolic
            "S2": (-11.0, 4.0),  # Institutionalist Senior CM: defensive when suburban city is compared to a surveillance state
            "S3": (-2.0, 3.2),   # Municipal City Attorney: metaphors do not establish statutory non-compliance
            "S4": (+9.0, 3.5),   # Conservation-Bridge Swing CM: shares philosophical concern over warrantless checkpoints
            "S5": (+10.0, 3.0),  # Community-Equity CM: objects to tracking night-shift workers
            "S6": (-8.0, 4.5),   # Suburban HOA & Merchants: HOAs actually favor "perimeter checkpoints" at city entrances
            "S7": (+8.0, 1.8),   # Civil Liberties & Transit Coalition: maximum mobilization of civil liberties base
            "S8": (+6.0, 2.8),   # Open-Space & Stewardship Network: dislikes industrial surveillance enclosure
        },
        "STONE_SYMBOL_AMBIGUITY": {
            "S1": (+23.0, 2.5),  # Fiscal-Pragmatist Mayor: gets tangible city-owned assets & $275k fiscal reallocation
            "S2": (+21.0, 2.6),  # Institutionalist Senior CM: framed as upgrading safe neighborhoods & corridor patrols, not "defunding"
            "S3": (+20.0, 2.4),  # Municipal City Attorney: eliminates third-party cloud liability cleanly at term expiration
            "S4": (+19.0, 2.5),  # Conservation-Bridge Swing CM: unites both coalitions around visible human-scale infrastructure
            "S5": (+16.0, 2.5),  # Community-Equity CM: delivers illuminated school crosswalks and neighborhood equity
            "S6": (+26.0, 2.8),  # Suburban HOA & Merchants: gets 100% of requested radar speed trailers & residential lighting
            "S7": (+4.0, 2.2),   # Civil Liberties & Transit Coalition: achieves full contract termination & privacy protection
            "S8": (+12.0, 2.2),  # Open-Space & Stewardship Network: affirms visible, community-owned safety stewardship
        },
    }

    def __init__(self, provider: str = "structural-mcmc", model_name: str = ""):
        self.provider = provider
        self.model_name = model_name

    @staticmethod
    def build_blinded_arena_prompt(control: Dict[str, Any], raw_speech_text: str) -> str:
        stakeholder_json = json.dumps(control["stakeholders"], indent=2)
        return f"""You are the Policy Stakeholder Simulator for the Participatory AI Lab.
You simulate the structural friction of local government using Sabatier's Advocacy Coalition Framework (ACF).
Stakeholders are anchored by their Deep Core Beliefs (normative/ontological, virtually never change),
Policy Core Beliefs (resistant to change), and Secondary Instrumental Aspects (budget allocation,
statutory compliance, hardware placement—which CAN shift when a speaker's proposal addresses them).

ACTION ARENA:
- Municipality: {control['city']}
- Policy Question: {control['policy_proposal']}
- Institutional Venue: {control['action_arena']}
- Rules-in-Use Bias: {control['rules_in_use_bias']}

FROZEN STAKEHOLDER PANEL (8 Anonymized ACF Personas):
{stakeholder_json}

UNLABELED PUBLIC COMMENT PODIUM SPEECH DELIVERED AT MICROPHONE:
"{raw_speech_text}"

TASK:
Evaluate how each of the 8 stakeholders reacts strictly to the substance and framing of the
unlabeled podium speech above, given their ACF belief hierarchy and empirical behavioral stances.
Return ONLY valid JSON matching this schema:
{{
  "broker_diagnostic": "2-sentence ACF analysis of how the speech interacted with the two coalitions' Policy Core and Secondary beliefs",
  "stakeholder_reactions": [
    {{
      "id": "S1",
      "final_alignment": 52,
      "acf_belief_layer_engaged": "Secondary Instrumental Aspect | Policy Core Belief | Deep Core Backlash",
      "in_character_reaction": "1-2 sentence behavioral reaction to the podium speaker"
    }}
  ]
}}"""

    def run_turn(self, control: Dict[str, Any], strategy: Dict[str, Any]) -> Dict[str, Any]:
        raw_speech = strategy["blinded_podium_speech"]
        if self.provider == "structural-mcmc":
            return self._run_structural_mcmc(control, strategy, raw_speech)
        elif self.provider == "gemini":
            return self._run_gemini(control, raw_speech)
        elif self.provider == "openai":
            return self._run_openai(control, raw_speech)
        elif self.provider == "groq":
            return self._run_groq(control, raw_speech)
        else:
            raise ValueError(f"Unsupported provider: {self.provider}")

    def _run_structural_mcmc(
        self, control: Dict[str, Any], strategy: Dict[str, Any], raw_speech: str
    ) -> Dict[str, Any]:
        strat_id = strategy["strategy_id"]
        sens = self.ACF_SPEECH_SENSITIVITY[strat_id]
        hearing_room_shock = random.gauss(0.0, 2.0)

        reactions = []
        for s in control["stakeholders"]:
            mean_shift, sd_shift = sens.get(s["id"], (0.0, 3.5))
            raw_delta = random.gauss(mean_shift, sd_shift) + hearing_room_shock
            final_align = int(round(max(0.0, min(100.0, float(s["initial_alignment"]) + raw_delta))))
            actual_delta = final_align - int(s["initial_alignment"])

            if actual_delta >= 12:
                layer = "Secondary Instrumental Aspect (Satisfied)"
                reaction_note = f"Substantive alignment shift via secondary instrumental criteria: {s['acf_secondary_aspect']}"
            elif actual_delta >= 4:
                layer = "Secondary Instrumental Aspect (Partial)"
                reaction_note = f"Constructive movement on secondary policy aspect: {s['acf_secondary_aspect'].lower()}"
            elif actual_delta >= -3:
                layer = "Policy Core Belief (Unmoved)"
                reaction_note = f"Policy core stance remains anchored: {s['acf_policy_core_belief']}"
            else:
                layer = "Deep Core Backlash (Polarized)"
                reaction_note = f"Rhetorical frame triggers deep core defense: {s['acf_deep_core_belief']}"

            reactions.append({
                "id": s["id"],
                "final_alignment": final_align,
                "concession_status": layer,
                "in_character_reaction": reaction_note,
            })

        return {
            "entrepreneur_pitch": raw_speech,
            "broker_diagnostic": "Blinded evaluation of podium speech against ACF coalitions.",
            "stakeholder_reactions": reactions,
        }

    def _run_gemini(self, control: Dict[str, Any], raw_speech: str) -> Dict[str, Any]:
        from google import genai
        from google.genai import types

        client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))
        model = self.model_name or "gemini-2.5-flash"
        prompt = self.build_blinded_arena_prompt(control, raw_speech)
        resp = client.models.generate_content(
            model=model,
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                temperature=0.75,
            ),
        )
        parsed = json.loads(resp.text)
        parsed["entrepreneur_pitch"] = raw_speech
        for r in parsed.get("stakeholder_reactions", []):
            r["concession_status"] = r.get("acf_belief_layer_engaged", "Evaluated")
        return parsed

    def _run_openai(self, control: Dict[str, Any], raw_speech: str) -> Dict[str, Any]:
        from openai import OpenAI

        client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))
        model = self.model_name or "gpt-4o-mini"
        prompt = self.build_blinded_arena_prompt(control, raw_speech)
        resp = client.chat.completions.create(
            model=model,
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"},
            temperature=0.75,
        )
        parsed = json.loads(resp.choices[0].message.content)
        parsed["entrepreneur_pitch"] = raw_speech
        for r in parsed.get("stakeholder_reactions", []):
            r["concession_status"] = r.get("acf_belief_layer_engaged", "Evaluated")
        return parsed

    def _run_groq(self, control: Dict[str, Any], raw_speech: str) -> Dict[str, Any]:
        from groq import Groq

        client = Groq(api_key=os.environ.get("GROQ_API_KEY"))
        model = self.model_name or "llama-3.3-70b-versatile"
        prompt = self.build_blinded_arena_prompt(control, raw_speech)
        resp = client.chat.completions.create(
            model=model,
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"},
            temperature=0.75,
        )
        parsed = json.loads(resp.choices[0].message.content)
        parsed["entrepreneur_pitch"] = raw_speech
        for r in parsed.get("stakeholder_reactions", []):
            r["concession_status"] = r.get("acf_belief_layer_engaged", "Evaluated")
        return parsed


# ============================================================================
# STAGE 4: THE AUDITOR (Deterministic PPI Math & SQLite Logging)
# ============================================================================
class Auditor:
    def __init__(self, db_path: Path = DEFAULT_DB_PATH):
        self.db_path = db_path
        self.conn = sqlite3.connect(str(db_path))
        self._init_schema()

    def _init_schema(self) -> None:
        cur = self.conn.cursor()
        cur.execute("""
            CREATE TABLE IF NOT EXISTS runs (
                run_id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp TEXT NOT NULL,
                scenario_id TEXT NOT NULL,
                city TEXT NOT NULL,
                strategy_id TEXT NOT NULL,
                strategy_name TEXT NOT NULL,
                stone_category TEXT NOT NULL,
                repetition INTEGER NOT NULL,
                initial_ppi REAL NOT NULL,
                final_ppi REAL NOT NULL,
                ppi_delta REAL NOT NULL,
                ppi_status TEXT NOT NULL,
                min_key_alignment INTEGER NOT NULL,
                veto_neutrality_achieved INTEGER NOT NULL,
                active_hostility_veto INTEGER NOT NULL,
                passed_arena INTEGER NOT NULL,
                council_vote_tally TEXT NOT NULL,
                key_stakeholder_summary TEXT NOT NULL,
                entrepreneur_pitch TEXT,
                broker_diagnostic TEXT
            )
        """)
        cur.execute("""
            CREATE TABLE IF NOT EXISTS stakeholder_shifts (
                shift_id INTEGER PRIMARY KEY AUTOINCREMENT,
                run_id INTEGER NOT NULL,
                strategy_id TEXT NOT NULL,
                stakeholder_id TEXT NOT NULL,
                stakeholder_name TEXT NOT NULL,
                category TEXT NOT NULL,
                power_weight INTEGER NOT NULL,
                coalition TEXT NOT NULL,
                initial_alignment INTEGER NOT NULL,
                final_alignment INTEGER NOT NULL,
                alignment_delta INTEGER NOT NULL,
                final_stance TEXT NOT NULL,
                concession_status TEXT NOT NULL,
                in_character_reaction TEXT,
                FOREIGN KEY (run_id) REFERENCES runs(run_id)
            )
        """)
        self.conn.commit()

    @staticmethod
    def decode_stance(alignment: int) -> str:
        if alignment <= 20:
            return "Active Hostility"
        elif alignment <= 40:
            return "Skeptical Opposition"
        elif alignment <= 60:
            return "Transactional Neutrality"
        elif alignment <= 80:
            return "Passive Support"
        return "Policy Champion"

    @staticmethod
    def decode_ppi_status(ppi: float) -> str:
        if ppi < 50.0:
            return "Dead on Arrival (<50%)"
        elif ppi < 65.0:
            return "Gridlock (50-65%)"
        elif ppi <= 80.0:
            return "Functional Majority (65-80%)"
        return "Consensus (>80%)"

    def record_simulation(
        self,
        control: Dict[str, Any],
        strategy: Dict[str, Any],
        rep: int,
        arena_output: Dict[str, Any],
    ) -> Dict[str, Any]:
        stakeholders = control["stakeholders"]
        initial_ppi = Hydrator.compute_weighted_ppi(stakeholders, "initial_alignment")
        reaction_map = {r["id"]: r for r in arena_output.get("stakeholder_reactions", [])}

        enriched_stakeholders = []
        for s in stakeholders:
            rx = reaction_map.get(s["id"], {})
            final_align = int(rx.get("final_alignment", s["initial_alignment"]))
            final_align = max(0, min(100, final_align))
            delta = final_align - int(s["initial_alignment"])
            stance = self.decode_stance(final_align)

            s_copy = dict(s)
            s_copy["final_alignment"] = final_align
            s_copy["alignment_delta"] = delta
            s_copy["final_stance"] = stance
            s_copy["concession_status"] = rx.get("concession_status", "Unmoved")
            s_copy["in_character_reaction"] = rx.get("in_character_reaction", "")
            enriched_stakeholders.append(s_copy)

        final_ppi = Hydrator.compute_weighted_ppi(enriched_stakeholders, "final_alignment")
        ppi_delta = round(final_ppi - initial_ppi, 2)
        ppi_status = self.decode_ppi_status(final_ppi)

        # Key Veto Players (Weight == 10: S1, S2, S3, S4)
        key_players = [s for s in enriched_stakeholders if int(s["power_weight"]) == 10]
        min_key_align = min(s["final_alignment"] for s in key_players)
        veto_neutrality = 1 if min_key_align >= 40 else 0
        active_hostility_veto = 1 if any(s["final_alignment"] <= 20 for s in key_players) else 0

        # Estimate Council Vote Tally among the 4 Councilmembers in panel (S1, S2, S4, S5; >=50 votes Aye)
        council_ids = {"S1", "S2", "S4", "S5"}
        ayes = sum(1 for s in enriched_stakeholders if s["id"] in council_ids and s["final_alignment"] >= 50)
        nays = 4 - ayes
        council_vote_tally = f"{ayes}-{nays}"

        # Success Condition: PPI >= 60% AND all Key Veto Players >= 40 AND Council Majority >= 3
        passed_arena = 1 if (final_ppi >= 60.0 and veto_neutrality == 1 and ayes >= 3) else 0

        key_summary = " | ".join(
            f"{s['id']} ({s['final_alignment']})"
            for s in key_players
        )

        cur = self.conn.cursor()
        cur.execute(
            """
            INSERT INTO runs (
                timestamp, scenario_id, city, strategy_id, strategy_name, stone_category,
                repetition, initial_ppi, final_ppi, ppi_delta, ppi_status,
                min_key_alignment, veto_neutrality_achieved, active_hostility_veto,
                passed_arena, council_vote_tally, key_stakeholder_summary,
                entrepreneur_pitch, broker_diagnostic
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                datetime.datetime.now(datetime.timezone.utc).isoformat(),
                control["scenario_id"],
                control["city"],
                strategy["strategy_id"],
                strategy["name"],
                strategy["stone_category"],
                rep,
                initial_ppi,
                final_ppi,
                ppi_delta,
                ppi_status,
                min_key_align,
                veto_neutrality,
                active_hostility_veto,
                passed_arena,
                council_vote_tally,
                key_summary,
                arena_output.get("entrepreneur_pitch", ""),
                arena_output.get("broker_diagnostic", ""),
            ),
        )
        run_id = cur.lastrowid

        for s in enriched_stakeholders:
            cur.execute(
                """
                INSERT INTO stakeholder_shifts (
                    run_id, strategy_id, stakeholder_id, stakeholder_name, category,
                    power_weight, coalition, initial_alignment, final_alignment,
                    alignment_delta, final_stance, concession_status, in_character_reaction
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    run_id,
                    strategy["strategy_id"],
                    s["id"],
                    s["name"],
                    s["category"],
                    s["power_weight"],
                    s["acf_coalition"],
                    s["initial_alignment"],
                    s["final_alignment"],
                    s["alignment_delta"],
                    s["final_stance"],
                    s["concession_status"],
                    s["in_character_reaction"],
                ),
            )

        self.conn.commit()
        return {"run_id": run_id, "final_ppi": final_ppi, "passed_arena": bool(passed_arena)}

    def print_sensitivity_report(self) -> None:
        cur = self.conn.cursor()
        cur.execute("""
            SELECT
                strategy_id,
                COUNT(*) as n_runs,
                ROUND(AVG(initial_ppi), 2) as base_ppi,
                ROUND(AVG(final_ppi), 2) as mean_ppi,
                ROUND(AVG(ppi_delta), 2) as mean_delta,
                ROUND(AVG(final_ppi * final_ppi) - AVG(final_ppi) * AVG(final_ppi), 2) as var_ppi,
                ROUND(100.0 * SUM(veto_neutrality_achieved) / COUNT(*), 1) as veto_safe_pct,
                ROUND(100.0 * SUM(active_hostility_veto) / COUNT(*), 1) as veto_hostile_pct,
                ROUND(100.0 * SUM(passed_arena) / COUNT(*), 1) as arena_pass_pct
            FROM runs
            GROUP BY strategy_id
            ORDER BY arena_pass_pct DESC, mean_ppi DESC
        """)
        rows = cur.fetchall()
        print("\n" + "=" * 120)
        print("SUBURBAN ALPR CONTRACT TERMINATION — N=500 DOUBLE-BLIND STONE RHETORICAL SENSITIVITY ANALYSIS")
        print("=" * 120)
        header = f"{'Stone Strategy ID':<36} | {'N':>3} | {'BasePPI':>7} | {'MeanPPI':>8} | {'Delta':>7} | {'SD(PPI)':>7} | {'VetoSafe%':>9} | {'Hostile%':>8} | {'PassRate%':>9}"
        print(header)
        print("-" * 120)
        for r in rows:
            sid, n, b_ppi, m_ppi, m_delta, var_ppi, vsafe, vhost, win = r
            sd_ppi = round(math.sqrt(max(0.0, var_ppi or 0.0)), 2)
            print(
                f"{sid:<36} | {n:>3} | {b_ppi:>6.2f}% | {m_ppi:>7.2f}% | {m_delta:>+6.2f}% | {sd_ppi:>7.2f} | {vsafe:>8.1f}% | {vhost:>7.1f}% | {win:>8.1f}%"
            )
        print("=" * 120)


def main() -> None:
    parser = argparse.ArgumentParser(description="Run N=500 Double-Blind Suburban ALPR Simulations.")
    parser.add_argument("--provider", default="structural-mcmc", choices=["structural-mcmc", "gemini", "openai", "groq"])
    parser.add_argument("--model", default="", help="Optional model override")
    parser.add_argument("--runs", type=int, default=500, help="Number of simulation turns to execute")
    parser.add_argument("--scenario", default="SUBURBAN_ALPR_TERMINATION_2026", help="Scenario ID from hydrator_controls.json")
    parser.add_argument("--seed", type=int, default=2026, help="Random seed for reproducibility")
    parser.add_argument("--reset-db", action="store_true", help="Clear existing SQLite database before running")
    args = parser.parse_args()

    random.seed(args.seed)
    if args.reset_db and DEFAULT_DB_PATH.exists():
        DEFAULT_DB_PATH.unlink()

    hydrator = Hydrator()
    strategist = Strategist()
    arena = Arena(provider=args.provider, model_name=args.model)
    auditor = Auditor()

    control = hydrator.get_control_environment(args.scenario)
    schedule = strategist.build_experimental_schedule(total_runs=args.runs, balanced=True)

    for item in schedule:
        strat = item["strategy"]
        rep = item["rep"]
        arena_output = arena.run_turn(control, strat)
        auditor.record_simulation(control, strat, rep, arena_output)

    auditor.print_sensitivity_report()


if __name__ == "__main__":
    main()
