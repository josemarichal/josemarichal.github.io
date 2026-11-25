"""
Deborah Stone Causal Story Classifier for Data Center City Council Transcripts & Hearing Records
Framework: Deborah Stone (1989), "Causal Stories and the Formation of Policy Agendas",
           Political Science Quarterly 104(2): 281-300; Policy Paradox (Ch. 8: Causes).

Classifies each council hearing transcript snippet and municipal hearing record into:
1. INTENTIONAL  (Purposeful action, intended/known consequences: NDAs, secrecy, lobbyists, corporate exploitation, tax giveaways, eminent domain, blindsiding residents)
2. INADVERTENT  (Purposeful action, unintended consequences: outdated zoning codes, unplanned spillover, farmland loss, conditional use permits, pausing to draft rules/guardrails)
3. MECHANICAL   (Unguided/technical system, predictable systemic consequences: grid load MW, utility tariff formulas, aquifer drawdown, infrasound/acoustic hum, backup generators)
4. ACCIDENTAL   (Unguided/exogenous forces: drought, desert/climate constraints, or framing AI boom as an inevitable wave/force of nature)
5. DOES_NOT_FIT (Does not fit Stone's 4 causal stories: sub-classified into Procedural/Parliamentary, Pro-Development/Problem-Denial, or Neutral Scope/Turnout)
"""

import os
import re
import json
import pandas as pd

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.abspath(os.path.join(BASE_DIR, "..", ".."))
DATA_DIR = os.path.join(BASE_DIR, "data")

TRANSCRIPTS_CSV = os.path.join(DATA_DIR, "council_transcript_snippets.csv")
MORATORIUMS_CSV = os.path.join(ROOT_DIR, "data_center_moratoriums.csv")

OUT_COMBINED_CSV = os.path.join(DATA_DIR, "data_center_stone_causal_stories.csv")
OUT_COMBINED_JSONL = os.path.join(DATA_DIR, "data_center_stone_causal_stories.jsonl")
OUT_SUMMARY_JSON = os.path.join(DATA_DIR, "stone_causal_stories_summary.json")

STONE_CAUSAL_PATTERNS = {
    "INTENTIONAL": {
        "label": "Intentional Causal Story",
        "stone_cell": "Purposeful Action / Guided Consequences",
        "weight": 2.4,
        "regex": re.compile(
            r'\b(non-?disclosure|ndas?|nda-?shrouded|secret(ive|ly|s|cy)?|behind\s+closed\s+doors|'
            r'lack\s+of\s+transparency|transparency\s+concerns?|no\s+transparency|blindsided|'
            r'shell\s+compan(y|ies)|hidden|conceal(ed|ing)?|'
            r'tax\s+(abatements?|breaks?|giveaways?|incentives?|subsidies|exemptions?)|'
            r'corporate\s+(greed|welfare|profits?)|profiteer(ing)?|exploit(ing|ation)?|extractive|abusive|'
            r'sacrifice\s+zone|threatened\s+(a\s+)?(lawsuit|legal\s+action|recall)|recall\s+(campaign|notices?|effort)|'
            r'legal\s+battle|sued|suing|lawsuits?|forced|forcibly|eminent\s+domain|'
            r'land\s+grab|pushed\s+through|railroaded|bad\s+faith|big\s+tech|billionaires?|'
            r'lobbyists?|work\s+for\s+us,\s+not|private\s+profit|surveillance|environmental\s+justice|'
            r'ousted\s+(three\s+)?incumbents|ownership\s+concerns|threat\s+to\s+(our\s+)?community|'
            r'putting\s+the\s+burden|sold\s+the\s+same\s+story|promises?\s+of\s+jobs|'
            r'few\s+permanent\s+jobs|limited\s+job\s+creation|don\'?t\s+create\s+(many\s+)?jobs|'
            r'more\s+efficient\s+murders|accountability|unaccountable)\b',
            re.IGNORECASE
        ),
        "rationale_template": "Attributes harm to willful, knowing actions by developers, utilities, lobbyists, or officials (e.g., NDAs, tax giveaways, eminent domain, extractive profit-seeking, or bypassing public scrutiny)."
    },
    "INADVERTENT": {
        "label": "Inadvertent Causal Story",
        "stone_cell": "Purposeful Action / Unguided Consequences",
        "weight": 2.0,
        "regex": re.compile(
            r'\b(unintended|inadvertent(ly)?|unforeseen|unprepared|caught\s+off\s+guard|'
            r'knew\s+what\s+a\s+data\s+center\s+was|master\s+plan|comprehensive\s+plan|'
            r'no\s+(existing\s+)?(dc\s+|data\s+center\s+)?(zoning|definitions?|classifications?|ordinance|standards?|regulations?)|'
            r'not\s+defined\s+in\s+(the\s+)?(city\s+|land\s+use\s+|zoning\s+)?code|'
            r'lacks?\s+(dc\s+|data\s+center\s+)?(provisions|definitions|regulations|standards)|'
            r'lacked\s+(dc\s+)?provisions|ordinance\s+from\s+19\d\d|outdated\s+(zoning|ordinance|code)|'
            r'update\s+(county\s+|city\s+|our\s+)?(development|zoning|land\s+use)\s*(codes?|ordinances?|regulations?)?|'
            r'by-?right|permitted\s+use|conditional\s+use(\s+permits?)?|special\s+(use|exception)(\s+permits?)?|'
            r'overlay\s+district|industrial\s+(zone|zoning|district)|m-?[12]\s+district|agricultural\s+(zone|zoning|rezoning|land)|'
            r'rezon(e|ing)\s+(request|application|moratorium|process)|'
            r'guard\s*rails|environmental\s+impact\s+stud(y|ies)|task\s+force|'
            r'time\s+to\s+(study|develop|draft|craft|evaluate|review|assess|complete|figure\s+out|look\s+into)|'
            r'need(s)?\s+(more\s+)?time|pauses?\s+to\s+(set\s+rules|study|evaluate|review)|'
            r'draft(ing)?\s+(code\s+amendments|permanent\s+ordinance|regulations|definitions|ordinance|standards|rules)|'
            r'zoning\s+(review|study|standards|update|amendments?|ordinance|regulations|moratorium|rules|code|classification)|'
            r'comprehensive\s+(review|zoning\s+rules|due\s+diligence)|'
            r'preemptive(ly)?|proactive(ly)?|farmland(\s+loss|\s+preservation)?|'
            r'rural\s+(character|land\s+use)|property\s+values?|residential\s+(area|neighborhood|setback|proximity)|'
            r'too\s+close\s+to|within\s+\d+\s*(ft|feet)|adjacent\s+to\s+(homes|residential| neighborhoods)|'
            r'eyesore|encroach(ment|ing)|setbacks?|buffer\s*(zones?)?|land\s+use\s+(study|standards|code|impacts|regulations)|'
            r'assess\s+zoning|revisit\s+zoning|craft\s+regulations|establish\s+(data\s+center\s+)?(guidelines|regulations|standards))\b',
            re.IGNORECASE
        ),
        "rationale_template": "Frames the problem as an unintended side effect of outdated zoning codes or permissive land-use rules that never anticipated hyperscale facilities, requiring a regulatory pause, guardrails, or buffer standards."
    },
    "MECHANICAL": {
        "label": "Mechanical Causal Story",
        "stone_cell": "Unguided System / Predictable Technical Consequences",
        "weight": 2.1,
        "regex": re.compile(
            r'\b(grid\s+(strain|stability|capacity|reliability|overload|load|infrastructure|failure)|'
            r'power\s+(grid|strain|load|consumption|demand|availability|supply|costs?|plants?|intensive|generation|usage|outages?)|'
            r'backup\s+(power|generators?)|diesel\s+generators?|on-?site\s+power|power\s+lines?|'
            r'availability\s+of\s+(the\s+)?power|cost\s+of\s+(the\s+)?power|'
            r'electric(al|ity)?\s+(strain|capacity|demand|costs?|bills?|rates?|tariffs?|infrastructure|grid|supply|load|usage|consumption)|'
            r'energy\s+(consumption|demand|use|usage|load|strain|costs?|grid|impacts?|capacity|intensive)|'
            r'utility\s+(rates?|cost\s+recovery|infrastructure|capacity|strain|tariffs?|concerns?|bills?|grid)|'
            r'rate\s+(class|changes|hikes?|increases?|studies|structures?)|ratepayers?|substations?|transmission(\s+lines?)?|'
            r'megawatts?|\d+\s*mw|\d+(\.\d+)?\s*gw|gigawatts?|petabytes?|kilowatt|'
            r'(water|energy|electricity|power|noise)\s+(and|or)\s+(power|water|electricity|energy|infrastructure|noise)|'
            r'grid,\s*water|water,\s*(energy|electricity|power|noise)|'
            r'cooling\s+(water|systems?|towers?|demand|loops?)|evaporative\s+cooling|closed-?loop|chillers?|'
            r'millions?\s+of\s+gallons|billions?\s+of\s+gallons|gallons\s+(per\s+day|of\s+water|a\s+day)|acre-?feet|'
            r'aquifer(\s+depletion|\s+drawdown)?|groundwater|water\s+table|'
            r'water\s+(supply|strain|use|usage|consumption|pressure|availability|withdrawal|demand|resiliency|pollution|impacts?|resources?|master\s+plans?|concerns?|capacity|infrastructure|shortage|rates?)|'
            r'amount\s+of\s+(water|power|electricity|energy)|how\s+much\s+(water|power|electricity|energy)|'
            r'large\s+quantity\s+water\s+users|well\s+(contamination|failure|owners?|drawdown|water)|private\s+wells?|'
            r'wastewater|sewer(\s+master\s+plans?|\s+capacity|\s+infrastructure)?|'
            r'air\s+(permits?|pollution|quality|emissions?)|carbon\s+emissions?|'
            r'noise\s+(pollution|impacts?|ordinance|hum|levels?|concerns?|study)|'
            r'constant\s+hum|low-?frequency|infrasound|decibels?|\d+\s*db|deafening\s+noise|acoustic|'
            r'light\s+pollution|construction\s+dust|capacity\s+degradation)\b',
            re.IGNORECASE
        ),
        "rationale_template": "Focuses on deterministic engineering, electrical grid load, utility tariff mechanics, cooling water drawdown, or acoustic/generator physics."
    },
    "ACCIDENTAL": {
        "label": "Accidental Causal Story",
        "stone_cell": "Unguided Action / Exogenous or Uncontrollable Forces",
        "weight": 1.9,
        "regex": re.compile(
            r'\b(drought|arid(\s+climate)?|in\s+a\s+desert|desert\s+climate|water\s+scarcity|flash\s+flooding|'
            r'natural\s+(disaster|resource\s+and\s+climate\s+impacts)|extreme\s+weather|climate\s+change|'
            r'act\s+of\s+(god|nature)|unavoidable|unstoppable|inevitable|wave\s+of\s+data\s+center|'
            r'restriction\s+wave|data\s+center\s+boom|boomtown|tsunami|rapid\s+growth|explosion\s+of\s+ai|'
            r'sweeping\s+through|flood\s+of\s+applications|ai\s+(revolution|race))\b',
            re.IGNORECASE
        ),
        "rationale_template": "Frames strain around exogenous environmental/climatic conditions (e.g., regional drought, desert aridity) or portrays the AI data center surge as an external macro-wave."
    }
}

PROCEDURAL_CUE_REGEX = re.compile(
    r'\b(motion\s+(to|passes|carries)|there\'?s\s+a\s+motion|second\s+(the\s+)?motion|all\s+(those\s+)?in\s+favor|'
    r'take\s+the\s+roll|roll\s+call|signify\s+by\s+saying|aye\s+aye|first\s+reading|second\s+reading|'
    r'third\s+reading|public\s+hearing\s+is\s+now\s+(open|closed)|agenda\s+item|consent\s+calendar|'
    r'move\s+to\s+approve|call\s+to\s+order|pledge\s+of\s+allegiance|clerk\s+will\s+read|'
    r'next\s+speaker|three\s+minutes|your\s+time\s+is\s+up|state\s+your\s+name)\b',
    re.IGNORECASE
)

PRO_DEVELOPMENT_REGEX = re.compile(
    r'\b(nice\s+quiet\s+neighbors|awesome\s+idea|fantastic\s+use\s+of\s+that\s+property|'
    r'excellent\s+economic\s+opportunity|saw\s+an\s+opportunity\s+here\s+to\s+support|'
    r'generating\s+significant\s+tax|support\s+public\s+services|'
    r'construction\s+jobs\s+and\s+the\s+opportunities|building\s+construction\s+trades|'
    r'economic\s+development\s+opportunity|drive\s+local\s+and\s+national\s+budgets|'
    r'tax\s+revenue\s+is\s+another\s+big\s+factor|local\s+union\s+represents|'
    r'great\s+opportunity\s+for\s+our\s+(city|county|community)|bring\s+good\s+paying\s+jobs)\b',
    re.IGNORECASE
)

SPEAKER_HINTS = {
    "COUNCIL_COMMISSIONER": re.compile(r'\b(mayor|council\s*member|councilman|councilwoman|commissioner|supervisor|trustee|alderman|chair(man|woman|person)?)\b', re.IGNORECASE),
    "PUBLIC_RESIDENT": re.compile(r'\b(resident|citizen|neighbor|homeowner|farmer|landowner|petition(ers?)?|public\s+comment(ers?)?|opposition|coalition|voters?|testified)\b', re.IGNORECASE),
    "STAFF_PLANNER": re.compile(r'\b(planning\s+(commission|board|staff|director)|zoning\s+(board|staff|administrator)|city\s+staff|county\s+staff|attorney|engineer|task\s+force|utilities\s+director)\b', re.IGNORECASE),
    "DEVELOPER_UTILITY": re.compile(r'\b(developer|applicant|utility|dominion|duke\s+energy|aep|ameren|nextera|applied\s+digital|meta|amazon|google|microsoft|coreweave|trades\s+council|local\s+union)\b', re.IGNORECASE)
}

def classify_text(text):
    if not text or not str(text).strip():
        return {
            "primary_causal_story": "DOES_NOT_FIT",
            "primary_story_label": "Does Not Fit (Procedural / Administrative)",
            "non_fit_subtype": "PROCEDURAL_OR_EMPTY",
            "secondary_causal_story": "NONE",
            "fits_stone_framework": False,
            "confidence_score": 0.0,
            "matched_cues": "",
            "actor_clues": "UNSPECIFIED",
            "classification_rationale": "Empty or purely administrative record without causal attribution."
        }

    text_str = str(text)
    scores = {}
    matches_by_cat = {}

    for cat, info in STONE_CAUSAL_PATTERNS.items():
        found = [m.group(0) for m in info["regex"].finditer(text_str)]
        unique_found = list(dict.fromkeys([f.lower() for f in found]))
        matches_by_cat[cat] = unique_found
        scores[cat] = (len(unique_found) * info["weight"]) + (0.35 * max(0, len(found) - len(unique_found)))

    actors = []
    for role, rgx in SPEAKER_HINTS.items():
        if rgx.search(text_str):
            actors.append(role)

    ranked = sorted(scores.items(), key=lambda x: x[1], reverse=True)
    top_cat, top_score = ranked[0]
    sec_cat, sec_score = ranked[1]

    is_proc = bool(PROCEDURAL_CUE_REGEX.search(text_str))
    is_pro_dev = bool(PRO_DEVELOPMENT_REGEX.search(text_str))

    if top_score == 0:
        if is_pro_dev:
            subtype = "PRO_DEVELOPMENT_PROBLEM_DENIAL"
            reason = "Does not fit Stone's four harm causal stories: speaker advances pro-development economic/tax benefits or denies negative impacts ('nice quiet neighbors')."
        elif is_proc:
            subtype = "PROCEDURAL_PARLIAMENTARY"
            reason = "Does not fit Stone's four causal stories: purely parliamentary procedure, roll-call vote, or agenda scheduling without causal blame."
        else:
            subtype = "GENERAL_SCOPE_OR_TURNOUT"
            reason = "Does not fit Stone's four causal stories: describes general ordinance scope, vote tally, or community turnout without specifying a causal mechanism."

        return {
            "primary_causal_story": "DOES_NOT_FIT",
            "primary_story_label": f"Does Not Fit ({subtype.replace('_', ' ').title()})",
            "non_fit_subtype": subtype,
            "secondary_causal_story": "NONE",
            "fits_stone_framework": False,
            "confidence_score": 0.0,
            "matched_cues": "",
            "actor_clues": "; ".join(actors) if actors else "UNSPECIFIED",
            "classification_rationale": reason
        }

    sec_label = sec_cat if sec_score >= 1.9 else "NONE"
    cues_list = matches_by_cat[top_cat]
    if sec_label != "NONE":
        cues_list = cues_list + [f"[{sec_label}: {c}]" for c in matches_by_cat[sec_cat][:3]]

    rationale = (
        f"Fits {STONE_CAUSAL_PATTERNS[top_cat]['label']} ({STONE_CAUSAL_PATTERNS[top_cat]['stone_cell']}) "
        f"via empirical cues ({', '.join(matches_by_cat[top_cat][:5])}). "
        f"{STONE_CAUSAL_PATTERNS[top_cat]['rationale_template']}"
    )
    if sec_label != "NONE":
        rationale += f" Also exhibits secondary {STONE_CAUSAL_PATTERNS[sec_cat]['label']} elements ({', '.join(matches_by_cat[sec_cat][:3])})."

    return {
        "primary_causal_story": top_cat,
        "primary_story_label": STONE_CAUSAL_PATTERNS[top_cat]["label"],
        "non_fit_subtype": "FITS_STONE_CAUSAL_STORY",
        "secondary_causal_story": sec_label,
        "fits_stone_framework": True,
        "confidence_score": round(top_score, 2),
        "matched_cues": "; ".join(cues_list),
        "actor_clues": "; ".join(actors) if actors else "UNSPECIFIED",
        "classification_rationale": rationale
    }

def main():
    rows_out = []

    # 1. Process Verbatim Council Transcript Snippets (deduplicated across audio/video uploads)
    if os.path.exists(TRANSCRIPTS_CSV):
        df_tr = pd.read_csv(TRANSCRIPTS_CSV)
        df_tr = df_tr[~df_tr["video_id"].isin(["u9e57gYn1sE", "BU6Po2t65uY", "rO-zcRGVzos"])].copy()
        df_tr["norm_text"] = df_tr["snippet_text"].astype(str).str.lower().str.slice(0, 120)
        df_tr = df_tr.drop_duplicates(subset=["place_names", "meeting_date", "norm_text"]).copy()
        print(f"Loaded {len(df_tr)} deduplicated verbatim city council transcript snippets.")

        for _, r in df_tr.iterrows():
            snippet = str(r.get("snippet_text", ""))
            cls = classify_text(snippet)
            rows_out.append({
                "record_id": r.get("snippet_id", ""),
                "source_corpus": "VERBATIM_COUNCIL_TRANSCRIPT",
                "locality": r.get("place_names", ""),
                "state_or_fips": str(r.get("st_fips", "")),
                "jurisdiction_type": r.get("government_type", ""),
                "hearing_date": str(r.get("meeting_date", ""))[:10],
                "hearing_title_or_scope": r.get("meeting_title", ""),
                "snippet_text": snippet,
                "primary_causal_story": cls["primary_causal_story"],
                "primary_story_label": cls["primary_story_label"],
                "non_fit_subtype": cls["non_fit_subtype"],
                "secondary_causal_story": cls["secondary_causal_story"],
                "fits_stone_framework": cls["fits_stone_framework"],
                "confidence_score": cls["confidence_score"],
                "matched_cues": cls["matched_cues"],
                "actor_clues": cls["actor_clues"],
                "classification_rationale": cls["classification_rationale"],
                "source_url": r.get("youtube_url", "")
            })

    # 2. Process 428 Municipal & County Hearing Records from data_center_moratoriums.csv
    if os.path.exists(MORATORIUMS_CSV):
        df_mor = pd.read_csv(MORATORIUMS_CSV)
        print(f"Loaded {len(df_mor)} municipal moratorium hearing records from {MORATORIUMS_CSV}.")
        for idx, r in df_mor.iterrows():
            combined_snippet = f"Scope: {r.get('Scope', '')}. Hearing & Ordinance Details: {r.get('Details_and_Reason', '')} (Status: {r.get('Status', '')}, Duration: {r.get('Duration', '')})."
            cls = classify_text(f"{r.get('Scope', '')} {r.get('Details_and_Reason', '')}")
            rows_out.append({
                "record_id": f"MOR-{idx+1:03d}",
                "source_corpus": "MUNICIPAL_HEARING_RECORD",
                "locality": r.get("Locality", ""),
                "state_or_fips": r.get("State", ""),
                "jurisdiction_type": r.get("Jurisdiction_Type", ""),
                "hearing_date": str(r.get("Date", ""))[:10],
                "hearing_title_or_scope": r.get("Scope", ""),
                "snippet_text": combined_snippet,
                "primary_causal_story": cls["primary_causal_story"],
                "primary_story_label": cls["primary_story_label"],
                "non_fit_subtype": cls["non_fit_subtype"],
                "secondary_causal_story": cls["secondary_causal_story"],
                "fits_stone_framework": cls["fits_stone_framework"],
                "confidence_score": cls["confidence_score"],
                "matched_cues": cls["matched_cues"],
                "actor_clues": cls["actor_clues"],
                "classification_rationale": cls["classification_rationale"],
                "source_url": r.get("Source_URL", "")
            })

    df_all = pd.DataFrame(rows_out)
    df_all.to_csv(OUT_COMBINED_CSV, index=False, encoding="utf-8")
    with open(OUT_COMBINED_JSONL, "w", encoding="utf-8") as f:
        for r in rows_out:
            f.write(json.dumps(r, ensure_ascii=False) + "\n")

    df_vt_only = df_all[df_all["source_corpus"] == "VERBATIM_COUNCIL_TRANSCRIPT"].copy()
    vt_coded_csv = os.path.join(DATA_DIR, "council_transcript_snippets_stone_coded.csv")
    df_vt_only.to_csv(vt_coded_csv, index=False, encoding="utf-8")

    summary = {
        "total_snippets_classified": len(df_all),
        "by_source_corpus": df_all["source_corpus"].value_counts().to_dict(),
        "overall_causal_story_distribution": df_all["primary_causal_story"].value_counts().to_dict(),
        "overall_causal_story_pct": (df_all["primary_causal_story"].value_counts(normalize=True) * 100).round(2).to_dict(),
        "non_fit_subtypes": df_all[df_all["primary_causal_story"] == "DOES_NOT_FIT"]["non_fit_subtype"].value_counts().to_dict(),
        "fits_stone_framework_count": int(df_all["fits_stone_framework"].sum()),
        "does_not_fit_count": int((~df_all["fits_stone_framework"]).sum()),
        "by_corpus_breakdown": {}
    }

    for corpus, grp in df_all.groupby("source_corpus"):
        summary["by_corpus_breakdown"][corpus] = {
            "total": len(grp),
            "fits_stone_count": int(grp["fits_stone_framework"].sum()),
            "fits_stone_pct": round(float(grp["fits_stone_framework"].mean() * 100), 2),
            "counts": grp["primary_causal_story"].value_counts().to_dict(),
            "percentages": (grp["primary_causal_story"].value_counts(normalize=True) * 100).round(2).to_dict(),
            "non_fit_subtypes": grp[grp["primary_causal_story"] == "DOES_NOT_FIT"]["non_fit_subtype"].value_counts().to_dict()
        }

    with open(OUT_SUMMARY_JSON, "w", encoding="utf-8") as f:
        json.dump(summary, f, indent=2)

    print("\n" + "=" * 70)
    print(f"CLASSIFICATION COMPLETE! Total Snippets Classified: {len(df_all):,}")
    print("=" * 70)
    print("\nOVERALL CAUSAL STORY DISTRIBUTION:")
    for k, v in summary["overall_causal_story_distribution"].items():
        pct = summary["overall_causal_story_pct"][k]
        print(f"  {k:<15} : {v:>5} ({pct:>5.1f}%)")

    for corpus, info in summary["by_corpus_breakdown"].items():
        print(f"\n--- {corpus} (n = {info['total']}, Fits Stone: {info['fits_stone_count']} [{info['fits_stone_pct']}%]) ---")
        for k, v in info["counts"].items():
            pct = info["percentages"][k]
            print(f"  {k:<15} : {v:>5} ({pct:>5.1f}%)")
        print("  Non-Fit Subtypes:", info["non_fit_subtypes"])

if __name__ == "__main__":
    main()
