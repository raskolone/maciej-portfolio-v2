/* =============================================================
   DESIGN: Warm Ink & Paper — About Section
   Personal, warm, short biography
   ============================================================= */

import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const PHOTO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663489474725/R7k6sYKTkLq9Ymom2yutju/maciej-photo-editorial_4c075e9b.png";

const stats = [
  { num: "10+", pl: "lat doświadczenia", en: "years of experience" },
  { num: "A1–C1", pl: "wszystkie poziomy", en: "all levels" },
  { num: "3", pl: "szkoły językowe", en: "language schools" },
];

export default function AboutSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal-about").forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = "1";
                (el as HTMLElement).style.transform = "translateY(0)";
              }, i * 120);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-background">
      <div className="container">

        {/* ── SEKCJA O MNIE ── */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">

          {/* Left column: label + heading + stats */}
          <div className="lg:col-span-4">
            <div className="relative mb-8">
              <span className="deco-number">04</span>
              <p className="section-label mb-3">{t("O mnie", "About Me")}</p>
              <h2
                className="text-3xl md:text-4xl font-bold text-foreground leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {t("Lektor. Trener. Człowiek.", "Tutor. Trainer. Human.")}
              </h2>
              <div className="rule-ink mt-6" />
            </div>

            {/* Stats */}
            <div
              className="reveal-about grid grid-cols-3 lg:grid-cols-1 gap-4 mt-8"
              style={{ opacity: 0, transform: "translateY(16px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}
            >
              {stats.map((stat) => (
                <div key={stat.num} className="border-l-2 border-primary pl-4 py-1">
                  <p
                    className="text-2xl font-bold text-foreground"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {stat.num}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {t(stat.pl, stat.en)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right column: bio text */}
          <div className="lg:col-span-8">
            <div className="space-y-6">
              {/* Photo inline — float right, rozmiar jednego akapitu */}
              <div
                className="reveal-about float-right ml-6 mb-4 hidden sm:block"
                style={{
                  opacity: 0,
                  transform: "translateY(16px)",
                  transition: "opacity 0.5s ease, transform 0.5s ease",
                  width: "160px",
                  flexShrink: 0,
                }}
              >
                <div
                  className="overflow-hidden"
                  style={{
                    borderRadius: "2px",
                    boxShadow: "0 0 24px oklch(0.65 0.2 145 / 0.18), 0 4px 16px rgba(0,0,0,0.5)",
                    border: "1px solid oklch(0.65 0.2 145 / 0.25)",
                  }}
                >
                  <img
                    src={PHOTO}
                    alt="Maciej Wyrozumski"
                    className="w-full object-cover"
                    style={{ display: "block" }}
                  />
                </div>
              </div>

              <div
                className="reveal-about"
                style={{ opacity: 0, transform: "translateY(16px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}
              >
                <p className="text-base text-foreground leading-relaxed">
                  {t(
                    "Jestem lektorem języka angielskiego i absolwentem filologii angielskiej. Od ponad 10 lat pracuję z młodzieżą, studentami i dorosłymi — od poziomu A1 aż po C1. Przez lata byłem współwłaścicielem i managerem szkoły językowej, gdzie nadzorowałem pracę zespołu lektorów i dbałem o jakość metodyczną zajęć.",
                    "I am an English language tutor and graduate of English philology. For over 10 years I have worked with teenagers, students, and adults — from A1 all the way to C1. For years I co-owned and managed a language school, where I supervised a team of tutors and ensured the methodological quality of lessons."
                  )}
                </p>
              </div>

              <div
                className="reveal-about"
                style={{ opacity: 0, transform: "translateY(16px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}
              >
                <p className="text-base text-muted-foreground leading-relaxed">
                  {t(
                    "Na moich zajęciach stawiam na mówienie, osłuchanie z językiem i poprawną wymowę. Fonetyka to moja pasja — pracowałem jako Pronunciation Coach, pomagając klientom nie tylko mówić poprawnie, ale brzmieć naturalnie i pewnie. Zależy mi, żeby nauka była uporządkowana, praktyczna i bez zbędnego stresu.",
                    "In my lessons, I focus on speaking, language exposure, and correct pronunciation. Phonetics is my passion — I have worked as a Pronunciation Coach, helping clients not only speak correctly but sound natural and confident. I care about learning being organized, practical, and free from unnecessary stress."
                  )}
                </p>
              </div>

              <div
                className="reveal-about"
                style={{ opacity: 0, transform: "translateY(16px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}
              >
                <p className="text-base text-muted-foreground leading-relaxed">
                  {t(
                    "Jestem ADHD. Wiem, jak uczy się mózg, który nie znosi nudy, chaosu i przeciążenia informacją. Dlatego moje zajęcia są zbudowane inaczej — mniej materiału, więcej sensu. Krótkie bloki, jasna struktura, zero zbędnego szumu. Uczę tak, jak sam chciałbym być uczony.",
                    "I have ADHD. I know how a brain learns when it can't stand boredom, chaos, or information overload. That's why my lessons are built differently — less material, more meaning. Short blocks, clear structure, zero unnecessary noise. I teach the way I'd want to be taught."
                  )}
                </p>
              </div>

              {/* Philosophy block */}
              <div
                className="reveal-about border-l-2 border-primary/40 pl-5 py-2"
                style={{ opacity: 0, transform: "translateY(16px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}
              >
                <p
                  className="text-base text-foreground font-medium leading-relaxed italic"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem" }}
                >
                  {t(
                    "\"Nie wierzę w 3-godzinne sesje. Wierzę w 30 minut dziennie, każdego dnia.\" ",
                    "\"I don't believe in 3-hour sessions. I believe in 30 minutes a day, every single day.\""
                  )}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {t(
                    "Nauka języka to nie sprint. To nawyk. Małe kroki, powtarzane konsekwentnie, budują więcej niż intensywne maratony raz na miesiąc. Nauka potwierdzona naukowo — i sprawdzona na sobie.",
                    "Language learning is not a sprint. It's a habit. Small steps, repeated consistently, build more than intense marathons once a month. Science-backed — and personally tested."
                  )}
                </p>
              </div>


              {/* Tags */}
              <div
                className="reveal-about flex flex-wrap gap-2 pt-2"
                style={{ opacity: 0, transform: "translateY(16px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}
              >
                {["Business English", "Pronunciation Coach", "Cambridge Exams", "CEFR A1–C1", "Full Immersion", "ADHD-Friendly", "EdTech"].map((tag) => (
                  <span key={tag} className="tag-green">{tag}</span>
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* ── ZIELONA LINIA SEPARATORA ── */}
        <div
          className="reveal-about my-12"
          style={{
            opacity: 0,
            transform: "translateY(8px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          <div
            style={{
              height: "1px",
              background: "linear-gradient(90deg, transparent 0%, oklch(0.65 0.2 145 / 0.6) 20%, oklch(0.65 0.2 145 / 0.8) 50%, oklch(0.65 0.2 145 / 0.6) 80%, transparent 100%)",
              boxShadow: "0 0 8px oklch(0.65 0.2 145 / 0.4)",
            }}
          />
        </div>

        {/* ── SEKCJA NOWE PRZEDSIĘWZIĘCIE — uproszczona, minimalistyczna ── */}
        <div id="cribro-venture" className="grid lg:grid-cols-12 gap-8 items-center" style={{ scrollMarginTop: "80px" }}>

          {/* Left column: logo */}
          <div className="lg:col-span-3">
            <div
              className="reveal-about"
              style={{ opacity: 0, transform: "translateY(16px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}
            >
              {/* Logo image */}
              <div
                className="overflow-hidden"
                style={{
                  width: "100%",
                  maxWidth: "180px",
                  borderRadius: "2px",
                  border: "1px solid oklch(0.65 0.2 145 / 0.2)",
                }}
              >
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663629907879/7jNV8eTUHBABzV8jpk3RUt/cribro-logo-main-fHanUQCNitTqJDBVpNRV8F.webp"
                  alt="CriBro"
                  className="w-full object-cover"
                  style={{ display: "block" }}
                />
              </div>
            </div>

          </div>

          {/* Right column: opis Cribro — krótki, nowoczesny */}
          <div className="lg:col-span-9">
            <div
              className="reveal-about"
              style={{ opacity: 0, transform: "translateY(16px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}
            >
              <p className="section-label mb-3">{t("Nowe przedsięwzięcie", "New venture")}</p>
              <h3
                className="text-2xl md:text-3xl font-bold text-foreground mb-4"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Cribro
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-xl">
                {t(
                  "Cribro to marka na styku języka, technologii i neuroóżnorodności. Dwa odłamy: CriBro English — system nauki angielskiego oparty na Full Immersion, oraz Cribro Labs — narzędzia ADHD-friendly, które pomagają mózgowi działać na własnych zasadach.",
                  "Cribro is a brand at the intersection of language, technology, and neurodiversity. Two branches: CriBro English — a Full Immersion language learning system, and Cribro Labs — ADHD-friendly tools that help the brain work on its own terms."
                )}
              </p>
              <a
                href="/cribro"
                className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:text-primary/80 transition-colors"
                style={{ fontFamily: "'DM Mono', monospace", letterSpacing: "0.05em" }}
              >
                {t("Dowiedz się więcej →", "Learn more →")}
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
