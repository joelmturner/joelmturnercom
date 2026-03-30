# Agent guide

This repo is [joelmturner.com](https://joelmturner.com): **Astro 6**, **TypeScript**, **Tailwind CSS 4** (via `@tailwindcss/vite`), deployed on **Netlify**. Package manager: **pnpm** (see `.nvmrc` for Node).

## Commands

- `pnpm dev` — local dev (default: http://localhost:4321)
- `pnpm build` — `astro check` + production build
- `pnpm preview` — preview production build
- `pnpm lint` / `pnpm format` / `pnpm check` — Biome (see `package.json`)

## Where to put code

- **Routes** → `src/pages/` (Astro file-based routing)
- **Reusable UI** → `src/components/`
- **Layouts** → `src/layouts/`
- **Shared logic** → `src/lib/`
- **Markdown/MDX content** → `src/content/`
- **Collection schemas & loaders** → [`src/content.config.ts`](src/content.config.ts)
- **Global styles & theme** → `src/styles/` (tokens in `global.css`)

Path aliases: `@components/*`, `@layouts/*`, `@lib/*` (see `tsconfig.json`).

## Site copy vs nav data

- **Site title / default description** → [`src/lib/site.ts`](src/lib/site.ts) (also re-exported from [`src/consts.ts`](src/consts.ts) for compatibility)
- **Nav, projects, illustration filters, social links** → [`src/lib/constants.ts`](src/lib/constants.ts)

## Content collections

| Collection     | Role                                      |
| -------------- | ----------------------------------------- |
| `blog`         | Blog posts (`src/content/blog`)           |
| `til`          | TIL posts (`src/content/til`)             |
| `illustration` | Cloudinary image assets                   |
| `video`        | Cloudinary videos (`illustration-videos`) |
| `zines`        | Zine entries (`src/content/zines`)        |
| `animations`   | Animation embeds (`src/content/animations`) |

## Environment

- **`PUBLIC_CLOUDINARY_CLOUD_NAME`** — public Cloudinary cloud name (gallery and image URLs). Fallback in code may use `joelmturner` when unset.
- Add other `PUBLIC_*` or secrets as needed for integrations; see Astro docs for `import.meta.env`.

## Conventions

Detailed project rules live in **`.cursor/rules/`**. Start with `01-project-overview.mdc` through `05-astro-typescript-tailwind-conventions.mdc`, then any additional scoped rules listed in `.cursor/rules/README.md`.
