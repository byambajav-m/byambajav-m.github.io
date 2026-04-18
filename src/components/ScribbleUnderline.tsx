import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type ScribbleUnderlineProps = {
  children: ReactNode;
  delay?: number;
};

export function ScribbleUnderline({
  children,
  delay = 0,
}: ScribbleUnderlineProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <span className="relative inline-block whitespace-nowrap text-text-primary">
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 120 10"
        preserveAspectRatio="none"
        className="pointer-events-none absolute left-0 right-0 -bottom-1.5 h-2 w-full overflow-visible"
      >
        <motion.path
          d="M2 6 C 20 2, 40 9, 60 5 S 100 3, 118 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          className="text-accent/60"
          initial={prefersReducedMotion ? undefined : { pathLength: 0 }}
          whileInView={prefersReducedMotion ? undefined : { pathLength: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
        />
      </svg>
    </span>
  );
}
