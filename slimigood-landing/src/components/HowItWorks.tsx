import { motion } from 'framer-motion';

const steps = [
  {
    title: 'Ответьте на 5 вопросов',
    description: 'Фиксируем исходные данные, образ жизни и цели, чтобы система подобрала комфортный старт.'
  },
  {
    title: 'Получите персональный режим',
    description: 'Меню, тайминг приёмов пищи, полезные привычки и мягкие активности под вашу занятость.'
  },
  {
    title: 'Поддержка и контроль прогресса',
    description: 'Нутрициолог на связи, еженедельная адаптация плана и замеры результата.'
  }
];

export const HowItWorks = () => (
  <section id="how" className="mx-auto max-w-6xl px-6 py-20">
    <div className="mb-10 flex flex-col gap-3">
      <h2 className="text-3xl font-bold text-white md:text-4xl">Как работает SlimiGood</h2>
      <p className="max-w-2xl text-white/70">Система собирает данные, подбирает безопасные шаги и поддерживает вас до результата.</p>
    </div>
    <div className="grid gap-8 md:grid-cols-3">
      {steps.map((step, index) => (
        <motion.div
          key={step.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: index * 0.1 }}
          className="rounded-3xl border border-white/10 bg-white/5 p-6"
        >
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/20 text-lg font-bold text-primary">
            0{index + 1}
          </div>
          <h3 className="mb-2 text-xl font-semibold text-white">{step.title}</h3>
          <p className="text-sm text-white/70">{step.description}</p>
        </motion.div>
      ))}
    </div>
  </section>
);
