import type { APIRoute } from 'astro';
import { eq } from 'drizzle-orm';
import { getDb } from '../../../db';
import { sessions } from '../../../db/schema';
import { SESSION_COOKIE_NAME, hashSessionToken } from '../../../lib/auth';

export const POST: APIRoute = async ({ request, locals }) => {
  const d1 = locals.runtime?.env?.DB;
  if (d1) {
    const db = getDb(d1);
    const cookieHeader = request.headers.get('cookie') || '';
    const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${SESSION_COOKIE_NAME}=([^;]*)`));
    const token = match ? decodeURIComponent(match[1]) : null;

    if (token) {
      try {
        const tokenHash = await hashSessionToken(token);
        await db.delete(sessions).where(eq(sessions.id, tokenHash));
      } catch {
        // ignore cleanup errors
      }
    }
  }

  const headers = new Headers();
  headers.set(
    'set-cookie',
    `${SESSION_COOKIE_NAME}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`
  );
  headers.set('location', '/admin/login');

  return new Response(null, { status: 302, headers });
};
