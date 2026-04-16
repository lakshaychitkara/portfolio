import { defineConfig, devices } from "playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:3000";

export default defineConfig({
  testDir: "./scripts",
  timeout: 45_000,
  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "desktop",
      use: {
        browserName: "chromium",
        ...devices["Desktop Chrome"],
      },
      testIgnore: ["**/mobile-reliability.spec.mjs"],
    },
    {
      name: "mobile-iphone-13",
      testMatch: ["**/mobile-reliability.spec.mjs"],
      use: {
        browserName: "chromium",
        ...devices["iPhone 13"],
      },
    },
    {
      name: "mobile-pixel-5",
      testMatch: ["**/mobile-reliability.spec.mjs"],
      use: {
        browserName: "chromium",
        ...devices["Pixel 5"],
      },
    },
    {
      name: "tablet-ipad-mini",
      testMatch: ["**/mobile-reliability.spec.mjs"],
      use: {
        browserName: "chromium",
        ...devices["iPad Mini"],
      },
    },
  ],
  webServer: {
    command: "npm run dev -- -H 127.0.0.1 -p 3000",
    url: baseURL,
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
