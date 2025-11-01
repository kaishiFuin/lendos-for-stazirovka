import { Apple, Brain, Droplets, HeartPulse, ShieldCheck } from 'lucide-react';

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Комплексная защита метаболизма',
    description: 'Нутрицевтики SlimiGood поддерживают печень, ЖКТ и гормональный баланс, чтобы организм не сопротивлялся снижению веса.'
  },
  {
    icon: Apple,
    title: 'Рацион под ваш график',
    description: 'Составляем план питания без жёстких ограничений: баланс КБЖУ, быстрые рецепты и адаптация под сменный режим.'
  },
  {
    icon: HeartPulse,
    title: 'Мягкий дефицит — без срывов',
    description: 'Контроль аппетита и стабилизация сахара в крови помогают держать дефицит калорий без ощущений голода.'
  },
  {
    icon: Brain,
    title: 'Коучинг и вовлечение',
    description: 'Поддержка куратора, напоминания и чек-листы формируют новые пищевые привычки и дисциплину.'
  },
  {
    icon: Droplets,
    title: 'Детокс и дренаж',
    description: 'Дренажный сбор и водный режим убирают отёчность, улучшают цвет кожи и самочувствие уже в первые дни.'
  }
];

export const BenefitsSection = () => (
  <section className="section-container" id="benefits">
    <div className="mx-auto max-w-3xl text-center">
      <span className="badge mx-auto bg-white/5">Преимущества SlimiGood</span>
      <h2 className="mt-6 text-3xl font-semibold sm:text-4xl">Почему программа работает</h2>
      <p className="mt-3 text-white/70">
        SlimiGood сочетает нутрицевтики, управление рационом и поддержку эксперта, чтобы ускорять прогресс и удерживать мотивацию.
      </p>
    </div>
    <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {benefits.map((benefit) => (
        <div key={benefit.title} className="card h-full">
          <benefit.icon className="h-10 w-10 text-accent" />
          <h3 className="mt-4 text-xl font-semibold">{benefit.title}</h3>
          <p className="mt-2 text-sm text-white/70">{benefit.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default BenefitsSection;
