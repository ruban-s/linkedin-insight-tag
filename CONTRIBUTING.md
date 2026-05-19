# Contributing

## Setup

```bash
git clone https://github.com/ruban-s/linkedin-insight-tag.git
cd linkedin-insight-tag
pnpm install
pnpm build
pnpm test
```

## Making Changes

1. Fork the repo and create a feature branch.
2. Make your changes.
3. Run `pnpm build && pnpm test` and ensure everything passes.
4. Open a pull request against `main`.

## Code Style

- TypeScript strict mode.
- No comments unless the WHY is non-obvious.
- Keep functions small and focused.
- No new dependencies without discussion in an issue first.

## Commit Messages

```
feat: add consent callback prop
fix: SSR guard missing in trackEvent
chore: update tsup config
```

Use `feat:`, `fix:`, `refactor:`, or `chore:` prefixes. Keep under 72 chars.
