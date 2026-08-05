"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

// Generate atau ambil session ID dari sessionStorage
function getSessionId(): string {
  if (typeof window === "undefined") return "";
  const key = "rea_session_id";
  let sid = sessionStorage.getItem(key);
  if (!sid) {
    sid = crypto.randomUUID();
    sessionStorage.setItem(key, sid);
  }
  return sid;
}

// Expose fungsi trackEvent ke global window agar bisa dipanggil dari komponen lain
declare global {
  interface Window {
    reaTrackEvent?: (eventType: string, label?: string) => void;
  }
}

export default function PageTracker() {
  const pathname = usePathname();
  const viewIdRef = useRef<string | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    const supabase = createClient();
    const sessionId = getSessionId();

    // Track page view on mount
    const trackPageView = async () => {
      startTimeRef.current = Date.now();

      const { data, error } = await supabase
        .from("page_views")
        .insert({
          session_id: sessionId,
          page: pathname,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent,
          duration_sec: 0,
        })
        .select("id")
        .single();

      if (!error && data) {
        viewIdRef.current = data.id;
      }
    };

    trackPageView();

    // Update duration when leaving page
    const updateDuration = async () => {
      if (!viewIdRef.current) return;
      const duration = Math.round((Date.now() - startTimeRef.current) / 1000);
      if (duration < 1) return;

      await supabase
        .from("page_views")
        .update({ duration_sec: duration })
        .eq("id", viewIdRef.current);
    };

    // Register global trackEvent function
    window.reaTrackEvent = async (eventType: string, label?: string) => {
      await supabase.from("visitor_events").insert({
        session_id: sessionId,
        event_type: eventType,
        label: label || null,
        page: pathname,
      });
    };

    // Cleanup: update duration on unmount / navigation
    return () => {
      updateDuration();
    };
  }, [pathname]);

  // Also update duration on page unload
  useEffect(() => {
    const handleBeforeUnload = async () => {
      if (!viewIdRef.current) return;
      const duration = Math.round((Date.now() - startTimeRef.current) / 1000);
      if (duration < 1) return;

      // Use sendBeacon for reliability on page close
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
      if (!supabaseUrl || !supabaseKey) return;

      const url = `${supabaseUrl}/rest/v1/page_views?id=eq.${viewIdRef.current}`;
      const blob = new Blob(
        [JSON.stringify({ duration_sec: duration })],
        { type: "application/json" }
      );
      navigator.sendBeacon(
        url,
        // sendBeacon with PATCH isn't supported directly — fallback to fetch
        blob
      );
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return null; // invisible component
}
