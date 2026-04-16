import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const chunksDir = path.join(projectRoot, ".next", "static", "chunks");
const outputDir = path.join(projectRoot, "docs");
const outputFile = path.join(outputDir, "performance-baseline.md");

if (!fs.existsSync(chunksDir)) {
  console.error("Missing .next/static/chunks. Run `npm run build` first.");
  process.exit(1);
}

const files = fs
  .readdirSync(chunksDir, { withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.endsWith(".js"))
  .map((entry) => {
    const filePath = path.join(chunksDir, entry.name);
    return {
      name: entry.name,
      sizeKB: fs.statSync(filePath).size / 1024,
    };
  })
  .sort((a, b) => b.sizeKB - a.sizeKB);

const totalKB = files.reduce((sum, file) => sum + file.sizeKB, 0);
const generatedAt = new Date().toISOString();

const suspects = files.slice(0, 8);

const markdown = [
  "# Performance Baseline",
  "",
  `Generated at: ${generatedAt}`,
  "",
  "## Chunk Summary",
  "",
  `- Total static chunk size: ${totalKB.toFixed(1)} KB`,
  `- Largest chunk: ${(files[0]?.sizeKB ?? 0).toFixed(1)} KB`,
  `- Second largest chunk: ${(files[1]?.sizeKB ?? 0).toFixed(1)} KB`,
  "",
  "## High-Cost Suspects",
  "",
  ...suspects.map((item) => `- ${item.name}: ${item.sizeKB.toFixed(1)} KB`),
  "",
  "## Route Budget Targets",
  "",
  "- `/`: LCP < 2.8s, CLS < 0.1, INP < 200ms",
  "- `/projects`: Filter interaction <= 100ms",
  "- `/lab`: 3D viewer opt-in only, no eager WebGL load",
  "- `/resume`: PDF preview deferred until user action",
  "",
].join("\n");

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputFile, markdown);

console.log(`Wrote baseline report: ${path.relative(projectRoot, outputFile)}`);
