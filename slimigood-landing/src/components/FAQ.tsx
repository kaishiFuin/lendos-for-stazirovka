import { useState } from 'react';

const items = [
  {
    q: 'Сколько времени занимает программа каждый день?',
    a: 'В среднем 15–20 минут на подготовку еды и 10 минут на чек-ин с куратором. Всё адаптируется под ваш график.'
  },
  {
    q: 'Нужно ли соблюдать строгую диету?',
    a: 'Мы не заставляем голодать. SlimiGood строит меню из привычных продуктов и учит балансировать БЖУ.'
  },
  {
    q: 'Что, если у меня нет времени на спорт?',
    a: 'Подберём мягкие активности — прогулки, растяжку или короткие домашние комплексы по 10 минут.'
  },
  {
    q: 'Подходит ли программа после беременности?',
    a: 'Да, наши специалисты учитывают восстановление организма и подбирают бережный режим.'
  },
  {
    q: 'Как быстро я увижу результат?',
    a: 'Первые изменения в самочувствии — уже через неделю. Вес уходит плавно: 0,5–1 кг в неделю.'
  }
];

const FAQ = () => {
  const [open, setOpen] = useState<string>(items[0].q);

  return (
    <section id="faq" className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-10 flex flex-col gap-3">
        <h2 className="text-3xl font-bold text-white md:text-4xl">FAQ</h2>
        <p className="max-w-2xl text-white/70">Самые частые вопросы о запуске программы SlimiGood.</p>
      </div>
      <div className="space-y-4">
        {items.map((item) => {
          const isOpen = open === item.q;
          return (
            <button
              key={item.q}
              onClick={() => setOpen(isOpen ? '' : item.q)}
              className="flex w-full flex-col gap-2 rounded-3xl border border-white/10 bg-white/5 px-6 py-4 text-left text-white transition hover:border-primary/40"
            >
              <div className="flex items-center justify-between gap-4 text-lg font-semibold">
                <span>{item.q}</span>
                <span className="text-primary">{isOpen ? '−' : '+'}</span>
              </div>
              <div
                className={`text-sm text-white/70 transition-[max-height,opacity] duration-300 ${
                  isOpen ? 'max-h-40 opacity-100' : 'max-h-0 overflow-hidden opacity-0'
                }`}
              >
                {item.a}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default FAQ;
