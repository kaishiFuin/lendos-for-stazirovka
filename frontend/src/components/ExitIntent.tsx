import { useEffect, useState } from 'react';

const ExitIntent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (event: MouseEvent) => {
      if (event.clientY <= 0) {
        setVisible(true);
      }
    };

    document.addEventListener('mouseout', handleMouseLeave);
    return () => document.removeEventListener('mouseout', handleMouseLeave);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 px-4">
      <div className="max-w-lg rounded-3xl border border-accent/40 bg-neutral p-8 text-center shadow-lg">
        <h3 className="text-2xl font-bold text-accent">Не уходите без подарка!</h3>
        <p className="mt-3 text-white/70">Оставьте заявку сейчас и получите гайд по детоксу в подарок.</p>
        <div className="mt-6 flex justify-center gap-4">
          <a href="#lead" className="rounded bg-accent px-5 py-3 font-semibold text-neutral">
            Получить гайд
          </a>
          <button type="button" className="rounded border border-white/20 px-5 py-3" onClick={() => setVisible(false)}>
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExitIntent;
