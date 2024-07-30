import { defineStore } from 'pinia'
import { type AxiosResponse } from 'axios'
import axios from '@/helpers/axios.helper'
import { API_URL_PLACE_CATEGORIES } from '@/constants/api-url'
import { type PlaceCategoryEntity } from '@/interfaces/Place'

interface PlaceCategoryState {
    placeCategories: PlaceCategoryEntity[]
}

export const usePlaceCategory = defineStore('place-category', {
    /**
     * States.
     */
    state: (): PlaceCategoryState => ({
        placeCategories: []
    }),

    /**
     * Actions.
     */
    actions: {
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
