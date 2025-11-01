import { useEffect, useState } from 'react';

interface Toast {
  id: number;
  message: string;
}

const messages = [
  'Елена из Твери оформила заказ 2 минуты назад',
  'Антон из Казани зафиксировал скидку −45%',
  'Мария из Москвы прошла квиз и получила прогноз',
  'Игорь из Самары забронировал консультацию с куратором',
  'Алина из Перми скачала чек-лист старта'
];

export function ToastStack() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  useEffect(() => {
    const interval = window.setInterval(() => {
      setToasts((prev) => {
        const id = Date.now();
        const nextToast = { id, message: messages[Math.floor(Math.random() * messages.length)] };
        const next = [...prev, nextToast].slice(-3);
        window.setTimeout(() => {
          setToasts((current) => current.filter((toast) => toast.id !== id));
        }, 4000);
        return next;
      });
    }, 7000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-40 hidden w-80 flex-col gap-3 sm:flex">
      {toasts.map((toast) => (
        <div key={toast.id} className="rounded-2xl bg-white/95 p-4 text-sm text-neutral shadow-lg">
          {toast.message}
        </div>
      ))}
    </div>
  );
}
