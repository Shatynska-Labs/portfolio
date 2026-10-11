## 1. Static project data

- [x] 1.1 Add `src/data/projects.ts` with typed types, roles and projects seeded from the 2024-09-02 archive, with UA drafts and the corrected links
- [x] 1.2 Read projects from it in `Projects`, `Project` and the project detail page; fix the literal `key="{project.id}"`
- [x] 1.3 Remove drizzle/pg/dotenv/ts-node, `drizzle/`, `drizzle.config.ts`, the migration scripts and the `@/drizzle/*` path

## 2. Deployment

- [x] 2.1 Dockerfile: supported Node base, HEALTHCHECK, keep standalone and non-root
- [x] 2.2 Add `docker-compose.yml` per the infrastructure onboarding contract
- [x] 2.3 Replace `.github/workflows/deploy.yml` with the GHCR + tailnet deploy; remove `.github/stack/`
- [x] 2.4 Update `openspec/project.md` (stack, deployment, constraints, external dependencies)

## 3. Verify

- [x] 3.1 `npm run lint` and `npm run build` pass with no `DATABASE_URL`
- [x] 3.2 Build the image and run it with `docker compose` under its read-only settings: healthcheck turns healthy, `/en` and `/ua` list all five projects, and `/_next/image` serves
- [x] 3.3 After the merge: deploy job green, `https://shatynska.com/` serves the site with a valid certificate, and `www` routes too
