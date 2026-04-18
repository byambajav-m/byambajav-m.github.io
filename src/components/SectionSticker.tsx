type SectionStickerProps = {
  label: string;
};

export function SectionSticker({ label }: SectionStickerProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 left-3 hidden lg:block"
    >
      <div
        className="sticky top-8 text-[10px] uppercase tracking-[0.32em] text-text-muted/70 [writing-mode:vertical-rl]"
        style={{ transform: "rotate(180deg)" }}
      >
        <span className="inline-flex items-center gap-3">
          <span className="h-px w-4 bg-text-muted/40" />
          {label}
        </span>
      </div>
    </div>
  );
}
