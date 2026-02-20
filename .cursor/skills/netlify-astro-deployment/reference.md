# Netlify Astro Reference

This reference captures the practical points to apply when implementing Astro on Netlify.

## Core Capabilities

- Astro can stay mostly static while selectively enabling dynamic server behavior.
- Netlify supports Astro server islands, SSR on demand, middleware at the edge, and image optimization flows.
- Astro projects on Netlify generally use:
  - build command: `astro build`
  - output directory: `dist`

## Adapter Guidance

### Recommended default

Use Astro's Netlify adapter for most projects:

```bash
npx astro add netlify
```

### Adapter may be optional

If the site uses no server-side Astro features and does not need adapter-backed image CDN behavior, deployment can work without the adapter.

## Rendering Strategy

- Prefer static output for pages that do not require request-time data.
- Use on-demand rendering only for routes that need personalization, sessions, or fresh dynamic data.
- Treat hybrid rendering as the default optimization path for mixed workloads.

## Images

- With the Netlify adapter, Astro `<Image />` integrates with Netlify Image CDN behavior.
- For remote images, ensure allowed domains are configured in Astro image settings.

## Local Development Parity

- With current Astro + adapter workflows, regular local dev commands are used (`astro dev` / project script).
- Netlify-related capabilities can be available locally through this path (functions/edge behavior, redirects, headers, env behavior).

## Middleware and Edge

- Astro middleware runs differently by rendering mode:
  - build-time for pre-rendered pages
  - on-demand for server-rendered pages
- On Netlify, on-demand middleware behavior is backed by edge execution paths.

## Verification Checklist

- Adapter installation aligns with rendering requirements.
- Routes intended for dynamic behavior execute on demand.
- Build and output settings match deployment expectations.
- Image behavior is correct for local and deployed environments.
- Headers/caching intent is explicitly validated on key routes.
