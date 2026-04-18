import { siteConfig } from "../config";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border px-6 py-6 md:px-8">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-3 md:flex-row md:items-center">
        <p className="text-xs text-text-muted">
          © {currentYear} {siteConfig.name}
        </p>
        <nav className="flex items-center gap-5 text-xs text-text-muted">
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
    </footer>
  );
}
