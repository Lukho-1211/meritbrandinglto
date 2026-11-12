import { redirect } from "next/navigation";
import { getAdminSupabase } from "@/lib/supabase/admin";
import { supabaseBrowserConfigured } from "@/lib/supabase/env";
import { createServerSupabase } from "@/lib/supabase/server";

export type PortalUser = {
  id: string;
  email: string;
};

export type PortalBrief = {
  id: string;
  created_at: string;
  name: string;
  business: string | null;
  email: string;
  phone: string | null;
  services: string[];
  message: string;
};

function isExistingUserError(error: { message?: string; code?: string }) {
  const code = error.code ?? "";
  const message = (error.message ?? "").toLowerCase();
  return (
    code === "email_exists" ||
    code === "user_already_exists" ||
    message.includes("already been registered") ||
    message.includes("already registered")
  );
}

async function findAuthUserIdByEmail(email: string): Promise<string | null> {
  const url = process.env.SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !key) return null;

  // GoTrue admin list supports an email filter on recent Auth versions.
  const endpoint = new URL(`${url}/auth/v1/admin/users`);
  endpoint.searchParams.set("page", "1");
  endpoint.searchParams.set("per_page", "1");
  endpoint.searchParams.set("email", email);

  const response = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${key}`,
      apikey: key,
    },
    cache: "no-store",
  });

  if (!response.ok) return null;

  const body = (await response.json()) as { users?: Array<{ id?: string; email?: string }> };
  const match = body.users?.find(
    (user) => user.email?.toLowerCase() === email.toLowerCase(),
  );
  return match?.id ?? null;
}

export async function getCurrentPortalUser(): Promise<PortalUser | null> {
  if (!supabaseBrowserConfigured()) return null;

  try {
    const supabase = await createServerSupabase();
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user?.email) return null;
    return { id: data.user.id, email: data.user.email };
  } catch (err) {
    console.error("portal session read failed", err);
    return null;
  }
}

export async function requirePortalUser() {
  const user = await getCurrentPortalUser();
  if (!user) redirect("/login");
  return user;
}

export async function ensureMeritUser(email: string) {
  const admin = getAdminSupabase();
  const normalized = email.trim().toLowerCase();

  // Existing accounts (Merit or education) must not be recreated or stripped.
  const existingId = await findAuthUserIdByEmail(normalized);
  if (existingId) return;

  const { data, error } = await admin.auth.admin.createUser({
    email: normalized,
    email_confirm: true,
    app_metadata: { app: "meritbranding" },
  });

  if (error && isExistingUserError(error)) {
    return;
  }
  if (error) {
    throw error;
  }

  const userId = data.user?.id;
  if (!userId) return;

  // GoTrue may insert the user before app_metadata is visible to the
  // shared education trigger, which then creates a student profile.
  // Only strip for brand-new Merit users we just created.
  const { error: stripError } = await admin.rpc("merit_strip_education_shell", {
    p_user_id: userId,
  });
  if (stripError) {
    console.error("merit education shell cleanup failed", stripError);
  }
}

export async function claimLeadsForUser(userId: string, email: string) {
  const admin = getAdminSupabase();
  const { error } = await admin.rpc("merit_claim_leads", {
    p_user_id: userId,
    p_email: email,
  });
  if (error) {
    console.error("claim leads failed", error);
  }
}

export async function listBriefsForUser(userId: string, email: string) {
  await claimLeadsForUser(userId, email);
  const admin = getAdminSupabase();
  const { data, error } = await admin
    .from("leads")
    .select("id, created_at, name, business, email, phone, services, message")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("portal briefs fetch failed", error);
    throw new Error("Could not load briefs.");
  }

  return (data as PortalBrief[]) ?? [];
}
