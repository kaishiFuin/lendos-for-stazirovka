import { useEffect, useState } from 'react';

const DURATION_MS = 1000 * 60 * 25; // 25 minutes

export function useCountdown() {
  const [endTime] = useState(() => Date.now() + DURATION_MS);
  const [timeLeft, setTimeLeft] = useState(endTime - Date.now());

  useEffect(() => {
    const interval = window.setInterval(() => {
      const diff = endTime - Date.now();
      setTimeLeft(diff > 0 ? diff : 0);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [endTime]);

  const totalSeconds = Math.max(0, Math.floor(timeLeft / 1000));
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');

  return {
    minutes,
    seconds,
    expired: totalSeconds === 0,
  };
}
