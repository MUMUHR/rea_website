"use client";

import { useEffect } from "react";

/**
 * ScrollReveal — vanilla IntersectionObserver
 * Per design.md §4: stagger per SECTION, not per element, to avoid jank.
 * Uses .reveal CSS class defined in globals.css
 */
export default function ScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.delay || "0";
            setTimeout(() => {
              el.classList.add("visible");
            }, parseInt(delay, 10));
            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
