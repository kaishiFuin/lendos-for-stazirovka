const items = [
  {
    question: 'Безопасен ли SlimiGood?',
    answer: 'Продукт сертифицирован, изготовлен по стандартам GMP и подходит для длительного приёма. Перед стартом рекомендована консультация врача.'
  },
  {
    question: 'Когда ждать первые результаты?',
    answer: 'По отзывам участников, лёгкость и уменьшение объёмов заметны уже через 10–14 дней регулярного применения в сочетании с рекомендациями по питанию.'
  },
  {
    question: 'Можно ли совмещать с другими добавками?',
    answer: 'Да, SlimiGood совместим с большинством витаминных комплексов. Исключение — средства с сильным термогенным эффектом; обсудите это с нашим экспертом.'
  },
  {
    question: 'Как оформить заказ?',
    answer: 'Заполните форму и дождитесь звонка специалиста. Мы уточним адрес доставки и удобное время, подтверждение придёт в мессенджер.'
  }
];

const FAQ = () => (
  <section className="mx-auto max-w-5xl px-4">
    <h2 className="text-3xl font-bold">Частые вопросы</h2>
    <div className="mt-6 space-y-4">
      {items.map((item) => (
        <details key={item.question} className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <summary className="cursor-pointer text-lg font-semibold">{item.question}</summary>
          <p className="mt-2 text-sm text-white/70">{item.answer}</p>
        </details>
      ))}
    </div>
  </section>
);

export default FAQ;
