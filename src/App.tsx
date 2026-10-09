import { RouterProvider } from 'react-router'
import { router } from '@/app/router.tsx'
import { ErrorBoundary } from '@/components/ErrorBoundary.tsx'

export function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  )
}
