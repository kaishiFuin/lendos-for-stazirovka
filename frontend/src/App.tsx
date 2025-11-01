import { useEffect } from 'react';
import { StickyBar } from './components/StickyBar';
import { Hero } from './components/Hero';
import { SocialProof } from './components/SocialProof';
import { Offer } from './components/Offer';
import { Benefits } from './components/Benefits';
import { BeforeAfter } from './components/BeforeAfter';
import { HowItWorks } from './components/HowItWorks';
import { Composition } from './components/Composition';
import { ReviewsMarquee } from './components/ReviewsMarquee';
import { Pricing } from './components/Pricing';
import { Guarantee } from './components/Guarantee';
import { FAQ } from './components/FAQ';
import { LeadForm } from './components/LeadForm';
import { Footer } from './components/Footer';
import { FloatingMessengers } from './components/FloatingMessengers';
import { TimerWidget } from './components/TimerWidget';
import { ExitIntent } from './components/ExitIntent';
import { SpinnerGame } from './components/SpinnerGame';
import { useABVariant } from './hooks/useABVariant';
import { trackEvent } from './lib/analytics';

export default function App(): JSX.Element {
  const variant = useABVariant();

  useEffect(() => {
    trackEvent({ name: 'app_view', payload: { variant } });
  }, [variant]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-white">
      <StickyBar />
      <main className="relative mx-auto max-w-6xl px-4 pb-24 pt-16">
        <Hero variant={variant} />
        <SocialProof />
        <Offer />
        <Benefits />
        <BeforeAfter />
        <HowItWorks />
        <Composition />
        <ReviewsMarquee />
        <Pricing />
        <Guarantee />
        <FAQ />
        <SpinnerGame />
        <LeadForm variant={variant} />
      </main>
      <Footer />
      <FloatingMessengers />
      <TimerWidget />
      <ExitIntent />
    </div>
  );
}
