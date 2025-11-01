import { useEffect, useState } from 'react';

const DEFAULT_DURATION_MINUTES = 45;

export function useCountdown(storageKey: string, durationMinutes = DEFAULT_DURATION_MINUTES) {
  const [target, setTarget] = useState<number>(() => {
    if (typeof window === 'undefined') {
      return Date.now() + durationMinutes * 60 * 1000;
    }
    const stored = window.localStorage.getItem(storageKey);
    if (stored) {
      const parsed = Number.parseInt(stored, 10);
      if (!Number.isNaN(parsed)) {
        return parsed;
      }
    }
    const nextTarget = Date.now() + durationMinutes * 60 * 1000;
    window.localStorage.setItem(storageKey, String(nextTarget));
    return nextTarget;
  });

  const [remaining, setRemaining] = useState<number>(Math.max(0, target - Date.now()));

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRemaining(Math.max(0, target - Date.now()));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [target]);

  useEffect(() => {
    if (remaining === 0 && typeof window !== 'undefined') {
      const nextTarget = Date.now() + durationMinutes * 60 * 1000;
      window.localStorage.setItem(storageKey, String(nextTarget));
      setTarget(nextTarget);
      setRemaining(Math.max(0, nextTarget - Date.now()));
    }
  }, [remaining, durationMinutes, storageKey]);

  const totalSeconds = Math.floor(remaining / 1000);
  const hours = Math.floor(totalSeconds / 3600)
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor((totalSeconds % 3600) / 60)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, '0');

  return { hours, minutes, seconds };
}
