import { FormEvent, useState } from 'react';
import { CalculatorIcon } from 'lucide-react';
import { calculateProjection, CalcResult } from '../lib/calc';
import { track } from '../lib/analytics';

export function Calculator() {
  const [form, setForm] = useState({
    heightCm: 168,
    weightKg: 74,
    age: 32,
    sex: 'female' as const,
    activity: 'medium' as const
  });
  const [result, setResult] = useState<CalcResult | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const projection = calculateProjection({
      heightCm: form.heightCm,
      weightKg: form.weightKg,
      age: form.age,
      sex: form.sex,
      activity: form.activity
    });
    setResult(projection);
    track('calc_used', { ...form, bmi: projection.bmi });
  };

  return (
    <section id="calculator" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="section-title">Проверьте, сколько килограммов реально потерять за 28 дней</p>
          <p className="section-subtitle">
            Расчёт учитывает исходные данные и безопасный темп снижения веса — не более 1 кг в неделю.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-[1fr,1fr]">
          <form onSubmit={handleSubmit} className="card border-brand/10 bg-slate-50/80">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10">
                <CalculatorIcon className="h-5 w-5 text-brand" aria-hidden="true" />
              </span>
              <h3 className="text-xl font-semibold">Ваши данные</h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm">
                Рост (см)
                <input
                  type="number"
                  min="120"
                  max="220"
                  value={form.heightCm}
                  onChange={(event) => setForm((prev) => ({ ...prev, heightCm: Number(event.target.value) }))}
                  className="rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                  required
                />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                Вес (кг)
                <input
                  type="number"
                  min="40"
                  max="220"
                  value={form.weightKg}
                  onChange={(event) => setForm((prev) => ({ ...prev, weightKg: Number(event.target.value) }))}
                  className="rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                  required
                />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                Возраст
                <input
                  type="number"
                  min="18"
                  max="80"
                  value={form.age}
                  onChange={(event) => setForm((prev) => ({ ...prev, age: Number(event.target.value) }))}
                  className="rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                  required
                />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                Пол
                <select
                  value={form.sex}
                  onChange={(event) => setForm((prev) => ({ ...prev, sex: event.target.value as 'female' | 'male' }))}
                  className="rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                >
                  <option value="female">Женский</option>
                  <option value="male">Мужской</option>
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm sm:col-span-2">
                Уровень активности
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { value: 'low', label: 'Минимальная' },
                    { value: 'medium', label: 'Умеренная' },
                    { value: 'high', label: 'Высокая' }
                  ].map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, activity: item.value as 'low' | 'medium' | 'high' }))}
                      className={`rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                        form.activity === item.value
                          ? 'border-brand bg-brand/10 text-brand'
                          : 'border-slate-200 bg-white text-neutral'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </label>
            </div>
            <button
              type="submit"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-base font-semibold text-white shadow-soft transition hover:bg-brand-dark"
            >
              Рассчитать прогноз
            </button>
          </form>
          <div className="card border-brand/10 bg-white">
            {result ? (
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-neutral">Ваш прогноз на 28 дней</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-brand/20 bg-brand/5 p-4">
                    <p className="text-sm text-neutral/60">Индекс массы тела</p>
                    <p className="text-3xl font-semibold text-brand">{result.bmi}</p>
                    <p className="text-sm text-neutral/70">{result.category}</p>
                  </div>
                  <div className="rounded-2xl border border-accent/20 bg-accent/5 p-4">
                    <p className="text-sm text-neutral/60">Темп в неделю</p>
                    <p className="text-3xl font-semibold text-accent">
                      {result.weeklyMinKg}–{result.weeklyMaxKg} кг
                    </p>
                    <p className="text-sm text-neutral/70">безопасный диапазон</p>
                  </div>
                  <div className="rounded-2xl border border-brand/20 bg-brand/5 p-4 sm:col-span-2">
                    <p className="text-sm text-neutral/60">За 28 дней вы можете</p>
                    <p className="text-3xl font-semibold text-brand">
                      −{result.totalMinKg}…−{result.totalMaxKg} кг
                    </p>
                    <p className="text-sm text-neutral/70">при соблюдении рекомендаций и корректировках с куратором</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-neutral/70">{result.advisory}</p>
              </div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-4 text-center text-neutral/60">
                <p className="text-xl font-semibold text-neutral">Заполните форму слева</p>
                <p className="max-w-sm text-sm">
                  Мы покажем ориентир по килограммам и дадим подсказки, как ускорить прогресс без жестких ограничений.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
