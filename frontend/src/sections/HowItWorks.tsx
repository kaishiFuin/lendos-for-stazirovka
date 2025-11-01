import { Clock, ClipboardList, UtensilsCrossed, Activity } from 'lucide-react';
import { Container } from '../components/Container';
import { SectionHeading } from '../components/SectionHeading';
import { useSectionView } from '../hooks/useSectionView';

const steps = [
  {
    icon: ClipboardList,
    title: 'Диагностика',
    description: 'Заполняете тест и присылаете биохимию — куратор собирает персональный профиль.',
  },
  {
    icon: Clock,
    title: 'План на 21 день',
    description: 'Получаете гибкий план питания и микро-шаги: сон, вода, мягкая активность.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Поддержка ежедневно',
    description: 'Корректируем меню и привычки по чату, работаем с мотивацией и саботажем.',
  },
  {
    icon: Activity,
    title: 'Измеряем прогресс',
    description: 'Каждые 7 дней — чек-ин, замеры, отчёт по самочувствию, новая «порция» рецептов.',
  },
];

export function HowItWorks() {
  useSectionView('how-it-works');
  return (
    <section data-section="how-it-works" className="bg-white py-20">
      <Container>
        <SectionHeading kicker="Как это работает" align="center">
          4 шага к лёгкости и устойчивым привычкам
        </SectionHeading>
        <div className="mt-12 grid gap-6 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-3xl border border-dark/10 bg-white p-6 text-left shadow-lg">
              <Icon className="h-8 w-8 text-primary" />
              <h3 className="mt-4 text-xl font-semibold text-dark">{title}</h3>
              <p className="mt-3 text-sm text-dark/70">{description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
