import { FormEvent, useState } from 'react';
import { isValidEmail } from '../lib/validators';
import { track } from '../lib/analytics';

interface ExitIntentModalProps {
  open: boolean;
  onClose: () => void;
}

const ExitIntentModal = ({ open, onClose }: ExitIntentModalProps) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  if (!open) return null;

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValidEmail(email)) {
      setError('Введите корректный email');
      return;
    }
    setError(null);
    await new Promise((resolve) => setTimeout(resolve, 1600));
    const payload = { email, source: 'exit_intent', createdAt: new Date().toISOString() };
    const stored = localStorage.getItem('slimigood_leads');
    const leads = stored ? (JSON.parse(stored) as unknown[]) : [];
    leads.push(payload);
    localStorage.setItem('slimigood_leads', JSON.stringify(leads));
    // eslint-disable-next-line no-console
    console.log('SlimiGood lead', payload);
    setSent(true);
    track('lead_submit', payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/90 p-6 text-slate-200">
        <button type="button" className="ml-auto text-sm text-slate-400" onClick={onClose}>
          закрыть ✕
        </button>
        {!sent ? (
          <form className="mt-4 space-y-4" onSubmit={onSubmit}>
            <h3 className="text-xl font-semibold text-white">Успейте забрать скидку</h3>
            <p className="text-sm text-slate-300">
              Оставьте почту — пришлём купон и чек-лист «Как не сорваться в первые 3 дня».
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-base text-white focus:border-brand focus:outline-none"
              placeholder="you@example.com"
            />
            {error && <p className="text-xs text-red-400">{error}</p>}
            <button
              type="submit"
              className="w-full rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-glow"
            >
              Получить купон −45%
            </button>
          </form>
        ) : (
          <div className="space-y-4 text-center">
            <h3 className="text-xl font-semibold text-white">Купон уже в пути</h3>
            <p className="text-sm text-slate-300">Проверьте почту. Мы сохранили скидку для вас на ближайшие 24 часа.</p>
            <button
              type="button"
              className="rounded-full border border-brand px-5 py-2 text-sm text-brand"
              onClick={onClose}
            >
              Вернуться к сайту
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExitIntentModal;
