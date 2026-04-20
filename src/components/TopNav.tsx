import { motion, useScroll, useTransform } from "framer-motion";

const navLinks = [
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function TopNav() {
  const { scrollY } = useScroll();
  const backgroundOpacity = useTransform(scrollY, [0, 80], [0, 0.85]);
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 0.1]);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-40 backdrop-blur-[6px]"
      style={{
        backgroundColor: useTransform(
          backgroundOpacity,
          (v) => `rgba(246, 242, 235, ${v})`,
        ),
        borderBottom: "1px solid transparent",
        borderBottomColor: useTransform(
          borderOpacity,
          (v) => `rgba(26, 26, 24, ${v})`,
        ),
      }}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3 md:px-8"
      >
        <a
          href="#hero"
          className="rounded-sm font-mono text-[13px] font-medium tracking-tight text-text-primary transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          byambajav<span className="text-text-muted">.m</span>
        </a>
        <ul className="flex items-center gap-1 md:gap-2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-sm px-2 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:text-[13px] md:px-3"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
