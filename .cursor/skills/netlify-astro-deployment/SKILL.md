---
name: netlify-astro-deployment
description: Implements and validates Astro deployments on Netlify, including adapter setup, static versus on-demand rendering decisions, image CDN considerations, and local parity checks. Use when users ask about deploying Astro to Netlify, enabling SSR/functions/middleware on Netlify, configuring Astro's Netlify adapter, or troubleshooting Netlify Astro build/runtime behavior.
---

# Netlify Astro Deployment

## Quick Start

Use this skill when the task involves Astro + Netlify deployment setup, migration, or troubleshooting.

1. Identify rendering needs:
   - purely static pages: adapter is optional
   - any server-side features: adapter required
2. If adapter is needed, run:
   - `npx astro add netlify`
3. Confirm build defaults:
   - build command: `astro build`
   - output directory: `dist`
4. Validate behavior locally with normal Astro dev commands:
   - `pnpm dev` (or project-equivalent)
5. Verify deployment-sensitive features:
   - functions/SSR routes
   - middleware behavior
   - image handling via Astro `<Image />`

## Decision Flow

### Static-only site

- Keep default static generation.
- Adapter can be skipped unless project needs Netlify Image CDN integration through Astro image features.

### Site needs dynamic behavior

- Install and configure Netlify adapter.
- Use Astro on-demand rendering only where required.
- Keep other pages static for performance.

## Implementation Guidelines

- Prefer `npx astro add netlify` over manual config edits unless user requests manual control.
- Preserve existing Astro config patterns; only change what is necessary for deployment behavior.
- Do not introduce SSR globally unless requirements clearly need it.
- When touching images, verify remote image domain authorization if external sources are used.
- For middleware/server behavior, confirm the affected routes actually execute on-demand.

## Troubleshooting Pattern

When debugging Netlify + Astro issues:

1. classify issue: build-time, deploy-time, or runtime
2. verify adapter presence and Astro config consistency
3. verify route rendering mode (static vs on-demand)
4. verify environment assumptions in local dev and deploy context
5. confirm headers/caching intent when behavior differs by environment

## Response Format

When assisting the user, present:

- chosen architecture path (static-only vs hybrid/on-demand)
- exact config/command changes
- short verification plan (local + deployed behavior)
- risks or follow-up checks

## Additional Resources

- Netlify Astro reference: see [reference.md](reference.md)
