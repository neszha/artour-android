import { defineStore } from 'pinia'
import { type AxiosResponse } from 'axios'
import axios from '@/helpers/axios.helper'
import { type Coordinates } from '@/interfaces/Geolocation'
import { type PlaceCategoryEntity, type PlaceEntity } from '@/interfaces/Place'
import { API_URL_PLACES_BOOKMARKS, API_URL_PLACES_ID, API_URL_PLACES_ME, API_URL_PLACE_AR_MAP_SEARCH, API_URL_PLACE_CATEGORIES, API_URL_PLACE_HIGHLIGHT, API_URL_PLACE_MAP_SEARCH, API_URL_PLACE_NEARBY_PLACE, API_URL_PLACE_NEAREST } from '@/constants/api-url'
import { API_BASE_URL } from '@/constants/environment'

interface PlaceState {
    placeCategories: PlaceCategoryEntity[]
    placePreviewCategories: PlaceCategoryEntity[] // For category preview in explore page
    myPlaces: PlaceEntity[]
    placeDetailObject?: Record<string, PlaceEntity>
    placeSearchList: PlaceEntity[]
    placeArSearchList: PlaceEntity[]
    placeBookmarks: PlaceEntity[]
    hightlightPlaces: PlaceEntity[]
    nearestPlaces: PlaceEntity[]
}

export const usePlaceStore = defineStore('place', {
    /**
     * States.
     */
    state: (): PlaceState => ({
        placeCategories: [],
        placePreviewCategories: [],
        myPlaces: [],
        placeDetailObject: {},
        placeSearchList: [],
        placeArSearchList: [],
        placeBookmarks: [],
        hightlightPlaces: [],
        nearestPlaces: []
    }),

    /**
     * Actions.
     */
    actions: {
        async getPlaceCategories () {
            try {
                const response: AxiosResponse = await axios.get(API_URL_PLACE_CATEGORIES)
                const data = response.data.data as PlaceCategoryEntity[]
                this.placeCategories = data
            } catch (error) {
                console.error(error)
            }
        },

        async getPlacePreviewCategories () {
            try {
                const response: AxiosResponse = await axios.get(`${API_URL_PLACE_CATEGORIES}?with-popular-place=true`)
                const data = response.data.data as PlaceCategoryEntity[]
                this.placePreviewCategories = data
            } catch (error) {
                console.error(error)
                this.placePreviewCategories = []
            }
        },

        async getMyPlaces () {
            try {
                const response: AxiosResponse = await axios.get(API_URL_PLACES_ME)
                const data = response.data.data as PlaceEntity[]
                this.myPlaces = data
            } catch (error) {
                console.error(error)
            }
        },

        async searchPlacesByKeyword (keyword: string, coordinates: Coordinates) {
            try {
                const url = `${API_URL_PLACE_MAP_SEARCH}?keyword=${keyword}`
                const response: AxiosResponse = await axios.post(url, {
                    latitude: coordinates.latitude,
                    longitude: coordinates.longitude
                })
                const data = response.data.data as PlaceEntity[]
                if (data.length === 0) {
                    if (window.Android !== undefined) {
                        window.Android.showToast('Tidak ada tempat wisata yang ditemukan.')
                    }
                }
                this.placeSearchList = data
            } catch (error) {
                this.placeSearchList = []
                console.error(error)
            }
        },

        async getNearestPlacesByPlaceLocation (placeId: string) {
            try {
                const url = `${API_URL_PLACE_NEARBY_PLACE}?placeId=${placeId}`
                const response: AxiosResponse = await axios.get(url)
                const data = response.data.data as PlaceEntity[]
                if (data.length === 0) {
                    if (window.Android !== undefined) {
                        window.Android.showToast('Tidak ada tempat wisata yang ditemukan.')
                    }
                }
                this.placeSearchList = data
            } catch (error) {
                this.placeSearchList = []
                console.error(error)
            }
        },

        async getPlaceArMapSearch (myCoord: Coordinates) {
            try {
                const response: AxiosResponse = await axios.post(API_URL_PLACE_AR_MAP_SEARCH, myCoord)
                const data = response.data.data as PlaceEntity[]
                if (data.length === 0) {
                    if (window.Android !== undefined) {
                        window.Android.showToast('Tidak ada tempat wisata yang ditemukan.')
                    }
                }
                this.placeArSearchList = data
            } catch (error) {
                this.placeArSearchList = []
                console.error(error)
            }
        },

        async getPlaceBookmarks () {
            try {
                const response: AxiosResponse = await axios.get(API_URL_PLACES_BOOKMARKS)
                const data = response.data.data as PlaceEntity[]
                this.placeBookmarks = data
            } catch (error) {
                this.placeBookmarks = []
                console.error(error)
            }
        },

        async getHighlightPlaces () {
            try {
                const response: AxiosResponse = await axios.get(API_URL_PLACE_HIGHLIGHT)
                const data = response.data.data as PlaceEntity[]
                this.hightlightPlaces = data
            } catch (error) {
                this.hightlightPlaces = []
                console.error(error)
            }
        },

        async getNearestPlaces (coord: Coordinates) {
            try {
                const response: AxiosResponse = await axios.post(API_URL_PLACE_NEAREST, {
                    latitude: coord.latitude,
                    longitude: coord.longitude
                })
                const data = response.data.data as PlaceEntity[]
                this.nearestPlaces = data
            } catch (error) {
                this.nearestPlaces = []
                console.error(error)
            }
        },

        async getPlaceDetail (placeId: string): Promise<boolean> {
            try {
                const url = API_URL_PLACES_ID.replace(':placeId', placeId)
                const response: AxiosResponse = await axios.get(url)
                const data = response.data.data as PlaceEntity
                this.placeDetailObject = { [placeId]: data }
                return true
            } catch (error) {
                console.error(error)
                return false
            }
        },

        sharePlace (placeId: string) {
            if (this.placeDetailObject === undefined) return
            const place = this.placeDetailObject[placeId]
            const hashtags = place.hashtags.map((hashtag) => `#${hashtag}`).join(' ')
            let textContent = place.name
            textContent += '\n\n'
            textContent += place.description
            textContent += '\n'
            textContent += `${API_BASE_URL}/places/${placeId}`
            textContent += '\n\n'
            textContent += 'Diposting oleh ' + place.user?.name
            if (hashtags !== '') {
                textContent += '\n\n'
                textContent += hashtags
            }
            const imageCoverUrl = place.mapImageCover?.link ?? ''
            if (window.Android !== undefined) {
                window.Android.openShareContent(textContent, imageCoverUrl)
            } else {
                console.log(textContent, imageCoverUrl)
                alert('open share content')
            }
        },

        clearPlaceSearchList () {
            this.placeSearchList = []
        }
    }
})

export default { usePlaceStore }
