import { Leaf, LineChart, MoonStar, Sparkles } from 'lucide-react';

const benefits = [
  {
    icon: Leaf,
    title: 'Натуральный состав',
    text: 'Экстракты гарцинии, зелёного кофе и L-карнитин работают синергично и поддерживают обмен веществ.'
  },
  {
    icon: LineChart,
    title: 'Контроль аппетита',
    text: 'Регулярный приём снижает тягу к сладкому и вечерним перекусам — без резких скачков сахара.'
  },
  {
    icon: MoonStar,
    title: 'Здоровый сон',
    text: 'Магний и мелисса помогают расслабиться и восстанавливают циркадные ритмы.'
  },
  {
    icon: Sparkles,
    title: 'Детокс-поддержка',
    text: 'Комплекс антиоксидантов выводит лишнюю жидкость и поддерживает печень.'
  }
];

const Benefits = () => (
  <section className="mx-auto max-w-6xl px-4">
    <h2 className="text-3xl font-bold">Почему SlimiGood работает</h2>
    <p className="mt-2 text-white/70">Программа сочетает нутрицевтики, сопровождение и привычки, чтобы закрепить результат.</p>
    <div className="mt-8 grid gap-6 md:grid-cols-2">
      {benefits.map((benefit) => (
        <div key={benefit.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <benefit.icon className="h-10 w-10 text-accent" />
          <h3 className="mt-4 text-xl font-semibold">{benefit.title}</h3>
          <p className="mt-2 text-sm text-white/70">{benefit.text}</p>
        </div>
      ))}
    </div>
  </section>
);

export default Benefits;
