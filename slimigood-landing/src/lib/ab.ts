export type Variant = 'A' | 'B';

const STORAGE_KEY = 'slimigood_variant';
const TTL_MS = 1000 * 60 * 60 * 24 * 7;

interface StoredVariant {
  variant: Variant;
  expiresAt: number;
}

const safeWindow = typeof window !== 'undefined' ? window : undefined;

export const pickVariant = (): Variant => {
  if (!safeWindow) {
    return 'A';
  }
  const searchParams = new URLSearchParams(window.location.search);
  const requested = searchParams.get('v');
  if (requested === 'A' || requested === 'B') {
    persistVariant(requested);
    return requested;
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as StoredVariant;
      if (parsed.expiresAt > Date.now()) {
        return parsed.variant;
      }
    }
  } catch (error) {
    console.warn('Failed to read variant from storage', error);
  }
  const variant: Variant = Math.random() > 0.5 ? 'A' : 'B';
  persistVariant(variant);
  return variant;
};

export const persistVariant = (variant: Variant) => {
  if (!safeWindow) return;
  const payload: StoredVariant = {
    variant,
    expiresAt: Date.now() + TTL_MS
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (error) {
    console.warn('Failed to persist variant', error);
  }
};
