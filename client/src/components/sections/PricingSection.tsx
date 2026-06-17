/* =============================================================
   DESIGN: Dark Asymmetric B2B — Pricing Section
   Two tabs: Indywidualny / Dla firm
   B2B tab: concrete packages with prices based on market analysis
   ============================================================= */

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Check } from "lucide-react";

const individualItems = [
  {
    pl: { name: "Lekcja indywidualna online", duration: "60 min", price: "120 zł", note: "Najczęściej wybierana" },
    en: { name: "Individual lesson online", duration: "60 min", price: "PLN 120", note: "Most popular" },
    highlight: true,
  },
  {
    pl: { name: "Lekcja stacjonarna", duration: "60 min", price: "140 zł", note: "Bielsko-Biała i okolice" },
    en: { name: "In-person lesson", duration: "60 min", price: "PLN 140", note: "Bielsko-Biała area" },
    highlight: false,
  },
  {
    pl: { name: "Pakiet 4 lekcji online", duration: "4 × 60 min", price: "400 zł", note: "Oszczędzasz 80 zł" },
    en: { name: "4-lesson online package", duration: "4 × 60 min", price: "PLN 400", note: "Save PLN 80" },
    highlight: false,
  },
  {
    pl: { name: "Business English / specjalistyczne", duration: "60 min", price: "140 zł", note: "Negocjacje, prezentacje, e-maile" },
    en: { name: "Business English / specialist", duration: "60 min", price: "PLN 140", note: "Negotiations, presentations, emails" },
    highlight: false,
  },
];

const b2bPackages = [
  {
    id: "individual",
    pl: {
      name: "Pakiet Indywidualny",
      subtitle: "1 pracownik",
      price: "560 zł",
      period: "/ miesiąc",
      note: "140 zł/h × 4 lekcje",
      badge: null,
      features: [
        "4 lekcje × 60 min/miesiąc",
        "Materiały dydaktyczne w cenie",
        "Miesięczny raport HR",
        "Faktura VAT dla firmy",
        "Priorytet terminu",
      ],
    },
    en: {
      name: "Individual Package",
      subtitle: "1 employee",
      price: "PLN 560",
      period: "/ month",
      note: "PLN 140/h × 4 lessons",
      badge: null,
      features: [
        "4 lessons × 60 min/month",
        "Teaching materials included",
        "Monthly HR report",
        "VAT invoice for company",
        "Priority scheduling",
      ],
    },
    highlight: false,
  },
  {
    id: "team",
    pl: {
      name: "Pakiet Zespołowy",
      subtitle: "2–4 osoby",
      price: "od 200 zł",
      period: "/ os. / miesiąc",
      note: "800 zł łącznie za grupę 4 osób",
      badge: "Polecany",
      features: [
        "4 lekcje × 60 min/miesiąc",
        "Materiały branżowe dopasowane do firmy",
        "Miesięczny raport HR dla każdej osoby",
        "Faktura VAT dla firmy",
        "Elastyczne terminy online",
      ],
    },
    en: {
      name: "Team Package",
      subtitle: "2–4 people",
      price: "from PLN 200",
      period: "/ person / month",
      note: "PLN 800 total for group of 4",
      badge: "Recommended",
      features: [
        "4 lessons × 60 min/month",
        "Industry-specific materials",
        "Monthly HR report per person",
        "VAT invoice for company",
        "Flexible online scheduling",
      ],
    },
    highlight: true,
  },
  {
    id: "corporate",
    pl: {
      name: "Pakiet Korporacyjny",
      subtitle: "5+ osób",
      price: "od 150 zł",
      period: "/ os. / miesiąc",
      note: "Wycena indywidualna dla grupy",
      badge: null,
      features: [
        "Analiza potrzeb komunikacyjnych firmy",
        "Program dopasowany do branży",
        "Raporty kwartalne dla HR/zarządu",
        "Faktura VAT dla firmy",
        "Możliwość zajęć stacjonarnych",
      ],
    },
    en: {
      name: "Corporate Package",
      subtitle: "5+ people",
      price: "from PLN 150",
      period: "/ person / month",
      note: "Custom quote for the group",
      badge: null,
      features: [
        "Communication needs analysis",
        "Industry-tailored program",
        "Quarterly HR/management reports",
        "VAT invoice for company",
        "In-person sessions available",
      ],
    },
    highlight: false,
  },
];

const b2bNotes = [
  { pl: "Faktura VAT — koszt firmowy, odliczenie od podatku", en: "VAT invoice — deductible business expense" },
  { pl: "Raporty HR — mierzalne efekty dla przełożonych", en: "HR reports — measurable results for management" },
  { pl: "Elastyczność online — brak kosztów dojazdu", en: "Online flexibility — no travel costs" },
  { pl: "Personalizacja — nie ma grup 15-osobowych", en: "Personalization — no 15-person group classes" },
];

const individualNotes = [
  { pl: "Materiały dydaktyczne w cenie", en: "Teaching materials included" },
  { pl: "Zajęcia online i stacjonarnie", en: "Online and in-person available" },
  { pl: "Terminy ustalane indywidualnie", en: "Schedule arranged individually" },
];

export default function PricingSection() {
  const { lang, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<"individual" | "b2b">("b2b");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal-price").forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = "1";
                (el as HTMLElement).style.transform = "translateY(0)";
              }, i * 80);
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
    <section id="pricing" ref={sectionRef} className="py-24 bg-card/30">
      <div className="container">
        <div className="relative mb-10">
          <span className="deco-number">05</span>
          <p className="section-label mb-3">{t("Cennik", "Pricing")}</p>
          <h2
            className="text-3xl md:text-4xl font-bold text-foreground max-w-lg"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {t("Przejrzyste ceny, bez ukrytych opłat", "Transparent pricing, no hidden fees")}
          </h2>
          <div className="rule-ink mt-6 max-w-xs" />
        </div>

        {/* Tab switcher */}
        <div className="flex gap-1 mb-10 p-1 bg-card/60 border border-border/40 rounded-sm w-fit">
          <button
            onClick={() => setActiveTab("b2b")}
            className={`px-5 py-2 text-sm font-medium transition-all rounded-sm ${
              activeTab === "b2b"
                ? "bg-primary text-background"
                : "text-muted-foreground hover:text-foreground"
            }`}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {t("Dla firm", "For Business")}
          </button>
          <button
            onClick={() => setActiveTab("individual")}
            className={`px-5 py-2 text-sm font-medium transition-all rounded-sm ${
              activeTab === "individual"
                ? "bg-primary text-background"
                : "text-muted-foreground hover:text-foreground"
            }`}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {t("Indywidualny", "Individual")}
          </button>
        </div>

        {/* B2B Packages */}
        {activeTab === "b2b" && (
          <div>
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {b2bPackages.map((pkg, i) => {
                const data = lang === "pl" ? pkg.pl : pkg.en;
                return (
                  <div
                    key={pkg.id}
                    className={`reveal-price flex flex-col p-6 border transition-all ${
                      pkg.highlight
                        ? "border-primary/50 bg-primary/6 shadow-lg shadow-primary/10"
                        : "border-border/50 bg-card"
                    }`}
                    style={{ opacity: 0, transform: "translateY(12px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}
                  >
                    {/* Badge */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p
                          className="text-xs text-muted-foreground/60 uppercase tracking-widest mb-1"
                          style={{ fontFamily: "'DM Mono', monospace" }}
                        >
                          {data.subtitle}
                        </p>
                        <h3
                          className="text-lg font-bold text-foreground"
                          style={{ fontFamily: "'Cormorant Garamond', serif" }}
                        >
                          {data.name}
                        </h3>
                      </div>
                      {data.badge && (
                        <span className="tag-green text-xs">{data.badge}</span>
                      )}
                    </div>

                    {/* Price */}
                    <div className="mb-5">
                      <div className="flex items-baseline gap-1">
                        <span
                          className="text-3xl font-bold text-foreground"
                          style={{ fontFamily: "'Cormorant Garamond', serif" }}
                        >
                          {data.price}
                        </span>
                        <span className="text-xs text-muted-foreground">{data.period}</span>
                      </div>
                      <p className="text-xs text-muted-foreground/60 mt-1">{data.note}</p>
                    </div>

                    {/* Features */}
                    <ul className="space-y-2.5 mb-6 flex-1">
                      {data.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5">
                          <Check size={13} className="text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-muted-foreground leading-relaxed">{f}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <a
                      href="https://calendly.com/maciej-wyrozumski/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-center text-sm py-2.5 px-4 font-medium transition-all ${
                        pkg.highlight
                          ? "btn-primary"
                          : "border border-primary/40 text-primary hover:bg-primary/10"
                      }`}
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {t("Umów konsultację", "Book consultation")}
                    </a>
                  </div>
                );
              })}
            </div>

            {/* B2B notes */}
            <div
              className="reveal-price grid sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-card/40 border border-border/30"
              style={{ opacity: 0, transform: "translateY(12px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}
            >
              {b2bNotes.map((note) => (
                <div key={note.pl} className="flex items-start gap-2.5">
                  <Check size={13} className="text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-muted-foreground leading-relaxed">{t(note.pl, note.en)}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-muted-foreground/50 mt-4 text-center">
              {t(
                "Pierwsza konsultacja (30 min) jest bezpłatna — ustalamy potrzeby firmy i plan działania.",
                "First consultation (30 min) is free — we define company needs and action plan."
              )}
            </p>
          </div>
        )}

        {/* Individual pricing */}
        {activeTab === "individual" && (
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-3">
              {individualItems.map((item, i) => {
                const data = lang === "pl" ? item.pl : item.en;
                return (
                  <div
                    key={i}
                    className={`reveal-price flex items-center justify-between p-5 border transition-all ${
                      item.highlight
                        ? "border-primary/40 bg-primary/8 shadow-sm"
                        : "border-border/60 bg-card card-glow"
                    }`}
                    style={{ opacity: 0, transform: "translateY(12px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3
                          className="text-sm font-semibold text-foreground"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                          {data.name}
                        </h3>
                        {item.highlight && (
                          <span className="tag-green text-xs">{t("Popularne", "Popular")}</span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{data.note}</p>
                    </div>
                    <div className="text-right ml-4 flex-shrink-0">
                      <p
                        className="text-lg font-bold text-foreground"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        {data.price}
                      </p>
                      <p className="text-xs text-muted-foreground">{data.duration}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              className="reveal-price"
              style={{ opacity: 0, transform: "translateY(12px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}
            >
              <div className="bg-card p-6 border border-border/60">
                <h3
                  className="text-base font-bold text-foreground mb-4"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {t("Co zawiera cena?", "What's included?")}
                </h3>
                <ul className="space-y-3 mb-6">
                  {individualNotes.map((note) => (
                    <li key={note.pl} className="flex items-start gap-2.5">
                      <Check size={14} className="text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{t(note.pl, note.en)}</span>
                    </li>
                  ))}
                </ul>
                <div className="rule-ink mb-6" />
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                  {t(
                    "Pierwsza konsultacja (30 min) jest bezpłatna — poznajemy się, ustalamy cele i plan nauki.",
                    "The first consultation (30 min) is free — we get to know each other, set goals, and plan the learning path."
                  )}
                </p>
                <a
                  href="https://calendly.com/maciej-wyrozumski/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full justify-center text-sm"
                >
                  {t("Umów bezpłatną konsultację", "Book a free consultation")}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
