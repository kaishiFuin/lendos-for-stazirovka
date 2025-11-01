import { Users, Trophy, HeartPulse } from 'lucide-react';
import { Container } from '../components/Container';
import { SectionHeading } from '../components/SectionHeading';
import { useSectionView } from '../hooks/useSectionView';

const stats = [
  {
    icon: Users,
    value: '7 240+',
    label: 'участниц завершили программу',
  },
  {
    icon: Trophy,
    value: '92%',
    label: 'получили заявленный результат за 6 недель',
  },
  {
    icon: HeartPulse,
    value: '4.9/5',
    label: 'средняя оценка нутри-кураторов',
  },
];

export function SocialProof() {
  useSectionView('social-proof');
  return (
    <section data-section="social-proof" className="bg-white py-20">
      <Container>
        <SectionHeading kicker="Почему доверяют" align="center">
          Сообщество SlimiGood поддерживает вас на каждом шаге
        </SectionHeading>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="rounded-3xl border border-dark/10 bg-white p-6 text-center shadow-lg">
              <Icon className="mx-auto h-8 w-8 text-primary" />
              <p className="mt-4 text-3xl font-bold text-dark">{value}</p>
              <p className="mt-2 text-sm text-dark/70">{label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
