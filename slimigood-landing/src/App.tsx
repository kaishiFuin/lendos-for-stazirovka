import { useEffect, useMemo, useState } from 'react';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { Calculator } from './components/Calculator';
import { OfferSection } from './components/OfferSection';
import { SocialProof } from './components/SocialProof';
import { Guarantees } from './components/Guarantees';
import FAQ from './components/FAQ';
import { Footer } from './components/Footer';
import { StickyCTA } from './components/StickyCTA';
import { ExitIntentModal, useExitIntent } from './components/ExitIntentModal';
import { Toasts } from './components/Toasts';
import { AdvantageCard } from './components/AdvantageCard';
import { Dumbbell, HeartPulse, Leaf, MoonStar, ShieldCheck } from 'lucide-react';
import { Variant, resolveVariant } from './lib/ab';
import { initAnalytics } from './lib/analytics';

const DEADLINE_KEY = 'slimigood_deadline';

const advantages = [
  {
    icon: <HeartPulse className="h-6 w-6" />,
    title: 'Наблюдение нутрициолога',
    description: 'Персональная поддержка и еженедельные созвоны для корректировки плана.'
  },
  {
    icon: <Leaf className="h-6 w-6" />,
    title: 'Меню без экзотики',
    description: 'Сбалансированные блюда из привычных продуктов и готовые списки покупок.'
  },
  {
    icon: <Dumbbell className="h-6 w-6" />,
    title: 'Активность по силам',
    description: 'Лёгкие комплексы на 10–15 минут — без жёстких тренировок в спортзале.'
  },
  {
    icon: <MoonStar className="h-6 w-6" />,
    title: 'Фокус на сне и восстановлении',
    description: 'Учимся засыпать вовремя и использовать сон как главный ресурс похудения.'
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: 'Результат под защитой',
    description: 'Закрепляем новые привычки и помогаем сохранить форму после программы.'
  }
];

const getDeadline = () => {
  const stored = localStorage.getItem(DEADLINE_KEY);
  if (stored) {
    const parsed = JSON.parse(stored) as { expiresAt: number; day: string };
    if (parsed.day === new Date().toDateString()) {
      return parsed.expiresAt;
    }
  }
  const now = new Date();
  const deadline = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 0).getTime();
  localStorage.setItem(DEADLINE_KEY, JSON.stringify({ expiresAt: deadline, day: new Date().toDateString() }));
  return deadline;
};

const formatRemaining = (deadline: number) => {
  const diff = Math.max(0, deadline - Date.now());
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
};

function App() {
  const [variant, setVariant] = useState<Variant>('A');
  const [deadline] = useState(() => getDeadline());
  const [timeLeft, setTimeLeft] = useState(() => formatRemaining(deadline));
  const { isOpen, setIsOpen } = useExitIntent();

  useEffect(() => {
    initAnalytics();
    const resolved = resolveVariant();
    setVariant(resolved);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(formatRemaining(deadline)), 1000);
    return () => clearInterval(interval);
  }, [deadline]);

  const ctaTarget = useMemo(() => (variant === 'A' ? '#offer' : '#hero-quiz'), [variant]);

  const handleScrollTo = () => {
    const target = document.querySelector(ctaTarget);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      <Hero variant={variant} onCTA={handleScrollTo} deadline={timeLeft} />
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10 flex flex-col gap-3">
          <h2 className="text-3xl font-bold text-white md:text-4xl">Преимущества SlimiGood</h2>
          <p className="max-w-2xl text-white/70">Программа, которая учитывает ваш ритм жизни и помогает худеть мягко.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {advantages.map((advantage) => (
            <AdvantageCard key={advantage.title} {...advantage} />
          ))}
        </div>
      </section>
      <HowItWorks />
      <Calculator />
      <OfferSection variant={variant} />
      <SocialProof />
      <Guarantees />
      <FAQ />
      <Footer />
      <Toasts />
      <StickyCTA variant={variant} onClick={handleScrollTo} />
      <ExitIntentModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

export default App;
