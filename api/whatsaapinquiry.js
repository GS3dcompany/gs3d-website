// ponytail: minimal AJAX receiver for the WhatsApp form. The client-side JS
// already opens the wa.me chat URL itself on success, so this endpoint only
// needs to persist the inquiry and return 2xx JSON. The wa.me number is
// 971542797571 (kept in the page JS, not here).
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY;

function parseBody(req) {
  // @vercel/node pre-parses form-urlencoded bodies into an object in some
  // runtimes and leaves them as a raw string in others; handle both.
  if (req.body && typeof req.body === 'object' && !Array.isArray(req.body)) {
    return req.body;
  }
  const raw = typeof req.body === 'string' ? req.body : '';
  const params = new URLSearchParams(raw);
  const data = {};
  for (const [key, value] of params) data[key] = value;
  return data;
}

async function insertWhatsapp(fields) {
  if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) {
    console.warn('Supabase env missing; whatsapp inquiry not persisted');
    return;
  }
  const row = {
    form_type: 'whatsapp',
    fullname: null,
    company_name: null,
    email: null,
    contact_number: fields.number || fields.wa_phone || null,
    services: null,
    message: fields.message || null,
  };
  const res = await fetch(`${SUPABASE_URL}/rest/v1/gs3d_enquiries`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_SECRET_KEY,
      Authorization: `Bearer ${SUPABASE_SECRET_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(row),
  });
  if (!res.ok) throw new Error(`Supabase insert failed: ${res.status} ${await res.text()}`);
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const fields = parseBody(req);

  // Honeypot: silently pretend success for bots
  if (fields.website_honey_point && fields.website_honey_point.trim() !== '') {
    return res.status(200).json({ success: true });
  }

  try {
    await insertWhatsapp(fields);
  } catch (err) {
    console.error('whatsaapinquiry insert failed:', err);
  }

  return res.status(200).json({ success: true, message: 'ok' });
};
