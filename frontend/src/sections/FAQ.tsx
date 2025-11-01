import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Container } from '../components/Container';
import { SectionHeading } from '../components/SectionHeading';
import { useSectionView } from '../hooks/useSectionView';

const items = [
  {
    question: 'Можно ли совмещать SlimiGood с интенсивной работой?',
    answer:
      'Да, планы составлены под загрузку «офис/смены/дети». Меню и активности адаптируются за счёт кураторской поддержки, никаких часовых тренировок.',
  },
  {
    question: 'Что если у меня плато и гормональные сбои?',
    answer:
      'Вступительная анкета и биохимия помогают куратору скорректировать меню и добавить консультацию эндокринолога-партнёра при необходимости.',
  },
  {
    question: 'Нужно ли покупать дорогие продукты?',
    answer:
      'Нет. Все рецепты собраны из доступных ингредиентов, есть бюджетные подборки и варианты для вегетарианцев.',
  },
  {
    question: 'Когда я увижу первые результаты?',
    answer: 'Первые изменения самочувствия — через 7 дней. За 21 день участницы теряют в среднем 3,2 кг и 6 см в талии.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState(items[0].question);
  useSectionView('faq');

  return (
    <section data-section="faq" className="bg-light py-20">
      <Container>
        <SectionHeading kicker="FAQ" align="center">
          Часто задаваемые вопросы
        </SectionHeading>
        <div className="mt-12 space-y-4">
          {items.map(({ question, answer }) => {
            const isOpen = open === question;
            return (
              <button
                key={question}
                onClick={() => setOpen(isOpen ? '' : question)}
                className="w-full rounded-3xl border border-dark/10 bg-white p-6 text-left shadow-lg transition hover:border-primary/40"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-lg font-semibold text-dark">{question}</span>
                  <ChevronDown className={`h-5 w-5 text-primary transition ${isOpen ? 'rotate-180' : ''}`} />
                </div>
                {isOpen && <p className="mt-3 text-sm text-dark/70">{answer}</p>}
              </button>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
