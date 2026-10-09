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
    <section className="relative z-10 bg-[linear-gradient(180deg,#ECF7FC_0%,#F3FAFD_65%,#EAF6FC_100%)] px-4 pt-8 pb-6 min-[600px]:px-6 min-[900px]:px-8 min-[900px]:pt-12 min-[1536px]:min-h-[310px] min-[1536px]:px-[78px] min-[1536px]:pt-[101px] min-[1536px]:pb-[21px]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <img src={heartArt} alt="" className="absolute top-0 left-[850px] hidden h-[101px] w-[378px] min-[1536px]:block" />
        <img src={shapesArt} alt="" className="absolute top-[191px] left-[1053px] hidden h-[119px] w-[175px] min-[1536px]:block" />
        <img
          src={stethoscopeArt}
          alt=""
          className="absolute top-0 right-0 hidden h-[310px] w-[308px] min-[1536px]:block"
        />
      </div>
      <div className="relative flex flex-col gap-5 min-[900px]:gap-6 min-[1536px]:gap-[41px]">
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
