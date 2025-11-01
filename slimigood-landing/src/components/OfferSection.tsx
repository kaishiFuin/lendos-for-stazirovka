import { useState } from 'react';
import { validateEmail, validateName, validatePhone } from '../lib/validators';
import { track } from '../lib/analytics';
import { Variant } from '../lib/ab';

const LEADS_KEY = 'slimigood_leads';

type OfferSectionProps = {
  variant: Variant;
};

type LeadFormState = {
  name: string;
  phone: string;
  email: string;
};

const initialState: LeadFormState = {
  name: '',
  phone: '',
  email: ''
};

export const OfferSection = ({ variant }: OfferSectionProps) => {
  const [state, setState] = useState(initialState);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof LeadFormState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateName(state.name)) {
      setError('Имя: минимум 2 символа.');
      return;
    }
    if (!validatePhone(state.phone)) {
      setError('Телефон: укажите номер полностью.');
      return;
    }
    if (!validateEmail(state.email)) {
      setError('Email: проверьте формат.');
      return;
    }
    setError(null);
    setStatus('loading');
    track('lead_submit', { source: 'offer', variant });
    await new Promise((resolve) => setTimeout(resolve, 1600 + Math.random() * 400));
    setStatus('success');
    try {
      const stored = localStorage.getItem(LEADS_KEY);
      const leads = stored ? (JSON.parse(stored) as LeadFormState[]) : [];
      const payload = { ...state, submittedAt: new Date().toISOString(), variant };
      localStorage.setItem(LEADS_KEY, JSON.stringify([...leads, payload]));
      console.log('Lead stored', payload);
    } catch (err) {
      console.warn('Lead store failed', err);
    }
  };

  return (
    <section id="offer" className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-white md:text-4xl">−45% сегодня + подарок</h2>
          <p className="text-white/70">
            Только сегодня скидка −45% на стартовую программу SlimiGood. После оплаты получите PDF-дневник привычек (ссылка на Google
            Drive заглушку) и персональный созвон с экспертом.
          </p>
          <ul className="grid gap-3 text-sm text-white/70">
            <li>• Персональный режим питания и сна</li>
            <li>• Доступ к чату поддержки и еженедельные корректировки</li>
            <li>• Подарок: PDF-дневник, который помогает держать фокус на прогрессе</li>
          </ul>
          <a
            href="https://drive.google.com/drive/folders/placeholder"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary/80"
          >
            Посмотреть, как выглядит дневник →
          </a>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-xl font-semibold text-white">Заберите скидку −45%</h3>
          <p className="text-sm text-white/60">Оставьте контакты — менеджер подберёт удобное время созвона.</p>
          <input
            type="text"
            placeholder="Имя"
            value={state.name}
            onChange={handleChange('name')}
            className="rounded-2xl border border-white/10 bg-dark/50 px-4 py-3 text-white focus:border-primary focus:outline-none"
            required
          />
          <input
            type="tel"
            placeholder="Телефон"
            value={state.phone}
            onChange={handleChange('phone')}
            className="rounded-2xl border border-white/10 bg-dark/50 px-4 py-3 text-white focus:border-primary focus:outline-none"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={state.email}
            onChange={handleChange('email')}
            className="rounded-2xl border border-white/10 bg-dark/50 px-4 py-3 text-white focus:border-primary focus:outline-none"
            required
          />
          {error ? <p className="text-sm text-accent">{error}</p> : null}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="rounded-full bg-accent px-6 py-3 text-base font-semibold text-white transition hover:bg-accent/90 disabled:cursor-wait disabled:opacity-70"
          >
            {status === 'loading' ? 'Отправляем...' : status === 'success' ? 'Заявка отправлена!' : 'Забронировать скидку'}
          </button>
          {status === 'success' ? (
            <p className="text-sm text-primary">
              Мы уже получили ваши данные. Проверяйте почту — придёт подтверждение и шаги для старта.
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
};
