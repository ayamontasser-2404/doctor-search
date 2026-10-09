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
    <span aria-hidden className="flex gap-[3px]">
      {Array.from({ length: 5 }, (_, index) => (
        <svg key={index} viewBox="0 0 22 24" className="block h-6 w-[22px]">
          <path
            d="M11 0L14.2 8.14884L22 9.04186L16.2 14.9581L17.9 24L11 19.4233L4.1 24L5.8 14.9581L0 9.04186L7.8 8.14884L11 0Z"
            fill={index < filled ? '#FFAE00' : '#E7EDF2'}
          />
        </svg>
      ))}
    </span>
  )
}

function MetadataRow({ icon, children }: { icon: string; children: string }) {
  return (
    <span className="flex items-center gap-4">
      <img src={icon} alt="" className="block h-[23px] w-[23px] shrink-0" />
      <span className="font-inter text-base leading-[1.2] text-muted min-[900px]:text-xl">{children}</span>
    </span>
  )
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  const distance = `${doctor.distanceKm.toFixed(1)} km · ${doctor.area}`

  return (
    <article className="flex w-full flex-col items-stretch gap-5 overflow-hidden rounded-[26px] border border-[#EFF2F5] bg-white px-6 py-[22px] shadow-[0px_4px_12px_rgba(40,78,112,0.06)] min-[900px]:flex-row min-[900px]:items-center min-[900px]:gap-[26px] min-[1200px]:min-h-[226px]">
      <div className="flex min-w-0 flex-1 flex-col flex-wrap items-stretch gap-4 min-[600px]:flex-row min-[600px]:items-start min-[900px]:gap-9 min-[1536px]:flex-nowrap">
        <img
          src={doctor.portraitUrl}
          alt=""
          className="h-[120px] w-[120px] shrink-0 rounded-2xl object-cover min-[600px]:h-[175px] min-[600px]:w-[183px]"
        />
        <div className="flex min-w-0 flex-[1_1_240px] flex-col gap-2.5 min-[900px]:pt-1 min-[1536px]:w-[373px] min-[1536px]:flex-[0_0_373px]">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="m-0 font-roboto text-[1.75rem] leading-[34px] font-bold tracking-normal text-ink">{doctor.name}</h2>
              {doctor.verified ? <img src={verifiedIcon} alt="Verified doctor" className="block h-[25px] w-[25px]" /> : null}
            </div>
            <p className="m-0 mt-1.5 font-inter text-base text-muted min-[900px]:text-xl">{doctor.specialty}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <StarRating rating={doctor.rating} />
            <span className="font-inter text-base font-medium text-navy min-[900px]:text-xl">{doctor.rating.toFixed(1)}</span>
            <span className="font-inter text-[15px] text-muted min-[900px]:text-lg">({doctor.reviewCount} reviews)</span>
          </div>
          <div className="flex flex-col gap-[11px] pt-[9px]">
            <MetadataRow icon={mapPinIcon}>{distance}</MetadataRow>
            <MetadataRow icon={globeIcon}>{`Speaks: ${doctor.languages.join(', ')}`}</MetadataRow>
          </div>
        </div>
        <div className="flex w-full max-w-full flex-[1_1_100%] flex-wrap content-start gap-x-[14px] gap-y-2.5 min-[900px]:pt-[17px] min-[1536px]:w-[403px] min-[1536px]:flex-[0_0_403px]">
          {doctor.careServices.map((service) => (
            <span key={service} className="rounded-xl bg-chip px-[13px] py-[11px] font-inter text-[15px] leading-[1.2] text-chip-text">
              {service}
            </span>
          ))}
        </div>
      </div>
      <div className="flex w-full shrink-0 items-center justify-stretch gap-[30px] min-[900px]:w-[276px] min-[900px]:justify-end">
        <span className="hidden h-[172px] w-px shrink-0 bg-line min-[900px]:block" />
        <Link
          to={doctorPath(doctor.id)}
          aria-label={`View profile of ${doctor.name}`}
          className="flex h-[57px] w-full items-center justify-center gap-2.5 rounded-[15px] bg-brand font-roboto text-xl font-medium text-white no-underline hover:bg-brand-hover min-[900px]:w-[245px]"
        >
          View Profile
          <img src={chevronRight} alt="" className="block h-[23px] w-[23px]" />
        </Link>
      </div>
    </article>
  )
}
