import { Brain, CalendarCheck, HeartPulse, MessageCircle, ShieldCheck } from 'lucide-react';

const advantages = [
  {
    icon: ShieldCheck,
    title: 'Медицинская безопасность',
    description: 'Протокол согласован с врачами-нутрициологами, без экстремальных дефицитов и монодиет.'
  },
  {
    icon: CalendarCheck,
    title: 'Контроль на каждом этапе',
    description: 'Еженедельные чек-поинты с куратором и быстрые корректировки плана, если динамика замедляется.'
  },
  {
    icon: Brain,
    title: 'Привычки вместо запретов',
    description: 'Фокус на формировании устойчивых привычек и устойчивого минуса без откатов.'
  },
  {
    icon: MessageCircle,
    title: 'Поддержка 24/7',
    description: 'Ответы на вопросы в чате, напоминания в мессенджере и эмоциональная поддержка.'
  },
  {
    icon: HeartPulse,
    title: 'Проверенные трекеры',
    description: 'Мониторинг сна, стресса и активности — все данные учитываются в персональных подсказках.'
  }
];

export function Advantages() {
  return (
    <section id="advantages" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="section-title">Почему SlimiGood работает там, где другие сдаются</p>
          <p className="section-subtitle">
            Мы взяли лучшие практики из программ снижения веса и адаптировали их под реальную жизнь без тотального контроля.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((item) => (
            <div key={item.title} className="card h-full">
              <item.icon className="h-10 w-10 text-brand" aria-hidden="true" />
              <h3 className="mt-4 text-xl font-semibold text-neutral">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral/70">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
