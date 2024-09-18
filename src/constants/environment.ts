/**
 * App Enpoints.
 */
export const API_BASE_URL: string = import.meta.env.VITE_APP_API_BASE_URL ?? 'https://api.itentix.com'
export const LANDING_PAGE_BASE_URL: string = import.meta.env.VITE_APP_LANDING_PAGE_BASE_URL ?? 'https://itentix.com'

/**
 * App keys.
*/
export const GOOGLE_AUTH_CLIENT_ID: string = import.meta.env.VITE_APP_GOOGLE_AUTH_CLIENT_ID ?? ''
export const GOOGLE_MAPS_API_KEY: string = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY ?? ''

/**
 * Test Mode.
 */
export const IN_TEST_MODE: boolean = import.meta.env.VITE_APP_TEST_MODE === 'true'
