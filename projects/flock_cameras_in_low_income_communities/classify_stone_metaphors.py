"""
Deborah Stone Metaphor Classifier for Flock Camera Deliberations
Framework: Deborah Stone, Policy Paradox (Chapter 6: "Symbols: Metaphors")

Metaphor Categories:
1. FORCE_MULTIPLIER_TOOL (Pro): Mechanical metaphor; technology as tireless lever, tool in the box, compensating for police shortages.
2. VIRTUAL_MOAT_FORTRESS (Pro): Spatial/defense metaphor; municipality as sanctuary; cameras as invisible wall/fence keeping outside criminals out.
3. SENSORY_ORGANISM (Pro): Organic metaphor; cameras as "extra eyes and ears", impartial sensory extension of the civic body.
4. DIGITAL_DRAGNET (Con): Fishery metaphor; indiscriminate trawling/harvesting of innocent civilian movements.
5. SLIPPERY_SLOPE_WEDGE (Con): Slippery slope metaphor; "camel's nose under the tent", unavoidable descent into ubiquitous surveillance.
6. CORPORATE_PANOPTICON (Con): Feudal/monopoly metaphor; privatized surveillance state, corporate data enclosure, unaccountable vendor lock-in.
7. GUILT_PRESUMPTION (Con): Inversion metaphor; treating entire driving public as presumptive suspects, reversing presumption of innocence.
"""

import re
import pandas as pd
import json
import os

METAPHOR_PATTERNS = {
    "FORCE_MULTIPLIER_TOOL": {
        "stance": "JUSTIFICATION",
        "weight": 2.0,
        "regex": re.compile(
            r'\b(force\s+multiplier|tool\s+in\s+the\s+tool\s*box|another\s+tool|modern\s+policing\s+tool|leverage|doing\s+more\s+with\s+less|staffing\s+shortage|understaffed|officer\s+safety|augment\s+our\s+staff)\b',
            re.IGNORECASE
        ),
        "desc": "Mechanical/Tool Metaphor: Portraying surveillance as a neutral leverage tool multiplying scarce police labor."
    },
    "VIRTUAL_MOAT_FORTRESS": {
        "stance": "JUSTIFICATION",
        "weight": 2.5,
        "regex": re.compile(
            r'\b(virtual\s+(moat|fence|perimeter|shield|gate|wall)|ring\s+around\s+the\s+city|protect\s+our\s+borders?|entering\s+our\s+city|outsiders?\s+coming\s+in|safe\s+haven|gateway|blanket\s+coverage)\b',
            re.IGNORECASE
        ),
        "desc": "Spatial/Fortress Metaphor: The community as an enclosed sanctuary; cameras as an invisible perimeter gate against outsiders."
    },
    "SENSORY_ORGANISM": {
        "stance": "JUSTIFICATION",
        "weight": 2.0,
        "regex": re.compile(
            r'\b(extra\s+(eyes|ears)|eyes\s+and\s+ears|watching\s+over|objective\s+witness|silent\s+partner|never\s+sleeps?|can\'?t\s+be\s+everywhere)\b',
            re.IGNORECASE
        ),
        "desc": "Sensory/Organism Metaphor: Cameras as biological sensory extensions seeing and hearing without human fatigue or bias."
    },
    "DIGITAL_DRAGNET": {
        "stance": "REJECTION",
        "weight": 2.5,
        "regex": re.compile(
            r'\b((digital|surveillance|massive|giant)\s+dragnet|dragnet|vacuuming\s+up|trawling|indiscriminate\s+(tracking|collection|surveillance)|casting\s+a\s+net|sweeping\s+up|harvesting\s+data)\b',
            re.IGNORECASE
        ),
        "desc": "Fishery/Trap Metaphor: Depicting surveillance as an indiscriminate net sweeping up innocent citizens going about daily life."
    },
    "SLIPPERY_SLOPE_WEDGE": {
        "stance": "REJECTION",
        "weight": 2.5,
        "regex": re.compile(
            r'\b(slippery\s+slope|camel\'?s?\s+nose|thin\s+end\s+of\s+the\s+wedge|first\s+step\s+to(ward)?|gateway\s+to|where\s+does\s+it\s+(stop|end)|doorway\s+to|down\s+this\s+path|orwellian|1984|surveillance\s+state)\b',
            re.IGNORECASE
        ),
        "desc": "Slippery Slope Metaphor: Adoption as an irreversible slide toward totalitarian or dystopian control."
    },
    "CORPORATE_PANOPTICON": {
        "stance": "REJECTION",
        "weight": 2.0,
        "regex": re.compile(
            r'\b(privatized\s+surveillance|vendor\s+lock-?in|corporate\s+(monopoly|panopticon)|selling\s+our\s+data|data\s+bazaar|third-?party\s+cloud|for-?profit\s+policing|unaccountable\s+company)\b',
            re.IGNORECASE
        ),
        "desc": "Feudal/Enclosure Metaphor: Outsourcing municipal policing sovereignty to a private tech vendor."
    },
    "GUILT_PRESUMPTION": {
        "stance": "REJECTION",
        "weight": 2.0,
        "regex": re.compile(
            r'\b(guilty\s+until\s+proven\s+innocent|treating\s+(everyone|residents)\s+like\s+suspects|presumption\s+of\s+innocence|constant\s+surveillance|digital\s+checkpoint|checkpoint)\b',
            re.IGNORECASE
        ),
        "desc": "Legal Inversion Metaphor: Reversing the presumption of innocence by treating all mobility as suspicious."
    }
}

SPEAKER_HINTS = {
    "LEO_CHIEF": re.compile(r'\b(chief|captain|lieutenant|sergeant|officer|deputy|sheriff|police\s+department)\b', re.IGNORECASE),
    "COUNCIL_MAYOR": re.compile(r'\b(mayor|councilmember|councilman|councilwoman|commissioner|alder(man|woman))\b', re.IGNORECASE),
    "PUBLIC_RESIDENT": re.compile(r'\b(resident|citizen|taxpayer|neighborhood|public\s+comment|calling\s+in|speaking\s+on\s+behalf)\b', re.IGNORECASE)
}

def classify_snippet(text):
    """Evaluates a snippet text and returns matched metaphors, stance, and speaker clues."""
    detected_metaphors = []
    stance_scores = {"JUSTIFICATION": 0.0, "REJECTION": 0.0}
    
    for category, meta in METAPHOR_PATTERNS.items():
        matches = meta["regex"].findall(text)
        if matches:
            detected_metaphors.append({
                "category": category,
                "stance": meta["stance"],
                "matches": list(set([m[0] if isinstance(m, tuple) else m for m in matches])),
                "desc": meta["desc"]
            })
            stance_scores[meta["stance"]] += meta["weight"] * len(matches)
            
    # Determine dominant stance
    if stance_scores["JUSTIFICATION"] > stance_scores["REJECTION"] and stance_scores["JUSTIFICATION"] >= 2.0:
        overall_stance = "JUSTIFICATION"
    elif stance_scores["REJECTION"] > stance_scores["JUSTIFICATION"] and stance_scores["REJECTION"] >= 2.0:
        overall_stance = "REJECTION"
    elif stance_scores["JUSTIFICATION"] > 0 and stance_scores["REJECTION"] > 0:
        overall_stance = "CONTESTED_DEBATE"
    else:
        overall_stance = "LITERAL_PROCEDURAL"
        
    # Detect potential speaker
    speaker_clues = []
    for spk, rgx in SPEAKER_HINTS.items():
        if rgx.search(text):
            speaker_clues.append(spk)
            
    return {
        "dominant_stance": overall_stance,
        "metaphor_count": len(detected_metaphors),
        "primary_metaphor": detected_metaphors[0]["category"] if detected_metaphors else "NONE",
        "metaphor_details": detected_metaphors,
        "speaker_clues": speaker_clues
    }

def analyze_dataset(input_csv, output_csv):
    if not os.path.exists(input_csv):
        print(f"File not found: {input_csv}")
        return
        
    df = pd.read_csv(input_csv)
    print(f"Classifying {len(df):,} snippets using Deborah Stone's metaphor taxonomy...")
    
    classifications = [classify_snippet(str(row.get('snippet_100_words', ''))) for _, row in df.iterrows()]
    
    df['dominant_stance'] = [c['dominant_stance'] for c in classifications]
    df['primary_metaphor'] = [c['primary_metaphor'] for c in classifications]
    df['metaphor_count'] = [c['metaphor_count'] for c in classifications]
    df['speaker_clues'] = ["; ".join(c['speaker_clues']) for c in classifications]
    df['metaphors_json'] = [json.dumps(c['metaphor_details']) for c in classifications]
    
    df.to_csv(output_csv, index=False)
    print(f"Classification complete! Saved to {output_csv}")
    
    print("\n" + "="*50)
    print("STANCE DISTRIBUTION:")
    print(df['dominant_stance'].value_counts())
    print("\n" + "="*50)
    print("PRIMARY METAPHOR DISTRIBUTION:")
    print(df['primary_metaphor'].value_counts())
    print("="*50)

if __name__ == "__main__":
    base = os.path.dirname(os.path.abspath(__file__))
    in_file = os.path.join(base, "data", "flock_snippets_2025.csv")
    out_file = os.path.join(base, "data", "flock_snippets_stone_coded.csv")
    analyze_dataset(in_file, out_file)
