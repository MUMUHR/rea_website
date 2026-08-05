/**
 * lib/data.ts
 * Centralized data-fetching helpers using Supabase Server Client.
 * All functions return typed data for use in Server Components.
 */

import { createClient } from "@/lib/supabase/server";

// ── Types ──────────────────────────────────────────────

export type SiteSettings = Record<string, string>;

export type ClientLogo = {
  id: string;
  name: string;
  logo_url: string;
  website_url?: string;
  sort_order: number;
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
};

export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  category_color?: string;
  image_url: string;
  project_url?: string;
  description?: string;
  year?: string;
  tech_stack?: string;
  status?: string;
  is_featured: boolean;
  sort_order: number;
};

export type Testimonial = {
  id: string;
  author_name: string;
  role?: string;
  company?: string;
  message: string;
  rating: number;
  avatar_url?: string;
  sort_order: number;
};

// ── Fetchers ───────────────────────────────────────────

export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("key, value");
  const map: SiteSettings = {};
  (data ?? []).forEach((row: { key: string; value: string }) => {
    map[row.key] = row.value;
  });
  return map;
}

export async function getClientLogos(): Promise<ClientLogo[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("client_logos")
    .select("id, name, logo_url, website_url, sort_order")
    .eq("is_active", true)
    .order("sort_order");
  return data ?? [];
}

export async function getServicesHomepage(): Promise<Service[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("services")
    .select("id, number, title, description, items, icon_name, wa_text, show_on_homepage, sort_order")
    .eq("is_active", true)
    .eq("show_on_homepage", true)
    .order("sort_order");
  return data ?? [];
}

export async function getAllServices(): Promise<Service[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("services")
    .select("id, number, title, description, price_label, items, icon_name, wa_text, show_on_homepage, sort_order")
    .eq("is_active", true)
    .order("sort_order");
  return data ?? [];
}

export async function getPortfolioHomepage(): Promise<PortfolioItem[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("portfolio_items")
    .select("id, title, category, category_color, image_url, project_url, description, year, tech_stack, status, is_featured, sort_order")
    .eq("is_active", true)
    .eq("show_on_homepage", true)
    .order("sort_order")
    .limit(3);
  return data ?? [];
}

export async function getAllPortfolio(): Promise<PortfolioItem[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("portfolio_items")
    .select("id, title, category, category_color, image_url, project_url, description, year, tech_stack, status, is_featured, sort_order")
    .eq("is_active", true)
    .order("sort_order");
  return data ?? [];
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("testimonials")
    .select("id, author_name, role, company, message, rating, avatar_url, sort_order")
    .eq("is_active", true)
    .order("sort_order");
  return data ?? [];
}
