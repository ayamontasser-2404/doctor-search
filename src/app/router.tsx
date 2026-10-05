import { createBrowserRouter, type RouteObject } from 'react-router'
import { Dashboard } from '@/pages/Dashboard/Dashboard.tsx'
import { NotFoundPage } from '@/pages/NotFoundPage.tsx'
import { paths } from '@/routes/paths.ts'

export const routes: RouteObject[] = [
  { path: paths.home, element: <Dashboard /> },
  { path: '*', element: <NotFoundPage /> },
]

export const router = createBrowserRouter(routes)
