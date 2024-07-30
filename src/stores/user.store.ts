import { defineStore } from 'pinia'
import axiosDefault, { type AxiosResponse } from 'axios'
import axios from '@/helpers/axios.helper'
import { UserRoleEnum } from '@/interfaces/enums'
import { type UserMeta } from '@/interfaces/User'
import { API_URL_AUTH_SESSION_INFO } from '@/constants/api-url'

export interface UserInfo {
    id: string
    avatar: string
    role: UserRoleEnum
    name: string
    email: string
    active: boolean
    userMeta?: UserMeta
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
            role: UserRoleEnum.USER,
            name: '',
            email: '',
            active: false
        }
    }),

    /**
     * Actions.
     */
    actions: {
        async getMySessionInfo (): Promise<number> {
            try {
                const response: AxiosResponse = await axios.get(API_URL_AUTH_SESSION_INFO)
                this.myInfo = response.data.data as UserInfo
                return 200
            } catch (error) {
                if (axiosDefault.isAxiosError(error)) {
                    if (error.response?.status === 401) return 401
                    alert(error.message)
                }
                return 500
            }
        }
    }
})

export default { useUserStore }
