import { type ReactNode, useEffect, useRef, useState } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  className?: string;
}

export function RenderWhenVisible({
  children,
  fallback = null,
  rootMargin = '300px',
  className = 'h-full w-full',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || isVisible) return;
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isVisible, rootMargin]);

  return (
    <div ref={ref} className={className}>
      {isVisible ? children : fallback}
    </div>
  );
}
