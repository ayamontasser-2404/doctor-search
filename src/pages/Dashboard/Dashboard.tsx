import { useMemo, useState } from 'react'
import { DoctorList } from '@/components/DoctorList/DoctorList.tsx'
import { DoctorSearch } from '@/components/DoctorSearch/DoctorSearch.tsx'
import { defaultFilters, doctors, filterDoctors, type DoctorSearchFilters } from '@/data/doctors.ts'

export function Dashboard() {
  const [query, setQuery] = useState(defaultFilters.query)
  const [filters, setFilters] = useState<DoctorSearchFilters>(defaultFilters)

  const results = useMemo(() => filterDoctors(doctors, filters), [filters])

  function resetFilters() {
    setQuery(defaultFilters.query)
    setFilters(defaultFilters)
  }

  return (
    <div className="min-h-screen bg-page">
      <h1 className="sr-only">Find a doctor</h1>
      <div className="mx-auto max-w-[1536px]">
        <DoctorSearch
          query={query}
          filters={filters}
          onQueryChange={setQuery}
          onFiltersChange={setFilters}
          onSearch={() => {
            setFilters((current) => ({ ...current, query }))
          }}
        />
        <section
          aria-label="Doctor results"
          className="relative z-0 pt-4 pr-4 pb-8 pl-4 min-[600px]:pr-6 min-[600px]:pl-6 min-[900px]:pr-8 min-[900px]:pb-12 min-[900px]:pl-8 min-[1536px]:pt-1.5 min-[1536px]:pr-[77px] min-[1536px]:pl-[78px]"
        >
          <div className="sr-only" aria-live="polite">
            {`${results.length} doctors`}
          </div>
          <DoctorList doctors={results} onReset={resetFilters} />
        </section>
      </div>
    </div>
  )
}
