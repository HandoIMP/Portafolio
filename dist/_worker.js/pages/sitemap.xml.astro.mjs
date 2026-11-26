globalThis.process ??= {}; globalThis.process.env ??= {};
import { g as getDb, p as projects, e as eq, d as desc, b as blogPosts } from '../chunks/index_w6lK2Ajg.mjs';
export { renderers } from '../renderers.mjs';

function escapeXml(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
const GET = async ({ url, locals }) => {
  const origin = url.origin;
  const entries = [
    { loc: `${origin}/` },
    { loc: `${origin}/blog` },
    { loc: `${origin}/contacto` }
  ];
  const d1 = locals.runtime?.env?.DB;
  if (d1) {
    try {
      const db = getDb(d1);
      const [publishedProjects, publishedPosts] = await Promise.all([
        db.select({ slug: projects.slug, updatedAt: projects.updatedAt }).from(projects).where(eq(projects.published, true)).orderBy(desc(projects.updatedAt)),
        db.select({ slug: blogPosts.slug, updatedAt: blogPosts.updatedAt }).from(blogPosts).where(eq(blogPosts.status, "published")).orderBy(desc(blogPosts.updatedAt))
      ]);
      for (const proj of publishedProjects) {
        entries.push({
          loc: `${origin}/trabajo/${proj.slug}`,
          lastmod: proj.updatedAt
        });
      }
      for (const post of publishedPosts) {
        entries.push({
          loc: `${origin}/blog/${post.slug}`,
          lastmod: post.updatedAt
        });
      }
    } catch {
    }
  }
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(
    (entry) => `  <url>
    <loc>${escapeXml(entry.loc)}</loc>${entry.lastmod ? `
    <lastmod>${escapeXml(entry.lastmod.slice(0, 10))}</lastmod>` : ""}
  </url>`
  ).join("\n")}
</urlset>`;
  return new Response(body, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=300"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
