// functions/api/submit.js
// Cloudflare Pages Function para manejar envío de formulario

export async function onRequestPost(context) {
  try {
    const data = await context.request.json();

    // Validar campos requeridos básicos
    const requiredFields = ['nombre', 'email', 'empresa', 'cargo'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return new Response(JSON.stringify({ 
          error: `Campo requerido faltante: ${field}` 
        }), {
          status: 400,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      }
    }

    // Construir email HTML profesional
    const emailHTML = buildEmailHTML(data);

    // Enviar email usando MailChannels (gratis en Cloudflare)
    const mailResponse = await fetch('https://api.mailchannels.net/tx/v1/send', {
      method: 'POST',
      headers: { 
        'content-type': 'application/json' 
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ 
            email: 'cs@sygnode.cl', 
            name: 'SYGNODE Team' 
          }]
        }],
        from: {
          email: 'fit@sygnode.cl',
          name: 'SYGNODE Fit Intake'
        },
        subject: `${getFitEmoji(data.fit_status)} ${data.fit_status} - ${data.nombre} (${data.empresa})`,
        content: [{ 
          type: 'text/html', 
          value: emailHTML 
        }]
      })
    });

    if (!mailResponse.ok) {
      const errorText = await mailResponse.text();
      console.error('Mailgun error:', mailResponse.status, errorText);
      throw new Error(`Mailgun error ${mailResponse.status}: ${errorText}`);
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Formulario enviado correctamente',
      fit_status: data.fit_status,
      banda_sugerida: data.banda_sugerida,
      exposicion: data.exposicion
    }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ 
      error: 'Error al procesar formulario',
      details: error.message
    }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

// Manejar OPTIONS para CORS
export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}

// Helper functions
function getFitEmoji(status) {
  switch(status) {
    case 'APTO': return '✅';
    case 'NO_APTO': return '❌';
    case 'REVISAR': return '⚠️';
    default: return '📋';
  }
}

function getFitColor(status) {
  switch(status) {
    case 'APTO': return '#10b981';
    case 'NO_APTO': return '#ef4444';
    case 'REVISAR': return '#f59e0b';
    default: return '#64748b';
  }
}

function getBandaColor(banda) {
  switch(banda) {
    case 'BASE': return '#06b6d4';
    case 'SEGUIMIENTO': return '#8b5cf6';
    case 'CATEGORIAS': return '#ec4899';
    default: return '#64748b';
  }
}

function getExposicionColor(exposicion) {
  switch(exposicion) {
    case 'ALTA': return '#ef4444';
    case 'MEDIA': return '#f59e0b';
    case 'BAJA': return '#10b981';
    default: return '#64748b';
  }
}

function buildEmailHTML(data) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6; 
      color: #1e293b; 
      margin: 0;
      padding: 0;
      background-color: #f8fafc;
    }
    .container { 
      max-width: 700px; 
      margin: 20px auto; 
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    .header { 
      background: linear-gradient(135deg, #1e3a8a, #0a1a33); 
      color: white; 
      padding: 30px 24px;
      text-align: center;
    }
    .header h1 { 
      margin: 0 0 8px; 
      font-size: 28px;
      font-weight: 800;
    }
    .header p {
      margin: 0;
      opacity: 0.9;
      font-size: 14px;
    }
    .metrics {
      display: flex;
      gap: 12px;
      padding: 20px 24px;
      background: #f1f5f9;
      border-bottom: 1px solid #e2e8f0;
    }
    .metric {
      flex: 1;
      text-align: center;
      padding: 16px;
      background: white;
      border-radius: 8px;
      border: 2px solid #e2e8f0;
    }
    .metric-label {
      font-size: 11px;
      text-transform: uppercase;
      font-weight: 700;
      color: #64748b;
      margin-bottom: 6px;
      letter-spacing: 0.5px;
    }
    .metric-value {
      font-size: 18px;
      font-weight: 800;
      margin-bottom: 4px;
    }
    .section { 
      padding: 24px;
      border-bottom: 1px solid #e2e8f0;
    }
    .section:last-child {
      border-bottom: none;
    }
    .section h3 { 
      margin: 0 0 16px; 
      color: #0f172a;
      font-size: 16px;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .field-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 12px;
    }
    .field { 
      margin-bottom: 12px;
    }
    .label { 
      font-weight: 600; 
      color: #475569;
      font-size: 13px;
      margin-bottom: 4px;
    }
    .value {
      color: #0f172a;
      font-size: 15px;
    }
    .badge {
      display: inline-block;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 4px;
    }
    .tag {
      display: inline-block;
      padding: 4px 10px;
      background: #e0f2fe;
      color: #0369a1;
      border-radius: 4px;
      font-size: 13px;
      font-weight: 600;
    }
    .highlight {
      background: #fef3c7;
      padding: 16px;
      border-radius: 8px;
      border-left: 4px solid #f59e0b;
      margin: 16px 0;
    }
    .footer {
      background: #f8fafc;
      padding: 20px 24px;
      text-align: center;
      font-size: 13px;
      color: #64748b;
    }
    @media (max-width: 600px) {
      .metrics {
        flex-direction: column;
      }
      .field-row {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎯 Nueva Pre-calificación SYGNODE</h1>
      <p>Formulario de fit intake recibido</p>
    </div>

    <div class="metrics">
      <div class="metric">
        <div class="metric-label">Fit Status</div>
        <div class="metric-value" style="color: ${getFitColor(data.fit_status)}">
          ${getFitEmoji(data.fit_status)} ${data.fit_status}
        </div>
      </div>
      <div class="metric">
        <div class="metric-label">Banda</div>
        <div class="metric-value" style="color: ${getBandaColor(data.banda_sugerida)}">
          ${data.banda_sugerida}
        </div>
      </div>
      <div class="metric">
        <div class="metric-label">Exposición</div>
        <div class="metric-value" style="color: ${getExposicionColor(data.exposicion)}">
          ${data.exposicion}
        </div>
      </div>
    </div>

    <div class="section">
      <h3>👤 Contacto</h3>
      <div class="field-row">
        <div class="field">
          <div class="label">Nombre</div>
          <div class="value">${data.nombre}</div>
        </div>
        <div class="field">
          <div class="label">Cargo</div>
          <div class="value">${data.cargo}</div>
        </div>
      </div>
      <div class="field-row">
        <div class="field">
          <div class="label">Email</div>
          <div class="value">${data.email}</div>
        </div>
        <div class="field">
          <div class="label">Teléfono</div>
          <div class="value">${data.telefono}</div>
        </div>
      </div>
      <div class="field-row">
        <div class="field">
          <div class="label">Empresa</div>
          <div class="value"><strong>${data.empresa}</strong></div>
        </div>
        <div class="field">
          <div class="label">País</div>
          <div class="value">${data.pais}</div>
        </div>
      </div>
      <div class="field">
        <div class="label">Tamaño</div>
        <div class="value">${data.tamano_equipo} empleados</div>
      </div>
    </div>

    <div class="section">
      <h3>📊 Volumen y Frecuencia</h3>
      <div class="field-row">
        <div class="field">
          <div class="label">Requerimientos/semana</div>
          <div class="value"><strong>${data.req_semana}</strong></div>
        </div>
        <div class="field">
          <div class="label">Áreas solicitantes</div>
          <div class="value">${data.areas_solicitantes}</div>
        </div>
      </div>
      <div class="field">
        <div class="label">Categorías principales</div>
        <div class="tags">
          ${data.categorias_top.split(',').map(cat => `<span class="tag">${cat.trim()}</span>`).join('')}
        </div>
        ${data.categorias_otro_texto ? `<div class="value" style="margin-top: 8px;">Especificación: ${data.categorias_otro_texto}</div>` : ''}
      </div>
    </div>

    <div class="section">
      <h3>⚠️ Exposición y Criticidad</h3>
      <div class="field">
        <div class="label">Impacto de error</div>
        <div class="value"><strong>${data.impacto_error}</strong></div>
      </div>
      <div class="field-row">
        <div class="field">
          <div class="label">Presión externa</div>
          <div class="value">${data.presion_externa}</div>
        </div>
        <div class="field">
          <div class="label">Compras críticas/semana</div>
          <div class="value">${data.compras_criticas_semana}</div>
        </div>
      </div>
    </div>

    <div class="section">
      <h3>🔍 Estado Actual</h3>
      <div class="field">
        <div class="label">Comparativo con respaldo</div>
        <div class="value">${data.comparativo_con_respaldo}</div>
      </div>
      <div class="field">
        <div class="label">Canales de intake actuales</div>
        <div class="tags">
          ${data.canales_intake_actuales.split(',').map(canal => `<span class="tag">${canal.trim()}</span>`).join('')}
        </div>
        ${data.canal_otro_texto ? `<div class="value" style="margin-top: 8px;">Especificación: ${data.canal_otro_texto}</div>` : ''}
      </div>
      <div class="field">
        <div class="label">Cambios de scope</div>
        <div class="value">${data.cambios_scope}</div>
      </div>
    </div>

    <div class="section">
      <h3>📦 Seguimiento</h3>
      <div class="field-row">
        <div class="field">
          <div class="label">Trazabilidad entrega</div>
          <div class="value">${data.necesita_trazabilidad_entrega}</div>
        </div>
        <div class="field">
          <div class="label">Lugar de entrega</div>
          <div class="value">${data.lugar_entrega}</div>
        </div>
      </div>
    </div>

    <div class="section">
      <h3>🎯 Categorías y Estandarización</h3>
      <div class="field-row">
        <div class="field">
          <div class="label">Categorías repetitivas</div>
          <div class="value">${data.categorias_repetitivas}</div>
        </div>
        <div class="field">
          <div class="label">Estandarizar criterio</div>
          <div class="value">${data.estandarizar_criterio}</div>
        </div>
      </div>
    </div>

    <div class="section">
      <h3>🚀 Arranque</h3>
      <div class="field-row">
        <div class="field">
          <div class="label">Disponibilidad</div>
          <div class="value"><strong>${data.disponibilidad_arranque}</strong></div>
        </div>
        <div class="field">
          <div class="label">Canal preferido</div>
          <div class="value">${data.canal_preferido_intake}</div>
        </div>
      </div>
      ${data.comentario ? `
      <div class="field">
        <div class="label">Comentarios adicionales</div>
        <div class="highlight">
          <div class="value">${data.comentario}</div>
        </div>
      </div>
      ` : ''}
    </div>

    <div class="footer">
      <p><strong>Timestamp:</strong> ${new Date(data.timestamp).toLocaleString('es-CL')}</p>
      <p><strong>Source:</strong> ${data.source}</p>
      <p style="margin-top: 12px; font-size: 12px;">
        Este email fue generado automáticamente por el sistema SYGNODE Fit Intake
      </p>
    </div>
  </div>
</body>
</html>
  `;
}
