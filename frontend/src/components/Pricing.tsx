import { pricingPlans } from '../data/content';
import { trackEvent } from '../lib/analytics';

export function Pricing(): JSX.Element {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-semibold">Выберите подходящий курс SlimiGood</h2>
          <p className="mt-4 text-white/70">Все тарифы включают доставку, поддержку и доступ к закрытым материалам.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col rounded-3xl border p-8 transition ${
                plan.best
                  ? 'border-accent bg-accent/10 shadow-xl shadow-accent/20'
                  : 'border-white/10 bg-slate-900/40'
              }`}
            >
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <p className="mt-2 text-3xl font-bold text-accent">{plan.price}</p>
              <p className="mt-3 text-sm text-white/70">{plan.description}</p>
              <ul className="mt-6 space-y-2 text-sm text-white/80">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex-1" />
              <a
                href="#lead-form"
                className={`mt-8 block rounded-full px-6 py-3 text-center font-semibold transition ${
                  plan.best ? 'bg-accent text-slate-900 hover:bg-white' : 'bg-white/10 hover:bg-white/20'
                }`}
                onClick={() => trackEvent({ name: 'pricing_cta_click', payload: { plan: plan.name } })}
              >
                Выбрать тариф
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
