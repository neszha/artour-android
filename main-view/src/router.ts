// import { userAuthenticated } from './middlewares/auth.middleware'
import { type RouteRecordRaw, createRouter, type Router, createWebHashHistory } from 'vue-router'

/**
 * Layout Componenets.
 */
import MainLayout from './views/layouts/MainLayout.vue'

/**
 * View Componenets.
 */
// import AppLayout from './App.vue'
import AuthView from './views/AuthView.vue'
import ExploreView from './views/main/ExploreView.vue'
import MapsView from './views/main/MapsView.vue'

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
        component: MainLayout,
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
