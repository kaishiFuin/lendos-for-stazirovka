import { Variant } from '../lib/ab';

const messages: Record<Variant, string> = {
  control: 'SlimiGood — комплекс мягкого похудения с гарантией результата',
  experiment: 'SlimiGood с повышенной биодоступностью — минус до 7 кг за курс'
};

type StickyBarProps = {
  variant: Variant;
};

const StickyBar = ({ variant }: StickyBarProps) => {
  return (
    <div className="sticky top-0 z-50 bg-primary text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 text-sm font-medium">
        <span>{messages[variant]}</span>
        <a href="#lead" className="rounded bg-accent px-4 py-2 text-neutral">
          Получить консультацию
        </a>
      </div>
    </div>
  );
};

export default StickyBar;
