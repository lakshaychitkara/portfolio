import { expect, test } from "playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = ["/", "/journey", "/projects", "/lab", "/resume", "/contact"];

for (const route of routes) {
  test(`axe audit: ${route}`, async ({ page }) => {
    await page.goto(route);
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
}
