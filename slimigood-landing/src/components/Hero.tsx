import { motion } from 'framer-motion';
import { Flame, Timer, ClipboardList } from 'lucide-react';
import { useMemo } from 'react';

export type HeroVariant = 'A' | 'B';

interface HeroProps {
  variant: HeroVariant;
  onPrimaryAction: () => void;
  timerLabel: string;
}

const heroImage = 'https://placehold.co/960x960/png?text=SlimiGood+Hero';

const FeatureBadge = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/70 px-4 py-2 text-sm text-slate-200">
    {icon}
    {text}
  </span>
);

const heroVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const Hero = ({ variant, onPrimaryAction, timerLabel }: HeroProps) => {
  const content = useMemo(() => {
    if (variant === 'A') {
      return {
        title: '−7 кг за 28 дней без спортзала? Реально — если правильно стартануть',
        cta: 'Получить скидку −45%',
        subtitle: 'Персональный старт под вашего нутрициолога. Скидка действует до конца дня.',
        badge: `−45% до ${timerLabel}`,
        secondary: 'Стартовая консультация и трекинг прогресса в приложении'
      };
    }
    return {
      title: 'Ваш минус — не чужая история. Узнайте свой реальный прогноз',
      cta: 'Пройти квиз за 30 секунд',
      subtitle: 'Ответьте на 5 вопросов и получите персональный режим SlimiGood + прогноз на 28 дней.',
      badge: '5 вопросов → персональный режим',
      secondary: 'Уже 12 842 участника получили свой прогноз'
    };
  }, [variant, timerLabel]);

  return (
    <section className="gradient-hero relative overflow-hidden pb-24 pt-20" id="hero">
      <div className="absolute inset-0 opacity-60" aria-hidden>
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand/40 blur-3xl" />
        <div className="absolute -right-10 bottom-0 h-64 w-64 rounded-full bg-accent/30 blur-3xl" />
      </div>
      <div className="relative mx-auto flex max-w-6xl flex-col gap-16 px-6 lg:flex-row lg:items-center">
        <motion.div
          className="flex-1"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6 }}
        >
          <FeatureBadge
            icon={
              variant === 'A' ? (
                <Timer className="h-4 w-4 text-accent" />
              ) : (
                <ClipboardList className="h-4 w-4 text-accent" />
              )
            }
            text={content.badge}
          />
          <motion.h1
            className="mt-6 text-3xl font-semibold leading-tight text-white md:text-5xl"
            variants={heroVariants}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            {content.title}
          </motion.h1>
          <p className="mt-6 max-w-xl text-lg text-slate-200">{content.subtitle}</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <motion.a
              href="#offer"
              onClick={onPrimaryAction}
              className="inline-flex items-center justify-center rounded-full bg-brand px-8 py-3 text-lg font-semibold text-white shadow-glow transition hover:bg-brand-light focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              whileTap={{ scale: 0.97 }}
            >
              {content.cta}
            </motion.a>
            <div className="flex items-center gap-3 text-sm text-slate-200/80">
              <Flame className="h-4 w-4 text-accent" />
              {content.secondary}
            </div>
          </div>
        </motion.div>
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 shadow-2xl">
            <img
              src={heroImage}
              alt="SlimiGood hero"
              loading="lazy"
              width="960"
              height="960"
              className="h-full w-full object-cover"
            />
            {variant === 'B' && (
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-slate-950/80 p-5 text-sm text-slate-100">
                <p className="font-medium">Ответьте на квиз и узнайте:</p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-200/80">
                  <li>личный коридор снижения веса;</li>
                  <li>рекомендации по питанию на 7 дней;</li>
                  <li>связь с куратором в мессенджере.</li>
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
