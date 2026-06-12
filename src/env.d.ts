/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="@astrojs/cloudflare" />

type KVNamespace = import('@cloudflare/workers-types').KVNamespace;

interface Env {
  PORTFOLIO_KV: KVNamespace;
  ADMIN_PASSWORD: string;
  SESSION_SECRET: string;
}

type Runtime = import('@astrojs/cloudflare').Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime {}
}
