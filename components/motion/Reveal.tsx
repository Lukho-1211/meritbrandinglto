"use client";

import { type Variants, motion } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

type RevealTag = "div" | "section" | "article" | "li";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: RevealTag;
  "aria-hidden"?: boolean | "true" | "false";
};

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
  "aria-hidden": ariaHidden,
}: RevealProps) {
  const Component = motion[as];

  return (
    <Component
      className={className}
      aria-hidden={ariaHidden}
      data-reveal=""
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: EASE, delay }}
    >
      {children}
    </Component>
  );
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  baseDelay?: number;
};

export function RevealGroup({
  children,
  className,
  stagger = 0.06,
  baseDelay = 0,
}: RevealGroupProps) {
  return (
    <motion.div
      className={className}
      data-reveal=""
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: stagger,
            delayChildren: baseDelay,
          },
        },
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.div>
  );
}

type RevealItemProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
};

export function RevealItem({
  children,
  className,
  as = "div",
}: RevealItemProps) {
  const Component = motion[as];

  return (
    <Component className={className} data-reveal="" variants={itemVariants}>
      {children}
    </Component>
  );
}

type RuleRevealProps = {
  className?: string;
  delay?: number;
};

/** Top rule that draws left → right once in view. */
export function RuleReveal({ className, delay = 0 }: RuleRevealProps) {
  const ruleClass = ["h-px w-full origin-left bg-line", className]
    .filter(Boolean)
    .join(" ");

  return (
    <motion.div
      className={ruleClass}
      aria-hidden
      data-reveal=""
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55, ease: EASE, delay }}
    />
  );
}
