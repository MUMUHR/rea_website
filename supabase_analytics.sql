-- ============================================================
-- REACreative.idn — Analytics Tables (Tambahan Schema v2)
-- Jalankan di Supabase SQL Editor → New Query
-- ============================================================

-- Drop if exists (untuk re-run bersih)
drop table if exists public.visitor_events cascade;
drop table if exists public.page_views     cascade;

-- ============================================================
-- TABLE: page_views
-- Mencatat setiap kunjungan halaman oleh pengunjung
-- ============================================================
create table public.page_views (
  id           uuid        primary key default uuid_generate_v4(),
  session_id   text        not null,
  page         text        not null,
  referrer     text,
  user_agent   text,
  duration_sec int         default 0,
  created_at   timestamptz not null default now()
);

create index idx_page_views_page    on public.page_views (page);
create index idx_page_views_session on public.page_views (session_id);
create index idx_page_views_created on public.page_views (created_at desc);

-- ============================================================
-- TABLE: visitor_events
-- ============================================================
create table public.visitor_events (
  id           uuid        primary key default uuid_generate_v4(),
  session_id   text        not null,
  event_type   text        not null,
  label        text,
  page         text,
  created_at   timestamptz not null default now()
);

create index idx_visitor_events_type    on public.visitor_events (event_type);
create index idx_visitor_events_created on public.visitor_events (created_at desc);
create index idx_visitor_events_session on public.visitor_events (session_id);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table public.page_views     enable row level security;
alter table public.visitor_events enable row level security;

create policy "anon_insert_page_views"     on public.page_views     for insert with check (true);
create policy "anon_insert_visitor_events" on public.visitor_events for insert with check (true);
create policy "anon_update_page_views"     on public.page_views     for update using (true) with check (true);
create policy "auth_read_page_views"       on public.page_views     for select to authenticated using (true);
create policy "auth_read_visitor_events"   on public.visitor_events for select to authenticated using (true);
