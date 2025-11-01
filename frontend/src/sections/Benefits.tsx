import { Brain, Leaf, ShieldCheck, Sunrise } from 'lucide-react';
import { Container } from '../components/Container';
import { SectionHeading } from '../components/SectionHeading';
import { useSectionView } from '../hooks/useSectionView';

const benefits = [
  {
    icon: Leaf,
    title: 'Естественные привычки',
    description: 'Питание и активность под ваш график — без запретов и экстремальных нагрузок.',
  },
  {
    icon: Brain,
    title: 'Поддержка 24/7',
    description: 'Нутри-куратор отвечает в течение 15 минут и подстраивает план под обратную связь.',
  },
  {
    icon: Sunrise,
    title: 'Видимый результат',
    description: 'Уже на 7 день — лёгкость и минус 1,1 кг за счёт мягкого запуска обмена веществ.',
  },
  {
    icon: ShieldCheck,
    title: 'Гарантия возврата',
    description: 'Если не увидите прогресс в талии, вернём оплату при соблюдении рекомендаций.',
  },
];

export function Benefits() {
  useSectionView('benefits');
  return (
    <section data-section="benefits" className="bg-white py-20">
      <Container>
        <SectionHeading kicker="Преимущества" align="center">
          SlimiGood даёт системный результат без стресса
        </SectionHeading>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {benefits.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-3xl border border-dark/10 bg-white p-6 shadow-lg">
              <div className="flex items-center gap-4">
                <Icon className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-semibold text-dark">{title}</h3>
              </div>
              <p className="mt-3 text-sm text-dark/70">{description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
