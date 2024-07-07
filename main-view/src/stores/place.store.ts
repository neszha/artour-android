import { API_URL_PLACE_CATEGORIES, API_URL_PLACE_CATEGORY_MAP_MARKERS } from '@/constants/api-url'
import axios from '@/helpers/axios.helper'
import { type PlaceCategory, type MapMarker } from '@/interfaces/Place'
import { type AxiosResponse } from 'axios'
import { defineStore } from 'pinia'

interface PlaceState {
    mapMarkers: MapMarker[]
    placeCategories: PlaceCategory[]
}

export const usePlaceStore = defineStore('place', {
    /**
     * States.
     */
    state: (): PlaceState => ({
        mapMarkers: [],
        placeCategories: []
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
        }
    }
})

export default { usePlaceStore }
