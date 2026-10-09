import { describe, expect, test } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { Dashboard } from './Dashboard.tsx'

function renderDashboard() {
  render(
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>,
  )
}

describe('Dashboard', () => {
  test('shows the Berlin doctors on the search page', () => {
    renderDashboard()

    expect(screen.getByRole('heading', { name: 'Find a doctor' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Dr. Markus Schneider' })).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Dr. Anna Müller' })).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Dr. Laura Klein' })).toBeVisible()
    expect(screen.queryByRole('heading', { name: 'Dr. Jonas Weber' })).not.toBeInTheDocument()
  })

  test('filters the list when a search is submitted', async () => {
    const user = userEvent.setup()
    renderDashboard()

    await user.type(screen.getByRole('textbox', { name: 'Search doctors, specialities or conditions' }), 'Laura')
    await user.click(screen.getByRole('button', { name: 'Search' }))

    expect(screen.getByRole('heading', { name: 'Dr. Laura Klein' })).toBeVisible()
    expect(screen.queryByRole('heading', { name: 'Dr. Markus Schneider' })).not.toBeInTheDocument()
  })

  test('shows Munich doctors when the city changes', async () => {
    const user = userEvent.setup()
    renderDashboard()

    await user.click(screen.getByRole('button', { name: 'City, Berlin, Germany' }))
    await user.click(screen.getByRole('menuitem', { name: 'Munich, Germany' }))

    expect(screen.getByRole('heading', { name: 'Dr. Jonas Weber' })).toBeVisible()
    expect(screen.queryByRole('heading', { name: 'Dr. Markus Schneider' })).not.toBeInTheDocument()
  })

  test('narrows the list to the selected specialty', async () => {
    const user = userEvent.setup()
    renderDashboard()

    await user.click(screen.getByRole('button', { name: 'All Specialties' }))
    await user.click(screen.getByRole('menuitem', { name: 'Dermatologist' }))

    expect(screen.getByRole('heading', { name: 'Dr. Laura Klein' })).toBeVisible()
    expect(screen.queryByRole('heading', { name: 'Dr. Markus Schneider' })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Dr. Anna Müller' })).not.toBeInTheDocument()
  })

  test('restores the doctors after the filters are reset', async () => {
    const user = userEvent.setup()
    renderDashboard()

    await user.type(screen.getByRole('textbox', { name: 'Search doctors, specialities or conditions' }), 'zzzz')
    await user.click(screen.getByRole('button', { name: 'Search' }))

    expect(screen.getByRole('heading', { name: 'No doctors match these filters.' })).toBeVisible()

    await user.click(screen.getByRole('button', { name: 'Reset filters' }))

    expect(screen.getByRole('heading', { name: 'Dr. Markus Schneider' })).toBeVisible()
    expect(screen.queryByRole('heading', { name: 'No doctors match these filters.' })).not.toBeInTheDocument()
  })
})
