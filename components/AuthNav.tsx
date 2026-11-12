"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createBrowserSupabase } from "@/lib/supabase/browser";
import { supabaseBrowserConfigured } from "@/lib/supabase/env";

type AuthNavProps = {
  className: string;
};

export function AuthNav({ className }: AuthNavProps) {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    if (!supabaseBrowserConfigured()) return;

    const supabase = createBrowserSupabase();
    let cancelled = false;

    supabase.auth.getUser().then(({ data }) => {
      if (!cancelled) setSignedIn(Boolean(data.user));
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setSignedIn(Boolean(session?.user));
    });

    return () => {
      cancelled = true;
      data.subscription.unsubscribe();
    };
  }, []);

  if (!signedIn) {
    return (
      <Link href="/login" className={className}>
        Log in
      </Link>
    );
  }

  return (
    <Link href="/portal" className={className}>
      Portal
    </Link>
  );
}
