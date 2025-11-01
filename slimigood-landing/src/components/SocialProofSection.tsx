import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Елена, 34 года, Тверь',
    text: '«Минус 6,4 кг за 4 недели. Главное — режим питания и поддержка куратора: когда хотела сорваться, мы сразу корректировали меню. Дренаж и сон — топ.»'
  },
  {
    name: 'Юлия, 28 лет, Москва',
    text: '«Меню удобное, без сложных блюд. Привычка пить воду и контроль сахара избавили от вечерних сладких атак. Сейчас минус 5,1 кг.»'
  },
  {
    name: 'Наталья, 41 год, Казань',
    text: '«Понравилось, что не надо в зал — достаточно ходьбы и домашней активности. Вес уходит плавно, кожа подтянулась, отёки ушли.»'
  }
];

const badges = [
  '1500+ выпускников программы',
  '91% клиентов отмечают улучшение самочувствия',
  'NPS 68 по итогам 2023 года'
];

export const SocialProofSection = () => (
  <section className="section-container" id="social-proof">
    <div className="mx-auto max-w-3xl text-center">
      <span className="badge mx-auto bg-white/5">Соцдоказательства</span>
      <h2 className="mt-6 text-3xl font-semibold sm:text-4xl">Реальные результаты SlimiGood</h2>
    </div>
    <div className="mt-12 grid gap-6 md:grid-cols-3">
      {testimonials.map((testimonial) => (
        <div key={testimonial.name} className="card space-y-4">
          <Quote className="h-8 w-8 text-accent" />
          <p className="text-sm text-white/70">{testimonial.text}</p>
          <p className="text-xs font-semibold uppercase tracking-wide text-white/60">{testimonial.name}</p>
        </div>
      ))}
    </div>
    <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
      {badges.map((badge) => (
        <span key={badge} className="badge bg-white/10 text-white/80">
          {badge}
        </span>
      ))}
    </div>
  </section>
);

export default SocialProofSection;
