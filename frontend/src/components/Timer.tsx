import { useMemo } from 'react';
import { useCountdown } from '../hooks/useCountdown';

const Timer = () => {
  const deadline = useMemo(() => {
    const date = new Date();
    date.setHours(date.getHours() + 12);
    return date;
  }, []);

  const { days, hours, minutes, seconds } = useCountdown(deadline);

  return (
    <section className="mx-auto max-w-4xl rounded-3xl border border-accent/50 bg-accent/10 px-6 py-8 text-center">
      <p className="text-sm uppercase tracking-widest text-accent">Акция заканчивается через</p>
      <div className="mt-4 flex justify-center gap-4 text-3xl font-bold">
        <span>{String(days).padStart(2, '0')}</span>
        <span>:</span>
        <span>{String(hours).padStart(2, '0')}</span>
        <span>:</span>
        <span>{String(minutes).padStart(2, '0')}</span>
        <span>:</span>
        <span>{String(seconds).padStart(2, '0')}</span>
      </div>
    </section>
  );
};

export default Timer;
