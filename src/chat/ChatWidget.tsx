import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import type { PortfolioChatController } from "./usePortfolioChat";

const suggestions = [
  "Summarize your experience in 30 seconds.",
  "Which project best shows your backend skills?",
  "What technologies do you work with?",
  "Tell me about your AI and LLM experience.",
];

function AssistantMark() {
  return (
    <span
      aria-hidden="true"
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-[10px] font-semibold text-bg-primary"
    >
      BM
    </span>
  );
}

function WaitingDots() {
  return (
    <span className="inline-flex items-center gap-1 py-1" aria-label="Writing a response">
      {[0, 1, 2].map((index) => (
        <motion.span
          key={index}
          className="h-1.5 w-1.5 rounded-full bg-text-muted"
          animate={{ opacity: [0.25, 1, 0.25], y: [0, -2, 0] }}
          transition={{ duration: 1, repeat: Infinity, delay: index * 0.14 }}
        />
      ))}
    </span>
  );
}

type Props = {
  chat: PortfolioChatController;
};

export function ChatWidget({ chat }: Props) {
  const [draft, setDraft] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const maxLength = chat.status?.maxMessageChars ?? 800;

  useEffect(() => {
    if (!chat.isOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => inputRef.current?.focus());

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        chat.setIsOpen(false);
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [chat.isOpen, chat.setIsOpen]);

  useEffect(() => {
    if (!chat.isOpen) return;
    messagesEndRef.current?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "end",
    });
  }, [chat.error, chat.isOpen, chat.messages, prefersReducedMotion]);

  const submit = (event?: FormEvent) => {
    event?.preventDefault();
    const message = draft.trim();
    if (!message || chat.isStreaming) return;
    setDraft("");
    void chat.sendMessage(message);
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submit();
    }
  };

  if (!chat.isAvailable) return null;

  return (
    <>
      <AnimatePresence>
        {!chat.isOpen && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => chat.setIsOpen(true)}
            className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-2.5 rounded-full border border-border bg-bg-card px-4 py-3 text-sm font-medium text-text-primary shadow-[0_12px_38px_-16px_rgba(26,26,24,0.35)] transition-all hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-[0_18px_42px_-16px_rgba(26,26,24,0.42)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary md:bottom-6 md:right-6"
            aria-label="Open portfolio assistant"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-20" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Ask about my work
            <span aria-hidden="true" className="font-mono text-xs text-text-muted">↗</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {chat.isOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-text-primary/20 backdrop-blur-[2px] md:bg-transparent md:backdrop-blur-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              className="absolute inset-0 cursor-default md:hidden"
              onClick={() => chat.setIsOpen(false)}
              aria-label="Close portfolio assistant"
              tabIndex={-1}
            />
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="portfolio-chat-title"
              initial={{ opacity: 0, y: 36, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.985 }}
              transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto absolute inset-x-0 bottom-0 flex max-h-[88dvh] min-h-[560px] flex-col overflow-hidden rounded-t-xl border border-border bg-bg-card shadow-[0_28px_90px_-24px_rgba(26,26,24,0.42)] md:bottom-5 md:left-auto md:right-5 md:top-20 md:h-auto md:max-h-none md:min-h-0 md:w-[420px] md:rounded-lg"
            >
              <header className="flex items-center justify-between border-b border-border bg-bg-primary px-4 py-3.5">
                <div className="flex min-w-0 items-center gap-3">
                  <AssistantMark />
                  <div className="min-w-0">
                    <h2 id="portfolio-chat-title" className="truncate font-mono text-xs font-semibold text-text-primary">
                      portfolio.agent
                    </h2>
                    <p className="mt-0.5 flex items-center gap-1.5 text-[10px] text-text-muted">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" aria-hidden="true" />
                      Ready to answer
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {chat.messages.length > 0 && (
                    <button
                      type="button"
                      onClick={chat.newConversation}
                      className="rounded-sm px-2.5 py-1.5 font-mono text-[10px] text-text-secondary transition-colors hover:bg-accent/10 hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      New chat
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => chat.setIsOpen(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-xl font-light leading-none text-text-secondary transition-colors hover:bg-accent/10 hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    aria-label="Close portfolio assistant"
                  >
                    ×
                  </button>
                </div>
              </header>

              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5" aria-live="polite">
                {chat.messages.length === 0 ? (
                  <div className="flex min-h-full flex-col justify-center">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-muted">
                      Ask the portfolio
                    </p>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight text-text-primary">
                      Curious about my work?
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      Ask about my experience, projects, technical background, or education. Answers come from information in this portfolio.
                    </p>
                    <div className="mt-6 grid gap-2">
                      {suggestions.map((suggestion) => (
                        <button
                          type="button"
                          key={suggestion}
                          onClick={() => void chat.sendMessage(suggestion)}
                          className="group flex items-center justify-between gap-3 rounded-md border border-border bg-bg-primary/55 px-3.5 py-3 text-left text-xs leading-relaxed text-text-primary transition-all hover:border-accent/25 hover:bg-bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        >
                          <span>{suggestion}</span>
                          <span aria-hidden="true" className="shrink-0 font-mono text-text-muted transition-transform group-hover:translate-x-0.5">→</span>
                        </button>
                      ))}
                    </div>
                    <p className="mt-5 text-[10px] leading-relaxed text-text-muted">
                      AI-generated answers can make mistakes. For anything important, contact me directly.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {chat.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex items-start gap-2.5 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {message.role === "assistant" && <AssistantMark />}
                        <div
                          className={`max-w-[84%] whitespace-pre-wrap rounded-md px-3.5 py-2.5 text-[13px] leading-relaxed ${
                            message.role === "user"
                              ? "rounded-br-sm bg-accent text-bg-primary"
                              : "rounded-bl-sm border border-border bg-bg-primary/70 text-text-primary"
                          }`}
                        >
                          {message.text || (message.streaming ? <WaitingDots /> : null)}
                          {message.streaming && message.text && (
                            <motion.span
                              aria-hidden="true"
                              className="ml-1 inline-block h-[0.9em] w-1 translate-y-[0.08em] bg-text-muted"
                              animate={{ opacity: [1, 0.2, 1] }}
                              transition={{ duration: 0.9, repeat: Infinity }}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                    {chat.error && (
                      <div role="alert" className="rounded-md border border-amber-900/15 bg-amber-50 px-3.5 py-3 text-xs leading-relaxed text-amber-950">
                        {chat.error}
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>

              <footer className="border-t border-border bg-bg-card px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
                <form onSubmit={submit} className="rounded-md border border-border bg-bg-primary/55 p-2 transition-colors focus-within:border-accent/30 focus-within:bg-bg-primary">
                  <textarea
                    ref={inputRef}
                    rows={1}
                    value={draft}
                    maxLength={maxLength}
                    disabled={chat.isStreaming}
                    onChange={(event) => setDraft(event.target.value)}
                    onKeyDown={handleInputKeyDown}
                    placeholder="Ask about my work…"
                    aria-label="Message the portfolio assistant"
                    className="max-h-28 min-h-[42px] w-full resize-none bg-transparent px-2 py-2 text-sm leading-relaxed text-text-primary outline-none placeholder:text-text-muted disabled:cursor-not-allowed disabled:opacity-60"
                  />
                  <div className="flex items-center justify-between gap-3 px-1">
                    <span className="font-mono text-[9px] text-text-muted">
                      {chat.remainingTurns === null
                        ? "Enter to send · Shift+Enter for a line break"
                        : `${chat.remainingTurns} questions remaining`}
                    </span>
                    {chat.isStreaming ? (
                      <button
                        type="button"
                        onClick={chat.stop}
                        className="flex h-8 items-center gap-1.5 rounded-full border border-border bg-bg-card px-3 font-mono text-[10px] text-text-primary transition-colors hover:border-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        <span aria-hidden="true" className="h-2 w-2 rounded-[2px] bg-text-primary" />
                        Stop
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={!draft.trim()}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-base text-bg-primary transition-all hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
                        aria-label="Send message"
                      >
                        ↑
                      </button>
                    )}
                  </div>
                </form>
              </footer>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
