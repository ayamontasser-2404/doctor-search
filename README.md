# doctor-search

A doctor search page. The user types a name, specialty, or condition, chooses a city and filters, and the page shows matching doctors. Opening a card goes to that doctor’s profile. The doctor records live in the project. There is no backend.

Use this file to present the project and to explain the React components.

## 30-second pitch

> This is a client-side doctor search built with React, TypeScript, and Tailwind CSS. The dashboard owns the search state. Child components only display that state and report what the user did. A plain function filters and sorts the doctor list, and the page renders whatever that function returns. Shared colors, sizes, and breakpoints live once in the Tailwind theme.

## What the user can do

- Search by doctor name, specialty, area, city, language, or care service. The list updates when they press **Search**, not on every keystroke.
- Change city, specialty, date, location, and sort. Those filters update the list immediately.
- See each doctor’s photo, specialty, rating, review count, distance, languages, and care services.
- Open **View Profile** to see that doctor at `/doctors/:doctorId`, then return home.
- Reset the filters when nothing matches.
- Land on a “page not found” screen for an unknown address or an unknown doctor id, then return home.

## Stack

| Piece | Role |
| --- | --- |
| React 19 | UI components and state |
| TypeScript | Types for doctors, filters, and component props |
| Vite | Dev server, production build |
| Tailwind CSS 4 | Layout, color, type, and spacing utilities |
| React Router 7 | Home, doctor profile, and the not-found page |
| Vitest and Testing Library | Tests of the full app |
| Jest and Testing Library | Tests of the dashboard and the practice search |

Node.js 22 or newer is required.

## How a React component works in this project

A component is a function that receives data and returns UI. React calls that function, takes the UI it returns, and puts it on the page. When the data changes, React calls the function again and updates the page.

`DoctorCard` is the clearest example. It receives one doctor and returns that doctor’s card:

```tsx
export function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <article className="rounded-card border border-card-border bg-white">
      <h2 className="text-doctor text-ink">{doctor.name}</h2>
      <p className="text-muted">{doctor.specialty}</p>
    </article>
  )
}
```

The real card has more markup, but the idea is the same. `doctor` is a **prop**. The parent passes it in. `DoctorCard` does not fetch the doctor and does not store the doctor. Class names such as `rounded-card` and `text-ink` come from the theme in `src/index.css`.

Three rules show up everywhere in this app:

1. **Props go down.** A parent passes values into a child. `Dashboard` passes `doctors` into `DoctorList`, and `DoctorList` passes one `doctor` into each `DoctorCard`.
2. **Events go up.** A child tells the parent what happened by calling a function prop. `SearchInput` calls `onQueryChange` when the user types. It does not change the doctor list itself.
3. **The owner of the state re-renders the tree.** `Dashboard` keeps the search text and the filters. When those change, React renders `Dashboard` again, which renders its children again with the new values.

JSX is the HTML-like syntax inside those functions. `{doctor.name}` prints a JavaScript value. `{condition ? <img /> : null}` shows something only when the condition is true. The verified badge on a card uses that pattern.

## Component tree

```text
main.tsx
  App
    ErrorBoundary         fallback if a screen crashes while rendering
      Router
        Dashboard         owns query and filters        route: /
          DoctorSearch
            SearchInput       text box, city menu, Search button
            SearchFilters
              FilterSelect    Specialty, Date, Location, Sort
          DoctorList
            DoctorCard        one card per doctor, link to the profile
        DoctorPage                                      route: /doctors/:doctorId
        NotFoundPage                                    route: anything else
```

`Dashboard` is the only component that owns the search data. The components under it are mostly display and event reporting.

`SearchInput` and `FilterSelect` do keep one small piece of local state: whether their menu is open. That state does not belong in `Dashboard` because the rest of the page does not need it. The menus are plain buttons and lists, with `menuitem` roles, so a click outside or Escape can close them.

`DoctorPage` reads `:doctorId` from the URL and finds that record in the same local list. An id that is not in the list renders `NotFoundPage`.

## State and derived data

```tsx
const [query, setQuery] = useState(defaultFilters.query)
const [filters, setFilters] = useState<DoctorSearchFilters>(defaultFilters)

const results = useMemo(() => filterDoctors(doctors, filters), [filters])
```

| Value | Kind | Meaning |
| --- | --- | --- |
| `query` | state | Text currently in the box. Typing changes only this. |
| `filters` | state | City, specialty, date, location, sort, and the query that was submitted. |
| `results` | derived | The filtered and sorted doctors. It is calculated from `filters`. It is not stored. |

`useState` returns the current value and a function that replaces it. Calling that function asks React to render again.

`useMemo` caches `results` until `filters` changes. `query` is not in that dependency list because the list ignores the typed text until Search copies it into `filters`.

Search commits the draft like this:

```tsx
setFilters((current) => ({ ...current, query }))
```

`...current` copies the existing filters into a new object, then `query` overwrites the old query. React compares the new object with the old one. Editing `filters.query = query` on the existing object would not reliably refresh the list, because the object would still be the same one.

Changing the city also resets specialty and location, because those menus are built from the doctors in the selected city:

```tsx
onFiltersChange({
  ...filters,
  city,
  specialty: 'All Specialties',
  location: 'Nearest Location',
})
```

## How filtering works

`filterDoctors` in `src/data/doctors.ts` is an ordinary function. It does not use React. A doctor stays in the list only when every active rule matches:

- The city matches.
- The specialty matches, unless the filter is “All Specialties”.
- “Today” and “Tomorrow” match the doctor’s availability. “Any Date” and “This Week” do not remove anyone.
- The area matches, unless the filter is “Nearest Location”.
- If a query was submitted, it appears in the name, specialty, area, city, languages, or care services.

The matches are then copied and sorted:

- **Highest Rating:** rating first, then shorter distance when ratings tie.
- **Most Reviews:** review count.
- **Nearest:** distance.

There are five doctors. Berlin has three, Munich has one, and Hamburg has one. The specialty and location menus are rebuilt from the selected city, so Munich only offers Orthopedist.

## Pages and startup

1. `index.html` contains an empty `<div id="root">`.
2. `src/main.tsx` loads the Inter and Roboto font files, imports `src/index.css`, and renders `<App />`.
3. `App` wraps the router in an error boundary.
4. `/` renders `Dashboard`. `/doctors/:doctorId` renders `DoctorPage`. Any other path renders `NotFoundPage`.

`src/index.css` is the theme. The `@theme` block names the colors, radii, spacing, type sizes, shadows, and breakpoints once. Components then use those names as utilities, such as `bg-page`, `text-ink`, `rounded-card`, `border-card-border`, and `fill-star`. An empty star uses `fill-line`, which is the same color as the divider.

The breakpoints match the layout the page was designed for:

| Prefix | Min width |
| --- | --- |
| `sm:` | 600px |
| `md:` | 900px |
| `lg:` | 1200px |
| `xl:` | 1536px |

`ErrorBoundary` is a class component. It is the one place this app uses a class, because React reports a render crash through `getDerivedStateFromError` and `componentDidCatch`. If a child throws while rendering, the user sees “This view failed to load” and a Reload button.

## Folder map

```text
src/
  App.tsx         Root composition
  main.tsx        Browser entry
  index.css       Tailwind theme tokens
  app/            Route tree
  components/     Search, filters, doctor list, cards, error boundary
  data/           Doctor records and filterDoctors
  pages/          Dashboard, doctor profile, and the not-found screen
  practice/       Small search used only by the Jest practice tests
  routes/         Path constants
  test/           Vitest setup and the file mock used by Jest
```

Import application code through the `@/` alias, for example `@/data/doctors.ts`.

`src/practice/DcotorSearchPractice.tsx` is a separate exercise. It filters two names on every keystroke and is not mounted by the router.

## Scripts

```bash
npm install
npm run dev
npm test
npm run test:jest
npm run lint
npm run build
npm run preview
```

The dev server and the preview server listen on [http://localhost:43123](http://localhost:43123).

## Tests

`npm test` runs Vitest. It skips `src/practice/**` and `src/pages/Dashboard/**/*.test.tsx`. `src/App.test.tsx` renders the real app and looks up elements by role and accessible name:

- The home page shows “Find a doctor” and the first doctor.
- Typing “Laura” and pressing Search shows Dr. Laura Klein and hides Dr. Markus Schneider.
- An unknown address shows “Page not found”, and “Return home” returns to the search page.

`npm run test:jest` runs Jest on the dashboard and the practice search.

The dashboard tests render `Dashboard` inside a memory router:

- Berlin’s three doctors appear on load.
- Search for “Laura” leaves Dr. Laura Klein.
- Choosing Munich shows Dr. Jonas Weber.
- Choosing Dermatologist shows Dr. Laura Klein.
- A query that matches nobody shows the empty state, and **Reset filters** brings the Berlin doctors back.

The practice tests cover the empty box, both names, and typing Sara, Omar, and a name that matches neither.

## Interview points worth saying out loud

- **Who owns state?** `Dashboard` owns `query` and `filters`.
- **What is derived?** `results`, plus the specialty and location options for the selected city.
- **Which children only report events?** `DoctorSearch`, `SearchInput`, `SearchFilters`, `FilterSelect`, and `DoctorList`. They call callbacks. They do not own the search data.
- **Why are the text box and the filters separate?** The box is a draft. Filters are what the list uses. Search is the moment the draft is committed.
- **Why does each card have `key={doctor.id}`?** React uses the key to match the same card when the sort order changes.
- **Where do the visual values live?** Once, in `@theme`. A card radius, a portrait size, or a star color is a token, then a utility such as `rounded-card` or `fill-star`.
- **What would an API change?** Keep `filterDoctors`. Fetch the array, then pass that array in instead of the constant. The cards already receive one `Doctor`, so they can stay as they are. The profile page would look up the same fetched record by id.

## Current limits

- Doctors are a fixed local list.
- “This Week” is a date option, and the filter function does not narrow availability for it.
- The practice search is case-sensitive and is not part of the dashboard.
