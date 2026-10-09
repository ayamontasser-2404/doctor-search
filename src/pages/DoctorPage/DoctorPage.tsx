import { Link, useParams } from 'react-router'
import globeIcon from '@/assets/doctor-search/globe.svg'
import mapPinIcon from '@/assets/doctor-search/map-pin.svg'
import verifiedIcon from '@/assets/doctor-search/verified.svg'
import { doctors } from '@/data/doctors.ts'
import { NotFoundPage } from '@/pages/NotFoundPage.tsx'
import { paths } from '@/routes/paths.ts'

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

export function DoctorPage() {
  const { doctorId } = useParams()
  const doctor = doctors.find((item) => item.id === doctorId)

  if (!doctor) {
    return <NotFoundPage />
  }

  const distance = `${doctor.distanceKm.toFixed(1)} km · ${doctor.area}`

  return (
    <div className="min-h-screen bg-page">
      <div className="mx-auto max-w-[1536px] px-4 py-6 min-[600px]:px-6 min-[900px]:px-8 min-[900px]:py-12 min-[1536px]:px-[78px]">
        <Link to={paths.home} className="mb-6 inline-block font-inter text-lg text-brand no-underline">
          Return home
        </Link>
        <article className="flex flex-col gap-5 rounded-[26px] border border-[#EFF2F5] bg-white px-6 py-[22px] shadow-[0px_4px_12px_rgba(40,78,112,0.06)] min-[900px]:flex-row min-[900px]:gap-9">
          <img
            src={doctor.portraitUrl}
            alt=""
            className="h-[120px] w-[120px] shrink-0 rounded-2xl object-cover min-[600px]:h-[175px] min-[600px]:w-[183px]"
          />
          <div className="flex min-w-0 flex-col gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="m-0 font-roboto text-[1.75rem] leading-[34px] font-bold text-ink">{doctor.name}</h1>
                {doctor.verified ? <img src={verifiedIcon} alt="Verified doctor" className="block h-[25px] w-[25px]" /> : null}
              </div>
              <p className="m-0 mt-1.5 font-inter text-base text-muted min-[900px]:text-xl">{doctor.specialty}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <StarRating rating={doctor.rating} />
              <span className="font-inter text-base font-medium text-navy min-[900px]:text-xl">{doctor.rating.toFixed(1)}</span>
              <span className="font-inter text-[15px] text-muted min-[900px]:text-lg">({doctor.reviewCount} reviews)</span>
            </div>
            <p className="m-0 flex items-center gap-4 font-inter text-base text-muted min-[900px]:text-xl">
              <img src={mapPinIcon} alt="" className="block h-[23px] w-[23px]" />
              {distance}
            </p>
            <p className="m-0 flex items-center gap-4 font-inter text-base text-muted min-[900px]:text-xl">
              <img src={globeIcon} alt="" className="block h-[23px] w-[23px]" />
              {`Speaks: ${doctor.languages.join(', ')}`}
            </p>
            <div className="flex flex-wrap gap-2.5">
              {doctor.careServices.map((service) => (
                <span key={service} className="rounded-xl bg-chip px-[13px] py-[11px] font-inter text-[15px] leading-[1.2] text-chip-text">
                  {service}
                </span>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
