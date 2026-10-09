import { DoctorCard } from '@/components/DoctorCard/DoctorCard.tsx'
import type { Doctor } from '@/data/doctors.ts'

type DoctorListProps = {
  doctors: Doctor[]
  onReset: () => void
}

export function DoctorList({ doctors, onReset }: DoctorListProps) {
  if (doctors.length === 0) {
    return (
      <div className="py-16 text-center">
        <h2 className="font-roboto text-2xl leading-[34px] font-bold text-ink">No doctors match these filters.</h2>
        <p className="mt-2 mb-6 font-inter text-[18px] text-muted">Try another specialty, date, or city.</p>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex cursor-pointer items-center justify-center rounded-2xl border-0 bg-brand px-4 py-1.5 font-roboto text-base font-medium text-white hover:bg-brand-hover"
        >
          Reset filters
        </button>
      </div>
    )
  }

  return (
    <ul className="m-0 flex list-none flex-col gap-5 p-0">
      {doctors.map((doctor) => (
        <li key={doctor.id}>
          <DoctorCard doctor={doctor} />
        </li>
      ))}
    </ul>
  )
}
