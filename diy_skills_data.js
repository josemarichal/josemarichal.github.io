// DIY Skills Builder Master Database
// All 17 Sections and Complete Curated DIY Tasks with YouTube Links & Narratives

// DIY Skills Builder - Sections 1 to 4 Data
window.diyData_part1 = [
  {
    id: 1,
    title: "Hand Tools: How to Choose and Use Them",
    subtitle: "The Foundation of Every Workshop",
    icon: "fa-hammer",
    intro: "The fundamental building block of all manual labor. Mastering hand tools gives you precision, tactile feedback, and control over wood, metal, and mechanical fasteners.",
    prep40: [
      "Assess your physical workspace: Ensure bright shadow-free lighting, dry flooring, and a rock-solid bench or sawhorse setup.",
      "Safety gear check: Impact-rated ANSI Z87.1 safety glasses, snug work gloves, and closed-toe workshop boots are non-negotiable.",
      "Mental readiness: Speed is the enemy of craft. Clean layout and deliberate strokes yield far better results than brute force.",
      "Essential staging: Keep cutting edges razor sharp, wipe steel blades with camellia oil, and keep common layout tools in arm's reach."
    ],
    tech30: {
      beginner: "Reading tape measures to 1/16\"; driving nails flush without surface dimples; matching screwdriver drive types; using utility knives safely.",
      intermediate: "Sawing plumb to a knife line; squaring stock with hand planes; sharpening chisels to a mirror bevel; cutting mortises.",
      expert: "Setting saw teeth with a saw set; scraping figured hardwoods; restoring antique hand tools; freehand stone sharpening."
    },
    risk30: {
      projects: "Building workbenches, hanging shelves, trimming doors, installing cabinet pulls, joinery boxes.",
      risks: "Moderate physical injury (lacerations, crushed fingers, eye debris). Low financial risk from wasted scrap lumber.",
      callPro: "When structural alterations involve load-bearing framing, foundation posts, or hazardous materials (lead paint / asbestos)."
    },
    tasks: [
      {
        id: "s1_t1",
        title: "Your Basic Tool Kit",
        difficulty: "Beginner",
        timeEst: "1-2 Hours",
        tools: "Toolbox or canvas tote, 16oz claw hammer, 25ft tape measure, utility knife, torpedo level, multi-bit driver, slip-joint pliers, adjustable wrench",
        overview: "A well-curated basic tool kit is the cornerstone of household self-reliance. Assembling the right core tools saves time and prevents damaging hardware with improper substitutes.",
        technique: "Select professional-grade essentials over cheap multipacks. Prioritize a forged steel 16oz claw hammer, magnetic bit screwdriver, locking tape measure, 9-inch torpedo level, and lineman's or slip-joint pliers. Store in a moisture-resistant heavy-duty toolbox or bucket caddy.",
        proTip: "Buy tools as individual quality pieces rather than bargain 100-piece prepackaged kits, which frequently use soft alloy metals that strip screws and bend under torque.",
        ytQuery: "https://www.youtube.com/results?search_query=essential+homeowner+tool+kit+this+old+house"
      },
      {
        id: "s1_t2",
        title: "Workbenches",
        difficulty: "Intermediate",
        timeEst: "3-6 Hours",
        tools: "Heavy framing lumber, 3-inch deck screws, wood glue, bar clamps, circular saw, speed square, drill/driver",
        overview: "A sturdy, level workbench provides the rigid foundation required for accurate sawing, planning, assembly, and clamping without dangerous shifting or bouncing.",
        technique: "Construct a frame with doubled 2x4s or 4x4 legs braced with lap or notched joints. Fasten a dense top (two laminated layers of 3/4-inch plywood or MDF, edged with solid hardwood). Bolt a heavy front vise flush with the top edge and drill 3/4-inch dog holes for versatile hold-downs.",
        proTip: "Weight is your best friend in a workbench. Add a bottom shelf loaded with sandbags or heavy tool boxes to absorb hammer blows and hand-planing thrust.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+build+sturdy+workbench+for+beginners"
      },
      {
        id: "s1_t3",
        title: "Hammers and Hammering",
        difficulty: "Beginner",
        timeEst: "30-45 Mins",
        tools: "16-oz curved claw hammer, 20-oz rip hammer, wooden mallet, nail set, scrap 2x4 lumber, 8d common nails",
        overview: "Driving nails cleanly without bending them or marring the workpiece is a core skill. Proper hammer selection and swinging mechanics make all the difference.",
        technique: "Grip the handle near the butt end for maximum leverage, not choked up near the head. Hold the nail near its head, tap lightly once or twice to set it in the grain, remove your guide hand, then drive it home with smooth wrist-and-elbow swings. Use a nail set to sink the head 1/16-inch below the surface.",
        proTip: "Blunt the tip of the nail with a light hammer tap before driving into delicate or dense hardwood; a blunt tip shears wood fibers rather than wedging them apart, preventing splitting.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+hammer+properly+tips+tricks+this+old+house"
      },
      {
        id: "s1_t4",
        title: "Saws and Sawing",
        difficulty: "Beginner",
        timeEst: "1-2 Hours",
        tools: "Crosscut hand saw (10-12 TPI), rip saw, pencil or marking knife, combination square, sawbench or sawhorses",
        overview: "Hand saws offer precision and quiet control. Knowing the difference between crosscut (shearing across grain) and rip saws (chiseling along grain) is vital for clean woodwork.",
        technique: "Mark your cutline with a square. Guide the initial stroke by resting the blade against your thumb knuckle above the teeth. Pull back several times to start a kerf. Saw at a 45-degree angle for crosscutting and 60-degree angle for ripping, using full, steady strokes without forcing downward pressure.",
        proTip: "Let the weight of the saw do the work; pushing down hard warps the blade in the kerf and wanders off your cutline. Wax the blade occasionally with candle paraffin to reduce friction.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+use+a+handsaw+crosscut+rip+paul+sellers"
      },
      {
        id: "s1_t5",
        title: "Special-Purpose Saws",
        difficulty: "Intermediate",
        timeEst: "1-2 Hours",
        tools: "Coping saw, dovetail/backsaw, hacksaw, keyhole/drywall saw, flush-cut saw",
        overview: "Specialty saws tackle tight curves, flush dowel trims, fine joinery, metal conduit, and drywall cutouts that standard hand saws cannot handle.",
        technique: "Install coping saw blades with teeth pointing toward the handle so it cuts on the pull stroke for maximum control on curves. Backsaws feature a stiff brass or steel spine to keep thin blades rigid during delicate dovetails and tenon cheeks. Hacksaws require high blade tension to cut copper and steel square.",
        proTip: "When using a flush-cut saw on dowels or plug projections, place a layer of blue painter's tape on the surrounding wood surface to prevent scratches from teeth deflection.",
        ytQuery: "https://www.youtube.com/results?search_query=specialty+hand+saws+coping+dovetail+hacksaw+guide"
      },
      {
        id: "s1_t6",
        title: "Sharpening and Setting Saws",
        difficulty: "Advanced",
        timeEst: "2-3 Hours",
        tools: "Saw vise, triangular saw files (slim taper), saw set tool, magnifying lamp, mill bastard file for jointing",
        overview: "A sharp hand saw with properly set teeth cuts true and fast. Setting alternates teeth left and right, creating a kerf slightly wider than the saw plate to prevent binding.",
        technique: "Clamp the saw plate securely in a saw vise close to the gullets. Joint the teeth tops evenly with a flat mill file. Use a pistol-grip saw set to bend the top third of alternating teeth outward. File each tooth bevel with a triangular file at the specified rake and fleam angle until the jointed flat disappears.",
        proTip: "Never file backward; lift the file on the return stroke. Dragging a file backward quickly ruins its cutting teeth.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+sharpen+and+set+a+hand+saw+paul+sellers"
      },
      {
        id: "s1_t7",
        title: "Screwdrivers",
        difficulty: "Beginner",
        timeEst: "30 Mins",
        tools: "Slotted/cabinet drivers, Phillips (#1, #2, #3), Torx/Star drivers, Robertson/Square drive, ratcheting driver",
        overview: "Using the incorrect screwdriver tip strips screw heads and ruins fasteners. Matching the exact tip geometry and applying axial force is the golden rule.",
        technique: "Always select a slotted blade that matches the screw slot width and thickness exactly to prevent burring. For Phillips screws, verify the driver seats completely without wobble (a #2 Phillips driver into a #2 screw). Push 80% inward with 20% turning force to prevent cam-out.",
        proTip: "If a screw is stubborn, insert the screwdriver firmly, tap the butt of the handle gently with a mallet to seat the head and break internal corrosion, then turn counter-clockwise.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+choose+use+screwdrivers+prevent+stripping"
      },
      {
        id: "s1_t8",
        title: "Pliers",
        difficulty: "Beginner",
        timeEst: "30 Mins",
        tools: "Slip-joint pliers, tongue-and-groove (Channellock) pliers, needle-nose pliers, locking pliers (Vise-Grips), diagonal cutters",
        overview: "Pliers extend hand strength and reach for gripping, twisting, bending, and cutting wire and small components across plumbing and electrical jobs.",
        technique: "Position tongue-and-groove pliers so the lower jaw leads into the direction of turn; this causes jaw teeth to bite deeper into pipe or nuts rather than slipping off. Use locking pliers to securely hold rusted nuts or clamp workpieces during welding/drilling.",
        proTip: "Never use pliers on hexagonal brass plumbing nuts or finished bolts if an open-end wrench is available, as pliers easily round off the corners.",
        ytQuery: "https://www.youtube.com/results?search_query=types+of+pliers+and+how+to+use+them+properly"
      },
      {
        id: "s1_t9",
        title: "Wrenches",
        difficulty: "Beginner",
        timeEst: "45 Mins",
        tools: "Adjustable wrench (Crescent), combination wrench set (box/open end), socket set & ratchet, torque wrench, pipe wrench",
        overview: "Wrenches apply mechanical leverage to threaded hex fasteners and threaded pipe fittings without marring faces or rounding hex flats.",
        technique: "When using an adjustable wrench, ensure the movable jaw faces toward you so load pressure is exerted against the fixed, stronger jaw. Pull the wrench toward your body rather than pushing away, protecting your knuckles if the fastener breaks loose suddenly.",
        proTip: "Box-end wrenches wrap completely around all 6 or 12 points of a bolt head, providing far more torque and slipping resistance than open-ended wrenches.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+use+wrenches+correctly+ratchet+socket+guide"
      },
      {
        id: "s1_t10",
        title: "Measuring and Marking",
        difficulty: "Beginner",
        timeEst: "1 Hour",
        tools: "25ft tape measure, combination square, framing square, speed square, marking knife, mechanical pencil, chalk line",
        overview: "Accurate layout is the secret to professional craftsmanship. The old adage 'measure twice, cut once' starts with knife precision rather than dull pencil lines.",
        technique: "Understand that tape measure end-hooks slide precisely the thickness of the hook plate (1/16-inch) to ensure accurate inside and outside measurements. Use a combination square to scribe crisp 90-degree and 45-degree lines. Mark wood with a thin knife line that severs surface fibers for a splinter-free saw cut.",
        proTip: "Never measure from the floppy hook for fine cabinet joinery; burn an inch by aligning the 1-inch mark with your reference edge, then add one inch to your target dimension.",
        ytQuery: "https://www.youtube.com/results?search_query=measuring+and+marking+tricks+for+woodworking"
      },
      {
        id: "s1_t11",
        title: "Hand Drills and Braces",
        difficulty: "Intermediate",
        timeEst: "1-2 Hours",
        tools: "Traditional 2-jaw sweep brace, auger bits, eggbeater hand drill, center punch, depth stop collar",
        overview: "Manual braces and eggbeater drills provide whisper-quiet, ultra-controlled drilling with immense torque, ideal for deep auger bores and off-grid woodworking.",
        technique: "Center punch your starting hole. Seat the screw point of the auger bit on the mark. Turn the brace sweep clockwise with steady forward pressure against the head. When the lead screw pokes through the back side, stop and flip the board over to finish the hole from the reverse side to prevent blowout.",
        proTip: "Auger bits are self-feeding due to their threaded lead point; once the lead engages wood, you only need to rotate the sweep without leaning your full weight into the brace.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+use+woodworking+brace+and+bit+traditional"
      },
      {
        id: "s1_t12",
        title: "Planes",
        difficulty: "Intermediate",
        timeEst: "2 Hours",
        tools: "No. 4 smoothing plane, No. 5 jack plane, bench vise, winding sticks, straightedge, honing stone",
        overview: "Hand planes flatten board faces, straighten warped edges, and leave a glass-smooth surface that requires zero sandpaper.",
        technique: "Retract the iron until it barely kisses the sole. Sight down the sole to ensure the iron edge is parallel to the mouth, adjusting with the lateral lever. Skew the plane slightly, lean your weight onto the front knob at the entry of the stroke, and transfer weight to the rear tote as you exit the board.",
        proTip: "Always plane with the direction of the wood grain (sloping downhill in the direction of your pass) to prevent tearout.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+setup+and+use+a+hand+plane+paul+sellers"
      },
      {
        id: "s1_t13",
        title: "Special-Purpose Planes",
        difficulty: "Advanced",
        timeEst: "2-3 Hours",
        tools: "Block plane, shoulder plane, router plane, spoke shave, rabbet plane",
        overview: "Specialized planes clean end grain, level tenon cheeks, cut deep grooves (dados/rabbets), and shape organic curved chair spindles.",
        technique: "Use a low-angle block plane with its bevel-up iron to slice end grain cleanly without splitting end fibers (clamp a sacrificial backer block flush with the exit edge). Use a router plane to trim the bottom of dados and hinge mortises to an exact, uniform depth.",
        proTip: "Lubricate the sole of cast-iron planes with a swipe of mutton tallow or paraffin wax; the reduction in sliding friction makes long planing sessions effortless.",
        ytQuery: "https://www.youtube.com/results?search_query=specialty+hand+planes+router+plane+shoulder+block"
      },
      {
        id: "s1_t14",
        title: "Chisels and Gouges",
        difficulty: "Intermediate",
        timeEst: "1-2 Hours",
        tools: "Bench chisel set (1/4\", 1/2\", 3/4\", 1\"), carving gouge, wooden striking mallet, clamp",
        overview: "Chisels pare joinery, chop deep mortises, and recess door hinges. A sharp chisel is safer and more predictable than a dull one.",
        technique: "Never strike a wooden chisel handle with a metal hammerâ€”always use a wooden or urethane mallet. For paring, face the flat back against your reference surface and push with hand pressure while keeping both hands behind the cutting edge.",
        proTip: "The back of a chisel must be flattened to a mirror polish just like the bevel; if the back is wavy, the edge can never become truly razor sharp.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+use+wood+chisels+woodworking+for+mere+mortals"
      },
      {
        id: "s1_t15",
        title: "Files and Filing",
        difficulty: "Beginner",
        timeEst: "1 Hour",
        tools: "Flat bastard file, mill file, half-round file, round (rat-tail) file, needle files, file card/brush, wooden handles",
        overview: "Files shape metal, deburr cut conduit, tune garden tools, and fit joint parts. Correct technique prevents clogging teeth and slipping.",
        technique: "Never use a file without a tight wooden or composite handle installed on the pointed tang. Hold the handle with your dominant hand and rest the tip between thumb and forefinger of the other. Push smoothly forward, lifting on the return stroke. Clean metal pins with a brass file card.",
        proTip: "Rub chalk along the file teeth before working soft metals like aluminum or brass; the chalk prevents sticky metal filings (pinning) from embedding in the gullets.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+use+a+file+properly+metalworking"
      },
      {
        id: "s1_t16",
        title: "Vises and Clamps",
        difficulty: "Beginner",
        timeEst: "1 Hour",
        tools: "Bench vise, quick-grip clamps, parallel bar clamps, C-clamps, spring clamps, pipe clamps",
        overview: "Clamps are your 'extra hands' in the shop, providing critical pressure for gluing boards and securing materials safely while cutting.",
        technique: "Position clamps alternately over and under glued panel joints to equalize clamping pressure and prevent the panel from bowing. Use wooden or plastic jaw pads to protect delicate lumber faces from denting under high clamping pressure.",
        proTip: "Do not overtighten clamps during glue-ups; cranking down with extreme pressure starves the wood joint of glue, creating a weak bond.",
        ytQuery: "https://www.youtube.com/results?search_query=woodworking+clamps+guide+how+to+clamp+glue+ups"
      },
      {
        id: "s1_t17",
        title: "Tools for Soldering",
        difficulty: "Intermediate",
        timeEst: "1-2 Hours",
        tools: "40W-60W temperature-controlled soldering iron, rosin-core solder (60/40 or lead-free), damp sponge, wire stripper, heat-shrink tubing",
        overview: "Electrical soldering forms durable, low-resistance metallic bonds between wires, terminals, and circuit boards.",
        technique: "Heat the iron to 350Â°C-370Â°C and tin the tip with fresh solder. Clean wire ends thoroughly and twist tightly. Heat the copper wire joint with the flat of the iron for 2-3 seconds, then touch solder to the heated wireâ€”never directly to the iron tipâ€”allowing molten solder to wick naturally through strands.",
        proTip: "A shiny, concave solder fillet indicates a perfect joint; a dull, grainy ball indicates a cold solder joint that will fail under vibration.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+solder+properly+for+beginners+electronics"
      },
      {
        id: "s1_t18",
        title: "Sharpening",
        difficulty: "Intermediate",
        timeEst: "1-2 Hours",
        tools: "Waterstones or diamond plates (300, 1000, 4000/8000 grit), honing guide, leather strop with chromium oxide paste",
        overview: "A sharp blade requires a fraction of the cutting effort, leaving clean, burnish-free cuts and vastly improving workshop safety.",
        technique: "Establish the primary bevel (typically 25 degrees) on your medium stone using a roller honing guide. Progress through finer grits, creating a micro-bevel at 30 degrees until a raised wire burr forms along the back. Flip to the polished flat back to remove the burr, then strop on leather for a razor edge.",
        proTip: "Test sharpness by cleanly slicing newspaper across the grain with zero tearing or dragging; if it catches, return to the fine honing stone.",
        ytQuery: "https://www.youtube.com/results?search_query=sharpening+chisels+and+plane+irons+paul+sellers"
      },
      {
        id: "s1_t19",
        title: "Sanding and Sandpaper",
        difficulty: "Beginner",
        timeEst: "1-2 Hours",
        tools: "Cork or rubber sanding block, aluminum oxide sandpaper sheets (80, 120, 150, 220 grit), tack cloth, dust mask",
        overview: "Proper sanding removes mill marks, planer tearout, and prepares wood fibers to receive stain and clear coats evenly.",
        technique: "Always sand strictly parallel with the direction of the wood grainâ€”cross-grain sanding leaves unsightly scratches visible under finishes. Progress sequentially through grits without skipping more than one grit step (e.g., 80 -> 120 -> 180 -> 220). Wipe with tack cloth between grits.",
        proTip: "Wipe unfinished wood with a damp cloth (raising the grain), allow it to dry thoroughly, and sand lightly with 220 grit before applying water-based stains to prevent rough swelling.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+sand+wood+like+a+pro+tips+tricks"
      }
    ]
  },
  {
    id: 2,
    title: "Power Tools for the Home Workshop",
    subtitle: "Speed, Power, and Precision Machinery",
    icon: "fa-bolt",
    intro: "Power tools multiply human effort and speed up production. Understanding tool anatomy, feed rates, blade selection, and kickback physics guarantees safe, professional results.",
    prep40: [
      "Workshop electrical capacity: Verify circuit amperage (dedicated 20A breaker recommended for heavy stationary saws).",
      "Dust collection and PPE: Connect shop vac / dust collector; wear N95 respirator, ear protection, and safety glasses.",
      "Clear zone protocol: Remove loose clothing, jewelry, roll up long sleeves, and tie back long hair before touching switches.",
      "Machine inspection: Unplug or disconnect batteries before changing blades, bits, or making mechanical adjustments."
    ],
    tech30: {
      beginner: "Operating cordless drills without cam-out or snapping screws; straight crosscutting with a circular saw and guide rail; safe orbital sanding.",
      intermediate: "Routing clean dados and edge profiles without burn marks; table saw rip cuts with riving knife and push sticks; drill press jigs.",
      expert: "Operating wood lathes for spindle and bowl turning; tuning band saw blade drift and tension; setting jointer knives to thousandths of an inch."
    },
    risk30: {
      projects: "Cabinet fabrication, deck framing, custom moldings, mortise and tenon joinery, furniture builds.",
      risks: "Severe physical injury (blade contact, kickback projectile impacts, respiratory dust damage).",
      callPro: "Heavy structural beam installations requiring industrial hoisting, or high-voltage 240V subpanel wiring."
    },
    tasks: [
      {
        id: "s2_t1",
        title: "Electric Drills",
        difficulty: "Beginner",
        timeEst: "1 Hour",
        tools: "Cordless drill/driver, impact driver, high-speed steel twist bits, brad-point bits, driver bits, pilot hole countersink bit",
        overview: "Cordless drill/drivers are the ultimate workshop workhorse for boring clean holes and driving heavy fasteners effortlessly.",
        technique: "Use high speed (Gear 2) for drilling small holes in wood/metal and low speed (Gear 1) with adjustable clutch collar for driving screws flush. Match bit type to material (brad-point for clean wood holes, masonry carbide for brick, cobalt for stainless steel).",
        proTip: "Use an impact driver for long structural screws and lag bolts; the rotational concussive blows deliver extreme torque without twisting your wrist or stripping fastener heads.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+use+drill+and+impact+driver+beginners"
      },
      {
        id: "s2_t2",
        title: "Circular Power Saws",
        difficulty: "Intermediate",
        timeEst: "1-2 Hours",
        tools: "7-1/4 inch circular saw, carbide-tipped framing/finishing blade, speed square, clamp-on straightedge guide, push sticks",
        overview: "A handheld circular saw breaks down large sheet goods and cuts framing dimensional lumber with blazing speed and clean accuracy.",
        technique: "Set blade depth so teeth extend only 1/8 to 1/4-inch below the bottom of the workpiece. Support the cutoff piece loosely or support both sides with sacrificial 2x4 foam insulation so the kerf does not pinch the blade and trigger kickback. Guide the saw base along a clamped straightedge.",
        proTip: "Keep the saw base flat against the stock throughout the entire stroke. If the saw binds, release the trigger immediatelyâ€”never try to back out while the blade is spinning.",
        ytQuery: "https://www.youtube.com/results?search_query=circular+saw+tips+how+to+cut+straight+this+old+house"
      },
      {
        id: "s2_t3",
        title: "Saber Saw (Jigsaw)",
        difficulty: "Beginner",
        timeEst: "1 Hour",
        tools: "Corded/cordless jigsaw, fine/medium wood blades, metal-cutting bimetal blade, relief cut layout pencil",
        overview: "The jigsaw or saber saw excels at cutting organic curves, interior sink cutouts, and intricate scrollwork in wood, plastics, and sheet metals.",
        technique: "Bore a 3/8-inch starter hole inside waste areas for interior plunge cuts. Keep the saw baseplate firmly pressed against the workpiece to prevent violent blade bouncing. Turn off orbital action for tight curves and metal; turn on orbital action for fast straight wood cuts.",
        proTip: "Use reverse-pitch (downcut) blades when cutting finished plastic laminates or pre-veneered plywood to prevent chipping the show face.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+use+a+jigsaw+properly+clean+cuts"
      },
      {
        id: "s2_t4",
        title: "Special Power Saws",
        difficulty: "Intermediate",
        timeEst: "1-2 Hours",
        tools: "Reciprocating saw (Sawzall), oscillating multi-tool, plunge cut blades, bi-metal demolition blades",
        overview: "Demolition saws and oscillating multi-tools tackle remodeling cuts inside existing walls, flush cuts under door casings, and pipe severance.",
        technique: "With a reciprocating saw, always keep the metal shoe pressed tight against the cutting surface to absorb vibration. For oscillating multi-tools, let high-frequency vibration do the cutting with light hand pressure to avoid overheating and dulling teeth.",
        proTip: "An oscillating tool with a bi-metal plunge blade can slice hidden framing nails during window/door removal without damaging drywall or finished jambs.",
        ytQuery: "https://www.youtube.com/results?search_query=oscillating+tool+and+reciprocating+saw+uses+tips"
      },
      {
        id: "s2_t5",
        title: "The Router",
        difficulty: "Intermediate",
        timeEst: "2 Hours",
        tools: "Fixed-base / plunge router, 1/4\" and 1/2\" collets, carbide bits (roundover, straight, flush-trim, chamfer), edge guide",
        overview: "The router spins bits at 20,000+ RPM to mill decorative profiles, cut precise joinery dados, and duplicate identical template pieces.",
        technique: "Always route against the rotation of the bit (feed left-to-right on outside edges) to prevent dangerous 'climb cutting' where the router runs away. Take multiple light passes when cutting deep grooves rather than hogging out deep material in a single heavy pass.",
        proTip: "Buy 1/2-inch shank bits whenever your router collet allows; they vibrate significantly less than 1/4-inch shanks, producing smoother finishes and longer bit life.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+use+a+wood+router+for+beginners"
      },
      {
        id: "s2_t6",
        title: "Electric Planes",
        difficulty: "Intermediate",
        timeEst: "1-2 Hours",
        tools: "Handheld power planer, carbide reversible blades, dust bag / vacuum port, edge guide, bevel chamfer groove",
        overview: "Power hand planers remove heavy stock rapidly, making short work of sticking doors, rough framing lumber, and rafter leveling.",
        technique: "Set depth adjustments in fine increments (1/32-inch or 1/64-inch). Keep firm downward pressure on the front shoe as the cut begins, and transfer pressure to the rear shoe as the front exits the stock to prevent 'snipe' (hollowing at the ends of boards).",
        proTip: "Check old doors or lumber thoroughly with a metal detector or magnet before power planing; hitting a hidden nail instantly chips carbide blades at 15,000 RPM.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+use+an+electric+hand+planer+properly"
      },
      {
        id: "s2_t7",
        title: "Power Sanders",
        difficulty: "Beginner",
        timeEst: "1-2 Hours",
        tools: "Random orbit sander (ROS), 5-inch hook-and-loop sanding discs (80, 120, 180, 220), vacuum attachment, dust mask",
        overview: "Random orbital sanders combine spinning and oscillating motions to eliminate swirl marks while smoothing large timber panels rapidly.",
        technique: "Turn on the sander before touching the wood, lower it flat, and glide it across the surface with light hand weight (never push down). Move at a deliberate crawl of approximately 1 inch per second, overlapping passes by 50% in a grid pattern.",
        proTip: "Draw light pencil squiggles across the entire workpiece before each grit progression; once the pencil lines are sanded away uniformly, you are ready for the next grit.",
        ytQuery: "https://www.youtube.com/results?search_query=random+orbit+sander+tips+avoid+swirl+marks"
      },
      {
        id: "s2_t8",
        title: "The Grinder",
        difficulty: "Intermediate",
        timeEst: "1-2 Hours",
        tools: "4-1/2 inch angle grinder, grinding wheel, wire cup brush, flap disc, full face shield, heavy leather welding gloves",
        overview: "Angle grinders cut rebar, grind down welds, strip rust, clean mortar, and sharpen lawn mower blades with aggressive rotational power.",
        technique: "Always install and orient the adjustable wheel guard between the disc and your face/body. Grip the tool firmly with both hands. Angle grinding discs at 15 to 30 degrees to the metal surface. Keep sparks directing away from flammable fuels or sawdust piles.",
        proTip: "Never use a thin metal cutoff wheel for side grinding or deburring; lateral pressure can shatter the wheel at 11,000 RPM, creating lethal high-speed shrapnel.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+use+an+angle+grinder+safely"
      },
      {
        id: "s2_t9",
        title: "Belt Sander",
        difficulty: "Intermediate",
        timeEst: "1 Hour",
        tools: "3x21 inch portable belt sander, 60/80/120 grit abrasive belts, tracking knob, dust collector hose",
        overview: "A handheld belt sander provides heavy-duty material removal, leveling rough glued tabletops and stripping thick exterior paint quickly.",
        technique: "Ensure the belt is installed following the arrow direction printed on the backing. Adjust tracking so the belt runs centered on the rollers. Hold the sander with both hands before starting motor, touch down gently while keeping the tool moving to avoid digging gouges.",
        proTip: "Never leave a running belt sander resting in one spot on a board even for half a second; its aggressive grit will instantly grind a deep depression that takes hours to plane flat.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+use+a+belt+sander+without+ruining+wood"
      },
      {
        id: "s2_t10",
        title: "Bench Saw (Table Saw)",
        difficulty: "Advanced",
        timeEst: "2-3 Hours",
        tools: "Table saw, riving knife, blade guard, rip fence, miter gauge, push sticks, zero-clearance insert",
        overview: "The table saw is the centerpiece of the woodworking shop. Its spinning circular blade delivers unmatched accuracy for ripping and crosscutting lumber.",
        technique: "Never make a freehand cut without either the rip fence or miter gauge guiding the stock. Always ensure the riving knife is installed to prevent kerf pinching. Stand to the left of the blade line and push stock completely past the blade with dedicated push sticks.",
        proTip: "Never use the rip fence and miter gauge together simultaneously when crosscutting; cutoff scraps trapped between blade and fence will shoot back with explosive force.",
        ytQuery: "https://www.youtube.com/results?search_query=table+saw+safety+and+basics+for+beginners"
      },
      {
        id: "s2_t11",
        title: "Radial Arm Saw",
        difficulty: "Advanced",
        timeEst: "2 Hours",
        tools: "Radial arm saw, negative rake blade, wooden sacrificial table top, clamp stops, square alignment wrench",
        overview: "A classic shop tool for crosscutting long boards to length, cutting compound angles, and dados along an overhead sliding arm carriage.",
        technique: "Always pull the spinning blade through the timber toward yourself during crosscuts, using firm downward holding force with your left hand well outside the blade path. Calibrate the arm 90-degree stop with an engineer's square against the rear fence.",
        proTip: "Use a saw blade with a negative or zero-degree hook angle; positive rake blades tend to aggressively 'climb' into the wood and pull themselves forward toward the operator.",
        ytQuery: "https://www.youtube.com/results?search_query=radial+arm+saw+setup+safety+and+operation"
      },
      {
        id: "s2_t12",
        title: "Jigsaw and Shaper",
        difficulty: "Advanced",
        timeEst: "2-3 Hours",
        tools: "Scroll saw / stationary jigsaw, spindle shaper, spindle cutters, hold-downs, featherboards",
        overview: "Scroll saws handle filigree intarsia and fretwork, while stationary spindle shapers mill large architectural moldings and raised cabinet panels.",
        technique: "For scroll sawing, maintain high blade tension and light continuous forward feed, turning the workpiece pivoting on the blade. On a spindle shaper, always use featherboards and full hold-down guards to keep hands inches away from heavy cutterheads.",
        proTip: "On a spindle shaper, never shape small stock freehand without a heavy sliding carriage or specialized holding jig to prevent cutter snatch.",
        ytQuery: "https://www.youtube.com/results?search_query=scroll+saw+vs+shaper+basics+woodworking"
      },
      {
        id: "s2_t13",
        title: "Band Saw",
        difficulty: "Intermediate",
        timeEst: "2 Hours",
        tools: "14-inch band saw, 1/4\" curve blade & 1/2\" resaw blade, thrust bearings, miter fence, push stick",
        overview: "The band saw cuts curves in thick timber, resaws wide lumber into thin veneers, and is one of the safest power saws due to its downward cutting motion.",
        technique: "Adjust the upper guide assembly so it sits no more than 1/4-inch above the top surface of your workpiece. Adjust side cool-blocks and rear thrust bearings so they barely clear the blade during idle and engage under cutting pressure.",
        proTip: "When cutting tight curves, make frequent straight 'relief cuts' from the waste edge inward to your curved line; this allows waste chunks to fall away without twisting the blade.",
        ytQuery: "https://www.youtube.com/results?search_query=bandsaw+setup+and+tune+up+alex+snodgrass"
      },
      {
        id: "s2_t14",
        title: "Jointer",
        difficulty: "Advanced",
        timeEst: "2 Hours",
        tools: "6-inch or 8-inch wood jointer, push pads/blocks, straightedge, magnetic knife setting gauge, square",
        overview: "The jointer establishes a perfectly flat reference face and a true 90-degree square reference edge on rough-sawn lumber.",
        technique: "Inspect the board for cupping or bow; always face the concave 'cup down' onto the infeed table for stability. Use two friction push blocks to advance the board across cutterhead, transferring pressure from infeed to outfeed table as the board passes the knives.",
        proTip: "Never joint board faces shorter than 12 inches or thinner than 1/2-inch without dedicated carrier sleds, as short pieces can tip into the cutterhead gap.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+use+a+jointer+woodworking+basics"
      },
      {
        id: "s2_t15",
        title: "Wood Lathe",
        difficulty: "Advanced",
        timeEst: "3-4 Hours",
        tools: "Wood lathe, roughing gouge, spindle gouge, skew chisel, parting tool, face shield, tool rest",
        overview: "The wood lathe spins wood along an axis while sharp chisels sculpt cylindrical spindles, table legs, bowls, and decorative turnings.",
        technique: "Position the tool rest approximately 1/8-inch above the center line and within 1/4-inch of the turning piece. Always rotate the mounted blank by hand 360 degrees before flipping the power switch to verify it clears the tool rest completely.",
        proTip: "Rub the bevel of the turning tool against the spinning wood before raising the handle to engage the cutting edge; this 'riding the bevel' ensures clean shaving rather than violent catches.",
        ytQuery: "https://www.youtube.com/results?search_query=woodturning+basics+for+beginners+lathe"
      },
      {
        id: "s2_t16",
        title: "Drill Press",
        difficulty: "Intermediate",
        timeEst: "1 Hour",
        tools: "Benchtop or floor drill press, keyed/keyless chuck, Forstner bits, twist bits, drill press vise, clamping hold-down",
        overview: "The drill press delivers perpendicular 90-degree holes bored to exact mechanical depths with high torque and zero wobble.",
        technique: "Adjust pulley belt speeds: use high RPM for small bits in softwood, and slow RPM (under 500 RPM) for large Forstner bits or drilling metal. Always clamp workpieces or vices securely to the cast iron tableâ€”never hold small metal parts by hand.",
        proTip: "Clamp a scrap wood fence to the left side of the table against your work; if the drill bit bites and jams, the fence prevents the workpiece from spinning into a dangerous propeller.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+use+a+drill+press+tips+and+tricks"
      }
    ]
  },
  {
    id: 3,
    title: "Fasteners, Hardware, and Adhesives",
    subtitle: "The Connectors of the Modern World",
    icon: "fa-screwdriver",
    intro: "Modern structures and furniture rely on matched fasteners, durable hardware hinges and slides, and modern chemical adhesives tailored to substrate physics.",
    prep40: [
      "Material compatibility audit: Match fastener metallurgy to environment (galvanized/stainless for exterior, coated for pressure treated).",
      "Load path assessment: Calculate shear force vs tension pull-out force before picking wall anchors or structural lag screws.",
      "Chemical safety: Ensure cross-ventilation when working with contact cements, polyurethane glues, and solvent-based adhesives.",
      "Hardware test fitting: Always dry-fit hinges, slides, and latch strikes before driving permanent fasteners."
    ],
    tech30: {
      beginner: "Selecting nail and screw gauges; predrilling pilot holes; choosing wall anchors for drywall; basic hinge alignment.",
      intermediate: "Installing European concealed cup hinges; mortising butt hinges with chisel/router; setting structural sleeve masonry anchors.",
      expert: "Laminating complex curved veneers with urea-formaldehyde resin; hardware restoration and keying; high-shear epoxy engineering."
    },
    risk30: {
      projects: "Hanging kitchen cabinets, repairing entry doors, anchoring heavy televisions, furniture assembly, framing decks.",
      risks: "Cabinet or heavy mirror wall collapses if anchors fail; stripped screws; split expensive hardwoods.",
      callPro: "Anchor bolts into damaged foundation perimeter stem walls, or commercial panic-exit door hardware."
    },
    tasks: [
      {
        id: "s3_t1",
        title: "Nail Types and Uses",
        difficulty: "Beginner",
        timeEst: "30 Mins",
        tools: "Assortment box: common, box, finishing, casing, brad, ring-shank, duplex, drywall nails",
        overview: "Nails are sized by the 'penny' system (indicated by 'd'). Choosing the correct shank diameter and head design prevents wood splits and joint failure.",
        technique: "Use heavy common nails for structural house framing where shear strength is required. Use thin-shank box nails for lighter siding to prevent splitting. Use finishing and casing nails with cupped heads for trim molding, countersinking below the wood surface.",
        proTip: "Ring-shank nails provide double the withdrawal holding power of smooth nails by locking wood fibers into radial ridges, making them ideal for subfloors that squeak.",
        ytQuery: "https://www.youtube.com/results?search_query=nail+types+and+uses+explained+family+handyman"
      },
      {
        id: "s3_t2",
        title: "Nail Selection",
        difficulty: "Beginner",
        timeEst: "30 Mins",
        tools: "Tape measure, lumber stock samples, fastener chart",
        overview: "Selecting the correct nail length ensures at least 1.5 to 2 times the thickness of the material being fastened penetrates into the supporting framing.",
        technique: "For fastening 3/4-inch subfloor to 2x joists, use 2-1/2-inch (8d) nails. For 1/2-inch drywall, use 1-1/4-inch drywall nails. For exterior siding, always select hot-dipped galvanized or aluminum nails to prevent black streaking from rust corrosion.",
        proTip: "Electro-galvanized nails have a microscopic zinc wash that corrodes outdoors within years; only hot-dipped galvanized (HDG) nails withstand exterior weather and treated lumber chemicals.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+choose+the+right+nail+woodworking"
      },
      {
        id: "s3_t3",
        title: "Nailing Tips",
        difficulty: "Beginner",
        timeEst: "30 Mins",
        tools: "Claw hammer, nail set, scrap hardwood, needle-nose pliers or cardboard strip",
        overview: "Proper nailing technique prevents finger injuries, avoids hammer 'elephant tracks' in finished wood, and maximizes joint strength.",
        technique: "To drive tiny brads without smashing your fingers, push the brad through a piece of stiff cardboard or comb teeth to hold it steady while striking the first taps. Stagger nail lines slightly off the grain line to avoid creating a continuous split in the wood.",
        proTip: "Angle paired nails toward each other at 15 to 20 degrees ('toenailing'); the opposing angles mechanically lock the pieces together, tripling withdrawal resistance.",
        ytQuery: "https://www.youtube.com/results?search_query=pro+nailing+tips+and+tricks+carpentry"
      },
      {
        id: "s3_t4",
        title: "Concrete and Masonry Nails",
        difficulty: "Intermediate",
        timeEst: "1 Hour",
        tools: "Hardened steel fluted/cut masonry nails, 2.5 lb hand drilling hammer (club hammer), safety goggles, powder-actuated tool",
        overview: "Hardened steel nails secure furring strips, electrical boxes, and bottom wall plates directly to poured concrete and brick mortar.",
        technique: "Wear heavy wrap-around eye protection because hardened nails can shatter like glass if struck glancing blows. Strike dead-center with a heavy 2.5-pound club hammer rather than a claw hammer. Drive nails at least 3/4-inch to 1-inch into cured concrete.",
        proTip: "For large projects, rent a powder-actuated tool (.22 caliber charge) to shoot hardened pins instantly into foundation slabs without manual pre-drilling.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+drive+nails+into+concrete+and+brick"
      },
      {
        id: "s3_t5",
        title: "Screws",
        difficulty: "Beginner",
        timeEst: "30 Mins",
        tools: "Screw gauge chart, wood screws, drywall screws, deck screws, sheet metal screws, machine screws",
        overview: "Screws provide immense tension clamping force and can be disassembled without damaging components. Head styles include flat, pan, round, and bugle.",
        technique: "Choose Torx (Star) or Robertson (Square) drive screws over Phillips whenever possible to eliminate slipping. Match screw diameter (#6, #8, #10) and thread pitch (coarse for softwood/drywall, fine for hardwood/metal) to your workpiece.",
        proTip: "Never use drywall screws for structural framing or outdoor decks; their brittle hardened steel snaps easily under shear and thermal movement.",
        ytQuery: "https://www.youtube.com/results?search_query=screw+types+and+threads+explained+this+old+house"
      },
      {
        id: "s3_t6",
        title: "Screwing Applications",
        difficulty: "Beginner",
        timeEst: "1 Hour",
        tools: "Cordless drill, combination countersink bit, bar clamps, paraffin wax block",
        overview: "Joining hardwoods and cabinetry with screws requires proper pilot hole drilling, clearance hole sizing, and countersinking.",
        technique: "Drill a pilot hole equal to the screw's root diameter (inside threads) into the receiving piece. Drill a clearance hole equal to the outer thread diameter through the face piece so threads do not bite into the top board, pulling the joint tightly shut.",
        proTip: "Rub the threads of a wood screw across a cake of paraffin wax or bar soap before driving; the lubricant dramatically reduces torque friction in dense oak or maple.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+properly+pre+drill+and+drive+wood+screws"
      },
      {
        id: "s3_t7",
        title: "Nuts and Bolts",
        difficulty: "Beginner",
        timeEst: "45 Mins",
        tools: "Hex head bolts, carriage bolts, lock washers, nylon-insert locknuts, open-end wrenches, ratchet",
        overview: "Bolts and machine screws provide high-strength clamping for structural framing, metal machinery, automotive parts, and playground assemblies.",
        technique: "Use carriage bolts with their rounded heads and square neck collars to lock into square wood holes for tamper-resistant outdoor gates. Always place a flat washer against the nut before tightening to distribute clamping pressure over a wide bearing area.",
        proTip: "Use nylon-insert locknuts (Nyloc) or blue thread-locking compound on assemblies subject to motor vibration or swinging movement to prevent nuts from loosening.",
        ytQuery: "https://www.youtube.com/results?search_query=nuts+bolts+and+washers+how+to+choose+and+use"
      },
      {
        id: "s3_t8",
        title: "Attaching to Hollow Surfaces",
        difficulty: "Intermediate",
        timeEst: "1 Hour",
        tools: "Toggle bolts, snap toggles, threaded drywall anchors (Zip-it), hollow wall mollies, drill, screwdriver",
        overview: "Fastening mirrors, shelves, and grab bars to hollow drywall and plaster requires anchors that expand or flip behind the wall board.",
        technique: "Use threaded zinc anchors for lightweight decor up to 20 lbs. For floating shelves or TV brackets that cannot hit a wall stud, use 1/4-inch heavy-duty snap toggles: drill a 1/2-inch hole, push the metal channel through, zip the collar flush, and fasten with machine bolts.",
        proTip: "Never use cheap plastic expansion plugs in hollow drywall; they have almost zero holding power without solid framing behind them and will pull right out.",
        ytQuery: "https://www.youtube.com/results?search_query=best+drywall+anchors+tested+project+farm"
      },
      {
        id: "s3_t9",
        title: "Attaching to Solid Surfaces",
        difficulty: "Intermediate",
        timeEst: "1-2 Hours",
        tools: "Hammer drill, carbide masonry bits, Tapcon screws, drop-in sleeve anchors, wedge anchors, blower bulb",
        overview: "Securing ledger boards, safe boxes, and handrails to solid concrete, stone, or brick demands mechanical expansion anchors or masonry screws.",
        technique: "Bore holes using a rotary hammer drill with carbide bit to the exact depth specified. Blow out all dust thoroughly with a bulb pump. Drive concrete screw anchors (Tapcons) with steady, slow torque until seated snug without over-torquing.",
        proTip: "Blowing all pulverized masonry dust out of the drilled hole is critical; packed concrete dust prevents screw threads from biting and jams mechanical expansion wedges.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+anchor+into+concrete+brick+masonry"
      },
      {
        id: "s3_t10",
        title: "Hinges",
        difficulty: "Intermediate",
        timeEst: "1-2 Hours",
        tools: "Butt hinges, concealed European cup hinges, piano hinges, combination square, sharp 3/4\" chisel, self-centering Vix bit",
        overview: "Hinges allow doors, cabinets, and chest lids to swing smoothly while supporting substantial vertical and cantilevered weight.",
        technique: "Mark hinge leaf outlines with a marking knife. Score perimeter edges with chisel cuts. Chop shallow waste mortises to the exact leaf thickness. Fasten using self-centering 'Vix' drill bits to guarantee screws enter the absolute dead center of countersunk holes.",
        proTip: "On heavy interior doors, replace one standard 3/4-inch hinge screw in the top jamb leaf with a 3-inch screw driven through the jamb and deep into the framing wall studs.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+install+and+mortise+door+hinges+properly"
      },
      {
        id: "s3_t11",
        title: "Door Hardware",
        difficulty: "Beginner",
        timeEst: "1 Hour",
        tools: "Entry lockset, deadbolt kit, hole saw (2-1/8\"), spade bit (1\"), chisel, Phillips screwdriver",
        overview: "Exterior and interior entry locksets, passage knobs, and privacy latches provide home security, privacy, and smooth daily ingress.",
        technique: "Use a plastic door lock template to mark backset (2-3/8\" or 2-3/4\"). Drill the 2-1/8\" face bore from both sides to avoid blowout when breaking through. Drill the 1\" latch hole into the edge. Chisel the latch plate mortise flush with the door perimeter.",
        proTip: "If a door rattles when closed, bend the small adjustment tab inside the strike plate slightly forward toward the door stop to tighten latch engagement.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+install+a+door+lockset+and+deadbolt"
      },
      {
        id: "s3_t12",
        title: "Door and Cabinet Hardware",
        difficulty: "Beginner",
        timeEst: "1-2 Hours",
        tools: "Cabinet drawer pulls, knobs, acrylic hardware alignment jig, drill, clamp, magnetic catch",
        overview: "Cabinet handles and drawer knobs define kitchen aesthetics. Consistent, level placement across dozens of doors requires precision alignment jigs.",
        technique: "Build or buy a simple acrylic template jig with preset stop collars. Clamp the jig securely to each door corner, drill holes from the front face through to the back, and secure screws with star washers inside the cabinet box to prevent loosening.",
        proTip: "Place a scrap block of wood clamped firmly against the backside of cabinet door stiles when drilling hardware holes to prevent the drill bit from tearing out the wood.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+install+cabinet+hardware+knobs+pulls+jig"
      },
      {
        id: "s3_t13",
        title: "Screen and Storm Door Hardware",
        difficulty: "Intermediate",
        timeEst: "1 Hour",
        tools: "Pneumatic door closer, wind chain, screen door push-button latch, drill, screwdriver",
        overview: "Storm door hardware keeps doors from blowing off hinges in heavy winds and ensures they close completely without slamming aggressively.",
        technique: "Mount the pneumatic closer bracket to the door frame header and closer body to the door face. Adjust the tension screw at the cylinder base: turn clockwise to slow closing speed and counter-clockwise to speed it up until the latch clicks securely shut.",
        proTip: "Always install an overhead storm safety chain with an internal cushion spring to prevent sudden wind gusts from overextending and ripping hinges out of the aluminum frame.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+install+adjust+storm+door+closer"
      },
      {
        id: "s3_t14",
        title: "Miscellaneous Hardware",
        difficulty: "Beginner",
        timeEst: "45 Mins",
        tools: "Barrel bolts, hasps, padlock, magnetic door stops, spring hinges, caster wheels",
        overview: "Utility hardware components secure sheds, prevent doorknobs from punching holes in drywall, and mobilize heavy shop equipment.",
        technique: "Install baseboard spring stops or hinge-pin stops to protect drywall behind doors. When mounting safety hasps on sheds, ensure all screw heads are completely concealed underneath the folded hasp leaf when padlocked to prevent easy disassembly.",
        proTip: "Use total-lock casters on workshop tool carts; total-lock designs freeze both wheel rotation and swivel rotation with a single foot lever for zero bench wobble.",
        ytQuery: "https://www.youtube.com/results?search_query=workshop+and+home+utility+hardware+installation"
      },
      {
        id: "s3_t15",
        title: "Adhesives",
        difficulty: "Intermediate",
        timeEst: "1 Hour",
        tools: "PVA wood glue (Titebond II/III), polyurethane glue (Gorilla), 5-minute epoxy, contact cement, construction adhesive (PL Premium), caulk gun",
        overview: "Adhesives create chemical bonds between surfaces. Matching open time, water resistance, gap-filling capability, and clamping requirements is key.",
        technique: "Use PVA glue for standard interior woodwork (requires tight wood-to-wood contact and 30-minute clamp pressure). Use 2-part epoxy for metal, stone, and non-porous gap filling. Use solvent-free construction adhesive for heavy subflooring and drywall over framing.",
        proTip: "Wipe fresh PVA glue squeeze-out with a damp rag, or wait 30 minutes until it turns to a rubbery skin, then slice it cleanly off with a sharp chisel to avoid smearing pores.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+choose+the+right+glue+woodworking+epoxy"
      }
    ]
  },
  {
    id: 4,
    title: "Making Your Own Interior Repairs",
    subtitle: "Restoring the Integrity of Your Living Space",
    icon: "fa-house-chimney-window",
    intro: "Homes settle, doors bind, drywall cracks, and moisture causes wear. Learning interior repairs preserves property value and solves everyday household nuisances independently.",
    prep40: [
      "Diagnostic inspection: Distinguish cosmetic surface cracks from structural foundation settling or hidden plumbing leaks.",
      "Dust and floor protection: Lay heavy canvas drop cloths and tape poly sheeting across doorways to contain gypsum dust.",
      "Ventilation & PPE: Wear N95 particulate respirators when sanding drywall compound or dealing with old attic insulation.",
      "Underlying cause remediation: Never patch water-damaged plaster without first discovering and repairing the roof or pipe leak."
    ],
    tech30: {
      beginner: "Patching small nail holes with spackle; weatherstripping drafty doors; lubricating sticking window channels; replacing screen mesh.",
      intermediate: "Taping and mudding drywall joints with feathering knives; repairing squeaking subfloors; rehanging sagging doors; replacing cracked tiles.",
      expert: "Rebuilding wood double-hung sash weights and pulley cords; leveling settled stair stringers; structural subfloor rot replacement."
    },
    risk30: {
      projects: "Drywall patching, door trimming, window sash repair, baseboard installation, bathroom re-tiling.",
      risks: "Dust inhalation, cutting into live hidden wiring or pipes inside walls, toxic lead paint on pre-1978 trim.",
      callPro: "Stairway stringer structural failures, major foundation wall displacement, or widespread toxic black mold remediation."
    },
    tasks: [
      {
        id: "s4_t1",
        title: "Interior Maintenance",
        difficulty: "Beginner",
        timeEst: "2-3 Hours",
        tools: "Flashlight, humidity monitor, screwdrivers, silicone spray, safety glasses",
        overview: "A regular interior maintenance walkthrough identifies small issuesâ€”like sticking hinges, slow drains, and hairline cracksâ€”before they become costly disasters.",
        technique: "Establish a seasonal inspection checklist: test smoke/CO alarms, lubricate door hinges with dry PTFE spray, inspect under sinks for pipe seepage, and verify exhaust fans vent outdoors freely.",
        proTip: "Keep an interior maintenance binder or logbook noting air filter sizes, paint color codes by room, and replacement dates for major appliances.",
        ytQuery: "https://www.youtube.com/results?search_query=seasonal+home+interior+maintenance+checklist"
      },
      {
        id: "s4_t2",
        title: "Walls and Ceilings",
        difficulty: "Intermediate",
        timeEst: "2-4 Hours",
        tools: "Drywall patch mesh/clips, joint compound (mud), 6\" and 10\" taping knives, sanding sponge, utility knife",
        overview: "Repairing holes, settlement stress cracks, and popped drywall screws restores seamless wall and ceiling surfaces ready for painting.",
        technique: "For medium holes, cut a neat square around the damage, install wood backer cleats behind the drywall, screw in a matching gypsum patch, apply self-adhesive fiberglass mesh tape, and apply 3 thin coats of joint compound, feathering outward with a wide 10-inch knife.",
        proTip: "Apply multiple thin coats of joint compound rather than one heavy glob; thin coats dry quickly without cracking and require almost no tedious sanding.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+patch+a+hole+in+drywall+vancouver+carpenter"
      },
      {
        id: "s4_t3",
        title: "Baseboards and Moldings",
        difficulty: "Intermediate",
        timeEst: "2-3 Hours",
        tools: "Miter saw, coping saw, 18-gauge brad nailer, pry bar with trim puller, painter's caulk, nail set",
        overview: "Baseboards and crown moldings finish wall-floor transitions. Master carpenters cope inside corners rather than relying on miter cuts.",
        technique: "Run the first baseboard square into the inside corner. Cut a 45-degree inside miter on the mating board, then use a coping saw to back-cut along the profile line left by the miter. The coped profile fits cleanly over the first board even if walls aren't square.",
        proTip: "Never use a flat pry bar directly against drywall when removing old molding; slip a wide putty knife or scrap block behind the bar to protect the wall from crushing.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+cope+and+install+baseboard+trim+this+old+house"
      },
      {
        id: "s4_t4",
        title: "Stairs",
        difficulty: "Intermediate",
        timeEst: "2 Hours",
        tools: "Wood glue, hardwood wedges, 2-1/2\" trim head screws, drill, hammer, pry bar",
        overview: "Squeaking stair treads occur when seasonal drying causes treads to rub against risers or stringers. Securing movement restores quiet, solid steps.",
        technique: "If accessible from underneath, drive glued hardwood wedges into the dado between tread and riser. If repairing from above, drive pairs of trim-head screws angled toward each other through the tread into the center stringer, then countersink and fill with color-matched putty.",
        proTip: "Sprinkle powdered graphite or talcum powder into tread-riser joints as a quick temporary friction silencer before making permanent screw repairs.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+fix+squeaky+stairs+from+above+this+old+house"
      },
      {
        id: "s4_t5",
        title: "Floors",
        difficulty: "Intermediate",
        timeEst: "2-4 Hours",
        tools: "Squeak-No-More breakaway screws, stud finder, wood floor touch-up markers, transition strips, circular saw",
        overview: "Flooring repairs address annoying subfloor squeaks, scratched hardwood boards, loose transition strips, and damaged planks.",
        technique: "Locate floor joists with a stud finder. Drive scored breakaway screws through carpet or hardwood directly into the joist using the alignment tripod fixture; the screw head snaps off cleanly below the surface, locking the subfloor firmly to the joist.",
        proTip: "Use steam from an iron placed over a damp cotton cloth to swell out minor dents in solid hardwood flooring before resorting to aggressive sanding.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+fix+squeaky+floors+wood+carpet+repair"
      },
      {
        id: "s4_t6",
        title: "Double-Hung Windows",
        difficulty: "Intermediate",
        timeEst: "2-3 Hours",
        tools: "Utility knife, sash cord or chain, replacement weights/spiral balances, putty knife, chisel",
        overview: "Historic double-hung windows rely on counterweights or spiral balances to stay open. Repairing broken cords restores effortless operation.",
        technique: "Score through old paint on the inside stop bead and pry it off gently. Remove the lower sash and open the access pocket on the side jamb to retrieve the cast-iron counterweight. Thread new braided cotton sash cord through the overhead pulley and tie to the weight.",
        proTip: "Rub pure beeswax or candle paraffin along the window jamb tracks; it provides friction-free gliding without attracting dirt like petroleum oils do.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+repair+double+hung+window+sash+cord+this+old+house"
      },
      {
        id: "s4_t7",
        title: "Weatherstripping Windows",
        difficulty: "Beginner",
        timeEst: "1-2 Hours",
        tools: "Self-adhesive V-strip, closed-cell foam tape, silicone bulb seal, shears, rubbing alcohol",
        overview: "Drafty windows leak up to 30% of home heating. Installing modern weatherstripping seals air gaps while preserving window opening function.",
        technique: "Clean window jamb tracks thoroughly with isopropyl rubbing alcohol to ensure strong adhesive bonding. Apply bronze or vinyl V-strip along the side jambs so the 'V' opens toward the exterior weather, compressing tightly when the sash closes.",
        proTip: "Perform a draft test on windy days by holding a lit stick of incense or a lighter flame near window perimeters; smoke deflection instantly pinpoints hidden leaks.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+weatherstrip+windows+drafts+sealing"
      },
      {
        id: "s4_t8",
        title: "Wood Sash Windows",
        difficulty: "Intermediate",
        timeEst: "3-4 Hours",
        tools: "Linseed oil glazing putty, glazing points, putty knife, heat gun, heat shield, glass cleaner",
        overview: "Historic single-pane wood sash windows require periodic reglazing to seal glass panes against moisture, rot, and rattling winds.",
        technique: "Soften rock-hard old putty with a heat gun while protecting the glass pane with a sheet of metal. Scrape out old putty, replace rusted glazing points, prime the bare wood rabbet with oil primer, press a bed of fresh glazing compound into the frame, and tool a smooth 45-degree bevel.",
        proTip: "Always prime the bare wood rabbet with oil-based primer before applying glazing putty; unprimed dry wood will suck the oils out of putty, causing it to crack within months.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+reglaze+a+wood+window+this+old+house"
      },
      {
        id: "s4_t9",
        title: "Casement Windows",
        difficulty: "Beginner",
        timeEst: "1 Hour",
        tools: "Replacement worm-gear operator, silicone spray, screwdrivers, socket set, replacement hinge track",
        overview: "Casement windows swing outward on side hinges via hand cranks. Stripped gears or bent track arms cause binding and incomplete latching.",
        technique: "Open the sash fully, detach the operator arm from the track shoe by disengaging the keeper clip, unscrew the operator housing from the sill, and install an exact OEM replacement mechanism. Lubricate metal tracks with dry silicone.",
        proTip: "Never use heavy grease on casement window tracks; grease attracts blowing dust, seeds, and grit, quickly grinding out brass gears.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+replace+casement+window+crank+operator"
      },
      {
        id: "s4_t10",
        title: "Horizontal Sliding Windows",
        difficulty: "Beginner",
        timeEst: "1 Hour",
        tools: "Replacement roller assemblies, vacuum with brush nozzle, dry PTFE lubricant, screwdriver",
        overview: "Sliding windows glide horizontally on tiny brass or nylon bottom rollers. Grimy tracks and worn roller bearings make them impossible to slide.",
        technique: "Vacuum dust, bugs, and debris from the bottom vinyl/aluminum track. Lift the sliding sash straight up into the top header channel, tilt the bottom inward, and lift it out. Unscrew worn bottom rollers and install fresh nylon bearing rollers.",
        proTip: "Inspect the tiny drain 'weep holes' on the outside bottom track of sliding windows; if clogged with dirt, rainwater will back up and overflow into interior wall drywall.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+fix+sticking+horizontal+sliding+window+rollers"
      },
      {
        id: "s4_t11",
        title: "Awning and Jalousie Windows",
        difficulty: "Intermediate",
        timeEst: "1-2 Hours",
        tools: "Jalousie crank mechanism, replacement glass louvers, rubber louver clips, needle-nose pliers",
        overview: "Awning and jalousie louvered windows provide ventilation during rainstorms. Broken crank gears or missing glass clips create security and weather vulnerabilities.",
        technique: "Replace individual broken glass louvers by opening the clips at each end, sliding the glass pane out, inserting the replacement pane, and crimping the metal retention tabs. Replace the main vertical link arm if louvers fail to tilt uniformly.",
        proTip: "When replacing jalousie glass, polish the sharp factory cut edges with wet 120-grit silicone carbide paper to prevent severe hand lacerations during cleaning.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+repair+jalousie+window+crank+slats"
      },
      {
        id: "s4_t12",
        title: "Frame Installation",
        difficulty: "Advanced",
        timeEst: "4-6 Hours",
        tools: "Level (4ft), shims, 3-inch framing screws, expanding low-pressure window foam, tape measure",
        overview: "Replacing or installing a window frame requires squaring, shimming, plumb alignment, and airtight sealing to prevent leaks and draft infiltration.",
        technique: "Set the window into the rough opening resting on sill pan flashing. Check for square by measuring opposite diagonals. Insert cedar shims behind screw holes until jambs are plumb and reveal is uniform. Fasten through jambs, then seal the perimeter gap with low-expansion foam.",
        proTip: "Only use specialized low-expansion window & door foam; standard high-pressure expanding foam will exert enough force to bow jambs inward, jamming windows permanently.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+install+replacement+window+this+old+house"
      },
      {
        id: "s4_t13",
        title: "How to Make Aluminum Storm Windows",
        difficulty: "Intermediate",
        timeEst: "2-3 Hours",
        tools: "Aluminum frame stock, plastic miter corners, hacksaw or miter box, spline roller, vinyl spline, glass pane or acrylic",
        overview: "Custom aluminum storm windows provide an insulating air barrier that lowers energy bills and protects prime wooden historic sash.",
        technique: "Measure the window opening accurately, subtracting 1/8-inch clearance. Cut aluminum frame channels with a fine-tooth metal blade. Tap plastic corner keys into the frame channels, lay the glass or acrylic sheet into the frame gasket, and seat the rubber spline with a roller tool.",
        proTip: "Leave two small 1/4-inch weep slots in the bottom storm frame weatherstrip to prevent condensation from trapping moisture against the wood window sill.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+build+custom+storm+windows+aluminum"
      },
      {
        id: "s4_t14",
        title: "Wood Sash Storm Windows",
        difficulty: "Intermediate",
        timeEst: "3-4 Hours",
        tools: "Pine or cedar 5/4 lumber, pocket hole jig or mortise tenon joints, glass, glazing points, exterior paint",
        overview: "Wood storm windows match the historical architecture of older homes while delivering superior thermal sound insulation.",
        technique: "Construct a durable frame from rot-resistant western red cedar or cypress using half-lap or mortise and tenon joinery. Rout a 3/8-inch glass rabbet on the rear face, bed glass in glazing compound, install glazing points, and mount with traditional top storm window hanger brackets.",
        proTip: "Drill two 3/8-inch drain holes angled downward through the bottom storm rail to allow trapped moisture to escape outside freely.",
        ytQuery: "https://www.youtube.com/results?search_query=building+traditional+wooden+storm+windows"
      },
      {
        id: "s4_t15",
        title: "Screens",
        difficulty: "Beginner",
        timeEst: "45 Mins",
        tools: "Spline roller tool, fiberglass screen mesh, rubber spline (.140\" or .160\"), utility knife, clamps",
        overview: "Torn insect screens let pests into your home. Rescreening an aluminum frame takes less than an hour and costs only a few dollars.",
        technique: "Pull out the old rubber spline and discard torn mesh. Lay fresh fiberglass mesh over the frame with 2 inches excess on all sides. Clamp the frame sides with a slight inward bow. Roll the new spline into the groove using the concave wheel of the spline tool, then trim excess mesh with a sharp utility knife.",
        proTip: "Bow the center of the long aluminum frame sides inward slightly with clamps before splining; when released after splining, the frame springs straight, keeping screen mesh taut.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+rescreen+a+window+screen+easy"
      },
      {
        id: "s4_t16",
        title: "Window Shades",
        difficulty: "Beginner",
        timeEst: "30 Mins",
        tools: "Roller shade brackets, drill, tape measure, pliers, flat screwdriver",
        overview: "Spring-roller window shades provide privacy and blackout control. Tensioning or replacing sticky roller springs restores smooth rolling.",
        technique: "If a shade will not roll up, pull it down halfway, remove it from the brackets, roll the fabric up tightly by hand onto the roller, and replace it in the brackets. If it rolls up too quickly, remove it fully rolled, unroll halfway by hand, and remount.",
        proTip: "Check that the pin ends match the brackets: the round pin belongs in the simple hole bracket, while the flat rectangular spear belongs in the slotted ratchet bracket.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+fix+spring+roller+window+shades"
      },
      {
        id: "s4_t17",
        title: "Venetian Blinds",
        difficulty: "Beginner",
        timeEst: "1 Hour",
        tools: "Replacement lift cord, tilt mechanism, ladder tape, needle-nose pliers, lighter for melting cord ends",
        overview: "Horizontal aluminum or faux-wood Venetian blinds often suffer from snapped lift cords or broken tilt wands that prevent slats from closing.",
        technique: "To re-cord a blind, burn the end of the new cord to prevent fraying, tape it securely to the old broken cord end, and pull it through the ladder rungs and headrail pulleys. Secure the bottom knot inside the hollow bottom rail plug.",
        proTip: "Always replace both left and right lift cords simultaneously; replacing only one causes uneven stretching and a crooked blind.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+restring+venetian+blinds+step+by+step"
      },
      {
        id: "s4_t18",
        title: "Drapery Hardware",
        difficulty: "Beginner",
        timeEst: "1 Hour",
        tools: "Curtain rod brackets, drywall anchors, level, tape measure, drill",
        overview: "Heavy blackout curtains exert significant cantilevered pull on wall brackets, tearing loose from drywall if not properly secured.",
        technique: "Mount curtain rod brackets at least 4 to 6 inches above the window casing to create the illusion of higher ceilings. Anchor brackets into wall framing studs whenever possible; if studs are unavailable, use metal toggle bolts rather than plastic drywall plugs.",
        proTip: "Extend the curtain rod 6 to 10 inches beyond the window frame on each side; this allows opened curtains to clear the glass completely, letting maximum natural light in.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+hang+curtain+rods+properly+level+solid"
      },
      {
        id: "s4_t19",
        title: "Doors",
        difficulty: "Intermediate",
        timeEst: "1-2 Hours",
        tools: "Block plane, belt sander, screwdriver, pencil, pry bar, 3\" screws",
        overview: "Interior doors frequently rub against head jambs or stick against the floor due to seasonal foundation humidity swings and hinge sag.",
        technique: "Identify rubbing spots by closing the door against a sheet of paper or checking where paint is burnished. Tighten loose top hinge screws, or drive a 3-inch screw through the top hinge into the wall stud. If sticking persists, remove the door and plane the strike edge with a hand plane.",
        proTip: "Plane a 2-degree bevel on the latch edge of the door sloping toward the stop; this bevel ensures the door clears the jamb rebate smoothly without scuffing.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+fix+a+rubbing+or+sticking+door+this+old+house"
      },
      {
        id: "s4_t20",
        title: "Weatherstripping Doors",
        difficulty: "Beginner",
        timeEst: "1 Hour",
        tools: "Kerf-in weatherstripping or screw-on aluminum/silicone perimeter kit, door bottom sweep, hacksaw, drill",
        overview: "Sealing gaps around exterior entry doors eliminates drafts, reduces outdoor noise, and blocks insect and moisture intrusion.",
        technique: "Install continuous silicone bulb weatherstripping along head and side jambs so the closed door compresses the seal by half. Install a heavy aluminum door sweep with rubber fin along the interior bottom, adjusting it until it seals firmly against the threshold sill without dragging.",
        proTip: "Perform the 'dollar bill test': close the door on a dollar bill at various points around the perimeter; if you can slide the bill out with no resistance, the seal is too loose.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+weatherstrip+an+exterior+door+properly"
      },
      {
        id: "s4_t21",
        title: "Door Locks",
        difficulty: "Intermediate",
        timeEst: "1 Hour",
        tools: "Screwdrivers, file, powdered graphite lubricant, deadbolt reinforcement plate",
        overview: "A properly aligned deadbolt and latch provides smooth key operation and prevents home break-ins from kick-in attacks.",
        technique: "If your deadbolt won't throw without pushing the door hard, dab lipstick on the bolt tip, throw the deadbolt against the jamb to mark the misaligned strike, and enlarge the strike plate opening using a metal bastard file. Lubricate internal tumblers with dry graphite.",
        proTip: "Never use WD-40 or oil lubricants inside door lock cylinders; liquid oils attract dust and congeal over time, permanently gumming up tiny brass tumbler pins.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+fix+deadbolt+alignment+and+door+locks"
      },
      {
        id: "s4_t22",
        title: "Ceramic Tile",
        difficulty: "Intermediate",
        timeEst: "2-3 Hours",
        tools: "Carbide grout saw, tile adhesive/thinset, notched trowel, rubber grout float, sponge, matching tile and grout",
        overview: "Replacing a cracked ceramic wall or floor tile restores water protection in bathrooms and kitchens before subfloor rot occurs.",
        technique: "Rake out all grout around the broken tile with a grout saw. Drill several relief holes through the broken tile center, then gently tap a chisel to shatter and pry the tile from the center outward without chipping adjacent tiles. Scrape old thinset smooth, butter new tile with adhesive, press level, and regrout.",
        proTip: "Always save 5 to 10 spare tiles from any new installation in an attic or closet; finding an exact color and size match for discontinued tiles years later is nearly impossible.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+replace+a+broken+ceramic+tile+this+old+house"
      },
      {
        id: "s4_t23",
        title: "Basements",
        difficulty: "Intermediate",
        timeEst: "2-4 Hours",
        tools: "Sump pump, dehumidifier, hydraulic cement, wire brush, masonry waterproofing paint, moisture meter",
        overview: "Damp, musty basements can be transformed into dry, livable spaces by managing moisture entry and sealing foundation wall cracks.",
        technique: "Test wall moisture by taping a 1-foot square of clear plastic wrap to the concrete wall for 24 hours; condensation on the underside indicates moisture migrating through walls, while condensation on the top room face indicates high room humidity needing a dehumidifier. Chisel out cracks in an inverted-V and fill with hydraulic cement.",
        proTip: "Ninety percent of wet basement issues originate outside: extend downspout discharge pipes at least 6 feet away from foundation walls and slope exterior soil away from the home.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+dry+up+a+wet+basement+this+old+house"
      },
      {
        id: "s4_t24",
        title: "Household Pests",
        difficulty: "Beginner",
        timeEst: "1-2 Hours",
        tools: "Copper mesh / stainless steel wire wool, expanding pest foam, caulk gun, flashlight, inspection mirror",
        overview: "Sealing structural entry points stops rodents, termites, ants, and insects from entering your home before resorting to chemical poisons.",
        technique: "Inspect the foundation perimeter, pipe penetrations, and dryer vents for any gap wider than 1/4-inch. Pack holes tightly with copper mesh or stainless steel wool (mice chew straight through standard expanding foam), then seal over the mesh with exterior silicone or pest-block foam.",
        proTip: "Trim all tree branches and shrubs back at least 2 feet from roof shingles and siding; touching branches act as direct superhighways for carpenter ants and roof rats.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+seal+house+from+mice+and+pests"
      }
    ]
  }
];


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
      "Weather window planning: Schedule roofing, siding, and blacktop work during dry weather with temperatures above 50Â°F (10Â°C) for proper sealant cure.",
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
        technique: "Check the upholstery cleaning code label under cushions (W = water-based cleaner, S = solvent-only cleaner, WS = either, X = vacuum only). Always test solvent cleaners on an inconspicuous skirt corner. Blot stains gently from outside toward the centerâ€”never rub vigorously.",
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
        technique: "Shut the main water valve immediately. Open the faucet connected to the frozen line so melting steam can escape. Thaw the frozen section gently starting from the open faucet toward the freeze using a hair dryer or heating padâ€”never use an open torch inside walls.",
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
        technique: "Cut tubing square and ream inside burrs. Polish the pipe end and fitting socket until bright and shiny. Brush a thin layer of flux on both parts and push together. Heat the fitting socket evenly with torch flame; touch solder wire to the opposite side of the jointâ€”when hot enough, solder wicks around the seam by capillary action.",
        proTip: "A single drop of water inside a copper pipe will prevent solder from reaching the required 450Â°F melt point; stuff a wad of white bread into the pipe upstream to temporarily block drips while soldering (the bread dissolves when water is restored).",
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
        technique: "Remember Ohm's Law and the Power Formula: Watts = Volts Ã— Amps. On a standard 120V household branch, a 15-amp circuit can supply a maximum total load of 1,800 Watts (recommended continuous load limit is 80% or 1,440 Watts).",
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


// DIY Skills Builder - Sections 9 to 12 Data
window.diyData_part3 = [
  {
    id: 9,
    title: "Climate Control: Heating and Air Conditioning",
    subtitle: "Thermal Comfort, Thermodynamics, and HVAC Efficiency",
    icon: "fa-temperature-arrow-up",
    intro: "Maintaining home comfort requires understanding heat transfer (conduction, convection, radiation), refrigerant cycles, air filtration, and combustion safety.",
    prep40: [
      "Carbon monoxide and combustion check: Install certified CO detectors on every level before touching combustion heating systems.",
      "Filter cleanliness protocol: Replace HVAC air filters every 60-90 days; dirty filters are the #1 cause of blower motor failure and AC coil freeze.",
      "Power disconnect safety: Always switch off high-voltage HVAC service disconnect switches and gas cock valves before opening furnace panels.",
      "Airflow path balance: Keep return and supply registers unblocked by rugs and furniture; closed vents increase system static pressure."
    ],
    tech30: {
      beginner: "Replacing pleated furnace air filters; programming smart thermostats; bleeding trapped air from hydronic radiators; cleaning AC condensate lines.",
      intermediate: "Cleaning condenser coils with foaming coil cleaner; replacing furnace hot surface ignitors and flame sensors; insulating unconditioned attic ductwork.",
      expert: "Troubleshooting heat pump reversing valves; balancing hydronic multi-zone circulator loops; diagnosing blower capacitor microfarad ratings."
    },
    risk30: {
      projects: "Smart thermostat installation, radiator maintenance, duct sealing, window AC mounting, condensate drain cleaning.",
      risks: "Lethal carbon monoxide poisoning from cracked heat exchangers; high-voltage 240V shock; high-pressure refrigerant burns.",
      callPro: "Refrigerant EPA-certified recovery and charging; cracked furnace heat exchangers; gas valve manifold pressure adjustments."
    },
    tasks: [
      {
        id: "s9_t1",
        title: "Heating and Air Conditioning",
        difficulty: "Beginner",
        timeEst: "1 Hour",
        tools: "Infrared thermometer, HVAC filter, smart thermostat, flashlight",
        overview: "A well-maintained HVAC system provides consistent temperature, proper humidity, and lower seasonal utility bills while extending equipment lifespan.",
        technique: "Check temperature split: measure the air temperature entering return grilles vs emerging from supply registers (a healthy AC system shows a 15Â°F to 20Â°F differential). Keep the outdoor condenser clear of leaves and vegetation by at least 24 inches.",
        proTip: "Never set your thermostat lower than your target temperature to 'cool the house faster'; HVAC systems run at one fixed cooling speed regardless of thermostat setting.",
        ytQuery: "https://www.youtube.com/results?search_query=how+hvac+systems+work+heating+and+cooling"
      },
      {
        id: "s9_t2",
        title: "Warm-Air Systems",
        difficulty: "Beginner",
        timeEst: "1 Hour",
        tools: "Screwdriver, vacuum with brush attachment, replacement 1\" or 4\" pleated filter",
        overview: "Forced-warm-air furnaces heat air in a heat exchanger and distribute it through supply ductwork via a high-velocity centrifugal blower fan.",
        technique: "Change furnace filters seasonally, ensuring the airflow arrow points toward the blower motor. Vacuum dust from the blower wheel blades. Inspect return air grilles to ensure air circulates without restriction throughout living spaces.",
        proTip: "Avoid ultra-restrictive high-MERV (MERV 13+) 1-inch filters in older furnaces; their high airflow resistance chokes the blower motor and can trip the furnace high-limit switch.",
        ytQuery: "https://www.youtube.com/results?search_query=how+forced+air+furnace+works+maintenance"
      },
      {
        id: "s9_t3",
        title: "Hot-Water Systems",
        difficulty: "Intermediate",
        timeEst: "2 Hours",
        tools: "Radiator bleed key, small cup, pressure gauge, hose for boiler drain",
        overview: "Hydronic hot water systems heat water in a central boiler and circulate it through baseboard convectors or cast-iron radiators via electric circulator pumps.",
        technique: "Check the boiler altitude/pressure gauge (cold pressure should read 12 to 15 PSI for a 2-story home). Purge trapped air from the highest radiators using a coin or bleed key until a steady stream of water emerges with no sputtering hiss.",
        proTip: "Hold a paper cup under the radiator air bleed valve before opening with a key; catch hot water immediately as soon as air hissing stops, then snug the valve shut.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+bleed+hot+water+radiators+this+old+house"
      },
      {
        id: "s9_t4",
        title: "Piping Arrangements",
        difficulty: "Intermediate",
        timeEst: "1-2 Hours",
        tools: "Pipe insulation, flashlight, thermal imaging camera",
        overview: "Hydronic distribution uses series-loop, one-pipe Monoflo tee, or two-pipe direct/reverse return piping to balance hot water flow across zones.",
        technique: "Trace boiler zone piping to verify each zone has its own motorized zone valve or circulator pump. Insulate all exposed hot water supply pipes in unconditioned basements using closed-cell foam to reduce heat loss during transit.",
        proTip: "In reverse-return hydronic piping, the first radiator fed is the last radiator returned; this naturally balances water resistance so all rooms heat evenly.",
        ytQuery: "https://www.youtube.com/results?search_query=hydronic+heating+piping+arrangements+explained"
      },
      {
        id: "s9_t5",
        title: "Radiant Systems",
        difficulty: "Intermediate",
        timeEst: "2 Hours",
        tools: "Infrared thermometer, PEX manifold flow meters, flush hose",
        overview: "In-floor radiant hydronic heating circulates warm water through PEX loops embedded in concrete slabs or under subfloors, warming people via gentle radiation.",
        technique: "Balance zone manifold circuit loops by adjusting the transparent sight glass flow meters until each loop achieves its calculated GPM (gallons per minute). Keep water supply temperatures between 85Â°F and 120Â°F to prevent damaging hardwood flooring.",
        proTip: "Use an infrared thermal camera to scan floor radiant heating loops; you can see the warm water grid through tile and hardwood, instantly finding cold air-locked loops.",
        ytQuery: "https://www.youtube.com/results?search_query=how+in+floor+radiant+heat+works+maintenance"
      },
      {
        id: "s9_t6",
        title: "Steam System",
        difficulty: "Intermediate",
        timeEst: "2 Hours",
        tools: "Replacement radiator air vents (Hoffman / Maid-O-Mist), Teflon tape, wire brush, bucket",
        overview: "Classic one-pipe steam heating systems boil water into steam that rises into radiators, displaces air through air vents, and drains back as condensate.",
        technique: "Ensure radiator supply valves are fully 100% open or fully 100% closed (never throttled halfway, which causes violent water hammer banging). Radiators must pitch slightly downward toward the supply valve so condensed water drains back into the steam main.",
        proTip: "If a steam radiator violently bangs and knocks, check its slope with a level; place a wooden shim under the legs opposite the supply pipe to slope it toward the valve.",
        ytQuery: "https://www.youtube.com/results?search_query=how+one+pipe+steam+heating+works+dan+holohan"
      },
      {
        id: "s9_t7",
        title: "Chimneys (Heating Draft)",
        difficulty: "Intermediate",
        timeEst: "1-2 Hours",
        tools: "Draft gauge or smoke pencil, mirror, flashlight, chimney brush",
        overview: "Furnace and boiler chimneys must generate adequate natural draft to pull combustion flue gases up and out of the living space safely.",
        technique: "Inspect the metal flue thimble where furnace exhaust enters the chimney for corrosion or soot accumulation. Test chimney draft using a smoke pencil at the draft hood while the burner is firing; smoke should be pulled briskly up into the flue with zero spillage into the room.",
        proTip: "Hold a mirror and flashlight inside the chimney cleanout door; sighting up the flue reveals cracked clay liners, bird nests, or dangerous creosote buildup.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+check+furnace+chimney+draft+and+flue"
      },
      {
        id: "s9_t8",
        title: "Heat Distribution",
        difficulty: "Beginner",
        timeEst: "1 Hour",
        tools: "Anemometer or tissue paper, aluminum foil tape (mastic tape), screwdriver",
        overview: "Balancing supply registers and sealing leaky ductwork ensures rooms furthest from the furnace receive adequate heating and cooling.",
        technique: "Locate seasonal damper levers inside trunk duct lines: open upstairs dampers in summer (cool air sinks) and close downstairs slightly; reverse in winter. Seal metal duct seams with UL 181-rated aluminum foil tape or mastic pasteâ€”never use standard vinyl duct tape.",
        proTip: "Standard grey vinyl 'duct tape' rots, dries up, and falls off heating ducts within 2 years; always use true UL 181 aluminum foil tape or brush-on mastic.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+balance+hvac+air+ducts+dampers"
      },
      {
        id: "s9_t9",
        title: "Maintenance, Various Systems",
        difficulty: "Beginner",
        timeEst: "2 Hours",
        tools: "HVAC coil cleaner, soft brush, garden hose, oiler with non-detergent SAE 20 oil",
        overview: "Annual pre-season servicing of heating and cooling components prevents emergency breakdowns during sub-zero cold snaps or summer heatwaves.",
        technique: "Lubricate older fan motors with 2-3 drops of non-detergent 20-weight motor oil into the designated oil ports. Clean evaporator drain pans and pour a cup of distilled white vinegar down the condensate drain line to dissolve algae colonies.",
        proTip: "Pour one cup of distilled white vinegar down your AC condensate drain line every month during summer; vinegar kills algae and slime that clog drain lines and flood attics.",
        ytQuery: "https://www.youtube.com/results?search_query=diy+hvac+annual+maintenance+cleaning+tips"
      },
      {
        id: "s9_t10",
        title: "Oil Burners",
        difficulty: "Intermediate",
        timeEst: "2 Hours",
        tools: "Oil filter cartridge, fuel pump strainer, replacement burner nozzle, nozzle wrench, clean rags",
        overview: "Heating oil burners atomize liquid fuel at 100-140 PSI through a microscopic brass nozzle, mixing with forced air and igniting via high-voltage electrodes.",
        technique: "Shut off the fuel line valve at the tank and burner. Replace the spin-on or canister fuel filter cartridge and bleed air from the pump. Replace the brass atomizing nozzle annually using a dedicated dual nozzle wrench to avoid straining the oil tube adapter.",
        proTip: "Never touch the brass orifice tip of an oil burner nozzle with bare fingers; natural finger oils can alter the microscopic spray pattern and cause smoky, inefficient combustion.",
        ytQuery: "https://www.youtube.com/results?search_query=oil+burner+maintenance+nozzle+and+filter+change"
      },
      {
        id: "s9_t11",
        title: "Gas Burners",
        difficulty: "Intermediate",
        timeEst: "1 Hour",
        tools: "Soap-and-water bubble solution or electronic gas sniffer, soft wire brush, vacuum",
        overview: "Natural gas and propane burners ignite fuel at the manifold, directing clean blue flames through heat exchanger chambers.",
        technique: "Inspect flame color: burner flames should burn crisp, steady blue with tiny light blue inner cones. Wavy yellow or orange flames indicate improper oxygen mixture, dirty orifices, or incomplete combustion producing dangerous carbon monoxide.",
        proTip: "If burner flames show yellow tips or lift off the burner ports, shut down the furnace immediately and have the air shutter and heat exchanger inspected for cracks.",
        ytQuery: "https://www.youtube.com/results?search_query=gas+furnace+flame+color+and+burner+cleaning"
      },
      {
        id: "s9_t12",
        title: "Maintenance, Oil Burners and Controls",
        difficulty: "Intermediate",
        timeEst: "2 Hours",
        tools: "Cad cell eye, wire brush, electrode alignment gauge, multi-meter",
        overview: "The cad (cadmium sulfide) cell safety eye monitors the oil burner flame, shutting down the pump within 45 seconds if no flame is detected to prevent oil flooding.",
        technique: "Wipe soot from the optical glass face of the cad cell eye. Check ignition electrode gap and forward spacing using a brass electrode gauge. Test safety lockout by unhooking one cad cell wire while firing; the primary control must lock out within 45 seconds.",
        proTip: "Never press the red primary control reset button on an oil burner more than ONCE if it locks out; resetting multiple times pumps raw unburned oil into the firebox, risking a fire.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+service+oil+burner+cad+cell+primary+control"
      },
      {
        id: "s9_t13",
        title: "Maintenance, Gas Burners",
        difficulty: "Intermediate",
        timeEst: "1 Hour",
        tools: "0000 steel wool or emery cloth, 1/4\" nut driver, vacuum",
        overview: "The flame sensor rod in modern gas furnaces senses micro-amperage current through the flame (flame rectification). Soot buildup causes the furnace to shut off after 3 seconds.",
        technique: "Turn off power. Remove the single 1/4-inch hex screw holding the ceramic flame sensor rod. Gently scrub the metal rod with 0000 steel wool or a Scotch-Brite pad until clean and shiny. Reinstall and restore power.",
        proTip: "Cleaning the flame sensor rod with fine steel wool fixes over 50% of modern gas furnace service calls where the furnace lights for 3 seconds and immediately turns off.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+clean+furnace+flame+sensor+this+old+house"
      },
      {
        id: "s9_t14",
        title: "Stoker-Fired Burners",
        difficulty: "Intermediate",
        timeEst: "2 Hours",
        tools: "Coal shovel, shear pin replacement, grease gun, wire brush",
        overview: "Anthracite coal stoker furnaces use a motorized feed screw to convey pea coal onto a burning grate, discharging ash automatically.",
        technique: "Grease stoker gear drive bearings monthly. Inspect the shear pin on the auger shaft (designed to snap if a piece of slate or foreign metal jams the coal auger, protecting the electric motor). Clean fly ash from the flue collector monthly.",
        proTip: "Keep spare shear pins taped directly to the stoker gear drive casing; an auger jam in the middle of winter requires an immediate pin replacement.",
        ytQuery: "https://www.youtube.com/results?search_query=how+coal+stoker+furnace+works+maintenance"
      },
      {
        id: "s9_t15",
        title: "Fireplaces",
        difficulty: "Beginner",
        timeEst: "1-2 Hours",
        tools: "Chimney brush, extension rods, drop cloth, ash shovel, metal bucket, HEPA ash vacuum",
        overview: "Open woodburning masonry fireplaces require clean flues, functioning dampers, and sound firebrick to prevent chimney fires.",
        technique: "Open the metal throat damper fully before lighting a fire. Prime the chimney draft by holding a torch of rolled newspaper up near the damper to reverse cold air downdrafts. Clean ashes only when cold using a covered metal bucketâ€”never a standard household vacuum.",
        proTip: "Never store warm fireplace ashes in a cardboard box, paper bag, or plastic trash can; hidden embers can smolder silently for up to 72 hours before igniting a fire.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+safely+clean+and+maintain+a+fireplace"
      },
      {
        id: "s9_t16",
        title: "Electric Heat Systems",
        difficulty: "Intermediate",
        timeEst: "1 Hour",
        tools: "Multimeter, vacuum with brush, non-contact voltage tester, screwdriver",
        overview: "Electric baseboard and wall heaters convert 240V power directly into heat via high-resistance nichrome elements with 100% efficiency.",
        technique: "Shut off the 240V double-pole circuit breaker. Remove baseboard front covers and vacuum dust and pet hair from aluminum heat-sink fins (bent fins can be straightened with a fin comb). Test line-voltage wall thermostats for proper switching.",
        proTip: "Keep furniture, drapes, and electrical cords at least 12 inches away from the front and top of electric baseboard heaters to avoid fire hazards and allow natural convection.",
        ytQuery: "https://www.youtube.com/results?search_query=how+electric+baseboard+heaters+work+wiring"
      },
      {
        id: "s9_t17",
        title: "Electric Boilers",
        difficulty: "Intermediate",
        timeEst: "2 Hours",
        tools: "Multimeter with amp clamp, pressure gauge, non-contact tester",
        overview: "Compact electric hydronic boilers heat radiant floor systems and baseboards cleanly without chimneys, oil tanks, or gas lines.",
        technique: "Inspect magnetic contactors and sequencers that stage electric elements in sequence to prevent power surges. Check element continuity and resistance using a multimeter with power disconnected. Monitor expansion tank pre-charge.",
        proTip: "Electric boilers require zero combustion venting or flue inspection, but verify electrical service capacity; a typical home electric boiler draws 60 to 100 amps of 240V power.",
        ytQuery: "https://www.youtube.com/results?search_query=how+electric+boilers+work+hydronic+heating"
      },
      {
        id: "s9_t18",
        title: "Electric Furnaces",
        difficulty: "Intermediate",
        timeEst: "1 Hour",
        tools: "Amp clamp meter, nut driver, multimeter, replacement sequencer/limit switch",
        overview: "Electric furnaces push air over multi-stage electric resistance heating coils, controlled by heat sequencers that stage elements on gradually.",
        technique: "Test the sequencer relays: heating banks should energize one at a time over 30 to 60 seconds rather than slamming full current onto the electrical panel all at once. Verify high-limit safety switches cut element power if the blower fan fails.",
        proTip: "If your electric furnace blows lukewarm air, one of the individual heating coil stages or its thermal cut-off link has likely burned open and needs replacement.",
        ytQuery: "https://www.youtube.com/results?search_query=electric+furnace+sequencer+and+elements+troubleshooting"
      },
      {
        id: "s9_t19",
        title: "Heat Pump",
        difficulty: "Intermediate",
        timeEst: "1-2 Hours",
        tools: "Infrared thermometer, fin comb, foaming coil cleaner, garden hose",
        overview: "Air-source heat pumps provide both heating and cooling by extracting heat from outdoor air and transferring it inside via a reversing valve.",
        technique: "Keep the outdoor unit elevated 4 to 8 inches above average local snowfall depth on composite risers. In winter, verify the unit enters defrost mode automatically to melt frost accumulation on outdoor coils. Never cover the outdoor heat pump in winter.",
        proTip: "Never use a sharp metal tool or screwdriver to chip ice off a frozen heat pump outdoor coil; you will puncture aluminum refrigerant tubes, releasing the entire refrigerant charge.",
        ytQuery: "https://www.youtube.com/results?search_query=how+a+heat+pump+works+heating+and+cooling+this+old+house"
      },
      {
        id: "s9_t20",
        title: "Insulation",
        difficulty: "Intermediate",
        timeEst: "3-5 Hours",
        tools: "Kraft-faced fiberglass batts or blown cellulose machine, utility knife, staple gun, N95 mask, tyvek suit",
        overview: "Proper attic insulation (R-38 to R-60) is the most cost-effective home improvement, lowering heating and cooling bills by 15-30%.",
        technique: "Air-seal all attic floor penetrations (plumbing vents, electrical wires, ceiling fixture boxes) with expanding spray foam before laying insulation. Install cardboard or foam rafter baffles at eaves to prevent insulation from blocking soffit ventilation airflow.",
        proTip: "Air sealing attic floor gaps with canned spray foam before insulating is more important than the insulation itself; insulation slows conductive heat, but air leaks carry heat right through.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+insulate+and+air+seal+an+attic+this+old+house"
      },
      {
        id: "s9_t21",
        title: "Air Conditioning",
        difficulty: "Beginner",
        timeEst: "1 Hour",
        tools: "Condenser coil cleaner, fin straightener comb, garden hose, level",
        overview: "The outdoor AC condensing unit rejects indoor heat into outside air. Dirty condenser fins force the compressor to run hotter and consume far more electricity.",
        technique: "Shut off the 240V outdoor pull-out disconnect switch. Spray no-rinse or foaming coil cleaner on exterior aluminum fins. Rinse gently from inside out with a garden hose nozzle (never a high-pressure pressure washer, which bends delicate aluminum fins).",
        proTip: "Never clean AC condenser coils with a pressure washer; the high-pressure water stream will instantly crush aluminum fins flat, permanently blocking airflow.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+clean+outside+ac+unit+coils+properly"
      },
      {
        id: "s9_t22",
        title: "Room Air Conditioners",
        difficulty: "Beginner",
        timeEst: "1 Hour",
        tools: "Screwdriver, coil cleaner, soft brush, vacuum, warm soapy water",
        overview: "Window and portable air conditioners provide zone cooling. Annual cleaning of the washable mesh filter and evaporator fins prevents mold and bad odors.",
        technique: "Slide out and wash the front air filter in warm soapy water monthly. Remove the exterior cabinet casing, vacuum dust off the evaporator coils, and verify the internal condensate water sling ring spins freely on the condenser fan blade.",
        proTip: "Window AC units are engineered so the rear fan splashes pooled water onto the hot condenser coils to evaporate it; do not drill drain holes in the bottom pan.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+deep+clean+a+window+air+conditioner"
      },
      {
        id: "s9_t23",
        title: "Installing Room Units",
        difficulty: "Beginner",
        timeEst: "1-2 Hours",
        tools: "Level, window AC support bracket, foam weatherseal, screwdriver, drill",
        overview: "Properly securing a window AC unit prevents unit falls, eliminates window frame damage, and seals out humid summer air.",
        technique: "Install an external steel support bracket that transfers the heavy 50-80 lb weight of the unit to the exterior wall framing. Tilt the unit slightly backward (1/4-inch slope toward outside) so condensate drains outdoors rather than into the interior window sill.",
        proTip: "Always secure the top window sash to the bottom sash with an L-bracket screw; without this locking screw, someone can lift the window from outside and push the AC unit in to break in.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+properly+install+a+window+air+conditioner"
      },
      {
        id: "s9_t24",
        title: "Central Air Conditioning",
        difficulty: "Intermediate",
        timeEst: "2 Hours",
        tools: "Condensate pump, wet/dry vac, digital thermometer, multi-meter",
        overview: "Central split-system AC utilizes an indoor evaporator coil and outdoor compressor/condenser to dehumidify and cool the entire house.",
        technique: "Check the condensate drain line: clear slime by connecting a wet/dry vac to the exterior drain exit. Inspect the outdoor suction line (large copper pipe): it should feel 'beer-can cold' and sweat with moisture when running under normal cooling load.",
        proTip: "If your indoor evaporator coil is covered in a solid block of ice, turn off cooling and run fan-only immediately; icing is caused either by a dirty air filter or low refrigerant.",
        ytQuery: "https://www.youtube.com/results?search_query=central+ac+troubleshooting+frozen+coils+drain"
      },
      {
        id: "s9_t25",
        title: "Electronic Air Cleaners",
        difficulty: "Intermediate",
        timeEst: "1-2 Hours",
        tools: "Detergent soak tub, soft bristle brush, screwdriver",
        overview: "Electrostatic air precipitators charge airborne dust particles and trap them on oppositely charged aluminum collector plates.",
        technique: "Shut off electrical power before opening the air cleaner door. Slide out the ionization wires and collector cells. Soak the collector cells in a utility tub with specialized cell detergent or dish soap for 30 minutes, rinse with a hose, and let dry completely before reinstalling.",
        proTip: "Allow electronic air cleaner collector cells to dry 100% before turning power back on; damp plates will arc and snap loudly with continuous electrical sparks.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+clean+electronic+air+cleaner+cells"
      },
      {
        id: "s9_t26",
        title: "Power Humidifiers",
        difficulty: "Beginner",
        timeEst: "1 Hour",
        tools: "Replacement evaporator water panel pad (Aprilaire), white vinegar, wrench",
        overview: "Whole-house bypass and fan-powered humidifiers add moisture to dry winter heating air, reducing static shock and throat dryness.",
        technique: "Replace the aluminum evaporator water pad annually before the winter heating season. Clear mineral scale from the water distribution tray with white vinegar. Verify the saddle valve or ball valve supply line feeds water when the humidistat calls for humidity.",
        proTip: "Remember to close the manual bypass damper on your furnace humidifier in summer; leaving it open allows cold AC air to short-circuit back into the furnace return.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+service+furnace+humidifier+replace+pad"
      },
      {
        id: "s9_t27",
        title: "Dehumidification",
        difficulty: "Beginner",
        timeEst: "1 Hour",
        tools: "Portable or whole-house dehumidifier, continuous drain hose, hygrometer",
        overview: "Controlling indoor relative humidity between 30% and 50% stops toxic mold growth, dust mites, and basement odors.",
        technique: "Set room dehumidistat to 45-50% RH. Connect a garden hose to the unit's continuous gravity drain port routed to a floor drain or sump pit to eliminate the chore of emptying the bucket daily. Clean the intake filter screen bi-weekly.",
        proTip: "Keep basement humidity strictly below 50% relative humidity; mold spores cannot germinate and reproduce when ambient RH remains under 50%.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+set+and+maintain+a+basement+dehumidifier"
      },
      {
        id: "s9_t28",
        title: "Ventilation",
        difficulty: "Intermediate",
        timeEst: "2 Hours",
        tools: "Bathroom exhaust fan (CFM rated), foil tape, insulated ductwork, roof/soffit vent cap",
        overview: "Mechanical ventilation exhausts shower moisture and cooking grease out of the home envelope, preventing mold and attic rot.",
        technique: "Always vent bathroom and kitchen exhaust fans completely to the exterior through an insulated duct and exterior wall/roof capâ€”never vent into the attic. Choose a fan sized to move at least 1 CFM per square foot of bathroom floor area.",
        proTip: "Never exhaust a bathroom fan directly into an open attic space; doing so pumps gallons of warm moisture into attic wood, causing hidden wood rot and toxic mold.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+install+bathroom+exhaust+fan+venting"
      },
      {
        id: "s9_t29",
        title: "Controls for Heating and Cooling Systems",
        difficulty: "Intermediate",
        timeEst: "1-2 Hours",
        tools: "Smart thermostat (Ecobee/Nest), small slotted screwdriver, level, non-contact tester",
        overview: "Smart programmable thermostats optimize HVAC runtimes and support remote temperature control, cutting energy bills significantly.",
        technique: "Turn off 24V power at the furnace switch before touching thermostat wiring. Label existing wires (R = power, C = common 24V, W = heat, Y = cool, G = fan). Connect the C-wire (or install a C-wire adapter kit) to provide steady continuous power for WiFi connectivity.",
        proTip: "Take a clear smartphone photo of the old thermostat wiring terminals before disconnecting a single wire; color conventions vary widely across HVAC installers.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+wire+and+install+a+smart+thermostat+c+wire"
      }
    ]
  },
  {
    id: 10,
    title: "Painting and Decorating Walls, Ceilings, and Floors",
    subtitle: "Surface Preparation, Application, and Architectural Finishes",
    icon: "fa-paint-roller",
    intro: "Eighty percent of a flawless paint job is preparation. Cleaning substrates, patching holes, sanding smooth, priming stains, and using premium applicators transforms living spaces.",
    prep40: [
      "Surface prep priority: Wash walls with TSP or cleaner, scrape loose paint, sand smooth, and wipe off all sanding dust before opening paint cans.",
      "Floor and furniture defense: Lay heavy canvas drop cloths on floors (plastic drop cloths are dangerously slippery underfoot) and tape baseboard trim.",
      "Paint chemistry matching: Determine whether existing paint is oil-based or latex by rubbing with alcohol; oil over latex requires bonding primer.",
      "Ventilation & lighting: Ensure bright, raking light across walls to spot surface defects, and maintain cross-ventilation for paint drying."
    ],
    tech30: {
      beginner: "Cutting in sharp straight lines with an angled sash brush; loading and rolling paint evenly without roller edge tracks; applying painter's tape.",
      intermediate: "Feathering drywall patches invisible under critical lighting; hanging pre-pasted wallpaper matching patterns; painting concrete floors with epoxy.",
      expert: "Operating airless paint sprayers without runs or overspray; hanging non-woven grasscloth wallpaper; skim-coating entire plaster walls."
    },
    risk30: {
      projects: "Interior room painting, exterior trim painting, cabinet refinishing, wallpaper accent walls, porch floor epoxy.",
      risks: "Ladder falls on exterior high peaks; paint spills on expensive carpets; lead dust hazard on pre-1978 painted surfaces.",
      callPro: "Whole-house exterior painting on multi-story historic homes requiring scaffolding or certified lead abatement."
    },
    tasks: [
      {
        id: "s10_t1",
        title: "Brushes",
        difficulty: "Beginner",
        timeEst: "30 Mins",
        tools: "2-1/2\" angled sash brush (nylon/polyester blend), natural bristle brush, brush comb, spinner",
        overview: "A quality paintbrush holds more paint, releases it smoothly, and cuts laser-sharp straight lines without tape.",
        technique: "Use synthetic nylon/polyester brushes for water-based latex and acrylic paints (water causes natural bristles to become limp and floppy). Use natural China bristle brushes exclusively for oil-based paints, varnishes, and shellac. Dip bristles only 1/3 into paint, tapping gently against the inside rim.",
        proTip: "Never wipe a paintbrush aggressively across the rim of the paint can; tapping bristles against the inside wall loads the brush reservoir without drying out outer bristles.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+choose+and+clean+paintbrushes+like+a+pro"
      },
      {
        id: "s10_t2",
        title: "Paint Rollers",
        difficulty: "Beginner",
        timeEst: "1 Hour",
        tools: "9-inch heavy wire cage roller frame, roller covers (3/8\" and 1/2\" nap), roller tray, extension pole",
        overview: "Paint rollers cover broad wall areas quickly. Matching roller nap thickness to wall texture prevents spattering and uneven stipple.",
        technique: "Use 3/8-inch nap microfiber or woven covers for smooth interior drywall, and 1/2-inch to 3/4-inch nap for textured walls or masonry. Load the roller evenly on the tray ramp. Roll onto the wall in an overlapping 'W' or 'N' pattern, then fill in with vertical smoothing passes.",
        proTip: "Screw an extension pole onto your roller frame even when painting standard 8-foot walls; the pole lets you use your body leverage smoothly from floor to ceiling without strain.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+paint+walls+with+a+roller+no+streaks"
      },
      {
        id: "s10_t3",
        title: "Paint Rollers and Pads",
        difficulty: "Beginner",
        timeEst: "1 Hour",
        tools: "Corner roller, paint edger pad with guide wheels, mini 4-inch hot dog roller",
        overview: "Specialty paint pads and mini-rollers access tight spaces behind radiators, toilets, inside closets, and along ceiling edges.",
        technique: "Use a 4-inch mini roller with matching nap to paint adjacent to cut-in brush lines; rolling over brush cut-ins creates uniform stipple texture that matches the rolled wall face. Wipe guide wheels of paint edger pads frequently to prevent paint transfer onto ceiling trim.",
        proTip: "Lightly wrap a strip of painter's tape around a new paint roller cover and pull it off before use; this pulls off loose factory lint so it won't embed in your wet paint.",
        ytQuery: "https://www.youtube.com/results?search_query=paint+edger+pads+and+mini+rollers+tips"
      },
      {
        id: "s10_t4",
        title: "Spray-Painting",
        difficulty: "Intermediate",
        timeEst: "2-4 Hours",
        tools: "Airless paint sprayer or HVLP spray gun, tip size .515 or .517, respirator mask, masking film and paper",
        overview: "Airless sprayers apply paint at high speed with factory-smooth finish on exterior siding, interior doors, and new construction drywall.",
        technique: "Mask off everything not receiving paint with plastic film and tape. Hold the spray gun perpendicular at a constant distance of 10 to 12 inches from the surface. Begin your arm stroke BEFORE pulling the trigger, overlap passes by 50%, and release trigger before stopping the stroke.",
        proTip: "DANGER: Never point an airless paint sprayer at your hand or body; hydraulic pressures reach 3,000 PSI and can inject toxic paint directly under your skin, requiring emergency surgery.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+use+an+airless+paint+sprayer+for+beginners"
      },
      {
        id: "s10_t5",
        title: "Preparation",
        difficulty: "Beginner",
        timeEst: "2-3 Hours",
        tools: "TSP (trisodium phosphate) substitute, sponge, painter's caulk, spackle, sanding block, drop cloths",
        overview: "Paint cannot adhere to dirty, greasy, or glossy surfaces. Thorough cleaning, scraping, and filling is what separates amateur work from professional durability.",
        technique: "Wash walls in kitchens and baths with TSP cleaner to remove grease and soap film. Scrape all peeling paint with a carbide scraper. Fill nail holes with spackle, sand flush when dry, and caulk all trim seams with acrylic latex painter's caulk before painting.",
        proTip: "Always caulk between baseboards and drywall AFTER applying primer; primer gives caulk something to grip, preventing caulk from splitting away from drywall.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+prep+walls+for+painting+this+old+house"
      },
      {
        id: "s10_t6",
        title: "Ladders",
        difficulty: "Beginner",
        timeEst: "30 Mins",
        tools: "6-foot fiberglass stepladder, 16-24 foot aluminum extension ladder, ladder leveler",
        overview: "Ladder accidents are the leading cause of DIY workshop emergency room visits. Proper setup angles and footing prevent falls.",
        technique: "Follow the 4-to-1 ratio for extension ladders: for every 4 feet of vertical height to the support point, set the ladder base 1 foot out from the wall. Never stand on the top step or bucket shelf of a stepladder. Always maintain 3 points of contact when climbing.",
        proTip: "The 4-to-1 test: stand with your toes touching the base of the ladder and reach straight forward; your palms should comfortably touch the ladder rungs at shoulder height.",
        ytQuery: "https://www.youtube.com/results?search_query=ladder+safety+rules+and+setup+family+handyman"
      },
      {
        id: "s10_t7",
        title: "Interior Painting",
        difficulty: "Beginner",
        timeEst: "4-6 Hours",
        tools: "Angled sash brush, 9\" roller setup, paint tray, blue painter's tape, canvas drop cloths",
        overview: "Painting an interior room in proper sequence (ceiling first, trim second, walls last) produces crisp lines and clean results.",
        technique: "Cut in ceiling and wall edges in 3-foot sections using a 2-1/2 inch angled sash brush. Immediately roll into the wet cut-in paint to maintain a 'wet edge' and eliminate visible flash marks. Apply two thin coats rather than one heavy coat for maximum hide and durability.",
        proTip: "Remove blue painter's tape while the final coat of paint is still slightly damp; if you wait until paint cures rock-hard, pulling the tape will tear the paint film off the wall.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+paint+a+room+start+to+finish+this+old+house"
      },
      {
        id: "s10_t8",
        title: "Painting Doors and Windows",
        difficulty: "Intermediate",
        timeEst: "2-3 Hours",
        tools: "2\" angled sash brush, enamel undercoater primer, semi-gloss acrylic enamel, Floetrol additive",
        overview: "Painting paneled interior doors and divided light windows requires painting in a strict sequence to prevent lap marks and runs.",
        technique: "For panel doors, paint in this order: 1) panel moldings, 2) recessed panels, 3) horizontal rails (top, middle, bottom), 4) vertical stiles, and 5) outer door edges. Add a conditioner like Floetrol to acrylic paint to extend open time and eliminate brush strokes.",
        proTip: "When painting window sash, let paint overlap onto the glass by 1/16-inch; this tiny overlap creates a weatherproof seal against the glazing putty and prevents leaks.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+paint+a+paneled+door+without+brush+marks"
      },
      {
        id: "s10_t9",
        title: "Painting Concrete",
        difficulty: "Intermediate",
        timeEst: "3-5 Hours",
        tools: "Muriatic acid or concrete etch, stiff scrub broom, 2-part epoxy garage floor kit, squeegee, roller",
        overview: "Painting garage floors and basement slabs with 2-part epoxy creates an oil-resistant, showroom-gloss surface that resists hot-tire pickup.",
        technique: "Etch the concrete with acid or concrete etch until the surface feels rough like 120-grit sandpaper (water drops should soak in immediately rather than beading). Mix the 2-part epoxy resin and activator, let induce for 30 minutes, roll evenly, and broadcast color flakes.",
        proTip: "Perform the plastic sheet moisture test on bare concrete before applying epoxy; if water droplets form under taped plastic in 24 hours, moisture will cause epoxy to bubble and peel.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+epoxy+garage+floor+step+by+step"
      },
      {
        id: "s10_t10",
        title: "Painting Problems",
        difficulty: "Intermediate",
        timeEst: "1-2 Hours",
        tools: "Stain-blocking shellac primer (BIN), scraper, sandpaper, moisture meter",
        overview: "Troubleshooting paint failures like blistering, peeling, alligatoring, surfactant leaching, and water stain bleed-through restores durable coatings.",
        technique: "Never paint over water stains or smoke damage with standard latex primerâ€”stains will bleed right through. Seal tannin and water stains with an alcohol-based pigmented shellac primer (Zinsser B-I-N). For blistering paint, scrape to bare substrate, sand edges flush, and let dry thoroughly.",
        proTip: "Shellac-based primer is the only primer that permanently blocks bleed-through from knots in pine lumber, water stains, and severe smoke soot.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+fix+peeling+blistering+paint+problems"
      },
      {
        id: "s10_t11",
        title: "Exterior Painting",
        difficulty: "Intermediate",
        timeEst: "1-3 Days",
        tools: "100% acrylic exterior paint, exterior oil/acrylic primer, pressure washer, carbide scrapers, caulk",
        overview: "Exterior paint shields wood siding and trim from UV sun degradation and rot. Proper priming and 100% acrylic paint ensure 10-15 year durability.",
        technique: "Wash exterior siding to remove dirt and mildew. Scrape flaking paint down to a sound feathered edge. Spot-prime all bare wood immediately. Follow the sun around the house: paint shaded walls to prevent direct solar heat from drying the paint skin before solvents evaporate (solvent boil).",
        proTip: "Never paint exterior siding in direct blazing sunlight; the sun quickly bakes the paint surface skin, trapping moisture underneath that creates unsightly blisters.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+paint+house+exterior+this+old+house"
      },
      {
        id: "s10_t12",
        title: "Wallpapering",
        difficulty: "Intermediate",
        timeEst: "3-5 Hours",
        tools: "Wallpaper smoother, seam roller, snap-off razor knives, water tray or paste roller, plumb line",
        overview: "Wallpaper adds pattern and texture. Establishing a true plumb starting line and careful pattern matching ensures invisible seams.",
        technique: "Never assume room corners are plumb. Use a 4-foot level or chalk plumb line to establish your first vertical line. Smooth paper from the center outward to edges with a flexible plastic smoother to push out air bubbles. Change razor blades on every single cut to prevent tearing wet paper.",
        proTip: "Snap off a fresh razor blade segment on your knife for EVERY cut on wet wallpaper; a slightly dull blade will snag wet wallpaper and tear a jagged rip in the sheet.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+hang+wallpaper+for+beginners+this+old+house"
      },
      {
        id: "s10_t13",
        title: "Ceilings",
        difficulty: "Beginner",
        timeEst: "2 Hours",
        tools: "Ultra-flat dead ceiling paint, 1/2\" nap roller, extension pole, safety glasses, baseball cap",
        overview: "Painting ceilings bright white reflects light throughout rooms. Using ultra-flat dead-finish paint eliminates glare and hides minor ceiling imperfections.",
        technique: "Always use specialized ultra-flat ceiling paint; flat sheens reflect light diffusely, making drywall seams and roller overlaps completely invisible. Roll across the narrow width of the room in short continuous strokes, overlapping wet edges without pausing.",
        proTip: "Paint the ceiling BEFORE painting the walls; any tiny paint spatters that mist onto the walls will be covered when you cut in and roll the wall color later.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+paint+a+ceiling+without+streaks"
      },
      {
        id: "s10_t14",
        title: "Wall Coverings",
        difficulty: "Intermediate",
        timeEst: "3-4 Hours",
        tools: "Acoustic fabric, wood paneling adhesive, utility knife, heavy shears, seam roller",
        overview: "Specialty wall coverings like vinyl, acoustic felt, grasscloth, and cork provide sound dampening and rich architectural texture.",
        technique: "Prime walls with specialized wallpaper primer (such as Roman Shield) to create a uniform porous surface that prevents wallboard drywall tearing during future removal. For natural grasscloth, book the paper gently without creasing, and avoid getting adhesive on the natural show face.",
        proTip: "Always prime drywall with an acrylic wallcovering sizing primer before hanging wallpaper; this ensures paper can be peeled off cleanly 10 years later without destroying drywall.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+hang+grasscloth+and+specialty+wallcoverings"
      },
      {
        id: "s10_t15",
        title: "Ceramic Wall Tiles",
        difficulty: "Intermediate",
        timeEst: "4-6 Hours",
        tools: "Tile cutter (snap cutter), 1/4\" notched trowel, tile mastic or thinset, rubber float, tile spacers",
        overview: "Installing a subway tile kitchen backsplash or bathroom tub surround protects walls from moisture and elevates home aesthetics.",
        technique: "Establish a level horizontal benchmark line and vertical center line. Spread mastic or modified thinset with a 1/4-inch notched trowel at a 45-degree angle. Press tiles with a slight twisting motion, insert plastic spacers, check flat with a margin block, and grout 24 hours later.",
        proTip: "Never grout inside 90-degree corners or where tile meets countertops or tubs; movement will crack rigid grout. Always fill change-of-plane joints with color-matched 100% silicone caulk.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+install+tile+backsplash+kitchen"
      },
      {
        id: "s10_t16",
        title: "Floor Coverings",
        difficulty: "Intermediate",
        timeEst: "4-8 Hours",
        tools: "Tapping block, pull bar, laminate/vinyl plank guillotine cutter, spacers (1/4\"), underlayment",
        overview: "Luxury Vinyl Plank (LVP) and laminate floating floors provide waterproof, scratch-resistant flooring that clicks together without glue or nails.",
        technique: "Check subfloor flatness (must be within 3/16-inch over 10 feet). Lay 1/4-inch perimeter expansion spacers against all walls. Angle the tongue of the new plank into the groove of the preceding plank at a 30-degree angle, press down, and tap snug with a tapping block and pull bar.",
        proTip: "Never install floating floors tight against drywall or baseboards; without a 1/4-inch to 3/8-inch expansion gap, seasonal humidity expansion will cause floorboards to buckle and tent in the room center.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+install+luxury+vinyl+plank+flooring+lvp"
      }
    ]
  },
  {
    id: 11,
    title: "Working with Wood",
    subtitle: "Joinery, Carpentry, Cabinetry, and Finishing",
    icon: "fa-tree",
    intro: "Wood is an organic, living material that expands and contracts across its grain. Understanding wood anatomy, joinery geometry, grain direction, and finishing creates heirloom woodwork.",
    prep40: [
      "Acclimation protocol: Store lumber inside the workshop or home for at least 7 to 14 days before milling to balance moisture content.",
      "Grain orientation inspection: Orient growth rings to account for seasonal cupping (rings tend to straighten out as wood dries).",
      "Sharpening before cutting: Hone chisels and plane irons to razor sharpness before attempting joinery.",
      "Reference edge milling: Joint one face flat and one edge 90-degree square before ripping or thicknessing lumber."
    ],
    tech30: {
      beginner: "Crosscutting and ripping dimensional lumber; identifying wood grain direction; assembling pocket hole and butt joints; applying wiping stains.",
      intermediate: "Cutting mortise and tenon joints; routing rabbets and dados; building five-piece shaker cabinet doors and drawer boxes; applying polyurethane finishes.",
      expert: "Cutting hand-cut through and half-blind dovetails; bookmatching figured veneers; steam bending solid hardwood curves; applying French polish shellac."
    },
    risk30: {
      projects: "Dining tables, built-in bookcases, kitchen cabinetry, dovetail chests, deck stairs, architectural paneling.",
      risks: "Severe table saw kickback; jointer knife contact; ruined projects from failing to allow for wood movement.",
      callPro: "Heavy timber frame trusses and structural ridge beam installations requiring crane rigging and structural engineering stamps."
    },
    tasks: [
      {
        id: "s11_t1",
        title: "Understanding Wood",
        difficulty: "Beginner",
        timeEst: "1 Hour",
        tools: "Wood moisture meter, end-grain magnifying loupe",
        overview: "Wood moves continuously with changes in relative humidity, expanding and contracting across the grain (tangentially and radially), but almost zero along its length.",
        technique: "Measure moisture content with a pin or pinless moisture meter (aim for 6-8% for interior furniture, 12-15% for exterior carpentry). Design all furniture tabletops with breadboard ends or slotted screw cleats that allow cross-grain movement without cracking.",
        proTip: "Never rigidly glue or pocket-screw a wide solid wood tabletop to its base; seasonal cross-grain expansion will crack the tabletop or tear the apron screws right out.",
        ytQuery: "https://www.youtube.com/results?search_query=understanding+wood+movement+for+woodworkers"
      },
      {
        id: "s11_t2",
        title: "Wood Types",
        difficulty: "Beginner",
        timeEst: "1 Hour",
        tools: "Hardwood and softwood sample kit",
        overview: "Understanding the difference between softwoods (conifers like pine and cedar) and hardwoods (deciduous broadleaf trees like oak, maple, and cherry) guides material choice.",
        technique: "Select softwoods (Douglas fir, SPF) for structural house framing due to high strength-to-weight ratio. Select closed-grain hardwoods (hard maple, cherry) for fine cabinetry and furniture. Use rot-resistant woods (white oak, cedar, redwood) for outdoor projects.",
        proTip: "Red oak absorbs water like drinking straws through its open cellular pores, rotting outdoors quickly; white oak has pores plugged with tyloses, making it completely waterproof for boatbuilding and barrels.",
        ytQuery: "https://www.youtube.com/results?search_query=hardwood+vs+softwood+types+for+woodworking"
      },
      {
        id: "s11_t3",
        title: "Deciding What to Buy",
        difficulty: "Beginner",
        timeEst: "1 Hour",
        tools: "Tape measure, lumber calculator, cut list",
        overview: "Lumber is sold in nominal sizes (a 2x4 is actually 1-1/2\" x 3-1/2\") and hardwoods are sold by the 'board foot' (BF = 144 cubic inches).",
        technique: "Calculate board footage: (Thickness in inches Ã— Width in inches Ã— Length in inches) Ã· 144. Buy rough lumber as 4/4 (1\" thick rough, mills to 3/4\"), 6/4, or 8/4. Add a 15-20% waste factor to account for knots, checks, and sapwood defects.",
        proTip: "Sight down the length of every board at the lumberyard like an arrow; inspect for bow, cup, crook, and twist before loading it into your cart.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+buy+lumber+board+feet+explained"
      },
      {
        id: "s11_t4",
        title: "Working with Plywood",
        difficulty: "Beginner",
        timeEst: "1-2 Hours",
        tools: "Circular saw with track guide or straightedge, 60-tooth fine blade, blue painter's tape",
        overview: "Plywood is dimensionally stable because its alternating cross-laminated veneers cancel out wood expansion, making it ideal for cabinet carcasses.",
        technique: "Support 4x8 sheet goods on a 1-1/2 inch rigid foam insulation board resting on the shop floor or sawhorses, then cut anywhere through the plywood and into the foam with a circular saw. Apply blue painter's tape along the cutline to eliminate veneer tearout.",
        proTip: "Placing a 4x8 sheet of rigid 1.5-inch foam insulation on the floor allows you to safely cut full plywood sheets with zero board sagging or blade pinching.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+cut+plywood+sheets+clean+no+tearout"
      },
      {
        id: "s11_t5",
        title: "Manufactured Wood",
        difficulty: "Beginner",
        timeEst: "1 Hour",
        tools: "MDF / particleboard / OSB samples, carbide drill bits, countersink",
        overview: "MDF (Medium Density Fiberboard) and OSB (Oriented Strand Board) offer flat, uniform substrates without grain defects for painted cabinetry and subfloors.",
        technique: "Always predrill and countersink screw holes in MDF; driving screws without pilot holes will cause the dense edges to delaminate and split open like a book. Wear an N95 respirator when cutting MDF, as it produces copious fine dust.",
        proTip: "Seal the porous edges of MDF with two coats of shellac or drywall joint compound and sand smooth before painting; unsealed edges soak up paint like a sponge.",
        ytQuery: "https://www.youtube.com/results?search_query=working+with+mdf+tips+screws+painting"
      },
      {
        id: "s11_t6",
        title: "Carpentry",
        difficulty: "Intermediate",
        timeEst: "3-5 Hours",
        tools: "Speed square, 25ft tape, framing hammer, circular saw, level",
        overview: "Rough carpentry forms the structural skeleton of walls, floors, and roofs, relying on studs, headers, joists, and top plates.",
        technique: "Lay out wall studs spaced on 16-inch centers so 48-inch drywall sheets land squarely on stud centers. Crown all framing studs: look down the narrow edge, identify the crowned bow, and install all studs with the crown facing the same direction (or facing up on floor joists).",
        proTip: "Always install horizontal floor joists and ceiling rafters with their crown (the curved bow) facing UP; dead load weight will naturally flatten the crown over time.",
        ytQuery: "https://www.youtube.com/results?search_query=wall+framing+basics+carpentry+for+beginners"
      },
      {
        id: "s11_t7",
        title: "Wall Paneling",
        difficulty: "Intermediate",
        timeEst: "3-4 Hours",
        tools: "Tongue-and-groove boards or shiplap, 18-gauge brad nailer, level, paneling adhesive",
        overview: "Shiplap, beadboard, and tongue-and-groove paneling add warm architectural character to living rooms, ceilings, and hallways.",
        technique: "Locate wall studs and snap chalk lines. Blind-nail tongue-and-groove paneling by driving 18-gauge brads at a 45-degree angle through the base of the tongue into studs; the groove of the next board conceals all nail heads completely without filling.",
        proTip: "Blind-nailing through the tongue of tongue-and-groove wood boards conceals 100% of nail holes, eliminating hours of tedious wood putty filling.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+install+tongue+and+groove+shiplap+paneling"
      },
      {
        id: "s11_t8",
        title: "Working with Laminates",
        difficulty: "Intermediate",
        timeEst: "2 Hours",
        tools: "Plastic laminate sheet (Formica), solvent-based contact cement, J-roller, flush-trim router bit",
        overview: "High-pressure plastic laminates create durable, scratch-resistant, waterproof surfaces on countertops and workbenches.",
        technique: "Apply contact cement to both the substrate and laminate underside; let dry until tacky to touch. Lay dry wooden dowel rods across the surface as spacers. Position the laminate accurately, slide dowels out one by one from center outward, and roll with a J-roller. Trim edges with a flush-trim carbide router bit.",
        proTip: "Use wooden venetian blind slats or dowels as spacers when placing laminate over contact cement; once contact cement surfaces touch, you cannot adjust or slide them.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+install+plastic+laminate+countertop+formica"
      },
      {
        id: "s11_t9",
        title: "Working with Veneers",
        difficulty: "Advanced",
        timeEst: "3 Hours",
        tools: "Paper-backed or raw wood veneer, veneer saw, veneer tape, vacuum press bag or cold-press glue",
        overview: "Veneering allows woodworkers to showcase breathtaking burl, curly, and bookmatched grain patterns over stable plywood cores.",
        technique: "Cut delicate veneers using a dedicated curved-blade veneer saw guided by a steel straightedge. Join edges with perforated gummed veneer tape. Apply cold-press veneer glue with a short-nap roller, clamp inside a vacuum bag press or between heavy caul plates for 4 hours.",
        proTip: "Always veneer both the front face and back face of a panel with matching-thickness veneer; veneering only one side creates asymmetric moisture absorption that bows the panel.",
        ytQuery: "https://www.youtube.com/results?search_query=wood+veneering+basics+for+beginners"
      },
      {
        id: "s11_t10",
        title: "Measuring and Marking (Wood)",
        difficulty: "Beginner",
        timeEst: "1 Hour",
        tools: "Marking knife, wheel marking gauge, engineer's square, 0.5mm mechanical pencil",
        overview: "Precision joinery demands marking lines with a sharp steel blade rather than a blunt pencil, severing fibers for perfect chisel register.",
        technique: "Use a wheel marking gauge to scribe consistent thickness lines around all four sides of tenons. Place the marking knife blade directly on your layout mark, slide the square up until it touches the blade, and scribe firmly in a single smooth stroke.",
        proTip: "A knife line creates a physical notch that guides the teeth of your saw or the edge of your chisel; pencil lines have width and leave room for error.",
        ytQuery: "https://www.youtube.com/results?search_query=measuring+and+marking+tools+woodworking+paul+sellers"
      },
      {
        id: "s11_t11",
        title: "Wood Joints",
        difficulty: "Intermediate",
        timeEst: "2 Hours",
        tools: "Joinery overview samples, chisels, back saw, router",
        overview: "Wood joints range from simple butt joints reinforced with screws to complex mechanical interlocks like mortise and tenons and dovetails.",
        technique: "Select the joint based on the direction of applied stress: joints subject to pull forces need mechanical interlocks (dovetails); joints subject to racking forces need deep shoulder registers (mortise and tenon).",
        proTip: "End grain to end grain glued joints have virtually zero strength; strong wood joints must bond long grain to long grain fibers.",
        ytQuery: "https://www.youtube.com/results?search_query=woodworking+joints+explained+which+to+use"
      },
      {
        id: "s11_t12",
        title: "Lap Joints",
        difficulty: "Beginner",
        timeEst: "1-2 Hours",
        tools: "Table saw with dado stack or router, crosscut sled, clamps, wood glue",
        overview: "Half-lap and cross-lap joints remove half the thickness of each board, allowing mating faces to intersect flush with large glue surface area.",
        technique: "Set blade or router depth to exactly 1/2 the thickness of the board using test scrap pieces. Make multiple overlapping passes to hog out waste. Check that joint faces meet dead flush with zero rocking.",
        proTip: "Always cut half-lap joints in test scrap pieces from the same board to dial in exact depth before touching your actual project stock.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+cut+half+lap+joints+table+saw"
      },
      {
        id: "s11_t13",
        title: "Dado Joints",
        difficulty: "Intermediate",
        timeEst: "1-2 Hours",
        tools: "Dado blade set or straight router bit, router table, T-square guide",
        overview: "A dado is a three-sided channel cut across the wood grain that houses shelves and cabinet dividers, preventing sag under heavy loads.",
        technique: "Milling a dado matching the exact thickness of modern undersized plywood (a 3/4\" sheet is actually 23/32\") requires shimming a stacked dado blade or making two passes with a 1/2\" straight router bit guided by a scrap plywood offset jig.",
        proTip: "Stop a through-dado 1/2 inch before the front face of a bookcase to create a 'stopped dado'; the shelf joint will be invisible from the front face.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+cut+clean+dados+and+grooves+woodworking"
      },
      {
        id: "s11_t14",
        title: "Mortise and Tenon Joints",
        difficulty: "Intermediate",
        timeEst: "2-3 Hours",
        tools: "Mortise chisel, tenon saw, router or hollow chisel mortiser, marking gauge",
        overview: "The mortise and tenon is the king of structural woodworking joints, anchoring table legs and door rails with immense strength.",
        technique: "Rule of thumb: make the tenon thickness 1/3 the thickness of the stock. Cut the mortise pocket first using a drill or mortise chisel. Cut the tenon cheeks slightly fat with a backsaw, then pare them to a snug push-fit using a sharp bench chisel.",
        proTip: "A mortise and tenon joint should slide together under firm hand palm pressure; if you need a hammer to drive it, it's too tight and will starve the joint of glue.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+cut+a+mortise+and+tenon+joint+paul+sellers"
      },
      {
        id: "s11_t15",
        title: "Dovetail and L Joints",
        difficulty: "Advanced",
        timeEst: "3-4 Hours",
        tools: "Dovetail saw, fret saw, 1/4\" and 1/2\" bench chisels, marking knife, dovetail marker (1:6 or 1:8)",
        overview: "Through dovetails mechanically interlock pins and tails, resisting pull forces and serving as the hallmark of master drawer construction.",
        technique: "Lay out tails with a 1:8 ratio for hardwoods or 1:6 for softwoods. Saw straight down the waste side of knife lines. Remove bulk waste with a fret saw and chop to the baseline with a chisel. Transfer tail locations onto the pin board using a thin marking knife.",
        proTip: "Undercut the baseline waste of dovetails slightly hollow toward the inside; this guarantees the mating shoulders seat tightly without bottoming out on high spots.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+cut+dovetails+by+hand+step+by+step"
      },
      {
        id: "s11_t16",
        title: "Dovetail Variations",
        difficulty: "Advanced",
        timeEst: "3-5 Hours",
        tools: "Half-blind dovetail jig or hand tools, router with dovetail bit",
        overview: "Half-blind dovetails conceal joint joinery from the front drawer face, while sliding dovetails attach structural table stretchers.",
        technique: "In half-blind dovetails, tails are cut shorter to fit into mortises stopped 3/16-inch before the front face. Use a sliding dovetail bit on a router table to mill tapered sliding tenons for structural shelf joints that never pull out.",
        proTip: "Taper sliding dovetails 1/32-inch along their length; they will slide together loosely until the final 2 inches, where they lock rock-solid.",
        ytQuery: "https://www.youtube.com/results?search_query=half+blind+dovetails+and+sliding+dovetails"
      },
      {
        id: "s11_t17",
        title: "Right-Angle Joints",
        difficulty: "Beginner",
        timeEst: "1 Hour",
        tools: "Pocket hole jig, pocket screws, face clamp, wood glue",
        overview: "Corner 90-degree joints join face frames and cabinet carcasses. Modern pocket-hole joinery creates strong 90-degree corners in seconds.",
        technique: "Set the pocket hole drill bit collar and jig stop to matching wood thickness (3/4\"). Clamp the wood securely in the jig and bore twin pocket holes. Clamp the joint flush with a wide face clamp and drive self-tapping pocket screws with slow torque.",
        proTip: "Always clamp face frames dead-flush with a flat-pad face clamp while driving pocket screws; without clamping, screw rotation will pull the mating face out of flush.",
        ytQuery: "https://www.youtube.com/results?search_query=pocket+hole+joinery+basics+kreg+jig"
      },
      {
        id: "s11_t18",
        title: "X or Crisscross Joints",
        difficulty: "Intermediate",
        timeEst: "2 Hours",
        tools: "Miter saw, crosscut sled, chisel, bar clamps, wood glue",
        overview: "Crisscross lap joints provide dramatic architectural bracing on farmhouse table bases, wine racks, and pergola rafters.",
        technique: "Cross two boards at the desired angle and scribe both intersecting edges with a marking knife. Rout or chisel out half the thickness from each board between scribed lines. Squeeze glue and clamp flat until dry.",
        proTip: "Scribe X-joints directly from the actual intersecting boards rather than measuring angles with a protractor; direct scribing eliminates cumulative angle errors.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+cut+crisscross+half+lap+joint"
      },
      {
        id: "s11_t19",
        title: "Butt Joints",
        difficulty: "Beginner",
        timeEst: "30 Mins",
        tools: "Doweling jig, fluted hardwood dowels, drill, wood glue, clamps",
        overview: "A simple butt joint is the weakest wood joint unless reinforced with internal hardwood dowels, biscuits, or dominoes.",
        technique: "Clamp a self-centering doweling jig over the mating pieces. Bore matching holes for fluted dowels with a depth-stop collar. Coat dowels and holes with glue (compressed fluted dowels expand as they absorb water from the glue) and clamp tightly.",
        proTip: "Use spirally fluted dowels rather than smooth dowel pins; flutes allow trapped air and excess glue to escape while providing glue channels for superior grip.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+make+strong+dowel+joints+woodworking"
      },
      {
        id: "s11_t20",
        title: "Lengthening Joints",
        difficulty: "Intermediate",
        timeEst: "2 Hours",
        tools: "Hand saw, chisel, scarf joint template, bar clamps, waterproof glue",
        overview: "Scarf joints join two pieces of timber end-to-end to create long moulding runs and boat sheer planks without weak butt joints.",
        technique: "Cut complementary angled bevels on the mating ends (standard slope ratio of 8:1 for maximum glue surface). Apply glue and clamp with non-slip guide blocks to prevent the angled pieces from sliding past each other under clamping pressure.",
        proTip: "Tack a tiny brad into the center of a scarf joint bevel and nip the head off with pliers before clamping; the protruding pin bites the mating face, preventing slippage.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+cut+and+glue+a+scarf+joint+woodworking"
      },
      {
        id: "s11_t21",
        title: "Three-Way Joints",
        difficulty: "Advanced",
        timeEst: "3-4 Hours",
        tools: "Castle joint layout tools, mortise chisel, tenon saw, router",
        overview: "Three-way corner joints (such as the classic Japanese castle joint) intersect a vertical leg and two horizontal stretchers in a single locked node.",
        technique: "Rout a central cross-lap dado through the leg top to form four surrounding corner posts ('towers'). Mill notched through-tenons on horizontal stretchers that interlock and drop into the castle pocket, locking the entire 3D junction without fasteners.",
        proTip: "Castle joints provide massive structural load capacity and look stunning on open-frame timber tables and bed frames.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+make+a+castle+joint+woodworking"
      },
      {
        id: "s11_t22",
        title: "How to Use Moldings",
        difficulty: "Intermediate",
        timeEst: "2-3 Hours",
        tools: "Compound miter saw, coping saw, 18-gauge brad nailer, trim pry bar",
        overview: "Crown moldings, cove trim, and chair rails finish ceiling transitions and add rich neoclassical proportion to rooms.",
        technique: "When cutting crown molding flat on a compound miter saw, calibrate the exact miter and bevel settings from a crown angle chart. When cutting upside-down and backwards in the saw fence, nest the molding against the fence at its installed spring angle.",
        proTip: "Install 45-degree triangular wood backer blocks in ceiling corners before hanging crown molding; the backer gives you solid backing to nail into anywhere.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+cut+and+install+crown+molding+this+old+house"
      },
      {
        id: "s11_t23",
        title: "Accurate Verticals and Horizontals",
        difficulty: "Beginner",
        timeEst: "1 Hour",
        tools: "4ft box beam level, torpedo level, laser level, plumb bob",
        overview: "Cabinets, door jambs, and shelving look professional only when installed true to plumb (vertical) and level (horizontal).",
        technique: "Find the high spot of the floor using a 6-foot level or self-leveling cross-line laser before installing base cabinets. Mark a reference level line at 34-1/2 inches from the highest floor point and shim all cabinet boxes to that benchmark line.",
        proTip: "Never trust house walls or floors to be plumb or level; always reference from your own calibrated laser line or spirit level.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+use+levels+plumb+bob+laser+level"
      },
      {
        id: "s11_t24",
        title: "Basic Structures",
        difficulty: "Intermediate",
        timeEst: "3-5 Hours",
        tools: "Framing square, speed square, circular saw, drill, 3\" framing screws",
        overview: "Box framing fundamentals apply to building shed walls, workbenches, platform bed frames, and garage storage shelving.",
        technique: "Assemble ladder-frame boxes with 2x4 lumber. Check for square by measuring corner-to-corner diagonal dimensions: when both diagonals are exactly equal, the frame is perfectly square. Fasten diagonal plywood gusset plates to prevent racking.",
        proTip: "The 3-4-5 rule: measure 3 feet along one edge and 4 feet along the perpendicular edge; if the diagonal between them is exactly 5 feet, the corner is an absolute 90-degree right angle.",
        ytQuery: "https://www.youtube.com/results?search_query=basic+box+framing+carpentry+principles"
      },
      {
        id: "s11_t25",
        title: "Drawer Construction",
        difficulty: "Intermediate",
        timeEst: "2-3 Hours",
        tools: "Table saw, 1/2\" Baltic birch plywood, 1/4\" plywood for bottom, soft-close drawer slides",
        overview: "Building sturdy drawers that glide smoothly requires rigid 4-sided boxes with captured bottoms and exact slide clearance.",
        technique: "Build drawer boxes 1 inch narrower than the cabinet opening width to accommodate standard 1/2-inch side-mount ball-bearing slides (or exact OEM clearances for undermount slides). Capture the 1/4-inch bottom in a groove routed 1/2-inch up from the bottom edge.",
        proTip: "Never glue drawer bottom panels into their grooves; capture bottoms floating loose so panels can expand and contract without warping the drawer box.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+build+simple+sturdy+drawers+woodworking"
      },
      {
        id: "s11_t26",
        title: "Interior Construction",
        difficulty: "Intermediate",
        timeEst: "4-6 Hours",
        tools: "Stud finder, drywall saw, 2x4 framing lumber, structural screws, level",
        overview: "Framing interior partition walls, building closets, and installing pocket doors customizes floor plans without load-bearing risks.",
        technique: "Fasten the bottom sole plate to concrete with masonry screws or to wood subfloors into joists. Plumb and fasten the top plate to ceiling joists. Fasten studs every 16 inches on center, ensuring double studs (king and jack) support door headers.",
        proTip: "Lay acoustic foam gasket tape or sill sealer under bottom partition plates; it blocks sound transmission between rooms and isolates moisture.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+frame+an+interior+partition+wall"
      },
      {
        id: "s11_t27",
        title: "Finishing Wood",
        difficulty: "Beginner",
        timeEst: "1-2 Hours",
        tools: "Pre-stain wood conditioner, oil or water-based pigment stain, foam brushes, clean cotton rags",
        overview: "Proper staining enhances natural grain beauty. Pre-stain conditioning prevents splotchy absorption on softwoods like pine and birch.",
        technique: "Apply pre-stain conditioner to bare pine, birch, or cherry and wait 15 minutes. Wipe on oil-based stain with a rag or foam brush, allow pigments to penetrate for 5 to 10 minutes, and wipe away all excess stain thoroughly with a clean dry cotton rag.",
        proTip: "DANGER: Oily rags soaked in linseed oil or oil-based stains can spontaneously combust as oils oxidize; lay rags flat outside on concrete to dry, or immerse in a water-filled can.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+stain+wood+evenly+no+blotching"
      },
      {
        id: "s11_t28",
        title: "Final Finishes",
        difficulty: "Intermediate",
        timeEst: "2 Hours",
        tools: "Oil-based or waterborne polyurethane, natural bristle brush, 320-grit sandpaper, tack cloth",
        overview: "Clear protective topcoats (polyurethane, lacquer, varnish) shield wood from water rings, scratches, and household chemicals.",
        technique: "Apply 3 coats of polyurethane. Lightly scuff-sand between cured coats using 320-grit sandpaper to knock down airborne dust nibs, and wipe with a tack cloth before recoating. Never shake a can of polyurethane (which introduces bubbles); stir gently with a stick.",
        proTip: "Stir polyurethane gently with a paddleâ€”NEVER shake the can; shaking whips millions of microscopic air bubbles into the finish that cure into permanent cloudy blemishes.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+apply+polyurethane+without+bubbles"
      },
      {
        id: "s11_t29",
        title: "Special Finishes",
        difficulty: "Intermediate",
        timeEst: "2 Hours",
        tools: "Rubbing wax, boiled linseed oil, pure tung oil, Danish oil, lint-free cotton cloth",
        overview: "Penetrating oil finishes (Danish oil, tung oil) soak into wood pores rather than forming a plastic film, preserving natural tactile warmth.",
        technique: "Flood Danish oil or tung oil across the sanded wood until the surface stays wet for 15 minutes. Wipe the surface completely dry with clean rags. Apply 3-4 coats over consecutive days, buffing the final dried coat with paste wax and steel wool.",
        proTip: "Penetrating oil finishes are easy to spot-repair years later; simply rub a fresh swipe of oil into scratches without stripping the surrounding surface.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+apply+danish+oil+tung+oil+wood+finish"
      },
      {
        id: "s11_t30",
        title: "Antiquing",
        difficulty: "Beginner",
        timeEst: "2 Hours",
        tools: "Chalk-style paint, dark wax, 120-grit sanding block, wax brush, rag",
        overview: "Distressing and antiquing creates authentic vintage patina on painted furniture, highlighting natural wear points along edges.",
        technique: "Apply two coats of chalk paint. Once dry, sand corners, edges, and raised carvings with 120-grit paper to reveal underlying bare wood or primer where natural wear occurs. Apply dark antique paste wax into crevices and wipe highlights clean with a rag.",
        proTip: "Only distress areas where natural hands and clothing would realistically rub over decades (corners, handles, chair rungs); random distressing looks fake.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+distress+furniture+and+antique+chalk+paint"
      },
      {
        id: "s11_t31",
        title: "Achieving Surface Effects",
        difficulty: "Intermediate",
        timeEst: "2 Hours",
        tools: "Propane torch (Shou Sugi Ban), wire brush, wire cup wheel, card scraper",
        overview: "Texturing wood through Shou Sugi Ban (charred cedar), wire brushing grain, and card scraping creates tactile, artisanal surfaces.",
        technique: "For Japanese Shou Sugi Ban, torch cypress or pine with a propane weed torch until deeply alligator-charred. Brush away loose ash with a brass wire brush to reveal dramatic raised dark latewood grain rings, then seal with natural tung oil.",
        proTip: "Use a simple handheld steel card scraper to smooth figured hardwoods; scrapers never cause tearout on curly maple or wild burls where power planers gouge.",
        ytQuery: "https://www.youtube.com/results?search_query=shou+sugi+ban+charred+wood+technique"
      }
    ]
  },
  {
    id: 12,
    title: "Metals: How to Use Them in Home Repair",
    subtitle: "Cutting, Drilling, Fastening, and Forming Ferrous and Non-Ferrous Metals",
    icon: "fa-wrench",
    intro: "Metalworking expands your repair capabilities to steel brackets, copper tubing, threaded rod repairs, and sheet metal duct fabrication. Understanding metal hardness, chip formation, and tapping mechanics prevents broken tools.",
    prep40: [
      "Metallurgy identification: Know your metal (mild steel, aluminum, brass, stainless steel, cast iron); each requires different cutting speeds and coolants.",
      "Speed and feed rule: The harder the metal and the larger the bit, the slower the drill RPM must run to prevent burning cutting edges.",
      "Impact and deburring safety: Grind away sharp razor metal burrs immediately after cutting to prevent deep lacerations.",
      "Eye and hand protection: Wear ANSI-rated safety glasses and heavy leather gloves when handling sharp sheet metal edges."
    ],
    tech30: {
      beginner: "Hacksawing steel pipe square; deburring cut metal with bastard files; drilling pilot holes with center punch and cutting oil.",
      intermediate: "Tapping internal machine threads; cutting external bolt threads with dies; setting pop rivets in sheet metal.",
      expert: "Sweating heavy brass valves; forming complex sheet metal duct transitions with hand seamers; re-tempering cold chisels."
    },
    risk30: {
      projects: "Fabricating gate brackets, repairing lawn mower decks, running electrical conduit, sheet metal ductwork, tapping stripped bolts.",
      risks: "Severe razor lacerations from sharp sheet metal burrs; hot metal chips entering eyes; tool shatter from overtightened taps.",
      callPro: "Certified structural steel beam welding or high-pressure gas cylinder manifold repairs."
    },
    tasks: [
      {
        id: "s12_t1",
        title: "Working with Metals",
        difficulty: "Beginner",
        timeEst: "1 Hour",
        tools: "Bench vise with soft copper jaws, ball-peen hammer, center punch, leather gloves",
        overview: "Metalworking in home repair focuses on cutting, shaping, and fastening mild steel angles, aluminum trim, and copper pipe.",
        technique: "Secure workpieces firmly in a bench vise. Line cast-iron vise jaws with scrap copper or aluminum pads to avoid marring finished metal faces. Always use a ball-peen hammer (not a wood claw hammer) when striking metal tools or forming rivets.",
        proTip: "Never strike two hardened steel hammers together; the brittle faces can shatter like glass, throwing high-speed metal shrapnel.",
        ytQuery: "https://www.youtube.com/results?search_query=metalworking+basics+for+beginners+tools"
      },
      {
        id: "s12_t2",
        title: "Measuring and Marking (Metal)",
        difficulty: "Beginner",
        timeEst: "45 Mins",
        tools: "Carbide-tipped scriber, layout fluid (Dykem Blue), steel rule, center punch",
        overview: "Pencils do not mark metal clearly. Coating metal with layout fluid and scribing with a hardened steel scriber produces hair-thin layout precision.",
        technique: "Brush blue layout fluid (Dykem) across the metal face. Scribe lines with a sharp carbide scriber against a steel rule. Make a sharp dimple at every hole center point using a center punch and hammer to prevent drill bits from wandering.",
        proTip: "Always strike a deep center punch dimple before drilling metal; without a punch dimple, spinning drill bits will skate across the metal surface, scratching the workpiece.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+mark+metal+dykem+center+punch"
      },
      {
        id: "s12_t3",
        title: "Files",
        difficulty: "Beginner",
        timeEst: "1 Hour",
        tools: "10\" mill bastard file, round file, half-round file, file card, handle",
        overview: "Files shape metal profiles, remove dangerous razor burrs from hacksaw cuts, and sharpen mower blades with controlled precision.",
        technique: "Grip the file handle in one hand and guide the tip with the other. Apply downward pressure ONLY on the forward push stroke; lift or relieve pressure on the return stroke. Use a file card regularly to clean clogged metal chips from teeth.",
        proTip: "Dragging a metal file backward across metal under pressure rapidly rolls over and destroys its delicate cutting teeth; always lift on the return stroke.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+file+metal+properly+types+of+files"
      },
      {
        id: "s12_t4",
        title: "Files, Chisels, Retempering Tools",
        difficulty: "Advanced",
        timeEst: "2 Hours",
        tools: "MAPP gas or propane torch, bucket of oil or water, emery cloth, magnet",
        overview: "Cold chisels and center punches dull over time. Heating steel to cherry red, quenching, and tempering restores hardened cutting edges without brittleness.",
        technique: "Heat the tool tip with a torch until cherry red (non-magnetic, ~1500Â°F). Quench the first 1/2-inch in oil or water. Quickly polish the bevel with emery cloth and watch heat colors run from the shank into the tip; when straw-yellow or bronze reaches the tip, quench completely to freeze the temper.",
        proTip: "Aim for a straw-yellow color at the cutting edge when tempering cold chisels; straw provides razor hardness while leaving the tool shank ductile to absorb hammer blows.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+harden+and+temper+steel+tools"
      },
      {
        id: "s12_t5",
        title: "Cutting Metal",
        difficulty: "Beginner",
        timeEst: "1 Hour",
        tools: "Hacksaw with high-tension frame (18, 24, 32 TPI blades), bi-metal reciprocating blade, cutting wax",
        overview: "Hacksaws cut steel rod, pipe, and unistrut cleanly. Matching teeth-per-inch (TPI) to material thickness prevents tooth stripping.",
        technique: "The golden rule of hacksawing: ensure at least 3 consecutive saw teeth are in contact with the metal thickness at all times (use 18 TPI for thick steel bar, 24 TPI for pipe, 32 TPI for thin tubing). Saw at a steady pace of 40-50 strokes per minute.",
        proTip: "If you saw metal too fast with a hacksaw, friction heat will soften and destroy the blade teeth in seconds; saw at a slow, deliberate 40-50 strokes per minute.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+use+a+hacksaw+properly+tpi+selection"
      },
      {
        id: "s12_t6",
        title: "Drilling Metal",
        difficulty: "Intermediate",
        timeEst: "1 Hour",
        tools: "Cobalt or HSS twist drill bits, cutting fluid / 3-in-One oil, center punch, drill press or corded drill",
        overview: "Drilling clean holes in metal requires slow RPM, heavy down-pressure, and generous cutting fluid to dissipate extreme friction heat.",
        technique: "Apply a few drops of cutting fluid to the bit tip. Set drill speed slow (e.g. 500 RPM for 3/8\" hole in steel). Push firmly so the bit cuts continuous curly steel ribbons rather than pulverized dust. For holes over 1/4-inch, always drill a 1/8-inch pilot hole first.",
        proTip: "If your metal drilling produces fine powder rather than long spiral shavings, you are spinning too fast with too little down-pressure, dulling the bit.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+drill+through+thick+metal+and+steel"
      },
      {
        id: "s12_t7",
        title: "Taps",
        difficulty: "Intermediate",
        timeEst: "1 Hour",
        tools: "Tap wrench, plug/taper tap, matching tap-drill chart, cutting fluid",
        overview: "Taps cut internal female screw threads inside drilled metal holes, allowing machine bolts to thread securely into thick plate steel.",
        technique: "Consult a tap-drill chart to drill the exact required hole (e.g., a 1/4-20 tap requires a #7 or 13/64\" drill bit). Keep the tap dead perpendicular to the work. Turn the tap handle forward 1/2-turn, then reverse 1/4-turn to snap and clear the chip; repeat.",
        proTip: "Always reverse the tap 1/4 turn every half-turn forward; this 'breaks the chip' so metal chips don't pack into the flutes and snap the brittle tap.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+tap+threads+in+metal+without+breaking+tap"
      },
      {
        id: "s12_t8",
        title: "Dies",
        difficulty: "Intermediate",
        timeEst: "1 Hour",
        tools: "Die stock handle, threading die, metal chamfer file, cutting fluid",
        overview: "Threading dies cut external male machine threads on steel rods, bolts, and rebar, restoring damaged bolt threads or making custom studs.",
        technique: "File a slight 45-degree chamfer on the end of the steel rod to help the die start straight. Mount the die in the die stock with the chamfered starting side facing the rod. Apply cutting oil, press down firmly while turning clockwise, reversing 1/4 turn to clear chips.",
        proTip: "Chamfer the tip of the rod with a file before threading with a die; a square blunt rod end will resist starting and force the die to start crooked.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+use+tap+and+die+set+threading"
      },
      {
        id: "s12_t9",
        title: "Riveting",
        difficulty: "Beginner",
        timeEst: "45 Mins",
        tools: "Blind pop-rivet tool, aluminum/steel pop rivets, drill, drill bit matching rivet diameter",
        overview: "Blind pop rivets join thin sheet metal permanently when you only have access to one side of the assembly (gutters, ductwork, auto panels).",
        technique: "Drill a hole matching the rivet diameter through both metal layers. Insert the rivet mandrel into the rivet gun nozzle, push the rivet head through the hole, and squeeze the handles until the mandrel snaps off with a loud pop, clamping sheets tight.",
        proTip: "Use aluminum rivets on aluminum gutters and stainless steel rivets on steel sheet; mixing rivet metallurgy with dissimilar base metals triggers rapid galvanic corrosion.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+use+a+pop+rivet+gun+beginners"
      },
      {
        id: "s12_t10",
        title: "Other Ways to Attach Metals",
        difficulty: "Intermediate",
        timeEst: "1 Hour",
        tools: "Self-drilling sheet metal screws (Tek screws), magnetic nut driver, structural epoxy",
        overview: "Fastening metals using self-drilling screws, machine screws with locknuts, and high-strength metal bonding epoxies.",
        technique: "Use hex-head self-drilling Tek screws with built-in drill points to fasten sheet metal framing and metal roofing without pre-drilling. For metal-to-metal bonding where drilling is prohibited, use high-strength 2-part structural methacrylate or epoxy adhesives.",
        proTip: "Tek screws have hardened drill tips that drill their own hole and tap their own threads; use a magnetic socket driver on an impact driver for fast installation.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+use+self+drilling+tek+screws+metal"
      },
      {
        id: "s12_t11",
        title: "Soldering (Metal Fabrication)",
        difficulty: "Intermediate",
        timeEst: "2 Hours",
        tools: "Heavy soldering copper or torch, zinc chloride acid flux, 50/50 leaded or lead-free tin-lead solder, sal ammoniac block",
        overview: "Sheet metal soldering creates watertight, vibration-proof seams on copper roof flashings, metal gutters, and stained glass.",
        technique: "Clean copper or galvanized metal until shiny. Apply acid flux (never rosin flux, which is strictly for electrical wiring). Heat the metal with a heavy soldering iron until solder flows smoothly into the lap seam, creating a shiny continuous puddle.",
        proTip: "Neutralize acid flux on soldered copper gutters with a wash of water and baking soda after cooling; remaining acid flux will corrode copper over time.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+solder+sheet+metal+and+copper+gutters"
      },
      {
        id: "s12_t12",
        title: "Sheet Metal",
        difficulty: "Intermediate",
        timeEst: "2 Hours",
        tools: "Aviation snips (left, right, straight), hand sheet metal seamer, folding bar, mallet",
        overview: "Cutting and bending galvanized sheet metal creates custom HVAC duct transitions, chimney flashing, and drip edges.",
        technique: "Use color-coded aviation snips: Yellow handles cut straight, Red handles cut tight curves to the left, and Green handles cut tight curves to the right. Bend clean crisp 90-degree flanges using a 3-inch hand seamer clamped along the layout line.",
        proTip: "Never use red (left-cut) snips to cut a right-hand curve; forcing snips against their natural curve bends and burrs the sheet metal edge.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+cut+and+bend+sheet+metal+aviation+snips"
      },
      {
        id: "s12_t13",
        title: "Strap Metal",
        difficulty: "Intermediate",
        timeEst: "1 Hour",
        tools: "Steel strap / flat bar, bench vise, heavy adjustable wrench, hacksaw",
        overview: "Bending flat steel strap and bar stock creates heavy utility hooks, pipe brackets, gate braces, and timber reinforcing plates.",
        technique: "Clamp flat steel bar in a bench vise with the bend line aligned with the top of the vise jaw. Slip a large adjustable wrench over the protruding bar right above the jaw to act as a bending lever, and pull smoothly to form crisp 90-degree bends.",
        proTip: "To bend thick 1/8-inch or 3/16-inch steel strap easily by hand, heat the bend line to a dull red with a propane torch; the heated steel bends like butter.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+bend+flat+metal+bar+in+a+vise"
      },
      {
        id: "s12_t14",
        title: "Tube and Bar Metal",
        difficulty: "Intermediate",
        timeEst: "2 Hours",
        tools: "Tubing bender, metal cutoff saw or angle grinder, round files, sandpaper",
        overview: "Bending EMT electrical conduit, cutting steel tubing, and threading solid round bar expands home workshop fabrication abilities.",
        technique: "Use a handheld EMT conduit bender to bend thin-wall electrical metallic tubing (EMT) without kinking. Place your foot firmly on the bender pedal and exert full body weight downward on the foot pedal rather than pulling on the handle to prevent flattening.",
        proTip: "When bending conduit, keep your body weight pressed firmly on the foot pedal; bending by pulling the handle with your arms causes the tube to kink and flatten.",
        ytQuery: "https://www.youtube.com/results?search_query=how+to+bend+emt+conduit+stub+90+offset"
      }
    ]
  }
];


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
        technique: "Building codes require tempered safety glass in all doors, shower enclosures, and windows within 24 inches of a door or within 18 inches of the floor. Remember that tempered glass CANNOT be cut after manufacturingâ€”it must be ordered pre-cut to exact custom dimensions.",
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
      "Clean tooling timing: Tool mortar joints when the mortar is 'thumbprint hard'â€”firm enough that your thumb leaves an impression without sticking."
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
        overview: "Standard masonry mortar deteriorates under extreme 1000Â°F+ wood fire temperatures. Relining firebox joints requires specialized refractory mortar.",
        technique: "Rake out cracked joints inside the firebox. Use premixed refractory mortar (rated for 2000Â°F+). Keep joints paper-thin (1/8-inch or less) between firebricks. Allow refractory mortar to cure for 72 hours before building the first small curing fire.",
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
    intro: "Concrete does not 'dry'â€”it hardens through an exothermic chemical crystallization called hydration. Building rigid forms, pouring proper water-cement ratios, and proper curing ensures 4000+ PSI strength.",
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
        technique: "Formula: (Length in feet Ã— Width in feet Ã— Thickness in feet) Ã· 27 = Cubic Yards. For example, a 10ft Ã— 10ft patio at 4 inches (0.33 ft) thick: (10 Ã— 10 Ã— 0.33) Ã· 27 = 1.22 cubic yards. Always add 10% for spillage and subbase irregularities.",
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
        technique: "Pour concrete starting at the furthest corner of the forms and work backward toward the mixer. Spread concrete with a concrete come-along or square shovelâ€”never use a garden rake, which segregates coarse gravel from fine cement paste.",
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
        technique: "Dig a thickened perimeter grade beam (12 inches deep Ã— 12 inches wide) around slab edges on problem sites. Support #4 rebar on plastic 'chairs' so steel sits suspended in the middle third of the slab rather than lying flat on the gravel subbase.",
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


window.diySkillsDatabase = {
    sections: [
        ...window.diyData_part1,
        ...window.diyData_part2,
        ...window.diyData_part3,
        ...window.diyData_part4
    ]
};
