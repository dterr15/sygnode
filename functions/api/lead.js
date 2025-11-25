// functions/api/lead.js

export const onRequestPost = async (context) => {
  const WEBHOOK_URL = context.env.N8N_WEBHOOK_URL; // ⭐ Se guarda como secreto

  let data;
  try {
    data = await context.request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Anti-spam básico (honeypot)
  if (data.website && data.website.trim() !== "") {
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  // Reenvía la data a n8n SIN exponer URL
  const result = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!result.ok) {
    console.log("Error forwarding to n8n", await result.text());
    return new Response(JSON.stringify({ error: "Error forwarding" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
