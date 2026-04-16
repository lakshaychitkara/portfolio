# Route Performance Budget Sheet

Targets were set on April 14, 2026.

| Route | LCP Target | CLS Target | INP Target | UX Interaction Goal | Notes |
| --- | --- | --- | --- | --- | --- |
| `/` | `< 2.8s` | `< 0.1` | `< 200ms` | Hero CTA reachable in 2 taps | Heavy content density managed by section-level motion |
| `/projects` | `< 2.8s` | `< 0.1` | `< 200ms` | Domain filter response <= 100ms | Filter remains client-side with lightweight state |
| `/lab` | `< 2.8s` | `< 0.1` | `< 200ms` | No 3D load until explicit user action | 3D viewer is now opt-in and low-power by default |
| `/resume` | `< 2.8s` | `< 0.1` | `< 200ms` | Resume preview deferred | PDF iframe loads only when requested |

## High-Cost Suspects
- Large shared static chunk from framework/runtime.
- 3D rendering dependencies (`three`, `@react-three/fiber`, `@react-three/drei`).
- Client animation layer (`framer-motion`) across repeated sections.
- Resume PDF rendering when preview is enabled.

## How To Re-Baseline
1. Run `npm run build`.
2. Run `npm run perf:baseline`.
3. Review `docs/performance-baseline.md`.
4. If intentional growth is justified, update `performance-budgets.json` with explicit rationale.
