globalThis.process ??= {}; globalThis.process.env ??= {};
import { g as getDb, h as sql } from '../../chunks/index_w6lK2Ajg.mjs';
export { renderers } from '../../renderers.mjs';

const GET = async ({ locals }) => {
  try {
    const env = locals.runtime?.env;
    if (!env?.DB) {
      return Response.json({ ok: false, error: "D1 binding missing" }, { status: 500 });
    }
    const db = getDb(env.DB);
    const result = await db.get(sql`SELECT 1 as up`);
    return Response.json({ ok: true, db: result, hasMediaBucket: Boolean(env.MEDIA) });
  } catch (error) {
    return Response.json(
      { ok: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
