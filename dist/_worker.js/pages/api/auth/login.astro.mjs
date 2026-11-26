globalThis.process ??= {}; globalThis.process.env ??= {};
import { g as getDb, u as users, e as eq, i as sessions } from '../../../chunks/index_w6lK2Ajg.mjs';
import { v as verifyPassword, g as generateSessionToken, h as hashSessionToken, a as getSessionExpiryIso, S as SESSION_COOKIE_NAME } from '../../../chunks/auth_D5-s_dxD.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request, locals }) => {
  const d1 = locals.runtime?.env?.DB;
  if (!d1) {
    return Response.json({ ok: false, error: "DB no configurada" }, { status: 500 });
  }
  const db = getDb(d1);
  const formData = await request.formData();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  if (!email || !password) {
    return Response.json({ ok: false, error: "Correo y contraseña son obligatorios." }, { status: 400 });
  }
  const userRows = await db.select().from(users).where(eq(users.email, email)).limit(1);
  const user = userRows[0];
  if (!user) {
    return Response.json({ ok: false, error: "Credenciales inválidas." }, { status: 401 });
  }
  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    return Response.json({ ok: false, error: "Credenciales inválidas." }, { status: 401 });
  }
  const rawToken = generateSessionToken();
  const tokenHash = await hashSessionToken(rawToken);
  const expiresAt = getSessionExpiryIso();
  const now = (/* @__PURE__ */ new Date()).toISOString();
  await db.insert(sessions).values({
    id: tokenHash,
    userId: user.id,
    expiresAt,
    createdAt: now
  });
  const headers = new Headers();
  headers.set(
    "set-cookie",
    `${SESSION_COOKIE_NAME}=${encodeURIComponent(rawToken)}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${14 * 24 * 60 * 60}`
  );
  headers.set("content-type", "application/json");
  return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
