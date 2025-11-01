import { BadgeCheck, Headset, RefreshCw } from 'lucide-react';

const guarantees = [
  {
    icon: BadgeCheck,
    title: 'Клинически безопасно',
    description: 'Нутрицевтики SlimiGood сертифицированы, формулы согласованы с врачами-диетологами и нутрициологами.'
  },
  {
    icon: RefreshCw,
    title: 'Возврат в течение 14 дней',
    description: 'Если не увидите прогресс или формат не подойдёт — вернём оплату и поможем подобрать альтернативу.'
  },
  {
    icon: Headset,
    title: 'Куратор на связи 7/7',
    description: 'Чат с экспертом SlimiGood доступен каждый день: можно уточнить рацион, получить поддержку и мотивирующие голосовые.'
  }
];

export const GuaranteesSection = () => (
  <section className="section-container" id="guarantees">
    <div className="mx-auto max-w-3xl text-center">
      <span className="badge mx-auto bg-white/5">Гарантии</span>
      <h2 className="mt-6 text-3xl font-semibold sm:text-4xl">Прозрачность и безопасность</h2>
    </div>
    <div className="mt-12 grid gap-6 md:grid-cols-3">
      {guarantees.map((item) => (
        <div key={item.title} className="card space-y-3">
          <item.icon className="h-8 w-8 text-accent" />
          <h3 className="text-xl font-semibold">{item.title}</h3>
          <p className="text-sm text-white/70">{item.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default GuaranteesSection;
