/* =============================================================
   DESIGN: Dark Constellation — Navbar
   Transparent on top, blurs on scroll
   Logo: MW. | Nav links | PL/EN toggle | Theme toggle | CTA
   ============================================================= */
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#about",    pl: "O mnie",   en: "About" },
  { href: "#method",   pl: "Metoda Cribro",   en: "Cribro Method" },
  { href: "#for-whom", pl: "Dla kogo",  en: "For Whom" },
  { href: "#pricing",  pl: "Cennik",   en: "Pricing" },
  { href: "#faq",      pl: "FAQ",      en: "FAQ" },
  { href: "#contact",  pl: "Kontakt",  en: "Contact" },
];

export default function Navbar() {
  const { lang, toggleLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Obsługuj scrollowanie po powrocie na stronę główną
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const scrollTo = params.get("scroll");
    if (scrollTo && location === "/") {
      setTimeout(() => {
        const el = document.querySelector(`#${scrollTo}`);
        if (el) el.scrollIntoView({ behavior: "smooth" });
        // Wyczyść URL
        window.history.replaceState({}, document.title, window.location.pathname);
      }, 100);
    }
  }, [location]);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    // Jeśli jesteśmy na stronie głównej, scrolluj do sekcji
    if (location === "/") {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      // Jeśli jesteśmy na innej stronie, przejdź do strony głównej i scrolluj
      window.location.href = `/?scroll=${href.substring(1)}`;
    }
  };

  const navBg = scrolled
    ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-sm"
    : "bg-transparent";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="flex flex-col items-start hover:opacity-80 transition-opacity shrink-0"
        >
          <span
            className="text-foreground font-bold leading-none"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", letterSpacing: "-0.01em" }}
          >
            MW<span className="text-primary">.</span>
          </span>
          <span
            className="text-primary/60 leading-none mt-0.5"
            style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.18em" }}
          >
            CRIBROENGLISH
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <li key={link.href}>
              {link.href === "#for-whom" ? (
                <>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400 }}
                  >
                    {lang === "pl" ? link.pl : link.en}
                  </button>
                  <button
                    onClick={() => scrollTo("#for-whom")}
                    className="ml-3 text-xs font-semibold px-3 py-1.5 rounded-sm transition-all"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      background: "oklch(0.65 0.2 145)",
                      color: "#0a0a0a",
                      letterSpacing: "0.04em",
                      boxShadow: "0 0 10px oklch(0.65 0.2 145 / 0.4)",
                    }}
                  >
                    {lang === "pl" ? "Dla firm" : "For Business"}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => scrollTo(link.href)}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400 }}
                >
                  {lang === "pl" ? link.pl : link.en}
                </button>
              )}
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleLang}
            className="text-xs tracking-widest text-muted-foreground hover:text-primary transition-colors"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            <span className={lang === "pl" ? "text-primary font-semibold" : ""}>PL</span>
            <span className="mx-1 opacity-30">|</span>
            <span className={lang === "en" ? "text-primary font-semibold" : ""}>EN</span>
          </button>

          <button
            onClick={() => scrollTo("#contact")}
            className="btn-primary text-xs py-2 px-4"
          >
            {t("Bezpłatna konsultacja", "Free Consultation")}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border px-4 py-5 flex flex-col gap-3">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-left text-sm text-muted-foreground hover:text-primary transition-colors py-1"
            >
              {lang === "pl" ? link.pl : link.en}
            </button>
          ))}
          <button
            onClick={() => scrollTo("#for-whom")}
            className="text-left text-sm font-semibold py-1.5 px-3 rounded-sm w-fit"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              background: "oklch(0.65 0.2 145)",
              color: "#0a0a0a",
              letterSpacing: "0.04em",
            }}
          >
            {lang === "pl" ? "Dla firm" : "For Business"}
          </button>
          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={toggleLang}
              className="text-xs tracking-widest text-muted-foreground hover:text-primary transition-colors"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              <span className={lang === "pl" ? "text-primary" : ""}>PL</span>
              <span className="mx-1 opacity-30">|</span>
              <span className={lang === "en" ? "text-primary" : ""}>EN</span>
            </button>
          </div>
          <button
            onClick={() => scrollTo("#contact")}
            className="btn-primary text-center mt-2"
          >
            {t("Bezpłatna konsultacja", "Free Consultation")}
          </button>
        </div>
      )}
    </nav>
  );
}
