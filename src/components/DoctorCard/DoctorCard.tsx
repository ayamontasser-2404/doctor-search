import { Link } from 'react-router'
import chevronRight from '@/assets/doctor-search/chevron-right.svg'
import globeIcon from '@/assets/doctor-search/globe.svg'
import mapPinIcon from '@/assets/doctor-search/map-pin.svg'
import verifiedIcon from '@/assets/doctor-search/verified.svg'
import type { Doctor } from '@/data/doctors.ts'
import { doctorPath } from '@/routes/paths.ts'

type DoctorCardProps = {
  doctor: Doctor
}

function StarRating({ rating }: { rating: number }) {
  const filled = Math.max(0, Math.min(5, Math.round(rating)))

  return (
    <span aria-hidden className="flex gap-1">
      {Array.from({ length: 5 }, (_, index) => (
        <svg key={index} viewBox="0 0 22 24" className="block h-6 w-star">
          <path
            d="M11 0L14.2 8.14884L22 9.04186L16.2 14.9581L17.9 24L11 19.4233L4.1 24L5.8 14.9581L0 9.04186L7.8 8.14884L11 0Z"
            className={index < filled ? 'fill-star' : 'fill-line'}
          />
        </svg>
      ))}
    </span>
  )
}

function MetadataRow({ icon, children }: { icon: string; children: string }) {
  return (
    <span className="flex items-center gap-4">
      <img src={icon} alt="" className="block size-meta shrink-0" />
      <span className="font-inter text-base leading-copy text-muted md:text-xl">{children}</span>
    </span>
  )
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  const distance = `${doctor.distanceKm.toFixed(1)} km · ${doctor.area}`

  return (
    <article className="flex w-full flex-col items-stretch gap-5 overflow-hidden rounded-card border border-card-border bg-white px-6 py-card shadow-card md:flex-row md:items-center md:gap-card-row lg:min-h-card">
      <div className="flex min-w-0 flex-1 flex-col flex-wrap items-stretch gap-4 sm:flex-row sm:items-start md:gap-9 xl:flex-nowrap">
        <img
          src={doctor.portraitUrl}
          alt=""
          className="size-30 shrink-0 rounded-2xl object-cover sm:h-portrait sm:w-portrait"
        />
        <div className="flex min-w-0 grow basis-60 flex-col gap-2.5 md:pt-1 xl:w-identity xl:flex-none">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="m-0 font-roboto text-doctor font-bold tracking-normal text-ink">{doctor.name}</h2>
              {doctor.verified ? <img src={verifiedIcon} alt="Verified doctor" className="block size-badge" /> : null}
            </div>
            <p className="m-0 mt-1.5 font-inter text-base text-muted md:text-xl">{doctor.specialty}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <StarRating rating={doctor.rating} />
            <span className="font-inter text-base font-medium text-navy md:text-xl">{doctor.rating.toFixed(1)}</span>
            <span className="font-inter text-review text-muted md:text-lg">({doctor.reviewCount} reviews)</span>
          </div>
          <div className="flex flex-col gap-3 pt-2.5">
            <MetadataRow icon={mapPinIcon}>{distance}</MetadataRow>
            <MetadataRow icon={globeIcon}>{`Speaks: ${doctor.languages.join(', ')}`}</MetadataRow>
          </div>
        </div>
        <div className="flex w-full max-w-full grow basis-full flex-wrap content-start gap-x-3.5 gap-y-2.5 md:pt-4 xl:w-services xl:flex-none">
          {doctor.careServices.map((service) => (
            <span key={service} className="rounded-xl bg-chip px-chip-x py-chip-y font-inter text-review text-chip-text">
              {service}
            </span>
          ))}
        </div>
      </div>
      <div className="flex w-full shrink-0 items-center justify-stretch gap-action md:w-aside md:justify-end">
        <span className="hidden h-divider w-px shrink-0 bg-line md:block" />
        <Link
          to={doctorPath(doctor.id)}
          aria-label={`View profile of ${doctor.name}`}
          className="flex h-filter w-full items-center justify-center gap-2.5 rounded-control bg-brand font-roboto text-xl font-medium text-white no-underline hover:bg-brand-hover md:w-action"
        >
          View Profile
          <img src={chevronRight} alt="" className="block size-meta" />
        </Link>
      </div>
    </article>
  )
}
