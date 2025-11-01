const reviews = [
  '«Минус 5,3 кг за месяц без жёстких ограничений в питании» — Анна, 34 года',
  '«Понравилось сопровождение, нутрициолог на связи каждый день» — Ольга, 29 лет',
  '«Ушли отёки и нормализовался сон — огромная благодарность команде» — Марина, 41 год',
  '«Третья неделя — и одежда уже свободнее, продолжаю курс» — Светлана, 37 лет'
];

const ReviewsMarquee = () => (
  <section className="overflow-hidden border-y border-white/10 bg-white/5">
    <div className="flex animate-marquee gap-12 whitespace-nowrap py-6 text-sm text-white/80">
      {reviews.concat(reviews).map((review, index) => (
        <span key={`${review}-${index}`}>{review}</span>
      ))}
    </div>
  </section>
);

export default ReviewsMarquee;
