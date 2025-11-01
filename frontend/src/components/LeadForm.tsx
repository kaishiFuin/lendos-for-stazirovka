import { FormEvent, useEffect, useMemo, useState } from 'react';
import { submitLead } from '../lib/api';
import { trackABEvent, trackEvent } from '../lib/analytics';
import type { Variant } from '../lib/ab';

interface LeadFormProps {
  variant: Variant;
}

const initialForm = {
  name: '',
  phone: '',
  email: '',
  message: '',
};

export function LeadForm({ variant }: LeadFormProps): JSX.Element {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const utmParams = useUTMParams();

  useEffect(() => {
    if (status === 'success') {
      trackEvent({ name: 'lead_form_success', payload: { variant } });
      trackABEvent(variant, 'lead_form_success');
    }
  }, [status, variant]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setError(null);
    trackEvent({ name: 'lead_form_submit_attempt', payload: { variant } });
    trackABEvent(variant, 'lead_form_submit_attempt');
    try {
      await submitLead({
        ...form,
        ab_variant: variant,
        ...utmParams,
      });
      setStatus('success');
      setForm(initialForm);
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Ошибка отправки');
    }
  };

  return (
    <section className="py-20" id="lead-form">
      <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-slate-900/60 px-8 py-12 shadow-xl">
        <div className="text-center">
          <h2 className="text-3xl font-semibold">Оставьте заявку и получите SlimiGood сегодня</h2>
          <p className="mt-4 text-sm text-white/70">Мы свяжемся с вами в течение 15 минут, чтобы подтвердить заказ.</p>
        </div>
        <form className="mt-10 grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Имя"
              name="name"
              value={form.name}
              onChange={(value) => setForm((prev) => ({ ...prev, name: value }))}
              required
            />
            <Input
              label="Телефон"
              name="phone"
              value={form.phone}
              onChange={(value) => setForm((prev) => ({ ...prev, phone: value }))}
              required
            />
          </div>
          <Input
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={(value) => setForm((prev) => ({ ...prev, email: value }))}
          />
          <TextArea
            label="Комментарий"
            name="message"
            value={form.message}
            onChange={(value) => setForm((prev) => ({ ...prev, message: value }))}
            placeholder="Уточните желаемый результат или время звонка"
          />
          {error ? <p className="text-sm text-danger">{error}</p> : null}
          {status === 'success' ? (
            <p className="rounded-2xl border border-success/40 bg-success/10 px-4 py-3 text-sm text-success" role="status" aria-live="polite">
              Заявка отправлена! Мы уже готовим персональную консультацию.
            </p>
          ) : null}
          <button
            type="submit"
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-slate-900 transition hover:bg-white"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Отправляем…' : 'Получить SlimiGood со скидкой 50%'}
          </button>
          <p className="text-xs text-white/40">
            Отправляя форму, вы соглашаетесь с политикой конфиденциальности и условиями оферты.
          </p>
        </form>
      </div>
    </section>
  );
}

function Input({ label, name, type = 'text', value, onChange, required }: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}): JSX.Element {
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="text-white/70">{label}</span>
      <input
        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-accent focus:outline-none"
        name={name}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
      />
    </label>
  );
}

function TextArea({ label, name, value, onChange, placeholder }: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}): JSX.Element {
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="text-white/70">{label}</span>
      <textarea
        className="min-h-[120px] rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-accent focus:outline-none"
        name={name}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}

function useUTMParams(): Record<string, string | undefined> {
  return useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get('utm_source') || undefined,
      utm_medium: params.get('utm_medium') || undefined,
      utm_campaign: params.get('utm_campaign') || undefined,
    };
  }, []);
}
