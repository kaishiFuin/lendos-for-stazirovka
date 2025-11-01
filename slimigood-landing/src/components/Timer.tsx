import { useEffect, useState } from 'react';

const STORAGE_KEY = 'slimigood_timer_deadline';

function getTodayDeadline(): number {
  const now = new Date();
  const deadline = new Date();
  deadline.setHours(23, 59, 59, 999);
  if (deadline.getTime() <= now.getTime()) {
    deadline.setDate(deadline.getDate() + 1);
    deadline.setHours(23, 59, 59, 999);
  }
  return deadline.getTime();
}

function loadDeadline(): number {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = Number(stored);
      if (!Number.isNaN(parsed) && parsed > Date.now()) {
        return parsed;
      }
    }
  } catch (error) {
    console.warn('Failed to load deadline', error);
  }
  const nextDeadline = getTodayDeadline();
  try {
    window.localStorage.setItem(STORAGE_KEY, String(nextDeadline));
  } catch (error) {
    console.warn('Failed to persist deadline', error);
  }
  return nextDeadline;
}

function persistDeadline(value: number) {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(value));
  } catch (error) {
    console.warn('Failed to persist deadline', error);
  }
}

function calculateRemaining(deadline: number) {
  const diff = Math.max(deadline - Date.now(), 0);
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { diff, hours, minutes, seconds };
}

export function Timer() {
  const [deadline, setDeadline] = useState(() => loadDeadline());
  const [state, setState] = useState(() => calculateRemaining(deadline));

  useEffect(() => {
    const interval = window.setInterval(() => {
      setState((prev) => {
        const next = calculateRemaining(deadline);
        if (next.diff === 0 && prev.diff !== 0) {
          const newDeadline = getTodayDeadline();
          setDeadline(newDeadline);
          persistDeadline(newDeadline);
          return calculateRemaining(newDeadline);
        }
        return next;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [deadline]);

  return (
    <div className="flex items-center gap-3 rounded-full border border-brand/20 bg-white/80 px-5 py-2 text-sm font-medium shadow-inner">
      <span className="rounded-full bg-brand/10 px-3 py-1 text-brand">−45% до 23:59</span>
      <span className="tabular-nums text-neutral">
        {String(state.hours).padStart(2, '0')}:{String(state.minutes).padStart(2, '0')}:{String(state.seconds).padStart(2, '0')}
      </span>
    </div>
  );
}
