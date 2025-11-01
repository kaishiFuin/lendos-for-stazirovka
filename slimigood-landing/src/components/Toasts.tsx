import { useEffect, useState } from 'react';

const messages = [
  'Елена из Твери оформила заказ 3 минуты назад',
  'Марина из Казани записалась на квиз и получила бонус',
  'Анастасия из Самары забронировала скидку −45%',
  'Ксения из Москвы завершила квиз и получила план'
];

export const Toasts = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState(messages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const next = messages[Math.floor(Math.random() * messages.length)];
      setMessage(next);
      setVisible(true);
      const timeout = setTimeout(() => setVisible(false), 3500);
      return () => clearTimeout(timeout);
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div className="toast-enter fixed bottom-6 right-6 z-30 hidden max-w-sm rounded-2xl border border-white/10 bg-slate-900/90 px-4 py-3 text-sm text-white shadow-lg shadow-black/40 md:block">
      {message}
    </div>
  );
};
