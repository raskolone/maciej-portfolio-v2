/* =============================================================
   DESIGN: Dark Constellation — Hero Section v2
   Split layout 55/45: text left, photo right
   Typewriter: "Język angielski dla firm" ↔ "Bez zbędnego szumu"
   Constellation canvas preserved from original
   ============================================================= */

import { useLanguage } from "@/contexts/LanguageContext";
import ConstellationCanvas from "@/components/ConstellationCanvas";
import TypewriterText from "@/components/TypewriterText";

const PHOTO = "/manus-storage/maciej-hero-v2_2e0eb4fa.png";

export default function HeroSection() {
  const { t } = useLanguage();

  const phrases = [
    t("Język angielski dla firm", "English for Business"),
    t("Bez zbędnego szumu", "No Unnecessary Noise"),
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-background"
    >
      {/* Animated constellation */}
      <ConstellationCanvas />

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, oklch(0.11 0.015 240 / 60%) 100%)",
          zIndex: 1,
        }}
      />

      {/* Main content — split layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-12">
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-10 lg:gap-0">

          {/* LEFT — text 55% */}
          <div className="flex-1 lg:max-w-[55%] flex flex-col items-center lg:items-start text-center lg:text-left">

            {/* Label */}
            <div
              className="animate-fade-in mb-4"
              style={{ opacity: 0, animationFillMode: "forwards" }}
            >
              <span
                className="text-muted-foreground text-[11px] tracking-[0.3em] uppercase"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                {t("Lektor języka angielskiego", "English Language Instructor")}
              </span>
            </div>

            {/* Name */}
            <div
              className="animate-fade-in-up mb-3"
              style={{ opacity: 0, animationDelay: "0.2s", animationFillMode: "forwards" }}
            >
              <h1
                className="text-6xl md:text-8xl lg:text-9xl font-bold text-foreground leading-none tracking-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Maciej
              </h1>
              <p
                className="text-sm md:text-base text-muted-foreground tracking-[0.4em] uppercase mt-1"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Wyrozumski
              </p>
            </div>

            {/* Green divider */}
            <div
              className="animate-fade-in-up mb-4"
              style={{ opacity: 0, animationDelay: "0.35s", animationFillMode: "forwards" }}
            >
              <div className="h-px w-16 bg-primary" />
            </div>

            {/* Typewriter */}
            <div
              className="animate-fade-in-up mb-2 h-9"
              style={{ opacity: 0, animationDelay: "0.45s", animationFillMode: "forwards" }}
            >
              <TypewriterText
                phrases={phrases}
                className="text-xl md:text-2xl font-semibold text-primary"
              />
            </div>

            {/* Description */}
            <p
              className="animate-fade-in-up text-sm md:text-base text-muted-foreground leading-relaxed mb-8 max-w-md"
              style={{
                opacity: 0,
                animationDelay: "0.6s",
                animationFillMode: "forwards",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {t(
                "Pomagam firmom i osobom indywidualnym przełamywać bariery komunikacyjne — przez autorską The Cribro Method opartą na Full Immersion.",
                "I help companies and individuals break communication barriers — through The Cribro Method, a Full Immersion approach."
              )}
            </p>

            {/* CTA */}
            <div
              className="animate-fade-in-up mb-10"
              style={{ opacity: 0, animationDelay: "0.75s", animationFillMode: "forwards" }}
            >
              <button
                onClick={() =>
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
                }
                className="btn-primary animate-cta-pulse"
              >
                {t("Umów bezpłatną konsultację", "Book Free Consultation")}
              </button>
            </div>

            {/* Stats */}
            <div
              className="animate-fade-in flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-3"
              style={{ opacity: 0, animationDelay: "0.9s", animationFillMode: "forwards" }}
            >
              {[
                { num: "10+", label: t("lat doświadczenia", "years experience") },
                { num: "A1–C1", label: t("wszystkie poziomy", "all levels") },
                { num: "100%", label: t("zajęcia po angielsku", "lessons in English") },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span
                    className="text-primary font-bold"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem" }}
                  >
                    {item.num}
                  </span>
                  <span
                    className="text-xs text-muted-foreground"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — photo 45% */}
          <div
            className="animate-fade-in lg:max-w-[45%] w-full flex justify-center lg:justify-end"
            style={{ opacity: 0, animationDelay: "0.3s", animationFillMode: "forwards" }}
          >
            <div
              className="relative w-72 md:w-96 lg:w-[420px]"
              style={{
                maskImage:
                  "radial-gradient(ellipse 85% 90% at 50% 50%, black 55%, transparent 100%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 85% 90% at 50% 50%, black 55%, transparent 100%)",
              }}
            >
              <img
                src={PHOTO}
                alt="Maciej Wyrozumski"
                className="w-full h-auto object-cover"
                style={{ filter: "brightness(0.95) contrast(1.05)" }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
