import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { Component, type ErrorInfo, type ReactNode } from 'react'

type ErrorBoundaryProps = {
  children: ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean
}

function reloadPage(): void {
  window.location.reload()
}

function ErrorFallback() {
  return (
    <Container maxWidth="sm" sx={{ py: { xs: 8, sm: 12 } }}>
      <Typography variant="overline" color="primary">
        Find a doctor
      </Typography>
      <Typography variant="h1" sx={{ mt: 1, mb: 2, fontSize: { xs: '2rem', sm: '2.5rem' } }}>
        This view failed to load
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 460 }}>
        The screen stopped while rendering. Reload the page to start again.
      </Typography>
      <Button variant="contained" onClick={reloadPage}>
        Reload
      </Button>
    </Container>
  )
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error(error, info.componentStack)
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
          <ErrorFallback />
        </Box>
      )
    }

    return this.props.children
  }
}
