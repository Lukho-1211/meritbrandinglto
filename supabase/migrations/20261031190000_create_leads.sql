-- Leads from the Merit Branding contact form.
-- Inserts happen only via the Next.js server using the service role key.
-- RLS is on with no anon/authenticated policies, so the public API cannot read or list leads.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  business text,
  email text not null,
  phone text,
  services text[] not null default '{}',
  message text not null,
  source text not null default 'meritbranding-site'
);

alter table public.leads enable row level security;

-- No policies for anon or authenticated: deny by default for those roles.
-- service_role bypasses RLS and is used only on the server.

revoke all on table public.leads from anon, authenticated;
grant select, insert, update, delete on table public.leads to service_role;
