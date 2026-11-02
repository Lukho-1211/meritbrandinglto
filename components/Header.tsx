import Image from "next/image";
import { MobileNav } from "@/components/MobileNav";

export function Header() {
  return (
    <header className="border-b border-line bg-field/90 backdrop-blur-sm sticky top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        <a
          href="#top"
          className="flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight text-ink"
        >
          <Image
            src="/brand/logo.png"
            alt="Merit Branding logo"
            width={36}
            height={36}
            className="rounded-md"
            priority
          />
          <span className="hidden sm:inline">Merit Branding</span>
        </a>
        <div className="flex items-center gap-3 sm:gap-4">
          <nav className="hidden items-center gap-5 text-sm text-muted xl:flex" aria-label="Primary">
            <a href="#services" className="hover:text-ink transition-colors">
              Services
            </a>
            <a href="#rates" className="hover:text-ink transition-colors">
              Rates
            </a>
            <a href="#work" className="hover:text-ink transition-colors">
              Work
            </a>
            <a href="#questions" className="hover:text-ink transition-colors">
              Questions
            </a>
            <a href="#contact" className="hover:text-ink transition-colors">
              Contact
            </a>
            <a
              href="tel:+27721172942"
              className="text-ink hover:text-merit transition-colors"
            >
              +27 721 172 942
            </a>
          </nav>
          <MobileNav />
          <a
            href="#contact"
            className="inline-flex shrink-0 items-center rounded-full bg-merit px-4 py-2 text-sm font-medium text-paper transition-opacity hover:opacity-90"
          >
            Start a brief
          </a>
        </div>
      </div>
    </header>
  );
}
