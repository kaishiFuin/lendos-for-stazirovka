import { ReactNode } from 'react';

type AdvantageCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

export const AdvantageCard = ({ icon, title, description }: AdvantageCardProps) => (
  <div className="flex h-full flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-card">
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/20 text-accent">{icon}</div>
    <div className="text-lg font-semibold text-white">{title}</div>
    <p className="text-sm text-white/70">{description}</p>
  </div>
);
