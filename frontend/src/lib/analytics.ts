export type AnalyticsEvent = {
  name: string;
  payload?: Record<string, unknown>;
};

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

function ensureDataLayer(): unknown[] {
  if (!window.dataLayer) {
    window.dataLayer = [];
  }
  return window.dataLayer;
}

export function trackEvent(event: AnalyticsEvent): void {
  const layer = ensureDataLayer();
  layer.push({
    event: event.name,
    payload: event.payload ?? {},
    timestamp: Date.now(),
  });
}

export function trackABEvent(variant: string, name: string, payload?: Record<string, unknown>): void {
  trackEvent({
    name: `ab_${name}`,
    payload: {
      variant,
      ...(payload ?? {}),
    },
  });
  import('./api')
    .then(({ trackAB }) =>
      trackAB('ab_event', {
        variant,
        event: name,
        meta: payload ?? {},
      }),
    )
    .catch(() => {
      /* network optional */
    });
}
