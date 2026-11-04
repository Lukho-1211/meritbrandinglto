"use server";

import { redirect } from "next/navigation";
import {
  adminAuthConfigured,
  clearAdminSessionCookie,
  passwordsMatch,
  setAdminSessionCookie,
} from "@/lib/admin-session";

export async function signIn(formData: FormData) {
  if (!adminAuthConfigured()) {
    redirect("/desk?error=config");
  }

  const password = String(formData.get("password") ?? "");
  const ok = await passwordsMatch(password);
  if (!ok) {
    redirect("/desk?error=1");
  }

  await setAdminSessionCookie();
  redirect("/desk");
}

export async function signOut() {
  await clearAdminSessionCookie();
  redirect("/desk");
}
