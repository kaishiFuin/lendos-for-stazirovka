import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { Hero } from './components/Hero';
import { Advantages } from './components/Advantages';
import { HowItWorks } from './components/HowItWorks';
import { Calculator } from './components/Calculator';
import { OfferSection } from './components/OfferSection';
import { SocialProof } from './components/SocialProof';
import { Guarantees } from './components/Guarantees';
import { Footer } from './components/Footer';
import { StickyCTA } from './components/StickyCTA';
import { ExitIntentModal } from './components/ExitIntentModal';
import { ToastStack } from './components/ToastStack';
import { bootstrapAnalytics, track } from './lib/analytics';
import { resolveVariant, Variant } from './lib/ab';

const FAQSection = lazy(() => import('./components/FAQ').then((module) => ({ default: module.FAQ })));
const QuizFlow = lazy(() => import('./components/Quiz').then((module) => ({ default: module.Quiz })));

type QuizSummary = Record<string, string> | null;

export default function App() {
  const [variant] = useState<Variant>(() => resolveVariant());
  const [quizActive, setQuizActive] = useState(false);
  const [quizSummary, setQuizSummary] = useState<QuizSummary>(null);

  useEffect(() => {
    bootstrapAnalytics();
    track('view_page', { variant });
  }, [variant]);

  useEffect(() => {
    if (quizSummary) {
      setQuizActive(false);
    }
  }, [quizSummary]);

  const handleScrollToOffer = () => {
    document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleStartQuiz = () => {
    setQuizActive(true);
    document.getElementById('quiz-block')?.scrollIntoView({ behavior: 'smooth' });
  };

  const quizInsight = useMemo(() => {
    if (!quizSummary) return null;
    const goal = quizSummary.goal;
    if (goal === 'soft') return 'Мы подготовим мягкий старт с акцентом на сон и питание.';
    if (goal === 'focused') return 'Упор на сбалансированную стратегию и еженедельные корректировки.';
    if (goal === 'intense') return 'Рекомендуем усиленную поддержку и дополнительный контроль врача.';
    return 'Персональный план будет готов после консультации.';
  }, [quizSummary]);

  return (
    <div className="relative overflow-hidden">
      <Hero variant={variant} onScrollToOffer={handleScrollToOffer} onStartQuiz={handleStartQuiz} />

      <section id="quiz-block" className="bg-slate-50 py-16">
        <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4">
          {quizActive && (
            <Suspense fallback={<div className="rounded-3xl bg-white p-10 text-center text-neutral/60">Загружаем квиз…</div>}>
              <QuizFlow onComplete={setQuizSummary} />
            </Suspense>
          )}
          {quizSummary && (
            <div className="rounded-3xl border border-brand/20 bg-white/90 p-6 shadow-soft">
              <p className="text-xl font-semibold text-neutral">Ваш персональный прогноз готов</p>
              <p className="mt-2 text-sm text-neutral/70">
                Мы учли ваши ответы по целям, режиму питания и уровню стресса. {quizInsight}
              </p>
              <button
                type="button"
                onClick={handleScrollToOffer}
                className="mt-4 inline-flex items-center rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white"
              >
                Забронировать скидку −45%
              </button>
            </div>
          )}
        </div>
      </section>

      <Advantages />
      <HowItWorks />
      <Calculator />
      <OfferSection />
      <SocialProof />
      <Guarantees />
      <Suspense fallback={<div className="bg-white py-20 text-center text-neutral/60">Загружаем ответы...</div>}>
        <FAQSection />
      </Suspense>
      <Footer />

      <ToastStack />
      <ExitIntentModal context="landing" />
      <StickyCTA variant={variant} onClick={variant === 'A' ? handleScrollToOffer : handleStartQuiz} />
    </div>
  );
}
