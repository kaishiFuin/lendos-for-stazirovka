import { reviews } from '../data/content';

export function ReviewsMarquee(): JSX.Element {
  const items = [...reviews, ...reviews];
  return (
    <section className="py-16">
      <div className="overflow-hidden border-y border-white/10 bg-slate-900/40">
        <div className="animate-marquee flex min-w-full gap-12 px-8 py-6">
          {items.map((review, index) => (
            <blockquote
              key={`${review}-${index}`}
              className="min-w-[320px] max-w-sm rounded-2xl border border-white/10 bg-slate-900/70 p-6 text-sm text-white/80"
            >
              {review}
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
