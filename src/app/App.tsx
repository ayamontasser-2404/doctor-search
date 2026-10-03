import { RouterProvider } from 'react-router'

import { AppProviders } from '@/app/providers.tsx'
import { router } from '@/routes/router.tsx'

export function App() {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  )
}
