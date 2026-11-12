import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

const RATES = [
  {
    title: "Website, store, or app",
    body: "The quote names one number for the pages, the shop, or the tool. You see it in the reply to your brief, before anything is built.",
  },
  {
    title: "Hosting",
    body: "A separate monthly amount for the domain, SSL, hosting, and routine updates, if you want us to look after it.",
  },
] as const;

export function Rates() {
  return (
    <section id="rates" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-merit">
            Rates
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            A written quote after the brief, before any work starts.
          </h2>
          <span className="mt-5 block h-0.5 w-10 bg-mark" aria-hidden />
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            You can take one part or several. Website, store, app, and hosting are
            priced apart, and the quote names the number before you accept.
          </p>
        </Reveal>

        <RevealGroup className="mt-10 divide-y divide-line border-y border-line">
          {RATES.map((rate) => (
            <RevealItem
              key={rate.title}
              as="article"
              className="grid gap-3 py-8 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-10"
            >
              <h3 className="font-display text-xl font-semibold text-ink">
                {rate.title}
              </h3>
              <p className="max-w-2xl text-base leading-relaxed text-muted">
                {rate.body}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
