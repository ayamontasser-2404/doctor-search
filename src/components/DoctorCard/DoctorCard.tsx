import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { Link as RouterLink } from 'react-router'
import chevronRight from '@/assets/doctor-search/chevron-right.svg'
import globeIcon from '@/assets/doctor-search/globe.svg'
import mapPinIcon from '@/assets/doctor-search/map-pin.svg'
import verifiedIcon from '@/assets/doctor-search/verified.svg'
import type { Doctor } from '@/data/doctors.ts'
import { doctorPath } from '@/routes/paths.ts'
import { layout } from '@/theme/theme.ts'

type DoctorCardProps = {
  doctor: Doctor
}

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

function MetadataRow({ icon, children }: { icon: string; children: string }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Box component="img" src={icon} alt="" sx={{ width: 23, height: 23, display: 'block', flexShrink: 0 }} />
      <Typography
        sx={{
          fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
          fontSize: { xs: 16, md: 20 },
          color: 'text.secondary',
          lineHeight: 1.2,
        }}
      >
        {children}
      </Typography>
    </Box>
  )
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  const distance = `${doctor.distanceKm.toFixed(1)} km · ${doctor.area}`

  return (
    <Paper
      component="article"
      elevation={0}
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'stretch', md: 'center' },
        gap: { xs: 2.5, md: '26px' },
        width: '100%',
        minHeight: { lg: 226 },
        px: `${layout.cardPaddingX}px`,
        py: `${layout.cardPaddingY}px`,
        borderRadius: `${layout.cardRadius}px`,
        border: '1px solid #EFF2F5',
        boxShadow: '0px 4px 12px rgba(40, 78, 112, 0.06)',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          flexWrap: { xs: 'wrap', xl: 'nowrap' },
          alignItems: { sm: 'flex-start' },
          gap: { xs: 2, md: '36px' },
          flex: 1,
          minWidth: 0,
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            pt: { md: '4px' },
            minWidth: 0,
            flex: { xs: '1 1 240px', xl: '0 0 373px' },
            width: { xl: 373 },
          }}
        >
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <Typography component="h2" variant="h2">
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
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '11px', pt: '9px' }}>
            <MetadataRow icon={mapPinIcon}>{distance}</MetadataRow>
            <MetadataRow icon={globeIcon}>{`Speaks: ${doctor.languages.join(', ')}`}</MetadataRow>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignContent: 'flex-start',
            rowGap: '10px',
            columnGap: '14px',
            pt: { md: '17px' },
            flex: { xs: '1 1 100%', xl: '0 0 403px' },
            width: { xl: 403 },
            maxWidth: '100%',
          }}
        >
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
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: { xs: 'stretch', md: 'flex-end' },
          gap: '30px',
          width: { xs: '100%', md: 276 },
          flexShrink: 0,
        }}
      >
        <Box
          sx={{
            display: { xs: 'none', md: 'block' },
            width: '1px',
            height: 172,
            bgcolor: 'divider',
            flexShrink: 0,
          }}
        />
        <Button
          component={RouterLink}
          to={doctorPath(doctor.id)}
          aria-label={`View profile of ${doctor.name}`}
          sx={{
            width: { xs: '100%', md: layout.actionWidth },
            height: 57,
            gap: '10px',
            borderRadius: '15px',
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            fontSize: 20,
            fontWeight: 500,
            '&:hover': {
              bgcolor: '#064E94',
            },
          }}
        >
          View Profile
          <Box component="img" src={chevronRight} alt="" sx={{ width: 23, height: 23, display: 'block' }} />
        </Button>
      </Box>
    </Paper>
  )
}
