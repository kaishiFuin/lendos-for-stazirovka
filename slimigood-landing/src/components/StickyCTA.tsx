import type { Variant } from '../lib/ab';
import { track } from '../lib/analytics';

interface StickyCTAProps {
  variant: Variant;
  onClick: () => void;
}

export const StickyCTA = ({ variant, onClick }: StickyCTAProps) => {
  const label =
    variant === 'A' ? '−45% сегодня' : 'Пройти квиз → персональный план';

  const handleClick = () => {
    track('cta_click', { variant, location: 'sticky' });
    onClick();
  };

  return (
    <div className="sticky-cta">
      <span>{label}</span>
      <button type="button" onClick={handleClick}>
        Вперёд
      </button>
    </div>
  );
};

export default StickyCTA;
