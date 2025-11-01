const steps = [
  {
    title: 'Диагностика и цель',
    description: 'Собираем данные о питании, анализах и образе жизни. Формируем безопасную цель на 4 недели.'
  },
  {
    title: 'Запуск программы',
    description: 'Получаете план питания, расписание активности и чек-листы. Подключаем напоминания и куратора.'
  },
  {
    title: 'Контроль и поддержка',
    description: 'Каждые 7 дней делимся результатами, корректируем план, подключаем дополнительные трекеры.'
  }
];

const HowItWorks = () => (
  <section className="bg-slate-900/40 py-24" id="how">
    <div className="mx-auto max-w-6xl px-6">
      <div className="mb-12 max-w-2xl">
        <h2 className="text-3xl font-semibold text-white">Как SlimiGood ведёт к минусу плавно</h2>
        <p className="mt-4 text-slate-300">
          Не нужно угадывать: вы знаете, что делать сегодня, чтобы завтра быть ближе к своей цифре.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((step, index) => (
          <div key={step.title} className="rounded-3xl border border-white/10 bg-slate-950/70 p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand/20 text-lg font-semibold text-brand">
              0{index + 1}
            </div>
            <h3 className="text-xl font-semibold text-white">{step.title}</h3>
            <p className="mt-3 text-sm text-slate-300">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
