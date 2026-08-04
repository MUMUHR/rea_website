-- ============================================================
-- REACreative.idn — Supabase SQL Schema
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New query)
-- ============================================================

-- ── Enable UUID extension (usually already enabled on Supabase) ──
create extension if not exists "uuid-ossp";


-- ============================================================
-- TABLE 1: client_logos
-- ============================================================
create table if not exists public.client_logos (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  logo_url    text not null,
  website_url text,
  sort_order  int  not null default 0,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

insert into public.client_logos (name, logo_url, sort_order) values
  ('Klien 1', '/img/logo_klien_1.png', 1),
  ('Klien 2', '/img/logo_klien_2.png', 2),
  ('Klien 3', '/img/logo_klien_3.png', 3),
  ('Klien 4', '/img/logo_klien_4.png', 4),
  ('Klien 5', '/img/logo_klien_5.png', 5),
  ('Klien 6', '/img/logo_klien_6.png', 6);


-- ============================================================
-- TABLE 2: portfolio_items
-- ============================================================
create table if not exists public.portfolio_items (
  id           uuid primary key default uuid_generate_v4(),
  title        text not null,
  category     text not null,
  image_url    text not null,
  project_url  text,
  description  text,
  is_featured  boolean not null default false,
  sort_order   int  not null default 0,
  is_active    boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

insert into public.portfolio_items (title, category, image_url, is_featured, sort_order) values
  ('E-Commerce Fashion',    'Website - E-Commerce',  '/img/portofolio_ecommerce_fashion.png', true,  1),
  ('Sistem Kasir UMKM',     'Desktop App - POS',     '/img/portofolio_sistem_kasir.png',      false, 2),
  ('Booking Klinik Online', 'Website - Reservasi',   '/img/portofolio_booking_klinik.png',    false, 3);


-- ============================================================
-- TABLE 3: services
-- ============================================================
create table if not exists public.services (
  id          uuid primary key default uuid_generate_v4(),
  number      text not null,
  title       text not null,
  description text not null,
  items       jsonb not null default '[]'::jsonb,
  icon_name   text,
  sort_order  int  not null default 0,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

insert into public.services (number, title, description, items, icon_name, sort_order) values
  ('01', 'Website', 
   'Tampilan profesional untuk memperkuat kredibilitas bisnis, layanan, portofolio, dan identitas brand Anda di dunia digital.',
   '["Landing Page","Website Artikel & Berita","Sistem Terintegrasi Custom","Website Company Profile","Website E-Commerce","Dashboard & Data Management"]'::jsonb,
   'Globe', 1),
  ('02', 'Mobile App',
   'Aplikasi mobile yang memperkuat kredibilitas bisnis dan identitas brand Anda di dunia digital.',
   '["Aplikasi Mobile Android & iOS","Aplikasi E-Commerce","Aplikasi Bisnis & Manajemen","Aplikasi Layanan","Booking & Reservasi","Aplikasi Custom"]'::jsonb,
   'Smartphone', 2),
  ('03', 'Desktop App',
   'Aplikasi desktop yang memperkuat operasional bisnis Anda dengan sistem yang andal dan mudah digunakan.',
   '["Sistem Informasi Manajemen","Aplikasi Administrasi","Point of Sale","Pengolahan Data","Manajemen Bisnis","Aplikasi Desktop Custom"]'::jsonb,
   'Monitor', 3);


-- ============================================================
-- TABLE 4: pricing_packages
-- ============================================================
create table if not exists public.pricing_packages (
  id           uuid primary key default uuid_generate_v4(),
  name         text not null,
  price        bigint not null,
  price_label  text,
  badge_text   text,
  features     jsonb not null default '[]'::jsonb,
  cta_text     text not null default 'Mulai Sekarang',
  cta_url      text,
  is_featured  boolean not null default false,
  is_active    boolean not null default true,
  sort_order   int  not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

insert into public.pricing_packages (name, price, price_label, badge_text, features, cta_text, cta_url, is_featured, sort_order) values
  ('Paket Starter', 800000, 'mulai dari', 'Penawaran Terbatas',
   '["Sudah include domain, hosting, dan SSL","Domain aktif untuk identitas brand yang lebih meyakinkan.","Hosting siap pakai agar website bisa langsung online","SSL aktif untuk keamanan dan kepercayaan pengunjung","Konsultasi langsung agar fitur yang dibuat tepat sesuai kebutuhan"]'::jsonb,
   'Mulai Sekarang via WhatsApp',
   'https://wa.me/6281234567890?text=Halo%20REACreative',
   true, 1);


-- ============================================================
-- TABLE 5: site_settings
-- ============================================================
create table if not exists public.site_settings (
  key         text primary key,
  value       text not null,
  description text,
  updated_at  timestamptz not null default now()
);

insert into public.site_settings (key, value, description) values
  ('whatsapp_number',   '6281234567890',                         'Nomor WhatsApp tanpa tanda +'),
  ('email_contact',     'reacreative.idn@gmail.com',             'Email kontak utama'),
  ('instagram_url',     'https://instagram.com/reacreative.idn', 'URL Instagram'),
  ('facebook_url',      'https://facebook.com/reacreative',      'URL Facebook'),
  ('youtube_url',       'https://youtube.com/reacreative',       'URL YouTube'),
  ('stats_projects',    '120+',                                  'Jumlah project ditangani'),
  ('stats_clients',     '80+',                                   'Jumlah klien aktif'),
  ('stats_years',       '3+',                                    'Tahun pengalaman');


-- ============================================================
-- INDEXES
-- ============================================================
create index if not exists idx_client_logos_sort    on public.client_logos (sort_order) where is_active = true;
create index if not exists idx_portfolio_sort       on public.portfolio_items (sort_order) where is_active = true;
create index if not exists idx_portfolio_featured   on public.portfolio_items (is_featured) where is_active = true;
create index if not exists idx_services_sort        on public.services (sort_order) where is_active = true;
create index if not exists idx_pricing_sort         on public.pricing_packages (sort_order) where is_active = true;


-- ============================================================
-- AUTO-UPDATE TRIGGER
-- ============================================================
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_client_logos_updated_at
  before update on public.client_logos
  for each row execute function public.set_updated_at();

create trigger trg_portfolio_items_updated_at
  before update on public.portfolio_items
  for each row execute function public.set_updated_at();

create trigger trg_services_updated_at
  before update on public.services
  for each row execute function public.set_updated_at();

create trigger trg_pricing_packages_updated_at
  before update on public.pricing_packages
  for each row execute function public.set_updated_at();


-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table public.client_logos       enable row level security;
alter table public.portfolio_items    enable row level security;
alter table public.services           enable row level security;
alter table public.pricing_packages   enable row level security;
alter table public.site_settings      enable row level security;

-- Public READ (landing page tanpa login)
create policy "public_read_client_logos"    on public.client_logos    for select using (is_active = true);
create policy "public_read_portfolio_items" on public.portfolio_items for select using (is_active = true);
create policy "public_read_services"        on public.services        for select using (is_active = true);
create policy "public_read_pricing"         on public.pricing_packages for select using (is_active = true);
create policy "public_read_site_settings"   on public.site_settings   for select using (true);

-- Authenticated (admin) full CRUD
create policy "auth_all_client_logos"    on public.client_logos    for all to authenticated using (true) with check (true);
create policy "auth_all_portfolio_items" on public.portfolio_items for all to authenticated using (true) with check (true);
create policy "auth_all_services"        on public.services        for all to authenticated using (true) with check (true);
create policy "auth_all_pricing"         on public.pricing_packages for all to authenticated using (true) with check (true);
create policy "auth_all_site_settings"   on public.site_settings   for all to authenticated using (true) with check (true);
