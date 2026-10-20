import sys
import pptx
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

def create_deck(output_path="state_and_local_policy_chapter5.pptx"):
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
    ACCENT_GOLD = RGBColor(180, 83, 9)       # Amber 700
    CARD_BG = RGBColor(255, 255, 255)        # Pure White
    CARD_BORDER = RGBColor(203, 213, 225)    # Slate 300
    CALLOUT_BG = RGBColor(241, 245, 249)     # Slate 100

    def add_base_slide(tracker_text, title_text, subtitle_text):
        slide = prs.slides.add_slide(blank_layout)
        
        # Background
        bg_shape = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
        bg_shape.fill.solid()
        bg_shape.fill.fore_color.rgb = BG_COLOR
        bg_shape.line.fill.background()

        # Top Accent Line
        top_line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(0.12))
        top_line.fill.solid()
        top_line.fill.fore_color.rgb = ACCENT_BLUE
        top_line.line.fill.background()

        # Tracker / Badge
        tx_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(11.7), Inches(0.35))
        tf = tx_box.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
        p = tf.paragraphs[0]
        p.text = tracker_text.upper()
        p.font.size = Pt(10)
        p.font.bold = True
        p.font.color.rgb = ACCENT_GOLD
        p.font.name = "Arial"

        # Title
        tx_title = slide.shapes.add_textbox(Inches(0.8), Inches(0.75), Inches(11.7), Inches(0.65))
        tf_title = tx_title.text_frame
        tf_title.word_wrap = True
        tf_title.margin_left = tf_title.margin_right = tf_title.margin_top = tf_title.margin_bottom = 0
        p_title = tf_title.paragraphs[0]
        p_title.text = title_text
        p_title.font.size = Pt(24)
        p_title.font.bold = True
        p_title.font.color.rgb = PRIMARY
        p_title.font.name = "Georgia"

        # Subtitle / Core Takeaway
        tx_sub = slide.shapes.add_textbox(Inches(0.8), Inches(1.4), Inches(11.7), Inches(0.45))
        tf_sub = tx_sub.text_frame
        tf_sub.word_wrap = True
        tf_sub.margin_left = tf_sub.margin_right = tf_sub.margin_top = tf_sub.margin_bottom = 0
        p_sub = tf_sub.paragraphs[0]
        p_sub.text = subtitle_text
        p_sub.font.size = Pt(13)
        p_sub.font.color.rgb = TEXT_MUTED
        p_sub.font.name = "Arial"

        return slide

    def add_card(slide, left, top, width, height, title, items, badge_text=None, border_color=CARD_BORDER):
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        card.fill.solid()
        card.fill.fore_color.rgb = CARD_BG
        card.line.color.rgb = border_color
        card.line.width = Pt(1.5)

        tx_box = slide.shapes.add_textbox(left + Inches(0.25), top + Inches(0.2), width - Inches(0.5), height - Inches(0.4))
        tf = tx_box.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0

        # Card Title
        p_title = tf.paragraphs[0]
        if badge_text:
            p_title.text = f"{badge_text} | {title}"
        else:
            p_title.text = title
        p_title.font.size = Pt(16)
        p_title.font.bold = True
        p_title.font.color.rgb = PRIMARY
        p_title.font.name = "Arial"
        p_title.space_after = Pt(12)

        for bold_lead, body in items:
            p = tf.add_paragraph()
            p.font.size = Pt(12)
            p.font.name = "Arial"
            p.space_after = Pt(8)
            p.font.color.rgb = TEXT_MAIN

            run_bullet = p.add_run()
            run_bullet.text = "• "
            run_bullet.font.bold = True
            run_bullet.font.color.rgb = ACCENT_BLUE

            if bold_lead:
                run_lead = p.add_run()
                run_lead.text = f"{bold_lead}: "
                run_lead.font.bold = True
                run_lead.font.color.rgb = PRIMARY

            run_body = p.add_run()
            run_body.text = body

    # ==========================================
    # SLIDE 1: Foundations & The Actor Landscape
    # ==========================================
    s1 = add_base_slide(
        "State & Local Government // Chapter 5: Policy Processes, Actors & Sustainability",
        "Slide 1: Foundations of State & Local Policymaking",
        "Defining public policy, the stages of interaction, and the dual landscape of institutional vs. non-institutional actors."
    )
    add_card(s1, Inches(0.8), Inches(2.0), Inches(5.6), Inches(4.8), 
             "Core Policy Definitions", [
                 ("Public Policy", "What the government says and does about perceived problems (Ripley & Franklin, 1987)."),
                 ("Policymaking Process", "How government decides actions through continuous interaction among state and non-state actors."),
                 ("The Agenda Funnel", "Problem perception → Issue framing → Getting on the formal docket (Kingdon, 1984) → Government action."),
                 ("Complexity & Federalism", "With 520,000+ elected offices nationwide, U.S. federalism creates an exceptionally decentralized and fragmented arena compared to unitary democracies.")
             ], "FOUNDATION")

    add_card(s1, Inches(6.8), Inches(2.0), Inches(5.7), Inches(4.8), 
             "The Dual Taxonomy of Actors", [
                 ("Institutional Actors", "Governments, agencies, legislatures, executives, and courts with formal constitutional authority (state, county, municipal, special district)."),
                 ("Non-Institutional Actors", "Organized forces independent of government: political parties, interest groups, social movements, NGOs, mass media, and individual citizens."),
                 ("Separation of Powers Impact", "Both federal and state constitutions disperse power across three co-equal branches, multiplying access points and creating potential for gridlock."),
                 ("Decentralized Bargaining", "Unlike centralized systems (U.K., France, Japan), state/local policymaking is heavily influenced by non-state pressure at every stage.")
             ], "TAXONOMY")

    s1.notes_slide.notes_text_frame.text = (
        "LECTURE TALKING POINTS:\n"
        "- Introduce the chapter's conceptual anchor: policy is not just legislation on paper, but what government chooses to do or NOT do (Thomas Dye).\n"
        "- Emphasize Ripley & Franklin's definition: policy is the outcome of interaction between institutional and non-institutional actors.\n"
        "- Point out the staggering scale of American federalism: over 520,000 elected offices across 89,000+ local governments. This makes access abundant but coordination complex."
    )

    # ==============================================================
    # SLIDE 2: Participation Modes: Elite-Directed vs. Elite-Challenging
    # ==============================================================
    s2 = add_base_slide(
        "Civic Engagement Dynamics // Postindustrial Shifts",
        "Slide 2: Political Participation in Postindustrial America",
        "How postwar prosperity and rising education transformed citizen action from top-down mobilization to grassroots protest."
    )
    add_card(s2, Inches(0.8), Inches(2.0), Inches(5.6), Inches(4.8), 
             "Elite-Directed Mode (Top-Down)", [
                 ("Institutional Anchors", "Traditional hierarchical organizations: political parties, bureaucratic agencies, labor unions, and trade associations."),
                 ("Mobilization Pattern", "Mobilizes citizens into pre-established political channels in a coordinated, top-down fashion (Inglehart, 1997)."),
                 ("Focus on Stability", "Relies on regular electoral cycles, formal hearings, and predictable administrative proceedings."),
                 ("Limitations in Postindustrial Era", "Often struggles to respond quickly to single-issue passions or novel technological and environmental threats.")
             ], "TRADITIONAL")

    add_card(s2, Inches(6.8), Inches(2.0), Inches(5.7), Inches(4.8), 
             "Elite-Challenging Mode (Bottom-Up)", [
                 ("Eruption from Below", "Grassroots movements, ad-hoc coalitions, and community activists operating outside conventional party channels."),
                 ("Disruptive Tactics", "Demonstrations, boycotts, sit-ins, and direct actions (e.g., blocking bulldozers, Rothenberg, 1992)."),
                 ("Digital Amplification", "Smartphones and social media provide an instant organizing tool, enabling rapid viral mobilization and dramatic spotlighting."),
                 ("NIMBY & Issue Politics", "'Not In My Backyard' battles (hazardous waste, prison siting, zoning) pitting politicized citizens against administrative 'experts.'")
             ], "UNCONVENTIONAL")

    s2.notes_slide.notes_text_frame.text = (
        "LECTURE TALKING POINTS:\n"
        "- Connect this shift to Ronald Inglehart and Russell Dalton's research on postindustrial society.\n"
        "- Explain why citizens in postindustrial societies challenge elites: higher education, economic security, and rising post-materialist values (environment, civil liberties).\n"
        "- Highlight the tension between technocratic 'experts' (agency scientists, planners) and citizen-driven democratic demands ('eruption from below')."
    )

    # ==============================================================
    # SLIDE 3: Interest Groups & Coalitions in State/Local Politics
    # ==============================================================
    s3 = add_base_slide(
        "Advocacy Infrastructure // Collective Action Dilemmas",
        "Slide 3: Interest Groups & Strategic Coalitions",
        "Examining how grassroots public interest groups navigate resource deficits, collective action barriers, and industry coalitions."
    )
    add_card(s3, Inches(0.8), Inches(2.0), Inches(5.6), Inches(4.8), 
             "The Grassroots Advocacy Dilemma", [
                 ("Mancur Olson's Paradox", "Public interest groups seek collective, non-excludable goods (clean water, civil rights). This creates a severe 'free rider' problem."),
                 ("Resource Asymmetry", "Grassroots NGOs typically rely on unpaid/underpaid staff and volunteers, spending up to 25-50% of their time simply raising funds (Steel, 2015)."),
                 ("Outside Patrons & Foundations", "Reliance on external philanthropic patrons (MacArthur, Kellogg, Gates) to stabilize budgets and bypass dues dependency (Walker, 1983)."),
                 ("Professionalization", "Increasing reliance on hired lobbyists and consultants whose expertise often determines legislative success (McFarland, 1989).")
             ], "RESOURCE PUZZLE")

    add_card(s3, Inches(6.8), Inches(2.0), Inches(5.7), Inches(4.8), 
             "Strategies & Arenas of Influence", [
                 ("Coalitions of Convenience", "Industry associations (ranchers, developers, auto retailers) pool vast resources to form unified fronts against regulation."),
                 ("The Local Efficacy Edge", "Steel's (2015) survey: 68% of civil society groups report high effectiveness with citizens and local/state government, vs. low impact nationally."),
                 ("Inside vs. Outside Lobbying", "Direct legislative consultation and advisory committees (inside) combined with media campaigns and protests (outside)."),
                 ("Historic Policy Triumph", "Tobacco Master Settlement Agreement (1998): 46 state AGs allied with public health advocates to win a $206B settlement from Big Tobacco.")
             ], "TACTICAL PLAYBOOK")

    s3.notes_slide.notes_text_frame.text = (
        "LECTURE TALKING POINTS:\n"
        "- Detail Mancur Olson's Logic of Collective Action: why small, concentrated business groups organize easily (tangible profit) while broad citizen groups struggle (free-rider problem).\n"
        "- Highlight Steel's 2015 empirical data: 'All politics is local' (Tip O'Neill). NGOs report far greater perceived traction at city/county/state level than with federal bureaucracy.\n"
        "- Case study to mention: The 1998 Tobacco MSA as a model of state-level attorneys general collaborating to force corporate accountability."
    )

    # ==============================================================
    # SLIDE 4: Social Movements: Anatomy of Successful Mobilization
    # ==============================================================
    s4 = add_base_slide(
        "Collective Action & Systemic Change // Social Movement Theory",
        "Slide 4: Social Movements: Catalysts for Policy Transformation",
        "Why broad-based social movements succeed or fail in reshaping state and local public institutions."
    )
    add_card(s4, Inches(0.8), Inches(2.0), Inches(5.6), Inches(4.8), 
             "Defining Social Movements", [
                 ("Beyond Single-Issue Groups", "Broad-based efforts to transform societal norms, institutions, and practices grounded in a shared collective identity."),
                 ("Historic & Modern Waves", "Suffrage, Labor Rights, Civil Rights, Environmentalism, LGBTQ+ Equality, Black Lives Matter, and Climate Strikes (Greta Thunberg)."),
                 ("Moral & Emotional Core", "Movements thrive when they tap into deep ethical grievances rather than purely technical policy arguments."),
                 ("State & Local Laboratories", "Policy reforms (women's suffrage, minimum wage hikes, marriage equality) almost always started at the state/local level before federal adoption.")
             ], "IDENTITY & SCOPE")

    add_card(s4, Inches(6.8), Inches(2.0), Inches(5.7), Inches(4.8), 
             "Key Drivers of Movement Success", [
                 ("Dramatic Spotlighting", "Using emotionally gripping visual events to shock public conscience (e.g., seal hunts, Birmingham protests, viral phone video)."),
                 ("Micro-Mobilization", "Building tight local face-to-face cells that are simultaneously linked into statewide and national networks."),
                 ("Efficacy & Solidarity", "Fostering the conviction that individual participation truly matters ('agency'), overcoming apathy and free-riding."),
                 ("No Crosscutting Cleavages", "Maintaining internal cohesion without splintering along partisan, urban/rural, or racial lines; non-divisive, charismatic leadership.")
             ], "THE SUCCESS MATRIX")

    s4.notes_slide.notes_text_frame.text = (
        "LECTURE TALKING POINTS:\n"
        "- Walk through the sociological literature: McCarthy & Zald (Resource Mobilization), Charles Tilly, and Gamson.\n"
        "- Discuss the 9 success factors from the text, focusing especially on dramatic spotlighting in the digital era.\n"
        "- Discuss Greta Thunberg and School Strikes for Climate as a contemporary demonstration of shaming institutional inertia and shifting public discourse."
    )

    # ==============================================================
    # SLIDE 5: Citizen Participation & Direct Democracy
    # ==============================================================
    s5 = add_base_slide(
        "Voter Turnout & Direct Legislation // Electoral Analysis",
        "Slide 5: Citizen Participation & Direct Democracy",
        "Analyzing voting disparities, duty-based vs. engaged citizenship, and the contentious debate over ballot initiatives."
    )
    add_card(s5, Inches(0.8), Inches(2.0), Inches(5.6), Inches(4.8), 
             "Turnout Trends & Disparities (2022 Census)", [
                 ("Midterm Surge", "2022 saw 52.2% voting-age turnout (near historic high) and 69.1% registration, driven by mail-in (31.8%) and early voting (47.1%)."),
                 ("The Participation Divide", "Homeowners (58.1%) vs. Renters (36.5%); Married (61.2%) vs. Single (42.5%); Long-term residents (67.6%) vs. Recent movers (40.5%)."),
                 ("Primary Non-Voting Reasons", "Busy schedules (27%), lack of interest (18%), illness/disability (13%), forgetting/away (16%). Logistical hurdles accounted for <6%."),
                 ("Dual Citizenship Typology", "Russell Dalton: Duty-Based (voting, jury duty, party loyalty) vs. Engaged (community volunteering, boycotts, consumer activism).")
             ], "VOTING DEMOGRAPHICS")

    add_card(s5, Inches(6.8), Inches(2.0), Inches(5.7), Inches(4.8), 
             "Direct Democracy: Initiative, Referendum, Recall", [
                 ("Progressive Era Origins", "Adopted in 24 states (beginning with South Dakota, 1898; Oregon, 1902) to bypass corrupt political machines and railroad trusts."),
                 ("Direct vs. Indirect", "Direct: Citizen petition goes straight to ballot. Indirect: Referred first to legislature; if unpassed, goes to voters. Referendum: Legislature refers measure to public."),
                 ("The Pro-Initiative Case", "Enhances responsiveness, stimulates public debate, increases civic interest, and serves as a vital check on legislative inertia."),
                 ("The Critical Critique", "Voter competence deficits, vulnerability to 'tyranny of the majority,' and co-optation by wealthy special interests running costly signature drives.")
             ], "POPULAR REFORMS")

    s5.notes_slide.notes_text_frame.text = (
        "LECTURE TALKING POINTS:\n"
        "- Highlight the socio-economic bias in voting: stability and wealth (homeownership, marriage, tenure) drastically predict turnout.\n"
        "- Compare the initiative and referendum: Initiative is citizen-initiated; Referendum is legislature-referred.\n"
        "- Discuss California's 2003 Recall of Gray Davis (Enron energy crisis) leading to Arnold Schwarzenegger as a prime real-world case study of direct democracy in action."
    )

    # ==============================================================
    # SLIDE 6: Media Evolution, Corporate Power & Campaign Finance
    # ==============================================================
    s6 = add_base_slide(
        "Media Ecosystem & Political Economy // Power & Wealth",
        "Slide 6: Media Fragmentation, Corporate Dominance & Dark Money",
        "How media consumption has splintered and how corporate wealth exercises a 'privileged position' in American politics."
    )
    add_card(s6, Inches(0.8), Inches(2.0), Inches(5.6), Inches(4.8), 
             "The Fragmented Media Landscape", [
                 ("Traditional News Decline", "Steep drop in daily newspaper circulation (-11%) and network/cable TV news; digital media now averages 450+ minutes/day."),
                 ("Generational Disconnect", "Teens & young adults rely almost exclusively on YouTube, TikTok, and Instagram (Pew, 2024); Facebook usage is sharply dropping among youth."),
                 ("Information Quality vs. Speed", "40% of Americans getting news from social media report inaccuracy as their top concern, yet prioritize convenience."),
                 ("Watchdog Role Endangered", "Shrinking local press corps weakens watchdog oversight over county boards, city halls, and municipal contracts.")
             ], "COMMUNICATIONS")

    add_card(s6, Inches(6.8), Inches(2.0), Inches(5.7), Inches(4.8), 
             "Corporate Power & Dark Money", [
                 ("The 'Privileged Position' of Business", "Charles Lindblom: In market economies, private corporations control investment and jobs, giving them structural leverage over state/local tax and regulatory policy."),
                 ("Citizens United v. FEC (2010)", "Supreme Court equated independent political spending with First Amendment speech, spawning Super PACs and unlimited outside spending."),
                 ("501(c)(4) Dark Money", "Non-profit 'social welfare' groups that spend millions in state and local races without disclosing donors, creating severe transparency crises."),
                 ("Corporate Social Responsibility (CSR)", "Self-regulation and ethical community initiatives exist, but profit-maximization remains the structural imperative.")
             ], "ECONOMIC INFLUENCE")

    s6.notes_slide.notes_text_frame.text = (
        "LECTURE TALKING POINTS:\n"
        "- Emphasize Charles Lindblom's classic thesis: business doesn't lobby as just another interest group; it holds a 'privileged position' because government depends on it for economic survival.\n"
        "- Review Robert Dahl's warning: extreme inequalities in private wealth inevitably translate into political inequality, undermining democratic equality.\n"
        "- Trace the legal arc: Citizens United (2010) + SpeechNow.org (2010) leading to dark money penetration in state legislative and judicial elections."
    )

    # ==============================================================
    # SLIDE 7: Governmental Structures, Policy Models & Sustainability
    # ==============================================================
    s7 = add_base_slide(
        "Comparative Governance & Synthesis // Theoretical Models",
        "Slide 7: Governance Structures, Policy Models & Sustainability",
        "Comparing institutional designs, contrasting Pluralism vs. Elite Theory, and confronting the sustainability imperative."
    )
    add_card(s7, Inches(0.8), Inches(2.0), Inches(5.6), Inches(4.8), 
             "Comparative Structures & Models", [
                 ("Separation vs. Integration of Powers", "U.S. checks & balances create frequent gridlock and candidate-centered broker parties; Parliamentary systems feature integrated executive-legislative discipline and missionary party mandates."),
                 ("Pluralist Model (Group Theory)", "Thomas Dye: Policymaking is a continuous, open bargaining struggle among shifting groups where no single coalition permanently dominates."),
                 ("Elite Theory (The Power Elite)", "C. Wright Mills & Ralph Miliband: A cohesive corporate, political, and military elite commands pivotal institutions behind the scenes; citizen participation is largely symbolic."),
                 ("The Empirical Reality", "U.S. state and local governments exist on a spectrum: some are vibrantly pluralistic, while others are captured by dominant local economic elites.")
             ], "THEORY & STRUCTURE")

    add_card(s7, Inches(6.8), Inches(2.0), Inches(5.7), Inches(4.8), 
             "The Community Sustainability Imperative", [
                 ("The Three Pillars of Sustainability", "The simultaneous balancing of Economic Vitality, Environmental Protection, and Social Equity at the community level."),
                 ("Status Quo Resistance", "Entrenched carbon and commercial interests frequently oppose sustainability mandates that threaten immediate profitability (Porter et al., 2000)."),
                 ("Co-Production of Public Goods", "Sustainability requires active citizen co-production (waste reduction, energy conservation, civic volunteerism) and resilient community networks."),
                 ("The Generational Test", "Will pluralism prevail to enact urgent climate and resource adaptations, or will elite defense of the status quo doom the next generation?")
             ], "THE SUSTAINABILITY TEST")

    s7.notes_slide.notes_text_frame.text = (
        "LECTURE TALKING POINTS:\n"
        "- Synthesize the chapter's comparative analysis: contrast U.S. separation of powers (gridlock-prone) with parliamentary integration of powers (accountable, party discipline).\n"
        "- Debate Pluralism vs. Elite Theory: Ask students which model best describes their hometown or state government.\n"
        "- Conclude on Sustainability: Moving from market globalization to climate adaptation. Reiterate that achieving sustainable communities requires bridging the gap between grassroots citizen demand and institutional policy action."
    )

    # Save presentation
    prs.save(output_path)
    print(f"Presentation saved successfully to: {output_path}")

if __name__ == "__main__":
    create_deck()
