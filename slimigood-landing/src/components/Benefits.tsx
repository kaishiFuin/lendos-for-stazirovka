import { CheckCircle2, Sparkles, HeartPulse, Clock, Shield } from 'lucide-react';

const benefits = [
  {
    title: 'Питаемся, а не голодаем',
    description: 'Готовые меню с адаптацией под ваш график и любимые продукты — без срывов.',
    icon: Sparkles
  },
  {
    title: 'Контроль нутрициолога',
    description: 'Еженедельные созвоны и чат поддержки. Корректируем режим по факту прогресса.',
    icon: CheckCircle2
  },
  {
    title: 'Забота о здоровье',
    description: 'Сохраняем комфорт и сон. Рекомендации по дефициту витаминов, воде и активностям.',
    icon: HeartPulse
  },
  {
    title: 'Результат к дедлайну',
    description: 'Микро-цели на каждый блок. Каждые 7 дней — чекпоинт и мотивация от куратора.',
    icon: Clock
  },
  {
    title: 'Гарантии прозрачности',
    description: 'Все условия — в договоре оферты. Вернём оплату, если не получите персональный план.',
    icon: Shield
  }
];

const Benefits = () => (
  <section className="bg-slate-950 py-24" id="benefits">
    <div className="mx-auto max-w-6xl px-6">
      <div className="mb-12 max-w-2xl">
        <h2 className="text-3xl font-semibold text-white">Почему SlimiGood работает мягко и стабильно</h2>
        <p className="mt-4 text-slate-300">
          Структурированная программа, внимание к деталям и поддержка — всё, что нужно для уверенного старта.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {benefits.map(({ title, description, icon: Icon }) => (
          <div key={title} className="blur-card rounded-3xl border border-white/5 p-6 shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/20 text-brand">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-white">{title}</h3>
            <p className="mt-3 text-sm text-slate-300">{description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Benefits;
