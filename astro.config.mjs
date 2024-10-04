import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import astroExpressiveCode from "astro-expressive-code";
import sentry from "@sentry/astro";
import { loadEnv } from "vite";
import icon from "astro-icon";
const { SENTRY_AUTH_TOKEN, SENTRY_DSN } = loadEnv(
  process.env.NODE_ENV,
  process.cwd(),
  "",
);

/** @type {import('astro-expressive-code').AstroExpressiveCodeOptions} */
const astroExpressiveCodeOptions = {
  themes: ["dracula", "solarized-light"],
};

// https://astro.build/config
export default defineConfig({
  site: "https://joelmturner.com",
  integrations: [
    astroExpressiveCode(astroExpressiveCodeOptions),
    mdx(),
    sitemap(),
    svelte(),
    sentry({
      dsn: SENTRY_DSN,
      sourceMapsUploadOptions: {
        project: "joelmturnercom",
        org: "joelmturnercom",
        authToken: SENTRY_AUTH_TOKEN,
      },
    }),
    sitemap(),
    icon({
        include: {
            logos: ['typescript-icon', 'react', 'nextjs-icon', 'pandacss-icon', 'svelte-icon', 'cloudinary-icon'],
            'simple-icons': ['chakraui', 'devdotto'],
            iconoir: ['mastodon'],
            'material-symbols-light': ['logo-dev-outline'],
            lucide: ['github', 'twitter', 'linkedin', 'instagram'],
            ph: ['dev-to-logo']
        }
    }),
  ],
});
