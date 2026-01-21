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
  // inline all stylesheets to eliminate render-blocking CSS requests
  build: {
    inlineStylesheets: "always", // inline all CSS to avoid render-blocking
    assets: "_assets",
  },
  // compress HTML output
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
      target: "es2020", // target modern browsers to reduce legacy JavaScript
      cssMinify: true,
      // optimize chunk splitting to reduce bundle size and improve caching
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // separate vendor chunks for better caching
            if (id.includes("node_modules")) {
              // separate large dependencies
              if (id.includes("lodash")) {
                return "vendor-lodash";
              }
              if (id.includes("@cloudinary") || id.includes("cloudinary")) {
                return "vendor-cloudinary";
              }
              if (id.includes("astro-expressive-code")) {
                return "vendor-expressive-code";
              }
              // group other node_modules
              return "vendor";
            }
          },
        },
      },
      // reduce chunk size warnings threshold (helps identify large bundles)
      chunkSizeWarningLimit: 1000,
    },
    // optimize dependencies to reduce bundle size
    optimizeDeps: {
      include: [],
      exclude: ["astro-embed"], // exclude heavy embed library from pre-bundling
    },
  },
});
