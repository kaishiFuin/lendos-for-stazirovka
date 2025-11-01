import { reviews } from '../data/content';

export function ReviewsMarquee() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="section-title">Отзывы участников</h2>
        <div className="marquee mt-10">
          <div className="marquee-track">
            {reviews.concat(reviews).map((review, index) => (
              <div key={`${review.name}-${index}`} className="card-surface w-80 p-6">
                <p className="text-sm text-slate-200">“{review.quote}”</p>
                <p className="mt-4 text-xs uppercase tracking-widest text-slate-500">{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReviewsMarquee;
