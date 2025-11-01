import { useState } from 'react';
import { Button } from './Button';
import { analytics } from '../lib/analytics';

const prizes = ['Минус 10% на программу', 'Персональное меню', 'Созвон с нутрициологом', '7-дневный детокс-план', 'Марафон гидратации', 'Скидка 700 ₽'];

export function SpinnerGame() {
  const [result, setResult] = useState<string | null>(null);
  const [spinning, setSpinning] = useState(false);

  function spin() {
    if (spinning) return;
    setSpinning(true);
    const prize = prizes[Math.floor(Math.random() * prizes.length)];
    setTimeout(() => {
      setResult(prize);
      setSpinning(false);
      analytics.spinnerSpin(prize);
    }, 1500);
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
        <div className="spin-wheel">
          <div className="spin-wheel__labels">
            {prizes.map((label, index) => {
              const angle = (360 / prizes.length) * index;
              return (
                <span key={label} style={{ transform: `rotate(${angle}deg) translate(0, -110px)` }}>
                  {label}
                </span>
              );
            })}
          </div>
        </div>
        <div className="spin-indicator" />
      </div>
      <Button onClick={spin} disabled={spinning} variant="secondary" size="lg">
        {spinning ? 'Крутим...' : 'Испытать удачу'}
      </Button>
      {result && <p className="text-sm text-dark/80">Ваш приз: {result}</p>}
    </div>
  );
}
