globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, o as renderHead, n as renderScript, r as renderTemplate } from '../../chunks/astro/server_BAIfklZH.mjs';
/* empty css                                   */
import { S as SITE_DEFAULTS } from '../../chunks/site-config_BkcCjyBd.mjs';
export { renderers } from '../../renderers.mjs';

const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="es"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Iniciar sesión — ${SITE_DEFAULTS.brandName}</title><meta name="robots" content="noindex, nofollow"><link rel="icon" href="/brand/logo-imp.svg" type="image/svg+xml"><link rel="preload" href="/fonts/general-sans/GeneralSans-Variable.woff2" as="font" type="font/woff2" crossorigin>${renderHead()}</head> <body class="min-h-screen bg-canvas text-ink font-sans antialiased"> <main class="mx-auto flex min-h-screen max-w-sm flex-col items-center justify-center px-4"> <div class="w-full rounded-3xl border border-ink/12 bg-white p-8"> <div class="text-center"> <img src="/brand/logo-imp.svg" alt="" class="mx-auto h-10 w-10"> <h1 class="mt-4 text-2xl font-medium tracking-tight">${SITE_DEFAULTS.brandName}</h1> <p class="mt-1 text-sm text-ink/60">Acceso al panel administrativo</p> </div> <form id="login-form" method="POST" action="/api/auth/login" class="mt-8 space-y-4"> <div> <label for="email" class="block text-xs font-medium uppercase tracking-wider text-ink/70">
Correo electrónico
</label> <input id="email" name="email" type="email" required autocomplete="email" class="mt-2 w-full rounded-xl border border-ink/15 bg-canvas px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-accent-blue focus:outline-none" placeholder="tu@correo.com"> </div> <div> <label for="password" class="block text-xs font-medium uppercase tracking-wider text-ink/70">
Contraseña
</label> <input id="password" name="password" type="password" required autocomplete="current-password" class="mt-2 w-full rounded-xl border border-ink/15 bg-canvas px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-accent-blue focus:outline-none" placeholder="••••••••"> </div> <p id="login-error" role="alert" class="hidden text-sm font-medium text-accent-orange"></p> <button id="login-submit" type="submit" class="w-full rounded-full bg-ink px-5 py-3 text-sm font-medium text-canvas transition-colors hover:bg-accent-blue disabled:opacity-50">
Iniciar sesión
</button> </form> <p class="mt-6 text-center text-xs text-ink/45"> <a href="/" class="hover:text-ink">← Volver al sitio público</a> </p> </div> </main> ${renderScript($$result, "C:/Users/Alejandro/Documents/07. Antigravity/01.Imprudente/src/pages/admin/login.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "C:/Users/Alejandro/Documents/07. Antigravity/01.Imprudente/src/pages/admin/login.astro", void 0);

const $$file = "C:/Users/Alejandro/Documents/07. Antigravity/01.Imprudente/src/pages/admin/login.astro";
const $$url = "/admin/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
