import { readFile, writeFile, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const htmlPath = resolve(root, "dist/index.html");
const serverEntry = resolve(root, "dist-ssr/entry-server.js");

const { render } = await import(serverEntry);
const appHtml = render();

const template = await readFile(htmlPath, "utf-8");
const rootDiv = '<div id="root"></div>';
if (!template.includes(rootDiv)) {
  throw new Error(`Could not find "${rootDiv}" in dist/index.html`);
}

const html = template.replace(rootDiv, `<div id="root">${appHtml}</div>`);
await writeFile(htmlPath, html);

await rm(resolve(root, "dist-ssr"), { recursive: true, force: true });

console.log("Pre-rendered dist/index.html (%d bytes of content)", appHtml.length);
