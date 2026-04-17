type TagProps = {
  children: string;
};

export function Tag({ children }: TagProps) {
  return (
    <span className="inline-flex items-center rounded-sm border border-border bg-bg-elevated/60 px-2 py-0.5 text-[11px] font-medium text-text-secondary transition-colors hover:border-accent/40 hover:text-accent">
      {children}
    </span>
  );
}
