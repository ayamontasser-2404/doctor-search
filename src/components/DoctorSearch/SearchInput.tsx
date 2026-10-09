import { useEffect, useId, useRef, useState } from 'react'
import chevronDown from '@/assets/doctor-search/chevron-down.svg'
import mapPin from '@/assets/doctor-search/map-pin-location.svg'
import searchIcon from '@/assets/doctor-search/search.svg'
import searchWhite from '@/assets/doctor-search/search-white.svg'
import { cityOptions } from '@/data/doctors.ts'

type SearchInputProps = {
  query: string
  city: string
  onQueryChange: (query: string) => void
  onCityChange: (city: string) => void
  onSearch: () => void
}

export function SearchInput({ query, city, onQueryChange, onCityChange, onSearch }: SearchInputProps) {
  const menuId = useId()
  const cityRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) {
      return
    }

    function onPointerDown(event: PointerEvent) {
      if (!cityRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <form
      role="search"
      onSubmit={(event) => {
        event.preventDefault()
        onSearch()
      }}
      className="relative z-20 flex w-full flex-col gap-4 rounded-3xl border border-stroke-strong bg-white p-2.5 shadow-bar md:min-h-search md:flex-row md:items-center xl:max-w-search"
    >
      <div className="flex h-14 min-w-0 flex-1 items-center gap-4 pl-3.5 md:h-control">
        <img src={searchIcon} alt="" className="block size-icon shrink-0" />
        <input
          value={query}
          onChange={(event) => {
            onQueryChange(event.target.value)
          }}
          placeholder="Search doctors, specialities or conditions..."
          aria-label="Search doctors, specialities or conditions"
          className="min-w-0 flex-1 border-0 bg-transparent font-roboto text-base text-ink outline-none placeholder:text-muted md:text-search"
        />
      </div>
      <div ref={cityRef} className="relative w-full shrink-0 md:w-city">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-controls={open ? menuId : undefined}
          aria-expanded={open}
          aria-label={`City, ${city}`}
          onClick={() => {
            setOpen((current) => !current)
          }}
          className="flex h-control w-full cursor-pointer items-center justify-start gap-3 rounded-2xl border border-stroke-soft bg-white px-6 font-roboto text-xl font-normal text-label hover:border-stroke-strong"
        >
          <img src={mapPin} alt="" className="block size-icon" />
          <span className="flex-1 text-left">{city}</span>
          <img src={chevronDown} alt="" className="block size-chevron" />
        </button>
        {open ? (
          <ul
            id={menuId}
            role="menu"
            aria-label="City"
            className="absolute top-full left-0 z-20 m-0 mt-1 w-full list-none rounded-lg border border-stroke bg-white px-0 py-1 shadow-bar"
          >
            {cityOptions.map((option) => (
              <li key={option} role="none">
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    onCityChange(option)
                    setOpen(false)
                  }}
                  className={`block w-full cursor-pointer border-0 px-4 py-2 text-left font-roboto text-base ${option === city ? 'bg-chip text-ink' : 'bg-white text-ink hover:bg-chip'}`}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <button
        type="submit"
        className="flex h-control w-full shrink-0 cursor-pointer items-center justify-center gap-3.5 rounded-control border-0 bg-brand font-inter text-xl font-medium text-white hover:bg-brand-hover md:w-submit md:text-2xl"
      >
        <img src={searchWhite} alt="" className="block h-7 w-7" />
        Search
      </button>
    </form>
  )
}
