# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev       # Start dev server at localhost:3000
npm run build     # Static export to /out (next build)
npm run start     # Serve the built output
npm run lint      # Run ESLint
```

This project uses **Next.js 16** (a version with breaking changes — read `node_modules/next/dist/docs/` before writing code). The output is a **static export** (`output: 'export'` in `next.config.ts`), meaning no server-side rendering or API routes — all data must be fetched client-side or at build time.

## Architecture

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Supabase

**Routing:** App Router with file-based routes under `app/`. Each route folder has its own `page.tsx` and optionally `layout.tsx`. Notable routes:
- `/` — main landing page (`app/page.tsx`)
- `/stack-audit` — interactive tool with client state (`app/stack-audit/StackAuditClient.tsx`, wrapped in `<Suspense>`)
- `/stack-audit-embed` — embeddable version of the stack audit tool
- `/blog`, `/compare`, `/integrations`, `/results`, `/about-us`, `/contact-us`, `/privacy`, `/terms` — marketing pages

**Components:** All shared UI lives in `components/`. Page-specific client components (those needing `'use client'`) live alongside their route (e.g., `app/stack-audit/StackAuditClient.tsx`).

**Key components:**
- `Hero` — top-of-page hero section
- `WorkflowComparison` — side-by-side workflow demo
- `StackCalculator` — interactive pricing/ROI calculator (static receipt bill style)
- `ComparisonMatrix` — feature comparison table
- `LogoBar` — customer/integration logo strip
- `PristineDemo` — product demo component
- `ThemeProvider` — wraps the app for dark mode support

**Styling:** Tailwind CSS v4 with PostCSS. Global styles in `app/globals.css`. Font is Manrope (loaded via `next/font/google`). Dark mode uses `dark:` variants throughout.

**Data:**
- `lib/supabase.ts` — Supabase client (uses `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` env vars)
- `lib/blogs.ts` — blog data utilities
- `public/logos/` — logo assets for LogoBar

**Icons:** `lucide-react` and `@iconify/react` are both available.

**Static export constraint:** Because `output: 'export'` is set, images must use `unoptimized: true` (already configured). Do not add server actions, API routes, or dynamic server-side features — they will break the build.
