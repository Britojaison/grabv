"use client";

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1, // Default is 1. Adjusting this limits the scroll speed
      touchMultiplier: 2,
    });

    lenis.stop();

    const resizeObserver = new ResizeObserver(() => {
      // Small delay to ensure layout is complete before starting lenis
      setTimeout(() => {
        lenis.start();
        lenis.resize();
      }, 100);
    });

    resizeObserver.observe(document.body);

    // Sync Lenis with GSAP ScrollTrigger if present
    if (typeof window !== 'undefined' && (window as any).ScrollTrigger && (window as any).gsap) {
      lenis.on('scroll', (window as any).ScrollTrigger.update);
      (window as any).gsap.ticker.add((time: number) => {
        lenis.raf(time * 1000);
      });
      (window as any).gsap.ticker.lagSmoothing(0);
    } else {
      // Fallback if GSAP is not loaded
      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }

    return () => {
      resizeObserver.disconnect();
      lenis.destroy();
      if (typeof window !== 'undefined' && (window as any).gsap?.ticker) {
        (window as any).gsap.ticker.remove(lenis.raf);
      }
    };
  }, []);

  return <>{children}</>;
}
