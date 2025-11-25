// functions/api/leads-list.js

export const onRequestGet = async (context) => {
  const DB = context.env.DB;

  try {
    const result = await DB.prepare(
      `SELECT 
        id,
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
        user_agent,
        ip,
        utm_source,
        utm_medium,
        utm_campaign,
        created_at
      FROM contacts
      ORDER BY id DESC
      LIMIT 200`
    ).all();

    return new Response(JSON.stringify({ data: result.results }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // permite que el dashboard pueda leerlo
      },
    });

  } catch (error) {
    console.error("D1 error:", error);
    return new Response(JSON.stringify({ error: "Error retrieving leads" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
