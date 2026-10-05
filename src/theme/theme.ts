import { createTheme } from '@mui/material/styles'

export const layout = {
  pageMaxWidth: 1536,
  pageGutter: 78,
  heroHeight: 310,
  heroPaddingTop: 101,
  searchToFilters: 41,
  searchBarHeight: 90,
  searchBarRadius: 24,
  searchControlHeight: 73,
  searchButtonWidth: 233,
  locationWidth: 260,
  filterHeight: 57,
  filterRadius: 32,
  filterGap: 16,
  cardRadius: 26,
  cardPaddingX: 24,
  cardPaddingY: 22,
  cardGap: 20,
  portraitWidth: 183,
  portraitHeight: 175,
  portraitRadius: 16,
  actionWidth: 245,
} as const

export const theme = createTheme({
  cssVariables: true,
  defaultColorScheme: 'light',
  spacing: 8,
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#0860B5',
          dark: '#173657',
          light: '#EBF3FC',
          contrastText: '#FFFFFF',
        },
        secondary: {
          main: '#204E83',
          contrastText: '#FFFFFF',
        },
        background: {
          default: '#FCFDFE',
          paper: '#FFFFFF',
        },
        text: {
          primary: '#061C39',
          secondary: '#6D809A',
        },
        divider: '#E7EDF2',
      },
    },
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: '2.75rem',
      lineHeight: 1.15,
      fontWeight: 500,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: '1.75rem',
      lineHeight: '34px',
      fontWeight: 700,
      letterSpacing: 0,
    },
    body1: {
      fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
      fontSize: '1.25rem',
      lineHeight: 1.2,
    },
    body2: {
      fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
      fontSize: '1.125rem',
      lineHeight: 1.25,
    },
    subtitle1: {
      fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
      fontSize: '1.125rem',
      fontWeight: 400,
      lineHeight: 1.2,
    },
    button: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          minHeight: '100vh',
          backgroundColor: '#FCFDFE',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
  },
})
