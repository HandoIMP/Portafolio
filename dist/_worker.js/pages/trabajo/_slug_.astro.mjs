globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead, g as addAttribute, n as renderScript } from '../../chunks/astro/server_BAIfklZH.mjs';
import { c as getProjectBySlug, d as getOtherProjects, $ as $$BaseLayout } from '../../chunks/queries_CReIpipd.mjs';
import { g as getDb } from '../../chunks/index_w6lK2Ajg.mjs';
import { S as SITE_DEFAULTS } from '../../chunks/site-config_BkcCjyBd.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const d1 = Astro2.locals.runtime?.env?.DB;
  const db = d1 ? getDb(d1) : null;
  const project = slug ? await getProjectBySlug(db, slug) : null;
  if (!project) {
    Astro2.response.status = 404;
  }
  const otherProjects = project ? await getOtherProjects(db, project.slug, 2) : [];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": project ? `${project.title} \u2014 ${SITE_DEFAULTS.brandName}` : `Proyecto no encontrado \u2014 ${SITE_DEFAULTS.brandName}`, "description": project ? project.summary : SITE_DEFAULTS.description, "ogImage": project?.coverMediaUrl, "activeNav": "trabajo" }, { "default": async ($$result2) => renderTemplate`${!project ? renderTemplate`${maybeRenderHead()}<main class="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6"> <span class="rounded-full border border-ink/15 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wider text-ink/60">
404
</span> <h1 class="mt-4 text-4xl font-medium tracking-tight">Proyecto no encontrado</h1> <p class="mt-3 text-base text-ink/70">
El caso de estudio que buscas no existe o aún no ha sido publicado.
</p> <a href="/#trabajo" class="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-canvas hover:bg-accent-blue transition-colors">
← Volver a trabajos
</a> </main>` : renderTemplate`<main class="mx-auto max-w-7xl px-4 pt-6 pb-16 sm:px-6"> <div class="mb-6"> <a href="/#trabajo" class="inline-flex items-center gap-1.5 text-sm font-medium text-ink/65 hover:text-ink transition-colors"> <span aria-hidden="true">←</span> <span>Volver a trabajos</span> </a> </div> <div class="grid gap-10 lg:grid-cols-12"> <!-- Columna editorial fija --> <aside class="lg:col-span-4"> <div class="rounded-3xl border border-ink/12 bg-white p-6 lg:sticky lg:top-28"> <div class="flex flex-wrap gap-1.5"> ${project.disciplines.map((disc) => renderTemplate`<span class="rounded-full border border-ink/12 bg-canvas px-2.5 py-0.5 text-xs font-medium text-ink/80"> ${disc} </span>`)} </div> <h1 class="mt-4 text-3xl font-medium tracking-tight text-ink sm:text-4xl"> ${project.title} </h1> <p class="mt-3 text-sm leading-relaxed text-ink/75 sm:text-base"> ${project.summary} </p> <dl class="mt-6 divide-y divide-ink/10 border-t border-ink/10 text-sm"> ${project.client && renderTemplate`<div class="flex justify-between gap-4 py-3"> <dt class="text-ink/50">Cliente</dt> <dd class="text-right font-medium text-ink">${project.client}</dd> </div>`} ${project.services && renderTemplate`<div class="flex justify-between gap-4 py-3"> <dt class="text-ink/50">Servicios</dt> <dd class="text-right font-medium text-ink">${project.services}</dd> </div>`} ${project.agency && renderTemplate`<div class="flex justify-between gap-4 py-3"> <dt class="text-ink/50">Estudio</dt> <dd class="text-right font-medium text-ink">${project.agency}</dd> </div>`} ${project.year && renderTemplate`<div class="flex justify-between gap-4 py-3"> <dt class="text-ink/50">Año</dt> <dd class="text-right font-medium text-ink">${project.year}</dd> </div>`} </dl> ${project.credits && renderTemplate`<p class="mt-4 text-xs text-ink/55">${project.credits}</p>`} <a${addAttribute(`/contacto?servicio=${encodeURIComponent(project.services || "")}`, "href")} class="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent-blue px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-orange"> <span>Cotizar un proyecto similar</span> <span aria-hidden="true">→</span> </a> </div> </aside> <!-- Galería y bloques del caso de estudio --> <section class="space-y-6 lg:col-span-8" aria-label="Desarrollo del caso de estudio"> <figure class="overflow-hidden rounded-3xl border border-ink/12 bg-white"> ${project.coverType === "video" ? renderTemplate`<video${addAttribute(project.coverMediaUrl, "src")} autoplay loop muted playsinline class="w-full object-cover"></video>` : renderTemplate`<img${addAttribute(project.coverMediaUrl, "src")}${addAttribute(`${project.title} \u2014 portada`, "alt")} class="w-full cursor-zoom-in object-cover"${addAttribute(project.coverMediaUrl, "data-lightbox-src")}>`} </figure> ${project.contentBlocks.map((block, idx) => {
    if (block.type === "text") {
      return renderTemplate`<div class="rounded-3xl border border-ink/12 bg-white p-6 sm:p-8"> ${block.heading && renderTemplate`<h2 class="text-2xl font-medium tracking-tight text-ink"> ${block.heading} </h2>`} ${block.body && renderTemplate`<p class="mt-3 text-base leading-relaxed text-ink/75">${block.body}</p>`} </div>`;
    }
    if (block.type === "video" && block.url) {
      return renderTemplate`<figure class="overflow-hidden rounded-3xl border border-ink/12 bg-white"> <video${addAttribute(block.url, "src")} autoplay loop muted playsinline class="w-full object-cover"></video> ${block.caption && renderTemplate`<figcaption class="border-t border-ink/10 px-5 py-3 text-xs text-ink/60"> ${block.caption} </figcaption>`} </figure>`;
    }
    if (block.type === "image" && block.url) {
      return renderTemplate`<figure class="overflow-hidden rounded-3xl border border-ink/12 bg-white"> <img${addAttribute(block.url, "src")}${addAttribute(block.caption || `${project.title} \u2014 pieza ${idx + 1}`, "alt")} loading="lazy" class="w-full cursor-zoom-in object-cover"${addAttribute(block.url, "data-lightbox-src")}> ${block.caption && renderTemplate`<figcaption class="border-t border-ink/10 px-5 py-3 text-xs text-ink/60"> ${block.caption} </figcaption>`} </figure>`;
    }
    return null;
  })} </section> </div> ${otherProjects.length > 0 && renderTemplate`<section class="mt-20 border-t border-ink/10 pt-12"> <div class="flex items-center justify-between gap-4"> <h2 class="text-2xl font-medium tracking-tight sm:text-3xl">
Otros <span class="font-serif italic font-normal text-accent-blue">proyectos</span> </h2> <a href="/#trabajo" class="text-sm font-medium text-ink/70 hover:text-ink">
Ver todos →
</a> </div> <div class="mt-6 grid gap-6 md:grid-cols-2"> ${otherProjects.map((item) => renderTemplate`<a${addAttribute(`/trabajo/${item.slug}`, "href")} class="group flex flex-col overflow-hidden rounded-3xl border border-ink/12 bg-white transition-colors hover:border-ink/35"> ${item.coverType === "video" ? renderTemplate`<video${addAttribute(item.coverMediaUrl, "src")} autoplay loop muted playsinline class="aspect-[16/10] w-full object-cover"></video>` : renderTemplate`<img${addAttribute(item.coverMediaUrl, "src")}${addAttribute(item.title, "alt")} loading="lazy" class="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]">`} <div class="flex items-center justify-between p-5"> <div> <h3 class="text-lg font-medium text-ink group-hover:text-accent-blue transition-colors"> ${item.title} </h3> <p class="text-xs text-ink/60">${item.client}</p> </div> <span class="text-xs font-medium text-ink/50">${item.year}</span> </div> </a>`)} </div> </section>`} </main>`} <dialog id="case-lightbox" class="m-auto max-h-[92vh] max-w-[92vw] rounded-2xl border border-ink/15 bg-transparent p-0 backdrop:bg-ink/85"> <div class="relative flex items-center justify-center"> <button id="lightbox-close" type="button" aria-label="Cerrar imagen" class="absolute top-3 right-3 rounded-full bg-ink/80 px-3 py-1.5 text-sm font-medium text-canvas hover:bg-accent-orange">
✕
</button> <img id="lightbox-img" src="" alt="" class="max-h-[88vh] w-auto rounded-2xl object-contain"> </div> </dialog> ${renderScript($$result2, "C:/Users/Alejandro/Documents/07. Antigravity/01.Imprudente/src/pages/trabajo/[slug].astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "C:/Users/Alejandro/Documents/07. Antigravity/01.Imprudente/src/pages/trabajo/[slug].astro", void 0);

const $$file = "C:/Users/Alejandro/Documents/07. Antigravity/01.Imprudente/src/pages/trabajo/[slug].astro";
const $$url = "/trabajo/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
