import { useEffect, useState } from 'react';
import { stickyBarText } from '../data/content';
import { trackEvent } from '../lib/analytics';

export function StickyBar(): JSX.Element | null {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(true);
      trackEvent({ name: 'sticky_bar_shown' });
    }, 3000);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 top-0 z-40 bg-slate-900/80 backdrop-blur border-b border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 text-sm">
        <span className="font-medium">{stickyBarText}</span>
        <a
          href="#lead-form"
          className="rounded-full bg-brand px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-lg shadow-brand/40 transition hover:bg-brand-dark"
          onClick={() => trackEvent({ name: 'sticky_bar_cta_click' })}
        >
          Забронировать скидку
        </a>
      </div>
    </div>
  );
}
