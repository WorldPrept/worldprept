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
    title: "What to Pack for Bali (2026): Temple Rules, Tourist Tax & Full List",
    metaDesc: "Complete Bali packing list for 2026 — the temple dress rule that gets tourists denied entry, the new tourist levy, scooter license requirements, and what to pack for tropical heat and rainy season.",
    intro: "Most Bali packing lists stop at swimwear and sunscreen. They skip the part where tourists get turned away at temple gates for bare shoulders, fined at scooter checkpoints for missing licenses, and surprised by an entry levy at the airport. Here is what actually matters — the rules first, then the full list.",
    bestTime: "The dry season (April–October) has sunny days, lower humidity and calm seas — July and August are peak. The wet season (November–March) brings short, heavy afternoon downpours but everything stays green, prices drop, and mornings are often clear.",
    weather: "Bali is warm year-round at 26–32°C (79–90°F) with high humidity. Wet-season rain usually arrives as an intense hour, not an all-day soak. Highland areas like Ubud and Munduk run several degrees cooler — evenings there genuinely need a light layer.",
    warning: {
      title: "Before you pack: Bali's rules catch tourists out at the door",
      body: "Bali is easygoing until it very much is not. A set of rules — some ancient, some introduced for tourists in the last few years — are actively enforced, and they affect what goes in your bag.",
      items: [
        "Temple dress is mandatory, not suggested. Shoulders and knees covered, plus a sarong and sash at most temples — visitors in beachwear are refused entry at the gate. Many temples rent sarongs, but having your own means never being turned away.",
        "Bali charges a tourist levy (about IDR 150,000, roughly USD $10) for international visitors — pay it online before arrival or at the airport and keep the receipt.",
        "Riding a scooter legally requires an international driving permit and a helmet. Police checkpoints in Canggu, Ubud and Kuta stop tourists daily, and fines are collected on the spot.",
        "Several sacred mountains and temple areas have restricted access for tourists after repeated incidents of disrespectful behaviour — check current rules before booking a sunrise trek.",
        "Indonesia has some of the harshest drug laws in the world, with long prison sentences even for small amounts. This includes some prescription medications — carry documentation for anything you bring.",
      ],
      footer: "Practical advice: pack one sarong and a light scarf (they solve every temple situation), sort your international driving permit before you fly if you plan to ride, pay the levy online in advance, and keep medicines in original labelled packaging.",
    },
    essentials: [
      "A sarong and sash — the single most useful items in Bali; required at temples and endlessly useful as a beach layer, cover-up or picnic mat",
      "Reef-safe sunscreen — the equatorial sun is intense, and mineral formulas protect the reefs you came to snorkel",
      "Mosquito repellent with DEET or picaridin — dengue exists in Bali year-round, and dusk bites are the risk window",
      "A rain shell or packable poncho — wet-season downpours arrive fast and soak everything in minutes",
      "Grippy sandals plus one pair of real shoes — temple steps, rice-terrace paths and Ubud pavements are slippery when wet",
      "An international driving permit if you plan to ride a scooter — police checkpoints check tourists daily",
      "A dry bag for phone and cash — boat trips, waterfalls and scooter rides in rain all threaten electronics",
      "Stomach remedies and rehydration salts — Bali belly is common; being prepared turns a bad week into a bad day",
    ],
    seasonal: [
      { season: "Dry Season (Apr–Oct)", tip: "Light breathable clothing, strong sun protection and a layer for cool Ubud evenings. Seas are calm — ideal for boat trips to Nusa Penida and the Gilis." },
      { season: "Wet Season (Nov–Mar)", tip: "Quick-dry fabrics, a real rain shell and sandals that survive water. Plan activities for mornings; downpours cluster in the afternoon. Waterfalls are at their most spectacular." },
    ],
    faqs: [
      { q: "What do I need to wear to visit temples in Bali?", a: "Shoulders and knees covered for all visitors, plus a sarong tied at the waist and usually a sash. Beachwear, short shorts and revealing tops get visitors politely but firmly refused at the entrance. Most major temples rent or lend sarongs, but carrying your own lightweight one means you are never caught out." },
      { q: "Do I have to pay a tourist tax to enter Bali?", a: "Yes — Bali charges international visitors a one-time tourist levy of about IDR 150,000 (roughly USD $10) per entry. You can pay online through the official Love Bali system before you travel or at the airport on arrival. Keep the receipt on your phone; checks happen at some attractions." },
      { q: "Can I rent a scooter in Bali without a license?", a: "Rental shops may hand you the keys, but riding legally requires a motorcycle-endorsed international driving permit and a helmet. Police stop tourists at checkpoints daily in busy areas and issue on-the-spot fines. If you would not ride a motorbike at home, Bali traffic is not the place to learn — Grab and Gojek are cheap alternatives." },
      { q: "Is Bali safe for medications — what should I know?", a: "Indonesia has extremely strict drug laws, and some prescription and over-the-counter medications are controlled. Bring only what you need, keep everything in original labelled packaging, carry a copy of your prescription, and check Indonesian rules for anything stronger than basic painkillers before you fly." },
      { q: "What is Bali belly and how do I avoid it?", a: "Traveler's diarrhea from unfamiliar bacteria — the most common Bali ailment. Stick to bottled or filtered water (including for brushing teeth), be sensible with ice and raw food at street level, and pack rehydration salts and loperamide so a bad day does not become a lost week." },
      { q: "Do I need travel insurance for Bali?", a: "Strongly recommended. Scooter accidents are the most common serious incident for visitors, and good hospitals in Denpasar are private and expensive. Check that your policy covers riding a scooter — many only do if you hold the proper license, which is another reason to sort the permit before you go." },
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
    city: "Bangkok",
    country: "Thailand",
    flag: "🇹🇭",
    slug: "bangkok",
    title: "What to Pack for Bangkok (2026): Vape Ban, Temple Rules & Full List",
    metaDesc: "Complete Bangkok packing list for 2026 — including Thailand's strict vape ban (arrests and heavy fines), temple dress codes, what sunscreen is banned in marine parks, and heat-ready essentials.",
    intro: "Bangkok guides tell you to pack light clothing. Very few mention that the vape in your pocket is illegal in Thailand — travelers have been arrested and fined for possession — or that certain sunscreens are banned in Thai marine parks. Here is what to leave at home, what the temples require, and the full heat-ready list.",
    bestTime: "November–February is the cool, dry sweet spot at 25–32°C with low humidity. March–May is brutally hot (well over 35°C). June–October is rainy season — still very visitable, with short heavy downpours rather than washed-out days.",
    weather: "Hot year-round. Cool season: 25–32°C (77–90°F). Hot season: 33–38°C (91–100°F) and humid. Rainy season: 28–34°C with intense afternoon storms. Indoors, malls and the BTS are aggressively air-conditioned — a light layer stops the shivers.",
    warning: {
      title: "Before you pack: vapes are illegal in Thailand — and it is enforced",
      body: "Thailand's rules surprise even experienced travelers, and several of them are actively enforced against tourists. These are the ones that affect your packing.",
      items: [
        "E-cigarettes and vapes are banned outright. Possession can mean confiscation, fines running to hundreds of dollars, and arrest — police do check tourists in nightlife and tourist areas, and importing them carries far heavier penalties. Leave every vaping product at home.",
        "Sunscreens containing oxybenzone, octinoxate, 4-MBC or butylparaben are banned in Thailand's marine national parks to protect coral — fines can be steep. Pack a mineral, reef-safe formula if your trip includes islands or snorkeling.",
        "Temple dress codes are enforced at the Grand Palace and major temples: shoulders and knees covered for everyone, no see-through fabrics, shoes off inside. Guards turn away visitors in beachwear daily.",
        "Disrespecting the monarchy is a serious criminal offence in Thailand — this includes defacing currency, which carries the King's image. Treat banknotes with care; never step on a dropped note to stop it blowing away.",
        "Some common medications are controlled in Thailand — check anything containing codeine or strong stimulants before you fly, and carry prescriptions in original packaging.",
      ],
      footer: "Practical advice: leave all vaping products at home entirely — no exceptions for personal use. Pack reef-safe sunscreen, one temple-appropriate outfit, and slip-on shoes for the constant on-off at temples.",
    },
    essentials: [
      "Reef-safe mineral sunscreen — the common chemical formulas are banned in marine parks and the tropical sun is fierce",
      "A temple outfit — light trousers or a long skirt plus a shoulder-covering top; guards at the Grand Palace enforce it strictly",
      "Slip-on shoes or sandals — you will remove shoes at every temple and many shops and homes",
      "A packable rain layer or umbrella — rainy-season storms arrive fast and end fast",
      "A light layer for the cold — malls, the BTS Skytrain and restaurants run their air-conditioning at arctic levels",
      "Electrolyte sachets and a refillable bottle — the heat dehydrates you faster than you notice",
      "Mosquito repellent — dengue is present year-round in Thailand, especially in the rainy season",
      "A money belt or front crossbody — Bangkok is safe but pickpocketing exists in crowded markets and on packed transit",
    ],
    seasonal: [
      { season: "Cool Season (Nov–Feb)", tip: "The best months — warm days, comfortable evenings. Light clothing plus one layer for air-conditioned interiors. Book ahead; everyone else knows this is the time too." },
      { season: "Hot Season (Mar–May)", tip: "Genuinely punishing heat. Loose, light-coloured, breathable fabrics only, a hat, and plan indoor or water activities for midday. Songkran (April) means you will get soaked — pack a dry bag." },
      { season: "Rainy Season (Jun–Oct)", tip: "Quick-dry clothing, a compact umbrella and sandals that survive water. Storms are heavy but short — mornings are usually clear, and the city empties of crowds." },
    ],
    faqs: [
      { q: "Can I bring my vape to Thailand?", a: "No. E-cigarettes and vaping products are illegal in Thailand — banned from import, sale and possession. Tourists have been stopped, fined heavily and even arrested, and police do check in tourist and nightlife areas. There is no personal-use exemption. Leave every vaping product at home and buy nicotine gum or patches instead if you need them." },
      { q: "What sunscreen is banned in Thailand?", a: "Sunscreens containing oxybenzone, octinoxate, 4-methylbenzylidene camphor (4-MBC) or butylparaben are banned in Thailand's marine national parks because they damage coral. If your trip includes islands, snorkeling or diving, pack a mineral (zinc/titanium) reef-safe sunscreen — it protects you and avoids a fine." },
      { q: "What should I wear to temples in Bangkok?", a: "Shoulders and knees covered for all visitors, nothing see-through, and shoes off inside buildings. The Grand Palace is the strictest — guards refuse entry for shorts, tank tops and leggings daily. A light pair of trousers and a t-shirt or covered top solves it; carrying a scarf adds flexibility." },
      { q: "Is Bangkok tap water safe to drink?", a: "Stick to bottled or filtered water. Ice in restaurants and hotels is generally fine (it is commercially produced), but fill your bottle from filtered sources. Most hotels and many cafes offer refill stations." },
      { q: "How should I get around Bangkok — and what does it mean for packing?", a: "The BTS Skytrain and MRT are fast, cheap and cold — hence the layer. For tuk-tuks and taxis, insist on the meter or agree a price first. Grab works well. Pack for walking between stations: breathable shoes beat sandals for full days on hot pavement." },
      { q: "Do I need travel insurance for Thailand?", a: "Strongly recommended. Bangkok's private hospitals are excellent but expensive for the uninsured, scooter and traffic accidents are the most common tourist injury, and rainy-season disruption can scramble island transfers and flights." },
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
    city: "Dubai",
    country: "UAE",
    flag: "🇦🇪",
    slug: "dubai",
    title: "What to Pack for Dubai (2026): Dress Codes, Banned Meds & Full List",
    metaDesc: "Complete Dubai packing list for 2026 — the dress code rules that get tourists in trouble, medications that are banned in the UAE (codeine, poppy seeds, CBD), desert heat essentials and what to wear where.",
    intro: "Dubai looks like anywhere-glamorous on Instagram, which is exactly why its rules blindside visitors. Common painkillers can be controlled substances at the border, poppy seeds are prohibited, and dress codes are real in malls and government buildings. Here is what to know before you zip the suitcase.",
    bestTime: "November–March is glorious — warm, sunny, 20–30°C. April and October are hot but workable. June–September is extreme: 40–48°C with humidity on the coast. Summer trips revolve around air-conditioning, pools and indoor attractions.",
    weather: "Winter days: 24–30°C (75–86°F), cooler desert evenings. Summer: 40°C+ (104°F+) with sauna-level humidity — genuinely dangerous for long outdoor exposure. It almost never rains. Every interior is heavily air-conditioned, so a light layer is useful year-round.",
    warning: {
      title: "Before you pack: the UAE bans medications most travelers consider ordinary",
      body: "The UAE has some of the strictest medication and conduct rules that tourists routinely encounter. They are enforced at the airport and in public, and they change what belongs in your bag.",
      items: [
        "Codeine and tramadol — found in many painkillers and cough syrups — are controlled substances in the UAE. Bringing them without prior approval and a doctor's documentation can mean confiscation or worse at the border.",
        "Poppy seeds are prohibited in any form (they can contain opiate traces) — that includes bagels, muffins and baking supplies in your luggage.",
        "CBD and any cannabis-derived product is completely illegal, including oils, gummies and cosmetics that are legal at home. Penalties are severe.",
        "Dress codes apply indoors: shoulders and knees covered in malls, souks and government buildings — signage is posted and staff do enforce it. Swimwear belongs strictly at the beach and pool.",
        "Public behaviour is regulated — public intoxication and excessive public affection can lead to fines or arrest. Alcohol is legal only in licensed venues.",
      ],
      footer: "Practical advice: check every medication against the UAE's controlled list before flying, get prior approval and carry prescriptions for anything on it, leave all CBD products and poppy-seed foods at home, and pack one modest outfit for malls and old-town visits.",
    },
    essentials: [
      "Lightweight modest clothing — loose linen trousers and covered-shoulder tops handle malls, souks and the Old Town in comfort",
      "A shawl or scarf — instant coverage for mosque visits (women will need a headscarf at the Grand Mosque) and cold air-conditioning",
      "Serious sun protection — SPF 50, sunglasses and a hat; the desert sun is intense even in winter",
      "A light layer — interiors are air-conditioned to sweater temperatures year-round",
      "Comfortable closed shoes plus sandals — malls involve kilometres of walking; sand gets scorching",
      "Electrolyte sachets and a large refillable bottle — dehydration sneaks up fast, especially May–September",
      "Modest swimwear for hotel pools and public beaches — save the skimpiest options for private resort areas",
      "Documentation for any prescription medication — original packaging plus the prescription itself",
    ],
    seasonal: [
      { season: "Winter (Nov–Mar)", tip: "The dream window — warm days, cool evenings. Light clothing plus a proper layer for desert nights, which drop surprisingly fast. This is peak season; book early." },
      { season: "Shoulder (Apr & Oct)", tip: "Hot but manageable with midday breaks. Sun protection becomes non-negotiable; plan beach time for mornings." },
      { season: "Summer (May–Sep)", tip: "Extreme heat — 40°C+ days. Pack for an indoor trip: light natural fabrics for dashes between air-conditioning, plus that layer for the cold interiors. Outdoor plans belong at dawn or after dark." },
    ],
    faqs: [
      { q: "What medications are banned in the UAE?", a: "The UAE controls a long list that includes codeine, tramadol, some sleeping pills and strong ADHD medications, and completely prohibits CBD and all cannabis-derived products. Poppy seeds are banned too. Check every medicine against the UAE Ministry of Health controlled list before flying; for controlled items you need prior approval and a doctor's letter, carried with the original packaging." },
      { q: "Is there really a dress code in Dubai?", a: "Yes, and it is posted. In malls, souks and government buildings, shoulders and knees should be covered — staff do remind visitors. Beachwear is fine at beaches and pools and nowhere else. Restaurants and nightlife in international hotels are more relaxed. One modest outfit covers every situation." },
      { q: "Can I drink alcohol in Dubai?", a: "Yes — in licensed venues, which means hotels, licensed restaurants and bars. Drinking in public places and public intoxication are offences. Duty-free allowances exist for bringing alcohol in; consuming it stays private or licensed." },
      { q: "What should women pack for Dubai?", a: "Whatever you would normally wear, plus a scarf and a couple of shoulder-covering options. A headscarf is required only for mosque visits. Maxi dresses, linen trousers and light cover-ups handle the modesty guidance without sacrificing comfort in the heat." },
      { q: "How hot does Dubai actually get?", a: "Summer regularly exceeds 45°C (113°F) with coastal humidity that makes it feel hotter — prolonged outdoor exposure is genuinely unsafe midday. Winter is the reward: 25°C, sunny, perfect. Your packing changes completely depending on which Dubai you are visiting." },
      { q: "Do I need travel insurance for Dubai?", a: "Recommended. Healthcare in Dubai is world-class and priced accordingly for visitors — an ER visit without insurance is painful. It also covers the desert activities (dune bashing, quad biking) that produce most tourist injuries; check adventure sports are included." },
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
    city: "Sydney",
    country: "Australia",
    flag: "🇦🇺",
    slug: "sydney",
    title: "What to Pack for Sydney (2026): Biosecurity Rules, UV & Full List",
    metaDesc: "Complete Sydney packing list for 2026 — Australia's strict biosecurity rules (a tourist was fined about A$2,664 over undeclared McMuffins), the extreme UV problem, reversed seasons and what to bring.",
    intro: "Australia's border is famous for one thing: biosecurity. Undeclared food — even a leftover airport sandwich — can trigger on-the-spot fines running into the thousands; one traveler was famously fined about A$2,664 over two undeclared McMuffins. Add the world's harshest sun and reversed seasons, and Sydney packing deserves five real minutes of thought.",
    bestTime: "October–November (spring) and March–May (autumn) hit the sweet spot: warm, less crowded, great beach days. Summer (December–February) is peak beach season and peak crowds. Winter (June–August) is mild, sunny and cheap.",
    weather: "Seasons are reversed from the Northern Hemisphere. Summer: 25–35°C (77–95°F). Winter: 8–17°C (46–63°F) — brisk mornings, pleasant afternoons. The UV index is extreme even on cool or cloudy days; sunburn in 15 minutes is normal, and it is the thing visitors underestimate most.",
    warning: {
      title: "Before you land: declare everything — Australia's biosecurity is the strictest on earth",
      body: "Australia protects its agriculture with border rules that are enforced without humour. Detector dogs and X-rays screen arriving bags, and the fines are real.",
      items: [
        "All food must be declared on your Incoming Passenger Card — including sealed snacks, fruit from the plane, honey, meat products and that sandwich you forgot about. Undeclared food triggers on-the-spot fines that can run into the thousands of dollars.",
        "A traveler was fined about A$2,664 for two undeclared egg-and-beef McMuffins and a ham croissant picked up in transit — the case made global news precisely because the items were so ordinary.",
        "It is not just food: wooden items, seeds, soil on hiking boots and camping gear must be declared. Dirty boots can be cleaned at the border; undeclared ones can mean a fine.",
        "Declaring is free and painless — officers inspect the item and either wave it through or bin it. The fine is only for failing to declare. When in doubt, tick yes.",
        "Serious or deliberate breaches can escalate to visa cancellation for visitors — Australia has done it.",
      ],
      footer: "Practical advice: eat or bin all food before landing, tick yes to anything you are unsure about on the passenger card, and scrub your hiking boots before you fly. Declaring costs nothing; not declaring costs thousands.",
    },
    essentials: [
      "SPF 50+ sunscreen — Australian UV is the harshest most travelers ever meet; reapply constantly, even on cloudy days",
      "A wide-brimmed hat and UV-rated sunglasses — the slip-slop-slap routine exists for a reason",
      "Swimwear and a quick-dry towel — Bondi, Manly and the harbour pools are the whole point",
      "Reef-safe sunscreen if you are heading to the reef or coastal snorkeling",
      "Comfortable walking shoes — the Bondi-to-Coogee and harbour foreshore walks are unmissable and long",
      "A light rain jacket — Sydney rain arrives in bursts year-round",
      "A warm layer for winter trips and summer evenings — the harbour breeze is cooler than the forecast suggests",
      "A power adapter (Type I) — Australia's plugs are their own thing",
    ],
    seasonal: [
      { season: "Summer (Dec–Feb)", tip: "Beach weather, big crowds, serious sun. Light clothing, maximum sun protection, and swim between the flags — rips are real. Book Bondi-area stays early." },
      { season: "Autumn (Mar–May)", tip: "Arguably the best window: warm ocean, softer sun, thinner crowds. Layers for the evenings; beach days linger into May." },
      { season: "Winter (Jun–Aug)", tip: "Mild and sunny — a jacket and jeans city, not a parka city. Whale-watching season peaks; coastal walks are spectacular and empty." },
      { season: "Spring (Sep–Nov)", tip: "Warming fast. Layers, a light jacket and sunscreen from day one — the UV climbs before the temperature does." },
    ],
    faqs: [
      { q: "What food can I bring into Australia?", a: "Very little, and everything must be declared. Commercially packaged snacks are often allowed after inspection, but meat, fruit, honey, dairy, seeds and eggs are heavily restricted. The rule that matters: declare every food item on your Incoming Passenger Card. Declared items are inspected free of charge; undeclared items trigger on-the-spot fines that can run into the thousands." },
      { q: "What happens if I forget food in my bag at Australian customs?", a: "Detector dogs and X-ray screening catch it, and forgetting is not a defence — travelers have been fined thousands for airport snacks they genuinely forgot, including the famous A$2,664 McMuffin case. Do a full bag sweep before landing and bin anything edible, or declare it." },
      { q: "How strong is the sun in Sydney really?", a: "Stronger than almost anywhere visitors come from — the UV index hits extreme in summer and stays high even on cool, cloudy days. Fair skin can burn in 10–15 minutes. SPF 50+, a hat and sunglasses are daily equipment, not beach equipment." },
      { q: "When is beach season in Sydney — and are the beaches safe?", a: "Roughly October to April, peaking December–February. Ocean beaches have strong rip currents; always swim between the red-and-yellow flags where lifeguards patrol. The harbour pools and netted baths are calm alternatives." },
      { q: "Are Sydney's seasons really opposite to the Northern Hemisphere?", a: "Yes — Christmas is midsummer beach weather; July is the coolest month. It is the single most common packing mistake visitors make. Check the month, not your home hemisphere instincts." },
      { q: "Do I need travel insurance for Australia?", a: "Recommended. Australia's healthcare is excellent but not free for most visitors, and the classic tourist claims — surf injuries, hiking mishaps, reef-trip cancellations — are exactly what a decent policy covers." },
    ],
  },
  singapore: {
    city: "Singapore",
    country: "Singapore",
    flag: "🇸🇬",
    slug: "singapore",
    title: "What to Pack for Singapore (2026): Vape Ban, Gum Rule & Full List",
    metaDesc: "Complete Singapore packing list for 2026 — the vape ban with fines up to S$2,000, the chewing gum import rule, the famous public-order fines, and what to pack for year-round tropical heat.",
    intro: "Singapore is the easiest city in Asia — spotless, safe, everything works. It stays that way because the rules are enforced, and several of them start in your suitcase. Vapes are banned outright, importing chewing gum is prohibited, and the famous fines are real. Here is what to leave at home and what to bring.",
    bestTime: "Singapore is a year-round destination — hot and humid every month. February–April runs slightly drier; November–January is the wettest stretch. Big draws like the Grand Prix (around September–October) spike prices, so book around events.",
    weather: "Hot and humid all year: 26–33°C (79–91°F) with humidity that makes it feel hotter. Rain is frequent, heavy and brief — dramatic afternoon downpours that end within the hour. Indoors, malls and the MRT are air-conditioned to sweater temperatures.",
    warning: {
      title: "Before you pack: vapes are banned in Singapore — and the gum rule is real",
      body: "Singapore's reputation for rules is earned. Several are enforced at the border and on the street, and they directly affect what goes in your bag.",
      items: [
        "E-cigarettes and vapes are completely banned — importing, possessing or using one is an offence, with fines that can reach S$2,000. Airport checks happen. There is no personal-use exemption; leave every vaping product at home.",
        "Importing chewing gum is prohibited (limited therapeutic exceptions aside). You will not be strip-searched for a pack, but bringing gum in is technically an offence — simplest answer: do not pack it.",
        "The famous public-order fines are real and enforced: littering, jaywalking, and eating or drinking on the MRT (fines up to around S$500) all carry penalties. Durian is banned on public transport entirely.",
        "Smoking is only legal in designated areas — lighting up elsewhere draws fines, and the designated zones are marked.",
        "Drug laws are among the harshest in the world, with severe penalties that extend to some medications — check anything containing codeine or strong stimulants before you travel and carry documentation.",
      ],
      footer: "Practical advice: leave vapes and gum at home entirely, finish your coffee before entering the MRT, smoke only at marked zones, and check medications against Singapore's controlled list with prescriptions in original packaging.",
    },
    essentials: [
      "Light, breathable, quick-dry clothing — cotton soaks through by noon; technical fabrics survive the humidity",
      "A compact umbrella — sudden downpours are a lifestyle here, and everyone carries one",
      "A light layer — the MRT, malls and cinemas are air-conditioned to genuinely cold temperatures",
      "Comfortable sandals plus one closed pair — hawker-centre floors and rooftop bars have different standards",
      "An EZ-Link card or contactless credit card — tap straight onto the MRT and buses",
      "A refillable water bottle — the heat is constant, and refill stations are everywhere",
      "Sunscreen — the equatorial sun burns fast even under haze",
      "Nicotine gum or patches if you vape — since the alternative cannot legally enter the country",
    ],
    seasonal: [
      { season: "Drier Months (Feb–Apr)", tip: "Marginally less rain, same heat. Light clothing, sunscreen and the umbrella anyway — Singapore rain ignores forecasts." },
      { season: "Wetter Months (Nov–Jan)", tip: "The monsoon stretch: expect a dramatic downpour most afternoons. Quick-dry everything, waterproof sandals, and plan indoor attractions for the 3–5pm window." },
    ],
    faqs: [
      { q: "Can I bring my vape to Singapore?", a: "No. E-cigarettes and all vaping products are banned in Singapore — importing, possessing or using them is an offence with fines that can reach S$2,000, and checks do happen at the border. There is no allowance for personal use. If you vape, bring nicotine gum or patches instead." },
      { q: "Is chewing gum really illegal in Singapore?", a: "Selling gum is banned and importing it is prohibited, with narrow therapeutic exceptions. Chewing gum you find already in your pocket will not land you in jail, but bringing it in is technically an offence and the simplest move is to leave it out of your bag entirely." },
      { q: "What are the fines in Singapore I should actually worry about?", a: "The everyday ones: eating or drinking on the MRT (up to around S$500), littering, jaywalking and smoking outside designated areas. None of them will ruin your trip if you simply follow the posted signs — Singapore is extremely clear about its rules." },
      { q: "What should I wear in Singapore?", a: "Light and breathable wins — shorts and t-shirts are fine almost everywhere, including most temples' outer areas (cover shoulders and knees to enter mosque and temple interiors). Bring one smarter outfit for rooftop bars and nicer restaurants, and always the layer for arctic air-conditioning." },
      { q: "Is the tap water safe to drink in Singapore?", a: "Yes — Singapore's tap water is safe to drink, one of the few places in Southeast Asia where that is true. Bring a refillable bottle and skip the bottled water entirely." },
      { q: "Do I need travel insurance for Singapore?", a: "Recommended, mainly for medical cover: Singapore's healthcare is superb and priced like it. It is also the sensible backstop if your trip chains Singapore with island hops or cruises where delays cascade." },
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

        {/* More destinations — internal links for SEO discovery */}
        <section style={{ marginBottom:24 }}>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.35rem", color:INK, marginBottom:14 }}>More Packing Guides</h2>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
            {Object.values(PAGES).filter(p => p.slug !== page.slug).map(p => (
              <a key={p.slug} href={`/pack/${p.slug}`} style={{ display:"inline-flex", alignItems:"center", gap:6, background:CREAM, border:`1.5px solid ${BDR}`, borderRadius:100, padding:"8px 14px", textDecoration:"none", fontSize:"0.8rem", fontWeight:600, color:INK }}>
                {p.flag} {p.city}
              </a>
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

