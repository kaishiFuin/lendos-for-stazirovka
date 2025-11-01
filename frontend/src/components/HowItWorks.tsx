import { howItWorks } from '../data/content';

export function HowItWorks(): JSX.Element {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-3xl font-semibold">Как SlimiGood работает в вашем организме</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {howItWorks.map((step, index) => (
            <div key={step.title} className="rounded-3xl border border-white/10 bg-slate-900/40 p-8">
              <svg className="h-16 w-16" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="40" r="38" fill="rgba(107,78,255,0.15)" stroke="rgba(107,78,255,0.4)" strokeWidth="2" />
                <text x="40" y="48" textAnchor="middle" fontFamily="'Segoe UI', sans-serif" fontSize="28" fill="#F9FAFB">
                  {index + 1}
                </text>
              </svg>
              <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
              <p className="mt-3 text-sm text-white/70">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
