globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead, g as addAttribute } from '../../../chunks/astro/server_BAIfklZH.mjs';
import { $ as $$AdminLayout } from '../../../chunks/AdminLayout_DJn6Cqw_.mjs';
import { g as getDb, p as projects, a as asc, d as desc } from '../../../chunks/index_w6lK2Ajg.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const d1 = Astro2.locals.runtime?.env?.DB;
  let allProjects = [];
  if (d1) {
    const db = getDb(d1);
    try {
      allProjects = await db.select().from(projects).orderBy(asc(projects.sortOrder), desc(projects.id));
    } catch {
    }
  }
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Proyectos", "activeSection": "proyectos" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-4xl"> <div class="flex flex-wrap items-center justify-between gap-4"> <div> <h1 class="text-2xl font-medium tracking-tight">Proyectos</h1> <p class="mt-1 text-sm text-ink/60">${allProjects.length} proyecto${allProjects.length !== 1 ? "s" : ""}</p> </div> <a href="/admin/cms/proyectos/new" class="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-canvas transition-colors hover:bg-accent-blue">
+ Nuevo proyecto
</a> </div> ${allProjects.length === 0 ? renderTemplate`<div class="mt-12 text-center text-sm text-ink/50"> <p>Sin proyectos aún.</p> </div>` : renderTemplate`<div class="mt-6 space-y-3"> ${allProjects.map((p) => renderTemplate`<a${addAttribute(`/admin/cms/proyectos/${p.id}`, "href")} class="flex items-center gap-4 rounded-xl border border-ink/10 bg-white px-5 py-4 transition-shadow hover:shadow-md"> <div class="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-ink/5"> ${p.coverMediaUrl && renderTemplate`<img${addAttribute(p.coverMediaUrl, "src")} alt="" class="h-full w-full object-cover" loading="lazy">`} </div> <div class="flex-1 min-w-0"> <div class="flex items-center gap-2"> <p class="truncate font-medium">${p.title}</p> ${!p.published && renderTemplate`<span class="shrink-0 rounded bg-ink/8 px-1.5 py-0.5 text-xs text-ink/50">Borrador</span>`} ${p.featured && renderTemplate`<span class="shrink-0 rounded bg-accent-green/15 px-1.5 py-0.5 text-xs text-green-700">Destacado</span>`} </div> <p class="mt-0.5 text-sm text-ink/60">${p.client} · ${p.year}</p> </div> <span class="text-xs text-ink/40">#${p.sortOrder}</span> </a>`)} </div>`} </div> ` })}`;
}, "C:/Users/Alejandro/Documents/07. Antigravity/01.Imprudente/src/pages/admin/cms/proyectos/index.astro", void 0);

const $$file = "C:/Users/Alejandro/Documents/07. Antigravity/01.Imprudente/src/pages/admin/cms/proyectos/index.astro";
const $$url = "/admin/cms/proyectos";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
