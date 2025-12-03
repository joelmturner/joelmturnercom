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
  // reduce bundle size by disabling unused features
  useStrictExperimentalApi: false,
};

// https://astro.build/config
export default defineConfig({
  site: "https://joelmturner.com",
  trailingSlash: "always",
  // optimize build output
  build: {
    inlineStylesheets: "auto",
    assets: "_assets",
  },
  // optimize compression
  compressHTML: true,

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
    build: {
      // optimize chunk size
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // separate vendor chunks for better caching
            if (id.includes("node_modules")) {
              if (id.includes("astro-expressive-code")) {
                return "expressive-code";
              }
              if (
                id.includes("astro-cloudinary") ||
                id.includes("@cloudinary")
              ) {
                return "cloudinary";
              }
              if (id.includes("sentry")) {
                return "sentry";
              }
              return "vendor";
            }
          },
        },
      },
      // enable minification
      minify: "esbuild",
      // optimize chunk size
      chunkSizeWarningLimit: 1000,
      cssMinify: true,
    },
    // optimize dependencies
    optimizeDeps: {
      include: [],
    },
  },
});
