import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import Hero, { HeroVariant } from './components/Hero';
import Benefits from './components/Benefits';
import HowItWorks from './components/HowItWorks';
import Calculator from './components/Calculator';
import Offer from './components/Offer';
import SocialProof from './components/SocialProof';
import Guarantees from './components/Guarantees';
import Footer from './components/Footer';
import StickyCTA from './components/StickyCTA';
import ExitIntentModal from './components/ExitIntentModal';
import Toasts from './components/Toasts';
import { resolveVariant } from './lib/ab';
import { initAnalytics, track } from './lib/analytics';

const QuizFlow = lazy(() => import('./components/QuizFlow'));
const FAQ = lazy(() => import('./components/FAQ'));

const TIMER_KEY = 'slimigood_timer';
const EXIT_KEY = 'slimigood_exit_shown';

const getDeadline = () => {
  const stored = localStorage.getItem(TIMER_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored) as { deadline: number };
      if (parsed.deadline > Date.now()) {
        return parsed.deadline;
      }
    } catch (error) {
      console.warn('Failed to parse timer', error);
    }
  }
  const deadline = new Date();
  deadline.setHours(23, 59, 0, 0);
  localStorage.setItem(TIMER_KEY, JSON.stringify({ deadline: deadline.getTime() }));
  return deadline.getTime();
};

const App = () => {
  const [variant, setVariant] = useState<HeroVariant>('A');
  const [timerLabel, setTimerLabel] = useState('23:59');
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [quizVisible, setQuizVisible] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    initAnalytics();
    setVariant(resolveVariant());
    track('view_page', { path: window.location.pathname });
  }, []);

  useEffect(() => {
    const updateTimer = () => {
      const deadline = getDeadline();
      const diff = deadline - Date.now();
      if (diff <= 0) {
        localStorage.removeItem(TIMER_KEY);
        setTimerLabel('00:00');
        return;
      }
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimerLabel(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (event.clientY <= 40) {
        const alreadyShown = localStorage.getItem(EXIT_KEY);
        if (!alreadyShown) {
          setShowExitIntent(true);
          localStorage.setItem(EXIT_KEY, Date.now().toString());
          track('exit_intent_shown', {});
        }
      }
    };
    document.addEventListener('mouseleave', handler);
    return () => document.removeEventListener('mouseleave', handler);
  }, []);

  useEffect(() => {
    if (quizVisible && !quizStarted) {
      setQuizStarted(true);
      track('quiz_start', { variant });
    }
  }, [quizVisible, quizStarted, variant]);

  const ctaLabel = useMemo(
    () => (variant === 'A' ? 'Получить скидку −45%' : 'Пройти квиз за 30 секунд'),
    [variant]
  );

  const handlePrimaryAction = () => {
    track('cta_click', { variant });
    if (variant === 'B') {
      setQuizVisible(true);
      document.querySelector('#quiz')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      document.querySelector('#offer')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (variant === 'B') {
      setQuizVisible(true);
    }
  }, [variant]);

  return (
    <div className="relative min-h-screen bg-slate-950">
      <Hero variant={variant} onPrimaryAction={handlePrimaryAction} timerLabel={timerLabel} />
      <Benefits />
      <HowItWorks />
      <Calculator />
      <section className="bg-slate-900/40 py-24" id="quiz">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 max-w-2xl">
            <h2 className="text-3xl font-semibold text-white">Квиз SlimiGood</h2>
            <p className="mt-4 text-slate-300">
              Ответьте на 5 вопросов и получите персональный прогноз. Куратор учтёт ваш опыт и ограничения.
            </p>
          </div>
          {quizVisible ? (
            <Suspense
              fallback={
                <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-8 text-slate-200">Загружаем квиз…</div>
              }
            >
              <QuizFlow
                onComplete={() => {
                  document.querySelector('#offer')?.scrollIntoView({ behavior: 'smooth' });
                }}
              />
            </Suspense>
          ) : (
            <button
              type="button"
              className="rounded-full border border-brand px-6 py-3 text-sm font-semibold text-brand"
              onClick={() => setQuizVisible(true)}
            >
              Начать квиз
            </button>
          )}
        </div>
      </section>
      <Offer />
      <SocialProof />
      <Guarantees />
      <Suspense fallback={null}>
        <FAQ />
      </Suspense>
      <Footer />
      <Toasts />
      <StickyCTA label={ctaLabel} onClick={handlePrimaryAction} />
      <ExitIntentModal open={showExitIntent} onClose={() => setShowExitIntent(false)} />
    </div>
  );
};

export default App;
