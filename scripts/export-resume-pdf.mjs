import { spawn } from "node:child_process";
import { access } from "node:fs/promises";
import { chromium } from "@playwright/test";

const port = Number(process.env.RESUME_EXPORT_PORT ?? 3000);
const baseUrl = process.env.RESUME_EXPORT_BASE_URL ?? `http://127.0.0.1:${port}`;
const resumeUrl = `${baseUrl}/resume/print`;
const outputPath = "public/resume.pdf";

async function sleep(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function serverReachable() {
  try {
    const response = await fetch(baseUrl, { signal: AbortSignal.timeout(1000) });
    return response.ok;
  } catch {
    return false;
  }
}

async function waitForServer() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    if (await serverReachable()) {
      return;
    }
    await sleep(1000);
  }

  throw new Error(`Timed out waiting for ${baseUrl}`);
}

async function ensureOutputDirectory() {
  await access("public");
}

async function main() {
  await ensureOutputDirectory();

  let devServer = null;
  if (!(await serverReachable())) {
    devServer = spawn("npm", ["run", "dev", "--", "-H", "127.0.0.1", "-p", String(port)], {
      stdio: "inherit",
      shell: false,
    });
    await waitForServer();
  }

  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 816, height: 1056 } });
    await page.goto(resumeUrl, { waitUntil: "domcontentloaded", timeout: 120_000 });
    await page.waitForTimeout(1000);
    await page.emulateMedia({ media: "print" });
    await page.pdf({
      path: outputPath,
      format: "Letter",
      printBackground: true,
      margin: { top: "0in", right: "0in", bottom: "0in", left: "0in" },
      preferCSSPageSize: true,
    });
    console.log(`Wrote ${outputPath}`);
  } finally {
    await browser.close();
    if (devServer) {
      devServer.kill("SIGTERM");
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
