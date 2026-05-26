"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const textSelector = [
  ".text-pop-label",
  "main h1",
  "main h2",
  "main h3",
  "main h4",
  "main h5",
  "main h6",
  "main p",
  "main a",
  "main button",
  "main span",
  "main li",
  "main figcaption",
  "main label",
  "main legend",
  "footer h1",
  "footer h2",
  "footer h3",
  "footer h4",
  "footer h5",
  "footer h6",
  "footer p",
  "footer li",
  "footer a",
  "footer span",
].join(",");

export default function TextPopAnimator() {
  const pathname = usePathname();

  useEffect(() => {
    const textElements = Array.from(document.querySelectorAll<HTMLElement>(textSelector)).filter((element) => {
      const animatedParent = element.parentElement?.closest(".text-pop-label, .text-pop-target");
      return !animatedParent || animatedParent === element;
    });

    textElements.forEach((element, index) => {
      element.classList.add("text-pop-target");
      element.style.setProperty("--text-pop-delay", `${Math.min(index % 8, 5) * 45}ms`);
    });

    if (!("IntersectionObserver" in window)) {
      textElements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
    );

    textElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
