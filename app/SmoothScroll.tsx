"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    // We need to wait for the GSAP scripts to load
    const checkGsapAndInit = () => {
      // @ts-ignore
      const gsap = window.gsap;
      // @ts-ignore
      const ScrollTrigger = window.ScrollTrigger;
      // @ts-ignore
      const ScrollSmoother = window.ScrollSmoother;

      if (gsap && ScrollTrigger && ScrollSmoother) {
        gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

        // create the smooth scroller
        ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 2,
          effects: true,
          normalizeScroll: true,
        });
      } else {
        // If not loaded yet, try again in 50ms
        setTimeout(checkGsapAndInit, 50);
      }
    };

    checkGsapAndInit();

    return () => {
      // Cleanup ScrollSmoother instance if needed on unmount
      // @ts-ignore
      const ScrollSmoother = window.ScrollSmoother;
      if (ScrollSmoother) {
        const smoother = ScrollSmoother.get();
        if (smoother) smoother.kill();
      }
    };
  }, [pathname]);

  return null;
}
