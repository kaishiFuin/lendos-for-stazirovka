import { useEffect, useState } from 'react';
import { validateEmail } from '../lib/validators';
import { track } from '../lib/analytics';

const MODAL_KEY = 'slimigood_exit_intent';

type ExitIntentModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ExitIntentModal = ({ isOpen, onClose }: ExitIntentModalProps) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setStatus('idle');
      setError(null);
    }
  }, [isOpen]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateEmail(email)) {
      setError('Проверьте email.');
      return;
    }
    setError(null);
    setStatus('loading');
    track('lead_submit', { source: 'exit_intent' });
    await new Promise((resolve) => setTimeout(resolve, 1800));
    setStatus('success');
    localStorage.setItem(MODAL_KEY, JSON.stringify({ submittedAt: Date.now() }));
    console.log('Exit intent lead', email);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6">
      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-slate-900 p-8">
        <div className="mb-4 text-2xl font-semibold text-white">Не уходите без подарка</div>
        <p className="mb-6 text-sm text-white/70">Оставьте email — пришлём план первых шагов и подборку рецептов.</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            className="rounded-2xl border border-white/10 bg-dark/50 px-4 py-3 text-white focus:border-primary focus:outline-none"
            required
          />
          {error ? <p className="text-sm text-accent">{error}</p> : null}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="rounded-full bg-primary px-6 py-3 text-base font-semibold text-slate-900 transition hover:bg-primary/90 disabled:cursor-wait disabled:opacity-70"
          >
            {status === 'loading' ? 'Отправляем...' : status === 'success' ? 'Готово! Письмо в пути' : 'Получить материалы'}
          </button>
          {status === 'success' ? <p className="text-sm text-primary">Проверяйте почту — письмо уже отправлено.</p> : null}
        </form>
        <button onClick={onClose} className="mt-6 text-sm text-white/60 underline-offset-4 hover:text-white">
          Закрыть
        </button>
      </div>
    </div>
  );
};

export const useExitIntent = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(MODAL_KEY);
    if (stored) {
      return;
    }
    const handler = (event: MouseEvent) => {
      if (event.clientY < 24) {
        setIsOpen(true);
        track('exit_intent_shown');
        window.removeEventListener('mouseout', handler);
      }
    };
    window.addEventListener('mouseout', handler);
    return () => window.removeEventListener('mouseout', handler);
  }, []);

  return { isOpen, setIsOpen } as const;
};
