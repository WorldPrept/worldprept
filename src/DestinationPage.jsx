// DestinationPage.jsx — SEO landing page template for WorldPrept
// One page per destination, e.g. /pack/tokyo  →  "What to Pack for Tokyo"
// These pages rank on Google for "what to pack for X" and funnel users into your tool.
//
// HOW IT WORKS:
//   - Each page is built from a data object (see PAGES below)
//   - The page renders SEO-friendly HTML: real headings, real text, real keywords
//   - Every page ends with a big call-to-action button into your main app
//
// SETUP: see SEO-GUIDE.md for the full step-by-step.

import { useEffect } from "react";

// ── Design tokens (match main app)
const T = "#C4623A", TL = "#2C7873", INK = "#1A1410", INKL = "#4A3F35";
const SAND = "#F5EFE0", SANDD = "#EDE4CC", CREAM = "#FDFAF4", BDR = "rgba(26,20,16,0.12)";

// ─────────────────────────────────────────────────────────────────────────────
// PAGE DATA — add one entry per destination. Start with 10, grow to 100+.
// Each entry is everything Google needs to rank the page.
// ─────────────────────────────────────────────────────────────────────────────
const PAGES = {
  tokyo: {
    city: "Tokyo",
    country: "Japan",
    flag: "\ud83c\uddef\ud83c\uddf5",
    slug: "tokyo",
    title: "What to Pack for Tokyo (2026): Banned Medications, Weather & Full List",
    metaDesc: "Complete Tokyo packing list for 2026 \u2014 including the common medications that are illegal in Japan (Adderall, Sudafed), what customs confiscates, seasonal weather, and the essentials first-timers forget.",
    intro: "Most Tokyo packing guides tell you to bring comfortable shoes. Almost none warn you that the cold medicine in your bag may be illegal in Japan \u2014 and that travelers have been detained at customs for it. This guide covers the rules that actually catch people out, plus exactly what to pack by season.",
    bestTime: "Spring (late March\u2013May) for cherry blossoms and autumn (late September\u2013November) for mild weather and fall colour. June is rainy season (tsuyu). July\u2013August is genuinely punishing \u2014 30\u201335\u00b0C with humidity that makes it feel far hotter. Winter is cold but dry and clear, and it is the cheapest, least crowded time to go.",
    weather: "Summer (Jun\u2013Aug): 30\u201335\u00b0C (86\u201395\u00b0F) with very high humidity \u2014 you will sweat through cotton, so pack quick-dry fabrics. Winter (Dec\u2013Feb): 2\u201310\u00b0C (36\u201350\u00b0F), dry and sunny, rarely snowy in the city. Spring and autumn: a comfortable 15\u201322\u00b0C (59\u201372\u00b0F). Indoor heating and air-conditioning are aggressive year-round, so layers matter more than a single heavy piece.",
    warning: {
      title: "Before you pack: some common medications are banned in Japan",
      body: "Japan enforces its drug-import rules strictly, and they catch out ordinary travelers carrying ordinary medicine. Japanese customs does not recognise foreign prescriptions, and there is no tourist exemption.",
      items: [
        "Adderall and Vyvanse (amphetamine-based ADHD medication) are completely prohibited \u2014 there is no permit that makes them legal, even with a valid prescription from your doctor.",
        "Pseudoephedrine \u2014 the active ingredient in Sudafed and many combination cold and flu tablets \u2014 is classified as a stimulant raw material and cannot be brought in for personal use.",
        "Codeine (found in some cough syrups and painkillers) and diphenhydramine (Benadryl) are restricted and can be confiscated at the border.",
        "Ritalin and Concerta (methylphenidate) are allowed only with a Yunyu Kakunin-sho import certificate, which must be applied for well before departure \u2014 typically at least two weeks.",
        "Check the active ingredient, not the brand name. Brands differ by country; the ingredient is what customs screens for.",
      ],
      footer: "Practical advice: check every medication you plan to bring against Japan's current import rules before you fly, carry medicines in original labelled packaging with a copy of your prescription, and if in doubt, contact the Japanese embassy or apply for the import certificate in advance.",
    },
    essentials: [
      "Comfortable, broken-in walking shoes \u2014 Tokyo days routinely hit 15,000\u201325,000 steps and the city is far more walking-heavy than most visitors expect",
      "Slip-on shoes \u2014 you will remove them at temples, some restaurants, ryokan and even certain museums, and laces get tedious fast",
      "A portable eSIM or pocket Wi-Fi \u2014 the metro system is navigable but unforgiving without live data and maps",
      "Cash and a coin purse \u2014 Japan is far more cash-based than visitors assume; many small restaurants, shrines and older shops still refuse cards",
      "An IC card (Suica or Pasmo) \u2014 tap through the metro instead of buying tickets each trip; you can add it to your phone before you arrive",
      "A small hand towel \u2014 many public restrooms have no paper towels or dryers, and locals carry one for exactly this reason",
      "A packable layer \u2014 trains, malls and restaurants are heavily air-conditioned in summer and heated in winter",
      "A foldable tote \u2014 shops charge for bags, and you will accumulate more than you plan to",
    ],
    seasonal: [
      { season: "Spring (Mar\u2013May)", tip: "Light layers, a packable rain jacket and a cardigan for cool evenings. Cherry blossom season draws crowds \u2014 book accommodation months ahead. Mornings and nights are noticeably cooler than afternoons." },
      { season: "Summer (Jun\u2013Aug)", tip: "Rainy season runs through June; July and August are hot and extremely humid. Pack quick-dry, breathable fabrics rather than cotton, a compact umbrella, a hand fan, sunscreen and a refillable water bottle. Heat exhaustion is a genuine risk." },
      { season: "Autumn (Sep\u2013Nov)", tip: "Arguably the best walking weather of the year. A mix of long sleeves and a light jacket covers most days. Typhoon season can linger into September, so a rain layer is still wise." },
      { season: "Winter (Dec\u2013Feb)", tip: "Cold, dry and clear. A warm coat, scarf and thermal base layers are enough \u2014 it rarely snows in central Tokyo. Heated indoor spaces mean you will be removing that coat constantly, so layers beat bulk." },
    ],
    faqs: [
      { q: "Can I bring my prescription medication to Japan?", a: "It depends entirely on the active ingredient. Adderall and Vyvanse are banned outright with no exemption, even with a prescription. Ritalin and Concerta require a Yunyu Kakunin-sho import certificate obtained before you travel. Many other prescriptions are fine in personal quantities. Always check the ingredient against Japan's import rules before flying, and carry medication in its original labelled packaging with a copy of your prescription." },
      { q: "Is Sudafed illegal in Japan?", a: "Products containing pseudoephedrine \u2014 the active ingredient in Sudafed and many cold and flu tablets \u2014 are prohibited from being brought into Japan and can be seized at customs. Check the ingredient list on any cold medicine before you pack it, and buy equivalent remedies at a Japanese pharmacy after you arrive instead." },
      { q: "Do I need cash in Tokyo, or are cards accepted?", a: "Bring cash. Japan is far more cash-based than most visitors expect. Convenience stores, chains and major restaurants take cards, but smaller restaurants, shrines, markets and older shops are frequently cash-only. Withdraw yen from a 7-Eleven or Japan Post ATM, which reliably accept foreign cards." },
      { q: "What shoes should I pack for Tokyo?", a: "Comfortable, broken-in walking shoes are the single most important item \u2014 you will walk far more than you expect. Bring slip-ons or shoes that are easy to remove, because you will take them off at temples, ryokan, some restaurants and certain museums. Avoid brand-new shoes you have not walked in." },
      { q: "How much should I pack for a Tokyo trip?", a: "Pack lighter than you think. Laundry is widely available, luggage storage and coin lockers are everywhere, and you will almost certainly buy things. Tokyo's stations involve a lot of stairs and long transfers, so a bag you can carry comfortably matters more than one that holds everything." },
      { q: "Do I need travel insurance for Japan?", a: "It is strongly recommended. Japan has excellent healthcare, but it is not free for visitors and medical costs for tourists can be significant. Travel insurance also covers trip cancellation, delays and lost luggage, which matter more during typhoon season." },
    ],
  },
  paris: {
    city: "Paris",
    country: "France",
    flag: "🇫🇷",
    slug: "paris",
    title: "What to Pack for Paris: The Ultimate Packing List 2025",
    metaDesc: "Complete Paris packing list with weather tips, what to wear, and essentials. Get your free personalized AI packing list for Paris in 30 seconds.",
    intro: "Paris rewards travelers who pack smart and stylish. The city is walkable, fashion-conscious, and weather can shift fast. Here's exactly what to bring so you blend in and stay comfortable.",
    bestTime: "April–June and September–October offer the best balance of pleasant weather and manageable crowds.",
    weather: "Summers are warm at 20–25°C (68–77°F). Winters hover around 3–8°C (37–46°F), often grey and damp. Spring and autumn are mild but unpredictable.",
    essentials: [
      "Stylish but comfortable walking shoes — Parisians avoid athletic sneakers",
      "A versatile scarf — practical and quintessentially Parisian",
      "A compact umbrella — rain is common year-round",
      "A crossbody anti-theft bag — pickpockets target tourists",
      "One smart outfit — for nicer restaurants with dress codes",
    ],
    seasonal: [
      { season: "Spring (Mar–May)", tip: "Layers and a trench coat; carry an umbrella for sudden showers." },
      { season: "Summer (Jun–Aug)", tip: "Light dresses and linen, sunglasses, and comfortable sandals." },
      { season: "Autumn (Sep–Nov)", tip: "A warm jacket, boots, and a scarf for cooler, crisp days." },
      { season: "Winter (Dec–Feb)", tip: "A wool coat, gloves, and waterproof shoes for cold, damp weather." },
    ],
  },
  bali: {
    city: "Bali",
    country: "Indonesia",
    flag: "🇮🇩",
    slug: "bali",
    title: "What to Pack for Bali: Essential Tropical Packing List 2025",
    metaDesc: "The complete Bali packing list for your tropical getaway. Beach essentials, temple-appropriate clothing, and weather tips. Free AI packing list in 30 seconds.",
    intro: "Bali is hot, humid, and tropical year-round, with a mix of beach days, temple visits, and jungle adventures. Packing light and breathable is key, but a few specific items make all the difference.",
    bestTime: "The dry season (April–October) is ideal, with sunny days and lower humidity. The wet season (November–March) brings short, heavy downpours.",
    weather: "Consistently warm at 26–32°C (79–90°F) all year. High humidity. Expect rain even in the dry season, especially in the afternoons.",
    essentials: [
      "Reef-safe sunscreen — protects you and the coral reefs",
      "A sarong — required to enter most temples",
      "Insect repellent — essential, especially at dusk",
      "Quick-dry clothing — humidity means cotton stays damp",
      "A reusable water bottle with a filter — tap water isn't drinkable",
    ],
    seasonal: [
      { season: "Dry Season (Apr–Oct)", tip: "Light beachwear, sandals, a hat, and plenty of sunscreen." },
      { season: "Wet Season (Nov–Mar)", tip: "Add a packable rain poncho and quick-dry shoes for sudden downpours." },
    ],
  },
  london: {
    city: "London", country: "United Kingdom", flag: "🇬🇧", slug: "london",
    title: "What to Pack for London: Complete 2025 Packing List",
    metaDesc: "The complete packing list for London, England. Weather-matched clothing, rain essentials, and seasonal tips. Free AI-generated packing list in 30 seconds.",
    intro: "London is the world's most-searched destination, and packing for it means one rule above all: be ready for rain at any moment. Layers, waterproofs, and comfortable shoes for endless walking are the foundation of any London trip.",
    bestTime: "May to September offers the warmest, driest weather and long daylight hours. Spring and early autumn are pleasant with fewer crowds.",
    weather: "Mild and changeable year-round. Summers reach 18–24°C (64–75°F), winters hover at 2–8°C (36–46°F). Rain is possible in every season, so always pack a waterproof layer.",
    essentials: [
      "A compact umbrella or packable rain jacket — non-negotiable",
      "Comfortable waterproof walking shoes",
      "Layers you can add or remove as weather shifts",
      "A contactless card or phone — used everywhere, including the Tube",
      "A small daypack for museums and day trips",
    ],
    seasonal: [
      { season: "Spring (Mar–May)", tip: "Layers, a light waterproof jacket, and a scarf for cool mornings." },
      { season: "Summer (Jun–Aug)", tip: "Light layers but keep a rain jacket handy; sunny spells get warm." },
      { season: "Autumn (Sep–Nov)", tip: "A warm waterproof coat, boots, and an umbrella." },
      { season: "Winter (Dec–Feb)", tip: "A warm coat, gloves, hat, and waterproof boots for cold, damp days." },
    ],
  },
  "new-york": {
    city: "New York", country: "USA", flag: "🇺🇸", slug: "new-york",
    title: "What to Pack for New York City: Complete 2025 Packing List",
    metaDesc: "The complete NYC packing list with seasonal clothing, walking essentials, and weather tips. Free AI-generated packing list for New York in 30 seconds.",
    intro: "New York is a walking city with dramatic seasons — sweltering summers and freezing winters. Packing right means dressing for serious mileage on foot and for whatever the season throws at you.",
    bestTime: "April–June and September–November offer the most comfortable temperatures and iconic city scenery.",
    weather: "Summers are hot and humid at 25–33°C (77–91°F). Winters are cold, often below freezing with snow. Spring and fall are mild and ideal for exploring.",
    essentials: [
      "Broken-in comfortable shoes — you'll walk miles every day",
      "A crossbody bag that's easy to manage on the subway",
      "Layers — buildings are heavily heated or air-conditioned",
      "A portable charger for long days out",
      "One smart outfit for nicer restaurants or Broadway shows",
    ],
    seasonal: [
      { season: "Spring (Mar–May)", tip: "Layers and a light jacket; spring weather swings widely." },
      { season: "Summer (Jun–Aug)", tip: "Breathable clothing, sunglasses, and a water bottle for the humidity." },
      { season: "Autumn (Sep–Nov)", tip: "A medium jacket and layers — the best season for walking." },
      { season: "Winter (Dec–Feb)", tip: "A heavy coat, gloves, hat, scarf, and waterproof boots for snow." },
    ],
  },
  bangkok: {
    city: "Bangkok", country: "Thailand", flag: "🇹🇭", slug: "bangkok",
    title: "What to Pack for Bangkok: Tropical City Packing List 2025",
    metaDesc: "The complete Bangkok packing list. Heat-ready clothing, temple-appropriate attire, and tropical essentials. Free AI packing list for Thailand in 30 seconds.",
    intro: "Bangkok is hot, humid, and endlessly energetic. Packing light, breathable clothing is essential, but you'll also need modest options for temples and a few smart pieces for the city's famous rooftop bars.",
    bestTime: "November to February is the cool, dry season and by far the most comfortable time to visit.",
    weather: "Hot and humid year-round at 28–35°C (82–95°F). The rainy season (May–October) brings short, heavy afternoon downpours.",
    essentials: [
      "Lightweight, breathable, quick-dry clothing",
      "Shoulder and knee coverage for visiting temples",
      "Sandals plus one pair of closed shoes for rooftop bars",
      "Strong insect repellent and sunscreen",
      "A small umbrella or poncho for sudden rain",
    ],
    seasonal: [
      { season: "Cool Season (Nov–Feb)", tip: "Light clothing; evenings can feel pleasant, so bring one light layer." },
      { season: "Hot Season (Mar–May)", tip: "The lightest breathable fabrics, a hat, and constant hydration." },
      { season: "Rainy Season (Jun–Oct)", tip: "Add a quick-dry poncho and waterproof sandals for downpours." },
    ],
  },
  barcelona: {
    city: "Barcelona", country: "Spain", flag: "🇪🇸", slug: "barcelona",
    title: "What to Pack for Barcelona: Complete 2025 Packing List",
    metaDesc: "The complete Barcelona packing list with beach and city essentials, weather tips, and what to wear. Free AI packing list for Spain in 30 seconds.",
    intro: "Barcelona blends beach and city, so your packing list spans swimwear and stylish evening looks. The Mediterranean climate is mild, but you'll want sun protection and comfortable shoes for cobblestone streets.",
    bestTime: "May, June, and September offer warm weather, sea-swimming temperatures, and thinner crowds than peak summer.",
    weather: "Warm Mediterranean climate. Summers reach 28–31°C (82–88°F), winters are mild at 9–15°C (48–59°F). Plenty of sunshine year-round.",
    essentials: [
      "Comfortable shoes for cobblestone streets and lots of walking",
      "Swimwear and a beach towel for the city beaches",
      "Sunglasses, hat, and sunscreen",
      "A crossbody anti-theft bag — pickpockets are common on La Rambla",
      "A smart-casual outfit for tapas bars and nightlife",
    ],
    seasonal: [
      { season: "Spring (Mar–May)", tip: "Layers and a light jacket; warm days, cooler evenings." },
      { season: "Summer (Jun–Aug)", tip: "Light clothing, swimwear, and strong sun protection." },
      { season: "Autumn (Sep–Nov)", tip: "Light layers; September is still warm enough to swim." },
      { season: "Winter (Dec–Feb)", tip: "A medium jacket and layers for mild but cooler days." },
    ],
  },
  rome: {
    city: "Rome", country: "Italy", flag: "🇮🇹", slug: "rome",
    title: "What to Pack for Rome: Complete 2025 Packing List",
    metaDesc: "The complete Rome packing list with weather tips, Vatican dress code essentials, and what to wear. Free AI packing list for Italy in 30 seconds.",
    intro: "Rome is an open-air museum best explored on foot over cobblestones. Pack comfortable shoes, modest clothing for the Vatican and churches, and sun protection for hot Italian summers.",
    bestTime: "April–June and September–October bring warm, comfortable weather and lighter crowds than the peak summer heat.",
    weather: "Hot summers at 30–35°C (86–95°F), mild winters at 8–15°C (46–59°F). Spring and autumn are warm and pleasant.",
    essentials: [
      "Comfortable shoes built for cobblestones",
      "Shoulder and knee coverage for the Vatican and churches",
      "A refillable water bottle for the free public fountains",
      "Sunglasses, hat, and sunscreen for the summer heat",
      "A crossbody bag to deter pickpockets at busy sites",
    ],
    seasonal: [
      { season: "Spring (Mar–May)", tip: "Light layers and a light jacket for cool evenings." },
      { season: "Summer (Jun–Aug)", tip: "Breathable fabrics, a hat, and plenty of sun protection." },
      { season: "Autumn (Sep–Nov)", tip: "Layers and a light jacket; ideal sightseeing weather." },
      { season: "Winter (Dec–Feb)", tip: "A warm coat and umbrella for mild but occasionally rainy days." },
    ],
  },
  dubai: {
    city: "Dubai", country: "UAE", flag: "🇦🇪", slug: "dubai",
    title: "What to Pack for Dubai: Complete 2025 Packing List",
    metaDesc: "The complete Dubai packing list with heat-ready clothing, modest dress tips, and desert essentials. Free AI packing list for the UAE in 30 seconds.",
    intro: "Dubai pairs extreme desert heat with ultra air-conditioned malls and a culture that values modest dress. Pack light, breathable clothing alongside respectful coverage and a layer for the indoor chill.",
    bestTime: "November to March offers warm, comfortable weather perfect for the beach and outdoor sightseeing.",
    weather: "Extremely hot summers reaching 40–45°C (104–113°F). Winters are warm and pleasant at 20–30°C (68–86°F). Very little rain.",
    essentials: [
      "Light, breathable, loose-fitting clothing",
      "Modest options — covered shoulders and knees for malls and mosques",
      "A light layer for heavily air-conditioned interiors",
      "Strong sunscreen, sunglasses, and a hat",
      "Swimwear for beaches and hotel pools (cover up away from them)",
    ],
    seasonal: [
      { season: "Winter (Nov–Mar)", tip: "Light clothing by day, a light layer for cooler desert evenings." },
      { season: "Summer (Apr–Oct)", tip: "The lightest fabrics, constant hydration, and minimal time outdoors midday." },
    ],
  },
  istanbul: {
    city: "Istanbul", country: "Turkey", flag: "🇹🇷", slug: "istanbul",
    title: "What to Pack for Istanbul: Complete 2025 Packing List",
    metaDesc: "The complete Istanbul packing list with mosque-appropriate attire, weather tips, and walking essentials. Free AI packing list for Turkey in 30 seconds.",
    intro: "Istanbul straddles two continents and blends mosque visits with bustling bazaars and steep, hilly streets. Pack comfortable shoes, modest clothing with a scarf for mosques, and layers for changeable weather.",
    bestTime: "April–May and September–November offer mild temperatures and fewer crowds.",
    weather: "Hot summers at 25–30°C (77–86°F), cool damp winters at 4–10°C (39–50°F). Spring and autumn are mild and comfortable.",
    essentials: [
      "Comfortable shoes for steep, cobbled hills",
      "A scarf to cover hair and shoulders in mosques (women)",
      "Knee-covering clothing for religious sites",
      "Layers and a light waterproof jacket",
      "A crossbody bag for crowded bazaars",
    ],
    seasonal: [
      { season: "Spring (Mar–May)", tip: "Layers and a light jacket for cool, sometimes rainy days." },
      { season: "Summer (Jun–Aug)", tip: "Light breathable clothing plus a scarf for mosque visits." },
      { season: "Autumn (Sep–Nov)", tip: "A medium jacket and layers as temperatures drop." },
      { season: "Winter (Dec–Feb)", tip: "A warm waterproof coat for cold, damp, occasionally snowy weather." },
    ],
  },
  amsterdam: {
    city: "Amsterdam", country: "Netherlands", flag: "🇳🇱", slug: "amsterdam",
    title: "What to Pack for Amsterdam: Complete 2025 Packing List",
    metaDesc: "The complete Amsterdam packing list with rain gear, cycling-friendly clothing, and weather tips. Free AI packing list for the Netherlands in 30 seconds.",
    intro: "Amsterdam is a flat, bike-friendly, canal-laced city where rain can arrive any day. Pack waterproof layers, comfortable shoes or cycling-friendly clothes, and dress for wind off the water.",
    bestTime: "April–May (tulip season) and September offer mild weather and beautiful scenery with manageable crowds.",
    weather: "Mild and wet. Summers reach 18–23°C (64–73°F), winters hover at 2–7°C (36–45°F). Rain and wind are common year-round.",
    essentials: [
      "A waterproof jacket — rain is frequent and often sudden",
      "Comfortable shoes or sneakers for walking and cycling",
      "Layers for wind off the canals",
      "A compact umbrella (though wind can render it useless)",
      "A secure bag for crowded markets and trams",
    ],
    seasonal: [
      { season: "Spring (Mar–May)", tip: "Layers, a waterproof jacket, and a scarf for tulip-season chill." },
      { season: "Summer (Jun–Aug)", tip: "Light layers but always a rain jacket; evenings get cool." },
      { season: "Autumn (Sep–Nov)", tip: "A warm waterproof coat and boots for wet, windy days." },
      { season: "Winter (Dec–Feb)", tip: "A warm coat, gloves, and waterproof boots for cold, damp weather." },
    ],
  },
  lisbon: {
    city: "Lisbon", country: "Portugal", flag: "🇵🇹", slug: "lisbon",
    title: "What to Pack for Lisbon: Complete 2025 Packing List",
    metaDesc: "The complete Lisbon packing list with hill-walking shoes, sun protection, and weather tips. Free AI packing list for Portugal in 30 seconds.",
    intro: "Lisbon is a sunny, hilly city of cobblestones and viewpoints. Pack grippy comfortable shoes for the steep streets, sun protection, and light layers for breezy Atlantic evenings.",
    bestTime: "March–June and September–October offer warm sun, comfortable temperatures, and fewer crowds.",
    weather: "Mild and sunny. Summers reach 25–30°C (77–86°F), winters stay mild at 8–15°C (46–59°F). One of Europe's sunniest capitals.",
    essentials: [
      "Shoes with good grip for steep, slippery cobblestones",
      "Sunglasses, hat, and sunscreen",
      "Light layers for cool Atlantic breezes in the evening",
      "A light jacket for winter and shoulder seasons",
      "A crossbody bag for tram 28 and busy viewpoints",
    ],
    seasonal: [
      { season: "Spring (Mar–May)", tip: "Light layers and a jacket for warm days and cooler evenings." },
      { season: "Summer (Jun–Aug)", tip: "Light clothing, strong sun protection, and comfortable sandals." },
      { season: "Autumn (Sep–Nov)", tip: "Layers and a light jacket; September stays warm and sunny." },
      { season: "Winter (Dec–Feb)", tip: "A medium jacket and a waterproof layer for mild, occasionally rainy days." },
    ],
  },
  cancun: {
    city: "Cancún", country: "Mexico", flag: "🇲🇽", slug: "cancun",
    title: "What to Pack for Cancún: Beach & Resort Packing List 2025",
    metaDesc: "The complete Cancún packing list with beach essentials, reef-safe sunscreen, and tropical tips. Free AI packing list for Mexico in 30 seconds.",
    intro: "Cancún is all about sun, sea, and resort life on the Caribbean coast. Pack plenty of beachwear, reef-safe sunscreen, and a few nicer pieces for resort dinners and nightlife.",
    bestTime: "December to April is the dry season with sunny skies and lower humidity — ideal beach weather.",
    weather: "Hot and tropical year-round at 27–33°C (81–91°F). Hurricane season runs June–November with higher humidity and rain.",
    essentials: [
      "Reef-safe sunscreen — required to protect the coral reefs",
      "Multiple swimsuits and a quick-dry beach towel",
      "Sandals plus water shoes for rocky spots and cenotes",
      "Insect repellent for evenings and jungle excursions",
      "A light cover-up and one smart outfit for resort dining",
    ],
    seasonal: [
      { season: "Dry Season (Dec–Apr)", tip: "Beachwear, sandals, hat, and plenty of reef-safe sunscreen." },
      { season: "Wet Season (Jun–Nov)", tip: "Add a packable rain jacket and quick-dry clothing for humidity and storms." },
    ],
  },
  sydney: {
    city: "Sydney", country: "Australia", flag: "🇦🇺", slug: "sydney",
    title: "What to Pack for Sydney: Complete 2025 Packing List",
    metaDesc: "The complete Sydney packing list with beach gear, sun protection, and seasonal tips. Note: seasons are reversed! Free AI packing list for Australia in 30 seconds.",
    intro: "Sydney mixes world-famous beaches with a vibrant harbour city. Remember the seasons are reversed from the Northern Hemisphere — and Australia's sun is intense, so strong sun protection is essential year-round.",
    bestTime: "September–November (spring) and March–May (autumn) offer warm, comfortable weather and good beach days.",
    weather: "Summers (Dec–Feb) are warm to hot at 25–35°C (77–95°F). Winters (Jun–Aug) are mild at 8–17°C (46–63°F). The UV index is high even on cool days.",
    essentials: [
      "High-SPF sunscreen — Australian sun is exceptionally strong",
      "Swimwear, a beach towel, and a wide-brimmed hat",
      "Sunglasses with UV protection",
      "Comfortable shoes for coastal walks like Bondi to Coogee",
      "A light layer for cooler harbour evenings",
    ],
    seasonal: [
      { season: "Summer (Dec–Feb)", tip: "Beachwear, light clothing, and serious sun protection." },
      { season: "Autumn (Mar–May)", tip: "Light layers and a jacket for cooler evenings; great beach weather lingers." },
      { season: "Winter (Jun–Aug)", tip: "A warm jacket and layers — mild but cool, especially at night." },
      { season: "Spring (Sep–Nov)", tip: "Layers, a light jacket, and sunscreen as it warms up." },
    ],
  },
  singapore: {
    city: "Singapore", country: "Singapore", flag: "🇸🇬", slug: "singapore",
    title: "What to Pack for Singapore: Tropical City Packing List 2025",
    metaDesc: "The complete Singapore packing list with heat-ready clothing, rain gear, and city essentials. Free AI packing list for Singapore in 30 seconds.",
    intro: "Singapore is hot, humid, and impeccably modern, with frequent tropical downpours and strong air-conditioning indoors. Pack light breathable clothing, a compact umbrella, and a light layer for chilly malls and restaurants.",
    bestTime: "February to April is slightly drier, though Singapore is a great year-round destination.",
    weather: "Hot and humid all year at 26–33°C (79–91°F). Rain is frequent and often heavy but brief, especially November–January.",
    essentials: [
      "Light, breathable, quick-dry clothing",
      "A compact umbrella — sudden downpours are routine",
      "A light layer for aggressive indoor air-conditioning",
      "Comfortable sandals plus closed shoes for nicer venues",
      "Sunscreen and a refillable water bottle",
    ],
    seasonal: [
      { season: "Drier Months (Feb–Apr)", tip: "Light clothing, sunscreen, and a small umbrella just in case." },
      { season: "Wetter Months (Nov–Jan)", tip: "Always carry an umbrella or poncho; pack extra quick-dry layers." },
    ],
  },
};

// ── Reusable styles
const wrap = { maxWidth: 760, margin: "0 auto", padding: "0 16px" };

function CTA({ slug }) {
  return (
    <a href="/" style={{ display:"block", background:INK, color:SAND, borderRadius:16, padding:"24px 22px", textDecoration:"none", textAlign:"center", margin:"28px 0" }}>
      <p style={{ fontSize:"0.65rem", fontWeight:800, letterSpacing:"1.5px", textTransform:"uppercase", color:T, marginBottom:8 }}>✈️ Free · No login</p>
      <p style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.4rem", fontWeight:700, marginBottom:6 }}>Get your personalized packing list</p>
      <p style={{ fontSize:"0.82rem", opacity:0.6, marginBottom:16, lineHeight:1.5 }}>Weather-matched to your exact travel dates, with insurance and local events. Takes 30 seconds.</p>
      <span style={{ display:"inline-block", background:T, color:"#fff", padding:"12px 28px", borderRadius:100, fontWeight:700, fontSize:"0.9rem" }}>Build my list →</span>
    </a>
  );
}

export default function DestinationPage({ slug = "tokyo" }) {
  const page = PAGES[slug] || PAGES.tokyo;

  // Set SEO meta tags + structured data on mount
  useEffect(() => {
    document.title = page.title;
    const setMeta = (name, content, prop) => {
      const attr = prop ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    setMeta("description", page.metaDesc);
    setMeta("og:title", page.title, true);
    setMeta("og:description", page.metaDesc, true);
    setMeta("og:type", "article", true);

    // JSON-LD structured data — helps Google show rich results
    let ld = document.getElementById("ld-json");
    if (!ld) { ld = document.createElement("script"); ld.id = "ld-json"; ld.type = "application/ld+json"; document.head.appendChild(ld); }
    const graph = [{
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": page.title,
      "description": page.metaDesc,
      "about": { "@type": "Place", "name": `${page.city}, ${page.country}` },
    }];
    if (page.faqs && page.faqs.length) {
      graph.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": page.faqs.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a },
        })),
      });
    }
    ld.textContent = JSON.stringify(graph);

    // Canonical URL — prevents duplicate-content dilution
    let canon = document.querySelector('link[rel="canonical"]');
    if (!canon) { canon = document.createElement("link"); canon.setAttribute("rel","canonical"); document.head.appendChild(canon); }
    canon.setAttribute("href", `https://worldprept.com/pack/${page.slug}`);
  }, [page]);

  return (
    <div style={{ background:SAND, minHeight:"100vh", fontFamily:"'DM Sans',system-ui,sans-serif", paddingBottom:60 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        a:hover{opacity:0.92}
      `}</style>

      {/* Hero */}
      <div style={{ background:INK, color:SAND, padding:"40px 16px 36px", textAlign:"center" }}>
        <div style={wrap}>
          <a href="/" style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(196,98,58,0.22)", border:"1px solid rgba(196,98,58,0.4)", padding:"4px 12px", borderRadius:100, fontSize:"0.62rem", fontWeight:700, letterSpacing:"1.5px", textTransform:"uppercase", color:T, marginBottom:16, textDecoration:"none" }}>
            ✈️ WorldPrept
          </a>
          <div style={{ fontSize:"2.4rem", marginBottom:10 }}>{page.flag}</div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.8rem,5vw,2.7rem)", lineHeight:1.15, marginBottom:10 }}>
            What to Pack for<br/><span style={{ color:T }}>{page.city}</span>
          </h1>
          <p style={{ fontSize:"0.85rem", opacity:0.55, maxWidth:480, margin:"0 auto", lineHeight:1.6 }}>{page.intro}</p>
        </div>
      </div>

      <div style={wrap}>
        {/* Critical warning — the differentiated content */}
        {page.warning && (
          <section style={{ marginTop:28, marginBottom:24, background:"rgba(196,98,58,0.07)", border:"1.5px solid rgba(196,98,58,0.35)", borderRadius:14, padding:"20px 22px" }}>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.3rem", color:INK, marginBottom:10 }}>⚠️ {page.warning.title}</h2>
            <p style={{ fontSize:"0.9rem", color:INKL, lineHeight:1.7, marginBottom:14 }}>{page.warning.body}</p>
            <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:14 }}>
              {page.warning.items.map((it, i) => (
                <div key={`w${i}`} style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
                  <span style={{ color:T, fontWeight:800, flexShrink:0 }}>•</span>
                  <span style={{ fontSize:"0.88rem", color:INKL, lineHeight:1.6 }}>{it}</span>
                </div>
              ))}
            </div>
            <p style={{ fontSize:"0.85rem", color:INKL, lineHeight:1.7, fontStyle:"italic", paddingTop:12, borderTop:`1px solid ${BDR}` }}>{page.warning.footer}</p>
          </section>
        )}

        {/* Top CTA */}
        <CTA slug={page.slug} />

        {/* Best time to visit */}
        <section style={{ marginBottom:24 }}>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.35rem", color:INK, marginBottom:10 }}>Best Time to Visit {page.city}</h2>
          <p style={{ fontSize:"0.92rem", color:INKL, lineHeight:1.7 }}>{page.bestTime}</p>
        </section>

        {/* Weather */}
        <section style={{ marginBottom:24, background:"rgba(44,120,115,0.06)", border:"1px solid rgba(44,120,115,0.18)", borderRadius:14, padding:"18px 20px" }}>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.2rem", color:TL, marginBottom:8 }}>🌤️ {page.city} Weather</h2>
          <p style={{ fontSize:"0.9rem", color:INKL, lineHeight:1.7 }}>{page.weather}</p>
        </section>

        {/* Essentials */}
        <section style={{ marginBottom:24 }}>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.35rem", color:INK, marginBottom:14 }}>{page.city} Packing Essentials</h2>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {page.essentials.map((item, i) => (
              <div key={i} style={{ display:"flex", gap:12, alignItems:"flex-start", background:CREAM, border:`1px solid ${BDR}`, borderRadius:11, padding:"13px 15px" }}>
                <span style={{ color:T, fontWeight:800, fontSize:"0.9rem", flexShrink:0 }}>{String(i+1).padStart(2,"0")}</span>
                <span style={{ fontSize:"0.88rem", color:INKL, lineHeight:1.55 }}>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Mid CTA */}
        <CTA slug={page.slug} />

        {/* Seasonal */}
        <section style={{ marginBottom:24 }}>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.35rem", color:INK, marginBottom:14 }}>What to Wear in {page.city} by Season</h2>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {page.seasonal.map((s, i) => (
              <div key={i} style={{ background:CREAM, border:`1px solid ${BDR}`, borderRadius:11, padding:"14px 16px" }}>
                <p style={{ fontSize:"0.8rem", fontWeight:700, color:T, marginBottom:4 }}>{s.season}</p>
                <p style={{ fontSize:"0.86rem", color:INKL, lineHeight:1.6 }}>{s.tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ for SEO */}
        <section style={{ marginBottom:24 }}>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.35rem", color:INK, marginBottom:14 }}>Frequently Asked Questions</h2>
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            {(page.faqs && page.faqs.length ? page.faqs : [
              { q:`How much should I pack for ${page.city}?`, a:"It depends on your trip length and luggage. WorldPrept generates a list matched to your exact dates and bag size in 30 seconds — free." },
              { q:`Do I need travel insurance for ${page.country}?`, a:"Travel insurance is strongly recommended for international trips. WorldPrept lets you compare options side by side for your dates." },
            ]).map((f, i) => (
              <div key={`faq${i}`}>
                <p style={{ fontSize:"0.92rem", fontWeight:700, color:INK, marginBottom:5 }}>{f.q}</p>
                <p style={{ fontSize:"0.86rem", color:INKL, lineHeight:1.7 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <CTA slug={page.slug} />

        {/* Footer */}
        <footer style={{ textAlign:"center", paddingTop:20, borderTop:`1px solid ${BDR}`, marginTop:8 }}>
          <a href="/" style={{ fontSize:"0.8rem", fontWeight:700, color:T, textDecoration:"none" }}>✈️ WorldPrept</a>
          <p style={{ fontSize:"0.68rem", color:INKL, opacity:0.6, marginTop:6 }}>Free AI travel packing lists, insurance comparison & local guides for every destination.</p>
        </footer>
      </div>
    </div>
  );
}
