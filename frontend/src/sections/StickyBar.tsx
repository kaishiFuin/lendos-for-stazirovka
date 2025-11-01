import { Button } from '../components/Button';
import { analytics } from '../lib/analytics';

export function StickyBar() {
  return (
    <div className="sticky top-0 z-50 border-b border-primary/20 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3 text-center sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-semibold text-dark">
          Бесплатная консультация нутрициолога + 2 недели сопровождения в подарок до конца дня
        </p>
        <Button
          size="md"
          onClick={() => analytics.cta('sticky_consultation')}
          className="w-full sm:w-auto"
        >
          Забронировать место
        </Button>
      </div>
    </div>
  );
}
