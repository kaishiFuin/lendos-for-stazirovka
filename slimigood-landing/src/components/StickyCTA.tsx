import { Variant } from '../lib/ab';
import { track } from '../lib/analytics';

type StickyCTAProps = {
  variant: Variant;
  onClick: () => void;
};

export const StickyCTA = ({ variant, onClick }: StickyCTAProps) => (
  <div className="fixed bottom-4 left-1/2 z-40 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-full border border-white/20 bg-slate-950/90 px-4 py-3 shadow-lg shadow-black/30 backdrop-blur md:hidden">
    <button
      onClick={() => {
        track('cta_click', { placement: 'sticky', variant });
        onClick();
      }}
      className="flex w-full items-center justify-between text-sm font-semibold text-white"
    >
      <span>{variant === 'A' ? 'Получить скидку −45%' : 'Пройти квиз за 30 секунд'}</span>
      <span className="rounded-full bg-primary px-3 py-1 text-xs text-slate-900">Старт</span>
    </button>
  </div>
);
