# Web App (Next.js)

High-impact portfolio frontend built with Next.js App Router, Tailwind CSS, Framer Motion, and React Three Fiber.

## Implemented Routes
- `/` About + narrative homepage
- `/journey` Interactive growth timeline
- `/projects` Filterable project explorer
- `/projects/[slug]` Case study details
- `/lab` 3D + LLM + CV interactive demos
- `/resume` Resume panel + PDF preview
- `/contact` Contact form and profile links

## API Routes
- `POST /api/contact`
- `POST /api/lab/rag`
- `POST /api/lab/cv`
- `POST /api/lab/benchmark`

## Development
```bash
npm install
npm run dev
```

Mobile/LAN dev server:
```bash
npm run dev:lan
```

## Environment
Create `.env.local` as needed:
```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_API_MODE=same-origin
NEXT_PUBLIC_API_BASE_URL=
```

Copy defaults quickly:
```bash
cp .env.example .env.local
```

- `NEXT_PUBLIC_API_MODE=same-origin` (recommended) uses Next.js `/api/*` and works best for mobile/LAN.
- `NEXT_PUBLIC_API_MODE=direct` uses `NEXT_PUBLIC_API_BASE_URL` for direct FastAPI calls.
- `NEXT_PUBLIC_API_MODE=auto` uses direct base URL when reachable and falls back to same-origin when localhost is invalid on mobile.
- Leave `NEXT_PUBLIC_API_BASE_URL` empty unless you explicitly want direct mode.

Local Wi-Fi direct FastAPI example:
```bash
NEXT_PUBLIC_API_MODE=direct
NEXT_PUBLIC_API_BASE_URL=http://192.168.1.24:8000
```

## Validation
```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run perf:baseline
npm run perf:budget
npm run test:mobile
```

## UI Quality Checks
```bash
npm run test:keyboard-smoke
npm run test:a11y
npm run test:mobile
npm run test:about
npm run test:visual
npm run test:lighthouse
```

## Customize
Update your profile and project content in:
- `src/lib/content/profile.ts`
- `src/lib/content/projects.ts`
- `src/lib/content/journey.ts`

Replace resume file:
- `public/resume.pdf`

## Docs
- `docs/performance-budget-sheet.md`
- `docs/ui-optimization-playbook.md`
- `docs/mobile-qa-matrix.md`
- `docs/mobile-qa-baseline.md`
