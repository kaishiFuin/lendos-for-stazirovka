const AB_KEY = 'slimigood_variant';
const TTL = 1000 * 60 * 60 * 24 * 7; // 7 days

export type Variant = 'A' | 'B';

const isVariant = (input: string | null): input is Variant => input === 'A' || input === 'B';

export const resolveVariant = (): Variant => {
  const params = new URLSearchParams(window.location.search);
  const fromQuery = params.get('v');
  if (isVariant(fromQuery)) {
    persistVariant(fromQuery);
    return fromQuery;
  }
  try {
    const stored = localStorage.getItem(AB_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as { value: Variant; expires: number };
      if (parsed && isVariant(parsed.value) && parsed.expires > Date.now()) {
        return parsed.value;
      }
    }
  } catch (error) {
    console.warn('Variant parse error', error);
  }
  const variant: Variant = Math.random() > 0.5 ? 'A' : 'B';
  persistVariant(variant);
  return variant;
};

const persistVariant = (variant: Variant) => {
  const payload = { value: variant, expires: Date.now() + TTL };
  localStorage.setItem(AB_KEY, JSON.stringify(payload));
};
