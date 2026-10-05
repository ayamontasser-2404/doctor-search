import { RouterProvider } from 'react-router'
import { AppProviders } from '@/app/providers.tsx'
import { router } from '@/app/router.tsx'
import { ErrorBoundary } from '@/components/ErrorBoundary.tsx'

export function App() {
  return (
    <AppProviders>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </AppProviders>
  )
}
