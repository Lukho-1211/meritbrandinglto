import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { QUESTIONS } from "@/lib/questions";

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
          <span className="mt-5 block h-0.5 w-10 bg-mark" aria-hidden />
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
