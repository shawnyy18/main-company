const ALLOWED_PROJECT_TYPES = new Set([
  "Real-estate website or listings",
  "Digital product commerce",
  "Web or mobile application",
  "Product partnership",
  "Something else",
]);

type LeadPayload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  projectType?: unknown;
  message?: unknown;
  website?: unknown;
};

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      })[character] ?? character,
  );
}

export async function POST(request: Request) {
  let payload: LeadPayload;

  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return Response.json({ message: "Invalid request." }, { status: 400 });
  }

  // Quietly accept bot submissions so the honeypot is not detectable.
  if (clean(payload.website, 200)) {
    return Response.json({ ok: true });
  }

  const lead = {
    name: clean(payload.name, 100),
    email: clean(payload.email, 254).toLowerCase(),
    company: clean(payload.company, 120),
    projectType: clean(payload.projectType, 80),
    message: clean(payload.message, 3000),
  };

  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email);
  if (
    !lead.name ||
    !emailIsValid ||
    !ALLOWED_PROJECT_TYPES.has(lead.projectType) ||
    lead.message.length < 10
  ) {
    return Response.json(
      { message: "Please complete all required fields with valid details." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.LEADS_TO_EMAIL;
  const fromEmail = process.env.LEADS_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    console.error(
      "Lead delivery is not configured. Set RESEND_API_KEY, LEADS_TO_EMAIL, and LEADS_FROM_EMAIL.",
    );
    return Response.json(
      { message: "Our form is temporarily unavailable." },
      { status: 503 },
    );
  }

  const safe = Object.fromEntries(
    Object.entries(lead).map(([key, value]) => [key, escapeHtml(value)]),
  ) as typeof lead;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: lead.email,
      subject: `New project inquiry: ${lead.projectType}`,
      html: `
        <h1>New FSK Codehouse project inquiry</h1>
        <p><strong>Name:</strong> ${safe.name}</p>
        <p><strong>Email:</strong> ${safe.email}</p>
        <p><strong>Company:</strong> ${safe.company || "Not provided"}</p>
        <p><strong>Project type:</strong> ${safe.projectType}</p>
        <p><strong>Message:</strong></p>
        <p>${safe.message.replace(/\n/g, "<br>")}</p>
      `,
      text: [
        "New FSK Codehouse project inquiry",
        `Name: ${lead.name}`,
        `Email: ${lead.email}`,
        `Company: ${lead.company || "Not provided"}`,
        `Project type: ${lead.projectType}`,
        "",
        lead.message,
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    console.error("Resend rejected a lead email:", response.status, await response.text());
    return Response.json(
      { message: "We could not send your inquiry right now." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
