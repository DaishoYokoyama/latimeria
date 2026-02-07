# Design Guidelines

## Color Palette

Defined in `src/styles/global.css` via Tailwind CSS v4 `@theme`.
Colors are extracted from the logo (stained-glass coelacanth design).

### 3-Layer Color Token Architecture

```
Layer 1: Raw Palette (@theme)        — bg-abyss, text-primary etc. (fixed values)
Layer 2: Semantic Tokens (@theme inline) — bg-base, text-body etc. (var() references)
Layer 3: CSS Custom Properties (:root)  — --sem-* variables (change here for mode switch)
```

- **Layer 1** — Fixed palette colors, always available for direct use.
- **Layer 2** — Defined with `@theme inline` so `var()` references pass through to CSS unchanged. These generate Tailwind utility classes (`bg-base`, `text-body`, etc.).
- **Layer 3** — `:root` CSS custom properties (`--sem-*`). To add light mode, add `:root.light` with overridden values.

**Prefer semantic tokens (Layer 2) over raw palette (Layer 1) in components.** Raw palette tokens remain available for one-off decorative use.

### Layer 1: Raw Palette

#### Background (deep-sea gradient, 4 levels)

| Token | Hex | Usage | Tailwind class example |
|-------|-----|-------|------------------------|
| `abyss` | `#060d18` | Deepest — page background | `bg-abyss` |
| `deep` | `#0b1628` | Main background | `bg-deep` |
| `ocean` | `#101e32` | Alternating section background | `bg-ocean` |
| `surface` | `#162d4a` | Card / UI element background | `bg-surface` |

#### Brand (teal from logo)

| Token | Hex | Usage | Tailwind class example |
|-------|-----|-------|------------------------|
| `primary` | `#0891b2` | Main brand color | `text-primary` |
| `primary-light` | `#22d3ee` | Hover / highlight | `text-primary-light` |
| `primary-dark` | `#0e7490` | Pressed / darker accent | `text-primary-dark` |

#### Accent

| Token | Hex | Usage | Tailwind class example |
|-------|-----|-------|------------------------|
| `accent` | `#06b6d4` | CTA buttons / attention | `bg-accent` |
| `accent-light` | `#67e8f9` | Accent hover state | `bg-accent-light` |

#### Text

| Token | Hex | Usage | Tailwind class example |
|-------|-----|-------|------------------------|
| `foreground` | `#e2e8f0` | Body text | `text-foreground` |
| `muted` | `#94a3b8` | Secondary text / captions | `text-muted` |

#### UI

| Token | Hex | Usage | Tailwind class example |
|-------|-----|-------|------------------------|
| `border` | `#1e3a5c` | Borders / dividers | `border-border` |

### Layer 2: Semantic Tokens

| Tailwind class | Usage | Dark value |
|---|---|---|
| `bg-canvas` | Main background | `#0b1628` (deep) |
| `bg-canvas-alt` | Alternating section background | `#060d18` (abyss) |
| `bg-elevated` | Cards / panels | `#162d4a` (surface) |
| `bg-overlay` | Overlays / sidebars | `#101e32` (ocean) |
| `text-body` | Body text | `#e2e8f0` (foreground) |
| `text-body-secondary` | Secondary text | `#94a3b8` (muted) |
| `text-heading` | Headings | `#f1f5f9` |
| `text-link` / `hover:text-link-hover` | Links | `#0891b2` / `#22d3ee` |
| `bg-interactive` / `hover:bg-interactive-hover` | CTA buttons | `#06b6d4` / `#67e8f9` |
| `border-default` | Standard borders | `#1e3a5c` (border) |
| `border-subtle` | Subtle borders | `#0f2744` |
| `ring-focus` | Focus ring | `#22d3ee` |

### Contrast Ratios (WCAG AA)

- `foreground` (#e2e8f0) on `deep` (#0b1628) → ~13:1
- `muted` (#94a3b8) on `deep` (#0b1628) → ~6.5:1
- `primary` (#0891b2) on `deep` (#0b1628) → ~5.2:1 (large text AA)
- `primary-light` (#22d3ee) on `deep` (#0b1628) → ~9:1

### Future: Adding Light Mode

To enable light mode, add a `:root.light` block in `global.css` that overrides the `--sem-*` variables. Toggle the `.light` class on `<html>`. No changes to Layer 1 or Layer 2 are needed.

```css
/* Example — not yet active */
:root.light {
  --sem-bg-base: #ffffff;
  --sem-bg-alt: #f8fafc;
  --sem-text-body: #1e293b;
  /* ... */
}
```

## Typography

> TBD — Japanese font selection required.

Considerations:
- Primary font for body text (Japanese + Latin)
- Heading font (if different from body)
- Font loading strategy (e.g., Google Fonts, self-hosted)

## Spacing

- Use Tailwind default spacing scale
- No custom spacing tokens unless explicitly needed

## Responsive Design

- **Mobile-first** approach
- Breakpoint usage: `md:` (768px), `lg:` (1024px)
- Test all layouts at mobile, tablet, and desktop sizes

## Lessons Learned

- Commit messages must follow Conventional Commits format (`<type>(<scope>): <subject>`). See [Git Rules](git-rules.md) for details.
- Tailwind v4 の `--color-*` トークン名は組み込みユーティリティと衝突しないようにする。`--color-base` は `text-base` (font-size) を上書きするため `--color-canvas` にリネームした。`sm`, `lg`, `xl` なども同様に避けること。
