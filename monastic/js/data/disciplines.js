/**
 * Orthopraxis Disciplines Database
 * Comprehensive list of Christian monastic, Jewish Halakhic, Islamic Fiqh/Sunnah,
 * Confucian Li, Hindu Sanātana Dharma/Sadhana, Jain Kriya, Buddhist Sila/Zen, and Stoic Askesis disciplines.
 */

export const TRADITIONS = [
  {
    id: "all",
    label: "All Traditions",
    icon: "globe",
    originRegion: "Global",
    coreConcept: "Orthopraxis across World Traditions",
    summary: "Orthopraxis ('right action/practice') prioritizes lived behavioral conformity, sacred habits, embodied rituals, and ethical disciplines over mere cognitive or dogmatic assent."
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
  },
  {
    id: "stoicism",
    label: "Stoic Askesis & Daily Discipline",
    icon: "compass",
    originalScript: "Ἄσκησις (Askesis) & Προσoχή (Prosochê)",
    coreConcept: "Philosophical Spiritual Exercises & Mindful Vigilance",
    scholarRefs: "Epictetus, Seneca, Marcus Aurelius, Pierre Hadot ('Philosophy as a Way of Life')",
    summary: "Ancient Hellenistic philosophy was not an academic theory, but an askesis (spiritual training). Through the evening self-audit, Premeditatio Malorum, and Prosochê (continuous attention to the governing faculty), the philosopher actively forms habits of wisdom and courage."
  }
];

export const CATEGORIES = [
  { id: "all", label: "All Categories", icon: "sparkles", count: 0 },
  { id: "foundational-practices", label: "Foundational Liturgy & Rites", icon: "landmark", count: 0 },
  { id: "foundational-disciplines", label: "Core Lifelong Disciplines", icon: "shield", count: 0 },
  { id: "spiritual-practices", label: "Contemplative & Prayer Methods", icon: "flame", count: 0 },
  { id: "ethical-social", label: "Social Justice & Ritual Propriety", icon: "users", count: 0 },
  { id: "embodied-ascetic", label: "Embodied Asceticism & Body Prayer", icon: "activity", count: 0 },
  { id: "philosophical-audit", label: "Daily Audit & Mental Vigilance", icon: "brain", count: 0 }
];

export const DEFAULT_DISCIPLINES = [
  // =========================================================================
  // 1. CHRISTIAN MONASTIC ORTHOPRAXIS
  // =========================================================================
  {
    id: "divine-office",
    tradition: "christian",
    traditionLabel: "Christian Monasticism",
    name: "Divine Office",
    latinName: "Officium Divinum",
    category: "foundational-practices",
    categoryLabel: "Foundational Liturgy & Rites",
    durationMin: 15,
    durationLabel: "10 – 20 Minutes",
    frequency: "Daily (Matins, Lauds, Terce, Sext, None, Vespers, Compline)",
    icon: "book-open-check",
    shortDesc: "Sing or recite liturgical prayers for different times of day, weeks, and seasons. Also called the Liturgy of the Hours or Daily Prayer.",
    longDesc: "The Divine Office (Liturgy of the Hours) is the ancient prayer rhythm of the Christian Church. Dating back to the Desert Fathers and codified by St. Benedict in the 6th century, it sanctifies the hours of each day by praying the Psalms, scriptures, canticles, and intercessions at set times. It unites individual prayer with the perpetual prayer of the worldwide communion.",
    originHistory: "Developed from Jewish prayer hours, expanded in desert monasticism, and codified into the Benedictine Rule (Rule of St. Benedict, c. 516 AD).",
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
    id: "eucharist",
    tradition: "christian",
    traditionLabel: "Christian Monasticism",
    name: "Eucharist",
    latinName: "Eucharistia",
    category: "foundational-practices",
    categoryLabel: "Foundational Liturgy & Rites",
    durationMin: 5,
    durationLabel: "5 – 15 Minutes",
    frequency: "Daily / Weekly / Liturgical Feasts",
    icon: "wine",
    shortDesc: "Partake in the sacred rite of Holy Communion that Jesus instituted on the night he was betrayed.",
    longDesc: "The Eucharist (from the Greek eucharistia, meaning 'thanksgiving') is the heart of Christian worship and monastic devotion. It is the sacrament of real presence, deep thanksgiving, covenant renewal, and union with Christ.",
    originHistory: "Instituted by Jesus at the Last Supper (Matthew 26, 1 Corinthians 11), practiced as the 'Breaking of Bread' from Acts 2:42 onward.",
    url: "https://urbanmonastic.org/practices/eucharist/",
    tags: ["sacrament", "communion", "thanksgiving", "worship", "covenant"],
    habitBenefits: [
      "Instills a foundational posture of thanksgiving (eucharistein) across all of life",
      "Re-centers identity on Christ's self-giving love rather than self-striving",
      "Fosters humble reconciliation with fellow believers"
    ],
    scriptureOrQuote: "He took bread, gave thanks and broke it, and gave it to them... — Luke 22:19",
    steps: [
      { title: "Self-Examination & Confession", durationSec: 90, guidance: "Acknowledge where you have fallen short. Release grudges and rest in Christ's forgiveness." },
      { title: "The Great Thanksgiving", durationSec: 90, guidance: "Recall God's wondrous works of creation and redemption. Lift up your heart in gratitude." },
      { title: "Partaking / Spiritual Communion", durationSec: 90, guidance: "Receive the consecrated elements in reverence, or make an act of Spiritual Communion." },
      { title: "Post-Communion Sending", durationSec: 60, guidance: "Offer yourself as a living sacrifice to love and serve the world in peace." }
    ]
  },
  {
    id: "fasting",
    tradition: "christian",
    traditionLabel: "Christian Monasticism",
    name: "Fasting",
    latinName: "Ieiunium",
    category: "embodied-ascetic",
    categoryLabel: "Embodied Asceticism & Body Prayer",
    durationMin: 1440,
    durationLabel: "1+ Days (or 12-24 Hours)",
    frequency: "Weekly (Wednesdays/Fridays) or Seasonal (Lent)",
    icon: "utensils-crossed",
    shortDesc: "To abstain from all food or certain nourishments for at least a day to feast upon God's presence.",
    longDesc: "Fasting is voluntary abstinence from food for spiritual purposes. Far from mere self-denial, Christian fasting creates physical space and spiritual hunger, reorienting desires from earthly appetites to the Bread of Life.",
    originHistory: "Rooted in biblical traditions (Moses, Elijah, Jesus' 40-day wilderness fast) and early church fast days (Didache, c. 100 AD).",
    url: "https://urbanmonastic.org/practices/fasting/",
    tags: ["asceticism", "hunger-for-god", "simplicity", "discipline", "humility"],
    habitBenefits: [
      "Breaks the tyranny of physical cravings and instant gratification",
      "Sharpens spiritual focus and heightens sensitivity in prayer",
      "Builds solidarity and compassion with the hungry and impoverished"
    ],
    scriptureOrQuote: "Man shall not live on bread alone, but on every word that comes from the mouth of God. — Matthew 4:4",
    steps: [
      { title: "Setting the Sacred Intention", durationSec: 180, guidance: "Begin by dedicating this fast to God in secret. Define your fast boundary with grace." },
      { title: "Transforming Hunger into Prayer", durationSec: 300, guidance: "Whenever you feel a hunger pang, treat it as a chime reminding you to pray: 'Lord, you are my true food.'" },
      { title: "Almsgiving & Mercy Connection", durationSec: 180, guidance: "Dedicate the money and time saved toward serving someone in need or supporting the vulnerable." },
      { title: "Breaking the Fast with Gratitude", durationSec: 180, guidance: "End your fast gently with wholesome nourishment, receiving every bite with conscious praise." }
    ]
  },
  {
    id: "prayer",
    tradition: "christian",
    traditionLabel: "Christian Monasticism",
    name: "Prayer",
    latinName: "Ora",
    category: "foundational-disciplines",
    categoryLabel: "Core Lifelong Disciplines",
    durationMin: 15,
    durationLabel: "Ongoing / 10-30 Min",
    frequency: "Daily / Unceasing",
    icon: "sparkles",
    shortDesc: "Being purposefully in God's tender and loving presence where thoughts, emotions, and words can move in both directions.",
    longDesc: "Prayer is the fundamental heartbeat of monastic life and spiritual health. It is an honest, unvarnished dialogue of love, adoration, confession, thanksgiving, and quiet listening.",
    originHistory: "Universal pillar of Christian monasticism modeled by the prophets, the Psalmists, and Jesus.",
    url: "https://urbanmonastic.org/practices/prayer/",
    tags: ["communion", "dialogue", "adoration", "intercession", "presence"],
    habitBenefits: [
      "Cultivates ongoing conversational intimacy with the Creator",
      "Transforms anxiety into surrendered trust",
      "Anchors emotional equilibrium in divine fidelity"
    ],
    scriptureOrQuote: "Pray without ceasing. In everything give thanks... — 1 Thessalonians 5:17-18",
    steps: [
      { title: "Entering God's Presence (Adoration)", durationSec: 180, guidance: "Acknowledge God's infinite majesty and tender nearness." },
      { title: "Honest Vulnerability (Confession)", durationSec: 180, guidance: "Share your unedited thoughts, fears, joys, and struggles." },
      { title: "Intercession for Others", durationSec: 180, guidance: "Bring friends, family, leaders, and suffering neighbors before the throne of grace." },
      { title: "Quiet Listening", durationSec: 180, guidance: "Be still. Stop talking and allow God's gentle whisper to rest your soul." }
    ]
  },
  {
    id: "work",
    tradition: "christian",
    traditionLabel: "Christian Monasticism",
    name: "Work",
    latinName: "Labora",
    category: "foundational-disciplines",
    categoryLabel: "Core Lifelong Disciplines",
    durationMin: 60,
    durationLabel: "Daily Habit",
    frequency: "Daily (Ora et Labora)",
    icon: "hammer",
    shortDesc: "Using our bodies and minds to play our part in sustaining and improving society and creation.",
    longDesc: "In the monastic vision ('Ora et Labora' — Pray and Work), labor is a sacred participation in God's ongoing creative work. Work done with excellence and devotion becomes an active liturgy.",
    originHistory: "St. Benedict (Rule of St. Benedict, Ch. 48: 'Idleness is the enemy of the soul').",
    url: "https://urbanmonastic.org/practices/work/",
    tags: ["ora-et-labora", "stewardship", "vocation", "craftsmanship", "service"],
    habitBenefits: [
      "Infuses daily routine tasks with sacred purpose and mindfulness",
      "Overcomes procrastination and idle distraction through purposeful action",
      "Contributes directly to human flourishing and creation care"
    ],
    scriptureOrQuote: "Whatever you do, work at it with all your heart, as working for the Lord... — Colossians 3:23",
    steps: [
      { title: "Sanctifying the Task", durationSec: 60, guidance: "Pray: 'Lord, bless the work of my hands and mind. May this task serve your glory and bless others.'" },
      { title: "Focused Diligence", durationSec: 1800, guidance: "Engage your task with single-minded attention, treating each detail as worthy of care." },
      { title: "Offering the Fruits", durationSec: 60, guidance: "Yield the results to God without anxious grasping for praise or self-importance." }
    ]
  },
  {
    id: "hospitality",
    tradition: "christian",
    traditionLabel: "Christian Monasticism",
    name: "Hospitality",
    latinName: "Hospitalitas",
    category: "ethical-social",
    categoryLabel: "Social Justice & Ritual Propriety",
    durationMin: 30,
    durationLabel: "Lifestyle / Daily Opportunities",
    frequency: "Daily posture",
    icon: "door-open",
    shortDesc: "A spirit, heart, and life that are welcoming and loving for yourself and all that you meet.",
    longDesc: "Monastic hospitality ('All guests who present themselves are to be welcomed as Christ') is a radical spiritual practice that dismantles our protective boundaries, turning strangers into neighbors.",
    originHistory: "St. Benedict (Rule, Ch. 53: 'Let all guests be received as Christ').",
    url: "https://urbanmonastic.org/practices/hospitality/",
    tags: ["welcome", "kindness", "community", "generosity", "christ-in-the-stranger"],
    habitBenefits: [
      "Dismantles self-absorption and opens the soul to empathy",
      "Creates safe, healing environments for lonely and hurting people",
      "Reveals the hidden face of Christ in the vulnerable stranger"
    ],
    scriptureOrQuote: "Do not forget to show hospitality to strangers... — Hebrews 13:2",
    steps: [
      { title: "Preparing an Open Room", durationSec: 120, guidance: "Cultivate an inner posture of generosity and unhurried availability." },
      { title: "Attentive Presence", durationSec: 300, guidance: "Greet the person before you with genuine warmth and undivided attention." },
      { title: "Sharing Comfort", durationSec: 300, guidance: "Provide physical or emotional refreshment—a cup of water, a meal, or a listening ear." }
    ]
  },
  {
    id: "silence",
    tradition: "christian",
    traditionLabel: "Christian Monasticism",
    name: "Silence",
    latinName: "Silentio",
    category: "foundational-disciplines",
    categoryLabel: "Core Lifelong Disciplines",
    durationMin: 10,
    durationLabel: "5 – 30 Minutes",
    frequency: "Daily",
    icon: "volume-x",
    shortDesc: "It is in the quiet of silence that we come to know our God, and ourselves.",
    longDesc: "Silence (Silentium) is the womb of contemplation. Entering exterior and interior silence allows the storm of our inner anxieties to settle until the gentle whisper of God becomes audible.",
    originHistory: "The Desert Fathers and Mothers of Egypt and Syria (Abba Arsenius: 'Flee, be silent, pray always').",
    url: "https://urbanmonastic.org/practices/silence/",
    tags: ["stillness", "interior-quiet", "desert-spirituality", "listening", "solitude"],
    habitBenefits: [
      "Calms the nervous system and lowers chronic cognitive overload",
      "Cultivates the ability to respond thoughtfully rather than react impulsively",
      "Allows hidden spiritual insight and self-awareness to surface"
    ],
    scriptureOrQuote: "Be still, and know that I am God... — Psalm 46:10",
    steps: [
      { title: "Exterior Stillness", durationSec: 60, guidance: "Silence all digital devices, sit in an upright posture, and close your eyes." },
      { title: "Interior Silencing", durationSec: 420, guidance: "Acknowledge arising thoughts gently and let them drift by like clouds." },
      { title: "Resting in Sacred Quiet", durationSec: 120, guidance: "Rest without agenda in the loving quiet of God." }
    ]
  },
  {
    id: "meditation",
    tradition: "christian",
    traditionLabel: "Christian Monasticism",
    name: "Meditation",
    latinName: "Meditatio",
    category: "foundational-disciplines",
    categoryLabel: "Core Lifelong Disciplines",
    durationMin: 15,
    durationLabel: "10 – 20 Minutes",
    frequency: "Daily",
    icon: "brain",
    shortDesc: "Focusing your body, mind, and spirit onto or towards something in particular.",
    longDesc: "In the Christian monastic tradition, meditation (meditatio) is the 'ruminatio' (chewing, digesting) of divine truth, scripture passages, or attributes of God.",
    originHistory: "Hebrew practice of 'hagah' (murmuring on Torah day and night, Psalm 1).",
    url: "https://urbanmonastic.org/practices/meditation/",
    tags: ["ruminatio", "focus", "scripture-meditation", "wisdom", "contemplative"],
    habitBenefits: [
      "Deepens neural pathways of gratitude, truth, and resilience",
      "Transforms intellectual knowledge into heart-level conviction",
      "Increases daily mental focus and sustained concentration"
    ],
    scriptureOrQuote: "May the words of my mouth and this meditation of my heart be pleasing in your sight... — Psalm 19:14",
    steps: [
      { title: "Selecting the Focus Object", durationSec: 60, guidance: "Choose a single short scripture verse or sacred truth." },
      { title: "Repetition & Ruminatio", durationSec: 360, guidance: "Repeat the phrase softly, allowing each facet of meaning to sparkle." },
      { title: "Heart Application", durationSec: 240, guidance: "Ask: 'How does this truth reshape how I see myself and my challenges today?'" }
    ]
  },
  {
    id: "contemplation",
    tradition: "christian",
    traditionLabel: "Christian Monasticism",
    name: "Contemplation",
    latinName: "Contemplatio",
    category: "foundational-disciplines",
    categoryLabel: "Core Lifelong Disciplines",
    durationMin: 20,
    durationLabel: "15 – 30 Minutes",
    frequency: "Daily / Regular practice",
    icon: "eye",
    shortDesc: "Opening yourself to what God may bring to your mind or spirit.",
    longDesc: "Contemplation is simple, loving rest in God that moves beyond words, concepts, and images. It is a receptive surrender—a gaze of faith fixed on Jesus.",
    originHistory: "Articulated by St. Gregory the Great, St. John of the Cross, St. Teresa of Ávila, and The Cloud of Unknowing.",
    url: "https://urbanmonastic.org/practices/contemplation/",
    tags: ["mysticism", "infused-prayer", "surrender", "pure-presence", "adoration"],
    habitBenefits: [
      "Dissolves spiritual ego and performance anxiety in prayer",
      "Deepens profound interior peace independent of circumstances",
      "Cultivates intuitive spiritual discernment and love for others"
    ],
    scriptureOrQuote: "We all, who with unveiled faces contemplate the Lord's glory, are being transformed... — 2 Corinthians 3:18",
    steps: [
      { title: "Entering Receptive Silence", durationSec: 120, guidance: "Open your hands on your lap as a sign of radical receptivity." },
      { title: "The Loving Gaze", durationSec: 720, guidance: "Look upon God who is looking upon you with infinite delight." },
      { title: "Resting in Union", durationSec: 360, guidance: "Dwell in the pure mystery of divine grace." }
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
    originHistory: "Evolved from the Eastern Christian Hesychast tradition and early monastic desert practices (5th century).",
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
    id: "centering-prayer",
    tradition: "christian",
    traditionLabel: "Christian Monasticism",
    name: "Centering Prayer",
    latinName: "Oratio Centratum",
    category: "spiritual-practices",
    categoryLabel: "Contemplative & Prayer Methods",
    durationMin: 20,
    durationLabel: "10 – 20 Minutes",
    frequency: "1–2 times daily",
    icon: "target",
    shortDesc: "A contemplative prayer, focused on the presence of God through a sacred word.",
    longDesc: "Centering Prayer is a method of silent prayer that prepares us to receive the gift of contemplation by choosing a single sacred word as the symbol of our consent to God's presence.",
    originHistory: "Trappist monks Thomas Keating, Basil Pennington, and William Meninger, based on The Cloud of Unknowing.",
    url: "https://urbanmonastic.org/practices/centering-prayer/",
    tags: ["contemplation", "consent", "silence", "surrender", "sacred-word"],
    habitBenefits: [
      "Cultivates the practice of letting go of intrusive thoughts without judgment",
      "Fosters deep inner healing and emotional grounding",
      "Nurtures habitual awareness of God's continuous indwelling presence"
    ],
    scriptureOrQuote: "When you pray, go into your room, close the door and pray to your Father... — Matthew 6:6",
    steps: [
      { title: "Choose a Sacred Word", durationSec: 30, guidance: "Select a simple word (e.g. 'Jesus', 'Peace', 'Grace', 'Abba') representing your consent." },
      { title: "Sit in Silent Consent", durationSec: 900, guidance: "When thoughts arise, very gently return to your sacred word." },
      { title: "Gentle Transition", durationSec: 120, guidance: "Remain in silence with eyes closed for a couple of minutes before concluding." }
    ]
  },
  {
    id: "examen",
    tradition: "christian",
    traditionLabel: "Christian Monasticism",
    name: "The Daily Examen",
    latinName: "Examination",
    category: "philosophical-audit",
    categoryLabel: "Daily Audit & Mental Vigilance",
    durationMin: 15,
    durationLabel: "5 – 15 Minutes",
    frequency: "Daily (Midday or Evening)",
    icon: "compass",
    shortDesc: "A gracious Spirit-led revealing of how God was recently present in your life.",
    longDesc: "The Daily Examen is a five-step prayerful reflection on the events of the day developed by St. Ignatius of Loyola to detect God's presence and discern moments of consolation and desolation.",
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
  {
    id: "lectio-divina",
    tradition: "christian",
    traditionLabel: "Christian Monasticism",
    name: "Lectio Divina",
    latinName: "Lectio Divina (Divine Reading)",
    category: "spiritual-practices",
    categoryLabel: "Contemplative & Prayer Methods",
    durationMin: 20,
    durationLabel: "5 – 30 Minutes",
    frequency: "Daily / Regular",
    icon: "book-heart",
    shortDesc: "An engaged listening to a passage of scripture over multiple readings.",
    longDesc: "Lectio Divina ('Divine Reading') is the classic monastic art of reading Holy Scripture for transformation and communion across four movements: Lectio, Meditatio, Oratio, and Contemplatio.",
    originHistory: "Guigo II the Carthusian (The Ladder of Monks, c. 1150 AD).",
    url: "https://urbanmonastic.org/practices/lectio-divina/",
    tags: ["scripture", "contemplative-reading", "monastic-classic", "listening", "transformation"],
    habitBenefits: [
      "Breaks the habit of superficial, rushed reading of sacred texts",
      "Cultivates an open heart that hears personal divine guidance in scripture",
      "Integrates intellectual reflection with affective adoration"
    ],
    scriptureOrQuote: "Your words were found, and I ate them... — Jeremiah 15:16",
    steps: [
      { title: "1. Lectio (Reading)", durationSec: 180, guidance: "Read slowly out loud; listen for a word or phrase that shimmers." },
      { title: "2. Meditatio (Reflecting)", durationSec: 300, guidance: "Ruminate on that phrase: What does this touch in your life right now?" },
      { title: "3. Oratio (Responding)", durationSec: 300, guidance: "Speak back to God in authentic prayer based on what the word brought up." },
      { title: "4. Contemplatio (Resting)", durationSec: 300, guidance: "Let go of all words and rest quietly in the presence of God." }
    ]
  },
  {
    id: "fruit-of-the-spirit",
    tradition: "christian",
    traditionLabel: "Christian Monasticism",
    name: "Fruit of the Spirit",
    latinName: "Fructus Spiritus",
    category: "ethical-social",
    categoryLabel: "Social Justice & Ritual Propriety",
    durationMin: 15,
    durationLabel: "10 – 15 Minutes",
    frequency: "Daily",
    icon: "tree-deciduous",
    shortDesc: "Cultivating love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness, and self-control.",
    longDesc: "The Fruit of the Spirit represents the transformative character of Christ growing within a believer. This practice involves an intentional, reflective, and active cultivation of these nine virtues (Galatians 5:22-23). Rather than relying on mere willpower, the practitioner yields to the Holy Spirit, allowing these virtues to guide their interactions and inner life.",
    originHistory: "Apostle Paul's letter to the Galatians (Galatians 5:22-23).",
    url: "",
    tags: ["virtue", "character", "holy-spirit", "sanctification", "love", "joy", "peace"],
    habitBenefits: [
      "Replaces destructive impulses with life-giving virtues",
      "Transforms interpersonal relationships through forbearance and kindness",
      "Grounds the soul in divine peace and self-control amid chaos"
    ],
    scriptureOrQuote: "But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control. Against such things there is no law. — Galatians 5:22-23",
    steps: [
      { title: "Yielding (Love, Joy, Peace)", durationSec: 300, guidance: "Begin by resting in God's love. Ask the Spirit to fill you with a deep joy and a peace that surpasses understanding, setting the tone for the day." },
      { title: "Relating (Forbearance, Kindness, Goodness)", durationSec: 300, guidance: "Consider your interactions with others today. Pray for the patience to bear with difficult people, the kindness to serve them, and the goodness to seek their true well-being." },
      { title: "Grounding (Faithfulness, Gentleness, Self-Control)", durationSec: 300, guidance: "Commit to remaining faithful to your promises, responding to hostility with gentle grace, and exercising self-control over impulsive desires." }
    ]
  },

  // =========================================================================
  // 2. JEWISH HALAKHA & MITZVOT ORTHOPRAXIS
  // =========================================================================
  {
    id: "shabbat-observance",
    tradition: "judaism",
    traditionLabel: "Jewish Halakha",
    name: "Shabbat Observance (Kavod & Oneg Shabbat)",
    latinName: "שַׁבָּת (Shabbat)",
    category: "foundational-practices",
    categoryLabel: "Foundational Liturgy & Rites",
    durationMin: 1440,
    durationLabel: "25 Hours Weekly (Sunset to Nightfall)",
    frequency: "Weekly (Friday Sunset to Saturday Havdalah)",
    icon: "sparkles",
    shortDesc: "Comprehensive cessation from the 39 categories of creative melakha (work) to enter sacred time (Menuchah).",
    longDesc: "In Jewish Halakha, Shabbat is the ultimate sanctification of time. As Abraham Joshua Heschel described, it is a 'cathedral in time.' In the halakhic framework celebrated by Moses Mendelssohn and Yeshayahu Leibowitz, Shabbat is not a personal emotional retreat, but a divine legislation: ceasing all 39 melakhot (creative labor), lighting candles, reciting Kiddush, and feasting in holy delight (Oneg).",
    originHistory: "Fourth Commandment of the Decalogue (Exodus 20), tractate Shabbat in the Mishnah/Talmud codified by Maimonides (Mishneh Torah) and Joseph Karo (Shulchan Aruch).",
    url: "https://urbanmonastic.org/practices/",
    tags: ["halakha", "shabbat", "menuchah", "mitzvot", "sacred-time"],
    habitBenefits: [
      "Breaks the illusion of human autonomy and constant technological mastery",
      "Restores unhurried family, communal, and contemplative presence",
      "Enforces a total biological and existential boundary against consumerism"
    ],
    scriptureOrQuote: "Six days you shall labor and do all your work, but the seventh day is a Sabbath to the Lord your God. — Exodus 20:9-10",
    steps: [
      { title: "Hadlakat Nerot (Lighting the Candles)", durationSec: 180, guidance: "Before sunset, light the Shabbat candles, cover your eyes, and recite the blessing ushering in the holy day." },
      { title: "Shalom Aleichem & Kiddush", durationSec: 300, guidance: "Welcome the ministering angels and sanctify the day over a cup of wine, proclaiming creation and deliverance." },
      { title: "Seudat Shabbat (Festive Feast & Zmirot)", durationSec: 1200, guidance: "Partake of challah and festive food without rush, singing traditional hymns of thanksgiving." },
      { title: "Havdalah (Separation into the Week)", durationSec: 240, guidance: "At Saturday nightfall, bless the braided candle, fragrant spices, and wine, carrying Shabbat peace into the week." }
    ]
  },
  {
    id: "tefillin-shema",
    tradition: "judaism",
    traditionLabel: "Jewish Halakha",
    name: "Tefillin & Shema Yisrael",
    latinName: "תְּפִלִּין וּקְרִיאַת שְׁמַע (Tefillin & Shema)",
    category: "embodied-ascetic",
    categoryLabel: "Embodied Asceticism & Body Prayer",
    durationMin: 15,
    durationLabel: "15 – 25 Minutes Daily",
    frequency: "Daily Morning (Shacharit)",
    icon: "target",
    shortDesc: "Binding the sacred leather boxes to arm and head, unifying deed (hand), intellect (head), and heart in undivided devotion.",
    longDesc: "Tefillin are black leather boxes containing parchment scrolls of the Torah, bound with leather straps upon the arm (adjacent to the heart) and above the forehead (intellect). Combined with the proclamation of the Shema ('Hear O Israel, the Lord is our God, the Lord is One'), this halakhic duty directly subjugates bodily instincts, thoughts, and physical actions to divine sovereignty.",
    originHistory: "Deuteronomy 6:8 ('Bind them as a sign on your hand and let them be frontlets between your eyes'), codified in Shulchan Aruch Orach Chayim 25–45.",
    url: "https://urbanmonastic.org/practices/",
    tags: ["tefillin", "shema", "halakha", "embodied", "sovereignty"],
    habitBenefits: [
      "Subjugates intellectual pride and bodily urges to sacred alignment",
      "Establishes a physical morning anchor of unity before facing chaotic worldly demands",
      "Forms an unbreakable covenantal bond between mind, heart, and action"
    ],
    scriptureOrQuote: "Hear, O Israel: The Lord our God, the Lord is one. Love the Lord your God with all your heart and with all your soul and with all your strength. — Deuteronomy 6:4-5",
    steps: [
      { title: "Shel Yad (Binding the Arm)", durationSec: 120, guidance: "Place the box on the bicep facing the heart. Recite the blessing and wind the strap seven times around the forearm." },
      { title: "Shel Rosh (Placing on the Head)", durationSec: 120, guidance: "Position the head box precisely above the hairline between the eyes, aligning intellect with divine truth." },
      { title: "Proclaiming the Shema", durationSec: 300, guidance: "Cover your eyes with your right hand and declare the Shema with deep concentration and awe." },
      { title: "The Three Paragraphs of Acceptance", durationSec: 360, guidance: "Recite the V'ahavta, accepting the yoke of the Kingdom of Heaven and the commandments." }
    ]
  },
  {
    id: "berakhot-hundred-blessings",
    tradition: "judaism",
    traditionLabel: "Jewish Halakha",
    name: "Me'ah Berakhot (The 100 Daily Blessings)",
    latinName: "מֵאָה בְּרָכוֹת (100 Daily Blessings)",
    category: "foundational-disciplines",
    categoryLabel: "Core Lifelong Disciplines",
    durationMin: 5,
    durationLabel: "Intermittent throughout the day",
    frequency: "Continuous daily rhythm",
    icon: "sparkle",
    shortDesc: "Reciting 100 specific blessings each day over food, natural wonders, bodily functions, and morning awakenings.",
    longDesc: "Halakha institutes the practice of reciting at least one hundred blessings every day (Me'ah Berakhot). Before tasting a crumb of bread, sipping water, washing hands, seeing a lightning flash, or stepping out of bed (Modeh Ani), a blessing acknowledges that 'the earth is the Lord's and the fullness thereof.' It turns ordinary consumption into conscious sanctification.",
    originHistory: "King David established the 100 daily blessings (Menachot 43b) to stay a plague; formalized in Talmudic liturgy.",
    url: "https://urbanmonastic.org/practices/",
    tags: ["berakhot", "gratitude", "mindfulness", "halakha", "blessings"],
    habitBenefits: [
      "Prevents mindless, entitlement-driven consumption of food and life",
      "Transforms every sensory experience into a portal of wonder and reverence",
      "Infuses secular moments with immediate divine awareness"
    ],
    scriptureOrQuote: "What does the Lord your God ask of you? Read not 'what' (mah) but 'one hundred' (me'ah). — Talmud Menachot 43b",
    steps: [
      { title: "Modeh Ani (First Breath Blessing)", durationSec: 30, guidance: "Immediately upon waking, thank God: 'I give thanks before You, living and enduring King, who has restored my soul.'" },
      { title: "Birkat HaNehenin (Blessings of Pleasure)", durationSec: 60, guidance: "Before eating fruit, bread, or drinking water, pause and recite the specific blessing honoring its origin." },
      { title: "Asher Yatzar (Bodily Anatomy Wonder)", durationSec: 60, guidance: "After using the restroom, bless God who formed the human body with intricate wisdom and openings." }
    ]
  },
  {
    id: "hitbodedut-breslov",
    tradition: "judaism",
    traditionLabel: "Jewish Halakha",
    name: "Hitbodedut (Unstructured Heart-Outpouring)",
    latinName: "הִתְבּוֹדְדוּת (Hitbodedut)",
    category: "spiritual-practices",
    categoryLabel: "Contemplative & Prayer Methods",
    durationMin: 30,
    durationLabel: "20 – 60 Minutes Daily",
    frequency: "Daily (often at night or in nature)",
    icon: "trees",
    shortDesc: "Secluded, spontaneous conversation with God in one's native mother tongue, pouring out all joys, sorrows, and aspirations.",
    longDesc: "Championed by Rebbe Nachman of Breslov, Hitbodedut is the practice of self-seclusion in a private room or among the trees and fields, where the practitioner speaks directly and intimately to the Master of the Universe in their own everyday language, holding nothing back.",
    originHistory: "Early Jewish mystics (Abraham Abulafia), revitalized by Rebbe Nachman of Breslov (Likkutei Moharan II:25).",
    url: "https://urbanmonastic.org/practices/",
    tags: ["hitbodedut", "breslov", "solitude", "spontaneous-prayer", "nature"],
    habitBenefits: [
      "Complements fixed formal liturgy with raw, authentic personal vulnerability",
      "Dissolves emotional repression, inner shame, and spiritual numbness",
      "Restores unshakeable intimacy with the Divine amidst nature"
    ],
    scriptureOrQuote: "Hitbodedut is the highest virtue of all... Set aside at least an hour every day to converse with God in your own words. — Rebbe Nachman of Breslov",
    steps: [
      { title: "Finding the Secluded Sanctuary", durationSec: 180, guidance: "Go into an empty room, quiet park, or forest. Still your breath and know you stand before the living Creator." },
      { title: "Speaking from the Heart", durationSec: 900, guidance: "Speak out loud in your own everyday words. Talk about your struggles, desires, sins, and longings as to a dearest friend." },
      { title: "Silent Weeping or Longing", durationSec: 360, guidance: "If words run dry, sit in silent longing. Even a sigh or a single phrase ('Ribono shel Olam') is precious." }
    ]
  },

  // =========================================================================
  // 3. ISLAMIC FIQH & SUNNAH ORTHOPRAXIS
  // =========================================================================
  {
    id: "salah-five-prayers",
    tradition: "islam",
    traditionLabel: "Islamic Fiqh & Sunnah",
    name: "Salah (The Five Daily Liturgical Prayers)",
    latinName: "صَلَاة (Ṣalāh)",
    category: "foundational-practices",
    categoryLabel: "Foundational Liturgy & Rites",
    durationMin: 15,
    durationLabel: "10 – 15 Minutes (5x Daily)",
    frequency: "Fajr (Dawn), Dhuhr (Noon), Asr (Afternoon), Maghrib (Sunset), Isha (Night)",
    icon: "compass",
    shortDesc: "The physical, rhythmic submission of body, speech, and spirit facing the Qibla in exact conformity with the Sunnah.",
    longDesc: "Salah is the second pillar of Islam and the quintessential orthopraxic rite. Codified in Fiqh down to precise postures (Qiyam, Ruku, Sujud) and recitations (Surah Al-Fatiha, Tashahhud), it punctuates the day from dawn to night. As Wilfred Cantwell Smith highlighted, Salah's somatic precision embodies Islam's priority of lived obedience over speculative abstraction.",
    originHistory: "Commanded in the Quran and instituted during the Isra and Mi'raj; practiced uniformly by 1.9 billion Muslims across 1,400 years.",
    url: "https://urbanmonastic.org/practices/",
    tags: ["fiqh", "salah", "sujud", "submission", "prayer-rhythm"],
    habitBenefits: [
      "Obliterates spiritual procrastination by breaking the workday into 5 sacred intervals",
      "Grounds mental and emotional state through full somatic prostration (Sujud)",
      "Unites the practitioner with a global, synchronized community facing the same axis"
    ],
    scriptureOrQuote: "Indeed, prayer has been decreed upon the believers at specified times. — Quran 4:103",
    steps: [
      { title: "Wudu (Ritual Purification)", durationSec: 180, guidance: "Wash hands, mouth, nose, face, arms to elbows, wipe head, and wash feet, cleansing outer and inner impurities." },
      { title: "Niyyah & Takbirat al-Ihram", durationSec: 60, guidance: "Form the pure inward intention. Raise hands to ears and proclaim: 'Allahu Akbar' (God is Greater), leaving worldly affairs behind." },
      { title: "Qiyam & Al-Fatiha", durationSec: 180, guidance: "Stand in humble stillness with hands folded over chest. Recite the Opening Chapter with conscious awareness." },
      { title: "Ruku (Bowing) & Sujud (Prostration)", durationSec: 240, guidance: "Bow at the waist in awe ('Subhana Rabbiyal Azeem'), then place forehead, nose, palms, knees, and toes on the earth in complete surrender ('Subhana Rabbiyal A'la')." },
      { title: "Taslim (Peace upon the World)", durationSec: 60, guidance: "Conclude by turning face to the right and left, spreading peace: 'As-salamu alaykum wa rahmatullah.'" }
    ]
  },
  {
    id: "dhikr-remembrance",
    tradition: "islam",
    traditionLabel: "Islamic Fiqh & Sunnah",
    name: "Dhikr & Tasbih (Rhythmic Divine Remembrance)",
    latinName: "ذِكْر (Dhikr)",
    category: "spiritual-practices",
    categoryLabel: "Contemplative & Prayer Methods",
    durationMin: 15,
    durationLabel: "10 – 20 Minutes",
    frequency: "Post-Salah / Morning & Evening Adhkar",
    icon: "sparkles",
    shortDesc: "Rhythmic repetition of sacred formulaic praises (SubhanAllah, Alhamdulillah, Allahu Akbar) using prayer beads (Misbaha) or fingers.",
    longDesc: "Dhikr is the continuous polishing of the heart (Jala' al-Qulub) through the vocal and interior repetition of divine formulas. In Islamic contemplative tradition (Tasawwuf), rhythmic Dhikr clears away the rust of heedlessness (Ghaflah), returning the soul to its primordial covenant (Fitrah).",
    originHistory: "The Prophetic Sunnah of reciting 33x SubhanAllah, 33x Alhamdulillah, 33x Allahu Akbar, plus morning/evening supplications.",
    url: "https://urbanmonastic.org/practices/",
    tags: ["dhikr", "tasbih", "remembrance", "heart-polishing", "sunnah"],
    habitBenefits: [
      "Neutralizes heedlessness, toxic gossip, and restless anxiety",
      "Builds a continuous cognitive baseline of divine presence throughout ordinary tasks",
      "Induces physiological calmness through rhythmic auditory cadence"
    ],
    scriptureOrQuote: "Verily, in the remembrance of Allah do hearts find rest. — Quran 13:28",
    suggestedPhrases: [
      { inhale: "SubhanAllah (Glory be to God)", exhale: "Alhamdulillah (All Praise is for God)" },
      { inhale: "Allahu Akbar (God is Greater)", exhale: "La ilaha illa Allah (No deity except God)" },
      { inhale: "Astaghfirullah (I seek God's forgiveness)", exhale: "Ya Hayyu Ya Qayyum (O Ever-Living, Sustainer)" }
    ],
    steps: [
      { title: "Centering with Istighfar", durationSec: 120, guidance: "Recite 'Astaghfirullah' (I seek forgiveness from God) 33 times, cleansing the slate of the mind." },
      { title: "Tasbih (33x SubhanAllah)", durationSec: 180, guidance: "Praise God's perfection and transcendence above all created imperfections." },
      { title: "Tahmid (33x Alhamdulillah)", durationSec: 180, guidance: "Express gratitude for every breath, blessing, and trial that draws you closer to Him." },
      { title: "Takbir & Tahlil (33x Allahu Akbar & Kalimah)", durationSec: 180, guidance: "Magnify God's supreme majesty and seal the remembrance with 'La ilaha illa Allah.'" }
    ]
  },
  {
    id: "muhasaba-self-accounting",
    tradition: "islam",
    traditionLabel: "Islamic Fiqh & Sunnah",
    name: "Muhasaba (Nightly Self-Accounting)",
    latinName: "مُحَاسَبَة (Muḥāsabah)",
    category: "philosophical-audit",
    categoryLabel: "Daily Audit & Mental Vigilance",
    durationMin: 10,
    durationLabel: "5 – 15 Minutes Nightly",
    frequency: "Nightly before sleep",
    icon: "scale",
    shortDesc: "Auditing one's actions, intentions, speech, and transactions of the day before being audited on the Day of Judgment.",
    longDesc: "Muhasaba is the spiritual discipline of holding one's self strictly accountable at the end of each day. Codified by Imam al-Ghazali and early ascetic masters, the practitioner reviews their deeds like a rigorous business partner: repenting for wrongs, praising God for righteous actions, and rectifying broken covenants.",
    originHistory: "Saying of Caliph Umar ibn al-Khattab: 'Hold yourselves to account before you are held to account, and weigh your deeds before they are weighed for you.'",
    url: "https://urbanmonastic.org/practices/",
    tags: ["muhasaba", "self-audit", "ghazali", "accountability", "repentance"],
    habitBenefits: [
      "Exposes hidden hypocrisy, pride, and ethical blind spots before they harden",
      "Ensures debts, apologies, and harms to others are resolved immediately",
      "Cleanses the subconscious mind for peaceful, restful sleep"
    ],
    scriptureOrQuote: "Hold yourselves to account before you are held to account. — Umar ibn al-Khattab",
    steps: [
      { title: "Audit of Obligatory Duties (Fara'id)", durationSec: 120, guidance: "Review your prayers, honesty, and commitments. Were they fulfilled on time with presence?" },
      { title: "Audit of Sins & Transgressions", durationSec: 180, guidance: "Did you speak ill of anyone? Did you indulge anger, gaze at the forbidden, or act out of vanity?" },
      { title: "Tawbah & Resolution (Sincere Repentance)", durationSec: 180, guidance: "Ask Allah's pardon, make an immediate intention to make amends tomorrow, and rest in His mercy." }
    ]
  },

  // =========================================================================
  // 4. CONFUCIAN LI & SACRED SECULARITY
  // =========================================================================
  {
    id: "confucian-li-ritual",
    tradition: "confucianism",
    traditionLabel: "Confucian Li & Self-Cultivation",
    name: "Li (Ritual Propriety & Sacred Etiquette)",
    latinName: "禮 (Lǐ)",
    category: "ethical-social",
    categoryLabel: "Social Justice & Ritual Propriety",
    durationMin: 15,
    durationLabel: "Daily Embodied Conduct",
    frequency: "Continuous relational posture",
    icon: "book-marked",
    shortDesc: "Transforming every mundane human interaction (greetings, dining, speech, bows) into sacred rites of profound reverence.",
    longDesc: "In the Confucian worldview famously analyzed by philosopher Herbert Fingarette in 'Confucius: The Secular as Sacred,' Li is not empty formalism, but the magical transforming power of human culture. By codifying posture, eye contact, respectful speech, and filial reverence (Xiao), everyday life becomes a holy liturgy where human beings honor the dignity of one another.",
    originHistory: "The Duke of Zhou and Confucius (Analects), codified in the Classic of Rites (Liji).",
    url: "https://urbanmonastic.org/practices/",
    tags: ["li", "confucian", "fingarette", "sacred-secularity", "ritual-propriety"],
    habitBenefits: [
      "Elevates clumsy, cynical, or rude interactions into graceful sacred moments",
      "Cultivates effortless social harmony and mutual human dignity",
      "Disciplines physical posture, tone of voice, and body language"
    ],
    scriptureOrQuote: "Do not look at what is contrary to ritual; do not listen to what is contrary to ritual; do not speak what is contrary to ritual; do not make a move that is contrary to ritual. — Analects 12.1",
    steps: [
      { title: "Adjusting Posture & Dignity", durationSec: 120, guidance: "Stand straight, align your shoulders, relax your facial muscles into respectful warmth, and compose your attire." },
      { title: "Mindful Speech & Tone", durationSec: 300, guidance: "Before speaking, ensure your words are truthful, benevolent (Ren), and spoken with gentle clarity without arrogance." },
      { title: "Deferential Regard (Bowing / Respect)", durationSec: 180, guidance: "Acknowledge elders, colleagues, guests, and family with undivided attention and courteous reverence." }
    ]
  },
  {
    id: "zengzi-threefold-examination",
    tradition: "confucianism",
    traditionLabel: "Confucian Li & Self-Cultivation",
    name: "Daily Self-Examination of Master Zeng (San Xing)",
    latinName: "吾日三省吾身 (Daily Threefold Self-Audit)",
    category: "philosophical-audit",
    categoryLabel: "Daily Audit & Mental Vigilance",
    durationMin: 10,
    durationLabel: "5 – 10 Minutes Daily",
    frequency: "Daily Evening",
    icon: "check-check",
    shortDesc: "Master Zeng's daily three-question moral audit: loyalty to others, trustworthiness to friends, and practice of what has been learned.",
    longDesc: "Recorded in the first chapter of the Analects, the disciple Zengzi practiced a daily threefold moral examination. This rigorous self-reflection guarantees that intellectual knowledge of virtue is actively translated into orthopraxic consistency in human relationships.",
    originHistory: "Analects of Confucius (Book 1, Verse 4: 'Every day I examine myself on three points...').",
    url: "https://urbanmonastic.org/practices/",
    tags: ["san-xing", "zengzi", "confucian", "moral-audit", "integrity"],
    habitBenefits: [
      "Pinpoints instances where personal convenience compromised loyalty to others",
      "Verifies that words and promises match concrete actions",
      "Ensures that philosophical lessons are actively practiced rather than passively hoarded"
    ],
    scriptureOrQuote: "Every day I examine myself on three points: Whether in counseling others I have failed to be loyal; whether in dealing with friends I have failed to be trustworthy; whether I have failed to practice what has been passed on to me. — Master Zeng (Analects 1.4)",
    steps: [
      { title: "Question 1: Loyalty in Service (Zhong)", durationSec: 180, guidance: "In working for others or counseling people today, was I entirely wholehearted and faithful to their highest good?" },
      { title: "Question 2: Trustworthiness with Friends (Xin)", durationSec: 180, guidance: "In my communications and promises with companions today, did I speak with total honesty and reliability?" },
      { title: "Question 3: Application of Wisdom (Xi)", durationSec: 180, guidance: "Have I actively practiced and embodied the wisdom and virtues that my teachers and elders passed on to me?" }
    ]
  },

  // =========================================================================
  // 5. HINDU SANĀTANA DHARMA & SADHANA
  // =========================================================================
  {
    id: "sandhyavandanam-gayatri",
    tradition: "hinduism",
    traditionLabel: "Hindu Sanātana Dharma & Sadhana",
    name: "Sandhyavandanam & Gayatri Japa",
    latinName: "संध्यावन्दनम् (Sandhyāvandanam)",
    category: "foundational-practices",
    categoryLabel: "Foundational Liturgy & Rites",
    durationMin: 20,
    durationLabel: "15 – 30 Minutes (Thrice Daily)",
    frequency: "Pratah (Dawn), Madhyahnika (Noon), Sayam (Sunset)",
    icon: "sun",
    shortDesc: "Ancient thrice-daily Vedic water ritual and Gayatri mantra recitation welcoming the solar junctions.",
    longDesc: "Sandhyavandanam is the oldest unbroken ritual prayer tradition in Hinduism. Performed at the dawn, noon, and sunset transitions (Sandhyas), it combines breath control (Pranayama), water purification (Arghya), and the silent mental repetition of the Gayatri Mantra to illuminate the practitioner's intellect (Dhiyo Yo Nah Prachodayat). In classical Vedanta, the ritual purity of the act itself produces Chitta Shuddhi (purification of consciousness).",
    originHistory: "Rigveda (Mandal 3, Sukta 62, Verse 10), codified in Grihya Sutras across millenia.",
    url: "https://urbanmonastic.org/practices/",
    tags: ["sandhyavandanam", "gayatri", "vedic", "pranayama", "chitta-shuddhi"],
    habitBenefits: [
      "Synchronizes human biological biorhythms with planetary solar transitions",
      "Purifies neural channels through synchronized Pranayama and sonic vibration",
      "Cultivates intuitive spiritual intelligence and clarity of discernment"
    ],
    scriptureOrQuote: "Om Bhur Bhuvaḥ Swaḥ, Tat-savitur Vareṇyaṁ, Bhargo Devasya Dhīmahi, Dhiyo Yo Naḥ Prachodayāt. — Rigveda 3.62.10",
    suggestedPhrases: [
      { inhale: "Om Bhur Bhuvaḥ Swaḥ", exhale: "Tat-savitur Vareṇyaṁ" },
      { inhale: "Bhargo Devasya Dhīmahi", exhale: "Dhiyo Yo Naḥ Prachodayāt" }
    ],
    steps: [
      { title: "Marjana & Achamana (Purification)", durationSec: 180, guidance: "Sip water with holy mantras, cleansing physical impurities and dedicating speech, breath, and sight." },
      { title: "Pranayama (Breath Control)", durationSec: 300, guidance: "Inhale, hold, and exhale through alternate nostrils, calming the vital prana and centering the mind." },
      { title: "Gayatri Japa", durationSec: 600, guidance: "Silently repeat the sacred Gayatri Mantra with devotion, praying for divine radiance to illuminate your intellect." },
      { title: "Surya Arghya & Namaskara", durationSec: 120, guidance: "Offer water upward toward the sun in thanksgiving for the cosmic light sustaining all beings." }
    ]
  },
  {
    id: "japa-mala-meditation",
    tradition: "hinduism",
    traditionLabel: "Hindu Sanātana Dharma & Sadhana",
    name: "Japa Yoga (Mantra Repetition with 108 Mala Beads)",
    latinName: "जप योग (Japa Yoga)",
    category: "spiritual-practices",
    categoryLabel: "Contemplative & Prayer Methods",
    durationMin: 20,
    durationLabel: "15 – 30 Minutes",
    frequency: "Daily Morning / Evening",
    icon: "target",
    shortDesc: "Disciplined continuous repetition of a sacred mantra across 108 rudraksha or tulsi beads to anchor wandering thoughts.",
    longDesc: "Japa is the spiritual practice of meditative mantra repetition. As Swami Sivananda noted, 'Japa is the rod with which the practitioner drives away the herd of wandering thoughts.' By turning the mala beads with thumb and middle finger (avoiding the index ego finger), the physical touch, mental recitation, and auditory vibration unite into concentrated focus (Dharana).",
    originHistory: "Upanishadic and Puranic traditions, formalized in Patanjali's Yoga Sutras (1.28: 'Taj-japas tad-artha-bhavanam').",
    url: "https://urbanmonastic.org/practices/",
    tags: ["japa", "mala", "mantra", "dharana", "sadhana"],
    habitBenefits: [
      "Rewires wandering subconscious thought loops into sacred stillness",
      "Harnesses somatic tactile feedback (mala beads) to anchor concentration",
      "Generates deep emotional serenity and removes mental agitation (Rajas)"
    ],
    scriptureOrQuote: "Of sacrifices I am the sacrifice of silent repetition (Japa-Yajna). — Lord Krishna, Bhagavad Gita 10.25",
    steps: [
      { title: "Asana & Mala Grasp", durationSec: 60, guidance: "Sit with upright spine. Hold the mala with your right hand, resting on the middle finger, moving bead by bead with your thumb." },
      { title: "108 Mantras (Bead by Bead)", durationSec: 900, guidance: "Repeat your sacred mantra (e.g. 'Om Namah Shivaya', 'Om Namo Bhagavate Vasudevaya', 'Maha-Mantra') with every bead. Do not cross the Meru bead." },
      { title: "Silent Absorption", durationSec: 240, guidance: "Touch the Meru bead to your forehead. Sit in silent reverberation, bathing in the residual stillness." }
    ]
  },

  // =========================================================================
  // 6. JAIN KRIYA & MAHAVRATAS
  // =========================================================================
  {
    id: "samayika-equanimity",
    tradition: "jainism",
    traditionLabel: "Jain Kriya & Mahavratas",
    name: "Samayika (48-Minute Equanimity Practice)",
    latinName: "सामायिक (Sāmāyika)",
    category: "foundational-disciplines",
    categoryLabel: "Core Lifelong Disciplines",
    durationMin: 48,
    durationLabel: "Exact 1 Muhurta (48 Minutes)",
    frequency: "Daily / Regular practice",
    icon: "shield-alert",
    shortDesc: "A complete 48-minute cessation of all attachment, aversion, and worldly identity to dwell in pure soul-equanimity (Samabhava).",
    longDesc: "Samayika is the fundamental ritual kriya of Jainism. For exactly one 'muhurta' (48 minutes), the practitioner renounces all possessions, resentments, and worldly business, sitting in white garments to cultivate pure neutrality toward pleasure and pain, friends and foes. In doing so, the inflow of new karma is completely arrested.",
    originHistory: "Practiced by Lord Mahavira and the 24 Tirthankaras; codified in ancient Jain canonical Agamas.",
    url: "https://urbanmonastic.org/practices/",
    tags: ["samayika", "jain", "equanimity", "kriya", "ahimsa"],
    habitBenefits: [
      "Directly halts the emotional oscillation between craving and repulsion",
      "Creates an impenetrable mental sanctuary of profound stillness and peace",
      "Develops radical detachment from external status and material possessions"
    ],
    scriptureOrQuote: "I renounce all harmful activities for the duration of two ghadis (48 minutes)... I shall maintain equanimity toward all living beings. — Karemi Bhante (Samayika Vow)",
    steps: [
      { title: "Karemi Bhante (The Vow of Equanimity)", durationSec: 120, guidance: "Recite the ancient Prakrit formula, renouncing all violent actions in thought, speech, and body for 48 minutes." },
      { title: "Iriyavahiya & Navkar Meditation", durationSec: 360, guidance: "Seek forgiveness for any harm caused to microscopic organisms while walking; recite the Navkar Mantra." },
      { title: "Kayotsarga & Pure Soul Contemplation", durationSec: 2160, guidance: "Stand or sit motionless, casting aside body-consciousness. Contemplate the soul (Jiva) as pure, eternal, and peaceful." },
      { title: "Closing Dedication", durationSec: 240, guidance: "Conclude by wishing spiritual peace and liberation for every living creature in the cosmos." }
    ]
  },
  {
    id: "pratikramana-confession",
    tradition: "jainism",
    traditionLabel: "Jain Kriya & Mahavratas",
    name: "Pratikramana & Micchami Dukkadam",
    latinName: "प्रतिक्रमण (Pratikramaṇa)",
    category: "philosophical-audit",
    categoryLabel: "Daily Audit & Mental Vigilance",
    durationMin: 30,
    durationLabel: "20 – 45 Minutes Daily / Seasonal",
    frequency: "Daily (Morning & Evening) and Paryushana",
    icon: "hand-heart",
    shortDesc: "Returning from misdeeds back to purity through structured self-examination and asking universal forgiveness (Micchami Dukkadam).",
    longDesc: "Pratikramana (literally 'turning back') is the sacred Jain kriya where the practitioner turns back from the path of violence, carelessness, and passion to the path of truth. It culminates in the universal declaration: 'I forgive all living beings, may all living beings forgive me; I have friendship with all, enmity toward none.'",
    originHistory: "Codified in the Tattvartha Sutra and classical Jain ascetic manuals.",
    url: "https://urbanmonastic.org/practices/",
    tags: ["pratikramana", "forgiveness", "micchami-dukkadam", "ahimsa", "repentance"],
    habitBenefits: [
      "Eradicates bitter grudges and subconscious animosity toward anyone",
      "Promotes radical accountability for the consequences of one's smallest actions",
      "Instills universal empathy for all sentient life"
    ],
    scriptureOrQuote: "Khamemi Savve Jiva, Savve Jiva Khamantu Me; Mitti Me Savva Bhuesu, Veram Majjham Na Kenai. (I forgive all beings, may all forgive me; my friendship is with all, enmity with none.)",
    steps: [
      { title: "Alochna (Review of Transgressions)", durationSec: 300, guidance: "Examine your actions, speech, and thoughts: where did you cause harm, speak harshly, or act out of greed?" },
      { title: "Repentance of the Six Passions", durationSec: 300, guidance: "Acknowledge anger (Krodha), pride (Mana), deceit (Maya), and greed (Lobha), consciously dissolving them." },
      { title: "Micchami Dukkadam (Universal Forgiveness)", durationSec: 300, guidance: "Proclaim friendship with all creation: 'If I have caused offense in thought, word, or deed, may all my faults be forgiven.'" }
    ]
  },

  // =========================================================================
  // 7. BUDDHIST SĪLA & ZEN SAMU
  // =========================================================================
  {
    id: "zen-samu-work",
    tradition: "buddhism",
    traditionLabel: "Buddhist Sīla & Zen Samu",
    name: "Samu (Mindful Manual Labor in Zen)",
    latinName: "作務 (Samu)",
    category: "foundational-disciplines",
    categoryLabel: "Core Lifelong Disciplines",
    durationMin: 45,
    durationLabel: "30 – 60 Minutes Daily",
    frequency: "Daily (Zen Monastic Life)",
    icon: "brush",
    shortDesc: "Manual chores (sweeping, chopping, weeding, cooking) performed with absolute silence and undivided Zen presence.",
    longDesc: "In Zen Buddhism, Samu is physical work practiced with meditative mindfulness. Master Baizhang Huaihai famously instituted the rule: 'A day without work is a day without food.' Master Dogen taught that sweeping the temple garden or washing vegetables is not separate from seated meditation (Zazen)—it is the living reality of Buddha-nature in direct physical action.",
    originHistory: "Zen master Baizhang Huaihai (8th century) and Dogen Zenji (Instructions for the Cook / Tenzo Kyokun, 1237 AD).",
    url: "https://urbanmonastic.org/practices/",
    tags: ["samu", "zen", "dogen", "mindful-work", "everyday-zen"],
    habitBenefits: [
      "Eliminates the false dualism between 'spiritual time' and 'boring chore time'",
      "Fosters uncomplaining diligence and physical coordination",
      "Leaves physical surroundings clean, ordered, and beautiful"
    ],
    scriptureOrQuote: "When you prepare food, never view the ingredients with ordinary eyes... wash the rice with single-minded attention as if caring for your own child. — Dogen Zenji (Tenzo Kyokun)",
    steps: [
      { title: "Gassho (Bow of Dedication)", durationSec: 60, guidance: "Bow with hands together toward your broom, tools, or cleaning area, honoring the task." },
      { title: "Silent Single-Minded Action", durationSec: 2400, guidance: "Sweep, scrub, or organize in complete silence. Be one with the motion of the broom, the sound of water, and the feel of the cloth." },
      { title: "Orderly Return & Gratitude", durationSec: 180, guidance: "Return all tools cleanly to their precise places. Bow in quiet gratitude for the clean space." }
    ]
  },

  // =========================================================================
  // 8. STOIC ASKESIS & PHILOSOPHICAL DISCIPLINE
  // =========================================================================
  {
    id: "stoic-evening-audit",
    tradition: "stoicism",
    traditionLabel: "Stoic Askesis & Daily Discipline",
    name: "The Stoic Evening Audit (Sextius / Seneca)",
    latinName: "Askesis: Examen Vespertinum",
    category: "philosophical-audit",
    categoryLabel: "Daily Audit & Mental Vigilance",
    durationMin: 10,
    durationLabel: "5 – 15 Minutes Nightly",
    frequency: "Nightly before sleep",
    icon: "moon",
    shortDesc: "Seneca's nightly courtroom of the soul: What bad habit have I cured today? What temptation resisted? In what respect am I better?",
    longDesc: "In the Hellenistic tradition documented by philosopher Pierre Hadot in 'Philosophy as a Way of Life,' philosophy was not an academic theory, but an ongoing spiritual exercise (askesis). Every night in the dark, Seneca questioned his day without concealment, auditing where his temper flared, where his speech was reckless, and how to improve tomorrow.",
    originHistory: "Pythagorean Golden Verses, practiced by Sextius, Seneca (On Anger 3.36), and Marcus Aurelius (Meditations).",
    url: "https://urbanmonastic.org/practices/",
    tags: ["stoic", "seneca", "askesis", "evening-audit", "pierre-hadot"],
    habitBenefits: [
      "Develops fearless self-honesty without paralyzing neurotic self-loathing",
      "Guarantees daily incremental improvement in emotional self-control",
      "Prepares the mind for a restorative, tranquil sleep free of unexamined guilt"
    ],
    scriptureOrQuote: "When the light has been removed and my wife has fallen silent... I examine my entire day and retrace my deeds and words; I hide nothing from myself, I pass nothing by. — Seneca, On Anger 3.36",
    steps: [
      { title: "Retracing the Course of the Day", durationSec: 120, guidance: "Step mentally through your day from waking to nightfall. What situations challenged your calm?" },
      { title: "The Three Inquiries", durationSec: 300, guidance: "Ask yourself: 1. What bad habit did I check today? 2. What temptation did I resist? 3. In what respect am I better?" },
      { title: "Pardon & Strategy for Tomorrow", durationSec: 180, guidance: "Grant yourself philosophical pardon: 'See that you do not repeat this, but for now, I forgive you.' Plan tomorrow's posture." }
    ]
  },
  {
    id: "premeditatio-malorum",
    tradition: "stoicism",
    traditionLabel: "Stoic Askesis & Daily Discipline",
    name: "Premeditatio Malorum (Pre-Meditation of Adversity)",
    latinName: "Premeditatio Malorum",
    category: "philosophical-audit",
    categoryLabel: "Daily Audit & Mental Vigilance",
    durationMin: 10,
    durationLabel: "5 – 10 Minutes Morning",
    frequency: "Daily Morning",
    icon: "shield-check",
    shortDesc: "Mentally rehearsing potential obstacles, rude encounters, and unforeseen trials in the morning so nothing catches you off guard.",
    longDesc: "Premeditatio Malorum is the Stoic cognitive rehearsal of potential hardships. By anticipating difficult people, delays, loss, or pain in advance, the shock of sudden adversity is defused, and the soul is armed with preemptive virtue (patience, courage, and equanimity).",
    originHistory: "Marcus Aurelius (Meditations 2.1: 'When you wake in the morning, tell yourself...'), Epictetus (Enchiridion 4).",
    url: "https://urbanmonastic.org/practices/",
    tags: ["stoic", "marcus-aurelius", "premeditatio", "resilience", "prosochê"],
    habitBenefits: [
      "Immunizes against reactive outrage and surprise when people behave selfishly",
      "Eliminates panic by mentally pre-solving challenging scenarios",
      "Heightens profound daily gratitude for whatever goes smoothly"
    ],
    scriptureOrQuote: "When you wake up in the morning, tell yourself: The people I deal with today will be meddling, ungrateful, arrogant, dishonest, jealous, and surly... none of them can hurt me. — Marcus Aurelius, Meditations 2.1",
    steps: [
      { title: "Morning Awakening & Grounding", durationSec: 60, guidance: "Sit quietly. Notice that a new day of life has been granted to you." },
      { title: "Anticipating Difficult Encounters", durationSec: 300, guidance: "Imagine meeting someone difficult, experiencing traffic, or receiving bad news. See yourself responding with calm reason, dignity, and patience." },
      { title: "Dichotomy of Control Recommitment", durationSec: 180, guidance: "Affirm: 'External events are not in my control; my reasoned response, integrity, and virtues are entirely in my control.'" }
    ]
  }
];

export const CANONICAL_HOURS = [
  { id: "matins", name: "Matins / Vigils", latinName: "Ad Matutinum", hourTime: "05:00", typicalHour: 5, disciplineId: "salah-five-prayers", desc: "Pre-dawn Fajr / Vigils watch & contemplation" },
  { id: "lauds", name: "Lauds (Morning Prayer)", latinName: "Ad Laudes", hourTime: "07:00", typicalHour: 7, disciplineId: "divine-office", desc: "Welcoming the morning light with Psalms & Shema" },
  { id: "terce", name: "Terce (Mid-Morning)", latinName: "Ad Tertiam", hourTime: "09:00", typicalHour: 9, disciplineId: "breath-prayer", desc: "Invocation of the Holy Spirit & morning diligence" },
  { id: "sext", name: "Sext (Midday Prayer)", latinName: "Ad Sextam", hourTime: "12:00", typicalHour: 12, disciplineId: "sandhyavandanam-gayatri", desc: "Midday Sandhya / Dhuhr solar junction recentering" },
  { id: "none", name: "None (Mid-Afternoon)", latinName: "Ad Nonam", hourTime: "15:00", typicalHour: 15, disciplineId: "dhikr-remembrance", desc: "Asr remembrance and mindfulness of mortality" },
  { id: "vespers", name: "Vespers (Evening Prayer)", latinName: "Ad Vesperas", hourTime: "18:00", typicalHour: 18, disciplineId: "lectio-divina", desc: "Lighting lamps, Maghrib evening thanksgiving" },
  { id: "compline", name: "Compline (Night Prayer)", latinName: "Ad Completorium", hourTime: "21:30", typicalHour: 21, disciplineId: "stoic-evening-audit", desc: "The Daily Examen, Isha prayer & Stoic evening audit" }
];
