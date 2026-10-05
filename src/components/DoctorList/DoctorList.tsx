import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { DoctorCard } from '@/components/DoctorCard/DoctorCard.tsx'
import type { Doctor } from '@/data/doctors.ts'
import { layout } from '@/theme/theme.ts'

type DoctorListProps = {
  doctors: Doctor[]
  onReset: () => void
}

export function DoctorList({ doctors, onReset }: DoctorListProps) {
  if (doctors.length === 0) {
    return (
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h2" sx={{ fontSize: 24 }}>
          No doctors match these filters.
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1, mb: 3, fontSize: 18 }}>
          Try another specialty, date, or city.
        </Typography>
        <Button variant="contained" onClick={onReset}>
          Reset filters
        </Button>
      </Box>
    )
  }

  return (
    <Stack component="ul" spacing={`${layout.cardGap}px`} sx={{ m: 0, p: 0, listStyle: 'none' }}>
      {doctors.map((doctor) => (
        <Box component="li" key={doctor.id}>
          <DoctorCard doctor={doctor} />
        </Box>
      ))}
    </Stack>
  )
}
