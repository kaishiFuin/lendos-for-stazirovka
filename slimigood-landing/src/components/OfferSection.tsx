import { Gift, Shield } from 'lucide-react';
import LeadForm from './LeadForm';
import type { Variant } from '../lib/ab';

interface OfferSectionProps {
  variant: Variant;
}

export const OfferSection = ({ variant }: OfferSectionProps) => (
  <section className="section-container" id="offer">
    <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
      <div className="space-y-6">
        <span className="badge bg-white/5">Оффер дня</span>
        <h2 className="text-3xl font-semibold sm:text-4xl">−45% сегодня + PDF-дневник SlimiGood</h2>
        <p className="text-white/70">
          Забронируйте скидку, и куратор закрепит за вами персональный план SlimiGood. В подарок — PDF-дневник питания с чек-листами и вдохновляющими рецептами.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="card space-y-2">
            <div className="flex items-center gap-3 text-white/80">
              <Shield className="h-6 w-6 text-accent" />
              <p className="font-semibold">Гарантия возврата 14 дней</p>
            </div>
            <p className="text-sm text-white/60">Если программа не зайдёт, мы вернём деньги и дадим рекомендации по альтернативам.</p>
          </div>
          <a
            href="https://drive.google.com/drive/folders/placeholder-slimigood"
            target="_blank"
            rel="noreferrer"
            className="card space-y-2 transition hover:border-accent/40"
          >
            <div className="flex items-center gap-3 text-white/80">
              <Gift className="h-6 w-6 text-accent" />
              <p className="font-semibold">PDF-дневник SlimiGood</p>
            </div>
            <p className="text-sm text-white/60">Загляните в структуру дневника: чек-листы питания, отслеживание прогресса и мини-ритуалы.</p>
          </a>
        </div>
      </div>
      <div className="card bg-white/10 p-6">
        <h3 className="text-2xl font-semibold text-white">Закрепите скидку сейчас</h3>
        <p className="mt-2 text-sm text-white/70">Оставьте контакты — позвоним в течение 15 минут и ответим на вопросы.</p>
        <div className="mt-6">
          <LeadForm variant={variant} context="offer" />
        </div>
      </div>
    </div>
  </section>
);

export default OfferSection;
