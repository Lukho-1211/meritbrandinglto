import { Suspense } from "react";
import { connection } from "next/server";
import { signOut } from "@/app/portal/actions";
import { SiteShell } from "@/components/SiteShell";
import {
  listBriefsForUser,
  requirePortalUser,
  type PortalBrief,
} from "@/lib/portal";
import { SERVICES, type ServiceId } from "@/lib/services";

export const instant = false;

const SERVICE_LABELS = new Map(SERVICES.map((s) => [s.id, s.label]));

function formatWhen(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("en-ZA", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Africa/Johannesburg",
  }).format(date);
}

function serviceLabels(services: string[]) {
  return services
    .map((id) => SERVICE_LABELS.get(id as ServiceId) ?? id)
    .join(", ");
}

function whatsappHref(brief: PortalBrief) {
  const text = `Hi Merit, I am following up on brief ${brief.id.slice(0, 8)}.`;
  return `https://wa.me/27721172942?text=${encodeURIComponent(text)}`;
}

function PortalFallback() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
      <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">
        Portal
      </h1>
      <p className="mt-3 text-base text-muted">Loading your briefs…</p>
    </div>
  );
}

async function PortalContent() {
  await connection();
  const user = await requirePortalUser();
  let briefs: PortalBrief[] = [];
  let loadError: string | null = null;

  try {
    briefs = await listBriefsForUser(user.id, user.email);
  } catch {
    loadError = "Could not load briefs. Refresh, or WhatsApp +27 721 172 942.";
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">
            Portal
          </h1>
          <p className="mt-2 text-base text-muted">{user.email}</p>
        </div>
        <form action={signOut}>
          <button
            type="submit"
            className="inline-flex rounded-full border border-line px-4 py-2 text-sm font-medium text-ink hover:bg-paper"
          >
            Sign out
          </button>
        </form>
      </div>

      {loadError ? (
        <p
          className="mt-6 rounded-xl border border-merit/25 bg-paper px-4 py-3 text-sm text-muted"
          role="alert"
        >
          {loadError}
        </p>
      ) : null}

      {!loadError && briefs.length === 0 ? (
        <div className="mt-10">
          <p className="text-base leading-relaxed text-muted">
            No briefs yet. Send one from the site and it will show here.
          </p>
          <a
            href="/#contact"
            className="mt-6 inline-flex items-center rounded-full bg-action px-5 py-3 text-sm font-medium text-on-action transition-opacity hover:opacity-90"
          >
            Start a brief
          </a>
        </div>
      ) : null}

      <ul className="mt-8 space-y-4">
        {briefs.map((brief) => (
          <li
            key={brief.id}
            className="rounded-2xl border border-line bg-paper p-5 sm:p-6"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-display text-lg font-semibold text-ink">
                {brief.business || brief.name}
              </h2>
              <time dateTime={brief.created_at} className="text-sm text-muted">
                {formatWhen(brief.created_at)}
              </time>
            </div>
            <p className="mt-1 text-sm text-muted">{brief.name}</p>
            <p className="mt-4 text-sm text-ink">
              {brief.services.length > 0
                ? serviceLabels(brief.services)
                : "No services selected"}
            </p>
            <p className="mt-3 whitespace-pre-wrap text-base leading-relaxed text-ink">
              {brief.message}
            </p>
            <a
              href={whatsappHref(brief)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex text-sm font-medium text-merit hover:opacity-80"
            >
              WhatsApp about this brief
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function PortalPage() {
  return (
    <SiteShell>
      <Suspense fallback={<PortalFallback />}>
        <PortalContent />
      </Suspense>
    </SiteShell>
  );
}
