// functions/api/contact.js
export const onRequestPost = async (context) => {
  const DB = context.env.DB;

  let body;

  // Parseo del JSON del formulario
  try {
    body = await context.request.json();
  } catch (e) {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Extraemos EXACTAMENTE los campos que envía el HTML
  const {
    full_name,     // viene de formData.name
    email,
    phone,
    company,
    message,       // viene formateado en sendToCloudflare()
    utm_source,
    utm_medium,
    utm_campaign
  } = body || {};

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

  // Guardar en D1
  try {
    await DB.prepare(
      `INSERT INTO contacts 
      (full_name, email, phone, company, message, utm_source, utm_medium, utm_campaign)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(
        full_name,
        email,
        phone || "",
        company || "",
        message || "",
        utm_source || "",
        utm_medium || "",
        utm_campaign || ""
      )
      .run();
  } catch (err) {
    console.error("DB error", err);
    return new Response(JSON.stringify({ error: "Error al guardar en la base de datos" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Respuesta OK
  return new Response(JSON.stringify({ ok: true }), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
};
