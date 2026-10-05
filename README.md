# doctor-search

Search doctors by name, specialty, city, and availability. React 19, TypeScript, and Vite, with Material UI.

The doctor list lives in `src/data/doctors.ts`. There is no API.

## Scripts

```bash
npm install
npm run dev
npm test
npm run lint
npm run build
npm run preview
```

The dev server listens on [http://localhost:43123](http://localhost:43123).

Node.js 22 or newer is required.

## Structure

```text
src/
  App.tsx         Root composition
  main.tsx        Browser entry
  app/            Theme provider and the route tree
  components/     Search, filters, doctor list, and cards
  data/           Doctor records and filtering
  pages/          Dashboard and the not-found screen
  routes/         Path constants
  theme/          Material UI theme
  test/           Test setup
```

Import application code through the `@/` alias, for example `@/data/doctors.ts`.
