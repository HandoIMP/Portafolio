globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead, g as addAttribute, n as renderScript } from '../chunks/astro/server_BAIfklZH.mjs';
import { b as getHomeData, $ as $$BaseLayout } from '../chunks/queries_CReIpipd.mjs';
import { g as getDb } from '../chunks/index_w6lK2Ajg.mjs';
import { S as SITE_DEFAULTS } from '../chunks/site-config_BkcCjyBd.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Contacto = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Contacto;
  const d1 = Astro2.locals.runtime?.env?.DB;
  const db = d1 ? getDb(d1) : null;
  const { services } = await getHomeData(db);
  const preselectedService = Astro2.url.searchParams.get("servicio") || "";
  const turnstileSiteKey = Astro2.locals.runtime?.env?.TURNSTILE_SITE_KEY || "";
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `Contacto \u2014 ${SITE_DEFAULTS.brandName}`, "description": "Cotiza tu proyecto de dise\xF1o de logotipo, producci\xF3n visual, fotograf\xEDa o p\xE1gina web con Imprudente Dept. Creativo.", "activeNav": "contacto", "showFooterCta": false }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="mx-auto max-w-7xl px-4 pt-8 pb-16 sm:px-6"> <div class="grid gap-10 lg:grid-cols-12"> <!-- Información editorial izquierda --> <aside class="lg:col-span-5"> <span class="inline-block rounded-full bg-accent-green px-3 py-1 text-xs font-medium uppercase tracking-wider text-ink">
Contacto
</span> <h1 class="mt-4 text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl">
Hagamos que tu marca se sienta${" "} <span class="font-serif italic font-normal text-accent-blue">auténtica</span>.
</h1> <p class="mt-4 text-base leading-relaxed text-ink/75">
Cuéntanos qué estás construyendo, en qué etapa se encuentra tu negocio y cómo podemos
          ayudarte. Respondemos en menos de 24 horas hábiles.
</p> <div class="mt-8 space-y-4 rounded-3xl border border-ink/12 bg-white p-6 text-sm"> <div> <p class="text-xs uppercase tracking-wider text-ink/45">Correo</p> <a${addAttribute(`mailto:${SITE_DEFAULTS.email}`, "href")} class="mt-1 inline-block font-medium text-ink hover:text-accent-blue"> ${SITE_DEFAULTS.email} </a> </div> <div class="border-t border-ink/10 pt-4"> <p class="text-xs uppercase tracking-wider text-ink/45">WhatsApp directo</p> <a${addAttribute(SITE_DEFAULTS.whatsappUrl, "href")} target="_blank" rel="noopener noreferrer" class="mt-1 inline-block font-medium text-ink hover:text-accent-blue"> ${SITE_DEFAULTS.whatsappDisplay} ↗
</a> </div> <div class="border-t border-ink/10 pt-4"> <p class="text-xs uppercase tracking-wider text-ink/45">Instagram</p> <a${addAttribute(SITE_DEFAULTS.instagramUrl, "href")} target="_blank" rel="noopener noreferrer" class="mt-1 inline-block font-medium text-ink hover:text-accent-blue"> ${SITE_DEFAULTS.instagramHandle} ↗
</a> </div> <div class="border-t border-ink/10 pt-4"> <p class="text-xs uppercase tracking-wider text-ink/45">Ubicación</p> <p class="mt-1 text-ink/75">${SITE_DEFAULTS.location}</p> </div> </div> </aside> <!-- Formulario --> <section class="lg:col-span-7"> <div class="rounded-3xl border border-ink/12 bg-white p-6 sm:p-10"> <form id="contact-form" action="/api/contact" method="POST" class="space-y-5"> <!-- Honeypot anti-spam --> <div class="hidden" aria-hidden="true"> <label for="website">Sitio web</label> <input type="text" id="website" name="website" tabindex="-1" autocomplete="off"> </div> <div class="grid gap-5 sm:grid-cols-2"> <div> <label for="name" class="block text-xs font-medium uppercase tracking-wider text-ink/70">
Nombre *
</label> <input id="name" name="name" type="text" required autocomplete="name" placeholder="Tu nombre" class="mt-2 w-full rounded-xl border border-ink/15 bg-canvas px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-accent-blue focus:outline-none"> </div> <div> <label for="email" class="block text-xs font-medium uppercase tracking-wider text-ink/70">
Correo electrónico *
</label> <input id="email" name="email" type="email" required autocomplete="email" placeholder="tu@correo.com" class="mt-2 w-full rounded-xl border border-ink/15 bg-canvas px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-accent-blue focus:outline-none"> </div> </div> <div class="grid gap-5 sm:grid-cols-2"> <div> <label for="phone" class="block text-xs font-medium uppercase tracking-wider text-ink/70">
Teléfono / WhatsApp (opcional)
</label> <input id="phone" name="phone" type="tel" autocomplete="tel" placeholder="+52 ..." class="mt-2 w-full rounded-xl border border-ink/15 bg-canvas px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-accent-blue focus:outline-none"> </div> <div> <label for="company" class="block text-xs font-medium uppercase tracking-wider text-ink/70">
Empresa o marca (opcional)
</label> <input id="company" name="company" type="text" autocomplete="organization" placeholder="Nombre de tu proyecto" class="mt-2 w-full rounded-xl border border-ink/15 bg-canvas px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-accent-blue focus:outline-none"> </div> </div> <div class="grid gap-5 sm:grid-cols-2"> <div> <label for="service_interest" class="block text-xs font-medium uppercase tracking-wider text-ink/70">
Servicio de interés
</label> <select id="service_interest" name="service_interest" class="mt-2 w-full rounded-xl border border-ink/15 bg-canvas px-4 py-3 text-sm text-ink focus:border-accent-blue focus:outline-none"> <option value="">Selecciona una opción</option> ${services.map((srv) => renderTemplate`<option${addAttribute(srv.title, "value")}${addAttribute(preselectedService.toLowerCase().includes(srv.title.toLowerCase()), "selected")}> ${srv.title} </option>`)} <option value="Proyecto integral">Proyecto integral</option> </select> </div> <div> <label for="budget_range" class="block text-xs font-medium uppercase tracking-wider text-ink/70">
Presupuesto estimado
</label> <select id="budget_range" name="budget_range" class="mt-2 w-full rounded-xl border border-ink/15 bg-canvas px-4 py-3 text-sm text-ink focus:border-accent-blue focus:outline-none"> <option value="">Por definir</option> <option value="Menos de $10,000 MXN">Menos de $10,000 MXN</option> <option value="$10,000 - $25,000 MXN">$10,000 - $25,000 MXN</option> <option value="$25,000 - $50,000 MXN">$25,000 - $50,000 MXN</option> <option value="Más de $50,000 MXN">Más de $50,000 MXN</option> </select> </div> </div> <div> <label for="message" class="block text-xs font-medium uppercase tracking-wider text-ink/70">
Cuéntanos sobre tu proyecto *
</label> <textarea id="message" name="message" rows="5" required placeholder="Objetivos, tiempos aproximados y cualquier referencia que tengas..." class="mt-2 w-full rounded-xl border border-ink/15 bg-canvas px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-accent-blue focus:outline-none"></textarea> </div> ${turnstileSiteKey && renderTemplate`<div class="cf-turnstile"${addAttribute(turnstileSiteKey, "data-sitekey")} data-theme="light"></div>`} <div class="flex flex-wrap items-center justify-between gap-4 pt-2"> <p id="contact-status" role="status" class="text-sm text-ink/70"></p> <button id="contact-submit" type="submit" class="inline-flex items-center gap-2 rounded-full bg-accent-blue px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-accent-orange disabled:opacity-50"> <span>Enviar mensaje</span> <span aria-hidden="true">→</span> </button> </div> </form> </div> </section> </div> </main> ${turnstileSiteKey && renderTemplate(_a || (_a = __template(['<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer><\/script>'])))}${renderScript($$result2, "C:/Users/Alejandro/Documents/07. Antigravity/01.Imprudente/src/pages/contacto.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "C:/Users/Alejandro/Documents/07. Antigravity/01.Imprudente/src/pages/contacto.astro", void 0);

const $$file = "C:/Users/Alejandro/Documents/07. Antigravity/01.Imprudente/src/pages/contacto.astro";
const $$url = "/contacto";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contacto,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
