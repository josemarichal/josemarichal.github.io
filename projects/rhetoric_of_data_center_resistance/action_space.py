"""
Action Space definition for the Narrative Policy Framework (NPF) and Deborah Stone's Causal Stories.
Formalizes narrative components into discrete combinatorial vectors for RL / GFlowNet exploration.
"""

from enum import Enum
from dataclasses import dataclass, asdict
from typing import List, Dict, Any, Optional
import itertools
import random

class CausalStory(str, Enum):
    ACCIDENTAL = "Accidental"      # Macro-technological inevitability; nobody to blame; adaptive engineering needed
    MECHANICAL = "Mechanical"      # Rigid utility algorithms & dispatch formulas mechanically shift costs to residents
    INADVERTENT = "Inadvertent"    # Good intentions (tax base for schools) led to unforeseen resource & noise drain
    INTENTIONAL = "Intentional"    # Big Tech & private utilities deliberately externalized costs via secret NDAs

class Hero(str, Enum):
    LOCAL_ENGINEER = "Local Utility Engineer"
    CIVIC_ORGANIZER = "Grassroots Civic Organizer"
    COUNTY_COMMISSIONER = "Bipartisan County Commissioner"
    INDEPENDENT_AUDITOR = "Independent Environmental Auditor"
    NONE = "No Hero (Issue-Focused)"

class Villain(str, Enum):
    BIG_TECH_MONOPOLY = "Silicon Valley Tech Giant"
    INVESTOR_OWNED_UTILITY = "Monopoly Power Utility"
    SPECULATIVE_DEVELOPER = "Out-of-State Real Estate Speculator"
    REGULATORY_BUREAUCRACY = "Captured State Utility Commission"
    NONE = "No Villain (Systemic Focus)"

class Victim(str, Enum):
    SMALL_FARMERS = "Small Family Farmers & Well Owners"
    RESIDENTIAL_RATEPAYERS = "Residential Electricity Ratepayers"
    RURAL_WATERSHED = "Historic Rural Watershed & Farmland"
    LOCAL_TAXPAYERS = "Local Taxpayers & Municipal Services"

class MoralFrame(str, Enum):
    FAIRNESS = "Fairness & Anti-Cheating"       # Tech consumes 30% of power but avoids proportional tax burden
    LIBERTY = "Liberty & Private Property"      # Eminent domain for transmission lines tramples landowner rights
    HARM_CARE = "Harm Prevention & Health"      # Protecting families from 24/7 noise hum and diesel emissions
    SANCTITY = "Sanctity of Rural Heritage"     # Preserving pastoral countryside from industrial sprawl
    PRAGMATISM = "Economic Pragmatism"          # Protecting the municipal balance sheet and grid stability

class EvidenceMode(str, Enum):
    EMPIRICAL_STATS = "Empirical Metrics"       # Specific figures: megawatts, acre-feet of water, % rate hikes
    LIVED_TESTIMONIAL = "Lived Testimonial"     # First-person story from an impacted neighbor or farmer
    LEGAL_PRECEDENT = "Legal & Precedent"       # County zoning code, CEQA rules, municipal authority

class Tone(str, Enum):
    DELIBERATIVE = "Deliberative & Measured"
    URGENT = "Urgent & Mobilizing"


@dataclass(frozen=True)
class NarrativeAction:
    causal_story: CausalStory
    hero: Hero
    villain: Villain
    victim: Victim
    moral_frame: MoralFrame
    evidence_mode: EvidenceMode
    tone: Tone

    def to_dict(self) -> Dict[str, str]:
        return {
            "causal_story": self.causal_story.value,
            "hero": self.hero.value,
            "villain": self.villain.value,
            "victim": self.victim.value,
            "moral_frame": self.moral_frame.value,
            "evidence_mode": self.evidence_mode.value,
            "tone": self.tone.value
        }

    def to_tuple(self) -> tuple:
        return (
            self.causal_story.value,
            self.hero.value,
            self.villain.value,
            self.victim.value,
            self.moral_frame.value,
            self.evidence_mode.value,
            self.tone.value
        )

    def summary(self) -> str:
        return f"[{self.causal_story.value}] Frame:{self.moral_frame.value} | Hero:{self.hero.value} | Villain:{self.villain.value} | Victim:{self.victim.value}"


class ActionSpace:
    """Manages the combinatorial space of narrative configurations."""

    def __init__(self):
        self.causal_stories = list(CausalStory)
        self.heroes = list(Hero)
        self.villains = list(Villain)
        self.victims = list(Victim)
        self.moral_frames = list(MoralFrame)
        self.evidence_modes = list(EvidenceMode)
        self.tones = list(Tone)

    @property
    def total_combinations(self) -> int:
        return (
            len(self.causal_stories) *
            len(self.heroes) *
            len(self.villains) *
            len(self.victims) *
            len(self.moral_frames) *
            len(self.evidence_modes) *
            len(self.tones)
        )

    def sample_random(self) -> NarrativeAction:
        return NarrativeAction(
            causal_story=random.choice(self.causal_stories),
            hero=random.choice(self.heroes),
            villain=random.choice(self.villains),
            victim=random.choice(self.victims),
            moral_frame=random.choice(self.moral_frames),
            evidence_mode=random.choice(self.evidence_modes),
            tone=random.choice(self.tones)
        )

    def get_all_actions(self) -> List[NarrativeAction]:
        actions = []
        for c, h, v, k, m, e, t in itertools.product(
            self.causal_stories, self.heroes, self.villains, 
            self.victims, self.moral_frames, self.evidence_modes, self.tones
        ):
            actions.append(NarrativeAction(c, h, v, k, m, e, t))
        return actions


if __name__ == "__main__":
    space = ActionSpace()
    print(f"Total combinatorial narrative action space size: {space.total_combinations:,} configurations")
    sample = space.sample_random()
    print("Sample Narrative Action:")
    print(sample.to_dict())
