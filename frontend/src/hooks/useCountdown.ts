import { useEffect, useState } from 'react';

type CountdownState = {
  hours: string;
  minutes: string;
  seconds: string;
};

export function useCountdown(targetMinutes: number): CountdownState {
  const [endTime] = useState(() => Date.now() + targetMinutes * 60 * 1000);
  const [state, setState] = useState<CountdownState>(() => formatRemaining(endTime - Date.now()));

  useEffect(() => {
    const interval = window.setInterval(() => {
      setState(formatRemaining(endTime - Date.now()));
    }, 1000);
    return () => window.clearInterval(interval);
  }, [endTime]);

  return state;
}

function formatRemaining(diff: number): CountdownState {
  const remaining = Math.max(0, diff);
  const totalSeconds = Math.floor(remaining / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return {
    hours: hours.toString().padStart(2, '0'),
    minutes: minutes.toString().padStart(2, '0'),
    seconds: seconds.toString().padStart(2, '0'),
  };
}
