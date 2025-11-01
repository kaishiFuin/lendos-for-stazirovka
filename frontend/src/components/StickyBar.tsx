import { Flame } from 'lucide-react';

import { stickyBarPoints } from '../data/content';
import Timer from './Timer';

type StickyBarProps = {
  onCtaClick: () => void;
};

export function StickyBar({ onCtaClick }: StickyBarProps) {
  return (
    <div className="fixed inset-x-0 top-0 z-50 bg-slate-950/85 backdrop-blur-lg border-b border-slate-800">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 text-sm">
        <div className="flex items-center gap-3 text-slate-200">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/20 text-brand">
            <Flame className="h-5 w-5" />
          </span>
          <ul className="hidden items-center gap-4 text-xs sm:flex">
            {stickyBarPoints.map((point) => (
              <li key={point} className="flex items-center gap-2 text-slate-300">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                {point}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-4">
          <Timer storageKey="slimigood_sticky_timer" durationMinutes={120} />
          <button
            type="button"
            onClick={onCtaClick}
            className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-slate-900 shadow-glow transition hover:bg-accent/90"
          >
            Забронировать место
          </button>
        </div>
      </div>
    </div>
  );
}

export default StickyBar;
