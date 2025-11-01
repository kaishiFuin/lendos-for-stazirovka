import { FormEvent, useEffect, useState } from 'react';
import { track } from '../lib/analytics';
import { validateEmail } from '../lib/validators';

const STORAGE_KEY = 'slimigood_exit_intent';

interface ExitIntentModalProps {
  context: string;
}

export function ExitIntentModal({ context }: ExitIntentModalProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) return;

    const handleMouseLeave = (event: MouseEvent) => {
      if (event.clientY <= 0) {
        window.localStorage.setItem(STORAGE_KEY, 'shown');
        setOpen(true);
        track('exit_intent_shown', { context });
      }
    };

    window.addEventListener('mouseout', handleMouseLeave);
    return () => window.removeEventListener('mouseout', handleMouseLeave);
  }, [context]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateEmail(email);
    setError(validation);
    if (validation) return;

    setSubmitted(true);
    const delay = 1500 + Math.random() * 1000;
    window.setTimeout(() => {
      const lead = { email, context: `${context}_exit_intent`, timestamp: Date.now() };
      console.log('[slimigood] lead_submit', lead);
      track('lead_submit', lead);
    }, delay);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-semibold text-neutral">Оставьте email и получите чек-лист старта</h3>
            <p className="mt-2 text-sm text-neutral/70">Мы пришлём PDF с рекомендациями и зафиксируем скидку −45%.</p>
          </div>
          <button
            type="button"
            aria-label="Закрыть"
            className="text-2xl text-neutral/40"
            onClick={() => setOpen(false)}
          >
            ×
          </button>
        </div>
        {submitted ? (
          <div className="rounded-2xl bg-brand/10 p-5 text-sm text-brand">
            Спасибо! Письмо уже летит на {email}. Проверьте папку «Промо» или «Спам».
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="flex flex-col gap-2 text-sm">
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                placeholder="name@example.com"
                required
              />
            </label>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              className="w-full rounded-full bg-brand px-6 py-3 text-base font-semibold text-white hover:bg-brand-dark"
            >
              Получить чек-лист
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
