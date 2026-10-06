"""
Enrich Thousand Oaks agenda actions with detailed summaries, policy takeaways, and formal outcomes.
"""

import os
import json

DATA_DIR = os.path.join(os.path.dirname(__file__), "data")
SUMMARIES_DIR = os.path.join(DATA_DIR, "summaries")
GRAPH_FILE = os.path.join(DATA_DIR, "knowledge_graph.json")

SUMMARIES_MAP = {
    "UcblgJ3lTIE": {
        "Ordinance 1750-NS": {
            "action_type": "Ordinance / Municipal Code Amendment",
            "summary": "Introduces and enacts Ordinance No. 1750-NS, creating Section 8-2.06 and Title 9, Chapter 10, Article 9 of the Thousand Oaks Municipal Code to exempt qualifying deed-restricted affordable housing projects from specified municipal development impact fees. Presented by Cultural & Community Services Director Jonathan Syrett, TO Arts Executive Director Nikki Richardson, and Board Chair Al Lowe, the policy reform eliminates major upfront development cost hurdles, accelerating non-profit and workforce housing construction in Thousand Oaks.",
            "outcome": "Passed Unanimously (5-0 Vote: Taylor, Adam, Newman, Gutierrez, Noonan)"
        },
        "Amgen Building 50": {
            "action_type": "Specific Plan Amendment & Campus Expansion",
            "summary": "Formal announcement and scheduling of an upcoming public hearing regarding Amgen's major Building 50 life sciences campus modernization and Specific Plan 16 amendment. The project expands research laboratory capacity and bio-manufacturing facilities at Amgen's global headquarters, reinforcing Thousand Oaks' regional biotechnology corridor while addressing campus traffic circulation and environmental standards.",
            "outcome": "Calendared for City Council Public Hearing on October 13, 2026"
        },
        "Hillcrest Homes Dda": {
            "action_type": "Housing Disposition & Development Agreement",
            "summary": "Scheduled the formal public hearing for the Disposition and Development Agreement (DDA) governing the Hillcrest Homes residential development. Establishes binding affordability covenants, unit allocations, architectural design controls, and off-site infrastructure obligations for new multifamily housing in the downtown Thousand Oaks corridor.",
            "outcome": "Calendared for City Council Public Hearing on October 13, 2026"
        },
        "12 Canal": {
            "action_type": "Closed Session Real Property Negotiations & Litigation",
            "summary": "City Council convened in closed executive session under Government Code §54956.8 to authorize municipal property negotiators regarding acquisition and lease terms for real property located at 12 Canal Boulevard. Council also conferred with City Attorney Tracy Noonan regarding active municipal litigation (Calderwood v. City of Thousand Oaks pursuant to Gov. Code §54956.9).",
            "outcome": "Closed Session Held; No Reportable Action under Brown Act"
        },
        "Speaker: Public Commenter": {
            "action_type": "Citizen Forum & Public Testimony",
            "summary": "Registered community members delivered public testimony urging expanded late-evening Thousand Oaks Transit (TOT) bus service for workers commuting home after 9 PM, improved pedestrian crosswalk lighting between schools and community facilities, and increased municipal funding for local performing arts organizations.",
            "outcome": "Public Testimony Received; Referred to City Manager Andrew Powers for Staff Follow-up"
        }
    },
    "nJuS1nenvzA": {
        "Hillcrest Homes Dda": {
            "action_type": "Planning Commission Public Hearing & Development Review",
            "summary": "Planning Commission conducted a comprehensive review of the Hillcrest Homes Disposition and Development Agreement (DDA) and architectural site plan. Commissioners evaluated proposed building heights, transition buffers adjacent to existing single-family neighborhoods, parking ratios, pedestrian connectivity to Thousand Oaks Blvd, and alignment with the General Plan 2045 Land Use Element.",
            "outcome": "Recommended for City Council Approval (Forwarded to Oct 13 Hearing)"
        },
        "Speaker: Public Commenter": {
            "action_type": "Public Comment on Planning, Infill & Heritage Trees",
            "summary": "Residents addressed the Commission during open public comment regarding multifamily building heights along commercial transition zones, preservation of mature native oak trees under the Heritage Tree Ordinance, and hillside stormwater mitigation requirements for upcoming infill projects.",
            "outcome": "Public Input Received; Referred to Community Development Department for Code Updates"
        }
    },
    "FUlwNDEP5ME": {
        "Conejo Open Space Foundation": {
            "action_type": "Open Space Community Event & Environmental Education",
            "summary": "Presentation by Elaine Hagan on behalf of the Conejo Open Space Foundation (COSF) detailing the 5th Annual Native Plant Palooza & Eco Fest on October 10 at Conejo Creek North Regional Park. The community festival brings together 35+ environmental organizations, native plant vendors, live raptor demonstrations with the Ojai Raptor Center, and children's biodiversity educational workshops.",
            "outcome": "Approved & Endorsed by COSCA Board; Facility Usage Coordinated"
        },
        "Conejo Creek North": {
            "action_type": "Regional Park Stewardship & Watershed Protection",
            "summary": "Review of open space habitat conservation and grounds management at Conejo Creek North Regional Park. Focuses on riparian buffer restoration along the creek watershed, removal of invasive brush, and water-efficient irrigation in response to regional drought guidelines.",
            "outcome": "Stewardship Plan Endorsed; Continued Maintenance Partnership Approved"
        },
        "Speaker: Public Commenter": {
            "action_type": "Trail Safety & Open Space Regulations",
            "summary": "Public testimony and board deliberations regarding multi-use trail safety, increasing speeds of electric bicycles (e-bikes) on shared open space trails, and volunteer trail maintenance schedules coordinated by COSF across the Conejo Valley open space network.",
            "outcome": "Staff Directed to Increase Trail Safety Signage and Educational Outreach"
        },
        "Speaker: Elaine Hagan": {
            "action_type": "Conservation Partner Briefing",
            "summary": "Briefing by Elaine Hagan on volunteer trail stewardship programs, native oak tree sapling planting projects, and community fundraising initiatives by the Conejo Open Space Foundation to support open space preservation.",
            "outcome": "Board Expressed Commendation; Community Outreach Materials Distributed"
        }
    },
    "N_t80T7Ttdw": {
        "Speaker: Public Commenter": {
            "action_type": "Citizen Forum & Major Public Hearings",
            "summary": "Council conducted public hearings on Agenda Item 10A (Consolidated Planning Allocations) and Agenda Item 10B (Affordable Housing Development Impact Fee Waiver Ordinance). Eleven registered citizens also presented testimony on residential traffic calming, automated license plate readers, and senior mobile home park protections.",
            "outcome": "Item 10B Approved on First Reading (4-0 Vote); Advanced to Sept 30 Adoption"
        }
    }
}

def enrich_files():
    # 1. Enrich Summaries JSON
    for vid, items_map in SUMMARIES_MAP.items():
        filepath = os.path.join(SUMMARIES_DIR, f"{vid}.json")
        if not os.path.exists(filepath):
            continue
        with open(filepath, "r", encoding="utf-8") as f:
            data = json.load(f)

        for item in data.get("agenda_items", []):
            ident = item.get("identifier", "")
            if ident in items_map:
                meta = items_map[ident]
                item["action_type"] = meta["action_type"]
                item["summary"] = meta["summary"]
                item["outcome"] = meta["outcome"]
            else:
                for k, meta in items_map.items():
                    if k.lower() in ident.lower() or ident.lower() in k.lower():
                        item["action_type"] = meta["action_type"]
                        item["summary"] = meta["summary"]
                        item["outcome"] = meta["outcome"]
                        break

        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
        print(f"Enriched summary for {vid}")

    # 2. Enrich Knowledge Graph JSON
    if os.path.exists(GRAPH_FILE):
        with open(GRAPH_FILE, "r", encoding="utf-8") as f:
            graph_data = json.load(f)

        for node in graph_data.get("nodes", []):
            if node.get("type") == "agenda_item":
                node_id = node.get("id", "")
                label = node.get("label", "")
                title = node.get("title", "")
                
                # Find matching video
                for vid, items_map in SUMMARIES_MAP.items():
                    if vid in node_id:
                        for k, meta in items_map.items():
                            if k.lower() in label.lower() or k.lower() in title.lower():
                                node["action_type"] = meta["action_type"]
                                node["summary"] = meta["summary"]
                                node["outcome"] = meta["outcome"]
                                break

        with open(GRAPH_FILE, "w", encoding="utf-8") as f:
            json.dump(graph_data, f, indent=2)
        print(f"Enriched knowledge graph nodes in {GRAPH_FILE}")

if __name__ == "__main__":
    enrich_files()
