import Navbar from "@/app/components/landing/Navbar";
import Footer from "@/app/components/landing/Footer";
import WhatsAppFloat from "@/app/components/landing/WhatsAppFloat";

interface SubpageLayoutProps {
  children: React.ReactNode;
}

/**
 * Wrapper for all sub-pages (Layanan, Portofolio, Tentang, etc.)
 * Forces the Navbar into dark/scrolled mode immediately (no scroll trigger).
 */
export default function SubpageLayout({ children }: SubpageLayoutProps) {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar isSubpage />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
