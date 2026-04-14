const API_URI = process.env.API_URI || "https://apixuz.com/api/v1";
const API_TOKEN = process.env.API_TOKEN || "";
const DEFAULT_FLOW_HASH = process.env.API_FLOW_HASH || "69dcb0eac654109754";
const DEFAULT_LANDING = process.env.API_LANDING || "Storm Bitpluse";

function readIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0].trim();
  }

  if (typeof req.socket?.remoteAddress === "string") {
    return req.socket.remoteAddress;
  }

  return null;
}

function normalizeBody(req) {
  if (req.body && typeof req.body === "object") {
    return req.body;
  }

  if (typeof req.body === "string") {
    const params = new URLSearchParams(req.body);
    return Object.fromEntries(params.entries());
  }

  return {};
}

function pick(data, keys) {
  for (const key of keys) {
    const value = data?.[key];
    if (typeof value === "string" && value.trim() !== "") {
      return value.trim();
    }
  }

  return null;
}

async function partnerRequest(path, method, payload) {
  if (!API_TOKEN) {
    return {
      ok: false,
      status: 500,
      body: { errors: { token: ["missing API_TOKEN env var"] } },
    };
  }

  const response = await fetch(`${API_URI}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: payload ? JSON.stringify(payload) : undefined,
  });

  let body = {};
  try {
    body = await response.json();
  } catch (_error) {
    body = {};
  }

  return { ok: response.ok, status: response.status, body };
}

module.exports = {
  DEFAULT_FLOW_HASH,
  DEFAULT_LANDING,
  normalizeBody,
  pick,
  partnerRequest,
  readIp,
};
