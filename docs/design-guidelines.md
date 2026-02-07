# Design Guidelines

## Color Palette

> TBD — Define colors as `@theme` custom properties in `src/styles/global.css`.

Planned variable structure:

```css
@theme {
  --color-primary: /* TBD */;
  --color-secondary: /* TBD */;
  --color-accent: /* TBD */;
  --color-background: /* TBD */;
  --color-text: /* TBD */;
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

<!-- Add rules discovered through code review and corrections below -->
