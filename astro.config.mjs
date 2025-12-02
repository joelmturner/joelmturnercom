import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import astroExpressiveCode from "astro-expressive-code";
import sentry from "@sentry/astro";
import { loadEnv } from "vite";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";
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
  trailingSlash: "always",

  integrations: [
    astroExpressiveCode(astroExpressiveCodeOptions),
    mdx(),
    sitemap(),
    ...(process.env.NODE_ENV !== "development"
      ? [
          sentry({
            dsn: SENTRY_DSN,
            sourceMapsUploadOptions: {
              project: "joelmturnercom",
              org: "joelmturnercom",
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
          "typescript-icon",
          "react",
          "nextjs-icon",
          "pandacss-icon",
          "svelte-icon",
          "cloudinary-icon",
        ],
        "simple-icons": ["chakraui", "devdotto"],
        iconoir: ["mastodon"],
        "material-symbols-light": ["logo-dev-outline"],
        lucide: ["github", "twitter", "linkedin", "instagram"],
        ph: ["dev-to-logo"],
        local: ["bluesky"],
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
