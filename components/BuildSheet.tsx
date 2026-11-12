"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { SERVICES, buildBriefLine, type ServiceId } from "@/lib/services";

type BuildSheetProps = {
  onSendBrief: (selected: ServiceId[]) => void;
};

export function BuildSheet({ onSendBrief }: BuildSheetProps) {
  const [selected, setSelected] = useState<ServiceId[]>([]);

  const brief = useMemo(() => buildBriefLine(selected), [selected]);

  function toggle(id: ServiceId) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  }

  return (
    <div className="rounded-2xl border border-line bg-paper p-5 shadow-[0_18px_40px_-28px_rgba(0,52,89,0.45)] sm:p-6">
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-merit">
          Build sheet
        </p>
        <p className="text-xs text-muted">{selected.length} selected</p>
      </div>

      <ul className="divide-y divide-line border-y border-line">
        {SERVICES.map((service) => {
          const active = selected.includes(service.id);
          return (
            <li key={service.id}>
              <button
                type="button"
                onClick={() => toggle(service.id)}
                aria-pressed={active}
                className="flex w-full items-center justify-between gap-4 py-3.5 text-left transition-colors hover:bg-field/60"
              >
                <span className="font-display text-base font-medium text-ink sm:text-lg">
                  {service.label}
                </span>
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border text-xs ${
                    active
                      ? "border-ink bg-ink text-on-action"
                      : "border-line bg-field text-transparent"
                  }`}
                  aria-hidden
                >
                  <AnimatePresence initial={false}>
                    {active ? (
                      <motion.span
                        key="check"
                        className="inline-block"
                        initial={{ scale: 0.4, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.4, opacity: 0 }}
                        transition={{
                          duration: 0.2,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        ✓
                      </motion.span>
                    ) : null}
                  </AnimatePresence>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <p
        className="mt-5 min-h-[3.5rem] text-base leading-relaxed text-muted transition-opacity"
        aria-live="polite"
      >
        {brief}
      </p>

      <button
        type="button"
        onClick={() => onSendBrief(selected)}
        className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-action px-5 py-3 text-sm font-medium text-on-action transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        disabled={selected.length === 0}
      >
        Send this brief
      </button>
    </div>
  );
}
