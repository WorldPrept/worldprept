import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import React from "react";

const API = "https://api.anthropic.com/v1/messages"; // direct (Claude sandbox)
const API_PROXY = "/api/generate";                    // proxy (Vercel deployment)
// Detect environment: Claude sandbox vs real deployment
const USE_PROXY = typeof window !== "undefined" &&
  window.location.hostname !== "localhost" &&
  !window.location.hostname.includes("claude") &&
  !window.location.hostname.includes("anthropic") &&
  window.location.hostname !== "";
const AMZN = "worldprept-20";
const VIATOR_URL = "https://www.viator.com/?m=63915&pid=P00303056&mcid=42383&medium=link";
const VIATOR_SEARCH = "https://www.viator.com/searchResults/all?text=";
const VIATOR_PARAMS = "&m=63915&pid=P00303056&mcid=42383&medium=link";
const BOOKING = "?aid=304142"; // update when Booking.com approves

// ── Colors (no CSS vars in inline styles)
const T = "#C4623A", TL = "#2C7873", INK = "#1A1410", INKL = "#4A3F35";
const SAND = "#F5EFE0", SANDD = "#EDE4CC", CREAM = "#FDFAF4", BDR = "rgba(26,20,16,0.12)";

// ── Insurance (World Nomads removed — application declined)
const INS = [
  { id:"sw", name:"SafetyWing",   logo:"🌍", color:T,         badge:"Most Popular", desc:"~$42–$84/mo. Cancel anytime. Global medical cover.", quote:()=>`https://safetywing.com/?referenceID=26534800&utm_source=26534800&utm_medium=Ambassador` },
  { id:"al", name:"Allianz",      logo:"🛡️", color:"#4A6FA5", badge:"Family Choice",desc:"Strong family & cancellation plans. Major US insurer.",quote:(f)=>`https://www.allianztravelinsurance.com/buy/comboSearch.htm?travelersCount=${f.people}&depDate=${f.depDate}&retDate=${f.retDate}&destination=${encodeURIComponent(f.destination||"")}&src=worldprept` },
  { id:"tg", name:"Travel Guard", logo:"💼", color:"#6B4C8A", badge:"Business Pick", desc:"AIG-backed 24/7 assistance. Cancel-for-any-reason.",quote:(f)=>`https://www.travelguard.com/travel-insurance/plans/?ref=worldprept&dep=${f.depDate}&ret=${f.retDate}&dest=${encodeURIComponent(f.destination||"")}` },
];

// ── Gear
const mk = (dp,price,emoji,name,brand,why) => ({ id:dp, url:`https://www.amazon.com/dp/${dp}?tag=${AMZN}`, price, emoji, name, brand, why });
const GEAR_ADULT  = [
  mk("B01M0YHHCB","~$22","🧳","Packing Cubes","Bagail 6-Set","Compresses clothes. Eliminates suitcase chaos."),
  mk("B078PQDM2H","~$28","🔌","Universal Adapter","EPICKA","Works in 150+ countries. USB-A & USB-C."),
  mk("B09VPHVD96","~$60","⚡","Portable Charger","Anker 737 20000mAh","4–5 full phone charges. Never die at a gate."),
  mk("B07BBGBKFQ","~$60","😴","Travel Neck Pillow","Trtl Pillow Plus","Real neck support. Transforms red-eye flights."),
  mk("B09XS7JWHH","~$280","🎧","Noise-Cancelling ANC","Sony WH-1000XM5","Best-in-class ANC. Long flights = bearable."),
  mk("B00ANFUERM","~$20","🔒","TSA Luggage Locks","Forge 4-Pack","TSA-approved. Checked-bag peace of mind."),
  mk("B01MXYVFNQ","~$14","🧴","Leak-Proof Bottles","Dot&Dot Silicone","Zero leaks. No exploded shampoo."),
  mk("B00J4AGQT2","~$12","⚖️","Luggage Scale","Freetoo Digital","Avoid overweight fees at check-in."),
];
const GEAR_KIDS   = [
  mk("B01N5EHFOL","~$30","😴","Kids Travel Pillow","bcozzy Kids","Chin-support. Little heads stop drooping."),
  mk("B099H3WNNN","~$190","📱","Kids Fire Tablet","Amazon Fire HD 10","Kid-proof. Hours of content on planes."),
  mk("B07G3XG9GG","~$50","🎧","Kids Headphones","Puro Sound BT2200","Volume-limited 85dB. Protects hearing."),
  mk("B00BAOSFME","~$30","🎒","Kids Backpack","Skip Hop Zoo","Kids carry their own snacks."),
  mk("B001GGRC6W","~$15","☀️","Kids SPF 50+","Neutrogena Pure & Free","Mineral, tear-free, reef-safe."),
  mk("B00MKVD8IK","~$18","🍎","Snack Containers","Munchkin Click Lock","Spill-proof. Snacks stay fresh."),
  mk("B000GG0BNE","~$20","🩹","Kids First Aid Kit","Me4kidz Medibag","Child doses, bandages & antiseptic."),
  mk("B01NATHTU5","~$25","🦺","Toddler Harness","Trunki PaddlePak","Keeps toddlers close in busy airports."),
];
const GEAR_GROUP  = [
  mk("B08XMQVJYP","~$180","🔊","Bluetooth Speaker","JBL Charge 5","Waterproof, 20hr battery."),
  mk("B00P936188","~$36","🔋","6-Port USB Charger","Anker 60W","6 devices from one plug."),
  mk("B07GBSH12V","~$10","🃏","Travel Card Game","Taco Cat Goat","Hilarious. Perfect for waits."),
];
const GEAR_COUPLE = [
  { id:"couple-pillow", url:`https://www.amazon.com/dp/B07BBGBKFQ?tag=${AMZN}`, price:"~$60×2", emoji:"💑", name:"2× Travel Pillows", brand:"Trtl Pillow ×2", why:"Both sleep comfortably on long-haul." },
  mk("B00MVKXOKY","~$24","👛","RFID Travel Wallets","Zoppen 2-Pack","RFID-blocking. Slim & matching."),
];

const ALERT_TYPES = [
  { id:"weather", emoji:"🌦️", label:"Weather Updates",     desc:"Forecasts & packing tweaks" },
  { id:"safety",  emoji:"🚨", label:"Safety Alerts",        desc:"Travel advisories & entry changes" },
  { id:"deals",   emoji:"💸", label:"Flight & Hotel Deals", desc:"Price drops for your destination" },
  { id:"events",  emoji:"🎉", label:"Local Events",          desc:"Festivals during your stay" },
  { id:"visa",    emoji:"📋", label:"Visa & Entry Updates",  desc:"Rule changes for your passport" },
];

const LUGGAGE_OPTS = [
  { id:"backpack",      label:"Backpack only",        icon:"🎽", desc:"~20L ultra-light" },
  { id:"carry_only",    label:"Carry-on only",        icon:"🎒", desc:"~7kg no checked bags" },
  { id:"carry_checked", label:"Carry-on + 1 checked", icon:"🧳", desc:"~23kg standard" },
  { id:"two_checked",   label:"2 checked bags",       icon:"🛄", desc:"Pack generously" },
  { id:"three_checked", label:"3 checked bags",       icon:"🛄", desc:"Large group" },
  { id:"four_checked",  label:"4+ checked bags",      icon:"🛄", desc:"Maximum packing" },
];
const LUG_NOTE = {
  backpack:      "Backpack ~20L — absolute essentials ONLY.",
  carry_only:    "Carry-on ~7kg — versatile, quick-dry. Every item serves 2+ purposes.",
  carry_checked: "Carry-on + 1 checked ~23kg — comfortable variety.",
  two_checked:   "2 checked bags — generous packing, full wardrobe.",
  three_checked: "3 checked bags — large group, full bag per person.",
  four_checked:  "4+ checked bags — maximum packing, everything included.",
};

const TRIP_TYPES  = ["Beach & Sun","City Break","Hiking & Adventure","Business","Family","Road Trip","Skiing","Cultural","Cruise","Honeymoon"];
const PEOPLE_OPTS = ["1","2","3","4","5","6+"];
const KIDS_OPTS   = ["No kids","1 child","2 children","3+ children"];
const INIT_FORM   = { destination:"", depDate:"", retDate:"", duration:"", tripType:"", activities:"", people:"1", kids:"No kids", luggage:"carry_checked" };

// ── Helpers
const today      = () => new Date().toISOString().split("T")[0];
const nights     = (a,b) => !a||!b?0:Math.max(0,Math.round((new Date(b)-new Date(a))/86400000));
const fmt        = (d) => !d?"":new Date(d+"T00:00:00").toLocaleDateString("en",{month:"short",day:"numeric"});
const durStr     = (n) => n<=0?"":n<=3?"1–3 days":n<=7?"4–7 days":n<=14?"1–2 weeks":n<=28?"2–4 weeks":"1+ month";
const getInsIds = (txt) => INS.filter(p=>txt.toLowerCase().includes(p.name.toLowerCase())).map(p=>p.id);

function actLinks(dest) {
  const s = encodeURIComponent((dest||"").split(",")[0].trim());
  return [
    { emoji:"⭐", name:"Top-Rated Tours",        desc:"Best-reviewed experiences",    url:`${VIATOR_SEARCH}${s}${VIATOR_PARAMS}` },
    { emoji:"🚌", name:"Day Trips",              desc:"Excursions from the city",     url:`${VIATOR_SEARCH}${s}+day+trip${VIATOR_PARAMS}` },
    { emoji:"🍜", name:"Food & Culture Tours",   desc:"Eat like a local",             url:`${VIATOR_SEARCH}${s}+food+tour${VIATOR_PARAMS}` },
    { emoji:"🏄", name:"Outdoor Adventures",     desc:"Hiking, diving, water sports", url:`${VIATOR_SEARCH}${s}+outdoor${VIATOR_PARAMS}` },
    { emoji:"🎟️", name:"Skip-the-Line Tickets", desc:"No queues at attractions",     url:`${VIATOR_SEARCH}${s}+tickets${VIATOR_PARAMS}` },
  ];
}
function htlLinks(dest,ci,co) {
  const c = encodeURIComponent((dest||"").split(",")[0].trim());
  const b = `https://www.booking.com/searchresults.html?ss=${c}&checkin=${ci}&checkout=${co}${BOOKING}`;
  return [
    { emoji:"🗺️", name:"Near Top Attractions", desc:"Walk to everything",            url:`${b}&order=class` },
    { emoji:"💰", name:"Best Value",            desc:"Highly rated & affordable",     url:`${b}&order=bayesian_review_score` },
    { emoji:"✨", name:"Luxury Hotels",         desc:"5-star stays",                  url:`${b}&nflt=class%3D5` },
    { emoji:"🏡", name:"Boutique & Unique",     desc:"Local gems & guesthouses",      url:`${b}&nflt=property_type%3D204` },
  ];
}

async function copyToClipboard(text) {
  try { if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(text); return true; } } catch(_){}
  try { const e=document.createElement("textarea"); e.value=text; e.style.cssText="position:fixed;opacity:0"; document.body.appendChild(e); e.select(); document.execCommand("copy"); document.body.removeChild(e); return true; } catch(_){ return false; }
}
function buildShareText(form, packingText, checked) {
  if (!packingText) return "";
  const rows=[];
  packingText.split("\n").forEach((line,i)=>{
    if (!line.trim()) return;
    if (line.startsWith("- ")) rows.push(`${checked[`pk${i}`]?"✅":"⬜"} ${line.slice(2).trim()}`);
    else if (line.match(/^[🌤️🧥📄🧴💊💻🎯👶]/u)) rows.push(`\n${line}`);
  });
  return `✈️ WorldPrept — ${form.destination}\n${fmt(form.depDate)} – ${fmt(form.retDate)} | ${form.tripType}\n${rows.join("\n")}\n\nBuilt with WorldPrept`;
}

// ── Prompt
function buildPrompt(form) {
  const adults  = parseInt(form.people)||1;
  const hasKids = form.kids!=="No kids";
  const numKids = hasKids?(form.kids==="1 child"?1:form.kids==="2 children"?2:3):0;
  const n       = nights(form.depDate,form.retDate);
  const lugNote = LUG_NOTE[form.luggage]||"";
  const depMon  = form.depDate?new Date(form.depDate+"T00:00:00").toLocaleString("en",{month:"long"}):"";
  const retMon  = form.retDate?new Date(form.retDate+"T00:00:00").toLocaleString("en",{month:"long"}):depMon;
  const monRange= depMon===retMon?depMon:`${depMon}–${retMon}`;
  const target  = {backpack:25,carry_only:35,carry_checked:50,two_checked:65,three_checked:80,four_checked:90}[form.luggage]||50;
  const qtyNote = adults>1?`per person e.g. "T-shirts ×${Math.ceil(n/2)} each"`:`e.g. "T-shirts ×${Math.min(Math.ceil(n*0.7)+1,10)}"`;
  return `You are WorldPrept AI. Respond with EXACTLY three sections using the markers.

TRIP: ${form.destination} | ${form.depDate}→${form.retDate} (${n} nights, ${monRange}) | ${form.tripType} | ${form.activities||"sightseeing"} | ${adults} adults${hasKids?` + ${numKids} child${numKids>1?"ren":""}`:""} | ${lugNote}

[PACKING_START]
Line 1 — weather only:
🌤️ [City], [Month]: [temp range °C/°F], [2-3 word condition]

Packing list targeting ~${target} items. Headers:
🧥 Clothing
📄 Documents & Money
🧴 Toiletries
💊 Health & Safety
💻 Tech & Gear
🎯 Trip Extras${hasKids?`\n👶 Kids (${numKids} child${numKids>1?"ren":""})`:``}

RULES: Short noun phrases ONLY. Max 5 words. NO explanations. NO parentheses.
Good: "Linen shirts ×5" "Rain jacket" "SPF50 sunscreen"
Bad: "Shirts (for the heat)" "Remember your passport"
Quantities: ${qtyNote}
Luggage: ${lugNote}
${hasKids?`Kids: weather-matched clothing, toiletries, entertainment, health items.`:""}
[PACKING_END]

[INSURANCE_START]
💊 Medical Coverage
✈️ Trip Cancellation
🏔️ Adventure & Activities
🏢 Top Picks

Top Picks: recommend 2–3 from SafetyWing, World Nomads, Allianz, Travel Guard.
Format: "ProviderName: one sentence why it fits this trip."
Max 3 bullets per section.
[INSURANCE_END]

[EVENTS_START]
Only include events and holidays you are CERTAIN exist. Never invent events.

🎉 Events & Festivals
3–5 real events in ${form.destination} during ${monRange}. Format: "- Name — description"

🗓️ Public Holidays
Confirmed holidays between ${form.depDate} and ${form.retDate}.
Format: "- Month Day: Name (impact)" or "- No public holidays during these dates."

🌍 Local Know-How
4 tips: etiquette, transport, payment, tipping. One line each.
Format: "- tip"

🍽️ Must-Try Food & Drink
4–5 iconic dishes or drinks. Format: "- Name — description"
[EVENTS_END]`;
}

function parseAll(raw) {
  const get = tag => { const m=raw.match(new RegExp(`\\[${tag}_START\\]([\\s\\S]*?)\\[${tag}_END\\]`)); return m?m[1].trim():""; };
  return { packing:get("PACKING"), insurance:get("INSURANCE"), events:get("EVENTS") };
}

// ── CSS
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;600;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:#F5EFE0;font-family:'DM Sans',system-ui,sans-serif;-webkit-font-smoothing:antialiased}
.app{min-height:100vh;background:#F5EFE0;background-image:radial-gradient(ellipse at 20% 20%,rgba(196,98,58,0.06) 0%,transparent 50%),radial-gradient(ellipse at 80% 80%,rgba(44,120,115,0.06) 0%,transparent 50%);display:flex;flex-direction:column;align-items:center;padding:28px 14px 80px}
.hdr{text-align:center;margin-bottom:20px;animation:fadeUp 0.55s ease both}
.badge{display:inline-flex;align-items:center;gap:6px;background:#1A1410;color:#F5EFE0;padding:4px 12px;border-radius:100px;font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px}
.dot{width:5px;height:5px;background:#C4623A;border-radius:50%}
h1{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,5vw,2.9rem);color:#1A1410;line-height:1.1;margin-bottom:6px}
h1 span{color:#C4623A}
.sub{font-size:0.82rem;color:#4A3F35;font-weight:300;max-width:360px;margin:0 auto;line-height:1.6}
.sp-row{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-bottom:16px;max-width:540px;width:100%}
.sp-pill{background:#FDFAF4;border:1px solid rgba(26,20,16,0.12);border-radius:100px;padding:5px 12px;font-size:0.67rem;color:#4A3F35;white-space:nowrap}
.card{background:#FDFAF4;border:1px solid rgba(26,20,16,0.12);border-radius:20px;padding:22px;width:100%;max-width:540px;box-shadow:0 4px 32px rgba(26,20,16,0.06);animation:fadeUp 0.5s ease 0.07s both}
.lbl{display:block;font-size:9px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#4A3F35;margin-bottom:5px}
.fg{margin-bottom:15px}
input[type=text],input[type=date],input[type=email]{width:100%;padding:11px 13px;border:1.5px solid rgba(26,20,16,0.12);border-radius:10px;background:#F5EFE0;color:#1A1410;font-family:'DM Sans',sans-serif;font-size:16px;outline:none;transition:border-color 0.18s;-webkit-appearance:none}
input:focus{border-color:#C4623A;box-shadow:0 0 0 3px rgba(196,98,58,0.09)}
.pills{display:flex;flex-wrap:wrap;gap:5px;margin-top:3px}
.pill{padding:6px 12px;border-radius:100px;border:1.5px solid rgba(26,20,16,0.12);background:#F5EFE0;color:#4A3F35;font-size:0.74rem;font-family:'DM Sans',sans-serif;cursor:pointer;transition:all 0.13s;font-weight:500}
.pill:hover{border-color:#C4623A;color:#C4623A}
.pill.on{background:#C4623A;border-color:#C4623A;color:#fff}
.pill.kids-on{background:#2C7873;border-color:#2C7873;color:#fff}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.lg-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:7px;margin-top:3px}
.lg-opt{padding:9px 11px;border:1.5px solid rgba(26,20,16,0.12);border-radius:11px;background:#F5EFE0;cursor:pointer;text-align:left;transition:all 0.13s;width:100%}
.lg-opt:hover,.lg-opt.on{border-color:#C4623A}
.lg-opt.on{background:rgba(196,98,58,0.05)}
.btn-main{width:100%;padding:13px;background:#1A1410;color:#F5EFE0;border:none;border-radius:11px;font-family:'DM Sans',sans-serif;font-size:0.9rem;font-weight:700;cursor:pointer;transition:all 0.18s;margin-top:10px;-webkit-tap-highlight-color:transparent}
.btn-main:hover:not(:disabled){background:#C4623A;transform:translateY(-1px)}
.btn-main:disabled{background:#EDE4CC;color:#4A3F35;cursor:not-allowed;opacity:0.7}
.btn-back{width:100%;padding:11px;background:transparent;color:#4A3F35;border:1.5px solid rgba(26,20,16,0.12);border-radius:11px;font-family:'DM Sans',sans-serif;font-size:0.83rem;cursor:pointer;transition:all 0.15s;margin-top:7px}
.btn-back:hover{border-color:#4A3F35;color:#1A1410}
.err{color:#C4623A;font-size:0.74rem;text-align:center;margin-top:6px;padding:8px 12px;background:rgba(196,98,58,0.07);border-radius:8px;border:1px solid rgba(196,98,58,0.2)}
.loading{text-align:center;padding:50px 24px}
.spin{width:44px;height:44px;border:3px solid #EDE4CC;border-top-color:#C4623A;border-radius:50%;animation:spin 0.8s linear infinite;margin:0 auto 18px}
.l-title{font-family:'Playfair Display',serif;font-size:1.3rem;color:#1A1410;margin-bottom:5px}
.l-sub{color:#4A3F35;font-size:0.78rem;font-weight:300;margin-bottom:20px}
.wrap{width:100%;max-width:700px;animation:fadeUp 0.4s ease both}
.tripbar{background:#1A1410;color:#F5EFE0;border-radius:14px;padding:13px 18px;margin-bottom:10px;display:flex;align-items:center;justify-content:space-between;gap:9px;flex-wrap:wrap}
.t-meta{font-size:0.63rem;opacity:0.5;margin-bottom:2px}
.t-title{font-family:'Playfair Display',serif;font-size:1.05rem}
.bar-btns{display:flex;gap:5px;flex-wrap:wrap}
.b-ghost{padding:6px 12px;border:1.5px solid rgba(245,239,224,0.2);border-radius:100px;background:transparent;color:#F5EFE0;font-family:'DM Sans',sans-serif;font-size:0.68rem;font-weight:600;cursor:pointer;transition:all 0.13s;white-space:nowrap}
.b-alert{padding:6px 12px;border:none;border-radius:100px;background:#C4623A;color:#fff;font-family:'DM Sans',sans-serif;font-size:0.68rem;font-weight:700;cursor:pointer;transition:all 0.13s;white-space:nowrap}
.b-share{padding:6px 12px;border:1.5px solid rgba(245,239,224,0.3);border-radius:100px;background:rgba(245,239,224,0.1);color:#F5EFE0;font-family:'DM Sans',sans-serif;font-size:0.68rem;font-weight:700;cursor:pointer;white-space:nowrap}
.nudge{display:flex;align-items:center;gap:10px;background:rgba(196,98,58,0.05);border:1px solid rgba(196,98,58,0.16);border-radius:10px;padding:9px 12px;margin-bottom:10px;cursor:pointer;transition:all 0.13s}
.tabs{display:flex;gap:3px;background:#EDE4CC;padding:3px;border-radius:10px;margin-bottom:12px}
.tab{flex:1;padding:9px 5px;border:none;border-radius:8px;background:transparent;font-family:'DM Sans',sans-serif;font-size:0.68rem;font-weight:700;color:#4A3F35;cursor:pointer;transition:all 0.13s;white-space:nowrap}
.tab.on{background:#FDFAF4;color:#1A1410;box-shadow:0 2px 6px rgba(26,20,16,0.08)}
.panel{background:#FDFAF4;border:1px solid rgba(26,20,16,0.12);border-radius:18px;padding:20px;box-shadow:0 3px 28px rgba(26,20,16,0.05)}
.modal-bg{position:fixed;inset:0;background:rgba(26,20,16,0.55);z-index:100;display:flex;align-items:center;justify-content:center;padding:16px;backdrop-filter:blur(5px)}
.modal{background:#FDFAF4;border-radius:20px;padding:26px 22px;width:100%;max-width:400px;position:relative;max-height:92vh;overflow-y:auto;box-shadow:0 20px 70px rgba(26,20,16,0.2)}
.modal-close{position:absolute;top:12px;right:12px;width:28px;height:28px;border:none;background:#F5EFE0;border-radius:50%;cursor:pointer;font-size:0.82rem;color:#4A3F35;display:flex;align-items:center;justify-content:center}
.sec-hdr{font-size:0.65rem;font-weight:800;letter-spacing:1px;text-transform:uppercase;color:#4A3F35;margin:18px 0 7px;padding-bottom:5px;border-bottom:1px solid rgba(26,20,16,0.12)}
.sec-hdr.kids{color:#C4623A;border-color:rgba(196,98,58,0.25)}
.check-row{display:flex;align-items:center;gap:10px;padding:7px 5px;cursor:pointer;border-radius:8px;transition:background 0.1s;user-select:none}
.check-row:hover{background:#F5EFE0}
.chk{width:19px;height:19px;border-radius:5px;flex-shrink:0;display:flex;align-items:center;justify-content:center;transition:all 0.15s}
.step-dot{width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.6rem;font-weight:900;transition:all 0.28s;flex-shrink:0}
.step-line{flex:1;height:2px;margin:0 4px;transition:background 0.28s}
.weather-pill{display:flex;align-items:center;gap:8px;background:rgba(44,120,115,0.08);border:1px solid rgba(44,120,115,0.2);border-radius:10px;padding:9px 13px;margin-bottom:18px}
.info-badge{display:inline-flex;align-items:center;gap:5px;background:rgba(44,120,115,0.09);color:#2C7873;border:1px solid rgba(44,120,115,0.2);padding:3px 11px;border-radius:100px;font-size:0.65rem;font-weight:700;margin-bottom:16px}
.affcard{display:flex;align-items:center;gap:10px;padding:10px 13px;background:#F5EFE0;border-radius:11px;text-decoration:none;transition:all 0.15s;border:1.5px solid rgba(26,20,16,0.12)}
.gear-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:9px}
.gear-card{display:flex;flex-direction:column;gap:5px;padding:12px 13px;background:#F5EFE0;border-radius:12px;text-decoration:none;transition:all 0.15s;position:relative;border:1.5px solid rgba(26,20,16,0.12)}
.owned-btn{position:absolute;top:8px;right:8px;width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.5rem;font-weight:900;cursor:pointer;transition:all 0.15s}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
@media(max-width:420px){.g2{grid-template-columns:1fr 1fr}.lg-grid{grid-template-columns:1fr 1fr}.card,.panel{padding:16px}.tab{font-size:0.6rem;padding:8px 3px}.bar-btns{gap:4px}}
`;

// ── Step dots
function Steps({ cur, total }) {
  return (
    <div style={{display:"flex",alignItems:"center",marginBottom:20}}>
      {Array.from({length:total}).map((_,i)=>(
        <div key={i} style={{display:"flex",alignItems:"center",flex:i<total-1?1:"none"}}>
          <div className="step-dot" style={{background:i+1<cur?"#2C7873":i+1===cur?"#C4623A":"#EDE4CC",color:i+1<=cur?"white":"#4A3F35"}}>
            {i+1<cur?"✓":i+1}
          </div>
          {i<total-1&&<div className="step-line" style={{background:i+1<cur?"#2C7873":"#EDE4CC"}}/>}
        </div>
      ))}
    </div>
  );
}

// ── Packing List
function PackingList({ text, checked, setChecked, onShare }) {
  if (!text) return null;
  const allLines = text.split("\n");
  const total = allLines.filter(l=>l.startsWith("- ")).length;
  const done  = Object.values(checked).filter(Boolean).length;
  return (
    <div>
      {total>0&&(
        <div style={{marginBottom:18}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:"0.64rem",fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",color:INKL}}>Progress</span>
              <span style={{fontSize:"0.64rem",fontWeight:700,color:done===total?"#2C7873":INKL}}>{done===total&&total>0?"✓ All packed!": `${done}/${total}`}</span>
            </div>
            <button onClick={onShare} style={{padding:"4px 10px",border:`1.5px solid ${BDR}`,borderRadius:100,background:SAND,color:INKL,fontSize:"0.65rem",fontWeight:700,cursor:"pointer"}}>📋 Save & share</button>
          </div>
          <div style={{height:5,background:SANDD,borderRadius:10,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${total?(done/total)*100:0}%`,background:done===total?"#2C7873":T,borderRadius:10,transition:"width 0.3s"}}/>
          </div>
        </div>
      )}
      {allLines.map((line,i)=>{
        const key=`pk${i}`;
        if (!line.trim()) return null;
        if (line.startsWith("🌤️")) return (
          <div key={key} className="weather-pill">
            <span>🌤️</span>
            <span style={{fontSize:"0.8rem",fontWeight:600,color:"#2C7873"}}>{line.replace("🌤️","").trim()}</span>
          </div>
        );
        if (line.match(/^[🧥📄🧴💊💻🎯👶]/u)) {
          const isKids=line.startsWith("👶");
          return <p key={key} className={`sec-hdr${isKids?" kids":""}`}>{line}</p>;
        }
        if (line.startsWith("- ")) {
          const item=line.slice(2).trim();
          const ticked=!!checked[key];
          return (
            <div key={key} className="check-row" onClick={()=>setChecked(p=>({...p,[key]:!p[key]}))}>
              <div className="chk" style={{border:ticked?"none":`1.5px solid rgba(26,20,16,0.2)`,background:ticked?"#2C7873":"transparent"}}>
                {ticked&&<span style={{color:"white",fontSize:"0.55rem",fontWeight:900}}>✓</span>}
              </div>
              <span style={{fontSize:"0.875rem",color:ticked?INKL:INK,textDecoration:ticked?"line-through":"none",opacity:ticked?0.4:1}}>{item}</span>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

// ── Gear Card
function GearCard({ item, owned, onToggle }) {
  const [hov,setHov]=useState(false);
  return (
    <div style={{position:"relative"}}>
      <button onClick={e=>{e.stopPropagation();e.preventDefault();onToggle(item.id);}} className="owned-btn"
        style={{border:`1.5px solid ${owned?"#2C7873":BDR}`,background:owned?"#2C7873":CREAM}}>
        <span style={{color:owned?"white":"#4A3F35"}}>{owned?"✓":"·"}</span>
      </button>
      <a href={item.url} target="_blank" rel="noopener noreferrer" className="gear-card"
        onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
        style={{background:owned?"rgba(44,120,115,0.05)":SAND,borderColor:owned?"#2C7873":hov?T:BDR,opacity:owned?0.7:1}}>
        <span style={{fontSize:"1.15rem"}}>{item.emoji}</span>
        <div>
          <p style={{fontSize:"0.76rem",fontWeight:700,color:INK,marginBottom:1}}>{item.name}</p>
          <p style={{fontSize:"0.59rem",color:INKL,opacity:0.65}}>{item.brand}</p>
        </div>
        <p style={{fontSize:"0.68rem",color:INKL,lineHeight:1.4,flex:1}}>{item.why}</p>
        <span style={{fontSize:"0.64rem",fontWeight:700,color:owned?"#2C7873":T}}>{owned?"✓ Owned":`${item.price} — View ↗`}</span>
      </a>
    </div>
  );
}

// ── Gear Section
function GearSection({ form, owned, setOwned }) {
  const [expanded,setExpanded]=useState(false);
  const adults=parseInt(form.people)||1;
  const hasKids=form.kids!=="No kids";
  const isGroup=adults>=4;
  const isCpl=adults===2&&form.tripType==="Honeymoon";
  const ownedCount=Object.values(owned).filter(Boolean).length;
  const secs=[
    {title:"✈️ Travel Essentials",items:GEAR_ADULT,show:true,accent:false},
    {title:"👶 Kids Must-Haves",items:GEAR_KIDS,show:hasKids,accent:true},
    {title:"👥 Group Extras",items:GEAR_GROUP,show:isGroup,accent:false},
    {title:"💑 Couple Extras",items:GEAR_COUPLE,show:isCpl,accent:false},
  ].filter(s=>s.show);
  return (
    <div style={{marginTop:28,paddingTop:20,borderTop:`1px solid ${BDR}`}}>
      <button onClick={()=>setExpanded(e=>!e)} style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",background:"none",border:"none",cursor:"pointer",padding:0,marginBottom:expanded?14:0}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <p style={{fontSize:"0.63rem",fontWeight:800,letterSpacing:"1px",textTransform:"uppercase",color:INKL}}>⭐ Upgrade Your Trip</p>
          {ownedCount>0&&<span style={{fontSize:"0.6rem",color:"#2C7873",fontWeight:700}}>✓ {ownedCount} owned</span>}
        </div>
        <span style={{fontSize:"0.65rem",color:INKL}}>{expanded?"Hide ▲":`Show gear ▼`}</span>
      </button>
      {expanded&&(
        <div>
          <p style={{fontSize:"0.72rem",color:INKL,marginBottom:14}}>Tap ✓ on items you already own.</p>
          {secs.map((sec,si)=>(
            <div key={si} style={{marginBottom:si<secs.length-1?24:0}}>
              <p className={`sec-hdr${sec.accent?" kids":""}`}>{sec.title}</p>
              <div className="gear-grid">
                {sec.items.map(item=><GearCard key={item.id} item={item} owned={!!owned[item.id]} onToggle={id=>setOwned(p=>({...p,[id]:!p[id]}))}/>)}
              </div>
            </div>
          ))}
          <p style={{fontSize:"0.58rem",color:INKL,opacity:0.38,marginTop:12,textAlign:"center"}}>* Amazon affiliate links — small commission at no extra cost.</p>
        </div>
      )}
    </div>
  );
}

// ── Insurance View
function InsuranceView({ text, recIds, form }) {
  if (!text) return null;
  const picked=INS.filter(p=>recIds.includes(p.id));
  const lines=text.split("\n").filter(l=>l.trim()&&!INS.some(p=>l.toLowerCase().startsWith(p.name.toLowerCase()+":")));
  return (
    <div>
      <div className="info-badge">✓ Tailored to your exact trip & dates</div>
      {lines.map((line,i)=>{
        if (line.match(/^[💊✈️🏔️🏢]/u)) {
          if (line.startsWith("🏢")) return null;
          return <p key={i} className="sec-hdr">{line}</p>;
        }
        if (line.startsWith("- ")||line.startsWith("• ")) return (
          <div key={i} style={{display:"flex",gap:8,padding:"4px 0"}}>
            <span style={{color:"#2C7873",flexShrink:0,fontSize:"0.55rem",marginTop:5}}>●</span>
            <span style={{fontSize:"0.875rem",color:INKL,lineHeight:1.6}}>{line.replace(/^[-•]\s*/,"")}</span>
          </div>
        );
        return <p key={i} style={{fontSize:"0.875rem",color:INKL,lineHeight:1.7}}>{line.replace(/\*\*(.*?)\*\*/g,"$1")}</p>;
      })}
      {picked.length>0&&(
        <div style={{marginTop:20}}>
          <p className="sec-hdr">🏢 Recommended for This Trip</p>
          <p style={{fontSize:"0.72rem",color:INKL,marginBottom:12,lineHeight:1.5}}>Each button goes to a quote form pre-filled with your dates & destination.</p>
          <div style={{display:"flex",flexDirection:"column",gap:9}}>
            {picked.map(p=>(
              <a key={p.id} href={p.quote(form)} target="_blank" rel="noopener noreferrer" className="affcard"
                onMouseEnter={e=>{e.currentTarget.style.borderColor=p.color;e.currentTarget.style.transform="translateY(-1px)";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=BDR;e.currentTarget.style.transform="none";}}>
                <div style={{width:40,height:40,borderRadius:9,background:p.color+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.1rem",flexShrink:0}}>{p.logo}</div>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:2}}>
                    <span style={{fontWeight:700,fontSize:"0.83rem",color:INK}}>{p.name}</span>
                    <span style={{fontSize:"0.59rem",fontWeight:700,background:p.color+"18",color:p.color,border:`1px solid ${p.color}30`,padding:"1px 6px",borderRadius:100}}>{p.badge}</span>
                  </div>
                  <p style={{fontSize:"0.7rem",color:INKL,lineHeight:1.4}}>{p.desc}</p>
                </div>
                <div style={{textAlign:"right",flexShrink:0}}>
                  <p style={{fontSize:"0.65rem",fontWeight:700,color:p.color}}>Get Quote ↗</p>
                  <p style={{fontSize:"0.55rem",color:INKL,opacity:0.6}}>Pre-filled</p>
                </div>
              </a>
            ))}
          </div>
          <p style={{fontSize:"0.58rem",color:INKL,opacity:0.38,marginTop:8,textAlign:"center"}}>* Affiliate links — small commission at no extra cost.</p>
        </div>
      )}
    </div>
  );
}

// ── Aff Link Card
function AffCard({ emoji, name, desc, url, color }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="affcard"
      onMouseEnter={e=>{e.currentTarget.style.borderColor=color;e.currentTarget.style.transform="translateY(-1px)";}}
      onMouseLeave={e=>{e.currentTarget.style.borderColor=BDR;e.currentTarget.style.transform="none";}}>
      <div style={{width:36,height:36,borderRadius:8,background:color+"15",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1rem",flexShrink:0}}>{emoji}</div>
      <div style={{flex:1}}>
        <p style={{fontSize:"0.77rem",fontWeight:700,color:INK,marginBottom:1}}>{name}</p>
        <p style={{fontSize:"0.63rem",color:INKL}}>{desc}</p>
      </div>
      <span style={{fontSize:"0.63rem",fontWeight:700,color,whiteSpace:"nowrap"}}>Browse ↗</span>
    </a>
  );
}

// ── Events View
function EventsView({ text, form }) {
  const [sub,setSub]=useState("guide");
  const aLinks=useMemo(()=>actLinks(form.destination),[form.destination]);
  const hLinks=useMemo(()=>htlLinks(form.destination,form.depDate,form.retDate),[form.destination,form.depDate,form.retDate]);
  return (
    <div>
      <div style={{display:"flex",gap:3,background:SANDD,padding:"3px",borderRadius:10,marginBottom:16}}>
        {[["guide","📍 Guide"],["activities","🎟️ Activities"],["hotels","🏨 Hotels"]].map(([id,lbl])=>(
          <button key={id} onClick={()=>setSub(id)} className={`tab${sub===id?" on":""}`}>{lbl}</button>
        ))}
      </div>
      {sub==="guide"&&(
        <div>
          <div style={{display:"flex",gap:8,marginBottom:16,background:"rgba(196,98,58,0.06)",border:"1px solid rgba(196,98,58,0.18)",borderRadius:9,padding:"9px 12px"}}>
            <span>ℹ️</span>
            <p style={{fontSize:"0.69rem",color:INKL,lineHeight:1.5}}>Events are AI-generated from known patterns. <strong>Always verify dates</strong> on the official tourism website.</p>
          </div>
          {(text||"").split("\n").filter(l=>l.trim()).map((line,i)=>{
            if (line.match(/^[🎉🗓️🌍🍽️]/u)) return <p key={i} className="sec-hdr">{line}</p>;
            if (line.startsWith("- ")) {
              const parts=line.slice(2).split("—");
              return (
                <div key={i} style={{display:"flex",gap:9,padding:"5px 0",alignItems:"flex-start"}}>
                  <span style={{color:T,flexShrink:0,fontSize:"0.55rem",marginTop:6}}>●</span>
                  <span style={{fontSize:"0.875rem",color:INKL,lineHeight:1.6}}>
                    {parts.length>1?<><strong style={{color:INK,fontWeight:600}}>{parts[0].trim()}</strong>{" — "}{parts.slice(1).join("—").trim()}</>:parts[0]}
                  </span>
                </div>
              );
            }
            return <p key={i} style={{fontSize:"0.875rem",color:INKL,lineHeight:1.7}}>{line}</p>;
          })}
        </div>
      )}
      {sub==="activities"&&(
        <div>
          <p className="sec-hdr">🎟️ Book Activities — {(form.destination||"").split(",")[0]}</p>
          <p style={{fontSize:"0.71rem",color:INKL,marginBottom:14,lineHeight:1.5}}>Powered by Viator — 300,000+ experiences. Free cancellation on most bookings.</p>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {aLinks.map((a,i)=><AffCard key={i} {...a} color={T}/>)}
          </div>
          <p style={{fontSize:"0.58rem",color:INKL,opacity:0.38,marginTop:10,textAlign:"center"}}>* Viator affiliate links — small commission at no extra cost.</p>
        </div>
      )}
      {sub==="hotels"&&(
        <div>
          <p className="sec-hdr">🏨 Hotels near attractions — {(form.destination||"").split(",")[0]}</p>
          <p style={{fontSize:"0.71rem",color:INKL,marginBottom:14,lineHeight:1.5}}>Via Booking.com — filtered for <strong>{fmt(form.depDate)}</strong> → <strong>{fmt(form.retDate)}</strong>.</p>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {hLinks.map((h,i)=><AffCard key={i} {...h} color={TL}/>)}
          </div>
          <div style={{background:"rgba(44,120,115,0.06)",border:"1px solid rgba(44,120,115,0.16)",borderRadius:9,padding:"9px 12px",marginTop:12}}>
            <p style={{fontSize:"0.69rem",color:"#2C7873",fontWeight:700,marginBottom:2}}>💡 Pro tip</p>
            <p style={{fontSize:"0.67rem",color:INKL,lineHeight:1.5}}>Filter by "Near Metro/Train Station" for easy access without the central location price premium.</p>
          </div>
          <p style={{fontSize:"0.58rem",color:INKL,opacity:0.38,marginTop:10,textAlign:"center"}}>* Booking.com affiliate links — small commission at no extra cost.</p>
        </div>
      )}
    </div>
  );
}

// ── Share Modal
function ShareModal({ text, onClose }) {
  const [copied,setCopied]=useState(false);
  const handleCopy=useCallback(async()=>{ const ok=await copyToClipboard(text); if(ok){setCopied(true);setTimeout(()=>setCopied(false),2500);} },[text]);
  return (
    <div className="modal-bg">
      <div className="modal">
        <button onClick={onClose} aria-label="Close" className="modal-close">✕</button>
        <p style={{fontFamily:"'Playfair Display',serif",fontSize:"1.1rem",fontWeight:700,color:INK,marginBottom:12}}>📋 Your packing list</p>
        <textarea readOnly value={text} style={{width:"100%",height:200,padding:"10px 12px",border:`1.5px solid ${BDR}`,borderRadius:10,background:SAND,fontFamily:"monospace",fontSize:"0.72rem",color:INKL,lineHeight:1.6,resize:"none",outline:"none"}}/>
        <div style={{display:"flex",gap:8,marginTop:12}}>
          <button onClick={handleCopy} style={{flex:1,padding:"10px",border:"none",borderRadius:9,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"0.83rem",fontWeight:700,transition:"all 0.2s",background:copied?"#2C7873":INK,color:"white"}}>
            {copied?"✓ Copied!":"Copy to clipboard"}
          </button>
          <button onClick={onClose} style={{padding:"10px 14px",background:"transparent",color:INKL,border:`1.5px solid ${BDR}`,borderRadius:9,fontFamily:"'DM Sans',sans-serif",fontSize:"0.83rem",cursor:"pointer"}}>Close</button>
        </div>
        <p style={{fontSize:"0.63rem",color:INKL,opacity:0.5,textAlign:"center",marginTop:8}}>Paste into WhatsApp, Notes or email to share with your travel group.</p>
      </div>
    </div>
  );
}

// ── Email Modal
function EmailModal({ form:tf, onClose }) {
  const [email,setEmail]=useState(""); const [name,setName]=useState("");
  const [alerts,setAlerts]=useState(["weather","safety","events"]);
  const [done,setDone]=useState(false); const [loading,setLoading]=useState(false);
  const emailValid=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const toggle=id=>setAlerts(p=>p.includes(id)?p.filter(a=>a!==id):[...p,id]);
  const submit=async()=>{
    if (!emailValid) return;
    setLoading(true);
    try {
      const res=await fetch("/api/subscribe",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,name,alerts,trip:tf})});
      await res.json();
    } catch(e){ console.error("Subscribe:",e); }
    // Always complete — don't block user on email API failures
    setLoading(false);
    setDone(true);
  };
  const IS={padding:"11px 13px",border:`1.5px solid ${BDR}`,borderRadius:9,background:SAND,color:INK,fontFamily:"'DM Sans',sans-serif",fontSize:"16px",outline:"none",width:"100%"};
  return (
    <div className="modal-bg">
      <div className="modal">
        <button onClick={onClose} aria-label="Close" className="modal-close">✕</button>
        {!done?(
          <>
            <p style={{fontSize:"1.4rem",marginBottom:7}}>✈️</p>
            <p style={{fontFamily:"'Playfair Display',serif",fontSize:"1.15rem",fontWeight:700,color:INK,marginBottom:5,lineHeight:1.25}}>Stay ahead of <span style={{color:T}}>{tf.destination}</span></p>
            <p style={{fontSize:"0.74rem",color:INKL,marginBottom:16,lineHeight:1.5}}>Personalised alerts from now until departure on {fmt(tf.depDate)}.</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
              <div><p style={{fontSize:"0.58rem",fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",color:INKL,marginBottom:4}}>Name</p><input style={IS} type="text" placeholder="Alex" value={name} onChange={e=>setName(e.target.value)}/></div>
              <div><p style={{fontSize:"0.58rem",fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",color:INKL,marginBottom:4}}>Email</p><input style={IS} type="email" placeholder="you@email.com" value={email} onChange={e=>setEmail(e.target.value)}/></div>
            </div>
            <p style={{fontSize:"0.58rem",fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",color:INKL,marginBottom:7}}>Alert types</p>
            <div style={{display:"flex",flexDirection:"column",gap:5,marginBottom:14}}>
              {ALERT_TYPES.map(a=>{const on=alerts.includes(a.id);return(
                <button key={a.id} onClick={()=>toggle(a.id)} style={{display:"flex",alignItems:"center",gap:9,padding:"8px 11px",borderRadius:9,cursor:"pointer",textAlign:"left",transition:"all 0.13s",border:`1.5px solid ${on?T:BDR}`,background:on?"rgba(196,98,58,0.05)":SAND}}>
                  <span style={{fontSize:"0.88rem"}}>{a.emoji}</span>
                  <div style={{flex:1}}><p style={{fontSize:"0.73rem",fontWeight:600,marginBottom:1,color:on?T:INK}}>{a.label}</p><p style={{fontSize:"0.61rem",color:INKL}}>{a.desc}</p></div>
                  <div style={{width:15,height:15,borderRadius:"50%",background:on?T:"transparent",border:on?"none":`1.5px solid ${BDR}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{on&&<span style={{color:"white",fontSize:"0.47rem",fontWeight:900}}>✓</span>}</div>
                </button>
              );})}
            </div>
            <button onClick={submit} disabled={!emailValid||loading} style={{width:"100%",padding:"11px",border:"none",borderRadius:10,cursor:!emailValid?"not-allowed":"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"0.87rem",fontWeight:700,transition:"all 0.18s",background:!emailValid||loading?SANDD:INK,color:!emailValid||loading?INKL:"#F5EFE0"}}>
              {loading?"Setting up…":"Keep me updated →"}
            </button>
            <p style={{fontSize:"0.57rem",color:INKL,opacity:0.42,textAlign:"center",marginTop:6}}>No spam. Unsubscribe anytime.</p>
          </>
        ):(
          <div style={{textAlign:"center",padding:"10px 0"}}>
            <p style={{fontSize:"2.3rem",marginBottom:10}}>🎉</p>
            <p style={{fontFamily:"'Playfair Display',serif",fontSize:"1.2rem",fontWeight:700,color:INK,marginBottom:7}}>You're all set!</p>
            <p style={{fontSize:"0.78rem",color:INKL,lineHeight:1.6,marginBottom:16}}>Updates for <strong>{tf.destination}</strong> right up to departure.</p>
            <button onClick={onClose} style={{width:"100%",padding:"11px",background:T,color:"white",border:"none",borderRadius:10,fontFamily:"'DM Sans',sans-serif",fontSize:"0.86rem",fontWeight:700,cursor:"pointer"}}>Back to my trip →</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main App
export default function WorldPrept() {
  const [screen,setScreen]=useState("form");
  const [step,setStep]=useState(1);
  const [form,setForm]=useState(INIT_FORM);
  const [result,setResult]=useState({packing:"",insurance:"",events:""});
  const [tab,setTab]=useState("packing");
  const [error,setError]=useState("");
  const [dots,setDots]=useState(1);
  const [progress,setProgress]=useState(0);
  const [showEmail,setShowEmail]=useState(false);
  const [showShare,setShowShare]=useState(false);
  const [shareText,setShareText]=useState("");
  const [checked,setChecked]=useState({});
  const [owned,setOwned]=useState({});
  const dotsRef=useRef(null); const progRef=useRef(null); const mountedRef=useRef(true);

  useEffect(()=>{ mountedRef.current=true; return()=>{ mountedRef.current=false; }; },[]);

  useEffect(()=>{
    if(screen==="loading") dotsRef.current=setInterval(()=>{ if(mountedRef.current) setDots(d=>d===3?1:d+1); },500);
    else clearInterval(dotsRef.current);
    return()=>clearInterval(dotsRef.current);
  },[screen]);

  useEffect(()=>{
    if(screen==="loading"){
      setProgress(0); let p=0;
      progRef.current=setInterval(()=>{ if(!mountedRef.current){clearInterval(progRef.current);return;} p=p<70?p+3:p<90?p+0.5:p+0.1; setProgress(Math.min(p,95)); },300);
    } else { clearInterval(progRef.current); if(screen==="results"&&mountedRef.current) setProgress(100); }
    return()=>clearInterval(progRef.current);
  },[screen]);

  useEffect(()=>{
    if(screen==="results"){ const t=setTimeout(()=>{ if(mountedRef.current&&!showEmail) setShowEmail(true); },7000); return()=>clearTimeout(t); }
  },[screen]); // eslint-disable-line react-hooks/exhaustive-deps

  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const n=nights(form.depDate,form.retDate);
  const dur=durStr(n);

  useEffect(()=>{ if(dur!==form.duration) set("duration",dur); },[dur]); // eslint-disable-line react-hooks/exhaustive-deps

  const canStep1=form.destination.trim().length>=3;
  const canStep2=form.depDate&&form.retDate&&new Date(form.retDate)>new Date(form.depDate);
  const canSubmit=!!form.tripType;

  const submit=async()=>{
    if(!canSubmit){setError("Please select a trip type.");return;}
    setError(""); setScreen("loading"); setChecked({}); setOwned({});
    try {
      const endpoint = USE_PROXY ? API_PROXY : API;
      const headers = USE_PROXY
        ? { "Content-Type":"application/json" }
        : { "Content-Type":"application/json","anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true" };
      const body = {
        model:"claude-sonnet-4-20250514",
        max_tokens:4000,
        system:buildPrompt({...form,duration:dur}),
        messages:[{role:"user",content:`Generate the WorldPrept pack for ${form.destination}, ${form.depDate} to ${form.retDate}.`}]
      };
      const res=await fetch(endpoint,{method:"POST",headers,body:JSON.stringify(body)});
      let data;
      try { data=await res.json(); } catch(e) { throw new Error("Server error — please try again."); }
      if(data.error) {
        const t=data.error.type||"";
        if(t==="rate_limit_error") throw new Error("Too many requests — please wait 30 seconds and try again.");
        if(t==="overloaded_error") throw new Error("AI is busy — please try again in a moment.");
        if(t==="authentication_error") throw new Error("API key not configured. Check Vercel environment variables.");
        throw new Error(data.error.message||"API error — please try again.");
      }
      const raw=(data.content||[]).map(b=>b.text||"").join("");
      if(!raw) throw new Error("Empty response — please try again.");
      const parsed=parseAll(raw);
      if(!parsed.packing) throw new Error("Incomplete response — please try again.");
      if(mountedRef.current){setResult(parsed);setScreen("results");setTab("packing");}
    } catch(err){
      console.error("WorldPrept error:",err);
      if(mountedRef.current){setError(err.message||"Something went wrong. Please try again.");setScreen("form");setStep(3);}
    }
  };

  const reset=()=>{setScreen("form");setStep(1);setForm(INIT_FORM);setResult({packing:"",insurance:"",events:""});setTab("packing");setShowEmail(false);setShowShare(false);setChecked({});setOwned({});setError("");};

  const openShare=useCallback(()=>{
    if(!result.packing) return;
    setShareText(buildShareText(form,result.packing,checked));
    setShowShare(true);
  },[form,result.packing,checked]);

  const handleFocus=(e)=>{ setTimeout(()=>e.target.scrollIntoView({behavior:"smooth",block:"center"}),300); };

  const insRec=result.insurance?getInsIds(result.insurance):[];
  const depL=fmt(form.depDate); const retL=fmt(form.retDate);

  return (
    <div className="app">
      <style>{CSS}</style>
      <div className="hdr">
        <div className="badge"><span className="dot"/>WorldPrept</div>
        <h1>Prep smarter.<br/>Travel <span>protected</span>.</h1>
        <p className="sub">Packing · Insurance · Events · Hotels · Activities</p>
      </div>

      {screen==="form"&&(
        <>
          <div className="sp-row">
            <span className="sp-pill">🚀 <strong>Early access</strong> — be among the first</span>
            <span className="sp-pill">🌍 <strong>90+</strong> destinations</span>
            <span className="sp-pill">🛡️ Insurance <strong>pre-filled quotes</strong></span>
          </div>
          <div className="card">
            <Steps cur={step} total={3}/>
            {step===1&&(
              <div style={{animation:"fadeUp 0.25s ease"}}>
                <p style={{fontFamily:"'Playfair Display',serif",fontSize:"1.05rem",fontWeight:700,color:INK,marginBottom:14}}>Where are you headed?</p>
                <div className="fg">
                  <label className="lbl">Destination</label>
                  <input type="text" placeholder="Tokyo · Paris · Bali · Marrakech · Cape Town" value={form.destination} onFocus={handleFocus} onChange={e=>set("destination",e.target.value)} onKeyDown={e=>e.key==="Enter"&&canStep1&&setStep(2)}/>
                </div>
                <div className="fg">
                  <label className="lbl">Activities (optional)</label>
                  <input type="text" placeholder="temples, beaches, hiking, food tours" value={form.activities} onFocus={handleFocus} onChange={e=>set("activities",e.target.value)}/>
                </div>
                <button className="btn-main" disabled={!canStep1} onClick={()=>setStep(2)}>Continue →</button>
              </div>
            )}
            {step===2&&(
              <div style={{animation:"fadeUp 0.25s ease"}}>
                <p style={{fontFamily:"'Playfair Display',serif",fontSize:"1.05rem",fontWeight:700,color:INK,marginBottom:14}}>When & who's coming?</p>
                <div className="g2" style={{marginBottom:n>0?8:14}}>
                  <div className="fg" style={{marginBottom:0}}><label className="lbl">Departure</label><input type="date" value={form.depDate} min={today()} onFocus={handleFocus} onChange={e=>set("depDate",e.target.value)}/></div>
                  <div className="fg" style={{marginBottom:0}}><label className="lbl">Return</label><input type="date" value={form.retDate} min={form.depDate||today()} onFocus={handleFocus} onChange={e=>set("retDate",e.target.value)}/></div>
                </div>
                {n>0&&<div style={{display:"inline-flex",alignItems:"center",gap:5,marginBottom:13,background:"rgba(44,120,115,0.08)",color:TL,border:"1px solid rgba(44,120,115,0.18)",padding:"3px 10px",borderRadius:100,fontSize:"0.65rem",fontWeight:700}}>📅 {dur} · {n} nights</div>}
                <div className="fg">
                  <label className="lbl">Adults</label>
                  <div className="pills">{PEOPLE_OPTS.map(p=><button key={p} className={`pill${form.people===p?" on":""}`} onClick={()=>set("people",p)}>{p==="1"?"👤 Solo":p==="2"?"👫 2":p==="6+"?"👨‍👩‍👧‍👦 6+":"👥 "+p}</button>)}</div>
                </div>
                <div className="fg">
                  <label className="lbl">Children</label>
                  <div className="pills">{KIDS_OPTS.map(k=><button key={k} className={`pill${form.kids===k?(k==="No kids"?" on":" kids-on"):""}`} onClick={()=>set("kids",k)}>{k==="No kids"?"🚫 None":k==="1 child"?"👶 1":k==="2 children"?"👧👦 2":"👨‍👧‍👦 3+"}</button>)}</div>
                  {form.kids!=="No kids"&&<div style={{display:"flex",alignItems:"center",gap:6,marginTop:8,background:"rgba(44,120,115,0.07)",border:"1px solid rgba(44,120,115,0.18)",borderRadius:8,padding:"6px 10px"}}><span>👶</span><p style={{fontSize:"0.68rem",color:TL,fontWeight:600}}>Kids packing list & gear included</p></div>}
                </div>
                <button className="btn-main" disabled={!canStep2} onClick={()=>setStep(3)}>Continue →</button>
                <button className="btn-back" onClick={()=>setStep(1)}>← Back</button>
              </div>
            )}
            {step===3&&(
              <div style={{animation:"fadeUp 0.25s ease"}}>
                <p style={{fontFamily:"'Playfair Display',serif",fontSize:"1.05rem",fontWeight:700,color:INK,marginBottom:14}}>Luggage & trip style</p>
                <div className="fg">
                  <label className="lbl">Luggage Plan</label>
                  <div className="lg-grid">
                    {LUGGAGE_OPTS.map(l=>(
                      <button key={l.id} className={`lg-opt${form.luggage===l.id?" on":""}`} onClick={()=>set("luggage",l.id)}>
                        <div style={{fontSize:"1rem",marginBottom:3}}>{l.icon}</div>
                        <p style={{fontSize:"0.72rem",fontWeight:700,marginBottom:1,color:form.luggage===l.id?T:INK}}>{l.label}</p>
                        <p style={{fontSize:"0.59rem",color:INKL}}>{l.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="fg">
                  <label className="lbl">Trip Type</label>
                  <div className="pills">{TRIP_TYPES.map(t=><button key={t} className={`pill${form.tripType===t?" on":""}`} onClick={()=>set("tripType",t)}>{t}</button>)}</div>
                </div>
                {error&&(
                  <div className="err">
                    <p>{error}</p>
                    {error.includes("wait")&&<p style={{fontSize:"0.68rem",marginTop:4,opacity:0.7}}>Tip: Wait 30 seconds then tap "Build My Trip Pack" again.</p>}
                  </div>
                )}
                <button className="btn-main" disabled={!canSubmit||screen==="loading"} onClick={submit}>Build My Trip Pack →</button>
                <button className="btn-back" onClick={()=>setStep(2)}>← Back</button>
              </div>
            )}
          </div>
        </>
      )}

      {screen==="loading"&&(
        <div className="card loading">
          <div className="spin"/>
          <p className="l-title">Building your trip pack{".".repeat(dots)}</p>
          <p className="l-sub">Usually 15–20 seconds — checking weather, events & matching your clothes</p>
          <div style={{width:"100%",maxWidth:280,margin:"0 auto"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
              <span style={{fontSize:"0.62rem",color:INKL}}>{progress<30?"Checking weather…":progress<55?"Building packing list…":progress<75?"Researching events…":progress<90?"Finding insurance options…":"Almost done…"}</span>
              <span style={{fontSize:"0.62rem",color:INKL,fontWeight:600}}>{Math.round(progress)}%</span>
            </div>
            <div style={{height:5,background:SANDD,borderRadius:10,overflow:"hidden"}}>
              <div style={{height:"100%",width:`${progress}%`,background:T,borderRadius:10,transition:"width 0.4s ease"}}/>
            </div>
          </div>
        </div>
      )}

      {screen==="results"&&(
        <div className="wrap">
          <div className="tripbar">
            <div>
              <div className="t-meta">{form.tripType} · {dur} · {form.people} adult{form.people!=="1"?"s":""}{form.kids!=="No kids"?` · ${form.kids}`:""} · {LUGGAGE_OPTS.find(l=>l.id===form.luggage)?.icon}</div>
              <div className="t-title">✈️ {form.destination} &nbsp;{depL}{retL?` – ${retL}`:""}</div>
            </div>
            <div className="bar-btns">
              <button className="b-share" onClick={openShare}>📋 Save</button>
              <button className="b-alert" onClick={()=>setShowEmail(true)}>🔔 Alerts</button>
              <button className="b-ghost" onClick={reset}>← New</button>
            </div>
          </div>
          <div className="nudge" onClick={()=>setShowEmail(true)}>
            <span style={{fontSize:"1.2rem"}}>📬</span>
            <div style={{flex:1}}><p style={{fontSize:"0.74rem",fontWeight:700,color:INK,marginBottom:1}}>Get weather & alerts for {(form.destination||"").split(",")[0]}</p><p style={{fontSize:"0.62rem",color:INKL}}>Forecasts · Safety · Events · Deals</p></div>
            <span style={{fontSize:"0.66rem",fontWeight:700,color:T,whiteSpace:"nowrap"}}>Subscribe →</span>
          </div>
          <div className="tabs">
            <button className={`tab${tab==="packing"?" on":""}`} onClick={()=>setTab("packing")}>🎒 Packing</button>
            <button className={`tab${tab==="events"?" on":""}`} onClick={()=>setTab("events")}>🎉 Events & Hotels</button>
            <button className={`tab${tab==="insurance"?" on":""}`} onClick={()=>setTab("insurance")}>🛡️ Insurance</button>
          </div>
          <div className="panel">
            {tab==="packing"&&<><PackingList text={result.packing} checked={checked} setChecked={setChecked} onShare={openShare}/><GearSection form={form} owned={owned} setOwned={setOwned}/></>}
            {tab==="events"&&<EventsView text={result.events} form={form}/>}
            {tab==="insurance"&&<InsuranceView text={result.insurance} recIds={insRec} form={form}/>}
          </div>
        </div>
      )}
      {showEmail&&<EmailModal form={form} onClose={()=>setShowEmail(false)}/>}
      {showShare&&<ShareModal text={shareText} onClose={()=>setShowShare(false)}/>}
    </div>
  );
}
