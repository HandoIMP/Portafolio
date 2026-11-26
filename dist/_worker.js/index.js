globalThis.process ??= {}; globalThis.process.env ??= {};
import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_vNG9xixs.mjs';
import { manifest } from './manifest_B2gcaxYI.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin/cms/blog/_id_.astro.mjs');
const _page2 = () => import('./pages/admin/cms/blog.astro.mjs');
const _page3 = () => import('./pages/admin/cms/proyectos/_id_.astro.mjs');
const _page4 = () => import('./pages/admin/cms/proyectos.astro.mjs');
const _page5 = () => import('./pages/admin/cms/sitio.astro.mjs');
const _page6 = () => import('./pages/admin/crm/_id_.astro.mjs');
const _page7 = () => import('./pages/admin/crm.astro.mjs');
const _page8 = () => import('./pages/admin/login.astro.mjs');
const _page9 = () => import('./pages/admin.astro.mjs');
const _page10 = () => import('./pages/api/auth/login.astro.mjs');
const _page11 = () => import('./pages/api/auth/logout.astro.mjs');
const _page12 = () => import('./pages/api/contact.astro.mjs');
const _page13 = () => import('./pages/api/health.astro.mjs');
const _page14 = () => import('./pages/api/media/_---key_.astro.mjs');
const _page15 = () => import('./pages/blog/_slug_.astro.mjs');
const _page16 = () => import('./pages/blog.astro.mjs');
const _page17 = () => import('./pages/contacto.astro.mjs');
const _page18 = () => import('./pages/robots.txt.astro.mjs');
const _page19 = () => import('./pages/sitemap.xml.astro.mjs');
const _page20 = () => import('./pages/trabajo/_slug_.astro.mjs');
const _page21 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/admin/cms/blog/[id].astro", _page1],
    ["src/pages/admin/cms/blog/index.astro", _page2],
    ["src/pages/admin/cms/proyectos/[id].astro", _page3],
    ["src/pages/admin/cms/proyectos/index.astro", _page4],
    ["src/pages/admin/cms/sitio.astro", _page5],
    ["src/pages/admin/crm/[id].astro", _page6],
    ["src/pages/admin/crm/index.astro", _page7],
    ["src/pages/admin/login.astro", _page8],
    ["src/pages/admin/index.astro", _page9],
    ["src/pages/api/auth/login.ts", _page10],
    ["src/pages/api/auth/logout.ts", _page11],
    ["src/pages/api/contact.ts", _page12],
    ["src/pages/api/health.ts", _page13],
    ["src/pages/api/media/[...key].ts", _page14],
    ["src/pages/blog/[slug].astro", _page15],
    ["src/pages/blog/index.astro", _page16],
    ["src/pages/contacto.astro", _page17],
    ["src/pages/robots.txt.ts", _page18],
    ["src/pages/sitemap.xml.ts", _page19],
    ["src/pages/trabajo/[slug].astro", _page20],
    ["src/pages/index.astro", _page21]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = undefined;
const _exports = createExports(_manifest);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
