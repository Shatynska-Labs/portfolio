## ADDED Requirements

### Requirement: The project list is read from a typed in-repo file

The home page SHALL render its project carousel from `src/data/projects.ts`, ordered by each project's `order`, with no database or network access at build or request time.

#### Scenario: Build with no database configured

- **WHEN** `npm run build` runs with no `DATABASE_URL` and no reachable Postgres
- **THEN** the build succeeds and the prerendered home page contains every project in the file

#### Scenario: Projects are ordered

- **WHEN** the home page renders
- **THEN** the projects appear in ascending `order`

### Requirement: Project text is shown in the active locale

Each project's title and type, and each role's title, SHALL carry an English and a Ukrainian value, and the page SHALL show the value for the active locale (`en` or `ua`).

#### Scenario: Ukrainian locale

- **WHEN** a visitor opens `/ua`
- **THEN** project titles, types and roles are shown in Ukrainian

#### Scenario: Frontend and backend roles collapse to fullstack

- **WHEN** a project carries both the frontend and the backend developer roles
- **THEN** its roles line shows the localized "Fullstack developer" in place of those two roles
