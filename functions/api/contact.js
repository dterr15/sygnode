// functions/api/contact.js
export const onRequestPost = async (context) => {
  const DB = context.env.DB;

  let data;

  try {
    data = await context.request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Campos normales
  const full_name = data.full_name;
  const email = data.email;
  const phone = data.phone || "";
  const company = data.company || "";
  const message = data.message || "";

  // Nuevos campos
  const inquiry_type = data.inquiry_type || "";
  const country = data.country || "";
  const timestamp = data.timestamp || new Date().toISOString();
  const privacy = data.privacy ? 1 : 0;
  const language = data.language || "";
  const timezone = data.timezone || "";
  const user_agent = data.userAgent || "";

  // IP real (via Cloudflare)
  const ip =
    context.request.headers.get("cf-connecting-ip") ||
    context.request.headers.get("x-forwarded-for") ||
    "";

  const utm_source = data.utm_source || "";
  const utm_medium = data.utm_medium || "";
  const utm_campaign = data.utm_campaign || "";

  // Validación mínima
  if (!full_name || !email) {
    return new Response(
      JSON.stringify({ error: "Nombre y correo son obligatorios" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    await DB.prepare(
      `INSERT INTO contacts
        (full_name, email, phone, company, message, utm_source, utm_medium, utm_campaign,
         inquiry_type, country, timestamp, privacy, language, timezone, user_agent, ip)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(
        full_name,
        email,
        phone,
        company,
        message,
        utm_source,
        utm_medium,
        utm_campaign,
        inquiry_type,
        country,
        timestamp,
        privacy,
        language,
        timezone,
        user_agent,
        ip
      )
      .run();
  } catch (error) {
    console.error("D1 error", error);
    return new Response(JSON.stringify({ error: "Error al guardar en D1" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
};
