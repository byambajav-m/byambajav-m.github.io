import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "footer" | "li";
};

export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const MotionComponent = motion[as];

  if (prefersReducedMotion) {
    return <MotionComponent className={className}>{children}</MotionComponent>;
  }

  return (
    <MotionComponent
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
    >
      {children}
    </MotionComponent>
  );
}
