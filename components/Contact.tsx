"use client";

import type { ServiceId } from "@/lib/services";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/motion/Reveal";

type ContactProps = {
  preselected: ServiceId[];
};

export function Contact({ preselected }: ContactProps) {
  return (
    <section id="contact" className="scroll-mt-24 border-t border-line bg-paper">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <Reveal>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-merit">
            Contact
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Tell us what to build.
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
            Send a brief and we will get back to you. Prefer a quick chat? Call,
            email, or WhatsApp.
          </p>

          <ul className="mt-8 space-y-3 text-base text-ink">
            <li>
              <a
                className="hover:text-merit transition-colors"
                href="mailto:meritbrandinglto@gmail.com"
              >
                meritbrandinglto@gmail.com
              </a>
            </li>
            <li>
              <a
                className="hover:text-merit transition-colors"
                href="tel:+27721172942"
              >
                +27 721 172 942
              </a>
            </li>
            <li>
              <a
                className="inline-flex items-center gap-2 text-merit hover:opacity-80"
                href="https://wa.me/27721172942"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm preselected={preselected} />
        </Reveal>
      </div>
    </section>
  );
}
