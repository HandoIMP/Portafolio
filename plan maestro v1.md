# Plan Maestro v2 — Portafolio Interdisciplinario + CMS Propio + CRM + Blog SEO

Quiero rehacer por completo mi portafolio actual (alojado en este repositorio de GitHub) hacia una nueva dirección visual, técnica y funcional. **No necesito mantener compatibilidad con URLs antiguas ni evitar caídas**; respaldaremos lo actual (ej. en un tag o rama `v1-legacy`) y construiremos esto nuevo en una rama `redesign-v2` hasta reemplazar `main`.

---

## 1. Dirección Visual e Inspiración
* **Enfoque:** Estudio / portafolio de diseño gráfico interdisciplinario (branding, editorial, packaging, motion, dirección de arte, digital).
* **Inspiración principal:** `https://www.extrafazant.nl/`
* **Estética clave:**
  * Fondo claro limpio (ej. `#F4F4F4`), tipografía oscura de alto contraste (`#111111`) y 1–2 colores de acento vibrantes, actual azul  y verde
  * Tipografía editorial expresiva: mezcla de *Sans-serif* limpia (General Sans) + detalles en *Serif itálica* para resaltar palabras en titulares.
  * Mucho aire, bordes finos (`1px` sutiles), esquinas redondeadas consistentes y toques lúdicos (tarjetas *Polaroid* para el equipo, showcases amplios).

---

## 2. Stack Técnico Full-Stack (Costo $0 en suscripciones extra)
**Regla estricta:** Sin CMS pagos (no Webflow, no Sanity/Contentful de pago), sin CRMs pagos y sin servidores dedicados. Todo corre dentro del mismo proyecto:

* **Framework:** **Astro** en modo híbrido/SSR (`@astrojs/cloudflare`) + **TypeScript**.
* **Estilos:** **Tailwind CSS**.
* **Animaciones y Motion:** **GSAP** (con ScrollTrigger) o **Motion** (`motion/react` en islas puntuales) + CSS puro (`@keyframes`, `backdrop-filter`, `mask-image`).
* **Base de Datos (CMS + CRM + Blog + Auth):** **Cloudflare D1** (SQLite en el edge) usando **Drizzle ORM** para tipado seguro y consultas parametrizadas. *(Alternativa si prefiero Vercel: Neon Postgres gratis + Drizzle).*
* **Almacenamiento de Media (subidas desde el CMS):** **Cloudflare R2** (10 GB gratis, cero costo de tráfico) para imágenes WebP y videos `.mp4` optimizados (`< 3 MB`, sin audio, `autoplay loop muted playsinline`).
* **Autenticación privada (`/admin`):** Acceso único para mi usuario administrador mediante hash seguro (`scrypt`/PBKDF2 con Web Crypto API) + sesiones en DB con cookies `HttpOnly`, `Secure` y `SameSite=Lax`.

---

## 3. Arquitectura de Rutas y Diseño

### A. Sitio Público
* **Navbar Flotante (3 bloques fijos):**
  * **Izquierda:** Logotipo flotante (SVG o cápsula).
  * **Centro:** Cápsula flotante (`rounded-full`, `backdrop-blur-md`) con **3 botones** (*Trabajo*, *Equipo*, *Servicios*) e indicador activo. *(El Blog NO va aquí).*
  * **Derecha:** Botón flotante de **Contacto** en el color de acento.
* **Homepage (6 secciones en orden):**
  1. **Hero Section:** Titular creativo Sans + Serif, detalle gráfico sutil y pieza central protagonista (showreel corto `.mp4` en loop o composición interactiva).
  2. **Banda de Marcas:** *Marquee* infinito en CSS puro (`@keyframes translateX(-50%)`) con degradado en los bordes (`mask-image`).
  3. **Acerca de los Creativos del Equipo:** Tarjetas interactivas estilo **Polaroid** con rotación alternada (`-rotate-2`, `rotate-2`), foto WebP, nombre, rol y microinteracción al hover/tap.
  4. **Trabajo Reciente:** Showcases amplios enmarcados (`.mp4` para proyectos con movimiento, WebP nítido para diseño gráfico/impreso), etiquetas de disciplina y enlace al caso de estudio.
  5. **Qué Hacemos (Servicios):** Lista o acordeón interactivo con descripción breve y preview visual al pasar el cursor.
  6. **Encabezado CTA + Footer:** Bloque de cierre de alto impacto hacia contacto + **Footer** editorial que incluye el enlace discreto al **Blog** (`/blog`), redes, ubicación y copyright.
* **Páginas Públicas Secundarias:**
  * `/trabajo/[slug]`: Caso de estudio dinámico cargado desde la base de datos del CMS.
  * `/blog` y `/blog/[slug]`: Sección de artículos optimizada para **SEO** (etiquetas `meta` dinámicas, Open Graph, esquema `JSON-LD` tipo `Article`, URLs limpias y generación de `/sitemap.xml` dinámico incluyendo proyectos + artículos publicados).
  * `/contacto` (o sección integrada): Formulario conectado directo al endpoint `POST /api/contact`, protegido contra spam (campo *honeypot* + Cloudflare Turnstile gratuito).

### B. Backend Privado (`/admin` — con `noindex, nofollow`)
* `/admin/login`: Inicio de sesión para mi usuario.
* `/admin`: Dashboard resumen (leads nuevos sin revisar, proyectos publicados, artículos en borrador/publicados).
* `/admin/crm`: **CRM propio** alimentado por el formulario de contacto:
  * Listado y filtro de prospectos por estado: `Nuevo` | `Contactado` | `En Propuesta` | `Cerrado` | `Descartado`.
  * Vista de detalle de cada lead: nombre, email, empresa, servicio de interés, presupuesto estimado, mensaje, fecha y campo de **notas internas** para seguimiento.
* `/admin/cms/proyectos`: Crear, editar, reordenar y publicar/ocultar proyectos (con carga de imágenes/MP4 a R2 y constructor de bloques para el caso de estudio).
* `/admin/cms/blog`: Editor de artículos (título, slug, extracto SEO, meta title/description, imagen de portada, contenido en Markdown/rich text, estado borrador/publicado y fecha).
* `/admin/cms/sitio`: Gestión sencilla de integrantes del equipo (Polaroids), logos de marcas y lista de servicios ("Qué hacemos").

---

## 4. Modelo Inicial de Base de Datos (Drizzle + D1/SQLite)
Diseña el esquema con al menos estas tablas limpias:
* `users` y `sessions` (acceso de administrador).
* `projects` (id, slug, title, client, year, disciplines, cover_media_url, cover_type `image|video`, content_blocks JSON, featured, sort_order, published).
* `team_members` (id, name, role, bio_short, photo_url, rotation_deg, sort_order).
* `brands` (id, name, logo_svg_or_url, sort_order).
* `services` (id, title, description, preview_media_url, sort_order).
* `blog_posts` (id, slug, title, excerpt, seo_title, seo_description, cover_url, content_markdown, status `draft|published`, published_at, updated_at).
* `crm_leads` (id, name, email, company, service_interest, budget_range, message, status, internal_notes, source_page, created_at, updated_at).

---

## 5. Fases de Ejecución (Paso a Paso)

Ejecuta estas fases en orden sobre este repositorio, pidiéndome confirmación y datos antes de avanzar a la siguiente:

* **Fase 1 — Auditoría y Rescate:**
  1. Revisa el repositorio actual: dime qué stack usa hoy, qué proyectos, textos, logos, imágenes y videos existen y cuáles vale la pena rescatar.
  2. Propón cómo respaldar lo actual (`v1-legacy`) y crear la rama `redesign-v2`.
* **Fase 2 — Curación y Definición Visual:**
  1. Pídeme la información base (nombre del estudio, paleta exacta, par tipográfico, textos del hero, equipo, marcas, servicios y primeros proyectos).
* **Fase 3 — Base Full-Stack y Base de Datos:**
  1. Configura Astro SSR (`@astrojs/cloudflare`) + Tailwind CSS + Drizzle ORM + D1 + R2 (con entorno local de pruebas vía Wrangler).
  2. Crea el esquema de tablas, migraciones y un script *seed* inicial para crear mi usuario administrador de forma segura.
* **Fase 4 — Frontend Público (Home + Casos + Blog SEO):**
  1. Construye Layout base, Navbar flotante de 3 bloques y Footer (con enlace al Blog).
  2. Implementa las 6 secciones del Homepage conectadas a la base de datos (con *fallbacks* limpios si aún está vacío), `/trabajo/[slug]`, `/blog`, `/blog/[slug]` y `/sitemap.xml`.
* **Fase 5 — Backend Privado (Auth + CMS + CRM + Formulario):**
  1. Implementa `/admin/login` y middleware de protección de rutas `/admin/*` y `/api/admin/*`.
  2. Conecta el formulario público (`POST /api/contact`) con validación anti-spam hacia la tabla `crm_leads`.
  3. Construye las vistas del CRM (`/admin/crm`) y del CMS (`/admin/cms/*`) con subida optimizada de media a R2.
* **Fase 6 — Motion, Optimización y Despliegue:**
  1. Añade animaciones (GSAP/Motion, marquee, hover de Polaroids y servicios) animando solo `transform` y `opacity`, respetando `prefers-reduced-motion`.
  2. Dame comandos `ffmpeg` para comprimir mis videos a `< 3 MB` y revisa Lighthouse/SEO.
  3. Guía paso a paso para hacer merge a `main`, crear la DB D1 y bucket R2 en Cloudflare Pages y conectar mi dominio.

---

**Para empezar ahora mismo:** ejecuta primero la **Fase 1 (Auditoría y Rescate)** sobre los archivos actuales de este repositorio y preséntame el inventario antes de modificar o borrar nada.