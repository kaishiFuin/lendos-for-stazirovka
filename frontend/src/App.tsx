import { useCallback, useEffect, useState } from 'react';

import BeforeAfter from './components/BeforeAfter';
import Benefits from './components/Benefits';
import Composition from './components/Composition';
import ExitIntent from './components/ExitIntent';
import FAQ from './components/FAQ';
import FloatingMessengers from './components/FloatingMessengers';
import Footer from './components/Footer';
import Guarantee from './components/Guarantee';
import Hero from './components/Hero';
import LeadForm from './components/LeadForm';
import Offer from './components/Offer';
import Pricing from './components/Pricing';
import ReviewsMarquee from './components/ReviewsMarquee';
import SocialProof from './components/SocialProof';
import SpinnerGame from './components/SpinnerGame';
import StickyBar from './components/StickyBar';
import HowItWorks from './components/HowItWorks';
import Timer from './components/Timer';
import PolicyModal from './components/PolicyModal';
import type { Variant } from './lib/ab';
import { track } from './lib/analytics';

type AppProps = {
  variant: Variant;
};

const privacyContent = [
  'Мы собираем только те данные, которые вы добровольно указываете в форме: имя, email, телефон и цель участия. Информация хранится в защищённом хранилище и используется исключительно для связи с куратором.',
  'Доступ к данным имеют только уполномоченные сотрудники SlimiGood. Мы не передаём их третьим лицам без вашего согласия и соблюдаем требования 152-ФЗ.',
  'Вы можете запросить удаление данных в любой момент, написав на hello@slimigood.example.',
];

const agreementContent = [
  'Оставляя заявку, вы подтверждаете, что ознакомлены с программой SlimiGood и готовы следовать рекомендациям кураторов.',
  'Оплата происходит по безопасным каналам. Возврат средств возможен в течение 14 дней при отсутствии прогресса по условиям гарантии.',
  'Все материалы курса являются интеллектуальной собственностью SlimiGood. Запрещено распространять материалы без письменного согласия.',
];

function App({ variant }: AppProps) {
  const [spinnerOpen, setSpinnerOpen] = useState(false);
  const [spinnerPrize, setSpinnerPrize] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);

  const scrollToLeadForm = useCallback(() => {
    const node = document.getElementById('lead-form');
    if (node) {
      node.scrollIntoView({ behavior: 'smooth' });
      track('cta_click', { location: window.location.pathname }, variant);
    }
  }, [variant]);

  useEffect(() => {
    if (spinnerPrize) {
      track('spinner_prize_viewed', { prize: spinnerPrize }, variant);
    }
  }, [spinnerPrize, variant]);

  return (
    <div className="relative overflow-hidden">
      <StickyBar onCtaClick={scrollToLeadForm} />
      <FloatingMessengers />
      <SpinnerGame
        isOpen={spinnerOpen}
        onClose={() => setSpinnerOpen(false)}
        variant={variant}
        onPrize={(prize) => {
          setSpinnerPrize(prize);
          setSpinnerOpen(false);
        }}
      />
      <ExitIntent variant={variant} onCtaClick={scrollToLeadForm} />
      {activeModal ? (
        <PolicyModal
          title={activeModal === 'privacy' ? 'Политика конфиденциальности' : 'Пользовательское соглашение'}
          content={activeModal === 'privacy' ? privacyContent : agreementContent}
          onClose={() => setActiveModal(null)}
        />
      ) : null}
      <main className="space-y-10">
        <Hero variant={variant} onCtaClick={scrollToLeadForm} onOpenSpinner={() => setSpinnerOpen(true)} />
        {spinnerPrize ? (
          <div className="mx-auto max-w-3xl px-4">
            <div className="card-surface flex items-center justify-between p-6">
              <p className="text-sm text-slate-200">Ваш приз: {spinnerPrize}</p>
              <button
                type="button"
                onClick={scrollToLeadForm}
                className="rounded-full bg-brand px-4 py-2 text-xs font-semibold text-slate-50"
              >
                Забрать
              </button>
            </div>
          </div>
        ) : null}
        <SocialProof />
        <Offer onCtaClick={scrollToLeadForm} />
        <Benefits variant={variant} />
        <section className="bg-slate-950 py-20">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 text-center">
            <h2 className="section-title">Обратный отсчёт до следующего потока</h2>
            <Timer storageKey="slimigood_flow_timer" durationMinutes={360} />
            <p className="text-sm text-slate-300">Стартуем в понедельник, закрепите место заранее.</p>
          </div>
        </section>
        <BeforeAfter onCtaClick={scrollToLeadForm} />
        <HowItWorks />
        <Composition />
        <ReviewsMarquee />
        <Pricing onCtaClick={scrollToLeadForm} />
        <Guarantee />
        <FAQ />
        <LeadForm
          variant={variant}
          onOpenPolicy={() => setActiveModal('privacy')}
          onOpenAgreement={() => setActiveModal('terms')}
        />
      </main>
      <Footer onOpenPolicy={() => setActiveModal('privacy')} onOpenAgreement={() => setActiveModal('terms')} />
    </div>
  );
}

export default App;
