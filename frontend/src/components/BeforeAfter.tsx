import { useState } from 'react';
import { beforeAfterCopy } from '../data/content';

export function BeforeAfter(): JSX.Element {
  const [position, setPosition] = useState(50);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center gap-8 text-center">
          <h2 className="text-3xl font-semibold">До и после SlimiGood</h2>
          <p className="max-w-2xl text-white/70">
            Проведите ползунок, чтобы увидеть, как меняются ощущения и самочувствие уже через месяц использования комплекса.
          </p>
        </div>
        <div className="relative mt-12 overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 shadow-xl">
          <div className="relative h-80 w-full">
            <div className="absolute inset-0 overflow-hidden">
              <div className="h-full" style={{ width: `${position}%` }}>
                <BeforeSVG className="h-full w-full" />
              </div>
            </div>
            <AfterSVG className="absolute inset-0" />
          </div>
          <div className="absolute inset-x-0 bottom-6 flex justify-center">
            <input
              type="range"
              min="0"
              max="100"
              value={position}
              onChange={(event) => setPosition(Number(event.target.value))}
              className="h-1 w-2/3 cursor-pointer appearance-none rounded-full bg-white/30"
              aria-label="Сравнить до и после"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function BeforeSVG({ className }: { className?: string }): JSX.Element {
  const copy = beforeAfterCopy.before;
  return (
    <svg className={className} viewBox="0 0 800 320" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="beforeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
      </defs>
      <rect width="800" height="320" fill="url(#beforeGradient)" />
      <text x="60" y="80" fill="#F87171" fontFamily="'Segoe UI', sans-serif" fontSize="36" fontWeight="700">
        {copy.headline}
      </text>
      {copy.points.map((point, index) => (
        <text
          key={point}
          x="60"
          y={130 + index * 60}
          fill="#E2E8F0"
          fontFamily="'Segoe UI', sans-serif"
          fontSize="22"
        >
          • {point}
        </text>
      ))}
    </svg>
  );
}

function AfterSVG({ className }: { className?: string }): JSX.Element {
  const copy = beforeAfterCopy.after;
  return (
    <svg className={className} viewBox="0 0 800 320" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="afterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6B4EFF" />
          <stop offset="100%" stopColor="#B4A3FF" />
        </linearGradient>
      </defs>
      <rect width="800" height="320" fill="url(#afterGradient)" />
      <text x="60" y="80" fill="#0F172A" fontFamily="'Segoe UI', sans-serif" fontSize="36" fontWeight="700">
        {copy.headline}
      </text>
      {copy.points.map((point, index) => (
        <text
          key={point}
          x="60"
          y={130 + index * 60}
          fill="#0F172A"
          fontFamily="'Segoe UI', sans-serif"
          fontSize="22"
        >
          • {point}
        </text>
      ))}
    </svg>
  );
}
