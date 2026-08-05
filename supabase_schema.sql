-- ============================================================
-- REACreative.idn — Supabase SQL Schema (v2)
-- 
-- CARA PAKAI:
-- 1. Buka Supabase Dashboard → project kamu
-- 2. Klik "SQL Editor" di sidebar kiri
-- 3. Klik "New query"
-- 4. Copy-paste seluruh isi file ini
-- 5. Klik "Run" (Ctrl+Enter)
--
-- Supabase URL : https://bmshbmazzsmgvqivpgeh.supabase.co
-- Database     : rea_db
-- ============================================================


-- ── Enable UUID extension ──────────────────────────────────
create extension if not exists "uuid-ossp";


-- ============================================================
-- DROP EXISTING TABLES (untuk re-run bersih)
-- Urutan drop perlu terbalik karena foreign key
-- ============================================================
drop table if exists public.contacts          cascade;
drop table if exists public.testimonials      cascade;
drop table if exists public.pricing_packages  cascade;
drop table if exists public.portfolio_items   cascade;
drop table if exists public.services          cascade;
drop table if exists public.client_logos      cascade;
drop table if exists public.site_settings     cascade;
drop table if exists public.faq_items         cascade;


-- ============================================================
-- FUNCTION: auto-update updated_at
-- ============================================================
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;


-- ============================================================
-- TABLE 1: site_settings
-- Key-value store untuk konfigurasi global website
-- ============================================================
create table public.site_settings (
  key         text primary key,
  value       text not null,
  description text,
  updated_at  timestamptz not null default now()
);

insert into public.site_settings (key, value, description) values
  ('whatsapp_number',   '628971302817',                          'Nomor WhatsApp tanpa tanda + (format: 62xxx)'),
  ('email_contact',     'reacreative.idn@gmail.com',             'Email kontak utama'),
  ('instagram_url',     'https://instagram.com/reacreative.idn', 'URL Instagram'),
  ('facebook_url',      'https://facebook.com/reacreative.idn',  'URL Facebook'),
  ('linkedin_url',      'https://linkedin.com/company/reacreative-idn', 'URL LinkedIn'),
  ('youtube_url',       'https://youtube.com/reacreative',       'URL YouTube'),
  ('address',           'Kampung Jawa Lama, Kota Lhokseumawe, Aceh, Indonesia', 'Alamat kantor'),
  ('office_hours',      'Senin – Sabtu, 08.00 – 22.00 WIB',     'Jam operasional'),
  ('stats_projects',    '120+',                                  'Jumlah project yang telah ditangani'),
  ('stats_clients',     '80+',                                   'Jumlah klien aktif'),
  ('stats_years',       '3+',                                    'Tahun pengalaman'),
  ('hero_wa_text',      'Halo%20REACreative.idn%2C%20saya%20ingin%20konsultasi%20gratis', 'Pesan WA hero section (URL-encoded)'),
  ('founded_year',      '2023',                                  'Tahun berdiri perusahaan');


-- ============================================================
-- TABLE 2: client_logos
-- Logo klien yang ditampilkan di marquee homepage
-- ============================================================
create table public.client_logos (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  logo_url    text not null,           -- path relatif /img/... atau URL eksternal
  website_url text,                    -- opsional, link ke website klien
  sort_order  int  not null default 0, -- urutan tampil (ascending)
  is_active   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

insert into public.client_logos (name, logo_url, website_url, sort_order) values
  ('Nangro.id',         '/img/logo_nangro.png',    'https://nangro.id',  1),
  ('PII Lhokseumawe',   '/img/logo_pii.png',       null,                 2),
  ('Pandawa Store',     '/img/logo_pandawa.png',   null,                 3),
  ('STIKes Aceh',       '/img/logo_stikes.png',    null,                 4),
  ('Klien 5',           '/img/logo_klien_5.png',   null,                 5),
  ('Klien 6',           '/img/logo_klien_6.png',   null,                 6);

create trigger trg_client_logos_updated_at
  before update on public.client_logos
  for each row execute function public.set_updated_at();


-- ============================================================
-- TABLE 3: services
-- Layanan yang ditampilkan di homepage (ServiceCards) dan /layanan
-- ============================================================
create table public.services (
  id          uuid primary key default uuid_generate_v4(),
  number      text not null,           -- "01", "02", dst untuk tampilan
  title       text not null,
  description text not null,
  price_label text,                    -- contoh: "Mulai dari Rp 1.500.000"
  items       jsonb not null default '[]'::jsonb,  -- array string sub-items
  icon_name   text,                    -- nama icon Lucide, contoh: "Globe"
  wa_text     text,                    -- pesan WA khusus layanan ini (URL-encoded)
  show_on_homepage boolean not null default true,  -- tampil di section homepage?
  sort_order  int  not null default 0,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

insert into public.services (number, title, description, price_label, items, icon_name, wa_text, show_on_homepage, sort_order) values
  ('01', 'Pembuatan Website',
   'Layanan pembuatan website kustom yang mencakup e-commerce, portal berita, direktori, blog, hingga web portofolio dengan keunggulan loading cepat, desain premium, dan mobile-ready.',
   'Mulai dari Rp 1.500.000',
   '["Landing Page","Website Company Profile","Website E-Commerce","Portal Berita & Artikel","Dashboard & Data Management","Website Custom"]'::jsonb,
   'Globe',
   'Halo%20REACreative.idn%2C%20saya%20tertarik%20dengan%20Jasa%20Pembuatan%20Website.',
   true, 1),

  ('02', 'Pengembangan Aplikasi Web',
   'Membangun platform internal berbasis web, seperti dashboard monitoring data, sistem inventaris, manajemen karyawan, hingga automasi proses operasional perusahaan.',
   'Mulai dari Rp 5.000.000',
   '["Dashboard Monitoring Data","Sistem Inventaris","Manajemen Karyawan","Automasi Proses Operasional","Sistem Absensi Online","Aplikasi Internal Custom"]'::jsonb,
   'Code2',
   'Halo%20REACreative.idn%2C%20saya%20tertarik%20dengan%20Pengembangan%20Aplikasi%20Web.',
   true, 2),

  ('03', 'Sistem Informasi Akademik',
   'Sistem terpadu untuk sekolah dan perguruan tinggi yang mencakup manajemen data siswa/mahasiswa, penjadwalan kelas, rekap nilai ujian, absensi online, hingga billing keuangan.',
   'Mulai dari Rp 12.000.000',
   '["Pendaftaran Mahasiswa Baru (PMB)","Pengisian KRS Online","Rekap Nilai & Transkrip","Absensi Berbasis QR","Billing & Pembayaran SPP","Laporan Akademik"]'::jsonb,
   'GraduationCap',
   'Halo%20REACreative.idn%2C%20saya%20tertarik%20dengan%20Sistem%20Informasi%20Akademik.',
   false, 3),

  ('04', 'Landing Page',
   'Halaman penjualan tunggal yang dioptimasi untuk meningkatkan konversi iklan berbayar (Facebook, Google, TikTok Ads) dan mengumpulkan data leads.',
   'Mulai dari Rp 750.000',
   '["Desain Konversi Tinggi","Integrasi Google Analytics","A/B Testing Ready","Form Lead Generation","Optimasi Mobile First","Loading Super Cepat"]'::jsonb,
   'Crosshair',
   'Halo%20REACreative.idn%2C%20saya%20tertarik%20dengan%20Jasa%20Landing%20Page.',
   false, 4),

  ('05', 'Company Profile Website',
   'Website representasi perusahaan yang memuat sejarah pendirian, portofolio proyek, deskripsi layanan, data legalitas, serta formulir kontak untuk meyakinkan investor dan klien potensial.',
   'Mulai dari Rp 1.250.000',
   '["Profil & Sejarah Perusahaan","Portofolio Proyek","Halaman Layanan","Formulir Kontak","Optimasi SEO","Mobile Responsive"]'::jsonb,
   'Building2',
   'Halo%20REACreative.idn%2C%20saya%20tertarik%20dengan%20Company%20Profile%20Website.',
   false, 5),

  ('06', 'Maintenance & Support',
   'Layanan pengelolaan server, backup basis data berkala, perpanjangan domain hosting, pembaruan keamanan SSL, serta perbaikan bug atau error teknis agar website tetap online lancar.',
   'Mulai dari Rp 350.000/bulan',
   '["Backup Database Berkala","Perpanjangan Domain & Hosting","Update SSL Certificate","Perbaikan Bug & Error","Monitoring Uptime 24/7","Update Konten Berkala"]'::jsonb,
   'Wrench',
   'Halo%20REACreative.idn%2C%20saya%20tertarik%20dengan%20Layanan%20Maintenance%20dan%20Support.',
   false, 6),

  ('07', 'Integrasi API',
   'Integrasi API untuk sinkronisasi data antar platform, cek resi/ongkir ekspedisi Indonesia, automasi notifikasi WhatsApp, dan kebutuhan koneksi sistem bisnis lainnya.',
   'Mulai dari Rp 1.500.000',
   '["Integrasi Payment Gateway","Notifikasi WhatsApp Otomatis","Cek Resi & Ongkir Ekspedisi","Sinkronisasi Data Antar Platform","Webhook & Event-Driven","REST API Development"]'::jsonb,
   'Link2',
   'Halo%20REACreative.idn%2C%20saya%20tertarik%20dengan%20Integrasi%20API%20Gateway.',
   false, 7),

  ('08', 'Custom Software Development',
   'Pengembangan modul perangkat lunak kustom yang dirancang dari nol sesuai spesifikasi kebutuhan logika bisnis Anda yang unik dan tidak terakomodasi di sistem pasaran.',
   'Mulai dari Rp 8.000.000',
   '["Analisis Kebutuhan Bisnis","Desain Arsitektur Sistem","Development Iteratif","Testing & QA","Deployment & Training","Dokumentasi Teknis Lengkap"]'::jsonb,
   'Laptop',
   'Halo%20REACreative.idn%2C%20saya%20tertarik%20dengan%20Custom%20Software%20Development.',
   false, 8);

create trigger trg_services_updated_at
  before update on public.services
  for each row execute function public.set_updated_at();


-- ============================================================
-- TABLE 4: portfolio_items
-- Proyek portofolio yang ditampilkan di homepage & /portofolio
-- ============================================================
create table public.portfolio_items (
  id           uuid primary key default uuid_generate_v4(),
  title        text not null,
  category     text not null,          -- "Portal Berita", "Toko Online", dst
  category_color text,                 -- kelas Tailwind untuk badge warna, contoh: "bg-blue-600"
  image_url    text not null,          -- path /img/... atau URL
  project_url  text,                   -- URL ke website klien (opsional)
  description  text,
  year         text,                   -- "2024", "2025"
  tech_stack   text,                   -- "Laravel & MySQL", dst
  status       text default 'Aktif / Online',
  is_featured  boolean not null default false,  -- tampil di homepage (max 3)
  show_on_homepage boolean not null default false,
  sort_order   int  not null default 0,
  is_active    boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

insert into public.portfolio_items
  (title, category, category_color, image_url, project_url, description, year, tech_stack, status, is_featured, show_on_homepage, sort_order)
values
  ('Nangro.id — Portal Berita Digital',
   'Portal Berita', 'bg-blue-600',
   '/img/gambar_section_3.png',
   'https://nangro.id',
   'Pengembangan portal media digital di Aceh dengan fitur kategori dinamis, optimasi SEO instan, sistem manajemen iklan, dan penulisan ramah seluler.',
   '2025', 'Laravel & MySQL', 'Aktif / Online',
   true, true, 1),

  ('Pandawa Store — E-Commerce System',
   'Toko Online', 'bg-orange-600',
   '/img/gambar_2.png',
   null,
   'Platform e-commerce custom yang dilengkapi sistem keranjang, monitoring stok produk real-time, integrasi pengiriman RajaOngkir, dan otomasi proses checkout.',
   '2024', 'PHP Native, REST API', 'Aktif / Online',
   true, true, 2),

  ('Website Profil PII Lhokseumawe',
   'Company Profile', 'bg-violet-600',
   '/img/gambar_hero_section.png',
   null,
   'Website profil organisasi profesi Persatuan Insinyur Indonesia cabang Lhokseumawe. Menampilkan agenda, data keanggotaan insinyur, dan publikasi organisasi.',
   '2025', 'Laravel & Bootstrap', 'Aktif / Online',
   true, true, 3),

  ('SIAKAD Sekolah Tinggi Kesehatan',
   'Sistem Akademik', 'bg-teal-600',
   '/img/gambar_section_3.png',
   null,
   'Sistem informasi akademik kampus untuk pendaftaran mahasiswa baru, pengisian KRS, administrasi nilai mahasiswa, serta pencetakan transkrip.',
   '2025', 'Laravel, PostgreSQL', 'Aktif / Terpasang',
   false, false, 4),

  ('Reacreative POS — Point of Sale',
   'Sistem Kasir', 'bg-amber-600',
   '/img/gambar_2.png',
   null,
   'Sistem kasir multi-cabang yang mendukung print struk thermal bluetooth/USB, scanning barcode barang, pencatatan transaksi utang piutang, dan laporan laba-rugi.',
   '2024', 'Tailwind, AlpineJS, Laravel', 'Aktif / Terpasang',
   false, false, 5),

  ('Integrasi Payment & WhatsApp Gateway',
   'Integrasi API', 'bg-rose-600',
   '/img/gambar_hero_section.png',
   null,
   'Pengembangan modul integrasi API pembayaran multi-saluran otomatis serta notifikasi WhatsApp otomatis bagi konfirmasi billing untuk tagihan klien korporat.',
   '2025', 'Node.js, REST API, Tripay', 'Aktif / Terintegrasi',
   false, false, 6);

create trigger trg_portfolio_items_updated_at
  before update on public.portfolio_items
  for each row execute function public.set_updated_at();


-- ============================================================
-- TABLE 5: pricing_packages
-- Paket harga yang ditampilkan di PricingSection
-- ============================================================
create table public.pricing_packages (
  id           uuid primary key default uuid_generate_v4(),
  name         text not null,
  price        bigint not null,         -- dalam Rupiah, contoh: 800000
  price_label  text default 'mulai dari',
  badge_text   text,                    -- "All-In", "Penawaran Terbatas", dst
  description  text,
  features     jsonb not null default '[]'::jsonb,  -- array string fitur
  cta_text     text not null default 'Konsultasi via WhatsApp',
  wa_text      text,                   -- pesan WA URL-encoded
  is_featured  boolean not null default false,
  is_active    boolean not null default true,
  sort_order   int  not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

insert into public.pricing_packages
  (name, price, price_label, badge_text, description, features, cta_text, wa_text, is_featured, sort_order)
values
  ('Website Starter',
   800000, 'mulai dari', 'All-In',
   'Penawaran ini cocok untuk Anda yang ingin segera punya website profesional dengan alur yang simpel. Tinggal konsultasikan kebutuhan bisnis Anda, lalu kami bantu eksekusinya.',
   '["Domain aktif untuk identitas brand yang lebih meyakinkan","Hosting siap pakai agar website bisa langsung online","SSL aktif untuk keamanan dan kepercayaan pengunjung","Konsultasi langsung agar fitur yang dibuat tepat sesuai kebutuhan","Desain responsif mobile-first","Support teknis pasca-selesai"]'::jsonb,
   'Konsultasi via WhatsApp',
   'Halo%20REACreative.idn%2C%20saya%20ingin%20konsultasi%20website%20mulai%20dari%20Rp%20800.000%20(include%20domain%2C%20hosting%2C%20SSL).',
   true, 1);

create trigger trg_pricing_packages_updated_at
  before update on public.pricing_packages
  for each row execute function public.set_updated_at();


-- ============================================================
-- TABLE 6: faq_items
-- FAQ yang ditampilkan di FaqSection homepage
-- ============================================================
create table public.faq_items (
  id         uuid primary key default uuid_generate_v4(),
  question   text not null,
  answer     text not null,
  sort_order int  not null default 0,
  is_active  boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.faq_items (question, answer, sort_order) values
  ('Berapa lama proses pembuatan website?',
   'Tergantung kompleksitas. Landing page bisa selesai dalam 3–5 hari kerja. Website company profile 7–14 hari. E-commerce atau sistem custom bisa memakan waktu 2–6 minggu. Kami selalu menyepakati timeline di awal sebelum pengerjaan dimulai.',
   1),
  ('Bagaimana mekanisme pembayarannya?',
   'Bayar DP 50% setelah desain disetujui, lalu sisa 50% setelah proyek selesai dan diserahterimakan. Kami menerima transfer bank, e-wallet (GoPay, OVO, Dana), dan QRIS.',
   2),
  ('Apakah ada garansi revisi?',
   'Ya! Kami menyediakan garansi revisi selama masa pengerjaan. Detail jumlah revisi disepakati di awal kontrak sesuai paket yang dipilih. Revisi besar setelah serah terima akan dikenakan biaya tambahan yang wajar.',
   3),
  ('Apakah domain dan hosting sudah termasuk?',
   'Untuk paket website mulai Rp 800.000, sudah include domain (.com atau .id), hosting 1 tahun, dan SSL gratis. Perpanjangan tahun berikutnya akan diinfokan jauh-jauh hari.',
   4),
  ('Bisa request desain khusus / referensi?',
   'Tentu! Kami sangat terbuka dengan referensi desain dari Anda. Ceritakan preferensi warna, gaya desain, dan target audiens — tim kami akan menyesuaikan tampilan dengan identitas brand Anda.',
   5),
  ('Apakah ada layanan maintenance setelah selesai?',
   'Ada! Kami menyediakan paket maintenance bulanan mulai Rp 350.000/bulan yang mencakup backup rutin, update keamanan, perbaikan bug minor, dan monitoring uptime 24/7.',
   6),
  ('Apakah bisa diakses dari seluruh Indonesia?',
   'Ya, kami melayani klien dari seluruh penjuru Indonesia secara remote. Komunikasi bisa lewat WhatsApp, email, atau video call. Tim kami beroperasi dari Lhokseumawe, Aceh.',
   7);

create trigger trg_faq_items_updated_at
  before update on public.faq_items
  for each row execute function public.set_updated_at();


-- ============================================================
-- TABLE 7: testimonials
-- Testimoni klien (opsional untuk section mendatang)
-- ============================================================
create table public.testimonials (
  id         uuid primary key default uuid_generate_v4(),
  name       text not null,
  role       text,              -- "CEO Pandawa Store", "Ketua PII Lhokseumawe"
  avatar_url text,
  content    text not null,
  rating     int  not null default 5 check (rating between 1 and 5),
  is_active  boolean not null default true,
  sort_order int  not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.testimonials (name, role, content, rating, sort_order) values
  ('Budi Santoso',    'Pemilik Pandawa Store',
   'Proses pembuatan sangat cepat dan hasilnya melebihi ekspektasi. Tim REACreative sangat responsif dan profesional dalam setiap tahap pengerjaan.',
   5, 1),
  ('Ir. Ahmad Rizal', 'Ketua PII Lhokseumawe',
   'Website profil kami tampak sangat profesional dan mudah dikelola. Support setelah launch juga sangat membantu tim kami yang tidak berlatar IT.',
   5, 2),
  ('Dr. Siti Aisyah', 'Direktur STIKes Aceh',
   'Sistem akademik yang dibangun REACreative benar-benar mengubah cara kami mengelola data mahasiswa. Sangat efisien dan mudah digunakan.',
   5, 3);

create trigger trg_testimonials_updated_at
  before update on public.testimonials
  for each row execute function public.set_updated_at();


-- ============================================================
-- TABLE 8: contacts
-- Form kontak / pesan masuk dari pengunjung website
-- ============================================================
create table public.contacts (
  id         uuid primary key default uuid_generate_v4(),
  name       text not null,
  email      text,
  phone      text,
  subject    text,
  message    text not null,
  source     text default 'website',  -- "website", "landing_page", dst
  is_read    boolean not null default false,
  created_at timestamptz not null default now()
);


-- ============================================================
-- INDEXES
-- ============================================================
create index if not exists idx_client_logos_sort      on public.client_logos    (sort_order) where is_active = true;
create index if not exists idx_portfolio_sort         on public.portfolio_items (sort_order) where is_active = true;
create index if not exists idx_portfolio_featured     on public.portfolio_items (is_featured) where is_active = true;
create index if not exists idx_portfolio_homepage     on public.portfolio_items (show_on_homepage) where is_active = true;
create index if not exists idx_services_sort          on public.services        (sort_order) where is_active = true;
create index if not exists idx_services_homepage      on public.services        (show_on_homepage) where is_active = true;
create index if not exists idx_pricing_sort           on public.pricing_packages (sort_order) where is_active = true;
create index if not exists idx_faq_sort               on public.faq_items       (sort_order) where is_active = true;
create index if not exists idx_testimonials_sort      on public.testimonials    (sort_order) where is_active = true;
create index if not exists idx_contacts_created       on public.contacts        (created_at desc);


-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table public.site_settings      enable row level security;
alter table public.client_logos       enable row level security;
alter table public.services           enable row level security;
alter table public.portfolio_items    enable row level security;
alter table public.pricing_packages   enable row level security;
alter table public.faq_items          enable row level security;
alter table public.testimonials       enable row level security;
alter table public.contacts           enable row level security;

-- ── PUBLIC READ (tanpa login — untuk landing page) ──────────
create policy "public_read_site_settings"   on public.site_settings    for select using (true);
create policy "public_read_client_logos"    on public.client_logos     for select using (is_active = true);
create policy "public_read_services"        on public.services         for select using (is_active = true);
create policy "public_read_portfolio_items" on public.portfolio_items  for select using (is_active = true);
create policy "public_read_pricing"         on public.pricing_packages for select using (is_active = true);
create policy "public_read_faq"             on public.faq_items        for select using (is_active = true);
create policy "public_read_testimonials"    on public.testimonials     for select using (is_active = true);

-- INSERT terbuka untuk form kontak (anon boleh submit)
create policy "public_insert_contacts"      on public.contacts         for insert with check (true);

-- ── AUTHENTICATED (admin) FULL CRUD ─────────────────────────
create policy "auth_all_site_settings"      on public.site_settings    for all to authenticated using (true) with check (true);
create policy "auth_all_client_logos"       on public.client_logos     for all to authenticated using (true) with check (true);
create policy "auth_all_services"           on public.services         for all to authenticated using (true) with check (true);
create policy "auth_all_portfolio_items"    on public.portfolio_items  for all to authenticated using (true) with check (true);
create policy "auth_all_pricing"            on public.pricing_packages for all to authenticated using (true) with check (true);
create policy "auth_all_faq"               on public.faq_items        for all to authenticated using (true) with check (true);
create policy "auth_all_testimonials"       on public.testimonials     for all to authenticated using (true) with check (true);
create policy "auth_read_contacts"          on public.contacts         for select to authenticated using (true);
create policy "auth_update_contacts"        on public.contacts         for update to authenticated using (true) with check (true);
create policy "auth_delete_contacts"        on public.contacts         for delete to authenticated using (true);


-- ============================================================
-- VIEWS (opsional — memudahkan query dari aplikasi)
-- ============================================================

-- View: portofolio untuk homepage (max 3 featured)
create or replace view public.v_portfolio_homepage as
select id, title, category, category_color, image_url, project_url, description, year, tech_stack, status, sort_order
from public.portfolio_items
where is_active = true and show_on_homepage = true
order by sort_order asc;

-- View: layanan untuk homepage section (show_on_homepage = true)
create or replace view public.v_services_homepage as
select id, number, title, description, items, icon_name, wa_text, sort_order
from public.services
where is_active = true and show_on_homepage = true
order by sort_order asc;

-- View: semua layanan untuk halaman /layanan
create or replace view public.v_services_all as
select id, number, title, description, price_label, items, icon_name, wa_text, sort_order
from public.services
where is_active = true
order by sort_order asc;

-- View: semua portofolio untuk halaman /portofolio
create or replace view public.v_portfolio_all as
select id, title, category, category_color, image_url, project_url, description, year, tech_stack, status, is_featured, sort_order
from public.portfolio_items
where is_active = true
order by sort_order asc;


-- ============================================================
-- SELESAI ✓
-- Tabel yang dibuat:
--   1. site_settings   — konfigurasi global (WA number, social, stats, dll)
--   2. client_logos    — logo klien marquee
--   3. services        — kartu layanan homepage & halaman /layanan
--   4. portfolio_items — kartu portofolio homepage & halaman /portofolio
--   5. pricing_packages — paket harga
--   6. faq_items       — pertanyaan & jawaban FAQ
--   7. testimonials    — testimoni klien
--   8. contacts        — pesan masuk dari form kontak
--
-- Views yang dibuat:
--   v_portfolio_homepage — portofolio untuk homepage
--   v_services_homepage  — layanan untuk homepage
--   v_services_all       — semua layanan untuk /layanan
--   v_portfolio_all      — semua portofolio untuk /portofolio
-- ============================================================
