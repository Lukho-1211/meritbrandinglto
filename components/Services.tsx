import { SERVICES } from "@/lib/services";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ServiceIcon } from "@/components/ServiceIcon";

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-merit">
            Services
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            What we build for businesses that need to show up and stay reachable.
          </h2>
          <span className="mt-5 block h-0.5 w-10 bg-mark" aria-hidden />
        </Reveal>

        <RevealGroup className="mt-10 divide-y divide-line border-y border-line">
          {SERVICES.map((service) => (
            <RevealItem
              key={service.id}
              as="article"
              className="grid gap-3 py-8 sm:grid-cols-[minmax(0,18rem)_1fr] sm:gap-10"
            >
              <h3 className="flex items-start gap-3 font-display text-xl font-semibold text-ink">
                <ServiceIcon id={service.id} />
                <span>{service.title}</span>
              </h3>
              <div className="max-w-2xl">
                <p className="text-base leading-relaxed text-muted">{service.body}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink">
                  Includes {service.includes}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
