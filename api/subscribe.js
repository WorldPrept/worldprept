export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });
  const { email, name, alerts, trip } = req.body;
  try {
    await fetch("https://app.loops.so/api/v1/contacts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.LOOPS_API_KEY}`
      },
      body: JSON.stringify({
        email, firstName: name || "",
        destination: trip?.destination || "",
        departureDate: trip?.depDate || "",
        tripType: trip?.tripType || "",
        alertTypes: (alerts||[]).join(", "),
        source: "WorldPrept"
      })
    });
    return res.status(200).json({ success: true });
  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
}
