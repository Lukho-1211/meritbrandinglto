"use server";

import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase/server";
import { supabaseBrowserConfigured } from "@/lib/supabase/env";

export async function signOut() {
  if (supabaseBrowserConfigured()) {
    try {
      const supabase = await createServerSupabase();
      await supabase.auth.signOut();
    } catch (err) {
      console.error("portal sign out failed", err);
    }
  }
  redirect("/");
}
