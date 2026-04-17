import { Reveal } from "./Reveal";

type SectionHeaderProps = {
  eyebrow: string;
  heading: string;
  subheading?: string;
  align?: "left" | "center";
};

export function SectionHeader({
  eyebrow,
  heading,
  subheading,
  align = "left",
}: SectionHeaderProps) {
  const alignmentClass = align === "center" ? "text-center mx-auto" : "";

  return (
    <div className={`max-w-2xl ${alignmentClass}`}>
      <Reveal>
        <div className="flex items-center gap-3 text-accent text-[11px] uppercase tracking-[0.3em] font-medium mb-4">
          <span className="h-px w-6 bg-accent/50" />
          {eyebrow}
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-text-primary leading-[1.15]">
          {heading}
        </h2>
      </Reveal>
      {subheading && (
        <Reveal delay={0.16}>
          <p className="mt-3 text-text-secondary leading-editorial text-sm md:text-base">
            {subheading}
          </p>
        </Reveal>
      )}
    </div>
  );
}
