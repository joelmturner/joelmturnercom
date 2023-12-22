import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import pandacss from "@pandacss/astro";
import svelte from "@astrojs/svelte";
import astroExpressiveCode from "astro-expressive-code";
import sentry from "@sentry/astro";

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
    pandacss(),
    svelte(),
    sentry({
      dsn: "https://examplePublicKey@o0.ingest.sentry.io/0",
      sourceMapsUploadOptions: {
        project: "joelmturnercom",
        authToken: process.env.SENTRY_AUTH_TOKEN,
      },
    }),
  ],
});
