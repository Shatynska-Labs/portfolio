## 1. Upgrade

- [x] 1.1 Bump next, eslint-config-next, react, react-dom and their types; bump peers that reject React 19
- [x] 1.2 Migrate next-intl 3 → 4 (routing, navigation, request config, setRequestLocale)
- [x] 1.3 Await async `params` in every page and layout; rename middleware to proxy
- [x] 1.4 Replace `next lint` with ESLint 9 flat config

## 2. Verify

- [x] 2.1 `npm run lint` and `npm run build` pass; `/en` and `/ua` are still prerendered
- [x] 2.2 Production image under `docker-compose.yml` turns healthy; `/` redirects to `/en`; `/en`, `/ua`, `/en/contact` and `/_next/image` return 200; both locales list all five projects with Ukrainian text on `/ua`; the language switch links still work
- [x] 2.3 After the merge: deploy green and https://shatynska.com/en and /ua serve the same content as before
