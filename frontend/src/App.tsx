import { StickyBar } from './sections/StickyBar';
import { Hero } from './sections/Hero';
import { SocialProof } from './sections/SocialProof';
import { Offer } from './sections/Offer';
import { Benefits } from './sections/Benefits';
import { BeforeAfter } from './sections/BeforeAfter';
import { HowItWorks } from './sections/HowItWorks';
import { Composition } from './sections/Composition';
import { ReviewsMarquee } from './sections/ReviewsMarquee';
import { Pricing } from './sections/Pricing';
import { Guarantee } from './sections/Guarantee';
import { FAQ } from './sections/FAQ';
import { LeadForm } from './sections/LeadForm';
import { Footer } from './sections/Footer';
import { FloatingMessengers } from './components/FloatingMessengers';
import { ExitIntent } from './components/ExitIntent';

export default function App() {
  return (
    <div className="relative bg-light text-dark">
      <StickyBar />
      <Hero />
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
      <LeadForm />
      <Footer />
      <FloatingMessengers />
      <ExitIntent />
    </div>
  );
}
