import { FormEvent, useState } from 'react';

import { track } from '../lib/analytics';
import type { Variant } from '../lib/ab';

type LeadFormProps = {
  variant: Variant;
  onOpenPolicy: () => void;
  onOpenAgreement: () => void;
};

type FormState = {
  full_name: string;
  email: string;
  phone: string;
  goal: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
};

const initialState: FormState = {
  full_name: '',
  email: '',
  phone: '',
  goal: '',
  utm_source: '',
  utm_medium: '',
  utm_campaign: '',
};

export function LeadForm({ variant, onOpenPolicy, onOpenAgreement }: LeadFormProps) {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          ab_variant: variant,
        }),
      });

      if (!response.ok) {
        throw new Error('Не удалось отправить заявку');
      }

      track('lead_submitted', { email: form.email }, variant);
      setStatus('success');
      setMessage('Спасибо! Куратор свяжется с вами в течение 15 минут.');
      setForm(initialState);
    } catch (error) {
      console.error(error);
      setStatus('error');
      setMessage('Произошла ошибка. Попробуйте позже или свяжитесь с нами через мессенджер.');
    }
  };

  return (
    <section className="py-20" id="lead-form">
      <div className="mx-auto max-w-3xl px-4">
        <div className="card-surface p-10">
          <h2 className="section-title">Оставьте заявку</h2>
          <p className="mt-4 text-center text-slate-300">
            Заполните форму, и куратор SlimiGood подберёт персональный план. Мы свяжемся с вами в течение рабочего дня.
          </p>
          <form className="mt-8 grid gap-6" onSubmit={handleSubmit}>
            <div className="grid gap-6 md:grid-cols-2">
              <label className="text-sm text-slate-200">
                Имя и фамилия
                <input
                  type="text"
                  required
                  value={form.full_name}
                  onChange={(event) => setForm({ ...form, full_name: event.target.value })}
                  className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900/40 px-4 py-3 text-slate-100 focus:border-brand focus:outline-none"
                />
              </label>
              <label className="text-sm text-slate-200">
                Email
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                  className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900/40 px-4 py-3 text-slate-100 focus:border-brand focus:outline-none"
                />
              </label>
              <label className="text-sm text-slate-200">
                Телефон
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(event) => setForm({ ...form, phone: event.target.value })}
                  className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900/40 px-4 py-3 text-slate-100 focus:border-brand focus:outline-none"
                />
              </label>
              <label className="text-sm text-slate-200">
                Ваша цель
                <input
                  type="text"
                  required
                  value={form.goal}
                  onChange={(event) => setForm({ ...form, goal: event.target.value })}
                  className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900/40 px-4 py-3 text-slate-100 focus:border-brand focus:outline-none"
                />
              </label>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <label className="text-xs uppercase tracking-wide text-slate-400">
                utm_source
                <input
                  type="text"
                  value={form.utm_source}
                  onChange={(event) => setForm({ ...form, utm_source: event.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900/40 px-3 py-2 text-sm text-slate-200 focus:border-brand focus:outline-none"
                />
              </label>
              <label className="text-xs uppercase tracking-wide text-slate-400">
                utm_medium
                <input
                  type="text"
                  value={form.utm_medium}
                  onChange={(event) => setForm({ ...form, utm_medium: event.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900/40 px-3 py-2 text-sm text-slate-200 focus:border-brand focus:outline-none"
                />
              </label>
              <label className="text-xs uppercase tracking-wide text-slate-400">
                utm_campaign
                <input
                  type="text"
                  value={form.utm_campaign}
                  onChange={(event) => setForm({ ...form, utm_campaign: event.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900/40 px-3 py-2 text-sm text-slate-200 focus:border-brand focus:outline-none"
                />
              </label>
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="rounded-full bg-accent px-6 py-3 text-base font-semibold text-slate-900 transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'loading' ? 'Отправляем...' : 'Получить персональный план'}
            </button>
            {message ? (
              <p className={`text-center text-sm ${status === 'error' ? 'text-warning' : 'text-success'}`}>{message}</p>
            ) : null}
            <p className="text-center text-xs text-slate-500">
              Нажимая кнопку, вы соглашаетесь с{' '}
              <button type="button" className="underline" onClick={onOpenPolicy}>
                Политикой конфиденциальности
              </button>{' '}
              и{' '}
              <button type="button" className="underline" onClick={onOpenAgreement}>
                Пользовательским соглашением
              </button>
              .
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default LeadForm;
