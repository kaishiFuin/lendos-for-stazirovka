import { howItWorks } from '../data/content';

export function HowItWorks() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="section-title">Как проходит программа</h2>
        <p className="mt-4 text-center text-slate-300">
          SlimiGood — это пошаговая карта от диагностики до закрепления результата. Каждый этап сопровождается куратором и мотивацией.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {howItWorks.map((step, index) => (
            <div key={step.title} className="card-surface p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/20 text-brand">
                {index + 1}
              </div>
              <step.icon className="mt-5 h-8 w-8 text-brand-light" />
              <h3 className="mt-4 text-xl font-semibold text-slate-100">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
