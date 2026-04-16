import { expect, test } from "playwright/test";
import {
  criticalAboutSelectors,
  mobileQaRoutes,
  mobileQaViewports,
} from "./mobile-qa-matrix.mjs";

const mobileNavTargets = [
  { label: "Projects", path: "/projects" },
  { label: "Lab", path: "/lab" },
  { label: "Resume", path: "/resume" },
  { label: "Contact", path: "/contact" },
];

function formatRouteViewport(route, viewportLabel) {
  return `${route} @ ${viewportLabel}`;
}

async function openMobileMenu(page) {
  const summary = page
    .locator("summary[aria-controls], summary")
    .filter({ hasText: /menu|close/i })
    .first();

  if ((await summary.count()) && (await summary.isVisible())) {
    await summary.click();
    return true;
  }

  const buttonMenu = page.getByRole("button", { name: /menu|close/i }).first();
  if (await buttonMenu.isVisible()) {
    await buttonMenu.click();
    return true;
  }

  return false;
}

function attachErrorCapture(page) {
  const errors = [];
  const onPageError = (error) => errors.push(`pageerror:${error.message}`);
  const onConsole = (message) => {
    if (message.type() === "error") {
      errors.push(`console:${message.text()}`);
    }
  };

  page.on("pageerror", onPageError);
  page.on("console", onConsole);

  return {
    errors,
    detach() {
      page.off("pageerror", onPageError);
      page.off("console", onConsole);
    },
  };
}

test("mobile navigation works with JavaScript enabled", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  for (const target of mobileNavTargets) {
    const mobileMenuOpened = await openMobileMenu(page);
    if (mobileMenuOpened) {
      const mobileNav = page.getByRole("navigation", { name: /mobile primary/i });
      await expect(mobileNav).toBeVisible();
      await mobileNav.getByRole("link", { name: target.label }).first().click();
    } else {
      const primaryNav = page.getByRole("navigation", { name: /primary/i }).first();
      await expect(primaryNav).toBeVisible();
      await primaryNav.getByRole("link", { name: target.label }).first().click();
    }
    await page.waitForURL(
      (url) => new URL(url).pathname === target.path,
      { timeout: 10_000 },
    );
    expect(new URL(page.url()).pathname).toBe(target.path);
  }
});

test.describe("no-js navigation", () => {
  test.use({ javaScriptEnabled: false });

  test("mobile navigation works with JavaScript disabled", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    for (const target of [
      { label: "Projects", path: "/projects" },
      { label: "Contact", path: "/contact" },
    ]) {
      const mobileMenuOpened = await openMobileMenu(page);
      if (mobileMenuOpened) {
        await page
          .getByRole("navigation", { name: /mobile primary/i })
          .getByRole("link", { name: target.label })
          .first()
          .click();
      } else {
        await page
          .getByRole("navigation", { name: /primary/i })
          .first()
          .getByRole("link", { name: target.label })
          .first()
          .click();
      }
      await page.waitForLoadState("networkidle");
      expect(new URL(page.url()).pathname).toBe(target.path);
    }
  });
});

test("core routes avoid runtime console/page errors", async ({ page }) => {
  for (const route of mobileQaRoutes) {
    const capture = attachErrorCapture(page);
    await page.goto(route);
    await page.waitForLoadState("networkidle");
    capture.detach();
    expect(capture.errors, `critical runtime errors on ${route}`).toEqual([]);
  }
});

test("core routes avoid horizontal overflow and keep interactive targets >=44px", async ({
  page,
}) => {
  for (const viewport of mobileQaViewports) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });

    for (const route of mobileQaRoutes) {
      await page.goto(route);
      await page.waitForLoadState("networkidle");

      const diagnostics = await page.evaluate(() => {
        const doc = document.documentElement;
        const body = document.body;
        const overflowPx = Math.max(doc.scrollWidth, body?.scrollWidth ?? 0) - window.innerWidth;

        const tooSmall = [];
        const selector =
          "a[href],button,summary,select,input:not([type='hidden']),textarea,[role='button'],[role='tab']";

        for (const node of document.querySelectorAll(selector)) {
          const element = /** @type {HTMLElement} */ (node);
          const style = window.getComputedStyle(element);
          const rect = element.getBoundingClientRect();

          if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0") {
            continue;
          }
          if (rect.width < 1 || rect.height < 1) {
            continue;
          }
          if (element.classList.contains("sr-only")) {
            continue;
          }
          if (element.closest("[aria-hidden='true']")) {
            continue;
          }

          if (rect.width < 44 || rect.height < 44) {
            tooSmall.push({
              tag: element.tagName.toLowerCase(),
              text: (element.textContent ?? "").trim().slice(0, 40),
              width: Number(rect.width.toFixed(1)),
              height: Number(rect.height.toFixed(1)),
            });
            if (tooSmall.length >= 12) {
              break;
            }
          }
        }

        return {
          overflowPx: Number(overflowPx.toFixed(1)),
          tooSmall,
        };
      });

      expect(
        diagnostics.overflowPx,
        `horizontal overflow detected at ${formatRouteViewport(route, viewport.label)}`,
      ).toBeLessThanOrEqual(1);
      expect(
        diagnostics.tooSmall,
        `interactive targets below 44px at ${formatRouteViewport(route, viewport.label)}`,
      ).toEqual([]);
    }
  }
});

test("about critical sections remain visible and non-transparent on mobile", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("domcontentloaded");
  await expect(page.getByRole("heading", { name: "Measured Impact Snapshot" })).toBeVisible();

  for (const selector of criticalAboutSelectors) {
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

test("contact form shows actionable offline feedback on mobile", async ({ page }) => {
  await page.goto("/contact");
  await page.context().setOffline(true);
  await page.fill('input[placeholder="Your name"]', "Offline Tester");
  await page.fill('input[placeholder="you@example.com"]', "offline@example.com");
  await page.fill(
    'textarea[placeholder="Tell me about the role, project scope, or collaboration idea"]',
    "Trying to send this while offline from mobile.",
  );
  await page.getByRole("button", { name: /send message/i }).click();
  await expect(page.getByText(/you appear to be offline/i)).toBeVisible();
});

test("contact form remains responsive under delayed network responses", async ({ page }) => {
  await page.route("**/api/contact", async (route) => {
    await page.waitForTimeout(1100);
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true, message: "Message received." }),
    });
  });

  await page.goto("/contact");
  await page.fill('input[placeholder="Your name"]', "Network Tester");
  await page.fill('input[placeholder="you@example.com"]', "network@example.com");
  await page.fill(
    'textarea[placeholder="Tell me about the role, project scope, or collaboration idea"]',
    "This message verifies delayed network handling on mobile.",
  );

  await page.getByRole("button", { name: /send message/i }).click();
  await expect(page.getByRole("button", { name: /sending/i })).toBeVisible();
  await expect(page.getByText(/message received/i)).toBeVisible();
});
