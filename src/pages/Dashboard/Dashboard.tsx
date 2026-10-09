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
      <div className="mx-auto max-w-page">
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
          className="relative z-0 px-4 pt-4 pb-8 sm:px-6 md:px-8 md:pb-12 xl:px-gutter xl:pt-1.5"
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
