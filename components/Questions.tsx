import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

const QUESTIONS = [
  {
    q: "How much does it cost?",
    a: "We reply with a written quote after the brief. A website, an app, and monthly hosting are priced separately, so you can take one or all of them.",
  },
  {
    q: "How long does a build take?",
    a: "Timing is part of that quote. Nothing goes live until you have reviewed the working pages.",
  },
  {
    q: "What do I keep after launch?",
    a: "What you keep, and what we look after, is written into the quote before we start.",
  },
  {
    q: "What does hosting cover?",
    a: "Domain setup, SSL, hosting, and routine updates, so the site stays online and current.",
  },
  {
    q: "What do you do with the details I send?",
    a: "We use your name, business, email, and phone to reply to the brief and follow up. We do not sell them.",
  },
] as const;

export function Questions() {
  return (
    <section id="questions" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-merit">
            Questions
          </p>
          <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Before you call.
          </h2>
        </Reveal>

        <RevealGroup className="mt-10 divide-y divide-line border-y border-line">
          {QUESTIONS.map((item) => (
            <RevealItem
              key={item.q}
              as="article"
              className="grid gap-3 py-8 sm:grid-cols-[minmax(0,16rem)_1fr] sm:gap-10"
            >
              <h3 className="font-display text-xl font-semibold text-ink">
                {item.q}
              </h3>
              <p className="max-w-2xl text-base leading-relaxed text-muted">
                {item.a}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
