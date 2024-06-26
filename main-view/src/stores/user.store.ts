import { defineStore } from 'pinia'
import axiosDefault, { type AxiosResponse } from 'axios'
import axios from '@/helpers/axios.helper'
import { API_URL_LOGOUT, API_URL_USER_MY_INFO } from '@/constants/api-url'

export interface UserInfo {
    id: string
    avatar: string
    name: string
    email: string
    active: boolean
}

export interface UserState {
    myInfo: UserInfo
}

export const useUserStore = defineStore('user', {
    /**
     * States.
     */
    state: (): UserState => ({
        myInfo: {
            id: '',
            avatar: 'avatar-1.jpg',
            name: '',
            email: '',
            active: false
        }
    }),

    /**
     * Actions.
     */
    actions: {
        async getMyInfo (): Promise<number> {
            try {
                const response: AxiosResponse = await axios.get(API_URL_USER_MY_INFO)
                this.myInfo = response.data.data as UserInfo
                return 200
            } catch (error) {
                if (axiosDefault.isAxiosError(error)) {
                    if (error.response?.status === 401) return 401
                    alert(error.message)
                }
                return 500
            }
        },

        async logoutSession (): Promise<boolean> {
            try {
                await axios.delete(API_URL_LOGOUT)
                localStorage.removeItem('access_token')
                return true
            } catch (error) {
                return false
            }
        }
    }
})

export default { useUserStore }
