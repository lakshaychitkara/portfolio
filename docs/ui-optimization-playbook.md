# UI + Optimization Playbook

## UI Consistency Rules
- Use `ButtonLink` variants for all primary/secondary/tertiary navigation actions.
- Prefer `card-surface` and `card-surface-muted` wrappers over ad-hoc panel styles.
- Keep headings concise: one promise sentence + one supporting sentence.
- Use proof badges (`chip`) for quick scan metadata instead of long inline prose.

## Motion Rules
- Default to section-level reveal animations.
- Respect `prefers-reduced-motion`; avoid per-item animation when dense lists are present.
- For heavy interactive scenes (3D), require explicit user intent before loading.

## Performance Rules
- Use `fetchJson` for network calls with explicit timeout/retry policy.
- Use `dedupeKey` when identical requests can happen on mount or quick route revisit.
- Keep expensive client components behind dynamic import or user-triggered render.
- Defer heavyweight embeds (PDF, 3D, large media) until user intent is clear.

## Accessibility Rules
- Keep skip-link and main landmark intact.
- Ensure focus-visible styles remain strong after every UI change.
- New interactive controls must have clear `aria-label`/`aria-current` where applicable.
- Run keyboard smoke + axe checks before merging UI changes.
- Enforce mobile control targets at or above 44x44 for primary actions.

## Mobile Reliability Rules
- Keep mobile navigation progressive-enhancement friendly (usable when JS is unavailable).
- Prevent route-level runtime errors on `/lab` and other interactive routes before release.
- Validate the mobile QA matrix in `docs/mobile-qa-matrix.md`.
- Run `npm run test:mobile` after header, form, or interaction changes.

## Release Checklist
1. `npm run lint`
2. `npm run typecheck`
3. `npm run test`
4. `npm run build`
5. `npm run perf:budget`
6. `npm run test:keyboard-smoke`
7. `npm run test:a11y`
8. `npm run test:mobile`
9. `npm run test:about`
10. `npm run test:visual`
