import { useEffect, useState } from 'react';
import { resolveInitialVariant, type Variant } from '../lib/ab';
import { trackABEvent } from '../lib/analytics';

export function useABVariant(): Variant {
  const [variant] = useState<Variant>(() => resolveInitialVariant());

  useEffect(() => {
    trackABEvent(variant, 'variant_assigned');
  }, [variant]);

  return variant;
}
