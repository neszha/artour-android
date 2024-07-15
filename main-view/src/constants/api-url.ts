/**
 * Auth.
 */
export const API_URL_AUTH_GOOGLE_MOBILE_CALLBACK = '/auth/google/mobile-callback'
export const API_URL_AUTH_SESSION_INFO: string = '/auth/my-session'
export const API_URL_LOGOUT: string = '/auth/logout'

/**
 * User.
 */
export const API_URL_USER_AVATAR: string = '/users/avatars'
export const API_URL_USER_INFO: string = '/users/info'

/**
 * File.
 */
export const API_URL_FILE_MAP_CONTENTS: string = '/files/map-contents'

/**
 * Place Category.
 */
export const API_URL_PLACE_CATEGORY_MAP_MARKERS: string = '/place-categories/map-markers'
export const API_URL_PLACE_CATEGORIES: string = '/place-categories'
export const API_URL_PLACE_CATEGORIES_ID: string = '/place-categories/:placeCategoryId'

/**
 * Place
 */
export const API_URL_PLACES: string = '/places'
export const API_URL_PLACES_ID: string = '/places/:placeId'

/**
 * Place Search
 */
export const API_URL_PLACE_HIGHLIGHT: string = '/places/highlight'
export const API_URL_PLACE_NEAREST: string = '/places/nearest'
export const API_URL_PLACE_MAP_SEARCH: string = '/places/map-search' // ?keyword={#1}
export const API_URL_PLACE_AR_MAP_SEARCH: string = '/places/ar-map-search'

/**
 * Place Action
 */
export const API_URL_PLACE_ACTION_METADATA: string = '/places/:placeId/action-metadata'
export const API_URL_PLACE_LIKE: string = '/places/:placeId/like'
export const API_URL_PLACE_DISLIKE: string = '/places/:placeId/dislike'
