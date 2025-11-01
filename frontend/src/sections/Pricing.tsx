import { Container } from '../components/Container';
import { SectionHeading } from '../components/SectionHeading';
import { Button } from '../components/Button';
import { analytics } from '../lib/analytics';
import { useSectionView } from '../hooks/useSectionView';

const plans = [
  {
    title: 'SlimiGood Start',
    price: '4 900 ₽',
    description: '21 день программы + сопровождение 2 недели',
    features: ['Персональный план питания', 'Чат с куратором 24/7', 'Гидратационный челлендж', 'Еженедельные чек-ин с аналитикой'],
    best: true,
  },
  {
    title: 'SlimiGood Pro',
    price: '8 700 ₽',
    description: '6 недель программы + мастер-группа',
    features: ['Стартовая сессия с нутрициологом', 'Мастер-группа раз в неделю', 'Доступ к библиотеке рецептов', 'Поддерживающий план на 3 месяца'],
    best: false,
  },
];

export function Pricing() {
  useSectionView('pricing');
  return (
    <section data-section="pricing" className="bg-light py-20">
      <Container>
        <SectionHeading kicker="Тарифы" align="center">
          Выберите формат участия в SlimiGood
        </SectionHeading>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {plans.map(({ title, price, description, features, best }) => (
            <div key={title} className={`rounded-3xl border bg-white p-8 shadow-xl ${best ? 'border-primary' : 'border-dark/10'}`}>
              {best && (
                <span className="badge-svg inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                  Хит продаж
                </span>
              )}
              <h3 className="mt-4 text-2xl font-semibold text-dark">{title}</h3>
              <p className="mt-2 text-sm text-dark/70">{description}</p>
              <p className="mt-6 text-3xl font-bold text-dark">{price}</p>
              <ul className="mt-4 space-y-2 text-sm text-dark/80">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-secondary" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                size="lg"
                className="mt-8 w-full"
                variant={best ? 'primary' : 'ghost'}
                onClick={() => analytics.cta(`pricing_${title}`)}
              >
                Забронировать тариф
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
