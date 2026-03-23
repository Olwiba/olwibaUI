'use client';

import * as React from 'react';

export function useIntersectionObserver(
  options?: IntersectionObserverInit,
): [React.RefObject<Element | null>, boolean] {
  const ref = React.useRef<Element | null>(null);
  const [isIntersecting, setIsIntersecting] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, isIntersecting];
}
