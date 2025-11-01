import { Container } from '../components/Container';
import { SectionHeading } from '../components/SectionHeading';
import { Button } from '../components/Button';
import { analytics } from '../lib/analytics';
import { useSectionView } from '../hooks/useSectionView';

export function Offer() {
  useSectionView('offer');
  return (
    <section data-section="offer" className="bg-light py-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <SectionHeading kicker="Наш оффер" align="left" className="space-y-6">
            Получите SlimiGood со скидкой и подарками при бронировании сегодня
          </SectionHeading>
          <div className="rounded-3xl border border-dark/10 bg-white p-8 shadow-lg">
            <ul className="space-y-4 text-sm text-dark/80">
              <li>
                <strong>Что внутри:</strong> стартовая диагностика, трекер привычек, адаптивное меню на 4 недели, чат с
                нутри-куратором 24/7.
              </li>
              <li>
                <strong>Бонусы:</strong> 2 недели сопровождения и детокс-план за подписку сегодня.
              </li>
              <li>
                <strong>Гарантия:</strong> вернём оплату, если через 30 дней не увидите минус 2 см в талии при выполнении
                рекомендаций.
              </li>
              <li>
                <strong>Доставка:</strong> весь контент в приложении и Telegram, без печатных материалов.
              </li>
            </ul>
            <Button
              size="lg"
              className="mt-8 w-full"
              onClick={() => analytics.cta('offer_reserve')}
            >
              Забронировать по акции 4 900 ₽
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
