import { pricingPlans } from '../data/content';

type PricingProps = {
  onCtaClick: () => void;
};

export function Pricing({ onCtaClick }: PricingProps) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="section-title">Тарифы SlimiGood</h2>
        <p className="mt-4 text-center text-slate-300">
          Выберите формат сопровождения: от самостоятельного прохождения до персональной команды экспертов.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {pricingPlans.map((plan) => (
            <div
              key={plan.title}
              className={`card-surface flex flex-col p-6 ${plan.popular ? 'border-brand shadow-lg shadow-brand/30' : ''}`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-slate-100">{plan.title}</h3>
                {plan.popular ? <span className="tag">Популярный</span> : null}
              </div>
              <p className="mt-4 text-3xl font-bold text-slate-50">{plan.price}</p>
              <p className="mt-2 text-sm text-slate-300">{plan.description}</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-200">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-brand-light" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={onCtaClick}
                className="mt-8 rounded-full bg-brand px-5 py-2 text-sm font-semibold text-slate-50 transition hover:bg-brand-dark"
              >
                Выбрать тариф
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;
