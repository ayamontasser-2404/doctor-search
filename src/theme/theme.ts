import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  cssVariables: true,
  defaultColorScheme: 'light',
  colorSchemes: {
    light: true,
    dark: true,
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          minHeight: '100vh',
        },
      },
    },
  },
})
