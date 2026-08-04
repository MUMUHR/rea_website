import Navbar from "@/app/components/landing/Navbar";
import HeroSection from "@/app/components/landing/HeroSection";
import ClientMarquee from "@/app/components/landing/ClientMarquee";
import ServiceCards from "@/app/components/landing/ServiceCards";
import PricingSection from "@/app/components/landing/PricingSection";
import WhyUsSection from "@/app/components/landing/WhyUsSection";
import PortfolioSection from "@/app/components/landing/PortfolioSection";
import FaqSection from "@/app/components/landing/FaqSection";
import CtaSection from "@/app/components/landing/CtaSection";
import Footer from "@/app/components/landing/Footer";
import WhatsAppFloat from "@/app/components/landing/WhatsAppFloat";
import ScrollReveal from "@/app/components/landing/ScrollReveal";

export default function Home() {
  return (
    <>
      {/* Scroll reveal observer — runs client-side */}
      <ScrollReveal />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main id="main-content">
        {/* 1. Hero — white bg with shape composition */}
        <HeroSection />

        {/* 2. Client Logos — bg-alt light gray marquee */}
        <ClientMarquee />

        {/* 3. Services — dark dayum background */}
        <ServiceCards />

        {/* 4. Pricing — white bg with dual-shape composition */}
        <PricingSection />

        {/* 5. Why Us — bg-alt light gray */}
        <WhyUsSection />

        {/* 6. Portfolio — white bg */}
        <PortfolioSection />

        {/* 7. FAQ — white bg */}
        <FaqSection />

        {/* 8. CTA — dark dayum background */}
        <CtaSection />
      </main>

      {/* Footer — deepest dark (--support) */}
      <Footer />

      {/* WhatsApp Floating Button (green, not brand red — §3.8) */}
      <WhatsAppFloat />
    </>
  );
}
