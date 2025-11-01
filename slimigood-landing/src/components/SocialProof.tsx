const testimonials = [
  {
    name: 'Елена, 34 года, Тверь',
    text: 'С SlimiGood ушли 6 кг за месяц без срывов. Понравилось, что куратор всегда был на связи и помогал адаптировать меню под семью.'
  },
  {
    name: 'Наталья, 41 год, Казань',
    text: 'Минус 5,2 кг — и впервые без чувства вины. Очень зашла поддержка в чате и еженедельные звонки.'
  },
  {
    name: 'Марина, 28 лет, Санкт-Петербург',
    text: 'Я вообще не верила в онлайн-программы, но SlimiGood показал прогресс уже через 10 дней. Главное — всё плавно и комфортно.'
  }
];

const badges = [
  '4.9★ рейтинг поддержки',
  '12 000+ клиентов',
  'На рынке с 2019 года',
  'Сертифицированные специалисты'
];

export const SocialProof = () => (
  <section className="mx-auto max-w-6xl px-6 py-20">
    <div className="mb-10 flex flex-col gap-3">
      <h2 className="text-3xl font-bold text-white md:text-4xl">Соцдоказательства</h2>
      <p className="max-w-2xl text-white/70">Мы собрали реальные отзывы и факты, которые подтверждают эффективность SlimiGood.</p>
    </div>
    <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
      <div className="grid gap-6">
        {testimonials.map((item) => (
          <div key={item.name} className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-lg font-semibold text-white">{item.name}</div>
            <p className="mt-2 text-sm text-white/70">{item.text}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/80">
        <div className="text-base font-semibold text-white">Факты, которым доверяют</div>
        <ul className="grid gap-3">
          {badges.map((badge) => (
            <li key={badge} className="rounded-2xl border border-white/10 bg-dark/40 px-4 py-3">
              {badge}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);
