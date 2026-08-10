import type { Metadata } from "next";
import Navbar from "@/app/components/landing/Navbar";
import Footer from "@/app/components/landing/Footer";
import ContactForm from "@/app/hubungi/_components/ContactForm";
import { Map } from "@/components/ui/map";
import { getSiteSettings } from "@/lib/data";
import { Phone, Mail, MapPin, Clock, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Hubungi Kami — REACreative.idn",
  description:
    "Hubungi REACreative (reacreative.idn) untuk konsultasi gratis pembuatan website, e-commerce, sistem kasir, atau aplikasi mobile bisnis Anda. Respon cepat 1x24 jam.",
};

export const dynamic = "force-dynamic";

export default async function HubungiKamiPage() {
  const settings = await getSiteSettings();

  const waNumber = settings.whatsapp_number || "628971302817";
  const contactEmail = settings.email_contact || "reacreative.idn@gmail.com";
  const address = settings.address || "Kampung Jawa Lama, Kota Lhokseumawe, Aceh, Indonesia";
  const officeHours = settings.office_hours || "Senin – Sabtu, 08.00 – 22.00 WIB";

  return (
    <div className="bg-[#FAF9F6] min-h-screen flex flex-col">
      {/* Navigation */}
      <Navbar isSubpage={true} />

      {/* Subpage Header Banner */}
      <div className="bg-[#121115] text-white pt-32 pb-20 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-12 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full  text-[10px] font-black tracking-widest text-[#e11d2e] uppercase animate-pulse">
            <Sparkles size={11} />
            <span>KONSULTASI GRATIS</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">Hubungi Kami</h1>
          <p className="text-sm text-gray-400 font-semibold max-w-xl mx-auto leading-relaxed">
            Mulailah perjalanan digital Anda bersama REACreative. Hubungi kami melalui formulir kontak atau kontak resmi di bawah ini.
          </p>
        </div>
      </div>

      {/* Main Grid Content */}
      <main className="flex-1 max-w-[1200px] w-full mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact info cards (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-6 rounded-full bg-[#e11d2e] block animate-pulse"></span>
                <span className="w-2.5 h-5 rounded-full bg-[#f97316] block mt-1"></span>
                <span className="text-xs font-bold uppercase tracking-widest text-[#e11d2e]">Informasi Kontak</span>
              </div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight leading-tight">Mari Diskusikan Proyek Anda</h2>
              <p className="text-xs text-gray-500 leading-relaxed font-semibold">
                Kami siap menyambut Anda untuk konsultasi terkait website, sistem kasir, integrasi pembayaran, hingga aplikasi mobile. Silakan hubungi kami melalui saluran berikut atau isi form kontak yang tersedia.
              </p>
            </div>

            {/* List of Contact Cards */}
            <div className="space-y-4">
              
              {/* WhatsApp Card */}
              <a
                href={`https://wa.me/${waNumber}?text=Halo%20REACreative%2C%20saya%20ingin%20konsultasi%20mengenai%20proyek`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-gray-100 hover:border-emerald-200 p-4 rounded-xl shadow-sm flex items-center gap-4 transition-all hover:-translate-y-1 hover:shadow-md group"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-emerald-500 group-hover:text-white">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">WhatsApp Official</p>
                  <p className="text-xs font-black text-gray-800 mt-0.5">+{waNumber.substring(0, 2)} {waNumber.substring(2, 5)}-{waNumber.substring(5, 9)}-{waNumber.substring(9)}</p>
                </div>
              </a>

              {/* Email Card */}
              <a
                href={`mailto:${contactEmail}`}
                className="bg-white border border-gray-100 hover:border-red-200 p-4 rounded-xl shadow-sm flex items-center gap-4 transition-all hover:-translate-y-1 hover:shadow-md group"
              >
                <div className="w-10 h-10 rounded-lg bg-red-50 text-[#e11d2e] flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-[#e11d2e] group-hover:text-white">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Email Bisnis</p>
                  <p className="text-xs font-black text-gray-800 mt-0.5">{contactEmail}</p>
                </div>
              </a>

              {/* Location Card */}
              <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm flex items-center gap-4 transition-all hover:-translate-y-1 hover:shadow-md group">
                <div className="w-10 h-10 rounded-lg bg-orange-50 text-[#f97316] flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-[#f97316] group-hover:text-white">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Lokasi Operasional</p>
                  <p className="text-xs font-semibold text-gray-850 mt-0.5 leading-relaxed">{address}</p>
                </div>
              </div>

              {/* Hours Card */}
              <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm flex items-center gap-4 transition-all hover:-translate-y-1 hover:shadow-md group">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-500 flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-indigo-500 group-hover:text-white">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Jam Operasional</p>
                  <p className="text-xs font-black text-gray-800 mt-0.5">{officeHours}</p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Contact message form (lg:col-span-7) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

        </div>
      </main>

      {/* Operasional Map Section */}
      <div className="max-w-[1200px] w-full mx-auto px-6 pb-20 space-y-6 relative z-10">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-6 rounded-full bg-[#e11d2e] block animate-pulse"></span>
            <span className="w-2.5 h-5 rounded-full bg-[#f97316] block mt-1"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#e11d2e]">Wilayah Jangkauan</span>
          </div>
          <h3 className="text-2xl font-black text-gray-900 tracking-tight">Cakupan Layanan Nasional</h3>
          <p className="text-xs text-gray-500 font-semibold leading-relaxed">
            REACreative melayani pembangunan sistem digital, branding, dan integrasi teknologi di seluruh penjuru Indonesia.
          </p>
        </div>
        <Map />
      </div>

      {/* Footer */}
      <Footer settings={settings} />
    </div>
  );
}
