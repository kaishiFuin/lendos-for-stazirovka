import { useEffect, useState } from 'react';
import StickyBar from './components/StickyBar';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import Offer from './components/Offer';
import Benefits from './components/Benefits';
import BeforeAfter from './components/BeforeAfter';
import HowItWorks from './components/HowItWorks';
import Composition from './components/Composition';
import ReviewsMarquee from './components/ReviewsMarquee';
import Pricing from './components/Pricing';
import Guarantee from './components/Guarantee';
import FAQ from './components/FAQ';
import LeadForm from './components/LeadForm';
import Footer from './components/Footer';
import FloatingMessengers from './components/FloatingMessengers';
import Timer from './components/Timer';
import ExitIntent from './components/ExitIntent';
import SpinnerGame from './components/SpinnerGame';
import { getVariant } from './lib/ab';

const App = () => {
  const [variant, setVariant] = useState(getVariant());

  useEffect(() => {
    setVariant(getVariant());
  }, []);

  return (
    <div className="bg-neutral text-white">
      <StickyBar variant={variant} />
      <main className="space-y-24">
        <Hero variant={variant} />
        <Timer />
        <SocialProof />
        <Offer variant={variant} />
        <Benefits />
        <BeforeAfter />
        <HowItWorks />
        <Composition />
        <ReviewsMarquee />
        <Pricing />
        <Guarantee />
        <FAQ />
        <LeadForm />
      </main>
      <Footer />
      <FloatingMessengers />
      <ExitIntent />
      <SpinnerGame />
    </div>
  );
};

export default App;
