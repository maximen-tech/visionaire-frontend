import * as Sentry from "@sentry/nextjs";

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config');
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config');
  }
}

export async function onRequestError(
  err: Error,
  request: {
    method: string;
    url: string;
  },
  context: {
    routerKind: string;
    routePath: string;
    routeType: string;
  }
) {
  Sentry.captureException(err, {
    tags: {
      request_method: request.method,
      router_kind: context.routerKind,
      route_type: context.routeType,
    },
    extra: {
      request_url: request.url,
      route_path: context.routePath,
    },
  });
}
