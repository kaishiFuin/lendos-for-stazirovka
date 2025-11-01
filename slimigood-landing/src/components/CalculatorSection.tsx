import { useState } from 'react';
import { runCalc, type ActivityLevel, type Gender } from '../lib/calc';
import { track } from '../lib/analytics';

interface FormState {
  heightCm: number;
  weightKg: number;
  age: number;
  gender: Gender;
  activity: ActivityLevel;
}

const initialState: FormState = {
  heightCm: 168,
  weightKg: 74,
  age: 33,
  gender: 'female',
  activity: 'medium'
};

export const CalculatorSection = () => {
  const [form, setForm] = useState<FormState>(initialState);
  const [result, setResult] = useState(() => runCalc(initialState));

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]:
        field === 'gender' || field === 'activity'
          ? (value as Gender | ActivityLevel)
          : Number(value)
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const calcResult = runCalc(form);
    setResult(calcResult);
    track('calc_used', {
      bmi: calcResult.bmi,
      activity: form.activity,
      gender: form.gender
    });
  };

  return (
    <section className="section-container" id="calc">
      <div className="mx-auto max-w-3xl text-center">
        <span className="badge mx-auto bg-white/5">Калькулятор SlimiGood</span>
        <h2 className="mt-6 text-3xl font-semibold sm:text-4xl">ИМТ и прогноз на 28 дней</h2>
        <p className="mt-3 text-white/70">
          Рассчитайте текущий индекс массы тела и получите ориентир потери веса в безопасном диапазоне 0,5–1 кг в неделю.
        </p>
      </div>
      <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr,0.9fr]">
        <form className="card space-y-6" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm text-white/70">Рост, см</span>
              <input
                type="number"
                min={120}
                max={220}
                required
                value={form.heightCm}
                onChange={(event) => handleChange('heightCm', event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white outline-none focus:border-accent"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-white/70">Вес, кг</span>
              <input
                type="number"
                min={40}
                max={200}
                required
                value={form.weightKg}
                onChange={(event) => handleChange('weightKg', event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white outline-none focus:border-accent"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-white/70">Возраст</span>
              <input
                type="number"
                min={18}
                max={75}
                required
                value={form.age}
                onChange={(event) => handleChange('age', event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white outline-none focus:border-accent"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-white/70">Пол</span>
              <select
                value={form.gender}
                onChange={(event) => handleChange('gender', event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white outline-none focus:border-accent"
              >
                <option value="female">Женский</option>
                <option value="male">Мужской</option>
              </select>
            </label>
          </div>
          <label className="space-y-2">
            <span className="text-sm text-white/70">Активность</span>
            <select
              value={form.activity}
              onChange={(event) => handleChange('activity', event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white outline-none focus:border-accent"
            >
              <option value="low">Минимум движения (офис, авто)</option>
              <option value="medium">Лёгкая активность 2–3 раза/нед</option>
              <option value="high">Тренировки 4+ раза или физический труд</option>
            </select>
          </label>
          <button
            type="submit"
            className="w-full rounded-full bg-accent px-6 py-3 text-base font-semibold text-slate-900 transition hover:bg-accent/90"
          >
            Рассчитать прогноз
          </button>
        </form>
        <div className="card space-y-6">
          <div>
            <p className="text-sm text-white/60">Ваш ИМТ</p>
            <p className="mt-2 text-4xl font-semibold text-white">{result.bmi}</p>
            <p className="text-sm text-accent">{result.category}</p>
          </div>
          <div>
            <p className="text-sm text-white/60">Прогноз SlimiGood на 28 дней</p>
            <p className="mt-2 text-2xl font-semibold text-white">
              −{result.forecast.min}…−{result.forecast.max} кг
            </p>
            <p className="mt-2 text-sm text-white/70">При соблюдении режима питания и приёма SlimiGood.</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-4 text-sm text-white/70">
            {result.advice}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalculatorSection;
