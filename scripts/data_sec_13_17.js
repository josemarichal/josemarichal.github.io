// DIY Skills Builder - Sections 13 to 17 Data
window.diyData_part4 = [
  {
    id: 13,
    title: "Glass, Ceramics, and Plastics",
    subtitle: "Brittle Materials, Polymers, and Precision Cutting",
    icon: "fa-cubes-stacked",
    intro: "Cutting glass, drilling ceramic tile, welding acrylic, and mending china requires gentle, vibration-free techniques, diamond abrasives, and tailored adhesives.",
    prep40: [
      "Scribing over snapping: Glass is not sawn; it is scored once with a diamond or carbide wheel and snapped along the fissure line under controlled tension.",
      "Coolant lubrication: Always use water or light cutting oil when drilling glass, ceramics, and porcelain to prevent thermal shock cracking.",
      "Protective eye and hand PPE: Wear cut-resistant Kevlar gloves and wrap-around safety goggles; flying glass slivers present severe eye laceration hazards.",
      "Substrate backing: Support glass and plastics on a firm, flat felt or carpeted workbench with no chips or debris underneath."
    ],
    tech30: {
      beginner: "Scoring and snapping single-strength window glass; cutting acrylic sheet with a plastic scoring tool; gluing broken pottery with two-part clear epoxy.",
      intermediate: "Drilling clean holes in porcelain tile using diamond core hole saws; smoothing glass edges with silicon carbide sanding blocks.",
      expert: "Cutting organic curved glass shapes with glass pliers; bending thermoplastic acrylic sheets over strip heaters; installing wire safety glass."
    },
    risk30: {
      projects: "Window pane replacement, drilling bathroom tile for grab bars, acrylic display cases, antique porcelain restoration.",
      risks: "Severe lacerations and arterial bleeding from shattered glass; shattered expensive bathroom tile.",
      callPro: "Cutting tempered glass (which cannot be cut and shatters into pebbles) or installing heavy structural glass shower enclosures."
    },
    tasks: [
      {
        id: "s13_t1",
        title: "Working with Glass",
        difficulty: "Intermediate",
        timeEst: "1 Hour",
        tools: "Carbide wheel glass cutter, mineral oil or kerosene, straightedge, running pliers, safety glasses",
        overview: "Cutting replacement glass panes for picture frames and windows is clean and simple when done with a single continuous score.",
        technique: "Dip the glass cutter wheel in mineral oil. Hold the cutter perpendicular against a straightedge and draw it toward you in ONE continuous, firm stroke (it should produce a crisp, singing sizzle sound). Slide a wooden match under the score line and press down on both sides to snap.",
        proTip: "Never re-score over the same line twice with a glass cutter; re-scoring ruins the cutter carbide wheel and creates jagged, uneven fractures.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+cut+glass+properly+for+beginners"
      },
      {
        id: "s13_t2",
        title: "Drilling Glass and Ceramics",
        difficulty: "Intermediate",
        timeEst: "45 Mins",
        tools: "Diamond grit hole saw or spade-shaped spear-point carbide bit, plumbers putty, spray bottle of water, drill",
        overview: "Boring holes for towel bars and plumbing pipes through rock-hard porcelain and glass demands water cooling and slow rotational speeds.",
        technique: "Build a small circular dam out of plumber's putty around the hole location and fill it with water to act as a cooling bath. Start the diamond hole saw at a 45-degree angle to create an initial crescent groove, then slowly rock the drill perpendicular with light, steady pressure.",
        proTip: "Never use the hammer/percussion mode when drilling ceramic or porcelain tile; percussion blows will instantly crack the tile.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+drill+holes+in+ceramic+tile+glass"
      },
      {
        id: "s13_t3",
        title: "Mending Glass and Pottery",
        difficulty: "Beginner",
        timeEst: "1 Hour",
        tools: "Clear 2-part epoxy (optically clear), painter's tape, razor blade, acetone",
        overview: "Mending chipped heirlooms, shattered stoneware plates, and glass figurines requires non-yellowing, gap-filling structural adhesives.",
        technique: "Clean fracture surfaces thoroughly with acetone. Mix equal parts of optically clear 2-part epoxy. Apply a hairline film to one fracture edge, join pieces with firm pressure, and tape securely with low-tack blue painter's tape for 24 hours. Shave excess cured epoxy with a single-edge razor.",
        proTip: "Support odd-shaped broken ceramics inside a box of dry sandbox sand or rice while epoxy cures; the sand cradles irregular pieces firmly in alignment.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+repair+broken+ceramic+pottery+epoxy"
      },
      {
        id: "s13_t4",
        title: "Plastics",
        difficulty: "Beginner",
        timeEst: "1 Hour",
        tools: "Plastic scoring knife, acrylic solvent cement (Weld-On 3/4), hypodermic needle applicator, fine saw blade",
        overview: "Cutting acrylic (Plexiglas) and polycarbonate (Lexan) sheet creates shatterproof storm windows, greenhouse panels, and display boxes.",
        technique: "Score thin acrylic sheet along a straightedge 5-8 times with a plastic scoring knife, place the score line over a table edge, and snap downward. For joining acrylic boxes, clamp parts and apply liquid solvent cement with a needle bottle; the solvent capillary-wicks into the joint and chemically fuses the plastic.",
        proTip: "Leave the protective paper or plastic masking film on acrylic sheets while cutting and drilling; it protects against scratches and allows easy pencil layout.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+cut+and+glue+acrylic+plexiglass"
      },
      {
        id: "s13_t5",
        title: "Special-Purpose Glass",
        difficulty: "Intermediate",
        timeEst: "1 Hour",
        tools: "Glass thickness gauge, tape measure, glass suction cups",
        overview: "Understanding safety glass types (tempered, laminated, wired, insulated double-pane) ensures building code compliance in bathrooms and doors.",
        technique: "Building codes require tempered safety glass in all doors, shower enclosures, and windows within 24 inches of a door or within 18 inches of the floor. Remember that tempered glass CANNOT be cut after manufacturing—it must be ordered pre-cut to exact custom dimensions.",
        proTip: "Look for the tiny etched acid bug/stamp in the corner of a glass pane; the stamp certifies whether the glass is tempered safety glass.",
        ytQuery: "https://www.youtube.com/results?search_query=tempered+vs+laminated+vs+annealed+glass+explained"
      }
    ]
  },
  {
    id: 14,
    title: "Brickwork and Stonework",
    subtitle: "Masonry Structures, Mortar Chemistry, and Tuckpointing",
    icon: "fa-cubes",
    intro: "Masonry combines compressive strength, thermal mass, and timeless beauty. Learning mortar ratios, bond patterns, joint tooling, and repointing restores chimneys and garden walls.",
    prep40: [
      "Mortar compatibility check: Never use hard modern Type S portland mortar on soft historic brick (pre-1930); the hard mortar will spall and destroy historic bricks during freeze-thaw cycles (use softer Type N or lime mortar).",
      "Brick pre-wetting: Wet porous bricks before laying with a hose; dry porous bricks suck water out of fresh mortar, starving it of the water needed for hydration.",
      "Level and stringline setup: Set corner lead pyramids first and stretch a taut mason's stringline to guide the face and elevation of every course.",
      "Clean tooling timing: Tool mortar joints when the mortar is 'thumbprint hard'—firm enough that your thumb leaves an impression without sticking."
    ],
    tech30: {
      beginner: "Mixing Type N mortar to peanut butter consistency; buttering brick ends; striking concave joints with a mason's jointer.",
      intermediate: "Raking and repointing failing chimney mortar joints; laying straight running bond garden walls; building brick corners (leads).",
      expert: "Laying dry-stack fieldstone retaining walls; building brick arches over wood formwork; rebuilding historic firebrick fireboxes."
    },
    risk30: {
      projects: "Garden retaining walls, brick walkways, chimney tuckpointing, outdoor stone fire pits, steps.",
      risks: "Severe caustic skin burns from wet lime/cement; collapsing unstable masonry walls; heavy lifting back injuries.",
      callPro: "Structural load-bearing brick foundation walls showing severe stair-step cracks or bowing inward."
    },
    tasks: [
      {
        id: "s14_t1",
        title: "Ordering Bricks",
        difficulty: "Beginner",
        timeEst: "1 Hour",
        tools: "Tape measure, calculator, brick estimate chart",
        overview: "Standard modular bricks measure 3-5/8\" x 2-1/4\" x 7-5/8\". Factoring a standard 3/8-inch mortar joint makes three courses equal exactly 8 vertical inches.",
        technique: "Calculate brick quantity: a standard running bond wall requires approximately 6.75 modular bricks per square foot of wall face. Always order a 10% to 15% surplus to cover cuts, bats, half-bricks, and slight color batch variations.",
        proTip: "Mix bricks from 3 or 4 different pallets simultaneously as you lay courses; this blends subtle kiln color variations naturally across the finished wall.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+calculate+and+order+bricks+masonry"
      },
      {
        id: "s14_t2",
        title: "Mortar",
        difficulty: "Intermediate",
        timeEst: "1 Hour",
        tools: "Mortar pan / wheelbarrow, masonry hoe with two holes, trowel, water bucket, rubber gloves",
        overview: "Mortar cushions bricks and seals joints against water. Using the correct mix type (Type M, S, N, O) balances compressive strength and flexibility.",
        technique: "Use Type N mortar (1 part portland cement, 1 part hydrated lime, 6 parts clean masonry sand) for general exterior brickwork above grade. Mix dry ingredients thoroughly, add water gradually until mortar clings to a trowel held vertically without sliding off.",
        proTip: "Remember the ASTM mnemonic for mortar strength: MaSoN wOrK (M is strongest ~2500 PSI, S is ~1800 PSI, N is general purpose ~750 PSI, O is soft historic ~350 PSI).",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+mix+mortar+proper+consistency+masonry"
      },
      {
        id: "s14_t3",
        title: "Tools (Masonry)",
        difficulty: "Beginner",
        timeEst: "45 Mins",
        tools: "London or Philadelphia brick trowel (10-11\"), mason's hammer, brick set chisel, concave jointer, line blocks",
        overview: "Professional masonry tools provide ergonomic balance for picking up mud, cutting bricks cleanly, and tooling crisp joints.",
        technique: "Grip a 10-inch London pattern trowel with your thumb extended along the wooden handle ferrule. Use a mason's hammer and wide brick set chisel to score all four sides of a brick before striking a sharp blow to snap the brick cleanly in half.",
        proTip: "Keep a bucket of clean water and a stiff horsehair brush next to your mortar pan; washing your trowel periodically prevents dried crusts from ruining smooth mortar spreading.",
        ytQuery: "https://www.youtube.com/results?search_query=essential+bricklaying+tools+how+to+use"
      },
      {
        id: "s14_t4",
        title: "Brick Bonding",
        difficulty: "Intermediate",
        timeEst: "1 Hour",
        tools: "Masonry sample boards, bond layout drawings",
        overview: "Bond patterns overlap brick joints horizontally to distribute loads and create visual architectural beauty (Running, English, Flemish, Header bond).",
        technique: "Running bond is the simplest, with every vertical head joint centered directly over the brick below. Flemish bond alternates headers (short brick ends) and stretchers (long sides) in every course, mechanically interlocking multi-wythe walls.",
        proTip: "Never allow vertical head joints in adjacent courses to align; aligned joints create a continuous vertical crack line that weakens the wall.",
        ytQuery: "https://www.youtube.com/results?search_query=brick+bonding+patterns+running+flemish+english"
      },
      {
        id: "s14_t5",
        title: "Corners, Ends, Junctions",
        difficulty: "Intermediate",
        timeEst: "2-3 Hours",
        tools: "4ft mason's level, corner blocks, mason's line, line pins",
        overview: "Masonry begins at the corners. Bricklayers build corner 'leads' several courses high, checking level, plumb, and gauge before filling the middle wall.",
        technique: "Lay the corner brick and check level across both axes. Step back the bricks in a stepped pyramid pattern. Use a story pole or gauge stick to ensure every course height is exactly 2-2/3 inches (three courses = 8 inches). Stretch a mason's line between line blocks attached to opposite corner leads.",
        proTip: "Build your corner leads carefully; if your corners are plumb and level, running the intervening wall courses to the stretched stringline is fast and foolproof.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+build+brick+corners+leads+properly"
      },
      {
        id: "s14_t6",
        title: "Moisture Barriers",
        difficulty: "Intermediate",
        timeEst: "1-2 Hours",
        tools: "Damp-proof course (DPC) poly/copper membrane, weep hole inserts, mortar mesh",
        overview: "Brick walls are porous; rainwater permeates brick veneer. A damp-proof course and open weep holes channel internal moisture safely back outside.",
        technique: "Install a heavy flexible flashing membrane along the foundation shelf extending 8 inches up the backup wall framing. Install open weep holes or plastic cellular weep vents in the first course of brick directly above the flashing every 24 inches on center.",
        proTip: "Never caulk or plug the vertical weep holes at the base of brick veneer; plugging weep holes traps water inside wall framing, causing mold and structural rot.",
        ytQuery: "https://www.youtube.com/results?search_query=brick+veneer+weep+holes+and+flashing+explained"
      },
      {
        id: "s14_t7",
        title: "Laying the Bricks",
        difficulty: "Intermediate",
        timeEst: "3-5 Hours",
        tools: "Trowel, mason's line, level, concave jointer, mason's brush",
        overview: "Laying bricks requires scooping a mortar bed, spreading it evenly, buttering brick ends, and pushing the brick down to the stringline.",
        technique: "Throw a mortar bed 2 to 3 bricks long. Furrow the mortar slightly down the center with the trowel tip. Butter the vertical head end of the brick with mortar. Shove the brick downward and inward until its top edge aligns flush with the stringline (leaving 1/16-inch gap from line).",
        proTip: "Never let a brick touch the mason's stringline; if a brick touches the line, it pushes the line outward, causing all subsequent bricks to bow out of true.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+lay+bricks+like+a+pro+step+by+step"
      },
      {
        id: "s14_t8",
        title: "Brickwork Joints",
        difficulty: "Beginner",
        timeEst: "1 Hour",
        tools: "Concave jointer tool, rake jointer, mason's soft brush",
        overview: "Tooling mortar joints compacts the outer mortar surface, forming a dense, water-shedding seal that prevents rain penetration.",
        technique: "Tool joints when the mortar is 'thumbprint hard'. Tool the vertical head joints first, then draw the concave jointer smoothly along the long horizontal bed joints. Brush off loose mortar burrs gently with a soft horsehair brush.",
        proTip: "A concave or V-shaped joint is the best joint profile for exterior weather resistance; struck and raked joints leave ledges that catch water and freeze.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+tool+brick+mortar+joints+jointer"
      },
      {
        id: "s14_t9",
        title: "Repointing (Tuckpointing)",
        difficulty: "Intermediate",
        timeEst: "2-4 Hours",
        tools: "Angle grinder with diamond tuckpoint blade or plugging chisel, tuck pointer trowel, mortar hawk, spray bottle",
        overview: "Deteriorated, crumbly mortar joints allow rain to penetrate masonry. Raking old mortar back and packing fresh mortar restores structural integrity.",
        technique: "Rake out old crumbled mortar to a depth of 1/2 to 3/4-inch (at least twice the joint height) using a diamond tuckpoint blade or hammer and plugging chisel. Spray joints with water to prevent the dry brick from sucking moisture from new mortar. Pack new mortar tightly in layers with a thin tuck pointer.",
        proTip: "Pack tuckpointing mortar into joints in two or three thin 1/4-inch passes, compacting each pass firmly; stuffing the full joint in one pass leaves internal voids.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+repoint+brick+mortar+tuckpointing+this+old+house"
      },
      {
        id: "s14_t10",
        title: "Stonework",
        difficulty: "Advanced",
        timeEst: "4-8 Hours",
        tools: "Stone chisels, stone buster hammer (4 lb), stone level, Type S mortar or dry stack gravel",
        overview: "Building with natural fieldstone or cut ashlar creates majestic, rugged landscape walls, fireplaces, and garden retaining tiers.",
        technique: "For dry-stack stone walls, build with a backward batter (tilt the face backward toward the retained hill at 1 to 2 inches per foot of height). Place large 'tie stones' that span the full depth of the wall every 6 feet to anchor the structure.",
        proTip: "In dry-stack stonework, 'one over two, two over one' is the golden rule; always overlap every stone across two lower stones to tie the wall together without mortar.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+build+a+dry+stack+stone+wall"
      },
      {
        id: "s14_t11",
        title: "Wall Repairs (Masonry)",
        difficulty: "Intermediate",
        timeEst: "2-3 Hours",
        tools: "Cold chisel, replacement bricks, mortar, masonry circular saw blade, shims",
        overview: "Replacing cracked or spalling individual face bricks restores wall appearance and stops moisture penetration into wall cavities.",
        technique: "Drill a series of holes through the mortar surrounding the damaged brick, then chisel the old brick out piece by piece. Clean the cavity completely. Dampen surrounding bricks, butter top, bottom, and ends of the new brick with fresh mortar, slide it into the hole, and tool joints flush.",
        proTip: "Support the replacement brick with thin wooden shims in the joint while the mortar cures to keep it from sinking or tilting under gravity.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+replace+a+broken+brick+in+a+wall"
      },
      {
        id: "s14_t12",
        title: "Chimneys (Masonry Repair)",
        difficulty: "Intermediate",
        timeEst: "3-5 Hours",
        tools: "Ladder, scaffolding, mortar, wire brush, concrete crown sealant, trowel",
        overview: "Exposed to wind and severe freeze-thaw cycles, chimney tops frequently suffer from crumbling brick mortar and cracked concrete crowns.",
        technique: "Scrape loose crown concrete. Apply an elastomeric brush-on chimney crown sealant that bridges hairline cracks. Rake out and repoint the top 5 to 10 courses of brick. Verify the clay flue liner extends at least 2 inches above the crown.",
        proTip: "Form a continuous 2-inch overhang on the concrete chimney crown with a drip edge groove underneath; this prevents rainwater from running down the exterior brick face.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+repair+a+brick+chimney+crown+mortar"
      },
      {
        id: "s14_t13",
        title: "Fireplaces (Firebrick)",
        difficulty: "Intermediate",
        timeEst: "2 Hours",
        tools: "Refractory mortar (pre-mixed hydraulic cement), firebrick, margin trowel, wire brush",
        overview: "Standard masonry mortar deteriorates under extreme 1000°F+ wood fire temperatures. Relining firebox joints requires specialized refractory mortar.",
        technique: "Rake out cracked joints inside the firebox. Use premixed refractory mortar (rated for 2000°F+). Keep joints paper-thin (1/8-inch or less) between firebricks. Allow refractory mortar to cure for 72 hours before building the first small curing fire.",
        proTip: "Never use standard Portland-based mortar inside a fireplace firebox; standard mortar explodes and crumbles when subjected to intense direct wood fire heat.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+repair+firebox+mortar+refractory+cement"
      },
      {
        id: "s14_t14",
        title: "Paving (Brick / Paver Patios)",
        difficulty: "Intermediate",
        timeEst: "1-2 Days",
        tools: "Plate compactor, screed board, 1\" conduit pipes, concrete sand, polymeric sand, brick pavers",
        overview: "Brick paver patios and walkways add beauty and value. Proper base compaction and sharp sand screeding prevents settling and weed growth.",
        technique: "Excavate 7 inches deep. Lay 4 inches of crushed gravel base and compact with a vibrating plate compactor. Lay 1 inch of sharp concrete screed sand between 1-inch pipe rails. Set pavers tight, install edge restraints, sweep polymeric sand into joints, and compact.",
        proTip: "Use polymeric sand in paver joints and mist lightly with water; the polymer additives bind the sand into a flexible, rubbery mortar that prevents weeds and ants.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+install+a+brick+paver+patio+this+old+house"
      }
    ]
  },
  {
    id: 15,
    title: "Working with Concrete",
    subtitle: "Hydraulic Chemistry, Formwork, Slabs, and Masonry Blocks",
    icon: "fa-trowel-bricks",
    intro: "Concrete does not 'dry'—it hardens through an exothermic chemical crystallization called hydration. Building rigid forms, pouring proper water-cement ratios, and proper curing ensures 4000+ PSI strength.",
    prep40: [
      "Subbase compaction: Slabs crack because of unstable dirt underneath; excavate organic topsoil, lay 4 inches of crushed gravel, and compact thoroughly.",
      "Formwork rigidity: Wet concrete weighs 150 lbs per cubic foot; stake form boards every 2 to 3 feet and nail securely to prevent catastrophic blowouts.",
      "Water-cement ratio discipline: Adding excess water makes wet concrete easy to spread but drastically reduces final PSI compressive strength and creates surface dusting.",
      "PPE & caustic protection: Wear waterproof rubber boots, heavy rubber gloves, and eye protection; wet portland cement causes severe chemical caustic skin burns."
    ],
    tech30: {
      beginner: "Mixing pre-bagged concrete in a wheelbarrow or mixer; setting posts in fast-setting concrete; patching surface spalls with vinyl cement.",
      intermediate: "Building lumber forms with 1/4\" slope; placing rebar/wire mesh; screeding, bull-floating, and applying non-slip broom finishes.",
      expert: "Laying concrete block (CMU) foundation walls; pouring suspended structural concrete steps; casting polished concrete kitchen countertops."
    },
    risk30: {
      projects: "Concrete walkways, patio slabs, fence post footings, basement floor repairs, block garden walls.",
      risks: "Severe third-degree chemical burns on knees/skin from wet cement; structural cracking if subbase settles.",
      callPro: "Poured structural concrete house foundations or city sidewalk sections over municipal utility vaults."
    },
    tasks: [
      {
        id: "s15_t1",
        title: "Composition of Concrete",
        difficulty: "Beginner",
        timeEst: "1 Hour",
        tools: "Sample materials: Portland cement, coarse gravel, sharp sand, clean water",
        overview: "Concrete is a composite material made of Portland cement (the binder), sand (fine aggregate), crushed stone (coarse aggregate), and water.",
        technique: "A classic rule-of-thumb mix proportion by volume is 1 part cement, 2 parts sand, and 3 parts coarse gravel (the 1:2:3 mix). When water is added, hydration begins, crystallizing calcium silicate hydrates that lock aggregates into stone.",
        proTip: "Keep concrete damp for at least 5 to 7 days after pouring (using plastic sheeting or water mists); moist curing yields concrete nearly 50% stronger than air-dried concrete.",
        ytQuery: "https://www.youtube.com/results?search_query=what+is+concrete+made+of+composition+hydration"
      },
      {
        id: "s15_t2",
        title: "Tools and Storage",
        difficulty: "Beginner",
        timeEst: "45 Mins",
        tools: "Square shovel, magnesium hand float, bull float, edger tool, groover/control joint tool, concrete rake (come-along)",
        overview: "Concrete finishing tools are engineered from magnesium, wood, and steel to work aggregate downward and draw cream to the surface.",
        technique: "Store unused dry concrete bags elevated on pallets wrapped in heavy plastic; ambient humidity will turn unsealed bags into rock within months. Rinse all tools thoroughly with a garden hose before concrete residue hardens onto metal blades.",
        proTip: "Use magnesium hand floats on wet air-entrained exterior concrete; steel trowels trap air and moisture bleed water under the surface, causing surface blistering and spalling.",
        ytQuery: "https://www.youtube.com/results?search_query=essential+concrete+tools+how+to+use"
      },
      {
        id: "s15_t3",
        title: "Estimating",
        difficulty: "Beginner",
        timeEst: "30 Mins",
        tools: "Tape measure, volume calculator",
        overview: "Concrete is ordered by the cubic yard (27 cubic feet). Calculating volume accurately prevents having short pours or wasting expensive concrete.",
        technique: "Formula: (Length in feet × Width in feet × Thickness in feet) ÷ 27 = Cubic Yards. For example, a 10ft × 10ft patio at 4 inches (0.33 ft) thick: (10 × 10 × 0.33) ÷ 27 = 1.22 cubic yards. Always add 10% for spillage and subbase irregularities.",
        proTip: "One 80-pound bag of pre-mixed concrete yields approximately 0.60 cubic feet; it takes 45 eighty-pound bags to equal one full cubic yard.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+calculate+concrete+cubic+yards+and+bags"
      },
      {
        id: "s15_t4",
        title: "Handling Concrete",
        difficulty: "Intermediate",
        timeEst: "2-4 Hours",
        tools: "Concrete mixer or heavy wheelbarrow, hoe, rubber boots, rubber gloves",
        overview: "Placing and working concrete requires rapid teamwork because the chemical hydration clock begins ticking the second water touches the mix.",
        technique: "Pour concrete starting at the furthest corner of the forms and work backward toward the mixer. Spread concrete with a concrete come-along or square shovel—never use a garden rake, which segregates coarse gravel from fine cement paste.",
        proTip: "Never add extra water to the mixer just to make concrete easier to dump and rake; every gallon of excess water cuts the slab's final compressive strength drastically.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+mix+and+pour+concrete+wheelbarrow+mixer"
      },
      {
        id: "s15_t5",
        title: "Foundations (Footings)",
        difficulty: "Intermediate",
        timeEst: "4-6 Hours",
        tools: "Trench shovel, Sonotube cylindrical cardboard forms, post-hole digger, level, rebar",
        overview: "Deck posts, porches, and home additions rest on concrete footings excavated below the local winter frost line to prevent frost heave.",
        technique: "Dig footing holes down below the local frost depth (typically 36 to 48 inches in northern climates). Flare the bottom of the hole into a bell shape to increase bearing load area. Insert two pieces of vertical #4 rebar suspended 3 inches off the dirt.",
        proTip: "Always dig concrete deck footings at least 6 inches below your local municipality's official frost depth; frost expansion will lift shallow footings right out of the ground.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+dig+and+pour+concrete+footings+sonotube"
      },
      {
        id: "s15_t6",
        title: "Laying Walks and Drives",
        difficulty: "Intermediate",
        timeEst: "1-2 Days",
        tools: "2x4 form boards, 2x2 wooden stakes, screed 2x4, magnesium float, groover, broom",
        overview: "Pouring concrete walkways and driveways creates durable, low-maintenance exterior surfaces that handle foot and vehicular traffic.",
        technique: "Set forms with a 1/4-inch per foot slope toward grass for water runoff. Screed wet concrete level across forms using a straight 2x4 in a sawing motion. Float with a magnesium bull float to embed aggregate, cut control joints every 4-5 feet, and drag a soft push broom for non-slip texture.",
        proTip: "Control joints must be cut to a depth of at least 1/4 the thickness of the slab (1 inch deep on a 4-inch slab); this guarantees concrete cracks neatly inside the joint grooves.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+pour+a+concrete+walkway+this+old+house"
      },
      {
        id: "s15_t7",
        title: "Problem Sites ; Casting Slabs",
        difficulty: "Advanced",
        timeEst: "1-2 Days",
        tools: "Transit / optical level, reinforcing welded wire mesh or #4 rebar, rebar chairs, tamper",
        overview: "Pouring slabs on sloping ground or soft clay soil requires stepped formwork, thickened edge footings, and structural steel reinforcement.",
        technique: "Dig a thickened perimeter grade beam (12 inches deep × 12 inches wide) around slab edges on problem sites. Support #4 rebar on plastic 'chairs' so steel sits suspended in the middle third of the slab rather than lying flat on the gravel subbase.",
        proTip: "Wire mesh or rebar lying flat on the dirt underneath concrete does ZERO structural good; rebar must be elevated on chairs so it cures fully encased in concrete.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+form+and+pour+a+concrete+slab+on+slope"
      },
      {
        id: "s15_t8",
        title: "Paving and Steps",
        difficulty: "Advanced",
        timeEst: "1-2 Days",
        tools: "Plywood form lumber, 2x8 stringer cleats, level, hammer, margin trowel, edger",
        overview: "Forming and pouring concrete entry steps requires rigid cantilevered formwork and uniform riser-and-tread stair geometry.",
        technique: "Follow the 7-11 stair rule (7-inch riser height, 11-inch tread depth). Bevel the bottom edge of riser form boards at 45 degrees so you can float and trowel the full tread surface completely under the board. Pour bottom step first, vibrating forms with a hammer.",
        proTip: "Bevel the bottom edge of wooden step riser forms at a 45-degree angle; this lets your finishing trowel reach completely into the corner of the step underneath.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+build+forms+and+pour+concrete+steps"
      },
      {
        id: "s15_t9",
        title: "Concrete Floors",
        difficulty: "Intermediate",
        timeEst: "4-6 Hours",
        tools: "Steel finishing trowel, power trowel, knee boards, vapor barrier (15-mil poly)",
        overview: "Interior basement and garage slabs require steel troweling to produce a dense, glass-smooth, dust-free interior finish.",
        technique: "Lay a heavy 15-mil vapor barrier over gravel before pouring to block underground moisture vapor transmission. After floating, wait until bleed water completely evaporates, then kneel on foam knee boards and trowel the surface with a steel finishing trowel held at a slight tilt.",
        proTip: "Never steel-trowel concrete while water is still pooled on the surface; working bleed water into the surface weakens the top paste, creating permanent surface flaking.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+trowel+concrete+floor+smooth+finish"
      },
      {
        id: "s15_t10",
        title: "Repairs (Concrete)",
        difficulty: "Beginner",
        timeEst: "1-2 Hours",
        tools: "Wire brush, cold chisel, vinyl concrete patcher or polymer-modified repair mortar, bonding adhesive",
        overview: "Fixing spalled, pitted concrete steps and filling moving cracks stops freeze-thaw damage and restores trip-free safety.",
        technique: "Chisel away all loose, crumbly concrete down to sound stone. Undercut the perimeter edges slightly to lock the patch mechanically. Paint the damp concrete with acrylic bonding adhesive, then trowel polymer-modified repair mortar flush and feather edges.",
        proTip: "Never feather standard concrete to a paper-thin edge (it will flake off); use specialized vinyl or polymer-modified patching mortar engineered for thin-edge adhesion.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+repair+cracked+and+spalled+concrete+steps"
      },
      {
        id: "s15_t11",
        title: "Using Precast Concrete",
        difficulty: "Beginner",
        timeEst: "1-2 Hours",
        tools: "Precast splash blocks, deck footing blocks, stepping stones, gravel, level",
        overview: "Precast concrete blocks and deck piers allow quick installation of ground-level decks, air conditioning pads, and garden walkways without mixing mud.",
        technique: "Excavate soil and compact a 3-inch level bed of crushed gravel under each precast block. Check for level in all directions. Use 4-way slotted deck blocks (Dek-Blocks) to accept 4x4 posts and 2x6 joists directly for floating garden decks.",
        proTip: "Never set precast concrete deck blocks directly onto raw topsoil or grass; always dig down 4 inches and set blocks on compacted crushed stone so they won't settle.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+use+precast+concrete+deck+blocks"
      },
      {
        id: "s15_t12",
        title: "Building with Blocks (CMU)",
        difficulty: "Intermediate",
        timeEst: "4-6 Hours",
        tools: "Standard 8x8x16 concrete masonry units (CMU), Type S mortar, trowel, level, mason's line",
        overview: "Concrete cinder blocks (CMU) create stout foundation stem walls, garage firewalls, and earth-retaining terraces.",
        technique: "Lay blocks with the thicker end of the web facing UP (this provides a wider bed for spreading mortar). Butter the ears (vertical flanges) of the block before setting it in place. Align top corners flush to the stretched mason's stringline, tapping with the trowel handle.",
        proTip: "Concrete blocks are manufactured with one side of the cross-webs wider than the other; always place blocks with the wider web facing UP so mortar has a wider shelf.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+lay+concrete+cinder+blocks+cmu+for+beginners"
      }
    ]
  },
  {
    id: 16,
    title: "Guide to Better Planning",
    subtitle: "Budgeting, Contracting, Code Compliance, and Architectural Design",
    icon: "fa-compass-drafting",
    intro: "The most successful DIY home improvements are won during the planning phase. Estimating accurate costs, securing permits, maximizing spatial ergonomics, and scheduling prevents costly mistakes.",
    prep40: [
      "Permits and code verification: Check local building department permit thresholds (structural, plumbing, electrical, and gas line alterations almost always require permits).",
      "Contingency budgeting: Always add a 20% financial contingency reserve to cover hidden rotten framing, obsolete plumbing, or ungrounded wiring.",
      "As-built dimensional survey: Measure rooms accurately to the 1/8-inch, marking plumbing stacks, radiator pipes, door swings, and window rough openings.",
      "Material lead-time scheduling: Order long-lead items (custom cabinets, windows, tiles) weeks before demolition begins to prevent an uninhabitable kitchen."
    ],
    tech30: {
      beginner: "Drawing to-scale floor plans on grid paper; calculating square footage and material waste factors; creating a project timeline spreadsheet.",
      intermediate: "Designing ergonomic kitchen work triangles; planning bathroom vanity and tub plumbing layouts; drafting permit submission drawings.",
      expert: "Acting as your own general contractor (scheduling sub-contractor sequencing: demo -> rough framing -> MEP rough-in -> insulation -> drywall -> finish)."
    },
    risk30: {
      projects: "Kitchen remodels, bathroom gut-renovations, basement conversions, opening interior walls, attic master suites.",
      risks: "Severe budget overruns; code violation fines or forced demolition of unpermitted work; structural sagging from cutting load-bearing walls.",
      callPro: "Removing structural load-bearing walls without a licensed structural engineer's stamped beam calculation."
    },
    tasks: [
      {
        id: "s16_t1",
        title: "How to Make Plans and Estimate Costs",
        difficulty: "Beginner",
        timeEst: "2-3 Hours",
        tools: "Graph paper (1/4\" grid), 25ft tape measure, laser distance measurer, spreadsheet",
        overview: "Accurate architectural floor plans drawn to 1/4\" = 1' scale ensure new cabinets, appliances, and fixtures fit without costly on-site surprises.",
        technique: "Measure walls along the floor from corner to corner. Measure window and door openings from outside casing to outside casing. Draw the floor plan on grid paper where one square equals 6 inches or 1 foot. Itemize material costs into a spreadsheet with a 20% contingency line item.",
        proTip: "Always measure room dimensions at three different heights (floor, waist, ceiling); older home walls are rarely square or plumb.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+measure+and+draw+floor+plans+for+remodeling"
      },
      {
        id: "s16_t2",
        title: "How to Finance Home Improvements",
        difficulty: "Beginner",
        timeEst: "1 Hour",
        tools: "Financial calculator, project spreadsheet",
        overview: "Evaluating financing options (HELOC, cash-out refinance, personal home improvement loans, energy efficiency tax credits) protects household capital.",
        technique: "Compare interest rates, tax deductibility, and closing costs. Prioritize projects that deliver high return on investment (kitchen refresh, minor bath remodel, exterior curb appeal, energy-efficient HVAC upgrades).",
        proTip: "Check local utility and federal tax incentives (such as the Inflation Reduction Act energy credits) before buying heat pumps, water heaters, and insulation.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+finance+home+improvements+heloc+loans"
      },
      {
        id: "s16_t3",
        title: "Should You Be Your Own Contractor?",
        difficulty: "Intermediate",
        timeEst: "1-2 Hours",
        tools: "Subcontractor bid comparison sheet, project timeline Gantt chart",
        overview: "Acting as your own General Contractor (GC) can save 20% in contractor markup, but requires managing schedules, permits, inspections, and trade coordination.",
        technique: "Establish strict trade sequencing: 1) Demolition, 2) Structural framing, 3) Plumbing/Electrical/HVAC rough-in, 4) Rough inspections, 5) Insulation, 6) Drywall, 7) Flooring, 8) Trim & Cabinetry, 9) Final MEP trim-out, 10) Final inspections.",
        proTip: "Never pay a trade subcontractor 100% upfront; hold back a 10-15% retainage payment until the municipal building inspector signs off on the final permit inspection.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+be+your+own+general+contractor+remodel"
      },
      {
        id: "s16_t4",
        title: "How to Plan Kitchen Improvements",
        difficulty: "Intermediate",
        timeEst: "2-4 Hours",
        tools: "Kitchen layout planner, tape measure, appliance specification sheets",
        overview: "The kitchen is the heart of the home. Optimizing the classic 'Work Triangle' (sink, refrigerator, stove) ensures effortless meal prep.",
        technique: "Ensure the total sum of the three legs of the kitchen work triangle is between 12 and 26 feet, with no leg less than 4 feet or more than 9 feet. Allow at least 36 to 42 inches of walkway clearance between perimeter counters and center kitchen islands.",
        proTip: "Download the exact manufacturer specification sheets for all appliances BEFORE ordering cabinets; range and refrigerator rough opening dimensions vary by inches.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+plan+a+kitchen+remodel+layout+triangle"
      },
      {
        id: "s16_t5",
        title: "How to Make Laundering More Convenient",
        difficulty: "Beginner",
        timeEst: "1-2 Hours",
        tools: "Tape measure, dryer vent ductwork, drain pan with sensor",
        overview: "Ergonomic laundry design includes raised washer/dryer pedestals, folding counter space, leak protection pans, and straight dryer venting.",
        technique: "Install a rigid metal dryer exhaust duct (never flimsy foil or plastic accordion tubing) with the shortest possible run to the outdoors. Place an emergency overflow plastic drain pan under the washer plumbed to a floor drain or equipped with an automatic water shutoff sensor valve.",
        proTip: "Use rigid smooth-walled metal duct for clothes dryer exhausts; ribbed flexible vinyl hoses trap lint easily and cause dangerous house fires.",
        ytQuery: "https://www.youtube.com/results?search_query=laundry+room+layout+design+and+safety+tips"
      },
      {
        id: "s16_t6",
        title: "New Ways to Brighten Your Bathroom",
        difficulty: "Intermediate",
        timeEst: "2 Hours",
        tools: "Lighting catalog, mirror defogger, recessed shower niche box",
        overview: "Transforming small, dark bathrooms into spa-like retreats requires layered lighting (vanity side sconces), recessed shower niches, and pocket doors.",
        technique: "Install vertical vanity sconces at eye level (60-65 inches from floor) on both sides of the mirror rather than overhead downlights to eliminate unflattering facial shadows. Install a prefabricated foam recessed shower niche between wall studs to organize toiletries.",
        proTip: "Mounting vanity lights on either side of the bathroom mirror at face height eliminates the harsh overhead shadows caused by top-mounted Hollywood light bars.",
        ytQuery: "https://www.youtube.com/results?search_query=bathroom+remodel+design+lighting+storage+ideas"
      },
      {
        id: "s16_t7",
        title: "How to Make a Small House Bigger",
        difficulty: "Intermediate",
        timeEst: "2 Hours",
        tools: "Pocket door hardware, built-in shelving plans, paint fan deck",
        overview: "Maximizing small footprints involves eliminating swinging door clearance with pocket doors, building custom wall-to-wall storage, and borrowing sightlines.",
        technique: "Replace standard swinging doors with solid-core pocket doors to reclaim 10 square feet of usable floor swing clearance. Use consistent flooring material and a unified light paint color throughout adjacent rooms to create seamless visual expansion.",
        proTip: "Running the same hardwood or LVP flooring continuously through adjacent rooms without transition strips tricks the eye into perceiving the entire home as much larger.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+make+a+small+house+feel+bigger+design"
      },
      {
        id: "s16_t8",
        title: "Basements and Attics Can Be Livable",
        difficulty: "Advanced",
        timeEst: "3-5 Hours",
        tools: "Egress window kit, insulation calculator, moisture meter",
        overview: "Finishing raw basements and attics adds massive conditioned square footage, but requires meeting building code egress and ceiling height rules.",
        technique: "Building codes require bedrooms to have an emergency egress window with at least 5.7 sq ft of clear opening and a maximum sill height of 44 inches. Habitable rooms must maintain a minimum 7-foot ceiling height over at least 50% of the room area.",
        proTip: "Always cut and install an approved basement egress window well before building a basement bedroom; without legal egress, it cannot legally be counted as a bedroom.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+finish+a+basement+or+attic+code+requirements"
      }
    ]
  },
  {
    id: 17,
    title: "Fifty Projects You Can Build & Master Index",
    subtitle: "Classic Workshop Projects and Master Troubleshooting Index",
    icon: "fa-book-bookmark",
    intro: "Putting skills into practice through timeless, functional woodworking and home improvement projects inspired by the legendary Reader's Digest Do-It-Yourself manual, backed by a comprehensive troubleshooting index.",
    prep40: [
      "Cut-list & material optimization: Break down project plans into a cutting diagram on paper to minimize scrap lumber waste.",
      "Joinery selection: Match project joinery to skill level (pocket holes and dowels for beginners; mortise & tenon and dovetails for advanced makers).",
      "Assembly sequence dry run: Test fit and clamp the entire project completely dry before mixing glue.",
      "Finishing before final assembly: Pre-finish hard-to-reach internal corners and slats before gluing up frames."
    ],
    tech30: {
      beginner: "Building a classic wooden sawbench; crafting stackable shop tool totes; making floating wall display shelves with keyhole hangers.",
      intermediate: "Building an Adirondack lawn chair with curved comfort slats; constructing a Shaker-style end table with mortise and tenon apron; building utility storage benches.",
      expert: "Building a drop-leaf dining table; building a roll-top desk tambour door; crafting custom mortised entry storm doors."
    },
    risk30: {
      projects: "Workshop sawbenches, book shelving, patio furniture, garden planters, spice racks, step stools.",
      risks: "Material waste from inaccurate layout; clamping misalignment during glue-up.",
      callPro: "Only if projects involve high-voltage power integration or foundation load modifications."
    },
    tasks: [
      {
        id: "s17_t1",
        title: "Fifty Projects You Can Build (Reader's Digest Classics)",
        difficulty: "Intermediate",
        timeEst: "4-12 Hours",
        tools: "Full workshop kit: table saw, miter saw, router, clamps, drill, sander, wood glue, finishing supplies",
        overview: "A showcase of dozens of classic home improvement projects from the Reader's Digest Do-It-Yourself manual: heavy-duty sawbenches, Adirondack chairs, built-in bookcases, folding step stools, patio planters, and tool caddies.",
        technique: "Select a project matching your workshop tooling. 1) Sawbench: 2x4 framing with 15-degree splayed legs and a notched rip-cut V-groove. 2) Classic Adirondack Chair: 3/4\" cedar with contoured seat slats. 3) Bookcase: 3/4\" birch plywood with stopped shelf dados and solid hardwood face frame. 4) Folding Step Stool: hardwood pivots and locking hinges.",
        proTip: "Pre-sand all internal project components to 220 grit BEFORE gluing the project together; sanding inside tight 90-degree corners after assembly is ten times harder.",
        ytQuery: "https://www.youtube.com/results?search_query=classic+diy+woodworking+projects+readers+digest"
      },
      {
        id: "s17_t2",
        title: "Master DIY Index and Cross-Reference Directory",
        difficulty: "Beginner",
        timeEst: "15 Mins",
        tools: "Interactive Search & Category Directory",
        overview: "The comprehensive master troubleshooting index cross-references all 17 sections, tool safety guidelines, and emergency repair procedures across plumbing, electrical, carpentry, and masonry.",
        technique: "Use the interactive search bar at the top of the app to query any home repair symptom (e.g. 'leaking', 'squeak', 'breaker', 'saw', 'grout', 'epoxy'). The index instantly surfaces the relevant tools, step-by-step techniques, and YouTube video tutorials.",
        proTip: "Bookmark your most frequent home maintenance tasks using the favorite star button on each card for instant access during weekend home improvement sessions.",
        ytQuery: "https://www.youtube.com/results?search_query=home+improvement+troubleshooting+guide+this+old+house"
      }
    ]
  }
];
