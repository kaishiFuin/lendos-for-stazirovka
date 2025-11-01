import { motion } from 'framer-motion';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { track } from '../lib/analytics';
import type { Variant } from '../lib/ab';

interface HeroProps {
  variant: Variant;
  onCtaClick: () => void;
}

const DEADLINE_KEY = 'slimigood_daily_deadline';

const getTodayDeadline = () => {
  const now = new Date();
  const deadline = new Date(now);
  deadline.setHours(23, 59, 59, 999);
  return deadline;
};

const readDeadline = () => {
  if (typeof window === 'undefined') return getTodayDeadline();
  try {
    const stored = localStorage.getItem(DEADLINE_KEY);
    if (stored) {
      const parsed = new Date(stored);
      if (parsed > new Date()) {
        return parsed;
      }
    }
  } catch (error) {
    console.warn('Failed to read deadline', error);
  }
  const deadline = getTodayDeadline();
  try {
    localStorage.setItem(DEADLINE_KEY, deadline.toISOString());
  } catch (error) {
    console.warn('Failed to persist deadline', error);
  }
  return deadline;
};

const formatTime = (diff: number) => {
  const totalSeconds = Math.max(0, Math.floor(diff / 1000));
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return { hours, minutes, seconds };
};

export const HeroSection = ({ variant, onCtaClick }: HeroProps) => {
  const [deadline] = useState(() => readDeadline());
  const [remaining, setRemaining] = useState(() => formatTime(deadline.getTime() - Date.now()));

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(formatTime(deadline.getTime() - Date.now()));
    }, 1000);
    return () => clearInterval(interval);
  }, [deadline]);

  useEffect(() => {
    track('hero_rendered', { variant });
  }, [variant]);

  const heroCopy = useMemo(() => {
    if (variant === 'A') {
      return {
        title: '−7 кг за 28 дней без спортзала? Реально — если правильно стартануть',
        subtitle:
          'Стартовый протокол SlimiGood: нутрицевтики, план питания, контроль аппетита и поддержка коуча, чтобы запустить жиросжигание в безопасном темпе.',
        cta: 'Получить скидку −45%'
      };
    }
    return {
      title: 'Ваш минус — не чужая история. Узнайте свой реальный прогноз',
      subtitle:
        'Ответьте на 5 вопросов, и мы подберём режим SlimiGood под ваш метаболизм, график и цели. Без универсальных шаблонов — только персональный старт.',
      cta: 'Пройти квиз за 30 секунд'
    };
  }, [variant]);

  const handleClick = () => {
    track('cta_click', { variant, location: 'hero' });
    onCtaClick();
  };

  const safeTitle = heroCopy.title.split('−').join('&minus;');

  return (
    <section className="relative overflow-hidden pb-24 pt-28" id="top">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/20 via-slate-950 to-slate-950" />
      <div className="section-container grid gap-16 lg:grid-cols-[1fr,0.9fr] lg:items-center">
        <div className="space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <span className="badge gradient-border bg-white/10 text-white">Программа запуска SlimiGood</span>
            <h1 className="text-3xl font-bold leading-tight text-white sm:text-5xl" dangerouslySetInnerHTML={{ __html: safeTitle }} />
            <p className="text-lg text-white/80 sm:text-xl">{heroCopy.subtitle}</p>
          </motion.div>

          {variant === 'A' ? (
            <div className="card max-w-lg">
              <div className="flex items-center gap-4">
                <Clock className="h-10 w-10 text-accent" />
                <div>
                  <p className="text-sm uppercase tracking-wide text-white/60">−45% до 23:59</p>
                  <p className="text-2xl font-semibold text-white">
                    {remaining.hours}:{remaining.minutes}:{remaining.seconds}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm text-white/70">
                Скидка фиксируется при бронировании консультации сегодня. Таймер обновляется каждый день, чтобы не терять темп.
              </p>
            </div>
          ) : (
            <div className="card max-w-xl space-y-4">
              <div className="flex items-center gap-3 text-white/80">
                <Sparkles className="h-6 w-6 text-accent" />
                <p>5 вопросов → персональный режим питания и нутрицевтик.</p>
              </div>
              <ul className="grid gap-2 text-sm text-white/70">
                <li>• Определим стартовый уровень метаболизма и активность.</li>
                <li>• Подберём баланс КБЖУ и поддержку SlimiGood под ваш график.</li>
                <li>• Сформируем прогноз по снижению веса на первые 28 дней.</li>
              </ul>
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-lg font-semibold text-white shadow-glow"
            onClick={handleClick}
          >
            {heroCopy.cta}
            <ArrowRight className="h-5 w-5" />
          </motion.button>

          <div className="flex flex-wrap items-center gap-4 text-xs text-white/60">
            <span className="badge bg-white/10">Бесплатный созвон с нутрициологом</span>
            <span className="badge bg-white/10">Гарантия возврата 14 дней</span>
            <span className="badge bg-white/10">Первые 100 пакетов — PDF-дневник в подарок</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          className="relative"
        >
          <div className="gradient-border rounded-[40px] bg-white/5 p-4">
            <img
              src={
                variant === 'A'
                  ? 'https://placehold.co/1200x1200/png?text=SlimiGood+Pack'
                  : 'https://placehold.co/1200x1200/png?text=SlimiGood+Quiz'
              }
              alt="SlimiGood продукт"
              loading="lazy"
              width={600}
              height={600}
              className="h-auto w-full rounded-[32px] object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
