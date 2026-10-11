# Project Context

## Purpose

Personal portfolio site for Helen Shatynska (shatynska.com) — presents projects, roles/skills, and a contact form.

## Tech Stack

- **Framework**: Next.js 16 (App Router), React 19, TypeScript 5.4
- **Styling**: Tailwind CSS 3 (CSS variables for theming, `tailwindcss-animate`), shadcn/ui conventions (`components.json`, `class-variance-authority`, `tailwind-merge`, `clsx`)
- **i18n**: `next-intl` with two locales, `en` (default) and `ua`, routed via the `[locale]` segment and `src/proxy.ts`, with routing defined in `src/i18n/routing.ts` and request config in `src/i18n/request.ts`; messages in `messages/en.json` / `messages/ua.json`
- **Content data**: no database. The project list (projects, types, roles, with `en`/`ua` text) is a typed file, `src/data/projects.ts`
- **UI primitives**: Radix UI (`@radix-ui/react-popover`), `lucide-react` icons, `keen-slider` for the projects carousel
- **Other libs**: `react-error-boundary`, `react-intersection-observer`, `sharp` (image optimization)
- **Tooling**: ESLint (`next/core-web-vitals`), Prettier (`prettier-plugin-tailwindcss`, single quotes, trailing commas, 2-space tabs)
- **Deployment**: Standalone Next.js build in a Docker image (`ghcr.io/shatynska-labs/portfolio`), delivered with `docker-compose.yml` over the tailnet to the personal Hetzner host `main-production`, behind the shared Traefik (see `.github/workflows/deploy.yml`, and `docs/onboard-an-application.md` in `Shatynska-Labs/infrastructure`). Deploys automatically on push to `main`.

## Project Conventions

### Code Style

- Prettier-enforced formatting (2-space indent, single quotes, semicolons, trailing commas, Tailwind class sorting via `prettier-plugin-tailwindcss`)
- Path aliases: `@/*` → `src/*`, `@/messages/*` → `messages/*`
- Component files are PascalCase `.tsx`; hooks under `src/hooks`, contexts under `src/contexts`, small pure helpers under `src/lib`
- Icons live under `src/components/icons`; navigation-specific components under `src/components/navigation`; project-carousel components under `src/components/projects`

### Architecture Patterns

- Next.js App Router with locale-based routing: `src/app/[locale]/page.tsx` (home), `src/app/[locale]/(inner)/...` (contact, project detail, catch-all `[slug]`) sharing an inner layout/header
- Server-first: data (projects/types/roles) is read from `src/data/projects.ts` on the server, so pages prerender at build time; client interactivity (carousel, hamburger menu) is isolated in dedicated client components
- Locale messages are plain JSON dictionaries consumed via `next-intl`; UI strings should not be hardcoded in components
- Styling driven by Tailwind + CSS custom properties (HSL color tokens defined in `globals.css`, referenced from `tailwind.config.ts`) rather than hardcoded colors, so theming stays centralized

### Testing Strategy

- No automated test suite currently exists in this repo. `npm run lint` (ESLint 9, flat config in `eslint.config.mjs`) is the only automated check. Manual verification is done by running `npm run dev` and checking the browser.

### Git Workflow

- `main` deploys automatically on push (no staging environment); changes land through pull requests
- This repo also uses the OpenSpec workflow (`openspec/`, `.claude/commands/opsx/*`) for planning non-trivial changes: `/opsx:propose` → `/opsx:apply` → `/opsx:archive`

## Domain Context

- Content (projects, roles, types) lives in `src/data/projects.ts`, not in components. Each entry carries English and Ukrainian text side by side (`{ en, ua }`)
- Site is bilingual (English/Ukrainian) for a Ukrainian developer's portfolio aimed at both local and international audiences

## Important Constraints

- Deployment target is a single Hetzner host with no preview environments, so changes to `next.config.js` (`output: 'standalone'`), the Dockerfile, `docker-compose.yml` or the workflow must keep the production build/deploy path working
- The image name's last segment (`portfolio`) must equal the app's name in the infrastructure repo's `deploy_apps`; a mismatch silently disables image reclamation on the host
- The container runs read-only as a non-root user; only tmpfs mounts are writable, so it persists nothing

## External Dependencies

- GHCR (image registry: `ghcr.io/shatynska-labs/portfolio`)
- Personal Hetzner host `main-production`, reached over Tailscale (org variable `DEPLOY_HOST`, org secrets `TAILSCALE_OAUTH_*`; environment `production` holds `PORTFOLIO_DEPLOY_SSH_KEY` and `PORTFOLIO_PROBE_SSH_KEY`), with Traefik + Let's Encrypt serving `shatynska.com` and `www.shatynska.com`
