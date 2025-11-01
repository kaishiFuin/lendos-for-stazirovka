import { useEffect, useRef, useState } from 'react';

type Toast = {
  id: number;
  message: string;
};

const messages = [
  'Елена из Твери оформила заказ 3 минуты назад',
  'Марина из Самары получила персональный план',
  'Алексей из Казани записался на консультацию',
  'Ирина из Уфы прошла квиз и забрала скидку'
];

const Toasts = () => {
  const [queue, setQueue] = useState<Toast[]>([]);
  const indexRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQueue((prev) => {
        const message = messages[indexRef.current % messages.length];
        indexRef.current += 1;
        return [...prev.slice(-1), { id: Date.now(), message }];
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-40 flex w-72 flex-col gap-3 text-sm">
      {queue.map((toast) => (
        <div key={toast.id} className="toast-enter rounded-2xl bg-slate-900/90 px-4 py-3 text-slate-100 shadow-lg">
          {toast.message}
        </div>
      ))}
    </div>
  );
};

export default Toasts;
