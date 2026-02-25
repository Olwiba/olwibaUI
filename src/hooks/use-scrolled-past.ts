'use client';

import * as React from 'react';

/**
 * Returns true when the page has scrolled past a given Y threshold in pixels.
 * Useful for showing/hiding sticky headers, back-to-top buttons, etc.
 *
 * @example
 * const scrolledPast = useScrolledPast(100);
 * return <header className={scrolledPast ? 'shadow-md' : ''}>...</header>;
 */
export function useScrolledPast(threshold: number): boolean {
  const [scrolledPast, setScrolledPast] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolledPast(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrolledPast;
}
