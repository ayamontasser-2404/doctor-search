import { createBrowserRouter, type RouteObject } from 'react-router'
import { Dashboard } from '@/pages/Dashboard/Dashboard.tsx'
import { DoctorPage } from '@/pages/DoctorPage/DoctorPage.tsx'
import { NotFoundPage } from '@/pages/NotFoundPage.tsx'
import { paths } from '@/routes/paths.ts'

export const routes: RouteObject[] = [
  { path: paths.home, element: <Dashboard /> },
  { path: paths.doctor, element: <DoctorPage /> },
  { path: '*', element: <NotFoundPage /> },
]

export const router = createBrowserRouter(routes)
