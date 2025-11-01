export type Variant = 'control' | 'focus-benefits';

const STORAGE_KEY = 'slimigood_ab_variant';

function getVariantsFromConfig(): Variant[] {
  if (typeof window === 'undefined') {
    return ['control'];
  }

  const configured = (window as unknown as { appConfig?: { abVariants?: string[] } }).appConfig?.abVariants;
  if (Array.isArray(configured) && configured.length > 0) {
    return configured.filter((item): item is Variant =>
      item === 'control' || item === 'focus-benefits'
    );
  }

  return ['control'];
}

export function readVariant(): Variant {
  if (typeof window === 'undefined') {
    return 'control';
  }

  const params = new URLSearchParams(window.location.search);
  const queryVariant = params.get('ab_variant') ?? params.get('variant');
  const variants = getVariantsFromConfig();

  if (queryVariant && (variants as string[]).includes(queryVariant)) {
    persistVariant(queryVariant as Variant);
    return queryVariant as Variant;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY) as Variant | null;
  if (stored && (variants as string[]).includes(stored)) {
    return stored;
  }

  const randomIndex = Math.floor(Math.random() * variants.length);
  const variant = variants[randomIndex] ?? 'control';
  persistVariant(variant);
  return variant;
}

export function persistVariant(variant: Variant): void {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, variant);
}

export function getVariants(): Variant[] {
  return getVariantsFromConfig();
}
