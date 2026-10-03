import InitColorSchemeScript from '@mui/material/InitColorSchemeScript'
import { CssBaseline, ThemeProvider } from '@mui/material'
import type { ReactNode } from 'react'

import { ErrorBoundary } from '@/components/ErrorBoundary.tsx'
import { theme } from '@/theme/theme.ts'

const colorSchemeMode = 'system'

type AppProvidersProps = {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ErrorBoundary>
      <InitColorSchemeScript defaultMode={colorSchemeMode} />
      <ThemeProvider theme={theme} defaultMode={colorSchemeMode} disableTransitionOnChange>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ErrorBoundary>
  )
}
