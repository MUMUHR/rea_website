/**
 * lib/data.ts
 * Centralized static default mock data and fetchers.
 * Returns typed mock data for Server Component pre-rendering.
 */

// ── Types ──────────────────────────────────────────────

export type SiteSettings = Record<string, string>;

export type ClientLogo = {
  id: string;
  name: string;
  logo_url: string;
  website_url?: string;
  sort_order: number;
  is_active?: boolean;
};

export type Service = {
  id: string;
  number: string;
  title: string;
  description: string;
  price_label?: string;
  items: string[];
  icon_name?: string;
  wa_text?: string;
  show_on_homepage: boolean;
  sort_order: number;
  is_active: boolean;
};

export type Testimonial = {
  id: string;
  author_name: string;
  company?: string;
  message: string;
  rating: number;
  avatar_url?: string;
  sort_order: number;
  is_active: boolean;
};

// ── Default Dummy Data ─────────────────────────────────

export const DEFAULT_SETTINGS: SiteSettings = {
  whatsapp_number: "628971302817",
  email_contact: "reacreative.idn@gmail.com",
  instagram_url: "https://instagram.com/reacreative.idn",
  facebook_url: "https://facebook.com/reacreative",
  linkedin_url: "https://linkedin.com",
  youtube_url: "https://youtube.com/reacreative",
  address: "Kampung Jawa Lama, Kota Lhokseumawe, Aceh, Indonesia",
  office_hours: "Senin – Sabtu, 08.00 – 22.00 WIB",
  stats_projects: "120+",
  stats_clients: "80+",
  stats_years: "3+",
  founded_year: "2023",
  hero_wa_text: "Halo%20REACreative.idn%2C%20saya%20ingin%20konsultasi%20gratis"
};

export const DEFAULT_CLIENT_LOGOS: ClientLogo[] = [
  { id: "logo-1", name: "Spotify", logo_url: "https://logo.clearbit.com/spotify.com", website_url: "https://spotify.com", sort_order: 1, is_active: true },
  { id: "logo-2", name: "Stripe", logo_url: "https://logo.clearbit.com/stripe.com", website_url: "https://stripe.com", sort_order: 2, is_active: true },
  { id: "logo-3", name: "Slack", logo_url: "https://logo.clearbit.com/slack.com", website_url: "https://slack.com", sort_order: 3, is_active: true },
  { id: "logo-4", name: "Airbnb", logo_url: "https://logo.clearbit.com/airbnb.com", website_url: "https://airbnb.com", sort_order: 4, is_active: true },
  { id: "logo-5", name: "Zoom", logo_url: "https://logo.clearbit.com/zoom.us", website_url: "https://zoom.us", sort_order: 5, is_active: true },
  { id: "logo-6", name: "Figma", logo_url: "https://logo.clearbit.com/figma.com", website_url: "https://figma.com", sort_order: 6, is_active: true }
];

export const DEFAULT_SERVICES: Service[] = [
  {
    id: "svc-1",
    number: "01",
    title: "Pembuatan Website",
    description: "Layanan pembuatan website kustom yang mencakup e-commerce, portal berita, direktori, blog, hingga web portofolio dengan keunggulan loading cepat, desain premium, dan mobile-ready.",
    price_label: "Mulai dari Rp 1.500.000",
    items: ["Landing Page", "Website Company Profile", "Website E-Commerce", "Portal Berita & Artikel", "Dashboard & Data Management", "Website Custom"],
    icon_name: "Globe",
    wa_text: "Halo%20REACreative.idn%2C%20saya%20tertarik%20dengan%20Jasa%20Pembuatan%20Website.",
    show_on_homepage: true,
    sort_order: 1,
    is_active: true
  },
  {
    id: "svc-2",
    number: "02",
    title: "Pengembangan Aplikasi Web",
    description: "Membangun platform internal berbasis web, seperti dashboard monitoring data, sistem inventaris, manajemen karyawan, hingga automasi proses operasional perusahaan.",
    price_label: "Mulai dari Rp 5.000.000",
    items: ["Dashboard Monitoring Data", "Sistem Inventaris", "Manajemen Karyawan", "Automasi Proses Operasional", "Sistem Absensi Online", "Aplikasi Internal Custom"],
    icon_name: "Code2",
    wa_text: "Halo%20REACreative.idn%2C%20saya%20tertarik%20dengan%20Pengembangan%20Aplikasi%20Web.",
    show_on_homepage: true,
    sort_order: 2,
    is_active: true
  },
  {
    id: "svc-3",
    number: "03",
    title: "Sistem Informasi Akademik",
    description: "Sistem terpadu untuk sekolah dan perguruan tinggi yang mencakup manajemen data siswa/mahasiswa, penjadwalan kelas, rekap nilai ujian, absensi online, hingga billing keuangan.",
    price_label: "Mulai dari Rp 12.000.000",
    items: ["Pendaftaran Mahasiswa Baru (PMB)", "Pengisian KRS Online", "Rekap Nilai & Transkrip", "Absensi Berbasis QR", "Billing & Pembayaran SPP", "Laporan Akademik"],
    icon_name: "GraduationCap",
    wa_text: "Halo%20REACreative.idn%2C%20saya%20tertarik%20dengan%20Sistem%20Informasi%20Akademik.",
    show_on_homepage: true,
    sort_order: 3,
    is_active: true
  },
  {
    id: "svc-4",
    number: "04",
    title: "Landing Page",
    description: "Halaman penjualan tunggal yang dioptimasi untuk meningkatkan konversi iklan berbayar (Facebook, Google, TikTok Ads) dan mengumpulkan data leads.",
    price_label: "Mulai dari Rp 750.000",
    items: ["Desain Konversi Tinggi", "Integrasi Google Analytics", "A/B Testing Ready", "Form Lead Generation", "Optimasi Mobile First", "Loading Super Cepat"],
    icon_name: "Crosshair",
    wa_text: "Halo%20REACreative.idn%2C%20saya%20tertarik%20dengan%20Jasa%20Landing%20Page.",
    show_on_homepage: false,
    sort_order: 4,
    is_active: true
  },
  {
    id: "svc-5",
    number: "05",
    title: "Company Profile Website",
    description: "Website representasi perusahaan yang memuat sejarah pendirian, portofolio proyek, deskripsi layanan, data legalitas, serta formulir kontak untuk meyakinkan investor dan klien potensial.",
    price_label: "Mulai dari Rp 1.250.000",
    items: ["Profil & Sejarah Perusahaan", "Portofolio Proyek", "Halaman Layanan", "Formulir Kontak", "Optimasi SEO", "Mobile Responsive"],
    icon_name: "Building2",
    wa_text: "Halo%20REACreative.idn%2C%20saya%20tertarik%20dengan%20Company%20Profile%20Website.",
    show_on_homepage: false,
    sort_order: 5,
    is_active: true
  },
  {
    id: "svc-6",
    number: "06",
    title: "Maintenance & Support",
    description: "Layanan pengelolaan server, backup basis data berkala, perpanjangan domain hosting, pembaruan keamanan SSL, serta perbaikan bug atau error teknis agar website tetap online lancar.",
    price_label: "Mulai dari Rp 350.000/bulan",
    items: ["Backup Database Berkala", "Perpanjangan Domain & Hosting", "Update SSL Certificate", "Perbaikan Bug & Error", "Monitoring Uptime 24/7", "Update Konten Berkala"],
    icon_name: "Wrench",
    wa_text: "Halo%20REACreative.idn%2C%20saya%20tertarik%20dengan%20Layanan%20Maintenance%20dan%20Support.",
    show_on_homepage: false,
    sort_order: 6,
    is_active: true
  }
];

export const DEFAULT_TESTIMONIALS: Testimonial[] = [
  { id: "t-1", author_name: "Airlangga Yumi", company: "Pandawa Group", message: "Membuat Aplikasi voucher. Tim REACreative sangat responsif dan profesional dalam setiap tahap pengerjaan.", rating: 5, sort_order: 1, is_active: true },
  { id: "t-3", author_name: "Azhar", company: "Stikesmulhokseumawe", message: "Sistem akademik yang dibangun REACreative benar-benar mengubah cara kami mengelola data mahasiswa. Sangat efisien dan mudah digunakan.", rating: 5, sort_order: 3, is_active: true },
  { id: "t-4", author_name: "Yumi Airlangga", company: "PT Dua Kelinci", message: "Membuat Aplikasi voucher, Investasi terbaik kami!", rating: 5, sort_order: 4, is_active: true },
  { id: "t-5", author_name: "Hamba allah", company: "PLN", message: "Membuat Aplikasi monitoring kelayakan alat. Klien kami sangat menyukainya.", rating: 5, sort_order: 5, is_active: true }
];

// ── Fetchers ───────────────────────────────────────────

export async function getSiteSettings(): Promise<SiteSettings> {
  return DEFAULT_SETTINGS;
}

export async function getClientLogos(): Promise<ClientLogo[]> {
  return DEFAULT_CLIENT_LOGOS;
}

export async function getServicesHomepage(): Promise<Service[]> {
  return DEFAULT_SERVICES.filter(s => s.show_on_homepage);
}

export async function getAllServices(): Promise<Service[]> {
  return DEFAULT_SERVICES;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return DEFAULT_TESTIMONIALS;
}
