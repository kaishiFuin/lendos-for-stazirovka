import * as Icons from 'lucide-react';
import { benefits } from '../data/content';

export function Benefits(): JSX.Element {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-3xl font-semibold">Три ключевые причины выбрать SlimiGood</h2>
        <p className="mt-4 text-center text-white/70">
          Формула создана нутрициологами и сочетает мягкое жиросжигание, контроль аппетита и детокс.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = (Icons as Record<string, Icons.LucideIcon>)[benefit.icon] ?? Icons.Star;
            return (
              <div
                key={benefit.title}
                className="gradient-border rounded-3xl border border-white/10 bg-slate-900/40 p-8"
              >
                <Icon className="h-10 w-10 text-accent" />
                <h3 className="mt-6 text-xl font-semibold">{benefit.title}</h3>
                <p className="mt-3 text-sm text-white/70">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
