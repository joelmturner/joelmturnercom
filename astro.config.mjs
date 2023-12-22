import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import pandacss from "@pandacss/astro";
import svelte from "@astrojs/svelte";
import astroExpressiveCode from "astro-expressive-code";
import sentry from "@sentry/astro";
import { loadEnv } from "vite";
const { SENTRY_AUTH_TOKEN, SENTRY_DSN } = loadEnv(process.env.NODE_ENV, process.cwd(), "");

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
            dsn: SENTRY_DSN,
            sourceMapsUploadOptions: {
                project: "joelmturnercom",
                org: "joelmturnercom",
                authToken: SENTRY_AUTH_TOKEN,
            },
        }),
        sitemap()
    ],
});
