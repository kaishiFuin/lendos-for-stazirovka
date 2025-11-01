import { useState } from 'react';

import { spinnerPrizes } from '../data/content';
import { track } from '../lib/analytics';
import type { Variant } from '../lib/ab';

type SpinnerGameProps = {
  isOpen: boolean;
  onClose: () => void;
  variant: Variant;
  onPrize: (prize: string) => void;
};

export function SpinnerGame({ isOpen, onClose, variant, onPrize }: SpinnerGameProps) {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  if (!isOpen) {
    return null;
  }

  const handleSpin = () => {
    if (spinning) {
      return;
    }
    const randomIndex = Math.floor(Math.random() * spinnerPrizes.length);
    const segmentAngle = 360 / spinnerPrizes.length;
    const targetRotation = rotation + 360 * 4 + randomIndex * segmentAngle + segmentAngle / 2;
    setSpinning(true);
    setRotation(targetRotation);
    track('spinner_started', { prize_index: randomIndex }, variant);

    window.setTimeout(() => {
      const prize = spinnerPrizes[randomIndex];
      track('spinner_finished', { prize }, variant);
      setSpinning(false);
      onPrize(prize);
    }, 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4">
      <div className="card-surface w-full max-w-xl p-10 text-center">
        <h3 className="text-2xl font-semibold text-slate-50">Колесо удачи SlimiGood</h3>
        <p className="mt-3 text-sm text-slate-300">
          Крутите колесо и получите бонус: скидку, бонусный модуль или личный созвон с нутрициологом.
        </p>
        <div className="relative mx-auto mt-8 h-64 w-64">
          <div
            className="spinner-wheel h-full w-full"
            style={{ transform: `rotate(${rotation}deg)`, transition: spinning ? 'transform 3.5s cubic-bezier(0.25, 1, 0.5, 1)' : undefined }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-xs font-semibold text-slate-900">
              {spinnerPrizes.map((prize, index) => (
                <div
                  key={prize}
                  className="absolute left-1/2 top-1/2 w-24 -translate-x-1/2 -translate-y-1/2"
                  style={{ transform: `rotate(${index * (360 / spinnerPrizes.length)}deg) translateY(-110px)` }}
                >
                  <span className="block rounded-full bg-slate-900/80 px-2 py-1 text-slate-100 shadow">
                    {prize}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="spinner-pointer" />
        </div>
        <div className="mt-6 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={handleSpin}
            disabled={spinning}
            className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-slate-50 transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-70"
          >
            {spinning ? 'Крутим...' : 'Крутить колесо'}
          </button>
          <button type="button" onClick={onClose} className="text-xs text-slate-400 underline">
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}

export default SpinnerGame;
