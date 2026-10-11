## ADDED Requirements

### Requirement: A merge to main deploys to the Hetzner host

A push to `main` SHALL build the image, push it to `ghcr.io/shatynska-labs/portfolio` tagged with the commit SHA, and deliver `docker-compose.yml` and a rendered `.env` to `deploy@$DEPLOY_HOST` over the tailnet under the `production` environment. The host then pulls the image and starts it, waiting for it to become healthy.

#### Scenario: Image name matches the deploy_apps entry

- **WHEN** the workflow and `docker-compose.yml` name the image
- **THEN** its last path segment is `portfolio`, identical to the app's name in the infrastructure repo's `deploy_apps`

#### Scenario: Unhealthy container fails the deploy

- **WHEN** the container's HEALTHCHECK does not pass after the deploy
- **THEN** the deploy job fails

### Requirement: Traefik routes shatynska.com to the container

`docker-compose.yml` SHALL attach the service to the external `platform_edge` network and route `Host(shatynska.com) || Host(www.shatynska.com)` on the `websecure` entrypoint, with a `letsencrypt` certificate, to the container's port 3000.

#### Scenario: Public site answers

- **WHEN** the deploy has completed
- **THEN** `https://shatynska.com/` answers over a valid certificate with the portfolio home page

### Requirement: The container runs unprivileged with a read-only root filesystem

The container SHALL run as a non-root user with a read-only root filesystem. Writable scratch space is limited to tmpfs mounts, so nothing it persists survives a restart and nothing needs a backup.

#### Scenario: Image cache is ephemeral

- **WHEN** Next.js writes optimized images to `.next/cache`
- **THEN** the write lands on tmpfs and is discarded on restart
