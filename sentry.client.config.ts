import * as Sentry from '@sentry/astro'

Sentry.init({
  dsn: import.meta.env.PUBLIC_SENTRY_DSN,
  integrations: [Sentry.browserTracingIntegration()],
  tracesSampleRate: 1.0, // lower (e.g. 0.2) if traffic grows
  tunnel: '/unblocksentry', // optional: route through your domain past ad blockers
})
