import { useState } from 'react';

const faqs = [
  {
    question: 'Какая длительность программы?',
    answer: 'Базовый цикл — 28 дней. При необходимости продлеваем на второй цикл, чтобы закрепить результат.'
  },
  {
    question: 'Нужно ли посещать спортзал?',
    answer: 'Нет. Мы подбираем активности под ваш график: от лёгких прогулок до коротких домашних тренировок.'
  },
  {
    question: 'Что входит в сопровождение?',
    answer: 'Персональный план питания, чат с куратором, еженедельный созвон, доступ к базе рецептов и психологическим практикам.'
  },
  {
    question: 'Можно ли отказаться?',
    answer: 'Да, в течение 14 дней можно запросить возврат, если программа не подходит. Мы вернём деньги и дадим рекомендации.'
  }
];

export function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="bg-white py-20">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="section-title">FAQ — отвечаем на частые вопросы</p>
          <p className="section-subtitle">
            Если не нашли ответ — оставьте заявку, и мы подключим куратора, который расскажет о программе подробнее.
          </p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = open === index;
            return (
              <div key={faq.question} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-6 py-5 text-left text-lg font-semibold text-neutral"
                  onClick={() => setOpen(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                >
                  {faq.question}
                  <span className="text-2xl text-brand">{isOpen ? '−' : '+'}</span>
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden px-6 pb-6 text-sm leading-relaxed text-neutral/70">{faq.answer}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
