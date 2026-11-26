import { asc, desc, eq } from 'drizzle-orm';
import type { Database } from '../db';
import { blogPosts, brands, projects, services, siteSettings, teamMembers } from '../db/schema';

export interface ContentBlock {
  type: 'text' | 'image' | 'video';
  heading?: string;
  body?: string;
  url?: string;
  caption?: string;
}

export interface ParsedProject {
  id: number;
  slug: string;
  title: string;
  client: string;
  year: string;
  disciplines: string[];
  summary: string;
  services: string;
  agency: string;
  credits: string;
  coverMediaUrl: string;
  coverType: 'image' | 'video';
  contentBlocks: ContentBlock[];
  featured: boolean;
  sortOrder: number;
  published: boolean;
}

function safeJsonArray<T>(raw: string, fallback: T[]): T[] {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : fallback;
  } catch {
    return fallback;
  }
}

function mapProject(row: typeof projects.$inferSelect): ParsedProject {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    client: row.client,
    year: row.year,
    disciplines: safeJsonArray<string>(row.disciplines, []),
    summary: row.summary,
    services: row.services,
    agency: row.agency,
    credits: row.credits,
    coverMediaUrl: row.coverMediaUrl,
    coverType: row.coverType,
    contentBlocks: safeJsonArray<ContentBlock>(row.contentBlocks, []),
    featured: Boolean(row.featured),
    sortOrder: row.sortOrder,
    published: Boolean(row.published),
  };
}

export const FALLBACK_HOME_DATA = {
  projects: [] as ParsedProject[],
  team: [
    {
      id: 1,
      name: 'Alejandro',
      role: 'Fundador & Director Creativo',
      bioShort:
        'Diseñador interdisciplinario en Sonora. Enfocado en marcas con carácter propio y ejecución honesta.',
      photoUrl: '/assets-general/DigiCam.webp',
      rotationDeg: -2,
      sortOrder: 1,
    },
    {
      id: 2,
      name: 'Nuestro Proceso',
      role: 'De la idea al sistema visual',
      bioShort:
        'Investigación, bocetaje, producción visual y fotografía cuidando cada punto de contacto.',
      photoUrl: '/assets-general/5x7-win-in-silence.webp',
      rotationDeg: 2,
      sortOrder: 2,
    },
  ],
  brands: [
    { id: 1, name: 'ISH', logoSvgOrUrl: '', sortOrder: 1 },
    { id: 2, name: 'HC Construcción', logoSvgOrUrl: '', sortOrder: 2 },
    { id: 3, name: 'Electromecánica San Carlos', logoSvgOrUrl: '', sortOrder: 3 },
    { id: 4, name: 'NaluExperience', logoSvgOrUrl: '', sortOrder: 4 },
    { id: 5, name: 'Las Luchas', logoSvgOrUrl: '', sortOrder: 5 },
    { id: 6, name: 'Quick Lift', logoSvgOrUrl: '', sortOrder: 6 },
  ],
  services: [
    {
      id: 1,
      title: 'Diseño de logotipo',
      description: 'Identidades memorables, versátiles y con personalidad propia.',
      previewMediaUrl: '/projects/hcconstruccion/cover.webp',
      sortOrder: 1,
    },
    {
      id: 2,
      title: 'Producción visual',
      description: 'Dirección creativa y sistemas visuales para medios digitales e impresos.',
      previewMediaUrl: '/projects/electromecanicasc/cover.webp',
      sortOrder: 2,
    },
    {
      id: 3,
      title: 'Fotografía',
      description: 'Sesiones de producto, marca y contenido editorial con intención estética.',
      previewMediaUrl: '/projects/lasluchas/03.webp',
      sortOrder: 3,
    },
    {
      id: 4,
      title: 'Páginas web',
      description: 'Experiencias web rápidas, claras y hechas a la medida de tu marca.',
      previewMediaUrl: '/projects/quicklift/cover.webp',
      sortOrder: 4,
    },
  ],
  settings: {} as Record<string, string>,
};

export async function getHomeData(db: Database | null) {
  if (!db) return FALLBACK_HOME_DATA;
  try {
    const [projectRows, teamRows, brandRows, serviceRows, settingRows] = await Promise.all([
      db
        .select()
        .from(projects)
        .where(eq(projects.published, true))
        .orderBy(asc(projects.sortOrder), desc(projects.id)),
      db.select().from(teamMembers).orderBy(asc(teamMembers.sortOrder), asc(teamMembers.id)),
      db.select().from(brands).orderBy(asc(brands.sortOrder), asc(brands.id)),
      db.select().from(services).orderBy(asc(services.sortOrder), asc(services.id)),
      db.select().from(siteSettings),
    ]);

    const settings: Record<string, string> = {};
    for (const row of settingRows) {
      settings[row.key] = row.value;
    }

    return {
      projects: projectRows.map(mapProject),
      team: teamRows.length > 0 ? teamRows : FALLBACK_HOME_DATA.team,
      brands: brandRows.length > 0 ? brandRows : FALLBACK_HOME_DATA.brands,
      services: serviceRows.length > 0 ? serviceRows : FALLBACK_HOME_DATA.services,
      settings,
    };
  } catch {
    return FALLBACK_HOME_DATA;
  }
}

export async function getProjectBySlug(db: Database | null, slug: string) {
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

export async function getOtherProjects(db: Database | null, excludeSlug: string, limit = 3) {
  if (!db) return [];
  try {
    const rows = await db
      .select()
      .from(projects)
      .where(eq(projects.published, true))
      .orderBy(asc(projects.sortOrder), desc(projects.id));
    return rows.filter((p) => p.slug !== excludeSlug).slice(0, limit).map(mapProject);
  } catch {
    return [];
  }
}

export async function getPublishedBlogPosts(db: Database | null) {
  if (!db) return [];
  try {
    return await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.status, 'published'))
      .orderBy(desc(blogPosts.publishedAt), desc(blogPosts.id));
  } catch {
    return [];
  }
}

export async function getBlogPostBySlug(db: Database | null, slug: string) {
  if (!db) return null;
  try {
    const rows = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
    const row = rows[0];
    if (!row || row.status !== 'published') return null;
    return row;
  } catch {
    return null;
  }
}
