import { defineStore } from 'pinia'
import { type AxiosResponse } from 'axios'
import axios from '@/helpers/axios.helper'
import { type UserEntity } from '@/interfaces/User'
import { type PlaceEntity } from '@/interfaces/Place'
import { type DataOverview } from '@/interfaces/Summary'
import { type PlaceReviewEntity } from '@/interfaces/PlaceReview'
import { API_URL_PLACE_REVIEWS, API_URL_PLACES, API_URL_USERS, APU_URL_SUMMARY_DATA_OVERVIEW } from '@/constants/api-url'

interface SearchMeta {
    total: number
    limit?: number
}

interface AdminState {
    dataOverview: DataOverview
    users: UserEntity[]
    places: PlaceEntity[]
    placeReviews: PlaceReviewEntity[]
    placeReviewsSearchMeta: SearchMeta
}

export const useAdminStore = defineStore('admin', {
    /**
     * States.
     */
    state: (): AdminState => ({
        dataOverview: {
            totalUser: 0,
            totalPlace: 0,
            totalReview: 0
        },
        users: [],
        places: [],
        placeReviews: [],
        placeReviewsSearchMeta: {
            total: 0
        }
    }),

    /**
     * Actions.
     */
    actions: {
        async getDataOverview (): Promise<void> {
            try {
                const response: AxiosResponse = await axios.get(APU_URL_SUMMARY_DATA_OVERVIEW)
                this.dataOverview = response.data.data as DataOverview
            } catch (error) {
                alert('Gagal mengambil data overview')
                console.error(error)
            }
        },

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

        async getPlaceReviews (filterKey: string, limit?: number): Promise<void> {
            try {
                let url = `${API_URL_PLACE_REVIEWS}?filter=${filterKey}`
                if (limit !== undefined) {
                    url += `&limit=${limit}`
                }
                const response: AxiosResponse = await axios.get(url)
                this.placeReviews = response.data.data as PlaceReviewEntity[]
                this.placeReviewsSearchMeta = response.data.meta as SearchMeta
            } catch (error) {
                alert('Gagal mengambil data ulasan')
                console.error(error)
            }
        }
    }
})

export default { useAdminStore }
