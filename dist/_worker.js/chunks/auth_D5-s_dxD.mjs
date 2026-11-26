globalThis.process ??= {}; globalThis.process.env ??= {};
const SESSION_COOKIE_NAME = "imp_session";
const SESSION_TTL_DAYS = 14;
function toHex(bytes) {
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}
function fromHex(hex) {
  const clean = hex.trim();
  const out = new Uint8Array(new ArrayBuffer(clean.length / 2));
  for (let i = 0; i < out.length; i++) {
    out[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16);
  }
  return out;
}
function constantTimeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a[i] ^ b[i];
  }
  return diff === 0;
}
async function verifyPassword(password, storedHash) {
  const parts = storedHash.split("$");
  if (parts.length !== 4 || parts[0] !== "pbkdf2") return false;
  const iterations = Number(parts[1]);
  if (!Number.isFinite(iterations) || iterations < 1e4) return false;
  const salt = fromHex(parts[2]);
  const expected = fromHex(parts[3]);
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const derived = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt,
      iterations,
      hash: "SHA-256"
    },
    keyMaterial,
    expected.length * 8
  );
  return constantTimeEqual(new Uint8Array(derived), expected);
}
function generateSessionToken() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return toHex(bytes);
}
async function hashSessionToken(token) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(token));
  return toHex(new Uint8Array(digest));
}
function getSessionExpiryIso() {
  const date = new Date(Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1e3);
  return date.toISOString();
}

export { SESSION_COOKIE_NAME as S, getSessionExpiryIso as a, generateSessionToken as g, hashSessionToken as h, verifyPassword as v };
