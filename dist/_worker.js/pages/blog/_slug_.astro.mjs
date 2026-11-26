globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead, g as addAttribute, u as unescapeHTML } from '../../chunks/astro/server_BAIfklZH.mjs';
import { g as getBlogPostBySlug, $ as $$BaseLayout } from '../../chunks/queries_CReIpipd.mjs';
import { g as getDb } from '../../chunks/index_w6lK2Ajg.mjs';
import { r as renderMarkdown, e as estimateReadingMinutes } from '../../chunks/markdown_WHYBFG0f.mjs';
import { S as SITE_DEFAULTS } from '../../chunks/site-config_BkcCjyBd.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const d1 = Astro2.locals.runtime?.env?.DB;
  const db = d1 ? getDb(d1) : null;
  const post = slug ? await getBlogPostBySlug(db, slug) : null;
  if (!post) {
    Astro2.response.status = 404;
  }
  const canonicalUrl = new URL(Astro2.url.pathname, Astro2.url.origin).toString();
  const articleHtml = post ? renderMarkdown(post.contentMarkdown) : "";
  const readingMins = post ? estimateReadingMinutes(post.contentMarkdown) : 1;
  const jsonLd = post ? {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    image: post.coverUrl ? [
      post.coverUrl.startsWith("http") ? post.coverUrl : new URL(post.coverUrl, Astro2.url.origin).toString()
    ] : void 0,
    datePublished: post.publishedAt || post.updatedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Organization",
      name: SITE_DEFAULTS.fullTitle
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl
    }
  } : null;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": post ? `${post.seoTitle || post.title} \u2014 ${SITE_DEFAULTS.brandName}` : `Art\xEDculo no encontrado \u2014 ${SITE_DEFAULTS.brandName}`, "description": post ? post.seoDescription || post.excerpt : SITE_DEFAULTS.description, "ogImage": post?.coverUrl || void 0, "ogType": post ? "article" : "website", "jsonLd": jsonLd }, { "default": async ($$result2) => renderTemplate`${!post ? renderTemplate`${maybeRenderHead()}<main class="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6"> <span class="rounded-full border border-ink/15 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wider text-ink/60">
404
</span> <h1 class="mt-4 text-4xl font-medium tracking-tight">Artículo no encontrado</h1> <p class="mt-3 text-base text-ink/70">
El artículo solicitado no existe o aún se encuentra en borrador.
</p> <a href="/blog" class="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-canvas hover:bg-accent-blue">
← Volver al blog
</a> </main>` : renderTemplate`<article class="mx-auto max-w-3xl px-4 pt-8 pb-16 sm:px-6"> <div class="mb-6"> <a href="/blog" class="text-sm font-medium text-ink/60 hover:text-ink">
← Todos los artículos
</a> </div> <header class="border-b border-ink/10 pb-8"> <div class="flex flex-wrap items-center gap-3 text-xs text-ink/60"> ${post.publishedAt && renderTemplate`<time${addAttribute(post.publishedAt, "datetime")}> ${new Date(post.publishedAt).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })} </time>`} <span>·</span> <span>${readingMins} min de lectura</span> </div> <h1 class="mt-4 text-3xl font-medium leading-[1.1] tracking-tight text-ink sm:text-5xl"> ${post.title} </h1> <p class="mt-4 text-lg leading-relaxed text-ink/75">${post.excerpt}</p> </header> ${post.coverUrl && renderTemplate`<figure class="my-8 overflow-hidden rounded-3xl border border-ink/12 bg-white"> <img${addAttribute(post.coverUrl, "src")}${addAttribute(post.title, "alt")} class="w-full object-cover"> </figure>`} <div class="mt-8 text-base sm:text-lg">${unescapeHTML(articleHtml)}</div> </article>`}` })}`;
}, "C:/Users/Alejandro/Documents/07. Antigravity/01.Imprudente/src/pages/blog/[slug].astro", void 0);

const $$file = "C:/Users/Alejandro/Documents/07. Antigravity/01.Imprudente/src/pages/blog/[slug].astro";
const $$url = "/blog/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
