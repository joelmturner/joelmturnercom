# JSON-LD verification (SEO audit)

Recorded **2026-05-19** after audit flagged missing `application/ld+json` on three blog URLs.

## Audited blog posts (production)

| URL | `application/ld+json` | In `<head>` | `@type` |
| --- | --- | --- | --- |
| https://joelmturner.com/blog/nextjs-astro/ | yes | yes | BlogPosting |
| https://joelmturner.com/blog/react-layout-components/ | yes | yes | BlogPosting |
| https://joelmturner.com/blog/chart-parts-anatomy-of-a-chart/ | yes | yes | BlogPosting |

## How to re-check

Raw HTML (not readability/markdown extractors):

```bash
curl -sL 'https://joelmturner.com/blog/nextjs-astro/' | grep -o 'application/ld+json'
```

Browser: **View Page Source** (Cmd+Option+U), search `application/ld+json`.

Validators:

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema Markup Validator](https://validator.schema.org/)

## Audit response

Blog post JSON-LD is implemented in [`src/layouts/BlogPost.astro`](../src/layouts/BlogPost.astro) and injected into `<head>` via [`src/layouts/BaseLayout.astro`](../src/layouts/BaseLayout.astro) (`slot name="head"`). Meta-only crawlers that do not parse `<script type="application/ld+json">` may report a false negative.

## Site coverage (after follow-up)

| Route | Schema |
| --- | --- |
| Homepage | Person, WebSite |
| Blog posts | BlogPosting (+ VideoObject when frontmatter includes video) |
| TIL posts | Article |
| Illustration galleries / animation pages | ItemList, VideoObject (page-specific) |
