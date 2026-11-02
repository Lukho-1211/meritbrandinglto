import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

const RATES = [
  {
    title: "Website or app",
    body: "Quoted once we know the pages or the tool. The number comes back with the reply to your brief.",
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
            A written quote after the brief. No public price list.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            You can take one part or several. Website, app, and hosting are priced
            apart so the quote matches what you actually need.
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
