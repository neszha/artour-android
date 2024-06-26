// import { userAuthenticated } from './middlewares/auth.middleware'
import { type RouteRecordRaw, createRouter, type Router, createWebHashHistory } from 'vue-router'

// import AppLayout from './App.vue'
import WelcomeAuthLayout from './views/WelcomeAuthLayout.vue'

/**
 * Register page views to routes.
 */
const routes: RouteRecordRaw [] = [
    {
        name: 'welcome',
        path: '/',
        component: WelcomeAuthLayout
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
