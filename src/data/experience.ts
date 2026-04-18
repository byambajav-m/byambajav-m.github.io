export type ExperienceEntry = {
  period: string;
  company: string;
  url?: string;
  role: string;
  description: string;
  tags: string[];
};

export const experienceEntries: ExperienceEntry[] = [
  {
    period: "2025 — Present",
    company: "Chimege Systems LLC",
    url: "https://chimege.mn",
    role: "Senior Software Engineer",
    description:
      "Built BolorDuran, a Mongolian spellchecker — native macOS app in Swift and a Microsoft 365 add-in. Shipped Chimege Reader, a Mongolian text-to-speech product. Built platform.egune.com and its public API at api.egune.com — the developer platform for egune, Chimege's in-house Mongolian LLM. Currently designing an agent orchestration and RAG system on top of it.",
    tags: [
      "Python",
      "FastAPI",
      "Go",
      "Swift",
      "Weaviate",
      "PostgreSQL",
      "MongoDB",
      "NLP / TTS",
      "RAG",
    ],
  },
  {
    period: "2024 — 2025",
    company: "CoreMind LLC",
    url: "https://www.coremind.mn",
    role: "Senior Software Engineer",
    description:
      "Built emonos.mn, a pharmacy ecommerce platform used widely in Mongolia. Also shipped the logistics backend, the rider's mobile app, and an inventory system for pharmacy chains.",
    tags: ["Python", "Django", "Next.js", "Flutter", "PostgreSQL"],
  },
  {
    period: "2020 — 2024",
    company: "Erin Systems LLC",
    url: "https://erin.systems",
    role: "Fullstack Engineer · Development Manager",
    description:
      "I was able to contribute to Gastromatic, a workforce management SaaS for SEPA-zone businesses, building its customer-relations and digital-contract microservices. I also led engineering on e-accounting.mojha.gov.mn (accounting platform for Mongolia's Ministry of Justice and Internal Affairs) and contributed to an LMS called Jarvis.",
    tags: [
      "Tech Lead",
      "Java Spring Boot",
      "Microservices",
      "Node.js",
      "Express.js",
      "React",
      "Angular",
      "PostgreSQL",
      "MongoDB",
    ],
  },
];
