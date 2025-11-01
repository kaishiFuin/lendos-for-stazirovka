import { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { validateEmail } from '../lib/validators';
import { track } from '../lib/analytics';
import type { Variant } from '../lib/ab';

interface ExitIntentModalProps {
  open: boolean;
  onClose: () => void;
  variant: Variant;
}

export const ExitIntentModal = ({ open, onClose, variant }: ExitIntentModalProps) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const disabled = useMemo(() => status === 'loading', [status]);

  useEffect(() => {
    if (open) {
      track('exit_intent_shown', { variant });
    }
  }, [open, variant]);

  useEffect(() => {
    if (!open) {
      setStatus('idle');
      setEmail('');
      setError(null);
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validation = validateEmail(email);
    if (validation) {
      setError(validation);
      return;
    }
    setError(null);
    setStatus('loading');
    const delay = 1500 + Math.random() * 1000;
    await new Promise((resolve) => setTimeout(resolve, delay));
    const payload = {
      email,
      variant,
      context: 'exit_intent',
      submittedAt: new Date().toISOString()
    };
    try {
      const history = JSON.parse(localStorage.getItem('slimigood_leads') || '[]');
      history.push(payload);
      localStorage.setItem('slimigood_leads', JSON.stringify(history.slice(-200)));
    } catch (errorPersist) {
      console.warn('Failed to persist exit intent lead', errorPersist);
    }
    console.log('SlimiGood exit lead', payload);
    track('lead_submit', payload);
    setStatus('success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/70 transition hover:bg-white/10"
        >
          <X className="h-5 w-5" />
        </button>
        {status === 'success' ? (
          <div className="space-y-3 text-center">
            <h3 className="text-2xl font-semibold text-white">Уже закрепили скидку!</h3>
            <p className="text-sm text-white/70">Письмо с инструкциями и бонусом в пути. Проверьте папку «Промоакции».</p>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <h3 className="text-2xl font-semibold text-white">
              Уходите без прогноза?
              <br />
              Мы пришлём чек-лист для старта.
            </h3>
            <p className="text-sm text-white/70">
              Оставьте e-mail — пришлём персональный таймлайн SlimiGood и как удержать −7 кг за 28 дней.
            </p>
            <label className="space-y-1 text-sm">
              <span className="text-white/70">E-mail</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-accent"
                placeholder="you@example.com"
                disabled={disabled}
                required
              />
              {error ? <span className="text-xs text-rose-400">{error}</span> : null}
            </label>
            <button
              type="submit"
              disabled={disabled}
              className="w-full rounded-full bg-primary px-6 py-3 text-base font-semibold text-white transition hover:bg-primary/90 disabled:cursor-wait"
            >
              {status === 'loading' ? 'Отправляем…' : 'Получить чек-лист'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ExitIntentModal;
