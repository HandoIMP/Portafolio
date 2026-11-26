import { defineMiddleware } from 'astro:middleware';
import { getDb } from './db';
import { sessions, users } from './db/schema';
import { SESSION_COOKIE_NAME, hashSessionToken } from './lib/auth';
import { eq, gt } from 'drizzle-orm';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/api/admin');

  if (!isAdminRoute) {
    return next();
  }

  // Allow login page and login API without auth
  if (pathname === '/admin/login' || pathname === '/api/auth/login') {
    return next();
  }

  const d1 = context.locals.runtime?.env?.DB;
  if (!d1) {
    return context.redirect('/admin/login');
  }

  const db = getDb(d1);
  const cookieHeader = context.request.headers.get('cookie') || '';
  const token = parseCookie(cookieHeader, SESSION_COOKIE_NAME);

  if (!token) {
    if (pathname.startsWith('/api/')) {
      return Response.json({ ok: false, error: 'No autenticado' }, { status: 401 });
    }
    return context.redirect('/admin/login');
  }

  try {
    const tokenHash = await hashSessionToken(token);
    const now = new Date().toISOString();

    const result = await db
      .select({
        sessionId: sessions.id,
        userId: users.id,
        email: users.email,
        name: users.name,
      })
      .from(sessions)
      .innerJoin(users, eq(sessions.userId, users.id))
      .where(eq(sessions.id, tokenHash))
      .limit(1);

    const row = result[0];
    if (!row || !row.sessionId) {
      return handleUnauth(context, pathname);
    }

    // Check expiry via a separate query since gt with text needs care
    const sessionRows = await db
      .select({ expiresAt: sessions.expiresAt })
      .from(sessions)
      .where(eq(sessions.id, tokenHash))
      .limit(1);

    if (!sessionRows[0] || sessionRows[0].expiresAt < now) {
      // Session expired, clean up
      await db.delete(sessions).where(eq(sessions.id, tokenHash));
      return handleUnauth(context, pathname);
    }

    context.locals.user = {
      id: row.userId,
      email: row.email,
      name: row.name,
    };
  } catch {
    return handleUnauth(context, pathname);
  }

  return next();
});

function handleUnauth(context: Parameters<Parameters<typeof defineMiddleware>[0]>[0], pathname: string) {
  if (pathname.startsWith('/api/')) {
    return Response.json({ ok: false, error: 'Sesión inválida o expirada' }, { status: 401 });
  }
  return context.redirect('/admin/login');
}

function parseCookie(header: string, name: string): string | null {
  const match = header.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}
