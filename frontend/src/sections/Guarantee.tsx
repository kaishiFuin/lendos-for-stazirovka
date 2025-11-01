import { ShieldCheck } from 'lucide-react';
import { Container } from '../components/Container';
import { SectionHeading } from '../components/SectionHeading';
import { useSectionView } from '../hooks/useSectionView';

export function Guarantee() {
  useSectionView('guarantee');
  return (
    <section data-section="guarantee" className="bg-white py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeading kicker="Гарантия" align="left" className="space-y-6">
            Возврат средств, если не увидите прогресс по замерам
          </SectionHeading>
          <div className="rounded-3xl border border-dark/10 bg-white p-8 shadow-lg">
            <div className="flex items-center gap-3 text-primary">
              <ShieldCheck className="h-8 w-8" />
              <p className="text-lg font-semibold">Честная гарантия результата</p>
            </div>
            <ol className="mt-4 space-y-3 text-sm text-dark/80">
              <li>
                <strong>1.</strong> Выполняете рекомендации по питанию, воде и активности минимум 21 день.
              </li>
              <li>
                <strong>2.</strong> Отправляете еженедельные замеры и дневник самочувствия в приложение.
              </li>
              <li>
                <strong>3.</strong> Если объём талии не уменьшился на 2 см, возвращаем оплату без вопросов.
              </li>
            </ol>
            <p className="mt-4 text-xs text-dark/60">
              Гарантия действует при активном участии и честной обратной связи. Мы заинтересованы в вашем устойчивом результате.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
