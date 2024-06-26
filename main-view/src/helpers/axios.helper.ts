import axiosDefault, { type AxiosInstance } from 'axios'
import { API_BASE_URL } from '@/constants/environment'

// Create new axios with default baseURL.
const axios: AxiosInstance = axiosDefault.create({
    baseURL: API_BASE_URL
})

export const axiosUpdateAuthorization = (): void => {
    const accessToken = localStorage.getItem('access_token')
    if (accessToken !== null) {
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    }
}

// Set the default authorization token
axiosUpdateAuthorization()

export default axios
