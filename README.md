# Landing Pages Monorepo

Monorepo for landing pages with shared UI components and lp-core utilities. Built with Next.js, Turborepo, pnpm, and shadcn/ui.

## Project structure

```
landing-pages/
  apps/
    bdmg-components/     # Next.js app (demo/components)
  packages/
    ui/                  # Shared UI components (Button, Navbar, ProgressBar, etc.)
    lp-core/             # Landing-page utilities (TrustedForm, UTM params)
    eslint-config/
    typescript-config/
```

## Getting started

```bash
pnpm install
pnpm dev          # Run all apps in dev mode
pnpm build        # Build all
pnpm lint         # Lint all packages
```

To run or build a single app:

```bash
pnpm dev --filter bdmg-components
pnpm build --filter bdmg-components
```

## Package: @workspace/ui

Shared React components. Import from the `ui` package in your app.

### Button

Button component with types (shape/layout), variants (color style), sizes, and optional custom colors.

**Import**

```tsx
import { Button } from "@workspace/ui/components/button"
import type { ButtonProps, ButtonType, ButtonVariant, ButtonSize } from "@workspace/ui/components/button"
```

**Types (shape)**

| Type | Description |
|------|-------------|
| 1 | Default (rounded, with padding) |
| 2 | Icon button (square, icon-only) |
| 3 | Pill (rounded-full) |
| 4 | Square, no radius |
| 5 | Link style (no padding, underline) |
| 6 | No padding (for custom className, e.g. in Navbar) |

**Variants:** `default` | `destructive` | `outline` | `secondary` | `ghost` | `link`  
**Sizes:** `default` | `sm` | `lg` | `icon`

**Props:** `type`, `variant`, `size`, `backgroundColor`, `foregroundColor`, `className`, `htmlType` (native button type), `asChild` (render as child via Radix Slot).

**Examples**

```tsx
<Button type="1" variant="default">Submit</Button>
<Button type="2" variant="outline" aria-label="Settings"><SettingsIcon /></Button>
<Button type="3" variant="secondary" backgroundColor="#2563eb" foregroundColor="#fff">Pill</Button>
<Button type="5" variant="link">Link style</Button>
```

### Navbar

Top navigation with logo and optional contact button. Uses the shared Button for the contact CTA.

**Import**

```tsx
import { Navbar } from "@workspace/ui/components/navbar"
import type { NavbarProps, NavbarContactButtonProps } from "@workspace/ui/components/navbar"
```

**Navbar types**

| Type | Layout |
|------|--------|
| 1 | Logo left, contact right |
| 2 | Logo only (centered) |

**Props:** `variant` (`default` | `sticky`), `type`, `logo`, `contactText`, `contactHref`, `contactLabel`, `contactTextClassName`, `contactButton`, `className`.

**contactButton** configures the contact Button: `type`, `variant`, `size`, `backgroundColor`, `foregroundColor`, `className`. Use `className` for padding and font (e.g. `"px-4 py-2 text-base font-semibold"`).

**Example**

```tsx
<Navbar
  type="1"
  logo={<Image src="/logo.svg" alt="Logo" width={120} height={40} />}
  contactText="Call us"
  contactHref="#contact"
  contactLabel="(1800) 123 - 4567"
  contactTextClassName="text-base font-semibold"
  contactButton={{
    type: "1",
    variant: "default",
    className: "px-4 py-2 text-base font-semibold",
  }}
/>
```

### ProgressBar

Step progress indicator with multiple visual types.

**Import**

```tsx
import { ProgressBar } from "@workspace/ui/components/progress-bar"
import type { ProgressBarProps } from "@workspace/ui/components/progress-bar"
```

**Types:** 1–6 (quote/icon, percentage inside, minimal bar, segmented, percentage above, stepper with labels).  
**Props:** `type`, `currentStep`, `totalSteps`, `stepLabels` (for type 6), `backgroundColor`, `foregroundColor`, `icon`, `topSlot`, `className`.

**Example**

```tsx
<ProgressBar
  type="6"
  currentStep={2}
  totalSteps={4}
  stepLabels={["Info", "Details", "Review", "Submit"]}
  foregroundColor="#4CAF50"
/>
```

---

To add more shadcn components to the UI package:

```bash
pnpm dlx shadcn@latest add button -c apps/bdmg-components
```

Components are placed in `packages/ui/src/components`. Use them via `@workspace/ui/components/<name>`.

## Package: @workspace/lp-core

Landing-page utilities: TrustedForm and UTM parameter handling (MVC layout).

**Import**

```tsx
import {
  useUtmParams,
  useTrustedForm,
  getCookie,
  setCookie,
  TrustedForm,
} from "@workspace/lp-core"
import type { UtmParams, UtmParamsResult } from "@workspace/lp-core"
```

### useUtmParams

Reads UTM params from the URL and/or cookies. Options: `cookieDays`, `extra` (extra UTM-to-cookie mappings).

```tsx
const { utm, setUtmInCookies } = useUtmParams({ cookieDays: 30 })
// utm: { utm_source, utm_medium, ... }
// setUtmInCookies(): call to persist current URL UTM into cookies
```

### useTrustedForm

Provides the TrustedForm certificate URL for the current page (client-side).

```tsx
const { certificateUrl, loading, error } = useTrustedForm()
```

### TrustedForm (view)

Renders the TrustedForm script and optional hidden certificate input.

```tsx
<TrustedForm />
```

Add `@workspace/lp-core` to your app’s `package.json` dependencies to use it.

## Apps

### bdmg-components

Demo app that uses the shared Navbar, Button, ProgressBar, and (in test) lp-core. Reference for wiring `@workspace/ui` and `@workspace/lp-core` in a Next.js app.

### assuritii

Landing page app (vehicle protection).

## Vercel deployment (monorepo)

Use **one Vercel project per app**. Both point at the same repo; each project sets a different **Root Directory**.

| App               | Vercel project name (example) | Root Directory        |
|-------------------|-------------------------------|------------------------|
| assuritii         | assuritii                     | `apps/assuritii`       |
| bdmg-components    | bdmg-components               | `apps/bdmg-components` |

**Steps**

1. In Vercel: **Add New Project** and import this repo.
2. Set **Root Directory** to the app (e.g. `apps/assuritii`). Enable **Override** so it is saved.
3. Leave **Build Command** and **Output Directory** empty so the app’s `vercel.json` is used (install and build run from monorepo root).
4. Deploy.
5. For the other app, create a **second** Vercel project from the same repo and set its Root Directory to the other app (e.g. `apps/bdmg-components`).

Each app’s `vercel.json` runs `pnpm install` and `turbo run build --filter=<app>` from the repo root so workspace dependencies resolve correctly.

## Tailwind

Apps use Tailwind with `packages/ui/src/styles/globals.css` and are set up to consume the UI package styles. Do not duplicate theme or component styles in the app; extend via `className` or new variants in the UI package as needed.
