const ATTR_KEY = 'slimigood_attrib';

export type Attribution = Record<string, string>;

const ATTR_FIELDS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'gclid',
  'msclkid',
  'yclid'
];

declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
  }
}

const safeWindow = typeof window !== 'undefined' ? window : undefined;

const persistAttribution = (data: Attribution) => {
  if (!safeWindow) return;
  try {
    localStorage.setItem(ATTR_KEY, JSON.stringify({ ...data, timestamp: Date.now() }));
  } catch (error) {
    console.warn('Failed to persist attribution', error);
  }
};

const readAttribution = (): Attribution => {
  if (!safeWindow) return {};
  try {
    const stored = localStorage.getItem(ATTR_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return Object.fromEntries(
        Object.entries(parsed).filter(([key]) => ATTR_FIELDS.includes(key))
      );
    }
  } catch (error) {
    console.warn('Failed to read attribution', error);
  }
  return {};
};

const parseUrlAttribution = (): Attribution => {
  if (!safeWindow) return {};
  const searchParams = new URLSearchParams(window.location.search);
  const entries: Attribution = {};
  ATTR_FIELDS.forEach((field) => {
    const value = searchParams.get(field);
    if (value) {
      entries[field] = value;
    }
  });
  return entries;
};

export const initAnalytics = () => {
  if (!safeWindow) return;
  window.dataLayer = window.dataLayer || [];
  const urlAttr = parseUrlAttribution();
  if (Object.keys(urlAttr).length) {
    persistAttribution(urlAttr);
  }
};

export const getAttribution = (): Attribution => {
  const urlAttr = parseUrlAttribution();
  if (Object.keys(urlAttr).length) {
    return urlAttr;
  }
  return readAttribution();
};

export const track = (event: string, payload: Record<string, unknown> = {}) => {
  if (!safeWindow) return;
  const attribution = readAttribution();
  const enriched = {
    event,
    event_time: new Date().toISOString(),
    ...payload,
    ...attribution
  };
  window.dataLayer.push(enriched);
  try {
    const history = JSON.parse(localStorage.getItem('slimigood_events') || '[]');
    history.push(enriched);
    const tail = history.slice(-100);
    localStorage.setItem('slimigood_events', JSON.stringify(tail));
  } catch (error) {
    console.warn('Failed to persist analytics events', error);
  }
};
