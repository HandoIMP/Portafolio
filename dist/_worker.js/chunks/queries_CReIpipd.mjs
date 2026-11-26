globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, m as maybeRenderHead, g as addAttribute, r as renderTemplate, n as renderScript, h as createAstro, u as unescapeHTML, o as renderHead, k as renderComponent, p as renderSlot } from './astro/server_BAIfklZH.mjs';
/* empty css                        */
import { S as SITE_DEFAULTS } from './site-config_BkcCjyBd.mjs';
import { b as blogPosts, e as eq, d as desc, p as projects, a as asc, t as teamMembers, c as brands, s as services, j as siteSettings } from './index_w6lK2Ajg.mjs';

const $$Astro$2 = createAstro();
const $$Navbar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Navbar;
  const { activeNav = "none" } = Astro2.props;
  const isHome = Astro2.url.pathname === "/";
  const navLinks = [
    { key: "trabajo", label: "Trabajo", href: isHome ? "#trabajo" : "/#trabajo" },
    { key: "equipo", label: "Equipo", href: isHome ? "#equipo" : "/#equipo" },
    { key: "servicios", label: "Servicios", href: isHome ? "#servicios" : "/#servicios" }
  ];
  return renderTemplate`${maybeRenderHead()}<header class="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5" role="banner"> <nav aria-label="Navegación principal" class="mx-auto flex max-w-7xl items-center justify-between gap-2"> <!-- Bloque izquierdo: logotipo flotante --> <a href="/" class="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-ink/12 bg-canvas/85 px-3.5 py-2 text-sm font-medium tracking-tight text-ink backdrop-blur-md transition-colors hover:border-ink/30"> <img src="/brand/logo-imp.svg" alt="" width="18" height="18" class="h-4.5 w-4.5 object-contain"> <span>${SITE_DEFAULTS.brandName}</span> </a> <!-- Bloque central: cápsula flotante con 3 botones --> <div class="pointer-events-auto inline-flex items-center gap-0.5 rounded-full border border-ink/12 bg-canvas/85 p-1 backdrop-blur-md sm:gap-1" data-nav-capsule> ${navLinks.map((item) => {
    const isActive = activeNav === item.key;
    return renderTemplate`<a${addAttribute(item.href, "href")}${addAttribute(item.key, "data-nav-item")}${addAttribute(isActive ? "page" : void 0, "aria-current")}${addAttribute([
      "rounded-full px-3 py-1.5 text-xs font-medium transition-colors sm:px-4 sm:text-sm",
      isActive ? "bg-ink text-canvas" : "text-ink/75 hover:bg-ink/6 hover:text-ink"
    ], "class:list")}> ${item.label} </a>`;
  })} </div> <!-- Bloque derecho: botón flotante de Contacto en color de acento --> <a href="/contacto"${addAttribute([
    "pointer-events-auto inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-medium tracking-tight transition-colors sm:px-4 sm:text-sm",
    activeNav === "contacto" ? "border-accent-orange bg-accent-orange text-white" : "border-accent-blue bg-accent-blue text-white hover:border-accent-orange hover:bg-accent-orange"
  ], "class:list")}> <span>Contacto</span> <span aria-hidden="true" class="hidden sm:inline">↗</span> </a> </nav> </header> ${isHome && renderTemplate`${renderScript($$result, "C:/Users/Alejandro/Documents/07. Antigravity/01.Imprudente/src/components/Navbar.astro?astro&type=script&index=0&lang.ts")}`}`;
}, "C:/Users/Alejandro/Documents/07. Antigravity/01.Imprudente/src/components/Navbar.astro", void 0);

const $$Astro$1 = createAstro();
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Footer;
  const { showCta = true } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<footer class="mt-20 border-t border-ink/10 bg-canvas"> ${showCta && renderTemplate`<section class="mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 lg:pt-24"> <div class="relative overflow-hidden rounded-3xl border border-ink/12 bg-ink px-6 py-12 text-canvas sm:px-12 sm:py-16"> <div class="flex flex-col justify-between gap-8 lg:flex-row lg:items-end"> <div class="max-w-2xl"> <span class="inline-block rounded-full bg-accent-green px-3 py-1 text-xs font-medium uppercase tracking-wider text-ink"> ${SITE_DEFAULTS.tagline} </span> <h2 class="mt-5 text-3xl font-medium leading-[1.08] tracking-tight sm:text-5xl">
¿Listo para dar forma a algo${" "} <span class="font-serif italic font-normal text-accent-green">auténtico</span>?
</h2> <p class="mt-4 max-w-xl text-base text-canvas/75 sm:text-lg">
Cuéntanos tu proyecto de logotipo, producción visual, fotografía o página web.
</p> </div> <div class="flex flex-wrap items-center gap-3"> <a href="/contacto" class="inline-flex items-center gap-2 rounded-full bg-accent-orange px-6 py-3.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"> <span>Iniciar conversación</span> <span aria-hidden="true">→</span> </a> <a${addAttribute(SITE_DEFAULTS.whatsappUrl, "href")} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 rounded-full border border-canvas/25 px-6 py-3.5 text-sm font-medium text-canvas transition-colors hover:border-canvas">
WhatsApp
</a> </div> </div> </div> </section>`} <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6"> <div class="grid gap-10 border-b border-ink/10 pb-10 md:grid-cols-12"> <div class="md:col-span-5"> <a href="/" class="inline-flex items-center gap-3"> <img src="/brand/imprudente-wordmark.svg"${addAttribute(SITE_DEFAULTS.fullTitle, "alt")} class="h-7 w-auto"> </a> <p class="mt-3 max-w-sm text-sm text-ink/65"> ${SITE_DEFAULTS.tagline} — Diseño de logotipo, producción visual, fotografía y páginas web.
</p> </div> <div class="md:col-span-3"> <h3 class="text-xs font-medium uppercase tracking-wider text-ink/45">Explorar</h3> <ul class="mt-3 space-y-2 text-sm"> <li><a href="/#trabajo" class="text-ink/80 hover:text-accent-blue">Trabajo</a></li> <li><a href="/#equipo" class="text-ink/80 hover:text-accent-blue">Equipo</a></li> <li><a href="/#servicios" class="text-ink/80 hover:text-accent-blue">Servicios</a></li> <li><a href="/blog" class="text-ink/80 hover:text-accent-blue">Blog</a></li> <li><a href="/contacto" class="text-ink/80 hover:text-accent-blue">Contacto</a></li> </ul> </div> <div class="md:col-span-4"> <h3 class="text-xs font-medium uppercase tracking-wider text-ink/45">Contacto directo</h3> <ul class="mt-3 space-y-2 text-sm"> <li> <a${addAttribute(`mailto:${SITE_DEFAULTS.email}`, "href")} class="font-medium text-ink hover:text-accent-blue"> ${SITE_DEFAULTS.email} </a> </li> <li> <a${addAttribute(SITE_DEFAULTS.whatsappUrl, "href")} target="_blank" rel="noopener noreferrer" class="text-ink/80 hover:text-accent-blue">
WhatsApp · ${SITE_DEFAULTS.whatsappDisplay} </a> </li> <li> <a${addAttribute(SITE_DEFAULTS.instagramUrl, "href")} target="_blank" rel="noopener noreferrer" class="text-ink/80 hover:text-accent-blue">
Instagram · ${SITE_DEFAULTS.instagramHandle} </a> </li> <li class="pt-1 text-xs text-ink/55">${SITE_DEFAULTS.location}</li> </ul> </div> </div> <div class="flex flex-col items-start justify-between gap-3 pt-6 text-xs text-ink/55 sm:flex-row sm:items-center"> <p>${SITE_DEFAULTS.copyright}</p> <div class="flex items-center gap-4"> <a href="/blog" class="hover:text-ink">Archivo editorial (Blog)</a> <a href="/sitemap.xml" class="hover:text-ink">Sitemap</a> </div> </div> </div> </footer>`;
}, "C:/Users/Alejandro/Documents/07. Antigravity/01.Imprudente/src/components/Footer.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const {
    title = SITE_DEFAULTS.fullTitle,
    description = SITE_DEFAULTS.description,
    ogImage = "/projects/hcconstruccion/cover.webp",
    ogType = "website",
    noindex = false,
    showFooterCta = true,
    activeNav = "none",
    jsonLd = null
  } = Astro2.props;
  const canonicalUrl = new URL(Astro2.url.pathname, Astro2.url.origin).toString();
  const ogImageUrl = ogImage.startsWith("http") ? ogImage : new URL(ogImage, Astro2.url.origin).toString();
  return renderTemplate`<html lang="es"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title><meta name="description"${addAttribute(description, "content")}><link rel="canonical"${addAttribute(canonicalUrl, "href")}>${noindex && renderTemplate`<meta name="robots" content="noindex, nofollow">`}<meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:type"${addAttribute(ogType, "content")}><meta property="og:url"${addAttribute(canonicalUrl, "content")}><meta property="og:image"${addAttribute(ogImageUrl, "content")}><meta property="og:locale" content="es_MX"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${addAttribute(title, "content")}><meta name="twitter:description"${addAttribute(description, "content")}><meta name="twitter:image"${addAttribute(ogImageUrl, "content")}><link rel="preload" href="/fonts/general-sans/GeneralSans-Variable.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="/fonts/boska/Boska-VariableItalic.woff2" as="font" type="font/woff2" crossorigin><link rel="icon" href="/brand/logo-imp.svg" type="image/svg+xml">${jsonLd && renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(jsonLd)))}${renderHead()}</head> <body class="min-h-screen bg-canvas text-ink font-sans antialiased"> ${renderComponent($$result, "Navbar", $$Navbar, { "activeNav": activeNav })} <div class="pt-20 sm:pt-24"> ${renderSlot($$result, $$slots["default"])} </div> ${renderComponent($$result, "Footer", $$Footer, { "showCta": showFooterCta })} </body></html>`;
}, "C:/Users/Alejandro/Documents/07. Antigravity/01.Imprudente/src/layouts/BaseLayout.astro", void 0);

function safeJsonArray(raw, fallback) {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}
function mapProject(row) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    client: row.client,
    year: row.year,
    disciplines: safeJsonArray(row.disciplines, []),
    summary: row.summary,
    services: row.services,
    agency: row.agency,
    credits: row.credits,
    coverMediaUrl: row.coverMediaUrl,
    coverType: row.coverType,
    contentBlocks: safeJsonArray(row.contentBlocks, []),
    featured: Boolean(row.featured),
    sortOrder: row.sortOrder,
    published: Boolean(row.published)
  };
}
const FALLBACK_HOME_DATA = {
  projects: [],
  team: [
    {
      id: 1,
      name: "Alejandro",
      role: "Fundador & Director Creativo",
      bioShort: "Diseñador interdisciplinario en Sonora. Enfocado en marcas con carácter propio y ejecución honesta.",
      photoUrl: "/assets-general/DigiCam.webp",
      rotationDeg: -2,
      sortOrder: 1
    },
    {
      id: 2,
      name: "Nuestro Proceso",
      role: "De la idea al sistema visual",
      bioShort: "Investigación, bocetaje, producción visual y fotografía cuidando cada punto de contacto.",
      photoUrl: "/assets-general/5x7-win-in-silence.webp",
      rotationDeg: 2,
      sortOrder: 2
    }
  ],
  brands: [
    { id: 1, name: "ISH", logoSvgOrUrl: "", sortOrder: 1 },
    { id: 2, name: "HC Construcción", logoSvgOrUrl: "", sortOrder: 2 },
    { id: 3, name: "Electromecánica San Carlos", logoSvgOrUrl: "", sortOrder: 3 },
    { id: 4, name: "NaluExperience", logoSvgOrUrl: "", sortOrder: 4 },
    { id: 5, name: "Las Luchas", logoSvgOrUrl: "", sortOrder: 5 },
    { id: 6, name: "Quick Lift", logoSvgOrUrl: "", sortOrder: 6 }
  ],
  services: [
    {
      id: 1,
      title: "Diseño de logotipo",
      description: "Identidades memorables, versátiles y con personalidad propia.",
      previewMediaUrl: "/projects/hcconstruccion/cover.webp",
      sortOrder: 1
    },
    {
      id: 2,
      title: "Producción visual",
      description: "Dirección creativa y sistemas visuales para medios digitales e impresos.",
      previewMediaUrl: "/projects/electromecanicasc/cover.webp",
      sortOrder: 2
    },
    {
      id: 3,
      title: "Fotografía",
      description: "Sesiones de producto, marca y contenido editorial con intención estética.",
      previewMediaUrl: "/projects/lasluchas/03.webp",
      sortOrder: 3
    },
    {
      id: 4,
      title: "Páginas web",
      description: "Experiencias web rápidas, claras y hechas a la medida de tu marca.",
      previewMediaUrl: "/projects/quicklift/cover.webp",
      sortOrder: 4
    }
  ],
  settings: {}
};
async function getHomeData(db) {
  if (!db) return FALLBACK_HOME_DATA;
  try {
    const [projectRows, teamRows, brandRows, serviceRows, settingRows] = await Promise.all([
      db.select().from(projects).where(eq(projects.published, true)).orderBy(asc(projects.sortOrder), desc(projects.id)),
      db.select().from(teamMembers).orderBy(asc(teamMembers.sortOrder), asc(teamMembers.id)),
      db.select().from(brands).orderBy(asc(brands.sortOrder), asc(brands.id)),
      db.select().from(services).orderBy(asc(services.sortOrder), asc(services.id)),
      db.select().from(siteSettings)
    ]);
    const settings = {};
    for (const row of settingRows) {
      settings[row.key] = row.value;
    }
    return {
      projects: projectRows.map(mapProject),
      team: teamRows.length > 0 ? teamRows : FALLBACK_HOME_DATA.team,
      brands: brandRows.length > 0 ? brandRows : FALLBACK_HOME_DATA.brands,
      services: serviceRows.length > 0 ? serviceRows : FALLBACK_HOME_DATA.services,
      settings
    };
  } catch {
    return FALLBACK_HOME_DATA;
  }
}
async function getProjectBySlug(db, slug) {
  if (!db) return null;
  try {
    const rows = await db.select().from(projects).where(eq(projects.slug, slug)).limit(1);
    const row = rows[0];
    if (!row || !row.published) return null;
    return mapProject(row);
  } catch {
    return null;
  }
}
async function getOtherProjects(db, excludeSlug, limit = 3) {
  if (!db) return [];
  try {
    const rows = await db.select().from(projects).where(eq(projects.published, true)).orderBy(asc(projects.sortOrder), desc(projects.id));
    return rows.filter((p) => p.slug !== excludeSlug).slice(0, limit).map(mapProject);
  } catch {
    return [];
  }
}
async function getPublishedBlogPosts(db) {
  if (!db) return [];
  try {
    return await db.select().from(blogPosts).where(eq(blogPosts.status, "published")).orderBy(desc(blogPosts.publishedAt), desc(blogPosts.id));
  } catch {
    return [];
  }
}
async function getBlogPostBySlug(db, slug) {
  if (!db) return null;
  try {
    const rows = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
    const row = rows[0];
    if (!row || row.status !== "published") return null;
    return row;
  } catch {
    return null;
  }
}

export { $$BaseLayout as $, getPublishedBlogPosts as a, getHomeData as b, getProjectBySlug as c, getOtherProjects as d, getBlogPostBySlug as g };
