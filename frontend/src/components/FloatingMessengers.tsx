import { MessageCircle, PhoneCall } from 'lucide-react';
import { analytics } from '../lib/analytics';

const links = [
  {
    label: 'Написать в WhatsApp',
    href: 'https://wa.me/79990000000',
    icon: MessageCircle,
  },
  {
    label: 'Позвонить куратору',
    href: 'tel:+79990000000',
    icon: PhoneCall,
  },
];

export function FloatingMessengers() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {links.map(({ icon: Icon, label, href }) => (
        <a
          key={label}
          href={href}
          onClick={() => analytics.cta(label)}
          className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-primary/90"
        >
          <Icon className="h-4 w-4" />
          <span>{label}</span>
        </a>
      ))}
    </div>
  );
}
