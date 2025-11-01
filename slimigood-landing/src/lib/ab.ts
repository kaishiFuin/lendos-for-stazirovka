type Variant = 'A' | 'B';

const STORAGE_KEY = 'slimigood_variant';
const STORAGE_TTL = 7 * 24 * 60 * 60 * 1000;

const pickVariant = (): Variant => {
  const random = Math.random();
  return random < 0.5 ? 'A' : 'B';
};

const parseStoredVariant = (value: string | null): Variant | undefined => {
  if (!value) return undefined;
  try {
    const parsed = JSON.parse(value) as { variant: Variant; expires: number };
    if (parsed.expires > Date.now() && (parsed.variant === 'A' || parsed.variant === 'B')) {
      return parsed.variant;
    }
  } catch (error) {
    console.warn('Failed to parse AB variant', error);
  }
  return undefined;
};

export const resolveVariant = (): Variant => {
  if (typeof window === 'undefined') {
    return 'A';
  }

  const params = new URLSearchParams(window.location.search);
  const fromQuery = params.get('v');
  if (fromQuery === 'A' || fromQuery === 'B') {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ variant: fromQuery, expires: Date.now() + STORAGE_TTL })
    );
    return fromQuery;
  }

  const stored = parseStoredVariant(localStorage.getItem(STORAGE_KEY));
  if (stored) {
    return stored;
  }

  const variant = pickVariant();
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ variant, expires: Date.now() + STORAGE_TTL })
  );
  return variant;
};
