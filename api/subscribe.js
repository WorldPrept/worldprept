// api/subscribe.js — saves email subscribers to Loops.so
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const apiKey = process.env.LOOPS_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Email service not configured" });
  }
  const { email, name, alerts, trip } = req.body || {};
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }
  try {
    await fetch("https://app.loops.so/api/v1/contacts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email,
        firstName: name || "",
        destination: trip?.destination || "",
        departureDate: trip?.depDate || "",
        returnDate: trip?.retDate || "",
        tripType: trip?.tripType || "",
        alertTypes: (alerts || []).join(", "),
        source: "WorldPrept",
        userGroup: "trip-alerts",
      }),
    });
    return res.status(200).json({ success: true });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
