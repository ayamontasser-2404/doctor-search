export const paths = {
  home: '/',
  doctor: '/doctors/:doctorId',
} as const

export function doctorPath(doctorId: string) {
  return `/doctors/${doctorId}`
}
