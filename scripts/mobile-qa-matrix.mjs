export const mobileQaRoutes = [
  "/",
  "/projects",
  "/projects/legal-assistant-vllm-optimization",
  "/journey",
  "/lab",
  "/resume",
  "/contact",
];

export const mobileQaViewports = [
  { label: "360x780 portrait", width: 360, height: 780 },
  { label: "390x844 portrait", width: 390, height: 844 },
  { label: "768x1024 portrait", width: 768, height: 1024 },
  { label: "820x1180 tablet portrait", width: 820, height: 1180 },
  { label: "844x390 landscape", width: 844, height: 390 },
  { label: "1180x820 tablet landscape", width: 1180, height: 820 },
];

export const mobileQaNetworkProfiles = [
  {
    label: "slow-4g",
    downloadKbps: 1600,
    uploadKbps: 750,
    latencyMs: 150,
  },
  {
    label: "offline",
    offline: true,
  },
];

export const criticalAboutSelectors = [
  '[data-about-critical="hero"]',
  '[data-about-critical="evidence"]',
  '[data-about-critical="flagship"]',
  '[data-about-critical="capabilities"]',
];
