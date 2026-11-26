globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead, g as addAttribute, n as renderScript } from '../../../chunks/astro/server_BAIfklZH.mjs';
import { $ as $$AdminLayout } from '../../../chunks/AdminLayout_DJn6Cqw_.mjs';
import { g as getDb, t as teamMembers, a as asc, c as brands, s as services } from '../../../chunks/index_w6lK2Ajg.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro();
const $$Sitio = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Sitio;
  const d1 = Astro2.locals.runtime?.env?.DB;
  let team = [];
  let brandList = [];
  let serviceList = [];
  if (d1) {
    const db = getDb(d1);
    try {
      [team, brandList, serviceList] = await Promise.all([
        db.select().from(teamMembers).orderBy(asc(teamMembers.sortOrder)),
        db.select().from(brands).orderBy(asc(brands.sortOrder)),
        db.select().from(services).orderBy(asc(services.sortOrder))
      ]);
    } catch {
    }
  }
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Equipo & Sitio", "activeSection": "sitio" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-4xl space-y-12"> <!-- TEAM --> <section> <div class="flex flex-wrap items-center justify-between gap-4"> <h2 class="text-xl font-medium tracking-tight">Equipo</h2> <button id="add-team" type="button" class="rounded-full bg-ink px-4 py-2 text-xs font-medium text-canvas hover:bg-accent-blue">
+ Agregar
</button> </div> <div id="team-list" class="mt-4 space-y-3"> ${team.map((m) => renderTemplate`<div class="team-card rounded-xl border border-ink/10 bg-white px-5 py-4"${addAttribute(m.id, "data-id")}> <div class="grid gap-3 sm:grid-cols-4"> <input name="name"${addAttribute(m.name, "value")} placeholder="Nombre" class="rounded-lg border border-ink/15 bg-canvas px-3 py-2 text-sm"> <input name="role"${addAttribute(m.role, "value")} placeholder="Rol" class="rounded-lg border border-ink/15 bg-canvas px-3 py-2 text-sm"> <input name="photoUrl"${addAttribute(m.photoUrl, "value")} placeholder="URL foto" class="rounded-lg border border-ink/15 bg-canvas px-3 py-2 text-sm"> <div class="flex gap-2"> <input name="sortOrder" type="number"${addAttribute(m.sortOrder, "value")} class="w-16 rounded-lg border border-ink/15 bg-canvas px-2 py-2 text-sm"> <input name="rotationDeg" type="number"${addAttribute(m.rotationDeg, "value")} class="w-16 rounded-lg border border-ink/15 bg-canvas px-2 py-2 text-sm" title="Rotación°"> </div> </div> <textarea name="bioShort" rows="2" placeholder="Bio corta" class="mt-2 w-full rounded-lg border border-ink/15 bg-canvas px-3 py-2 text-sm">${m.bioShort}</textarea> <div class="mt-2 flex gap-2"> <button type="button" class="save-team rounded-full bg-ink/10 px-3 py-1.5 text-xs font-medium hover:bg-ink/20">Guardar</button> <button type="button" class="del-team rounded-full px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50">Eliminar</button> </div> </div>`)} </div> </section> <!-- BRANDS --> <section> <div class="flex flex-wrap items-center justify-between gap-4"> <h2 class="text-xl font-medium tracking-tight">Marcas</h2> <button id="add-brand" type="button" class="rounded-full bg-ink px-4 py-2 text-xs font-medium text-canvas hover:bg-accent-blue">
+ Agregar
</button> </div> <div id="brand-list" class="mt-4 space-y-3"> ${brandList.map((b) => renderTemplate`<div class="brand-card flex items-center gap-3 rounded-xl border border-ink/10 bg-white px-5 py-3"${addAttribute(b.id, "data-id")}> <input name="name"${addAttribute(b.name, "value")} placeholder="Nombre" class="flex-1 rounded-lg border border-ink/15 bg-canvas px-3 py-2 text-sm"> <input name="logoSvgOrUrl"${addAttribute(b.logoSvgOrUrl, "value")} placeholder="URL logo" class="flex-1 rounded-lg border border-ink/15 bg-canvas px-3 py-2 text-sm"> <input name="sortOrder" type="number"${addAttribute(b.sortOrder, "value")} class="w-16 rounded-lg border border-ink/15 bg-canvas px-2 py-2 text-sm"> <button type="button" class="save-brand rounded-full bg-ink/10 px-3 py-1.5 text-xs font-medium hover:bg-ink/20">Guardar</button> <button type="button" class="del-brand text-xs text-red-600 hover:underline">✕</button> </div>`)} </div> </section> <!-- SERVICES --> <section> <div class="flex flex-wrap items-center justify-between gap-4"> <h2 class="text-xl font-medium tracking-tight">Servicios</h2> <button id="add-service" type="button" class="rounded-full bg-ink px-4 py-2 text-xs font-medium text-canvas hover:bg-accent-blue">
+ Agregar
</button> </div> <div id="service-list" class="mt-4 space-y-3"> ${serviceList.map((s) => renderTemplate`<div class="service-card rounded-xl border border-ink/10 bg-white px-5 py-4"${addAttribute(s.id, "data-id")}> <div class="grid gap-3 sm:grid-cols-3"> <input name="title"${addAttribute(s.title, "value")} placeholder="Título" class="rounded-lg border border-ink/15 bg-canvas px-3 py-2 text-sm"> <input name="previewMediaUrl"${addAttribute(s.previewMediaUrl, "value")} placeholder="URL preview" class="rounded-lg border border-ink/15 bg-canvas px-3 py-2 text-sm"> <input name="sortOrder" type="number"${addAttribute(s.sortOrder, "value")} class="w-20 rounded-lg border border-ink/15 bg-canvas px-2 py-2 text-sm"> </div> <textarea name="description" rows="2" placeholder="Descripción" class="mt-2 w-full rounded-lg border border-ink/15 bg-canvas px-3 py-2 text-sm">${s.description}</textarea> <div class="mt-2 flex gap-2"> <button type="button" class="save-service rounded-full bg-ink/10 px-3 py-1.5 text-xs font-medium hover:bg-ink/20">Guardar</button> <button type="button" class="del-service rounded-full px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50">Eliminar</button> </div> </div>`)} </div> </section> </div> ${renderScript($$result2, "C:/Users/Alejandro/Documents/07. Antigravity/01.Imprudente/src/pages/admin/cms/sitio.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "C:/Users/Alejandro/Documents/07. Antigravity/01.Imprudente/src/pages/admin/cms/sitio.astro", void 0);

const $$file = "C:/Users/Alejandro/Documents/07. Antigravity/01.Imprudente/src/pages/admin/cms/sitio.astro";
const $$url = "/admin/cms/sitio";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Sitio,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
