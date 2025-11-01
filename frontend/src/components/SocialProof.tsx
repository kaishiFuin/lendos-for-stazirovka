import { socialProofLogos } from '../data/content';

export function SocialProof(): JSX.Element {
  return (
    <section className="border-t border-b border-white/10 bg-slate-900/50 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-white/50">SlimiGood выбирают ведущие клиники</p>
        <div className="grid w-full grid-cols-2 gap-6 text-lg text-white/70 sm:grid-cols-4">
          {socialProofLogos.map((logo) => (
            <div
              key={logo}
              className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-6 shadow-inner"
            >
              <svg viewBox="0 0 180 60" className="mx-auto h-10 w-32">
                <rect x="1" y="1" width="178" height="58" rx="12" fill="none" stroke="rgba(148, 163, 184, 0.4)" />
                <text
                  x="50%"
                  y="50%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fontFamily="'Segoe UI', sans-serif"
                  fontSize="18"
                  fill="rgba(226,232,240,0.85)"
                >
                  {logo}
                </text>
              </svg>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
