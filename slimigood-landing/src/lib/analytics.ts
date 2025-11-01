const ATTR_KEY = 'slimigood_attrib';
const ATTR_FIELDS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'msclkid', 'yclid'] as const;

type Attribution = Partial<Record<(typeof ATTR_FIELDS)[number], string>>;

declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
  }
}

const isBrowser = typeof window !== 'undefined';

const safeLocalStorage = {
  getItem(key: string) {
    try {
      return isBrowser ? window.localStorage.getItem(key) : null;
    } catch (error) {
      console.warn('localStorage unavailable', error);
      return null;
    }
  },
  setItem(key: string, value: string) {
    try {
      if (isBrowser) {
        window.localStorage.setItem(key, value);
      }
    } catch (error) {
      console.warn('localStorage unavailable', error);
    }
  }
};

export function ensureDataLayer() {
  if (!isBrowser) return;
  window.dataLayer = window.dataLayer || [];
}

export function parseAttribution(search: string): Attribution {
  const params = new URLSearchParams(search);
  const attribution: Attribution = {};
  ATTR_FIELDS.forEach((field) => {
    const value = params.get(field);
    if (value) {
      attribution[field] = value;
    }
  });
  return attribution;
}

export function loadAttribution(): Attribution {
  const raw = safeLocalStorage.getItem(ATTR_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw) as Attribution;
  } catch (error) {
    console.warn('Failed to parse attribution', error);
    return {};
  }
}

export function storeAttribution(data: Attribution) {
  if (!Object.keys(data).length) return;
  const stored = loadAttribution();
  const merged = { ...stored, ...data };
  safeLocalStorage.setItem(ATTR_KEY, JSON.stringify(merged));
}

export type AnalyticsEvent =
  | 'view_page'
  | 'cta_click'
  | 'quiz_start'
  | 'quiz_complete'
  | 'calc_used'
  | 'lead_submit'
  | 'exit_intent_shown';

export function track(event: AnalyticsEvent, payload: Record<string, unknown> = {}) {
  if (!isBrowser) return;
  ensureDataLayer();
  const attribution = loadAttribution();
  window.dataLayer.push({
    event,
    timestamp: Date.now(),
    ...attribution,
    ...payload
  });
}

export function bootstrapAnalytics() {
  if (!isBrowser) return;
  ensureDataLayer();
  const attribution = parseAttribution(window.location.search);
  if (Object.keys(attribution).length) {
    storeAttribution(attribution);
  }
}
