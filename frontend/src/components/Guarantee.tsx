import { ShieldCheck } from 'lucide-react';

import { guaranteePoints } from '../data/content';

export function Guarantee() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-4xl px-4">
        <div className="card-surface p-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-slate-50">Гарантия результата</h2>
          <p className="mt-4 text-slate-300">
            Мы уверены в программе SlimiGood и честно прописываем условия возврата. Если прогресс не наступит — поддержим и вернём деньги.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-slate-200">
            {guaranteePoints.map((point) => (
              <li key={point} className="flex items-center justify-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Guarantee;
