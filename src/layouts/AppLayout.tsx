import { Box } from '@mui/material'
import { Outlet } from 'react-router'

export function AppLayout() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
      }}
    >
      <Outlet />
    </Box>
  )
}
