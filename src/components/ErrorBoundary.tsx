import { Component, type ErrorInfo, type ReactNode } from 'react'

type ErrorBoundaryProps = {
  children: ReactNode
}

type ErrorBoundaryState = {
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  override state: ErrorBoundaryState = { error: null }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error }
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error(error, info.componentStack)
  }

  override render() {
    if (this.state.error) {
      return (
        <main style={{ fontFamily: 'Roboto, Helvetica, Arial, sans-serif', padding: '2rem' }}>
          <h1>Something went wrong</h1>
          <p>{this.state.error.message}</p>
        </main>
      )
    }

    return this.props.children
  }
}
