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
        technique: "Check temperature split: measure the air temperature entering return grilles vs emerging from supply registers (a healthy AC system shows a 15°F to 20°F differential). Keep the outdoor condenser clear of leaves and vegetation by at least 24 inches.",
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
        technique: "Balance zone manifold circuit loops by adjusting the transparent sight glass flow meters until each loop achieves its calculated GPM (gallons per minute). Keep water supply temperatures between 85°F and 120°F to prevent damaging hardwood flooring.",
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
        technique: "Locate seasonal damper levers inside trunk duct lines: open upstairs dampers in summer (cool air sinks) and close downstairs slightly; reverse in winter. Seal metal duct seams with UL 181-rated aluminum foil tape or mastic paste—never use standard vinyl duct tape.",
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
        technique: "Open the metal throat damper fully before lighting a fire. Prime the chimney draft by holding a torch of rolled newspaper up near the damper to reverse cold air downdrafts. Clean ashes only when cold using a covered metal bucket—never a standard household vacuum.",
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
        technique: "Always vent bathroom and kitchen exhaust fans completely to the exterior through an insulated duct and exterior wall/roof cap—never vent into the attic. Choose a fan sized to move at least 1 CFM per square foot of bathroom floor area.",
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
        technique: "Never paint over water stains or smoke damage with standard latex primer—stains will bleed right through. Seal tannin and water stains with an alcohol-based pigmented shellac primer (Zinsser B-I-N). For blistering paint, scrape to bare substrate, sand edges flush, and let dry thoroughly.",
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
        technique: "Calculate board footage: (Thickness in inches × Width in inches × Length in inches) ÷ 144. Buy rough lumber as 4/4 (1\" thick rough, mills to 3/4\"), 6/4, or 8/4. Add a 15-20% waste factor to account for knots, checks, and sapwood defects.",
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
        proTip: "Stir polyurethane gently with a paddle—NEVER shake the can; shaking whips millions of microscopic air bubbles into the finish that cure into permanent cloudy blemishes.",
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
        technique: "Heat the tool tip with a torch until cherry red (non-magnetic, ~1500°F). Quench the first 1/2-inch in oil or water. Quickly polish the bevel with emery cloth and watch heat colors run from the shank into the tip; when straw-yellow or bronze reaches the tip, quench completely to freeze the temper.",
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
