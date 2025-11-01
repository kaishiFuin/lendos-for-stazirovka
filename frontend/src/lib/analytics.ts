import type { Variant } from './ab';

type AnalyticsPayload = {
  name: string;
  properties?: Record<string, unknown>;
  ab_variant?: Variant;
};

function pushToDataLayer(event: AnalyticsPayload) {
  if (typeof window === 'undefined') {
    return;
  }
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: event.name,
    ...event.properties,
    ab_variant: event.ab_variant,
    timestamp: new Date().toISOString(),
  });
}

export async function track(name: string, properties: Record<string, unknown> = {}, variant?: Variant) {
  const payload: AnalyticsPayload = {
    name,
    properties,
    ab_variant: variant,
  };
  pushToDataLayer(payload);

  try {
    await fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.warn('Failed to send analytics event', error);
  }
}

export function trackPageView(variant: Variant) {
  track('page_view', { path: window.location.pathname }, variant);
}
