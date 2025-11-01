import { Quote } from 'lucide-react';

const reviews = [
  {
    name: 'Елена, 34',
    city: 'Тверь',
    text: 'Минус 6,8 кг за первый цикл. Без изнурительных тренировок — куратор помог перестроить питание и сон.'
  },
  {
    name: 'Дарья, 29',
    city: 'Санкт-Петербург',
    text: 'Главный инсайт — не нужно голодать. С SlimiGood минус 7,2 кг и плюс спокойствие без зажоров.'
  },
  {
    name: 'Антон, 41',
    city: 'Екатеринбург',
    text: 'Классные трекеры и вовремя напоминают про воду. Вес ушёл на 5,9 кг, а давление нормализовалось.'
  }
];

const badges = [
  { title: '14 000+', description: 'Историй успеха' },
  { title: '4,9/5', description: 'Средняя оценка клиентов' },
  { title: '72 часа', description: 'На запуск программы' }
];

export function SocialProof() {
  return (
    <section id="reviews" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl">
            <p className="section-title">Соцдоказательства</p>
            <p className="section-subtitle">
              Программа SlimiGood обновляется каждые 3 месяца. Мы опираемся на реальные метрики клиентов и прозрачные прогнозы.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {badges.map((badge) => (
                <div key={badge.title} className="rounded-3xl border border-brand/10 bg-brand/5 p-5 text-center">
                  <p className="text-3xl font-semibold text-brand">{badge.title}</p>
                  <p className="text-sm text-neutral/70">{badge.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid flex-1 gap-6 sm:grid-cols-2">
            {reviews.map((review) => (
              <blockquote key={review.name} className="card bg-slate-50/80 text-sm leading-relaxed text-neutral/80">
                <Quote className="h-6 w-6 text-brand" aria-hidden="true" />
                <p className="mt-3">{review.text}</p>
                <footer className="mt-4 font-semibold text-neutral">
                  {review.name} · {review.city}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
