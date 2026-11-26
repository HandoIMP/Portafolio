import type { APIRoute } from 'astro';
import { sql } from 'drizzle-orm';
import { getDb } from '../../db';

export const GET: APIRoute = async ({ locals }) => {
  try {
    const env = locals.runtime?.env;
    if (!env?.DB) {
      return Response.json({ ok: false, error: 'D1 binding missing' }, { status: 500 });
    }
    const db = getDb(env.DB);
    const result = await db.get(sql`SELECT 1 as up`);
    return Response.json({ ok: true, db: result, hasMediaBucket: Boolean(env.MEDIA) });
  } catch (error) {
    return Response.json(
      { ok: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
};
