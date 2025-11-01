import { useCountdown } from '../hooks/useCountdown';

interface TimerProps {
  minutes: number;
  label?: string;
}

export function Timer({ minutes, label }: TimerProps): JSX.Element {
  const time = useCountdown(minutes);

  return (
    <div className="flex flex-col items-center gap-2">
      {label ? <span className="text-xs uppercase tracking-[0.3em] text-white/50">{label}</span> : null}
      <div className="flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-5 py-3 font-mono text-lg">
        <TimeBlock value={time.hours} label="ч" />
        <span>:</span>
        <TimeBlock value={time.minutes} label="м" />
        <span>:</span>
        <TimeBlock value={time.seconds} label="с" />
      </div>
    </div>
  );
}

function TimeBlock({ value, label }: { value: string; label: string }): JSX.Element {
  return (
    <span className="flex flex-col items-center">
      <span className="text-2xl font-semibold text-accent">{value}</span>
      <span className="text-xs uppercase text-white/50">{label}</span>
    </span>
  );
}
