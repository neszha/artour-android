import { API_URL_PLACE_REVIEWS, API_URL_PLACES, API_URL_USERS } from '@/constants/api-url'
import axios from '@/helpers/axios.helper'
import { type PlaceEntity } from '@/interfaces/Place'
import { type PlaceReviewEntity } from '@/interfaces/PlaceReview'
import { type UserEntity } from '@/interfaces/User'
import { type AxiosResponse } from 'axios'
import { defineStore } from 'pinia'

interface AdminState {
    users: UserEntity[]
    places: PlaceEntity[]
    placeReviews: PlaceReviewEntity[]
}

export const useAdminStore = defineStore('admin', {
    /**
     * States.
     */
    state: (): AdminState => ({
        users: [],
        places: [],
        placeReviews: []
    }),

    /**
     * Actions.
     */
    actions: {
        async getUsers (): Promise<void> {
            try {
                const response: AxiosResponse = await axios.get(API_URL_USERS)
                this.users = response.data.data as UserEntity[]
            } catch (error) {
                alert('Gagal mengambil data user')
                console.error(error)
            }
        },

        async getPlaces (): Promise<void> {
            try {
                const response: AxiosResponse = await axios.get(API_URL_PLACES)
                this.places = response.data.data as PlaceEntity[]
            } catch (error) {
                alert('Gagal mengambil data tempat wisata')
                console.error(error)
            }
        },

        async getPlaceReviews (): Promise<void> {
            try {
                const response: AxiosResponse = await axios.get(API_URL_PLACE_REVIEWS)
                this.placeReviews = response.data.data as PlaceReviewEntity[]
            } catch (error) {
                alert('Gagal mengambil data ulasan')
                console.error(error)
            }
        }
    }
})

export default { useAdminStore }
