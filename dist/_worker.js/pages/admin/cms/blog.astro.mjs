globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead, g as addAttribute } from '../../../chunks/astro/server_BAIfklZH.mjs';
import { $ as $$AdminLayout } from '../../../chunks/AdminLayout_DJn6Cqw_.mjs';
import { g as getDb, b as blogPosts, d as desc } from '../../../chunks/index_w6lK2Ajg.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const d1 = Astro2.locals.runtime?.env?.DB;
  let posts = [];
  if (d1) {
    const db = getDb(d1);
    try {
      posts = await db.select().from(blogPosts).orderBy(desc(blogPosts.updatedAt));
    } catch {
    }
  }
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Blog", "activeSection": "blog" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-4xl"> <div class="flex flex-wrap items-center justify-between gap-4"> <div> <h1 class="text-2xl font-medium tracking-tight">Blog</h1> <p class="mt-1 text-sm text-ink/60">${posts.length} artículo${posts.length !== 1 ? "s" : ""}</p> </div> <a href="/admin/cms/blog/new" class="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-canvas transition-colors hover:bg-accent-blue">
+ Nuevo artículo
</a> </div> ${posts.length === 0 ? renderTemplate`<div class="mt-12 text-center text-sm text-ink/50"> <p>Sin artículos aún. Crea el primero.</p> </div>` : renderTemplate`<div class="mt-6 space-y-3"> ${posts.map((post) => renderTemplate`<a${addAttribute(`/admin/cms/blog/${post.id}`, "href")} class="flex items-center gap-4 rounded-xl border border-ink/10 bg-white px-5 py-4 transition-shadow hover:shadow-md"> <div class="flex-1 min-w-0"> <div class="flex items-center gap-2"> <p class="truncate font-medium">${post.title}</p> <span${addAttribute([
    "shrink-0 rounded px-1.5 py-0.5 text-xs font-medium",
    post.status === "published" ? "bg-accent-green/15 text-green-700" : "bg-ink/8 text-ink/50"
  ], "class:list")}> ${post.status === "published" ? "Publicado" : "Borrador"} </span> </div> <p class="mt-0.5 line-clamp-1 text-sm text-ink/60">${post.excerpt}</p> </div> <span class="shrink-0 text-xs text-ink/40"> ${new Date(post.updatedAt).toLocaleDateString("es-MX", { day: "numeric", month: "short" })} </span> </a>`)} </div>`} </div> ` })}`;
}, "C:/Users/Alejandro/Documents/07. Antigravity/01.Imprudente/src/pages/admin/cms/blog/index.astro", void 0);

const $$file = "C:/Users/Alejandro/Documents/07. Antigravity/01.Imprudente/src/pages/admin/cms/blog/index.astro";
const $$url = "/admin/cms/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
