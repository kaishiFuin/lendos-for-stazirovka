import { motion } from 'framer-motion';
import { Clock, Sparkles } from 'lucide-react';
import { Variant } from '../lib/ab';
import { track } from '../lib/analytics';
import { Suspense, lazy } from 'react';

const Quiz = lazy(() => import('./Quiz'));

type HeroProps = {
  variant: Variant;
  onCTA: () => void;
  deadline: string;
};

export const Hero = ({ variant, onCTA, deadline }: HeroProps) => {
  return (
    <section id={variant === 'B' ? 'hero-quiz' : 'hero'} className="hero-gradient relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,rgba(31,182,255,0.5),transparent_60%)]" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 py-20 md:flex-row md:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 space-y-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1 text-sm text-white/80">
            <Sparkles className="h-4 w-4 text-accent" />
            <span>Персональная система мягкого похудения</span>
          </div>
          <h1 className="text-3xl font-extrabold leading-tight text-white md:text-5xl">
            {variant === 'A'
              ? '−7 кг за 28 дней без спортзала? Реально — если правильно стартануть'
              : 'Ваш минус — не чужая история. Узнайте свой реальный прогноз'}
          </h1>
          <p className="max-w-xl text-lg text-white/80 md:text-xl">
            SlimiGood подбирает питание, режим и мотивацию под ваш ритм жизни. Всего 30 секунд — и у вас на руках персональный
            план снижения веса с поддержкой нутрициолога.
          </p>
          {variant === 'A' ? (
            <div className="flex flex-wrap items-center gap-4">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  track('cta_click', { placement: 'hero', variant });
                  onCTA();
                }}
                className="rounded-full bg-accent px-6 py-3 text-base font-semibold text-white shadow-lg shadow-accent/40 transition hover:bg-accent/90"
              >
                Получить скидку −45%
              </motion.button>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
                <Clock className="h-5 w-5 text-accent" />
                <div>
                  <div className="font-semibold text-white">−45% до 23:59</div>
                  <div className="text-xs text-white/60">Успейте сегодня: осталось {deadline}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="mb-4 text-sm uppercase tracking-wide text-accent">5 вопросов → персональный режим</div>
              <Suspense fallback={<div className="h-48 animate-pulse rounded-2xl bg-white/10" />}>
                <Quiz
                  onStart={() => track('quiz_start', { placement: 'hero', variant })}
                  onComplete={(result) => track('quiz_complete', { placement: 'hero', variant, result })}
                />
              </Suspense>
            </div>
          )}
          <div className="flex flex-wrap gap-4 text-sm text-white/60">
            <span>Сертифицированные нутрициологи</span>
            <span>Доступ к поддержке 24/7</span>
            <span>Умный трекер привычек</span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex-1"
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-card">
            <img
              src={
                variant === 'A'
                  ? 'https://placehold.co/1200x1200/png?text=SlimiGood+Hero+A'
                  : 'https://placehold.co/1200x1200/png?text=SlimiGood+Hero+B'
              }
              alt="SlimiGood превью"
              loading="lazy"
              width="600"
              height="600"
              className="w-full rounded-2xl object-cover"
            />
            <div className="mt-4 grid gap-3 text-sm text-white/80">
              <div className="rounded-2xl border border-white/10 bg-dark/50 p-4">
                <div className="text-xs uppercase tracking-wide text-accent">Фокус</div>
                <p>Балансируем питание, сон и шаги: никакого марафона, только посильные шаги.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-dark/50 p-4">
                <div className="text-xs uppercase tracking-wide text-accent">Результат</div>
                <p>Первые минус сантиметры — уже через неделю, а через 28 дней — минус {variant === 'A' ? '4–6' : '5–7'} кг.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
