import { MessageCircle, PhoneCall } from 'lucide-react';

const FloatingMessengers = () => (
  <div className="fixed bottom-6 right-6 flex flex-col gap-3">
    <a
      href="https://t.me/slimigood"
      className="flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-neutral shadow-lg shadow-accent/40"
    >
      <MessageCircle className="h-4 w-4" /> Telegram
    </a>
    <a
      href="https://wa.me/79999999999"
      className="flex items-center gap-2 rounded-full bg-success px-4 py-2 text-sm font-semibold text-neutral shadow-lg shadow-success/40"
    >
      <PhoneCall className="h-4 w-4" /> WhatsApp
    </a>
  </div>
);

export default FloatingMessengers;
