import { useState } from 'react';

const prizes = ['Скидка 15%', 'Бесплатная доставка', 'Гайд по детоксу', 'Персональный звонок нутрициолога'];

const SpinnerGame = () => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    const winner = prizes[Math.floor(Math.random() * prizes.length)];
    setTimeout(() => {
      setResult(winner);
      setSpinning(false);
    }, 2000);
  };

  return (
    <div className="fixed bottom-6 left-6">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-lg">
        <h4 className="text-lg font-semibold">Крутите колесо подарков</h4>
        <div className="relative mt-4 h-40 w-40">
          <svg className={`h-40 w-40 ${spinning ? 'animate-spin-slow' : ''}`} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="95" fill="#5B21B6" />
            {prizes.map((prize, index) => {
              const angle = (index / prizes.length) * 360;
              return (
                <g key={prize} transform={`rotate(${angle} 100 100)`}>
                  <path d="M100 100L100 10A90 90 0 0 1 173 55Z" fill={index % 2 === 0 ? '#F97316' : '#0EA5E9'} opacity="0.85" />
                  <text x="130" y="60" transform="rotate(60 130 60)" fontSize="10" fill="#111827">
                    {prize}
                  </text>
                </g>
              );
            })}
            <circle cx="100" cy="100" r="30" fill="#F59E0B" />
            <text x="100" y="106" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#111827">
              Spin
            </text>
          </svg>
          <div className="pointer-events-none absolute inset-0 flex items-start justify-center">
            <svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">
              <polygon points="15,0 30,40 0,40" fill="#F97316" />
            </svg>
          </div>
        </div>
        <button
          type="button"
          onClick={spin}
          className="mt-4 w-full rounded bg-accent px-4 py-2 text-sm font-semibold text-neutral disabled:opacity-50"
          disabled={spinning}
        >
          {spinning ? 'Крутится...' : 'Крутить колесо'}
        </button>
        {result && <p className="mt-3 text-sm text-white/70">Ваш приз: {result}. Мы добавим его к заказу.</p>}
      </div>
    </div>
  );
};

export default SpinnerGame;
