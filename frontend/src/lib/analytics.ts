export type AnalyticsEvent = {
  event: string;
  payload?: Record<string, unknown>;
};

export const trackEvent = (event: AnalyticsEvent): void => {
  if (!window.dataLayer) {
    window.dataLayer = [];
  }

  window.dataLayer.push({
    event: event.event,
    ...event.payload
  });
};
