## Why

shatynska.com is down: the old host (Docker Hub image + Portainer at `admin.psypra.com`) is gone, and so is the Postgres database the project list was read from. Every Wayback capture since 2025-03 shows the home page with no projects, because `Projects` swallows the connection error. The site is moving to the personal Hetzner host (`main-production`), which already serves shatynskyj.in.ua the same way. Under that host's rules, the shared Postgres instance is for non-durable data only, so it can't hold this content.

## What Changes

- The project list (projects, types, roles, en/ua titles) moves from Postgres into a typed file in the repo, `src/data/projects.ts`. It is seeded from the last archived capture of `https://shatynska.com/en` (2024-09-02). The Ukrainian titles were never archived, so they are drafted for review. GitHub links are repointed to `Shatynska-Labs/*`. The dead `dro.psypra.com` link is dropped, and the Profile Management System links to `my.dro.psypra`.
- **BREAKING (dev setup):** `drizzle-orm`, `pg`, `drizzle-kit`, `dotenv`, `@types/pg` and `ts-node` are removed, along with `drizzle/`, `drizzle.config.ts` and the migration scripts. `DATABASE_URL` is no longer needed anywhere.
- Deployment follows the Hetzner contract: the image goes to `ghcr.io/shatynska-labs/portfolio`, and `docker-compose.yml` joins `platform_edge` with Traefik labels for `shatynska.com` and `www.shatynska.com`. `.github/workflows/deploy.yml` builds and pushes the image, then delivers `docker-compose.yml` + `.env` over the tailnet to `deploy@$DEPLOY_HOST`. The Dockerfile gains a HEALTHCHECK and a supported Node base (Node 20 is EOL). The old Docker Hub/Portainer workflow and `.github/stack/production.yml` are removed.

## Capabilities

### New Capabilities

- `project-catalogue`: the bilingual project list rendered on the home page, sourced from a typed in-repo file.
- `production-deploy`: how a merge to `main` reaches shatynska.com on the Hetzner host.

### Modified Capabilities

(none)

## Non-goals

- Upgrading Next.js 14 and the other outdated dependencies. That's a separate change, after the first deploy.
- Content edits beyond the ones listed above.
- The per-role descriptions (`projects_to_roles.description_*`). They were only read by the disabled "more info" link and weren't recoverable.

## Impact

- `src/components/projects/*`, `src/app/[locale]/(inner)/projects/[id]/page.tsx`, `tsconfig.json` paths, `package.json`/lockfile.
- New: `src/data/projects.ts`, `docker-compose.yml`. Rewritten: `.github/workflows/deploy.yml`, `Dockerfile`. Removed: `drizzle/`, `drizzle.config.ts`, `.github/stack/`.
- Depends on the `portfolio` entry in `deploy_apps` in `Shatynska-Labs/infrastructure` (PR #268), which must be merged and converged on `main-production` before this merges.
- Repository secrets `DATABASE_URL`, `DOCKER_HUB_*` and `PORTAINER_*` become unused.
