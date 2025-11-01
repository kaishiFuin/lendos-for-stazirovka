import { ShieldCheck, Undo2, Wallet } from 'lucide-react';

const guarantees = [
  {
    icon: ShieldCheck,
    title: 'Юридическая гарантия возврата',
    text: 'Если за 14 дней нет прогресса по ключевым метрикам — вернем деньги без вопросов.'
  },
  {
    icon: Wallet,
    title: 'Честная цена',
    text: 'Фиксируем скидку −45% при бронировании сегодня, без скрытых платежей и доплат.'
  },
  {
    icon: Undo2,
    title: 'Возможность заморозки',
    text: 'Можно сделать паузу до 30 дней, сохранив условия и доступ к материалам.'
  }
];

export function Guarantees() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <p className="section-title">Гарантии SlimiGood</p>
        <p className="section-subtitle">
          Мы уверены в методике и ставим прозрачные условия: вы видите динамику, а мы помогаем удерживать мотивацию.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {guarantees.map((guarantee) => (
            <div key={guarantee.title} className="card h-full bg-white">
              <guarantee.icon className="h-10 w-10 text-brand" aria-hidden="true" />
              <h3 className="mt-4 text-xl font-semibold text-neutral">{guarantee.title}</h3>
              <p className="mt-2 text-sm text-neutral/70">{guarantee.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
