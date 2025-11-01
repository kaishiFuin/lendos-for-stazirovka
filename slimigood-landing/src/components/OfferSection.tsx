import { Gift, Notebook, Sparkles } from 'lucide-react';
import { LeadForm } from './LeadForm';

export function OfferSection() {
  return (
    <section id="offer" className="bg-gradient-to-b from-white to-slate-50 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
          <div className="space-y-5">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-2 text-sm font-semibold text-brand">
              <Sparkles className="h-4 w-4" /> Только сегодня
            </span>
            <h2 className="text-4xl font-semibold text-neutral">
              −45% на полное сопровождение + подарок — PDF-дневник SlimiGood
            </h2>
            <p className="text-lg text-neutral/75">
              Вы стартуете с индивидуальной стратегией, поддержкой нутрициолога и психолога, а также получаете доступ к закрытому
              сообществу с прямыми эфирами.
            </p>
            <ul className="space-y-3 text-sm text-neutral/70">
              <li className="flex items-start gap-3">
                <Gift className="mt-1 h-4 w-4 text-brand" />
                <span>
                  Подарок: <a className="text-brand underline" href="https://drive.google.com" target="_blank" rel="noreferrer">PDF-дневник SlimiGood</a> для отслеживания прогресса.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Notebook className="mt-1 h-4 w-4 text-brand" />
                <span>Персональный чек-лист питания и активности под ваш график.</span>
              </li>
              <li className="flex items-start gap-3">
                <Sparkles className="mt-1 h-4 w-4 text-brand" />
                <span>Еженедельные бонусы: разбор прогресса, доступ к рецептам, мотивационные аудио.</span>
              </li>
            </ul>
          </div>
          <LeadForm context="offer_section" submitLabel="Забронировать скидку" />
        </div>
      </div>
    </section>
  );
}
