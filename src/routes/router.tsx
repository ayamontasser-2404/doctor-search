import { createBrowserRouter } from 'react-router'

import { AppLayout } from '@/layouts/AppLayout.tsx'
import { HomePage } from '@/pages/HomePage.tsx'
import { NotFoundPage } from '@/pages/NotFoundPage.tsx'
import { paths } from '@/routes/paths.ts'

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: paths.home, element: <HomePage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
