import { FormEvent, useState } from 'react';
import { calculateProjection, ActivityLevel } from '../lib/calc';
import { track } from '../lib/analytics';

interface FormState {
  height: string;
  weight: string;
  age: string;
  sex: 'female' | 'male';
  activity: ActivityLevel;
}

const initialState: FormState = {
  height: '168',
  weight: '74',
  age: '32',
  sex: 'female',
  activity: 'medium'
};

const activityLabels: Record<ActivityLevel, string> = {
  low: 'Минимальная активность',
  medium: 'Умеренная активность',
  high: 'Высокая активность'
};

const Calculator = () => {
  const [form, setForm] = useState<FormState>(initialState);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState(() => calculateProjection({
    height: Number(initialState.height),
    weight: Number(initialState.weight),
    age: Number(initialState.age),
    sex: initialState.sex,
    activity: initialState.activity
  }));

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const payload = {
        height: Number(form.height),
        weight: Number(form.weight),
        age: Number(form.age),
        sex: form.sex,
        activity: form.activity
      };
      if (!payload.height || !payload.weight || !payload.age) {
        throw new Error('Проверьте корректность значений.');
      }
      const calcResult = calculateProjection(payload);
      setResult(calcResult);
      setError(null);
      track('calc_used', { ...payload, bmi: calcResult.bmi });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка расчёта.');
    }
  };

  return (
    <section className="bg-slate-950 py-24" id="calculator">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-semibold text-white">Калькулятор ИМТ + прогноз SlimiGood</h2>
          <p className="mt-4 text-slate-300">
            Введите исходные данные и узнайте ориентир на ближайшие 28 дней. Прогноз учитывает ваш уровень активности.
          </p>
          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col text-sm text-slate-300">
                Рост, см
                <input
                  type="number"
                  min="120"
                  max="220"
                  value={form.height}
                  onChange={(e) => setForm((prev) => ({ ...prev, height: e.target.value }))}
                  className="mt-1 rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-base text-white focus:border-brand focus:outline-none"
                  required
                />
              </label>
              <label className="flex flex-col text-sm text-slate-300">
                Вес, кг
                <input
                  type="number"
                  min="40"
                  max="200"
                  value={form.weight}
                  onChange={(e) => setForm((prev) => ({ ...prev, weight: e.target.value }))}
                  className="mt-1 rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-base text-white focus:border-brand focus:outline-none"
                  required
                />
              </label>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col text-sm text-slate-300">
                Возраст
                <input
                  type="number"
                  min="18"
                  max="80"
                  value={form.age}
                  onChange={(e) => setForm((prev) => ({ ...prev, age: e.target.value }))}
                  className="mt-1 rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-base text-white focus:border-brand focus:outline-none"
                  required
                />
              </label>
              <div className="flex flex-col text-sm text-slate-300">
                Пол
                <div className="mt-1 grid grid-cols-2 gap-2">
                  {[
                    { value: 'female', label: 'Женский' },
                    { value: 'male', label: 'Мужской' }
                  ].map((option) => (
                    <button
                      type="button"
                      key={option.value}
                      className={`rounded-xl border px-4 py-3 text-base transition ${
                        form.sex === option.value
                          ? 'border-brand bg-brand/20 text-white'
                          : 'border-white/10 bg-slate-900/70 text-slate-300'
                      }`}
                      onClick={() => setForm((prev) => ({ ...prev, sex: option.value as 'female' | 'male' }))}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col text-sm text-slate-300">
              Активность
              <div className="mt-2 space-y-2">
                {(Object.keys(activityLabels) as ActivityLevel[]).map((level) => (
                  <label
                    key={level}
                    className={`flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3 transition ${
                      form.activity === level
                        ? 'border-brand bg-brand/20 text-white'
                        : 'border-white/10 bg-slate-900/70 text-slate-300'
                    }`}
                  >
                    <span>{activityLabels[level]}</span>
                    <input
                      type="radio"
                      name="activity"
                      value={level}
                      checked={form.activity === level}
                      onChange={() => setForm((prev) => ({ ...prev, activity: level }))}
                      className="accent-brand"
                    />
                  </label>
                ))}
              </div>
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button
              type="submit"
              className="w-full rounded-full bg-brand px-8 py-3 text-lg font-semibold text-white shadow-glow transition hover:bg-brand-light"
            >
              Рассчитать прогноз
            </button>
          </form>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-8">
          <h3 className="text-2xl font-semibold text-white">Ваш результат</h3>
          <div className="mt-6 space-y-6 text-sm text-slate-200">
            <div>
              <span className="text-slate-400">ИМТ:</span>
              <p className="mt-1 text-3xl font-semibold text-white">{result.bmi}</p>
              <p className="text-slate-300">{result.bmiCategory}</p>
            </div>
            <div>
              <span className="text-slate-400">Темп снижения:</span>
              <p className="mt-1 text-xl text-white">
                {result.weeklyLossRange[0]}–{result.weeklyLossRange[1]} кг/неделю
              </p>
            </div>
            <div>
              <span className="text-slate-400">Прогноз на 28 дней:</span>
              <p className="mt-1 text-xl text-white">
                {result.totalLossRange[0]}–{result.totalLossRange[1]} кг
              </p>
              <p className="mt-2 text-slate-300">{result.projection}</p>
            </div>
            <div className="rounded-2xl bg-slate-950/70 p-4 text-xs text-slate-400">
              *Прогноз ориентировочный и не заменяет консультацию специалиста. SlimiGood помогает адаптировать план под ваши цели и здоровье.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
