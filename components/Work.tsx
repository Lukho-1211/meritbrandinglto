import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

type WorkItem = {
  name: string;
  kind: string;
  note: string;
  outcome: string;
  image?: string;
  alt: string;
  showApp?: "surgeon" | "physio";
  showDashboard?: boolean;
};

const PRACTICES: WorkItem[] = [
  {
    name: "Dentist",
    kind: "Website",
    note: "A practice site where patients see treatments, the team, and how to book a visit.",
    outcome: "A patient can read the practice and ask for a visit from the page.",
    image: "/work/dentist.jpg",
    alt: "Dentist practice website preview",
  },
  {
    name: "Practitioner",
    kind: "Website",
    note: "A clinic site for a general practitioner, with services, hours, and how to make an appointment.",
    outcome: "Hours and how to book sit on the page, not only in a phone message.",
    image: "/work/practitioner.jpg",
    alt: "General practitioner clinic website preview",
  },
  {
    name: "Surgeon",
    kind: "Website + app",
    note: "A specialist site and patient app explaining procedures and how to request a consultation.",
    outcome:
      "Procedures and a consultation request are clear on the site and in the app before the first call.",
    image: "/work/surgeon.jpg",
    alt: "Surgeon practice website preview",
    showApp: "surgeon",
  },
  {
    name: "Optometrist",
    kind: "Website",
    note: "An eye-care site for exams, lenses, and how to book a sight check.",
    outcome: "A patient can see what the practice offers and book an eye test from the page.",
    image: "/work/optometrist.jpg",
    alt: "Optometrist practice website preview",
  },
  {
    name: "Pharmacy",
    kind: "Website",
    note: "A community pharmacy site for prescriptions, advice, and how to ask the pharmacist.",
    outcome: "Refills and everyday questions have a clear path on the page.",
    image: "/work/pharmacy.jpg",
    alt: "Community pharmacy website preview",
  },
  {
    name: "Physio",
    kind: "Website + app",
    note: "A physiotherapy site and patient app for assessments, recovery plans, and booking a session.",
    outcome:
      "Treatments and a session request are clear on the site and in the app before the first visit.",
    image: "/work/physio.jpg",
    alt: "Physiotherapy clinic website preview",
    showApp: "physio",
  },
  {
    name: "CRM",
    kind: "CRM",
    note: "An enquiry desk with graphs for new leads, follow-ups, and closed work.",
    outcome: "A team can see what needs a reply without digging through chat threads.",
    alt: "CRM enquiry desk mockup with graphs",
    showDashboard: true,
  },
];

const BUSINESSES: WorkItem[] = [
  {
    name: "Online shop",
    kind: "Store",
    note: "A shop site for browsing the edit, checking a price, and placing an order.",
    outcome: "A customer can see what is in stock and buy from the page.",
    image: "/work/shop.jpg",
    alt: "Online shop website preview for a linen store",
  },
  {
    name: "Home improvement",
    kind: "Website",
    note: "A trade site for kitchens, baths, and how to ask for a quote.",
    outcome: "A homeowner can see the work and request a visit from the page.",
    image: "/work/home.jpg",
    alt: "Home improvement company website preview",
  },
  {
    name: "Boutique restaurants & cafes",
    kind: "Website",
    note: "A restaurant site for the menu, the room, and how to book a table.",
    outcome: "A guest can read what is served and reserve from the page.",
    image: "/work/restaurant.jpg",
    alt: "Boutique restaurant website preview",
  },
  {
    name: "Guesthouses & lodging",
    kind: "Website",
    note: "A stay site for rooms, rates, and how to check dates.",
    outcome: "A guest can see the house and send a booking request from the page.",
    image: "/work/guesthouse.jpg",
    alt: "Guesthouse website preview",
  },
  {
    name: "Legal & financial firms",
    kind: "Website",
    note: "A firm site for practice areas and how to book a consult.",
    outcome: "A client can see what the firm handles and request a meeting from the page.",
    image: "/work/legal.jpg",
    alt: "Legal and financial firm website preview",
  },
  {
    name: "Real estate agencies",
    kind: "Website",
    note: "An agency site for listings and how to arrange a viewing.",
    outcome: "A buyer can browse a home and ask for a viewing from the page.",
    image: "/work/estate.jpg",
    alt: "Real estate agency website preview",
  },
];

function PhoneShell({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div
      className="relative h-[8.25rem] w-[4.35rem] shrink-0 overflow-hidden rounded-[0.85rem] border-[3px] border-[#0E2A3D] bg-[#FAF8F4] shadow-sm sm:h-[8.5rem] sm:w-[4.5rem]"
      aria-label={label}
    >
      <div className="absolute inset-x-[28%] top-1 z-10 h-1 rounded-full bg-[#0E2A3D]/60" />
      <div className="flex h-full flex-col px-1.5 pb-1.5 pt-3">{children}</div>
    </div>
  );
}

function ApexPhonePreview() {
  return (
    <PhoneShell label="Apex Surgical Care consultation app preview">
      <div className="flex items-center gap-1">
        <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#1A5F86] font-display text-[0.45rem] font-semibold leading-none text-[#F7F4EE]">
          A
        </span>
        <div className="min-w-0">
          <p className="truncate font-display text-[0.38rem] font-semibold leading-tight tracking-tight text-[#0E2A3D]">
            Apex Surgical
          </p>
          <p className="truncate text-[0.28rem] uppercase tracking-[0.08em] text-[#3E5160]">
            Care
          </p>
        </div>
      </div>

      <p className="mt-1.5 font-display text-[0.48rem] font-semibold leading-tight text-[#0E2A3D]">
        Request a consultation
      </p>
      <p className="mt-0.5 text-[0.32rem] leading-snug text-[#3E5160]">
        Choose a procedure, then send your details.
      </p>

      <ul className="mt-1.5 space-y-0.5">
        {["Hernia repair", "Gallbladder", "Skin lesion"].map((label) => (
          <li
            key={label}
            className="rounded border border-[#DDD6C8] bg-white/70 px-1 py-0.5 text-[0.32rem] leading-none text-[#0E2A3D]"
          >
            {label}
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <div className="rounded bg-[#0E2A3D] px-1 py-1 text-center font-display text-[0.34rem] font-semibold leading-none text-[#F7F4EE]">
          Request consultation
        </div>
      </div>
    </PhoneShell>
  );
}

function PhysioPhonePreview() {
  return (
    <PhoneShell label="Riverbend Physio session booking app preview">
      <div className="flex items-center gap-1">
        <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#0E2A3D] font-display text-[0.45rem] font-semibold leading-none text-[#FAF8F4]">
          R
        </span>
        <div className="min-w-0">
          <p className="truncate font-display text-[0.38rem] font-semibold leading-tight tracking-tight text-[#0E2A3D]">
            Riverbend
          </p>
          <p className="truncate text-[0.28rem] uppercase tracking-[0.08em] text-[#3E5160]">
            Physio
          </p>
        </div>
      </div>

      <p className="mt-1.5 font-display text-[0.48rem] font-semibold leading-tight text-[#0E2A3D]">
        Book a session
      </p>
      <p className="mt-0.5 text-[0.32rem] leading-snug text-[#3E5160]">
        Pick a treatment, then send your details.
      </p>

      <ul className="mt-1.5 space-y-0.5">
        {["Injury recovery", "Sports physio", "Post-op care"].map((label) => (
          <li
            key={label}
            className="rounded border border-[#DDD6C8] bg-white/70 px-1 py-0.5 text-[0.32rem] leading-none text-[#0E2A3D]"
          >
            {label}
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <div className="rounded bg-[#0E2A3D] px-1 py-1 text-center font-display text-[0.34rem] font-semibold leading-none text-[#F7F4EE]">
          Book assessment
        </div>
      </div>
    </PhoneShell>
  );
}

function CrmDashboardPreview() {
  const bars = [42, 68, 55, 82, 74, 90, 63];
  const linePoints = [
    [8, 48],
    [28, 36],
    [48, 40],
    [68, 24],
    [88, 28],
    [108, 16],
    [128, 20],
  ] as const;
  const linePath = linePoints
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x} ${y}`)
    .join(" ");

  return (
    <div
      className="flex h-full w-full flex-col bg-[#F4F1EA]"
      aria-label="CRM enquiry desk mockup"
    >
      <div className="flex shrink-0 items-center gap-1.5 border-b border-[#DDD6C8] bg-[#FAF8F4] px-1.5 py-1">
        <div className="flex gap-0.5" aria-hidden>
          <span className="h-1.5 w-1.5 rounded-full bg-[#d9a3a0]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#d4c48a]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#9bb89a]" />
        </div>
        <div className="min-w-0 flex-1 rounded-full border border-[#DDD6C8] bg-white px-2 py-0.5">
          <p className="truncate text-[0.36rem] leading-none text-[#3E5160]">
            desk.meritbranding.co.za/crm
          </p>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col bg-white">
        <header className="flex shrink-0 items-center justify-between gap-2 border-b border-[#F4F1EA] px-2 py-1">
          <div className="flex min-w-0 items-center gap-1">
            <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[#1A5F86] font-display text-[0.4rem] font-semibold leading-none text-[#F7F4EE]">
              M
            </span>
            <div className="min-w-0">
              <p className="truncate font-display text-[0.42rem] font-semibold leading-tight text-[#0E2A3D]">
                Merit Desk
              </p>
              <p className="text-[0.28rem] uppercase leading-tight tracking-[0.04em] text-[#3E5160]">
                CRM
              </p>
            </div>
          </div>
          <nav
            className="hidden items-center gap-1.5 text-[0.34rem] text-[#3E5160] sm:flex"
            aria-hidden
          >
            <span className="font-medium text-[#1A5F86]">Dashboard</span>
            <span>Leads</span>
            <span>Follow-ups</span>
          </nav>
          <span className="rounded bg-[#0E2A3D] px-1.5 py-0.5 font-display text-[0.34rem] font-semibold leading-none text-[#F7F4EE]">
            New lead
          </span>
        </header>

        <div className="flex min-h-0 flex-1 flex-col gap-1 p-1.5">
          <div className="flex items-center justify-between gap-2">
            <p className="font-display text-[0.5rem] font-semibold tracking-tight text-[#0E2A3D]">
              Enquiry desk
            </p>
            <span className="rounded bg-[#1A5F86]/20 px-1.5 py-0.5 text-[0.34rem] font-medium uppercase tracking-[0.08em] text-[#0E2A3D]">
              This week
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1">
            {[
              { label: "New", value: "24" },
              { label: "Follow-up", value: "11" },
              { label: "Closed", value: "17" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded border border-[#DDD6C8] bg-[#FAF8F4] px-1 py-0.5"
              >
                <p className="text-[0.32rem] uppercase tracking-[0.08em] text-[#3E5160]">
                  {stat.label}
                </p>
                <p className="font-display text-[0.62rem] font-semibold leading-none text-[#0E2A3D]">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          <div className="grid min-h-0 flex-1 grid-cols-2 gap-1">
            <div className="flex min-h-0 flex-col rounded border border-[#DDD6C8] bg-[#FAF8F4] p-1">
              <p className="text-[0.32rem] uppercase tracking-[0.08em] text-[#3E5160]">
                Leads by day
              </p>
              <div className="mt-0.5 flex min-h-0 flex-1 items-end gap-0.5 px-0.5 pb-0.5">
                {bars.map((height, index) => (
                  <div
                    key={index}
                    className="flex-1 rounded-sm bg-[#1A5F86]/80"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>

            <div className="flex min-h-0 flex-col rounded border border-[#DDD6C8] bg-[#FAF8F4] p-1">
              <p className="text-[0.32rem] uppercase tracking-[0.08em] text-[#3E5160]">
                Response trend
              </p>
              <svg
                viewBox="0 0 136 56"
                className="mt-0.5 h-full w-full"
                aria-hidden
              >
                <path
                  d={linePath}
                  fill="none"
                  stroke="#1A5F86"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {linePoints.map(([x, y], index) => (
                  <circle key={index} cx={x} cy={y} r="1.8" fill="#0E2A3D" />
                ))}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkCard({ item }: { item: WorkItem }) {
  return (
    <article className="work-card flex h-full flex-col gap-3 rounded-2xl border border-line bg-paper p-3">
      <div className="flex h-[9.25rem] shrink-0 items-end gap-2.5 sm:h-[9.5rem]">
        <div className="relative h-full min-w-0 flex-1 overflow-hidden rounded-xl border border-line bg-field">
          {item.showDashboard ? (
            <CrmDashboardPreview />
          ) : item.image ? (
            <Image
              src={item.image}
              alt={item.alt}
              fill
              sizes="320px"
              className="object-cover object-top"
            />
          ) : null}
        </div>
        {item.showApp === "surgeon" ? <ApexPhonePreview /> : null}
        {item.showApp === "physio" ? <PhysioPhonePreview /> : null}
      </div>
      <div className="flex min-h-0 flex-1 flex-col px-0.5 pb-1">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="min-w-0 font-display text-lg font-semibold leading-tight text-ink">
            {item.name}
          </h3>
          <span className="shrink-0 text-[0.7rem] uppercase tracking-[0.12em] text-merit">
            {item.kind}
          </span>
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          {item.note} <span className="text-ink">{item.outcome}</span>
        </p>
      </div>
    </article>
  );
}

function WorkGrid({ items }: { items: WorkItem[] }) {
  return (
    <ul className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <li key={item.name}>
          <WorkCard item={item} />
        </li>
      ))}
    </ul>
  );
}

export function Work() {
  return (
    <section id="work" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-merit">
            Work
          </p>
          <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Examples of the sites we build.
          </h2>
          <span className="mt-5 block h-0.5 w-10 bg-mark" aria-hidden />
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            Sample sites for practices and other businesses, so you can see the
            kind of page, shop, app, and CRM we put together. These are
            examples, not client case studies.
          </p>
        </Reveal>

        <h3 className="mt-12 font-display text-sm font-semibold uppercase tracking-[0.14em] text-muted">
          Practices
        </h3>
        <WorkGrid items={PRACTICES} />

        <h3 className="mt-12 font-display text-sm font-semibold uppercase tracking-[0.14em] text-muted">
          Other businesses
        </h3>
        <WorkGrid items={BUSINESSES} />
      </div>
    </section>
  );
}
