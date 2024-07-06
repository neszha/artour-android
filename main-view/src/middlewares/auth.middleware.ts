import { useUserStore } from '@/stores/user.store'
import { type NavigationGuardNext, type RouteLocationNormalized } from 'vue-router'

export const userAuthenticated = async (_to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext): Promise<void> => {
    const user = useUserStore()
    const authStatusCode: number = await user.getMySessionInfo()
    if (authStatusCode === 401) {
        localStorage.removeItem('access_token')
        next('/')
        return
    }
    next()
}
