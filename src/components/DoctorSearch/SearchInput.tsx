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
      className="relative z-20 flex w-full flex-col gap-[15px] rounded-3xl border-[1.5px] border-[#D6E5EF] bg-white p-[9px] shadow-[0px_4px_12px_rgba(40,78,112,0.09)] min-[900px]:min-h-[90px] min-[900px]:flex-row min-[900px]:items-center min-[1536px]:max-w-[1146px]"
    >
      <div className="flex h-14 min-w-0 flex-1 items-center gap-[17px] pl-[14px] min-[900px]:h-[73px]">
        <img src={searchIcon} alt="" className="block h-[27px] w-[27px] shrink-0" />
        <input
          value={query}
          onChange={(event) => {
            onQueryChange(event.target.value)
          }}
          placeholder="Search doctors, specialities or conditions..."
          aria-label="Search doctors, specialities or conditions"
          className="min-w-0 flex-1 border-0 bg-transparent font-roboto text-base text-ink outline-none placeholder:text-muted min-[900px]:text-[21px]"
        />
      </div>
      <div ref={cityRef} className="relative w-full shrink-0 min-[900px]:w-[260px]">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-controls={open ? menuId : undefined}
          aria-expanded={open}
          aria-label={`City, ${city}`}
          onClick={() => {
            setOpen((current) => !current)
          }}
          className="flex h-[73px] w-full cursor-pointer items-center justify-start gap-3 rounded-2xl border-[1.5px] border-[#F0F3F6] bg-white px-[23px] font-roboto text-xl font-normal text-[#111111] hover:border-[#D6E5EF]"
        >
          <img src={mapPin} alt="" className="block h-[27px] w-[27px]" />
          <span className="flex-1 text-left">{city}</span>
          <img src={chevronDown} alt="" className="block h-[18px] w-[18px]" />
        </button>
        {open ? (
          <ul
            id={menuId}
            role="menu"
            aria-label="City"
            className="absolute top-full left-0 z-20 m-0 mt-1 w-full list-none rounded-lg border border-[#E8EFF5] bg-white px-0 py-1 shadow-[0px_4px_12px_rgba(40,78,112,0.09)]"
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
        className="flex h-[73px] w-full shrink-0 cursor-pointer items-center justify-center gap-[14px] rounded-[15px] border-0 bg-brand font-inter text-xl font-medium text-white hover:bg-brand-hover min-[900px]:w-[233px] min-[900px]:text-2xl"
      >
        <img src={searchWhite} alt="" className="block h-7 w-7" />
        Search
      </button>
    </form>
  )
}
