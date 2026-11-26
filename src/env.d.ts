/// <reference types="astro/client" />
/// <reference types="@cloudflare/workers-types" />

declare namespace App {
  interface Locals {
    runtime: {
      env: {
        DB: D1Database;
        MEDIA: R2Bucket;
        ASSETS: Fetcher;
        ADMIN_EMAIL?: string;
        ADMIN_INITIAL_PASSWORD?: string;
        SESSION_SECRET?: string;
        TURNSTILE_SITE_KEY?: string;
        TURNSTILE_SECRET_KEY?: string;
        R2_PUBLIC_URL?: string;
      };
      ctx: ExecutionContext;
    };
    user?: {
      id: number;
      email: string;
      name: string;
    } | null;
  }
}
