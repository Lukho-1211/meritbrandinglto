"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, type ReactNode } from "react";
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

const WORK: WorkItem[] = [
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
    name: "Customer Relationship Management (CRM)",
    kind: "Website",
    note: "An enquiry desk site with graphs for new leads, follow-ups, and closed work.",
    outcome: "A team can see what needs a reply without digging through chat threads.",
    alt: "Customer Relationship Management (CRM) enquiry desk website mockup with graphs",
    showDashboard: true,
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
      className="relative h-[8.25rem] w-[4.35rem] shrink-0 overflow-hidden rounded-[0.85rem] border-[3px] border-[#1a3d3a] bg-[#f7f3eb] shadow-sm sm:h-[8.5rem] sm:w-[4.5rem]"
      aria-label={label}
    >
      <div className="absolute inset-x-[28%] top-1 z-10 h-1 rounded-full bg-[#1a3d3a]/60" />
      <div className="flex h-full flex-col px-1.5 pb-1.5 pt-3">{children}</div>
    </div>
  );
}

function ApexPhonePreview() {
  return (
    <PhoneShell label="Apex Surgical Care consultation app preview">
      <div className="flex items-center gap-1">
        <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#0c6e68] font-display text-[0.45rem] font-semibold leading-none text-[#f7f3eb]">
          A
        </span>
        <div className="min-w-0">
          <p className="truncate font-display text-[0.38rem] font-semibold leading-tight tracking-tight text-[#1a3d3a]">
            Apex Surgical
          </p>
          <p className="truncate text-[0.28rem] uppercase tracking-[0.08em] text-[#5a706c]">
            Care
          </p>
        </div>
      </div>

      <p className="mt-1.5 font-display text-[0.48rem] font-semibold leading-tight text-[#1a3d3a]">
        Request a consultation
      </p>
      <p className="mt-0.5 text-[0.32rem] leading-snug text-[#5a706c]">
        Choose a procedure, then send your details.
      </p>

      <ul className="mt-1.5 space-y-0.5">
        {["Hernia repair", "Gallbladder", "Skin lesion"].map((label) => (
          <li
            key={label}
            className="rounded border border-[#c9d5d1] bg-white/70 px-1 py-0.5 text-[0.32rem] leading-none text-[#1a3d3a]"
          >
            {label}
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <div className="rounded bg-[#0c6e68] px-1 py-1 text-center font-display text-[0.34rem] font-semibold leading-none text-[#f7f3eb]">
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
        <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#1a3d5a] font-display text-[0.45rem] font-semibold leading-none text-[#f7f3eb]">
          R
        </span>
        <div className="min-w-0">
          <p className="truncate font-display text-[0.38rem] font-semibold leading-tight tracking-tight text-[#1a3d3a]">
            Riverbend
          </p>
          <p className="truncate text-[0.28rem] uppercase tracking-[0.08em] text-[#5a706c]">
            Physio
          </p>
        </div>
      </div>

      <p className="mt-1.5 font-display text-[0.48rem] font-semibold leading-tight text-[#1a3d3a]">
        Book a session
      </p>
      <p className="mt-0.5 text-[0.32rem] leading-snug text-[#5a706c]">
        Pick a treatment, then send your details.
      </p>

      <ul className="mt-1.5 space-y-0.5">
        {["Injury recovery", "Sports physio", "Post-op care"].map((label) => (
          <li
            key={label}
            className="rounded border border-[#c9d5d1] bg-white/70 px-1 py-0.5 text-[0.32rem] leading-none text-[#1a3d3a]"
          >
            {label}
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <div className="rounded bg-[#1a3d5a] px-1 py-1 text-center font-display text-[0.34rem] font-semibold leading-none text-[#f7f3eb]">
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
      className="flex h-full w-full flex-col bg-[#e8eeeb]"
      aria-label="Customer Relationship Management (CRM) enquiry website mockup"
    >
      <div className="flex shrink-0 items-center gap-1.5 border-b border-[#c3d0cb] bg-[#f7faf8] px-1.5 py-1">
        <div className="flex gap-0.5" aria-hidden>
          <span className="h-1.5 w-1.5 rounded-full bg-[#d9a3a0]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#d4c48a]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#9bb89a]" />
        </div>
        <div className="min-w-0 flex-1 rounded-full border border-[#c3d0cb] bg-white px-2 py-0.5">
          <p className="truncate text-[0.36rem] leading-none text-[#5a706c]">
            desk.meritbranding.co.za/crm
          </p>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col bg-white">
        <header className="flex shrink-0 items-center justify-between gap-2 border-b border-[#e3eeea] px-2 py-1">
          <div className="flex min-w-0 items-center gap-1">
            <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[#0c6e68] font-display text-[0.4rem] font-semibold leading-none text-white">
              M
            </span>
            <div className="min-w-0">
              <p className="truncate font-display text-[0.42rem] font-semibold leading-tight text-[#15242c]">
                Merit Desk
              </p>
              <p className="text-[0.28rem] uppercase leading-tight tracking-[0.04em] text-[#5a706c]">
                Customer Relationship Management (CRM)
              </p>
            </div>
          </div>
          <nav
            className="hidden items-center gap-1.5 text-[0.34rem] text-[#5a706c] sm:flex"
            aria-hidden
          >
            <span className="font-medium text-[#0c6e68]">Dashboard</span>
            <span>Leads</span>
            <span>Follow-ups</span>
          </nav>
          <span className="rounded bg-[#0c6e68] px-1.5 py-0.5 font-display text-[0.34rem] font-semibold leading-none text-white">
            New lead
          </span>
        </header>

        <div className="flex min-h-0 flex-1 flex-col gap-1 p-1.5">
          <div className="flex items-center justify-between gap-2">
            <p className="font-display text-[0.5rem] font-semibold tracking-tight text-[#15242c]">
              Enquiry desk
            </p>
            <span className="rounded bg-[#0c6e68]/12 px-1.5 py-0.5 text-[0.34rem] font-medium uppercase tracking-[0.08em] text-[#0c6e68]">
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
                className="rounded border border-[#c3d0cb] bg-[#f4f7f6] px-1 py-0.5"
              >
                <p className="text-[0.32rem] uppercase tracking-[0.08em] text-[#5a706c]">
                  {stat.label}
                </p>
                <p className="font-display text-[0.62rem] font-semibold leading-none text-[#15242c]">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          <div className="grid min-h-0 flex-1 grid-cols-2 gap-1">
            <div className="flex min-h-0 flex-col rounded border border-[#c3d0cb] bg-[#f4f7f6] p-1">
              <p className="text-[0.32rem] uppercase tracking-[0.08em] text-[#5a706c]">
                Leads by day
              </p>
              <div className="mt-0.5 flex min-h-0 flex-1 items-end gap-0.5 px-0.5 pb-0.5">
                {bars.map((height, index) => (
                  <div
                    key={index}
                    className="flex-1 rounded-sm bg-[#0c6e68]/80"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>

            <div className="flex min-h-0 flex-col rounded border border-[#c3d0cb] bg-[#f4f7f6] p-1">
              <p className="text-[0.32rem] uppercase tracking-[0.08em] text-[#5a706c]">
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
                  stroke="#0c6e68"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {linePoints.map(([x, y], index) => (
                  <circle key={index} cx={x} cy={y} r="1.8" fill="#15242c" />
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
    <article className="work-card flex h-[23.5rem] w-[18rem] shrink-0 flex-col gap-3 rounded-2xl border border-line bg-paper/80 p-3 sm:h-[24.5rem] sm:w-[20rem]">
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
        <p className="mt-1.5 line-clamp-5 text-sm leading-relaxed text-muted">
          {item.note} <span className="text-ink">{item.outcome}</span>
        </p>
      </div>
    </article>
  );
}

function WorkTrack({
  items,
  inert,
}: {
  items: WorkItem[];
  inert?: boolean;
}) {
  return (
    <ul
      className={[
        "work-track flex shrink-0 items-stretch gap-4 pr-4",
        inert ? "work-track-dup" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden={inert || undefined}
    >
      {items.map((item) => (
        <li
          key={`${inert ? "dup" : "main"}-${item.name}`}
          className="flex"
        >
          <WorkCard item={item} />
        </li>
      ))}
    </ul>
  );
}

export function Work() {
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const togglePaused = useCallback(() => {
    setPaused((value) => !value);
  }, []);

  return (
    <section id="work" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto max-w-6xl px-5 pt-16 sm:px-8 sm:pt-20">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-merit">
              Work
            </p>
            <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              A short index of digital work.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
              Selected websites, apps, and Customer Relationship Management (CRM) dashboards from past projects.
              More case detail available on request.
            </p>
          </div>
          {!reduceMotion ? (
            <button
              type="button"
              onClick={togglePaused}
              className="inline-flex items-center rounded-full border border-line bg-paper/80 px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-merit/40"
              aria-pressed={paused}
            >
              {paused ? "Play" : "Pause"}
            </button>
          ) : null}
        </Reveal>
      </div>

      <div
        className={[
          "work-marquee relative mt-10 pb-16 sm:pb-20",
          paused ? "is-paused" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="work-marquee-fade pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-field to-transparent sm:w-16" />
        <div className="work-marquee-fade pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-field to-transparent sm:w-16" />

        <div className="work-marquee-viewport overflow-hidden pl-5 sm:pl-8">
          <div className="work-marquee-rail flex w-max">
            <WorkTrack items={WORK} />
            <WorkTrack items={WORK} inert />
          </div>
        </div>
      </div>
    </section>
  );
}
