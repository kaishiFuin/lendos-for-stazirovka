import { FormEvent, useMemo, useState } from 'react';
import { track } from '../lib/analytics';
import { isValidEmail, isValidName, isValidPhone } from '../lib/validators';

interface OfferFormState {
  name: string;
  phone: string;
  email: string;
}

const PDF_LINK = 'https://drive.google.com/placeholder-slimigood';

const Offer = () => {
  const [form, setForm] = useState<OfferFormState>({ name: '', phone: '', email: '' });
  const [status, setStatus] = useState<'idle' | 'pending' | 'success'>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof OfferFormState, string>>>({});

  const deadlineLabel = useMemo(() => {
    const deadline = new Date();
    deadline.setHours(23, 59, 0, 0);
    return deadline.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  }, []);

  const validate = (values: OfferFormState) => {
    const nextErrors: Partial<Record<keyof OfferFormState, string>> = {};
    if (!isValidName(values.name)) {
      nextErrors.name = 'Укажите имя (мин. 2 символа)';
    }
    if (!isValidPhone(values.phone)) {
      nextErrors.phone = 'Укажите телефон в международном формате';
    }
    if (!isValidEmail(values.email)) {
      nextErrors.email = 'Укажите корректный email';
    }
    return nextErrors;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus('pending');
    const delay = 1500 + Math.random() * 1000;
    await new Promise((resolve) => setTimeout(resolve, delay));

    const leadPayload = {
      ...form,
      createdAt: new Date().toISOString()
    };
    const stored = localStorage.getItem('slimigood_leads');
    const leads = stored ? (JSON.parse(stored) as unknown[]) : [];
    leads.push(leadPayload);
    localStorage.setItem('slimigood_leads', JSON.stringify(leads));
    // eslint-disable-next-line no-console
    console.log('SlimiGood lead', leadPayload);
    setStatus('success');
    track('lead_submit', leadPayload);
  };

  return (
    <section className="bg-slate-900/40 py-24" id="offer">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1.1fr,0.9fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-accent">−45% только сегодня</p>
          <h2 className="mt-4 text-3xl font-semibold text-white">Заберите стартовый пакет SlimiGood</h2>
          <p className="mt-4 max-w-xl text-slate-300">
            Подключаем вас к куратору, даём доступ к приложению и PDF-дневнику. Если не получите персональный план — вернём оплату.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-slate-200">
            <li>• Персональный план питания и активности на 28 дней</li>
            <li>• Чат с куратором 24/7 + еженедельные созвоны</li>
            <li>• PDF-дневник «28 дней фокуса» в подарок — <a className="text-accent underline" href={PDF_LINK}>скачать позже</a></li>
          </ul>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-950/70 px-4 py-2 text-sm text-slate-200">
            Действует до {deadlineLabel}
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-8 shadow-xl">
          {status !== 'success' ? (
            <form className="space-y-5" onSubmit={onSubmit}>
              <div>
                <label className="text-sm text-slate-300" htmlFor="offer-name">
                  Имя
                </label>
                <input
                  id="offer-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-base text-white focus:border-brand focus:outline-none"
                  placeholder="Анна"
                  required
                />
                {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
              </div>
              <div>
                <label className="text-sm text-slate-300" htmlFor="offer-phone">
                  Телефон
                </label>
                <input
                  id="offer-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-base text-white focus:border-brand focus:outline-none"
                  placeholder="+7 900 000 00 00"
                  required
                />
                {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
              </div>
              <div>
                <label className="text-sm text-slate-300" htmlFor="offer-email">
                  Email
                </label>
                <input
                  id="offer-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-base text-white focus:border-brand focus:outline-none"
                  placeholder="you@example.com"
                  required
                />
                {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
              </div>
              <button
                type="submit"
                disabled={status === 'pending'}
                className="flex w-full items-center justify-center rounded-full bg-brand px-8 py-3 text-lg font-semibold text-white shadow-glow transition hover:bg-brand-light disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === 'pending' ? 'Отправляем…' : 'Получить скидку −45%'}
              </button>
              <p className="text-xs text-slate-400">
                Нажимая кнопку, вы соглашаетесь с обработкой персональных данных и договором оферты.
              </p>
            </form>
          ) : (
            <div className="space-y-4 text-center text-slate-200">
              <h3 className="text-2xl font-semibold text-white">Вы в списке!</h3>
              <p>Куратор свяжется в течение 15 минут. Проверьте почту — там ссылка на PDF-дневник.</p>
              <button
                type="button"
                className="rounded-full border border-brand bg-transparent px-6 py-3 text-sm font-medium text-brand transition hover:bg-brand/20"
                onClick={() => {
                  setForm({ name: '', phone: '', email: '' });
                  setStatus('idle');
                }}
              >
                Отправить ещё одну заявку
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Offer;
