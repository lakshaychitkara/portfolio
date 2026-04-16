import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const nextDir = path.join(projectRoot, ".next", "static", "chunks");
const routeStatsFile = path.join(projectRoot, ".next", "diagnostics", "route-bundle-stats.json");
const budgetFile = path.join(projectRoot, "performance-budgets.json");

if (!fs.existsSync(nextDir)) {
  console.error("Missing .next/static/chunks. Run `npm run build` first.");
  process.exit(1);
}

if (!fs.existsSync(budgetFile)) {
  console.error("Missing performance-budgets.json.");
  process.exit(1);
}

const budgets = JSON.parse(fs.readFileSync(budgetFile, "utf8"));
const jsFiles = fs
  .readdirSync(nextDir, { withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.endsWith(".js"))
  .map((entry) => {
    const filePath = path.join(nextDir, entry.name);
    const sizeBytes = fs.statSync(filePath).size;
    return {
      file: entry.name,
      sizeKB: sizeBytes / 1024,
    };
  })
  .sort((a, b) => b.sizeKB - a.sizeKB);

const largest = jsFiles[0]?.sizeKB ?? 0;
const secondLargest = jsFiles[1]?.sizeKB ?? 0;
const total = jsFiles.reduce((sum, file) => sum + file.sizeKB, 0);

const failures = [];

if (largest > budgets.chunkBudgets.maxLargestChunkKB) {
  failures.push(
    `Largest chunk ${largest.toFixed(1)} KB exceeds ${budgets.chunkBudgets.maxLargestChunkKB} KB.`,
  );
}

if (secondLargest > budgets.chunkBudgets.maxSecondLargestChunkKB) {
  failures.push(
    `Second largest chunk ${secondLargest.toFixed(1)} KB exceeds ${budgets.chunkBudgets.maxSecondLargestChunkKB} KB.`,
  );
}

if (total > budgets.chunkBudgets.maxTotalStaticChunksKB) {
  failures.push(
    `Total chunk size ${total.toFixed(1)} KB exceeds ${budgets.chunkBudgets.maxTotalStaticChunksKB} KB.`,
  );
}

if (fs.existsSync(routeStatsFile) && budgets.routeBudgets) {
  const routeStats = JSON.parse(fs.readFileSync(routeStatsFile, "utf8"));
  const routeBudgetEntries = Object.entries(budgets.routeBudgets);

  for (const [route, routeBudget] of routeBudgetEntries) {
    const stats = routeStats.find((entry) => entry.route === route);
    if (!stats) {
      failures.push(`Missing route-bundle stats for ${route}.`);
      continue;
    }

    const firstLoadKB = stats.firstLoadUncompressedJsBytes / 1024;
    if (firstLoadKB > routeBudget.maxFirstLoadUncompressedJsKB) {
      failures.push(
        `Route ${route} first-load JS ${firstLoadKB.toFixed(1)} KB exceeds ${routeBudget.maxFirstLoadUncompressedJsKB} KB.`,
      );
    }
  }
}

console.log("Top chunk suspects:");
for (const file of jsFiles.slice(0, 8)) {
  console.log(`- ${file.file}: ${file.sizeKB.toFixed(1)} KB`);
}

if (fs.existsSync(routeStatsFile)) {
  const routeStats = JSON.parse(fs.readFileSync(routeStatsFile, "utf8"));
  const topRoutes = [...routeStats]
    .sort((a, b) => b.firstLoadUncompressedJsBytes - a.firstLoadUncompressedJsBytes)
    .slice(0, 8);

  console.log("\nRoute first-load JS:");
  for (const route of topRoutes) {
    console.log(
      `- ${route.route}: ${(route.firstLoadUncompressedJsBytes / 1024).toFixed(1)} KB`,
    );
  }
}

if (failures.length > 0) {
  console.error("\nPerformance budget violations:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("\nPerformance budgets are within limits.");
