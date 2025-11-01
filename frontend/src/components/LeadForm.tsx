import { FormEvent, useState } from 'react';
import { trackEvent } from '../lib/analytics';

const LeadForm = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.get('name'),
          phone: form.get('phone'),
          comment: form.get('comment')
        })
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      trackEvent({ event: 'lead_submitted', payload: { source: 'form' } });
      setStatus('success');
      setMessage('Заявка отправлена! Мы свяжемся с вами в течение 15 минут.');
      (event.currentTarget as HTMLFormElement).reset();
    } catch (error) {
      console.error(error);
      setStatus('error');
      setMessage('Не удалось отправить заявку. Попробуйте ещё раз или напишите нам в мессенджер.');
    }
  };

  return (
    <section id="lead" className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 px-6 py-12">
      <h2 className="text-3xl font-bold">Оставьте заявку на SlimiGood</h2>
      <p className="mt-2 text-white/70">Закрепим скидку, подберём курс и ответим на вопросы.</p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold">
            Имя
          </label>
          <input
            id="name"
            name="name"
            required
            className="mt-1 w-full rounded border border-white/20 bg-neutral px-4 py-3 text-white placeholder-white/40 focus:border-accent focus:outline-none"
            placeholder="Например, Алина"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold">
            Телефон
          </label>
          <input
            id="phone"
            name="phone"
            required
            className="mt-1 w-full rounded border border-white/20 bg-neutral px-4 py-3 text-white placeholder-white/40 focus:border-accent focus:outline-none"
            placeholder="+7 (___) ___-__-__"
          />
        </div>
        <div>
          <label htmlFor="comment" className="block text-sm font-semibold">
            Комментарий
          </label>
          <textarea
            id="comment"
            name="comment"
            rows={3}
            className="mt-1 w-full rounded border border-white/20 bg-neutral px-4 py-3 text-white placeholder-white/40 focus:border-accent focus:outline-none"
            placeholder="Укажите удобное время звонка"
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full rounded bg-accent px-4 py-3 font-semibold text-neutral transition hover:bg-accent/90 disabled:opacity-50"
        >
          {status === 'loading' ? 'Отправляем...' : 'Получить консультацию'}
        </button>
        {message && <p className="text-sm text-white/70">{message}</p>}
      </form>
      <p className="mt-4 text-xs text-white/50">
        Нажимая на кнопку, вы соглашаетесь с условиями политики конфиденциальности и обработки персональных данных.
      </p>
    </section>
  );
};

export default LeadForm;
