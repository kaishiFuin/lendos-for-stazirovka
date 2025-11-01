const guarantees = [
  {
    title: '14 дней на раздумья',
    description: 'Если программа не подойдёт — вернём деньги без лишних вопросов.'
  },
  {
    title: 'Только сертифицированные кураторы',
    description: 'Команда SlimiGood — дипломированные нутрициологи и психологи поведения.'
  },
  {
    title: 'Данные под защитой',
    description: 'Ваши ответы и прогресс хранятся в зашифрованном виде на серверах в ЕС.'
  }
];

export const Guarantees = () => (
  <section className="mx-auto max-w-6xl px-6 py-20">
    <div className="grid gap-8 rounded-3xl border border-primary/20 bg-primary/5 p-8 md:grid-cols-3">
      {guarantees.map((item) => (
        <div key={item.title} className="space-y-2">
          <div className="text-lg font-semibold text-white">{item.title}</div>
          <p className="text-sm text-white/70">{item.description}</p>
        </div>
      ))}
    </div>
  </section>
);
