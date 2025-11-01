import { ArrowRight, ShieldCheck } from 'lucide-react';

import { offerHighlights } from '../data/content';
import type { Variant } from '../lib/ab';
import Timer from './Timer';

type HeroProps = {
  variant: Variant;
  onCtaClick: () => void;
  onOpenSpinner: () => void;
};

export function Hero({ variant, onCtaClick, onOpenSpinner }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-28 pb-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
        <div className="absolute left-1/2 top-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-3xl" />
      </div>
      <div className="mx-auto flex max-w-6xl flex-col-reverse gap-16 px-4 lg:flex-row lg:items-center">
        <div className="flex-1 space-y-8">
          <div className="tag w-fit">SlimiGood • Программа снижения веса</div>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            Естественное снижение веса за 28 дней без жёстких диет
          </h1>
          <p className="text-lg text-slate-300">
            Программа SlimiGood сочетает нутрициологию, психологию и мягкий детокс. Первые минус 1,5–2 кг вы увидите уже через
            неделю — без голода, без спортивных марафонов.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {offerHighlights.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl bg-slate-800/50 p-4">
                <ShieldCheck className="mt-1 h-5 w-5 text-brand-light" />
                <p className="text-sm text-slate-200">{item}</p>
              </div>
            ))}
          </div>
          <Timer storageKey="slimigood_hero_timer" />
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onCtaClick}
              className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-base font-semibold text-slate-50 shadow-lg shadow-brand/30 transition hover:bg-brand-dark"
            >
              Пройти диагностику
              <ArrowRight className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={onOpenSpinner}
              className="inline-flex items-center gap-2 rounded-full border border-brand/40 px-6 py-3 text-base font-semibold text-brand-light transition hover:border-brand hover:text-brand"
            >
              Испытать удачу
            </button>
            <span className="text-xs uppercase tracking-wider text-slate-400">
              A/B вариант: {variant === 'control' ? 'Контрольный' : 'Фокус на выгоде'}
            </span>
          </div>
        </div>
        <div className="relative flex flex-1 flex-col items-center">
          <div className="card-surface gradient-border w-full max-w-md p-8 text-center">
            <svg viewBox="0 0 320 320" className="mx-auto h-64 w-64">
              <defs>
                <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4c6ef5" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#f76707" stopOpacity="0.95" />
                </linearGradient>
              </defs>
              <rect x="20" y="20" width="280" height="280" rx="56" fill="url(#heroGradient)" opacity="0.9" />
              <text x="50%" y="45%" textAnchor="middle" fill="#0f172a" fontSize="32" fontWeight="700">
                Before
              </text>
              <text x="50%" y="65%" textAnchor="middle" fill="#0f172a" fontSize="48" fontWeight="800">
                After
              </text>
              <text x="50%" y="80%" textAnchor="middle" fill="#0f172a" fontSize="18">
                SlimiGood Reset
              </text>
            </svg>
            <p className="mt-6 text-sm text-slate-300">
              Виджет демонстрирует переход от усталости к лёгкости за счёт системной программы SlimiGood.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
