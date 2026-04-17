export type StackGroup = {
  label: string;
  items: string[];
};

export const stackGroups: StackGroup[] = [
  {
    label: "Architecture & Design",
    items: [
      "Clean Architecture",
      "Domain-Driven Design",
      "Microservices",
      "Event-Driven Systems",
    ],
  },
  {
    label: "Backend",
    items: ["Python", "FastAPI", "Go", "Java", "Spring Boot", "Express.js"],
  },
  {
    label: "Frontend",
    items: ["React", "Next.js", "Angular", "TypeScript", "Flutter"],
  },
  {
    label: "Data & Storage",
    items: ["PostgreSQL", "MongoDB", "Weaviate", "Redis", "ClickHouse"],
  },
  {
    label: "AI Integration",
    items: [
      "RAG Systems",
      "LLM Orchestration",
      "Vector Search",
      "Full-Duplex TTS, STT Integration",
    ],
  },
];
