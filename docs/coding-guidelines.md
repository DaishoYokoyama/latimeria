# Coding Guidelines

## Tech Stack

- **Framework**: Astro 5
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite` plugin)
- **Language**: TypeScript (strict mode)

## Directory Structure

```
src/
├── assets/       # Images, SVGs, and other static assets
├── components/   # Reusable Astro components
├── layouts/      # Page layout templates
├── pages/        # Route-based pages (file-based routing)
└── styles/       # Global CSS (Tailwind theme configuration)
```

## Naming Conventions

- **Components**: PascalCase (e.g., `Welcome.astro`, `HeaderNav.astro`)
- **Pages**: kebab-case (e.g., `index.astro`, `about-us.astro`)
- **Assets**: kebab-case (e.g., `background.svg`, `hero-image.png`)

## Styling Rules

- Use Tailwind utility classes exclusively
- **Prohibited**:
  - `<style>` blocks in components
  - `@apply` directive
  - Inline `style` attributes

## Tailwind CSS v4

- CSS-first configuration via `@theme` in `src/styles/global.css`
- Do NOT create `tailwind.config.js` — v4 uses CSS-based config
- Import Tailwind via `@import "tailwindcss"` in global.css

## Accessibility

- Use semantic HTML elements (`<nav>`, `<main>`, `<article>`, `<section>`, etc.)
- All `<img>` tags must have an `alt` attribute
- Heading hierarchy must not skip levels (e.g., no `<h1>` followed by `<h3>`)

## Lessons Learned

<!-- Add rules discovered through code review and corrections below -->

- Tailwind ビルトインに存在しないユーティリティクラス（例: `tracking-snug`）を使用する場合は、`global.css` の `@theme` に定義が必要。ビルドはエラーにならず無視されるだけなので発見が遅れる。新しいクラス名を導入する際は `@theme` 定義の有無を必ず確認すること。
- タイポグラフィトークン適用時は `font-size` だけでなく `font-weight` と `letter-spacing` もセットで置き換える。トークンの `--font-size-*` は weight を含まないため、必ず `font-bold` / `font-semibold` を明示的に指定する。
