import { Suspense } from "react";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { LoginForm } from "@/app/login/login-form";
import { SiteShell } from "@/components/SiteShell";
import { getCurrentPortalUser } from "@/lib/portal";
import { supabaseBrowserConfigured } from "@/lib/supabase/env";

export const instant = false;

type LoginPageProps = {
  searchParams: Promise<{ email?: string; error?: string }>;
};

function errorCopy(code?: string) {
  if (code === "auth") {
    return "That sign-in link is invalid or has expired. Request a new one.";
  }
  if (code === "config") {
    return "Login is not configured. Set the public Supabase keys and restart the server.";
  }
  return undefined;
}

function LoginFallback() {
  return (
    <div className="mx-auto w-full max-w-md px-5 py-16 sm:px-8 sm:py-20">
      <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">
        Your portal
      </h1>
      <p className="mt-3 text-base text-muted">Loading…</p>
    </div>
  );
}

async function LoginContent({ searchParams }: LoginPageProps) {
  await connection();
  const params = await searchParams;
  const user = await getCurrentPortalUser();
  if (user) redirect("/portal");

  const configured = supabaseBrowserConfigured();
  const error = configured ? errorCopy(params.error) : errorCopy("config");

  return (
    <div className="mx-auto w-full max-w-md px-5 py-16 sm:px-8 sm:py-20">
      <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">
        Your portal
      </h1>
      <p className="mt-3 text-base leading-relaxed text-muted">
        Enter the email you use on a brief. We send a sign-in link, not a
        password.
      </p>
      <div className="mt-8">
        <LoginForm email={params.email} error={error} />
      </div>
    </div>
  );
}

export default function LoginPage(props: LoginPageProps) {
  return (
    <SiteShell>
      <Suspense fallback={<LoginFallback />}>
        <LoginContent {...props} />
      </Suspense>
    </SiteShell>
  );
}
