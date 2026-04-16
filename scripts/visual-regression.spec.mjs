import { expect, test } from "playwright/test";

const routes = [
  { path: "/", name: "home" },
  { path: "/projects", name: "projects" },
  { path: "/projects/legal-assistant-vllm-optimization", name: "project-detail" },
  { path: "/lab", name: "lab" },
  { path: "/resume", name: "resume" },
  { path: "/contact", name: "contact" },
];

for (const route of routes) {
  test(`visual snapshot: ${route.name}`, async ({ page }) => {
    await page.goto(route.path);
    await page.waitForLoadState("networkidle");

    if (route.path === "/") {
      await expect(page.getByRole("heading", { name: "Measured Impact Snapshot" })).toBeVisible();
      const evidenceCards = page.locator('[data-about-card="evidence"]');
      expect(await evidenceCards.count()).toBeGreaterThan(0);
    }

    await expect(page).toHaveScreenshot(`${route.name}.png`, {
      fullPage: true,
      animations: "disabled",
      maxDiffPixelRatio: 0.02,
    });
  });
}
