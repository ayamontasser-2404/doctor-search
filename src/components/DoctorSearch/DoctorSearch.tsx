import Box from '@mui/material/Box'
import heartArt from '@/assets/doctor-search/heart-art.png'
import shapesArt from '@/assets/doctor-search/shapes-art.png'
import stethoscopeArt from '@/assets/doctor-search/stethoscope-art.png'
import type { DoctorSearchFilters } from '@/data/doctors.ts'
import { layout } from '@/theme/theme.ts'
import { SearchFilters } from './SearchFilters.tsx'
import { SearchInput } from './SearchInput.tsx'

type DoctorSearchProps = {
  query: string
  filters: DoctorSearchFilters
  onQueryChange: (query: string) => void
  onFiltersChange: (filters: DoctorSearchFilters) => void
  onSearch: () => void
}

export function DoctorSearch({ query, filters, onQueryChange, onFiltersChange, onSearch }: DoctorSearchProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: { xl: layout.heroHeight },
        pt: { xs: 4, md: 6, xl: `${layout.heroPaddingTop}px` },
        pb: { xs: 3, xl: '21px' },
        px: { xs: 2, sm: 3, md: 4, xl: `${layout.pageGutter}px` },
        background: 'linear-gradient(180deg, #ECF7FC 0%, #F3FAFD 65%, #EAF6FC 100%)',
      }}
    >
      <Box
        component="img"
        src={heartArt}
        alt=""
        sx={{
          display: { xs: 'none', xl: 'block' },
          position: 'absolute',
          top: 0,
          left: 850,
          width: 378,
          height: 101,
          pointerEvents: 'none',
        }}
      />
      <Box
        component="img"
        src={shapesArt}
        alt=""
        sx={{
          display: { xs: 'none', xl: 'block' },
          position: 'absolute',
          top: 191,
          left: 1053,
          width: 175,
          height: 119,
          pointerEvents: 'none',
        }}
      />
      <Box
        component="img"
        src={stethoscopeArt}
        alt=""
        sx={{
          display: { xs: 'none', xl: 'block' },
          position: 'absolute',
          top: 0,
          right: 0,
          width: 308,
          height: 310,
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 2.5, md: 3, xl: `${layout.searchToFilters}px` },
        }}
      >
        <SearchInput
          query={query}
          city={filters.city}
          onQueryChange={onQueryChange}
          onCityChange={(city) => {
            onFiltersChange({
              ...filters,
              city,
              specialty: 'All Specialties',
              location: 'Nearest Location',
            })
          }}
          onSearch={onSearch}
        />
        <SearchFilters filters={filters} onChange={onFiltersChange} />
      </Box>
    </Box>
  )
}
