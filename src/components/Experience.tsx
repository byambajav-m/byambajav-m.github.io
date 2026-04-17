import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { Tag } from "./Tag";
import { experienceEntries } from "../data/experience";


export function Experience() {
  return (
    <section
      id="experience"
      className="relative py-20 md:py-24 px-6 md:px-8 bg-bg-secondary/60"
    >
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          eyebrow="Experience"
          heading="Where I've worked."
        />

        <div className="relative mt-10 md:mt-12 pl-8 md:pl-10">
          <div
            className="absolute left-2 md:left-3 top-2 bottom-0 w-px bg-gradient-to-b from-accent/40 via-border to-transparent"
            aria-hidden="true"
          />

          <ol className="space-y-10">
            {experienceEntries.map((entry, index) => (
              <Reveal
                as="li"
                key={`${entry.company}-${index}`}
                delay={index * 0.08}
              >
                <div className="group relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[27px] md:-left-[33px] top-1.5 flex h-3 w-3 items-center justify-center"
                  >
                    <span className="absolute inset-0 rounded-full border border-accent/50 bg-bg-primary transition-transform group-hover:scale-125" />
                    <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>

                  <div className="text-[11px] uppercase tracking-[0.22em] text-text-muted">
                    {entry.period}
                  </div>

                  <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <h3 className="text-base md:text-lg font-semibold tracking-tight text-text-primary">
                      {entry.role}
                    </h3>
                    <span className="text-text-muted">·</span>
                    {entry.url ? (
                      <a
                        href={entry.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm md:text-base text-accent hover:text-accent-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                      >
                        {entry.company}
                      </a>
                    ) : (
                      <span className="text-sm md:text-base text-accent">{entry.company}</span>
                    )}
                  </div>

                  <p className="mt-3 max-w-2xl text-sm text-text-secondary leading-editorial">
                    {entry.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {entry.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
