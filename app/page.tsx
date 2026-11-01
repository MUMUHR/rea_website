import Navbar from "@/app/components/landing/Navbar";
import HeroSection from "@/app/components/landing/HeroSection";
import ClientMarquee from "@/app/components/landing/ClientMarquee";
import ServiceCards from "@/app/components/landing/ServiceCards";
import PricingSection from "@/app/components/landing/PricingSection";
import WhyUsSection from "@/app/components/landing/WhyUsSection";
import TestimonialsSection from "@/app/components/landing/TestimonialsSection";
import FaqSection from "@/app/components/landing/FaqSection";
import CtaSection from "@/app/components/landing/CtaSection";
import Footer from "@/app/components/landing/Footer";
import WhatsAppFloat from "@/app/components/landing/WhatsAppFloat";
import ScrollReveal from "@/app/components/landing/ScrollReveal";

import {
  getSiteSettings,
  getClientLogos,
  getServicesHomepage,
  getTestimonials,
} from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function Home() {
  // Fetch homepage data in parallel from database
  const [settings, clientLogos, services, testimonials] = await Promise.all([
    getSiteSettings(),
    getClientLogos(),
    getServicesHomepage(),
    getTestimonials(),
  ]);

  const stats = [
    { value: settings.stats_projects || "120+", label: "Project Ditangani" },
    { value: settings.stats_clients || "80+", label: "Klien Aktif" },
    { value: settings.stats_years || "3+", label: "Tahun Pengalaman" },
  ];

  const waNumber = settings.whatsapp_number || "628971302817";

  return (
    <>
      {/* Scroll reveal observer — runs client-side */}
      <ScrollReveal />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main id="main-content">
        {/* 1. Hero — white bg with shape composition */}
        <HeroSection stats={stats} waNumber={waNumber} />

        {/* 2. Client Logos — bg-alt light gray marquee */}
        <ClientMarquee initialBrands={clientLogos} />

        {/* 3. Services — dark background */}
        <ServiceCards initialServices={services} />

        {/* 4. Pricing — white bg with dual-shape composition */}
        <PricingSection />

        {/* 5. Why Us — bg-alt light gray */}
        <WhyUsSection />

        {/* 6. Testimonials — dynamically pulled from DB */}
        <TestimonialsSection initialTestimonials={testimonials} />

        {/* 7. FAQ — white bg */}
        <FaqSection />

        {/* 8. CTA — dark background */}
        <CtaSection />
      </main>

      {/* Footer — deepest dark (--support) */}
      <Footer settings={settings} />

      {/* WhatsApp Floating Button */}
      <WhatsAppFloat />
    </>
  );
}
