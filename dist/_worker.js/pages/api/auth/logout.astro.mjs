globalThis.process ??= {}; globalThis.process.env ??= {};
import { g as getDb, i as sessions, e as eq } from '../../../chunks/index_w6lK2Ajg.mjs';
import { S as SESSION_COOKIE_NAME, h as hashSessionToken } from '../../../chunks/auth_D5-s_dxD.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request, locals }) => {
  const d1 = locals.runtime?.env?.DB;
  if (d1) {
    const db = getDb(d1);
    const cookieHeader = request.headers.get("cookie") || "";
    const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${SESSION_COOKIE_NAME}=([^;]*)`));
    const token = match ? decodeURIComponent(match[1]) : null;
    if (token) {
      try {
        const tokenHash = await hashSessionToken(token);
        await db.delete(sessions).where(eq(sessions.id, tokenHash));
      } catch {
      }
    }
  }
  const headers = new Headers();
  headers.set(
    "set-cookie",
    `${SESSION_COOKIE_NAME}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`
  );
  headers.set("location", "/admin/login");
  return new Response(null, { status: 302, headers });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
