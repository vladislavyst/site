const { partnerRequest } = require("./_shared");

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, error: "Method Not Allowed" });
  }

  const leadId = req.query?.lead_id;
  if (!leadId) {
    return res.status(400).json({});
  }

  const query = new URLSearchParams({ lead_id: String(leadId) });
  const result = await partnerRequest(`/web/lead-state?${query.toString()}`, "GET");

  if (result.status === 200) {
    return res.status(200).json({
      success: true,
      http_code: 200,
      status: result.body?.state,
      redirect_url: result.body?.redirect_url || null,
    });
  }

  return res.status(result.status || 500).json({
    success: false,
    http_code: result.status || 500,
    errors: result.body?.errors || {},
  });
};
