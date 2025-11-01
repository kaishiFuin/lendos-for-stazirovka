import { ListChecks, Pill, Salad } from 'lucide-react';

const steps = [
  {
    icon: ListChecks,
    title: 'Диагностика и квиз',
    description: 'Собираем данные по питанию, гормональному фону и режиму, фиксируем UTM-источник и делаем стартовый чек-лист.'
  },
  {
    icon: Salad,
    title: 'Протокол SlimiGood',
    description: 'Передаём гибкий план питания, меню на 7 дней, дренажный режим и нутрицевтики. Настраиваем напоминания.'
  },
  {
    icon: Pill,
    title: 'Сопровождение 28 дней',
    description: 'Коуч и чат поддержки корректируют рацион, следят за замерами, празднуют прогресс и фиксируют результаты.'
  }
];

export const HowItWorksSection = () => (
  <section className="section-container" id="process">
    <div className="mx-auto max-w-3xl text-center">
      <span className="badge mx-auto bg-white/5">Как работает программа</span>
      <h2 className="mt-6 text-3xl font-semibold sm:text-4xl">План на 28 дней — шаг за шагом</h2>
    </div>
    <div className="mt-12 grid gap-6 md:grid-cols-3">
      {steps.map((step, index) => (
        <div key={step.title} className="card h-full">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary">
            <step.icon className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-xl font-semibold">{index + 1}. {step.title}</h3>
          <p className="mt-2 text-sm text-white/70">{step.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default HowItWorksSection;
