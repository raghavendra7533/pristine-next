# Hero Demo Embed — Design Spec

**Date:** 2026-05-05  
**Status:** Approved

---

## Goal

Redesign the Hero section from a centered search-box layout to a Nexla-style two-column split: marketing copy on the left, an embedded animated product demo on the right. The demo runs as a pre-built static Vite app served from `/demo/` and embedded via `<iframe>`.

---

## Scope

Two independent work streams:

1. **`components/Hero.tsx`** — layout redesign in the Next.js landing site
2. **`pristine-demo/src/routes/index.tsx`** — replace all emoji characters with `lucide-react` icons
3. **Build pipeline** — script to build pristine-demo and copy its output to `public/demo/`

---

## 1. Hero Layout (Hero.tsx)

### Structure

Switch from a single centered column to a two-column CSS grid:

```
[left col ~50%]         [right col ~50%]
pill badge              ┌─────────────────────┐
H1                      │  iframe /demo/       │
subhead                 │  (auto-scaling demo) │
CTA row                 └─────────────────────┘
(search box hidden)
```

### Responsive behavior

- `lg:grid-cols-[1fr_1fr]` (≥1024px): two columns side by side
- Below `lg`: single column, left content stacks above the demo iframe
- Hero height: `min-h-screen` on desktop, auto on mobile

### Left column

- Remove `text-center` / `items-center` — switch to `text-left` / `items-start`
- Keep existing pill badge ("Live" with pulsing dot), H1, subhead, and CTA buttons unchanged
- **Search box**: add `hidden` to its wrapper `className`. Do not remove the component — the `/results` route integration is pending backend work. It must remain in the DOM and be trivially re-enabled by removing `hidden`.

### Right column — iframe shell

```tsx
<div className="relative w-full rounded-xl overflow-hidden shadow-[0_0_0_1px_rgba(99,102,241,0.15),0_20px_48px_rgba(0,0,0,0.14)] aspect-[16/10]">
  <iframe
    src="/demo/"
    title="Pristine Data AI product demo"
    className="absolute inset-0 w-full h-full border-0"
    loading="lazy"
  />
</div>
```

- `aspect-[16/10]` matches the demo's 1280×800 design canvas ratio
- The demo's own `ResizeObserver` handles internal scaling — no extra JS needed
- `loading="lazy"` defers iframe load until in viewport
- No scrollbars: the demo sets `overflow: hidden` on its root

---

## 2. pristine-demo — Replace emojis with lucide-react icons

`lucide-react` is already a dependency. Replace every emoji in `src/routes/index.tsx` with the appropriate Lucide icon component at `size={14}` or `size={16}` as fits the context.

### Emoji → Icon mapping

| Location | Emoji | Lucide icon |
|---|---|---|
| Sidebar nav | `▦` (Dashboard) | `LayoutDashboard` |
| Sidebar nav | `📣` (Campaigns) | `Megaphone` |
| Sidebar nav | `👤` (Lead Search) | `UserSearch` |
| Sidebar nav | `≡` (Lists) | `List` |
| Sidebar nav | `▭` (Subscription Hub) | `CreditCard` |
| Sidebar section | `💡` (Opportunity Playbook) | `Lightbulb` |
| Sidebar nav | `👥` (Accounts) | `Users` |
| Sidebar nav | `⚙` (Settings) | `Settings` |
| TopBar | `🔍` | `Search` |
| TopBar | `🌙` | `Moon` |
| SearchState badge | `⚡` | `Zap` |
| SearchState footer | `ⓘ` | `Info` |
| SearchState quick starters | none (remove bullet emoji if any) | — |
| ResultsState header | `📊` (Accounts tab) | `BarChart2` |
| ResultsState header | `👥` (Contacts tab) | `Users` |
| ResultsState filter | `👥` (Persona) | `Users` |
| ResultsState filter | `🏢` (Firmographics) | `Building2` |
| ResultsState filter | `📍` (Locations) | `MapPin` |
| ResultsState filter | `🔑` (Keywords) | `Tag` |
| ResultsState filter | `💼` (Industry) | `Briefcase` |
| ResultsState filter | `📈` (Revenue) | `TrendingUp` |
| ResultsState filter | `💻` (Technographics) | `Monitor` |
| ResultsState filter | `📡` (Signals) | `Radio` |
| ResultsState filter | `💰` (Funding) | `DollarSign` |
| ResultsState filter | `💼` (Job Search) | `Briefcase` |
| ResultsState filter | `≡` (Lists & Exclusions) | `ListFilter` |
| ResultsState preview | `👁` (Live Preview) | `Eye` |
| ResultsState row action | `💬` | `MessageCircle` |
| ProfileState breadcrumb `←` | — | `ChevronLeft` |
| ProfileState `▴` / `▾` expand | — | `ChevronUp` / `ChevronDown` |
| MessageOverlay `»` collapse | — | `ChevronsRight` |
| MessageOverlay `↺` refresh | — | `RotateCcw` |
| ObjectiveStep hint cursor | (typing cursor only — keep as-is) | — |
| GeneratedMessage `✨` tweak | — | `Sparkles` |
| EmailSent checkmark `✓` | — | `Check` |
| ProgressDots | (SVG divs — no emoji) | — |

### Expand/collapse chevrons (▴ / ▾)

The filter panel expand/collapse currently uses inline string characters. Replace with:
```tsx
{isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
```

---

## 3. Build Pipeline

### New npm script in root `package.json`

```json
"build:demo": "cd pristine-demo && bun run build && rm -rf ../public/demo && cp -r dist ../public/demo"
```

- Builds the Vite app
- Replaces `public/demo/` entirely with the fresh build
- Run manually before deploying; can be chained into `build` script later

### `.gitignore`

Add `public/demo/` to `.gitignore` — the built output is derived, not source.

---

## Out of scope

- Updating the demo's content/data (contacts, query text, etc.)
- Deploying the demo to a separate domain (approach B — deferred)
- Re-enabling the search box (blocked on backend)
- Any changes to other Hero sections (LogoBar, StackCalculator, etc.)
