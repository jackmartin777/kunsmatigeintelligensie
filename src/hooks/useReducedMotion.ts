import { useState, useEffect } from 'react';

/**
 * Custom React hook that detects if the user prefers reduced motion.
 * Monitors the 'prefers-reduced-motion' media query and updates when it changes.
 * Useful for conditionally disabling animations for accessibility.
 * 
 * @returns Boolean indicating if reduced motion is preferred (true) or not (false)
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}
