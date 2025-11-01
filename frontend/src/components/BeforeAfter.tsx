import { useState } from 'react';

import { beforeAfter } from '../data/content';

type BeforeAfterProps = {
  onCtaClick: () => void;
};

export function BeforeAfter({ onCtaClick }: BeforeAfterProps) {
  const [position, setPosition] = useState(50);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="before-after-slider card-surface relative h-80 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
              <p className="max-w-xs text-center text-sm text-slate-300">{beforeAfter.before}</p>
            </div>
            <div
              className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand to-accent text-slate-900 transition-all"
              style={{ width: `${position}%` }}
            >
              <p className="max-w-xs text-center text-base font-semibold">{beforeAfter.after}</p>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={position}
              onChange={(event) => setPosition(Number(event.target.value))}
              aria-label="Сравнение до и после"
            />
          </div>
          <div className="space-y-6">
            <h2 className="section-title text-left">Прогресс без фотошопа</h2>
            <p className="text-slate-300">
              Слайдер показывает типичный путь участников SlimiGood. За счёт мягкого детокса и сопровождения куратор помогает
              удерживать режим, поэтому результат держится.
            </p>
            <button
              type="button"
              onClick={onCtaClick}
              className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-slate-50 shadow-glow transition hover:bg-brand-dark"
            >
              Попробовать SlimiGood
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BeforeAfter;
