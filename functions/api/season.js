export async function onRequest(context) {
  const country = context.request.headers.get('CF-IPCountry') || 'CL';
  const month = new Date().getUTCMonth() + 1; // 1-12

  const southernHemisphere = [
    'CL','AR','BO','BR','PY','PE','UY','ZA','AU','NZ','MZ','ZW','NA','BW','ZM'
  ];

  const isSouth = southernHemisphere.includes(country);
  const inSeason = isSouth
    ? (month >= 11 || month <= 3)   // nov–mar
    : (month >= 6 && month <= 9);   // jun–sep

  return new Response(JSON.stringify({ inSeason, country, month }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store'
    }
  });
}
