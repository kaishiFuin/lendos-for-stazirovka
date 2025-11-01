export type AnalyticsEvent =
  | 'view_page'
  | 'cta_click'
  | 'quiz_start'
  | 'quiz_complete'
  | 'calc_used'
  | 'lead_submit'
  | 'exit_intent_shown';

type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  msclkid?: string;
  yclid?: string;
  timestamp: number;
};

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

const ATTR_KEY = 'slimigood_attrib';

const ensureDataLayer = () => {
  if (!window.dataLayer) {
    window.dataLayer = [];
  }
};

const parseAttribution = () => {
  if (typeof window === 'undefined') return undefined;
  const params = new URLSearchParams(window.location.search);
  const attribution: Partial<Attribution> = {};
  const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'msclkid', 'yclid'];
  let hasAny = false;

  keys.forEach((key) => {
    const value = params.get(key);
    if (value) {
      (attribution as Record<string, string>)[key] = value;
      hasAny = true;
    }
  });

  if (hasAny) {
    const payload: Attribution = {
      ...attribution,
      timestamp: Date.now()
    };
    localStorage.setItem(ATTR_KEY, JSON.stringify(payload));
    return payload;
  }

  const stored = localStorage.getItem(ATTR_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as Attribution;
    } catch (err) {
      console.warn('Failed to parse attribution', err);
      localStorage.removeItem(ATTR_KEY);
    }
  }

  return undefined;
};

let cachedAttrib: Attribution | undefined;

export const initAnalytics = () => {
  if (typeof window === 'undefined') return;
  ensureDataLayer();
  cachedAttrib = parseAttribution();
};

export const track = (event: AnalyticsEvent, payload: Record<string, unknown> = {}) => {
  if (typeof window === 'undefined') return;
  ensureDataLayer();
  if (!cachedAttrib) {
    cachedAttrib = parseAttribution();
  }

  const enriched = {
    event,
    timestamp: Date.now(),
    ...payload,
    attribution: cachedAttrib
  };

  window.dataLayer.push(enriched);
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.info('[analytics]', enriched);
  }
};
