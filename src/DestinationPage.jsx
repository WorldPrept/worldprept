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
    flag: "\ud83c\uddeb\ud83c\uddf7",
    slug: "paris",
    title: "What to Pack for Paris (2026): Scams, Metro Rules & Full List",
    metaDesc: "Complete Paris packing list for 2026 — the tourist scams that cluster around the Eiffel Tower and Louvre, the metro ticket rule that gets people fined, church dress codes, and what to actually bring.",
    intro: "Paris is safe, but it is Europe's pickpocket capital, and the scams are organised and specific. Add a metro rule that fines tourists who throw their ticket away too early and church dress codes that turn people away, and there are a handful of things genuinely worth knowing before you pack.",
    bestTime: "April to June and September to October: mild weather, long light evenings, gardens at their best. July and August are hot, crowded and many small businesses close for holidays. Winter is grey and cold but the city is quieter and cheaper.",
    weather: "Summer runs 20 to 30 C (68 to 86 F) and can spike hotter, with limited air conditioning in older buildings. Winter sits around 3 to 8 C (37 to 46 F), damp rather than snowy. Spring and autumn hover around 12 to 20 C (54 to 68 F) with sudden showers, so a compact rain layer earns its place year-round.",
    warning: {
      title: "The Paris scams and rules that catch tourists out",
      body: "These are documented, organised and concentrated in the places you are most likely to visit. Knowing the shape of them is most of the defence.",
      items: [
        "The petition scam: someone asks you to sign for a charity while an accomplice works your pockets. It clusters around the Eiffel Tower, Louvre and Sacre-Coeur.",
        "The friendship bracelet scam: a stranger ties a string to your wrist on the Sacre-Coeur steps, then demands payment. Keep your hands down and keep walking.",
        "The gold ring scam: someone picks up a ring and insists you dropped it, then asks for money. It is a distraction routine.",
        "Keep your metro ticket until you have physically left the station. Inspectors check inside the exits, and travelling without a valid ticket carries an on-the-spot fine even if you paid.",
        "Major churches including Notre-Dame and Sacre-Coeur ask visitors to cover shoulders and knees, and staff do turn people away in summer.",
      ],
      footer: "Practical version: front-worn crossbody bag, nothing in back pockets, decline every stranger offering something, hold your ticket until you are on the street, and carry a light scarf for churches.",
    },
    essentials: [
      "A front-worn anti-theft crossbody bag. Back pockets and open totes are how the vast majority of tourist theft happens here",
      "Broken-in walking shoes with grip. Paris days routinely hit 20,000 steps and the cobbles punish new shoes",
      "A light scarf or shawl for covering shoulders in churches, and for cool evenings",
      "A compact umbrella or rain shell. Showers arrive without warning in spring and autumn",
      "A contactless card plus a Navigo Easy card for the metro. Paper tickets are being phased out",
      "A reusable water bottle. Ask for une carafe d'eau in restaurants and tap water is free by law",
      "One smarter outfit. Parisians dress simply but well, and nicer restaurants notice athleisure",
      "A passport photocopy stored separately from the original",
    ],
    seasonal: [
      { season: "Spring (Mar-May)", tip: "Layers, a rain shell and a scarf. Gardens peak, terraces open, evenings still cool enough for a jacket." },
      { season: "Summer (Jun-Aug)", tip: "Light breathable clothing, sunscreen and a water bottle. Many older hotels have no air conditioning, so check before booking. Crowds and pickpocket activity both peak." },
      { season: "Autumn (Sep-Oct)", tip: "The local's favourite: mild, golden, quieter. A mid-layer plus rain shell covers most days." },
      { season: "Winter (Nov-Feb)", tip: "Proper coat, scarf, gloves and waterproof shoes. Damp cold cuts deeper than the numbers suggest, and museums are blissfully empty." },
    ],
    faqs: [
      { q: "What are the most common tourist scams in Paris?", a: "The petition scam, the friendship bracelet scam on the Sacre-Coeur steps, and the gold ring trick. All three are distraction routines designed to occupy your hands and attention while a second person works your bag or pockets. They concentrate around the Eiffel Tower, Louvre, Sacre-Coeur and busy metro stations. Decline politely, keep moving, and keep valuables in a front-worn bag." },
      { q: "Do I need to keep my metro ticket in Paris?", a: "Yes, until you have physically left the station. Inspectors check inside exits and on platforms, and riding without a valid ticket you can produce carries an on-the-spot fine even if you paid for it. Contactless payment and a Navigo Easy card are simpler than paper tickets, which are being phased out." },
      { q: "Is there a dress code for churches in Paris?", a: "Major churches including Notre-Dame and Sacre-Coeur ask visitors to cover shoulders and knees, and staff enforce it, especially in summer. A light scarf solves it instantly and packs to nothing. There is no dress code for the city generally, though Parisians dress simply and well, so one smarter outfit is worth carrying for nicer restaurants." },
      { q: "How much walking should I expect in Paris?", a: "A lot. Twenty thousand steps a day is normal for a sightseeing itinerary, largely on cobblestones and metro stairs. Broken-in shoes with grip matter more than any other single item, and new shoes are the most common regret visitors report." },
      { q: "Is tap water free in Paris restaurants?", a: "Yes. Ask for une carafe d'eau and restaurants are required to provide tap water free of charge. It saves a surprising amount over a week, and the city also has public drinking fountains, including the sparkling-water ones in some parks." },
      { q: "Do I need travel insurance for France?", a: "Recommended. Healthcare is excellent but not free for most visitors, and the most common claims in Paris are theft and trip disruption rather than medical. Check that your policy covers theft from the person, not just from accommodation." },
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
  "new-york": {
    city: "New York",
    country: "USA",
    flag: "\ud83c\uddfa\ud83c\uddf8",
    slug: "new-york",
    title: "What to Pack for New York (2026): OMNY, Tipping & Full List",
    metaDesc: "Complete New York City packing list for 2026 — the MetroCard is gone and OMNY replaced it, the 18-minute tap rule that double-charges you, tipping norms visitors get wrong, Times Square scams, and what to bring.",
    intro: "New York punishes two things: bad shoes and not knowing how the subway charges you. The MetroCard was retired at the start of 2026, tapping the same card twice too quickly costs you a second fare, and tipping here is not optional the way it is elsewhere. Here is what to pack and what to know first.",
    bestTime: "April to June and September to early November: mild, walkable and the parks look their best. Summer is hot, humid and crowded. Winter is cold and grey but the city is at its most cinematic between Thanksgiving and New Year, with hotel prices spiking to match.",
    weather: "Real four-season extremes. Summer runs 25 to 33 C (77 to 91 F) with heavy humidity and brutally hot subway platforms. Winter sits around minus 3 to 5 C (27 to 41 F) with wind funnelling between buildings that makes it feel far colder. Spring and autumn are 12 to 22 C (54 to 72 F) and close to perfect. Indoor heating and air conditioning are both aggressive, so layers matter more than any single heavy item.",
    warning: {
      title: "What first-time visitors get wrong in New York",
      body: "None of these will get you fined, but they will cost you money, time, or the goodwill of eight million people moving fast around you.",
      items: [
        "The yellow MetroCard is finished. New sales ended at the close of 2025 and the system now runs on OMNY, so just tap any contactless card or phone wallet at the turnstile. There is nothing to buy in advance.",
        "The 18-minute rule: if you tap the same card or device at the same station again within about 18 minutes, you are charged a second fare. Each traveller in your group needs their own card or device.",
        "Check the uptown or downtown signage before you go down the stairs. Many stations have separate entrances per direction and there is no way to cross over once you are through the turnstile.",
        "Tipping is part of the price here, not a bonus: roughly 18 to 20 percent at restaurants, a dollar or two per drink at bars, and something for hotel housekeeping. Under-tipping reads as rude rather than thrifty.",
        "Times Square runs a set of soft scams: costumed characters who demand payment after a photo, free CDs pressed into your hands, and three-card-monte tables. Decline and keep walking.",
        "Jaywalking was decriminalised in late 2024, so crossing mid-block is legal now. Cars, cyclists and delivery e-bikes still do not stop, and bikes routinely travel against traffic on one-way streets.",
      ],
      footer: "Practical version: one contactless card per person for OMNY, check uptown or downtown before descending, budget 18 to 20 percent for tips, ignore anyone offering you something in Times Square, and look both ways twice.",
    },
    essentials: [
      "Genuinely broken-in walking shoes. Twenty to twenty-five thousand steps a day is normal here and the pavement is unforgiving concrete",
      "A contactless card or phone wallet per traveller for OMNY subway and bus taps",
      "Layers built around a mid-layer you can carry, since interiors are heated or air conditioned to extremes year-round",
      "A slim crossbody bag worn in front for the subway, Times Square and Union Square, where pickpockets work crowds",
      "A compact umbrella. Rain arrives fast and the wind between buildings kills cheap ones",
      "A refillable water bottle. Tap water is famously good and free refills are easy",
      "Some cash in small bills for tips, cash-only slice shops and bodegas",
      "One smarter outfit for a nicer restaurant, plus a portable charger since map apps drain a phone fast",
    ],
    seasonal: [
      { season: "Spring (Apr-Jun)", tip: "Layers and a rain shell. The parks come alive and outdoor dining reopens. Mornings can still be cold enough for a jacket." },
      { season: "Summer (Jul-Aug)", tip: "Hot, humid and the subway platforms are far hotter than the street. Light breathable fabrics, sunscreen and a water bottle, plus a layer for arctic air conditioning indoors." },
      { season: "Autumn (Sep-Nov)", tip: "The best month-for-month weather of the year. A mid-layer plus light jacket, and boots for late autumn rain. Central Park peaks late October into early November." },
      { season: "Winter (Dec-Mar)", tip: "Proper insulated coat, hat, gloves and waterproof boots. Wind chill between buildings is the real story, not the temperature reading. Holiday crowds and prices peak in late December." },
    ],
    faqs: [
      { q: "Do I still need a MetroCard in New York?", a: "No. New MetroCard sales ended at the close of 2025 and the subway now runs on OMNY, the contactless tap-to-pay system. Just tap any contactless credit or debit card, phone wallet or smartwatch at the turnstile, and the same card on buses. There is nothing to buy in advance, and weekly fare capping means frequent riders stop being charged once they hit the seven-day threshold." },
      { q: "Why was I charged twice for one subway ride?", a: "Almost certainly the 18-minute rule. If the same card or device is tapped again at the same station within roughly 18 minutes, the system treats it as a separate fare rather than a duplicate. It catches out couples and families who try to tap one card for two people. Everyone travelling needs their own card, phone or watch." },
      { q: "How much should I tip in New York City?", a: "Around 18 to 20 percent at sit-down restaurants, one to two dollars per drink at a bar, 15 to 20 percent for taxis and rideshares, a few dollars per night for hotel housekeeping, and a dollar or two per bag for porters. Tipping is treated as part of the cost of service here rather than optional, and cash tips are appreciated at restaurants." },
      { q: "Is jaywalking legal in New York now?", a: "Yes. New York City decriminalised jaywalking in late 2024, removing the previous fine, so crossing mid-block is no longer an offence. That does not make it safe: drivers, cyclists and delivery e-bikes move fast, and bikes frequently ride against traffic on one-way streets. Look both ways every time, even where you would not expect traffic." },
      { q: "What should I actually wear in New York?", a: "Comfortable shoes above everything else, plus layers. You will walk far more than you plan to, and you will move constantly between overheated interiors and cold streets in winter, or fierce air conditioning and humid streets in summer. New Yorkers dress dark and practical; there is no dress code anywhere except a handful of upscale restaurants." },
      { q: "Do I need travel insurance for New York?", a: "Strongly recommended if you are visiting from abroad. US healthcare is extremely expensive for visitors, and even a minor emergency room visit can run into thousands of dollars. Standard claims here are medical, trip disruption from winter storms, and theft in crowded tourist areas." },
    ],
  },
  london: {
    city: "London",
    country: "United Kingdom",
    flag: "\ud83c\uddec\ud83c\udde7",
    slug: "london",
    title: "What to Pack for London (2026): ETA Rule, Tube Fares & Full List",
    metaDesc: "Complete London packing list for 2026 — the UK ETA now required for Americans, the Tube tap-out rule that overcharges tourists, unpredictable weather layering, and everything worth bringing.",
    intro: "Two things catch visitors to London in 2026, and neither is the weather. Americans and most visa-free travellers now need a UK ETA approved before they fly, and the Tube quietly charges you the maximum fare if you forget to tap out. Sort both and the rest of the trip is easy.",
    bestTime: "May to September for the longest days and warmest weather, with June and July the peak. Spring and early autumn are mild and less crowded. Winter is cold, wet and dark by 4pm, but Christmas markets and empty museums are a genuine trade-off.",
    weather: "Milder than its reputation, wetter than you plan for. Summer sits around 18 to 24 C (64 to 75 F) with occasional 30 C spikes and little air conditioning. Winter runs 4 to 9 C (39 to 48 F), rarely snowy. Rain is frequent and light rather than torrential, and it can rotate through four kinds of weather in a day, which is why layering is not optional here.",
    warning: {
      title: "Before you fly: the ETA and the Tube rule",
      body: "One of these stops you at the airport, the other quietly drains money for your entire trip. Both are easy to handle if you know in advance.",
      items: [
        "Americans and most visa-free visitors now need a UK Electronic Travel Authorisation (ETA), mandatory since February 2026. It costs around 16 pounds, is applied for online before travel, and lasts about two years. Without it, the airline will not board you.",
        "On the Tube, Elizabeth line, Overground and DLR you must tap IN and tap OUT. Forget the tap-out and you are charged the maximum incomplete-journey fare, often around 8 to 9 pounds instead of a normal fare, and it can break your daily and weekly fare caps.",
        "Buses are tap-in only. Tapping again on the way out is a common tourist mistake.",
        "Use the same card or device for the whole journey. Switching between phone and card mid-trip breaks the journey and the capping.",
        "Genuine tap-out errors can usually be corrected in your TfL account within a couple of days, so it is worth registering the card you use.",
      ],
      footer: "Practical version: apply for the ETA weeks before you fly, save the approval to your phone, pick one payment method and tap in and out with it every single time.",
    },
    essentials: [
      "A compact umbrella and a light waterproof jacket. You will use at least one of them almost every day",
      "Broken-in walking shoes. London is a walking city with enormous stations and long tunnel transfers",
      "Layers built around a mid-layer you can carry. The weather genuinely rotates within a single day",
      "One contactless card or phone wallet used consistently for all travel, tapped in and out",
      "A slim crossbody bag for packed carriages and Oxford Street",
      "A UK plug adapter (Type G, three rectangular pins) and note that hair tools need dual voltage",
      "A refillable water bottle. Tap water is safe and pubs will refill it",
      "One smarter outfit for theatre or a nicer dinner, plus your ETA approval saved offline",
    ],
    seasonal: [
      { season: "Spring (Mar-May)", tip: "Layers, rain jacket, and shoes that handle wet pavement. Parks are the highlight and the light gets long fast." },
      { season: "Summer (Jun-Aug)", tip: "Light clothes plus a jacket anyway. Heatwaves hit hard because homes, hotels and the Tube largely lack air conditioning, so carry water on the Underground." },
      { season: "Autumn (Sep-Nov)", tip: "The most reliably pleasant stretch: mild, atmospheric, thinner crowds. Waterproof outer layer and a warm mid-layer." },
      { season: "Winter (Dec-Feb)", tip: "Warm coat, scarf, gloves, waterproof shoes. Dark by 4pm, so plan indoor afternoons around museums, which are mostly free." },
    ],
    faqs: [
      { q: "Do Americans need a visa or ETA for London in 2026?", a: "Not a visa, but yes to an ETA. The UK Electronic Travel Authorisation became mandatory for Americans and most other visa-free nationalities in February 2026. It costs around 16 pounds, is applied for online before you travel, is normally approved quickly, and lasts about two years. Airlines check for it at check-in and will deny boarding without one, so apply well before departure and save the approval to your phone." },
      { q: "Why did the Tube charge me so much?", a: "Almost certainly a missed tap-out. On the Tube, Elizabeth line, Overground and DLR you must tap in at the start and tap out at the end. If the system cannot see where you finished, it charges the maximum incomplete-journey fare, often around 8 to 9 pounds, and that unresolved journey can also break your daily or weekly fare cap so later trips cost more. Buses are tap-in only." },
      { q: "What should I actually pack for London weather?", a: "Layers and waterproofing rather than heavy items. A mid-layer you can take off, a light waterproof jacket, a compact umbrella and grippy waterproof shoes will cover almost any month. Summers can spike to 30 C with no air conditioning anywhere, so include something genuinely light too." },
      { q: "Is London a walking city?", a: "Very much so. Central London distances look longer on a map than they feel, and Tube stations often involve long tunnel transfers and stairs. Broken-in shoes matter more than any other item, and walking one or two stops instead of changing lines is frequently faster." },
      { q: "How do locals save money in London?", a: "Free national museums, tap water rather than bottled, contactless with fare capping instead of paper tickets, supermarket meal deals for lunch, and theatre day-seat or rush-ticket schemes. Walking short hops also avoids unnecessary fares." },
      { q: "Do I need travel insurance for the UK?", a: "Recommended. Visitors are generally charged for NHS treatment, and the common claims are trip disruption, delayed baggage and minor injuries. Confirm your policy covers medical costs in the UK rather than assuming reciprocal cover." },
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
    city: "Barcelona",
    country: "Spain",
    flag: "\ud83c\uddea\ud83c\uddf8",
    slug: "barcelona",
    title: "What to Pack for Barcelona (2026): Swimwear Fines & Full List",
    metaDesc: "Complete Barcelona packing list for 2026 — the swimwear rule that fines tourists away from the beach, pickpocket hotspots, Sagrada Familia dress code, and what to bring for Mediterranean heat.",
    intro: "Barcelona has two traps that catch first-timers. Walking around town in beachwear is actually fineable, and the city has one of Europe's most persistent pickpocket problems in very specific places. Neither ruins a trip if you know before you pack.",
    bestTime: "May to June and September to early October: warm sea, sunshine, and manageable crowds. July and August are hot and extremely busy. Winter is mild, quiet and cheap, though the beach season is over.",
    weather: "Mediterranean and mild. Summer sits around 25 to 31 C (77 to 88 F) with high humidity. Winter runs 9 to 16 C (48 to 61 F), sunny but cool in the shade. Spring and autumn are 17 to 24 C (63 to 75 F), the best walking weather, with occasional heavy autumn downpours.",
    warning: {
      title: "The rules that catch tourists in Barcelona",
      body: "One is a city ordinance with real fines, the others are about protecting your belongings in the places thieves actually work.",
      items: [
        "Walking around the city in swimwear or shirtless away from the beachfront is prohibited under local ordinances, with fines commonly reported in the 120 to 300 euro range. Cover up before you leave the sand.",
        "Pickpocketing concentrates on La Rambla, the Gothic Quarter, metro line 3, Sagrada Familia and Park Guell. It is skilled, non-violent and fast.",
        "Sagrada Familia and other churches require covered shoulders and knees, and refuse entry to visitors in beachwear.",
        "Restaurant terraces on La Rambla are the classic overcharge zone. Check prices before sitting and expect a cover charge (cubierto).",
        "Spain charges a tourist accommodation tax per night, collected by your hotel or rental, which surprises visitors at checkout.",
      ],
      footer: "Practical version: pack a cover-up you actually wear, use a front-worn zipped bag on La Rambla and the metro, carry a scarf for churches, and eat one street back from the tourist strips.",
    },
    essentials: [
      "A cover-up, shirt or light dress to throw on leaving the beach, since beachwear in town is fineable",
      "A front-worn zipped crossbody bag. Open totes and back pockets are how nearly all theft here happens",
      "Comfortable walking shoes with grip for Gothic Quarter cobbles and Park Guell slopes",
      "A light scarf for Sagrada Familia and other churches",
      "Reef-friendly sunscreen, hat and sunglasses. Mediterranean sun is strong from May to September",
      "A refillable water bottle. Public fountains are common and tap water is drinkable",
      "A packable rain shell for autumn, when downpours are short but heavy",
      "One smarter outfit for dinner, since locals eat late and dress up more than tourists expect",
    ],
    seasonal: [
      { season: "Spring (Apr-Jun)", tip: "Layers and a light jacket for evenings. Sea warms up by June. Best balance of weather and crowds." },
      { season: "Summer (Jul-Aug)", tip: "Hot and humid with peak crowds and peak pickpocketing. Light breathable fabrics, strong sun protection, and a cover-up for leaving the beach." },
      { season: "Autumn (Sep-Nov)", tip: "September is arguably the best month: warm sea, thinner crowds. October and November bring sudden heavy showers, so pack a rain shell." },
      { season: "Winter (Dec-Mar)", tip: "Mild and sunny but cool in shade and after dark. A warm mid-layer and jacket. Gaudi sites are quiet and the city feels local again." },
    ],
    faqs: [
      { q: "Can you walk around Barcelona in a bikini or shirtless?", a: "No. Local ordinances prohibit walking around the city in swimwear or bare-chested away from the beachfront and promenade, with fines commonly reported between roughly 120 and 300 euros. It is aimed at the streets and shops of the centre rather than the sand. Carrying a light cover-up or shirt in your beach bag solves it entirely." },
      { q: "Where do pickpockets operate in Barcelona?", a: "Predictably: La Rambla, the Gothic Quarter, metro line 3, the areas around Sagrada Familia and Park Guell, and Barceloneta beach. Techniques are distraction-based rather than violent, often involving a bumped shoulder, a spilled drink, or someone asking for directions. A zipped bag worn in front, nothing in back pockets, and never leaving belongings unattended on the beach covers most of the risk." },
      { q: "What is the dress code for Sagrada Familia?", a: "Shoulders and knees covered, no see-through clothing, and no beachwear. Staff enforce it at the entrance. A light scarf is the simplest fix and weighs nothing. The same expectation applies at Barcelona Cathedral and other active churches." },
      { q: "Is there a tourist tax in Barcelona?", a: "Yes. Spain applies a per-night accommodation tax that hotels and licensed rentals collect, and Barcelona adds a city surcharge. It is usually charged at checkout rather than at booking, which is why it catches visitors out. Budget a small amount per person per night." },
      { q: "How do locals avoid tourist-trap restaurants?", a: "By walking one or two streets away from La Rambla and the beachfront, eating later than the tourist rush, and looking for a menu del dia at lunch. Terraces directly on the main tourist strips charge the most and often add a cover charge." },
      { q: "Do I need travel insurance for Spain?", a: "Recommended. Healthcare is good but visitors are charged, and theft is the single most common claim in Barcelona. Check that your policy covers pickpocketing and theft from the person, since many basic policies exclude items taken from an unattended bag." },
    ],
  },
  rome: {
    city: "Rome",
    country: "Italy",
    flag: "\ud83c\uddee\ud83c\uddf9",
    slug: "rome",
    title: "What to Pack for Rome (2026): The Fines Tourists Don't Expect",
    metaDesc: "Complete Rome packing list for 2026 — the fines for sitting on the Spanish Steps, wading in fountains and rolling luggage on monuments, St Peter's dress code, and what to bring for cobblestones and heat.",
    intro: "Rome fines tourists for things that feel completely harmless: sitting down on the Spanish Steps, dipping your feet in a fountain, rolling a suitcase down historic stairs. Officials patrol with whistles and the penalties are real. Pack for the rules and the cobblestones and you will have a far smoother trip.",
    bestTime: "April to early June and late September to October: warm, walkable, and the queues are survivable. July and August are hot and heaving. Winter is mild by European standards, cheap, and the Vatican is blissfully quiet.",
    weather: "Summer runs 28 to 36 C (82 to 97 F) with strong sun and little shade at the ruins. Winter sits around 5 to 14 C (41 to 57 F), damp with occasional rain. Spring and autumn are 15 to 25 C (59 to 77 F) and close to perfect for walking. Churches and museums are cool inside even in August, so a layer is useful year-round.",
    warning: {
      title: "The Rome fines most visitors have never heard of",
      body: "These are city ordinances designed to protect monuments, and they are actively enforced with patrols and whistles. Every one of them is something a visitor might do without thinking.",
      items: [
        "Sitting on the Spanish Steps has been prohibited since 2019, with fines reported from around 250 to 400 euros and higher for mess or damage. You may walk up and down and take photos, but not sit.",
        "Rolling wheeled suitcases down historic steps can be fined, because the vibration wears the marble. In practice this applies across many of Rome's historic staircases.",
        "Wading, paddling or dipping feet in historic fountains carries fines reported around 450 euros. One tourist was fined and banned after climbing into the Trevi Fountain.",
        "Eating messily on or against monuments, and walking shirtless in the centre, are both fineable under the city's decorum rules.",
        "Since February 2026 a small ticket has been required to descend to the close-up area at the Trevi Fountain, while viewing from the piazza above remains free.",
      ],
      footer: "Practical version: carry your bag on historic steps, sit on benches or in cafes rather than monuments, never touch fountain water, keep a shirt on, and cover shoulders and knees for St Peter's.",
    },
    essentials: [
      "Broken-in shoes with real grip. Rome is basalt cobblestone (sampietrini) and it is punishing and slippery",
      "A light scarf or shawl. St Peter's Basilica and the Vatican Museums enforce covered shoulders and knees for everyone",
      "A backpack rather than a wheeled bag if you can manage it, given the steps and cobbles",
      "A refillable water bottle. Rome's nasoni drinking fountains run free, cold, drinkable water all over the city",
      "Sun protection: hat, sunglasses, SPF. The Forum, Colosseum and Palatine have almost no shade",
      "A front-worn crossbody bag for the 64 bus, Termini and the Colosseum area, where pickpockets work",
      "A packable layer for cold church and museum interiors",
      "Modest options that are still cool in heat, such as linen trousers and a light covered top",
    ],
    seasonal: [
      { season: "Spring (Apr-Jun)", tip: "Ideal walking weather. Layers plus a light rain shell for spring showers, and sunscreen from April onward." },
      { season: "Summer (Jul-Aug)", tip: "Serious heat and no shade at the ruins. Loose light fabrics, hat, electrolytes, and plan ruins for early morning with museums at midday." },
      { season: "Autumn (Sep-Oct)", tip: "The best combination of weather and crowds. A mid-layer for evenings and a rain shell for October." },
      { season: "Winter (Nov-Mar)", tip: "Mild but damp. A warm coat, waterproof shoes and an umbrella. Queues shrink dramatically and hotel prices drop." },
    ],
    faqs: [
      { q: "Can you sit on the Spanish Steps in Rome?", a: "No. Sitting or lying on the Spanish Steps has been prohibited since 2019 to protect the 18th-century marble, with fines reported from around 250 euros and rising to around 400 for mess or damage. Officials patrol and blow whistles at people who sit down. You can walk up and down and take photos freely, and there are benches in the piazza below." },
      { q: "What are the fines for touching fountains in Rome?", a: "Wading, swimming, showering or dipping your feet in historic fountains carries fines reported around 450 euros, and coin fishing is treated as theft. Tossing a coin over your shoulder at the Trevi Fountain is the tradition and is fine. Since February 2026 a small ticket is needed to descend to the close-up fountain area, while the free view from the piazza above remains." },
      { q: "What is the dress code for St Peter's Basilica?", a: "Shoulders and knees covered for all visitors, including men, and no see-through fabrics. Security turns people away daily in summer, and there is no exception for heat. A light scarf plus linen trousers or a longer skirt solves it without cooking you." },
      { q: "What shoes should I pack for Rome?", a: "Broken-in shoes with grip and no heels. Rome's basalt cobblestones are uneven and slick when wet, and a sightseeing day easily hits 20,000 steps across ruins, gravel and stairs. Sandals with support work in summer; new shoes are the classic mistake." },
      { q: "Is Rome tap water safe to drink?", a: "Yes, and the nasoni street fountains around the city dispense cold drinkable water for free. Bring a refillable bottle. It is one of the easiest ways to cut costs and stay hydrated in summer heat." },
      { q: "Do I need travel insurance for Italy?", a: "Recommended. Healthcare is good but not free for most visitors, and the frequent claims in Rome are theft on crowded transport and around major sites, plus trip disruption. Make sure theft from the person is covered, not just from accommodation." },
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
    city: "Istanbul",
    country: "Turkey",
    flag: "\ud83c\uddf9\ud83c\uddf7",
    slug: "istanbul",
    title: "What to Pack for Istanbul (2026): Mosque Rules & Full List",
    metaDesc: "Complete Istanbul packing list for 2026 — mosque dress requirements including headscarves, the taxi and shoeshine scams, the souvenir law that has jailed tourists, and what to bring.",
    intro: "Istanbul asks two things of visitors that most packing lists skip: clothing that works inside working mosques, and enough awareness to sidestep a few well-practised scams. There is also a souvenir law here with genuinely serious consequences that almost no tourist knows about.",
    bestTime: "April to May and September to November: mild, walkable and clear. Summer is hot, humid and crowded. Winter is cold, grey and sometimes snowy, but the city is atmospheric and hotel rates fall sharply.",
    weather: "Summer sits around 25 to 32 C (77 to 90 F) with humidity off two seas. Winter runs 4 to 10 C (39 to 50 F), damp and windy, with occasional snow. Spring and autumn are 15 to 22 C (59 to 72 F) and ideal. The city is hilly and you will be climbing, so breathability matters more than warmth in shoulder season.",
    warning: {
      title: "What to know before you pack for Istanbul",
      body: "One clothing requirement, two common scams, and one law with severe penalties that catches ordinary travellers.",
      items: [
        "Working mosques including the Blue Mosque and Hagia Sophia require covered shoulders and knees for everyone, a headscarf for women, and shoes removed. Scarves are usually available to borrow, but bringing your own means never queuing for one.",
        "Taking home old-looking stones, coins, fossils or anything that could be classed as an antiquity is treated as antiquities smuggling. Tourists have been arrested at the airport over beach pebbles and old coins, with reported sentences of many months and prosecutors seeking years. Leave natural and old objects where you find them and buy only certified souvenirs.",
        "The shoeshine scam: a man drops a brush in front of you, you helpfully pick it up, and you are then pressured into paying for an unwanted shine.",
        "Taxi scams are common. Insist on the meter, or use a ride app, and know that Istanbulkart on trams, ferries and the metro is far cheaper anyway.",
        "Tap water is generally not recommended for drinking. Bottled water is cheap and everywhere.",
      ],
      footer: "Practical version: pack a scarf and slip-on shoes for mosques, buy an Istanbulkart on arrival, decline the dropped brush, use metered taxis or apps, and never pocket stones or coins.",
    },
    essentials: [
      "A scarf or shawl. Required for women in mosques and useful for sun and cool evenings",
      "Slip-on shoes. You will remove them at every mosque, so laces get tedious fast",
      "Modest layers: trousers or a longer skirt, plus tops that cover shoulders",
      "An Istanbulkart for trams, ferries, buses and the metro, tapped for each ride",
      "Comfortable shoes with grip. Istanbul is steep, cobbled and often slick",
      "A front-worn crossbody bag for the Grand Bazaar, Eminonu and packed trams",
      "Bottled or filtered water, and a bottle you refill from sealed bottles",
      "Cash in small notes for bazaars, ferries and tips, alongside cards",
    ],
    seasonal: [
      { season: "Spring (Apr-May)", tip: "Tulip season and the best walking weather. Layers, a light rain shell and comfortable shoes." },
      { season: "Summer (Jun-Aug)", tip: "Hot, humid and busy. Light breathable fabrics that still cover shoulders and knees for mosques, plus sun protection and a water bottle." },
      { season: "Autumn (Sep-Nov)", tip: "Mild, clear and quieter. A mid-layer and rain shell handle most days, and ferry rides on the Bosphorus are at their best." },
      { season: "Winter (Dec-Mar)", tip: "Cold, wet and windy off the water, sometimes snowy. A warm waterproof coat, hat and grippy waterproof shoes." },
    ],
    faqs: [
      { q: "What should women wear to mosques in Istanbul?", a: "A headscarf covering the hair, plus shoulders and knees covered and no see-through fabric. Shoes come off before entering the prayer area. Major mosques including the Blue Mosque and Hagia Sophia keep scarves and wraps available to borrow, but carrying your own lightweight scarf is faster and more comfortable. Men need shoulders and knees covered too, so no vests or short shorts." },
      { q: "Is it illegal to take stones or coins home from Turkey?", a: "Yes, and it is treated seriously. Turkey classes old-looking stones, coins, fossils and similar objects as protected cultural property, and taking them can be prosecuted as antiquities smuggling. Tourists have been arrested at airports over a handful of beach pebbles and old coins, with reported sentences of months and prosecutors seeking far longer. Leave natural objects where they are and buy souvenirs with official certification." },
      { q: "How do I avoid taxi scams in Istanbul?", a: "Insist the meter is running before you move, or use a ride-hailing app so the fare is fixed in advance. Have your destination written down or on a map. For most routes, trams, ferries and the metro with an Istanbulkart are cheaper and faster than a taxi in traffic." },
      { q: "Can you drink the tap water in Istanbul?", a: "It is generally not recommended for drinking. Locals mostly drink bottled or filtered water, which is inexpensive and available everywhere. Use bottled water for drinking and be sensible about ice in very casual places." },
      { q: "What is the shoeshine scam?", a: "A man walking ahead of you drops a shoe brush. You pick it up and hand it back, he insists on thanking you with a shine, and then demands a high payment. It works because it exploits politeness. If someone drops a brush in front of you, keep walking." },
      { q: "Do I need travel insurance for Turkey?", a: "Recommended. Private healthcare is good but charged, and common claims are stomach illness, minor injuries on steep uneven streets, and trip disruption. Check that any adventure activities like ballooning in Cappadocia are covered if your trip extends beyond Istanbul." },
    ],
  },
  amsterdam: {
    city: "Amsterdam",
    country: "Netherlands",
    flag: "\ud83c\uddf3\ud83c\uddf1",
    slug: "amsterdam",
    title: "Packing Tips for Navigating Amsterdam Like a Local (2026)",
    metaDesc: "How to pack for Amsterdam like a local in 2026 — the bike-lane rule that gets tourists yelled at, the street cannabis ban with fines, photography rules in the Red Light District, and what to bring for constant rain and cobblestones.",
    intro: "Amsterdam does not punish tourists for what they wear. It punishes them for how they move. Standing in a bike lane, photographing the wrong street, or lighting up in the wrong district are the mistakes that get visitors shouted at or fined. Here is how to pack and behave like someone who actually lives here.",
    bestTime: "April to May and September to October are the sweet spots: mild, fewer crowds, and tulip season peaks in mid-April. Summer is busy and warm but far from tropical. Winter is grey, wet and windy, but the city is genuinely atmospheric and hotel prices drop hard.",
    weather: "Mild and wet all year. Summer sits around 17 to 23 C (63 to 73 F), winter around 2 to 7 C (36 to 45 F). Rain is frequent rather than heavy, and it arrives sideways because of the wind off the water. That single detail changes your packing: a hooded rain jacket beats an umbrella here, because umbrellas turn inside out on the canals.",
    warning: {
      title: "How to not stand out as a tourist in Amsterdam",
      body: "Locals are relaxed about almost everything except these. Each one is either enforced by the city or enforced socially, and all of them are avoidable if you know before you land.",
      items: [
        "Never stand, walk or pose in a bike lane. The red-brick strips beside the road are roads, not pavement. Cyclists travel fast, they will ring at you, and collisions with tourists are a daily occurrence.",
        "Smoking cannabis in the street in the Red Light District (De Wallen) has been banned since 2023, with fines reported around 100 euros. Coffeeshops and private accommodation are where it is tolerated, not the pavement.",
        "Photographing sex workers in the Red Light District is prohibited. Phones have been thrown into canals over this, and it is the fastest way to a genuine confrontation.",
        "Public drunkenness and noise in the old centre are actively policed under the city's anti-nuisance campaign, with on-the-spot fines.",
        "Tram doors do not always open automatically. Press the button, and tap your card in AND out on trams, buses and the metro or you will be overcharged.",
      ],
      footer: "Practical version: walk on the pavement, keep phones down in De Wallen, keep cannabis to coffeeshops, and pack a hooded rain jacket so you are not the person blocking a bike lane fighting an umbrella.",
    },
    essentials: [
      "A hooded, packable rain jacket rather than an umbrella. Canal wind destroys umbrellas, and locals simply wear their rain",
      "Shoes with real grip and no heels. The city is brick and cobblestone, and it is slick for most of the year",
      "A contactless bank card or a loaded OV-chipkaart for trams, buses and the metro. Tap in and tap out every single time",
      "A crossbody bag worn in front for crowded trams and Centraal Station, the two places pickpockets work",
      "Layers, including one warm mid-layer even in summer. Evenings on the water are colder than the forecast suggests",
      "A reusable water bottle. Tap water is excellent and free refills are easy",
      "Bike lights if you rent a bike after dark. Riding unlit is illegal and fineable in the Netherlands",
      "A small daypack rather than a suitcase for day trips. Canal-house stairs are famously steep and narrow",
    ],
    seasonal: [
      { season: "Spring (Mar-May)", tip: "Tulip season peaks mid-April at Keukenhof. Pack layers, a rain shell and shoes you do not mind getting wet. Mornings are cold, afternoons pleasant." },
      { season: "Summer (Jun-Aug)", tip: "Long light evenings and terrace weather, but pack a jacket anyway. Air conditioning is rare in older hotels, so bring a fan clip or ask specifically when booking." },
      { season: "Autumn (Sep-Nov)", tip: "Arguably the most local-feeling season: fewer crowds, dramatic light, and steady rain. Waterproof outer layer plus a warm mid-layer." },
      { season: "Winter (Dec-Feb)", tip: "Cold, wet, windy, dark by 5pm. A proper coat, gloves, a hat and waterproof shoes. Amsterdam Light Festival runs through the darkest weeks and is worth the chill." },
    ],
    faqs: [
      { q: "What is the biggest mistake tourists make in Amsterdam?", a: "Standing in bike lanes. The red-brick strips beside every road are cycle roads, not pavement, and locals ride fast and expect them to be clear. Stepping into one to take a photo is the single most common way visitors annoy Amsterdammers and the most common cause of minor collisions. Always check for the red brick before you stop walking." },
      { q: "How do I get around Amsterdam like a local?", a: "Walk or take trams. Tap a contactless card or OV-chipkaart when you board and again when you get off, otherwise you are charged the maximum fare. Press the door button. Renting a bike is authentic but only sensible if you are a confident city cyclist, and lights after dark are legally required." },
      { q: "Can you smoke weed on the street in Amsterdam?", a: "Not in the Red Light District. Street cannabis smoking in De Wallen has been banned since 2023, with fines reported around 100 euros, and the city has discussed extending it further. Coffeeshops and private accommodation are where it is tolerated. Also worth knowing: tobacco smoking is banned inside coffeeshops, which surprises many visitors." },
      { q: "What should I wear in Amsterdam?", a: "Practical and understated. Locals wear dark, weatherproof layers and flat, grippy shoes. There is no dress code anywhere, but heels on cobblestones and bright athleisure both mark you out instantly. A hooded rain jacket is the single most local item you can pack." },
      { q: "Is Amsterdam expensive, and how do locals save money?", a: "It is pricey, but locals lean on free and cheap habits: tap water instead of bottled, the free Centraal Station ferries across the IJ, museum passes if you are visiting several, supermarket lunches, and neighbourhood bars in De Pijp or Oud-West rather than the centre." },
      { q: "Do I need travel insurance for the Netherlands?", a: "Recommended. Healthcare is excellent but not free for visitors, and the most common claims here are bicycle accidents and theft from crowded trams and stations. Check that your policy covers cycling if you plan to rent a bike." },
    ],
  },
  lisbon: {
    city: "Lisbon",
    country: "Portugal",
    flag: "\ud83c\uddf5\ud83c\uddf9",
    slug: "lisbon",
    title: "What to Pack for Lisbon (2026): The Shoes Rule & Full List",
    metaDesc: "Complete Lisbon packing list for 2026 — why the city's polished calcada pavement is genuinely slippery, the tram 28 pickpocket problem, the fake-drug scam, and what to bring for hills and sun.",
    intro: "Lisbon's signature hazard is its own pavement. The city is paved in polished limestone that turns skating-rink slick in light rain, and it is all hills. Add the most pickpocketed tram in Europe and a scam aimed squarely at tourists, and there are a few very specific things to pack.",
    bestTime: "March to May and September to October: warm, bright and comfortable for climbing hills. July and August are hot and crowded. Winter is mild and cheap, with more rain but plenty of sun between showers.",
    weather: "Summer runs 25 to 32 C (77 to 90 F) with strong Atlantic sun and cool evenings by the river. Winter sits around 9 to 16 C (48 to 61 F), rainy but rarely cold. Spring and autumn are 16 to 24 C (61 to 75 F). There is almost always a breeze off the Tejo, which makes the heat manageable and the evenings cooler than you expect.",
    warning: {
      title: "What nobody tells you before visiting Lisbon",
      body: "One of these is about your footing, two are about your belongings. All three are things locals simply know.",
      items: [
        "The calcada portuguesa pavement, those beautiful patterned limestone tiles, becomes genuinely slippery when even slightly wet. Smooth-soled shoes are a real fall risk on the steep streets.",
        "Tram 28 is the single most pickpocketed spot in the city, along with Santa Justa lift queues, Alfama viewpoints and the metro to the airport. Thieves work the crush at the doors.",
        "Street sellers around Baixa and Cais do Sodre offer tourists fake drugs, usually herbs or crushed pills. It is a scam rather than a supply, and engaging draws police attention to you.",
        "Restaurant couvert charges for bread, olives and butter placed on your table are normal and chargeable. Send them back if you do not want them.",
        "The hills are not decorative. Distances that look short on a map involve serious climbs, and the funiculars and lifts exist for a reason.",
      ],
      footer: "Practical version: grippy rubber soles, nothing valuable in back pockets, front-worn bag on tram 28, ignore street sellers, and check the couvert before you eat it.",
    },
    essentials: [
      "Shoes with grippy rubber soles and no heels. This is the single most important item for Lisbon",
      "A front-worn zipped crossbody bag for tram 28, the Santa Justa area and the airport metro",
      "Layers plus a light jacket. Atlantic evenings by the river are cooler than midday suggests",
      "A Viva Viagem or Navegante card for trams, metro, buses and ferries",
      "Sun protection: hat, sunglasses and SPF. Atlantic light is deceptively strong",
      "A refillable water bottle. Tap water is safe and the climbs will dehydrate you",
      "A compact rain shell for winter and spring showers, since wet calcada is the hazard",
      "A daypack rather than a wheeled bag if your accommodation is in Alfama or Bairro Alto, where you will carry it up stairs",
    ],
    seasonal: [
      { season: "Spring (Mar-May)", tip: "Ideal. Layers, a rain shell and grippy shoes. Jacaranda blossom in late spring is worth timing for." },
      { season: "Summer (Jun-Aug)", tip: "Hot and busy. Light breathable clothing, strong sun protection, and a jacket for the evening breeze off the river. Start hill walks early." },
      { season: "Autumn (Sep-Oct)", tip: "Warm sea, thinner crowds, soft light. The most local-feeling season. Mid-layer plus rain shell." },
      { season: "Winter (Nov-Feb)", tip: "Mild but wet, and wet means slippery. Waterproof grippy shoes and a rain jacket. Sunny days between fronts are gorgeous and empty." },
    ],
    faqs: [
      { q: "What shoes should I wear in Lisbon?", a: "Shoes with grippy rubber soles and no heels. Lisbon is paved in polished limestone calcada that becomes seriously slick when wet, and the city is built on steep hills. Locals wear practical soles for exactly this reason. Smooth leather soles, flip-flops and heels are the most common cause of tourist falls here." },
      { q: "Is tram 28 safe, and how do I avoid pickpockets?", a: "It is safe in the sense that theft is non-violent, but it is the most pickpocketed spot in Lisbon. Thieves work the crush at the doors and at stops. Ride it early in the morning when it is emptier, keep a zipped bag in front of you, put nothing in back pockets, and stay alert whenever the tram fills or empties." },
      { q: "What is the fake drug scam in Lisbon?", a: "Street sellers approach tourists around Baixa and nightlife areas offering drugs that are actually herbs or crushed tablets. It is a straightforward rip-off aimed at visitors, and engaging can also put you in an awkward position with police. Simply keep walking; a firm no is enough." },
      { q: "Why did my restaurant bill include bread and olives I didn't order?", a: "That is the couvert, a standard Portuguese practice where bread, olives, butter or cheese are brought to the table and charged if consumed. It is not a scam, but it is optional. If you do not want it, politely ask for it to be taken away before anyone eats it." },
      { q: "How hilly is Lisbon really?", a: "Very. Short distances on a map can involve steep climbs and long staircases, particularly in Alfama, Bairro Alto and Graca. Use the funiculars, the Santa Justa lift and the trams rather than treating them as attractions only, and factor the climbs into how much you plan per day." },
      { q: "Do I need travel insurance for Portugal?", a: "Recommended. Healthcare is good but charged for visitors, and the two most common Lisbon claims are theft and slip injuries on wet pavement. Confirm theft from the person is covered, not only theft from accommodation." },
    ],
  },
  cancun: {
    city: "Cancun",
    country: "Mexico",
    flag: "\ud83c\uddf2\ud83c\uddfd",
    slug: "cancun",
    title: "What to Pack for Cancun (2026): Sunscreen Ban & Full List",
    metaDesc: "Complete Cancun packing list for 2026 — the sunscreen that is banned in cenotes and eco-parks, sargassum seaweed season, timeshare and ATM scams, and everything to bring for the Riviera Maya.",
    intro: "Cancun catches travellers with three things a beach packing list never mentions: your regular sunscreen is banned at the cenotes and eco-parks you came to swim in, seaweed season can bury the beach, and the airport is a gauntlet of timeshare pitches. Pack for those and the rest is easy.",
    bestTime: "December to April is dry season, with the best weather and the highest prices. May to June and November are good value shoulder months. Hurricane season runs June to November, peaking August to October, and sargassum seaweed is typically worst from roughly April through August.",
    weather: "Hot and humid year-round, 26 to 33 C (79 to 91 F), with sea temperatures that stay swimmable. Dry season is sunny with lower humidity. Wet season brings intense short afternoon downpours and much heavier humidity. UV is extreme all year because you are at low latitude on white sand, so sun protection is not seasonal here.",
    warning: {
      title: "Three things that surprise first-time Cancun visitors",
      body: "One is a rule you can be turned away over, one can change what your beach looks like, and one starts before you leave the airport.",
      items: [
        "Chemical sunscreens containing oxybenzone and octinoxate are prohibited at cenotes, eco-parks like Xcaret and Xel-Ha, and many reef tours, because they damage coral and freshwater systems. Staff check, and you may be asked to shower it off or buy their biodegradable version at resort prices. Pack mineral reef-safe sunscreen instead.",
        "Sargassum seaweed can wash ashore in large volumes, typically worst around April to August, turning white sand brown and making swimming unpleasant. Resorts clean daily but cannot control it. Check recent sargassum reports before booking a beach-dependent trip.",
        "Timeshare representatives work the airport arrivals hall aggressively, often posing as transport or tourist information. Book your transfer in advance and walk past anyone who approaches you before you exit.",
        "Use ATMs inside banks rather than freestanding ones, decline the dynamic currency conversion option, and pay in pesos rather than dollars for a better rate.",
        "Tap water is not for drinking. Use bottled or filtered water, including for brushing teeth if you are sensitive.",
      ],
      footer: "Practical version: mineral reef-safe sunscreen, a rash guard for cenote days, sargassum check before booking, pre-booked airport transfer, bank ATMs, bottled water.",
    },
    essentials: [
      "Mineral reef-safe sunscreen (zinc or titanium). Chemical formulas are refused at cenotes and eco-parks",
      "A rash guard or swim shirt. It handles the extreme UV and keeps you covered where sunscreen is restricted",
      "Water shoes or grippy sandals for cenote steps, rocky entries and hot sand",
      "Strong insect repellent. Mosquitoes are active around cenotes, ruins and at dusk",
      "A dry bag for boat trips, cenotes and afternoon downpours",
      "Pesos in small notes for tips, taxis and local restaurants, plus a card for resorts",
      "Rehydration salts and basic stomach remedies. Heat plus new food is a common combination",
      "A light long-sleeve layer for over-air-conditioned restaurants and cool evening boat rides",
    ],
    seasonal: [
      { season: "Dry Season (Dec-Apr)", tip: "The best weather and the priciest. Light clothing, maximum sun protection, and a layer for breezy evenings. Book early." },
      { season: "Shoulder (May-Jun)", tip: "Hot and humid with good value. Sargassum risk is higher, so check reports. Quick-dry fabrics and a dry bag." },
      { season: "Hurricane Season (Jul-Nov)", tip: "Peak risk August to October. Pack a rain shell and quick-dry clothing, and take travel insurance with disruption cover seriously. Storms are often short but systems can close things for days." },
    ],
    faqs: [
      { q: "What sunscreen is banned in Cancun and the cenotes?", a: "Sunscreens containing oxybenzone and octinoxate, which covers most standard chemical sunscreens. They are prohibited at cenotes, eco-parks such as Xcaret and Xel-Ha, and on many reef tours because they damage coral and delicate freshwater ecosystems. Staff do check and may ask you to rinse off or buy their own biodegradable product. Bring a mineral zinc or titanium reef-safe sunscreen from home." },
      { q: "When is sargassum seaweed worst in Cancun?", a: "Volumes vary year to year, but the heaviest arrivals are typically between around April and August. When it lands in bulk it turns the white sand brown, smells as it decomposes, and makes swimming unpleasant. Resorts clean their sections daily. If a pristine beach is the point of your trip, check recent sargassum monitoring reports before you book and consider the December to March window." },
      { q: "How do I avoid timeshare scams at Cancun airport?", a: "Book your transfer before you arrive and do not stop for anyone in the arrivals hall. Representatives often present themselves as transport desks, tourist information or free-gift booths, and the pitch can consume hours of your first day. A polite no thank you while continuing to walk is all that is needed." },
      { q: "Should I pay in pesos or dollars in Cancun?", a: "Pesos, almost always. Paying in dollars or letting a card terminal convert for you uses a poor exchange rate. Withdraw pesos from ATMs inside banks rather than freestanding machines in tourist areas, and decline the dynamic currency conversion prompt so your own bank does the conversion." },
      { q: "Can you drink the tap water in Cancun?", a: "No, stick to bottled or filtered water. Resorts provide purified water, and it is worth using it for brushing teeth if you have a sensitive stomach. Ice in resorts and established restaurants is normally made from purified water and is generally fine." },
      { q: "Do I need travel insurance for Cancun?", a: "Strongly recommended, especially in hurricane season. Medical care for tourists is private and expensive, water sports and cenote activities carry real injury risk, and trip disruption from storms between June and November is the single most common reason travellers here need a claim. Check that water activities are covered." },
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


const ASIA_SLUGS = ["tokyo","bangkok","bali","singapore"];
const PACK_URL = "https://worldprep.gumroad.com/l/asia-rules";

function AsiaPack({ city }) {
  return (
    <section style={{ margin:"28px 0", background:INK, borderRadius:16, padding:"24px 22px", color:SAND }}>
      <p style={{ fontSize:"0.62rem", fontWeight:800, letterSpacing:"1.5px", textTransform:"uppercase", color:T, marginBottom:9 }}>Printable guide · $12</p>
      <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.5rem", lineHeight:1.25, marginBottom:10 }}>The Asia Trip Rules Pack</h2>
      <p style={{ fontSize:"0.86rem", lineHeight:1.65, opacity:0.75, marginBottom:14 }}>
        Six printable pages, one per destination — including {city}. Every rule that gets travelers fined, stopped or turned away, with tick boxes so you can check it off the night before you fly.
      </p>
      <div style={{ display:"flex", flexWrap:"wrap", gap:7, marginBottom:18 }}>
        {["Japan","South Korea","Thailand","Singapore","Bali","Every flight"].map(x => (
          <span key={x} style={{ fontSize:"0.7rem", background:"rgba(245,239,224,0.12)", borderRadius:100, padding:"4px 10px" }}>{x}</span>
        ))}
      </div>
      <a href={PACK_URL} target="_blank" rel="noopener noreferrer"
        onClick={()=>{ try { if (typeof window !== "undefined" && typeof window.gtag === "function") window.gtag("event","product_click",{ product:"asia_rules_pack", page:city }); } catch (e) { console.error("track:", e); } }}
        style={{ display:"inline-block", background:T, color:"#fff", padding:"13px 30px", borderRadius:100, fontWeight:700, fontSize:"0.92rem", textDecoration:"none" }}>
        Get the pack — $12 →
      </a>
      <p style={{ fontSize:"0.7rem", opacity:0.55, marginTop:11 }}>Instant PDF download · print only the page you need</p>
    </section>
  );
}

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
  const page = PAGES[slug] || PAGES[String(slug || "").toLowerCase()] || PAGES.tokyo;

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

        {ASIA_SLUGS.indexOf(page.slug) !== -1 && <AsiaPack city={page.city} />}

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

