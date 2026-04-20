import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

export type TerminalCommand = {
  cmd: string;
  output?: ReactNode;
};

type TerminalProps = {
  title?: string;
  prompt?: string;
  commands: TerminalCommand[];
  typingSpeed?: number;
  pauseAfterCommand?: number;
  pauseAfterOutput?: number;
  className?: string;
};

const BODY_BG = "#FFFFFF";
const TITLEBAR_BG = "#F6F2EB";
const TEXT = "#1A1A18";
const SECONDARY = "#4A4843";
const MUTED = "#8A8680";
const DOT = "rgba(26,26,24,0.18)";
const BORDER = "rgba(26,26,24,0.10)";

function BlinkingCursor({ blink }: { blink: boolean }) {
  return (
    <motion.span
      aria-hidden="true"
      className="ml-0.5 inline-block h-[0.95em] w-[0.55em] translate-y-[0.12em] align-baseline"
      style={{ backgroundColor: TEXT }}
      animate={blink ? { opacity: [1, 0] } : { opacity: 1 }}
      transition={
        blink
          ? {
              duration: 0.58,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }
          : { duration: 0 }
      }
    />
  );
}

export function Terminal({
  title = "byambajav@portfolio — zsh",
  prompt = "byambajav@portfolio",
  commands,
  typingSpeed = 42,
  pauseAfterCommand = 280,
  pauseAfterOutput = 520,
  className,
}: TerminalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-10% 0px" });
  const prefersReducedMotion = useReducedMotion();

  const [phase, setPhase] = useState({
    cmdIdx: 0,
    charIdx: 0,
    showingOutput: false,
  });

  useEffect(() => {
    if (!inView) return;
    if (phase.cmdIdx >= commands.length) return;

    const current = commands[phase.cmdIdx];

    if (!phase.showingOutput && phase.charIdx < current.cmd.length) {
      const t = window.setTimeout(() => {
        setPhase((p) => ({ ...p, charIdx: p.charIdx + 1 }));
      }, typingSpeed);
      return () => window.clearTimeout(t);
    }

    if (!phase.showingOutput) {
      const t = window.setTimeout(() => {
        setPhase((p) => ({ ...p, showingOutput: true }));
      }, pauseAfterCommand);
      return () => window.clearTimeout(t);
    }

    const t = window.setTimeout(() => {
      setPhase((p) => ({
        cmdIdx: p.cmdIdx + 1,
        charIdx: 0,
        showingOutput: false,
      }));
    }, pauseAfterOutput);
    return () => window.clearTimeout(t);
  }, [
    phase,
    inView,
    commands,
    typingSpeed,
    pauseAfterCommand,
    pauseAfterOutput,
  ]);

  const isDone = phase.cmdIdx >= commands.length;

  return (
    <div ref={containerRef} className={className}>
      <div
        aria-hidden="true"
        className="overflow-hidden rounded-md shadow-paper"
        style={{ border: `1px solid ${BORDER}` }}
      >
        <div
          className="flex items-center gap-2 px-3.5 py-2"
          style={{
            backgroundColor: TITLEBAR_BG,
            borderBottom: `1px solid ${BORDER}`,
          }}
        >
          <span className="flex gap-1.5">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: DOT }}
            />
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: DOT }}
            />
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: DOT }}
            />
          </span>
          <span
            className="ml-2 flex-1 text-center font-mono text-[11px] tracking-tight"
            style={{ color: MUTED }}
          >
            {title}
          </span>
          <span className="w-[42px]" aria-hidden="true" />
        </div>

        <div
          className="px-4 py-4 font-mono text-[13px] leading-[1.7] md:text-[13.5px]"
          style={{ backgroundColor: BODY_BG, color: TEXT }}
        >
          {commands.map((c, i) => {
            const past = i < phase.cmdIdx;
            const active = i === phase.cmdIdx && !isDone;
            if (!past && !active && !isDone) return null;

            const shownCmd =
              past || isDone ? c.cmd : c.cmd.slice(0, phase.charIdx);
            const showOutput = past || isDone || phase.showingOutput;
            const cursorMidType = active && !phase.showingOutput;
            const cursorAtEnd = active && phase.showingOutput && !c.output;
            const blink = !prefersReducedMotion;

            return (
              <div key={i} className="mb-2 last:mb-0">
                <div>
                  <span style={{ color: SECONDARY }}>{prompt}</span>
                  <span style={{ color: MUTED }}>:~$ </span>
                  <span>{shownCmd}</span>
                  {cursorMidType && <BlinkingCursor blink={blink} />}
                </div>
                {showOutput && c.output !== undefined && (
                  <div className="mt-1" style={{ color: TEXT }}>
                    {c.output}
                  </div>
                )}
                {cursorAtEnd && <BlinkingCursor blink={blink} />}
              </div>
            );
          })}

          {isDone && (
            <div>
              <span style={{ color: SECONDARY }}>{prompt}</span>
              <span style={{ color: MUTED }}>:~$ </span>
              <BlinkingCursor blink={!prefersReducedMotion} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
