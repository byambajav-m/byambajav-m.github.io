export type ProjectEntry = {
  featured?: boolean;
  icon: string;
  logo?: string;
  name: string;
  description: string;
  tags: string[];
  url?: string;
};

export const projectEntries: ProjectEntry[] = [
  {
    featured: true,
    icon: "🏛️",
    name: "e-accounting",
    description:
      "Accounting platform for Mongolia's Ministry of Justice and Internal Affairs. I led the engineering side. A multi-tenant system used by public-sector accountants across the ministry — the kind of software people expect to always be there.",
    tags: [],
  },
  {
    icon: "💊",
    logo: "logos/emonos.png",
    name: "emonos.mn",
    description:
      "Pharmacy ecommerce for Mongolia. I built the storefront, the logistics backend, the rider's mobile app, and an inventory system for pharmacy chains.",
    tags: ["Django", "Next.js", "Flutter", "PostgreSQL"],
    url: "https://emonos.mn",
  },
  {
    icon: "📅",
    logo: "logos/gastromatic.svg",
    name: "Gastromatic",
    description:
      "Shift and workforce management SaaS. Full-stack work on scheduling, payroll-adjacent flows, and the admin tooling around them.",
    tags: ["Java Spring Boot", "React", "PostgreSQL"],
    url: "https://gastromatic.com",
  },
  {
    icon: "✍️",
    logo: "logos/bolorduran.svg",
    name: "BolorDuran",
    description:
      "Mongolian spellchecker as a native macOS app and a Microsoft 365 add-in. Handles spelling and basic grammar for Cyrillic Mongolian.",
    tags: ["Swift", "macOS", "Office Add-in"],
    url: "https://spellcheck.mn",
  },
  {
    icon: "🎙️",
    logo: "logos/chimege-reader.png",
    name: "Chimege Reader",
    description:
      "Mongolian text-to-speech product. Several voices, including ones with emotional expression (happy, sad, angry) — unusual for Mongolian TTS.",
    tags: ["Python", "FastAPI", "TTS"],
    url: "https://reader.chimege.com",
  },
  {
    icon: "🤖",
    logo: "logos/egune.svg",
    name: "platform.egune.com",
    description:
      "Platform for egune, Chimege's in-house Mongolian LLM. Accounts, API keys, usage dashboards, billing, developer docs, and the public OpenAI-compatible API at api.egune.com that developers call from Python, Node.js, or cURL.",
    tags: ["React", "TypeScript", "Go", "Python", "API"],
    url: "https://platform.egune.com",
  },
];
