import { useState } from 'react';
import { Container } from '../components/Container';
import { SectionHeading } from '../components/SectionHeading';
import { useSectionView } from '../hooks/useSectionView';

export function BeforeAfter() {
  const [value, setValue] = useState(50);
  useSectionView('before-after');

  return (
    <section data-section="before-after" className="bg-light py-20">
      <Container>
        <SectionHeading kicker="До / После" align="center">
          Реальные изменения уже на 21 день программы
        </SectionHeading>
        <div className="mt-10 space-y-6">
          <div className="relative mx-auto h-72 w-full max-w-3xl overflow-hidden rounded-3xl border border-dark/10 bg-white shadow-xl">
            <div className="absolute inset-0">
              <svg viewBox="0 0 640 320" className="h-full w-full" role="img" aria-labelledby="before-visual">
                <title id="before-visual">Состояние до SlimiGood</title>
                <rect width="640" height="320" fill="#F1F2F6" />
                <text x="50" y="80" fill="#2D3436" fontSize="28" fontWeight="700">До</text>
                <text x="50" y="130" fill="#2D3436" fontSize="18">Энергия 4/10</text>
                <text x="50" y="170" fill="#2D3436" fontSize="18">Талия 86 см</text>
                <text x="50" y="210" fill="#2D3436" fontSize="18">Сон 5 часов</text>
                <path d="M360 60h180v200H360z" fill="#FFEAA7" rx="24" />
                <text x="390" y="120" fill="#2D3436" fontSize="36" fontWeight="700">+4 кг</text>
                <text x="390" y="160" fill="#2D3436" fontSize="20">стрессовое питание</text>
              </svg>
            </div>
            <div className="absolute inset-0" style={{ clipPath: `polygon(0 0, ${value}% 0, ${value}% 100%, 0 100%)` }}>
              <svg viewBox="0 0 640 320" className="h-full w-full" role="img" aria-labelledby="after-visual">
                <title id="after-visual">Состояние после SlimiGood</title>
                <rect width="640" height="320" fill="#E8F9F2" />
                <text x="50" y="80" fill="#2D3436" fontSize="28" fontWeight="700">После</text>
                <text x="50" y="130" fill="#2D3436" fontSize="18">Энергия 9/10</text>
                <text x="50" y="170" fill="#2D3436" fontSize="18">Талия 74 см</text>
                <text x="50" y="210" fill="#2D3436" fontSize="18">Сон 7,5 часа</text>
                <path d="M360 60h180v200H360z" fill="#55EFC4" rx="24" />
                <text x="390" y="120" fill="#2D3436" fontSize="36" fontWeight="700">-6 см</text>
                <text x="390" y="160" fill="#2D3436" fontSize="20">осознанные привычки</text>
              </svg>
            </div>
            <div
              className="pointer-events-none absolute inset-y-0 flex w-1 bg-white shadow"
              style={{ left: `${value}%`, transform: 'translateX(-50%)' }}
            >
              <div className="m-auto h-10 w-10 rounded-full border-2 border-primary bg-white" />
            </div>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={(event) => setValue(Number(event.target.value))}
            className="mx-auto block w-full max-w-2xl"
            style={{
              background: `linear-gradient(90deg, rgba(108,92,231,0.6) ${value}%, rgba(45,52,54,0.2) ${value}%)`,
            }}
            aria-label="Сравнение до и после"
          />
          <p className="text-center text-sm text-dark/70">Перетащите ползунок, чтобы сравнить прогресс участницы.</p>
        </div>
      </Container>
    </section>
  );
}
