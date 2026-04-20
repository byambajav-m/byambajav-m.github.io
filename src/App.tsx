import { Hero } from "./components/Hero";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Footer } from "./components/Footer";
import { ScrollProgress } from "./components/ScrollProgress";
import { TopNav } from "./components/TopNav";

export function App() {
  return (
    <div className="relative min-h-screen bg-bg-primary text-text-primary">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:border focus:border-border focus:bg-bg-card focus:px-3 focus:py-2 focus:text-sm focus:text-text-primary focus:shadow-paper focus:outline-none focus:ring-2 focus:ring-accent"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <TopNav />
      <main id="main">
        <Hero />
        <Experience />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}
