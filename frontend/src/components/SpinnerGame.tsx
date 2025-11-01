import { useState } from 'react';
import { spinnerPrizes } from '../data/content';
import { trackEvent } from '../lib/analytics';

export function SpinnerGame(): JSX.Element {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSpin = () => {
    if (spinning) {
      return;
    }
    setSpinning(true);
    trackEvent({ name: 'spinner_started' });
    window.setTimeout(() => {
      const prize = spinnerPrizes[Math.floor(Math.random() * spinnerPrizes.length)];
      setResult(prize);
      setSpinning(false);
      trackEvent({ name: 'spinner_result', payload: { prize } });
    }, 4000);
  };

  return (
    <section className="py-20">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-10 rounded-3xl border border-white/10 bg-slate-900/50 px-8 py-12 text-center">
        <h2 className="text-3xl font-semibold">Крутите колесо бонусов SlimiGood</h2>
        <p className="max-w-2xl text-sm text-white/70">
          Нажмите на колесо и получите дополнительный бонус к заказу. Приз закрепится за вами автоматически.
        </p>
        <div className={`relative h-64 w-64 rounded-full border-4 border-accent bg-slate-900/80 ${spinning ? 'animate-spinWheel' : ''}`}>
          {spinnerPrizes.map((prize, index) => (
            <Slice key={prize} index={index} total={spinnerPrizes.length} label={prize} />
          ))}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              type="button"
              onClick={handleSpin}
              className="rounded-full bg-accent px-6 py-3 font-semibold text-slate-900 transition hover:bg-white"
            >
              {spinning ? 'Крутим…' : 'Запустить'}
            </button>
          </div>
        </div>
        {result ? (
          <p className="rounded-full border border-success/40 bg-success/10 px-4 py-2 text-sm text-success" role="status" aria-live="polite">
            Ваш приз: {result}. Мы отправим его вместе с заказом!
          </p>
        ) : null}
      </div>
    </section>
  );
}

function Slice({ index, total, label }: { index: number; total: number; label: string }): JSX.Element {
  const angle = (360 / total) * index;
  return (
    <div
      className="absolute left-1/2 top-1/2 h-1/2 w-[2px] origin-bottom -translate-x-1/2 -translate-y-full"
      style={{ transform: `rotate(${angle}deg)` }}
    >
      <div className="relative -left-[100px] -top-20 flex h-20 w-48 rotate-90 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-xs text-white/80">
        {label}
      </div>
    </div>
  );
}
