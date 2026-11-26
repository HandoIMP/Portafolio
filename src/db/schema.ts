import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  passwordHash: text('password_hash').notNull(),
  createdAt: text('created_at').notNull(),
});

export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expiresAt: text('expires_at').notNull(),
  createdAt: text('created_at').notNull(),
});

export const projects = sqliteTable('projects', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  client: text('client').notNull(),
  year: text('year').notNull(),
  disciplines: text('disciplines').notNull(), // JSON array of strings
  summary: text('summary').notNull().default(''),
  services: text('services').notNull().default(''),
  agency: text('agency').notNull().default('Imprudente Dept. Creativo'),
  credits: text('credits').notNull().default(''),
  coverMediaUrl: text('cover_media_url').notNull(),
  coverType: text('cover_type', { enum: ['image', 'video'] }).notNull().default('image'),
  contentBlocks: text('content_blocks').notNull().default('[]'), // JSON array of blocks
  featured: integer('featured', { mode: 'boolean' }).notNull().default(false),
  sortOrder: integer('sort_order').notNull().default(0),
  published: integer('published', { mode: 'boolean' }).notNull().default(true),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const teamMembers = sqliteTable('team_members', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  role: text('role').notNull(),
  bioShort: text('bio_short').notNull(),
  photoUrl: text('photo_url').notNull(),
  rotationDeg: integer('rotation_deg').notNull().default(0),
  sortOrder: integer('sort_order').notNull().default(0),
});

export const brands = sqliteTable('brands', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  logoSvgOrUrl: text('logo_svg_or_url').notNull().default(''),
  sortOrder: integer('sort_order').notNull().default(0),
});

export const services = sqliteTable('services', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description').notNull(),
  previewMediaUrl: text('preview_media_url').notNull().default(''),
  sortOrder: integer('sort_order').notNull().default(0),
});

export const blogPosts = sqliteTable('blog_posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  excerpt: text('excerpt').notNull(),
  seoTitle: text('seo_title').notNull(),
  seoDescription: text('seo_description').notNull(),
  coverUrl: text('cover_url').notNull().default(''),
  contentMarkdown: text('content_markdown').notNull(),
  status: text('status', { enum: ['draft', 'published'] }).notNull().default('draft'),
  publishedAt: text('published_at'),
  updatedAt: text('updated_at').notNull(),
});

export const crmLeads = sqliteTable('crm_leads', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull().default(''),
  company: text('company').notNull().default(''),
  serviceInterest: text('service_interest').notNull().default(''),
  budgetRange: text('budget_range').notNull().default(''),
  message: text('message').notNull(),
  status: text('status', {
    enum: ['Nuevo', 'Contactado', 'En Propuesta', 'Cerrado', 'Descartado'],
  })
    .notNull()
    .default('Nuevo'),
  internalNotes: text('internal_notes').notNull().default(''),
  sourcePage: text('source_page').notNull().default('/contacto'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const siteSettings = sqliteTable('site_settings', {
  key: text('key').primaryKey(),
  value: text('value').notNull(),
  updatedAt: text('updated_at').notNull(),
});
