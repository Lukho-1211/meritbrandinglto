import { Suspense } from "react";
import { signIn, signOut } from "@/app/desk/actions";
import {
  adminAuthConfigured,
  isAdminSessionValid,
} from "@/lib/admin-session";
import { SERVICES, type ServiceId } from "@/lib/services";
import { getAdminSupabase } from "@/lib/supabase/admin";

type DeskPageProps = {
  searchParams: Promise<{ error?: string }>;
};

type LeadRow = {
  id: string;
  created_at: string;
  name: string;
  business: string | null;
  email: string;
  phone: string | null;
  services: string[];
  message: string;
  source: string;
};

const SERVICE_LABELS = new Map(SERVICES.map((s) => [s.id, s.label]));

function formatWhen(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("en-ZA", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function serviceLabels(services: string[]) {
  return services
    .map((id) => SERVICE_LABELS.get(id as ServiceId) ?? id)
    .join(", ");
}

function LoginForm({
  error,
  configured,
}: {
  error?: string;
  configured: boolean;
}) {
  let message = "";
  if (!configured) {
    message =
      "Desk is not configured. Set ADMIN_PASSWORD and ADMIN_SESSION_SECRET.";
  } else if (error === "1") {
    message = "Wrong password.";
  } else if (error === "config") {
    message =
      "Desk is not configured. Set ADMIN_PASSWORD and ADMIN_SESSION_SECRET.";
  }

  return (
    <div className="mx-auto w-full max-w-sm">
      <h1 className="font-display text-2xl font-semibold text-ink">Desk</h1>
      <p className="mt-2 text-sm text-muted">Sign in to read enquiries.</p>

      {message ? (
        <p
          className="mt-5 rounded-xl border border-merit/25 bg-paper px-4 py-3 text-sm text-muted"
          role="alert"
        >
          {message}
        </p>
      ) : null}

      <form action={signIn} className="mt-6 space-y-4">
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-ink"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            disabled={!configured}
            className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-base text-ink disabled:opacity-60"
          />
        </div>
        <button
          type="submit"
          disabled={!configured}
          className="inline-flex w-full items-center justify-center rounded-full bg-merit px-5 py-3 text-sm font-medium text-paper transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          Open desk
        </button>
      </form>
    </div>
  );
}

async function loadLeads(): Promise<{
  leads: LeadRow[];
  error: string | null;
}> {
  try {
    const supabase = getAdminSupabase();
    const { data, error } = await supabase
      .from("leads")
      .select(
        "id, created_at, name, business, email, phone, services, message, source",
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("desk leads fetch failed", error);
      return { leads: [], error: "Could not load leads." };
    }

    return { leads: (data as LeadRow[]) ?? [], error: null };
  } catch (err) {
    console.error("desk supabase unavailable", err);
    const message = err instanceof Error ? err.message : "";
    if (
      message.includes("SUPABASE_URL") ||
      message.includes("SUPABASE_SERVICE_ROLE_KEY")
    ) {
      return {
        leads: [],
        error:
          "Database is not configured. Set SUPABASE_SERVICE_ROLE_KEY in .env.local and restart the server.",
      };
    }
    return { leads: [], error: "Could not reach the database." };
  }
}

function DeskFallback() {
  return (
    <div className="mx-auto w-full max-w-sm">
      <h1 className="font-display text-2xl font-semibold text-ink">Desk</h1>
      <p className="mt-2 text-sm text-muted">Loading…</p>
    </div>
  );
}

async function DeskContent({ searchParams }: DeskPageProps) {
  const params = await searchParams;
  const configured = adminAuthConfigured();
  const signedIn = configured && (await isAdminSessionValid());

  if (!signedIn) {
    return <LoginForm error={params.error} configured={configured} />;
  }

  const { leads, error } = await loadLeads();

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">Desk</h1>
          <p className="mt-1 text-sm text-muted">
            {leads.length === 1
              ? "1 enquiry"
              : `${leads.length} enquiries`}
          </p>
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

      {error ? (
        <p
          className="mt-6 rounded-xl border border-merit/25 bg-paper px-4 py-3 text-sm text-muted"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      {!error && leads.length === 0 ? (
        <p className="mt-8 text-base text-muted">No enquiries yet.</p>
      ) : null}

      <ul className="mt-8 space-y-4">
        {leads.map((lead) => (
          <li
            key={lead.id}
            className="rounded-2xl border border-line bg-paper p-5 sm:p-6"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-display text-lg font-semibold text-ink">
                {lead.name}
                {lead.business ? (
                  <span className="font-normal text-muted">
                    {" "}
                    · {lead.business}
                  </span>
                ) : null}
              </h2>
              <time
                dateTime={lead.created_at}
                className="text-sm text-muted"
              >
                {formatWhen(lead.created_at)}
              </time>
            </div>

            <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-muted">Email</dt>
                <dd>
                  <a
                    href={`mailto:${lead.email}`}
                    className="text-ink underline-offset-2 hover:text-merit hover:underline"
                  >
                    {lead.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-muted">Phone</dt>
                <dd>
                  {lead.phone ? (
                    <a
                      href={`tel:${lead.phone.replace(/\s+/g, "")}`}
                      className="text-ink underline-offset-2 hover:text-merit hover:underline"
                    >
                      {lead.phone}
                    </a>
                  ) : (
                    <span className="text-muted">—</span>
                  )}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-muted">Services</dt>
                <dd className="text-ink">
                  {lead.services.length > 0
                    ? serviceLabels(lead.services)
                    : "—"}
                </dd>
              </div>
            </dl>

            <p className="mt-4 whitespace-pre-wrap text-base leading-relaxed text-ink">
              {lead.message}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function DeskPage(props: DeskPageProps) {
  return (
    <Suspense fallback={<DeskFallback />}>
      <DeskContent {...props} />
    </Suspense>
  );
}
