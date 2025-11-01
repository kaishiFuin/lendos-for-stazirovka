import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import HeroSection from './components/HeroSection';
import BenefitsSection from './components/BenefitsSection';
import HowItWorksSection from './components/HowItWorksSection';
import CalculatorSection from './components/CalculatorSection';
import OfferSection from './components/OfferSection';
import SocialProofSection from './components/SocialProofSection';
import GuaranteesSection from './components/GuaranteesSection';
import Footer from './components/Footer';
import StickyCTA from './components/StickyCTA';
import ExitIntentModal from './components/ExitIntentModal';
import ToastStack, { type ToastItem } from './components/ToastStack';
import { pickVariant, type Variant } from './lib/ab';
import { track } from './lib/analytics';

const QuizSection = lazy(() => import('./components/QuizSection'));
const FAQSection = lazy(() => import('./components/FAQSection'));

const EXIT_STORAGE_KEY = 'slimigood_exit_shown';

const toastMessages = [
  'Елена из Твери оформила SlimiGood 12 минут назад',
  'Алексей из Казани забронировал консультацию и бонус',
  'Мария из Москвы прошла квиз и получила персональный план',
  'Ольга из Самары фиксирует −3,8 кг после 2 недель SlimiGood'
];

const readExitStorage = () => {
  if (typeof window === 'undefined') return false;
  try {
    const stored = localStorage.getItem(EXIT_STORAGE_KEY);
    if (!stored) return false;
    const parsed = JSON.parse(stored) as { expiresAt: number };
    return parsed.expiresAt > Date.now();
  } catch (error) {
    console.warn('Failed to parse exit intent storage', error);
  }
  return false;
};

const persistExitStorage = () => {
  if (typeof window === 'undefined') return;
  try {
    const expiresAt = Date.now() + 1000 * 60 * 60 * 12;
    localStorage.setItem(EXIT_STORAGE_KEY, JSON.stringify({ expiresAt }));
  } catch (error) {
    console.warn('Failed to persist exit intent storage', error);
  }
};

function App() {
  const [variant, setVariant] = useState<Variant>('A');
  const [exitOpen, setExitOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timeoutRefs = useRef<number[]>([]);

  useEffect(() => {
    setVariant(pickVariant());
  }, []);

  useEffect(() => {
    const spawnToast = () => {
      const id = Date.now();
      setToasts((prev) => {
        const next: ToastItem[] = [...prev, { id: String(id), message: toastMessages[Math.floor(Math.random() * toastMessages.length)] }];
        return next.slice(-3);
      });
      const timeout = window.setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== String(id)));
      }, 6000);
      timeoutRefs.current.push(timeout);
    };

    const initial = window.setTimeout(spawnToast, 4000);
    const interval = window.setInterval(spawnToast, 20000);

    return () => {
      clearTimeout(initial);
      clearInterval(interval);
      timeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
      timeoutRefs.current = [];
    };
  }, []);

  useEffect(() => {
    const handleMouseLeave = (event: MouseEvent) => {
      if (event.clientY <= 0 && !exitOpen && !readExitStorage()) {
        setExitOpen(true);
        persistExitStorage();
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [exitOpen]);

  const handleCta = () => {
    const targetId = variant === 'A' ? 'offer' : 'quiz';
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const stickyLabel = useMemo(() => (variant === 'A' ? 'offer' : 'quiz'), [variant]);

  useEffect(() => {
    track('variant_resolved', { variant });
  }, [variant]);

  return (
    <div className="flex min-h-screen flex-col">
      <HeroSection variant={variant} onCtaClick={handleCta} />
      {variant === 'B' ? (
        <Suspense fallback={<div className="section-container text-center text-white/60">Загружаем квиз…</div>}>
          <QuizSection variant={variant} />
        </Suspense>
      ) : null}
      <BenefitsSection />
      <HowItWorksSection />
      <CalculatorSection />
      <OfferSection variant={variant} />
      <SocialProofSection />
      <GuaranteesSection />
      <Suspense fallback={<div className="section-container text-center text-white/60">Загружаем ответы…</div>}>
        <FAQSection />
      </Suspense>
      <Footer />
      <StickyCTA variant={variant} onClick={handleCta} key={stickyLabel} />
      <ExitIntentModal open={exitOpen} onClose={() => setExitOpen(false)} variant={variant} />
      <ToastStack toasts={toasts} />
    </div>
  );
}

export default App;
