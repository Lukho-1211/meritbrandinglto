"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, type ReactNode } from "react";

const LINKS = [
  ["/#services", "Services"],
  ["/#rates", "Rates"],
  ["/#work", "Work"],
  ["/#questions", "Questions"],
  ["/#contact", "Contact"],
] as const;

export function MobileNav({ children }: { children?: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative xl:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center rounded-full border border-line bg-paper/80 px-3 py-2 text-sm font-medium text-ink"
      >
        Menu
      </button>
      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-nav"
            aria-label="Primary"
            className="absolute right-0 z-50 mt-2 w-56 rounded-2xl border border-line bg-paper p-2 shadow-[0_18px_40px_-28px_rgba(0,52,89,0.45)]"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {LINKS.map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm text-ink hover:bg-field"
              >
                {label}
              </a>
            ))}
            <div onClick={() => setOpen(false)}>{children}</div>
            <a
              href="tel:+27721172942"
              className="block rounded-lg px-3 py-2.5 text-sm text-ink hover:bg-field"
            >
              +27 721 172 942
            </a>
            <a
              href="https://wa.me/27721172942"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg px-3 py-2.5 text-sm text-merit hover:bg-field"
            >
              WhatsApp
            </a>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
