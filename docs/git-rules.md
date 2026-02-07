# Git Rules

## Branch Naming

- **Main branch**: `main`
- **Feature branches**: `feature/xxx` (e.g., `feature/add-header`)
- **Fix branches**: `fix/xxx` (e.g., `fix/nav-alignment`)

## Commit Messages

Based on [Conventional Commits](https://www.conventionalcommits.org/) and [`@commitlint/config-conventional`](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional).

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

- `<type>` — **required**
- `(<scope>)` — optional, lowercase
- `<subject>` — **required**, imperative mood, English

### Allowed Types

| Type | Purpose |
|------|---------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, whitespace (no logic change) |
| `refactor` | Code restructuring (no feature/fix) |
| `perf` | Performance improvement |
| `test` | Adding or updating tests |
| `build` | Build system or dependencies |
| `ci` | CI configuration |
| `chore` | Other maintenance tasks |
| `revert` | Revert a previous commit |

### Rules

| Rule | Level | Description |
|------|-------|-------------|
| `type-enum` | error | Type must be one of the allowed types above |
| `type-case` | error | Type must be **lowercase** |
| `type-empty` | error | Type must not be empty |
| `subject-case` | error | Subject must not be sentence-case, start-case, pascal-case, or upper-case |
| `subject-empty` | error | Subject must not be empty |
| `subject-full-stop` | error | Subject must **not** end with `.` |
| `header-max-length` | error | Header (entire first line) max **100** characters |
| `body-leading-blank` | warning | Body must be preceded by a blank line |
| `body-max-line-length` | error | Body lines max **100** characters |
| `footer-leading-blank` | warning | Footer must be preceded by a blank line |
| `footer-max-line-length` | error | Footer lines max **100** characters |

### Examples

```
# Good
feat: add hero section to homepage
fix(nav): correct mobile menu toggle behavior
docs: update design guidelines with token architecture
refactor: extract shared layout props interface

# Bad — type missing
add hero section

# Bad — uppercase type
Feat: add hero section

# Bad — sentence-case subject
feat: Add hero section

# Bad — subject ends with period
feat: add hero section.

# Bad — header too long (over 100 chars)
feat: add a very long description that goes way beyond the maximum ...
```

### Multi-line Commit

```
feat(auth): add login form component

Implement email/password login form with validation.
Connects to the authentication API endpoint.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```

## AI Co-Authorship

AI-generated code must include in the footer:

```
Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```

## Commit Granularity

- 1 commit = 1 logical change
- Do not bundle unrelated changes in a single commit

## Prohibitions

- No direct commits to `main` (except during initial setup period)
- No force pushes to `main`

## Lessons Learned

<!-- Add rules discovered through code review and corrections below -->
