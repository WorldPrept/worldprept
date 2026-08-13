// TSARules.jsx — evergreen SEO landing page: /tsa-rules
// Destination for all TSA / carry-on video CTAs ("the full list").
// Targets searches like "what does TSA confiscate", "TSA liquid rules", "can I bring X on a plane".

import { useEffect } from "react";

// ── Design tokens (match main app)
const T = "#C4623A", INK = "#1A1410", INKL = "#4A3F35";
const SAND = "#F5EFE0", CREAM = "#FDFAF4", BDR = "rgba(26,20,16,0.12)";

const TITLE = "What TSA Confiscates: The Full Carry-On Rules List (2026)";
const META = "The complete list of what TSA takes at airport security in 2026 — liquids, powders, frozen items, batteries, duty-free and the everyday foods that count as liquids. Plus the surprising items that are actually allowed.";

const SECTIONS = [
  {
    h: "🧴 The rule that catches almost everyone",
    p: "For liquids, gels and pastes, TSA goes by the size of the container — not how much product is left inside. A half-empty 6 oz bottle of shampoo still fails screening, because the label says over 3.4 oz. Everything must fit in one quart-sized resealable bag, one bag per passenger.",
    items: [
      "The test: if you can pour, pump, squeeze or spread it, TSA treats it as a liquid.",
      "3.4 oz (100 ml) per container is the hard limit in carry-on.",
      "Larger sizes are fine in checked bags — the limit is a carry-on rule, not a ban.",
      "Switch to solid versions and the rule disappears: stick deodorant, bar soap, shampoo bars, sunscreen sticks.",
    ],
  },
  {
    h: "🥜 Foods that count as liquids (yes, really)",
    p: "This is the single most common surprise at the checkpoint. These are foods by any normal definition, but they're spreadable or pourable, so the 3.4 oz limit applies.",
    items: [
      "Peanut butter and other nut butters",
      "Hummus, dips and salsa",
      "Jam, jelly and honey",
      "Soft cheeses, yogurt and pudding",
      "Soup, sauces and salad dressing",
      "Maple syrup and cooking oils",
      "Canned foods packed in liquid",
    ],
  },
  {
    h: "🥤 The powder rule most travelers have never heard of",
    p: "Powders have their own separate rule. Any powder-like substance over 12 oz / 350 ml — roughly the size of a soda can — has to come out of your carry-on and go in its own bin for screening, and officers may open the container.",
    items: [
      "Protein powder and pre-workout",
      "Dry shampoo and baby powder",
      "Ground coffee and dried spices",
      "Loose or pressed makeup powder",
      "If a powder can't be identified at the checkpoint, you may be asked to discard it or check it — keep it in original labelled packaging.",
      "Baby formula and medically necessary powders are exempt.",
    ],
  },
  {
    h: "🧊 Frozen items: solid passes, slushy doesn't",
    p: "Frozen liquids are allowed through the checkpoint — but only if they're frozen solid when you reach screening. The moment there's slush or liquid pooling at the bottom, the item becomes a liquid and has to meet the 3-1-1 rule.",
    items: [
      "Ice packs and gel packs must be completely frozen",
      "A frozen water bottle passes; a half-melted one doesn't",
      "Coolers of frozen food are fine if the ice packs are still solid",
      "Hot day or long security line? That gel pack may not qualify by the time you reach the front.",
      "Exception: medically necessary gel packs, and anything cooling breast milk, are allowed even if melted — notify the officer.",
    ],
  },
  {
    h: "🔋 Batteries and power banks — the reverse rule",
    p: "This one runs opposite to what most people assume. Spare lithium batteries are banned from checked luggage by the FAA and must travel in the cabin with you. It's a fire-safety rule: a battery fire in the cabin can be dealt with, one in the cargo hold can't.",
    items: [
      "Power banks and portable chargers: carry-on only, never checked",
      "Loose spare camera and laptop batteries: carry-on only",
      "Vapes and e-cigarettes: carry-on only, and never charged in flight",
      "Under the current global standard, passengers are generally limited to two power banks, they can't be stored in overhead bins, and many airlines ban charging from them in flight",
      "Anything over 100Wh needs airline approval",
      "If your carry-on gets gate-checked, pull the batteries out and keep them with you",
    ],
  },
  {
    h: "🥃 Duty-free doesn't get a free pass on connections",
    p: "Buying after security doesn't protect you if you have a connecting flight and re-clear screening. Duty-free liquids over 3.4 oz are only allowed through if they stay in the retailer's sealed tamper-evident bag with the receipt visible inside, purchased within the last 48 hours.",
    items: [
      "Break the seal to try the perfume at your layover and it can be confiscated",
      "Some transit airports confiscate sealed bags from certain origins regardless",
      "TSA's own advice: if you're connecting, put duty-free liquids in your checked bag",
    ],
  },
  {
    h: "✅ Surprising things you actually CAN bring",
    p: "Security surprises travelers in both directions. These commonly get left at home for no reason — all are allowed in carry-on.",
    items: [
      "Scissors with blades under 4 inches (measured from the pivot)",
      "Knitting needles and crochet hooks",
      "A corkscrew without a blade",
      "Disposable and electric razors",
      "Nail clippers and tweezers",
      "Solid food of any size — cakes, pizza, protein bars, hard cheese",
      "One standard lighter and matches (torch lighters are not allowed)",
    ],
  },
  {
    h: "🚫 Everyday items that get taken",
    p: "Not weapons — ordinary objects that fall foul of the liquid rule or a specific prohibition.",
    items: [
      "Snow globes and Magic 8-Balls (liquid inside, usually over the limit)",
      "Full-size perfume, sunscreen, lotion and toothpaste",
      "Aerosol spray deodorant and hairspray over 3.4 oz",
      "Alcohol over 140 proof (70% ABV) — not permitted in any luggage",
      "Kinder Surprise eggs entering the US — prohibited by customs and destroyed",
      "Anything liquid you forgot in a side pocket",
    ],
  },
];

const FAQS = [
  { q: "What is the TSA 3-1-1 rule?", a: "Liquids, gels, aerosols and pastes in carry-on bags must be in containers of 3.4 oz (100 ml) or less, all fitting inside one quart-sized clear resealable bag, with one bag per passenger. The container size is what counts, not how much is left inside it." },
  { q: "Why does TSA take peanut butter?", a: "Because TSA classifies anything spreadable or pourable as a liquid. A standard jar of peanut butter is well over 3.4 oz, so it fails the carry-on liquid limit. The same logic applies to hummus, jam, yogurt, soft cheese and soup. Larger jars are fine in checked baggage." },
  { q: "Can I bring a half-empty bottle over 3.4 oz?", a: "No. Screening goes by the container's labelled capacity, not the amount remaining. A half-used 6 oz shampoo bottle still gets pulled. Decant into travel-size containers of 3.4 oz or less, or pack it in your checked bag." },
  { q: "Can I put a power bank in my checked bag?", a: "No. Spare lithium batteries and power banks are prohibited in checked luggage and must be carried in the cabin. It's a fire-safety rule, since a battery fire in the cargo hold can't be reached. If your carry-on is gate-checked, remove the batteries first and keep them with you." },
  { q: "Can I bring protein powder on a plane?", a: "Yes, but powders over 12 oz / 350 ml must be removed from your carry-on and screened separately, and officers may open the container. Keep it in original labelled packaging so it can be identified — unidentifiable powders may have to be discarded or checked. Larger amounts are easiest in checked baggage." },
  { q: "Are frozen ice packs allowed through security?", a: "Yes, if they are frozen solid when presented for screening. If they're partially melted, slushy, or have liquid pooling at the bottom, they're treated as liquids under the 3-1-1 rule. Medically necessary gel packs and those cooling breast milk are exempt regardless of state." },
];

const wrap = { maxWidth: 760, margin: "0 auto", padding: "0 16px" };


const PACK_URL = "https://worldprep.gumroad.com/l/asia-rules";

function AsiaPack() {
  return (
    <section style={{ margin:"28px 0", background:INK, borderRadius:16, padding:"24px 22px", color:SAND }}>
      <p style={{ fontSize:"0.62rem", fontWeight:800, letterSpacing:"1.5px", textTransform:"uppercase", color:T, marginBottom:9 }}>Printable guide · $12</p>
      <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.5rem", lineHeight:1.25, marginBottom:10 }}>The Asia Trip Rules Pack</h2>
      <p style={{ fontSize:"0.86rem", lineHeight:1.65, opacity:0.75, marginBottom:14 }}>
        Everything on this page, plus a printable page for each destination — the medications, foods, gadgets and clothing that get travelers stopped in Japan, South Korea, Thailand, Singapore and Bali. Tick boxes included.
      </p>
      <div style={{ display:"flex", flexWrap:"wrap", gap:7, marginBottom:18 }}>
        {["Every flight","Japan","South Korea","Thailand","Singapore","Bali"].map(x => (
          <span key={x} style={{ fontSize:"0.7rem", background:"rgba(245,239,224,0.12)", borderRadius:100, padding:"4px 10px" }}>{x}</span>
        ))}
      </div>
      <a href={PACK_URL} target="_blank" rel="noopener noreferrer"
        onClick={()=>{ try { if (typeof window !== "undefined" && typeof window.gtag === "function") window.gtag("event","product_click",{ product:"asia_rules_pack", page:"tsa_rules" }); } catch (e) { console.error("track:", e); } }}
        style={{ display:"inline-block", background:T, color:"#fff", padding:"13px 30px", borderRadius:100, fontWeight:700, fontSize:"0.92rem", textDecoration:"none" }}>
        Get the pack — $12 →
      </a>
      <p style={{ fontSize:"0.7rem", opacity:0.55, marginTop:11 }}>Instant PDF download · print only the page you need</p>
    </section>
  );
}

function CTA() {
  return (
    <a href="/" style={{ display:"block", background:INK, color:SAND, borderRadius:16, padding:"24px 22px", textDecoration:"none", textAlign:"center", margin:"28px 0" }}>
      <p style={{ fontSize:"0.65rem", fontWeight:800, letterSpacing:"1.5px", textTransform:"uppercase", color:T, marginBottom:8 }}>✈️ Free · No login</p>
      <p style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.4rem", fontWeight:700, marginBottom:6 }}>Get your personalized packing list</p>
      <p style={{ fontSize:"0.82rem", opacity:0.6, marginBottom:16, lineHeight:1.5 }}>Weather-matched to your exact travel dates, with insurance and local events. Takes 30 seconds.</p>
      <span style={{ display:"inline-block", background:T, color:"#fff", padding:"12px 28px", borderRadius:100, fontWeight:700, fontSize:"0.9rem" }}>Build my list →</span>
    </a>
  );
}

export default function TSARules() {
  useEffect(() => {
    document.title = TITLE;
    const setMeta = (name, content, prop) => {
      const attr = prop ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    setMeta("description", META);
    setMeta("og:title", TITLE, true);
    setMeta("og:description", META, true);
    setMeta("og:type", "article", true);

    let ld = document.getElementById("ld-json");
    if (!ld) { ld = document.createElement("script"); ld.id = "ld-json"; ld.type = "application/ld+json"; document.head.appendChild(ld); }
    ld.textContent = JSON.stringify([
      { "@context":"https://schema.org", "@type":"Article", "headline":TITLE, "description":META },
      { "@context":"https://schema.org", "@type":"FAQPage", "mainEntity":FAQS.map(f => ({
        "@type":"Question", "name":f.q, "acceptedAnswer":{ "@type":"Answer", "text":f.a },
      })) },
    ]);

    let canon = document.querySelector('link[rel="canonical"]');
    if (!canon) { canon = document.createElement("link"); canon.setAttribute("rel","canonical"); document.head.appendChild(canon); }
    canon.setAttribute("href", "https://worldprept.com/tsa-rules");
  }, []);

  return (
    <div style={{ background:CREAM, minHeight:"100vh", color:INK, fontFamily:"system-ui,-apple-system,'Segoe UI',Roboto,sans-serif" }}>
      {/* Hero */}
      <header style={{ background:INK, color:SAND, padding:"40px 0 34px" }}>
        <div style={wrap}>
          <a href="/" style={{ color:T, textDecoration:"none", fontSize:"0.78rem", fontWeight:700 }}>← WorldPrept</a>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"2rem", lineHeight:1.2, margin:"14px 0 10px" }}>What TSA Confiscates: The Full Carry-On List</h1>
          <p style={{ fontSize:"0.9rem", opacity:0.75, lineHeight:1.6 }}>Updated for 2026. Every rule that gets ordinary items pulled at airport security — liquids, powders, frozen packs, batteries, duty-free — plus the surprising things you're actually allowed to bring.</p>
        </div>
      </header>

      <div style={wrap}>
        <CTA />

        {SECTIONS.map((s, i) => (
          <section key={`s${i}`} style={{ marginBottom:30 }}>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.35rem", marginBottom:10 }}>{s.h}</h2>
            <p style={{ fontSize:"0.9rem", color:INKL, lineHeight:1.7, marginBottom:12 }}>{s.p}</p>
            <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
              {s.items.map((it, j) => (
                <div key={`s${i}i${j}`} style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
                  <span style={{ color:T, fontWeight:800, flexShrink:0 }}>•</span>
                  <span style={{ fontSize:"0.88rem", color:INKL, lineHeight:1.6 }}>{it}</span>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* FAQs */}
        <section style={{ marginBottom:28, background:SAND, borderRadius:14, padding:"22px 20px" }}>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.35rem", marginBottom:14 }}>Frequently asked questions</h2>
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            {FAQS.map((f, i) => (
              <div key={`f${i}`}>
                <p style={{ fontSize:"0.92rem", fontWeight:700, marginBottom:5 }}>{f.q}</p>
                <p style={{ fontSize:"0.86rem", color:INKL, lineHeight:1.7 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <AsiaPack />

        {/* Internal links */}
        <section style={{ marginBottom:24 }}>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.35rem", marginBottom:14 }}>Packing Guides by Destination</h2>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
            {[["tokyo","🇯🇵 Tokyo"],["bali","🇮🇩 Bali"],["bangkok","🇹🇭 Bangkok"],["dubai","🇦🇪 Dubai"],["sydney","🇦🇺 Sydney"],["singapore","🇸🇬 Singapore"],["paris","🇫🇷 Paris"],["london","🇬🇧 London"],["rome","🇮🇹 Rome"],["cancun","🇲🇽 Cancún"]].map(([slug,label]) => (
              <a key={slug} href={`/pack/${slug}`} style={{ display:"inline-flex", alignItems:"center", gap:6, background:CREAM, border:`1.5px solid ${BDR}`, borderRadius:100, padding:"8px 14px", textDecoration:"none", fontSize:"0.8rem", fontWeight:600, color:INK }}>{label}</a>
            ))}
          </div>
        </section>

        <CTA />

        <p style={{ fontSize:"0.72rem", color:INKL, opacity:0.7, lineHeight:1.6, paddingBottom:30 }}>
          Rules summarised from TSA and FAA guidance and current airline policies, and can change or be applied at an officer's discretion. Always check TSA.gov and your airline before you fly. <a href="/privacy" style={{ color:INKL, textDecoration:"underline" }}>Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}

