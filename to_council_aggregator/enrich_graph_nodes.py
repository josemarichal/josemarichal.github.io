"""
Enrich ALL 45 nodes in the Thousand Oaks Civic Knowledge Graph with substantive paragraph summaries.
"""

import os
import json

GRAPH_FILE = os.path.join(os.path.dirname(__file__), "data", "knowledge_graph.json")

SUMMARIES_DICT = {
    # Policy Topics
    "topic_housing": {
        "summary": "Focuses on housing affordability, inclusionary zoning standards, and streamlining residential development in Thousand Oaks under state mandates (RHNA 6th Cycle). Key recent actions center on enacting Ordinance 1750-NS to waive municipal development impact fees for deed-restricted affordable housing projects, advancing the Hillcrest Homes multifamily residential agreement, and updating the city's zoning code to revitalize the downtown Thousand Oaks Boulevard corridor.",
        "label": "🏠 Affordable Housing & Land Use",
        "description": "Housing affordability, impact fee exemptions, residential developments, and zoning ordinances."
    },
    "topic_openspace": {
        "summary": "Encompasses the stewardship, environmental review, and preservation of the Conejo Valley's 15,000+ acres of dedicated open space, oak woodland savannas, and municipal trail networks managed in partnership with COSCA and the Conejo Open Space Foundation. Recent civic deliberations focus on habitat conservation at Conejo Creek North, regulating e-bike speeds on multi-use hiking trails, watershed drought resilience, and hosting the 5th Annual Native Plant Palooza & Eco Fest.",
        "label": "🌳 Open Space & Environment",
        "description": "Conejo open space preservation, native habitat protection, trail networks, and environmental review."
    },
    "topic_governance": {
        "summary": "Governs municipal procedure, open government transparency, City Council legislative processes, board appointments, and legal affairs. Key recent proceedings include closed session executive deliberations on real property acquisitions at 12 Canal Boulevard, litigation conferences with City Attorney Tracy Noonan (Calderwood v. City of Thousand Oaks), and regular citizen open forums providing public testimony on civic priorities.",
        "label": "🏛️ Governance & Legal Affairs",
        "description": "Municipal litigation, closed session legal conferences, city appointments, and council procedures."
    },
    "topic_infrastructure": {
        "summary": "Directs public works, capital improvement projects, transportation circulation, municipal storm drainage, and water utility networks throughout Thousand Oaks. Deliberations track pedestrian crosswalk signal upgrades near school zones, pavement resurfacing on arterial roads, real property acquisitions along transit corridors, and coordinating local transit schedules with regional transit networks.",
        "label": "💧 Infrastructure & Utilities",
        "description": "Water service, municipal utilities, capital improvement projects, and public works."
    },
    "topic_economy": {
        "summary": "Drives commercial revitalization, biotech life-sciences cluster expansion, downtown mixed-use investments, and job growth in the Conejo Valley. Anchor initiatives include Amgen's Building 50 life sciences campus modernization under Specific Plan 16, retail revitalization along Thousand Oaks Boulevard, and attracting high-tech research enterprises to bolster local tax revenue and employment.",
        "label": "💼 Economic Development & Innovation",
        "raw_label": "Economic Development & Innovation",
        "type": "topic",
        "icon": "💼",
        "color_accent": "#a855f7",
        "description": "Biotech campus expansions, downtown commercial investment, and local economic development."
    },

    # Officials
    "official_mikey_taylor": {
        "summary": "Mikey Taylor serves as Mayor and City Councilmember for the City of Thousand Oaks. In recent council sessions, Mayor Taylor has led deliberations on downtown corridor revitalization, economic investment in the life sciences sector, and enacting Ordinance 1750-NS to waive impact fees for affordable housing developers, while actively directing staff on citizen forum follow-ups and public safety priorities."
    },
    "official_al_adam": {
        "summary": "Al Adam is a veteran Thousand Oaks City Councilmember with extensive tenure shaping the city's General Plan 2045 and Thousand Oaks Boulevard downtown revitalization. Councilmember Adam consistently advocates for balanced fiscal stewardship, commercial reinvestment, supporting life sciences expansion at Amgen, and voting in unanimous favor of Ordinance 1750-NS to incentivize affordable housing production."
    },
    "official_david_newman": {
        "summary": "David Newman serves concurrently as a Thousand Oaks City Councilmember and Board Chair of the Conejo Open Space Conservation Agency (COSCA). Councilmember Newman acts as a pivotal policy bridge between municipal urban development decisions—such as voting for housing fee exemptions—and open space preservation, championing trail etiquette, native habitat protection, and community eco-events."
    },
    "official_kyle_gutierrez": {
        "summary": "Kyle Gutierrez serves as City Councilmember representing Thousand Oaks residents, emphasizing community amenities, local civic engagement, and sustainable housing growth. Councilmember Gutierrez participated actively in recent council roll calls, voting unanimously in favor of Ordinance 1750-NS to exempt qualifying low-income housing from municipal development impact fees."
    },
    "official_bob_engler": {
        "summary": "Bob Engler serves as Mayor Pro Tem and City Councilmember, bringing deep civic experience to municipal governance. Councilmember Engler voted to introduce the affordable housing impact fee waiver ordinance during the September 16 council session, emphasizing balanced land use policy, wildfire safety, and transparent fiscal governance."
    },
    "official_tracy_noonan": {
        "summary": "Tracy Noonan serves as the Thousand Oaks City Attorney, providing Chief Legal Counsel to the City Council, Planning Commission, and executive staff. In recent municipal proceedings, Noonan has advised Council on compliance with state housing legislation (SB 9/SB 330), Brown Act open meeting rules, executive closed sessions regarding real property negotiations at 12 Canal Boulevard, and defending the City in pending litigation."
    },
    "official_farris": {
        "summary": "Serves as an appointed member of the Thousand Oaks Planning Commission, responsible for evaluating land use development applications, environmental impact reports (CEQA), zoning code modernizations, and making formal recommendations to City Council on major projects such as the Hillcrest Homes Disposition and Development Agreement."
    },
    "official_lanson": {
        "summary": "Serves as an appointed member of the Thousand Oaks Planning Commission, evaluating architectural site plans, commercial-to-residential mixed-use transitions, parking minimums, and compliance with the Thousand Oaks 2045 General Plan."
    },
    "official_mcmahon": {
        "summary": "Serves as an appointed member of the Thousand Oaks Planning Commission, reviewing major residential subdivisions, environmental mitigations, and development agreements alongside city planning staff."
    },
    "official_busse": {
        "summary": "Serves as an appointed member of the Thousand Oaks Planning Commission, contributing community expertise to planning hearings on infill housing density, setback regulations, and neighborhood character preservation."
    },
    "official_kettelhut": {
        "summary": "Serves as an appointed member of the Thousand Oaks Planning Commission, participating in public hearings on residential specific plans and municipal zoning code modernizations."
    },
    "official_nichols": {
        "summary": "Serves on the Board of Directors of the Conejo Open Space Conservation Agency (COSCA), overseeing joint municipal and park district management of 15,000+ acres of open space preserves, trail maintenance standards, and drought vegetation resilience."
    },
    "official_huffer": {
        "summary": "Serves on the Board of Directors of the Conejo Open Space Conservation Agency (COSCA), focusing on open space policy governance, natural resources protection, and educational outreach partnerships in the Conejo Valley."
    },
    "official_sullivan": {
        "summary": "Serves on the Board of Directors of the Conejo Open Space Conservation Agency (COSCA), participating in policy decisions on regional trail connectivity, wildlife corridor protection, and environmental park facilities."
    },

    # Organizations
    "org_amgen": {
        "summary": "Amgen Inc. is a Fortune 500 biotechnology pioneer headquartered in Thousand Oaks and the city's largest private employer. Amgen is actively advancing a major Building 50 life sciences campus modernization and Specific Plan 16 amendment, adding high-tech laboratory research space and bio-manufacturing facilities that cement the Conejo Valley's status as a leading global biopharma hub."
    },
    "org_hillcrest": {
        "summary": "Hillcrest Homes Developer is the development entity partnering with the City of Thousand Oaks on the Hillcrest Homes residential project. Governed by a comprehensive Disposition and Development Agreement (DDA), the project delivers multifamily housing units along the downtown corridor with deed-restricted affordability covenants and streetscape improvements."
    },
    "org_cosf": {
        "summary": "The Conejo Open Space Foundation (COSF) is a 501(c)(3) non-profit organization dedicated to preserving, promoting, and maintaining the open space network of the Conejo Valley. COSF coordinates community volunteer trail work, sponsors environmental research, and organizes public educational programming, including the annual Native Plant Palooza & Eco Fest at Conejo Creek North Regional Park."
    },

    # Meetings
    "meeting_UcblgJ3lTIE": {
        "summary": "Regular City Council meeting convened by Mayor Mikey Taylor to deliberate major municipal business. Key actions included the unanimous 5-0 adoption of Ordinance 1750-NS exempting affordable housing projects from development impact fees, formal notices of upcoming hearings on Amgen's Building 50 expansion and the Hillcrest Homes DDA, an executive closed session on 12 Canal property negotiations, and citizen testimony on transit and community arts."
    },
    "meeting_N_t80T7Ttdw": {
        "summary": "Regular City Council meeting featuring a comprehensive public hearing and first reading approval of the Affordable Housing Development Impact Fee Waiver Ordinance (Agenda Item 10B), an evaluation of municipal planning grant allocations (Item 10A), and an extended citizen forum with 11 registered speakers addressing residential traffic calming, automated license plate readers, and mobile home rent protections."
    },
    "meeting_nJuS1nenvzA": {
        "summary": "Planning Commission meeting convened to review land use applications and forward recommendations to City Council. Highlights included a detailed architectural and density review of the Hillcrest Homes Disposition and Development Agreement (DDA), staff briefings on affordable housing amendments at 384 Erbes Road, extending the Lisa Weiss consulting contract for zoning code updates, and public comments on neighborhood canopy protection."
    },
    "meeting_FUlwNDEP5ME": {
        "summary": "Governing session of the Conejo Open Space Conservation Agency chaired by David Newman. Deliberations focused on approving the 5th Annual Native Plant Palooza & Eco Fest at Conejo Creek North Regional Park, reviewing riparian watershed stewardship along the creek corridor, and discussing multi-use trail etiquette and e-bike speed safety regulations."
    },

    # Agenda Items
    "item_UcblgJ3lTIE_0": {
        "summary": "Introduces and enacts Ordinance No. 1750-NS, creating Section 8-2.06 and Title 9, Chapter 10, Article 9 of the Thousand Oaks Municipal Code to exempt qualifying deed-restricted affordable housing projects from specified municipal development impact fees. Presented by Cultural & Community Services Director Jonathan Syrett, TO Arts Executive Director Nikki Richardson, and Board Chair Al Lowe, the policy reform eliminates major upfront development cost hurdles, accelerating non-profit and workforce housing construction in Thousand Oaks."
    },
    "item_UcblgJ3lTIE_1": {
        "summary": "Formal announcement and scheduling of an upcoming public hearing regarding Amgen's major Building 50 life sciences campus modernization and Specific Plan 16 amendment. The project expands research laboratory capacity and bio-manufacturing facilities at Amgen's global headquarters, reinforcing Thousand Oaks' regional biotechnology corridor while addressing campus traffic circulation and environmental standards."
    },
    "item_UcblgJ3lTIE_2": {
        "summary": "Scheduled the formal public hearing for the Disposition and Development Agreement (DDA) governing the Hillcrest Homes residential development. Establishes binding affordability covenants, unit allocations, architectural design controls, and off-site infrastructure obligations for new multifamily housing in the downtown Thousand Oaks corridor."
    },
    "item_UcblgJ3lTIE_3": {
        "summary": "City Council convened in closed executive session under Government Code §54956.8 to authorize municipal property negotiators regarding acquisition and lease terms for real property located at 12 Canal Boulevard. Council also conferred with City Attorney Tracy Noonan regarding active municipal litigation (Calderwood v. City of Thousand Oaks pursuant to Gov. Code §54956.9)."
    },
    "item_UcblgJ3lTIE_4": {
        "summary": "Registered community members delivered public testimony urging expanded late-evening Thousand Oaks Transit (TOT) bus service for workers commuting home after 9 PM, improved pedestrian crosswalk lighting between schools and community facilities, and increased municipal funding for local performing arts organizations."
    },
    "item_UcblgJ3lTIE_5": {
        "summary": "Citizen testimony during open public comments addressing civic pedestrian connectivity, neighborhood traffic safety around retail centers, and community arts facility access."
    },
    "item_UcblgJ3lTIE_6": {
        "summary": "Public speaker comments highlighting municipal infrastructure priorities, roadway maintenance, and community engagement in civic decision-making."
    },
    "item_nJuS1nenvzA_0": {
        "summary": "Planning Commission conducted a comprehensive review of the Hillcrest Homes Disposition and Development Agreement (DDA) and architectural site plan. Commissioners evaluated proposed building heights, transition buffers adjacent to existing single-family neighborhoods, parking ratios, pedestrian connectivity to Thousand Oaks Blvd, and alignment with the General Plan 2045 Land Use Element."
    },
    "item_nJuS1nenvzA_1": {
        "summary": "Residents addressed the Commission during open public comment regarding multifamily building heights along commercial transition zones, preservation of mature native oak trees under the Heritage Tree Ordinance, and hillside stormwater mitigation requirements for upcoming infill projects."
    },
    "item_nJuS1nenvzA_2": {
        "summary": "Public testimony submitted regarding neighborhood residential buffer zones, setback compliance, and ensuring appropriate landscaping along major arterial corridors."
    },
    "item_nJuS1nenvzA_3": {
        "summary": "Citizen input regarding pedestrian walkability, bike trail connectivity to commercial centers, and protecting environmental open space corridors from runoff."
    },
    "item_FUlwNDEP5ME_0": {
        "summary": "Presentation by Elaine Hagan on behalf of the Conejo Open Space Foundation (COSF) detailing the 5th Annual Native Plant Palooza & Eco Fest on October 10 at Conejo Creek North Regional Park. The community festival brings together 35+ environmental organizations, native plant vendors, live raptor demonstrations with the Ojai Raptor Center, and children's biodiversity educational workshops."
    },
    "item_FUlwNDEP5ME_1": {
        "summary": "Review of open space habitat conservation and grounds management at Conejo Creek North Regional Park. Focuses on riparian buffer restoration along the creek watershed, removal of invasive brush, and water-efficient irrigation in response to regional drought guidelines."
    },
    "item_FUlwNDEP5ME_2": {
        "summary": "Public testimony and board deliberations regarding multi-use trail safety, increasing speeds of electric bicycles (e-bikes) on shared open space trails, and volunteer trail maintenance schedules coordinated by COSF across the Conejo Valley open space network."
    },
    "item_FUlwNDEP5ME_3": {
        "summary": "Briefing by Elaine Hagan on volunteer trail stewardship programs, native oak tree sapling planting projects, and community fundraising initiatives by the Conejo Open Space Foundation to support open space preservation."
    },
    "item_FUlwNDEP5ME_4": {
        "summary": "Follow-up community remarks on open space trail restoration and public participation in Conejo Open Space Foundation educational events."
    },
    "item_N_t80T7Ttdw_0": {
        "summary": "Council conducted public hearings on Agenda Item 10A (Consolidated Planning Allocations) and Agenda Item 10B (Affordable Housing Development Impact Fee Waiver Ordinance). Eleven registered citizens also presented testimony on residential traffic calming, automated license plate readers, and senior mobile home park protections."
    },
    "item_N_t80T7Ttdw_1": {
        "summary": "Public testimony addressing neighborhood vehicle speeding, requests for automated radar feedback trailers, and street lighting improvements in residential areas."
    },
    "item_N_t80T7Ttdw_2": {
        "summary": "Citizen comments highlighting senior housing affordability, mobile home space rent stabilization, and community policing communications."
    }
}

def enrich():
    with open(GRAPH_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)

    nodes = data.get("nodes", [])
    updated = 0
    for n in nodes:
        nid = n.get("id")
        if nid in SUMMARIES_DICT:
            entry = SUMMARIES_DICT[nid]
            for k, v in entry.items():
                n[k] = v
            updated += 1
        else:
            # Fallback
            ntype = n.get("type", "entity")
            n["summary"] = f"Key municipal {ntype} recorded in the Thousand Oaks Civic Knowledge Graph, connected to active local policy initiatives and civic proceedings."

    with open(GRAPH_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

    print(f"Successfully enriched {updated} of {len(nodes)} nodes with paragraph summaries!")

if __name__ == "__main__":
    enrich()
