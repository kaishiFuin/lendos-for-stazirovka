import { CheckCircle, Gift } from 'lucide-react';
import { offerHighlights } from '../data/content';
import { Timer } from './Timer';

export function Offer(): JSX.Element {
  return (
    <section className="py-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-950 px-8 py-12 shadow-xl shadow-brand/10 lg:flex-row">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1 text-xs uppercase tracking-[0.4em] text-accent">
            Оффер 4U
          </div>
          <h2 className="text-3xl font-semibold">Закажите SlimiGood сегодня и получите максимум преимуществ</h2>
          <p className="text-white/70">
            Активируйте персональную скидку и получите бонусные материалы, чтобы результат держался месяцами.
          </p>
          <ul className="grid gap-3 text-white/80 sm:grid-cols-2">
            {offerHighlights.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle className="mt-1 h-5 w-5 text-success" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex w-full max-w-sm flex-col items-center gap-6 self-center rounded-2xl border border-accent/40 bg-slate-900/60 px-8 py-10">
          <Gift className="h-10 w-10 text-accent" />
          <p className="text-center text-sm text-white/70">
            Скидка действует ограниченное время — успейте оформить заявку, пока таймер не обнулится.
          </p>
          <Timer minutes={90} label="До конца акции" />
          <a
            href="#lead-form"
            className="w-full rounded-full bg-accent px-6 py-3 text-center font-semibold text-slate-900 transition hover:bg-white"
          >
            Забронировать скидку 50%
          </a>
        </div>
      </div>
    </section>
  );
}
