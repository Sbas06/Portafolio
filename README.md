# Portafolio Sbas — Coastal Steampunk 8-bit

Pixel-art portfolio for Juan Sebastián Arboleda T., built with **Astro** + **Cloudflare Workers** + a self-hosted mini CMS backed by **Cloudflare KV**.

---

## Stack

| Layer       | Tech                                   |
|-------------|----------------------------------------|
| Framework   | Astro 4 (SSR, `output: 'server'`)      |
| Deploy      | Cloudflare Workers via Wrangler 3      |
| Persistence | Cloudflare KV (projects + experience)  |
| Auth        | Cookie session + KV TTL (24 h)         |
| Fonts       | Press Start 2P + VT323 (Google Fonts)  |
| CSS         | Pure CSS — no Tailwind                 |

---

## Quick start (local dev)

```bash
# 1. Install dependencies
npm install

# 2. Start Astro dev server (uses in-memory KV fallback)
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) for the portfolio and [http://localhost:4321/admin/login](http://localhost:4321/admin/login) for the admin.

> In dev mode without Wrangler the KV reads default data and auth accepts any password that matches the `ADMIN_PASSWORD` env var (default: `"admin"`).

---

## Deploy to Cloudflare Workers

### 1. Create a KV namespace

```bash
npx wrangler kv:namespace create PORTFOLIO_KV
```

Copy the returned `id` and paste it in `wrangler.toml`:

```toml
[[kv_namespaces]]
binding = "PORTFOLIO_KV"
id = "PASTE_YOUR_ID_HERE"
```

### 2. Set secrets

```bash
npx wrangler secret put ADMIN_PASSWORD
# → Enter a strong password when prompted

npx wrangler secret put SESSION_SECRET
# → Enter a random string (e.g. openssl rand -hex 32)
```

> Never commit passwords to `wrangler.toml`. Use `wrangler secret put`.

### 3. Build & deploy

```bash
npm run deploy
# equivalent to: astro build && wrangler deploy
```

Wrangler will upload `dist/_worker.js` and all static assets. Your site is live at the Workers route shown in the output.

### 4. Custom domain (optional)

In the Cloudflare dashboard → Workers & Pages → your worker → Triggers → Add Custom Domain.

---

## Admin CMS

| Path                            | Description                    |
|---------------------------------|--------------------------------|
| `/admin/login`                  | Login (password from secret)   |
| `/admin`                        | Dashboard with stats           |
| `/admin/projects`               | List / delete projects         |
| `/admin/projects/new`           | Create project                 |
| `/admin/projects/[id]`          | Edit / delete project          |
| `/admin/experience`             | List / delete experience rows  |
| `/admin/experience/new`         | Add experience entry           |
| `/admin/experience/[id]`        | Edit / delete experience entry |

All `/admin/*` routes are protected by an `HttpOnly` session cookie verified against KV on every request. Sessions expire after 24 hours.

---

## Data model

### Project

```typescript
{
  id: string;          // unique slug, e.g. "shopify"
  no: string;          // card number "01"–"06"
  order: number;       // sort order
  visible: boolean;    // show in portfolio
  year: string;        // "2024 — NOW"
  kicker: string;      // "E-COMMERCE · SHOPIFY"
  title: string;       // "SHOPIFY THEME LAB"
  meta: string;        // "Dev @ Company"
  oneliner: string;    // card one-liner
  lede: string;        // full description (popup sheet)
  ph: string;          // screenshot placeholder
  highlights: [string, string][];  // [[label, desc], ...]
  stack: [string, string][];       // [[name, cssClass], ...]
  demoUrl?: string;
  codeUrl?: string;
  emblemStyle?: string; // inline CSS for emblem background
}
```

### ExperienceEntry

```typescript
{
  id: string;          // unique slug, e.g. "e9"
  order: number;       // sort order
  lvl: string;         // "L9"
  role: string;        // "SYSTEM ADMINISTRATOR"
  subrole: string;     // short description
  company: string;     // "ROP St DigitALL"
  dates: string;       // "2026 — NOW"
  status: 'active' | 'done' | 'archive';
}
```

KV keys: `projects` (JSON array), `experience` (JSON array), `session:<token>` (TTL 86400).

---

## Local dev with Wrangler (full KV simulation)

```bash
# Run through Wrangler for real KV simulation
npx wrangler pages dev ./dist --kv PORTFOLIO_KV
```

Or use `wrangler dev` after building:

```bash
npm run build
npx wrangler dev
```

---

## Project structure

```
portafolio-sbas/
├── src/
│   ├── env.d.ts                  # Cloudflare env types
│   ├── middleware.ts              # Auth guard for /admin
│   ├── lib/
│   │   ├── types.ts              # Project / ExperienceEntry types
│   │   ├── kv.ts                 # KV getters/setters + defaults
│   │   └── auth.ts               # Session create/validate/delete
│   ├── styles/
│   │   ├── portfolio.css         # Full pixel-art design system
│   │   └── admin.css             # Admin panel styles
│   ├── layouts/
│   │   ├── Layout.astro          # Portfolio layout (fonts + CSS)
│   │   └── AdminLayout.astro     # Admin layout (sidebar + topbar)
│   └── pages/
│       ├── index.astro           # Main portfolio (SSR from KV)
│       └── admin/
│           ├── login.astro
│           ├── logout.ts
│           ├── index.astro       # Dashboard
│           ├── projects/
│           │   ├── index.astro
│           │   ├── new.astro
│           │   └── [id].astro
│           └── experience/
│               ├── index.astro
│               ├── new.astro
│               └── [id].astro
├── public/
│   └── portfolio.js              # Parallax + project sheet JS
├── astro.config.mjs
├── wrangler.toml
├── package.json
├── tsconfig.json
└── README.md
```
