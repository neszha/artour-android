/**
 * Auth.
 */
export const API_URL_AUTH_GOOGLE_MOBILE_CALLBACK = '/auth/google/mobile-callback'
export const API_URL_AUTH_SESSION_INFO: string = '/auth/my-session'
export const API_URL_LOGOUT: string = '/auth/logout'

/**
 * User.
 */
export const API_URL_USERS: string = '/users'
export const API_URL_USER_AVATAR: string = '/users/avatars'
export const API_URL_USER_INFO: string = '/users/info'
export const API_URL_USERS_ID: string = '/users/:userId'

/**
 * File.
 */
export const API_URL_FILE_MAP_CONTENTS: string = '/files/map-contents'

/**
 * Place Category.
 */
export const API_URL_PLACE_CATEGORY_MAP_MARKERS: string = '/place-categories/map-markers'
export const API_URL_PLACE_CATEGORIES: string = '/place-categories' // ?with-popular-place=${boolean}
export const API_URL_PLACE_CATEGORIES_ID: string = '/place-categories/:placeCategoryId'

/**
 * Place
 */
export const API_URL_PLACES: string = '/places'
export const API_URL_PLACES_ME: string = '/places/my-places'
export const API_URL_PLACES_BOOKMARKS: string = '/places/bookmarks'
export const API_URL_PLACES_ID: string = '/places/:placeId'
export const API_URL_PLACES_IMAGES: string = '/places/:placeId/images'

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
export const API_URL_PLACE_INC_VIEWS: string = '/places/:placeId/inc-views'
export const API_URL_PLACE_ADD_BOOKMARKS: string = '/places/:placeId/add-bookmarks'

/**
 * Place Review
 */
export const API_URL_PLACE_REVIEWS: string = '/place-reviews'
export const API_URL_PLACE_REVIEWS_MY_REVIEW: string = '/place-reviews/my-review'
export const API_URL_PLACE_REVIEWS_MY_REVIEWS: string = '/place-reviews/my-reviews'
export const API_URL_PLACE_REVIEWS_ID: string = '/place-reviews/:placeReviewId'

/**
 * Summary.
 */
export const APU_URL_SUMMARY_DATA_OVERVIEW: string = '/summary/data-overview'
