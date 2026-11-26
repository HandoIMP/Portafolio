globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead, g as addAttribute, n as renderScript } from '../chunks/astro/server_BAIfklZH.mjs';
import { b as getHomeData, $ as $$BaseLayout } from '../chunks/queries_CReIpipd.mjs';
import { g as getDb } from '../chunks/index_w6lK2Ajg.mjs';
import { S as SITE_DEFAULTS } from '../chunks/site-config_BkcCjyBd.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const d1 = Astro2.locals.runtime?.env?.DB;
  const db = d1 ? getDb(d1) : null;
  const { projects, team, brands, services, settings } = await getHomeData(db);
  const heroTitlePrefix = settings.hero_title_prefix || SITE_DEFAULTS.heroTitlePrefix;
  const heroTitleAccent = settings.hero_title_accent || SITE_DEFAULTS.heroTitleAccent;
  const heroSubtitle = settings.hero_subtitle || SITE_DEFAULTS.heroSubtitle;
  const heroVideoUrl = settings.hero_video_url || "";
  const showcaseCollage = [
    { src: "/assets-general/Mckp-Pelican.webp", label: "Identidad & Producto", badge: "bg-accent-blue text-white" },
    { src: "/assets-general/DigiCam.webp", label: "Fotograf\xEDa & Proceso", badge: "bg-accent-green text-ink" },
    { src: "/assets-general/Mckp-Puma.webp", label: "Direcci\xF3n de Arte", badge: "bg-accent-orange text-white" },
    { src: "/assets-general/llavero-imprudente.webp", label: "Objetos de Marca", badge: "bg-ink text-canvas" }
  ];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main> <!-- 1. HERO SECTION --> <section class="mx-auto max-w-7xl px-4 pt-8 pb-14 sm:px-6 sm:pt-12 sm:pb-20"> <div class="flex flex-wrap items-center justify-between gap-3"> <div class="inline-flex items-center gap-2 rounded-full border border-ink/12 bg-white px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider text-ink"> <span class="h-2 w-2 rounded-full bg-accent-orange"></span> <span>${SITE_DEFAULTS.tagline}</span> </div> <p class="text-xs font-medium uppercase tracking-wider text-ink/55"> ${SITE_DEFAULTS.location} </p> </div> <div class="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end"> <div class="lg:col-span-8"> <h1 class="text-[clamp(2.75rem,7vw,5.75rem)] font-medium leading-[0.98] tracking-tight text-ink"> ${heroTitlePrefix}${" "} <span class="font-serif italic font-normal text-accent-blue">${heroTitleAccent}</span> </h1> </div> <div class="lg:col-span-4 lg:pb-2"> <p class="text-lg font-normal text-ink/75 sm:text-xl">${heroSubtitle}</p> <div class="mt-5 flex flex-wrap items-center gap-3"> <a href="#trabajo" class="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-canvas transition-colors hover:bg-accent-blue"> <span>Ver proyectos</span> <span aria-hidden="true">↓</span> </a> <a href="/contacto" class="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink"> <span>Cotizar proyecto</span> </a> </div> </div> </div> <!-- Pieza central protagonista --> <div class="mt-10 rounded-3xl border border-ink/12 bg-white p-4 sm:p-6"> ${heroVideoUrl ? renderTemplate`<div class="overflow-hidden rounded-2xl border border-ink/10 bg-ink"> <video${addAttribute(heroVideoUrl, "src")} autoplay loop muted playsinline class="aspect-[16/9] w-full object-cover"></video> </div>` : renderTemplate`<div class="grid gap-4 md:grid-cols-12"> <div class="group relative overflow-hidden rounded-2xl border border-ink/10 bg-canvas md:col-span-7"> <img src="/assets-general/5x7-win-in-silence.webp" alt="Pieza editorial Imprudente Dept. Creativo" class="h-full min-h-[260px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] sm:max-h-[460px]" loading="eager" fetchpriority="high" decoding="async"> <div class="absolute inset-x-4 bottom-4 flex items-center justify-between gap-2 rounded-2xl border border-ink/12 bg-canvas/90 px-4 py-2.5 backdrop-blur-md"> <span class="text-xs font-medium text-ink sm:text-sm">
Identidad, producción visual, fotografía y web
</span> <span class="rounded-full bg-accent-green px-2.5 py-0.5 text-[11px] font-medium text-ink">
2026
</span> </div> </div> <div class="grid grid-cols-2 gap-4 md:col-span-5"> ${showcaseCollage.map((item) => renderTemplate`<div class="group relative overflow-hidden rounded-2xl border border-ink/10 bg-canvas"> <img${addAttribute(item.src, "src")}${addAttribute(item.label, "alt")} class="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="eager"> <span${addAttribute([
    "absolute left-2.5 bottom-2.5 rounded-full px-2.5 py-1 text-[11px] font-medium",
    item.badge
  ], "class:list")}> ${item.label} </span> </div>`)} </div> </div>`} </div> </section> <!-- 2. BANDA DE MARCAS (Marquee CSS puro) --> <section aria-label="Marcas y colaboraciones" class="border-y border-ink/10 bg-white/60 py-6"> <div class="marquee-wrap marquee-mask overflow-hidden"> <div class="marquee-track items-center gap-8 sm:gap-12"> ${[...brands, ...brands].map((brand, idx) => renderTemplate`<div class="flex shrink-0 items-center gap-8 sm:gap-12"> ${brand.logoSvgOrUrl ? renderTemplate`<img${addAttribute(brand.logoSvgOrUrl, "src")}${addAttribute(brand.name, "alt")} class="h-7 w-auto object-contain opacity-80 transition-opacity hover:opacity-100" loading="lazy">` : renderTemplate`<span class="text-base font-medium tracking-tight text-ink/75 sm:text-lg"> ${brand.name} </span>`} <span aria-hidden="true"${addAttribute([
    "h-1.5 w-1.5 rounded-full",
    idx % 3 === 0 ? "bg-accent-blue" : idx % 3 === 1 ? "bg-accent-orange" : "bg-ink/30"
  ], "class:list")}></span> </div>`)} </div> </div> </section> <!-- 3. EQUIPO / QUIÉNES SOMOS (Tarjetas Polaroid) --> <section id="equipo" data-reveal class="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 lg:py-24"> <div class="grid gap-10 lg:grid-cols-12 lg:items-center"> <div class="lg:col-span-5"> <span class="inline-block rounded-full border border-ink/15 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wider text-ink/70">
Quiénes somos
</span> <h2 class="mt-4 text-3xl font-medium leading-[1.08] tracking-tight sm:text-5xl">
Detrás de cada marca hay un${" "} <span class="font-serif italic font-normal text-accent-orange">proceso vivo</span>.
</h2> <p class="mt-4 text-base leading-relaxed text-ink/75">
En <strong>${SITE_DEFAULTS.brandName}</strong> creemos en el criterio visual honesto:
            escuchamos la esencia de tu negocio, experimentamos con materiales e ideas y
            construimos piezas que funcionan en el mundo real.
</p> <div class="mt-6 flex items-center gap-3"> <img src="/assets-general/color-pallets.webp" alt="Paleta de trabajo Imprudente" class="h-12 w-12 rounded-xl border border-ink/12 object-cover" loading="lazy"> <div class="text-xs text-ink/65"> <p class="font-medium text-ink">Guaymas & San Carlos, Sonora</p> <p>Trabajando con marcas locales e internacionales</p> </div> </div> </div> <div class="grid gap-8 sm:grid-cols-2 lg:col-span-7"> ${team.map((member, index) => {
    const rotation = member.rotationDeg || (index % 2 === 0 ? -2 : 2);
    return renderTemplate`<article class="group rounded-2xl border border-ink/12 bg-white p-3.5 pb-5 shadow-sm transition-transform duration-300 hover:rotate-0 hover:-translate-y-1.5"${addAttribute(`transform: rotate(${rotation}deg);`, "style")}> <div class="overflow-hidden rounded-xl border border-ink/10 bg-canvas"> <img${addAttribute(member.photoUrl, "src")}${addAttribute(member.name, "alt")} class="aspect-[4/4.2] w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy"> </div> <div class="mt-4 px-1"> <div class="flex items-center justify-between gap-2"> <h3 class="text-lg font-medium tracking-tight text-ink">${member.name}</h3> <span class="rounded-full bg-canvas px-2.5 py-0.5 text-[11px] font-medium text-ink/70 border border-ink/10"> ${member.role} </span> </div> <p class="mt-2 text-sm leading-relaxed text-ink/70">${member.bioShort}</p> </div> </article>`;
  })} </div> </div> </section> <!-- 4. TRABAJO RECIENTE --> <section id="trabajo" data-reveal class="mx-auto max-w-7xl scroll-mt-24 px-4 py-12 sm:px-6 lg:py-20"> <div class="flex flex-col justify-between gap-4 border-b border-ink/10 pb-6 sm:flex-row sm:items-end"> <div> <span class="inline-block rounded-full border border-ink/15 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wider text-ink/70">
Portafolio
</span> <h2 class="mt-3 text-3xl font-medium tracking-tight sm:text-5xl">
Trabajo${" "} <span class="font-serif italic font-normal text-accent-blue">reciente</span> </h2> </div> <p class="max-w-md text-sm text-ink/65">
Selección de identidades, producción visual y experiencias digitales desarrolladas desde nuestro estudio.
</p> </div> ${projects.length === 0 ? renderTemplate`<div class="mt-10 rounded-3xl border border-dashed border-ink/20 bg-white p-12 text-center"> <p class="text-base font-medium text-ink">Próximamente nuevos casos de estudio.</p> <p class="mt-1 text-sm text-ink/60">
Publica proyectos desde el panel administrativo para mostrarlos aquí.
</p> </div>` : renderTemplate`<div class="mt-10 grid gap-8 md:grid-cols-2"> ${projects.map((project, index) => renderTemplate`<article class="group flex flex-col overflow-hidden rounded-3xl border border-ink/12 bg-white transition-colors hover:border-ink/35"> <a${addAttribute(`/trabajo/${project.slug}`, "href")} class="block overflow-hidden border-b border-ink/10 bg-canvas"> ${project.coverType === "video" ? renderTemplate`<video${addAttribute(project.coverMediaUrl, "src")} autoplay loop muted playsinline class="aspect-[16/11] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"></video>` : renderTemplate`<img${addAttribute(project.coverMediaUrl, "src")}${addAttribute(project.title, "alt")} class="aspect-[16/11] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"${addAttribute(index < 2 ? "eager" : "lazy", "loading")}>`} </a> <div class="flex flex-1 flex-col justify-between p-6"> <div> <div class="flex flex-wrap items-center justify-between gap-2"> <div class="flex flex-wrap gap-1.5"> ${project.disciplines.map((disc) => renderTemplate`<span class="rounded-full border border-ink/12 bg-canvas px-2.5 py-0.5 text-xs font-medium text-ink/80"> ${disc} </span>`)} </div> <span class="text-xs font-medium text-ink/50">${project.year}</span> </div> <h3 class="mt-4 text-2xl font-medium tracking-tight text-ink"> <a${addAttribute(`/trabajo/${project.slug}`, "href")} class="hover:text-accent-blue transition-colors"> ${project.title} </a> </h3> <p class="mt-2 text-sm leading-relaxed text-ink/70">${project.summary}</p> </div> <div class="mt-6 flex items-center justify-between border-t border-ink/8 pt-4"> <span class="text-xs text-ink/55">${project.client}</span> <a${addAttribute(`/trabajo/${project.slug}`, "href")} class="inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors group-hover:text-accent-blue"> <span>Ver caso</span> <span aria-hidden="true">→</span> </a> </div> </div> </article>`)} </div>`} </section> <!-- 5. QUÉ HACEMOS (Servicios interactivos con preview) --> <section id="servicios" data-reveal class="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 lg:py-24"> <div class="grid gap-10 lg:grid-cols-12"> <div class="lg:col-span-5"> <span class="inline-block rounded-full bg-accent-green px-3 py-1 text-xs font-medium uppercase tracking-wider text-ink">
Qué hacemos
</span> <h2 class="mt-4 text-3xl font-medium leading-[1.08] tracking-tight sm:text-5xl">
Capacidades diseñadas para${" "} <span class="font-serif italic font-normal text-accent-blue">destacar</span>.
</h2> <p class="mt-4 text-sm leading-relaxed text-ink/70 sm:text-base">
Desde el trazo inicial de un logotipo hasta la producción visual y su presencia digital.
</p> <div class="mt-8 hidden overflow-hidden rounded-3xl border border-ink/12 bg-white p-3 lg:block"> <img id="service-preview-img"${addAttribute(services[0]?.previewMediaUrl || "/projects/hcconstruccion/cover.webp", "src")}${addAttribute(services[0]?.title || "Preview de servicio", "alt")} class="aspect-[4/3] w-full rounded-2xl object-cover transition-opacity duration-300" loading="lazy"> <p id="service-preview-caption" class="mt-3 px-2 text-xs font-medium text-ink/60"> ${services[0]?.title} </p> </div> </div> <div class="divide-y divide-ink/12 rounded-3xl border border-ink/12 bg-white px-6 py-2 lg:col-span-7"> ${services.map((service, index) => renderTemplate`<details${addAttribute(index === 0, "open")} class="group py-5" data-service-item${addAttribute(service.previewMediaUrl, "data-preview-url")}${addAttribute(service.title, "data-preview-title")}> <summary class="flex cursor-pointer list-none items-center justify-between gap-4"> <div class="flex items-baseline gap-4"> <span class="text-xs font-medium text-ink/45">
0${index + 1} </span> <h3 class="text-xl font-medium tracking-tight text-ink transition-colors group-hover:text-accent-blue sm:text-2xl"> ${service.title} </h3> </div> <span aria-hidden="true" class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/15 text-sm transition-transform group-open:rotate-45 group-open:bg-ink group-open:text-canvas">
+
</span> </summary> <div class="mt-3 pl-8 pr-4"> <p class="text-sm leading-relaxed text-ink/70 sm:text-base"> ${service.description} </p> ${service.previewMediaUrl && renderTemplate`<img${addAttribute(service.previewMediaUrl, "src")}${addAttribute(service.title, "alt")} class="mt-4 aspect-[16/10] w-full rounded-2xl border border-ink/10 object-cover lg:hidden" loading="lazy">`} </div> </details>`)} </div> </div> </section> </main> ${renderScript($$result2, "C:/Users/Alejandro/Documents/07. Antigravity/01.Imprudente/src/pages/index.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "C:/Users/Alejandro/Documents/07. Antigravity/01.Imprudente/src/pages/index.astro", void 0);

const $$file = "C:/Users/Alejandro/Documents/07. Antigravity/01.Imprudente/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
