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

### Typography Scale

Font family is TBD. The scale below defines size, weight, line-height, and letter-spacing tokens.

| Token | Size | Weight | Line-height | Letter-spacing | Usage |
|---|---|---|---|---|---|
| `heading-1` | 24px → 36px (md) | 700 (bold) | 1.2 | -0.02em (tight) | Page title (h1) |
| `heading-2` | 20px → 24px (md) | 700 (bold) | 1.3 | -0.01em (snug) | Section heading (h2) |
| `heading-3` | 18px → 20px (md) | 600 (semibold) | 1.4 | 0 | Sub-section heading (h3) |
| `heading-4` | 16px | 600 (semibold) | 1.5 | 0 | Card heading, small heading (h4) |
| `body-large` | 16px | 400 (normal) | 1.75 | 0 | Lead paragraph, emphasized body |
| `body-std` | 14px | 400 (normal) | 1.75 | 0 | Default body text |
| `caption` | 12px | 400 (normal) | 1.5 | 0.01em (wide) | Captions, supplementary text |
| `label` | 12px | 600 (semibold) | 1.5 | 0.02em (wider) | Form labels, tags, badges |
| `fine` | 10px | 600 (semibold) | 1.4 | 0.02em (wider) | Fine print (limited use) |

### Usage in Tailwind Classes

Custom font-size tokens are defined in `@theme` inside `global.css` and generate utility classes:

| Tailwind class | Size | Notes |
|---|---|---|
| `text-heading-1` | 24px | Use with `md:text-4xl` for responsive |
| `text-heading-2` | 20px | Use with `md:text-2xl` for responsive |
| `text-heading-3` | 18px | Use with `md:text-xl` for responsive |
| `text-heading-4` | 16px | No responsive scaling needed |
| `text-body-large` | 16px | Lead paragraphs |
| `text-body-std` | 14px | Default body (set on `<body>`) |
| `text-caption` | 12px | Dates, secondary info |
| `text-label` | 12px | Form labels (pair with `font-semibold`) |
| `text-fine` | 10px | Use sparingly; minimum readable size |

### Responsive Heading Pattern

Headings use mobile-first custom tokens, scaling up with Tailwind built-in classes at `md:` breakpoint:

```html
<h1 class="text-heading-1 md:text-4xl font-bold tracking-tight text-heading">...</h1>
<h2 class="text-heading-2 md:text-2xl font-bold tracking-snug text-heading">...</h2>
<h3 class="text-heading-3 md:text-xl font-semibold text-heading">...</h3>
```

### Letter Spacing

No custom letter-spacing tokens are defined. Use Tailwind built-in tracking utilities:

| Tailwind class | Value | Usage |
|---|---|---|
| `tracking-tight` | -0.05em | h1 headings |
| `tracking-snug` | -0.01em | h2 headings (custom, defined in `@theme`) |
| `tracking-normal` | 0 | Default |
| `tracking-wide` | 0.025em | Captions |
| `tracking-wider` | 0.05em | Labels, fine print |

### Rules

- Default body font size is 14px (`text-body-std`), set on `<body>` element
- Heading hierarchy must not skip levels (h1 → h2 → h3, no gaps)
- `text-fine` (10px) should only be used for non-essential decorative text; never for primary content
- Japanese text should not go below 12px (`text-caption`) for readability of kanji
- Prefer semantic tokens (`text-heading-2`) over raw Tailwind sizes (`text-xl`) for consistency
- Weight is NOT baked into font-size tokens; always pair with `font-bold` / `font-semibold` / `font-normal` explicitly

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
- Typography Scale 表の letter-spacing 列に書かれた `(snug)` 等の括弧内名称は説明ラベルであり、Tailwind ユーティリティクラス名と一致するとは限らない。`tracking-snug` は Tailwind ビルトインに存在しないため、`global.css` の `@theme` で `--tracking-snug: -0.01em` として定義した。カスタム tracking が必要な場合は必ず `@theme` に追加すること。
- フォームラベルには `text-label` (12px) ではなく `text-body-std` (14px) + `font-semibold` を使用する。`text-label` はタグ・バッジ等の小さい UI 要素向け。日本語フォームラベルには可読性のため 14px 以上を確保する。
- セクション h2 の共通パターン: `text-heading-2 font-bold tracking-snug text-heading md:text-2xl`。3 箇所以上で使用。将来的に共通コンポーネント化を検討する候補。
