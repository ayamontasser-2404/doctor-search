import { useEffect, useId, useRef, useState } from 'react'
import chevronDown from '@/assets/doctor-search/chevron-down-filter.svg'

type FilterSelectProps = {
  label: string
  value: string
  options: readonly string[]
  icon: string
  onChange: (value: string) => void
}

export function FilterSelect({ label, value, options, icon, onChange }: FilterSelectProps) {
  const menuId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) {
      return
    }

    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
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
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-controls={open ? menuId : undefined}
        aria-expanded={open}
        onClick={() => {
          setOpen((current) => !current)
        }}
        className="inline-flex h-filter cursor-pointer items-center gap-3 rounded-filter border border-stroke bg-white px-6 font-inter text-lg leading-none font-normal whitespace-nowrap text-ink hover:border-stroke-strong"
      >
        <img src={icon} alt="" className="block h-6 w-6" />
        {value}
        <img src={chevronDown} alt="" className="ml-1 block size-chevron" />
      </button>
      {open ? (
        <ul
          id={menuId}
          role="menu"
          aria-label={label}
          className="absolute top-full left-0 z-20 m-0 mt-1 min-w-full list-none rounded-lg border border-stroke bg-white px-0 py-1 shadow-bar"
        >
          {options.map((option) => (
            <li key={option} role="none">
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  onChange(option)
                  setOpen(false)
                }}
                className={`block w-full cursor-pointer border-0 px-4 py-2 text-left font-inter text-base whitespace-nowrap ${option === value ? 'bg-chip text-ink' : 'bg-white text-ink hover:bg-chip'}`}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
