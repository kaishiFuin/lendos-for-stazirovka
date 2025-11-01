import { FormEvent, useMemo, useState } from 'react';
import { Loader2, Mail, Phone, UserRound } from 'lucide-react';
import { track } from '../lib/analytics';
import { validateEmail, validateName, validatePhone } from '../lib/validators';

type LeadStatus = 'idle' | 'loading' | 'success';

interface LeadFormProps {
  context: string;
  submitLabel: string;
  compact?: boolean;
}

const STORAGE_KEY = 'slimigood_leads';

function saveLead(lead: Record<string, unknown>) {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const data = raw ? (JSON.parse(raw) as Array<Record<string, unknown>>) : [];
    data.push({ ...lead, createdAt: new Date().toISOString() });
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to persist lead', error);
  }
}

export function LeadForm({ context, submitLabel, compact }: LeadFormProps) {
  const [status, setStatus] = useState<LeadStatus>('idle');
  const [fields, setFields] = useState({ name: '', phone: '', email: '' });
  const [errors, setErrors] = useState<{ name?: string; phone?: string; email?: string }>({});

  const disabled = useMemo(() => status === 'loading' || status === 'success', [status]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = {
      name: validateName(fields.name),
      phone: validatePhone(fields.phone),
      email: validateEmail(fields.email)
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    setStatus('loading');
    const delay = 1500 + Math.random() * 1000;

    window.setTimeout(() => {
      const lead = {
        ...fields,
        context,
        delay,
        timestamp: Date.now()
      };
      console.log('[slimigood] lead_submit', lead);
      saveLead(lead);
      track('lead_submit', lead);
      setStatus('success');
    }, delay);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex w-full flex-col gap-3 rounded-3xl border border-white/40 bg-white/80 p-6 shadow-soft backdrop-blur ${
        compact ? 'md:flex-row md:items-center md:gap-4' : ''
      }`}
    >
      <div className={`flex flex-1 flex-col gap-3 ${compact ? 'md:flex-row md:items-center md:gap-3' : ''}`}>
        <label className="flex flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/30">
          <UserRound className="h-4 w-4 text-brand" aria-hidden="true" />
          <input
            type="text"
            name="name"
            placeholder="Имя"
            value={fields.name}
            onChange={(event) => setFields((prev) => ({ ...prev, name: event.target.value }))}
            className="w-full bg-transparent outline-none"
            disabled={disabled}
            required
          />
        </label>
        {!compact && errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
        <label className="flex flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/30">
          <Phone className="h-4 w-4 text-brand" aria-hidden="true" />
          <input
            type="tel"
            name="phone"
            placeholder="Телефон"
            value={fields.phone}
            onChange={(event) => setFields((prev) => ({ ...prev, phone: event.target.value }))}
            className="w-full bg-transparent outline-none"
            disabled={disabled}
            required
          />
        </label>
        {!compact && errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
        <label className="flex flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/30">
          <Mail className="h-4 w-4 text-brand" aria-hidden="true" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={fields.email}
            onChange={(event) => setFields((prev) => ({ ...prev, email: event.target.value }))}
            className="w-full bg-transparent outline-none"
            disabled={disabled}
            required
          />
        </label>
        {!compact && errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
      </div>
      <button
        type="submit"
        disabled={disabled}
        className="flex min-w-[200px] items-center justify-center rounded-2xl bg-brand px-6 py-3 text-base font-semibold text-white transition hover:bg-brand-dark disabled:opacity-70"
      >
        {status === 'loading' ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            Отправляем...
          </span>
        ) : status === 'success' ? (
          <span className="flex items-center gap-2">
            <svg
              className="h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
            Заявка отправлена
          </span>
        ) : (
          submitLabel
        )}
      </button>
      {compact && (
        <div className="flex w-full flex-col gap-1 text-xs text-red-500 md:w-64">
          {(errors.name || errors.phone || errors.email) && <span>{errors.name || errors.phone || errors.email}</span>}
        </div>
      )}
    </form>
  );
}
