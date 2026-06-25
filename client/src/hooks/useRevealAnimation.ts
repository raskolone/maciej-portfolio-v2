import { useEffect, useRef } from "react";

/**
 * useRevealAnimation
 * Animuje elementy z klasami reveal-left / reveal-right / reveal-up
 * przy scrollowaniu — dopiero gdy sekcja jest dobrze widoczna (threshold 0.25).
 * Elementy muszą mieć inline style: opacity:0, transform ustawiony w JSX.
 */
export function useRevealAnimation(staggerMs = 130) {
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
      // threshold 0.25 = sekcja musi być w 25% widoczna zanim animacja ruszy
      // rootMargin ujemny = trigger dopiero gdy element jest głębiej w viewporcie
      { threshold: 0.25, rootMargin: "0px 0px -80px 0px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [staggerMs]);

  return ref;
}
