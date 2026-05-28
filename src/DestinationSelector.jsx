// DestinationSelector.jsx
// Drop-in replacement for the destination text input in worldprept App.jsx
// Usage: replace the destination <input> in step===1 with <DestinationSelector ... />
//
// Props:
//   value    — current destination string (e.g. "Tokyo, Japan")
//   onChange — called with new destination string

import { useState, useRef, useEffect, useMemo } from "react";

// ── Data
const COUNTRIES = [
  { code:"AU", name:"Australia",       flag:"🇦🇺", cities:["Sydney","Melbourne","Brisbane","Perth","Adelaide","Gold Coast","Cairns","Darwin"] },
  { code:"AT", name:"Austria",         flag:"🇦🇹", cities:["Vienna","Salzburg","Innsbruck","Graz"] },
  { code:"BH", name:"Bahrain",         flag:"🇧🇭", cities:["Manama"] },
  { code:"BR", name:"Brazil",          flag:"🇧🇷", cities:["Rio de Janeiro","São Paulo","Salvador","Florianópolis","Fortaleza","Manaus"] },
  { code:"KH", name:"Cambodia",        flag:"🇰🇭", cities:["Siem Reap","Phnom Penh"] },
  { code:"CA", name:"Canada",          flag:"🇨🇦", cities:["Toronto","Vancouver","Montreal","Calgary","Quebec City","Ottawa","Banff","Victoria"] },
  { code:"CL", name:"Chile",           flag:"🇨🇱", cities:["Santiago","Valparaíso","San Pedro de Atacama","Patagonia"] },
  { code:"CN", name:"China",           flag:"🇨🇳", cities:["Beijing","Shanghai","Hong Kong","Chengdu","Xi'an","Guilin","Shenzhen"] },
  { code:"CO", name:"Colombia",        flag:"🇨🇴", cities:["Bogotá","Medellín","Cartagena","Cali"] },
  { code:"HR", name:"Croatia",         flag:"🇭🇷", cities:["Dubrovnik","Split","Zagreb","Hvar","Zadar"] },
  { code:"CZ", name:"Czech Republic",  flag:"🇨🇿", cities:["Prague","Brno","Český Krumlov"] },
  { code:"DK", name:"Denmark",         flag:"🇩🇰", cities:["Copenhagen","Aarhus"] },
  { code:"EG", name:"Egypt",           flag:"🇪🇬", cities:["Cairo","Luxor","Aswan","Sharm El Sheikh","Hurghada","Alexandria"] },
  { code:"ET", name:"Ethiopia",        flag:"🇪🇹", cities:["Addis Ababa","Lalibela"] },
  { code:"FI", name:"Finland",         flag:"🇫🇮", cities:["Helsinki","Rovaniemi","Tampere","Turku"] },
  { code:"FR", name:"France",          flag:"🇫🇷", cities:["Paris","Nice","Lyon","Bordeaux","Marseille","Strasbourg","Mont Saint-Michel"] },
  { code:"DE", name:"Germany",         flag:"🇩🇪", cities:["Berlin","Munich","Hamburg","Cologne","Frankfurt","Dresden","Heidelberg"] },
  { code:"GH", name:"Ghana",           flag:"🇬🇭", cities:["Accra","Cape Coast"] },
  { code:"GR", name:"Greece",          flag:"🇬🇷", cities:["Athens","Santorini","Mykonos","Crete","Rhodes","Thessaloniki","Corfu"] },
  { code:"GT", name:"Guatemala",       flag:"🇬🇹", cities:["Guatemala City","Antigua","Lake Atitlán"] },
  { code:"IN", name:"India",           flag:"🇮🇳", cities:["Mumbai","Delhi","Jaipur","Goa","Agra","Varanasi","Bangalore","Kerala","Udaipur"] },
  { code:"ID", name:"Indonesia",       flag:"🇮🇩", cities:["Bali","Jakarta","Yogyakarta","Lombok","Komodo","Raja Ampat"] },
  { code:"IE", name:"Ireland",         flag:"🇮🇪", cities:["Dublin","Galway","Cork","Killarney","Dingle"] },
  { code:"IL", name:"Israel",          flag:"🇮🇱", cities:["Tel Aviv","Jerusalem","Haifa","Eilat"] },
  { code:"IT", name:"Italy",           flag:"🇮🇹", cities:["Rome","Florence","Venice","Milan","Amalfi Coast","Sicily","Tuscany","Naples","Cinque Terre"] },
  { code:"JM", name:"Jamaica",         flag:"🇯🇲", cities:["Montego Bay","Kingston","Negril","Ocho Rios"] },
  { code:"JP", name:"Japan",           flag:"🇯🇵", cities:["Tokyo","Kyoto","Osaka","Hokkaido","Hiroshima","Nara","Okinawa","Sapporo","Hakone"] },
  { code:"JO", name:"Jordan",          flag:"🇯🇴", cities:["Petra","Amman","Wadi Rum","Aqaba"] },
  { code:"KE", name:"Kenya",           flag:"🇰🇪", cities:["Nairobi","Maasai Mara","Amboseli","Diani Beach","Zanzibar"] },
  { code:"KR", name:"South Korea",     flag:"🇰🇷", cities:["Seoul","Busan","Jeju Island","Gyeongju"] },
  { code:"LA", name:"Laos",            flag:"🇱🇦", cities:["Luang Prabang","Vientiane","Vang Vieng"] },
  { code:"MO", name:"Macao",           flag:"🇲🇴", cities:["Macau"] },
  { code:"MY", name:"Malaysia",        flag:"🇲🇾", cities:["Kuala Lumpur","Penang","Langkawi","Borneo","Cameron Highlands"] },
  { code:"MV", name:"Maldives",        flag:"🇲🇻", cities:["Malé","Maafushi","Baa Atoll"] },
  { code:"MX", name:"Mexico",          flag:"🇲🇽", cities:["Mexico City","Cancún","Tulum","Oaxaca","San Miguel de Allende","Guadalajara","Playa del Carmen"] },
  { code:"MA", name:"Morocco",         flag:"🇲🇦", cities:["Marrakech","Fes","Casablanca","Chefchaouen","Essaouira","Sahara Desert"] },
  { code:"MM", name:"Myanmar",         flag:"🇲🇲", cities:["Yangon","Bagan","Inle Lake","Mandalay"] },
  { code:"NP", name:"Nepal",           flag:"🇳🇵", cities:["Kathmandu","Pokhara","Everest Base Camp","Chitwan"] },
  { code:"NL", name:"Netherlands",     flag:"🇳🇱", cities:["Amsterdam","Rotterdam","The Hague","Utrecht","Eindhoven"] },
  { code:"NZ", name:"New Zealand",     flag:"🇳🇿", cities:["Auckland","Queenstown","Wellington","Christchurch","Rotorua","Fiordland"] },
  { code:"NG", name:"Nigeria",         flag:"🇳🇬", cities:["Lagos","Abuja"] },
  { code:"NO", name:"Norway",          flag:"🇳🇴", cities:["Oslo","Bergen","Tromsø","Lofoten Islands","Stavanger"] },
  { code:"OM", name:"Oman",            flag:"🇴🇲", cities:["Muscat","Salalah","Nizwa"] },
  { code:"PE", name:"Peru",            flag:"🇵🇪", cities:["Lima","Cusco","Machu Picchu","Lake Titicaca","Arequipa"] },
  { code:"PH", name:"Philippines",     flag:"🇵🇭", cities:["Manila","Palawan","Cebu","Boracay","Siargao","Bohol"] },
  { code:"PL", name:"Poland",          flag:"🇵🇱", cities:["Warsaw","Kraków","Gdańsk","Wrocław"] },
  { code:"PT", name:"Portugal",        flag:"🇵🇹", cities:["Lisbon","Porto","Algarve","Madeira","Azores","Sintra"] },
  { code:"QA", name:"Qatar",           flag:"🇶🇦", cities:["Doha"] },
  { code:"RU", name:"Russia",          flag:"🇷🇺", cities:["Moscow","St. Petersburg","Kazan","Sochi"] },
  { code:"SA", name:"Saudi Arabia",    flag:"🇸🇦", cities:["Riyadh","Jeddah","AlUla","Neom"] },
  { code:"SN", name:"Senegal",         flag:"🇸🇳", cities:["Dakar","Saint-Louis"] },
  { code:"SG", name:"Singapore",       flag:"🇸🇬", cities:["Singapore"] },
  { code:"ZA", name:"South Africa",    flag:"🇿🇦", cities:["Cape Town","Johannesburg","Durban","Kruger National Park","Garden Route"] },
  { code:"ES", name:"Spain",           flag:"🇪🇸", cities:["Barcelona","Madrid","Seville","Granada","Valencia","San Sebastián","Ibiza","Mallorca"] },
  { code:"LK", name:"Sri Lanka",       flag:"🇱🇰", cities:["Colombo","Kandy","Galle","Sigiriya","Ella"] },
  { code:"SE", name:"Sweden",          flag:"🇸🇪", cities:["Stockholm","Gothenburg","Malmö","Abisko"] },
  { code:"CH", name:"Switzerland",     flag:"🇨🇭", cities:["Zurich","Geneva","Interlaken","Lucerne","Zermatt","Bern"] },
  { code:"TW", name:"Taiwan",          flag:"🇹🇼", cities:["Taipei","Tainan","Kaohsiung","Jiufen"] },
  { code:"TZ", name:"Tanzania",        flag:"🇹🇿", cities:["Dar es Salaam","Zanzibar","Serengeti","Kilimanjaro"] },
  { code:"TH", name:"Thailand",        flag:"🇹🇭", cities:["Bangkok","Chiang Mai","Phuket","Koh Samui","Krabi","Pai","Koh Phi Phi"] },
  { code:"TR", name:"Turkey",          flag:"🇹🇷", cities:["Istanbul","Cappadocia","Antalya","Bodrum","Pamukkale","Ephesus"] },
  { code:"UG", name:"Uganda",          flag:"🇺🇬", cities:["Kampala","Bwindi","Murchison Falls"] },
  { code:"AE", name:"UAE",             flag:"🇦🇪", cities:["Dubai","Abu Dhabi","Sharjah"] },
  { code:"GB", name:"United Kingdom",  flag:"🇬🇧", cities:["London","Edinburgh","Manchester","Bath","Oxford","Cambridge","Liverpool","Glasgow","Lake District","Cornwall"] },
  { code:"US", name:"United States",   flag:"🇺🇸", cities:null }, // handled by states
  { code:"UY", name:"Uruguay",         flag:"🇺🇾", cities:["Montevideo","Punta del Este"] },
  { code:"UZ", name:"Uzbekistan",      flag:"🇺🇿", cities:["Samarkand","Bukhara","Tashkent"] },
  { code:"VN", name:"Vietnam",         flag:"🇻🇳", cities:["Hanoi","Ho Chi Minh City","Hội An","Da Nang","Ha Long Bay","Sapa","Hue"] },
  { code:"ZM", name:"Zambia",          flag:"🇿🇲", cities:["Lusaka","Victoria Falls","South Luangwa"] },
  { code:"ZW", name:"Zimbabwe",        flag:"🇿🇼", cities:["Victoria Falls","Hwange","Harare"] },
];

const US_STATES = [
  { code:"AL", name:"Alabama",        cities:["Birmingham","Montgomery","Huntsville","Mobile"] },
  { code:"AK", name:"Alaska",         cities:["Anchorage","Fairbanks","Juneau","Ketchikan"] },
  { code:"AZ", name:"Arizona",        cities:["Phoenix","Sedona","Tucson","Scottsdale","Grand Canyon","Flagstaff"] },
  { code:"AR", name:"Arkansas",       cities:["Little Rock","Fayetteville","Hot Springs"] },
  { code:"CA", name:"California",     cities:["Los Angeles","San Francisco","San Diego","Napa Valley","Palm Springs","Santa Barbara","Lake Tahoe","Yosemite","Monterey"] },
  { code:"CO", name:"Colorado",       cities:["Denver","Aspen","Vail","Boulder","Colorado Springs","Telluride","Breckenridge"] },
  { code:"CT", name:"Connecticut",    cities:["Hartford","New Haven","Mystic","Greenwich"] },
  { code:"FL", name:"Florida",        cities:["Miami","Orlando","Tampa","Key West","Naples","Fort Lauderdale","St. Augustine","Jacksonville","Sarasota"] },
  { code:"GA", name:"Georgia",        cities:["Atlanta","Savannah","Athens","Macon"] },
  { code:"HI", name:"Hawaii",         cities:["Honolulu","Maui","Kauai","Big Island","Lanai","Molokai"] },
  { code:"ID", name:"Idaho",          cities:["Boise","Sun Valley","Coeur d'Alene","Idaho Falls"] },
  { code:"IL", name:"Illinois",       cities:["Chicago","Springfield","Galena","Peoria"] },
  { code:"IN", name:"Indiana",        cities:["Indianapolis","Bloomington","Fort Wayne","South Bend"] },
  { code:"IA", name:"Iowa",           cities:["Des Moines","Iowa City","Cedar Rapids"] },
  { code:"KS", name:"Kansas",         cities:["Kansas City","Wichita","Lawrence"] },
  { code:"KY", name:"Kentucky",       cities:["Louisville","Lexington","Bourbon Trail","Mammoth Cave"] },
  { code:"LA", name:"Louisiana",      cities:["New Orleans","Baton Rouge","Lafayette","Shreveport"] },
  { code:"ME", name:"Maine",          cities:["Portland","Bar Harbor","Acadia National Park","Kennebunkport"] },
  { code:"MD", name:"Maryland",       cities:["Baltimore","Annapolis","Ocean City","Frederick"] },
  { code:"MA", name:"Massachusetts",  cities:["Boston","Cape Cod","Salem","Nantucket","Martha's Vineyard","Cambridge"] },
  { code:"MI", name:"Michigan",       cities:["Detroit","Traverse City","Mackinac Island","Ann Arbor","Grand Rapids"] },
  { code:"MN", name:"Minnesota",      cities:["Minneapolis","St. Paul","Duluth","Boundary Waters"] },
  { code:"MS", name:"Mississippi",    cities:["Jackson","Biloxi","Natchez","Oxford"] },
  { code:"MO", name:"Missouri",       cities:["St. Louis","Kansas City","Branson","Springfield"] },
  { code:"MT", name:"Montana",        cities:["Glacier National Park","Billings","Missoula","Bozeman","Great Falls"] },
  { code:"NE", name:"Nebraska",       cities:["Omaha","Lincoln","North Platte"] },
  { code:"NV", name:"Nevada",         cities:["Las Vegas","Reno","Lake Tahoe","Henderson"] },
  { code:"NH", name:"New Hampshire",  cities:["Manchester","Portsmouth","White Mountains","Concord"] },
  { code:"NJ", name:"New Jersey",     cities:["Atlantic City","Cape May","Hoboken","Princeton","Newark"] },
  { code:"NM", name:"New Mexico",     cities:["Santa Fe","Albuquerque","Taos","White Sands"] },
  { code:"NY", name:"New York",       cities:["New York City","Niagara Falls","The Hamptons","Saratoga Springs","Albany","Buffalo","Hudson Valley"] },
  { code:"NC", name:"North Carolina", cities:["Charlotte","Asheville","Raleigh","Outer Banks","Wilmington","Chapel Hill"] },
  { code:"ND", name:"North Dakota",   cities:["Bismarck","Fargo","Theodore Roosevelt National Park"] },
  { code:"OH", name:"Ohio",           cities:["Columbus","Cleveland","Cincinnati","Toledo","Hocking Hills"] },
  { code:"OK", name:"Oklahoma",       cities:["Oklahoma City","Tulsa","Norman"] },
  { code:"OR", name:"Oregon",         cities:["Portland","Bend","Crater Lake","Cannon Beach","Eugene","Ashland"] },
  { code:"PA", name:"Pennsylvania",   cities:["Philadelphia","Pittsburgh","Gettysburg","Lancaster","Hershey"] },
  { code:"RI", name:"Rhode Island",   cities:["Providence","Newport","Narragansett"] },
  { code:"SC", name:"South Carolina", cities:["Charleston","Myrtle Beach","Hilton Head","Greenville"] },
  { code:"SD", name:"South Dakota",   cities:["Sioux Falls","Mount Rushmore","Badlands","Rapid City","Custer"] },
  { code:"TN", name:"Tennessee",      cities:["Nashville","Memphis","Gatlinburg","Knoxville","Chattanooga"] },
  { code:"TX", name:"Texas",          cities:["Austin","Houston","Dallas","San Antonio","El Paso","Fort Worth","Marfa","Galveston"] },
  { code:"UT", name:"Utah",           cities:["Salt Lake City","Zion National Park","Bryce Canyon","Moab","Park City","Arches"] },
  { code:"VT", name:"Vermont",        cities:["Burlington","Stowe","Montpelier","Woodstock","Manchester"] },
  { code:"VA", name:"Virginia",       cities:["Virginia Beach","Richmond","Charlottesville","Alexandria","Shenandoah"] },
  { code:"WA", name:"Washington",     cities:["Seattle","Spokane","Olympia","Bellingham","Olympic National Park"] },
  { code:"WV", name:"West Virginia",  cities:["Charleston","Morgantown","Harpers Ferry","Snowshoe"] },
  { code:"WI", name:"Wisconsin",      cities:["Milwaukee","Madison","Door County","Green Bay","Wisconsin Dells"] },
  { code:"WY", name:"Wyoming",        cities:["Yellowstone","Jackson Hole","Grand Teton","Cheyenne","Casper"] },
  { code:"DC", name:"Washington D.C.",cities:["Washington D.C."] },
];

// ── Inline styles matching WorldPrept design tokens
const T = "#C4623A", TL = "#2C7873", INK = "#1A1410", INKL = "#4A3F35";
const SAND = "#F5EFE0", SANDD = "#EDE4CC", CREAM = "#FDFAF4", BDR = "rgba(26,20,16,0.12)";

const sel = {
  width:"100%", padding:"11px 13px",
  border:`1.5px solid ${BDR}`, borderRadius:10,
  background:SAND, color:INK,
  fontFamily:"'DM Sans',sans-serif", fontSize:"16px",
  outline:"none", appearance:"none", WebkitAppearance:"none",
  backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%234A3F35' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
  backgroundRepeat:"no-repeat", backgroundPosition:"right 13px center",
  cursor:"pointer", transition:"border-color 0.18s",
};
const selFocus = { borderColor:T, boxShadow:`0 0 0 3px rgba(196,98,58,0.09)` };

function SelectBox({ value, onChange, children, placeholder }) {
  const [focused, setFocused] = useState(false);
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{ ...sel, ...(focused ? selFocus : {}), color: value ? INK : "#9A8F85" }}
    >
      {placeholder && <option value="" disabled>{placeholder}</option>}
      {children}
    </select>
  );
}

export default function DestinationSelector({ value, onChange }) {
  const [country, setCountry] = useState("");
  const [state,   setState]   = useState("");
  const [city,    setCity]    = useState("");

  // Parse back if value already set (e.g. form reset won't break)
  useEffect(() => {
    if (!value) { setCountry(""); setState(""); setCity(""); }
  }, [value]);

  const selectedCountry = useMemo(() => COUNTRIES.find(c => c.code === country), [country]);
  const isUSA = country === "US";
  const selectedState = useMemo(() => isUSA ? US_STATES.find(s => s.code === state) : null, [isUSA, state]);

  const cities = useMemo(() => {
    if (isUSA) return selectedState?.cities || [];
    return selectedCountry?.cities || [];
  }, [isUSA, selectedCountry, selectedState]);

  const handleCountry = (code) => {
    setCountry(code);
    setState("");
    setCity("");
    onChange("");
  };

  const handleState = (code) => {
    setState(code);
    setCity("");
    onChange("");
  };

  const handleCity = (c) => {
    setCity(c);
    const countryName = selectedCountry?.name || "";
    if (isUSA && selectedState) {
      onChange(`${c}, ${selectedState.name}, USA`);
    } else {
      onChange(`${c}, ${countryName}`);
    }
  };

  const clearAll = () => {
    setCountry(""); setState(""); setCity("");
    onChange("");
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:8 }}>

      {/* Country */}
      <div>
        <label style={{ display:"block", fontSize:"9px", fontWeight:700, letterSpacing:"1.5px", textTransform:"uppercase", color:INKL, marginBottom:5 }}>
          Country
        </label>
        <SelectBox value={country} onChange={handleCountry} placeholder="Select a country…">
          {COUNTRIES.map(c => (
            <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
          ))}
        </SelectBox>
      </div>

      {/* US State — only if USA selected */}
      {isUSA && (
        <div style={{ animation:"slideDown 0.18s ease" }}>
          <label style={{ display:"block", fontSize:"9px", fontWeight:700, letterSpacing:"1.5px", textTransform:"uppercase", color:INKL, marginBottom:5 }}>
            State
          </label>
          <SelectBox value={state} onChange={handleState} placeholder="Select a state…">
            {US_STATES.map(s => (
              <option key={s.code} value={s.code}>{s.name}</option>
            ))}
          </SelectBox>
        </div>
      )}

      {/* City — shows once country (and state if US) is chosen */}
      {cities.length > 0 && (
        <div style={{ animation:"slideDown 0.18s ease" }}>
          <label style={{ display:"block", fontSize:"9px", fontWeight:700, letterSpacing:"1.5px", textTransform:"uppercase", color:INKL, marginBottom:5 }}>
            City / Destination
          </label>
          <SelectBox value={city} onChange={handleCity} placeholder="Select a city…">
            {cities.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </SelectBox>
        </div>
      )}

      {/* Confirmation chip */}
      {city && (
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", background:`rgba(44,120,115,0.08)`, border:`1px solid rgba(44,120,115,0.2)`, borderRadius:9, padding:"8px 12px", animation:"slideDown 0.18s ease" }}>
          <div style={{ display:"flex", alignItems:"center", gap:7 }}>
            <span style={{ fontSize:"1rem" }}>{selectedCountry?.flag}</span>
            <span style={{ fontSize:"0.8rem", fontWeight:700, color:TL }}>{value}</span>
          </div>
          <button onClick={clearAll} style={{ background:"none", border:"none", cursor:"pointer", fontSize:"0.65rem", color:INKL, padding:"2px 6px", borderRadius:6, opacity:0.6 }}>✕ Clear</button>
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from { opacity:0; transform:translateY(-6px); }
          to   { opacity:1; transform:translateY(0); }
        }
        select option { color: #1A1410; background: #FDFAF4; }
      `}</style>
    </div>
  );
}
