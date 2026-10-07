import { describe, expect, test } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DoctorSearchPractice } from './DcotorSearchPractice.tsx'

describe('DoctorSearchPractice', () => {
  test('shows an empty search box', () => {
    render(<DoctorSearchPractice />)

    expect(screen.getByRole('textbox')).toHaveValue('')
  })

  test('shows both doctors before a search', () => {
    render(<DoctorSearchPractice />)

    expect(screen.getByText('Sara Ahmed')).toBeInTheDocument()
    expect(screen.getByText('Omar Hassan')).toBeInTheDocument()
  })

  test('keeps Sara when the search matches her name', async () => {
    const user = userEvent.setup()
    render(<DoctorSearchPractice />)

    await user.type(screen.getByRole('textbox'), 'Sara')

    expect(screen.getByText('Sara Ahmed')).toBeInTheDocument()
    expect(screen.queryByText('Omar Hassan')).not.toBeInTheDocument()
  })

  test('keeps Omar when the search matches his name', async () => {
    const user = userEvent.setup()
    render(<DoctorSearchPractice />)

    await user.type(screen.getByRole('textbox'), 'Omar')

    expect(screen.getByText('Omar Hassan')).toBeInTheDocument()
    expect(screen.queryByText('Sara Ahmed')).not.toBeInTheDocument()
  })

  test('shows no doctors when nothing matches', async () => {
    const user = userEvent.setup()
    render(<DoctorSearchPractice />)

    await user.type(screen.getByRole('textbox'), 'Noah')

    expect(screen.queryByText('Sara Ahmed')).not.toBeInTheDocument()
    expect(screen.queryByText('Omar Hassan')).not.toBeInTheDocument()
  })
})
