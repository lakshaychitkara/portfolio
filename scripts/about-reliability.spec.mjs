import { expect, test } from "playwright/test";

test("about page critical sections stay visible", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  const criticalSelectors = [
    '[data-about-critical="hero"]',
    '[data-about-critical="evidence"]',
    '[data-about-critical="flagship"]',
    '[data-about-critical="capabilities"]',
  ];

  for (const selector of criticalSelectors) {
    const locator = page.locator(selector).first();
    await expect(locator).toBeVisible();

    const style = await locator.evaluate((node) => {
      const computed = window.getComputedStyle(node);
      return {
        opacity: Number.parseFloat(computed.opacity),
        visibility: computed.visibility,
        display: computed.display,
      };
    });

    expect(style.opacity).toBeGreaterThan(0.01);
    expect(style.visibility).not.toBe("hidden");
    expect(style.display).not.toBe("none");
  }
});

test("about page shows recruiter-first cards without blank states", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  const evidenceCards = page.locator('[data-about-card="evidence"]');
  const flagshipCards = page.locator('[data-about-card="flagship"]');

  expect(await evidenceCards.count()).toBeGreaterThan(0);
  expect(await flagshipCards.count()).toBeGreaterThan(0);

  const firstEvidenceText = await evidenceCards.first().innerText();
  const firstFlagshipText = await flagshipCards.first().innerText();

  expect(firstEvidenceText.trim().length).toBeGreaterThan(20);
  expect(firstFlagshipText.trim().length).toBeGreaterThan(20);
});
