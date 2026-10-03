function readEnv(value: string | undefined, fallback: string): string {
  const trimmed = value?.trim()
  return trimmed ? trimmed : fallback
}

export const env = {
  appName: readEnv(import.meta.env.VITE_APP_NAME, 'azcare-doctor-search'),
  apiBaseUrl: readEnv(import.meta.env.VITE_API_BASE_URL, ''),
} as const
