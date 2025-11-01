import { Check } from 'lucide-react';

import { offer4U, offerHighlights } from '../data/content';

type OfferProps = {
  onCtaClick: () => void;
};

export function Offer({ onCtaClick }: OfferProps) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-5xl px-4">
        <div className="card-surface gradient-border p-10">
          <h2 className="section-title">Оффер 4U для SlimiGood</h2>
          <p className="mt-4 text-center text-slate-300">
            Всё, что нужно, чтобы вернуть лёгкость и уверенность за 28 дней — с поддержкой кураторов и научно подтверждённой формулой.
          </p>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-100">Что входит прямо сейчас</h3>
              <ul className="space-y-3 text-sm text-slate-200">
                {offerHighlights.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 text-brand-light" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-100">Оффер 4U</h3>
              <ul className="space-y-3 text-sm text-slate-200">
                {offer4U.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={onCtaClick}
              className="rounded-full bg-accent px-8 py-3 text-base font-semibold text-slate-900 shadow-glow transition hover:bg-accent/90"
            >
              Получить программу со скидкой
            </button>
            <p className="text-xs text-slate-400">
              Осталось 17 мест на поток этой недели
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Offer;
