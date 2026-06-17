/* =============================================================
   DESIGN: Warm Ink & Paper — Home Page
   Assembles all sections in order
   ============================================================= */

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ForWhomSection from "@/components/sections/ForWhomSection";
import MethodSection from "@/components/sections/MethodSection";
import AboutSection from "@/components/sections/AboutSection";
import MyStorySection from "@/components/sections/MyStorySection";
import PricingSection from "@/components/sections/PricingSection";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";
import B2BSection from "@/components/sections/B2BSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <B2BSection />
        <MethodSection />
        <AboutSection />
        <MyStorySection />
        <PricingSection />
        <ForWhomSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
