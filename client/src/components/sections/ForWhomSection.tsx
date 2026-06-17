/* =============================================================
   DESIGN: Warm Ink & Paper — For Whom Section
   Cards grid showing target groups
   ============================================================= */

import { useRevealAnimation } from "@/hooks/useRevealAnimation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Briefcase, Users, Globe, BookOpen, Mic, Brain } from "lucide-react";

const groups = [
  {
    icon: Briefcase,
    pl: { title: "Profesjonaliści i firmy", desc: "Business English, prezentacje, negocjacje, e-maile — angielski, który realnie przydaje się w pracy." },
    en: { title: "Professionals & Companies", desc: "Business English, presentations, negotiations, emails — English that actually works in your job." },
  },
  {
    icon: Users,
    pl: { title: "Dorośli — angielski ogólny", desc: "Wróć do angielskiego bez presji i chaosu. Konwersacje, gramatyka i pewność siebie w mówieniu. 30 minut dziennie wystarczy." },
    en: { title: "Adults — General English", desc: "Return to English without pressure or chaos. Conversations, grammar, and confidence in speaking. 30 minutes a day is enough." },
  },
  {
    icon: Mic,
    pl: { title: "Pronunciation Coaching", desc: "Popraw wymowę, rytm wypowiedzi i akcent. Specjalizuję się w fonetyce i naturalnym brzmieniu." },
    en: { title: "Pronunciation Coaching", desc: "Improve your pronunciation, speech rhythm, and accent. I specialize in phonetics and natural sound." },
  },
  {
    icon: Globe,
    pl: { title: "Polacy za granicą", desc: "Mieszkasz za granicą i chcesz podszlifować angielski? Pracujemy online — bez ograniczeń geograficznych." },
    en: { title: "Poles Living Abroad", desc: "Living abroad and want to polish your English? We work online — no geographic limits." },
  },
  {
    icon: BookOpen,
    pl: { title: "Osoby wyjeżdżające", desc: "Planujesz wyjazd do pracy, studiów lub emigrację? Przygotujemy Cię językowo na nowe środowisko." },
    en: { title: "Travellers & Expats", desc: "Planning to work, study, or emigrate abroad? I'll prepare you linguistically for your new environment." },
  },
  {
    icon: Brain,
    pl: { title: "ADHD i neuroróżnorodność", desc: "Mam ADHD. Wiem, jak uczy się mózg, który nie znosi nudy i chaosu. Jasna struktura, krótkie bloki, zero zbędnego szumu." },
    en: { title: "ADHD & Neurodiversity", desc: "I have ADHD. I know how a brain learns when it hates boredom and chaos. Clear structure, short blocks, zero unnecessary noise." },
  },
];

export default function ForWhomSection() {
  const { lang, t } = useLanguage();
  const sectionRef = useRevealAnimation(110);

  return (
    <section id="for-whom" ref={sectionRef} className="py-24 bg-card/30">
      <div className="container">
        <div className="relative mb-14">
          <span className="deco-number">02</span>
          <p className="section-label mb-3">{t("Dla kogo", "For Whom")}</p>
          <h2
            className="text-3xl md:text-4xl font-bold text-foreground max-w-lg"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {t("Kto skorzysta na moich zajęciach?", "Who benefits from my lessons?")}
          </h2>
          <p className="text-sm text-muted-foreground mt-4 max-w-xl">
            {t(
              "Nie uczę wszystkich jednakowo. Każda osoba dostaje system dopasowany do swojego mózgu, celu i rytmu życia.",
              "I don't teach everyone the same way. Each person gets a system tailored to their brain, goal, and life rhythm."
            )}
          </p>
          <div className="rule-ink mt-6 max-w-xs" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {groups.map((group, idx) => {
            const data = lang === "pl" ? group.pl : group.en;
            const Icon = group.icon;
            const revealClass = idx % 2 === 0 ? "reveal-left" : "reveal-right";
            const initTransform = idx % 2 === 0 ? "translateX(-120px)" : "translateX(120px)";
            return (
              <div
                key={group.pl.title}
                className={`${revealClass} card-glow bg-card rounded-sm p-6 border border-border/60`}
                style={{ opacity: 0, transform: initTransform, transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)" }}
              >
                <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center mb-4">
                  <Icon size={18} className="text-primary" />
                </div>
                <h3
                  className="text-base font-bold text-foreground mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem" }}
                >
                  {data.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {data.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
