/**
 * useRevealAnimation — global scroll-triggered slide-in hook
 *
 * Adds strong left/right alternating entrance animations to any section.
 * Elements with class `reveal-left`  → slide in from left  (-100px)
 * Elements with class `reveal-right` → slide in from right (+100px)
 * Elements with class `reveal-up`    → slide in from below (+60px)
 *
 * Usage:
 *   const sectionRef = useRevealAnimation();
 *   <section ref={sectionRef}>
 *     <div className="reveal-left">...</div>
 *     <div className="reveal-right">...</div>
 *   </section>
 */

import { useEffect, useRef } from "react";

type RevealClass = "reveal-left" | "reveal-right" | "reveal-up";

const INITIAL_STYLES: Record<RevealClass, string> = {
  "reveal-left":  "opacity:0; transform:translateX(-100px)",
  "reveal-right": "opacity:0; transform:translateX(100px)",
  "reveal-up":    "opacity:0; transform:translateY(60px)",
};

export function useRevealAnimation(staggerMs = 100) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    const classes: RevealClass[] = ["reveal-left", "reveal-right", "reveal-up"];

    // Apply initial hidden state to all reveal elements
    classes.forEach((cls) => {
      section.querySelectorAll<HTMLElement>(`.${cls}`).forEach((el) => {
        el.style.cssText += `; ${INITIAL_STYLES[cls]}; transition: opacity 0.65s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94)`;
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          // Collect all reveal elements in DOM order
          const allReveal = Array.from(
            section.querySelectorAll<HTMLElement>(".reveal-left, .reveal-right, .reveal-up")
          );

          allReveal.forEach((el, i) => {
            setTimeout(() => {
              el.style.opacity = "1";
              el.style.transform = "translate(0, 0)";
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
