"""
Persona Environment Module.
Implements the interactive deliberation environment:
Pre-Test Baseline (Y_pre) -> Narrative Exposure -> Post-Test Deliberation (Y_post) -> Attitudinal Shift (ΔY).
Grounds psychological resonance in empirical GSS attitudinal priors.
"""

import os
import json
import random
from typing import Dict, Any, Tuple, Optional
from action_space import NarrativeAction, CausalStory, Hero, Villain, Victim, MoralFrame, EvidenceMode, Tone

class PersonaEnvironment:
    """Simulates citizen deliberative responses to narrative policy interventions."""

    def __init__(self, personas_file: Optional[str] = None):
        base_dir = os.path.dirname(os.path.abspath(__file__))
        if personas_file is None:
            personas_file = os.path.join(base_dir, "data", "personas_sample.jsonl")

        self.personas = []
        if os.path.exists(personas_file):
            with open(personas_file, "r", encoding="utf-8") as f:
                for line in f:
                    if line.strip():
                        self.personas.append(json.loads(line.strip()))
        else:
            raise FileNotFoundError(f"Personas file not found: {personas_file}")

    def get_personas_by_archetype(self, archetype_name: str):
        return [p for p in self.personas if p["archetype"] == archetype_name]

    def compute_baseline_stance(self, persona: Dict[str, Any]) -> float:
        """
        Calculates baseline stance on 2-year Data Center Moratorium (1=Strongly Oppose, 7=Strongly Support).
        Derived from GSS empirical survey coordinates.
        """
        priors = persona["attitudinal_priors"]
        demo = persona["demographics"]

        # Base starting anchor: Neutral (4.0)
        score = 4.0

        # Environmental spending prior (1=Too Little -> Pro-Moratorium, 3=Too Much -> Anti-Moratorium)
        env = priors.get("environmental_spending", "")
        if "Too Little" in env:
            score += 1.2
        elif "Too Much" in env:
            score -= 1.0

        # Big business trust (1=Great Deal -> Oppose Moratorium, 3=Hardly Any -> Support Moratorium)
        bus_trust = priors.get("trust_big_business", "")
        if "Hardly Any" in bus_trust:
            score += 0.8
        elif "A Great Deal" in bus_trust:
            score -= 0.9

        # Federal government trust
        fed_trust = priors.get("trust_federal_executive", "")
        if "Hardly Any" in fed_trust:
            score += 0.4  # Skepticism of top-down regional infrastructure

        # Ideology nuance
        ideo = priors.get("ideology", "")
        if "Liberal" in ideo:
            score += 0.5  # Climate/sustainability concern
        elif "Conservative" in ideo:
            # Conservative split: If rural, higher moratorium support; if urban, pro-growth
            if "Rural" in demo.get("community_type", ""):
                score += 0.6
            else:
                score -= 0.5

        # Community type
        comm = demo.get("community_type", "")
        if "Rural" in comm:
            score += 0.7
        elif "Urban" in comm:
            score -= 0.4

        # Clamp to [1.0, 7.0]
        return round(max(1.0, min(7.0, score)), 2)

    def evaluate_narrative_shift(self, persona: Dict[str, Any], action: NarrativeAction, narrative_text: str) -> Tuple[float, float, float, str]:
        """
        Simulates the deliberative shift ΔY = Y_post - Y_pre.
        Returns: (Y_pre, Y_post, ΔY, deliberative_explanation)
        """
        y_pre = self.compute_baseline_stance(persona)
        archetype = persona["archetype"]
        priors = persona["attitudinal_priors"]
        demo = persona["demographics"]

        delta = 0.0
        reasons = []

        # -------------------------------------------------------------
        # 1. Causal Story Resonance (Deborah Stone)
        # -------------------------------------------------------------
        if action.causal_story == CausalStory.INTENTIONAL:
            if "Hardly Any" in priors.get("trust_big_business", "") or archetype in [
                "Educated Progressive Conservationist", "Conservative Conservationist & Ratepayer Skeptic"
            ]:
                delta += 0.8
                reasons.append("Intentional corporate greed framing resonated strongly with distrust of tech monopolies.")
            else:
                delta += 0.2

        elif action.causal_story == CausalStory.MECHANICAL:
            if archetype in ["Vulnerable Working-Class Community Defender", "Conservative Conservationist & Ratepayer Skeptic"]:
                delta += 0.9
                reasons.append("Mechanical utility formula explanation struck a chord regarding unfair electricity rate hikes.")
            else:
                delta += 0.3

        elif action.causal_story == CausalStory.INADVERTENT:
            if "Moderate" in priors.get("ideology", "") or "Independent" in priors.get("party_affiliation", ""):
                delta += 0.7
                reasons.append("Appreciated the balanced inadvertent framing acknowledging well-intentioned school tax promises.")
            else:
                delta += 0.2

        elif action.causal_story == CausalStory.ACCIDENTAL:
            if archetype == "Traditional Pro-Growth Property Conservative":
                delta += 0.4
                reasons.append("Agreed that technological progress is natural, though questioned if moratorium is necessary.")
            else:
                delta -= 0.5
                reasons.append("Backlash: Felt accidental framing absolved massive compute operators from resource accountability.")

        # -------------------------------------------------------------
        # 2. Moral Frame Resonance
        # -------------------------------------------------------------
        if action.moral_frame == MoralFrame.LIBERTY:
            if "Conservative" in priors.get("ideology", "") or "Rural" in demo.get("community_type", ""):
                delta += 0.9
                reasons.append("Strong defense of private property against eminent domain transmission lines hit home.")
            else:
                delta += 0.2

        elif action.moral_frame == MoralFrame.FAIRNESS:
            if archetype in ["Vulnerable Working-Class Community Defender", "Educated Progressive Conservationist"]:
                delta += 0.9
                reasons.append("Fairness argument against corporate tax abatements deeply persuasive.")
            else:
                delta += 0.3

        elif action.moral_frame == MoralFrame.SANCTITY:
            if archetype == "Conservative Conservationist & Ratepayer Skeptic" or "Rural" in demo.get("community_type", ""):
                delta += 1.0
                reasons.append("Preserving rural heritage and clean groundwater struck a deep emotional chord.")
            elif archetype == "Traditional Pro-Growth Property Conservative":
                delta -= 0.2
                reasons.append("Dismissed pastoral romanticism as anti-development NIMBYism.")

        elif action.moral_frame == MoralFrame.HARM_CARE:
            if archetype in ["Educated Progressive Conservationist", "Vulnerable Working-Class Community Defender"]:
                delta += 0.7
                reasons.append("Concern for family health and acoustic vibration was compelling.")

        elif action.moral_frame == MoralFrame.PRAGMATISM:
            if archetype == "Traditional Pro-Growth Property Conservative":
                delta += 0.6
                reasons.append("Fiscal pragmatism resonated with conservative business instincts.")

        # -------------------------------------------------------------
        # 3. Evidence & Tone Resonance
        # -------------------------------------------------------------
        if action.evidence_mode == EvidenceMode.EMPIRICAL_STATS:
            if "Bachelor" in demo.get("education", "") or "Graduate" in demo.get("education", "") or "A Great Deal" in priors.get("trust_science", ""):
                delta += 0.5
                reasons.append("Specific MWh and water consumption data established strong factual credibility.")

        elif action.evidence_mode == EvidenceMode.LIVED_TESTIMONIAL:
            if "Rural" in demo.get("community_type", "") or "High School" in demo.get("education", ""):
                delta += 0.6
                reasons.append("Personal testimonial from neighbor facing well depletion felt authentic and relatable.")

        # Add small stochastic psychological variance
        noise = random.uniform(-0.15, 0.15)
        delta += noise

        # Compute Y_post
        y_post = round(max(1.0, min(7.0, y_pre + delta)), 2)
        realized_delta = round(y_post - y_pre, 2)

        explanation = " | ".join(reasons) if reasons else "Maintained baseline stance with minor updates."
        return y_pre, y_post, realized_delta, explanation


if __name__ == "__main__":
    from action_space import ActionSpace
    from narrative_realizer import NarrativeRealizer

    env = PersonaEnvironment()
    space = ActionSpace()
    realizer = NarrativeRealizer()

    print(f"Loaded {len(env.personas)} sample personas across archetypes.")
    sample_persona = env.personas[0]
    sample_action = space.sample_random()
    text = realizer.realize(sample_action)

    y_pre, y_post, dy, expl = env.evaluate_narrative_shift(sample_persona, sample_action, text)

    print("\nPERSONA PROFILE:")
    print(f"Archetype: {sample_persona['archetype']} (Age {sample_persona['demographics']['age']}, {sample_persona['demographics']['community_type']})")
    print(f"Ideology: {sample_persona['attitudinal_priors']['ideology']} | Trust Big Business: {sample_persona['attitudinal_priors']['trust_big_business']}")
    print("\nINTERVENTION:")
    print(sample_action.summary())
    print(f"\nRESULTS:")
    print(f"Pre-Test Stance:  {y_pre} / 7.0")
    print(f"Post-Test Stance: {y_post} / 7.0")
    print(f"Shift (ΔY):       {dy:+.2f}")
    print(f"Cognitive Shift:  {expl}")
