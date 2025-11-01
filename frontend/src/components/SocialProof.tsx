import { socialProofLogos } from '../data/content';

export function SocialProof() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <p className="text-sm uppercase tracking-widest text-slate-500">С SlimiGood работают эксперты</p>
        <div className="marquee mt-6">
          <div className="marquee-track text-slate-400">
            {socialProofLogos.concat(socialProofLogos).map((logo, index) => (
              <span key={`${logo}-${index}`} className="text-lg font-semibold">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SocialProof;
