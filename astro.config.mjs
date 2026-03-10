import fs from 'node:fs'
import path from 'node:path'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import sentry from '@sentry/astro'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, fontProviders } from 'astro/config'
import astroExpressiveCode from 'astro-expressive-code'
import icon from 'astro-icon'
import { loadEnv } from 'vite'

/** build pathname -> lastmod map from blog and til content frontmatter (for sitemap lastmod) */
function getContentLastmodMap() {
  const map = new Map()
  const contentDir = path.join(process.cwd(), 'src', 'content')
  const lastmodRe = /lastmod:\s*["']?([^"'\s\n\r]+)["']?/
  const slugRe = /slug:\s*["']?([^"'\s\n\r]+)["']?/

  for (const collection of ['blog', 'til']) {
    const dir = path.join(contentDir, collection)
    if (!fs.existsSync(dir)) continue
    const files = fs.readdirSync(dir, { withFileTypes: true })
    for (const ent of files) {
      if (!ent.isFile() || !/\.(md|mdx)$/.test(ent.name)) continue
      const id = ent.name.replace(/\.(md|mdx)$/, '')
      const raw = fs.readFileSync(path.join(dir, ent.name), 'utf-8')
      const fm = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
      if (!fm) continue
      const lastmodMatch = fm[1].match(lastmodRe)
      const slugMatch = fm[1].match(slugRe)
      const slug = slugMatch ? slugMatch[1].trim() : id
      const lastmod = lastmodMatch ? new Date(lastmodMatch[1].trim()) : null
      const pathname = `/${collection}/${slug}/`
      if (lastmod && !Number.isNaN(lastmod.getTime())) {
        map.set(pathname, lastmod)
      }
    }
  }
  return map
}

const contentLastmodMap = getContentLastmodMap()

const { SENTRY_AUTH_TOKEN, SENTRY_DSN } = loadEnv(
  process.env.NODE_ENV,
  process.cwd(),
  '',
)

/** @type {import('astro-expressive-code').AstroExpressiveCodeOptions} */
const astroExpressiveCodeOptions = {
  themes: ['dracula', 'solarized-light'],
  // reduce bundle size by disabling unused features
  useStrictExperimentalApi: false,
}

// https://astro.build/config
export default defineConfig({
  site: 'https://joelmturner.com',
  trailingSlash: 'always',
  // inline all stylesheets to eliminate render-blocking CSS requests
  build: {
    inlineStylesheets: 'always', // inline all CSS to avoid render-blocking
    assets: '_assets',
  },
  // compress HTML output
  compressHTML: true,
  fonts: [
    {
      name: 'Fira Code',
      cssVariable: '--font-fira-code',
      provider: fontProviders.fontsource(),
    },
    {
      name: 'Fira Sans',
      cssVariable: '--font-fira-sans',
      provider: fontProviders.fontsource(),
    },
  ],

  integrations: [
    astroExpressiveCode(astroExpressiveCodeOptions),
    mdx(),
    react(),
    // lastmod from content frontmatter when available (blog/til), else build time
    // exclude tag archives (noindex) so sitemap only includes preferred URLs
    sitemap({
      lastmod: new Date(),
      filter: (url) =>
        !url.includes('/blog/tag/') && !url.includes('/til/tag/'),
      serialize(item) {
        const pathname = new URL(item.url).pathname
        const contentLastmod = contentLastmodMap.get(pathname)
        if (contentLastmod) {
          item.lastmod = contentLastmod
        }
        return item
      },
    }),
    ...(process.env.NODE_ENV !== 'development'
      ? [
          sentry({
            dsn: SENTRY_DSN,
            sourceMapsUploadOptions: {
              project: 'joelmturnercom',
              org: 'joelmturnercom',
              authToken: SENTRY_AUTH_TOKEN,
            },
            clientInitOptions: {
              // defer Sentry initialization to avoid blocking page load
              // Sentry will initialize after page load
              beforeSend: undefined,
            },
          }),
        ]
      : []),
    icon({
      include: {
        logos: [
          'typescript-icon',
          'react',
          'nextjs-icon',
          'pandacss-icon',
          'svelte-icon',
          'cloudinary-icon',
        ],
        'simple-icons': ['chakraui', 'devdotto'],
        iconoir: ['mastodon'],
        'material-symbols-light': ['logo-dev-outline'],
        lucide: ['github', 'twitter', 'linkedin', 'instagram'],
        ph: ['dev-to-logo'],
        local: ['bluesky'],
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
    build: {
      target: 'es2020', // target modern browsers to reduce legacy JavaScript
      cssMinify: true,
      // reduce chunk size warnings threshold (helps identify large bundles)
      chunkSizeWarningLimit: 1000,
    },
    // optimize dependencies to reduce bundle size
    optimizeDeps: {
      include: [],
      exclude: ['astro-embed'], // exclude heavy embed library from pre-bundling
    },
  },
})
