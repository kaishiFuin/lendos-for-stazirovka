import { useEffect, useState } from 'react';
import { Variant } from '../lib/ab';
import { track } from '../lib/analytics';

interface StickyCTAProps {
  variant: Variant;
  onClick: () => void;
}

export function StickyCTA({ variant, onClick }: StickyCTAProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  const label = variant === 'A' ? 'Скидка −45% сегодня' : 'Пройти квиз сейчас';

  return (
    <div className="fixed bottom-4 left-0 right-0 z-40 px-4 sm:hidden">
      <button
        type="button"
        onClick={() => {
          track('cta_click', { source: 'sticky', variant });
          onClick();
        }}
        className="w-full rounded-full bg-brand px-6 py-4 text-base font-semibold text-white shadow-xl"
      >
        {label}
      </button>
    </div>
  );
}
