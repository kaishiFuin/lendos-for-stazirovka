import { useState } from 'react';

const faq = [
  {
    q: 'Что включено в программу SlimiGood?',
    a: 'Персональный план питания и активности, чат с куратором, еженедельные созвоны и PDF-дневник привычек.'
  },
  {
    q: 'Нужно ли посещать спортзал?',
    a: 'Нет. Программа адаптируется под ваш уровень активности. Достаточно ходьбы и лёгких домашних тренировок.'
  },
  {
    q: 'Когда я получу план?',
    a: 'Первые рекомендации придут в течение 2 часов после оплаты, полный план — максимум за сутки.'
  },
  {
    q: 'Как работает гарантия возврата?',
    a: 'Если не получите персональный план или останетесь недовольны подходом в первые 7 дней, вернём деньги.'
  }
];

const FAQ = () => {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-slate-950 py-24" id="faq">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="text-3xl font-semibold text-white">FAQ</h2>
        <div className="mt-10 space-y-4">
          {faq.map((item, index) => {
            const expanded = open === index;
            return (
              <div key={item.q} className="rounded-3xl border border-white/10 bg-slate-900/70">
                <button
                  type="button"
                  onClick={() => setOpen((prev) => (prev === index ? -1 : index))}
                  className="flex w-full items-center justify-between px-6 py-4 text-left text-sm text-white"
                >
                  <span>{item.q}</span>
                  <span className="text-accent">{expanded ? '—' : '+'}</span>
                </button>
                {expanded && <div className="px-6 pb-6 text-sm text-slate-300">{item.a}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
