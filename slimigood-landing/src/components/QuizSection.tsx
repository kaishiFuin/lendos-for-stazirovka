import { useMemo, useState } from 'react';
import { track } from '../lib/analytics';
import type { Variant } from '../lib/ab';

interface Question {
  id: string;
  title: string;
  options: string[];
}

const questions: Question[] = [
  {
    id: 'goal',
    title: 'Какая цель по весу на ближайшие 3 месяца?',
    options: ['−4 кг', '−6–8 кг', 'Более −10 кг', 'Удержать текущий вес']
  },
  {
    id: 'diet_history',
    title: 'Какой опыт диет был раньше?',
    options: ['Кето/строгие диеты', 'Гибкий рацион', 'Не пробовала', 'Коучинг/питание с поддержкой']
  },
  {
    id: 'sleep',
    title: 'Сколько часов сна в среднем?',
    options: ['<6 часов', '6–7 часов', '7–8 часов', 'Более 8 часов']
  },
  {
    id: 'activity',
    title: 'Какая активность?',
    options: ['Минимум', 'Хожу/легкий фитнес 2 раза', 'Тренировки 3–4 раза', 'Тяжёлые тренировки/работа на ногах']
  },
  {
    id: 'motivation',
    title: 'Главный мотиватор?',
    options: ['Самочувствие', 'Внешний вид', 'Здоровье/анализы', 'Событие/срок']
  }
];

interface QuizSectionProps {
  variant: Variant;
}

export const QuizSection = ({ variant }: QuizSectionProps) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(''));
  const [status, setStatus] = useState<'idle' | 'complete'>('idle');

  const progress = useMemo(() => ((step) / questions.length) * 100, [step]);

  const handleOption = (option: string) => {
    const nextAnswers = [...answers];
    nextAnswers[step] = option;
    setAnswers(nextAnswers);
    if (step === 0) {
      track('quiz_start', { variant });
    }
    if (step + 1 === questions.length) {
      setStatus('complete');
      track('quiz_complete', { answers: nextAnswers, variant });
    } else {
      setStep(step + 1);
    }
  };

  if (status === 'complete') {
    const focus = answers[1]?.includes('коучинг') ? 'поддержкой эксперта' : 'самостоятельным контролем';
    return (
      <section className="section-container" id="quiz">
        <div className="mx-auto max-w-3xl rounded-3xl border border-accent/40 bg-accent/10 p-10 text-center text-white">
          <h2 className="text-3xl font-semibold">Готов персональный режим!</h2>
          <p className="mt-4 text-white/80">
            Мы собрали рекомендации с упором на {focus}. Куратор пришлёт чек-лист и расписание приёма SlimiGood в течение 10 минут.
          </p>
        </div>
      </section>
    );
  }

  const current = questions[step];

  return (
    <section className="section-container" id="quiz">
      <div className="mx-auto max-w-3xl">
        <span className="badge bg-white/5">Квиз SlimiGood</span>
        <h2 className="mt-6 text-3xl font-semibold text-white">5 вопросов → персональный режим</h2>
        <div className="mt-6 h-3 w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-white/60">Вопрос {step + 1} из {questions.length}</p>
          <h3 className="mt-3 text-2xl font-semibold text-white">{current.title}</h3>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {current.options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleOption(option)}
                className="rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-left text-base text-white transition hover:border-accent/50 hover:bg-white/20"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuizSection;
