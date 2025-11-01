import { useState } from 'react';
import { Timer } from './Timer';

export function TimerWidget(): JSX.Element | null {
  const [visible, setVisible] = useState(true);
  if (!visible) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-6 z-40 hidden w-64 rounded-3xl border border-white/10 bg-slate-900/80 p-4 shadow-lg shadow-brand/30 sm:block">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Спецпредложение</p>
          <p className="mt-2 text-sm text-white/80">Скидка 50% и подарок действуют до конца обратного отсчёта.</p>
        </div>
        <button type="button" className="text-white/30 hover:text-white" onClick={() => setVisible(false)}>
          ×
        </button>
      </div>
      <div className="mt-4">
        <Timer minutes={45} />
      </div>
      <a href="#lead-form" className="mt-4 block rounded-full bg-accent px-4 py-2 text-center text-sm font-semibold text-slate-900 hover:bg-white">
        Получить скидку
      </a>
    </div>
  );
}
