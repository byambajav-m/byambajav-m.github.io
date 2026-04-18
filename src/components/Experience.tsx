import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { SectionSticker } from "./SectionSticker";
import { Tag } from "./Tag";
import { experienceEntries } from "../data/experience";

export function Experience() {
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 75%", "end 60%"],
  });
  const fillScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.5,
  });
  const fillOpacity = useTransform(scrollYProgress, [0, 0.02, 1], [0, 1, 1]);

  return (
    <section
      id="experience"
      className="relative bg-bg-secondary/60 px-6 py-20 md:px-8 md:py-24"
    >
      <SectionSticker label="Experience" />
      <div className="mx-auto max-w-5xl">
        <SectionHeader eyebrow="Experience" heading="Where I've worked." />

        <div ref={railRef} className="relative mt-10 pl-8 md:mt-12 md:pl-10">
          <div
            className="absolute bottom-0 left-2 top-2 w-px bg-border md:left-3"
            aria-hidden="true"
          />
          <motion.div
            aria-hidden="true"
            className="absolute left-2 top-2 w-px origin-top bg-gradient-to-b from-accent via-accent/70 to-accent/30 md:left-3"
            style={{
              scaleY: fillScale,
              opacity: fillOpacity,
              bottom: 0,
            }}
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
                    className="absolute -left-[27px] top-1.5 flex h-3 w-3 items-center justify-center md:-left-[33px]"
                  >
                    <span className="absolute inset-0 rounded-full border border-accent/50 bg-bg-primary transition-transform group-hover:scale-125" />
                    <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>

                  <div className="text-[11px] uppercase tracking-[0.22em] text-text-muted">
                    {entry.period}
                  </div>

                  <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <h3 className="text-base font-semibold tracking-tight text-text-primary md:text-lg">
                      {entry.role}
                    </h3>
                    <span className="text-text-muted">·</span>
                    {entry.url ? (
                      <a
                        href={entry.url}
                        target="_blank"
                        rel="noreferrer"
                        className="link-underline rounded-sm text-sm text-accent transition-colors hover:text-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:text-base"
                      >
                        {entry.company}
                      </a>
                    ) : (
                      <span className="text-sm text-accent md:text-base">
                        {entry.company}
                      </span>
                    )}
                  </div>

                  <p className="mt-3 max-w-2xl text-sm leading-editorial text-text-secondary">
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
