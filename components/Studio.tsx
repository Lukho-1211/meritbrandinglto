import { Reveal } from "@/components/motion/Reveal";

export function Studio() {
  return (
    <section id="studio" className="scroll-mt-24 border-t border-line bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-merit">
            Studio
          </p>
          <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            You will hear from Lukho.
          </h2>
          <span className="mt-5 block h-0.5 w-10 bg-mark" aria-hidden />
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            Merit Branding LTO is an online studio for South African businesses.
            There is no shopfront. Lukho reads every brief, replies, and stays on
            the work through launch. Email{" "}
            <a
              href="mailto:lukho@meritbranding.com"
              className="text-ink underline-offset-2 hover:text-merit hover:underline"
            >
              lukho@meritbranding.com
            </a>
            , or WhatsApp{" "}
            <a
              href="https://wa.me/27721172942"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink underline-offset-2 hover:text-merit hover:underline"
            >
              +27 721 172 942
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
