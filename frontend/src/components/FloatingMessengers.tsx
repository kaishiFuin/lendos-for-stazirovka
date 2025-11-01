import { MessageCircle } from 'lucide-react';
import { useState } from 'react';

import { messengerLinks } from '../data/content';

export function FloatingMessengers() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {open ? (
        <div className="mb-3 flex flex-col gap-2">
          {messengerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-slate-800/80 px-4 py-2 text-sm text-slate-100 shadow-lg transition hover:bg-brand/30"
            >
              {link.label}
            </a>
          ))}
        </div>
      ) : null}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-slate-50 shadow-lg shadow-brand/30 transition hover:bg-brand-dark"
        aria-label="Связаться в мессенджере"
      >
        <MessageCircle className="h-7 w-7" />
      </button>
    </div>
  );
}

export default FloatingMessengers;
