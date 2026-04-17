import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { siteConfig } from "../config";
import { stackGroups } from "../data/stack";

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
    <div className="rounded-md border border-border bg-bg-card shadow-paper p-5">
      <div className="flex items-center gap-2.5 mb-4">
        <span className="h-px w-5 bg-accent/50" />
        <h3 className="text-[11px] uppercase tracking-[0.2em] text-accent font-medium">
          Tech Stack
        </h3>
      </div>
      <div className="space-y-3.5">
        {stackGroups.map((group) => (
          <div key={group.label}>
            <div className="text-[10px] uppercase tracking-[0.18em] text-text-muted font-medium">
              {group.label}
            </div>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center rounded-sm border border-border bg-bg-secondary/60 px-2 py-0.5 text-[11px] text-text-primary"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AmbientBackground() {
  const prefersReducedMotion = useReducedMotion();
  const animationDuration = prefersReducedMotion ? 0 : 22;

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
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
    </div>
  );
}

export function Hero() {
  const [emailCopied, setEmailCopied] = useState(false);

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
      className="relative flex items-center py-14 md:py-16 px-6 md:px-8 min-h-[82vh]"
    >
      <AmbientBackground />

      <div className="relative z-10 max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center">
        <div className="md:col-span-7">
          <div className="flex items-center gap-5">
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...staggeredTransition, delay: 0.2 }}
              src={siteConfig.photoPath}
              alt={siteConfig.name}
              className="h-24 w-24 md:h-32 md:w-32 shrink-0 rounded-full object-cover border border-accent/25 shadow-paper"
            />
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...staggeredTransition, delay: 0.15 }}
              className="text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.05] tracking-tighter text-text-primary"
            >
              Byambajav
              <br />
              <span className="text-accent">Munkhbayar</span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...staggeredTransition, delay: 0.28 }}
            className="mt-4 text-base md:text-lg text-text-secondary tracking-tight"
          >
            Software Engineer
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...staggeredTransition, delay: 0.38 }}
            className="mt-5 max-w-xl text-sm md:text-base text-text-secondary leading-editorial"
          >
            Over the last few years I've worked on government accounting,
            pharmacy ecommerce, a workforce SaaS for SEPA-zone businesses, and
            — more recently — an LLM platform and AI agents. My work starts
            with the <span className="text-text-primary">domain</span>, not
            the framework.{" "}
            <span className="text-text-primary">Clean architecture</span> by
            habit, tech-agnostic by choice.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...staggeredTransition, delay: 0.43 }}
            className="mt-6"
          >
            <div className="flex items-center gap-2.5 mb-3">
              <span className="h-px w-5 bg-accent/50" />
              <h3 className="text-[11px] uppercase tracking-[0.2em] text-accent font-medium">
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
                      <span className="text-text-muted">· {edu.school}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...staggeredTransition, delay: 0.52 }}
            className="mt-7"
          >
            <div className="flex items-center gap-2.5 mb-3">
              <span className="h-px w-5 bg-accent/50" />
              <h3 className="text-[11px] uppercase tracking-[0.2em] text-accent font-medium">
                Contact
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <button
              type="button"
              onClick={handleCopyEmail}
              aria-label={emailCopied ? "Email copied" : "Copy email address"}
              className="relative group flex items-center gap-2.5 pl-2 pr-8 py-1.5 rounded-md transition-colors hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent text-left"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-border text-text-secondary transition-colors group-hover:border-accent/40 group-hover:text-accent">
                <EmailIcon />
              </span>
              <span className="flex flex-col">
                <span className="text-[10px] uppercase tracking-[0.2em] text-text-muted">
                  {emailCopied ? "Copied" : "Email"}
                </span>
                <span className="text-xs text-text-primary whitespace-nowrap transition-colors group-hover:text-accent">
                  {siteConfig.email}
                </span>
              </span>
              <span
                aria-hidden="true"
                className={`absolute top-1.5 right-2 transition-opacity ${
                  emailCopied
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                } text-text-muted group-hover:text-accent`}
              >
                {emailCopied ? <CheckIcon /> : <CopyIcon />}
              </span>
            </button>
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2.5 px-2 py-1.5 rounded-md transition-colors hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-border text-text-secondary transition-colors group-hover:border-accent/40 group-hover:text-accent">
                <GitHubIcon />
              </span>
              <span className="flex flex-col">
                <span className="text-[10px] uppercase tracking-[0.2em] text-text-muted">
                  GitHub
                </span>
                <span className="text-xs text-text-primary whitespace-nowrap transition-colors group-hover:text-accent">
                  {siteConfig.githubUrl.replace(/^https?:\/\//, "")}
                </span>
              </span>
            </a>
            </div>
          </motion.div>
        </div>

        <div className="md:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...staggeredTransition, delay: 0.2 }}
          >
            <StackPanel />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
