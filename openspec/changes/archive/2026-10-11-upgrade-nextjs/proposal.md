## Why

The site runs Next.js 14.2.2 (April 2024), which is out of support and has had security fixes since. The first Hetzner deploy (`deploy-to-hetzner`) deliberately left the upgrade for a separate change.

## What Changes

- `next` and `eslint-config-next` 14 → 16, on the current 16.x patch.
- `react`/`react-dom` 18 → 19 and `@types/react`/`@types/react-dom` 19, which Next 16 requires.
- `next-intl` 3 → 4, the first major supporting Next 15+. `unstable_setRequestLocale` → `setRequestLocale`; `createSharedPathnamesNavigation` → `defineRouting` + `createNavigation`; the request config moves to `src/i18n/request.ts` and returns `locale`.
- Page and layout `params` become a `Promise` and are awaited (Next 15+). `src/middleware.ts` becomes `src/proxy.ts` (Next 16).
- `next lint` is removed in Next 16: `eslint` 8 → 9 with a flat `eslint.config.mjs`, and `npm run lint` runs `eslint .`.
- Only libraries whose React peer range excludes 19 are bumped alongside.

## Non-goals

- Tailwind 4, TypeScript 7, and major bumps of libraries that already work with React 19.
- Any visible change to the site. Pages, routes and content stay as they are.

## Capabilities

No requirement changes. Behaviour is unchanged: the existing `project-catalogue` and `production-deploy` requirements must still hold.

## Impact

- `package.json`/lockfile, `src/app/**` pages and layouts, `src/i18n*`, `src/navigation.ts`, `src/middleware.ts` → `src/proxy.ts`, `.eslintrc.json` → `eslint.config.mjs`, `next.config.js`.
- Dockerfile unchanged: Node 22 satisfies Next 16 (≥ 20.9).
