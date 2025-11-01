const faqs = [
  {
    question: 'Мне обязательно принимать SlimiGood, если я хочу только план питания?',
    answer: 'Основная программа включает нутрицевтики и план питания — именно сочетание даёт быстрый, но безопасный прогресс. Если у вас противопоказания, нутрициолог адаптирует протокол.'
  },
  {
    question: 'Нужно ли дополнительно ходить в спортзал?',
    answer: 'Нет. Достаточно пешей активности 6–8 тыс. шагов в день и лёгких домашних тренировок по желанию.'
  },
  {
    question: 'Как выглядит сопровождение?',
    answer: 'Вы получаете чат с куратором 7/7, еженедельные созвоны и корректировки по меню. Все рекомендации фиксируются в PDF-дневнике.'
  },
  {
    question: 'Что если у меня сорвётся график?',
    answer: 'Мы адаптируем рацион и режим приёма SlimiGood под ваш график — ночные смены, командировки или семейные события учитываются.'
  }
];

export const FAQSection = () => (
  <section className="section-container" id="faq">
    <div className="mx-auto max-w-3xl text-center">
      <span className="badge mx-auto bg-white/5">FAQ</span>
      <h2 className="mt-6 text-3xl font-semibold sm:text-4xl">Ответы на частые вопросы</h2>
    </div>
    <div className="mt-10 space-y-4">
      {faqs.map((faq) => (
        <details key={faq.question} className="group rounded-3xl border border-white/10 bg-white/5 p-6">
          <summary className="cursor-pointer list-none text-lg font-semibold text-white">
            <div className="flex items-center justify-between">
              <span>{faq.question}</span>
              <span className="text-accent transition group-open:rotate-45">+</span>
            </div>
          </summary>
          <p className="mt-4 text-sm text-white/70">{faq.answer}</p>
        </details>
      ))}
    </div>
  </section>
);

export default FAQSection;
