import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { Link as RouterLink, useParams } from 'react-router'
import globeIcon from '@/assets/doctor-search/globe.svg'
import mapPinIcon from '@/assets/doctor-search/map-pin.svg'
import verifiedIcon from '@/assets/doctor-search/verified.svg'
import { doctors } from '@/data/doctors.ts'
import { NotFoundPage } from '@/pages/NotFoundPage.tsx'
import { paths } from '@/routes/paths.ts'
import { layout } from '@/theme/theme.ts'

function StarRating({ rating }: { rating: number }) {
  const filled = Math.max(0, Math.min(5, Math.round(rating)))

  return (
    <Box aria-hidden sx={{ display: 'flex', gap: '3px' }}>
      {Array.from({ length: 5 }, (_, index) => (
        <Box
          key={index}
          component="svg"
          viewBox="0 0 22 24"
          sx={{ width: 22, height: 24, display: 'block' }}
        >
          <path
            d="M11 0L14.2 8.14884L22 9.04186L16.2 14.9581L17.9 24L11 19.4233L4.1 24L5.8 14.9581L0 9.04186L7.8 8.14884L11 0Z"
            fill={index < filled ? '#FFAE00' : '#E7EDF2'}
          />
        </Box>
      ))}
    </Box>
  )
}

export function DoctorPage() {
  const { doctorId } = useParams()
  const doctor = doctors.find((item) => item.id === doctorId)

  if (!doctor) {
    return <NotFoundPage />
  }

  const distance = `${doctor.distanceKm.toFixed(1)} km · ${doctor.area}`

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Box sx={{ maxWidth: layout.pageMaxWidth, mx: 'auto', px: { xs: 2, sm: 3, md: 4, xl: `${layout.pageGutter}px` }, py: { xs: 3, md: 6 } }}>
        <Button component={RouterLink} to={paths.home} sx={{ mb: 3, px: 0, color: 'primary.main', fontSize: 18 }}>
          Return home
        </Button>
        <Paper
          component="article"
          elevation={0}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 2.5, md: '36px' },
            p: `${layout.cardPaddingY}px ${layout.cardPaddingX}px`,
            borderRadius: `${layout.cardRadius}px`,
            border: '1px solid #EFF2F5',
            boxShadow: '0px 4px 12px rgba(40, 78, 112, 0.06)',
          }}
        >
          <Box
            component="img"
            src={doctor.portraitUrl}
            alt=""
            sx={{
              width: { xs: 120, sm: layout.portraitWidth },
              height: { xs: 120, sm: layout.portraitHeight },
              borderRadius: `${layout.portraitRadius}px`,
              objectFit: 'cover',
              flexShrink: 0,
            }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: 0 }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <Typography component="h1" variant="h2">
                  {doctor.name}
                </Typography>
                {doctor.verified ? (
                  <Box
                    component="img"
                    src={verifiedIcon}
                    alt="Verified doctor"
                    sx={{ width: 25, height: 25, display: 'block' }}
                  />
                ) : null}
              </Box>
              <Typography
                sx={{
                  mt: '6px',
                  fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
                  fontSize: { xs: 16, md: 20 },
                  color: 'text.secondary',
                }}
              >
                {doctor.specialty}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <StarRating rating={doctor.rating} />
              <Typography
                sx={{
                  fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
                  fontWeight: 500,
                  fontSize: { xs: 16, md: 20 },
                  color: 'primary.dark',
                }}
              >
                {doctor.rating.toFixed(1)}
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
                  fontSize: { xs: 15, md: 18 },
                  color: 'text.secondary',
                }}
              >
                ({doctor.reviewCount} reviews)
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Box component="img" src={mapPinIcon} alt="" sx={{ width: 23, height: 23 }} />
              <Typography sx={{ fontSize: { xs: 16, md: 20 }, color: 'text.secondary' }}>{distance}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Box component="img" src={globeIcon} alt="" sx={{ width: 23, height: 23 }} />
              <Typography sx={{ fontSize: { xs: 16, md: 20 }, color: 'text.secondary' }}>
                {`Speaks: ${doctor.languages.join(', ')}`}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {doctor.careServices.map((service) => (
                <Box
                  key={service}
                  sx={{
                    px: '13px',
                    py: '11px',
                    borderRadius: '12px',
                    bgcolor: 'primary.light',
                    color: 'secondary.main',
                    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
                    fontSize: 15,
                    lineHeight: 1.2,
                  }}
                >
                  {service}
                </Box>
              ))}
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  )
}
