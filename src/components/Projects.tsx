import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { Tag } from "./Tag";
import { projectEntries, type ProjectEntry } from "../data/projects";

function ExternalIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-3.5 w-3.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 3h7v7M10 14L21 3M21 14v5a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h5"
      />
    </svg>
  );
}

function getDomain(url?: string): string | undefined {
  if (!url) return undefined;
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return undefined;
  }
}

function CardInner({ project }: { project: ProjectEntry }) {
  const domain = getDomain(project.url);

  return (
    <div className="relative flex h-full flex-col rounded-md border border-border bg-bg-card p-5 md:p-6 shadow-paper transition-all duration-300 group-hover:border-accent/30 group-hover:shadow-[0_18px_40px_-18px_rgba(26,26,24,0.20)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border bg-bg-secondary overflow-hidden">
          {project.logo ? (
            <img
              src={`${import.meta.env.BASE_URL}${project.logo}`}
              alt=""
              className="h-full w-full object-contain p-1.5"
            />
          ) : (
            <span className="text-xl" aria-hidden="true">
              {project.icon}
            </span>
          )}
        </div>
        {project.url && (
          <span
            aria-hidden="true"
            className="inline-flex h-7 w-7 items-center justify-center rounded-sm text-text-muted transition-all group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          >
            <ExternalIcon />
          </span>
        )}
      </div>

      <div className="mt-5">
        <h3 className="text-base md:text-[17px] font-semibold tracking-tight text-text-primary transition-colors group-hover:text-accent">
          {project.name}
        </h3>
        {domain && (
          <div className="mt-0.5 text-[11px] font-mono text-text-muted">
            {domain}
          </div>
        )}
      </div>

      <p className="mt-3 text-sm text-text-secondary leading-editorial">
        {project.description}
      </p>

      <div className="mt-auto pt-5 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: ProjectEntry }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="group h-full"
    >
      {project.url ? (
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`${project.name} — open site`}
          className="block h-full rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <CardInner project={project} />
        </a>
      ) : (
        <CardInner project={project} />
      )}
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative py-20 md:py-24 px-6 md:px-8">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          eyebrow="Selected Work"
          heading="Things I've built."
          subheading="A selection of products I've shipped end-to-end."
        />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {projectEntries.map((project, index) => (
            <Reveal key={project.name} delay={index * 0.06} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
