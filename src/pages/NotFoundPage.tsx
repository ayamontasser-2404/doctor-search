import { Link } from 'react-router'
import { paths } from '@/routes/paths.ts'

export function NotFoundPage() {
  return (
    <main className="mx-auto max-w-narrow px-4 py-16 md:py-24">
      <p className="m-0 font-inter text-xs tracking-label text-brand uppercase">404</p>
      <h1 className="mt-3 mb-4 font-roboto text-4xl font-medium tracking-tight text-ink sm:text-display">Page not found</h1>
      <p className="mb-6 max-w-copy font-inter text-xl leading-copy text-muted">
        That address is outside the physician workspace. Return to the foundation screen.
      </p>
      <Link
        to={paths.home}
        className="inline-flex items-center justify-center rounded-2xl bg-brand px-4 py-2 font-roboto text-base font-medium text-white no-underline hover:bg-brand-hover"
      >
        Return home
      </Link>
    </main>
  )
}
