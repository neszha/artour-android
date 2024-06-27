// import { userAuthenticated } from './middlewares/auth.middleware'
import { type RouteRecordRaw, createRouter, type Router, createWebHashHistory } from 'vue-router'

/**
 * Layout Componenets.
 */
import RouterLayout from './App.vue'

/**
 * View Componenets.
 */
// import AppLayout from './App.vue'
import AuthView from './views/AuthView.vue'
import ExploreView from './views/main/ExploreView.vue'
import MapsView from './views/main/MapsView.vue'

// Profile
import ProfileView from './views/main/ProfileView.vue'
import ChangeAvatarView from './views/main/profile/ChangeAvatarView.vue'
import ChangeNameView from './views/main/profile/ChangeNameView.vue'
import InfomationView from './views/main/profile/InfomationView.vue'
import AboutAppView from './views/main/profile/AboutAppView.vue'

/**
 * Register page views to routes.
 */
const routes: RouteRecordRaw [] = [
    {
        name: 'root',
        path: '/',
        redirect: '/auth'
    },
    {
        name: 'auth',
        path: '/auth',
        component: AuthView
    },
    {
        name: 'main',
        path: '/main',
        component: RouterLayout,
        children: [
            {
                name: 'explore',
                path: '',
                component: ExploreView
            },
            {
                name: 'maps',
                path: '/maps',
                component: MapsView
            },
            {
                name: 'maps',
                path: '/maps',
                component: MapsView
            },
            {
                path: 'profile',
                component: RouterLayout,
                children: [
                    {
                        name: 'profile',
                        path: '',
                        component: ProfileView
                    },
                    {
                        name: 'change-avatar',
                        path: 'avatar',
                        component: ChangeAvatarView
                    },
                    {
                        name: 'change-name',
                        path: 'name',
                        component: ChangeNameView
                    },
                    {
                        name: 'information',
                        path: 'information',
                        component: InfomationView
                    },
                    {
                        name: 'about',
                        path: 'about',
                        component: AboutAppView
                    }
                ]
            }
        ]
    }
]

/**
 * Create router object.
 */
const router: Router = createRouter({
    history: createWebHashHistory(),
    routes
})

/**
 * Export.
 */
export default router
