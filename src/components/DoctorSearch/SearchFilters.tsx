import Box from '@mui/material/Box'
import calendarIcon from '@/assets/doctor-search/calendar.svg'
import mapPinIcon from '@/assets/doctor-search/map-pin-filter.svg'
import starIcon from '@/assets/doctor-search/star.svg'
import stethoscopeIcon from '@/assets/doctor-search/stethoscope.svg'
import { dateOptions, locationOptionsFor, sortOptions, specialtyOptionsFor, type DoctorSearchFilters } from '@/data/doctors.ts'
import { layout } from '@/theme/theme.ts'
import { FilterSelect } from './FilterSelect.tsx'

type SearchFiltersProps = {
  filters: DoctorSearchFilters
  onChange: (filters: DoctorSearchFilters) => void
}

export function SearchFilters({ filters, onChange }: SearchFiltersProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: `${layout.filterGap}px`,
        maxWidth: { xl: 1146 },
        position: 'relative',
        zIndex: 1,
      }}
    >
      <FilterSelect
        label="Specialty"
        icon={stethoscopeIcon}
        value={filters.specialty}
        options={specialtyOptionsFor(filters.city)}
        onChange={(specialty) => {
          onChange({ ...filters, specialty })
        }}
      />
      <FilterSelect
        label="Date"
        icon={calendarIcon}
        value={filters.date}
        options={dateOptions}
        onChange={(date) => {
          onChange({ ...filters, date })
        }}
      />
      <FilterSelect
        label="Location"
        icon={mapPinIcon}
        value={filters.location}
        options={locationOptionsFor(filters.city)}
        onChange={(location) => {
          onChange({ ...filters, location })
        }}
      />
      <FilterSelect
        label="Sort"
        icon={starIcon}
        value={filters.sort}
        options={sortOptions}
        onChange={(sort) => {
          onChange({ ...filters, sort })
        }}
      />
    </Box>
  )
}
