// PrivacyPolicy.jsx — required for affiliate program approvals (Travelpayouts, insurance, etc.)
// Lives at /privacy. Plain, honest, covers what WorldPrept actually does.

const T = "#C4623A", INK = "#1A1410", INKL = "#4A3F35", SAND = "#F5EFE0", CREAM = "#FDFAF4", BDR = "rgba(26,20,16,0.12)";

export default function PrivacyPolicy() {
  const updated = "May 2026";
  return (
    <div style={{ background:SAND, minHeight:"100vh", fontFamily:"'DM Sans',system-ui,sans-serif", padding:"0 0 60px" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;600;700&display=swap');*{box-sizing:border-box;margin:0;padding:0}`}</style>

      <div style={{ background:INK, color:SAND, padding:"32px 16px", textAlign:"center" }}>
        <a href="/" style={{ color:T, textDecoration:"none", fontWeight:800, fontSize:"0.7rem", letterSpacing:"2px", textTransform:"uppercase" }}>✈️ WorldPrept</a>
        <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.9rem", marginTop:10 }}>Privacy Policy</h1>
        <p style={{ fontSize:"0.75rem", opacity:0.5, marginTop:6 }}>Last updated: {updated}</p>
      </div>

      <div style={{ maxWidth:680, margin:"0 auto", padding:"24px 18px" }}>
        {[
          ["Who we are", `WorldPrept ("we", "us") is a free travel-preparation tool operated by WorldWideWach LLC. We generate AI packing lists, compare travel insurance, and surface local information for travelers. This policy explains what we collect and how we use it.`],
          ["What we collect", `We collect only what's needed to provide the service:\n• Trip details you enter (destination, dates, trip type) — used to generate your packing list and recommendations.\n• Your email address and name — only if you choose to sign up for trip alerts.\n• Basic usage data through analytics (pages visited, general location, device type) to understand how the tool is used and improve it.\nWe do not require an account, and we do not ask for sensitive personal information.`],
          ["How we use your information", `• To generate your packing list and travel recommendations.\n• To send trip alerts and updates, if you opted in (you can unsubscribe anytime).\n• To improve the product through aggregate, anonymized analytics.\nWe never sell your personal information.`],
          ["Trip data storage", `Your saved trips are stored locally in your own browser (local storage) on your device — not on our servers. Clearing your browser data removes them. If you subscribe to alerts, your email and trip details are stored with our email provider to deliver those alerts.`],
          ["Third-party services", `We use trusted third parties to operate WorldPrept:\n• AI text generation to create packing lists.\n• Analytics to measure usage.\n• An email service to deliver trip alerts you opt into.\n• Affiliate partners (see below).\nEach has its own privacy practices governing data they process.`],
          ["Affiliate links & how we earn", `WorldPrept is free. We earn commissions when you click certain links (for travel insurance, tours, gear, eSIMs, hotels, and similar) and then make a purchase. These are "affiliate links." Using them costs you nothing extra, and we only recommend things we believe are useful to travelers. When you click an affiliate link, the partner may set a cookie to attribute any resulting purchase to us. We are not responsible for the privacy practices of those external sites.`],
          ["Cookies", `We and our partners use cookies and similar technologies for analytics and to attribute affiliate referrals. You can control or disable cookies in your browser settings; some features may work less smoothly if you do.`],
          ["Your choices", `• You can use WorldPrept without creating an account.\n• You can unsubscribe from emails at any time via the link in any email we send.\n• You can clear locally saved trips by clearing your browser data.\n• You may contact us to request deletion of any email data we hold.`],
          ["Children", `WorldPrept is not directed at children under 13, and we do not knowingly collect information from them.`],
          ["Changes to this policy", `We may update this policy as the product evolves. The "last updated" date above reflects the latest version.`],
          ["Contact", `Questions about this policy? Contact us at worldprept@gmail.com.`],
        ].map(([title, body], i) => (
          <section key={i} style={{ marginBottom:22 }}>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.15rem", color:INK, marginBottom:8 }}>{title}</h2>
            <p style={{ fontSize:"0.9rem", color:INKL, lineHeight:1.7, whiteSpace:"pre-line" }}>{body}</p>
          </section>
        ))}

        <div style={{ marginTop:24, paddingTop:18, borderTop:`1px solid ${BDR}`, textAlign:"center" }}>
          <a href="/" style={{ display:"inline-block", background:INK, color:SAND, padding:"11px 24px", borderRadius:100, textDecoration:"none", fontWeight:700, fontSize:"0.85rem" }}>← Back to WorldPrept</a>
        </div>
      </div>
    </div>
  );
}
