import { useEffect, useState } from 'react';
import { track } from '../lib/analytics';

interface QuizOption {
  label: string;
  value: string;
}

interface QuizStep {
  id: string;
  question: string;
  options: QuizOption[];
}

const steps: QuizStep[] = [
  {
    id: 'goal',
    question: 'Какой результат ожидаете через 28 дней?',
    options: [
      { label: '−3 кг и перезапустить метаболизм', value: 'soft' },
      { label: '−5…7 кг, готов(а) следовать плану', value: 'focused' },
      { label: 'Более 7 кг, нужна усиленная поддержка', value: 'intense' }
    ]
  },
  {
    id: 'meals',
    question: 'Сколько приёмов пищи в день удобнее всего?',
    options: [
      { label: '2–3 плотных', value: '23' },
      { label: '3 основных + перекусы', value: 'balanced' },
      { label: 'Готов(а) экспериментировать', value: 'flexible' }
    ]
  },
  {
    id: 'sleep',
    question: 'Как спите последние 7 дней?',
    options: [
      { label: '6 часов или меньше', value: 'low' },
      { label: '6–7 часов', value: 'mid' },
      { label: '7+ часов', value: 'optimal' }
    ]
  },
  {
    id: 'stress',
    question: 'Уровень стресса',
    options: [
      { label: 'Высокий, нужен мягкий режим', value: 'high' },
      { label: 'Средний, справляюсь', value: 'mid' },
      { label: 'Низкий, готов(а) к активным изменениям', value: 'low' }
    ]
  },
  {
    id: 'support',
    question: 'Какую поддержку хотите получить?',
    options: [
      { label: 'Ежедневный контроль', value: 'daily' },
      { label: 'Раз в неделю и чат', value: 'weekly' },
      { label: 'Только чат и материалы', value: 'lite' }
    ]
  }
];

interface QuizProps {
  onComplete: (summary: Record<string, string>) => void;
}

export function Quiz({ onComplete }: QuizProps) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const step = steps[index];
  const progress = ((index + 1) / steps.length) * 100;

  useEffect(() => {
    if (index === 0) {
      track('quiz_start', { step: step.id });
    }
  }, [index, step.id]);

  const handleAnswer = (option: QuizOption) => {
    const nextAnswers = { ...answers, [step.id]: option.value };
    if (index === steps.length - 1) {
      setAnswers(nextAnswers);
      track('quiz_complete', nextAnswers);
      onComplete(nextAnswers);
    } else {
      setAnswers(nextAnswers);
      setIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="rounded-3xl border border-brand/20 bg-white/90 p-6 shadow-soft">
      <div className="mb-4">
        <p className="text-sm font-medium text-brand">Вопрос {index + 1} из {steps.length}</p>
        <div className="progress-track mt-2">
          <div className="progress-thumb" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <h3 className="text-2xl font-semibold text-neutral">{step.question}</h3>
      <div className="mt-6 grid gap-3">
        {step.options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => handleAnswer(option)}
            className="rounded-2xl border border-slate-200 px-4 py-4 text-left text-sm font-medium text-neutral transition hover:border-brand hover:bg-brand/10"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
