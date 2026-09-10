// DIY Skills Builder - Sections 5 to 8 Data
window.diyData_part2 = [
  {
    id: 5,
    title: "Major and Minor Exterior Repairs",
    subtitle: "Defending the Envelope Against the Elements",
    icon: "fa-shield-halved",
    intro: "The exterior building envelope protects your home from wind, rain, snow, UV solar degradation, and temperature swings. Regular exterior upkeep prevents devastating water leaks and preserves structural framing.",
    prep40: [
      "Ladder safety audit: Use a 4:1 slope ratio for extension ladders; tie off top rungs and level feet on firm, solid ground.",
      "Weather window planning: Schedule roofing, siding, and blacktop work during dry weather with temperatures above 50°F (10°C) for proper sealant cure.",
      "Fall protection PPE: Wear a secure roofing safety harness with rope-grab tether when working on roofs steeper than 4/12 pitch.",
      "Root cause drainage check: Inspect roof runoff, gutter slopes, and soil grade before attempting foundation repairs."
    ],
    tech30: {
      beginner: "Clearing gutters and downspout clogs; sealing siding joints with exterior elastomeric caulk; patching small driveway asphalt cracks.",
      intermediate: "Replacing wind-damaged asphalt shingles; resloping aluminum gutters; splicing rotted window sills with epoxy; rebuilding sagging wooden gates.",
      expert: "Soldering copper step flashing around chimneys; replacing broken slate tiles with slate rippers; replacing rotted 4x4 fence posts in concrete."
    },
    risk30: {
      projects: "Gutter installation, deck construction, garage door opener repair, window sill restoration, asphalt driveway sealing.",
      risks: "Severe fall injuries from roofs or ladders; high-tension garage door spring hazards; structural rot if flashings leak.",
      callPro: "Torsion spring replacement on overhead garage doors; complete steep-slope re-roofing; structural chimney rebuilds."
    },
    tasks: [
      {
        id: "s5_t1",
        title: "Exterior Maintenance",
        difficulty: "Beginner",
        timeEst: "2-3 Hours",
        tools: "Binoculars, ladder, flashlight, garden hose, notepad",
        overview: "A semiannual exterior walkaround identifies cracked caulking, lifted shingles, peeling paint, and gutter overflow before water infiltrates the framing.",
        technique: "Walk the perimeter with binoculars to inspect chimney mortar joints and ridge shingles from the ground. Check window sills for wood rot by probing with an awl. Verify ground grade slopes away from the foundation at least 6 inches over the first 10 feet.",
        proTip: "Conduct an exterior inspection during a heavy rainstorm with an umbrella; you will instantly spot overflowing gutters, dripping soffits, and pooling water against foundation walls.",
        ytQuery: "https://www.youtube.com/results?search_query=seasonal+home+exterior+maintenance+checklist"
      },
      {
        id: "s5_t2",
        title: "Roof Repairs",
        difficulty: "Intermediate",
        timeEst: "2-3 Hours",
        tools: "Roofing safety harness, pry bar, asphalt roof cement, trowel, caulking gun, tin snips",
        overview: "Locating and repairing minor roof leaks prevents catastrophic ceiling collapses, ruined attic insulation, and hidden rot.",
        technique: "Remember that roof leaks rarely drip straight down; water enters a defect, runs along rafters, and drips far from the entry hole. Inspect roof valleys, vent pipe boots, and chimney flashings first. Seal small nail holes with roofing cement troweled under shingle tabs.",
        proTip: "Enter the attic on a sunny day with flashlight off; look for daylight pinholes coming through roof sheathing to pinpoint exact leak locations.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+find+and+fix+roof+leaks+this+old+house"
      },
      {
        id: "s5_t3",
        title: "Asphalt Shingles",
        difficulty: "Intermediate",
        timeEst: "2 Hours",
        tools: "Flat pry bar, replacement architectural shingles, roofing cement, 1-1/4\" galvanized roofing nails",
        overview: "Replacing wind-torn or hail-damaged asphalt shingles restores weatherproof shingle overlaps and preserves attic dryness.",
        technique: "Gently break the tar adhesive seal under the damaged shingle and the shingle row above it with a flat pry bar. Carefully pry out the roofing nails holding the broken shingle. Slide in the replacement shingle, drive 4 new roofing nails just below the sealant strip, and dab roofing cement over nail heads.",
        proTip: "Never attempt shingle repairs on freezing cold days; cold shingles are brittle and will crack when lifted. Warm them gently or work on warm sunny afternoons.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+replace+damaged+asphalt+shingles"
      },
      {
        id: "s5_t4",
        title: "Slate Shingles",
        difficulty: "Advanced",
        timeEst: "2-3 Hours",
        tools: "Slate ripper tool, slate hammer, copper roofing nails, copper slate hooks / bibs, replacement slate",
        overview: "Slate roofs can last over a century, but individual slates can crack under falling limbs. Replacing slates requires specialized extraction tools.",
        technique: "Slide a slate ripper up under the cracked slate to hook and cut the hidden copper nails with a downward hammer blow. Slide out the broken slate. Nail a replacement slate in place through the gap, or secure it using a bent copper slate hook driven into roof decking between lower courses.",
        proTip: "Never walk directly on slate tiles; build a hook-and-cleat roof chicken ladder that hangs securely over the roof ridge to distribute your weight across multiple courses.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+repair+slate+roof+tiles+slate+ripper"
      },
      {
        id: "s5_t5",
        title: "Flat Roof",
        difficulty: "Intermediate",
        timeEst: "2-4 Hours",
        tools: "Rubber membrane patch (EPDM/TPO), fiberglass roof mesh, elastomeric roof coating, utility knife, seam roller",
        overview: "Low-slope and flat roofs suffer from standing water (ponding) and seam separation. Proper elastomeric patching stops leaks permanently.",
        technique: "Scrape away gravel, dirt, and peeling coatings to expose bare membrane. For modified bitumen roofs, cut out blistered bubbles in an 'X', dry the substrate completely, fold back flaps, apply asphalt mastic with fiberglass mesh, press flat, and seal over with a three-course patch.",
        proTip: "Clean the rubber membrane with acetone before applying EPDM primer and peel-and-stick seam tape; contaminated surfaces guarantee adhesive failure under standing water.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+repair+flat+roof+leaks+epdm+coating"
      },
      {
        id: "s5_t6",
        title: "Gutters and Downspouts",
        difficulty: "Beginner",
        timeEst: "1-2 Hours",
        tools: "Ladder standoff, gutter scoop, garden hose with spray nozzle, plumber's snake, gloves",
        overview: "Clogged gutters cause water to spill behind fascia boards, rotting eaves and saturating basement perimeter foundations.",
        technique: "Clear debris starting at the downspout and working toward the high end using a plastic gutter scoop. Flush gutters with a hose to verify drainage. If downspouts are clogged, snake them from the top with a garden hose or plumber's snake, or unscrew the elbow to remove accumulated leaf plugs.",
        proTip: "Install ladder standoffs (stabilizer arms) on your extension ladder; they span window openings and rest on the roof sheathing without crushing fragile aluminum gutters.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+clean+unclog+gutters+downspouts+safely"
      },
      {
        id: "s5_t7",
        title: "Installing New Gutters",
        difficulty: "Intermediate",
        timeEst: "4-6 Hours",
        tools: "Seamless or sectional gutter channels, hidden screw hangers, drop outlets, chalk line, level, drill/driver",
        overview: "Properly sloped gutters channel thousands of gallons of rainwater away from home foundations, preventing basement flooding.",
        technique: "Snap a chalk line along the fascia board sloping downward toward the downspout at 1/4-inch per 10 feet of run. Fasten gutters using hidden screw hangers spaced every 24 inches, driving 3-inch screws through the fascia into rafter tails. Seal all joints with specialized gutter lap sealant.",
        proTip: "Use dedicated tri-polymer gutter lap sealant rather than standard silicone; silicone peels away from aluminum under thermal expansion and standing water.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+install+gutters+and+downspouts+this+old+house"
      },
      {
        id: "s5_t8",
        title: "Roof Drainage Devices",
        difficulty: "Beginner",
        timeEst: "1 Hour",
        tools: "Splash blocks, roll-out downspout diverters, corrugated drain pipe, trench shovel",
        overview: "Discharging rainwater too close to exterior walls leads directly to wet basements and foundation settling. Drainage devices move water far away.",
        technique: "Install heavy concrete or plastic splash blocks beneath downspout elbows. Connect flexible 4-inch corrugated pipe or PVC pipe to carry storm runoff at least 6 to 10 feet away from the foundation into a pop-up emitter or rain garden.",
        proTip: "Never tie downspouts into your home's perimeter foundation weeping tile unless specifically engineered; downspout volume during a storm can overwhelm tiles and flood the basement.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+extend+downspouts+away+from+foundation"
      },
      {
        id: "s5_t9",
        title: "Chimneys",
        difficulty: "Intermediate",
        timeEst: "2-3 Hours",
        tools: "Wire brush, mortar mix (Type N), pointing trowel, stainless steel chimney cap, masonry sealer",
        overview: "Chimneys endure harsh freeze-thaw cycles. Loose mortar joints and cracked concrete crowns allow water to leak behind fireplace fireboxes.",
        technique: "Inspect the concrete chimney crown at the top; seal spiderweb cracks with flexible elastomeric crown sealant. Install a stainless steel mesh chimney cap with spark arrestor to prevent rain entry and keep squirrels and birds out. Rake loose brick mortar and repoint.",
        proTip: "Install a chimney cap that clamps securely to the clay flue tile with stainless steel set screws; open chimneys allow dozens of gallons of rain directly into your living room fireplace flue.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+repair+chimney+crown+and+mortar+this+old+house"
      },
      {
        id: "s5_t10",
        title: "Flashing Valley and Dormers",
        difficulty: "Advanced",
        timeEst: "3-4 Hours",
        tools: "Sheet metal brake, galvanized/copper step flashing, angle grinder with masonry diamond blade, polyurethane sealant",
        overview: "Roof valleys and dormer sidewall intersections are the most common points of catastrophic roof leaks if flashings are omitted or corroded.",
        technique: "Install 'W'-shaped valley metal in roof valleys over ice-and-water shield membrane. On dormer sidewalls, weave individual L-shaped step flashing tins between every course of shingles, bending up 4 inches against the wall framing behind the siding.",
        proTip: "Never nail through step flashing into both the roof deck and wall framing simultaneously; temperature expansion between roof and wall will tear the flashing tin apart.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+install+step+flashing+dormer+roof"
      },
      {
        id: "s5_t11",
        title: "How to Make a Roof Deck",
        difficulty: "Advanced",
        timeEst: "2-3 Days",
        tools: "Structural timber, pedestal paver system or sleeper joists, rubber membrane, deck screws, level",
        overview: "A rooftop deck expands living space but requires careful engineering to ensure the roof membrane underneath is never punctured.",
        technique: "Install a heavy continuous EPDM or PVC roof membrane. Instead of nailing joists into the roof, use floating adjustable pedestal supports or treated sleeper joists resting on sacrificial rubber protection pads. Lay composite or cedar decking with hidden fasteners.",
        proTip: "Ensure the roof deck framing below has adequate structural load capacity (at least 55-60 lbs per sq ft live load) before building an elevated deck.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+build+a+rooftop+deck+pedestal+system"
      },
      {
        id: "s5_t12",
        title: "Repairing Damaged Clapboard",
        difficulty: "Intermediate",
        timeEst: "2 Hours",
        tools: "Hacksaw blade, pry bar, replacement cedar clapboard, 6d galvanized siding nails, primer",
        overview: "Cracked or rotted wood siding boards allow rainwater into the wall cavity. Splicing damaged sections preserves siding appearance and protection.",
        technique: "Slide a hacksaw blade under the damaged board to sever hidden nails. Wedge wooden shims under the board above to relieve tension. Cut out the damaged section with a backsaw, prime all six sides of the replacement cedar clapboard, slide into place, and nail just above the overlap.",
        proTip: "Always back-prime (paint the back and ends) of all exterior wood siding before installation; unprimed wood backs absorb moisture from inside the wall, causing face paint to blister.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+replace+damaged+wood+siding+clapboard"
      },
      {
        id: "s5_t13",
        title: "Repairing Damaged Siding Shingles",
        difficulty: "Intermediate",
        timeEst: "1-2 Hours",
        tools: "Flat pry bar, cedar shingle ripper, replacement cedar shakes/shingles, galvanized shingle nails",
        overview: "Cedar wall shingles crack from weathering and sun exposure. Individual shakes can be extracted and replaced without dismantling the wall.",
        technique: "Use a sharp chisel to split the broken shingle into narrow vertical splinters, then pull them out. Cut the concealed nails with a slate/shingle ripper. Slide a new shingle up into the slot until flush with adjacent reveals, then fasten with small casing nails driven at an angle just under the butt of the course above.",
        proTip: "Leave a 1/8-inch expansion gap between adjacent cedar siding shingles; shingles swell when wet, and tight joints will buckle outward.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+replace+broken+cedar+siding+shingles"
      },
      {
        id: "s5_t14",
        title: "Caulking",
        difficulty: "Beginner",
        timeEst: "1 Hour",
        tools: "Smooth-rod dripless caulk gun, exterior elastomeric or polyurethane caulk, painter's tape, caulk scraper",
        overview: "Quality caulking around exterior window frames, door trim, and siding corners keeps driving rain out of building wall envelopes.",
        technique: "Cut the caulk tube nozzle at a 45-degree angle to produce an opening matching the joint width. PUSH the caulk gun forward along the joint rather than pulling it; pushing forces sealant deep into the gap. Smooth the bead immediately with a gloved finger or damp caulk tool.",
        proTip: "Use foam backer rod in any joint deeper than 1/2 inch before caulking; caulk must bond only to the two opposing side walls ('two-point adhesion') to stretch and contract without tearing.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+caulk+exterior+windows+and+siding+like+a+pro"
      },
      {
        id: "s5_t15",
        title: "Repairing Rotted Window Sills",
        difficulty: "Intermediate",
        timeEst: "2-3 Hours",
        tools: "Chisel, wire brush, 2-part liquid epoxy consolidant, epoxy wood filler, putty knife, sander",
        overview: "Standing water rots exterior wood window sills. High-tech structural wood epoxies repair the rot without requiring complete window frame removal.",
        technique: "Chisel away all spongy, rotted wood fibers down to sound wood. Drill small holes into surrounding sound timber and soak with liquid epoxy consolidant to petrify loose fibers. Pack the cavity with 2-part epoxy paste wood filler, sculpt flush to the sill angle, sand smooth, and prime.",
        proTip: "Epoxy cures rock hard and does not shrink like standard water-based wood fillers. Shape it close to the sill's profile while still leathery to minimize arduous sanding later.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+repair+rotted+window+sill+with+epoxy"
      },
      {
        id: "s5_t16",
        title: "Waterproofing Basement Walls",
        difficulty: "Intermediate",
        timeEst: "3-5 Hours",
        tools: "Wire brush, hydraulic cement, masonry waterproofing paint (Drylok), heavy masonry brush, fan",
        overview: "Damp exterior-grade masonry coatings stop moisture vapor transmission and light seepage through concrete foundation walls.",
        technique: "Scrape off all efflorescence (white mineral powder) and old flaking paint with a stiff wire brush. Chisel open wall-to-floor joint cracks into an inverted-V and pack with fast-setting hydraulic cement. Apply two heavy coats of masonry waterproofing paint, working the paint deep into pinholes.",
        proTip: "Masonry waterproofing paint must be scrubbed aggressively into porous concrete pores with a coarse-bristle brush; rolling leaves microscopic pinholes that allow moisture to seep through.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+waterproof+interior+basement+walls"
      },
      {
        id: "s5_t17",
        title: "Repairing a Gate",
        difficulty: "Beginner",
        timeEst: "1-2 Hours",
        tools: "Anti-sag turnbuckle cable kit, heavy strap hinges, cordless drill, 3\" exterior deck screws",
        overview: "Wooden backyard gates frequently sag and drag on the latch post due to gravity and wood frame movement.",
        technique: "Install a diagonal wooden brace extending from the bottom hinge corner upward to the top latch corner (carrying weight in compression). Alternatively, install a steel turnbuckle cable kit running from top hinge to bottom latch corner (in tension) and tighten the turnbuckle to lift the gate.",
        proTip: "Remember the golden rule of gate diagonal braces: a wood brace pushes up from the bottom hinge; a steel cable pulls up from the top hinge.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+fix+a+sagging+wooden+gate+this+old+house"
      },
      {
        id: "s5_t18",
        title: "Repairing Fence Posts",
        difficulty: "Intermediate",
        timeEst: "2-3 Hours",
        tools: "Steel post repair spur (EZ Mender), sledgehammer, drill, structural screws, shovel, level",
        overview: "Wooden 4x4 fence posts rot at ground level where moisture collects at the concrete collar. Steel repair brackets restore post rigidity.",
        technique: "Drive a heavy-gauge steel repair bracket between the rotted wooden post and the concrete footing using a sledgehammer until the lower blade penetrates below the rot. Drive 3-inch structural screws through bracket holes into solid post timber above ground.",
        proTip: "When setting new fence posts, never encase the bottom of the post in a cup of concrete; set the post on 6 inches of crushed gravel first so water drains away from the end grain.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+fix+a+rotted+fence+post+steel+bracket"
      },
      {
        id: "s5_t19",
        title: "Repairing a Wood Fence",
        difficulty: "Beginner",
        timeEst: "2 Hours",
        tools: "Replacement pickets, galvanized exterior nails/screws, circular saw, tape measure, level",
        overview: "Replacing warped pickets and reinforcing sagging horizontal 2x4 stringers extends the lifespan of wooden privacy fences.",
        technique: "Pry off cracked pickets with a flat bar. Sister a fresh 2x4 alongside sagging rails or reinforce with metal fence brackets screwed into posts. Install replacement pickets with a 2-inch ground clearance to prevent bottom moisture wicking.",
        proTip: "Keep fence pickets at least 2 inches off the grass or dirt; touching soil wicks ground moisture directly into the wood end grain, rotting the fence within 3 to 5 years.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+repair+a+wooden+privacy+fence"
      },
      {
        id: "s5_t20",
        title: "Hinge-Type Garage Doors",
        difficulty: "Intermediate",
        timeEst: "2 Hours",
        tools: "Heavy strap hinges, cane bolt, carriage bolts, wood preservative, level, drill",
        overview: "Carriage house hinge-type swinging garage doors require heavy hardware reinforcement to prevent sagging under their immense width and weight.",
        technique: "Install three heavy-duty 24-inch wrought-iron strap hinges per door leaf, through-bolted with carriage bolts and backer plates. Install a bottom cane bolt to drop into a drilled hole in the concrete slab, locking the stationary leaf rigidly in place.",
        proTip: "Use ball-bearing strap hinges for heavy carriage doors; standard non-bearing pivot pins wear quickly under 150+ lb cantilevered door loads, causing bottom dragging.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+build+and+hang+carriage+garage+doors"
      },
      {
        id: "s5_t21",
        title: "Overhead Garage Doors",
        difficulty: "Intermediate",
        timeEst: "2 Hours",
        tools: "Nylon ball-bearing rollers, garage door track lubricant (non-silicone), wrench set, level",
        overview: "Overhead sectional garage doors run on tracks via rollers. Replacing squealing metal rollers with sealed nylon ones silences operation.",
        technique: "Inspect vertical tracks for plumb and square. Replace noisy steel rollers one hinge bracket at a time while the door is down. Spray torsion springs, rollers, and hinge pivots with specialized foaming garage door lubricant.",
        proTip: "DANGER: Never loosen or remove the bottom corner roller brackets on an overhead garage door; they are anchored directly to high-tension lift cables under lethal spring tension.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+tune+up+overhead+garage+door+rollers"
      },
      {
        id: "s5_t22",
        title: "Electric Garage-Door Opener",
        difficulty: "Intermediate",
        timeEst: "1-2 Hours",
        tools: "Screwdrivers, step ladder, 2x4 scrap block, tape measure, contact cleaner",
        overview: "Modern garage openers include safety infrared sensors and force adjustment screws that ensure safe closing without crushing objects.",
        technique: "Align infrared safety photo-eye sensors until indicator LEDs glow solid green/amber without flickering. Perform the safety reversal test: place a 2x4 block flat under the door path; the door must automatically reverse immediately upon striking the wood. Adjust down-force knobs if needed.",
        proTip: "If your garage door opener motor hums and then stops, check the nylon drive gear inside the motor housing; plastic drive gears wear out after 10-15 years and can be replaced for under $20.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+troubleshoot+garage+door+opener+safety+reversal"
      },
      {
        id: "s5_t23",
        title: "Patching a Blacktop Driveway",
        difficulty: "Beginner",
        timeEst: "2 Hours",
        tools: "Cold-patch asphalt, hand tamper (8x8 steel), asphalt crack filler, wire broom, torch/heat gun",
        overview: "Filling potholes and sealing spiderweb cracks in asphalt driveways stops winter water penetration that causes frost heave and disintegration.",
        technique: "Sweep dirt and organic weeds from potholes using a wire broom. Fill potholes deeper than 2 inches with crushed gravel, compact, then fill with cold-patch asphalt in 1-inch layers, mounding slightly above the surrounding grade. Compact thoroughly using a heavy steel hand tamper.",
        proTip: "Lay a piece of plywood or heavy cardboard over newly tamped cold patch asphalt and drive your car back and forth over it slowly; the immense vehicular weight compresses the patch rock-hard.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+patch+asphalt+driveway+potholes+cracks"
      }
    ]
  },
  {
    id: 6,
    title: "Furniture: How to Repair and Restore It",
    subtitle: "Reviving Heirlooms, Joinery, and Upholstery",
    icon: "fa-couch",
    intro: "Quality wooden furniture lasts for generations when maintained. Repairing wobbly chairs, gluing veneers, fixing warped tops, and reupholstering preserves sentimental and monetary value.",
    prep40: [
      "Hardware and provenance check: Inspect piece for maker marks, joinery type (dovetails, dowels), and antique value before stripping finishes.",
      "Gentle disassembly protocol: Label joints with chalk, use rubber mallets, and never force stubborn glued tenons without softening old hide glue with heat/alcohol.",
      "Clamping dry-run: Always rehearse the entire clamp layout with pads in place before applying glue; furniture glue-ups can be chaotic under open-time pressure.",
      "Ventilation for upholstery adhesives: Work outdoors or in cross-ventilated spaces when applying spray foam adhesive and solvent finishes."
    ],
    tech30: {
      beginner: "Tightening wobbly dining chair legs with expanding wood glue; spot cleaning upholstery stains; touching up scratches with wax fill sticks.",
      intermediate: "Re-gluing loose mortise-and-tenon joints; re-caning chair seats with pre-woven cane webbing; cutting and shaping new high-density foam cushions.",
      expert: "Weaving traditional six-way hand-tied coil springs; steam-flattening severely cupped solid wood table leaves; French polishing shellac."
    },
    risk30: {
      projects: "Dining chair regluing, cushion upholstery, antique table refinishing, cane seating replacement.",
      risks: "Ruining valuable antique patina with harsh chemical strippers; clamping dents in soft mahogany/walnut.",
      callPro: "Priceless museum-grade antique furniture conservation or structural re-carving of broken cabriole legs."
    },
    tasks: [
      {
        id: "s6_t1",
        title: "Cleaning and Care of Fabrics",
        difficulty: "Beginner",
        timeEst: "1 Hour",
        tools: "Upholstery cleaner, microfiber cloths, vacuum with brush attachment, enzyme spray",
        overview: "Proper fabric maintenance removes ground-in body oils and dirt before soil fibers degrade upholstery weaving.",
        technique: "Check the upholstery cleaning code label under cushions (W = water-based cleaner, S = solvent-only cleaner, WS = either, X = vacuum only). Always test solvent cleaners on an inconspicuous skirt corner. Blot stains gently from outside toward the center—never rub vigorously.",
        proTip: "Never scrub fabric aggressively when treating spots; rubbing distorts the pile and frays fabric yarns, creating a permanent fuzzy halo even after the stain is removed.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+clean+upholstery+cleaning+codes+diy"
      },
      {
        id: "s6_t2",
        title: "Wood Repair",
        difficulty: "Intermediate",
        timeEst: "2 Hours",
        tools: "Wax fill sticks, burn-in knives, furniture touch-up markers, wood glue, bar clamps",
        overview: "Addressing gouges, deep scratches, pet bites, and split legs restores wood beauty without requiring a full piece refinishing.",
        technique: "Fill deep scratches using colored wax burn-in sticks matched to the furniture stain. For split chair rungs, open the split gently, work PVA or liquid hide glue deep into the crack with dental floss, clamp securely with rubber surgical tubing, and wipe squeeze-out with a damp rag.",
        proTip: "Rub the meat of an ordinary walnut kernel over light surface scratches on dark walnut or mahogany wood; the natural oils and pigments darken the scratch to match surrounding wood instantly.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+repair+scratches+and+gouges+in+wood+furniture"
      },
      {
        id: "s6_t3",
        title: "Laminated Wood (Veneers)",
        difficulty: "Intermediate",
        timeEst: "2 Hours",
        tools: "Iron, clean cotton cloth, utility knife, liquid hide glue or wood glue, veneer roller, parchment paper",
        overview: "Blistered, lifted, or chipped veneer edges can be glued flat again seamlessly using heat or targeted adhesive injection.",
        technique: "For blistered veneer, make a tiny razor slit along the wood grain through the bubble, inject wood glue or hide glue using a glue syringe, press flat with a roller, place wax paper and a flat scrap block on top, and clamp firmly for 4 hours.",
        proTip: "Antique furniture veneers were adhered with hide glue; placing a damp towel and hot clothes iron over a veneer bubble will often reactivate the original dried hide glue, sticking it flat without adding new glue.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+repair+lifted+and+bubbled+wood+veneer"
      },
      {
        id: "s6_t4",
        title: "Structural and Functional Problems",
        difficulty: "Intermediate",
        timeEst: "2-3 Hours",
        tools: "Corner brackets, hardwood dowels, pocket hole jig, paraffin wax, drill, clamps",
        overview: "Sticking drawer runners, racking cabinets, and cracked table stretchers compromise furniture utility if not mechanically reinforced.",
        technique: "Reinforce loose carcass corners by gluing hardwood corner blocks with screws into both side and face frames. Lubricate sticking wooden drawer runners by rubbing them thoroughly with paraffin canning wax.",
        proTip: "Never spray silicone lubricant or oil on wooden drawer slides; oils soak into bare wood grain, attracting dust into a sticky paste and ruining future refinishing.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+fix+wobbly+furniture+and+sticking+drawers"
      },
      {
        id: "s6_t5",
        title: "Warped Wood",
        difficulty: "Advanced",
        timeEst: "3-5 Hours",
        tools: "Steam iron, damp heavy towels, heavy weights / bar clamps, straightedge",
        overview: "Solid wood table leaves cup when one side loses or gains moisture faster than the other. Controlled moisture and pressure can straighten bowed panels.",
        technique: "Place the warped panel concave-side-down over damp heavy towels on a flat concrete floor or bench in a warm room. Place heavy weights on the crown of the bow. Inspect hourly as moisture swells the concave fibers, removing weights as soon as the panel flattens.",
        proTip: "Once a warped wood tabletop is flattened, immediately seal the unfinished underside with shellac or lacquer to match the top face, preventing uneven seasonal moisture transfer.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+flatten+a+warped+board+or+tabletop"
      },
      {
        id: "s6_t6",
        title: "Upholstering",
        difficulty: "Intermediate",
        timeEst: "3-4 Hours",
        tools: "Pneumatic or heavy manual staple gun, 3/8\" staples, tack puller, upholstery fabric, polyester batting",
        overview: "Reupholstering dining chairs or vanity stools gives outdated furniture an instant, vibrant design transformation.",
        technique: "Remove old tacks and fabric with an upholstery tack puller. Wrap high-density foam cushion with polyester batting to soften edges. Center the new fabric over the seat, pull taut, and tack one staple in the center of each of the four sides. Work toward the corners, folding neat hospital corners.",
        proTip: "When stapling upholstery fabric, pull with consistent, firm tension from opposite sides; pulling unevenly pulls woven patterns crooked across the cushion face.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+reupholster+a+chair+seat+beginner+guide"
      },
      {
        id: "s6_t7",
        title: "Making Cushions",
        difficulty: "Intermediate",
        timeEst: "2-3 Hours",
        tools: "Electric carving knife, high-density upholstery foam (2.5+ lb density), Dacron batting, spray adhesive",
        overview: "Sagging, lumpy sofa and chair cushions ruin comfort. Cutting custom high-resilience foam inserts restores firm seating support.",
        technique: "Use an electric kitchen carving knife to slice thick high-density upholstery foam smoothly in a single pass without jagged tears. Spray foam faces with mist adhesive, wrap with a layer of Dacron polyester batting, and stuff into cushion covers using a plastic wrap vacuum-collapse trick.",
        proTip: "To insert a bulky foam cushion into a snug zippered fabric cover easily, wrap the foam in thin dry-cleaning plastic and vacuum the air out with a shop vac to compress it to 1/3 size, slide it in, and release the vacuum.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+cut+and+make+cushions+electric+knife"
      },
      {
        id: "s6_t8",
        title: "Cane Seating",
        difficulty: "Intermediate",
        timeEst: "2-3 Hours",
        tools: "Pre-woven sheet cane, spline wedge chisels, wooden caning wedges, reed spline, glue",
        overview: "Sheet cane seating is held into a routed perimeter groove by a wooden reed spline, providing airy, flexible comfort on classic bentwood chairs.",
        technique: "Soften the cane webbing and reed spline by soaking in warm water for 30 minutes to make it pliable. Lay sheet cane over the seat frame, drive the cane into the groove with wooden wedges, trim excess cane fringe along the outer edge with a chisel, run glue into groove, and tap the spline home.",
        proTip: "Sheet cane expands when wet and shrinks taut as a drumhead as it dries over 24 hours; do not pull it overly tight while soaking wet or it will split the seat frame when drying.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+replace+sheet+cane+in+a+chair+seat"
      },
      {
        id: "s6_t9",
        title: "Recaning a Chair",
        difficulty: "Advanced",
        timeEst: "6-8 Hours",
        tools: "Strand cane coils, caning pegs, awl, bucket of water, glycerine, damp towel",
        overview: "Traditional hole-to-hole 7-step hand caning is an ancient artisan craft that weaves intricate octagonal mesh through perimeter holes.",
        technique: "Soak strand cane in water with a drop of glycerine. Weave the 7 traditional stages: vertical strands down, horizontal across, vertical again, horizontal woven under/over, first diagonal, second diagonal, and perimeter binder cord secured with fine cane loops.",
        proTip: "Keep caning pegs inserted in working holes to maintain tension on previous runs, and constantly wipe working strands with a damp sponge to keep fibers flexible.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+hand+cane+a+chair+7+step+method"
      },
      {
        id: "s6_t10",
        title: "Kitchen and Dining Room Chairs",
        difficulty: "Intermediate",
        timeEst: "2 Hours",
        tools: "Dead-blow rubber mallet, liquid hide glue or polyurethane glue, ratchet strap clamps, clean rags",
        overview: "Dining chairs endure immense leverage force from leaning. Re-gluing loose rung joints restores wobble-free structural safety.",
        technique: "Tap joints apart gently with a dead-blow mallet. Scrape away old rock-hard glue down to bare wood (new glue will not bond to old glue). Reassemble with fresh glue, using a nylon ratchet strap clamp wrapped around all four legs to exert uniform, square clamping pressure.",
        proTip: "Use liquid hide glue (such as Titebond Liquid Hide Glue) for chair repairs; it has a long open time, cleans up with water, and can be easily disassembled for future repairs without destroying wood.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+fix+and+reglue+wobbly+dining+chairs"
      },
      {
        id: "s6_t11",
        title: "Dining Room Furniture",
        difficulty: "Intermediate",
        timeEst: "3-4 Hours",
        tools: "Equalizer slide lubricant, table leaf locks, mineral spirits, paste wax, 0000 steel wool",
        overview: "Extending dining tables frequently jam on wooden slide gears or develop misaligned leaf dowel pins.",
        technique: "Clean dirt and old gummed wax out of table extension slide gears with mineral spirits. Lubricate gears with paraffin wax or bar soap. Check table leaf alignment pins; replace broken wood pins with brass alignment sleeves and install underside leaf locks to draw sections tight.",
        proTip: "Store spare dining table leaves flat on their edges in an air-conditioned room or closet inside the house; storing them in a damp basement or hot attic guarantees they will warp and never fit the table again.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+repair+extendable+dining+table+slides"
      },
      {
        id: "s6_t12",
        title: "Patio, Lawn, and Den Chairs",
        difficulty: "Beginner",
        timeEst: "2 Hours",
        tools: "Rust-reforming primer, exterior enamel spray, vinyl strapping or nylon webbing, stainless hardware",
        overview: "Weathered wrought-iron, aluminum, and teak outdoor furniture requires corrosion defense and new webbing to withstand sun and rain.",
        technique: "Wire-brush flaking rust on iron patio chairs down to bare metal, apply rust-inhibiting primer, and finish with two coats of UV-resistant exterior enamel. For vinyl strap patio chairs, boil vinyl straps in water to stretch them over frame rivet tabs easily.",
        proTip: "Submerge vinyl patio straps in a pot of near-boiling water for 5 minutes before installation; the heated vinyl stretches effortlessly over aluminum frame pegs and cools to a drum-tight fit.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+restore+metal+patio+furniture+and+straps"
      }
    ]
  },
  {
    id: 7,
    title: "Plumbing: How to Keep It in Working Order",
    subtitle: "Fluid Dynamics, Pressure Systems, and Water Defense",
    icon: "fa-faucet-drip",
    intro: "Plumbing combines supply pressure, drainage hydraulics, and venting. Water damage is unforgiving, but following strict codes and mechanical principles ensures leak-free systems.",
    prep40: [
      "Emergency shutoff mastery: Locate the main street shutoff curb stop and interior meter valve before picking up a wrench.",
      "Pressure relief and catchment: Turn off water heater, shut branch valves, open lowest faucet to drain lines, and stage buckets and shop vac.",
      "Ventilation & fire safety: Use heat shields and keep a charged fire extinguisher nearby when soldering copper tubing with open flames.",
      "Thread compound protocol: Apply Teflon tape clockwise (minimum 3 wraps) plus pipe dope on all threaded joints; never tape compression fittings."
    ],
    tech30: {
      beginner: "Clearing hair clogs from sink P-traps; replacing toilet flappers and fill valves; swapping showerheads and faucet aerators.",
      intermediate: "Replacing sink faucet cartridges; sweating rigid copper pipe; connecting PEX supply lines with crimp/expansion rings; resetting toilet wax rings.",
      expert: "Roughing-in DWV (drain-waste-vent) lines with proper fall (1/4\" per foot); installing hot water heaters; replacing cast-iron soil stacks."
    },
    risk30: {
      projects: "Faucet cartridge replacements, toilet rebuilds, dishwasher hookups, garbage disposal installation, PEX repiping.",
      risks: "Catastrophic interior flooding from burst pressurized supply lines; sewer gas leaks from dry/unvented traps; scalding water.",
      callPro: "Main sewer line root clearing beyond cleanouts; gas water heater line connections; replacing main municipal supply meters."
    },
    tasks: [
      {
        id: "s7_t1",
        title: "Plumbing Emergencies",
        difficulty: "Beginner",
        timeEst: "15 Mins",
        tools: "Water meter key, flashlight, heavy pipe wrench, buckets, mop",
        overview: "A burst pipe can discharge 10 to 20 gallons of water per minute. Knowing how to immediately cut water stops catastrophic flooding.",
        technique: "Memorize the exact location of your main water shutoff valve (typically in the basement near the front wall or outside in a ground meter pit). Turn the quarter-turn ball valve 90 degrees or turn the gate valve clockwise until tight. Open lowest laundry or yard faucets to bleed line pressure.",
        proTip: "Test your main water shutoff valve twice a year; older multi-turn gate valves often freeze from mineral buildup and snap off in an emergency if not periodically exercised.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+shut+off+main+water+supply+emergency"
      },
      {
        id: "s7_t2",
        title: "Home Plumbing Systems",
        difficulty: "Beginner",
        timeEst: "1 Hour",
        tools: "Flashlight, home system layout diagram",
        overview: "A home plumbing system consists of two independent systems: the pressurized fresh water supply system and the gravity-fed Drain-Waste-Vent (DWV) system.",
        technique: "Trace your water supply line from the meter through the water heater and into cold/hot distribution branches. Trace drain lines from fixtures down into horizontal collectors, out to the main sewer lateral, and up through the roof vent stack.",
        proTip: "Plumbing vents on the roof are critical; vents admit air behind draining water to prevent vacuum suction from siphoning water out of fixture P-traps.",
        ytQuery: "https://www.youtube.com/results?search_query=how+home+plumbing+works+supply+and+drain+dwv"
      },
      {
        id: "s7_t3",
        title: "Water Supply and Disposal",
        difficulty: "Beginner",
        timeEst: "1 Hour",
        tools: "Water pressure gauge (hose bib attachment), flashlight",
        overview: "Municipal supply lines deliver water at 40-70 PSI. Pressure reducing valves (PRV) protect home appliances from destructive high pressure.",
        technique: "Screw a pressure gauge onto an exterior hose bib and turn the valve fully open. If reading exceeds 80 PSI, adjust or replace your pressure reducing valve at the meter to prevent premature water heater and appliance failure.",
        proTip: "Water pressure over 80 PSI voids most manufacturer warranties on dishwashers, washing machine valves, and water heaters.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+test+home+water+pressure+gauge"
      },
      {
        id: "s7_t4",
        title: "Basic Plumbing Facts",
        difficulty: "Beginner",
        timeEst: "30 Mins",
        tools: "Pipe calipers, tape measure",
        overview: "Understanding pipe sizing (nominal vs actual diameter), thread types (NPT tapered vs straight compression), and slope rules ensures code compliance.",
        technique: "Remember that nominal pipe sizes refer to approximate inside diameter: a 1/2-inch copper pipe has a 5/8-inch outside diameter. Always maintain a uniform 1/4-inch per foot slope on horizontal drainage pipes (pipes sloped too steeply leave solids behind; too flat causes standing sediment).",
        proTip: "Never connect copper directly to galvanized steel without a dielectric union; direct contact causes rapid galvanic corrosion that eats through steel threads.",
        ytQuery: "https://www.youtube.com/results?search_query=plumbing+basics+pipe+sizes+and+threads+explained"
      },
      {
        id: "s7_t5",
        title: "Clogged Fixture Drains",
        difficulty: "Beginner",
        timeEst: "30-45 Mins",
        tools: "Cup plunger, plastic zip-it hair snake, bucket, slip-joint pliers, baking soda and vinegar",
        overview: "Most bathroom sink and tub clogs are simply hair and soap scum trapped in the first 12 inches of the drain pop-up stopper or P-trap.",
        technique: "Seal the sink overflow hole with a damp rag. Apply a cup plunger over the drain with 2 inches of water in the basin and pump vigorously 10-15 times with quick downward and upward strokes. If plunging fails, place a bucket under the sink, unscrew P-trap slip nuts, and clean the trap manually.",
        proTip: "Never pour caustic liquid chemical drain cleaners (lye or sulfuric acid) into standing water; they generate extreme heat that can melt PVC pipes, etch porcelain, and splash blinding chemicals.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+clear+clogged+sink+drain+this+old+house"
      },
      {
        id: "s7_t6",
        title: "Clogged Main Drainpipe",
        difficulty: "Advanced",
        timeEst: "2-3 Hours",
        tools: "Electric motorized drain auger (snake), cleanout wrench, rubber gloves, bucket, tarp",
        overview: "When multiple fixtures backup simultaneously or the basement toilet bubbles when running laundry, the main building sewer lateral is obstructed.",
        technique: "Locate the main sewer cleanout plug (often near the basement wall exit). Loosen the square brass plug slowly with a cleanout wrench with a bucket ready. Feed the motorized 1/2-inch or 5/8-inch cable snake into the line, rotating clockwise to chew through tree roots and wet wipes.",
        proTip: "Never use your bare hands to guide a spinning motorized drain snake; use heavy leather drain-cleaning gloves, as rubber gloves can catch in spinning coils and break fingers.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+clear+main+sewer+line+clog+snake"
      },
      {
        id: "s7_t7",
        title: "Faucets",
        difficulty: "Intermediate",
        timeEst: "1 Hour",
        tools: "Hex key, adjustable wrench, cartridge puller tool, replacement ceramic disc/cartridge, plumber's grease",
        overview: "Dripping faucets waste hundreds of gallons of water per month and are almost always cured by replacing a worn rubber O-ring or ceramic cartridge.",
        technique: "Shut off hot and cold supply stops under the sink. Remove the handle decorative cap and loosen the set screw. Unscrew the retaining nut, pull the old cartridge straight out using a cartridge puller if stuck, coat the new cartridge rubber seals with food-grade silicone plumber's grease, and reassemble.",
        proTip: "Always take the old cartridge with you to the hardware store; there are thousands of subtly different cartridge shapes, and an exact OEM match is vital for a leak-free seal.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+fix+a+leaking+faucet+cartridge+replacement"
      },
      {
        id: "s7_t8",
        title: "Toilets",
        difficulty: "Beginner",
        timeEst: "1 Hour",
        tools: "Toilet fill valve kit (Fluidmaster), replacement rubber flapper, sponge, bucket, channel lock pliers",
        overview: "A continuously running toilet wastes thousands of gallons and is caused by a degraded rubber flapper, bad fill valve, or misadjusted float arm.",
        technique: "Check water level in the tank: it should sit 1 inch below the overflow tube. If water spills down the tube, adjust the fill valve float screw counter-clockwise to lower the shutoff level. If the flapper leaks, replace it with an exact chlorinated-water resistant silicone flapper.",
        proTip: "Drop 5 drops of red food coloring into the toilet tank and wait 20 minutes without flushing; if red dye appears in the toilet bowl, your flapper has a silent leak and must be replaced.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+fix+a+running+toilet+this+old+house"
      },
      {
        id: "s7_t9",
        title: "Plumbing Noises",
        difficulty: "Intermediate",
        timeEst: "1 Hour",
        tools: "Water hammer arrestors, pipe clamps, pipe insulation, screwdriver",
        overview: "Loud banging when washing machines or valves shut off ('water hammer') stresses pipe joints and is cured by installing shock arrestors.",
        technique: "Water hammer occurs when moving water slams against a suddenly closed solenoid valve. Screw mini water hammer arrestors (piston-chamber shock absorbers) onto the hot and cold washing machine bibs. Fasten loose copper supply pipes to joists with cushioned copper clips every 6 feet.",
        proTip: "Never use galvanized steel strapping to support copper water pipes; dissimilar metals cause galvanic electrolysis that pits holes through copper tubing within years.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+fix+water+hammer+pipes+banging"
      },
      {
        id: "s7_t10",
        title: "Frozen or Burst Pipes",
        difficulty: "Intermediate",
        timeEst: "2 Hours",
        tools: "Hair dryer or heat gun, open-flame heat shield, SharkBite push-fit coupling, pipe cutter, buckets, towels",
        overview: "Freezing temperatures expand water inside pipes until metal fractures. Controlled thawing and rapid push-fit repairs stop water devastation.",
        technique: "Shut the main water valve immediately. Open the faucet connected to the frozen line so melting steam can escape. Thaw the frozen section gently starting from the open faucet toward the freeze using a hair dryer or heating pad—never use an open torch inside walls.",
        proTip: "Keep a 1/2-inch and 3/4-inch push-to-connect (SharkBite) coupling and a handheld pipe cutter in your emergency toolbox; they let you splice and seal a burst copper pipe in 60 seconds with no soldering.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+thaw+frozen+pipes+and+repair+burst"
      },
      {
        id: "s7_t11",
        title: "Plumbing Repairs and Installations",
        difficulty: "Intermediate",
        timeEst: "2-3 Hours",
        tools: "Basin wrench, adjustable wrenches, plumber's putty, Teflon tape, mini hacksaw",
        overview: "Swapping out kitchen sinks, installing garbage disposals, and upgrading supply valves demands systematic dry-fitting and watertight connections.",
        technique: "A basin wrench is the essential tool for reaching high up behind deep sink basins to loosen stubborn faucet mounting nuts. Apply a 1/2-inch rope of plumber's putty under sink basket strainers to create a watertight compression seal before tightening the locknut.",
        proTip: "Never use plumber's putty on porous natural stone countertops (granite, marble, quartz); the linseed oil in putty will leach into stone and cause permanent dark oil stains (use 100% silicone instead).",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+use+basin+wrench+plumber+putty"
      },
      {
        id: "s7_t12",
        title: "Pipe Fittings",
        difficulty: "Beginner",
        timeEst: "1 Hour",
        tools: "Fittings assortment (couplings, elbows, tees, reducers, unions, compression fittings, dielectric unions)",
        overview: "Pipe fittings direct fluid flow, turn 90 and 45-degree corners, branch circuits, and transition between different pipe materials.",
        technique: "Use long-sweep sanitary elbows for drainage lines to prevent clog points; short 90-degree vent elbows are strictly for dry air venting. Use compression fittings for copper supply connections where open flame soldering is hazardous or prohibited.",
        proTip: "Never use Teflon tape on compression fittings or flared gas fittings; the brass ferrule/flare creates the mechanical seal, and tape interferes with proper metal-to-metal seating.",
        ytQuery: "https://www.youtube.com/results?search_query=plumbing+pipe+fittings+types+and+uses+explained"
      },
      {
        id: "s7_t13",
        title: "Cast-Iron Pipe",
        difficulty: "Advanced",
        timeEst: "3-4 Hours",
        tools: "Soil pipe snap cutter or reciprocating saw with carbide blade, shielded Fernco transition couplings, torque wrench",
        overview: "Heavy cast-iron was the historic standard for main soil stacks and waste lines. Splicing into cast iron requires specialized shielded rubber couplings.",
        technique: "Support the weight of the overhead cast iron stack securely with riser clamps before cutting to prevent the upper pipe from crashing down. Cut the pipe squarely with a soil pipe cutter or carbide reciprocating blade, and connect modern PVC using stainless-steel shielded rubber couplings (Mission bands) torqued to 60 in-lbs.",
        proTip: "Always use heavy-duty stainless steel shielded transition bands (Proflex or Mission bands) when joining cast iron to PVC; unshielded rubber Fernco sleeves allow pipes to sag out of alignment over time.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+cut+and+connect+cast+iron+to+pvc"
      },
      {
        id: "s7_t14",
        title: "Brass and Steel Pipe",
        difficulty: "Intermediate",
        timeEst: "2 Hours",
        tools: "Two 14-inch pipe wrenches, penetrating oil, thread sealant paste, replacement brass nipples",
        overview: "Galvanized steel and threaded brass pipes are found in older homes and outdoor hydrants. Corroded steel pipes choke off water volume with internal rust.",
        technique: "Always use two pipe wrenches in opposing directions: one to hold the stationary fitting or pipe, and the second to loosen the threaded nipple, preventing twisting and breaking buried pipes inside walls. Apply thread paste to male threads only.",
        proTip: "Apply penetrating oil to rusted steel pipe threads and tap the joint firmly with a hammer; the shock waves crack internal rust scale, allowing stubborn fittings to break loose without snapping.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+work+with+threaded+steel+and+brass+pipe"
      },
      {
        id: "s7_t15",
        title: "Rigid Copper Pipe",
        difficulty: "Intermediate",
        timeEst: "2 Hours",
        tools: "Tubing cutter, reamer, emery cloth / wire fitting brush, lead-free flux, lead-free solder, propane/MAPP torch",
        overview: "Soldering ('sweating') rigid Type M or L copper pipe creates permanent, durable water lines capable of lasting 50+ years.",
        technique: "Cut tubing square and ream inside burrs. Polish the pipe end and fitting socket until bright and shiny. Brush a thin layer of flux on both parts and push together. Heat the fitting socket evenly with torch flame; touch solder wire to the opposite side of the joint—when hot enough, solder wicks around the seam by capillary action.",
        proTip: "A single drop of water inside a copper pipe will prevent solder from reaching the required 450°F melt point; stuff a wad of white bread into the pipe upstream to temporarily block drips while soldering (the bread dissolves when water is restored).",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+solder+copper+pipe+sweating+this+old+house"
      },
      {
        id: "s7_t16",
        title: "Flexible Copper Tubing",
        difficulty: "Intermediate",
        timeEst: "1-2 Hours",
        tools: "Flaring tool block and yoke, tubing bender spring, tubing cutter, flare nuts",
        overview: "Soft annealed copper coils can be bent smoothly around obstacles, making them ideal for water heater hookups, ice makers, and LP gas lines.",
        technique: "Slide an external bending spring over the soft copper tubing before bending by hand; the spring prevents the tube from kinking or collapsing. For flare connections, slide the flare nut onto the tube first, clamp into the flaring block, and turn the cone down to create a smooth 45-degree flare.",
        proTip: "Never forget to slide the flare nut onto the tubing BEFORE forming the flare; once flared, the nut cannot be installed and the tube must be cut and flared again.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+bend+and+flare+copper+tubing+properly"
      },
      {
        id: "s7_t17",
        title: "Rigid Plastic Pipe (PVC / ABS)",
        difficulty: "Beginner",
        timeEst: "1 Hour",
        tools: "PVC ratcheting cutter or hand saw, deburring tool, purple PVC primer, medium-body PVC solvent cement",
        overview: "PVC (white) and ABS (black) are the modern standards for drain, waste, and vent systems due to their lightweight, smooth bore, and chemical resistance.",
        technique: "Cut squarely and chamfer both inside and outside cut edges. Dry-fit fittings and mark alignment lines with pencil. Apply purple primer to fitting socket and pipe exterior. Apply solvent cement liberally, push pipe into socket until it bottoms out, twist 1/4 turn to spread cement, and hold firmly for 30 seconds.",
        proTip: "Always hold glued PVC joints together under hand pressure for 30 full seconds; the tapered fitting geometry and slippery solvent cement will push the pipe right back out if released immediately.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+glue+pvc+pipe+properly+primer+cement"
      },
      {
        id: "s7_t18",
        title: "Flexible Plastic Tubing (PEX)",
        difficulty: "Beginner",
        timeEst: "1-2 Hours",
        tools: "PEX tubing cutter, PEX crimp tool / clamp tool, copper crimp rings or stainless cinch clamps, go/no-go gauge",
        overview: "Cross-linked polyethylene (PEX) has revolutionized residential water supply. It is freeze-tolerant, bends easily around studs, and eliminates copper soldering.",
        technique: "Cut PEX tubing square with a specialized cutter. Slide a crimp ring over the tube, push the brass or poly fitting into the tube until it seats, position ring 1/8 to 1/4 inch from pipe end, and compress with crimp tool. Verify crimp dimensions using the go/no-go caliper gauge.",
        proTip: "Use a dedicated PEX tubing cutter rather than a utility knife; an angled or jagged cut on PEX will fail to seat fully against the fitting shoulder, causing slow leaks.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+install+pex+plumbing+crimp+clamp+basics"
      },
      {
        id: "s7_t19",
        title: "Roughing-In",
        difficulty: "Advanced",
        timeEst: "4-8 Hours",
        tools: "Right-angle drill, self-feed wood bits, level, framing nailer, DWV pipe and fittings, test plugs",
        overview: "Rough-in plumbing involves running all drainage, venting, and water supply pipes inside open wall framing before drywall is installed.",
        technique: "Drill holes through the center of studs (never closer than 1-1/4 inches from stud face to avoid puncture by drywall screws; install metal nail plates wherever closer). Maintain precise trap arm lengths: a 1-1/2 inch trap arm can run a maximum of 42 inches before hitting its vent.",
        proTip: "Install 16-gauge steel nail plates on the face of every wood stud where plumbing or electrical lines pass within 1-1/4 inches of the surface to prevent drywall screw punctures.",
        ytQuery: "https://www.youtube.com/results?search_query=bathroom+rough+in+plumbing+basics+code"
      },
      {
        id: "s7_t20",
        title: "Toilet Installation",
        difficulty: "Intermediate",
        timeEst: "2 Hours",
        tools: "Extra-thick wax ring with horn or foam rubber seal, closet bolts, hacksaw, level, adjustable wrench",
        overview: "Setting a new toilet requires compressing a watertight wax or rubber seal against the floor flange and leveling the porcelain bowl.",
        technique: "Install brass closet bolts in the flange. Place an extra-thick wax ring onto the horn on the toilet underside. Lower the toilet bowl straight down over the closet bolts, press down with your full body weight to crush the wax ring, tighten bolt nuts gently alternately, check level with shims, and caulk perimeter.",
        proTip: "Never overtighten toilet flange nuts with high torque; porcelain is brittle and will crack with a sickening snap, ruining the entire toilet bowl instantly.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+install+a+toilet+step+by+step+this+old+house"
      },
      {
        id: "s7_t21",
        title: "Sink Installation",
        difficulty: "Intermediate",
        timeEst: "2-3 Hours",
        tools: "Silicone sealant, sink mounting clips, screwdriver, level, tape measure, basin wrench",
        overview: "Installing a drop-in top-mount or undermount bathroom/kitchen sink requires watertight rim sealing and solid structural anchoring.",
        technique: "For a top-mount sink, install the faucet and drain strainer basket on the sink while resting on sawhorses before dropping it into the countertop hole. Run a bead of 100% silicone sealant around the perimeter lip, drop in, and tighten undermount clamping clips evenly.",
        proTip: "Mounting the faucet, sprayer, and drain hardware onto the sink basin BEFORE dropping the sink into the countertop saves an hour of agonizing contortions under the cabinet.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+install+a+kitchen+sink+and+faucet"
      },
      {
        id: "s7_t22",
        title: "Tubs and Showers",
        difficulty: "Advanced",
        timeEst: "6-10 Hours",
        tools: "Shower valve, copper/PEX tubing, mortar bed mix, level, shower pan liner, drain assembly",
        overview: "Bathtub and shower installations demand leak-proof pan waterproofing, rigid mortar support underneath, and pressure-balanced anti-scald mixing valves.",
        technique: "Mix a firm bed of structural mortar on the subfloor and press the acrylic or fiberglass tub down until its apron rests flat on the subfloor, eliminating bottom flexing. Secure the tub flange to wall studs with galvanized roofing screws. Plumb the pressure-balanced shower valve at 48 inches.",
        proTip: "Always set acrylic and fiberglass tubs in a bed of wet mortar or plaster underneath; without a solid mortar bed, the tub bottom will flex under foot, eventually cracking the drain seal.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+install+bathtub+mortar+bed+valve"
      },
      {
        id: "s7_t23",
        title: "Hot-Water Heaters",
        difficulty: "Advanced",
        timeEst: "3-5 Hours",
        tools: "Pipe wrenches, dielectric unions, flexible water heater connectors, T&P relief discharge pipe, pipe dope",
        overview: "Replacing a storage tank water heater involves electrical or gas disconnects, water plumbing, thermal expansion tanks, and temperature & pressure (T&P) relief valves.",
        technique: "Install dielectric unions or stainless corrugated connectors to isolate copper pipes from the steel tank. Plumb a 3/4-inch copper discharge tube from the T&P relief valve extending to within 6 inches of the floor. Install a thermal expansion tank pumped to matching house water pressure.",
        proTip: "Never power up the electric breaker to an electric water heater until the tank is 100% full of water; dry firing will burn out upper electric heating elements in under 30 seconds.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+install+a+water+heater+this+old+house"
      },
      {
        id: "s7_t24",
        title: "Clothes Washers",
        difficulty: "Beginner",
        timeEst: "1 Hour",
        tools: "Braided stainless steel burst-proof hoses, level, adjustable pliers, drain hose clamp",
        overview: "Washing machine rubber hose failures are a leading cause of multi-thousand-dollar home flood insurance claims.",
        technique: "Replace cheap black rubber supply hoses with stainless steel braided burst-proof hoses every 5 years. Level the washing machine legs on all four corners, locking jam nuts to prevent vibration walking. Secure the discharge drain hose with a zip tie to the standpipe.",
        proTip: "Turn off the dual-lever washing machine shutoff valve whenever leaving home for an extended vacation; rubber hoses remain under constant static household pressure 24/7.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+install+washing+machine+hoses+level"
      },
      {
        id: "s7_t25",
        title: "Dishwashers",
        difficulty: "Intermediate",
        timeEst: "2 Hours",
        tools: "Dishwasher 90 brass elbow, braided supply line, electrical wire nuts, level, high-loop drain bracket",
        overview: "Connecting a dishwasher requires water supply hookup, electrical junction connection, and routing the discharge hose to prevent dirty sink water backflow.",
        technique: "Loop the flexible drain hose up to the underside of the countertop ('high loop') before dropping into the garbage disposal or sink branch tailpiece; this high loop prevents dirty sink water from siphoning into the clean dishwasher basin.",
        proTip: "Remember to knock out the plastic inlet plug inside the garbage disposal drain port with a screwdriver and pliers before connecting your dishwasher drain hose.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+install+a+dishwasher+high+loop"
      },
      {
        id: "s7_t26",
        title: "Sump Pumps",
        difficulty: "Intermediate",
        timeEst: "2-3 Hours",
        tools: "Submersible sump pump (1/3 or 1/2 HP), check valve, 1-1/2\" PVC pipe and cement, drill with 3/16\" bit",
        overview: "A reliable submersible sump pump prevents basement flooding during storms by ejecting perimeter groundwater away from the home.",
        technique: "Set the pump on a brick inside the sump basin so it does not suck up bottom silt. Install a full-flow check valve on the vertical discharge pipe to prevent pumped water from draining back into the pit. Drill a 3/16-inch 'weep hole' in the discharge pipe between pump and check valve.",
        proTip: "Always drill a 3/16-inch anti-airlock weep hole in the discharge pipe below the check valve; without this relief hole, trapped air can prevent the pump impeller from moving water.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+install+a+sump+pump+check+valve"
      },
      {
        id: "s7_t27",
        title: "Solving Special Problems",
        difficulty: "Intermediate",
        timeEst: "2 Hours",
        tools: "Air admittance valve (Cheater vent), saddle valves replacement kit, water leak sensors",
        overview: "Special plumbing remedies solve unvented island sink gurgling, eliminate failure-prone needle saddle valves, and catch early leaks with smart sensors.",
        technique: "Install an ASSE-approved Air Admittance Valve (AAV) under island kitchen sinks where running an atmospheric roof vent is structurally impossible. Replace dangerous piercing saddle valves on ice maker lines with solid brass tee shutoff valves.",
        proTip: "Replace all needle saddle valves in your home with proper ball valve tees; piercing saddle valves are notorious for clogging with mineral scale and leaking behind drywall.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+install+air+admittance+valve+aav"
      },
      {
        id: "s7_t28",
        title: "Home Water Treatment",
        difficulty: "Intermediate",
        timeEst: "2-4 Hours",
        tools: "Water hardness test kit, whole-house cartridge filter, water softener bypass valve, drain tubing",
        overview: "Hard water scale ruins water heaters and leaves mineral deposits on fixtures. Installing water softeners and filtration improves water quality.",
        technique: "Test water hardness with a titration test kit (hardness over 7-10 grains per gallon warrants a softener). Plumb a whole-house sediment filter on the main supply line before the softener. Install a 3-valve bypass loop around the softener to allow servicing.",
        proTip: "Install a whole-house 50-micron sediment pre-filter upstream of your water softener; it traps well sand and pipe rust before it fouls expensive ion-exchange resin beads.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+install+a+water+softener+and+filter"
      },
      {
        id: "s7_t29",
        title: "Sewage Disposal",
        difficulty: "Intermediate",
        timeEst: "2 Hours",
        tools: "Septic test dye, effluent filter brush, flashlight, rubber gloves",
        overview: "Private septic systems rely on microbial digestion and drain field percolation. Proper care avoids multi-thousand-dollar leach field replacement.",
        technique: "Have your septic tank pumped every 3 to 5 years. Clean the reusable effluent filter in the outlet baffle yearly with a garden hose spraying back into the tank. Keep heavy vehicles, trees, and excessive water runoff off the absorption drain field.",
        proTip: "Never flush 'flushable' wipes, grease, coffee grounds, or harsh bleach down septic systems; wipes do not break down and will clog septic baffle filters within weeks.",
        ytQuery: "https://www.youtube.com/results?search_query=how+a+septic+system+works+maintenance+tips"
      }
    ]
  },
  {
    id: 8,
    title: "Electricity: Solving Power Problems Safely",
    subtitle: "Understanding Circuitry, Load, and Shock Defense",
    icon: "fa-bolt-lightning",
    intro: "Electricity is completely silent and invisible. Adhering strictly to the National Electrical Code (NEC), checking circuits with reliable testers, and respecting safety limits ensures safe household power.",
    prep40: [
      "The Golden Rule of Testing: Always test a circuit with a non-contact voltage tester; verify the tester on a KNOWN LIVE outlet before and after trusting it on dead wires.",
      "Breaker lockout protocol: Turn off the branch circuit breaker at the main panel, tag it with tape, and verify zero voltage at all junction box wires.",
      "Tool insulation check: Use 1000V-rated insulated screwdrivers and handle grips; remove metal rings, wristwatches, and jewelry.",
      "Code load calculation: Never load a continuous circuit beyond 80% of its rated breaker capacity (12A on a 15A breaker, 16A on a 20A breaker)."
    ],
    tech30: {
      beginner: "Replacing wall outlets and single-pole switches; replacing lamp cords and plugs; testing GFCI receptacles; resetting tripped breakers.",
      intermediate: "Wiring 3-way switch systems; installing ceiling fan junction boxes; adding GFCI/AFCI protection; wiring outdoor motion lights.",
      expert: "Running new Romex NM cable through studs; balancing 120V/240V breaker panel loads; calculating whole-home electrical demand; installing subpanels."
    },
    risk30: {
      projects: "Smart switch upgrades, dimmer installs, kitchen GFCI updates, recessed LED lighting, outdoor floodlights.",
      risks: "Fatal electrical shock or electrocution; electrical arc flash; hidden electrical fires from loose wire connections.",
      callPro: "Upgrading the main service panel, replacing utility meter bases, working inside live unmetered service drops."
    },
    tasks: [
      {
        id: "s8_t1",
        title: "Fuses and Circuit Breakers",
        difficulty: "Beginner",
        timeEst: "30 Mins",
        tools: "Flashlight, replacement Type S fuses or circuit breaker, panel directory card",
        overview: "Fuses and circuit breakers protect building wires from overheating and catching fire when an overloaded circuit draws excessive current.",
        technique: "When a breaker trips, it snaps to a center 'tripped' position. To reset, push the handle firmly all the way to the OFF position until it clicks, then push it back to the ON position. If replacing old screw-in fuses, use tamper-resistant Type S fuses matching exact wire amperage.",
        proTip: "Never replace a 15-amp breaker or fuse with a 20-amp or 30-amp model because it keeps tripping; the thin 14-gauge wires inside your walls will overheat like toaster coils.",
        ytQuery: "https://www.youtube.com/results?search_query=how+circuit+breakers+and+fuses+work+reset"
      },
      {
        id: "s8_t2",
        title: "Understanding Electricity",
        difficulty: "Beginner",
        timeEst: "45 Mins",
        tools: "Digital multimeter, non-contact voltage tester",
        overview: "Understanding the relationship between Volts (pressure), Amps (current flow), Ohms (resistance), and Watts (power consumption) is foundational.",
        technique: "Remember Ohm's Law and the Power Formula: Watts = Volts × Amps. On a standard 120V household branch, a 15-amp circuit can supply a maximum total load of 1,800 Watts (recommended continuous load limit is 80% or 1,440 Watts).",
        proTip: "Use the water pipe analogy to visualize electricity: Voltage is water pressure in the pipe; Amperage is the flow volume of water; Ohms is pipe friction; Watts is total work done.",
        ytQuery: "https://www.youtube.com/results?search_query=understanding+electricity+volts+amps+watts+explained"
      },
      {
        id: "s8_t3",
        title: "Defining Electrical Needs",
        difficulty: "Beginner",
        timeEst: "1 Hour",
        tools: "Notepad, circuit directory, calculator",
        overview: "Mapping your home's circuits identifies overloaded lines and determines whether new dedicated circuits are needed for modern high-draw appliances.",
        technique: "Turn off one circuit breaker at a time and walk through the house plugging a nightlight or outlet tester into every receptacle to create a complete, accurate map of which outlets and lights belong to which breaker number in your panel.",
        proTip: "Label the inside back of every outlet and switch cover plate with its corresponding circuit breaker number using a fine permanent marker for instant future reference.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+map+home+electrical+circuits+panel"
      },
      {
        id: "s8_t4",
        title: "Planning New Circuits",
        difficulty: "Intermediate",
        timeEst: "2 Hours",
        tools: "Tape measure, NEC code book, wire gauge chart",
        overview: "Adding dedicated 20A circuits for microwaves, bathroom hair dryers, or workshop power tools prevents nuisance breaker tripping.",
        technique: "Calculate total wattage requirements. Route 12 AWG wire on 20-amp circuits (yellow Romex) and 14 AWG wire on 15-amp circuits (white Romex). Plan the shortest path through basement joists or attic rafters with minimal wall drywall cutting.",
        proTip: "Never mix 14 AWG wire onto a circuit protected by a 20-amp breaker; if any part of a circuit contains 14-gauge wire, the breaker must be downsized to 15 amps.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+plan+a+new+electrical+circuit+nec"
      },
      {
        id: "s8_t5",
        title: "Improving Electrical Service",
        difficulty: "Advanced",
        timeEst: "4 Hours",
        tools: "Service panel map, electrical load calculator",
        overview: "Older homes with 60A or 100A electrical service need upgrades to 200A service to support heat pumps, EV chargers, and induction stoves.",
        technique: "Conduct a whole-house electrical load calculation per NEC Article 220: factor general lighting (3 VA per sq ft), small appliance circuits, laundry branch, and all fixed motor and HVAC loads. Identify if subpanels or full service mast replacement is required.",
        proTip: "An electric vehicle level 2 charger (50A) plus heat pump system almost always requires upgrading an older 100-amp service panel to a modern 200-amp panel.",
        ytQuery: "https://www.youtube.com/results?search_query=200+amp+electrical+service+upgrade+explained"
      },
      {
        id: "s8_t6",
        title: "Safer Electrical Service",
        difficulty: "Intermediate",
        timeEst: "2 Hours",
        tools: "GFCI tester, dual-function AFCI/GFCI breakers, screwdriver",
        overview: "Modern electrical codes require Arc-Fault (AFCI) and Ground-Fault (GFCI) protection to prevent deadly electrical shocks and structural fires.",
        technique: "GFCI protection stops lethal shock within milliseconds when current leaks to ground (required in bathrooms, kitchens, outdoors, basements). AFCI protection detects sparking arcs inside wall framing from damaged wires, preventing electrical fires in bedrooms and living rooms.",
        proTip: "Test all GFCI outlets monthly by pressing the black 'TEST' button; if the reset button doesn't pop or power doesn't cut out, the internal sensing circuit has failed and must be replaced.",
        ytQuery: "https://www.youtube.com/results?search_query=afci+vs+gfci+protection+explained+this+old+house"
      },
      {
        id: "s8_t7",
        title: "Electrical Repair Guide",
        difficulty: "Intermediate",
        timeEst: "1 Hour",
        tools: "Multimeter, wire strippers, insulated pliers, receptacle tester",
        overview: "Systematic troubleshooting pinpoints dead outlets, warm faceplates, buzzing switches, and flickering lighting circuits safely.",
        technique: "Plug an outlet tester with three indicator lights into malfunctioning receptacles to diagnose open grounds, reverse polarity, or open neutrals. If a switch feels warm to the touch or buzzes, turn off power immediately and inspect for loose back-stabbed wire connections.",
        proTip: "Over 80% of intermittent outlet failures are caused by 'back-stabbed' push-in wire connections on the rear of cheap receptacles; always use screw terminal side screws.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+troubleshoot+electrical+problems+outlet+tester"
      },
      {
        id: "s8_t8",
        title: "Cord and Plug Repairs",
        difficulty: "Beginner",
        timeEst: "30 Mins",
        tools: "Wire strippers, utility knife, replacement 3-prong grounded plug, screwdriver",
        overview: "Frayed power tool cords and cracked appliance plugs present severe shock hazards. Splicing a heavy-duty replacement plug restores safe operation.",
        technique: "Cut off the damaged plug. Strip 1-1/2 inches of outer cord jacket and 5/8-inch of insulation from the 3 inner wires. Connect the Green/Bare ground wire to the green grounding screw, White neutral wire to the silver screw, and Black hot wire to the brass screw. Tighten the cord clamp.",
        proTip: "Remember the brass-to-black rule: Brass screw gets the Black (hot) wire; Silver screw gets the White (neutral) wire; Green screw gets the Bare/Green (ground) wire.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+replace+a+power+cord+plug+3+prong"
      },
      {
        id: "s8_t9",
        title: "Electrical Boxes and Accessories",
        difficulty: "Intermediate",
        timeEst: "1-2 Hours",
        tools: "Old-work (remodeling) plastic/metal box, drywall saw, stud finder, level",
        overview: "Electrical boxes enclose wire connections and prevent electrical arcs from touching combustible wood studs or drywall insulation.",
        technique: "Use 'old work' boxes with flip-out plastic wings for installations in existing drywall without framing access. Cut the hole tracing the box outline, slide Romex cable through the box clamp, insert the box into the hole, and tighten the corner screws to draw the wings tight against the drywall.",
        proTip: "Never crowd too many conductors into a small electrical box; calculate box cubic-inch volume per NEC box fill rules (2.0 cu in per 14-gauge wire, 2.25 cu in per 12-gauge).",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+install+old+work+electrical+box+drywall"
      },
      {
        id: "s8_t10",
        title: "Wires and Wiring",
        difficulty: "Intermediate",
        timeEst: "1-2 Hours",
        tools: "Non-metallic cable ripper, wire strippers, linesman pliers, wire nuts (twist connectors)",
        overview: "Stripping Non-Metallic (NM / Romex) cable and connecting conductors with twist wire nuts or push-in Wago connectors is an essential craft.",
        technique: "Strip 8 inches of outer plastic sheathing from Romex cable, leaving 1/4-inch of sheath extending past the box clamp into the box. Strip 3/4-inch of insulation from copper conductors. Align wire ends, twist tightly clockwise with linesman pliers, and screw a wire nut until snug.",
        proTip: "Use modern lever-action Wago 221 connectors instead of traditional wire nuts for foolproof, inspection-visible connections that never come loose under vibration.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+strip+and+connect+electrical+wires+wago+wire+nuts"
      },
      {
        id: "s8_t11",
        title: "Switches and Outlets",
        difficulty: "Beginner",
        timeEst: "1 Hour",
        tools: "Non-contact voltage tester, wire strippers, Phillips and slotted screwdrivers, needle-nose pliers",
        overview: "Upgrading old loose outlets to commercial-grade tamper-resistant receptacles and modern rocker switches improves aesthetics and home safety.",
        technique: "Shut off breaker and test all wires with voltage tester. Bend a neat clockwise 'J-hook' on the end of each bare wire, loop clockwise around the terminal screw (so tightening the screw pulls the wire loop closed), and torque the screw securely down on the copper.",
        proTip: "Always wrap two full turns of heavy vinyl electrical tape around the perimeter of the outlet body covering terminal screws before pushing it into a metal electrical box.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+replace+an+electrical+outlet+this+old+house"
      },
      {
        id: "s8_t12",
        title: "Special Switch and Outlet Hardware",
        difficulty: "Intermediate",
        timeEst: "1-2 Hours",
        tools: "Dimmer switches, USB-combo outlets, smart WiFi switches, neutral wire jumper",
        overview: "Modern LED dimmers, USB-charging outlets, and smart home automation switches require neutral wire connections and proper box depth.",
        technique: "Verify your switch box has an available white neutral wire bundle before buying smart switches (most smart switches require a neutral wire for internal electronics). For LED dimmers, adjust the low-end trim dial on the switch face to eliminate annoying LED bulb flickering.",
        proTip: "If your LED lights flicker when dimmed, adjust the micro-trim dial hidden behind the dimmer switch faceplate to set the minimum dimming threshold higher.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+install+smart+switch+with+neutral+wire"
      },
      {
        id: "s8_t13",
        title: "Wiring New Circuits",
        difficulty: "Advanced",
        timeEst: "4-6 Hours",
        tools: "12/2 or 14/2 NM cable, fish tape, drill with 3/4\" auger bit, cable staples, circuit breaker",
        overview: "Running fresh cable from the main panel to a new room or appliance requires careful drilling through framing and securing with cable staples.",
        technique: "Drill 3/4-inch holes dead-center through wall studs. Pull cable through without twisting or kinking. Fasten cable with insulated staples within 12 inches of every electrical box and every 4-1/2 feet along joists. Leave at least 6 inches of free conductor wire inside every box.",
        proTip: "Never drive cable staples so tight that they crush or crimp the outer Romex jacket; staples should hold the cable snugly without pinching the internal insulation.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+run+romex+cable+through+studs+electrical"
      },
      {
        id: "s8_t14",
        title: "Installing Electrical Boxes",
        difficulty: "Intermediate",
        timeEst: "1-2 Hours",
        tools: "Nail-on new work boxes, adjustable depth brackets, hammer, level, tape measure",
        overview: "Setting new electrical boxes at consistent, level heights during framing ensures finished wall plates align perfectly across rooms.",
        technique: "Standard box heights are 12 to 16 inches from the subfloor to box center for wall outlets, and 48 inches from subfloor for wall switches. Align the box face projection guides flush with the planned drywall thickness (typically 1/2-inch).",
        proTip: "Use adjustable-depth electrical boxes with a side adjustment screw; they let you dial the box face in or out flush after tile or wood paneling is installed.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+install+new+work+electrical+boxes+height"
      },
      {
        id: "s8_t15",
        title: "Floor and Ceiling Wiring",
        difficulty: "Advanced",
        timeEst: "3-4 Hours",
        tools: "Steel fish tape, glow rods, drywall hole saw, stud finder, flexible installer drill bit",
        overview: "Fishing electrical cable through finished ceilings and between floor joists avoids tearing down large expanses of finished plaster and drywall.",
        technique: "Use fiberglass glow rods to bridge ceiling bays. When running perpendicular to floor joists, drill through the center third of joists (never notch top or bottom joist edges). Use a flexible 54-inch installer bit with a hole in the tip to pull wire back through wall cavities.",
        proTip: "Never notch the top or bottom edge of a floor joist to run wiring; notching ruins the structural tension/compression strength of joists. Always drill through the center.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+fish+electrical+wires+through+walls+ceilings"
      },
      {
        id: "s8_t16",
        title: "Ceiling Fixtures",
        difficulty: "Beginner",
        timeEst: "1-2 Hours",
        tools: "Ceiling fan rated bracket box, non-contact tester, wire strippers, screwdriver, stepladder",
        overview: "Replacing outdated dining chandeliers or installing heavy ceiling fans requires fan-rated mounting boxes capable of supporting dynamic vibrating weight.",
        technique: "Never hang a ceiling fan from a standard plastic light box. Install an expanding metal ceiling fan brace that ratchets tightly between two ceiling joists. Connect ground wire to box, white to white, and black/blue to hot, securing with wire nuts.",
        proTip: "Always use a specialized fan-rated ceiling box stamped 'Acceptable for Fan Support up to 70 lbs'; standard fixture boxes will fatigue and drop heavy spinning fans.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+replace+a+ceiling+light+fixture+fan"
      },
      {
        id: "s8_t17",
        title: "Wiring Switches",
        difficulty: "Intermediate",
        timeEst: "1-2 Hours",
        tools: "Single-pole switch, 3-way switches, 4-way switch, 14/3 cable, multimeter, tester",
        overview: "Wiring 3-way and 4-way switch circuits allows controlling stair or hallway lights from two or three separate locations.",
        technique: "In a 3-way switch setup, the 'common' terminal screw is darker (brass or black) than the other two brass 'traveler' screws. Connect the incoming hot or light switch-leg to the dark common screw, and connect the red and black traveler wires between the traveler screws on both switches.",
        proTip: "Tag the wire connected to the dark 'common' screw with black tape before disconnecting an old 3-way switch; mixing up common and traveler wires is the #1 mistake in 3-way wiring.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+wire+a+3+way+switch+diagram+explained"
      },
      {
        id: "s8_t18",
        title: "Wiring Code",
        difficulty: "Intermediate",
        timeEst: "1 Hour",
        tools: "National Electrical Code (NEC) summary, tape measure, inspection checklist",
        overview: "Electrical codes ensure maximum fire and shock prevention. Key rules govern receptacle spacing, bathroom dedicated circuits, and tamper resistance.",
        technique: "Follow the 6-foot / 12-foot outlet rule: no point along any unbroken wall space may be more than 6 feet from an electrical receptacle. Kitchen countertops require 20A GFCI circuits with outlets spaced no more than 48 inches apart. All 15A and 20A 120V household outlets must be tamper-resistant.",
        proTip: "The 6/12 rule ensures that any standard 6-foot appliance lamp cord can reach an outlet without needing dangerous, trip-hazard extension cords.",
        ytQuery: "https://www.youtube.com/results?search_query=top+electrical+code+violations+homeowners"
      },
      {
        id: "s8_t19",
        title: "Outdoor Lighting",
        difficulty: "Beginner",
        timeEst: "1-2 Hours",
        tools: "Weatherproof exterior light fixture, silicone caulk, non-contact tester, screwdriver",
        overview: "Exterior entryway fixtures and security floodlights improve curb appeal, deter intruders, and provide safe night navigation.",
        technique: "Verify outdoor fixture boxes have watertight gaskets. Seal the perimeter of the light mounting plate against the siding with a bead of exterior silicone caulk, leaving the bottom edge uncaulked to allow any trapped condensation to weep out.",
        proTip: "Leave a 1/2-inch uncaulked weep gap at the bottom of outdoor wall light fixture plates; if water gets behind the plate, it must be able to escape rather than filling the electrical box.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+install+an+outdoor+wall+light+fixture"
      },
      {
        id: "s8_t20",
        title: "Outdoor Wiring",
        difficulty: "Advanced",
        timeEst: "3-5 Hours",
        tools: "Trenching shovel, UF-B direct burial cable or PVC conduit, in-use 'bubble' cover, GFCI outlet",
        overview: "Running electricity to garden sheds, patio outlets, and landscape lighting requires direct-burial UF cable or PVC conduit buried to code depths.",
        technique: "Direct burial underground feeder (UF-B) cable must be buried at least 24 inches deep (or 12 inches if GFCI-protected). Schedule 40 PVC conduit must be buried at least 18 inches deep. All outdoor outlets must have an 'in-use' weatherproof bubble cover that stays shut when cords are plugged in.",
        proTip: "Always call 811 (free underground utility locator) at least 3 business days before digging trenches for outdoor electrical lines to avoid cutting high-voltage or gas lines.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+run+underground+electrical+wire+outdoor"
      },
      {
        id: "s8_t21",
        title: "Lamp Repair",
        difficulty: "Beginner",
        timeEst: "30 Mins",
        tools: "Replacement 3-way lamp socket, lamp cord with polarized plug, wire strippers, screwdriver",
        overview: "Antique table lamps and floor reading lights often fail due to worn switch sockets or brittle cords. Rewiring takes 20 minutes and costs under $10.",
        technique: "Press the socket shell marked 'PRESS' to release the metal cap. Unscrew hot and neutral wires. Thread new lamp cord up through the threaded rod. Tie an Underwriter's knot to prevent strain on screw terminals. Connect ribbed neutral wire to silver screw, smooth hot wire to brass screw.",
        proTip: "Always tie an 'Underwriter's knot' in the cord wires inside the socket base before tightening screws; the knot prevents tugs on the cord from ripping wires off the terminals.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+rewire+a+lamp+underwriters+knot"
      },
      {
        id: "s8_t22",
        title: "Fluorescent Fixtures",
        difficulty: "Intermediate",
        timeEst: "1 Hour",
        tools: "LED retrofit ballast-bypass T8 tubes, wire strippers, wire nuts, non-contact tester",
        overview: "Old magnetic humming fluorescent ballasts consume excessive power. Converting fixtures to modern direct-wire LED tubes eliminates ballasts entirely.",
        technique: "Turn off breaker power. Cut wires leading to and from the ballast and remove the heavy old ballast. Rewire the tombstones (end sockets) directly to 120V line and neutral per the LED tube instructions. Install ballast-bypass LED tubes for instant, buzz-free, energy-efficient light.",
        proTip: "Choose 'Type B' (ballast bypass) LED retrofit tubes over plug-and-play tubes; bypassing the ballast eliminates the #1 failure component in fluorescent lighting forever.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+convert+fluorescent+light+to+led+bypass+ballast"
      },
      {
        id: "s8_t23",
        title: "Door Chimes, Bells, and Buzzers",
        difficulty: "Beginner",
        timeEst: "1-2 Hours",
        tools: "Low-voltage transformer (16V/30VA), video doorbell or traditional chime, digital multimeter",
        overview: "Doorbell systems run on safe low-voltage (16V-24V AC) supplied by a step-down transformer. Installing modern smart video doorbells requires proper transformer sizing.",
        technique: "Locate the doorbell transformer (often mounted on an electrical box in basement or garage). Test output voltage with a multimeter. For smart video doorbells, upgrade old 10VA transformers to a 16V-24V 30VA transformer to supply adequate continuous power for video streaming.",
        proTip: "If your smart video doorbell restarts or rings weakly when pressed, your transformer is undersized; upgrade to a 16V 30VA transformer to supply full continuous operating power.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+install+video+doorbell+upgrade+transformer"
      }
    ]
  }
];
