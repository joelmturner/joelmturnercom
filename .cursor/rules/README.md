# Cursor rules for this repo

## Canonical stack (read these first)

1. Root **[AGENTS.md](../../AGENTS.md)** — commands, `src/` map, content collections, env.
2. Numbered rules in this folder: **`01-project-overview.mdc`** through **`05-astro-typescript-tailwind-conventions.mdc`** (always applied).

## Additional scoped rules

| File | When it applies |
| ---- | ---------------- |
| `astro-patterns.mdc` | Pages, layouts, components, and markdown under `src/content/` |
| `astro-config.mdc` | Editing `astro.config.mjs` |
| `a11y-seo.mdc` | Astro templates under `src/` |
| `testing.mdc` | Files under `tests/` |

Styling specifics: **`03-styling-guide.mdc`** and **`global.css`** (Tailwind v4, no `@apply` in this project).
