import { execFileSync } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const isRemote = process.argv.includes('--remote');
const targetFlag = isRemote ? '--remote' : '--local';

function loadDevVars() {
  const varsPath = path.resolve('.dev.vars');
  const envVars = {};
  if (!fs.existsSync(varsPath)) return envVars;
  const content = fs.readFileSync(varsPath, 'utf8');
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim();
    envVars[key] = val;
  }
  return envVars;
}

function ensureLocalDevVars() {
  const varsPath = path.resolve('.dev.vars');
  if (fs.existsSync(varsPath) || isRemote) return null;

  const password = crypto.randomBytes(12).toString('base64url');
  const secret = crypto.randomBytes(32).toString('hex');
  const content = [
    'ADMIN_EMAIL=Imprudente.sw@gmail.com',
    `ADMIN_INITIAL_PASSWORD=${password}`,
    `SESSION_SECRET=${secret}`,
    'TURNSTILE_SITE_KEY=1x00000000000000000000AA',
    'TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA',
    'R2_PUBLIC_URL=/api/media',
    '',
  ].join('\n');

  fs.writeFileSync(varsPath, content, 'utf8');
  return { email: 'Imprudente.sw@gmail.com', password };
}

async function hashPassword(password) {
  const iterations = 100_000;
  const salt = crypto.randomBytes(16);
  const keyMaterial = await crypto.webcrypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );
  const derived = await crypto.webcrypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations, hash: 'SHA-256' },
    keyMaterial,
    256
  );
  const saltHex = salt.toString('hex');
  const hashHex = Buffer.from(derived).toString('hex');
  return `pbkdf2$${iterations}$${saltHex}$${hashHex}`;
}

function sqlStr(value) {
  return `'${String(value).replace(/'/g, "''")}'`;
}

async function main() {
  const generated = ensureLocalDevVars();
  const devVars = loadDevVars();
  const adminEmail = process.env.ADMIN_EMAIL || devVars.ADMIN_EMAIL || 'Imprudente.sw@gmail.com';
  const adminPassword = process.env.ADMIN_INITIAL_PASSWORD || devVars.ADMIN_INITIAL_PASSWORD;

  if (!adminPassword) {
    throw new Error('Define ADMIN_INITIAL_PASSWORD en .dev.vars o variables de entorno antes de ejecutar seed.');
  }

  const now = new Date().toISOString();
  const passwordHash = await hashPassword(adminPassword);

  const initialProjects = [
    {
      slug: 'electromecanicasc',
      title: 'Electromecánica San Carlos',
      client: 'Electromecánica San Carlos',
      year: '2024',
      disciplines: ['Branding', 'Identidad Visual'],
      summary:
        'Rediseño corporativo y aplicaciones de marca para taller en San Carlos, Nuevo Guaymas.',
      services: 'Rebranding y aplicaciones de marca',
      agency: 'Imprudente Dept. Creativo',
      credits: 'Brand Identity & Strategy: Alejandro',
      coverMediaUrl: '/projects/electromecanicasc/cover.webp',
      coverType: 'image',
      contentBlocks: [
        {
          type: 'text',
          heading: 'Enfoque del proyecto',
          body: 'Actualización de la identidad visual con un enfoque contemporáneo. Se desarrollaron aplicaciones de marca consistentes para comunicación interna y externa, fortaleciendo la presencia del taller en su comunidad.',
        },
        { type: 'image', url: '/projects/electromecanicasc/02.webp', caption: 'Sistema de identidad visual' },
        { type: 'image', url: '/projects/electromecanicasc/03.webp', caption: 'Aplicaciones gráficas' },
        { type: 'image', url: '/projects/electromecanicasc/04.webp', caption: 'Papelería y comunicación' },
        { type: 'image', url: '/projects/electromecanicasc/05.webp', caption: 'Implementación de marca' },
      ],
      featured: 1,
      sortOrder: 1,
    },
    {
      slug: 'hcconstruccion',
      title: 'HC Construcción',
      client: 'HC Construcción',
      year: '2025',
      disciplines: ['Branding', 'Identidad Corporativa'],
      summary:
        'Identidad corporativa y estrategia visual para constructora en Guaymas, Sonora.',
      services: 'Branding corporativo y estrategia visual',
      agency: 'Imprudente Dept. Creativo',
      credits: 'Dirección y ejecución: Alejandro — Imprudente',
      coverMediaUrl: '/projects/hcconstruccion/cover.webp',
      coverType: 'image',
      contentBlocks: [
        {
          type: 'text',
          heading: 'Sistema visual',
          body: 'Creación de una identidad limpia y original, con sistema visual coherente y adaptable. Se diseñaron lineamientos gráficos y aplicaciones que transmiten confianza y profesionalismo en el sector de la construcción.',
        },
        { type: 'image', url: '/projects/hcconstruccion/01.webp', caption: 'Construcción de logotipo' },
        { type: 'image', url: '/projects/hcconstruccion/02.webp', caption: 'Aplicaciones corporativas' },
        { type: 'image', url: '/projects/hcconstruccion/03.webp', caption: 'Señalética e identidad' },
        { type: 'image', url: '/projects/hcconstruccion/04.webp', caption: 'Guía visual' },
      ],
      featured: 1,
      sortOrder: 2,
    },
    {
      slug: 'quicklift',
      title: 'Quick Lift',
      client: 'Quick Lift Single Moving Services',
      year: '2026',
      disciplines: ['Branding', 'Diseño Web'],
      summary: 'Diseño de logotipo, dirección creativa y UI para sitio web.',
      services: 'Branding y diseño UI/UX',
      agency: 'Imprudente Dept. Creativo',
      credits: 'Brand Identity & Strategy: Alejandro',
      coverMediaUrl: '/projects/quicklift/cover.webp',
      coverType: 'image',
      contentBlocks: [
        {
          type: 'text',
          heading: 'Identidad y experiencia digital',
          body: 'Creación de logotipo y dirección creativa aplicada al diseño de interfaz de usuario. Se implementaron interacciones y detalles visuales que enriquecen la experiencia digital y refuerzan la identidad de la marca.',
        },
        { type: 'image', url: '/projects/quicklift/01.webp', caption: 'Logotipo y lenguaje visual' },
        { type: 'image', url: '/projects/quicklift/02.webp', caption: 'Interfaz web' },
        { type: 'image', url: '/projects/quicklift/03.webp', caption: 'Componentes digitales' },
        { type: 'image', url: '/projects/quicklift/04.webp', caption: 'Sistema de color y tipografía' },
      ],
      featured: 1,
      sortOrder: 3,
    },
    {
      slug: 'lasluchas',
      title: 'Las Luchas',
      client: 'Taquería Las Luchas',
      year: '2024',
      disciplines: ['Branding', 'Fotografía'],
      summary: 'Logotipo e identidad visual con trazos orgánicos.',
      services: 'Diseño de logotipo e identidad visual',
      agency: 'Imprudente Dept. Creativo',
      credits: 'Brand Identity & Strategy: Alejandro',
      coverMediaUrl: '/projects/lasluchas/cover.webp',
      coverType: 'image',
      contentBlocks: [
        {
          type: 'text',
          heading: 'Trazos orgánicos y fotografía',
          body: 'Diseño de logotipo y sistema gráfico que combina técnicas tradicionales con procesos digitales. Se complementó con fotografía y creación de contenido, logrando una identidad auténtica y versátil.',
        },
        { type: 'image', url: '/projects/lasluchas/01.webp', caption: 'Identidad principal' },
        { type: 'image', url: '/projects/lasluchas/02.webp', caption: 'Aplicaciones gráficas' },
        { type: 'image', url: '/projects/lasluchas/03.webp', caption: 'Fotografía de marca' },
        { type: 'image', url: '/projects/lasluchas/04.webp', caption: 'Material impreso' },
      ],
      featured: 1,
      sortOrder: 4,
    },
  ];

  const initialTeam = [
    {
      name: 'Alejandro',
      role: 'Fundador & Director Creativo',
      bioShort:
        'Diseñador interdisciplinario en Sonora. Enfocado en marcas con carácter propio, detalle artesanal y ejecución honesta.',
      photoUrl: '/assets-general/DigiCam.webp',
      rotationDeg: -2,
      sortOrder: 1,
    },
    {
      name: 'Nuestro Proceso',
      role: 'De la idea al sistema visual',
      bioShort:
        'Investigación, bocetaje, producción visual y fotografía cuidando cada punto de contacto de tu marca.',
      photoUrl: '/assets-general/5x7-win-in-silence.webp',
      rotationDeg: 2,
      sortOrder: 2,
    },
  ];

  const initialBrands = [
    'ISH',
    'HC Construcción',
    'Electromecánica San Carlos',
    'NaluExperience',
    'Las Luchas',
    'Mint Moving',
    'Quick Lift',
    'Alugama / Go Glass',
  ];

  const initialServices = [
    {
      title: 'Diseño de logotipo',
      description:
        'Identidades memorables, versátiles y con personalidad propia listas para crecer con tu negocio.',
      previewMediaUrl: '/projects/hcconstruccion/cover.webp',
      sortOrder: 1,
    },
    {
      title: 'Producción visual',
      description:
        'Dirección creativa, piezas gráficas y sistemas visuales coherentes para medios digitales e impresos.',
      previewMediaUrl: '/projects/electromecanicasc/cover.webp',
      sortOrder: 2,
    },
    {
      title: 'Fotografía',
      description:
        'Sesiones de producto, marca y contenido editorial con intención estética para comunicar autenticidad.',
      previewMediaUrl: '/projects/lasluchas/03.webp',
      sortOrder: 3,
    },
    {
      title: 'Páginas web',
      description:
        'Diseño y desarrollo de experiencias web rápidas, claras y hechas a la medida de tu marca.',
      previewMediaUrl: '/projects/quicklift/cover.webp',
      sortOrder: 4,
    },
  ];

  const statements = [
    `INSERT INTO users (email, name, password_hash, created_at)
     VALUES (${sqlStr(adminEmail)}, 'Alejandro', ${sqlStr(passwordHash)}, ${sqlStr(now)})
     ON CONFLICT(email) DO UPDATE SET password_hash = excluded.password_hash;`,
  ];

  for (const p of initialProjects) {
    statements.push(`INSERT INTO projects (
      slug, title, client, year, disciplines, summary, services, agency, credits,
      cover_media_url, cover_type, content_blocks, featured, sort_order, published, created_at, updated_at
    ) VALUES (
      ${sqlStr(p.slug)}, ${sqlStr(p.title)}, ${sqlStr(p.client)}, ${sqlStr(p.year)},
      ${sqlStr(JSON.stringify(p.disciplines))}, ${sqlStr(p.summary)}, ${sqlStr(p.services)},
      ${sqlStr(p.agency)}, ${sqlStr(p.credits)}, ${sqlStr(p.coverMediaUrl)}, ${sqlStr(p.coverType)},
      ${sqlStr(JSON.stringify(p.contentBlocks))}, ${p.featured}, ${p.sortOrder}, 1, ${sqlStr(now)}, ${sqlStr(now)}
    ) ON CONFLICT(slug) DO NOTHING;`);
  }

  statements.push(`INSERT INTO team_members (id, name, role, bio_short, photo_url, rotation_deg, sort_order)
    SELECT 1, ${sqlStr(initialTeam[0].name)}, ${sqlStr(initialTeam[0].role)}, ${sqlStr(initialTeam[0].bioShort)}, ${sqlStr(initialTeam[0].photoUrl)}, ${initialTeam[0].rotationDeg}, 1
    WHERE NOT EXISTS (SELECT 1 FROM team_members);`);
  statements.push(`INSERT INTO team_members (id, name, role, bio_short, photo_url, rotation_deg, sort_order)
    SELECT 2, ${sqlStr(initialTeam[1].name)}, ${sqlStr(initialTeam[1].role)}, ${sqlStr(initialTeam[1].bioShort)}, ${sqlStr(initialTeam[1].photoUrl)}, ${initialTeam[1].rotationDeg}, 2
    WHERE (SELECT COUNT(*) FROM team_members) < 2;`);

  initialBrands.forEach((brandName, idx) => {
    statements.push(`INSERT INTO brands (id, name, logo_svg_or_url, sort_order)
      SELECT ${idx + 1}, ${sqlStr(brandName)}, '', ${idx + 1}
      WHERE NOT EXISTS (SELECT 1 FROM brands WHERE name = ${sqlStr(brandName)});`);
  });

  initialServices.forEach((srv, idx) => {
    statements.push(`INSERT INTO services (id, title, description, preview_media_url, sort_order)
      SELECT ${idx + 1}, ${sqlStr(srv.title)}, ${sqlStr(srv.description)}, ${sqlStr(srv.previewMediaUrl)}, ${srv.sortOrder}
      WHERE NOT EXISTS (SELECT 1 FROM services WHERE title = ${sqlStr(srv.title)});`);
  });

  const tmpDir = path.resolve('.wrangler');
  fs.mkdirSync(tmpDir, { recursive: true });
  const sqlFile = path.join(tmpDir, 'seed.generated.sql');
  fs.writeFileSync(sqlFile, statements.join('\n\n'), 'utf8');

  const wranglerBin = path.resolve('node_modules/wrangler/bin/wrangler.js');
  execFileSync(process.execPath, [wranglerBin, 'd1', 'execute', 'DB', targetFlag, '--file', sqlFile], {
    stdio: 'inherit',
  });

  fs.unlinkSync(sqlFile);
  console.log(`\nSeed ejecutado correctamente en modo ${isRemote ? 'REMOTO' : 'LOCAL'}.`);
  if (generated) {
    console.log('Se creó .dev.vars local con tus credenciales iniciales:');
    console.log(`  Email: ${generated.email}`);
    console.log(`  Password: ${generated.password}`);
  } else {
    console.log(`Admin configurado: ${adminEmail}`);
  }
}

main().catch((err) => {
  console.error('Error en seed:', err);
  process.exit(1);
});
