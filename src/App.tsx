import { Hero } from "./components/Hero";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Footer } from "./components/Footer";
import { ScrollProgress } from "./components/ScrollProgress";

export function App() {
  return (
    <div className="relative min-h-screen bg-bg-primary text-text-primary">
      <ScrollProgress />
      <main>
        <Hero />
        <Experience />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}
