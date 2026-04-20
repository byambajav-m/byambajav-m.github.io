import { siteConfig } from "../config";
import { Terminal, type TerminalCommand } from "./Terminal";

const MUTED = "#8A8680";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const ghDomain = siteConfig.githubUrl.replace(/^https?:\/\//, "");

  const commands: TerminalCommand[] = [
    {
      cmd: 'echo "thanks for scrolling"',
      output: <span>thanks for scrolling</span>,
    },
    {
      cmd: "cat contact.txt",
      output: (
        <div className="space-y-0.5">
          <div>
            <span style={{ color: MUTED }}>email&nbsp;&nbsp;</span>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-text-primary underline underline-offset-4 decoration-border hover:decoration-accent"
            >
              {siteConfig.email}
            </a>
          </div>
          <div>
            <span style={{ color: MUTED }}>github&nbsp;</span>
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-text-primary underline underline-offset-4 decoration-border hover:decoration-accent"
            >
              {ghDomain}
            </a>
          </div>
        </div>
      ),
    },
  ];

  return (
    <footer className="border-t border-border px-6 py-10 md:px-8 md:py-14">
      <div className="mx-auto max-w-5xl">
        <Terminal commands={commands} />

        <div className="sr-only" aria-label="Contact">
          <p>Thanks for scrolling.</p>
          <p>
            Email: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </p>
          <p>
            GitHub: <a href={siteConfig.githubUrl}>{ghDomain}</a>
          </p>
        </div>

        <div className="mt-4 flex flex-col items-start justify-between gap-2 text-xs text-text-secondary md:flex-row md:items-center">
          <p>
            © {currentYear} {siteConfig.name}
          </p>
          <nav className="flex items-center gap-5">
            <button
              onClick={scrollToTop}
              className="link-underline rounded-sm transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Top
            </button>
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="link-underline rounded-sm transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              GitHub
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
