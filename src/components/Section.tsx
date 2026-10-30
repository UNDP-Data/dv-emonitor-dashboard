import { cn } from '@undp/design-system-react/cn';
import { Spacer } from '@undp/design-system-react/Spacer';
import { forwardRef, type HTMLAttributes } from 'react';

export const Section = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  ({ className, children, ...props }, ref) => (
    <section
      ref={ref}
      className={cn(
        'mx-auto w-full px-4 sm:px-12 lg:px-32 [&_.content-block]:max-w-5xl [*:nth-child(even)]:bg-surface',
        className,
      )}
      {...props}
    >
      <Spacer size='8xl' />
      <div className='mx-auto w-full max-w-[1920px]'>{children}</div>
      <Spacer size='8xl' />
    </section>
  ),
);
