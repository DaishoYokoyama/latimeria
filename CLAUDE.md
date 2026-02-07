# CLAUDE.md — latimeria

Astro 5 + Tailwind CSS v4 で構築する日本語ホームページ。

## Reference Documents

- [Coding Guidelines](docs/coding-guidelines.md)
- [Git Rules](docs/git-rules.md)
- [Design Guidelines](docs/design-guidelines.md)
- [Requirements](docs/requirements.md)

## DO

- Use Tailwind utility classes for all styling
- Use semantic HTML elements (`<nav>`, `<main>`, `<section>`, etc.)
- Define Props types with TypeScript interfaces for all components
- Follow mobile-first responsive design (`md:`, `lg:`)
- Follow Conventional Commits format: `<type>(<scope>): <subject>` (see [Git Rules](docs/git-rules.md))
- Write commit subjects in English, imperative mood, lowercase, header max 100 chars

## DO NOT

- Use `<style>` blocks in components
- Use `@apply` directive
- Use inline `style` attributes
- Create `tailwind.config.js` (Tailwind v4 uses CSS-first config)
- Use `any` type in TypeScript
- Add new dependencies without explicit approval

## Commands

```sh
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
```

## Learning Cycle

When a correction is given during code review:

1. Fix the code
2. Add the learned rule to the **Lessons Learned** section of the relevant doc
3. Follow the rule in all future implementations

## Sub-Agent Directive

All Task tool invocations must specify `model: "opus"`.
