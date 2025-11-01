const ingredients = [
  {
    name: 'Экстракт гарцинии камбоджийской',
    effect: 'Ускоряет обмен веществ и блокирует синтез жиров'
  },
  {
    name: 'L-карнитин',
    effect: 'Поддерживает энергетический обмен и выносливость'
  },
  {
    name: 'Зелёный кофе',
    effect: 'Нормализует уровень сахара и контролирует аппетит'
  },
  {
    name: 'Витаминный комплекс B6+B12',
    effect: 'Снижает усталость и поддерживает нервную систему'
  }
];

const Composition = () => (
  <section className="mx-auto max-w-6xl px-4">
    <h2 className="text-3xl font-bold">Состав SlimiGood</h2>
    <p className="mt-2 text-white/70">Формула подобрана нутрициологами и безопасна при длительном применении.</p>
    <div className="mt-8 grid gap-6 md:grid-cols-2">
      {ingredients.map((item) => (
        <div key={item.name} className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-xl font-semibold text-accent">{item.name}</h3>
          <p className="mt-2 text-sm text-white/70">{item.effect}</p>
        </div>
      ))}
    </div>
  </section>
);

export default Composition;
