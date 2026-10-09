import { Component, type ErrorInfo, type ReactNode } from 'react'

type ErrorBoundaryProps = {
  children: ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean
}

function reloadPage(): void {
  window.location.reload()
}

function ErrorFallback() {
  return (
    <main className="mx-auto max-w-narrow px-4 py-16 sm:py-24">
      <p className="m-0 font-inter text-xs tracking-label text-brand uppercase">Find a doctor</p>
      <h1 className="mt-2 mb-4 font-roboto text-error font-medium tracking-tight text-ink sm:text-error-lg">
        This view failed to load
      </h1>
      <p className="mb-6 max-w-note font-inter text-xl leading-copy text-muted">
        The screen stopped while rendering. Reload the page to start again.
      </p>
      <button
        type="button"
        onClick={reloadPage}
        className="inline-flex cursor-pointer items-center justify-center rounded-2xl border-0 bg-brand px-4 py-2 font-roboto text-base font-medium text-white hover:bg-brand-hover"
      >
        Reload
      </button>
    </main>
  )
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error(error, info.componentStack)
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-page">
          <ErrorFallback />
        </div>
      )
    }

    return this.props.children
  }
}
