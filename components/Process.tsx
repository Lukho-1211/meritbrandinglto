import { Reveal, RuleReveal } from "@/components/motion/Reveal";

const STEPS = [
  {
    title: "Brief",
    body: "Tell us what you need — a website, an app, hosting, Customer Relationship Management (CRM), or a mix. We confirm scope, price, and timing before anything is built.",
  },
  {
    title: "Build",
    body: "We design and build with you in the loop. You review working pages and flows before anything goes live.",
  },
  {
    title: "Look after",
    body: "After launch we can host, update, and keep the tools running so customers can still reach you.",
  },
] as const;

export function Process() {
  return (
    <section className="border-t border-line bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-merit">
            How it works
          </p>
          <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Brief, build, look after.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            Price and timing are set in the brief, before we build.
          </p>
        </Reveal>

        <ol className="mt-10 grid gap-8 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <Reveal
              key={step.title}
              as="li"
              delay={index * 0.1}
              className="list-none"
            >
              <RuleReveal className="border-line" delay={index * 0.08} />
              <h3 className="pt-5 font-display text-xl font-semibold text-ink">
                {step.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted">
                {step.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
