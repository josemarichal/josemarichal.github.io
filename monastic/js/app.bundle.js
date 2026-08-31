/**
 * ORTHOPRAXIS - STANDALONE BUNDLED JAVASCRIPT ENGINE
 * Multi-Tradition Orthopraxis, Liberation Theology & Greco-Roman Askesis Companion
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. DATA: TRADITIONS, CATEGORIES, CANONICAL HOURS & DISCIPLINES
  // =========================================================================

  const TRADITIONS = [
    {
      id: "all",
      label: "All Traditions",
      icon: "globe",
      originRegion: "Global",
      coreConcept: "Orthopraxis across World Traditions",
      summary: "Orthopraxis ('right action/practice') prioritizes lived behavioral conformity, sacred habits, embodied rituals, and ethical disciplines over mere cognitive or dogmatic assent."
    },
    {
      id: "greco-roman",
      label: "Greco-Roman Askesis & Care of Self",
      icon: "compass",
      originalScript: "Ἄσκησις (Askesis) • Ἐπιμέλεια Ἑαυτοῦ (Care of Self)",
      coreConcept: "Technologies of the Self & Existential Self-Sculpting",
      scholarRefs: "Pierre Hadot (Philosophy as a Way of Life), Michel Foucault (Care of the Self), Musonius Rufus, Seneca, Epictetus, Marcus Aurelius, Epicurus, Pythagoras, Diogenes the Cynic",
      summary: "In Greco-Roman antiquity, philosophy was not an abstract theoretical doctrine, but an askesis—a comprehensive art of living and system of rigorous spiritual and physical exercises. Through strict dietary regimens, voluntary poverty, daily journaling (hupomnemata), continuous vigilance (prosochê), and cosmic contemplation, philosophers deliberately formed their subjectivity to achieve inner freedom (autarkeia) and resist imperial decadence, consumerist distraction, and social conformity."
    },
    {
      id: "liberation",
      label: "Liberation Theology & Praxis",
      icon: "hand-heart",
      originalScript: "Praxis de Liberación / 민중신학 / Triple Dialogue",
      coreConcept: "The Horizontal Imperative & Primacy of Revolutionary Praxis",
      scholarRefs: "Gustavo Gutiérrez, Leonardo Boff, Jon Sobrino, Aloysius Pieris, Ahn Byung-Mu (Minjung)",
      summary: "Liberation theology asserts the absolute primacy of historical, transformative praxis on behalf of the poor and oppressed over abstract orthodoxy. Theology operates as a secondary, critical reflection on revolutionary action with the 'crucified peoples of history' (Sobrino), while Asian contextual theology conducts a 'triple dialogue' (Pieris) with religions, cultures, and poverty, alongside Korean Minjung theology transforming collective suffering (Han)."
    },
    {
      id: "christian",
      label: "Christian Monasticism",
      icon: "landmark",
      originalScript: "Officium Divinum / Ora et Labora",
      coreConcept: "Sanctified Time, Liturgy & Contemplation",
      scholarRefs: "St. Benedict, Desert Fathers, St. Ignatius of Loyola, Evagrius Ponticus",
      summary: "The monastic way of life sanctifies daily time through the Divine Office, interior silence, manual work, fasting, and contemplative prayer."
    },
    {
      id: "judaism",
      label: "Jewish Halakha",
      icon: "scroll",
      originalScript: "הֲלָכָה (Halakha) & 613 Mitzvot",
      coreConcept: "Revealed Legislation & Groundless Conative Commitment",
      scholarRefs: "Maimonides, Joseph Karo (Shulchan Aruch), Moses Mendelssohn (Jerusalem, 1783), Yeshayahu Leibowitz",
      summary: "In Judaism, Halakha operates as a comprehensive system where the 613 mitzvot constitute the formation of the religious subject. Moses Mendelssohn defined Judaism as 'revealed legislation' directed at action; Yeshayahu Leibowitz emphasized halakhic observance as a 'groundless conative commitment' independent of external emotional pathos or utilitarian ethics."
    },
    {
      id: "islam",
      label: "Islamic Fiqh & Sunnah",
      icon: "moon",
      originalScript: "فقه (Fiqh) & الشريعة (Sharia)",
      coreConcept: "Behavioral Rectitude & Emulated Sunnah",
      scholarRefs: "Imam Abu Hanifa, Imam Malik, Imam al-Ghazali, Wilfred Cantwell Smith",
      summary: "Islam is fundamentally orthopraxic: human life is governed by Sharia and Fiqh. As scholar Wilfred Cantwell Smith noted, Islamic rectitude is defined by rigorous behavioral conformity, fivefold daily prayer (Salah), fasting (Sawm), and embodied purification, where lived practice supersedes abstract theological speculation."
    },
    {
      id: "confucianism",
      label: "Confucian Li & Self-Cultivation",
      icon: "book-marked",
      originalScript: "禮 (Lǐ) & 修身 (Xiūshēn)",
      coreConcept: "Sacred Secularity & Ritual Propriety",
      scholarRefs: "Confucius (Analects), Mencius, Xunzi, Herbert Fingarette ('Confucius: The Secular as Sacred')",
      summary: "As Herbert Fingarette famously argued, Confucianism views 'the secular as sacred.' Li (ritual propriety) transforms ordinary social etiquette, speech, filial respect, and posture into holy instruments for cultivating moral virtue and harmonious community."
    },
    {
      id: "hinduism",
      label: "Hindu Sanātana Dharma & Sadhana",
      icon: "sun",
      originalScript: "सनातन धर्म (Sanātana Dharma) & साधना (Sādhana)",
      coreConcept: "Action-Purification (Chitta Shuddhi) & Karma Yoga",
      scholarRefs: "Bhagavad Gita, Patanjali (Yoga Sutras), Adi Shankara",
      summary: "Sanātana Dharma places massive emphasis on appropriate ritual and moral conduct (Nitya Karma, Sandhyavandanam, Puja, Japa). The disciplined execution of prescribed actions cleanses the mind (Chitta Shuddhi), conflating ritual duty directly with spiritual liberation."
    },
    {
      id: "jainism",
      label: "Jain Kriya & Mahavratas",
      icon: "shield-alert",
      originalScript: "क्रिया (Kriyā) & महाव्रत (Mahāvratas)",
      coreConcept: "Radical Embodied Non-Violence & Daily Equanimity",
      scholarRefs: "Lord Mahavira, Tirthankaras, Acharya Kundakunda (Samayasara)",
      summary: "Jain orthopraxy is rooted in ancient kriya (ascetic practices) and the five Great Vows. The uncompromising practice of Ahimsa (non-harm), Samayika (48-minute equanimity), and Pratikramana (repentance) purges karma directly through somatic discipline."
    },
    {
      id: "buddhism",
      label: "Buddhist Sīla & Zen Samu",
      icon: "circle-dot",
      originalScript: "शील (Sīla) & 作務 (Samu)",
      coreConcept: "Embodied Mindfulness & Action as Enlightenment",
      scholarRefs: "Noble Eightfold Path, Dogen Zenji (Shobogenzo), Thich Nhat Hanh",
      summary: "In Buddhism, Sīla (ethical conduct) provides the non-negotiable foundation for meditation. In Zen tradition, master Dogen taught that daily chores (Samu), bowing, and posture are not preparations for enlightenment, but the very manifestation of enlightenment itself."
    }
  ];

  const CATEGORIES = [
    { id: "all", label: "All Categories", icon: "sparkles", count: 0 },
    { id: "philosophical-audit", label: "Care of Self & Mental Vigilance", icon: "brain", count: 0 },
    { id: "embodied-ascetic", label: "Embodied Asceticism & Bodily Training", icon: "activity", count: 0 },
    { id: "ethical-social", label: "Social Justice & Liberation Praxis", icon: "users", count: 0 },
    { id: "foundational-practices", label: "Foundational Rites", icon: "landmark", count: 0 },
    { id: "foundational-disciplines", label: "Core Lifelong Disciplines", icon: "shield", count: 0 },
    { id: "spiritual-practices", label: "Contemplative & Prayer Methods", icon: "flame", count: 0 }
  ];

  const DEFAULT_DISCIPLINES = [
    // 0. GRECO-ROMAN RIGOROUS ASCETICISM & TECHNOLOGIES OF THE SELF (FOUCAULT / HADOT)
    {
      id: "musonius-dietary-asceticism",
      tradition: "greco-roman",
      traditionLabel: "Greco-Roman Askesis",
      name: "Musonius Rufus's Dietary Asceticism & Bodily Hardening",
      latinName: "Δίαιτα & Ἄσκησις Σώματος (Musonius Rufus)",
      category: "embodied-ascetic",
      categoryLabel: "Embodied Asceticism & Bodily Training",
      durationMin: 30,
      durationLabel: "Daily Regimen",
      frequency: "Daily Dietary & Somatic Discipline",
      icon: "utensils-crossed",
      shortDesc: "The rigorous physical and nutritional training of Musonius Rufus ('The Roman Socrates'): plain plant nourishment, cold water bathing, rough cloaks, and manual farming to master desire.",
      longDesc: "Musonius Rufus, the teacher of Epictetus, insisted that philosophy must begin in the stomach and body. In his Discourses on Food, he taught that elaborate feasts, cooked meats, and luxury drinks soften the soul and breed greed and sickness. By eating simple, uncooked plant foods (fruits, raw vegetables, cheeses, whole grains), bathing in cold water, going barefoot, and laboring in agriculture, the philosopher trains the body to serve virtue and resists imperial Roman decadence.",
      originHistory: "Musonius Rufus (Discourses, Lecture 18A/18B: 'On Food and Clothing', 1st Cent. AD).",
      url: "https://urbanmonastic.org/practices/",
      tags: ["musonius-rufus", "dietary-asceticism", "bodily-hardening", "hadot", "care-of-self", "stoic"],
      habitBenefits: [
        "Shatters psychological addiction to processed culinary luxury and sensual gratification",
        "Builds vigorous somatic resilience through exposure to cold, physical labor, and simple foods",
        "Liberates substantial time and income from consumerist dining habits for contemplation and community"
      ],
      scriptureOrQuote: "Mastery of food is the foundation of all self-control. One should choose inexpensive food that is easy to obtain, suitable for health, and requiring little cooking. — Musonius Rufus",
      steps: [
        { title: "1. The Examination of Appetite (Gaster)", durationSec: 180, guidance: "Observe your food desires before eating. Eliminate gourmet cravings, seeking only basic nourishment for health and strength." },
        { title: "2. The Austere Meal (Simple Unprocessed Food)", durationSec: 900, guidance: "Partake of raw vegetables, whole grains, nuts, olives, and water. Eat with quiet composure without gluttonous haste." },
        { title: "3. Somatic Hardening (Cold Exposure & Posture)", durationSec: 360, guidance: "Embrace physical simplicity: a cold rinse, walking barefoot on rough earth, or engaging in vigorous manual labor." },
        { title: "4. Affirmation of Bodily Autonomy", durationSec: 180, guidance: "Affirm: 'My body is the instrument of reason and virtue, not a slave to imperial culinary addictions.'" }
      ]
    },
    {
      id: "seneca-voluntary-poverty",
      tradition: "greco-roman",
      traditionLabel: "Greco-Roman Askesis",
      name: "Seneca's Voluntary Poverty & Hardship Rehearsal",
      latinName: "Inurere Paupertatem (Seneca: Letters to Lucilius 18)",
      category: "embodied-ascetic",
      categoryLabel: "Embodied Asceticism & Bodily Training",
      durationMin: 1440,
      durationLabel: "3 – 4 Days Monthly",
      frequency: "Monthly 3-Day Immersion",
      icon: "shield-alert",
      shortDesc: "Setting aside 3 to 4 days every month to dress in rough cloth and eat cheap, stale bread, asking: 'Is this the condition that I feared?'",
      longDesc: "Seneca instructed his student Lucilius to set aside a few days every month where he would deliberately live on the cheapest crusts of bread, drink only tap water, wear a coarse, worn cloak, and sleep on a hard pallet. By physically inhabiting the worst-case scenario of financial ruin, the philosopher inoculates the mind against constant economic panic and exposes that happiness requires almost nothing external.",
      originHistory: "Seneca (Moral Letters to Lucilius, Letter 18: 'On Festivals and Fasting', c. 65 AD).",
      url: "https://urbanmonastic.org/practices/",
      tags: ["seneca", "voluntary-poverty", "resilience", "hardship-rehearsal", "anti-consumerism"],
      habitBenefits: [
        "Eradicates paralyzing anxiety over economic status, loss of wealth, and career instability",
        "Demonstrates somatic proof that peace of mind does not depend on luxury goods",
        "Deepens profound empathy and solidarity with the impoverished"
      ],
      scriptureOrQuote: "Set aside a certain number of days, during which you shall be content with the scantiest and cheapest fare, with coarse and rough dress, saying to yourself the while: 'Is this the condition that I feared?' — Seneca, Letter 18.5",
      steps: [
        { title: "1. Declaring the Voluntary Hardship Days", durationSec: 180, guidance: "Commit to 3 days of living as if impoverished. Wear simple rough clothes and sleep on a firm floor or thin mat." },
        { title: "2. The Scantiest Fare", durationSec: 600, guidance: "Eat only basic stale bread, simple broth, and water. Refrain from coffee, gourmet snacks, sweets, or dining out." },
        { title: "3. Confronting the Imagined Catastrophe", durationSec: 300, guidance: "Look at your coarse food and simple surroundings, asking aloud: 'Is this the condition that I spent so many nights fearing?'" },
        { title: "4. Deepening Gratitude & Fortitude", durationSec: 180, guidance: "Realize with exhilaration that your tranquility and reason remain entirely untouched." }
      ]
    },
    {
      id: "hupomnemata-journaling",
      tradition: "greco-roman",
      traditionLabel: "Greco-Roman Askesis",
      name: "Philosophical Journaling for Self-Sculpting (Hupomnēmata)",
      latinName: "Ὑπομνήματα (Marcus Aurelius & Michel Foucault)",
      category: "philosophical-audit",
      categoryLabel: "Care of Self & Mental Vigilance",
      durationMin: 20,
      durationLabel: "15 – 30 Minutes Daily",
      frequency: "Daily Morning & Evening",
      icon: "book-open",
      shortDesc: "The ancient discipline of personal notebooks (hupomnēmata) analyzed by Foucault: writing down maxims, deeds, and reflections to digest philosophy into one's very blood (in succum et sanguinem).",
      longDesc: "In 'The Technologies of the Self,' Michel Foucault analyzed how ancient Greco-Romans used 'hupomnēmata' (personal reflection books). Marcus Aurelius's famous 'Meditations' (originally titled 'To Himself' — Ta Eis Heauton) was not written for publication, but as a spiritual exercise of daily self-dialogue. Writing down philosophical precepts, reframing grievances, and assimilating wisdom makes the truth visceral and builds an impenetrable internal citadel.",
      originHistory: "Practiced by Hellenistic philosophers; analyzed in Michel Foucault's 'The Care of the Self' (1984).",
      url: "https://urbanmonastic.org/practices/",
      tags: ["hupomnemata", "marcus-aurelius", "foucault", "hadot", "self-sculpting", "journaling"],
      habitBenefits: [
        "Converts passive intellectual knowledge into active, reflexive mental armor",
        "Exposes hidden rationalizations, vanity, and emotional reactivity on the written page",
        "Sculpts an autonomous, self-governing subjectivity immune to social manipulation"
      ],
      scriptureOrQuote: "Writing is a technology of the self... It turns the gaze inwards, taking up what has been read or heard, and digesting it into the soul's own substance. — Michel Foucault",
      steps: [
        { title: "1. Gathering the Ancient Maxims", durationSec: 240, guidance: "Select a core philosophical principle (e.g. dichotomy of control, transience of fame, duty to human community)." },
        { title: "2. Writing To Yourself (Self-Dialogue)", durationSec: 600, guidance: "Write in the second person: 'Marcus, remember that the opinions of fools cannot harm your soul...' Address your specific vulnerabilities." },
        { title: "3. Dissecting Daily Grievances", durationSec: 300, guidance: "Break down external insults or frustrations into their bare physical elements, stripping them of dramatic cognitive exaggeration." },
        { title: "4. Sealing the Precept in the Blood", durationSec: 180, guidance: "Re-read your handwritten words slowly, committing to act upon them throughout the day." }
      ]
    },
    {
      id: "view-from-above-theoria",
      tradition: "greco-roman",
      traditionLabel: "Greco-Roman Askesis",
      name: "The View from Above (Cosmic Theōria)",
      latinName: "Ἡ Ἄνωθεν Θέα (Hadot & Marcus Aurelius)",
      category: "philosophical-audit",
      categoryLabel: "Care of Self & Mental Vigilance",
      durationMin: 15,
      durationLabel: "10 – 20 Minutes",
      frequency: "Daily Contemplation",
      icon: "globe",
      shortDesc: "Mentally soaring into cosmic heights to look down upon human cities, wars, monuments, and dramas from the perspective of cosmic eternity.",
      longDesc: "Documented extensively by Pierre Hadot in 'Philosophy as a Way of Life,' the 'View from Above' is an imaginative spiritual exercise practiced by Stoics, Platonists, and Epicureans. The practitioner ascends in consciousness to the stars, observing the tiny globe of Earth with its armies, courtrooms, wealth, and funerals. This radical shift in scale annihilates vanity, pettiness, and provincial hatreds, immersing the mind in cosmic brotherhood (Cosmopolitanism).",
      originHistory: "Marcus Aurelius (Meditations 7.48, 9.30), Pierre Hadot (Philosophy as a Way of Life).",
      url: "https://urbanmonastic.org/practices/",
      tags: ["view-from-above", "hadot", "marcus-aurelius", "cosmology", "theoria", "stoic"],
      habitBenefits: [
        "Dissolves acute existential panic and catastrophic overthinking in seconds",
        "Shrinks inflated ego-centric drama into proper cosmic proportion",
        "Ignites profound cosmopolitan compassion for the shared fragility of all mortals"
      ],
      scriptureOrQuote: "Look down from above upon the countless gatherings, the thousands of ceremonies, all kinds of voyagings in calm and storm... See how tiny is the point of earth you occupy! — Marcus Aurelius, Meditations 7.48",
      suggestedPhrases: [
        { inhale: "Soaring into Cosmic Space", exhale: "Earth is a Single Speck" },
        { inhale: "Transcending Petty Grievance", exhale: "Resting in Universal Nature" }
      ],
      steps: [
        { title: "1. Elevation of Consciousness", durationSec: 180, guidance: "Close your eyes. Imagine your viewpoint rising above your room, over your city, over continents, oceans, and into deep space." },
        { title: "2. Observing Human Activity from the Stars", durationSec: 360, guidance: "Look down upon traffic, courtrooms, political arguments, and markets. See them as tiny ants scurrying on a small clod of earth." },
        { title: "3. Contemplating the Abyss of Time", durationSec: 300, guidance: "Remember the billions of humans who walked the Earth before you, and the billions who will come after. All empires vanish into stardust." },
        { title: "4. Returning with Cosmopolitan Serenity", durationSec: 180, guidance: "Descend back into your body carrying this expansive cosmic tranquility into your daily interactions." }
      ]
    },
    {
      id: "epicurean-tetrapharmakos",
      tradition: "greco-roman",
      traditionLabel: "Greco-Roman Askesis",
      name: "Epicurean Tetrapharmakos & Simple Garden Diet",
      latinName: "Τετραφάρμακος & Καταστηματικὴ Ἡδονή (Epicurus)",
      category: "philosophical-audit",
      categoryLabel: "Care of Self & Mental Vigilance",
      durationMin: 20,
      durationLabel: "15 – 30 Minutes",
      frequency: "Daily Contemplative Meditation",
      icon: "trees",
      shortDesc: "The Epicurean Fourfold Remedy for anxiety combined with a simple diet of water and barley bread to achieve pure freedom from pain (Aponia) and anxiety (Ataraxia).",
      longDesc: "Far from the vulgar caricature of hedonism, Epicurus founded 'The Garden' as an intentional counter-cultural community that practiced radical dietary austerity (water and barley bread, with a little pot of cheese on feast days). The core mental exercise was the daily repetition of the Tetrapharmakos (The Fourfold Remedy): 1. God is not to be feared; 2. Death is nothing to worry about; 3. What is good is easy to get; 4. What is terrible is easy to endure. This disarms all artificial, capitalist cravings.",
      originHistory: "Epicurus (Letter to Menoeceus, Principal Doctrines), Philodemus of Gadara (1st Cent. BC).",
      url: "https://urbanmonastic.org/practices/",
      tags: ["epicurus", "tetrapharmakos", "ataraxia", "aponia", "garden", "simplicity"],
      habitBenefits: [
        "Extinguishes neurotic fear of death and divine punishment",
        "Demonstrates that natural and necessary pleasures (water, bread, friendship) cost almost nothing",
        "Shields against the frantic rat-race of fame, political ambition, and infinite luxury accumulation"
      ],
      scriptureOrQuote: "Don't fear God, Don't worry about death; What is good is easy to get, and What is terrible is easy to endure. — The Epicurean Tetrapharmakos",
      suggestedPhrases: [
        { inhale: "Don't Fear God, Don't Fear Death", exhale: "What is Good is Easy to Get" },
        { inhale: "Rest in Aponia (No Pain)", exhale: "Dwell in Ataraxia (Untroubled Soul)" }
      ],
      steps: [
        { title: "1. Remedy 1 & 2: Divine & Mortal Freedom", durationSec: 300, guidance: "Affirm: The gods are in bliss and do not torment us; death is the absence of sensation, so when death is here, we are not." },
        { title: "2. Remedy 3: Simplicity of True Good", durationSec: 300, guidance: "Reflect: Natural and necessary desires (water, bread, warm friendship) are easily satisfied. Artificial desires have no boundary." },
        { title: "3. Remedy 4: Endurance of Pain", durationSec: 300, guidance: "Affirm: Severe pain is short; chronic pain is mild. Reason can summon pleasant memories of friendship to overpower present bodily ache." },
        { title: "4. Communal Friendship in the Garden", durationSec: 180, guidance: "Send loving thoughts to your philosophical companions, celebrating the joy of simple existence." }
      ]
    },
    {
      id: "pythagorean-backward-audit",
      tradition: "greco-roman",
      traditionLabel: "Greco-Roman Askesis",
      name: "Pythagorean Backward Memory Audit (Mnēmē & Echemythia)",
      latinName: "Μνήμη & Ἐχεμυθία (Pythagorean Golden Verses)",
      category: "philosophical-audit",
      categoryLabel: "Care of Self & Mental Vigilance",
      durationMin: 15,
      durationLabel: "10 – 15 Minutes Nightly",
      frequency: "Nightly before sleep",
      icon: "rotate-ccw",
      shortDesc: "The ancient Pythagorean exercise of reviewing the entire day in reverse order, asking: 'Where did I go wrong? What did I do? What duty was left undone?'",
      longDesc: "Recorded in the Pythagorean Golden Verses, the disciple was strictly forbidden from falling asleep before mentally replaying the entire day in backwards chronological order—from the last moment before bed back to the first waking breath. This rigorous cognitive training sharpens memory (Mnēmē), catches unconscious automatic behaviors, and guarantees ethical accountability alongside the Pythagorean discipline of five-year silence (Echemythia).",
      originHistory: "The Golden Verses of Pythagoras (lines 40–44), Iamblichus (Life of Pythagoras).",
      url: "https://urbanmonastic.org/practices/",
      tags: ["pythagoras", "golden-verses", "backward-audit", "memory", "silence", "askesis"],
      habitBenefits: [
        "Drastically improves working memory and vivid episodic recall",
        "Interrupts subconscious cognitive drift and unexamined moral hypocrisy",
        "Cultivates deliberate mindfulness by knowing every action will be audited in reverse tonight"
      ],
      scriptureOrQuote: "Never let slumber slide upon your eyes ere you have thrice scanned the deeds of the day: Where did I slip? What did I achieve? What duty was left undone? — Pythagorean Golden Verses",
      steps: [
        { title: "1. Stilling the Mind at Bedtime", durationSec: 60, guidance: "Lie down in stillness. Prohibit sleep from overtaking you until the threefold audit is complete." },
        { title: "2. Chronological Reverse Replay", durationSec: 360, guidance: "Replay the day backwards: from laying in bed, to dinner, to afternoon work, to morning waking. Observe every word and deed like a movie in reverse." },
        { title: "3. The Three Questions", durationSec: 300, guidance: "At each scene, ask: 1. Where did I transgress? 2. What good did I accomplish? 3. What duty did I neglect?" },
        { title: "4. Healing & Clear Resolution", durationSec: 180, guidance: "Grieve where you erred with a firm vow to rectify it tomorrow; rejoice in what was done well and sleep in peace." }
      ]
    },
    {
      id: "proscoche-impression-testing",
      tradition: "greco-roman",
      traditionLabel: "Greco-Roman Askesis",
      name: "Stoic Continuous Vigilance (Prosochê & Phantasia Audit)",
      latinName: "Προσοχή & Δοκιμασία Φαντασιῶν (Epictetus: Discourses)",
      category: "philosophical-audit",
      categoryLabel: "Care of Self & Mental Vigilance",
      durationMin: 15,
      durationLabel: "Ongoing / 15 Min Practice",
      frequency: "Continuous Mindful Vigilance",
      icon: "eye",
      shortDesc: "Epictetus's spiritual gymnastics: challenging every incoming impression at the gate of the mind: 'You are just an impression; are you within my control or not?'",
      longDesc: "In the Discourses of Epictetus, 'Prosochê' is the continuous state of acute spiritual attentiveness and vigilance. Just as a night sentry challenges every stranger at the fortress gate, the philosopher stops every sensory impression (phantasia) before giving it assent (synkatathesis), testing whether it concerns things up to us (prohairesis) or things external.",
      originHistory: "Epictetus (Discourses 3.12: 'On Training', Enchiridion 1.5).",
      url: "https://urbanmonastic.org/practices/",
      tags: ["epictetus", "proscoche", "phantasia", "mindfulness", "vigilance", "stoic"],
      habitBenefits: [
        "Prevents sudden bursts of anger, panic, outrage, or addictive craving from hijacking reason",
        "Maintains an uninterrupted state of serene self-possession throughout stressful encounters",
        "Separates objective reality from emotional value-judgments"
      ],
      scriptureOrQuote: "Practise then from the start to say to every harsh impression: 'You are an impression, and not at all what you seem to be.' Then test it: Is it about things in my power, or things not in my power? — Epictetus, Enchiridion 1.5",
      steps: [
        { title: "1. Sentry at the Gate of the Soul", durationSec: 180, guidance: "Imagine your consciousness as a fortified gateway. When a disturbing thought or urge approaches, yell: 'Halt!'" },
        { title: "2. Stripping the Value Judgment", durationSec: 360, guidance: "Separate the raw event (e.g. spilled coffee, critical email) from your emotional story ('This is terrible!')." },
        { title: "3. The Dichotomy of Control Filter", durationSec: 240, guidance: "Ask: Is this outcome in my direct control? If it is not, declare: 'Then it is nothing to me; my integrity is in my control.'" },
        { title: "4. Withholding or Granting Assent", durationSec: 120, guidance: "Grant rational assent only to virtue, courage, and truth." }
      ]
    },

    // 1. LIBERATION THEOLOGY & REVOLUTIONARY PRAXIS
    {
      id: "liberation-see-judge-act",
      tradition: "liberation",
      traditionLabel: "Liberation Theology",
      name: "See-Judge-Act (Ver, Juzgar, Actuar)",
      latinName: "Praxis de Concientización (Gutiérrez / Boff)",
      category: "ethical-social",
      categoryLabel: "Social Justice & Liberation Praxis",
      durationMin: 20,
      durationLabel: "15 – 30 Minutes",
      frequency: "Weekly / Community Gatherings (CEBs)",
      icon: "eye",
      shortDesc: "The core 3-stage liberation methodology: analyzing socio-economic reality, judging through prophetic scripture, and committing to transformative revolutionary action.",
      longDesc: "Pioneered by Gustavo Gutiérrez, Leonardo Boff, and base ecclesial communities (CEBs), See-Judge-Act is the premier method of liberation orthopraxis. It begins not with dogmatic abstractions, but with concrete immersion in the social suffering of the poor (See), theological discernment from the perspective of victims (Judge), and concrete collective action to dismantle structural injustice (Act).",
      originHistory: "Gustavo Gutiérrez (A Theology of Liberation, 1971), Cardinal Cardijn, Base Ecclesial Communities.",
      url: "https://urbanmonastic.org/practices/",
      tags: ["liberation", "gutierrez", "boff", "see-judge-act", "praxis", "cebs"],
      habitBenefits: [
        "Shatters ideological complacency and complicity with structural violence",
        "Transforms passive prayer into courageous, transformative socio-political action",
        "Grounds spiritual reflection in the lived reality of marginalized communities"
      ],
      scriptureOrQuote: "Theology is a critical reflection on historical praxis in the light of the Word of God. First comes praxis; theology is the second act. — Gustavo Gutiérrez",
      suggestedPhrases: [
        { inhale: "See the Crucified Poor", exhale: "Act for Systemic Liberation" },
        { inhale: "Judge with Prophetic Fire", exhale: "Dismantle Structural Oppression" }
      ],
      steps: [
        { title: "1. VER (See the Social Reality)", durationSec: 360, guidance: "Examine a concrete situation of injustice or exploitation in your neighborhood or world. Who is suffering? What economic or political structures cause this pain?" },
        { title: "2. JUZGAR (Judge in Light of God's Word)", durationSec: 360, guidance: "Reflect on how God and the Prophets view this oppression. Remember that God takes an irrevocable Preferential Option for the Poor." },
        { title: "3. ACTUAR (Act for Transformation)", durationSec: 360, guidance: "Commit to a concrete, courageous action of solidarity, policy advocacy, mutual aid, or systemic resistance." },
        { title: "4. EVALUAR & CELEBRAR (Evaluation & Hope)", durationSec: 120, guidance: "Rejoice in the small seeds of the Reign of God and renew your covenant of lifelong solidarity." }
      ]
    },
    {
      id: "sobrino-crucified-accompaniment",
      tradition: "liberation",
      traditionLabel: "Liberation Theology",
      name: "Accompaniment of the Crucified Peoples",
      latinName: "Solidaritas cum Populis Crucifixis (Jon Sobrino)",
      category: "ethical-social",
      categoryLabel: "Social Justice & Liberation Praxis",
      durationMin: 25,
      durationLabel: "20 – 40 Minutes Daily",
      frequency: "Daily Contemplative Action",
      icon: "heart-handshake",
      shortDesc: "Jon Sobrino's radical somatic accompaniment of the victims of history, taking them down from the cross through unyielding solidarity.",
      longDesc: "Jesuit theologian Jon Sobrino, who lived through the Salvadoran martyrdoms, articulated that Christ continues to be crucified in the impoverished and oppressed masses—the 'crucified peoples of history.' Orthopraxis demands that we not only pity them, but somatically stand with them to take them down from their historical crosses, verifying faith through uncompromising compassion and risk.",
      originHistory: "Jon Sobrino (Jesus the Liberator, Christ the Liberator, 1991).",
      url: "https://urbanmonastic.org/practices/",
      tags: ["sobrino", "crucified-peoples", "solidarity", "salvador", "victims"],
      habitBenefits: [
        "Relocates authentic Christology from ivory towers to the frontlines of human suffering",
        "Overcomes bourgeois indifference and sentimentalized spirituality",
        "Instills fierce moral courage in defense of human dignity"
      ],
      scriptureOrQuote: "The crucified peoples are the historical continuation of Yahweh's Suffering Servant. The question is: What must we do to take them down from the cross? — Jon Sobrino",
      steps: [
        { title: "Gazing upon the Crucified Peoples", durationSec: 300, guidance: "Call to mind the victims of war, displacement, sweatshops, and racial violence. Recognize the Living Christ suffering in them." },
        { title: "Letting the Pain of the Victim Penetrate", durationSec: 420, guidance: "Allow their agony to shatter your comfortable assumptions and inner defenses. Practice primordial compassion." },
        { title: "Taking them Down from the Cross", durationSec: 480, guidance: "Identify how you will risk your resources, voice, time, and safety to advocate for and defend their lives." },
        { title: "Receiving Salvation from the Poor", durationSec: 300, guidance: "Acknowledge that the marginalized bring redemption to the comfortable through their witness, hope, and resilience." }
      ]
    },
    {
      id: "pieris-triple-dialogue",
      tradition: "liberation",
      traditionLabel: "Liberation Theology",
      name: "The Asian Triple Dialogue & Theology of Harmony",
      latinName: "Trialogus Asianus (Aloysius Pieris, Sri Lanka)",
      category: "spiritual-practices",
      categoryLabel: "Contemplative & Prayer Methods",
      durationMin: 20,
      durationLabel: "15 – 30 Minutes",
      frequency: "Daily / Inter-religious Gatherings",
      icon: "globe-2",
      shortDesc: "Aloysius Pieris's Asian public orthopraxis: entering a triple dialogue with the continent's profound religions, immense cultures, and overwhelming poverty.",
      longDesc: "Sri Lankan Jesuit scholar Aloysius Pieris proposed that Asian theology cannot rely on Western conceptual warfare. Instead, it must be baptized in the 'Jordan of Asian religiousness and Asian poverty.' Through the 'Triple Dialogue'—immersing in inter-religious contemplation, honoring indigenous culture, and standing alongside the destitute—a 'Theology of Harmony' is born, prioritizing subjective dialogical consistency and peaceful coexistence over dogmatic fundamentalism.",
      originHistory: "Aloysius Pieris, S.J. (An Asian Theology of Liberation, 1988).",
      url: "https://urbanmonastic.org/practices/",
      tags: ["pieris", "asia", "triple-dialogue", "harmony", "interfaith", "poverty"],
      habitBenefits: [
        "Overcomes colonialist religious chauvinism and doctrinal arrogance",
        "Discovers the holy presence of God across non-Christian wisdom traditions",
        "Fosters an 'optimism of the heart' and communal harmony amidst cultural tensions"
      ],
      scriptureOrQuote: "The Asian Church must be baptized in the Jordan of Asian religiousness and in the Jordan of Asian poverty. — Aloysius Pieris",
      suggestedPhrases: [
        { inhale: "Dialogue with Ancient Faiths", exhale: "Solidarity with Asian Poverty" },
        { inhale: "Harmony of the Heart", exhale: "Peace across all Peoples" }
      ],
      steps: [
        { title: "1. Dialogue with Asia's Religions", durationSec: 300, guidance: "Acknowledge the venerable spiritual depth of Buddhism, Hinduism, Islam, Daoism, and indigenous traditions. Breathe in mutual respect." },
        { title: "2. Dialogue with Asia's Immense Cultures", durationSec: 300, guidance: "Honor the local customs, filial bonds, artistic traditions, and communal wisdom that preserve human dignity." },
        { title: "3. Dialogue with Asia's Overwhelming Poverty", durationSec: 360, guidance: "Stand alongside the peasant farmers, garment workers, and slum dwellers, making common cause for justice." },
        { title: "4. Resting in the Theology of Harmony", durationSec: 240, guidance: "Cultivate subjective dialogical consistency, rejecting sectarian hostility and resting in cosmic shalom." }
      ]
    },

    // 2. CHRISTIAN MONASTIC ORTHOPRAXIS
    {
      id: "divine-office",
      tradition: "christian",
      traditionLabel: "Christian Monasticism",
      name: "Divine Office",
      latinName: "Officium Divinum",
      category: "foundational-practices",
      categoryLabel: "Foundational Rites",
      durationMin: 15,
      durationLabel: "10 – 20 Minutes",
      frequency: "Daily (Matins, Lauds, Terce, Sext, None, Vespers, Compline)",
      icon: "book-open-check",
      shortDesc: "Sing or recite liturgical prayers for different times of day, weeks, and seasons. Also called the Liturgy of the Hours or Daily Prayer.",
      longDesc: "The Divine Office (Liturgy of the Hours) is the ancient prayer rhythm of the Christian Church. Dating back to the Desert Fathers and codified by St. Benedict in the 6th century, it sanctifies the hours of each day by praying the Psalms, scriptures, canticles, and intercessions at set times.",
      originHistory: "Codified in the Benedictine Rule (Rule of St. Benedict, c. 516 AD).",
      url: "https://urbanmonastic.org/practices/divine-office/",
      tags: ["liturgy", "psalms", "prayer-rhythm", "daily-office", "scripture"],
      habitBenefits: [
        "Sanctifies the flow of daily time and interrupts hectic routine",
        "Forms a steady vocabulary of prayer through the Psalms",
        "Cultivates solidarity with the universal Body of Christ"
      ],
      scriptureOrQuote: "Seven times a day I praise you for your righteous laws. — Psalm 119:164",
      steps: [
        { title: "Opening Acclamation & Invitatory", durationSec: 120, guidance: "Begin with the versicle: 'O Lord, open my lips, and my mouth shall declare your praise.' Dedicate this hour to God." },
        { title: "Psalter & Canticle", durationSec: 360, guidance: "Read or chant the appointed Psalm(s) slowly. Pause at the asterisk (*) to let the words sink into your spirit." },
        { title: "Scripture Reading & Silence", durationSec: 240, guidance: "Listen to a short passage from Scripture. Spend 2-3 minutes in silent contemplation." },
        { title: "Intercessions & The Lord's Prayer", durationSec: 180, guidance: "Lift up prayers for the church, the world, those who suffer, and your community. Conclude with the Lord's Prayer." },
        { title: "Benediction & Closing", durationSec: 60, guidance: "Recite the closing blessing: 'May the peace of God guard our hearts and minds in Christ Jesus.'" }
      ]
    },
    {
      id: "breath-prayer",
      tradition: "christian",
      traditionLabel: "Christian Monasticism",
      name: "Breath Prayer",
      latinName: "Oratio Respiro",
      category: "spiritual-practices",
      categoryLabel: "Contemplative & Prayer Methods",
      durationMin: 5,
      durationLabel: "1 – 10 Minutes",
      frequency: "Multiple times daily",
      icon: "wind",
      shortDesc: "A repeated meditative prayer where each breath brings divine truth deeper into lived reality.",
      longDesc: "Breath prayer is an ancient contemplative practice that synchronizes short, scripture-rooted prayers with the natural rhythm of breathing.",
      originHistory: "Evolved from the Eastern Christian Hesychast tradition and Desert Fathers.",
      url: "https://urbanmonastic.org/practices/breath-prayer/",
      tags: ["somatic", "hesychasm", "breathwork", "peace", "centering"],
      habitBenefits: [
        "Instantly lowers acute stress and regulates the autonomic nervous system",
        "Allows continuous prayer while working, walking, or resting",
        "Harmonizes somatic bodily presence with spiritual truth"
      ],
      scriptureOrQuote: "The Lord God breathed into his nostrils the breath of life... — Genesis 2:7",
      suggestedPhrases: [
        { inhale: "Lord Jesus Christ, Son of God", exhale: "have mercy on me, a sinner." },
        { inhale: "The Lord is my Shepherd,", exhale: "I lack nothing." },
        { inhale: "Be still,", exhale: "and know that I am God." }
      ],
      steps: [
        { title: "Centering Posture", durationSec: 30, guidance: "Sit with a straight spine and take three deep natural breaths." },
        { title: "Inhalation (Receiving Grace)", durationSec: 120, guidance: "As you inhale (4s), silently pray the first half of your phrase." },
        { title: "Exhalation (Surrender)", durationSec: 120, guidance: "As you exhale (4-6s), silently pray the second half, releasing tension." },
        { title: "Resting in Rhythm", durationSec: 60, guidance: "Let the prayer flow effortlessly with your heartbeat." }
      ]
    },
    {
      id: "examen",
      tradition: "christian",
      traditionLabel: "Christian Monasticism",
      name: "The Daily Examen",
      latinName: "Examination",
      category: "philosophical-audit",
      categoryLabel: "Care of Self & Mental Vigilance",
      durationMin: 15,
      durationLabel: "5 – 15 Minutes",
      frequency: "Daily (Midday or Evening)",
      icon: "compass",
      shortDesc: "A gracious Spirit-led revealing of how God was recently present in your life.",
      longDesc: "The Daily Examen is a five-step prayerful reflection developed by St. Ignatius of Loyola to detect God's presence and discern moments of consolation and desolation.",
      originHistory: "St. Ignatius of Loyola's Spiritual Exercises (1548 AD).",
      url: "https://urbanmonastic.org/practices/examen/",
      tags: ["discernment", "gratitude", "ignatian", "reflection", "awareness"],
      habitBenefits: [
        "Develops keen spiritual awareness throughout mundane daily routines",
        "Prevents unexamined patterns of anxiety and bitterness from taking root",
        "Closes each day with peace, gratitude, and clear purpose for tomorrow"
      ],
      scriptureOrQuote: "Test me, Lord, and try me, examine my heart and my mind... — Psalm 26:2",
      steps: [
        { title: "1. Aware of God's Loving Presence", durationSec: 120, guidance: "Remember that God looks upon you with deep affection." },
        { title: "2. Review the Day with Gratitude", durationSec: 180, guidance: "Walk through the past hours and give thanks for small gifts." },
        { title: "3. Pay Attention to Emotions", durationSec: 180, guidance: "Where did you feel consolation (peace/love)? Where desolation (drain/fear)?" },
        { title: "4. Pray Through One Feature", durationSec: 180, guidance: "Speak to Jesus as a friend about one specific breakthrough or mistake." },
        { title: "5. Look Forward to Tomorrow", durationSec: 120, guidance: "Ask for specific grace and wisdom for tomorrow's challenges." }
      ]
    },

    // 3. JEWISH HALAKHA
    {
      id: "shabbat-observance",
      tradition: "judaism",
      traditionLabel: "Jewish Halakha",
      name: "Shabbat Observance (Kavod & Oneg Shabbat)",
      latinName: "שַׁבָּת (Shabbat)",
      category: "foundational-practices",
      categoryLabel: "Foundational Rites",
      durationMin: 1440,
      durationLabel: "25 Hours Weekly (Sunset to Nightfall)",
      frequency: "Weekly (Friday Sunset to Saturday Havdalah)",
      icon: "sparkles",
      shortDesc: "Comprehensive cessation from the 39 categories of creative melakha (work) to enter sacred time (Menuchah).",
      longDesc: "In Jewish Halakha, Shabbat is the ultimate sanctification of time. As Abraham Joshua Heschel described, it is a 'cathedral in time.' In the halakhic framework celebrated by Moses Mendelssohn and Yeshayahu Leibowitz, Shabbat is not a personal emotional retreat, but a divine legislation: ceasing all 39 melakhot (creative labor), lighting candles, reciting Kiddush, and feasting in holy delight (Oneg).",
      originHistory: "Codified by Maimonides (Mishneh Torah) and Joseph Karo (Shulchan Aruch).",
      url: "https://urbanmonastic.org/practices/",
      tags: ["halakha", "shabbat", "menuchah", "mitzvot", "sacred-time"],
      habitBenefits: [
        "Breaks the illusion of human autonomy and constant technological mastery",
        "Restores unhurried family, communal, and contemplative presence",
        "Enforces a total biological and existential boundary against consumerism"
      ],
      scriptureOrQuote: "Six days you shall labor and do all your work, but the seventh day is a Sabbath to the Lord your God. — Exodus 20:9-10",
      steps: [
        { title: "Hadlakat Nerot (Lighting Candles)", durationSec: 180, guidance: "Before sunset, light the Shabbat candles, cover your eyes, and recite the blessing ushering in the holy day." },
        { title: "Shalom Aleichem & Kiddush", durationSec: 300, guidance: "Welcome the ministering angels and sanctify the day over wine, proclaiming creation and deliverance." },
        { title: "Seudat Shabbat (Festive Feast)", durationSec: 1200, guidance: "Partake of challah and festive food without rush, singing traditional hymns of thanksgiving." },
        { title: "Havdalah (Separation into the Week)", durationSec: 240, guidance: "At Saturday nightfall, bless the braided candle, fragrant spices, and wine, carrying Shabbat peace into the week." }
      ]
    },

    // 4. ISLAMIC FIQH & SUNNAH
    {
      id: "salah-five-prayers",
      tradition: "islam",
      traditionLabel: "Islamic Fiqh & Sunnah",
      name: "Salah (The Five Daily Liturgical Prayers)",
      latinName: "صَلَاة (Ṣalāh)",
      category: "foundational-practices",
      categoryLabel: "Foundational Rites",
      durationMin: 15,
      durationLabel: "10 – 15 Minutes (5x Daily)",
      frequency: "Fajr, Dhuhr, Asr, Maghrib, Isha",
      icon: "compass",
      shortDesc: "The physical, rhythmic submission of body, speech, and spirit facing the Qibla in exact conformity with the Sunnah.",
      longDesc: "Salah is the second pillar of Islam and the quintessential orthopraxic rite. Codified in Fiqh down to precise postures (Qiyam, Ruku, Sujud) and recitations (Surah Al-Fatiha, Tashahhud), it punctuates the day from dawn to night.",
      originHistory: "Commanded in the Quran; practiced uniformly across 1,400 years.",
      url: "https://urbanmonastic.org/practices/",
      tags: ["fiqh", "salah", "sujud", "submission", "prayer-rhythm"],
      habitBenefits: [
        "Obliterates spiritual procrastination by breaking the workday into 5 sacred intervals",
        "Grounds mental and emotional state through full somatic prostration (Sujud)",
        "Unites the practitioner with a global, synchronized community facing the same axis"
      ],
      scriptureOrQuote: "Indeed, prayer has been decreed upon the believers at specified times. — Quran 4:103",
      steps: [
        { title: "Wudu (Ritual Purification)", durationSec: 180, guidance: "Wash hands, mouth, nose, face, arms to elbows, wipe head, and wash feet." },
        { title: "Niyyah & Takbirat al-Ihram", durationSec: 60, guidance: "Form pure intention. Raise hands to ears: 'Allahu Akbar'." },
        { title: "Qiyam & Al-Fatiha", durationSec: 180, guidance: "Stand in humble stillness with hands folded over chest." },
        { title: "Ruku & Sujud (Prostration)", durationSec: 240, guidance: "Bow at waist in awe, then place forehead, nose, and palms on the earth." },
        { title: "Taslim (Peace upon World)", durationSec: 60, guidance: "Turn face to right and left, spreading peace." }
      ]
    },

    // 5. CONFUCIAN LI
    {
      id: "confucian-li-ritual",
      tradition: "confucianism",
      traditionLabel: "Confucian Li & Self-Cultivation",
      name: "Li (Ritual Propriety & Sacred Etiquette)",
      latinName: "禮 (Lǐ)",
      category: "ethical-social",
      categoryLabel: "Social Justice & Liberation Praxis",
      durationMin: 15,
      durationLabel: "Daily Embodied Conduct",
      frequency: "Continuous relational posture",
      icon: "book-marked",
      shortDesc: "Transforming every mundane human interaction (greetings, dining, speech, bows) into sacred rites of profound reverence.",
      longDesc: "In the Confucian worldview famously analyzed by philosopher Herbert Fingarette in 'Confucius: The Secular as Sacred,' Li is not empty formalism, but the transforming power of human culture.",
      originHistory: "The Duke of Zhou and Confucius (Analects), codified in Classic of Rites.",
      url: "https://urbanmonastic.org/practices/",
      tags: ["li", "confucian", "fingarette", "sacred-secularity", "ritual-propriety"],
      habitBenefits: [
        "Elevates clumsy, cynical, or rude interactions into graceful sacred moments",
        "Cultivates effortless social harmony and mutual human dignity",
        "Disciplines physical posture, tone of voice, and body language"
      ],
      scriptureOrQuote: "Do not look at what is contrary to ritual; do not speak what is contrary to ritual; do not make a move that is contrary to ritual. — Analects 12.1",
      steps: [
        { title: "Adjusting Posture & Dignity", durationSec: 120, guidance: "Stand straight, align shoulders, and compose attire." },
        { title: "Mindful Speech & Tone", durationSec: 300, guidance: "Ensure words are truthful and benevolent (Ren)." },
        { title: "Deferential Regard (Bowing)", durationSec: 180, guidance: "Acknowledge elders, colleagues, guests, and family with undivided attention." }
      ]
    }
  ];

  const CANONICAL_HOURS = [
    { id: "matins", name: "Matins / Vigils (Pythagorean & Fajr)", latinName: "Ad Matutinum", hourTime: "05:00", typicalHour: 5, disciplineId: "proscoche-impression-testing", desc: "Pre-dawn watch, Prosochê sentry vigilance & Fajr" },
    { id: "lauds", name: "Lauds (Morning Hupomnēmata & Shema)", latinName: "Ad Laudes", hourTime: "07:00", typicalHour: 7, disciplineId: "hupomnemata-journaling", desc: "Morning self-dialogue & Psalms of praise" },
    { id: "terce", name: "Terce (See-Judge-Act / Musonius Diet)", latinName: "Ad Tertiam", hourTime: "09:00", typicalHour: 9, disciplineId: "musonius-dietary-asceticism", desc: "Somatic mastery, simple diet & prophetic action" },
    { id: "sext", name: "Sext (Midday View from Above / Theōria)", latinName: "Ad Sextam", hourTime: "12:00", typicalHour: 12, disciplineId: "view-from-above-theoria", desc: "Midday cosmic elevation & solidarity" },
    { id: "none", name: "None (Asian Triple Dialogue / Asr)", latinName: "Ad Nonam", hourTime: "15:00", typicalHour: 15, disciplineId: "pieris-triple-dialogue", desc: "Harmony with religions, cultures & poverty" },
    { id: "vespers", name: "Vespers (Epicurean Garden / Maghrib)", latinName: "Ad Vesperas", hourTime: "18:00", typicalHour: 18, disciplineId: "epicurean-tetrapharmakos", desc: "Tetrapharmakos tranquility & evening gratitude" },
    { id: "compline", name: "Compline (Pythagorean & Stoic Audit)", latinName: "Ad Completorium", hourTime: "21:30", typicalHour: 21, disciplineId: "pythagorean-backward-audit", desc: "Threefold reverse memory audit before sleep" }
  ];

  // =========================================================================
  // 2. AUDIO SYNTHESIZER
  // =========================================================================

  class AudioEngine {
    constructor() {
      this.ctx = null;
      this.masterGain = null;
      this.ambientGain = null;
      this.ambientNodes = [];
      this.isMuted = false;
      this.volume = 0.75;
      this.ambientVolume = 0.35;
      this.currentAmbient = "none";
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
          this.masterGain = this.ctx.createGain();
          this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
          this.masterGain.connect(this.ctx.destination);

          this.ambientGain = this.ctx.createGain();
          this.ambientGain.gain.setValueAtTime(this.isMuted ? 0 : this.ambientVolume, this.ctx.currentTime);
          this.ambientGain.connect(this.ctx.destination);
        }
      }
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume();
      }
    }

    setVolume(val) {
      this.volume = Math.max(0, Math.min(1, val));
      if (this.masterGain && this.ctx && !this.isMuted) {
        this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
      }
    }

    setAmbientVolume(val) {
      this.ambientVolume = Math.max(0, Math.min(1, val));
      if (this.ambientGain && this.ctx && !this.isMuted) {
        this.ambientGain.gain.setTargetAtTime(this.ambientVolume, this.ctx.currentTime, 0.05);
      }
    }

    playCathedralBell(fundamental = 220) {
      this.init();
      if (!this.ctx || this.isMuted) return;

      const now = this.ctx.currentTime;
      const partials = [
        { mult: 0.5, gain: 0.4, decay: 6.0 },
        { mult: 1.0, gain: 0.8, decay: 4.5 },
        { mult: 1.189, gain: 0.6, decay: 3.5 },
        { mult: 1.5, gain: 0.5, decay: 3.0 },
        { mult: 2.0, gain: 0.4, decay: 2.2 },
        { mult: 2.76, gain: 0.25, decay: 1.5 },
        { mult: 4.0, gain: 0.15, decay: 0.8 }
      ];

      partials.forEach(({ mult, gain, decay }) => {
        const osc = this.ctx.createOscillator();
        const pGain = this.ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(fundamental * mult, now);

        pGain.gain.setValueAtTime(0, now);
        pGain.gain.linearRampToValueAtTime(gain * 0.4, now + 0.015);
        pGain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

        osc.connect(pGain);
        pGain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + decay + 0.1);
      });
    }

    playTibetanBowl(fundamental = 293.66) {
      this.init();
      if (!this.ctx || this.isMuted) return;

      const now = this.ctx.currentTime;
      const modes = [
        { freq: fundamental, gain: 0.6, decay: 7.0 },
        { freq: fundamental * 2.76, gain: 0.35, decay: 5.5 },
        { freq: fundamental * 5.4, gain: 0.15, decay: 4.0 }
      ];

      modes.forEach(({ freq, gain, decay }) => {
        const osc = this.ctx.createOscillator();
        const pGain = this.ctx.createGain();

        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        lfo.frequency.setValueAtTime(2.5, now);
        lfoGain.gain.setValueAtTime(freq * 0.015, now);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start(now);
        lfo.stop(now + decay + 0.2);

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now);

        pGain.gain.setValueAtTime(0, now);
        pGain.gain.linearRampToValueAtTime(gain * 0.35, now + 0.08);
        pGain.gain.exponentialRampToValueAtTime(0.00005, now + decay);

        osc.connect(pGain);
        pGain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + decay + 0.2);
      });
    }

    playSoftChime() {
      this.init();
      if (!this.ctx || this.isMuted) return;

      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25];
      notes.forEach((freq, i) => {
        const startTime = now + (i * 0.12);
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.18, startTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.8);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(startTime);
        osc.stop(startTime + 2.0);
      });
    }

    setAmbientSound(type) {
      this.stopAmbient();
      this.currentAmbient = type;
      if (type === "none" || !type) return;

      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      if (type === "chapel-drone") {
        const freqs = [110, 164.81, 220, 329.63];
        freqs.forEach(freq => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const filter = this.ctx.createBiquadFilter();

          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, now);

          filter.type = "lowpass";
          filter.frequency.setValueAtTime(450, now);

          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(0.08, now + 2.0);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.ambientGain);

          osc.start(now);
          this.ambientNodes.push({ osc, gain });
        });
      } else if (type === "monastery-rain") {
        const bufferSize = this.ctx.sampleRate * 2;
        const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let lastOut = 0.0;

        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          output[i] = (lastOut + (0.02 * white)) / 1.02;
          lastOut = output[i];
          output[i] *= 3.5;
        }

        const whiteNoise = this.ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = this.ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(800, now);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.12, now + 2.0);

        whiteNoise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ambientGain);

        whiteNoise.start(now);
        this.ambientNodes.push({ osc: whiteNoise, gain });
      }
    }

    stopAmbient() {
      if (this.ambientNodes && this.ambientNodes.length > 0) {
        const now = this.ctx ? this.ctx.currentTime : 0;
        this.ambientNodes.forEach(node => {
          try {
            if (node.gain && this.ctx) {
              node.gain.gain.linearRampToValueAtTime(0, now + 0.5);
            }
            setTimeout(() => {
              if (node.osc && node.osc.stop) {
                node.osc.stop();
              }
            }, 600);
          } catch (e) {}
        });
        this.ambientNodes = [];
      }
      this.currentAmbient = "none";
    }
  }

  const sound = new AudioEngine();

  // =========================================================================
  // 3. STORAGE LAYER
  // =========================================================================

  const STORAGE_KEYS = {
    CUSTOM_DISCIPLINES: "orthopraxis_custom_disciplines",
    HISTORY: "orthopraxis_history",
    SESSION_LOGS: "orthopraxis_session_logs",
    JOURNAL_ENTRIES: "orthopraxis_journal_entries",
    HORARIUM: "orthopraxis_horarium",
    SETTINGS: "orthopraxis_settings"
  };

  const DEFAULT_SETTINGS = {
    theme: "theme-midnight",
    bellType: "tibetan-bowl",
    audioVolume: 0.75,
    ambientSound: "none",
    ambientVolume: 0.35,
    soundEnabled: true
  };

  class StorageManager {
    constructor() {
      this.init();
    }

    init() {
      if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
        this.saveSettings(DEFAULT_SETTINGS);
      }
    }

    getTodayStr() {
      const d = new Date();
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }

    getAllDisciplines() {
      const custom = this.getCustomDisciplines();
      return [...DEFAULT_DISCIPLINES, ...custom];
    }

    getDisciplineById(id) {
      return this.getAllDisciplines().find(d => d.id === id) || null;
    }

    getCustomDisciplines() {
      try {
        const data = localStorage.getItem(STORAGE_KEYS.CUSTOM_DISCIPLINES);
        return data ? JSON.parse(data) : [];
      } catch (e) {
        return [];
      }
    }

    saveCustomDiscipline(disc) {
      const current = this.getCustomDisciplines();
      const existingIndex = current.findIndex(d => d.id === disc.id);
      if (existingIndex >= 0) {
        current[existingIndex] = disc;
      } else {
        current.push(disc);
      }
      localStorage.setItem(STORAGE_KEYS.CUSTOM_DISCIPLINES, JSON.stringify(current));
      return disc;
    }

    getHistory() {
      try {
        const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
        return data ? JSON.parse(data) : {};
      } catch (e) {
        return {};
      }
    }

    getTodayCompletedIds() {
      const history = this.getHistory();
      const today = this.getTodayStr();
      return history[today] || [];
    }

    toggleComplete(disciplineId, dateStr = null) {
      const history = this.getHistory();
      const targetDate = dateStr || this.getTodayStr();
      const dayList = history[targetDate] || [];

      const index = dayList.indexOf(disciplineId);
      let isNowCompleted = false;

      if (index >= 0) {
        dayList.splice(index, 1);
        isNowCompleted = false;
      } else {
        dayList.push(disciplineId);
        isNowCompleted = true;
        const discipline = this.getDisciplineById(disciplineId);
        this.logSession(disciplineId, (discipline ? discipline.durationMin : 10) * 60, targetDate);
      }

      history[targetDate] = dayList;
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
      return isNowCompleted;
    }

    markCompleted(disciplineId, durationSec = null) {
      const history = this.getHistory();
      const today = this.getTodayStr();
      const dayList = history[today] || [];

      if (!dayList.includes(disciplineId)) {
        dayList.push(disciplineId);
        history[today] = dayList;
        localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
      }

      const discipline = this.getDisciplineById(disciplineId);
      const secs = durationSec || (discipline ? discipline.durationMin * 60 : 600);
      this.logSession(disciplineId, secs, today);
    }

    getSessionLogs() {
      try {
        const data = localStorage.getItem(STORAGE_KEYS.SESSION_LOGS);
        return data ? JSON.parse(data) : [];
      } catch (e) {
        return [];
      }
    }

    logSession(disciplineId, durationSec, dateStr = null) {
      const logs = this.getSessionLogs();
      const session = {
        id: "sess_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5),
        disciplineId,
        durationSec,
        timestamp: Date.now(),
        dateStr: dateStr || this.getTodayStr()
      };
      logs.unshift(session);
      if (logs.length > 500) logs.length = 500;
      localStorage.setItem(STORAGE_KEYS.SESSION_LOGS, JSON.stringify(logs));
      return session;
    }

    getMetrics() {
      const history = this.getHistory();
      const sessionLogs = this.getSessionLogs();
      const today = this.getTodayStr();
      const dates = Object.keys(history).sort();

      let totalCompletedSessions = 0;
      Object.values(history).forEach(list => {
        totalCompletedSessions += list.length;
      });

      let totalMinutes = 0;
      sessionLogs.forEach(s => {
        totalMinutes += Math.round((s.durationSec || 0) / 60);
      });

      let currentStreak = 0;
      let checkDate = new Date();
      
      const todayPracticed = history[today] && history[today].length > 0;
      if (todayPracticed) {
        currentStreak = 1;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yStr = yesterday.toISOString().split("T")[0];
        if (history[yStr] && history[yStr].length > 0) {
          currentStreak = 1;
          checkDate = yesterday;
          checkDate.setDate(checkDate.getDate() - 1);
        }
      }

      if (currentStreak > 0) {
        while (true) {
          const dStr = checkDate.toISOString().split("T")[0];
          if (history[dStr] && history[dStr].length > 0) {
            currentStreak++;
            checkDate.setDate(checkDate.getDate() - 1);
          } else {
            break;
          }
        }
      }

      let longestStreak = currentStreak;
      let tempStreak = 0;
      let prevTimestamp = null;

      dates.forEach(dStr => {
        if (history[dStr] && history[dStr].length > 0) {
          const curr = new Date(dStr + "T00:00:00").getTime();
          if (prevTimestamp === null) {
            tempStreak = 1;
          } else {
            const diffDays = Math.round((curr - prevTimestamp) / (1000 * 60 * 60 * 24));
            if (diffDays === 1) {
              tempStreak++;
            } else if (diffDays > 1) {
              tempStreak = 1;
            }
          }
          prevTimestamp = curr;
          if (tempStreak > longestStreak) {
            longestStreak = tempStreak;
          }
        }
      });

      const counts = {};
      Object.values(history).forEach(list => {
        list.forEach(id => {
          counts[id] = (counts[id] || 0) + 1;
        });
      });

      const topDisciplines = Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([id, count]) => ({
          discipline: this.getDisciplineById(id),
          count
        }))
        .filter(item => item.discipline !== null);

      return {
        currentStreak,
        longestStreak,
        totalCompletedSessions,
        totalMinutes,
        completedTodayCount: (history[today] || []).length,
        topDisciplines
      };
    }

    getLastNDaysData(days = 14) {
      const history = this.getHistory();
      const result = [];
      const now = new Date();

      for (let i = days - 1; i >= 0; i--) {
        const d = new Date();
        d.setDate(now.getDate() - i);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        const dateStr = `${year}-${month}-${day}`;
        const completed = history[dateStr] || [];

        result.push({
          dateStr,
          dayName: d.toLocaleDateString(undefined, { weekday: "short" }),
          dayNum: d.getDate(),
          isToday: i === 0,
          count: completed.length,
          items: completed
        });
      }
      return result;
    }

    getJournalEntries() {
      try {
        const data = localStorage.getItem(STORAGE_KEYS.JOURNAL_ENTRIES);
        return data ? JSON.parse(data) : [];
      } catch (e) {
        return [];
      }
    }

    saveJournalEntry(entry) {
      const entries = this.getJournalEntries();
      const newEntry = {
        id: entry.id || "journal_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5),
        disciplineId: entry.disciplineId || null,
        title: entry.title || "Spiritual Reflection",
        content: entry.content || "",
        mood: entry.mood || "Peaceful",
        tags: entry.tags || [],
        timestamp: entry.timestamp || Date.now(),
        dateStr: entry.dateStr || this.getTodayStr()
      };

      const existingIndex = entries.findIndex(e => e.id === newEntry.id);
      if (existingIndex >= 0) {
        entries[existingIndex] = newEntry;
      } else {
        entries.unshift(newEntry);
      }

      localStorage.setItem(STORAGE_KEYS.JOURNAL_ENTRIES, JSON.stringify(entries));
      return newEntry;
    }

    deleteJournalEntry(id) {
      const entries = this.getJournalEntries().filter(e => e.id !== id);
      localStorage.setItem(STORAGE_KEYS.JOURNAL_ENTRIES, JSON.stringify(entries));
    }

    getHorarium() {
      try {
        const data = localStorage.getItem(STORAGE_KEYS.HORARIUM);
        return data ? JSON.parse(data) : CANONICAL_HOURS;
      } catch (e) {
        return CANONICAL_HOURS;
      }
    }

    getSettings() {
      try {
        const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
        return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : DEFAULT_SETTINGS;
      } catch (e) {
        return DEFAULT_SETTINGS;
      }
    }

    saveSettings(settings) {
      const current = this.getSettings();
      const merged = { ...current, ...settings };
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(merged));
      return merged;
    }

    exportAllData() {
      return {
        version: "1.0",
        exportDate: new Date().toISOString(),
        customDisciplines: this.getCustomDisciplines(),
        history: this.getHistory(),
        sessionLogs: this.getSessionLogs(),
        journalEntries: this.getJournalEntries(),
        horarium: this.getHorarium(),
        settings: this.getSettings()
      };
    }
  }

  const storage = new StorageManager();

  // =========================================================================
  // 4. PRACTICE STUDIO ENGINE
  // =========================================================================

  class PracticeEngine {
    constructor() {
      this.onTick = () => {};
      this.onStepChange = () => {};
      this.onComplete = () => {};
      this.onBreathCycle = () => {};

      this.activeDiscipline = null;
      this.currentStepIndex = 0;
      this.totalSteps = 0;
      this.stepTimeRemaining = 0;
      this.totalTimeRemaining = 0;
      this.totalDuration = 0;
      this.isPaused = false;
      this.isRunning = false;
      this.timerId = null;

      this.breathState = "idle";
      this.breathPhaseTimer = null;
      this.breathCadence = { inhale: 4, holdIn: 2, exhale: 5, holdOut: 2 };
      this.currentPhraseIndex = 0;
    }

    startPractice(discipline, customDurationSec = null) {
      this.stopPractice();
      this.activeDiscipline = discipline;
      this.currentStepIndex = 0;
      this.isPaused = false;
      this.isRunning = true;

      const steps = (discipline.steps && discipline.steps.length > 0)
        ? discipline.steps
        : [
            {
              title: "Entering Stillness & Setting Intention",
              durationSec: 60,
              guidance: "Quiet your thoughts, take a slow deep breath, and dedicate this practice to holy alignment."
            },
            {
              title: "Main Contemplation / Recitation",
              durationSec: (discipline.durationMin || 10) * 60 - 120,
              guidance: discipline.longDesc || discipline.shortDesc
            },
            {
              title: "Closing & Universal Dedication",
              durationSec: 60,
              guidance: "Rest in gratitude and offer peace to all beings before returning to the day."
            }
          ];

      this.steps = steps;
      this.totalSteps = steps.length;

      if (customDurationSec && customDurationSec > 0) {
        const stepPortion = Math.floor(customDurationSec / this.totalSteps);
        this.steps = steps.map(s => ({ ...s, durationSec: stepPortion }));
      }

      this.totalDuration = this.steps.reduce((sum, s) => sum + s.durationSec, 0);
      this.totalTimeRemaining = this.totalDuration;
      this.stepTimeRemaining = this.steps[0].durationSec;

      const settings = storage.getSettings();
      if (settings.soundEnabled) {
        if (settings.bellType === "cathedral-bell") {
          sound.playCathedralBell();
        } else {
          sound.playTibetanBowl();
        }
      }

      this.startBreathCycle();
      this.startTimer();
      this.onStepChange(this.getCurrentState());
    }

    startTimer() {
      if (this.timerId) clearInterval(this.timerId);

      this.timerId = setInterval(() => {
        if (this.isPaused || !this.isRunning) return;

        this.stepTimeRemaining--;
        this.totalTimeRemaining--;

        if (this.stepTimeRemaining <= 0) {
          this.nextStep(false);
        } else {
          this.onTick(this.getCurrentState());
        }
      }, 1000);
    }

    togglePause() {
      if (!this.isRunning) return false;
      this.isPaused = !this.isPaused;
      return this.isPaused;
    }

    nextStep() {
      if (this.currentStepIndex < this.totalSteps - 1) {
        this.currentStepIndex++;
        this.stepTimeRemaining = this.steps[this.currentStepIndex].durationSec;
        
        const settings = storage.getSettings();
        if (settings.soundEnabled) sound.playSoftChime();

        this.onStepChange(this.getCurrentState());
      } else {
        this.finishPractice();
      }
    }

    prevStep() {
      if (this.currentStepIndex > 0) {
        this.currentStepIndex--;
        this.stepTimeRemaining = this.steps[this.currentStepIndex].durationSec;
        this.onStepChange(this.getCurrentState());
      }
    }

    finishPractice() {
      this.stopPractice();
      const settings = storage.getSettings();
      if (settings.soundEnabled) {
        if (settings.bellType === "cathedral-bell") {
          sound.playCathedralBell();
        } else {
          sound.playTibetanBowl();
        }
      }

      if (this.activeDiscipline) {
        const durationCompleted = this.totalDuration - Math.max(0, this.totalTimeRemaining);
        storage.markCompleted(this.activeDiscipline.id, durationCompleted);
        this.onComplete({
          discipline: this.activeDiscipline,
          durationSec: durationCompleted
        });
      }
    }

    stopPractice() {
      this.isRunning = false;
      this.isPaused = false;
      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
      }
      this.stopBreathCycle();
    }

    isBreathDriven() {
      if (!this.activeDiscipline) return false;
      return ["breath-prayer", "view-from-above-theoria", "epicurean-tetrapharmakos", "liberation-see-judge-act", "pieris-triple-dialogue", "dhikr-remembrance"].includes(this.activeDiscipline.id);
    }

    startBreathCycle() {
      this.stopBreathCycle();
      if (!this.isBreathDriven()) return;

      let phaseIndex = 0;
      const phases = [
        { name: "inhale", duration: this.breathCadence.inhale, label: "Inhale (Receiving Reason & Solidarity)" },
        { name: "hold-in", duration: this.breathCadence.holdIn, label: "Hold (Deepening Self-Mastery)" },
        { name: "exhale", duration: this.breathCadence.exhale, label: "Exhale (Releasing False Attachments)" },
        { name: "hold-out", duration: this.breathCadence.holdOut, label: "Rest in Imperturbable Peace" }
      ];

      const runPhase = () => {
        if (!this.isRunning) return;
        if (this.isPaused) {
          this.breathPhaseTimer = setTimeout(runPhase, 500);
          return;
        }

        const currentPhase = phases[phaseIndex];
        this.breathState = currentPhase.name;

        this.onBreathCycle({
          phase: currentPhase.name,
          label: currentPhase.label,
          duration: currentPhase.duration,
          phrase: this.getActivePhrase()
        });

        phaseIndex = (phaseIndex + 1) % phases.length;
        this.breathPhaseTimer = setTimeout(runPhase, currentPhase.duration * 1000);
      };

      runPhase();
    }

    stopBreathCycle() {
      if (this.breathPhaseTimer) {
        clearTimeout(this.breathPhaseTimer);
        this.breathPhaseTimer = null;
      }
      this.breathState = "idle";
    }

    getActivePhrase() {
      if (!this.activeDiscipline || !this.activeDiscipline.suggestedPhrases) {
        return { inhale: "Receive Sacred Peace", exhale: "Release all burden" };
      }
      const phrases = this.activeDiscipline.suggestedPhrases;
      return phrases[this.currentPhraseIndex % phrases.length];
    }

    setPhraseIndex(idx) {
      this.currentPhraseIndex = idx;
      this.onBreathCycle({
        phase: this.breathState,
        phrase: this.getActivePhrase(),
        label: ""
      });
    }

    getCurrentState() {
      const currentStep = (this.steps && this.steps[this.currentStepIndex]) ? this.steps[this.currentStepIndex] : null;
      const stepDuration = currentStep ? currentStep.durationSec : 1;
      const stepProgress = Math.max(0, Math.min(1, 1 - (this.stepTimeRemaining / stepDuration)));
      const totalProgress = Math.max(0, Math.min(1, 1 - (this.totalTimeRemaining / (this.totalDuration || 1))));

      return {
        discipline: this.activeDiscipline,
        currentStep,
        stepIndex: this.currentStepIndex,
        totalSteps: this.totalSteps,
        stepTimeRemaining: this.stepTimeRemaining,
        totalTimeRemaining: this.totalTimeRemaining,
        stepProgress,
        totalProgress,
        isPaused: this.isPaused,
        isRunning: this.isRunning,
        isBreath: this.isBreathDriven(),
        breathState: this.breathState,
        phrase: this.getActivePhrase()
      };
    }
  }

  const practice = new PracticeEngine();

  // =========================================================================
  // 5. HORARIUM MANAGER
  // =========================================================================

  class HorariumManager {
    getHours() {
      return storage.getHorarium();
    }

    getCurrentMonasticHour() {
      const hours = this.getHours();
      const now = new Date();
      const currentHourDecimal = now.getHours() + (now.getMinutes() / 60);

      const sorted = [...hours].sort((a, b) => {
        const [hA, mA] = a.hourTime.split(":").map(Number);
        const [hB, mB] = b.hourTime.split(":").map(Number);
        return (hA + mA / 60) - (hB + mB / 60);
      });

      let activeHour = sorted[sorted.length - 1];

      for (let i = 0; i < sorted.length; i++) {
        const [h, m] = sorted[i].hourTime.split(":").map(Number);
        const timeVal = h + (m / 60);
        if (currentHourDecimal >= timeVal) {
          activeHour = sorted[i];
        }
      }

      return activeHour;
    }
  }

  const horarium = new HorariumManager();

  // =========================================================================
  // 6. MAIN APPLICATION ORCHESTRATOR
  // =========================================================================

  class OrthopraxisApp {
    constructor() {
      this.activeTab = "catalog";
      this.activeTradition = "all";
      this.activeCategory = "all";
      this.searchQuery = "";
      this.selectedDiscipline = null;

      this.init();
    }

    init() {
      this.applySavedTheme();
      this.setupEventListeners();
      this.setupPracticeCallbacks();
      this.renderAll();
      this.startHorariumClock();
      this.refreshLucideIcons();
    }

    applySavedTheme() {
      const settings = storage.getSettings();
      document.body.className = settings.theme || "theme-midnight";
      sound.setVolume(settings.audioVolume || 0.75);
      sound.setAmbientVolume(settings.ambientVolume || 0.35);
      if (settings.ambientSound && settings.ambientSound !== "none") {
        sound.setAmbientSound(settings.ambientSound);
      }
    }

    setTheme(themeName) {
      document.body.className = themeName;
      storage.saveSettings({ theme: themeName });
      this.showToast(`Theme set to ${this.getThemeDisplayName(themeName)}`);
    }

    getThemeDisplayName(themeName) {
      switch (themeName) {
        case "theme-midnight": return "Monastery Midnight";
        case "theme-parchment": return "Vatican Parchment";
        case "theme-hermitage": return "Forest Hermitage";
        case "theme-celestial": return "Celestial Solitude";
        default: return themeName;
      }
    }

    switchTab(tabId) {
      this.activeTab = tabId;
      document.querySelectorAll(".nav-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.tab === tabId);
      });

      document.querySelectorAll(".tab-view").forEach(view => {
        view.classList.toggle("active", view.id === `tab-${tabId}`);
      });

      if (tabId === "liberation") {
        this.renderLiberation();
      } else if (tabId === "tracker") {
        this.renderTracker();
      } else if (tabId === "horarium") {
        this.renderHorarium();
      } else if (tabId === "journal") {
        this.renderJournal();
      } else if (tabId === "philosophy") {
        this.renderPhilosophy();
      } else if (tabId === "catalog") {
        this.renderCatalog();
      }

      this.refreshLucideIcons();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    setupEventListeners() {
      // Nav Tabs
      document.querySelectorAll(".nav-btn").forEach(btn => {
        btn.addEventListener("click", () => this.switchTab(btn.dataset.tab));
      });

      // Header Hour Pill
      document.getElementById("header-hour-pill")?.addEventListener("click", () => this.switchTab("horarium"));

      // Search Bar
      document.getElementById("catalog-search")?.addEventListener("input", (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.renderCatalog();
      });

      // Traditions Chips
      document.getElementById("traditions-chips-wrap")?.addEventListener("click", (e) => {
        const chip = e.target.closest(".tradition-chip-btn");
        if (chip) {
          this.activeTradition = chip.dataset.tradition;
          document.querySelectorAll(".tradition-chip-btn").forEach(c => c.classList.remove("active"));
          chip.classList.add("active");
          this.renderCatalog();
        }
      });

      // Category Chips
      document.getElementById("category-chips-wrap")?.addEventListener("click", (e) => {
        const chip = e.target.closest(".chip-btn");
        if (chip) {
          this.activeCategory = chip.dataset.category;
          document.querySelectorAll(".chip-btn").forEach(c => c.classList.remove("active"));
          chip.classList.add("active");
          this.renderCatalog();
        }
      });

      // Theme toggle
      document.getElementById("theme-toggle-btn")?.addEventListener("click", () => this.openModal("modal-theme-select"));

      // Sound settings
      document.getElementById("sound-settings-btn")?.addEventListener("click", () => {
        this.openModal("modal-sound-settings");
        this.populateSoundSettings();
      });

      // Add Custom
      document.getElementById("btn-add-custom")?.addEventListener("click", () => this.openModal("modal-custom-discipline"));

      // New Journal
      document.getElementById("btn-new-journal")?.addEventListener("click", () => this.openJournalModal());

      // Data Manage
      document.getElementById("btn-data-manage")?.addEventListener("click", () => this.openModal("modal-data-manage"));

      // Modal Close
      document.querySelectorAll(".modal-close-btn, .modal-overlay").forEach(el => {
        el.addEventListener("click", (e) => {
          if (e.target === el || e.target.closest(".modal-close-btn")) {
            this.closeAllModals();
          }
        });
      });

      document.querySelectorAll(".modal-content").forEach(content => {
        content.addEventListener("click", e => e.stopPropagation());
      });

      // Form Submissions
      document.getElementById("form-custom-discipline")?.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleCustomDisciplineSubmit();
      });

      document.getElementById("form-journal-entry")?.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleJournalSubmit();
      });

      // Test Bell
      document.getElementById("btn-test-bell")?.addEventListener("click", () => {
        const type = document.getElementById("setting-bell-type").value;
        if (type === "cathedral-bell") sound.playCathedralBell();
        else sound.playTibetanBowl();
      });

      // Keyboard Shortcuts
      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") this.closeAllModals();
        if (e.code === "Space" && this.activeTab === "practice" && practice.isRunning && e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
          e.preventDefault();
          document.getElementById("studio-btn-toggle")?.click();
        }
      });
    }

    setupPracticeCallbacks() {
      practice.onTick = (state) => this.updateStudioTimerDisplay(state);
      practice.onStepChange = (state) => this.renderStudioActiveState(state);
      practice.onBreathCycle = (breathInfo) => this.updateBreathOrb(breathInfo);
      practice.onComplete = ({ discipline, durationSec }) => {
        this.renderStudio();
        this.renderCatalog();
        this.openPostPracticeReflection(discipline, durationSec);
      };
    }

    renderCatalog() {
      const grid = document.getElementById("disciplines-grid");
      if (!grid) return;

      const all = storage.getAllDisciplines();
      let filtered = all;

      if (this.activeTradition !== "all") {
        filtered = filtered.filter(d => d.tradition === this.activeTradition);
      }

      if (this.activeCategory !== "all") {
        filtered = filtered.filter(d => d.category === this.activeCategory);
      }

      if (this.searchQuery) {
        filtered = filtered.filter(d => {
          const text = `${d.name} ${d.latinName || ""} ${d.traditionLabel || ""} ${d.shortDesc || ""} ${(d.tags || []).join(" ")} ${(d.habitBenefits || []).join(" ")}`.toLowerCase();
          return text.includes(this.searchQuery);
        });
      }

      TRADITIONS.forEach(trad => {
        const countEl = document.getElementById(`count-trad-${trad.id}`);
        if (countEl) {
          const tCount = trad.id === "all" ? all.length : all.filter(d => d.tradition === trad.id).length;
          countEl.textContent = tCount;
        }
      });

      CATEGORIES.forEach(cat => {
        const countEl = document.getElementById(`count-${cat.id}`);
        if (countEl) {
          const cCount = cat.id === "all" ? all.length : all.filter(d => d.category === cat.id).length;
          countEl.textContent = cCount;
        }
      });

      if (filtered.length === 0) {
        grid.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
            <i data-lucide="search-x" style="width: 48px; height: 48px; margin-bottom: 1rem; color: var(--accent-gold);"></i>
            <h3 style="font-family: var(--font-serif); font-size: 1.3rem; color: var(--text-primary);">No Disciplines Found</h3>
            <p style="margin-top: 0.5rem;">Try adjusting your tradition filter, search query, or category selection.</p>
          </div>
        `;
        this.refreshLucideIcons();
        return;
      }

      const todayCompleted = storage.getTodayCompletedIds();

      grid.innerHTML = filtered.map(disc => {
        const isCompleted = todayCompleted.includes(disc.id);
        const iconName = disc.icon || "sparkles";

        return `
          <div class="discipline-card ${isCompleted ? "completed-today" : ""}" data-id="${disc.id}">
            <div class="card-top">
              <div class="card-header-left">
                <div class="card-icon-box">
                  <i data-lucide="${iconName}"></i>
                </div>
                <div class="card-titles">
                  <h3 class="card-title">${disc.name}</h3>
                  ${disc.latinName ? `<span class="card-latin">${disc.latinName}</span>` : ""}
                </div>
              </div>
              <div class="card-actions-top">
                <button class="habit-check-btn" title="${isCompleted ? "Marked Complete Today" : "Mark Complete for Today"}" data-action="toggle-complete" data-id="${disc.id}">
                  <i data-lucide="check"></i>
                </button>
              </div>
            </div>

            <div class="card-body">
              <p class="card-desc">${disc.shortDesc || ""}</p>
              
              <div class="card-meta-pills">
                <span class="meta-pill tradition">
                  <i data-lucide="globe"></i>
                  ${disc.traditionLabel || "Orthopraxis"}
                </span>
                <span class="meta-pill duration">
                  <i data-lucide="clock"></i>
                  ${disc.durationLabel || disc.durationMin + " Min"}
                </span>
                <span class="meta-pill">
                  <i data-lucide="tag"></i>
                  ${disc.categoryLabel || "Practice"}
                </span>
              </div>

              ${disc.tags && disc.tags.length > 0 ? `
                <div class="card-tags">
                  ${disc.tags.slice(0, 4).map(t => `<span class="tag-pill">#${t}</span>`).join("")}
                </div>
              ` : ""}
            </div>

            <div class="card-footer">
              <button class="btn-secondary" data-action="view-details" data-id="${disc.id}">
                <i data-lucide="info"></i>
                Origin & Guidance
              </button>
              <button class="btn-primary" data-action="start-practice" data-id="${disc.id}">
                <i data-lucide="play"></i>
                Practice
              </button>
            </div>
          </div>
        `;
      }).join("");

      grid.querySelectorAll("[data-action='toggle-complete']").forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const id = btn.dataset.id;
          const isNowDone = storage.toggleComplete(id);
          if (isNowDone) {
            sound.playSoftChime();
            this.showToast("Discipline marked completed for today! 🕊️");
          }
          this.renderCatalog();
          this.renderTracker();
        });
      });

      grid.querySelectorAll("[data-action='view-details']").forEach(btn => {
        btn.addEventListener("click", () => this.openDisciplineDetail(btn.dataset.id));
      });

      grid.querySelectorAll("[data-action='start-practice']").forEach(btn => {
        btn.addEventListener("click", () => this.launchPractice(btn.dataset.id));
      });

      this.refreshLucideIcons();
    }

    renderLiberation() {
      const container = document.getElementById("liberation-view-content");
      if (!container) return;

      container.innerHTML = `
        <div class="liberation-hero-card">
          <div class="theologian-badge-row">
            <span class="theologian-pill">Gustavo Gutiérrez</span>
            <span class="theologian-pill">Leonardo Boff</span>
            <span class="theologian-pill">Jon Sobrino</span>
            <span class="theologian-pill">Aloysius Pieris</span>
            <span class="theologian-pill">Ahn Byung-Mu (Minjung)</span>
          </div>

          <h2 class="liberation-title">
            <i data-lucide="flame" style="color: #FB7185;"></i>
            The Horizontal Imperative & Primacy of Revolutionary Praxis
          </h2>

          <p style="font-size: 1.05rem; color: var(--text-secondary); line-height: 1.7;">
            Pioneered by Latin American theologians such as <strong>Gustavo Gutiérrez</strong>, <strong>Leonardo Boff</strong>, and <strong>Jon Sobrino</strong>, and expanded in Asia by <strong>Aloysius Pieris</strong> and Korean <strong>Minjung theologians</strong>, liberation theology fundamentally dismantles abstract, bourgeois orthodoxy in favor of the <strong>primacy of praxis</strong>. Authentic faith is verified solely through transformative, socio-political solidarity with the oppressed—what Sobrino termed the <em>"crucified peoples of history."</em>
          </p>

          <div class="liberation-banner-quote">
            "Theology is a critical reflection on historical praxis in the light of the Word. First comes historical commitment to the liberation of the poor (the first act); theology is only the second act."
            <div style="font-size: 0.88rem; font-family: var(--font-sans); font-style: normal; color: #FB7185; margin-top: 0.5rem;">
              — Gustavo Gutiérrez, <em>A Theology of Liberation (1971)</em>
            </div>
          </div>
        </div>

        <!-- 3-Column Detailed Matrix of Thinkers and Praxis -->
        <div class="liberation-grid">
          
          <!-- Column 1: Latin American Foundation -->
          <div class="liberation-section-card">
            <div class="liberation-card-header">
              <div class="liberation-icon-box">
                <i data-lucide="scale"></i>
              </div>
              <div>
                <h3 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--text-primary);">Latin American Liberation</h3>
                <span style="font-family: var(--font-sacred); font-size: 1rem; color: #FB7185; font-style: italic;">The Preferential Option for the Poor</span>
              </div>
            </div>

            <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6;">
              Utilizing Marxist sociological tools to uncover the root causes of structural exploitation, Latin American liberation theology asserts that correct belief is morally bankrupt if complicit with capitalist violence and state terror.
            </p>

            <div class="see-judge-act-box">
              <strong style="color: var(--text-primary); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em;">The Core Tripartite Methodology:</strong>
              <div class="sja-step">
                <div class="sja-num">1</div>
                <div><strong>VER (See):</strong> Critical socio-economic analysis of systemic oppression.</div>
              </div>
              <div class="sja-step">
                <div class="sja-num">2</div>
                <div><strong>JUZGAR (Judge):</strong> Discernment through prophetic scripture from the victim's vantage.</div>
              </div>
              <div class="sja-step">
                <div class="sja-num">3</div>
                <div><strong>ACTUAR (Act):</strong> Direct, organized transformative political action & mutual aid.</div>
              </div>
            </div>

            <div style="margin-top: auto; display: flex; flex-direction: column; gap: 0.5rem;">
              <button class="btn-liberation" data-action="launch-praxis" data-id="liberation-see-judge-act" style="justify-content: center;">
                <i data-lucide="play"></i>
                Practice See-Judge-Act
              </button>
            </div>
          </div>

          <!-- Column 2: Jon Sobrino & The Crucified Peoples -->
          <div class="liberation-section-card">
            <div class="liberation-card-header">
              <div class="liberation-icon-box">
                <i data-lucide="heart-handshake"></i>
              </div>
              <div>
                <h3 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--text-primary);">Jon Sobrino & Martyrs</h3>
                <span style="font-family: var(--font-sacred); font-size: 1rem; color: #FB7185; font-style: italic;">The Crucified Peoples of History</span>
              </div>
            </div>

            <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6;">
              Writing in the crucible of El Salvador amidst the martyrdom of Óscar Romero, Ignacio Ellacuría, and campesinos, Jon Sobrino declared that Christ continues to be physically crucified in oppressed populations.
            </p>

            <div style="background: var(--bg-surface-raised); border-left: 3px solid var(--accent-gold); padding: 0.85rem 1rem; border-radius: 0 var(--radius-sm) var(--radius-sm) 0; font-size: 0.88rem; color: var(--text-primary); font-style: italic;">
              "The crucified peoples are not mere objects of charity; they carry the suffering servant's potential to awaken, judge, and redeem the comfortable oppressor."
            </div>

            <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5;">
              <strong>Praxis Demands:</strong> Bodily accompaniment, exposing state terror, risk-bearing solidarity, and active measures to 'take victims down from the cross.'
            </p>

            <div style="margin-top: auto; display: flex; flex-direction: column; gap: 0.5rem;">
              <button class="btn-liberation" data-action="launch-praxis" data-id="sobrino-crucified-accompaniment" style="justify-content: center;">
                <i data-lucide="play"></i>
                Practice Accompaniment
              </button>
            </div>
          </div>

          <!-- Column 3: Asian Contextual Theology & Pieris's Triple Dialogue -->
          <div class="liberation-section-card">
            <div class="liberation-card-header">
              <div class="liberation-icon-box">
                <i data-lucide="globe-2"></i>
              </div>
              <div>
                <h3 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--text-primary);">Asian Public Theology</h3>
                <span style="font-family: var(--font-sacred); font-size: 1rem; color: #FB7185; font-style: italic;">Aloysius Pieris & Minjung Theology</span>
              </div>
            </div>

            <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6;">
              In Asia, Sri Lankan theologian <strong>Aloysius Pieris</strong> rejected Western aggressive dialectics in favor of a <em>"Theology of Harmony"</em> and the <strong>Triple Dialogue</strong>: immersion in Asia's diverse religions, immense cultures, and overwhelming poverty.
            </p>

            <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6;">
              Meanwhile, Korean <strong>Minjung Theology</strong> (Ahn Byung-Mu) discovered Christ in the <em>Ochlos</em> (the oppressed multitude), establishing the praxis of <strong>Dan-Han</strong>—communal rituals resolving and liberating accumulated historical grief (<em>Han</em>).
            </p>

            <div style="margin-top: auto; display: flex; flex-direction: column; gap: 0.5rem;">
              <button class="btn-liberation" data-action="launch-praxis" data-id="pieris-triple-dialogue" style="justify-content: center;">
                <i data-lucide="play"></i>
                Practice Triple Dialogue
              </button>
            </div>
          </div>

        </div>

        <!-- Comparative Framework: Orthodoxy vs. Liberation Orthopraxis -->
        <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 2rem;">
          <h3 style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--text-primary); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
            <i data-lucide="arrow-left-right" style="color: var(--accent-gold);"></i>
            Theological Inversion: Abstract Orthodoxy vs. Revolutionary Liberation Praxis
          </h3>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
            <div style="background: var(--bg-surface-raised); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem;">
              <h4 style="font-family: var(--font-serif); color: var(--text-muted); font-size: 1.1rem; margin-bottom: 0.5rem;">Traditional Abstract Orthodoxy</h4>
              <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.88rem; color: var(--text-secondary);">
                <li>• <strong>Starting Point:</strong> Universal dogmas, metaphysical propositions, ivory-tower academies.</li>
                <li>• <strong>Verification:</strong> Intellectual and verbal adherence to creedal formulations.</li>
                <li>• <strong>Socio-Political Posture:</strong> Passive accommodation of existing hierarchies, empire, and capitalism.</li>
                <li>• <strong>View of the Poor:</strong> Objects of occasional patronizing charity or individual moral salvation.</li>
              </ul>
            </div>

            <div style="background: var(--bg-surface-raised); border: 1px solid rgba(225, 29, 72, 0.4); border-radius: var(--radius-md); padding: 1.25rem;">
              <h4 style="font-family: var(--font-serif); color: #FB7185; font-size: 1.1rem; margin-bottom: 0.5rem;">Liberationist Orthopraxis</h4>
              <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.88rem; color: var(--text-primary);">
                <li>• <strong>Starting Point:</strong> The cries of the oppressed masses and the concrete wounds of history.</li>
                <li>• <strong>Verification:</strong> Lived revolutionary solidarity, policy resistance, taking victims down from crosses.</li>
                <li>• <strong>Socio-Political Posture:</strong> Prophetic dismantling of structural sin and economic exploitation.</li>
                <li>• <strong>View of the Poor:</strong> The historical subjects and living bearers of divine revelation and redemption.</li>
              </ul>
            </div>
          </div>
        </div>
      `;

      container.querySelectorAll("[data-action='launch-praxis']").forEach(btn => {
        btn.addEventListener("click", () => this.launchPractice(btn.dataset.id));
      });

      this.refreshLucideIcons();
    }

    renderPhilosophy() {
      const container = document.getElementById("philosophy-view-content");
      if (!container) return;

      container.innerHTML = `
        <div class="philosophy-hero-card">
          <h2 style="font-family: var(--font-serif); font-size: 1.85rem; color: var(--text-primary); display: flex; align-items: center; gap: 0.75rem;">
            <i data-lucide="scale" style="color: var(--accent-gold);"></i>
            The Primacy of Practice: Orthopraxis, Askesis & Technologies of the Self
          </h2>
          
          <p style="font-size: 1.05rem; color: var(--text-secondary); line-height: 1.7;">
            While Western modernity has frequently privileged <em>orthodoxy</em> (right cognitive belief), ancient wisdom and revolutionary traditions operate as systems of <strong>orthopraxis</strong> (right practice) and <strong>askesis</strong> (spiritual exercises). In these frameworks, the deliberate performance of bodily disciplines, self-audits, and prophetic solidarity directly forms human subjectivity.
          </p>

          <div class="philosophy-quote-highlight">
            "Philosophy in antiquity was an art of living, a concrete attitude and determinate lifestyle. Spiritual exercises (askēsis) transformed the vision of the world and metamorphosed one's inner being."
            <div style="font-size: 0.88rem; font-family: var(--font-sans); font-style: normal; color: var(--accent-gold); margin-top: 0.5rem;">
              — Pierre Hadot, <em>Philosophy as a Way of Life</em>
            </div>
          </div>

          <div class="philosophy-quote-highlight" style="border-left-color: var(--accent-purple);">
            "Care of the self (epimeleia heautou) is not a narcissistic retreat, but a practice of freedom: forging through bodily and mental exercises an autonomous subjectivity capable of resisting pervasive power, imperial decadence, and sovereign coercion."
            <div style="font-size: 0.88rem; font-family: var(--font-sans); font-style: normal; color: var(--accent-purple); margin-top: 0.5rem;">
              — Michel Foucault, <em>The Hermeneutics of the Subject / Technologies of the Self</em>
            </div>
          </div>
        </div>

        <div class="traditions-matrix-grid">
          ${TRADITIONS.filter(t => t.id !== "all").map(t => `
            <div class="tradition-matrix-card">
              <div class="tradition-card-header">
                <div class="tradition-icon-wrap">
                  <i data-lucide="${t.icon}"></i>
                </div>
                <div class="tradition-name-wrap">
                  <h3 class="tradition-title">${t.label}</h3>
                  <span class="tradition-script">${t.originalScript || ""}</span>
                </div>
              </div>

              <div class="tradition-scholars">
                <strong>Key Scholars & Sages:</strong> ${t.scholarRefs || "Tradition Codifiers"}
              </div>

              <p class="tradition-summary-text">${t.summary}</p>

              <button class="btn-secondary" data-action="filter-tradition-quick" data-tradition="${t.id}" style="margin-top: auto; justify-content: center;">
                <i data-lucide="book-open"></i>
                Explore ${t.label} Disciplines
              </button>
            </div>
          `).join("")}
        </div>
      `;

      container.querySelectorAll("[data-action='filter-tradition-quick']").forEach(btn => {
        btn.addEventListener("click", () => {
          const trad = btn.dataset.tradition;
          if (trad === "liberation") {
            this.switchTab("liberation");
          } else {
            this.activeTradition = trad;
            document.querySelectorAll(".tradition-chip-btn").forEach(c => {
              c.classList.toggle("active", c.dataset.tradition === trad);
            });
            this.switchTab("catalog");
          }
        });
      });

      this.refreshLucideIcons();
    }

    launchPractice(disciplineId) {
      const discipline = storage.getDisciplineById(disciplineId);
      if (!discipline) return;

      this.selectedDiscipline = discipline;
      this.switchTab("practice");
      practice.startPractice(discipline);
      this.renderStudio();
    }

    renderStudio() {
      const studioWrap = document.getElementById("practice-studio-content");
      if (!studioWrap) return;

      if (!practice.isRunning) {
        studioWrap.innerHTML = `
          <div class="studio-idle-card">
            <div class="studio-idle-icon">
              <i data-lucide="flame"></i>
            </div>
            <h2 style="font-family: var(--font-serif); font-size: 1.8rem; color: var(--text-primary);">Contemplative Studio Idle</h2>
            <p style="max-width: 540px; color: var(--text-secondary); line-height: 1.6;">
              Select any spiritual discipline or orthopraxis habit from the catalog, Liberation tab, Horarium, or traditions matrix to begin a guided session with sacred bells and timers.
            </p>
            <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; margin-top: 0.5rem;">
              <button class="btn-primary" id="btn-studio-theoria">
                <i data-lucide="globe"></i>
                View from Above (15 Min)
              </button>
              <button class="btn-secondary" id="btn-studio-hupomnemata">
                <i data-lucide="book-open"></i>
                Hupomnēmata Journal (20 Min)
              </button>
              <button class="btn-secondary" id="btn-studio-tetrapharmakos">
                <i data-lucide="trees"></i>
                Epicurean 4-Remedy (20 Min)
              </button>
              <button class="btn-liberation" id="btn-studio-see-judge-act">
                <i data-lucide="scale"></i>
                See-Judge-Act (20 Min)
              </button>
            </div>
          </div>
        `;

        document.getElementById("btn-studio-theoria")?.addEventListener("click", () => this.launchPractice("view-from-above-theoria"));
        document.getElementById("btn-studio-hupomnemata")?.addEventListener("click", () => this.launchPractice("hupomnemata-journaling"));
        document.getElementById("btn-studio-tetrapharmakos")?.addEventListener("click", () => this.launchPractice("epicurean-tetrapharmakos"));
        document.getElementById("btn-studio-see-judge-act")?.addEventListener("click", () => this.launchPractice("liberation-see-judge-act"));

        this.refreshLucideIcons();
        return;
      }

      const state = practice.getCurrentState();
      this.renderStudioActiveState(state);
    }

    renderStudioActiveState(state) {
      const studioWrap = document.getElementById("practice-studio-content");
      if (!studioWrap || !state.discipline) return;

      const disc = state.discipline;
      const isBreath = state.isBreath;

      studioWrap.innerHTML = `
        <div class="studio-active-wrapper">
          <div class="studio-header">
            <div class="studio-discipline-info">
              <h2>${disc.name}</h2>
              ${disc.latinName ? `<span class="latin-tag">${disc.latinName}</span>` : ""}
              <div style="margin-top: 4px;">
                <span class="meta-pill tradition">${disc.traditionLabel || "Orthopraxis"}</span>
              </div>
            </div>
            <div class="studio-top-controls">
              <button class="btn-secondary" id="studio-btn-bell" title="Ring Sacred Bell">
                <i data-lucide="bell"></i>
              </button>
              <button class="btn-secondary" id="studio-btn-exit" title="Exit Practice">
                <i data-lucide="x"></i>
                End Session
              </button>
            </div>
          </div>

          <div class="studio-center-stage">
            ${isBreath ? `
              <div class="breathing-orb-container">
                <div class="breathing-orb ${state.breathState}" id="breathing-orb-el">
                  <span class="orb-inner-text" id="orb-text">Breathe In</span>
                </div>
                <div class="breath-phrase-card">
                  <span class="breath-phrase-title">Current Sacred Phrase / Prophetic Formula</span>
                  <span class="breath-phrase-text" id="breath-phrase-display">
                    "${state.phrase.inhale} ... ${state.phrase.exhale}"
                  </span>
                  ${disc.suggestedPhrases && disc.suggestedPhrases.length > 1 ? `
                    <div style="margin-top: 0.5rem;">
                      <select id="select-breath-phrase" class="form-select" style="font-size: 0.85rem; padding: 0.35rem 0.75rem;">
                        ${disc.suggestedPhrases.map((p, idx) => `
                          <option value="${idx}">Phrase ${idx + 1}: ${p.inhale} / ${p.exhale}</option>
                        `).join("")}
                      </select>
                    </div>
                  ` : ""}
                </div>
              </div>
            ` : `
              <div class="timer-circle-wrap">
                <svg class="timer-svg" viewBox="0 0 260 260">
                  <circle class="timer-circle-bg" cx="130" cy="130" r="120"></circle>
                  <circle class="timer-circle-progress" id="timer-circle-progress-el" cx="130" cy="130" r="120"></circle>
                </svg>
                <div class="timer-center-content">
                  <div class="timer-digits" id="timer-step-digits">${this.formatTime(state.stepTimeRemaining)}</div>
                  <div class="timer-label" id="timer-label-text">Step ${state.stepIndex + 1} of ${state.totalSteps}</div>
                </div>
              </div>
            `}

            <div class="studio-step-box">
              <div class="step-indicator-bar">
                <span>Step ${state.stepIndex + 1} / ${state.totalSteps}</span>
                <span>Total Remaining: <strong id="total-remaining-digits">${this.formatTime(state.totalTimeRemaining)}</strong></span>
              </div>
              <h3 class="step-title">${state.currentStep ? state.currentStep.title : "Contemplation"}</h3>
              <p class="step-guidance">${state.currentStep ? state.currentStep.guidance : ""}</p>
            </div>
          </div>

          <div class="studio-controls-bar">
            <button class="control-btn-md" id="studio-btn-prev" title="Previous Step">
              <i data-lucide="skip-back"></i>
            </button>
            <button class="control-btn-lg" id="studio-btn-toggle" title="Play / Pause">
              <i data-lucide="${state.isPaused ? "play" : "pause"}" id="studio-toggle-icon"></i>
            </button>
            <button class="control-btn-md" id="studio-btn-next" title="Next Step">
              <i data-lucide="skip-forward"></i>
            </button>
          </div>
        </div>
      `;

      document.getElementById("studio-btn-toggle")?.addEventListener("click", () => {
        const isPaused = practice.togglePause();
        const icon = document.getElementById("studio-toggle-icon");
        if (icon) {
          icon.setAttribute("data-lucide", isPaused ? "play" : "pause");
          this.refreshLucideIcons();
        }
      });

      document.getElementById("studio-btn-prev")?.addEventListener("click", () => practice.prevStep());
      document.getElementById("studio-btn-next")?.addEventListener("click", () => practice.nextStep());
      document.getElementById("studio-btn-exit")?.addEventListener("click", () => {
        practice.stopPractice();
        this.renderStudio();
      });

      document.getElementById("studio-btn-bell")?.addEventListener("click", () => sound.playTibetanBowl());

      document.getElementById("select-breath-phrase")?.addEventListener("change", (e) => {
        practice.setPhraseIndex(parseInt(e.target.value, 10));
      });

      this.refreshLucideIcons();
    }

    updateStudioTimerDisplay(state) {
      const digits = document.getElementById("timer-step-digits");
      if (digits) digits.textContent = this.formatTime(state.stepTimeRemaining);

      const totalDigits = document.getElementById("total-remaining-digits");
      if (totalDigits) totalDigits.textContent = this.formatTime(state.totalTimeRemaining);

      const circle = document.getElementById("timer-circle-progress-el");
      if (circle) {
        const circumference = 2 * Math.PI * 120;
        const offset = circumference * (1 - state.stepProgress);
        circle.style.strokeDashoffset = offset;
      }
    }

    updateBreathOrb(breathInfo) {
      const orb = document.getElementById("breathing-orb-el");
      const text = document.getElementById("orb-text");
      if (!orb || !text) return;

      orb.className = `breathing-orb ${breathInfo.phase}`;
      text.textContent = breathInfo.label || "Breathe";

      const phraseEl = document.getElementById("breath-phrase-display");
      if (phraseEl && breathInfo.phrase) {
        if (breathInfo.phase === "inhale" || breathInfo.phase === "hold-in") {
          phraseEl.innerHTML = `<span style="color: var(--accent-gold); font-weight: 600;">[Inhale]</span> ${breathInfo.phrase.inhale}`;
        } else {
          phraseEl.innerHTML = `<span style="color: var(--accent-blue); font-weight: 600;">[Exhale]</span> ${breathInfo.phrase.exhale}`;
        }
      }
    }

    formatTime(seconds) {
      const s = Math.max(0, Math.floor(seconds));
      const mins = Math.floor(s / 60);
      const remSecs = s % 60;
      return `${mins}:${String(remSecs).padStart(2, "0")}`;
    }

    startHorariumClock() {
      const update = () => {
        const activeHour = horarium.getCurrentMonasticHour();
        const pill = document.getElementById("header-hour-pill");
        if (pill && activeHour) {
          pill.innerHTML = `
            <div class="hour-dot"></div>
            <span>${activeHour.name} (${activeHour.hourTime})</span>
          `;
        }
      };
      update();
      setInterval(update, 30000);
    }

    renderHorarium() {
      const listWrap = document.getElementById("horarium-list-wrap");
      if (!listWrap) return;

      const hours = horarium.getHours();
      const activeHour = horarium.getCurrentMonasticHour();

      listWrap.innerHTML = hours.map(h => {
        const isCurrent = activeHour && activeHour.id === h.id;
        const disc = storage.getDisciplineById(h.disciplineId);

        return `
          <div class="hour-card ${isCurrent ? "current-hour" : ""}">
            <div class="hour-badge-circle">
              <span class="hour-time-text">${h.hourTime}</span>
            </div>

            <div class="hour-info">
              <h3 class="hour-name">
                ${h.name}
                ${isCurrent ? `<span class="badge-gold">Current Hour</span>` : ""}
              </h3>
              <span class="hour-latin">${h.latinName || ""}</span>
              <p class="hour-desc">${h.desc || ""}</p>
              ${disc ? `
                <div style="margin-top: 0.35rem; font-size: 0.85rem; color: var(--accent-gold);">
                  <i data-lucide="sparkles" style="width: 14px; height: 14px; display: inline-block; vertical-align: middle;"></i>
                  Assigned Practice: <strong>${disc.name}</strong> (${disc.durationLabel}) — <em>${disc.traditionLabel || ""}</em>
                </div>
              ` : ""}
            </div>

            <div class="hour-actions">
              ${disc ? `
                <button class="btn-primary" data-action="horarium-practice" data-id="${disc.id}">
                  <i data-lucide="play"></i>
                  Practice
                </button>
              ` : ""}
            </div>
          </div>
        `;
      }).join("");

      listWrap.querySelectorAll("[data-action='horarium-practice']").forEach(btn => {
        btn.addEventListener("click", () => this.launchPractice(btn.dataset.id));
      });

      this.refreshLucideIcons();
    }

    renderTracker() {
      const metrics = storage.getMetrics();
      const daysData = storage.getLastNDaysData(14);

      document.getElementById("metric-current-streak").textContent = metrics.currentStreak;
      document.getElementById("metric-longest-streak").textContent = metrics.longestStreak;
      document.getElementById("metric-completed-today").textContent = metrics.completedTodayCount;
      document.getElementById("metric-total-minutes").textContent = metrics.totalMinutes;

      const gridEl = document.getElementById("days-consistency-grid");
      if (gridEl) {
        gridEl.innerHTML = daysData.map(day => `
          <div class="day-cell ${day.isToday ? "active" : ""} ${day.count > 0 ? "has-practice" : ""}" title="${day.dateStr}: ${day.count} practices">
            <span>${day.dayName}</span>
            <strong class="day-cell-count">${day.dayNum}</strong>
            <span>${day.count > 0 ? `${day.count}✓` : "·"}</span>
          </div>
        `).join("");
      }

      const topListEl = document.getElementById("top-disciplines-list");
      if (topListEl) {
        if (metrics.topDisciplines.length === 0) {
          topListEl.innerHTML = `<p style="color: var(--text-muted); font-size: 0.9rem;">No practice history recorded yet. Complete a practice session to build your orthopraxis stats!</p>`;
        } else {
          const maxCount = metrics.topDisciplines[0].count || 1;
          topListEl.innerHTML = metrics.topDisciplines.map(({ discipline, count }) => {
            const pct = Math.round((count / maxCount) * 100);
            return `
              <div class="top-item">
                <div class="top-item-header">
                  <strong>${discipline.name}</strong>
                  <span>${count} session${count > 1 ? "s" : ""}</span>
                </div>
                <div class="top-item-bar">
                  <div class="top-item-fill" style="width: ${pct}%;"></div>
                </div>
              </div>
            `;
          }).join("");
        }
      }
    }

    renderJournal() {
      const listEl = document.getElementById("journal-entries-list");
      if (!listEl) return;

      const entries = storage.getJournalEntries();
      if (entries.length === 0) {
        listEl.innerHTML = `
          <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
            <i data-lucide="book-open" style="width: 48px; height: 48px; color: var(--accent-gold); margin-bottom: 1rem;"></i>
            <h3 style="font-family: var(--font-serif); font-size: 1.3rem; color: var(--text-primary);">No Reflections Recorded</h3>
            <p style="margin-top: 0.5rem;">After completing a practice session, record your interior movements, consolations, and prayers here.</p>
          </div>
        `;
        this.refreshLucideIcons();
        return;
      }

      listEl.innerHTML = entries.map(entry => {
        const disc = entry.disciplineId ? storage.getDisciplineById(entry.disciplineId) : null;
        return `
          <div class="journal-entry-card" data-id="${entry.id}">
            <div class="entry-header">
              <h3 class="entry-title">${entry.title}</h3>
              <div class="entry-meta">
                <span>${entry.dateStr}</span>
                <span class="entry-mood-badge">${entry.mood || "Contemplative"}</span>
                <button class="action-icon-btn" data-action="delete-journal" data-id="${entry.id}" title="Delete Reflection" style="width: 28px; height: 28px;">
                  <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i>
                </button>
              </div>
            </div>

            ${disc ? `
              <div style="font-size: 0.85rem; color: var(--accent-gold);">
                <i data-lucide="sparkles" style="width: 14px; height: 14px; display: inline-block; vertical-align: middle;"></i>
                Discipline: <strong>${disc.name}</strong> (${disc.traditionLabel || "Orthopraxis"})
              </div>
            ` : ""}

            <div class="entry-content">${this.escapeHtml(entry.content)}</div>
          </div>
        `;
      }).join("");

      listEl.querySelectorAll("[data-action='delete-journal']").forEach(btn => {
        btn.addEventListener("click", () => {
          if (confirm("Are you sure you want to delete this reflection?")) {
            storage.deleteJournalEntry(btn.dataset.id);
            this.renderJournal();
            this.showToast("Reflection deleted");
          }
        });
      });

      this.refreshLucideIcons();
    }

    openJournalModal(disciplineId = null, defaultTitle = "Spiritual Reflection") {
      const form = document.getElementById("form-journal-entry");
      if (!form) return;
      form.reset();

      const select = document.getElementById("journal-discipline-select");
      if (select) {
        const all = storage.getAllDisciplines();
        select.innerHTML = `<option value="">-- General Reflection (No specific discipline) --</option>` +
          all.map(d => `<option value="${d.id}" ${d.id === disciplineId ? "selected" : ""}>${d.name} (${d.traditionLabel || ""})</option>`).join("");
      }

      const titleInput = document.getElementById("journal-title-input");
      if (titleInput) titleInput.value = defaultTitle;

      this.openModal("modal-journal");
    }

    handleJournalSubmit() {
      const disciplineId = document.getElementById("journal-discipline-select").value || null;
      const title = document.getElementById("journal-title-input").value.trim() || "Spiritual Reflection";
      const mood = document.getElementById("journal-mood-select").value;
      const content = document.getElementById("journal-content-input").value.trim();

      if (!content) {
        alert("Please write a reflection before saving.");
        return;
      }

      storage.saveJournalEntry({
        disciplineId,
        title,
        mood,
        content
      });

      this.closeAllModals();
      this.showToast("Spiritual reflection saved! 📖");
      this.renderJournal();
    }

    openPostPracticeReflection(discipline, durationSec) {
      const modal = document.getElementById("modal-post-practice");
      if (!modal) return;

      document.getElementById("post-practice-title").textContent = `Session Complete: ${discipline.name}`;
      document.getElementById("post-practice-subtext").textContent = `You dedicated ${Math.round(durationSec / 60)} minutes to ${discipline.name} (${discipline.latinName || ""}). Take a moment to capture what was revealed.`;

      document.getElementById("btn-post-practice-journal")?.addEventListener("click", () => {
        this.closeAllModals();
        this.openJournalModal(discipline.id, `Reflection on ${discipline.name}`);
      }, { once: true });

      document.getElementById("btn-post-practice-skip")?.addEventListener("click", () => {
        this.closeAllModals();
      }, { once: true });

      this.openModal("modal-post-practice");
    }

    openDisciplineDetail(id) {
      const disc = storage.getDisciplineById(id);
      if (!disc) return;

      document.getElementById("detail-modal-title").textContent = disc.name;
      document.getElementById("detail-modal-latin").textContent = disc.latinName || "";
      document.getElementById("detail-modal-tradition").textContent = disc.traditionLabel || "World Orthopraxis";
      document.getElementById("detail-modal-category").textContent = disc.categoryLabel || "Orthopraxis";
      document.getElementById("detail-modal-duration").textContent = disc.durationLabel || disc.durationMin + " Min";
      document.getElementById("detail-modal-desc").textContent = disc.longDesc || disc.shortDesc;

      const quoteBox = document.getElementById("detail-modal-quote");
      if (quoteBox) {
        if (disc.scriptureOrQuote) {
          quoteBox.style.display = "block";
          quoteBox.textContent = `"${disc.scriptureOrQuote}"`;
        } else {
          quoteBox.style.display = "none";
        }
      }

      const originBox = document.getElementById("detail-modal-origin");
      if (originBox) {
        originBox.textContent = disc.originHistory || "Orthopraxis tradition.";
      }

      const benefitsList = document.getElementById("detail-modal-benefits");
      if (benefitsList && disc.habitBenefits) {
        benefitsList.innerHTML = disc.habitBenefits.map(b => `
          <li style="display: flex; gap: 0.5rem; align-items: flex-start;">
            <i data-lucide="check-circle-2" style="color: var(--accent-gold); width: 16px; height: 16px; flex-shrink: 0; margin-top: 3px;"></i>
            <span>${b}</span>
          </li>
        `).join("");
      }

      const stepsList = document.getElementById("detail-modal-steps");
      if (stepsList && disc.steps) {
        stepsList.innerHTML = disc.steps.map((s, idx) => `
          <div class="detail-step-item">
            <div class="step-num-badge">${idx + 1}</div>
            <div>
              <strong style="color: var(--text-primary); font-size: 0.95rem;">${s.title}</strong>
              <p style="font-size: 0.88rem; color: var(--text-secondary); margin-top: 0.2rem;">${s.guidance}</p>
            </div>
          </div>
        `).join("");
      }

      const refLink = document.getElementById("detail-modal-ref-link");
      if (refLink) {
        refLink.href = disc.url || "https://urbanmonastic.org/practices/";
      }

      const practiceBtn = document.getElementById("detail-modal-start-practice");
      if (practiceBtn) {
        practiceBtn.onclick = () => {
          this.closeAllModals();
          this.launchPractice(disc.id);
        };
      }

      this.openModal("modal-discipline-detail");
      this.refreshLucideIcons();
    }

    handleCustomDisciplineSubmit() {
      const name = document.getElementById("custom-name").value.trim();
      const latinName = document.getElementById("custom-latin").value.trim();
      const tradition = document.getElementById("custom-tradition")?.value || "christian";
      const category = document.getElementById("custom-category").value;
      const durationMin = parseInt(document.getElementById("custom-duration").value, 10) || 10;
      const shortDesc = document.getElementById("custom-desc").value.trim();
      const habitBenefit = document.getElementById("custom-benefit").value.trim();

      if (!name || !shortDesc) {
        alert("Please provide at least a name and short description.");
        return;
      }

      const tradObj = TRADITIONS.find(t => t.id === tradition);

      const newDisc = {
        id: "custom-" + Date.now(),
        name,
        latinName,
        tradition,
        traditionLabel: tradObj ? tradObj.label : "Custom Orthopraxis",
        category,
        categoryLabel: CATEGORIES.find(c => c.id === category)?.label || "Custom Orthopraxis",
        durationMin,
        durationLabel: `${durationMin} Minutes`,
        icon: "bookmark-check",
        shortDesc,
        longDesc: shortDesc,
        originHistory: "Personal custom orthopraxis rule.",
        tags: ["custom", "personal-rule"],
        habitBenefits: habitBenefit ? [habitBenefit] : ["Fosters personal spiritual intentionality"],
        steps: [
          { title: "Preparation & Stillness", durationSec: 60, guidance: "Quiet your mind and set sacred intention." },
          { title: "Active Practice", durationSec: (durationMin * 60) - 120, guidance: shortDesc },
          { title: "Closing Dedication", durationSec: 60, guidance: "Offer gratitude and return with peace." }
        ]
      };

      storage.saveCustomDiscipline(newDisc);
      this.closeAllModals();
      this.showToast(`Created discipline "${name}"!`);
      this.renderCatalog();
    }

    populateSoundSettings() {
      const settings = storage.getSettings();
      const bellSelect = document.getElementById("setting-bell-type");
      if (bellSelect) bellSelect.value = settings.bellType || "tibetan-bowl";

      const volSlider = document.getElementById("setting-audio-volume");
      if (volSlider) volSlider.value = Math.round((settings.audioVolume || 0.75) * 100);

      const ambientSelect = document.getElementById("setting-ambient-type");
      if (ambientSelect) ambientSelect.value = settings.ambientSound || "none";

      const soundEnabled = document.getElementById("setting-sound-enabled");
      if (soundEnabled) soundEnabled.checked = settings.soundEnabled !== false;

      bellSelect?.addEventListener("change", (e) => storage.saveSettings({ bellType: e.target.value }));
      volSlider?.addEventListener("input", (e) => {
        const v = parseInt(e.target.value, 10) / 100;
        sound.setVolume(v);
        storage.saveSettings({ audioVolume: v });
      });
      ambientSelect?.addEventListener("change", (e) => {
        sound.setAmbientSound(e.target.value);
        storage.saveSettings({ ambientSound: e.target.value });
      });
      soundEnabled?.addEventListener("change", (e) => storage.saveSettings({ soundEnabled: e.target.checked }));
    }

    openModal(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add("open");
        this.refreshLucideIcons();
      }
    }

    closeAllModals() {
      document.querySelectorAll(".modal-overlay").forEach(m => m.classList.remove("open"));
    }

    showToast(message) {
      const container = document.getElementById("toast-container");
      if (!container) return;

      const toast = document.createElement("div");
      toast.className = "toast";
      toast.innerHTML = `<i data-lucide="sparkles" style="color: var(--accent-gold); width: 16px; height: 16px;"></i> <span>${message}</span>`;
      container.appendChild(toast);
      this.refreshLucideIcons();

      setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(15px)";
        setTimeout(() => toast.remove(), 300);
      }, 3200);
    }

    refreshLucideIcons() {
      if (window.lucide && window.lucide.createIcons) {
        window.lucide.createIcons();
      }
    }

    escapeHtml(text) {
      const div = document.createElement("div");
      div.textContent = text;
      return div.innerHTML;
    }

    renderAll() {
      this.renderCatalog();
      this.renderLiberation();
      this.renderPhilosophy();
      this.renderStudio();
      this.renderHorarium();
      this.renderTracker();
      this.renderJournal();
    }
  }

  // Attach global instances
  window.TRADITIONS = TRADITIONS;
  window.CATEGORIES = CATEGORIES;
  window.DEFAULT_DISCIPLINES = DEFAULT_DISCIPLINES;
  window.storage = storage;
  window.sound = sound;
  window.practice = practice;
  window.horarium = horarium;

  // Boot on DOM Ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      window.app = new OrthopraxisApp();
    });
  } else {
    window.app = new OrthopraxisApp();
  }

})();
