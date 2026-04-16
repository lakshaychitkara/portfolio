# Mobile QA Baseline

Captured: April 15, 2026

## Baseline Snapshot

| Check | Status | Notes |
| --- | --- | --- |
| Mobile nav (JS enabled) | Pass | iPhone 13 + Pixel 5 route transitions verified in `npm run test:mobile` |
| Mobile nav (JS disabled) | Pass | No-JS flow validated by mobile reliability suite |
| Horizontal overflow | Pass | All core routes pass at `360`, `390`, `768`, and landscape viewport checks |
| Runtime route errors | Pass | `/lab` hydration/runtime mismatch resolved with SSR-safe WebGL enable flow |
| Tap target compliance | Pass | Primary controls now satisfy `44x44` target checks across audited routes |
| About critical visibility | Pass | Critical selectors stay visible and non-transparent on mobile |

## How To Re-Baseline

1. Run `npm run build`.
2. Run `npm run test:mobile`.
3. Record pass/fail deltas and update this table with route-level notes.
