import sys
import pptx
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

def build_puzzle_deck(output_path="state_and_local_policy_chapter5.pptx"):
    prs = pptx.Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    # Color Palette
    BG_COLOR = RGBColor(248, 250, 252)       # Slate 50
    TEXT_MAIN = RGBColor(15, 23, 42)         # Slate 900
    TEXT_MUTED = RGBColor(71, 85, 105)       # Slate 600
    PRIMARY = RGBColor(30, 58, 138)          # Navy 900
    ACCENT_BLUE = RGBColor(37, 99, 235)      # Blue 600
    ACCENT_AMBER = RGBColor(217, 119, 6)     # Amber 600
    CARD_BG = RGBColor(255, 255, 255)        # Pure White
    CARD_BORDER = RGBColor(226, 232, 240)    # Slate 200
    QUESTION_BG = RGBColor(254, 243, 199)    # Amber 100
    QUESTION_BORDER = RGBColor(245, 158, 11) # Amber 500
    QUESTION_TEXT = RGBColor(146, 64, 14)    # Amber 900

    def add_puzzle_slide(step_badge, title_text, dilemma_subtitle, left_title, left_items, right_title, right_items, question_text, notes_text):
        slide = prs.slides.add_slide(blank_layout)

        # Background
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
        bg.fill.solid()
        bg.fill.fore_color.rgb = BG_COLOR
        bg.line.fill.background()

        # Top Accent Ribbon
        top_ribbon = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(0.1))
        top_ribbon.fill.solid()
        top_ribbon.fill.fore_color.rgb = ACCENT_BLUE
        top_ribbon.line.fill.background()

        # Step Badge / Tracker
        tx_badge = slide.shapes.add_textbox(Inches(0.8), Inches(0.32), Inches(11.7), Inches(0.3))
        tf_b = tx_badge.text_frame
        tf_b.word_wrap = True
        tf_b.margin_left = tf_b.margin_right = tf_b.margin_top = tf_b.margin_bottom = 0
        p_b = tf_b.paragraphs[0]
        p_b.text = step_badge.upper()
        p_b.font.size = Pt(10)
        p_b.font.bold = True
        p_b.font.color.rgb = ACCENT_AMBER
        p_b.font.name = "Arial"

        # Slide Title
        tx_title = slide.shapes.add_textbox(Inches(0.8), Inches(0.62), Inches(11.7), Inches(0.55))
        tf_t = tx_title.text_frame
        tf_t.word_wrap = True
        tf_t.margin_left = tf_t.margin_right = tf_t.margin_top = tf_t.margin_bottom = 0
        p_t = tf_t.paragraphs[0]
        p_t.text = title_text
        p_t.font.size = Pt(22)
        p_t.font.bold = True
        p_t.font.color.rgb = PRIMARY
        p_t.font.name = "Georgia"

        # Dilemma Subtitle
        tx_sub = slide.shapes.add_textbox(Inches(0.8), Inches(1.22), Inches(11.7), Inches(0.35))
        tf_s = tx_sub.text_frame
        tf_s.word_wrap = True
        tf_s.margin_left = tf_s.margin_right = tf_s.margin_top = tf_s.margin_bottom = 0
        p_s = tf_s.paragraphs[0]
        p_s.text = dilemma_subtitle
        p_s.font.size = Pt(12)
        p_s.font.color.rgb = TEXT_MUTED
        p_s.font.name = "Arial"

        # Left Card
        card_l = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.65), Inches(5.65), Inches(4.35))
        card_l.fill.solid()
        card_l.fill.fore_color.rgb = CARD_BG
        card_l.line.color.rgb = CARD_BORDER
        card_l.line.width = Pt(1.5)

        tx_l = slide.shapes.add_textbox(Inches(1.05), Inches(1.85), Inches(5.15), Inches(3.95))
        tf_l = tx_l.text_frame
        tf_l.word_wrap = True
        tf_l.margin_left = tf_l.margin_right = tf_l.margin_top = tf_l.margin_bottom = 0
        p_lt = tf_l.paragraphs[0]
        p_lt.text = left_title
        p_lt.font.size = Pt(15)
        p_lt.font.bold = True
        p_lt.font.color.rgb = PRIMARY
        p_lt.font.name = "Arial"
        p_lt.space_after = Pt(8)

        for lead, body in left_items:
            p = tf_l.add_paragraph()
            p.font.size = Pt(11)
            p.font.name = "Arial"
            p.space_after = Pt(6)
            p.font.color.rgb = TEXT_MAIN

            r_bullet = p.add_run()
            r_bullet.text = "• "
            r_bullet.font.bold = True
            r_bullet.font.color.rgb = ACCENT_BLUE

            if lead:
                r_lead = p.add_run()
                r_lead.text = f"{lead}: "
                r_lead.font.bold = True
                r_lead.font.color.rgb = PRIMARY

            r_body = p.add_run()
            r_body.text = body

        # Right Card
        card_r = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.85), Inches(1.65), Inches(5.65), Inches(4.35))
        card_r.fill.solid()
        card_r.fill.fore_color.rgb = CARD_BG
        card_r.line.color.rgb = CARD_BORDER
        card_r.line.width = Pt(1.5)

        tx_r = slide.shapes.add_textbox(Inches(7.1), Inches(1.85), Inches(5.15), Inches(3.95))
        tf_r = tx_r.text_frame
        tf_r.word_wrap = True
        tf_r.margin_left = tf_r.margin_right = tf_r.margin_top = tf_r.margin_bottom = 0
        p_rt = tf_r.paragraphs[0]
        p_rt.text = right_title
        p_rt.font.size = Pt(15)
        p_rt.font.bold = True
        p_rt.font.color.rgb = PRIMARY
        p_rt.font.name = "Arial"
        p_rt.space_after = Pt(8)

        for lead, body in right_items:
            p = tf_r.add_paragraph()
            p.font.size = Pt(11)
            p.font.name = "Arial"
            p.space_after = Pt(6)
            p.font.color.rgb = TEXT_MAIN

            r_bullet = p.add_run()
            r_bullet.text = "• "
            r_bullet.font.bold = True
            r_bullet.font.color.rgb = ACCENT_BLUE

            if lead:
                r_lead = p.add_run()
                r_lead.text = f"{lead}: "
                r_lead.font.bold = True
                r_lead.font.color.rgb = PRIMARY

            r_body = p.add_run()
            r_body.text = body

        # Bottom Transition Question Callout Box
        q_box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(6.15), Inches(11.7), Inches(0.95))
        q_box.fill.solid()
        q_box.fill.fore_color.rgb = QUESTION_BG
        q_box.line.color.rgb = QUESTION_BORDER
        q_box.line.width = Pt(1.5)

        tx_q = slide.shapes.add_textbox(Inches(1.05), Inches(6.25), Inches(11.2), Inches(0.75))
        tf_q = tx_q.text_frame
        tf_q.word_wrap = True
        tf_q.margin_left = tf_q.margin_right = tf_q.margin_top = tf_q.margin_bottom = 0

        p_qh = tf_q.paragraphs[0]
        p_qh.text = "🔍 BRIDGING DILEMMA & TRANSITION QUESTION:"
        p_qh.font.size = Pt(10)
        p_qh.font.bold = True
        p_qh.font.color.rgb = ACCENT_AMBER
        p_qh.font.name = "Arial"
        p_qh.space_after = Pt(2)

        p_qb = tf_q.add_paragraph()
        p_qb.text = question_text
        p_qb.font.size = Pt(12)
        p_qb.font.bold = True
        p_qb.font.color.rgb = QUESTION_TEXT
        p_qb.font.name = "Georgia"

        # Speaker notes
        slide.notes_slide.notes_text_frame.text = notes_text

        return slide

    # =========================================================================
    # SLIDE 1: THE CORE PUZZLE
    # =========================================================================
    add_puzzle_slide(
        "Dilemma Step 1 // The Core Paradox of Local Governance",
        "Slide 1: The Core Puzzle: The Promise vs. Gridlock of Subnational Democracy",
        "In a federal republic with 520,000+ elected offices closest to the people, why is enacting community-driven policy so extraordinarily difficult?",
        "The Democratic Promise",
        [
            ("Hyper-Local Accessibility", "U.S. federalism creates over 89,000 subnational jurisdictions and 520,000+ elected officials, offering citizens more direct access points than any other democracy."),
            ("What Policy Is", "What governments say and do about perceived problems (Ripley & Franklin, 1987). Policymaking is the ongoing interaction between state and non-state actors."),
            ("Laboratories of Democracy", "State and local governments are positioned to be agile responders to urgent crises: public health, housing, education, and ecological sustainability."),
            ("The Agenda Funnel", "Kingdon's (1984) agenda model suggests that when perceived problems meet citizen urgency, government action should naturally follow.")
        ],
        "The Institutional Reality",
        [
            ("Separation of Powers Friction", "State constitutions duplicate federal checks and balances across three co-equal branches, intentionally fragmenting power and breeding gridlock."),
            ("Decentralized Veto Points", "Unlike centralized systems (U.K., France), any policy initiative must navigate governor vetoes, bicameral disputes, and independent courts."),
            ("The Bureaucratic Wall", "Public agencies, civil service rules, and entrenched administrative procedures insulate 'expert' decision-makers from popular demands."),
            ("The Central Dilemma", "If government is structured to belong to the local community, why does popular consensus so frequently stall inside the machinery of the state?")
        ],
        "If formal governmental institutions are insulated and prone to gridlock, how have postindustrial citizens altered the way they fight for policy influence from the outside?",
        "LECTURE TALKING POINTS (SLIDE 1):\n"
        "- Hook the students with the paradox: America has more elected officials per capita than virtually any major democracy (over 520,000 offices). If democracy is closest to the people at city hall and the state capitol, why does it feel so unresponsive?\n"
        "- Define public policy via Thomas Dye and Ripley & Franklin: policy is the outcome of interaction, but it is also what government CHOOSES NOT to do.\n"
        "- Highlight the transition question: When traditional channels fail to move, where do citizens go?"
    )

    # =========================================================================
    # SLIDE 2: THE SHIFT IN CIVIC ACTION
    # =========================================================================
    add_puzzle_slide(
        "Dilemma Step 2 // The Participatory Mutation",
        "Slide 2: The Eruption from Below: Top-Down Mobilization vs. Grassroots Resistance",
        "Walking the dilemma: When formal institutions fail to respond, citizens abandon orderly party channels for disruptive protest politics.",
        "The Collapse of Elite-Directed Politics",
        [
            ("The Postwar Model", "Ronald Inglehart & Russell Dalton: Mid-20th century politics was 'elite-directed'—hierarchical parties, labor unions, and civic clubs mobilized voters from the top down."),
            ("Rising Educational Capital", "Unprecedented postwar prosperity and expanding higher education created a critical public less willing to defer to authority."),
            ("Bureaucratic Disconnect", "Traditional party structures proved too rigid and slow to address fast-moving single-issue conflicts (zoning, racial justice, toxic dumps)."),
            ("Declining Party Deference", "Voters increasingly identify as independent, rejecting party discipline in favor of direct, issue-specific engagement.")
        ],
        "The Rise of Elite-Challenging Politics",
        [
            ("Protest & Direct Action", "Citizens embrace unconventional tactics: demonstrations, strikes, building sit-ins, and boycotts to force issues into public consciousness."),
            ("NIMBY & Community Clashes", "'Not In My Backyard' battles against toxic waste siting or highway placement pit activated residents against technocratic planners."),
            ("The Smartphone Weapon", "Modern digital media and mobile phones allow instant viral documentation of injustice, bypassing mainstream news gatekeepers."),
            ("Eruption vs. Expertise", "Direct citizen resistance (e.g. chaining oneself to bulldozers, Rothenberg, 1992) challenges the monopoly of bureaucratic 'experts.'")
        ],
        "When citizens step outside the streets and try to formalize their demands into organized interest groups, what massive economic trap do they immediately encounter?",
        "LECTURE TALKING POINTS (SLIDE 2):\n"
        "- Detail the sociological engine: Dalton and Inglehart's postindustrial thesis. Why did baby boomers and subsequent generations become more rebellious? Higher education, post-materialist values, and mistrust of technocracy.\n"
        "- Contrast 'elite-directed' (voting as instructed by a union boss or party precinct captain) with 'elite-challenging' (protest politics, chaining to trees, viral cellphone videos).\n"
        "- Transition question setup: Protests create headlines, but policy requires sustained lobbying. What happens when activists try to form permanent organizations?"
    )

    # =========================================================================
    # SLIDE 3: THE COLLECTIVE ACTION TRAP
    # =========================================================================
    add_puzzle_slide(
        "Dilemma Step 3 // The Economics of Advocacy",
        "Slide 3: The Collective Action Trap: Why Citizen Groups Starve While Industry Thrives",
        "Walking the dilemma: Grassroots groups pursue shared public goods but drown in the free-rider dilemma, while concentrated business interests pool billions.",
        "The Public Interest Handicap",
        [
            ("Mancur Olson’s Free-Rider Paradox", "Public interest groups seek collective, non-excludable benefits (clean water, civil rights). Rational citizens enjoy the benefit without paying dues."),
            ("Chronic Resource Depletion", "Steel’s (2015) empirical survey: Grassroots NGOs survive on unpaid/underpaid staff and spend 25–50% of their scarce time merely fundraising."),
            ("The Patron Dependency", "To survive, citizen groups must rely on wealthy outside benefactors (Soros, Gates) and private foundations (MacArthur, Kellogg) (Walker, 1983)."),
            ("Local Receptivity Edge", "Despite starvation budgets, 68% of civil society NGOs feel effective working with local governments and citizens, compared to near-zero impact federally.")
        ],
        "The Corporate Coalition Machine",
        [
            ("Concentrated Benefits", "Private economic sectors pursue exclusive profits; individual firms readily invest in lobbying because policy gains directly boost their balance sheets."),
            ("Coalitions of Convenience", "Competitors (automobile dealers, real estate developers, ranchers) join forces against regulations that threaten their bottom-line profits."),
            ("Professional Influence Agents", "Industry hires elite lobbying firms and former lawmakers whose insider relationships often overpower raw membership numbers (McFarland)."),
            ("David vs. Goliath Triumph", "The 1998 Tobacco Master Settlement ($206B) proved that state AGs and health groups can defeat corporate titans—but only with unified legal backing.")
        ],
        "If citizen interest groups are chronically underfunded and outgunned by corporate coalitions, what broader vehicle can ordinary people use to alter the balance of power?",
        "LECTURE TALKING POINTS (SLIDE 3):\n"
        "- Teach Mancur Olson's seminal 1965 insight: The larger the group, the less likely it is to succeed without coercion or selective incentives, because of the free-rider problem.\n"
        "- Highlight Steel's 2015 data: Grassroots public interest groups are understaffed, volunteer-heavy, and spend enormous energy seeking grants.\n"
        "- Contrast with industry's 'coalitions of convenience.' Connect to the transition: If money and lobbyists belong to capital, what resource belongs to the public? Broad social movements."
    )

    # =========================================================================
    # SLIDE 4: THE SOCIAL MOVEMENT BREAKTHROUGH
    # =========================================================================
    add_puzzle_slide(
        "Dilemma Step 4 // Mass Mobilization as Counterweight",
        "Slide 4: The Social Movement Breakthrough: Transforming Moral Outrage into Leverage",
        "Walking the dilemma: When money cannot beat capital, broad-based social movements weaponize collective identity, moral clarity, and dramatic spotlighting.",
        "The Mechanics of Social Movements",
        [
            ("Beyond Bureaucratic Lobbying", "Social movements are broad, identity-driven mobilizations that unite diverse organizations around shared moral imperatives, not narrow perks."),
            ("Historical Policy Engines", "Abolition, Women's Suffrage, Labor Rights, Civil Rights, Environmentalism, and LGBTQ+ Equality all began as outsider insurgencies."),
            ("Overcoming the Free-Rider Deficit", "Movements inspire voluntary self-sacrifice by substituting moral outrage, community solidarity, and personal efficacy for financial incentives."),
            ("State Laboratories First", "Almost every national rights breakthrough (women voting, clean air standards, marriage equality) was won at the state/municipal level first.")
        ],
        "The Anatomy of Success (Tilly, McCarthy & Zald)",
        [
            ("Dramatic Spotlighting", "Using visually unforgettable, emotionally electrifying events (e.g. baby seal clubbing, civil rights firehoses, Greta Thunberg's UN speech) to shake society."),
            ("Micro-Mobilization Networks", "Building tight-knit local cells that forge deep personal trust while plugging into nationwide communication networks."),
            ("Efficacy vs. Fatalism", "Movements succeed only when they convince citizens that their individual actions will visibly alter history, defeating cynicism."),
            ("Avoiding Internal Cleavages", "Movements fracture when crosscutting divisions (race, class, urban/rural) split coalitions; disciplined, inclusive leadership is vital.")
        ],
        "Can citizens bypass the representative legislature altogether and enact their desired laws directly at the ballot box—or does direct democracy carry its own hidden trap?",
        "LECTURE TALKING POINTS (SLIDE 4):\n"
        "- Walk through the sociological components of successful movements: Charles Tilly, Gooden & Jasper, McCarthy & Zald.\n"
        "- Emphasize 'Dramatic Spotlighting': in an attention economy, emotional visual events overcome information clutter. Greta Thunberg's climate strike is a textbook example.\n"
        "- Transition question setup: If legislative lobbying is captured, why not go directly to the voters via ballot initiatives? Does direct democracy solve the dilemma?"
    )

    # =========================================================================
    # SLIDE 5: DIRECT DEMOCRACY & THE BALLOT TRAP
    # =========================================================================
    add_puzzle_slide(
        "Dilemma Step 5 // The Paradox of Direct Democracy",
        "Slide 5: Direct Democracy & The Ballot Trap: People's Power or Special Interest Hijack?",
        "Walking the dilemma: Born as a Progressive cure for machine corruption, the initiative process has collided with voter stratification and corporate capture.",
        "The Progressive Promise",
        [
            ("Circumventing Corrupt Machines", "Adopted by 24 states (South Dakota 1898, Oregon 1902) to break the stranglehold of railroad trusts and party bosses over state capitols."),
            ("The Three Instruments", "Direct/Indirect Initiatives (citizens write statutes or amendments), Referenda (legislature refers acts to public), and Recall (ousting officials like Gray Davis in 2003)."),
            ("Pro-Democracy Rationale", "Forces legislatures to respond, sparks vibrant public debate, empowers ordinary citizens, and increases civic participation."),
            ("Duty vs. Engaged Citizenship", "Russell Dalton: Transitions from 'duty-based' voting (elections, party loyalty) to 'engaged citizenship' (community activism, ballot oversight).")
        ],
        "The Perversion of the Ballot",
        [
            ("The Turnout Stratification", "2022 Census data: Voting is severely skewed toward wealth and tenure—homeowners voted at 58% vs. renters at 36%; settled residents at 68% vs. movers at 40%."),
            ("Tyranny of the Majority", "Critics (Magleby, Citrin) warn that popular votes can roll back minority civil rights and enact unconstitutional or unfunded mandates."),
            ("The Special Interest Buyout", "Billion-dollar corporate lobbies hire professional signature-gathering firms and deluge airwaves, turning citizen democracy into a pay-to-play arena."),
            ("Voter Competence Strain", "Long ballots with 20+ dense technical propositions overwhelm voters, often leading to decisions driven by deceptive 30-second campaign ads.")
        ],
        "When citizens try to evaluate these complex ballot initiatives and candidate debates, who controls the information they consume—and who funds the battle behind the scenes?",
        "LECTURE TALKING POINTS (SLIDE 5):\n"
        "- Explore the Progressive Era origin: Hiram Johnson in California, South Dakota, Oregon. The initiative was supposed to be the ultimate weapon of the common citizen against corporate trusts.\n"
        "- Contrast with modern realities: Elite signature-gathering firms charging $10-$15 per signature. The initiative has become an industry.\n"
        "- Note the 2022 Census voter data: Why do renters vote at barely 36% while homeowners vote at nearly 60%? Discuss how policy favors property owners.\n"
        "- Transition to Slide 6: Information ecosystem and campaign finance."
    )

    # =========================================================================
    # SLIDE 6: THE MEDIA & CAPITAL CHOKEHOLD
    # =========================================================================
    add_puzzle_slide(
        "Dilemma Step 6 // Information & Capital Distortion",
        "Slide 6: The Information & Wealth Chokehold: Media Decay, Corporate Capture & Dark Money",
        "Walking the dilemma: As local news watchdogs wither into social media algorithms, Supreme Court rulings grant corporate capital unprecedented electoral leverage.",
        "The Fragmented Media Landscape",
        [
            ("Death of Local Watchdogs", "Local newspaper circulation fell 11% in a single year; network and cable news audiences are in freefall while digital consumption exceeds 450 min/day."),
            ("Algorithmic Echo Chambers", "Youth overwhelmingly consume political content via TikTok and YouTube (Pew, 2024); nuance is replaced by viral polarization and outrage metrics."),
            ("The Inaccuracy Paradox", "40% of Americans who get news from social media cite inaccuracy as their top concern, yet prioritize speed and entertainment over verification."),
            ("The Accountability Vacuum", "Without beat reporters at city hall or county boards, bureaucratic corruption, corporate tax giveaways, and policy failures escape public view.")
        ],
        "The Privileged Position of Business",
        [
            ("Lindblom's Structural Leverage", "Charles Lindblom: In market economies, businesses control jobs and capital. Governments MUST placate them, giving capital an automatic structural advantage."),
            ("Citizens United & SpeechNow (2010)", "The Supreme Court equated political expenditures with First Amendment speech, eliminating spending limits and spawning Super PACs."),
            ("501(c)(4) Dark Money Floods", "Corporate and billionaire donors pour millions into state legislative and judicial races anonymously through 'social welfare' groups."),
            ("Dahl's Inequality Warning", "Robert Dahl: Extreme disparities in private wealth inevitably corrupt democratic equality, turning government into an auction.")
        ],
        "Given these overwhelming disparities in wealth, media distortion, and structural leverage, which political theory actually explains who governs—and can communities survive?",
        "LECTURE TALKING POINTS (SLIDE 6):\n"
        "- Charles Lindblom's *Politics and Markets*: Business is not just an interest group. If business stops investing, the city/state economy collapses, so politicians preemptively cater to business.\n"
        "- Emphasize the loss of local journalism: When local papers die, local government corruption and borrowing costs rise because nobody is watching city hall.\n"
        "- Explain Citizens United (2010) and dark money (501(c)(4)): Why it matters at the state/local level (buying school board, city council, and state supreme court seats).\n"
        "- Transition to Slide 7: Pluralism vs. Elite Theory, and the ultimate test of Community Sustainability."
    )

    # =========================================================================
    # SLIDE 7: THE VERDICT & SUSTAINABILITY TEST
    # =========================================================================
    add_puzzle_slide(
        "Dilemma Step 7 // The Theoretical Verdict & The Existential Test",
        "Slide 7: Resolving the Dilemma: Pluralism vs. Elite Rule, and the Sustainability Test",
        "Walking the dilemma to its conclusion: How competing theories explain power, and why climate sustainability is the ultimate test of state and local democracy.",
        "The Rival Explanatory Models",
        [
            ("Pluralist Theory (Group Competition)", "Thomas Dye: Policymaking is an open, polycentric struggle where shifting coalitions negotiate and compromise. No single elite permanently controls outcomes."),
            ("Elite Theory (The Power Elite)", "C. Wright Mills & Ralph Miliband: A cohesive corporate, political, and financial oligarchy commands pivotal institutions behind closed doors; citizen votes are symbolic."),
            ("Comparative Structural Insights", "U.S. separation of powers generates broker parties and gridlock; Parliamentary integration of powers enables disciplined mandates and clear accountability."),
            ("The Spectrum Reality", "Neither model is universal: some state/local arenas are captured by economic oligarchies, while others exhibit vibrant, responsive pluralist democracy.")
        ],
        "The Community Sustainability Crucible",
        [
            ("The Sustainability Triad", "The simultaneous balancing of Economic Vitality, Environmental Protection, and Social Equity across local communities."),
            ("Status-Quo Resistance", "Entrenched carbon and industrial interests aggressively fight climate and sustainability policies that impose short-term costs on their bottom line (Porter, 2000)."),
            ("Co-Production of the Future", "Achieving sustainability requires active citizen co-production (energy conservation, watershed protection) and resilient civic networks."),
            ("The Ultimate Generational Stakes", "Global climate change is the supreme test: Will democratic pluralism overcome entrenched elite wealth in time to secure a livable future for our children?")
        ],
        "Will our decentralized democracy empower citizens to enact sustainable adaptations in time, or will entrenched elite wealth protect the status quo at our children's expense?",
        "LECTURE TALKING POINTS (SLIDE 7):\n"
        "- Bring the entire lecture puzzle full circle: Contrast Thomas Dye's Pluralism with C. Wright Mills' Elite Theory. Ask students: 'Which model best describes your state or city?'\n"
        "- Frame sustainability as the ultimate empirical test of American governance: It requires balancing the economic, ecological, and social equity triad against short-term corporate interests.\n"
        "- End with the chapter's poignant warning invoking Greta Thunberg: If status-quo wealth blocks adaptation, we condemn future generations to an unlivable planet. The health of local democracy determines our survival."
    )

    prs.save(output_path)
    print(f"Puzzle-driven presentation saved successfully to: {output_path}")

if __name__ == "__main__":
    build_puzzle_deck()
