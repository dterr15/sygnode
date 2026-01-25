// functions/api/lead.js
// Cloudflare Pages Function para manejar envíos de la página de contacto vía Mailgun

export async function onRequestPost(context) {
  try {
    const data = await context.request.json();

    // Anti-spam básico (honeypot)
    if (data.website && data.website.trim() !== "") {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validar campos requeridos
    const requiredFields = ['name', 'email', 'message'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return new Response(JSON.stringify({
          error: `Campo requerido faltante: ${field}`
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // Configuración Mailgun
    let MAILGUN_API_KEY = context.env.MAILGUN_API_KEY;
    const MAILGUN_DOMAIN = context.env.MAILGUN_DOMAIN || 'pxi.sygnode.cl';

    if (MAILGUN_API_KEY) {
      MAILGUN_API_KEY = MAILGUN_API_KEY.trim();
      if (MAILGUN_API_KEY.startsWith('key-')) {
        MAILGUN_API_KEY = MAILGUN_API_KEY.replace('key-', '');
      }
    }

    if (!MAILGUN_API_KEY) {
      throw new Error('MAILGUN_API_KEY no configurada');
    }

    // Construir el email
    const emailHTML = `
      <h2>Nuevo contacto desde sitio web</h2>
      <p><strong>Nombre:</strong> ${data.name}</p>
      <p><strong>Empresa:</strong> ${data.company || '-'}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Teléfono:</strong> ${data.phone || '-'}</p>
      <p><strong>País:</strong> ${data.country || '-'}</p>
      <p><strong>Tipo de consulta:</strong> ${data.inquiry_type || '-'}</p>
      <br>
      <p><strong>Mensaje:</strong></p>
      <p style="white-space: pre-wrap;">${data.message}</p>
      <hr>
      <p><small>Enviado el: ${new Date().toLocaleString('es-CL')}</small></p>
    `;

    const mailgunUrl = `https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`;

    const formData = new FormData();
    formData.append('from', `SYGNODE Contacto <contact@${MAILGUN_DOMAIN}>`);
    formData.append('to', 'cs@sygnode.cl');
    formData.append('subject', `📩 Contacto: ${data.name} (${data.company || 'Particular'})`);
    formData.append('html', emailHTML);

    const authHeader = 'Basic ' + btoa('api:' + MAILGUN_API_KEY);

    const mailResponse = await fetch(mailgunUrl, {
      method: 'POST',
      headers: {
        'Authorization': authHeader
      },
      body: formData
    });

    if (!mailResponse.ok) {
      const errorText = await mailResponse.text();
      console.error('Mailgun error:', errorText);
      throw new Error(`Error Mailgun: ${mailResponse.status}`);
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Mensaje enviado correctamente'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({
      error: 'Error al enviar contacto',
      details: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
