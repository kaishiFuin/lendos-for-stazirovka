import { benefits } from '../data/content';

type BenefitsProps = {
  variant: 'control' | 'focus-benefits';
};

export function Benefits({ variant }: BenefitsProps) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center text-center">
          <h2 className="section-title">Почему SlimiGood работает</h2>
          <p className="mt-4 max-w-2xl text-slate-300">
            Системная программа устраняет ключевые причины набора веса: дефицит питательных веществ, стресс и отсутствие структуры. {variant === 'focus-benefits' ? 'Вариант B подчёркивает конкретные выгоды для занятых людей и быстрый прогресс.' : 'Контрольный вариант концентрируется на истории программы.'}
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="card-surface p-6 text-left">
              <benefit.icon className="h-10 w-10 text-brand-light" />
              <h3 className="mt-5 text-xl font-semibold text-slate-100">{benefit.title}</h3>
              <p className="mt-3 text-sm text-slate-300">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Benefits;
