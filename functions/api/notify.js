// functions/api/notify.js
// Cloudflare Pages Function — registro de acceso anticipado al lead magnet vía Mailgun

export async function onRequestPost(context) {
  try {
    const data = await context.request.json();

    // Honeypot anti-spam
    if (data.website && data.website.trim() !== "") {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Validación mínima
    if (!data.name || !data.email) {
      return new Response(
        JSON.stringify({ error: "Nombre y email son obligatorios" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Mailgun config
    let MAILGUN_API_KEY = context.env.MAILGUN_API_KEY;
    const MAILGUN_DOMAIN = context.env.MAILGUN_DOMAIN || "pxi.sygnode.cl";

    if (MAILGUN_API_KEY) {
      MAILGUN_API_KEY = MAILGUN_API_KEY.trim();
      if (MAILGUN_API_KEY.startsWith("key-")) {
        MAILGUN_API_KEY = MAILGUN_API_KEY.replace("key-", "");
      }
    }

    if (!MAILGUN_API_KEY) {
      throw new Error("MAILGUN_API_KEY no configurada");
    }

    const source = data.source || "desconocido";
    const subject = `Acceso anticipado: ${data.name} · ${source}`;

    const emailHTML = `
      <h2 style="font-family:sans-serif;color:#1F1B17;">Nuevo registro de acceso anticipado</h2>
      <table style="font-family:sans-serif;font-size:15px;border-collapse:collapse;width:100%;">
        <tr><td style="padding:8px 0;color:#6E665B;width:140px;">Nombre</td><td style="padding:8px 0;"><strong>${data.name}</strong></td></tr>
        <tr><td style="padding:8px 0;color:#6E665B;">Empresa</td><td style="padding:8px 0;">${data.company || "-"}</td></tr>
        <tr><td style="padding:8px 0;color:#6E665B;">Email</td><td style="padding:8px 0;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
        <tr><td style="padding:8px 0;color:#6E665B;">Material</td><td style="padding:8px 0;">${source}</td></tr>
      </table>
      <hr style="border:none;border-top:1px solid #E5DCC9;margin:20px 0;">
      <p style="font-family:sans-serif;font-size:13px;color:#9E978E;">Enviado: ${new Date().toLocaleString("es-CL", { timeZone: "America/Santiago" })}</p>
    `;

    const formData = new FormData();
    formData.append("from", `SYGNODE Notificaciones <contact@${MAILGUN_DOMAIN}>`);
    formData.append("to", "cs@sygnode.cl");
    formData.append("subject", subject);
    formData.append("html", emailHTML);
    formData.append("h:Reply-To", data.email);

    const mailResponse = await fetch(
      `https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`,
      {
        method: "POST",
        headers: { Authorization: "Basic " + btoa("api:" + MAILGUN_API_KEY) },
        body: formData,
      }
    );

    if (!mailResponse.ok) {
      const errorText = await mailResponse.text();
      console.error("Mailgun error:", errorText);
      throw new Error(`Mailgun ${mailResponse.status}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Error al enviar", details: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
