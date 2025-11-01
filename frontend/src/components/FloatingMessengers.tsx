import { MessageCircle, Send } from 'lucide-react';
import { messengerLinks } from '../data/content';

export function FloatingMessengers(): JSX.Element {
  return (
    <div className="fixed bottom-6 right-6 z-40 hidden flex-col gap-3 sm:flex">
      {messengerLinks.map((messenger) => (
        <a
          key={messenger.name}
          href={messenger.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/80 px-4 py-2 text-xs font-medium text-white/80 shadow-lg shadow-black/40 transition hover:bg-brand hover:text-white"
        >
          {messenger.name === 'Telegram' ? <Send className="h-4 w-4" /> : <MessageCircle className="h-4 w-4" />}
          {messenger.label}
        </a>
      ))}
    </div>
  );
}
