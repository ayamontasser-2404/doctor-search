import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { describe, expect, it } from 'vitest'
import { AppProviders } from '@/app/providers.tsx'
import { routes } from '@/app/router.tsx'
import { App } from './App.tsx'

describe('App', () => {
  it('renders the doctor search dashboard', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Find a doctor' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Search doctors, specialities or conditions' })).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Dr. Markus Schneider' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'All Specialties' })).toBeVisible()
  })

  it('filters the list when a search is submitted', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByRole('textbox', { name: 'Search doctors, specialities or conditions' }), 'Laura')
    await user.click(screen.getByRole('button', { name: 'Search' }))

    expect(screen.getByRole('heading', { name: 'Dr. Laura Klein' })).toBeVisible()
    expect(screen.queryByRole('heading', { name: 'Dr. Markus Schneider' })).not.toBeInTheDocument()
  })

  it('returns home from an unknown address', async () => {
    const user = userEvent.setup()
    const memoryRouter = createMemoryRouter(routes, { initialEntries: ['/unknown'] })

    render(
      <AppProviders>
        <RouterProvider router={memoryRouter} />
      </AppProviders>,
    )

    expect(screen.getByRole('heading', { name: 'Page not found' })).toBeVisible()
    await user.click(screen.getByRole('link', { name: 'Return home' }))
    expect(screen.getByRole('heading', { name: 'Find a doctor' })).toBeInTheDocument()
  })
})
