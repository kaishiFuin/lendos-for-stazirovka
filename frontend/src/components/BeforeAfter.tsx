import { useState } from 'react';

const BeforeAfter = () => {
  const [value, setValue] = useState(50);

  return (
    <section className="mx-auto max-w-5xl px-4">
      <h2 className="text-3xl font-bold">До и после курса SlimiGood</h2>
      <p className="mt-2 text-white/70">Перемещайте ползунок, чтобы увидеть динамику фигуры без фотошопа — иллюстрации основаны на типовых результатах.</p>
      <div className="relative mt-8 h-72 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
        <div className="absolute inset-0">
          <svg viewBox="0 0 400 400" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="400" fill="#1F2937" />
            <text x="200" y="60" textAnchor="middle" fontSize="28" fill="#F97316">До</text>
            <path d="M130 320C80 280 100 160 160 150C220 140 230 250 210 320" stroke="#F97316" strokeWidth="12" fill="none" strokeLinecap="round" />
            <circle cx="170" cy="130" r="30" fill="#F97316" opacity="0.8" />
          </svg>
        </div>
        <div className="absolute inset-0" style={{ width: `${value}%`, overflow: 'hidden' }}>
          <svg viewBox="0 0 400 400" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="400" fill="#0F172A" />
            <text x="200" y="60" textAnchor="middle" fontSize="28" fill="#22C55E">После</text>
            <path d="M170 320C140 300 150 200 190 190C230 180 240 260 220 320" stroke="#22C55E" strokeWidth="12" fill="none" strokeLinecap="round" />
            <circle cx="200" cy="130" r="26" fill="#22C55E" opacity="0.8" />
          </svg>
        </div>
        <div className="absolute inset-0 flex items-center" style={{ left: `calc(${value}% - 1px)` }}>
          <div className="h-full w-0.5 bg-white/70" />
        </div>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(event) => setValue(Number(event.target.value))}
        className="mt-6 w-full accent-accent"
      />
    </section>
  );
};

export default BeforeAfter;
