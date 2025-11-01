import { useEffect, useState } from 'react';
import { Button } from './Button';
import { analytics } from '../lib/analytics';

export function ExitIntent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleMouseLeave(event: MouseEvent) {
      if (event.clientY <= 0 && !visible) {
        setVisible(true);
        analytics.exitIntentShown();
      }
    }

    window.addEventListener('mouseout', handleMouseLeave);
    return () => window.removeEventListener('mouseout', handleMouseLeave);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="exit-intent-overlay fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="glass-panel relative max-w-lg rounded-3xl p-8">
        <button
          className="absolute right-4 top-4 text-sm font-semibold text-dark/60"
          onClick={() => setVisible(false)}
        >
          Закрыть
        </button>
        <h3 className="text-2xl font-bold text-dark">Почти ушли без бонуса?</h3>
        <p className="mt-3 text-dark/80">
          Заберите чек-лист «Рацион на старт SlimiGood» и персональную скидку 700 ₽. Оставьте почту — отправим в течение пары
          минут.
        </p>
        <form
          className="mt-6 space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            analytics.cta('exit_intent_bonus');
          }}
        >
          <input
            type="email"
            required
            placeholder="Ваш email"
            className="w-full rounded-full border border-dark/10 px-5 py-3 focus:border-primary focus:outline-none"
          />
          <Button type="submit" className="w-full">
            Получить чек-лист и скидку
          </Button>
        </form>
      </div>
    </div>
  );
}
