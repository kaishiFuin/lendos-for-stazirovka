const STORAGE_KEY = 'slimigood_ab_variant';

export type Variant = 'control' | 'boost';

export const variants: Variant[] = ['control', 'boost'];

function pickVariant(): Variant {
  const saved = window.localStorage.getItem(STORAGE_KEY) as Variant | null;
  if (saved && variants.includes(saved)) {
    return saved;
  }
  const randomVariant = variants[Math.random() < 0.5 ? 0 : 1];
  window.localStorage.setItem(STORAGE_KEY, randomVariant);
  return randomVariant;
}

export function getVariant(): Variant {
  return pickVariant();
}

export function withVariant<TVariantMap extends Record<Variant, unknown>>(
  map: TVariantMap
): TVariantMap[Variant] {
  const variant = getVariant();
  return map[variant] as TVariantMap[Variant];
}
