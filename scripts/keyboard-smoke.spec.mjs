import { expect, test } from "playwright/test";

const routes = ["/", "/journey", "/projects", "/lab", "/resume", "/contact"];

for (const route of routes) {
  test(`keyboard smoke: ${route}`, async ({ page }) => {
    await page.goto(route);
    await page.keyboard.press("Tab");
    const activeTag = await page.evaluate(() => document.activeElement?.tagName);
    expect(activeTag).toBeTruthy();
  });
}
