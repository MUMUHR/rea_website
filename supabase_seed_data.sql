-- ============================================================
-- REACreative.idn — Database Seeding & Schema Sync (v3)
-- Jalankan di Supabase SQL Editor → New Query → Run
-- ============================================================

-- 0. GRANT PRIVILEGES (Memperbaiki error "permission denied" pada Supabase)
grant usage on schema public to anon, authenticated, service_role;
grant select on all tables in schema public to anon, authenticated, service_role;
grant insert, update, delete on all tables in schema public to authenticated, service_role;
grant usage, select on all sequences in schema public to anon, authenticated, service_role;

alter default privileges in schema public grant all on tables to postgres, anon, authenticated, service_role;
alter default privileges in schema public grant all on sequences to postgres, anon, authenticated, service_role;


-- 1. RECREATE TESTIMONIALS TABLE (Agar sinkron dengan UI Admin Panel)
drop table if exists public.testimonials cascade;

create table public.testimonials (
  id          uuid primary key default uuid_generate_v4(),
  author_name text not null,
  role        text,                 -- contoh: "CEO", "Ketua"
  company     text,                 -- contoh: "Pandawa Store", "PII Lhokseumawe"
  message     text not null,
  rating      int  not null default 5 check (rating between 1 and 5),
  avatar_url  text,
  is_active   boolean not null default true,
  sort_order  int  not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- RLS & Policies untuk testimonials
alter table public.testimonials enable row level security;
create policy "public_read_testimonials" on public.testimonials for select using (is_active = true);
create policy "auth_all_testimonials" on public.testimonials for all to authenticated using (true) with check (true);

-- Trigger untuk updated_at testimonials
create trigger trg_testimonials_updated_at
  before update on public.testimonials
  for each row execute function public.set_updated_at();


-- 2. RESET DATA SEBELUMNYA (Supaya tidak ada data duplikat)
truncate table public.site_settings cascade;
truncate table public.client_logos  cascade;
truncate table public.services      cascade;
truncate table public.portfolio_items cascade;


-- 3. INSERT SITE SETTINGS (Pengaturan Global & Kontak)
insert into public.site_settings (key, value, description) values
  ('whatsapp_number',   '628971302817',                          'Nomor WhatsApp utama agensi'),
  ('email_contact',     'reacreative.idn@gmail.com',             'Email kontak utama'),
  ('instagram_url',     'https://instagram.com/reacreative.idn', 'Link profil Instagram'),
  ('facebook_url',      'https://facebook.com/reacreative',      'Link profil Facebook'),
  ('linkedin_url',      'https://linkedin.com',                  'Link profil LinkedIn'),
  ('youtube_url',       'https://youtube.com/reacreative',       'Link channel YouTube'),
  ('address',           'Kampung Jawa Lama, Kota Lhokseumawe, Aceh, Indonesia', 'Alamat kantor'),
  ('office_hours',      'Senin – Sabtu, 08.00 – 22.00 WIB',     'Jam operasional kantor'),
  ('stats_projects',    '120+',                                  'Statistik: Proyek Selesai'),
  ('stats_clients',     '80+',                                   'Statistik: Klien Nasional'),
  ('stats_years',       '3+',                                    'Statistik: Tahun Pengalaman'),
  ('founded_year',      '2023',                                  'Tahun berdiri agensi'),
  ('hero_wa_text',      'Halo%20REACreative.idn%2C%20saya%20ingin%20konsultasi%20gratis', 'Pesan template WA Hero');


-- 4. INSERT CLIENT LOGOS (Logo Klien Marquee)
insert into public.client_logos (name, logo_url, website_url, sort_order, is_active) values
  ('Nangro.id',         '/img/logo_nangro.png',    'https://nangro.id',  1, true),
  ('PII Lhokseumawe',   '/img/logo_pii.png',       null,                 2, true),
  ('Pandawa Store',     '/img/logo_pandawa.png',   null,                 3, true),
  ('STIKes Aceh',       '/img/logo_stikes.png',    null,                 4, true),
  ('Klien 5',           '/img/logo_klien_5.png',   null,                 5, true),
  ('Klien 6',           '/img/logo_klien_6.png',   null,                 6, true);


-- 5. INSERT SERVICES (Layanan Digital)
insert into public.services (number, title, description, price_label, items, icon_name, wa_text, show_on_homepage, sort_order, is_active) values
  ('01', 'Pembuatan Website',
   'Layanan pembuatan website kustom yang mencakup e-commerce, portal berita, direktori, blog, hingga web portofolio dengan keunggulan loading cepat, desain premium, dan mobile-ready.',
   'Mulai dari Rp 1.500.000',
   '["Landing Page","Website Company Profile","Website E-Commerce","Portal Berita & Artikel","Dashboard & Data Management","Website Custom"]'::jsonb,
   'Globe',
   'Halo%20REACreative.idn%2C%20saya%20tertarik%20dengan%20Jasa%20Pembuatan%20Website.',
   true, 1, true),

  ('02', 'Pengembangan Aplikasi Web',
   'Membangun platform internal berbasis web, seperti dashboard monitoring data, sistem inventaris, manajemen karyawan, hingga automasi proses operasional perusahaan.',
   'Mulai dari Rp 5.000.000',
   '["Dashboard Monitoring Data","Sistem Inventaris","Manajemen Karyawan","Automasi Proses Operasional","Sistem Absensi Online","Aplikasi Internal Custom"]'::jsonb,
   'Code2',
   'Halo%20REACreative.idn%2C%20saya%20tertarik%20dengan%20Pengembangan%20Aplikasi%20Web.',
   true, 2, true),

  ('03', 'Sistem Informasi Akademik',
   'Sistem terpadu untuk sekolah dan perguruan tinggi yang mencakup manajemen data siswa/mahasiswa, penjadwalan kelas, rekap nilai ujian, absensi online, hingga billing keuangan.',
   'Mulai dari Rp 12.000.000',
   '["Pendaftaran Mahasiswa Baru (PMB)","Pengisian KRS Online","Rekap Nilai & Transkrip","Absensi Berbasis QR","Billing & Pembayaran SPP","Laporan Akademik"]'::jsonb,
   'GraduationCap',
   'Halo%20REACreative.idn%2C%20saya%20tertarik%20dengan%20Sistem%20Informasi%20Akademik.',
   true, 3, true),

  ('04', 'Landing Page',
   'Halaman penjualan tunggal yang dioptimasi untuk meningkatkan konversi iklan berbayar (Facebook, Google, TikTok Ads) dan mengumpulkan data leads.',
   'Mulai dari Rp 750.000',
   '["Desain Konversi Tinggi","Integrasi Google Analytics","A/B Testing Ready","Form Lead Generation","Optimasi Mobile First","Loading Super Cepat"]'::jsonb,
   'Crosshair',
   'Halo%20REACreative.idn%2C%20saya%20tertarik%20dengan%20Jasa%20Landing%20Page.',
   false, 4, true),

  ('05', 'Company Profile Website',
   'Website representasi perusahaan yang memuat sejarah pendirian, portofolio proyek, deskripsi layanan, data legalitas, serta formulir kontak untuk meyakinkan investor dan klien potensial.',
   'Mulai dari Rp 1.250.000',
   '["Profil & Sejarah Perusahaan","Portofolio Proyek","Halaman Layanan","Formulir Kontak","Optimasi SEO","Mobile Responsive"]'::jsonb,
   'Building2',
   'Halo%20REACreative.idn%2C%20saya%20tertarik%20dengan%20Company%20Profile%20Website.',
   false, 5, true),

  ('06', 'Maintenance & Support',
   'Layanan pengelolaan server, backup basis data berkala, perpanjangan domain hosting, pembaruan keamanan SSL, serta perbaikan bug atau error teknis agar website tetap online lancar.',
   'Mulai dari Rp 350.000/bulan',
   '["Backup Database Berkala","Perpanjangan Domain & Hosting","Update SSL Certificate","Perbaikan Bug & Error","Monitoring Uptime 24/7","Update Konten Berkala"]'::jsonb,
   'Wrench',
   'Halo%20REACreative.idn%2C%20saya%20tertarik%20dengan%20Layanan%20Maintenance%20dan%20Support.',
   false, 6, true);


-- 6. INSERT PORTFOLIO ITEMS (Hasil Karya Proyek)
insert into public.portfolio_items
  (title, category, category_color, image_url, project_url, description, year, tech_stack, status, is_featured, show_on_homepage, sort_order, is_active)
values
  ('Nangro.id — Portal Berita Digital',
   'Portal Berita', 'bg-blue-600',
   '/img/gambar_section_3.png',
   'https://nangro.id',
   'Pengembangan portal media digital di Aceh dengan fitur kategori dinamis, optimasi SEO instan, sistem manajemen iklan, dan penulisan ramah seluler.',
   '2025', 'Laravel & MySQL', 'Aktif / Online',
   true, true, 1, true),

  ('Pandawa Store — E-Commerce System',
   'Toko Online', 'bg-orange-600',
   '/img/gambar_2.png',
   null,
   'Platform e-commerce custom yang dilengkapi sistem keranjang, monitoring stok produk real-time, integrasi pengiriman RajaOngkir, dan otomasi proses checkout.',
   '2024', 'PHP Native, REST API', 'Aktif / Online',
   true, true, 2, true),

  ('Website Profil PII Lhokseumawe',
   'Company Profile', 'bg-violet-600',
   '/img/gambar_hero_section.png',
   null,
   'Website profil organisasi profesi Persatuan Insinyur Indonesia cabang Lhokseumawe. Menampilkan agenda, data keanggotaan insinyur, dan publikasi organisasi.',
   '2025', 'Laravel & Bootstrap', 'Aktif / Online',
   true, true, 3, true),

  ('SIAKAD Sekolah Tinggi Kesehatan',
   'Sistem Akademik', 'bg-teal-600',
   '/img/gambar_section_3.png',
   null,
   'Sistem informasi akademik kampus untuk pendaftaran mahasiswa baru, pengisian KRS, administrasi nilai mahasiswa, serta pencetakan transkrip.',
   '2025', 'Laravel, PostgreSQL', 'Aktif / Terpasang',
   false, false, 4, true),

  ('Reacreative POS — Point of Sale',
   'Sistem Kasir', 'bg-amber-600',
   '/img/gambar_2.png',
   null,
   'Sistem kasir multi-cabang yang mendukung print struk thermal bluetooth/USB, scanning barcode barang, pencatatan transaksi utang piutang, dan laporan laba-rugi.',
   '2024', 'Tailwind, AlpineJS, Laravel', 'Aktif / Terpasang',
   false, false, 5, true);


-- 7. INSERT TESTIMONIALS (Resensi & Ulasan Pengunjung)
insert into public.testimonials (author_name, role, company, message, rating, sort_order, is_active) values
  ('Budi Santoso', 'Pemilik', 'Pandawa Store',
   'Proses pembuatan sangat cepat dan hasilnya melebihi ekspektasi. Tim REACreative sangat responsif dan profesional dalam setiap tahap pengerjaan.',
   5, 1, true),
  ('Ir. Ahmad Rizal', 'Ketua', 'PII Lhokseumawe',
   'Website profil kami tampak sangat profesional dan mudah dikelola. Support setelah launch juga sangat membantu tim kami yang tidak berlatar IT.',
   5, 2, true),
  ('Dr. Siti Aisyah', 'Direktur', 'STIKes Aceh',
   'Sistem akademik yang dibangun REACreative benar-benar mengubah cara kami mengelola data mahasiswa. Sangat efisien dan mudah digunakan.',
   5, 3, true),
  ('Hendra Wijaya', 'CEO', 'Vanguard Retail',
   'Sistem POS kasir dari REACreative membantu kami memantau penjualan harian toko retail kami secara real-time dari mana saja. Investasi terbaik kami!',
   5, 4, true),
  ('Sarah Salsabila', 'Pimpinan', 'Nangro Media Group',
   'Sistem optimasi SEO otomatis dari portal Nangro.id yang dibuat REACreative meningkatkan traffic harian kami hingga 200% dalam waktu singkat.',
   5, 5, true),
  ('Adi Putera', 'Owner', 'Kopi Nusantara',
   'Branding digital dan website profil yang dibuat REACreative benar-benar mewakili rasa premium dari produk kopi kami. Klien kami sangat menyukainya.',
   5, 6, true);

