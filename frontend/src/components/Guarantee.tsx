import { guaranteeText } from '../data/content';

export function Guarantee(): JSX.Element {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-slate-900/50 px-8 py-12 text-center">
        <h2 className="text-3xl font-semibold">{guaranteeText.title}</h2>
        <p className="mt-6 text-white/70">{guaranteeText.description}</p>
        <div className="mt-10 inline-flex flex-col items-center gap-2">
          <svg className="h-16 w-16" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="38" fill="rgba(249,168,38,0.15)" stroke="rgba(249,168,38,0.5)" strokeWidth="2" />
            <text x="40" y="48" textAnchor="middle" fontFamily="'Segoe UI', sans-serif" fontSize="28" fill="#F9A826">
              60
            </text>
          </svg>
          <span className="text-sm text-white/60">дней защиты</span>
        </div>
        <p className="mt-6 text-sm text-white/50">{guaranteeText.signature}</p>
      </div>
    </section>
  );
}
