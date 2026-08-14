// ponytail: minimal form receiver. Enquiry forms were converted to mailto
// (option 1); this endpoint is the no-JS / option-3 fallback. It persists to
// Supabase and redirects back to the homepage like the original Laravel did.
// Upgrade path: add SMTP delivery once a SendGrid/SMTP key is available.
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

async function insertEnquiry(fields) {
  if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) {
    console.warn('Supabase env missing; enquiry not persisted');
    return;
  }
  const row = {
    form_type: 'enquiry',
    fullname: fields.fullname || fields.home_first_name || null,
    company_name: fields.company_name || fields.home_company_name || null,
    email: fields.email || fields.home_email || null,
    contact_number: fields.contact_number || fields.home_contact_number || null,
    services: fields.services || null,
    message: fields.message || fields.home_message || null,
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
  if (fields.fax_number && fields.fax_number.trim() !== '') {
    return res.redirect(302, '/?sent=1#enquiryform');
  }

  try {
    await insertEnquiry(fields);
  } catch (err) {
    console.error('store-home-form insert failed:', err);
  }

  // Native form submit navigates the page, so redirect back to the homepage
  return res.redirect(302, '/?sent=1#enquiryform');
};
