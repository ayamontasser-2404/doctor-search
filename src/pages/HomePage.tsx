import { Box, Typography } from '@mui/material'

import { env } from '@/config/env.ts'

export function HomePage() {
  return (
    <Box component="main" sx={{ flex: 1, px: 3, py: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {env.appName}
      </Typography>
      <Typography color="text.secondary" sx={{ maxWidth: '36rem' }}>
        Application shell is ready. Add screens in src/pages and register them in src/routes.
      </Typography>
    </Box>
  )
}
