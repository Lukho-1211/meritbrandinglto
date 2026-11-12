"use client";

import Image from "next/image";
import { MotionConfig, motion } from "motion/react";
import { useCallback, useState } from "react";
import { BuildSheet } from "@/components/BuildSheet";
import { Contact } from "@/components/Contact";
import { Process } from "@/components/Process";
import { Questions } from "@/components/Questions";
import { Rates } from "@/components/Rates";
import { Services } from "@/components/Services";
import { Studio } from "@/components/Studio";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Work } from "@/components/Work";
import type { ServiceId } from "@/lib/services";

const EASE = [0.22, 1, 0.36, 1] as const;

export function HomePage() {
  const [preselected, setPreselected] = useState<ServiceId[]>([]);

  const onSendBrief = useCallback((selected: ServiceId[]) => {
    setPreselected(selected);
    const el = document.getElementById("contact");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <main id="top" className="flex-1">
        <section className="relative overflow-hidden border-b border-line">
          <div className="absolute inset-0" aria-hidden>
            <Image
              src="/media/hero.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              className="hero-drift object-cover object-center opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-field via-field/88 to-field/50" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-field" />
          </div>

          <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
            <div>
              <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
                Build Fast. Pay Less. Grow Sooner.
              </h1>
              <span className="mt-6 block h-0.5 w-10 bg-mark" aria-hidden />
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                We build digital tools for South African businesses that need to
                look professional online and keep enquiries in one place.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center rounded-full bg-action px-5 py-3 text-sm font-medium text-on-action transition-opacity hover:opacity-90"
                >
                  Start a brief
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center rounded-full border border-line bg-paper/80 px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-merit/40"
                >
                  See services
                </a>
              </div>
            </div>

            <div>
              <BuildSheet onSendBrief={onSendBrief} />
            </div>
          </div>
        </section>

        <motion.section
          className="border-b border-line"
          aria-hidden
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <div className="relative h-40 overflow-hidden sm:h-56 md:h-72">
            <motion.div
              className="absolute inset-0"
              variants={{
                hidden: { clipPath: "inset(100% 0 0 0)" },
                show: {
                  clipPath: "inset(0% 0 0 0)",
                  transition: { duration: 0.8, ease: EASE },
                },
              }}
            >
              <Image
                src="/media/ai-web-development.jpg"
                alt=""
                fill
                sizes="100vw"
                className="object-cover object-center"
              />
            </motion.div>
          </div>
        </motion.section>

        <Services />
        <Rates />
        <Process />
        <Work />
        <Studio />
        <Questions />
        <Contact preselected={preselected} />
      </main>
      <WhatsAppButton />
    </MotionConfig>
  );
}
