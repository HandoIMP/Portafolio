globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead, g as addAttribute } from '../chunks/astro/server_BAIfklZH.mjs';
import { $ as $$AdminLayout } from '../chunks/AdminLayout_DJn6Cqw_.mjs';
import { g as getDb, h as sql, f as crmLeads, e as eq, p as projects, b as blogPosts } from '../chunks/index_w6lK2Ajg.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const d1 = Astro2.locals.runtime?.env?.DB;
  let leadCount = 0;
  let newLeadCount = 0;
  let projectCount = 0;
  let blogDraftCount = 0;
  let blogPublishedCount = 0;
  if (d1) {
    const db = getDb(d1);
    try {
      const [leads, newLeads, projs, drafts, published] = await Promise.all([
        db.select({ c: sql`count(*)` }).from(crmLeads),
        db.select({ c: sql`count(*)` }).from(crmLeads).where(eq(crmLeads.status, "Nuevo")),
        db.select({ c: sql`count(*)` }).from(projects),
        db.select({ c: sql`count(*)` }).from(blogPosts).where(eq(blogPosts.status, "draft")),
        db.select({ c: sql`count(*)` }).from(blogPosts).where(eq(blogPosts.status, "published"))
      ]);
      leadCount = leads[0]?.c ?? 0;
      newLeadCount = newLeads[0]?.c ?? 0;
      projectCount = projs[0]?.c ?? 0;
      blogDraftCount = drafts[0]?.c ?? 0;
      blogPublishedCount = published[0]?.c ?? 0;
    } catch {
    }
  }
  const cards = [
    { label: "Leads nuevos", value: newLeadCount, total: leadCount, href: "/admin/crm", color: "bg-accent-orange" },
    { label: "Proyectos", value: projectCount, total: null, href: "/admin/cms/proyectos", color: "bg-accent-blue" },
    { label: "Blog publicados", value: blogPublishedCount, total: blogDraftCount + blogPublishedCount, href: "/admin/cms/blog", color: "bg-accent-green" }
  ];
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Dashboard", "activeSection": "dashboard" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-4xl"> <h1 class="text-2xl font-medium tracking-tight">Dashboard</h1> <p class="mt-1 text-sm text-ink/60">Resumen general del sitio.</p> <div class="mt-8 grid gap-4 sm:grid-cols-3"> ${cards.map((card) => renderTemplate`<a${addAttribute(card.href, "href")} class="group rounded-2xl border border-ink/10 bg-white p-5 transition-shadow hover:shadow-md"> <div class="flex items-center gap-3"> <div${addAttribute(["h-2.5 w-2.5 rounded-full", card.color], "class:list")}></div> <span class="text-xs font-medium uppercase tracking-wider text-ink/60">${card.label}</span> </div> <p class="mt-3 text-3xl font-medium tracking-tight">${card.value}</p> ${card.total !== null && renderTemplate`<p class="mt-1 text-xs text-ink/50">de ${card.total} total</p>`} </a>`)} </div> <div class="mt-10 grid gap-4 sm:grid-cols-2"> <a href="/admin/crm" class="rounded-xl border border-ink/10 bg-white px-5 py-4 text-sm transition-shadow hover:shadow-md"> <span class="font-medium">CRM / Leads</span> <p class="mt-1 text-ink/60">Gestiona los mensajes de contacto y seguimiento de clientes.</p> </a> <a href="/admin/cms/proyectos" class="rounded-xl border border-ink/10 bg-white px-5 py-4 text-sm transition-shadow hover:shadow-md"> <span class="font-medium">Proyectos</span> <p class="mt-1 text-ink/60">Agrega, edita y ordena los casos de estudio del portafolio.</p> </a> <a href="/admin/cms/blog" class="rounded-xl border border-ink/10 bg-white px-5 py-4 text-sm transition-shadow hover:shadow-md"> <span class="font-medium">Blog</span> <p class="mt-1 text-ink/60">Escribe artículos para el blog con SEO optimizado.</p> </a> <a href="/admin/cms/sitio" class="rounded-xl border border-ink/10 bg-white px-5 py-4 text-sm transition-shadow hover:shadow-md"> <span class="font-medium">Equipo & Sitio</span> <p class="mt-1 text-ink/60">Administra equipo, marcas y servicios mostrados en el home.</p> </a> </div> </div> ` })}`;
}, "C:/Users/Alejandro/Documents/07. Antigravity/01.Imprudente/src/pages/admin/index.astro", void 0);

const $$file = "C:/Users/Alejandro/Documents/07. Antigravity/01.Imprudente/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
