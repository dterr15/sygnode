// functions/api/contact.js

export const onRequestPost = async (context) => {
  const DB = context.env.DB;

  let body;
  try {
    body = await context.request.json();
  } catch (e) {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const {
    full_name,
    email,
    phone,
    company,
    message,
    inquiry_type,
    country,
    timestamp,
    privacy,
    language,
    timezone,
    userAgent,
    ip,
    utm_source,
    utm_medium,
    utm_campaign,
  } = body || {};

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
      (full_name, email, phone, company, message,
       inquiry_type, country, timestamp, privacy, language,
       timezone, user_agent, ip,
       utm_source, utm_medium, utm_campaign)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(
        full_name,
        email,
        phone || "",
        company || "",
        message || "",
        inquiry_type || "",
        country || "",
        timestamp || "",
        privacy ? 1 : 0,
        language || "",
        timezone || "",
        userAgent || "",
        ip || "",
        utm_source || "",
        utm_medium || "",
        utm_campaign || ""
      )
      .run();
  } catch (err) {
    console.error("DB error", err);
    return new Response(JSON.stringify({ error: "Error al guardar" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
};
