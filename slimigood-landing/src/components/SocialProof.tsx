const testimonials = [
  {
    name: 'Елена, 34 года',
    text: 'За месяц минус 6,2 кг. Без истерик и голодовок: куратор помог адаптировать режим под сменную работу.'
  },
  {
    name: 'Марина, 29 лет',
    text: 'Стала есть чаще, но легче. Благодаря дневнику увидела, где теряю энергию. Минус 5,1 кг — без спортзала.'
  },
  {
    name: 'Ольга, 42 года',
    text: 'Главное — поддержка. Когда вес встал, куратор поменял меню и добавил прогулки. В итоге −7,4 кг за 5 недель.'
  }
];

const badges = [
  { label: '12 842 клиентов', sub: 'за последний год' },
  { label: 'NPS 72', sub: 'довольных рекомендаций' },
  { label: '4.9/5', sub: 'рейтинг в приложении' }
];

const SocialProof = () => (
  <section className="bg-slate-950 py-24" id="social">
    <div className="mx-auto max-w-6xl px-6">
      <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold text-white">Люди уже запускают свой минус со SlimiGood</h2>
          <p className="mt-4 text-slate-300">
            Реальные истории клиентов, которые хотели мягко уменьшить вес и получили поддержку вместо стресса.
          </p>
        </div>
        <div className="flex gap-4 text-sm text-slate-200">
          {badges.map((badge) => (
            <div key={badge.label} className="rounded-2xl border border-white/10 bg-slate-900/70 px-5 py-3">
              <p className="text-lg font-semibold text-white">{badge.label}</p>
              <p className="text-xs text-slate-400">{badge.sub}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {testimonials.map((item) => (
          <article key={item.name} className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 text-sm text-slate-200">
            <p>“{item.text}”</p>
            <p className="mt-4 font-semibold text-white">{item.name}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default SocialProof;
