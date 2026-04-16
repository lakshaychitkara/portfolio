# Mobile QA Matrix

Updated: April 15, 2026

## Coverage Matrix

| Dimension | Values |
| --- | --- |
| Routes | `/`, `/projects`, `/projects/[slug]`, `/journey`, `/lab`, `/resume`, `/contact` |
| Viewports | `360x780`, `390x844`, `768x1024`, `820x1180`, `844x390`, `1180x820` |
| Devices (automated) | iPhone 13, Pixel 5, iPad Mini |
| Network Profiles | Slow 4G, Offline |
| JS Modes | JavaScript enabled + JavaScript disabled |

## Required Assertions

1. Mobile navigation works between core routes with JavaScript enabled.
2. Mobile navigation still works with JavaScript disabled (native progressive fallback).
3. No critical runtime errors (`pageerror` / `console.error`) on core routes.
4. No horizontal overflow on target viewports.
5. Interactive controls remain at least `44x44` px.
6. About critical sections remain visible and non-transparent after load.
7. Contact flow returns actionable feedback for offline and delayed network scenarios.

## Repeatable Commands

```bash
npm run test:mobile
npm run test:keyboard-smoke
npm run test:a11y
```

## Manual Spot Checks

1. Open `/` and `/lab` on a physical iOS Safari and Android Chrome device.
2. Verify menu toggle, route switching, and scroll behavior in portrait + landscape.
3. Confirm contact and lab interactions show clear fallback messages under poor connectivity.
