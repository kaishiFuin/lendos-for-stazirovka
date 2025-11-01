export type AnalyticsEvent =
  | 'view_page'
  | 'cta_click'
  | 'quiz_start'
  | 'quiz_complete'
  | 'calc_used'
  | 'lead_submit'
  | 'exit_intent_shown';

type Attribution = {
  source: string;
  medium: string;
  campaign: string;
  gclid?: string;
  msclkid?: string;
  yclid?: string;
  timestamp: number;
};

type Payload = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
  }
}

const ATTR_KEY = 'slimigood_attrib';

export const initAnalytics = () => {
  if (!Array.isArray(window.dataLayer)) {
    window.dataLayer = [];
  }
  const params = new URLSearchParams(window.location.search);
  const utm = {
    source: params.get('utm_source') ?? 'direct',
    medium: params.get('utm_medium') ?? 'none',
    campaign: params.get('utm_campaign') ?? 'default'
  };
  const attribution: Attribution = {
    ...utm,
    gclid: params.get('gclid') ?? undefined,
    msclkid: params.get('msclkid') ?? undefined,
    yclid: params.get('yclid') ?? undefined,
    timestamp: Date.now()
  };

  localStorage.setItem(ATTR_KEY, JSON.stringify(attribution));
  track('view_page', { variant: params.get('v') ?? undefined });
};

const withAttribution = (payload: Payload = {}) => {
  try {
    const stored = localStorage.getItem(ATTR_KEY);
    if (stored) {
      const attrib = JSON.parse(stored) as Attribution;
      return { ...payload, attribution: attrib };
    }
  } catch (error) {
    console.warn('Failed to parse attribution', error);
  }
  return payload;
};

export const track = (event: AnalyticsEvent, payload: Payload = {}) => {
  const enriched = withAttribution(payload);
  window.dataLayer.push({ event, ...enriched });
  if (import.meta.env.DEV) {
    console.info('[analytics]', event, enriched);
  }
};
