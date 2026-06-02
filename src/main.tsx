import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { App } from "./App";
import "./index.css";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// The page is pre-rendered to static HTML at build time, so hydrate that
// markup instead of throwing it away. Fall back to a fresh render in dev,
// where index.html ships an empty root.
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
