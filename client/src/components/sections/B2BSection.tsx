/* =============================================================
   DESIGN: Dark Constellation — B2B Section
   Landing section for corporate clients
   Dark editorial, green accent, Cormorant + DM Sans
   ============================================================= */
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: "◈",
    titlePL: "Full Immersion",
    titleEN: "Full Immersion",
    descPL:
      "Żadnych tłumaczeń. Żadnych skrótów. Tylko angielski od pierwszej minuty — metoda, która działa na neuroróżnorodne mózgi i zapracowanych menedżerów.",
    descEN:
      "No translations. No shortcuts. English only from minute one — a method that works for neurodivergent minds and busy managers.",
  },
  {
    icon: "◉",
    titlePL: "Raporty HR",
    titleEN: "HR Reports",
    descPL:
      "Regularny feedback dla działu HR: postępy, frekwencja, poziom zaawansowania. Transparentność, którą docenią Twoi przełożeni.",
    descEN:
      "Regular feedback for HR: progress, attendance, proficiency level. Transparency your management will appreciate.",
  },
  {
    icon: "◎",
    titlePL: "Faktury VAT",
    titleEN: "VAT Invoices",
    descPL:
      "Pełna dokumentacja B2B: faktury VAT, możliwość rozliczenia jako koszt firmowy. Zero biurokracji po Twojej stronie.",
    descEN:
      "Full B2B documentation: VAT invoices, deductible as business expense. Zero bureaucracy on your side.",
  },
  {
    icon: "◇",
    titlePL: "Elastyczność online",
    titleEN: "Online Flexibility",
    descPL:
      "Lekcje online dla całego zespołu — niezależnie od lokalizacji. Harmonogram dopasowany do rytmu pracy firmy.",
    descEN:
      "Online lessons for your entire team — regardless of location. Schedule aligned with your company's work rhythm.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: -60, scaleY: 0.85, transformOrigin: "top" },
  visible: {
    opacity: 1,
    y: 0,
    scaleY: 1,
    transition: {
      // Jenga: block drops from above and lands with a subtle bounce
      y: { type: "spring" as const, stiffness: 280, damping: 18, mass: 0.9 },
      scaleY: { type: "spring" as const, stiffness: 300, damping: 22 },
      opacity: { duration: 0.25 },
    },
  },
};

export default function B2BSection() {
  const { t } = useLanguage();

  return (
    <section
      id="b2b"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ scrollMarginTop: "80px" }}
    >
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(74,222,128,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Green glow top-left */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(74,222,128,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <p
            className="text-primary text-xs tracking-[0.35em] uppercase mb-3"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            {t("dla firm", "for business")}
          </p>
          <h2
            className="text-4xl md:text-6xl font-bold text-foreground leading-tight mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {t(
              "Dlaczego Twoja firma\npotrzebuje Cribro?",
              "Why does your company\nneed Cribro?"
            )}
          </h2>
          <div className="h-px w-16 bg-primary/60 mb-6" />
          <p
            className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {t(
              "The Cribro Method to nie kolejny kurs angielskiego. To system komunikacyjny oparty na pełnym zanurzeniu — zaprojektowany dla firm, które chcą realnych efektów, nie certyfikatów.",
              "The Cribro Method is not another English course. It's a communication system based on full immersion — designed for companies that want real results, not certificates."
            )}
          </p>
        </div>

        {/* Benefits grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {benefits.map((b) => (
            <motion.div
              key={b.titlePL}
              variants={cardVariants}
              className="group relative p-6 md:p-8 border border-primary/10 hover:border-primary/30 transition-all duration-300"
              style={{
                background: "rgba(74,222,128,0.02)",
                backdropFilter: "blur(4px)",
              }}
            >
              {/* Corner accent */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-primary/40" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-primary/40" />

              <div className="flex items-start gap-4">
                <span
                  className="text-primary text-2xl mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  {b.icon}
                </span>
                <div>
                  <h3
                    className="text-foreground font-semibold text-lg mb-2"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {t(b.titlePL, b.titleEN)}
                  </h3>
                  <p
                    className="text-muted-foreground text-sm leading-relaxed"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {t(b.descPL, b.descEN)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-8 border border-primary/20 p-8 md:p-10"
          style={{ background: "rgba(74,222,128,0.03)" }}
        >
          <div>
            <h3
              className="text-2xl md:text-3xl font-bold text-foreground mb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {t("Gotowy na rozmowę?", "Ready to talk?")}
            </h3>
            <p
              className="text-muted-foreground text-sm"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {t(
                "30-minutowa bezpłatna konsultacja. Bez zobowiązań.",
                "30-minute free consultation. No commitment."
              )}
            </p>
          </div>
          <a
            href="https://calendly.com/maciej-wyrozumski/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary whitespace-nowrap flex-shrink-0"
          >
            {t("Umów konsultację biznesową", "Book Business Consultation")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
