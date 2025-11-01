import { useEffect } from 'react';
import { useCountdown } from '../hooks/useCountdown';
import { analytics } from '../lib/analytics';

export function Timer() {
  const { minutes, seconds, expired } = useCountdown();

  useEffect(() => {
    if (expired) {
      analytics.timerExpired();
    }
  }, [expired]);

  return (
    <div className="rounded-2xl border border-primary/20 bg-white p-4 text-center shadow-lg">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">До конца оффера</p>
      <div className="timer-digits mt-2 flex items-center justify-center gap-1 text-3xl font-bold text-dark">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>
      <p className="mt-1 text-xs text-dark/70">Успейте забронировать программу по цене 4 900 ₽</p>
    </div>
  );
}
