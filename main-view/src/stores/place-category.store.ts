import { defineStore } from 'pinia'
import { type AxiosResponse } from 'axios'
import axios from '@/helpers/axios.helper'
import { API_URL_PLACE_CATEGORIES, API_URL_PLACE_CATEGORY_MAP_MARKERS } from '@/constants/api-url'
import { type MapMarker, type PlaceCategoryEntity } from '@/interfaces/Place'

interface PlaceCategoryState {
    mapMarkes: MapMarker[]
    placeCategories: PlaceCategoryEntity[]
}

export const usePlaceCategory = defineStore('place-category', {
    /**
     * States.
     */
    state: (): PlaceCategoryState => ({
        mapMarkes: [],
        placeCategories: []
    }),

    /**
     * Actions.
     */
    actions: {
        async getMapMarkers () {
            try {
                try {
                    const response: AxiosResponse = await axios.get(API_URL_PLACE_CATEGORY_MAP_MARKERS)
                    const data = response.data.data as MapMarker[]
                    this.mapMarkes = data
                } catch (error) {
                    console.error(error)
                }
            } catch (error) {
                console.error(error)
            }
        },

        async getPlaceCategories () {
            try {
                try {
                    const response: AxiosResponse = await axios.get(API_URL_PLACE_CATEGORIES)
                    const data = response.data.data as PlaceCategoryEntity[]
                    this.placeCategories = data
                } catch (error) {
                    console.error(error)
                }
            } catch (error) {
                console.error(error)
            }
        }
    }
})

export default { usePlaceCategory }
