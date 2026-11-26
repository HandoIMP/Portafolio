globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead, g as addAttribute } from '../../chunks/astro/server_BAIfklZH.mjs';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_DJn6Cqw_.mjs';
import { g as getDb, f as crmLeads, e as eq, d as desc } from '../../chunks/index_w6lK2Ajg.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const d1 = Astro2.locals.runtime?.env?.DB;
  const statusFilter = Astro2.url.searchParams.get("status") || "";
  const statuses = ["Nuevo", "Contactado", "En Propuesta", "Cerrado", "Descartado"];
  let leads = [];
  if (d1) {
    const db = getDb(d1);
    try {
      if (statusFilter && statuses.includes(statusFilter)) {
        leads = await db.select().from(crmLeads).where(eq(crmLeads.status, statusFilter)).orderBy(desc(crmLeads.createdAt));
      } else {
        leads = await db.select().from(crmLeads).orderBy(desc(crmLeads.createdAt));
      }
    } catch {
    }
  }
  const statusColors = {
    Nuevo: "bg-accent-orange/15 text-accent-orange",
    Contactado: "bg-accent-blue/15 text-accent-blue",
    "En Propuesta": "bg-yellow-100 text-yellow-700",
    Cerrado: "bg-accent-green/15 text-green-700",
    Descartado: "bg-ink/8 text-ink/50"
  };
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "CRM / Leads", "activeSection": "crm" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-5xl"> <div class="flex flex-wrap items-center justify-between gap-4"> <div> <h1 class="text-2xl font-medium tracking-tight">Leads</h1> <p class="mt-1 text-sm text-ink/60">${leads.length} contacto${leads.length !== 1 ? "s" : ""}</p> </div> </div> <!-- Status filter tabs --> <div class="mt-6 flex flex-wrap gap-2"> <a href="/admin/crm"${addAttribute([
    "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
    !statusFilter ? "bg-ink text-canvas" : "bg-ink/5 text-ink/70 hover:bg-ink/10"
  ], "class:list")}>
Todos
</a> ${statuses.map((s) => renderTemplate`<a${addAttribute(`/admin/crm?status=${encodeURIComponent(s)}`, "href")}${addAttribute([
    "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
    statusFilter === s ? "bg-ink text-canvas" : "bg-ink/5 text-ink/70 hover:bg-ink/10"
  ], "class:list")}> ${s} </a>`)} </div> <!-- Lead list --> ${leads.length === 0 ? renderTemplate`<div class="mt-12 text-center text-sm text-ink/50"> <p>Sin leads ${statusFilter ? `con estado "${statusFilter}"` : "a\xFAn"}.</p> </div>` : renderTemplate`<div class="mt-6 space-y-3"> ${leads.map((lead) => renderTemplate`<a${addAttribute(`/admin/crm/${lead.id}`, "href")} class="block rounded-xl border border-ink/10 bg-white px-5 py-4 transition-shadow hover:shadow-md"> <div class="flex flex-wrap items-start justify-between gap-2"> <div> <p class="font-medium">${lead.name}</p> <p class="mt-0.5 text-sm text-ink/60">${lead.email}${lead.phone ? ` \xB7 ${lead.phone}` : ""}</p> </div> <span${addAttribute(["rounded-full px-2.5 py-1 text-xs font-medium", statusColors[lead.status] || "bg-ink/8 text-ink/50"], "class:list")}> ${lead.status} </span> </div> ${lead.serviceInterest && renderTemplate`<p class="mt-2 text-xs text-ink/50">Servicio: ${lead.serviceInterest}</p>`} <p class="mt-1 line-clamp-2 text-sm text-ink/70">${lead.message}</p> <p class="mt-2 text-xs text-ink/40">${new Date(lead.createdAt).toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" })}</p> </a>`)} </div>`} </div> ` })}`;
}, "C:/Users/Alejandro/Documents/07. Antigravity/01.Imprudente/src/pages/admin/crm/index.astro", void 0);

const $$file = "C:/Users/Alejandro/Documents/07. Antigravity/01.Imprudente/src/pages/admin/crm/index.astro";
const $$url = "/admin/crm";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
