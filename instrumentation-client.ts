import * as Sentry from "@sentry/nextjs";

// Export router transition hook for Next.js navigation tracking
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of transactions in dev, adjust to 0.1-0.2 in production

  // Profiling
  profilesSampleRate: 1.0, // Capture 100% of profiles in dev, adjust to 0.1-0.2 in production

  // Session Replay
  replaysOnErrorSampleRate: 1.0, // Capture 100% of sessions with errors
  replaysSessionSampleRate: 0.1, // Capture 10% of normal sessions

  // Environment
  environment: process.env.NODE_ENV,

  // Enable debug mode in development
  debug: process.env.NODE_ENV === "development",

  // Ignore specific errors
  ignoreErrors: [
    // Browser extensions
    "top.GLOBALS",
    "canvas.contentDocument",
    // Network errors that are expected
    "NetworkError",
    "Failed to fetch",
    // SSE connection errors (handled gracefully)
    "EventSource",
  ],

  // Before sending events
  beforeSend(event, hint) {
    // Filter out localhost errors in production
    if (
      process.env.NODE_ENV === "production" &&
      event.request?.url?.includes("localhost")
    ) {
      return null;
    }

    // Add custom context
    if (hint.originalException instanceof Error) {
      event.contexts = {
        ...event.contexts,
        custom: {
          errorName: hint.originalException.name,
          errorMessage: hint.originalException.message,
        },
      };
    }

    return event;
  },

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Integrations
  integrations: [
    Sentry.replayIntegration({
      maskAllText: false, // Don't mask text in session replay
      blockAllMedia: false, // Don't block media
    }),
    Sentry.browserTracingIntegration(),
    Sentry.browserProfilingIntegration(), // Browser profiling
    // Send console.log, console.warn, and console.error calls as logs to Sentry
    Sentry.consoleLoggingIntegration({ levels: ["log", "warn", "error"] }),
  ],

  // Trace propagation targets
  tracePropagationTargets: [
    "localhost",
    /^https:\/\/visionai\.re/,
    /^https:\/\/.*\.vercel\.app/,
    /^https:\/\/visionaire-bff-production\.up\.railway\.app/,
  ],
});
