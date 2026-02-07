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
