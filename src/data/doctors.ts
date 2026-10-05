import annaMuller from '@/assets/doctor-search/anna-muller.png'
import lauraKlein from '@/assets/doctor-search/laura-klein.png'
import markusSchneider from '@/assets/doctor-search/markus-schneider.png'

export type DoctorAvailability = 'Today' | 'Tomorrow' | 'This Week'

export type Doctor = {
  id: string
  name: string
  specialty: string
  verified: boolean
  rating: number
  reviewCount: number
  distanceKm: number
  area: string
  city: string
  languages: string[]
  careServices: string[]
  portraitUrl: string
  availability: DoctorAvailability
}

export type DoctorSearchFilters = {
  query: string
  city: string
  specialty: string
  date: string
  location: string
  sort: string
}

export const defaultFilters: DoctorSearchFilters = {
  query: '',
  city: 'Berlin, Germany',
  specialty: 'All Specialties',
  date: 'Any Date',
  location: 'Nearest Location',
  sort: 'Highest Rating',
}

export const cityOptions = ['Berlin, Germany', 'Munich, Germany', 'Hamburg, Germany'] as const

export const dateOptions = ['Any Date', 'Today', 'Tomorrow', 'This Week'] as const

export const sortOptions = ['Highest Rating', 'Most Reviews', 'Nearest'] as const

export const doctors: Doctor[] = [
  {
    id: 'markus-schneider',
    name: 'Dr. Markus Schneider',
    specialty: 'Cardiologist',
    verified: true,
    rating: 4.9,
    reviewCount: 86,
    distanceKm: 5.1,
    area: 'Berlin-Mitte',
    city: 'Berlin, Germany',
    languages: ['German', 'English', 'Arabic'],
    careServices: ['Heart Health', 'Hypertension', 'Cholesterol Management', 'Preventive Cardiology'],
    portraitUrl: markusSchneider,
    availability: 'Tomorrow',
  },
  {
    id: 'anna-muller',
    name: 'Dr. Anna Müller',
    specialty: 'General Practitioner',
    verified: true,
    rating: 4.8,
    reviewCount: 120,
    distanceKm: 3.2,
    area: 'Berlin-Zehlendorf',
    city: 'Berlin, Germany',
    languages: ['German', 'English'],
    careServices: ['Preventive Care', 'Chronic Disease Management', 'Vaccinations', 'Health Check-ups'],
    portraitUrl: annaMuller,
    availability: 'Today',
  },
  {
    id: 'laura-klein',
    name: 'Dr. Laura Klein',
    specialty: 'Dermatologist',
    verified: true,
    rating: 4.7,
    reviewCount: 64,
    distanceKm: 2.8,
    area: 'Berlin-Steglitz',
    city: 'Berlin, Germany',
    languages: ['German', 'English'],
    careServices: ['Skin Conditions', 'Acne Treatment', 'Skin Cancer Screening', 'Cosmetic Dermatology'],
    portraitUrl: lauraKlein,
    availability: 'Today',
  },
  {
    id: 'jonas-weber',
    name: 'Dr. Jonas Weber',
    specialty: 'Orthopedist',
    verified: true,
    rating: 4.6,
    reviewCount: 98,
    distanceKm: 2.4,
    area: 'Munich-Schwabing',
    city: 'Munich, Germany',
    languages: ['German', 'English'],
    careServices: ['Joint Pain', 'Sports Injuries', 'Spine Care', 'Arthritis'],
    portraitUrl: markusSchneider,
    availability: 'This Week',
  },
  {
    id: 'sofia-rahman',
    name: 'Dr. Sofia Rahman',
    specialty: 'Pediatrician',
    verified: true,
    rating: 4.8,
    reviewCount: 210,
    distanceKm: 1.6,
    area: 'Hamburg-Eimsbüttel',
    city: 'Hamburg, Germany',
    languages: ['German', 'English', 'Arabic'],
    careServices: ['Child Wellness', 'Vaccinations', 'Asthma', 'Newborn Care'],
    portraitUrl: annaMuller,
    availability: 'Today',
  },
]

export function specialtyOptionsFor(city: string): string[] {
  const specialties = doctors.filter((doctor) => doctor.city === city).map((doctor) => doctor.specialty)
  return ['All Specialties', ...new Set(specialties)]
}

export function locationOptionsFor(city: string): string[] {
  const areas = doctors.filter((doctor) => doctor.city === city).map((doctor) => doctor.area)
  return ['Nearest Location', ...new Set(areas)]
}

export function filterDoctors(source: readonly Doctor[], filters: DoctorSearchFilters): Doctor[] {
  const query = filters.query.trim().toLowerCase()

  const matched = source.filter((doctor) => {
    if (doctor.city !== filters.city) {
      return false
    }

    if (filters.specialty !== 'All Specialties' && doctor.specialty !== filters.specialty) {
      return false
    }

    if (filters.date === 'Today' && doctor.availability !== 'Today') {
      return false
    }

    if (filters.date === 'Tomorrow' && doctor.availability !== 'Tomorrow') {
      return false
    }

    if (filters.location !== 'Nearest Location' && doctor.area !== filters.location) {
      return false
    }

    if (query.length === 0) {
      return true
    }

    const haystack = [doctor.name, doctor.specialty, doctor.area, doctor.city, ...doctor.languages, ...doctor.careServices]
      .join(' ')
      .toLowerCase()

    return haystack.includes(query)
  })

  const sorted = [...matched]

  if (filters.sort === 'Most Reviews') {
    sorted.sort((left, right) => right.reviewCount - left.reviewCount)
  } else if (filters.sort === 'Nearest') {
    sorted.sort((left, right) => left.distanceKm - right.distanceKm)
  } else {
    sorted.sort((left, right) => right.rating - left.rating || left.distanceKm - right.distanceKm)
  }

  return sorted
}
