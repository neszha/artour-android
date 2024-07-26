import { API_URL_USERS } from '@/constants/api-url'
import axios from '@/helpers/axios.helper'
import { type UserEntity } from '@/interfaces/User'
import { type AxiosResponse } from 'axios'
import { defineStore } from 'pinia'

interface AdminState {
    users: UserEntity[]
}

export const useAdminStore = defineStore('admin', {
    /**
     * States.
     */
    state: (): AdminState => ({
        users: []
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
        }
    }
})

export default { useAdminStore }
