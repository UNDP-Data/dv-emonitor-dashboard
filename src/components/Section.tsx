import { cn } from '@undp/design-system-react/cn';
import { PageSection } from '@undp/design-system-react/PageSection';
import { forwardRef, type HTMLAttributes } from 'react';

export const Section = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <PageSection
      ref={ref}
      className={cn('[&_.content-block]:max-w-5xl [*:nth-child(even)]:bg-surface', className)}
      {...props}
    />
  ),
);
