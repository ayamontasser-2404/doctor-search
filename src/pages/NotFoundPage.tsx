import { Box, Button, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router'

import { paths } from '@/routes/paths.ts'

export function NotFoundPage() {
  return (
    <Box
      component="main"
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 2,
        px: 3,
        py: 8,
      }}
    >
      <Typography variant="h4" component="h1">
        Page not found
      </Typography>
      <Typography color="text.secondary">This address does not match a screen in the app.</Typography>
      <Button component={RouterLink} to={paths.home} variant="contained">
        Go home
      </Button>
    </Box>
  )
}
