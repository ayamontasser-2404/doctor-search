import Box from '@mui/material/Box'
import { useMemo, useState } from 'react'
import { DoctorList } from '@/components/DoctorList/DoctorList.tsx'
import { DoctorSearch } from '@/components/DoctorSearch/DoctorSearch.tsx'
import { defaultFilters, doctors, filterDoctors, type DoctorSearchFilters } from '@/data/doctors.ts'
import { layout } from '@/theme/theme.ts'

export function Dashboard() {
  const [query, setQuery] = useState(defaultFilters.query)
  const [filters, setFilters] = useState<DoctorSearchFilters>(defaultFilters)

  const results = useMemo(() => filterDoctors(doctors, filters), [filters])

  function resetFilters() {
    setQuery(defaultFilters.query)
    setFilters(defaultFilters)
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Box
        component="h1"
        sx={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      >
        Find a doctor
      </Box>
      <Box sx={{ maxWidth: layout.pageMaxWidth, mx: 'auto' }}>
        <DoctorSearch
          query={query}
          filters={filters}
          onQueryChange={setQuery}
          onFiltersChange={setFilters}
          onSearch={() => {
            setFilters((current) => ({ ...current, query }))
          }}
        />
        <Box
          component="section"
          aria-label="Doctor results"
          sx={{
            pl: { xs: 2, sm: 3, md: 4, xl: `${layout.pageGutter}px` },
            pr: { xs: 2, sm: 3, md: 4, xl: '77px' },
            pt: { xs: 2, xl: '6px' },
            pb: { xs: 4, md: 6 },
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              width: '1px',
              height: '1px',
              padding: 0,
              margin: '-1px',
              overflow: 'hidden',
              clip: 'rect(0, 0, 0, 0)',
              whiteSpace: 'nowrap',
              border: 0,
            }}
            aria-live="polite"
          >
            {`${results.length} doctors`}
          </Box>
          <DoctorList doctors={results} onReset={resetFilters} />
        </Box>
      </Box>
    </Box>
  )
}
