import { defineStore } from 'pinia'
import { type AxiosResponse } from 'axios'
import axios from '@/helpers/axios.helper'
import { API_URL_PLACES, API_URL_PLACE_CATEGORIES, API_URL_PLACE_CATEGORY_MAP_MARKERS } from '@/constants/api-url'
import { type PlaceCategory, type MapMarker, type PlaceEntity } from '@/interfaces/Place'

interface PlaceState {
    mapMarkers: MapMarker[]
    placeCategories: PlaceCategory[]
    myPlaces: PlaceEntity[]
}

export const usePlaceStore = defineStore('place', {
    /**
     * States.
     */
    state: (): PlaceState => ({
        mapMarkers: [],
        placeCategories: [],
        myPlaces: []
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
        }
    }
})

export default { usePlaceStore }
