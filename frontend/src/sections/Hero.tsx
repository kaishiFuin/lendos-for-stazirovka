import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../components/Button';
import { Container } from '../components/Container';
import { Timer } from '../components/Timer';
import { analytics } from '../lib/analytics';
import { SpinnerGame } from '../components/SpinnerGame';
import { useSectionView } from '../hooks/useSectionView';

export function Hero() {
  useSectionView('hero');
  return (
    <section data-section="hero" className="relative overflow-hidden bg-white pb-24 pt-20">
      <div className="absolute inset-x-0 top-0 h-full gradient-bg" aria-hidden="true" />
      <Container>
        <div className="relative z-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 text-sm font-semibold text-secondary">
              <Sparkles className="h-4 w-4" />
              Контроль веса без стресса
            </span>
            <h1 className="text-4xl font-bold text-dark sm:text-5xl">
              SlimiGood — программа естественного снижения веса с поддержкой нутрициолога
            </h1>
            <p className="text-lg text-dark/80">
              Авторские методики, персональная аналитика и мягкая мотивация. Первые результаты — через 7 дней, без жёстких
              диет и изнурительных тренировок.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                size="lg"
                onClick={() => analytics.cta('hero_primary')}
                className="w-full sm:w-auto"
              >
                Пройти диагностику <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="ghost"
                onClick={() => analytics.cta('hero_secondary')}
                className="w-full sm:w-auto"
              >
                Посмотреть план 4U
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Timer />
              <div className="rounded-2xl border border-dark/10 bg-white/80 p-4 shadow-lg">
                <p className="text-xs font-semibold uppercase tracking-wide text-dark/60">4U-оффер</p>
                <ul className="mt-2 space-y-1 text-sm text-dark/80">
                  <li><strong>Полезно:</strong> -3,2 кг и минус 6 см в талии за 21 день</li>
                  <li><strong>Уникально:</strong> биохимический анализ и нутри-куратор 24/7</li>
                  <li><strong>Срочно:</strong> 2 недели сопровождения в подарок до 23:59</li>
                  <li><strong>Удобно:</strong> меню и тренировки в одном приложении</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="relative flex flex-col items-center gap-6">
            <div className="w-full rounded-3xl border border-primary/20 bg-white/80 p-8 shadow-2xl">
              <svg viewBox="0 0 320 220" className="h-auto w-full" role="img" aria-labelledby="hero-visual">
                <title id="hero-visual">Прогресс участницы SlimiGood</title>
                <rect x="16" y="16" width="288" height="188" rx="24" fill="#F5F6FA" />
                <path d="M48 164C72 120 104 92 132 104C160 116 178 80 212 68C246 56 268 92 288 132" stroke="#6C5CE7" strokeWidth="8" fill="none" strokeLinecap="round" />
                <circle cx="72" cy="128" r="12" fill="#6C5CE7" />
                <circle cx="156" cy="96" r="12" fill="#00B894" />
                <circle cx="236" cy="80" r="12" fill="#FD79A8" />
                <text x="36" y="196" fill="#2D3436" fontSize="14" fontWeight="600">Объём талии</text>
                <text x="140" y="196" fill="#2D3436" fontSize="14" fontWeight="600">Сон</text>
                <text x="220" y="196" fill="#2D3436" fontSize="14" fontWeight="600">Энергия</text>
              </svg>
              <p className="mt-4 text-sm text-dark/70">
                «За три недели я стала легче на 3,7 кг, но главное — ушла тяжесть. Меню подобрали под мой график смен.» — Анастасия,
                32 года
              </p>
            </div>
            <SpinnerGame />
          </div>
        </div>
      </Container>
    </section>
  );
}
