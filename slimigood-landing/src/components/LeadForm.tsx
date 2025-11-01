import { useMemo, useState } from 'react';
import { validateEmail, validateName, validatePhone } from '../lib/validators';
import { track } from '../lib/analytics';
import type { Variant } from '../lib/ab';

interface LeadFormProps {
  variant: Variant;
  context: string;
}

interface FormState {
  name: string;
  phone: string;
  email: string;
}

const initialState: FormState = {
  name: '',
  phone: '',
  email: ''
};

export const LeadForm = ({ variant, context }: LeadFormProps) => {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const disabled = useMemo(() => status === 'loading', [status]);

  const validate = () => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    const nameError = validateName(form.name);
    if (nameError) nextErrors.name = nameError;
    const phoneError = validatePhone(form.phone);
    if (phoneError) nextErrors.phone = phoneError;
    const emailError = validateEmail(form.email);
    if (emailError) nextErrors.email = emailError;
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const updateField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    const delay = 1500 + Math.random() * 1000;
    await new Promise((resolve) => setTimeout(resolve, delay));
    const payload = {
      ...form,
      variant,
      context,
      submittedAt: new Date().toISOString()
    };
    try {
      const history = JSON.parse(localStorage.getItem('slimigood_leads') || '[]');
      history.push(payload);
      localStorage.setItem('slimigood_leads', JSON.stringify(history.slice(-200)));
    } catch (error) {
      console.warn('Failed to persist lead', error);
    }
    console.log('SlimiGood lead', payload);
    track('lead_submit', payload);
    setStatus('success');
  };

  if (status === 'success') {
    return (
      <div className="space-y-3 rounded-3xl border border-accent/40 bg-accent/10 p-6 text-center text-sm text-white/80">
        <h4 className="text-xl font-semibold text-white">Заявка зафиксирована!</h4>
        <p>Куратор свяжется с вами в течение 15 минут, чтобы закрепить скидку и выслать PDF-дневник.</p>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="space-y-1 text-sm">
          <span className="text-white/70">Имя</span>
          <input
            type="text"
            value={form.name}
            onChange={(event) => updateField('name', event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-accent"
            disabled={disabled}
            required
            placeholder="Анастасия"
          />
          {errors.name ? <span className="text-xs text-rose-400">{errors.name}</span> : null}
        </label>
        <label className="space-y-1 text-sm">
          <span className="text-white/70">Телефон</span>
          <input
            type="tel"
            value={form.phone}
            onChange={(event) => updateField('phone', event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-accent"
            disabled={disabled}
            required
            placeholder="+7 (999) 123-45-67"
          />
          {errors.phone ? <span className="text-xs text-rose-400">{errors.phone}</span> : null}
        </label>
        <label className="space-y-1 text-sm">
          <span className="text-white/70">E-mail</span>
          <input
            type="email"
            value={form.email}
            onChange={(event) => updateField('email', event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-accent"
            disabled={disabled}
            required
            placeholder="you@example.com"
          />
          {errors.email ? <span className="text-xs text-rose-400">{errors.email}</span> : null}
        </label>
      </div>
      <button
        type="submit"
        disabled={disabled}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-white transition hover:bg-primary/90 disabled:cursor-wait"
      >
        {status === 'loading' ? 'Отправляем…' : 'Забронировать скидку'}
      </button>
      <p className="text-xs text-white/50">Отправляя заявку, вы соглашаетесь с обработкой персональных данных и политикой конфиденциальности.</p>
    </form>
  );
};

export default LeadForm;
