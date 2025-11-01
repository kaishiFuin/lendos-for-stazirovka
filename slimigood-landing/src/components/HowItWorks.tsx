const steps = [
  {
    title: 'Старт и диагностика',
    description: 'Заполняете квиз и короткую анкету, получаете рекомендации от врача и чек-лист подготовительных шагов.'
  },
  {
    title: '28 дней сопровождения',
    description: 'Еженедельный созвон, корректировки питания и активности, поддержка в чате 24/7.'
  },
  {
    title: 'Фиксация результата',
    description: 'Закрепляем привычки, подбираем стратегию на следующие 90 дней, выдаем PDF-дневник и доступ к базе рецептов.'
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="section-title">Как SlimiGood ведёт вас к минус 7 кг</p>
          <p className="section-subtitle">
            Программа построена на коротких циклах: каждые 7 дней измеряем результат и усиливаем то, что работает.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="card h-full border-brand/10 bg-white">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-lg font-semibold text-brand">
                0{index + 1}
              </span>
              <h3 className="mt-4 text-xl font-semibold text-neutral">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral/70">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
