import { composition } from '../data/content';

export function Composition() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="card-surface p-10">
          <h2 className="section-title">Что внутри SlimiGood</h2>
          <p className="mt-4 text-center text-slate-300">
            Формула создана нутрициологами и тестировалась на 300+ участниках. Все компоненты сертифицированы и безопасны.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {composition.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-700 bg-slate-900/40 p-6">
                <item.icon className="h-7 w-7 text-brand-light" />
                <h3 className="mt-4 text-lg font-semibold text-slate-100">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Composition;
