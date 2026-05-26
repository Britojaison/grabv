"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function isImageTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) {
    return false;
  }

  return Boolean(target.closest("img, picture, [data-protect-image]"));
}

export default function ImageDownloadProtection() {
  const pathname = usePathname();

  useEffect(() => {
    const images = Array.from(document.querySelectorAll<HTMLImageElement>("img"));

    images.forEach((image) => {
      image.draggable = false;
      image.setAttribute("aria-draggable", "false");
    });

    const preventImageAction = (event: Event) => {
      if (isImageTarget(event.target)) {
        event.preventDefault();
      }
    };

    document.addEventListener("contextmenu", preventImageAction, true);
    document.addEventListener("dragstart", preventImageAction, true);

    return () => {
      document.removeEventListener("contextmenu", preventImageAction, true);
      document.removeEventListener("dragstart", preventImageAction, true);
    };
  }, [pathname]);

  return null;
}
