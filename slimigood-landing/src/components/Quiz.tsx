import { useEffect, useMemo, useState } from 'react';

const questions = [
  {
    id: 'goal',
    label: 'Цель по весу',
    options: ['−3 кг', '−5 кг', '−7 кг и более']
  },
  {
    id: 'meals',
    label: 'Сколько приёмов пищи в день?',
    options: ['2', '3', '4 и более']
  },
  {
    id: 'sleep',
    label: 'Как со сном?',
    options: ['&lt;6 часов', '6–7 часов', '8 часов и более']
  },
  {
    id: 'stress',
    label: 'Стресс на работе',
    options: ['Высокий', 'Средний', 'Минимальный']
  },
  {
    id: 'activity',
    label: 'Активность в течение дня',
    options: ['Мало двигаюсь', 'Хожу пешком', 'Занимаюсь регулярно']
  }
];

type QuizProps = {
  onStart?: () => void;
  onComplete?: (result: { answers: Record<string, string> }) => void;
};

const Quiz = ({ onStart, onComplete }: QuizProps) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) {
      setStarted(true);
      onStart?.();
    }
  }, [started, onStart]);

  const currentQuestion = questions[step];
  const progress = useMemo(() => Math.round(((step + 1) / questions.length) * 100), [step]);

  const handleAnswer = (option: string) => {
    const nextAnswers = { ...answers, [currentQuestion.id]: option };
    setAnswers(nextAnswers);
    if (step === questions.length - 1) {
      onComplete?.({ answers: nextAnswers });
    } else {
      setStep((prev) => Math.min(prev + 1, questions.length - 1));
    }
  };

  return (
    <div className="space-y-4">
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div className="progress-gradient h-2" style={{ width: `${progress}%` }} />
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
        Осталось {questions.length - step} вопрос{questions.length - step === 1 ? '' : 'а'}
      </div>
      <div className="space-y-3">
        <div className="text-lg font-semibold text-white">{currentQuestion.label}</div>
        <div className="grid gap-3">
          {currentQuestion.options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              className="rounded-2xl border border-white/10 bg-dark/50 px-4 py-3 text-left text-sm text-white/80 transition hover:border-primary/60"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      {step === questions.length - 1 && answers[currentQuestion.id] ? (
        <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4 text-sm text-primary">
          Готово! Мы собрали достаточно данных, чтобы подготовить персональный план.
        </div>
      ) : null}
    </div>
  );
};

export default Quiz;
