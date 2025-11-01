export type Variant = 'A' | 'B';

const STORAGE_KEY = 'slimigood_variant';
const TTL_MS = 1000 * 60 * 60 * 24 * 7;

interface StoredVariant {
  value: Variant;
  expiresAt: number;
}

const isBrowser = typeof window !== 'undefined';

function readStorage(): StoredVariant | null {
  if (!isBrowser) return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredVariant;
    if (parsed.expiresAt < Date.now()) {
      window.localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch (error) {
    console.warn('Failed to read variant', error);
    return null;
  }
}

function writeStorage(value: Variant) {
  if (!isBrowser) return;
  try {
    const payload: StoredVariant = {
      value,
      expiresAt: Date.now() + TTL_MS
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (error) {
    console.warn('Failed to store variant', error);
  }
}

function resolveFromUrl(): Variant | null {
  if (!isBrowser) return null;
  const params = new URLSearchParams(window.location.search);
  const variant = params.get('v');
  if (variant === 'A' || variant === 'B') {
    writeStorage(variant);
    return variant;
  }
  return null;
}

export function resolveVariant(): Variant {
  const fromUrl = resolveFromUrl();
  if (fromUrl) return fromUrl;
  const stored = readStorage();
  if (stored) return stored.value;
  const random = Math.random() < 0.5 ? 'A' : 'B';
  writeStorage(random);
  return random;
}
