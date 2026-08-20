export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const body = await request.json();
    
    // Verifikasi PIN dari input pengguna
    if (!body.pin || body.pin !== env.ACCESS_PIN) {
      return new Response(
        JSON.stringify({ success: false, message: "PIN Keamanan tidak valid!" }), 
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Jika PIN Benar, ambil dari Environment Variables Cloudflare
    const sensitiveData = {
      address: env.SENSITIVE_ADDRESS || "Data belum diatur di Cloudflare",
      phone: env.SENSITIVE_PHONE || "Data belum diatur di Cloudflare",
      email: env.SENSITIVE_EMAIL || "Data belum diatur di Cloudflare",
      birthdate: env.SENSITIVE_BIRTHDATE || "Data belum diatur di Cloudflare"
    };

    return new Response(
      JSON.stringify({ success: true, data: sensitiveData }), 
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, message: "Terjadi kesalahan pada server" }), 
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
