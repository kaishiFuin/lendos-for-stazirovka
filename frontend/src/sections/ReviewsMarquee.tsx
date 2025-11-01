import { useEffect } from 'react';
import { Container } from '../components/Container';
import { analytics } from '../lib/analytics';

const reviews = [
  '«Минус 5,4 кг без качалки — и сон нормализовался уже на второй неделе.» — Марина, 37',
  '«Меню под ненормированный график — ничего лишнего, всё вкусно и быстро.» — Екатерина, 29',
  '«Поддержка куратора 24/7 спасает от срывов, минус 2 размера джинсов.» — Анна, 34',
  '«Перестала заедать стресс, научилась планировать приёмы пищи и воду.» — Ольга, 41',
];

export function ReviewsMarquee() {
  useEffect(() => {
    analytics.view('reviews');
  }, []);
  return (
    <section data-section="reviews" className="bg-secondary py-12 text-white">
      <Container>
        <div className="overflow-hidden">
          <div className="flex animate-marquee gap-8 whitespace-nowrap text-sm font-semibold">
            {reviews.concat(reviews).map((review) => (
              <span key={review} className="rounded-full border border-white/40 px-6 py-3">
                {review}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
