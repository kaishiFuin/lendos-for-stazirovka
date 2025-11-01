import { useCountdown } from '../hooks/useCountdown';

type TimerProps = {
  storageKey?: string;
  durationMinutes?: number;
};

export function Timer({ storageKey = 'slimigood_timer', durationMinutes }: TimerProps) {
  const { hours, minutes, seconds } = useCountdown(storageKey, durationMinutes);

  return (
    <div className="flex items-center gap-3 rounded-full bg-brand/15 px-5 py-2 text-brand-light">
      <span className="text-sm uppercase tracking-wide">До конца акции:</span>
      <div className="flex items-center gap-1 text-lg font-semibold text-slate-50">
        <span>{hours}</span>
        <span>:</span>
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>
    </div>
  );
}

export default Timer;
