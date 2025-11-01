const guarantees = [
  {
    title: 'Прозрачная оплата',
    description: 'Фиксированная стоимость. Никаких upsell после оплаты. Договор оферты — в вашем личном кабинете.'
  },
  {
    title: 'Гарантия плана',
    description: 'Если в течение 24 часов вы не получите персональный план, вернём 100% оплаты без вопросов.'
  },
  {
    title: 'Команда на связи',
    description: 'Куратор и нутрициолог отвечают в течение 15 минут с 8:00 до 23:00 по Москве — ежедневно.'
  }
];

const Guarantees = () => (
  <section className="bg-slate-900/40 py-24" id="guarantees">
    <div className="mx-auto max-w-6xl px-6">
      <h2 className="text-3xl font-semibold text-white">Гарантии SlimiGood</h2>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {guarantees.map((item) => (
          <div key={item.title} className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 text-sm text-slate-200">
            <h3 className="text-xl font-semibold text-white">{item.title}</h3>
            <p className="mt-3 text-slate-300">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Guarantees;
