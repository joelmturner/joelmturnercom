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
| Blog posts | BlogPosting (+ VideoObject when frontmatter includes video; + FAQPage when frontmatter includes `faq`) |
| TIL posts | Article |
| Illustration galleries / animation pages | ItemList, VideoObject (page-specific) |

## Content schema fields (AI search)

### Blog (`src/content/blog/`)

| Field | Purpose |
| --- | --- |
| `author` | Author name (defaults to `Joel M Turner`) — visible in UI and JSON-LD |
| `authorUrl` | Author profile URL (defaults to site URL) |
| `date` | Publish date — rendered as `<time datetime="...">` via `PostMeta` |
| `lastmod` | Update date — shown when later than `date`; drives `dateModified` in JSON-LD |
| `faq` | Optional array of `{ question, answer }` — renders FAQ section + FAQPage JSON-LD |

Set `lastmod` in frontmatter whenever you materially update a post.

### TIL (`src/content/til/`)

| Field | Purpose |
| --- | --- |
| `question` | Explicit question shown below the title (AI-friendly lead) |
| `summary` | One-paragraph direct answer before the detail sections |
| `description` | Meta description and JSON-LD fallback |
| `author`, `authorUrl`, `date`, `lastmod` | Same as blog — rendered via `PostMeta` |

## Visible metadata

Author and dates render via [`src/components/PostMeta.astro`](../src/components/PostMeta.astro) on blog and TIL post pages, and in compact form on list cards (`PostCard`, `TilPostCard`). Each date uses `<time datetime="...">` through `FormattedDate`.

## FAQ JSON-LD

When a blog post includes `faq` frontmatter, [`src/layouts/BlogPost.astro`](../src/layouts/BlogPost.astro) emits a second `FAQPage` block via `faqPageSchema()` in [`src/lib/seo/jsonLd.ts`](../src/lib/seo/jsonLd.ts).

Re-check on a post with FAQ:

```bash
curl -sL 'https://joelmturner.com/blog/<slug>/' | grep -c 'FAQPage'
```

## AI crawler access (`robots.txt`)

[`public/robots.txt`](../public/robots.txt) allows all crawlers (`User-agent: *` / `Allow: /`). GPTBot, ClaudeBot, and PerplexityBot are **not disallowed**. LLM discovery is also linked via `LLM summary: https://joelmturner.com/llms.txt`.
