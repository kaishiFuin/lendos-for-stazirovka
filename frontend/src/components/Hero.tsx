import { ArrowRight, ShieldCheck } from 'lucide-react';
import type { Variant } from '../lib/ab';
import { heroVariants } from '../data/content';
import { trackABEvent, trackEvent } from '../lib/analytics';

interface HeroProps {
  variant: Variant;
}

export function Hero({ variant }: HeroProps): JSX.Element {
  const copy = heroVariants[variant];

  return (
    <section className="relative overflow-hidden pt-32 pb-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand/30 via-slate-900 to-slate-950" />
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 px-4 text-center md:flex-row md:text-left">
        <div className="flex-1 space-y-6">
          <span className="inline-flex items-center rounded-full border border-white/20 px-4 py-1 text-xs uppercase tracking-[0.3em] text-white/70">
            Вариант {variant}
          </span>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            {copy.title}
          </h1>
          <p className="text-lg text-white/80">{copy.subtitle}</p>
          <ul className="space-y-3 text-left text-sm text-white/70">
            {copy.bulletPoints.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <ShieldCheck className="mt-1 h-5 w-5 text-success" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#lead-form"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-slate-900 shadow-lg shadow-accent/40 transition hover:bg-white"
              onClick={() => {
                trackEvent({ name: 'hero_cta_click', payload: { variant } });
                trackABEvent(variant, 'hero_cta_click');
              }}
            >
              {copy.cta}
              <ArrowRight className="h-4 w-4" />
            </a>
            <p className="text-sm text-white/60">Гарантированное возвращение средств при отсутствии результата</p>
          </div>
        </div>
        <div className="flex flex-1 justify-center" aria-hidden="true">
          <HeroBottle />
        </div>
      </div>
    </section>
  );
}

function HeroBottle(): JSX.Element {
  return (
    <svg className="h-[340px] w-[220px] drop-shadow-[0_25px_40px_rgba(107,78,255,0.35)]" viewBox="0 0 220 340" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bottleBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#B4A3FF" />
          <stop offset="100%" stopColor="#6B4EFF" />
        </linearGradient>
        <linearGradient id="bottleCap" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2E1D73" />
          <stop offset="100%" stopColor="#443089" />
        </linearGradient>
      </defs>
      <rect x="70" y="30" width="80" height="40" rx="12" fill="url(#bottleCap)" />
      <rect x="50" y="70" width="120" height="220" rx="40" fill="url(#bottleBody)" />
      <rect x="65" y="140" width="90" height="120" rx="24" fill="#F9FAFB" opacity="0.9" />
      <text x="110" y="200" textAnchor="middle" fontFamily="'Segoe UI', sans-serif" fontWeight="700" fontSize="32" fill="#6B4EFF">
        Slimi
      </text>
      <text x="110" y="234" textAnchor="middle" fontFamily="'Segoe UI', sans-serif" fontWeight="700" fontSize="32" fill="#6B4EFF">
        Good
      </text>
      <text x="110" y="268" textAnchor="middle" fontFamily="'Segoe UI', sans-serif" fontSize="12" fill="#6B4EFF">
        smart weight balance
      </text>
    </svg>
  );
}
