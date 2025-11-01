import { Container } from '../components/Container';
import { SectionHeading } from '../components/SectionHeading';
import { useSectionView } from '../hooks/useSectionView';

const modules = [
  {
    title: 'Модуль 1. Перезапуск',
    points: ['Диагностика привычек и стресс-профиля', 'Антиотёчное меню на 7 дней', 'Чек-лист сна и дыхательные практики'],
  },
  {
    title: 'Модуль 2. Баланс питания',
    points: ['Персональные балансы БЖУ', '15 быстрых рецептов под ваш график', 'Гайд по mindful eating'],
  },
  {
    title: 'Модуль 3. Энергия',
    points: ['Силовые мини-тренировки по 15 минут', 'Гидратационный челлендж', 'Релиз тревожности и работа с триггерами'],
  },
  {
    title: 'Модуль 4. Закрепление',
    points: ['Аналитика замеров + корректировка', 'Набор рецептов на праздники', 'План поддержания на 3 месяца'],
  },
];

export function Composition() {
  useSectionView('composition');
  return (
    <section data-section="composition" className="bg-white py-20">
      <Container>
        <SectionHeading kicker="Состав программы" align="center">
          4 модуля, которые проходят вместе с куратором
        </SectionHeading>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {modules.map(({ title, points }) => (
            <div key={title} className="rounded-3xl border border-dark/10 bg-white p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-dark">{title}</h3>
              <ul className="mt-3 space-y-2 text-sm text-dark/70">
                {points.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
