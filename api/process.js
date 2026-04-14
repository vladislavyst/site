const {
  DEFAULT_FLOW_HASH,
  DEFAULT_LANDING,
  normalizeBody,
  pick,
  partnerRequest,
  readIp,
} = require("./_shared");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method Not Allowed" });
  }

  const body = normalizeBody(req);
  const flowHash = pick(body, ["flow_hash", "hash"]) || DEFAULT_FLOW_HASH;

  const payload = {
    flow_hash: flowHash,
    first_name: pick(body, ["first_name", "firstname", "name"]),
    last_name: pick(body, ["last_name", "lastname", "surname"]),
    email: pick(body, ["email", "mail", "correo"]),
    phone: pick(body, ["phone", "phone_raw", "tel", "telefono"]),
    sub1: pick(body, ["sub1"]),
    sub2: pick(body, ["sub2"]),
    sub3: pick(body, ["sub3"]),
    sub4: pick(body, ["sub4"]),
    click_id: pick(body, ["click_id", "subid", "sub_id"]),
    ip: readIp(req),
    user_agent: req.headers["user-agent"] || null,
    landing: DEFAULT_LANDING,
  };

  const result = await partnerRequest("/web/lead", "POST", payload);

  if (result.status === 201 && result.body?.id) {
    return res.redirect(302, `/success?lead_id=${encodeURIComponent(result.body.id)}`);
  }

  const referer = req.headers.referer || "/";
  const redirectUrl = new URL(referer, `https://${req.headers.host}`);
  redirectUrl.searchParams.set("result", "error");
  redirectUrl.searchParams.set("status", String(result.status || 500));

  return res.redirect(302, `${redirectUrl.pathname}${redirectUrl.search}`);
};
