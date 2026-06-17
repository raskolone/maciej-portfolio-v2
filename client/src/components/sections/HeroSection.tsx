/* =============================================================
   DESIGN: Dark Asymmetric B2B Hero
   Split layout: left = headline + copy + CTAs + stats
                 right = photo (smaller, editorial)
   Background: animated grid blocks (GridCanvas replaces constellation)
   ============================================================= */

import { useLanguage } from "@/contexts/LanguageContext";
import GridCanvas from "@/components/GridCanvas";
import TypewriterText from "@/components/TypewriterText";

const AVATAR = "/manus-storage/maciej-hero-new_e2364866.webp";

export default function HeroSection() {
  const { lang, t } = useLanguage();

  const phrases = lang === "pl"
    ? ["Business English dla firm", "Pronunciation Coach", "Full Immersion Trainer", "The Cribro Method"]
    : ["Business English for Teams", "Pronunciation Coach", "Full Immersion Trainer", "The Cribro Method"];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-background"
    >
      {/* Animated grid blocks background */}
      <GridCanvas />

      {/* Subtle radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 70% at 30% 50%, transparent 0%, oklch(0.11 0.015 240 / 70%) 100%)",
          zIndex: 1,
        }}
      />

      {/* Main content — asymmetric two-column */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-0 items-center min-h-[calc(100vh-6rem)]">

          {/* LEFT COLUMN — text content */}
          <div className="md:col-span-7 flex flex-col justify-center">

            {/* Eyebrow label */}
            <div
              className="animate-fade-in mb-4 flex items-center gap-3"
              style={{ opacity: 0, animationFillMode: "forwards" }}
            >
              <div className="h-px w-10 bg-primary/60" />
              <span
                className="text-primary/80 text-[11px] tracking-[0.3em] uppercase font-semibold"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                CribroEnglish · The Cribro Method
              </span>
            </div>

            {/* Main headline */}
            <div
              className="animate-fade-in-up mb-4"
              style={{ opacity: 0, animationDelay: "0.15s", animationFillMode: "forwards" }}
            >
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.05] tracking-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {lang === "pl" ? (
                  <>Twój zespół<br />zacznie mówić<br />po angielsku.<br /><span className="text-primary">Naprawdę.</span></>
                ) : (
                  <>Your team will<br />actually speak<br />English.<br /><span className="text-primary">For real.</span></>
                )}
              </h1>
            </div>

            {/* Typewriter role */}
            <div
              className="animate-fade-in-up mb-5 h-7"
              style={{ opacity: 0, animationDelay: "0.3s", animationFillMode: "forwards" }}
            >
              <TypewriterText
                phrases={phrases}
                className="text-base md:text-lg font-semibold text-primary/90"
              />
            </div>

            {/* Description */}
            <p
              className="animate-fade-in-up text-sm md:text-base text-muted-foreground leading-relaxed mb-8 max-w-xl"
              style={{ opacity: 0, animationDelay: "0.45s", animationFillMode: "forwards", fontFamily: "'DM Sans', sans-serif" }}
            >
              {t(
                "10 lat doświadczenia. Faktury VAT. Raporty HR. The Cribro Method to system komunikacyjny oparty na Full Immersion — angielski, który zostaje, nie tylko na czas kursu.",
                "10 years of experience. VAT invoices. HR reports. The Cribro Method is a communication system built on Full Immersion — English that sticks, not just during the course."
              )}
            </p>

            {/* CTA buttons */}
            <div
              className="animate-fade-in-up flex flex-col sm:flex-row gap-3 mb-10"
              style={{ opacity: 0, animationDelay: "0.6s", animationFillMode: "forwards" }}
            >
              <a
                href="https://calendly.com/maciej-wyrozumski/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                {t("Umów bezpłatną konsultację", "Book Free Consultation")}
              </a>
              <button
                onClick={() => document.querySelector("#b2b")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-secondary"
              >
                {t("Oferta dla firm", "For Business")}
              </button>
            </div>

            {/* Proof stats — bigger and bolder */}
            <div
              className="animate-fade-in flex flex-wrap gap-x-8 gap-y-4"
              style={{ opacity: 0, animationDelay: "0.75s", animationFillMode: "forwards" }}
            >
              {[
                { num: "10+", label: t("lat doświadczenia", "years experience") },
                { num: "A1–C1", label: t("wszystkie poziomy", "all levels") },
                { num: "100%", label: t("zajęcia po angielsku", "in English") },
                { num: "VAT", label: t("faktura dla firmy", "invoice for company") },
              ].map((item) => (
                <div key={item.label} className="flex flex-col">
                  <span
                    className="text-primary font-bold text-2xl md:text-3xl leading-none"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {item.num}
                  </span>
                  <span className="text-xs text-muted-foreground mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Tagline */}
            <div
              className="animate-fade-in mt-10 flex items-center gap-2"
              style={{ opacity: 0, animationDelay: "0.9s", animationFillMode: "forwards" }}
            >
              <div className="h-px w-8 bg-primary/40" />
              <span
                className="text-muted-foreground/50 text-[11px] tracking-[0.25em] uppercase"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                less noise. more language.
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN — photo editorial */}
          <div
            className="md:col-span-5 flex items-center justify-center md:justify-end"
          >
            <div
              className="animate-fade-in relative"
              style={{ opacity: 0, animationDelay: "0.2s", animationFillMode: "forwards" }}
            >
              {/* Decorative corner lines */}
              <div
                className="absolute pointer-events-none"
                style={{
                  top: "-16px", left: "-16px",
                  width: "40px", height: "40px",
                  borderTop: "2px solid rgba(74,222,128,0.5)",
                  borderLeft: "2px solid rgba(74,222,128,0.5)",
                }}
              />
              <div
                className="absolute pointer-events-none"
                style={{
                  bottom: "-16px", right: "-16px",
                  width: "40px", height: "40px",
                  borderBottom: "2px solid rgba(74,222,128,0.5)",
                  borderRight: "2px solid rgba(74,222,128,0.5)",
                }}
              />

              {/* Photo — smaller, portrait crop */}
              <div
                className="w-56 h-72 md:w-72 md:h-96 overflow-hidden"
                style={{
                  border: "1px solid rgba(74,222,128,0.2)",
                  boxShadow: "0 0 40px rgba(74,222,128,0.08), 0 20px 60px rgba(0,0,0,0.5)",
                }}
              >
                <img
                  src={AVATAR}
                  alt="Maciej Wyrozumski"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "50% 10%" }}
                />
              </div>

              {/* Name badge */}
              <div
                className="absolute -bottom-5 left-1/2 -translate-x-1/2 px-4 py-2 text-center"
                style={{
                  background: "oklch(0.13 0.02 240)",
                  border: "1px solid rgba(74,222,128,0.2)",
                  minWidth: "160px",
                }}
              >
                <p
                  className="text-foreground font-bold text-sm tracking-wide"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Maciej Wyrozumski
                </p>
                <p
                  className="text-primary/70 text-[10px] tracking-[0.2em] uppercase"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  English Coach & Builder
                </p>
              </div>

              {/* Status dot */}
              <div className="absolute top-3 right-3 glow-dot" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
