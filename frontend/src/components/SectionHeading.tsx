import { PropsWithChildren } from 'react';
import { clsx } from 'clsx';

type SectionHeadingProps = PropsWithChildren<{
  kicker?: string;
  align?: 'left' | 'center';
  className?: string;
}>;

export function SectionHeading({ kicker, children, align = 'center', className }: SectionHeadingProps) {
  return (
    <div className={clsx('space-y-3', align === 'center' ? 'text-center' : 'text-left', className)}>
      {kicker && <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">{kicker}</span>}
      <h2 className="text-3xl font-bold text-dark sm:text-4xl">{children}</h2>
    </div>
  );
}
