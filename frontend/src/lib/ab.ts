const STORAGE_KEY = 'slimigood_ab_variant';
const VARIANTS = ['A', 'B'] as const;

type Variant = (typeof VARIANTS)[number];

function parseVariant(value: string | null): Variant | null {
  if (!value) {
    return null;
  }
  return VARIANTS.includes(value as Variant) ? (value as Variant) : null;
}

export function resolveInitialVariant(): Variant {
  const params = new URLSearchParams(window.location.search);
  const paramVariant = parseVariant(params.get('ab_variant'));
  if (paramVariant) {
    localStorage.setItem(STORAGE_KEY, paramVariant);
    return paramVariant;
  }
  const stored = parseVariant(localStorage.getItem(STORAGE_KEY));
  if (stored) {
    return stored;
  }
  const randomIndex = Math.random() < 0.5 ? 0 : 1;
  const variant = VARIANTS[randomIndex];
  localStorage.setItem(STORAGE_KEY, variant);
  return variant;
}

export function getStoredVariant(): Variant | null {
  return parseVariant(localStorage.getItem(STORAGE_KEY));
}

export function setVariant(variant: Variant): void {
  localStorage.setItem(STORAGE_KEY, variant);
}

export type { Variant };
