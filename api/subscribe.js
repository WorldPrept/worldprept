export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.LOOPS_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Email service not configured" });
  }

  const { email, name, alerts, trip } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }

  try {
    const contactRes = await fetch("https://app.loops.so/api/v1/contacts/create", {
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

    const contactData = await contactRes.json();

    if (contactData.message === "Email already on list.") {
      await fetch("https://app.loops.so/api/v1/contacts/update", {
        method: "PUT",
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
        }),
      });
    }

    if (process.env.LOOPS_WELCOME_EMAIL_ID) {
      await fetch("https://app.loops.so/api/v1/transactional", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          transactionalId: process.env.LOOPS_WELCOME_EMAIL_ID,
          email,
          dataVariables: {
            firstName: name || "Traveller",
            destination: trip?.destination || "",
            departureDate: trip?.depDate || "",
          },
        }),
      });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Subscribe error:", err);
    return res.status(500).json({ error: "Subscription failed", detail: err.message });
  }
}
