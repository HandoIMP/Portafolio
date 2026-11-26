globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as defineMiddleware, s as sequence } from './chunks/render-context_CQgOuIYl.mjs';
import { g as getDb, u as users, i as sessions, e as eq } from './chunks/index_w6lK2Ajg.mjs';
import { h as hashSessionToken, S as SESSION_COOKIE_NAME } from './chunks/auth_D5-s_dxD.mjs';
import './chunks/astro-designed-error-pages_PkiXrSO7.mjs';
import './chunks/astro/server_BAIfklZH.mjs';

const onRequest$2 = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  const isAdminRoute = pathname.startsWith("/admin") || pathname.startsWith("/api/admin");
  if (!isAdminRoute) {
    return next();
  }
  if (pathname === "/admin/login" || pathname === "/api/auth/login") {
    return next();
  }
  const d1 = context.locals.runtime?.env?.DB;
  if (!d1) {
    return context.redirect("/admin/login");
  }
  const db = getDb(d1);
  const cookieHeader = context.request.headers.get("cookie") || "";
  const token = parseCookie(cookieHeader, SESSION_COOKIE_NAME);
  if (!token) {
    if (pathname.startsWith("/api/")) {
      return Response.json({ ok: false, error: "No autenticado" }, { status: 401 });
    }
    return context.redirect("/admin/login");
  }
  try {
    const tokenHash = await hashSessionToken(token);
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const result = await db.select({
      sessionId: sessions.id,
      userId: users.id,
      email: users.email,
      name: users.name
    }).from(sessions).innerJoin(users, eq(sessions.userId, users.id)).where(eq(sessions.id, tokenHash)).limit(1);
    const row = result[0];
    if (!row || !row.sessionId) {
      return handleUnauth(context, pathname);
    }
    const sessionRows = await db.select({ expiresAt: sessions.expiresAt }).from(sessions).where(eq(sessions.id, tokenHash)).limit(1);
    if (!sessionRows[0] || sessionRows[0].expiresAt < now) {
      await db.delete(sessions).where(eq(sessions.id, tokenHash));
      return handleUnauth(context, pathname);
    }
    context.locals.user = {
      id: row.userId,
      email: row.email,
      name: row.name
    };
  } catch {
    return handleUnauth(context, pathname);
  }
  return next();
});
function handleUnauth(context, pathname) {
  if (pathname.startsWith("/api/")) {
    return Response.json({ ok: false, error: "Sesión inválida o expirada" }, { status: 401 });
  }
  return context.redirect("/admin/login");
}
function parseCookie(header, name) {
  const match = header.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

const onRequest$1 = (context, next) => {
  if (context.isPrerendered) {
    context.locals.runtime ??= {
      env: process.env
    };
  }
  return next();
};

const onRequest = sequence(
	onRequest$1,
	onRequest$2
	
);

export { onRequest };
