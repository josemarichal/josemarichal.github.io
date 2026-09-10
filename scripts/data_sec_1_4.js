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
        technique: "Never strike a wooden chisel handle with a metal hammer—always use a wooden or urethane mallet. For paring, face the flat back against your reference surface and push with hand pressure while keeping both hands behind the cutting edge.",
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
        technique: "Heat the iron to 350°C-370°C and tin the tip with fresh solder. Clean wire ends thoroughly and twist tightly. Heat the copper wire joint with the flat of the iron for 2-3 seconds, then touch solder to the heated wire—never directly to the iron tip—allowing molten solder to wick naturally through strands.",
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
        technique: "Always sand strictly parallel with the direction of the wood grain—cross-grain sanding leaves unsightly scratches visible under finishes. Progress sequentially through grits without skipping more than one grit step (e.g., 80 -> 120 -> 180 -> 220). Wipe with tack cloth between grits.",
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
        proTip: "Keep the saw base flat against the stock throughout the entire stroke. If the saw binds, release the trigger immediately—never try to back out while the blade is spinning.",
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
        technique: "Adjust pulley belt speeds: use high RPM for small bits in softwood, and slow RPM (under 500 RPM) for large Forstner bits or drilling metal. Always clamp workpieces or vices securely to the cast iron table—never hold small metal parts by hand.",
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
        overview: "A regular interior maintenance walkthrough identifies small issues—like sticking hinges, slow drains, and hairline cracks—before they become costly disasters.",
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
