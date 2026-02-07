# Git Rules

## Branch Naming

- **Main branch**: `main`
- **Feature branches**: `feature/xxx` (e.g., `feature/add-header`)
- **Fix branches**: `fix/xxx` (e.g., `fix/nav-alignment`)

## Commit Messages

- Written in **English**
- Use **imperative mood** (e.g., "Add header component", not "Added header component")
- Summary line: **50 characters or less**
- Body (optional): Wrap at 72 characters, explain *why* not *what*
- AI-generated code must include:
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
