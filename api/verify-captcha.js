// ponytail: the captcha image is a static decorative image (images/captcha.png);
// client-side validation enforces "4 digits" before this is called, so any
// well-formed request passes. Upgrade path: replace with a real CAPTCHA service.
module.exports = (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
  return res.status(200).json({ success: true, message: 'ok' });
};
