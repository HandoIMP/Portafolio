globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, o as renderHead, g as addAttribute, r as renderTemplate, p as renderSlot, h as createAstro } from './astro/server_BAIfklZH.mjs';
/* empty css                        */
import { S as SITE_DEFAULTS } from './site-config_BkcCjyBd.mjs';

const $$Astro = createAstro();
const $$AdminLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AdminLayout;
  const { title = `Admin \u2014 ${SITE_DEFAULTS.brandName}`, activeSection = "dashboard" } = Astro2.props;
  const user = Astro2.locals.user;
  const navItems = [
    { key: "dashboard", label: "Dashboard", href: "/admin", icon: "\u25EB" },
    { key: "crm", label: "CRM / Leads", href: "/admin/crm", icon: "\u25C9" },
    { key: "proyectos", label: "Proyectos", href: "/admin/cms/proyectos", icon: "\u25A6" },
    { key: "blog", label: "Blog", href: "/admin/cms/blog", icon: "\u270E" },
    { key: "sitio", label: "Equipo & Sitio", href: "/admin/cms/sitio", icon: "\u2699" }
  ];
  return renderTemplate`<html lang="es"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title><meta name="robots" content="noindex, nofollow"><link rel="icon" href="/brand/logo-imp.svg" type="image/svg+xml"><link rel="preload" href="/fonts/general-sans/GeneralSans-Variable.woff2" as="font" type="font/woff2" crossorigin>${renderHead()}</head> <body class="min-h-screen bg-canvas text-ink font-sans antialiased"> <div class="flex min-h-screen"> <!-- Sidebar --> <aside class="hidden w-60 shrink-0 border-r border-ink/10 bg-white lg:block"> <div class="flex h-full flex-col"> <div class="border-b border-ink/10 px-5 py-4"> <a href="/" class="flex items-center gap-2 text-sm font-medium text-ink"> <img src="/brand/logo-imp.svg" alt="" class="h-5 w-5"> <span>${SITE_DEFAULTS.brandName}</span> </a> <p class="mt-0.5 text-xs text-ink/50">Panel administrativo</p> </div> <nav class="flex-1 space-y-0.5 px-3 py-4" aria-label="Admin"> ${navItems.map((item) => {
    const isActive = activeSection === item.key;
    return renderTemplate`<a${addAttribute(item.href, "href")}${addAttribute([
      "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
      isActive ? "bg-ink text-canvas font-medium" : "text-ink/70 hover:bg-ink/5 hover:text-ink"
    ], "class:list")}> <span class="text-base">${item.icon}</span> <span>${item.label}</span> </a>`;
  })} </nav> <div class="border-t border-ink/10 px-5 py-4"> <div class="flex items-center justify-between"> <div class="text-xs"> <p class="font-medium text-ink">${user?.name || "Admin"}</p> <p class="text-ink/50">${user?.email || ""}</p> </div> <form method="POST" action="/api/auth/logout"> <button type="submit" class="rounded-md px-2 py-1 text-xs text-ink/50 hover:bg-ink/5 hover:text-ink" title="Cerrar sesión">
Salir
</button> </form> </div> </div> </div> </aside> <!-- Mobile header --> <div class="flex flex-1 flex-col"> <header class="flex items-center justify-between border-b border-ink/10 bg-white px-4 py-3 lg:hidden"> <a href="/admin" class="flex items-center gap-2 text-sm font-medium"> <img src="/brand/logo-imp.svg" alt="" class="h-5 w-5"> <span>Admin</span> </a> <div class="flex items-center gap-2"> ${navItems.map((item) => renderTemplate`<a${addAttribute(item.href, "href")}${addAttribute([
    "rounded-lg px-2.5 py-1.5 text-xs",
    activeSection === item.key ? "bg-ink text-canvas font-medium" : "text-ink/60 hover:text-ink"
  ], "class:list")}> ${item.label} </a>`)} </div> </header> <!-- Main content --> <main class="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8"> ${renderSlot($$result, $$slots["default"])} </main> </div> </div> </body></html>`;
}, "C:/Users/Alejandro/Documents/07. Antigravity/01.Imprudente/src/layouts/AdminLayout.astro", void 0);

export { $$AdminLayout as $ };
