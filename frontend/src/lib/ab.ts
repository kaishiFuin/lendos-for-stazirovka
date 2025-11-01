const STORAGE_KEY = 'slimigood-ab-variant';
const VARIANTS = ['control', 'experiment'] as const;

export type Variant = (typeof VARIANTS)[number];

const pickVariant = (): Variant => {
  const hash = Math.random();
  return hash > 0.5 ? 'experiment' : 'control';
};

export const getVariant = (): Variant => {
  const params = new URLSearchParams(window.location.search);
  const forced = params.get('ab_variant');
  if (forced && VARIANTS.includes(forced as Variant)) {
    localStorage.setItem(STORAGE_KEY, forced);
    return forced as Variant;
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && VARIANTS.includes(stored as Variant)) {
    return stored as Variant;
  }

  const variant = pickVariant();
  localStorage.setItem(STORAGE_KEY, variant);
  return variant;
};
