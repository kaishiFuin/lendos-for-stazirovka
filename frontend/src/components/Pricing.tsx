const plans = [
  {
    name: 'Старт',
    price: '2 490 ₽',
    description: '1 упаковка SlimiGood + консультация нутрициолога',
    features: ['Онлайн-поддержка 14 дней', 'Гайд по питанию', 'Напоминания в мессенджере']
  },
  {
    name: 'Курс',
    price: '6 900 ₽',
    description: '3 упаковки + персональная программа питания',
    features: ['Поддержка 30 дней', 'Контрольные замеры', 'Сессии с экспертом']
  },
  {
    name: 'PRO',
    price: '9 990 ₽',
    description: '5 упаковок + глубокий детокс и анализы',
    features: ['Сопровождение 60 дней', 'План тренировок', 'Консьерж-сервис доставки']
  }
];

const Pricing = () => (
  <section className="mx-auto max-w-6xl px-4">
    <h2 className="text-3xl font-bold">Тарифы и комплекты</h2>
    <p className="mt-2 text-white/70">Цены действуют до конца недели. Оплата после консультации.</p>
    <div className="mt-8 grid gap-6 md:grid-cols-3">
      {plans.map((plan) => (
        <div key={plan.name} className="flex flex-col rounded-3xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-2xl font-semibold text-accent">{plan.name}</h3>
          <p className="mt-4 text-4xl font-bold">{plan.price}</p>
          <p className="mt-2 text-sm text-white/70">{plan.description}</p>
          <ul className="mt-6 space-y-2 text-sm text-white/70">
            {plan.features.map((feature) => (
              <li key={feature}>• {feature}</li>
            ))}
          </ul>
          <a href="#lead" className="mt-auto inline-flex justify-center rounded bg-accent px-4 py-2 font-semibold text-neutral">
            Оставить заявку
          </a>
        </div>
      ))}
    </div>
  </section>
);

export default Pricing;
