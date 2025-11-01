import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Variant } from '../lib/ab';
import { track } from '../lib/analytics';
import { LeadForm } from './LeadForm';
import { Timer } from './Timer';

interface HeroProps {
  variant: Variant;
  onScrollToOffer: () => void;
  onStartQuiz: () => void;
}

export function Hero({ variant, onScrollToOffer, onStartQuiz }: HeroProps) {
  const isVariantA = variant === 'A';

  const headline = isVariantA
    ? '−7 кг за 28 дней без спортзала? Реально — если правильно стартануть'
    : 'Ваш минус — не чужая история. Узнайте свой реальный прогноз';
  const ctaLabel = isVariantA ? 'Получить скидку −45%' : 'Пройти квиз за 30 секунд';

  const handlePrimaryClick = () => {
    track('cta_click', { variant });
    if (isVariantA) {
      onScrollToOffer();
    } else {
      onStartQuiz();
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand/10 via-white to-white">
      <div className="absolute -left-32 top-10 hidden h-64 w-64 rounded-full bg-brand/20 blur-3xl sm:block" aria-hidden="true" />
      <div className="absolute -right-32 bottom-10 hidden h-64 w-64 rounded-full bg-accent/20 blur-3xl sm:block" aria-hidden="true" />
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 pb-24 pt-20 md:flex-row md:items-center md:justify-between md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex max-w-xl flex-col gap-6"
        >
          {isVariantA ? <Timer /> : <span className="text-sm font-medium text-brand">5 вопросов → персональный режим</span>}
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">{headline}</h1>
          <p className="text-lg text-neutral/80">
            SlimiGood помогает стартовать безопасно: персональная стратегия питания, чат с экспертом и контроль динамики
            каждую неделю.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <motion.button
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.02 }}
              onClick={handlePrimaryClick}
              className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-base font-semibold text-white shadow-soft transition hover:bg-brand-dark"
            >
              {ctaLabel}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </motion.button>
            <span className="text-sm text-neutral/60">
              {isVariantA ? '−45% сегодня + персональная настройка плана' : 'Прогноз строится из 14 000 успешных кейсов'}
            </span>
          </div>
          {isVariantA ? (
            <LeadForm context="hero_discount" submitLabel="Получить скидку" />
          ) : (
            <p className="rounded-3xl border border-brand/20 bg-white/70 p-5 text-sm text-neutral/70 shadow-soft">
              Отвечая на вопросы, вы фиксируете исходные данные: врач получит их до консультации.
            </p>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative mx-auto max-w-md"
        >
          <img
            src="https://placehold.co/800x800/png?text=SlimiGood"
            alt="SlimiGood продукт"
            width="800"
            height="800"
            loading="lazy"
            className="w-full rounded-[40px] border border-white/50 shadow-soft"
          />
          {!isVariantA && (
            <div className="absolute -bottom-6 left-1/2 w-64 -translate-x-1/2 rounded-3xl border border-brand/30 bg-white/90 p-4 text-sm shadow-soft">
              <p className="font-semibold text-brand">Квиз на 5 вопросов</p>
              <p className="text-neutral/70">Узнайте диапазон результата и советы от куратора.</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
