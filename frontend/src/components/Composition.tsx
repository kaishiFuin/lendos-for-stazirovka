import { useState } from 'react';
import { compositionTabs } from '../data/content';

export function Composition(): JSX.Element {
  const [activeTab, setActiveTab] = useState(0);
  const tab = compositionTabs[activeTab];

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-semibold">Умная формула для каждого времени суток</h2>
          <p className="mt-4 max-w-2xl text-white/70">
            Три капсулы работают синхронно: поддерживают энергию утром, контролируют аппетит днём и восстанавливают вечером.
          </p>
        </div>
        <div className="mt-12 flex flex-col gap-6 lg:flex-row">
          <div className="flex flex-wrap justify-center gap-3 lg:flex-col lg:justify-start">
            {compositionTabs.map((item, index) => (
              <button
                key={item.name}
                type="button"
                className={`rounded-full border px-5 py-2 text-sm transition ${
                  index === activeTab
                    ? 'border-accent bg-accent/20 text-accent'
                    : 'border-white/10 bg-white/5 text-white/60 hover:text-white'
                }`}
                onClick={() => setActiveTab(index)}
              >
                {item.name}
              </button>
            ))}
          </div>
          <div className="flex-1 rounded-3xl border border-white/10 bg-slate-900/50 p-8">
            <h3 className="text-2xl font-semibold">{tab.name}</h3>
            <p className="mt-3 text-sm text-white/70">{tab.description}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {tab.items.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white/80">
                  {item}
                </div>
              ))}
            </div>
            <svg className="mt-8 h-40 w-full" viewBox="0 0 600 160" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="10" width="580" height="140" rx="24" fill="rgba(107,78,255,0.12)" stroke="rgba(180,163,255,0.6)" strokeWidth="2" />
              <text x="300" y="70" textAnchor="middle" fontFamily="'Segoe UI', sans-serif" fontSize="24" fill="#E2E8F0">
                Синергия компонентов
              </text>
              <text x="300" y="110" textAnchor="middle" fontFamily="'Segoe UI', sans-serif" fontSize="18" fill="#CBD5F5">
                {tab.items.join(' • ')}
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
