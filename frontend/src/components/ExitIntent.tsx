import { useEffect, useState } from 'react';

import { track } from '../lib/analytics';
import type { Variant } from '../lib/ab';

type ExitIntentProps = {
  variant: Variant;
  onCtaClick: () => void;
};

export function ExitIntent({ variant, onCtaClick }: ExitIntentProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (event: MouseEvent) => {
      if (event.clientY <= 0 && !visible) {
        setVisible(true);
        track('exit_intent_triggered', {}, variant);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [variant, visible]);

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/80 px-4">
      <div className="card-surface max-w-md p-8 text-center">
        <h3 className="text-2xl font-semibold text-slate-50">Не уходите без подарка!</h3>
        <p className="mt-3 text-sm text-slate-300">
          Заберите чек-лист «28 шагов к лёгкости» и персональную скидку 10% на программу SlimiGood.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => {
              setVisible(false);
              onCtaClick();
            }}
            className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-slate-50 transition hover:bg-brand-dark"
          >
            Получить чек-лист и скидку
          </button>
          <button type="button" onClick={() => setVisible(false)} className="text-xs text-slate-400 underline">
            Нет, спасибо
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExitIntent;
