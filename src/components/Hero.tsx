import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "../config";
import { stackGroups } from "../data/stack";
import { ScribbleUnderline } from "./ScribbleUnderline";
import { Tag } from "./Tag";

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.99 3.23 9.22 7.71 10.72.56.1.77-.24.77-.54v-2.1c-3.13.68-3.8-1.34-3.8-1.34-.51-1.31-1.25-1.66-1.25-1.66-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1.01 1.73 2.65 1.23 3.3.94.1-.73.4-1.23.72-1.51-2.5-.28-5.13-1.25-5.13-5.57 0-1.23.44-2.24 1.16-3.03-.12-.29-.5-1.43.11-2.98 0 0 .95-.3 3.12 1.16a10.9 10.9 0 015.68 0c2.16-1.46 3.11-1.16 3.11-1.16.62 1.55.23 2.69.11 2.98.72.79 1.16 1.8 1.16 3.03 0 4.33-2.63 5.28-5.14 5.56.41.35.77 1.03.77 2.08v3.08c0 .3.21.65.78.54a10.5 10.5 0 007.7-10.72C23.25 5.48 18.27.5 12 .5z" />
    </svg>
  );
}

function CapIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M22 10L12 5 2 10l10 5 10-5zM6 12v5c3.5 2 8.5 2 12 0v-5"
      />
    </svg>
  );
}

const educationEntries = [
  {
    degree: "Master's",
    field: "Artificial Intelligence",
    school: "National University of Mongolia",
  },
  {
    degree: "Bachelor's",
    field: "Computer Science",
    school: "National University of Mongolia",
  },
];

function EmailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-3.5 w-3.5"
    >
      <rect
        x="9"
        y="9"
        width="11"
        height="11"
        rx="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 15V6a2 2 0 012-2h9"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-3.5 w-3.5"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function StackPanel() {
  return (
    <div className="rounded-md border border-border bg-bg-card p-5 shadow-paper">
      <div className="mb-4 flex items-center gap-3">
        <span className="h-px w-6 bg-accent/50" />
        <h3 className="text-[11px] font-medium uppercase tracking-[0.3em] text-accent">
          Approach &amp; Stack
        </h3>
      </div>
      <div className="space-y-3.5">
        {stackGroups.map((group) => (
          <div key={group.label}>
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-text-muted">
              {group.label}
            </div>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusPanel() {
  return (
    <div className="rounded-md border border-border bg-bg-card p-5 shadow-paper">
      <div className="mb-3 flex items-center gap-3">
        <span className="h-px w-6 bg-accent/50" />
        <h3 className="text-[11px] font-medium uppercase tracking-[0.3em] text-accent">
          Currently
        </h3>
      </div>
      <div className="space-y-2.5 text-sm leading-editorial text-text-secondary">
        <div className="flex items-start gap-2">
          <span
            aria-hidden="true"
            className="relative mt-[0.55rem] flex h-1.5 w-1.5 shrink-0"
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-accent/40" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          <p>
            At <span className="text-text-primary">Chimege</span> — building an agent-orchestration and RAG system.
          </p>
        </div>
        <p className="pl-[14px] text-text-muted">
          Based in Ulaanbaatar · open to remote.
        </p>
      </div>
    </div>
  );
}

type AnimatedHeadingProps = {
  lines: string[];
  className?: string;
};

function AnimatedHeading({ lines, className }: AnimatedHeadingProps) {
  const prefersReducedMotion = useReducedMotion();
  const staggeredTransition = {
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  };

  if (prefersReducedMotion) {
    return (
      <h1 className={className}>
        {lines.map((line, i) => (
          <span key={i} className={i === 1 ? "text-accent" : undefined}>
            {i > 0 && <br />}
            {line}
          </span>
        ))}
      </h1>
    );
  }

  return (
    <motion.h1
      className={className}
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.025, delayChildren: 0.15 }}
    >
      {lines.map((line, lineIdx) => (
        <span
          key={lineIdx}
          className={`inline-block ${lineIdx === 1 ? "text-accent" : ""}`}
        >
          {lineIdx > 0 && <br />}
          {Array.from(line).map((char, i) => (
            <motion.span
              key={`${lineIdx}-${i}`}
              className="inline-block"
              variants={{
                hidden: { opacity: 0, y: "0.4em" },
                visible: { opacity: 1, y: 0 },
              }}
              transition={staggeredTransition}
              style={{ willChange: "transform" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h1>
  );
}

type CursorSpotlightProps = {
  targetRef: React.RefObject<HTMLElement>;
};

function CursorSpotlight({ targetRef }: CursorSpotlightProps) {
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const springX = useSpring(x, { stiffness: 140, damping: 22, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 140, damping: 22, mass: 0.4 });

  useEffect(() => {
    if (prefersReducedMotion) return;
    const onMove = (e: MouseEvent) => {
      const rect = targetRef.current?.getBoundingClientRect();
      if (!rect) return;
      x.set(e.clientX - rect.left);
      y.set(e.clientY - rect.top);
    };
    const onLeave = () => {
      x.set(-1000);
      y.set(-1000);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [prefersReducedMotion, targetRef, x, y]);

  const background = useMotionTemplate`radial-gradient(480px circle at ${springX}px ${springY}px, rgba(255, 250, 235, 0.55), transparent 55%)`;

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{ background, mixBlendMode: "soft-light" }}
    />
  );
}

type AmbientBackgroundProps = {
  sectionRef: React.RefObject<HTMLElement>;
};

function AmbientBackground({ sectionRef }: AmbientBackgroundProps) {
  const prefersReducedMotion = useReducedMotion();
  const animationDuration = prefersReducedMotion ? 0 : 22;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
      style={{ opacity: prefersReducedMotion ? 1 : opacity }}
    >
      <motion.div
        className="absolute -top-24 -left-16 h-[380px] w-[380px] rounded-full bg-[#EADFC7]/70 blur-3xl"
        animate={
          prefersReducedMotion ? undefined : { x: [0, 60, 0], y: [0, 40, 0] }
        }
        transition={{
          duration: animationDuration,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/4 -right-24 h-[400px] w-[400px] rounded-full bg-[#D9D3C2]/50 blur-3xl"
        animate={
          prefersReducedMotion ? undefined : { x: [0, -50, 0], y: [0, -30, 0] }
        }
        transition={{
          duration: animationDuration + 5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-[340px] w-[340px] rounded-full bg-[#F0E6CE]/60 blur-3xl"
        animate={
          prefersReducedMotion ? undefined : { x: [0, 40, 0], y: [0, -20, 0] }
        }
        transition={{
          duration: animationDuration + 8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #1A1A18 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(circle at center, black, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black, transparent 70%)",
        }}
      />
    </motion.div>
  );
}

export function Hero() {
  const [emailCopied, setEmailCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const staggeredTransition = {
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 1500);
    } catch {
      // Silently ignore clipboard errors (older browsers, denied permissions)
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-[88vh] items-center px-6 pb-14 pt-24 md:px-8 md:pb-16 md:pt-28"
    >
      <AmbientBackground sectionRef={sectionRef} />
      <CursorSpotlight targetRef={sectionRef} />

      <div className="relative z-10 mx-auto grid w-full max-w-5xl grid-cols-1 items-start gap-10 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-7">
          <div className="flex items-center gap-5">
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...staggeredTransition, delay: 0.2 }}
              src={siteConfig.photoPath}
              alt={siteConfig.name}
              className="h-24 w-24 shrink-0 rounded-full border border-accent/25 object-cover shadow-paper md:h-32 md:w-32"
            />
            <AnimatedHeading
              lines={["Byambajav", "Munkhbayar"]}
              className="text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.05] tracking-tighter text-text-primary"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...staggeredTransition, delay: 0.28 }}
            className="mt-4 text-base tracking-tight text-text-secondary md:text-lg"
          >
            Senior Software Engineer
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...staggeredTransition, delay: 0.38 }}
            className="mt-5 max-w-xl text-base leading-editorial text-text-primary md:text-lg"
          >
            I build <ScribbleUnderline delay={0.2}>domain-first</ScribbleUnderline> products end-to-end — from government accounting to LLM platforms.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...staggeredTransition, delay: 0.44 }}
            className="mt-3 max-w-xl text-sm leading-editorial text-text-secondary md:text-[15px]"
          >
            Past work spans pharmacy ecommerce, a workforce SaaS for SEPA-zone
            businesses, and — more recently — an LLM platform and AI agents.{" "}
            <ScribbleUnderline delay={0.5}>Clean architecture</ScribbleUnderline>{" "}
            by habit, tech-agnostic by choice.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...staggeredTransition, delay: 0.5 }}
            className="mt-6 flex flex-wrap items-center gap-3"
          >
            <button
              type="button"
              onClick={handleCopyEmail}
              className="group inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-bg-primary shadow-paper transition-all hover:bg-accent-hover hover:shadow-[0_8px_20px_-8px_rgba(26,26,24,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
              aria-label={emailCopied ? "Email copied to clipboard" : "Get in touch — copy email"}
            >
              <AnimatePresence mode="wait" initial={false}>
                {emailCopied ? (
                  <motion.span
                    key="copied"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="inline-flex items-center gap-2"
                  >
                    <CheckIcon />
                    Email copied
                  </motion.span>
                ) : (
                  <motion.span
                    key="cta"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="inline-flex items-center gap-2"
                  >
                    Get in touch
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-md border border-accent/25 px-4 py-2.5 text-sm font-medium text-text-primary transition-colors hover:border-accent/50 hover:bg-accent/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              See projects
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...staggeredTransition, delay: 0.58 }}
            className="mt-8"
          >
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-6 bg-accent/50" />
              <h3 className="text-[11px] font-medium uppercase tracking-[0.3em] text-accent">
                Education
              </h3>
            </div>
            <div className="space-y-2.5">
              {educationEntries.map((edu) => (
                <div key={edu.degree} className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-border text-text-secondary">
                    <CapIcon />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-text-muted">
                      {edu.degree}
                    </span>
                    <span className="text-xs text-text-primary">
                      {edu.field}{" "}
                      <span className="text-text-secondary">· {edu.school}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            id="contact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...staggeredTransition, delay: 0.66 }}
            className="mt-7 scroll-mt-24"
          >
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-6 bg-accent/50" />
              <h3 className="text-[11px] font-medium uppercase tracking-[0.3em] text-accent">
                Contact
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label={emailCopied ? "Email copied" : "Copy email address"}
                className="group relative flex items-center gap-2.5 rounded-md py-2 pl-2 pr-9 text-left transition-colors hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-border text-text-secondary transition-colors group-hover:border-accent/40 group-hover:text-accent">
                  <EmailIcon />
                </span>
                <span className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-text-muted">
                    {emailCopied ? "Copied" : "Email"}
                  </span>
                  <span className="whitespace-nowrap text-xs text-text-primary transition-colors group-hover:text-accent">
                    {siteConfig.email}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted opacity-40 transition-opacity group-hover:text-accent group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {emailCopied ? (
                      <motion.span
                        key="check"
                        initial={{ scale: 0.3, opacity: 0, rotate: -20 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        exit={{ scale: 0.6, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 460, damping: 14 }}
                        className="inline-flex"
                      >
                        <CheckIcon />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="inline-flex"
                      >
                        <CopyIcon />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              </button>
              <a
                href={siteConfig.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-2.5 rounded-md px-2 py-2 transition-colors hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-border text-text-secondary transition-colors group-hover:border-accent/40 group-hover:text-accent">
                  <GitHubIcon />
                </span>
                <span className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-text-muted">
                    GitHub
                  </span>
                  <span className="whitespace-nowrap text-xs text-text-primary transition-colors group-hover:text-accent">
                    {siteConfig.githubUrl.replace(/^https?:\/\//, "")}
                  </span>
                </span>
              </a>
            </div>
          </motion.div>
        </div>

        <div className="space-y-4 md:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...staggeredTransition, delay: 0.2 }}
          >
            <StatusPanel />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...staggeredTransition, delay: 0.28 }}
          >
            <StackPanel />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
