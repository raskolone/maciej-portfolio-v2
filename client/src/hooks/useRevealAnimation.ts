import { useEffect, useRef } from "react";

/**
 * useRevealAnimation
 * Obserwuje sekcję i animuje elementy z klasami:
 *   .reveal-left  → wjeżdża z lewej strony (-120px)
 *   .reveal-right → wjeżdża z prawej strony (+120px)
 *   .reveal-up    → wjeżdża z dołu (fallback)
 */
export function useRevealAnimation(staggerMs = 100) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const all = Array.from(
            section.querySelectorAll(".reveal-left, .reveal-right, .reveal-up")
          );

          all.forEach((el, i) => {
            setTimeout(() => {
              (el as HTMLElement).style.opacity = "1";
              (el as HTMLElement).style.transform = "translateX(0) translateY(0)";
            }, i * staggerMs);
          });

          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [staggerMs]);

  return ref;
}
