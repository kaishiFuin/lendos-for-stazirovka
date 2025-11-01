import { useState } from 'react';
import { calculatePlan, ActivityLevel, Gender } from '../lib/calc';
import { track } from '../lib/analytics';

export const Calculator = () => {
  const [height, setHeight] = useState('165');
  const [weight, setWeight] = useState('74');
  const [age, setAge] = useState('32');
  const [gender, setGender] = useState<Gender>('female');
  const [activity, setActivity] = useState<ActivityLevel>('medium');
  const [result, setResult] = useState(() => calculatePlan({ height: 165, weight: 74, age: 32, gender: 'female', activity: 'medium' }));
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const input = {
        height: Number(height),
        weight: Number(weight),
        age: Number(age),
        gender,
        activity
      };
      const next = calculatePlan(input);
      setResult(next);
      setError(null);
      track('calc_used', { bmi: next.bmi, activity });
    } catch (err) {
      setError('Проверьте введённые значения.');
      console.error(err);
    }
  };

  return (
    <section id="calc" className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-10 flex flex-col gap-3">
        <h2 className="text-3xl font-bold text-white md:text-4xl">Калькулятор ИМТ и прогноз на 28 дней</h2>
        <p className="max-w-2xl text-white/70">
          Введите параметры — система мгновенно покажет ваш ИМТ и безопасный прогноз по весу на ближайшие 28 дней.
        </p>
      </div>
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <form onSubmit={handleSubmit} className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-white/70">
              Рост, см
              <input
                value={height}
                onChange={(event) => setHeight(event.target.value)}
                type="number"
                min={120}
                max={220}
                className="rounded-2xl border border-white/10 bg-dark/40 px-4 py-3 text-white focus:border-primary focus:outline-none"
                required
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-white/70">
              Вес, кг
              <input
                value={weight}
                onChange={(event) => setWeight(event.target.value)}
                type="number"
                min={35}
                max={210}
                className="rounded-2xl border border-white/10 bg-dark/40 px-4 py-3 text-white focus:border-primary focus:outline-none"
                required
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-white/70">
              Возраст
              <input
                value={age}
                onChange={(event) => setAge(event.target.value)}
                type="number"
                min={18}
                max={80}
                className="rounded-2xl border border-white/10 bg-dark/40 px-4 py-3 text-white focus:border-primary focus:outline-none"
                required
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-white/70">
              Уровень активности
              <select
                value={activity}
                onChange={(event) => setActivity(event.target.value as ActivityLevel)}
                className="rounded-2xl border border-white/10 bg-dark/40 px-4 py-3 text-white focus:border-primary focus:outline-none"
              >
                <option value="low">Минимальная</option>
                <option value="medium">Умеренная</option>
                <option value="high">Высокая</option>
              </select>
            </label>
          </div>
          <div className="flex gap-4">
            <label className="flex flex-1 items-center justify-between rounded-2xl border border-white/10 bg-dark/40 px-4 py-3 text-sm text-white/70">
              <span>Женщина</span>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === 'female'}
                onChange={() => setGender('female')}
                className="accent-primary"
              />
            </label>
            <label className="flex flex-1 items-center justify-between rounded-2xl border border-white/10 bg-dark/40 px-4 py-3 text-sm text-white/70">
              <span>Мужчина</span>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === 'male'}
                onChange={() => setGender('male')}
                className="accent-primary"
              />
            </label>
          </div>
          <button
            type="submit"
            className="rounded-full bg-primary px-6 py-3 text-base font-semibold text-slate-900 transition hover:bg-primary/90"
          >
            Посчитать прогноз
          </button>
          {error ? <p className="text-sm text-accent">{error}</p> : null}
        </form>
        <div className="flex flex-col gap-6 rounded-3xl border border-primary/20 bg-primary/5 p-6">
          <div>
            <div className="text-sm uppercase tracking-wide text-primary">Ваш ИМТ</div>
            <div className="text-4xl font-bold text-white">{result.bmi}</div>
            <div className="text-sm text-white/70">{result.bmiCategory}</div>
          </div>
          <div className="grid gap-2 rounded-2xl border border-primary/20 bg-slate-900/50 p-4 text-sm text-white/70">
            <span className="text-base font-semibold text-white">Прогноз SlimiGood на 28 дней</span>
            <span>
              Вы можете безопасно снизить вес на {result.minLoss}–{result.maxLoss} кг. Ожидаемый вес к дню 28: {result.projectedWeight[0]}–
              {result.projectedWeight[1]} кг.
            </span>
            <span>Совет: фиксируйте изменения каждую неделю, чтобы система могла корректировать план.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
