import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url }) => {
  const content = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/admin

Sitemap: ${url.origin}/sitemap.xml
`;

  return new Response(content, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
    },
  });
};
