import { NextResponse } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { claimLeadsForUser } from "@/lib/portal";
import { createServerSupabase } from "@/lib/supabase/server";

function safeNextPath(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/portal";
  }
  return value;
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const next = safeNextPath(searchParams.get("next"));
  const loginError = new URL("/login?error=auth", origin);

  try {
    const supabase = await createServerSupabase();
    let errorMessage = "";

    if (code) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      errorMessage = error?.message ?? "";
    } else if (tokenHash && type) {
      const { error } = await supabase.auth.verifyOtp({
        type: type as EmailOtpType,
        token_hash: tokenHash,
      });
      errorMessage = error?.message ?? "";
    } else {
      return NextResponse.redirect(loginError);
    }

    if (errorMessage) {
      console.error("auth callback failed", errorMessage);
      return NextResponse.redirect(loginError);
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user?.email) {
      await claimLeadsForUser(user.id, user.email);
    }

    return NextResponse.redirect(new URL(next, origin));
  } catch (err) {
    console.error("auth callback unavailable", err);
    return NextResponse.redirect(loginError);
  }
}
