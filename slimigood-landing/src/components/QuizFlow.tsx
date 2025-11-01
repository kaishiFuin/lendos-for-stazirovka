import { FormEvent, useMemo, useState } from 'react';
import { track } from '../lib/analytics';

interface QuizFlowProps {
  onComplete: () => void;
}

const questions = [
  {
    id: 'goal',
    question: 'Какой минус хотите увидеть на весах через 28 дней?',
    options: ['−3 кг', '−5 кг', '−7 кг', 'Больше −7 кг']
  },
  {
    id: 'diet',
    question: 'Как описали бы текущие приёмы пищи?',
    options: ['Ем нерегулярно', 'Обычно 3 раза в день', 'Питание по расписанию', 'Часто перекусываю']
  },
  {
    id: 'sleep',
    question: 'Сколько часов в среднем спите?',
    options: ['< 6 часов', '6–7 часов', '7–8 часов', '8+ часов']
  },
  {
    id: 'activity',
    question: 'Как часто двигаетесь?',
    options: ['Почти не двигаюсь', 'Хожу 5 000 шагов', 'Тренируюсь дома', 'Хожу в зал 2+ раза']
  },
  {
    id: 'support',
    question: 'Что поможет держаться плана больше всего?',
    options: ['Чат с куратором', 'План питания', 'Контроль веса', 'Напоминания и чек-листы']
  }
];

const QuizFlow = ({ onComplete }: QuizFlowProps) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [completed, setCompleted] = useState(false);

  const progress = useMemo(() => ((step + (completed ? 1 : 0)) / questions.length) * 100, [step, completed]);

  const current = questions[step];

  const onSelect = (option: string) => {
    setAnswers((prev) => ({ ...prev, [current.id]: option }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!answers[current.id]) return;

    if (step === questions.length - 1) {
      setCompleted(true);
      track('quiz_complete', { answers });
      onComplete();
    } else {
      setStep((prev) => prev + 1);
    }
  };

  if (completed) {
    return (
      <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-8 text-center text-slate-200">
        <h3 className="text-2xl font-semibold text-white">Персональный расчёт почти готов</h3>
        <p className="mt-4 text-sm">
          Куратор анализирует ответы и пришлёт прогноз на почту. Заберите подарок — дневник трекера привычек.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-8 text-slate-200">
      <div className="relative mb-6 h-2 w-full overflow-hidden rounded-full bg-slate-800">
        <span style={{ transform: `scaleX(${progress / 100})` }} className="progress-fill" />
      </div>
      <form className="space-y-4" onSubmit={onSubmit}>
        <p className="text-xs uppercase tracking-[0.3em] text-accent">шаг {step + 1} из {questions.length}</p>
        <h3 className="text-xl font-semibold text-white">{current.question}</h3>
        <div className="space-y-2">
          {current.options.map((option) => {
            const active = answers[current.id] === option;
            return (
              <label
                key={option}
                className={`flex cursor-pointer items-center justify-between rounded-2xl border px-4 py-3 text-sm transition ${
                  active ? 'border-brand bg-brand/15 text-white' : 'border-white/10 bg-slate-900/70'
                }`}
              >
                <span>{option}</span>
                <input
                  type="radio"
                  name={current.id}
                  value={option}
                  checked={active}
                  onChange={() => onSelect(option)}
                  className="accent-brand"
                />
              </label>
            );
          })}
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-glow"
        >
          {step === questions.length - 1 ? 'Получить прогноз' : 'Далее'}
        </button>
      </form>
    </div>
  );
};

export default QuizFlow;
