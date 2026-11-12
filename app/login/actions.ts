"use server";

import { Resend } from "resend";
import { ensureMeritUser } from "@/lib/portal";
import { getAdminSupabase } from "@/lib/supabase/admin";
import {
  getSiteOrigin,
  supabaseBrowserConfigured,
} from "@/lib/supabase/env";

export type LoginState = {
  sent?: boolean;
  error?: string;
  /** Local/dev fallback when Resend is not configured. */
  devLink?: string;
};

function asEmail(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

function portalSignInLink(hashedToken: string, verificationType: string) {
  const url = new URL(`${getSiteOrigin()}/auth/callback`);
  url.searchParams.set("token_hash", hashedToken);
  url.searchParams.set("type", verificationType || "magiclink");
  return url.toString();
}

function rewriteActionLink(actionLink: string) {
  try {
    const parsed = new URL(actionLink);
    const origin = getSiteOrigin();
    const tokenHash =
      parsed.searchParams.get("token_hash") ||
      parsed.searchParams.get("token");
    const type = parsed.searchParams.get("type") || "magiclink";

    if (tokenHash) {
      return portalSignInLink(tokenHash, type);
    }

    // Keep query/hash from GoTrue, force our host + callback path.
    const rewritten = new URL(`${origin}/auth/callback`);
    parsed.searchParams.forEach((value, key) => {
      rewritten.searchParams.set(key, value);
    });
    rewritten.hash = parsed.hash;
    return rewritten.toString();
  } catch {
    return actionLink;
  }
}

async function deliverSignInLink(email: string, link: string) {
  const resendKey = process.env.RESEND_API_KEY?.trim();
  if (!resendKey) {
    return { channel: "dev" as const };
  }

  const fromEmail =
    process.env.LEAD_FROM_EMAIL || "Merit Branding <onboarding@resend.dev>";
  const resend = new Resend(resendKey);
  await resend.emails.send({
    from: fromEmail,
    to: [email],
    subject: "Your Merit Branding sign-in link",
    text: [
      "Sign in to your Merit Branding portal:",
      "",
      link,
      "",
      "This link expires soon. If you did not ask for it, ignore this email.",
    ].join("\n"),
  });

  return { channel: "email" as const };
}

export async function sendMagicLink(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = asEmail(formData.get("email"));
  if (!email) {
    return { error: "Enter your email." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Enter a valid email address." };
  }

  if (!supabaseBrowserConfigured()) {
    return {
      error:
        "Login is not configured. Set the public Supabase keys and restart the server.",
    };
  }

  try {
    await ensureMeritUser(email);

    const admin = getAdminSupabase();
    const redirectTo = `${getSiteOrigin()}/auth/callback`;
    const { data, error } = await admin.auth.admin.generateLink({
      type: "magiclink",
      email,
      options: { redirectTo },
    });

    if (error) {
      console.error("magic link generate failed", error);
      const message = error.message.toLowerCase();
      if (message.includes("rate") || error.status === 429) {
        return {
          error:
            "Sign-in email limit reached for now. Wait about an hour, or WhatsApp +27 721 172 942.",
        };
      }
      return {
        error:
          "We could not send a sign-in link. Try again, or WhatsApp +27 721 172 942.",
      };
    }

    const properties = data.properties;
    const hashedToken = properties?.hashed_token;
    const verificationType = properties?.verification_type || "magiclink";
    const actionLink = properties?.action_link;

    const link = hashedToken
      ? portalSignInLink(hashedToken, verificationType)
      : actionLink
        ? rewriteActionLink(actionLink)
        : "";

    if (!link) {
      console.error("magic link missing action properties", properties);
      return {
        error:
          "We could not send a sign-in link. Try again, or WhatsApp +27 721 172 942.",
      };
    }

    const delivery = await deliverSignInLink(email, link);
    if (delivery.channel === "email") {
      return { sent: true };
    }

    if (process.env.NODE_ENV !== "production") {
      return { sent: true, devLink: link };
    }

    return {
      error:
        "Login email is not configured. Set RESEND_API_KEY, or WhatsApp +27 721 172 942.",
    };
  } catch (err) {
    console.error("magic link prepare failed", err);
    return {
      error:
        "We could not send a sign-in link. Try again, or WhatsApp +27 721 172 942.",
    };
  }
}
