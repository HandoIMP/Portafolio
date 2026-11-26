import type { APIRoute } from 'astro';
import { eq } from 'drizzle-orm';
import { getDb } from '../../../db';
import { sessions, users } from '../../../db/schema';
import {
  SESSION_COOKIE_NAME,
  generateSessionToken,
  getSessionExpiryIso,
  hashSessionToken,
  verifyPassword,
} from '../../../lib/auth';

export const POST: APIRoute = async ({ request, locals }) => {
  const d1 = locals.runtime?.env?.DB;
  if (!d1) {
    return Response.json({ ok: false, error: 'DB no configurada' }, { status: 500 });
  }

  const db = getDb(d1);
  const formData = await request.formData();
  const email = String(formData.get('email') || '').trim().toLowerCase();
  const password = String(formData.get('password') || '');

  if (!email || !password) {
    return Response.json({ ok: false, error: 'Correo y contraseña son obligatorios.' }, { status: 400 });
  }

  const userRows = await db.select().from(users).where(eq(users.email, email)).limit(1);
  const user = userRows[0];
  if (!user) {
    return Response.json({ ok: false, error: 'Credenciales inválidas.' }, { status: 401 });
  }

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    return Response.json({ ok: false, error: 'Credenciales inválidas.' }, { status: 401 });
  }

  const rawToken = generateSessionToken();
  const tokenHash = await hashSessionToken(rawToken);
  const expiresAt = getSessionExpiryIso();
  const now = new Date().toISOString();

  await db.insert(sessions).values({
    id: tokenHash,
    userId: user.id,
    expiresAt,
    createdAt: now,
  });

  const headers = new Headers();
  headers.set(
    'set-cookie',
    `${SESSION_COOKIE_NAME}=${encodeURIComponent(rawToken)}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${14 * 24 * 60 * 60}`
  );
  headers.set('content-type', 'application/json');

  return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
};
