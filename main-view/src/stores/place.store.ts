import { defineStore } from 'pinia'
import { type AxiosResponse } from 'axios'
import axios from '@/helpers/axios.helper'
import { API_URL_PLACES, API_URL_PLACES_ID, API_URL_PLACE_AR_MAP_SEARCH, API_URL_PLACE_CATEGORIES, API_URL_PLACE_CATEGORY_MAP_MARKERS, API_URL_PLACE_HIGHLIGHT, API_URL_PLACE_MAP_SEARCH } from '@/constants/api-url'
import { type PlaceCategory, type MapMarker, type PlaceEntity } from '@/interfaces/Place'
import { type Coordinates } from '@/interfaces/Geolocation'

interface PlaceState {
    mapMarkers: MapMarker[]
    placeCategories: PlaceCategory[]
    myPlaces: PlaceEntity[]
    placeDetailObject?: Record<string, PlaceEntity>
    placeSearchList: PlaceEntity[]
    placeArSearchList: PlaceEntity[]
    hightlightPlaces: PlaceEntity[]
}

export const usePlaceStore = defineStore('place', {
    /**
     * States.
     */
    state: (): PlaceState => ({
        mapMarkers: [],
        placeCategories: [],
        myPlaces: [],
        placeDetailObject: {},
        placeSearchList: [],
        placeArSearchList: [],
        hightlightPlaces: []
    }),

    /**
     * Actions.
     */
    actions: {
        async getMapMarkers () {
            try {
                const response: AxiosResponse = await axios.get(API_URL_PLACE_CATEGORY_MAP_MARKERS)
                const data = response.data.data as MapMarker[]
                this.mapMarkers = data
            } catch (error) {
                console.error(error)
            }
        },

        async getPlaceCategories () {
            try {
                const response: AxiosResponse = await axios.get(API_URL_PLACE_CATEGORIES)
                const data = response.data.data as PlaceCategory[]
                this.placeCategories = data
            } catch (error) {
                console.error(error)
            }
        },

        async getMyPlaces () {
            try {
                const response: AxiosResponse = await axios.get(API_URL_PLACES)
                const data = response.data.data as PlaceEntity[]
                this.myPlaces = data
            } catch (error) {
                console.error(error)
            }
        },

        async searchPlacesByKeyword (keyword: string) {
            try {
                const url = `${API_URL_PLACE_MAP_SEARCH}?keyword=${keyword}`
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
        }
    }
})

export default { usePlaceStore }
