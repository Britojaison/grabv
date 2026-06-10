"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const WHEEL_EASE = 0.14;
const WHEEL_DISTANCE_MULTIPLIER = 0.72;
const MAX_WHEEL_STEP = 180;
const MAX_SCROLL_LEAD_RATIO = 0.72;
const LINE_HEIGHT = 40;

function getMaxScrollY() {
  return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
}

function clampScrollY(value: number) {
  return Math.min(getMaxScrollY(), Math.max(0, value));
}

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) {
    return false;
  }

  return Boolean(target.closest("input, textarea, select, [contenteditable='true']"));
}

function normalizeWheelDelta(event: WheelEvent) {
  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
    return event.deltaY * LINE_HEIGHT;
  }

  if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
    return event.deltaY * window.innerHeight;
  }

  return event.deltaY;
}

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerQuery = window.matchMedia("(pointer: fine)");

    if (motionQuery.matches || !pointerQuery.matches) {
      return;
    }

    let currentY = window.scrollY;
    let targetY = window.scrollY;
    let animationFrame: number | null = null;
    let isAnimatingScroll = false;

    const stopAnimation = () => {
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }

      isAnimatingScroll = false;
    };

    const step = () => {
      const distance = targetY - currentY;

      if (Math.abs(distance) < 0.5) {
        currentY = targetY;
        window.scrollTo(0, Math.round(currentY));
        stopAnimation();
        return;
      }

      currentY += distance * WHEEL_EASE;
      window.scrollTo(0, currentY);
      animationFrame = window.requestAnimationFrame(step);
    };

    const startAnimation = () => {
      if (animationFrame !== null) {
        return;
      }

      isAnimatingScroll = true;
      animationFrame = window.requestAnimationFrame(step);
    };

    const moveTo = (nextTargetY: number) => {
      targetY = clampScrollY(nextTargetY);
      currentY = window.scrollY;
      startAnimation();
    };

    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.defaultPrevented) {
        return;
      }

      const target = event.target instanceof Element ? event.target : null;
      const scrollable = target?.closest("[data-native-scroll], textarea, select");

      if (scrollable) {
        return;
      }

      const wheelDelta = normalizeWheelDelta(event) * WHEEL_DISTANCE_MULTIPLIER;
      const limitedDelta = Math.sign(wheelDelta) * Math.min(Math.abs(wheelDelta), MAX_WHEEL_STEP);
      const maxLead = window.innerHeight * MAX_SCROLL_LEAD_RATIO;
      const nextTargetY = Math.min(
        window.scrollY + maxLead,
        Math.max(window.scrollY - maxLead, targetY + limitedDelta),
      );

      event.preventDefault();
      moveTo(nextTargetY);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || isEditableTarget(event.target)) {
        return;
      }

      const pageStep = window.innerHeight * 0.86;
      const keyTargets: Record<string, number> = {
        ArrowDown: targetY + 110,
        ArrowUp: targetY - 110,
        PageDown: targetY + pageStep,
        PageUp: targetY - pageStep,
        Home: 0,
        End: getMaxScrollY(),
        " ": event.shiftKey ? targetY - pageStep : targetY + pageStep,
      };

      if (!(event.key in keyTargets)) {
        return;
      }

      event.preventDefault();
      moveTo(keyTargets[event.key]);
    };

    const syncWithNativeScroll = () => {
      if (isAnimatingScroll) {
        return;
      }

      currentY = window.scrollY;
      targetY = window.scrollY;
    };

    const handleResize = () => {
      targetY = clampScrollY(targetY);
      currentY = clampScrollY(currentY);
    };

    document.documentElement.classList.add("smooth-scroll-active");
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", syncWithNativeScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      stopAnimation();
      document.documentElement.classList.remove("smooth-scroll-active");
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", syncWithNativeScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [pathname]);

  return null;
}
