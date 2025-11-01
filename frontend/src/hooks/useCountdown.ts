import { useEffect, useState } from 'react';

export const useCountdown = (deadline: Date) => {
  const calculate = () => {
    const now = new Date().getTime();
    const total = deadline.getTime() - now;

    const seconds = Math.max(Math.floor((total / 1000) % 60), 0);
    const minutes = Math.max(Math.floor((total / 1000 / 60) % 60), 0);
    const hours = Math.max(Math.floor((total / (1000 * 60 * 60)) % 24), 0);
    const days = Math.max(Math.floor(total / (1000 * 60 * 60 * 24)), 0);

    return { total, days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculate);

  useEffect(() => {
    const id = window.setInterval(() => {
      setTimeLeft(calculate());
    }, 1000);

    return () => window.clearInterval(id);
  }, [deadline]);

  return timeLeft;
};
