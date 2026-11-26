globalThis.process ??= {}; globalThis.process.env ??= {};
export { renderers } from '../../../renderers.mjs';

const GET = async ({ params, locals }) => {
  const key = params.key;
  if (!key) {
    return new Response("Missing media key", { status: 400 });
  }
  const bucket = locals.runtime?.env?.MEDIA;
  if (!bucket) {
    return new Response("Media bucket not configured", { status: 500 });
  }
  const object = await bucket.get(key);
  if (!object) {
    return new Response("Not found", { status: 404 });
  }
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  if (!headers.has("cache-control")) {
    headers.set("cache-control", "public, max-age=31536000, immutable");
  }
  return new Response(object.body, { headers });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
