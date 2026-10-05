import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { Link as RouterLink } from 'react-router'
import { paths } from '@/routes/paths.ts'

export function NotFoundPage() {
  return (
    <Container maxWidth="sm" sx={{ py: { xs: 8, md: 12 } }}>
      <Typography variant="overline" color="primary">
        404
      </Typography>
      <Typography variant="h1" sx={{ mt: 1.5, mb: 2, fontSize: { xs: '2.25rem', sm: '2.75rem' } }}>
        Page not found
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 440 }}>
        That address is outside the physician workspace. Return to the foundation screen.
      </Typography>
      <Button variant="contained" component={RouterLink} to={paths.home}>
        Return home
      </Button>
    </Container>
  )
}
