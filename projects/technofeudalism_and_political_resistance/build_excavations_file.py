import os

raw_path = r'c:\Users\jfmar\josemarichal\github.io\projects\technofeudalism_and_political_resistance\draft_chapter_1_raw.md'
with open(raw_path, 'r', encoding='utf-8') as f:
    text = f.read()

lines = [l.strip() for l in text.splitlines() if l.strip()]
if lines[0].startswith('<USER_REQUEST>'): lines = lines[1:]
if lines[0].startswith('This document is 41000 words'):
    if 'Chapter 1: Brand Liberalism' in lines[0]: lines[0] = 'Chapter 1: Brand Liberalism'
    else: lines = lines[1:]

cut_categories = [
    (
        "1. Historical Agrarian Commons & The Enclosure Movement",
        "Deep historical and legal analysis of the English manorial system, Inclosure Acts (1760-1870), customary rights (pasturage, estovers, turbary), and primitive accumulation. Ideal for an essay or article on the political economy of digital enclosure vs. agrarian enclosure.",
        [253, 254, 255]
    ),
    (
        "2. Media Archaeology, Microtemporality & Topological Space (Ernst, Innis, GIS)",
        "Theoretical notes on Wolfgang Ernst (microtemporality, 'culture is counted rather than narrated'), Harold Innis, Wiener's stochastic analysis, and GIS raster algebra. Excellent raw material for a stand-alone paper on media archaeology, computation, and spatial politics.",
        list(range(105, 125))
    ),
    (
        "3. Frankfurt School & Critical Theory Survey Catalog",
        "Encyclopedic overview of alienation and reification across critical theorists: Adorno (classification and commodity identity), Fromm (repressed drives and consumer neurosis), Benjamin (aura and mechanical reproduction), Horkheimer (rationalization of nature and humans), Lukacs (reification), Gramsci (cultural hegemony), Lefebvre (everyday urban life), Galtung (structural violence), and Honneth (recognition). Ideal for a comprehensive literature review or lecture syllabus.",
        list(range(157, 167))
    ),
    (
        "4. Public Administration: The Pathology of Citizen Participation (Arnstein Ladder, Elite Capture)",
        "Literature review detailing the failure modes of participatory democracy: Sherry Arnstein's Ladder of Participation, 'check-the-box' tokenism, William Wang on consultation vs. information, elite capture, and bureaucratic insulation. Perfect for a public administration article or syllabus module.",
        list(range(335, len(lines)))
    ),
    (
        "5. Cultural Politics & Progressive Affect: Side Talk NYC, Male Joy vs. Aesthetic Puritanism",
        "Extended reflection on urban vernacular culture (Side Talk NYC), working-class masculine joy, and the internal aesthetic policing of contemporary progressive politics (BlueSky, Maine planter controversy, contrition vs. grace, and relational co-creation). Valuable as a cultural criticism essay on the pitfalls of affective politics.",
        list(range(144, 153))
    ),
    (
        "6. Intellectual History: Corey Robin vs. Mark Lilla on Burke and Conservatism",
        "Comparative analysis of Corey Robin's The Reactionary Mind and Mark Lilla's critique, exploring Burkean gradualism, social obligation, William F. Buckley, and the elite cultivation of reason vs. working-class thumos. Standalone piece for an intellectual history journal or blog post.",
        [220, 221]
    ),
    (
        "7. Sports Spectacle & Friend-Enemy Politics: World Cup Refereeing & Trump Intervention",
        "Field analysis of the politicization of neutral civic spectacle, using Donald Trump's intervention in World Cup refereeing to examine how modern authoritarian politics prevents periods of universalist unity by re-imposing Schmittian friend-enemy boundaries. Great for a political commentary piece on sport and authoritarian affect.",
        [30, 31, 32, 33]
    ),
    (
        "8. Empirical Platform Ecology: YouTube View Distribution & The Long Tail of Obscurity",
        "Detailed empirical breakdown of BBC / UMass Amherst data showing the reality of the creator economy: 41 median views, 4% never viewed, 0.21% monetized, shaky camera work, and short video lengths. Highly reusable data dossier for a piece on the myth of digital creator meritocracy.",
        list(range(62, 67))
    ),
    (
        "9. Academic Memoir & Professional Precarity: The Anxiety of Self-Promotion and Hustle Culture",
        "Personal and candid reflection on the emotional toll of academic book promotion, publisher obligations, social media self-marketing, and being blocked by podcasters. Powerful personal essay on the commodification of scholarship in late academia.",
        [243]
    ),
    (
        "10. Contemporary Ephemera: Culture War Wire Reports & Substack Clippings",
        "Raw news documentation from early 2025: Fort Hood shooter execution livestream dispatch, Substack tracking of reproductive legislation (Louisiana, Indiana, Arkansas, Idaho), and Instagram violent content monetization mechanics. Reusable case-study clippings for contemporary policy analysis.",
        [306, 322, 323, 324, 329, 330]
    ),
    (
        "11. Asymmetric Incivility in Pre-Social Media Eras: Ward Churchill & Frances Fox Piven",
        "Case studies of right-wing harassment campaigns against Ward Churchill (9/11 comments) and Frances Fox Piven (Glenn Beck attacks on disruptive collective action) to illustrate the lineage of outrage economics prior to modern algorithmic platforms.",
        list(range(294, 297))
    ),
    (
        "12. Alternative Epistemic Communities: Paleo Podcasters, MAHA, and Google AdWords Auctions",
        "Empirical examination of the paleo diet counter-expertise movement, RFK Jr.'s MAHA coalition, and how Google's ad auction system monetizes alternative epistemologies. Ideal for an essay on commercialized counter-science and wellness influencers.",
        [210, 211, 212]
    ),
    (
        "13. Urban Sociology & Neoconservative Anti-Urbanism (Banfield's Unheavenly City)",
        "Notes on Edward Banfield, The Public Interest, 'the city as sandbox/reservation,' and 'benign neglect' as the historical spatial precedent for today's ideological suburban enclosures.",
        [256, 257, 258]
    ),
    (
        "14. The Manosphere, Masculinity & Anti-Ontological Power",
        "Notes on algorithmic pathways into the manosphere, the economic crisis of masculinity, and why liberalism struggles to provide young men with building identities.",
        list(range(100, 105))
    ),
    (
        "15. Vectoralist Political Economy & Pre-Propaganda Theory (Wark & Ellul)",
        "Theoretical notes on Mackenzie Wark's vectoralist class (extracting surplus from creatives rather than owning physical means of production) and Jacques Ellul's sociological 'pre-propaganda'.",
        [235, 236, 237]
    ),
    (
        "16. Cultural Vignettes: Chess Engines, Setlist.fm & Beach Ratings",
        "Anecdotal vignettes on playing against a 1600 chess engine, Byung-Chul Han's infomania applied to rating beaches, and Setlist.fm draining the mystery from concert experiences.",
        [55, 271, 272, 273]
    )
]

out_path = r'c:\Users\jfmar\josemarichal\github.io\projects\technofeudalism_and_political_resistance\brand_liberalism_excavations_removals.md'

with open(out_path, 'w', encoding='utf-8') as f:
    f.write('# Brand Liberalism: Excavations & Preserved Passages Repository\n')
    f.write('**Author:** Jose Marichal  \n')
    f.write('**Project:** Technofeudalism and Political Resistance / Machine Liberalism  \n')
    f.write('**Purpose:** Comprehensive archive of all removed passages, literature surveys, personal field memoirs, and theoretical tangents excised from Chapter 1 to reduce word count from ~41,000 to ~15,000 words. Preserved intact for future papers, essays, and syllabi.\n\n')
    f.write('---\n\n')
    
    total_words = 0
    for title, note, idxs in cut_categories:
        f.write(f'## {title}\n')
        f.write(f'> **Repurposing & Context Note:** {note}\n\n')
        f.write('```markdown\n')
        cat_words = 0
        for idx in idxs:
            if idx < len(lines):
                para = lines[idx]
                cat_words += len(para.split())
                f.write(para + '\n\n')
        f.write('```\n\n')
        f.write(f'*Section Word Count: {cat_words} words*\n\n---\n\n')
        total_words += cat_words

    f.write(f'\n**Total Preserved Words in this Document:** {total_words} words\n')

print(f'Successfully generated {out_path} with {total_words} words.')
