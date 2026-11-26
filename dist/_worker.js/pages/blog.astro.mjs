globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead, g as addAttribute } from '../chunks/astro/server_BAIfklZH.mjs';
import { a as getPublishedBlogPosts, $ as $$BaseLayout } from '../chunks/queries_CReIpipd.mjs';
import { g as getDb } from '../chunks/index_w6lK2Ajg.mjs';
import { e as estimateReadingMinutes } from '../chunks/markdown_WHYBFG0f.mjs';
import { S as SITE_DEFAULTS } from '../chunks/site-config_BkcCjyBd.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const d1 = Astro2.locals.runtime?.env?.DB;
  const db = d1 ? getDb(d1) : null;
  const posts = await getPublishedBlogPosts(db);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `Blog Editorial \u2014 ${SITE_DEFAULTS.brandName}`, "description": "Notas y art\xEDculos sobre dise\xF1o de logotipo, producci\xF3n visual, fotograf\xEDa, branding y p\xE1ginas web por Imprudente Dept. Creativo." }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="mx-auto max-w-5xl px-4 pt-8 pb-16 sm:px-6"> <div class="border-b border-ink/10 pb-8"> <span class="inline-block rounded-full bg-accent-green px-3 py-1 text-xs font-medium uppercase tracking-wider text-ink">
Blog SEO · Archivo Editorial
</span> <h1 class="mt-4 text-4xl font-medium tracking-tight sm:text-6xl">
Ideas sobre marca, <span class="font-serif italic font-normal text-accent-blue">proceso</span> y criterio visual.
</h1> <p class="mt-4 max-w-2xl text-base text-ink/70">
Reflexiones, guías y casos detrás de escena sobre diseño gráfico interdisciplinario, fotografía y web.
</p> </div> ${posts.length === 0 ? renderTemplate`<div class="mt-12 rounded-3xl border border-dashed border-ink/20 bg-white p-12 text-center"> <h2 class="text-xl font-medium text-ink">Aún no hay artículos publicados</h2> <p class="mt-2 text-sm text-ink/65">
Pronto compartiremos notas editoriales desde el CMS de ${SITE_DEFAULTS.brandName}.
</p> <a href="/#trabajo" class="mt-6 inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink hover:border-ink">
Explorar portafolio →
</a> </div>` : renderTemplate`<div class="mt-10 grid gap-8 md:grid-cols-2"> ${posts.map((post) => {
    const readMins = estimateReadingMinutes(post.contentMarkdown);
    const dateLabel = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("es-MX", {
      year: "numeric",
      month: "short",
      day: "numeric"
    }) : "";
    return renderTemplate`<article class="group flex flex-col overflow-hidden rounded-3xl border border-ink/12 bg-white transition-colors hover:border-ink/35"> ${post.coverUrl && renderTemplate`<a${addAttribute(`/blog/${post.slug}`, "href")} class="block overflow-hidden border-b border-ink/10 bg-canvas"> <img${addAttribute(post.coverUrl, "src")}${addAttribute(post.title, "alt")} loading="lazy" class="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"> </a>`} <div class="flex flex-1 flex-col justify-between p-6"> <div> <div class="flex items-center gap-3 text-xs text-ink/55"> ${dateLabel && renderTemplate`<span>${dateLabel}</span>`} <span>·</span> <span>${readMins} min de lectura</span> </div> <h2 class="mt-3 text-2xl font-medium tracking-tight text-ink"> <a${addAttribute(`/blog/${post.slug}`, "href")} class="hover:text-accent-blue transition-colors"> ${post.title} </a> </h2> <p class="mt-2 text-sm leading-relaxed text-ink/70">${post.excerpt}</p> </div> <div class="mt-6 border-t border-ink/8 pt-4"> <a${addAttribute(`/blog/${post.slug}`, "href")} class="inline-flex items-center gap-1.5 text-sm font-medium text-ink group-hover:text-accent-blue"> <span>Leer artículo</span> <span aria-hidden="true">→</span> </a> </div> </div> </article>`;
  })} </div>`} </main> ` })}`;
}, "C:/Users/Alejandro/Documents/07. Antigravity/01.Imprudente/src/pages/blog/index.astro", void 0);

const $$file = "C:/Users/Alejandro/Documents/07. Antigravity/01.Imprudente/src/pages/blog/index.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
