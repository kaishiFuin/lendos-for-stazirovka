import { Variant } from '../lib/ab';
import { trackEvent } from '../lib/analytics';
import { ArrowRight } from 'lucide-react';

const headlines: Record<Variant, string> = {
  control: 'SlimiGood — натуральный комплекс для мягкого похудения',
  experiment: 'SlimiGood PRO — ускоренная формула с двойным детокс-эффектом'
};

type HeroProps = {
  variant: Variant;
};

const Hero = ({ variant }: HeroProps) => {
  const handleClick = () => {
    trackEvent({ event: 'cta_click', payload: { source: 'hero', variant } });
  };

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-8 px-4 pt-16 md:flex-row md:items-center">
      <div className="flex-1 space-y-6">
        <span className="inline-flex items-center rounded-full bg-primary/20 px-4 py-1 text-sm text-accent">
          Детокс + контроль аппетита
        </span>
        <h1 className="text-4xl font-bold leading-tight md:text-5xl">{headlines[variant]}</h1>
        <p className="text-lg text-white/80">
          Программа комфортного снижения веса без жёстких диет: растительные экстракты, витаминизированная формула и поддержка специалиста 24/7.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="#lead"
            onClick={handleClick}
            className="flex items-center gap-2 rounded bg-accent px-6 py-3 font-semibold text-neutral transition hover:bg-accent/90"
          >
            Забронировать скидку
            <ArrowRight className="h-4 w-4" />
          </a>
          <span className="text-sm text-white/60">Успейте до конца акции — доставка по СНГ</span>
        </div>
      </div>
      <div className="flex flex-1 justify-center">
        <svg className="h-64 w-64 text-accent" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="10" width="180" height="180" rx="24" fill="url(#gradient)" />
          <path d="M70 150C40 120 60 60 100 60C140 60 160 120 130 150" stroke="white" strokeWidth="8" strokeLinecap="round" />
          <circle cx="80" cy="90" r="10" fill="white" />
          <circle cx="120" cy="90" r="10" fill="white" />
          <path d="M85 120C92 130 108 130 115 120" stroke="white" strokeWidth="6" strokeLinecap="round" />
          <defs>
            <linearGradient id="gradient" x1="10" y1="10" x2="180" y2="190" gradientUnits="userSpaceOnUse">
              <stop stopColor="#5B21B6" />
              <stop offset="1" stopColor="#F97316" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
