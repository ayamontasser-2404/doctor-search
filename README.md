# azcare-doctor-search

React 19, TypeScript, and Vite, with MUI for UI. This repository is the application shell. Feature screens are not included yet.

## Scripts

```bash
npm install
npm run dev
npm run typecheck
npm run lint
npm run build
npm run preview
```

## Environment

Copy `.env.example` to `.env` for local overrides. Only `VITE_` variables are exposed to the client.

| Variable | Purpose |
| --- | --- |
| `VITE_APP_NAME` | Document title |
| `VITE_API_BASE_URL` | Reserved base URL for a future API client |

## Structure

```text
src/
  app/         Composition root: providers and the router host
  components/  Shared UI
  config/      Typed environment access
  layouts/     Route layouts
  pages/       Route screens
  routes/      Path constants and the router
  theme/       MUI theme
  types/       Ambient TypeScript declarations
```

Import application code through the `@/` alias, for example `@/pages/HomePage.tsx`.
