const Sentry = require("@sentry/nextjs");
const { nodeProfilingIntegration } = require("@sentry/profiling-node");

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Performance Monitoring
  tracesSampleRate: 1.0, // Adjust to 0.1-0.2 in production for lower volume

  // Profiling
  profilesSampleRate: 1.0, // Adjust to 0.1-0.2 in production for lower volume

  // Environment
  environment: process.env.NODE_ENV,

  // Enable debug mode in development
  debug: process.env.NODE_ENV === "development",

  // Integrations
  integrations: [
    nodeProfilingIntegration(),
  ],

  // Ignore specific errors
  ignoreErrors: [
    "ECONNREFUSED",
    "ENOTFOUND",
    "socket hang up",
  ],

  // Before sending events
  beforeSend(event, hint) {
    // Add server-specific context
    if (hint.originalException instanceof Error) {
      event.contexts = {
        ...event.contexts,
        server: {
          errorName: hint.originalException.name,
          errorMessage: hint.originalException.message,
          stack: hint.originalException.stack,
        },
      };
    }

    return event;
  },
});
