/**
 * script.js
 * IMPRUDENTE DEPT. CREATIVO — ALEJANDRO
 * Interactive engine: theme toggle, hero gradient, noise canvas,
 * portfolio rendering, project detail overlay, lightbox, form validation, and reveals.
 */

/* ==========================================================================
   GLOBAL STATE
   ========================================================================== */
let projects = [];

/* ==========================================================================
   UTIL: Markdown -> Projects parser
   - Espera bloques que comienzan con "## Título"
   - Extrae id:, category:, cover:, credits:, description:, gallery:
   ========================================================================== */
function parseProjects(markdown) {
    if (!markdown || typeof markdown !== 'string') return [];

    const sections = markdown.split(/^## /gm).filter(Boolean);

    return sections.map(section => {
        const lines = section.trim().split('\n').map(l => l.trim()).filter(Boolean);
        const title = lines.shift() || '';

        const project = {
            title,
            id: '',
            category: '',
            services: '',
            client: '',
            agency: '',
            year: '',
            cover: '',
            credits: '',
            description: '',
            gallery: []
        };

        let inGallery = false;
        let currentKey = '';
        lines.forEach(line => {
            if (/^gallery:\s*$/i.test(line)) {
                inGallery = true;
                currentKey = 'gallery';
                return;
            }

            if (inGallery && line.startsWith('-')) {
                project.gallery.push(normalizePath(line.replace('-', '').trim()));
                return;
            }

            const kv = line.match(/^([a-zA-Z0-9_-]+)\s*:\s*(.*)$/);
            if (kv) {
                const key = kv[1].trim().toLowerCase();
                const value = kv[2].trim();

                if (key === 'id' || key === 'category' || key === 'services' || key === 'client' || key === 'agency' || key === 'year' || key === 'credits' || key === 'description') {
                    project[key] = value;
                    currentKey = key;
                    return;
                }
                if (key === 'cover') {
                    project.cover = normalizePath(value);
                    currentKey = 'cover';
                    return;
                }
            }

            if (currentKey && currentKey !== 'gallery') {
                project[currentKey] += (project[currentKey] ? '\n' : '') + line;
            }
        });

        return project;
    });
}

/* ==========================================================================
   RENDER: Project list into <ul class="project-list">
   - Usa las clases que tu CSS espera (.project-item, .project-thumb, .project-text, .project-link-icon)
   ========================================================================== */
function renderProjectList(projectsArray) {
    const list = document.querySelector('.project-list');
    if (!list) {
        console.error('No existe .project-list en el DOM');
        return;
    }

    list.innerHTML = '';

    if (!Array.isArray(projectsArray) || projectsArray.length === 0) {
        list.innerHTML = `<li class="project-empty">No hay proyectos disponibles.</li>`;
        return;
    }

    projectsArray.forEach(project => {
        const li = document.createElement('li');
        li.className = 'project-item';

        // Estructura compatible con tu CSS (hover thumbnail, texto y flecha)
        li.innerHTML = `
      <a href="detail.html?id=${encodeURIComponent(project.id || '')}"
         class="project-link"
         aria-label="Abrir ${escapeHtml(project.title || '')}">
        <div class="project-thumb-wrap" aria-hidden="true">
          <img src="${escapeAttr(project.cover || '')}"
               alt="${escapeAttr(project.title || '')}"
               class="project-thumb"
               loading="lazy">
        </div>
        <span class="project-text">${escapeHtml(project.title || '')} — ${escapeHtml(project.category || '')}</span>
        <svg class="project-link-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M5 12h14M13 5l7 7-7 7"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round" />
        </svg>
      </a>
    `;

        list.appendChild(li);
    });

    // Después de insertar los elementos en el DOM, actualizamos thumbs y slugs
    updateThumbWidths();
    addSlugLinks();
}

/* ==========================================================================
   HELPERS: small sanitizers to avoid inyectar HTML accidentalmente
   ========================================================================== */
function escapeHtml(str) {
    return String(str || '').replace(/[&<>"']/g, function (m) {
        return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m];
    });
}
function escapeAttr(str) {
    return String(str || '').replace(/"/g, '&quot;');
}
function normalizePath(path) {
    return String(path || '').replace(/\\/g, '/');
}

/* ==========================================================================
   AFTER-RENDER: addSlugLinks & updateThumbWidths
   - addSlugLinks: opcional, infiere slug desde la ruta de la imagen
   - updateThumbWidths: calcula y aplica --thumb-w y padding-left para reservar espacio
   ========================================================================== */
function addSlugLinks() {
    document.querySelectorAll('.project-item').forEach(item => {
        const link = item.querySelector('.project-link');
        const img = item.querySelector('.project-thumb');
        if (!link || !img) return;
        const src = img.getAttribute('src') || '';
        const match = src.match(/portfolio-assets\/([^\/]+)\//);
        if (match) {
            const slug = match[1];
            // Si prefieres query param por slug, descomenta la siguiente línea:
            // link.href = `detail.html?project=${encodeURIComponent(slug)}`;
        }
    });
}

function updateThumbWidths() {
    const isDesktop = window.matchMedia('(min-width: 901px)').matches;
    const items = Array.from(document.querySelectorAll('.project-item'));
    if (!items.length) return;

    items.forEach(item => {
        const link = item.querySelector('.project-link');
        const img = item.querySelector('.project-thumb');
        const wrap = item.querySelector('.project-thumb-wrap');
        if (!link || !img || !wrap) return;

        if (!isDesktop) {
            link.style.removeProperty('--thumb-w');
            link.style.removeProperty('padding-left');
            return;
        }

        // Si la imagen aún no tiene dimensiones (no cargada), esperar un poco
        const rect = img.getBoundingClientRect();
        if (rect.width === 0 && rect.height === 0) {
            // reintentar después de 120ms
            setTimeout(updateThumbWidths, 120);
            return;
        }

        const paddingLeft = parseFloat(getComputedStyle(wrap).getPropertyValue('padding-left')) || 0;
        const total = Math.round(rect.width + paddingLeft);
        link.style.setProperty('--thumb-w', total + 'px');
        link.style.paddingLeft = `calc(${total}px + 1rem)`;
    });
}

/* ==========================================================================
   LIGHTBOX
   ========================================================================== */
function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    if (lightboxImg) lightboxImg.src = src || '';
    if (lightbox) {
        lightbox.style.display = 'flex';
        lightbox.setAttribute('aria-hidden', 'false');
    }
}
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    if (lightbox) {
        lightbox.style.display = 'none';
        lightbox.setAttribute('aria-hidden', 'true');
    }
    if (lightboxImg) lightboxImg.src = '';
}

/* ==========================================================================
   PROJECT DETAIL (vertical gallery) - funciones auxiliares corregidas
   ========================================================================== */

function openProjectDetail(project) {
    if (!project) return;

    // Elementos del DOM (compatibilidad con distintos IDs usados en tu HTML)
    const detailView = document.getElementById('project-detail-view') || document.getElementById('project-detail');
    const titleEl = document.getElementById('project-title') || document.getElementById('detail-title');
    const categoryEl = document.querySelector('.detail-category') || document.getElementById('detail-nav-category');
    const descEl = document.querySelector('.detail-description') || document.getElementById('detail-description');
    const creditsEl = document.getElementById('detail-credits') || document.querySelector('.detail-credits');
    const infoDl = document.getElementById('detail-info') || document.querySelector('.detail-info');
    const galleryEl = document.getElementById('detail-gallery') || document.getElementById('detail-gallery-track');
    const cta = document.getElementById('cta-contacto');

    // Rellenar campos básicos
    if (titleEl) titleEl.textContent = project.title || '';
    if (categoryEl) categoryEl.textContent = project.category || '';
    if (descEl) descEl.textContent = project.description || '';
    if (creditsEl) creditsEl.textContent = project.credits || '';

    // Rellenar metadatos (Año, Agencia/Cliente, Servicios, Créditos)
    if (infoDl) {
        infoDl.innerHTML = ''; // limpiar
        const addItem = (label, value) => {
            if (!value) return;
            const wrapper = document.createElement('div');
            wrapper.className = 'detail-info-item';
            wrapper.setAttribute('role', 'listitem');
            wrapper.innerHTML = `<dt class="detail-meta-label">${label}</dt><dd class="detail-meta-val">${value}</dd>`;
            infoDl.appendChild(wrapper);
        };
        addItem('Año', project.year || '');
        addItem('Agencia', project.agency || project.client || '');
        addItem('Servicios', project.services || '');
        addItem('Créditos', project.credits || '');
    }

    // Asegurar CTA apunte a contact.html
    if (cta) cta.setAttribute('href', 'contact.html');

    // Galería vertical: inyectar figuras apiladas
    if (galleryEl) {
        galleryEl.innerHTML = '';

        // Preferir gallery; si no existe, usar cover como fallback
        const images = (Array.isArray(project.gallery) && project.gallery.length) ? project.gallery.slice() : [];
        if (images.length === 0 && project.cover) images.push(project.cover);

        images.forEach((src, idx) => {
            const fig = document.createElement('figure');
            fig.className = 'gallery-item';

            // Añadimos tabindex al img para accesibilidad y soporte teclado
            fig.innerHTML = `
        <img src="${escapeAttr(src)}"
             alt="${escapeAttr(project.title || '')} ${images.length > 1 ? `(${idx + 1}/${images.length})` : ''}"
             loading="lazy"
             tabindex="0">
      `;

            const imgEl = fig.querySelector('img');
            if (imgEl) {
                imgEl.addEventListener('click', () => openLightbox(src));
                imgEl.addEventListener('keydown', (e) => { if (e.key === 'Enter') openLightbox(src); });
            }

            // Optional: figcaption if you later add captions to the markdown
            // const caption = project.captions && project.captions[idx];
            // if (caption) {
            //   const cap = document.createElement('figcaption');
            //   cap.textContent = caption;
            //   fig.appendChild(cap);
            // }

            galleryEl.appendChild(fig);
        });
    }

    // Mostrar el contenedor de detalle si existe (para versiones overlay)
    if (detailView) {
        detailView.classList.add('active');
        detailView.setAttribute('aria-hidden', 'false');
        // Si el detalle es overlay, bloquear scroll del body; si no, comentar esta línea
        document.body.style.overflow = 'hidden';
        // Llevar scroll del contenedor al inicio si aplica
        if (typeof detailView.scrollTop !== 'undefined') detailView.scrollTop = 0;
    }
}

function closeProjectDetail() {
    const detailView = document.getElementById('project-detail-view') || document.getElementById('project-detail');
    if (detailView) {
        detailView.classList.remove('active');
        detailView.setAttribute('aria-hidden', 'true');
    }

    // Restaurar scroll del body
    document.body.style.overflow = '';

    // Limpiar galería para liberar memoria (opcional)
    const galleryEl = document.getElementById('detail-gallery') || document.getElementById('gallery-track') || document.getElementById('detail-gallery-track');
    if (galleryEl) galleryEl.innerHTML = '';
}

/* ==========================================================================
   Nota: Asegúrate de eliminar cualquier listener que forzaba scroll horizontal
   sobre el antiguo "detailGalleryTrack" (wheel -> scrollLeft). Con la galería
   vertical ya no es necesario y debe comentarse o eliminarse.
   ========================================================================== */

/* ==========================================================================
   THEME, HERO, NOISE, REVEALS, FORM VALIDATION, ETC.
   - Mantengo tu lógica original pero asegurando que no haya duplicados
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    // Cached DOM
    const body = document.body;
    const themeSwitchBtn = document.getElementById('theme-switch-pill');
    const sunIcon = themeSwitchBtn ? themeSwitchBtn.querySelector('.sun-icon') : null;
    const moonIcon = themeSwitchBtn ? themeSwitchBtn.querySelector('.moon-icon') : null;
    const topNav = document.getElementById('top-nav') || document.querySelector('.top-nav') || null;
    const heroSection = document.getElementById('home') || document.body;
    const heroBg = document.getElementById('hero-bg');
    const heroNoiseCanvas = document.getElementById('hero-noise');

    const closeDetailBtn = document.getElementById('close-detail-btn');
    const lightboxEl = document.getElementById('lightbox');

    const contactForm = document.getElementById('contact-form');
    const inputName = document.getElementById('name');
    const inputEmail = document.getElementById('email');
    const inputPhone = document.getElementById('phone');
    const inputMessage = document.getElementById('message');
    const confirmMessage = document.getElementById('confirm-message');

    // Theme helpers
    function setThemeClassFromStorage() {
        const saved = localStorage.getItem('imprudente-theme');
        if (saved === 'day') body.classList.add('day-mode');
        else body.classList.remove('day-mode');
    }
    function updateThemeIndicatorIconsAndHeader() {
        const isDay = body.classList.contains('day-mode');
        if (sunIcon && moonIcon) {
            sunIcon.style.display = isDay ? 'block' : 'none';
            moonIcon.style.display = isDay ? 'none' : 'block';
        }
        if (themeSwitchBtn) themeSwitchBtn.setAttribute('aria-pressed', isDay ? 'true' : 'false');

        if (topNav) {
            const computed = getComputedStyle(document.body);
            let navBg = computed.getPropertyValue('--nav-bg').trim();
            if (!navBg) navBg = getComputedStyle(document.documentElement).getPropertyValue('--nav-bg').trim();
            topNav.style.backgroundColor = navBg || (isDay ? '#CDFD6C' : '#0214B6');
        }
    }

    setThemeClassFromStorage();
    updateThemeIndicatorIconsAndHeader();

    if (themeSwitchBtn) {
        themeSwitchBtn.addEventListener('click', () => {
            body.classList.toggle('day-mode');
            updateThemeIndicatorIconsAndHeader();
            localStorage.setItem('imprudente-theme', body.classList.contains('day-mode') ? 'day' : 'night');
        });
    }
    window.addEventListener('resize', updateThemeIndicatorIconsAndHeader);

    // Hero noise canvas
    const NOISE_RES = 720;
    if (heroNoiseCanvas && heroNoiseCanvas.getContext) {
        heroNoiseCanvas.width = NOISE_RES;
        heroNoiseCanvas.height = NOISE_RES;
        heroNoiseCanvas.style.width = '100%';
        heroNoiseCanvas.style.height = '100%';
        const noiseCtx = heroNoiseCanvas.getContext('2d');
        function generateHeroNoise() {
            const imageData = noiseCtx.createImageData(NOISE_RES, NOISE_RES);
            const data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
                const v = Math.floor(Math.random() * 255);
                data[i] = v; data[i + 1] = v; data[i + 2] = v; data[i + 3] = 255;
            }
            noiseCtx.putImageData(imageData, 0, 0);
        }
        setInterval(generateHeroNoise, 80);
        generateHeroNoise();
    }

    // Hero gradient animation
    let targetX = 50, targetY = 50, currentX = 50, currentY = 50, animFrameId = null;
    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            targetX = ((e.clientX - rect.left) / rect.width) * 100;
            targetY = ((e.clientY - rect.top) / rect.height) * 100;
        });
        heroSection.addEventListener('mouseleave', () => { targetX = 50; targetY = 50; });
    }
    function applyHeroGradient() {
        const computed = getComputedStyle(document.body);
        const g1 = computed.getPropertyValue('--gradient-bg-1').trim() || getComputedStyle(document.documentElement).getPropertyValue('--gradient-bg-1').trim() || '#0214B6';
        const g2 = computed.getPropertyValue('--gradient-bg-2').trim() || getComputedStyle(document.documentElement).getPropertyValue('--gradient-bg-2').trim() || '#011173';
        const g3 = computed.getPropertyValue('--gradient-bg-3').trim() || getComputedStyle(document.documentElement).getPropertyValue('--gradient-bg-3').trim() || '#000119';
        if (heroBg) heroBg.style.background = `radial-gradient(circle at ${currentX}% ${currentY}%, ${g1}, ${g2}, ${g3})`;
    }
    function animateHeroGradient() {
        currentX += (targetX - currentX) * 0.07;
        currentY += (targetY - currentY) * 0.07;
        applyHeroGradient();
        animFrameId = requestAnimationFrame(animateHeroGradient);
    }
    animateHeroGradient();

    // Lightbox handlers
    if (lightboxEl) lightboxEl.addEventListener('click', closeLightbox);
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const lightbox = document.getElementById('lightbox');
            const detailView = document.getElementById('project-detail-view');
            if (lightbox && lightbox.style.display === 'flex') closeLightbox();
            else if (detailView && detailView.classList.contains('active')) closeProjectDetail();
        }
    });

    // Contact form validation (mantengo tu lógica)
    const inputs = [inputName, inputEmail, inputPhone, inputMessage].filter(Boolean);
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            const group = document.getElementById(`group-${input.id}`);
            if (group) group.classList.remove('error');
        });
    });
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    function validatePhone(phone) {
        if (!phone) return true;
        const re = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;
        return re.test(phone) && phone.replace(/\D/g, '').length >= 7;
    }
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            if (inputName && !inputName.value.trim()) { document.getElementById('group-name').classList.add('error'); isValid = false; }
            else { const g = document.getElementById('group-name'); if (g) g.classList.remove('error'); }
            if (inputEmail && (!inputEmail.value.trim() || !validateEmail(inputEmail.value.trim()))) { document.getElementById('group-email').classList.add('error'); isValid = false; }
            else { const g = document.getElementById('group-email'); if (g) g.classList.remove('error'); }
            if (inputPhone && inputPhone.value.trim() && !validatePhone(inputPhone.value.trim())) { document.getElementById('group-phone').classList.add('error'); isValid = false; }
            else { const g = document.getElementById('group-phone'); if (g) g.classList.remove('error'); }
            if (inputMessage && !inputMessage.value.trim()) { document.getElementById('group-message').classList.add('error'); isValid = false; }
            else { const g = document.getElementById('group-message'); if (g) g.classList.remove('error'); }

            if (isValid) {
                if (confirmMessage) { confirmMessage.style.display = 'flex'; confirmMessage.setAttribute('aria-hidden', 'false'); }
                const nameVal = encodeURIComponent(inputName ? inputName.value.trim() : '');
                const emailVal = encodeURIComponent(inputEmail ? inputEmail.value.trim() : '');
                const phoneVal = encodeURIComponent(inputPhone ? (inputPhone.value.trim() || 'No proporcionado') : 'No proporcionado');
                const messageVal = encodeURIComponent(inputMessage ? inputMessage.value.trim() : '');
                const mailtoUrl = `mailto:imprudente.sw@gmail.com?subject=Contacto%20Creativo%20-%20${nameVal}&body=Hola%20Alejandro,%0D%0A%0D%0ATienes%20un%20nuevo%20mensaje%20desde%20tu%20portfolio:%0D%0A%0D%0ANombre:%20${nameVal}%0D%0AEmail:%20${emailVal}%0D%0ATeléfono:%20${phoneVal}%0D%0A%0D%0AMensaje:%0D%0A${messageVal}%0D%0A%0D%0ASaludos!`;
                setTimeout(() => {
                    window.location.href = mailtoUrl;
                    contactForm.reset();
                    setTimeout(() => {
                        if (confirmMessage) { confirmMessage.style.display = 'none'; confirmMessage.setAttribute('aria-hidden', 'true'); }
                    }, 4000);
                }, 900);
            } else {
                const firstError = document.querySelector('.form-group.error input, .form-group.error textarea');
                if (firstError) firstError.focus();
            }
        });
    }

    // Reveal on scroll
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const scrollObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);
    document.querySelectorAll('.reveal-on-scroll').forEach(el => scrollObserver.observe(el));

    // Accessibility: keyboard detection
    (function detectKeyboard() {
        function handleFirstTab(e) {
            if (e.key === 'Tab') {
                document.documentElement.classList.add('user-is-tabbing');
                window.removeEventListener('keydown', handleFirstTab);
            }
        }
        window.addEventListener('keydown', handleFirstTab);
    })();

    // Smooth scroll helpers (mantengo tu lógica)
    (function smoothScrollOnHashLoad() {
        function scrollToSectionWithOffset(selector) {
            const el = document.querySelector(selector);
            if (!el) return;
            const nav = document.querySelector('.top-nav');
            const navHeight = nav ? nav.getBoundingClientRect().height : 0;
            const rect = el.getBoundingClientRect();
            const absoluteY = window.scrollY + rect.top;
            const targetY = Math.max(0, absoluteY - navHeight - 12);
            window.scrollTo({ top: targetY, behavior: 'smooth' });
        }
        if (window.location.hash) {
            window.requestAnimationFrame(() => setTimeout(() => scrollToSectionWithOffset(window.location.hash), 80));
        }
        document.addEventListener('click', (e) => {
            const a = e.target.closest('a[href^="#"]');
            if (!a) return;
            const href = a.getAttribute('href');
            if (!href || href.length < 2) return;
            e.preventDefault();
            history.replaceState(null, '', href);
            scrollToSectionWithOffset(href);
        });
    })();

    (function samePageProjectsClick() {
        const btn = document.getElementById('nav-projects-btn');
        if (!btn) return;
        btn.addEventListener('click', function (e) {
            const href = btn.getAttribute('href') || '';
            const isHash = href.startsWith('#') || href.includes(window.location.pathname + '#') || href === `index.html#selected-work`;
            if (isHash) {
                e.preventDefault();
                const selector = href.includes('#') ? href.slice(href.indexOf('#')) : '#selected-work';
                const el = document.querySelector(selector);
                if (!el) return;
                const nav = document.querySelector('.top-nav');
                const navHeight = nav ? nav.getBoundingClientRect().height : 0;
                const rect = el.getBoundingClientRect();
                const absoluteY = window.scrollY + rect.top;
                const targetY = Math.max(0, absoluteY - navHeight - 12);
                window.scrollTo({ top: targetY, behavior: 'smooth' });
            }
        });
    })();

    // Clean up on unload
    window.addEventListener('beforeunload', () => {
        if (animFrameId) cancelAnimationFrame(animFrameId);
    });

    // Escuchar cambios de tema entre pestañas
    window.addEventListener('storage', (e) => {
        if (e.key === 'imprudente-theme') {
            setThemeClassFromStorage();
            updateThemeIndicatorIconsAndHeader();
        }
    });
});

/* ==========================================================================
   BOOTSTRAP: carga projects.md y renderiza la lista
   - Asegúrate de que projects.md exista en la ruta relativa correcta
   ========================================================================== */
(function bootstrapProjects() {
    // Añadimos cache-buster para forzar recarga al actualizar projects.md
    const ts = Date.now();
    const projectsUrl = `projects.md?ts=${ts}`;
    fetch(projectsUrl, { cache: 'no-store' })
        .then(res => {
            if (!res.ok) throw new Error(`HTTP ${res.status} - ${res.statusText}`);
            return res.text();
        })
        .then(md => {
            projects = parseProjects(md);
            console.log('Proyectos cargados:', projects);
            renderProjectList(projects);
            window.addEventListener('resize', updateThumbWidths);
        })
        .catch(err => {
            console.error('Error cargando projects.md:', err);
            // intenta renderizar mensaje de error en la lista
            const list = document.querySelector('.project-list');
            if (list) list.innerHTML = `<li class="project-empty">Error cargando proyectos.</li>`;
        });

    window.addEventListener('scroll', () => {
        const trigger = 150; // píxeles de scroll antes de desvanecer
        document.body.classList.toggle('scrolled', window.scrollY > trigger);
    });

})();