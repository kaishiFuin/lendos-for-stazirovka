const steps = [
  {
    title: 'Диагностика',
    text: 'Заполняете анкету и получаете консультацию нутрициолога для персональной программы.'
  },
  {
    title: 'Доставка',
    text: 'Курьер привозит SlimiGood в удобное время. Напоминаем о старте приёма.'
  },
  {
    title: 'Поддержка',
    text: 'Каждую неделю эксперт корректирует план и отвечает на вопросы в чате.'
  },
  {
    title: 'Результат',
    text: 'Фиксируем прогресс, делаем контрольные замеры и закрепляем привычки.'
  }
];

const HowItWorks = () => (
  <section className="bg-white/5">
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="text-3xl font-bold">Как проходит программа</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-4">
        {steps.map((step, index) => (
          <div key={step.title} className="relative rounded-2xl border border-white/10 p-6">
            <span className="absolute -top-4 left-4 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-neutral font-bold">
              {index + 1}
            </span>
            <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm text-white/70">{step.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
