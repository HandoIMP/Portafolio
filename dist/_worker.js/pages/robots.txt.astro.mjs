globalThis.process ??= {}; globalThis.process.env ??= {};
export { renderers } from '../renderers.mjs';

const GET = async ({ url }) => {
  const content = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/admin

Sitemap: ${url.origin}/sitemap.xml
`;
  return new Response(content, {
    headers: {
      "content-type": "text/plain; charset=utf-8"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
