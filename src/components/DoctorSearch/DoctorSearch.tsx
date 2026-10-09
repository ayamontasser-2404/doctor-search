import heartArt from '@/assets/doctor-search/heart-art.png'
import shapesArt from '@/assets/doctor-search/shapes-art.png'
import stethoscopeArt from '@/assets/doctor-search/stethoscope-art.png'
import type { DoctorSearchFilters } from '@/data/doctors.ts'
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
    <section className="relative z-10 bg-hero px-4 pt-8 pb-6 sm:px-6 md:px-8 md:pt-12 xl:min-h-hero xl:px-gutter xl:pt-hero xl:pb-5">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <img src={heartArt} alt="" className="absolute top-0 left-art-heart hidden h-art-heart w-art-heart xl:block" />
        <img
          src={shapesArt}
          alt=""
          className="absolute top-art-shapes-y left-art-shapes-x hidden h-art-shapes w-art-shapes xl:block"
        />
        <img src={stethoscopeArt} alt="" className="absolute top-0 right-0 hidden h-art-scope w-art-scope xl:block" />
      </div>
      <div className="relative flex flex-col gap-5 md:gap-6 xl:gap-section">
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
      </div>
    </section>
  )
}
