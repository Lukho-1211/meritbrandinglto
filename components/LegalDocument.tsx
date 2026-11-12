import type { ReactNode } from "react";
import { SiteShell } from "@/components/SiteShell";
import { SITE } from "@/lib/site";

type LegalDocumentProps = {
  eyebrow: string;
  title: string;
  lede: string;
  children: ReactNode;
};

export function LegalDocument({ eyebrow, title, lede, children }: LegalDocumentProps) {
  return (
    <SiteShell>
      <main className="flex-1">
        <article className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-merit">
            {eyebrow}
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            {title}
          </h1>
          <span className="mt-5 block h-0.5 w-10 bg-mark" aria-hidden />
          <p className="mt-4 text-sm text-muted">Updated {SITE.updated}</p>
          <p className="mt-6 text-lg leading-relaxed text-muted">{lede}</p>
          <div className="mt-12 space-y-10 border-t border-line pt-10 text-base leading-relaxed text-ink">
            {children}
          </div>
        </article>
      </main>
    </SiteShell>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-muted">{children}</div>
    </section>
  );
}
