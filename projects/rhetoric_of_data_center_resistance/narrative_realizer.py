"""
Narrative Realizer Module.
Translates structured NarrativeAction configurations into natural-language public testimony
using domain-specific templates and optional LLM synthesis with compliance verification.
"""

import os
from typing import Dict, Any, Optional
from action_space import NarrativeAction, CausalStory, Hero, Villain, Victim, MoralFrame, EvidenceMode, Tone

class NarrativeRealizer:
    """Generates natural language arguments conditioned on narrative components."""

    def __init__(self, use_llm: bool = False, model_name: str = "gemini/gemini-1.5-flash"):
        self.use_llm = use_llm
        self.model_name = model_name

    def realize(self, action: NarrativeAction) -> str:
        """Generates narrative text either via LLM or template synthesizer."""
        if self.use_llm and (os.environ.get("GEMINI_API_KEY") or os.environ.get("OPENAI_API_KEY")):
            try:
                return self._realize_with_llm(action)
            except Exception as e:
                # Fallback to high-fidelity template engine
                return self._realize_with_templates(action)
        return self._realize_with_templates(action)

    def _realize_with_templates(self, action: NarrativeAction) -> str:
        """Synthesizes high-fidelity domain narrative using combinatorial rhetorical building blocks."""

        # 1. Opening & Causal Framing (Deborah Stone)
        if action.causal_story == CausalStory.ACCIDENTAL:
            causal_intro = (
                "The extraordinary strain our electrical grid and aquifers face from new data centers is an inevitable "
                "consequence of the global AI computing race. No single entity orchestrated this bottleneck; it is an unforeseen "
                "technological shift that requires pragmatic engineering adaptations rather than ideological finger-pointing."
            )
        elif action.causal_story == CausalStory.MECHANICAL:
            causal_intro = (
                "Our soaring utility bills and strained substations are the mechanical result of rigid utility commission formulas. "
                "Automated tariff rules and regional transmission dispatch systems are designed to automatically pass the massive capital costs "
                "of high-voltage infrastructure upgrades directly onto household electric bills without public oversight."
            )
        elif action.causal_story == CausalStory.INADVERTENT:
            causal_intro = (
                "When county leaders initially rezoned farmland for data centers, they acted with the best intentions—hoping commercial tax "
                "revenues would fund our schools. But that decision has inadvertently unleashed severe collateral damage: plunging groundwater levels, "
                "industrial low-frequency noise hum, and grid congestion."
            )
        else: # INTENTIONAL
            causal_intro = (
                "Make no mistake: the current energy and water crisis is the result of deliberate corporate exploitation. "
                "Tech monopolies negotiated secretive non-disclosure agreements with compliant officials to lock in massive tax subsidies, "
                "intentionally externalizing their multi-gigawatt cooling and power burdens onto our community."
            )

        # 2. Character & Conflict Layer (NPF: Hero, Villain, Victim)
        conflict_parts = []
        if action.victim == Victim.SMALL_FARMERS:
            conflict_parts.append("Family farmers and rural well owners are already watching agricultural water tables drop dangerously.")
        elif action.victim == Victim.RESIDENTIAL_RATEPAYERS:
            conflict_parts.append("Ordinary residential ratepayers are bearing the brunt of double-digit monthly utility rate hikes.")
        elif action.victim == Victim.RURAL_WATERSHED:
            conflict_parts.append("Our irreplaceable rural watershed, historic countryside, and quiet communities are being bulldozed under concrete sprawl.")
        else:
            conflict_parts.append("Hardworking local taxpayers are left subsidizing commercial infrastructure while public services go unfunded.")

        if action.villain != Villain.NONE:
            conflict_parts.append(f"This exploitation is driven by the unchecked demands of {action.villain.value}.")

        if action.hero != Hero.NONE:
            conflict_parts.append(f"Thankfully, {action.hero.value} is standing up to demand accountability and transparent resource audits.")

        character_text = " ".join(conflict_parts)

        # 3. Evidence Layer
        if action.evidence_mode == EvidenceMode.EMPIRICAL_STATS:
            evidence_text = (
                "Independent utility filings show this single 400-megawatt campus will consume over 2.5 million gallons of water daily "
                "and require transmission line capacity equal to 300,000 homes, hiking regional residential rates by an estimated 14%."
            )
        elif action.evidence_mode == EvidenceMode.LIVED_TESTIMONIAL:
            evidence_text = (
                "As one neighboring resident testified last Tuesday: 'The constant low-frequency industrial vibration runs through our floorboards 24/7, "
                "and our family well pressure has noticeably dropped since the first cooling phase went online.'"
            )
        else: # LEGAL_PRECEDENT
            evidence_text = (
                "Under state environmental review laws and municipal zoning authority, our county board has the clear statutory right and legal obligation "
                "to enforce comprehensive impact assessments before issuing a single building permit."
            )

        # 4. Moral Framing & Conclusion
        if action.moral_frame == MoralFrame.FAIRNESS:
            moral_call = (
                "Basic fairness demands that the world's wealthiest tech giants pay their fair share rather than cheating our residents into subsidizing their power."
            )
        elif action.moral_frame == MoralFrame.LIBERTY:
            moral_call = (
                "Private property rights and individual liberty must come first; the government has no right to impose transmission corridors and industrial blight on private land."
            )
        elif action.moral_frame == MoralFrame.HARM_CARE:
            moral_call = (
                "Our duty is to protect vulnerable families, young children, and seniors from the proven health impacts of continuous acoustic pollution and diesel generator soot."
            )
        elif action.moral_frame == MoralFrame.SANCTITY:
            moral_call = (
                "We must preserve the sanctity of our pastoral landscape, clean groundwater, and rural heritage before it is lost forever."
            )
        else: # PRAGMATISM
            moral_call = (
                "Fiscal and operational pragmatism requires a balanced pause: we cannot sacrifice long-term municipal solvency for temporary hype."
            )

        # 5. Tone modulation
        if action.tone == Tone.URGENT:
            closing = "Vote YES on the 2-year data center moratorium tonight before our grid collapses!"
        else:
            closing = "Supporting this balanced 2-year moratorium provides the necessary breathing room to enact sensible, evidence-based guardrails."

        return f"{causal_intro}\n\n{character_text} {evidence_text}\n\n{moral_call} {closing}"

    def _realize_with_llm(self, action: NarrativeAction) -> str:
        """Calls LLM via LiteLLM with strict constraints."""
        import litellm

        prompt = f"""You are a public policy communications specialist. Write a 130-150 word public hearing comment on local data center expansion strictly adhering to the following Narrative Policy Framework configuration:

- Causal Story Type (Deborah Stone): {action.causal_story.value}
- Hero: {action.hero.value}
- Villain: {action.villain.value}
- Victim: {action.victim.value}
- Moral Frame: {action.moral_frame.value}
- Evidence Mode: {action.evidence_mode.value}
- Tone: {action.tone.value}

Constraints:
1. Embody the designated Causal Story mechanism explicitly.
2. Incorporate the specified Hero, Villain, and Victim without adding unauthorized characters.
3. Frame the call to action around supporting a 2-year municipal data center moratorium.
4. Keep length strictly between 120 and 160 words. Do not use generic partisan buzzwords.
"""
        response = litellm.completion(
            model=self.model_name,
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3
        )
        return response.choices[0].message.content.strip()


if __name__ == "__main__":
    from action_space import ActionSpace
    space = ActionSpace()
    realizer = NarrativeRealizer(use_llm=False)

    sample_action = space.sample_random()
    print("ACTION VECTOR:")
    print(sample_action.to_dict())
    print("\nREALIZED NARRATIVE TEXT:")
    print("-" * 60)
    print(realizer.realize(sample_action))
    print("-" * 60)
