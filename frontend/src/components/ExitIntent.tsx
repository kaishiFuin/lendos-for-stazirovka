import { useEffect, useState } from 'react';
import { trackEvent } from '../lib/analytics';

export function ExitIntent(): JSX.Element | null {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (event: MouseEvent) => {
      if (dismissed) {
        return;
      }
      if (event.clientY <= 0) {
        setOpen(true);
        trackEvent({ name: 'exit_intent_shown' });
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [dismissed]);

  if (!open) {
    return null;
  }

  const close = () => {
    setOpen(false);
    setDismissed(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4">
      <div className="max-w-lg rounded-3xl border border-white/10 bg-slate-900/90 p-10 text-center">
        <h3 className="text-2xl font-semibold">Успейте забрать скидку 50%</h3>
        <p className="mt-4 text-sm text-white/70">
          Оставьте контакты сейчас, и мы закрепим за вами специальную цену и бесплатную доставку.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <a
            href="#lead-form"
            className="rounded-full bg-accent px-6 py-3 font-semibold text-slate-900 hover:bg-white"
            onClick={() => {
              trackEvent({ name: 'exit_intent_cta_click' });
              close();
            }}
          >
            Забронировать предложение
          </a>
          <button
            type="button"
            className="rounded-full border border-white/10 px-6 py-3 text-sm text-white/60 hover:text-white"
            onClick={close}
          >
            Нет, спасибо
          </button>
        </div>
      </div>
    </div>
  );
}
