import { FormEvent, useState } from 'react';
import { Send } from 'lucide-react';
import { Container } from '../components/Container';
import { SectionHeading } from '../components/SectionHeading';
import { Button } from '../components/Button';
import { analytics } from '../lib/analytics';
import { getVariant } from '../lib/ab';
import { useSectionView } from '../hooks/useSectionView';

export function LeadForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  useSectionView('lead-form');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      utm_source: formData.get('utm_source'),
      ab_variant: getVariant(),
    };

    try {
      setStatus('loading');
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      setStatus('success');
      analytics.leadSubmitted(String(payload.email));
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  }

  return (
    <section data-section="lead-form" className="bg-white py-20">
      <Container>
        <SectionHeading kicker="Заявка" align="center">
          Забронируйте место в SlimiGood сегодня
        </SectionHeading>
        <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-2xl rounded-3xl border border-dark/10 bg-white p-8 shadow-xl">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="flex flex-col text-sm font-semibold text-dark">
              Имя
              <input
                name="name"
                required
                className="mt-2 rounded-full border border-dark/10 px-5 py-3 text-sm font-normal text-dark/80 focus:border-primary focus:outline-none"
                placeholder="Как к вам обращаться"
              />
            </label>
            <label className="flex flex-col text-sm font-semibold text-dark">
              Телефон
              <input
                name="phone"
                required
                className="mt-2 rounded-full border border-dark/10 px-5 py-3 text-sm font-normal text-dark/80 focus:border-primary focus:outline-none"
                placeholder="+7 (___) ___-__-__"
              />
            </label>
            <label className="flex flex-col text-sm font-semibold text-dark sm:col-span-2">
              Email
              <input
                name="email"
                type="email"
                required
                className="mt-2 rounded-full border border-dark/10 px-5 py-3 text-sm font-normal text-dark/80 focus:border-primary focus:outline-none"
                placeholder="you@example.com"
              />
            </label>
            <input type="hidden" name="utm_source" value="landing" />
          </div>
          <Button type="submit" size="lg" className="mt-8 w-full" disabled={status === 'loading'}>
            {status === 'loading' ? 'Отправляем...' : 'Получить программу'} <Send className="ml-2 h-5 w-5" />
          </Button>
          {status === 'success' && (
            <p className="mt-4 text-sm text-secondary">
              Спасибо! Куратор свяжется в течение 10 минут, чтобы подтвердить участие.
            </p>
          )}
          {status === 'error' && (
            <p className="mt-4 text-sm text-accent">Произошла ошибка. Попробуйте ещё раз или напишите в поддержку.</p>
          )}
          <p className="mt-4 text-xs text-dark/60">
            Отправляя данные, вы соглашаетесь с Политикой конфиденциальности и Пользовательским соглашением.
          </p>
        </form>
      </Container>
    </section>
  );
}
