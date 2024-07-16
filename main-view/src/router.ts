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
import ArCameraView from './views/main/ArCameraView.vue'
import ContributionView from './views/main/ContributionView.vue'

// Place
import PlaceDetailView from './views/main/places/PlaceDetailView.vue'
import PlaceUserBookmarkView from './views/main/places/PlaceUserBookmarkView.vue'

// Contribution
import AddPlaceView from './views/main/contribution/AddPlaceView.vue'
import ManagePlaceView from './views/main/contribution/ManagePlaceView.vue'
import EditPlaceView from './views/main/contribution/EditPlaceView.vue'

// Profile
import ProfileView from './views/main/ProfileView.vue'
import ChangeAvatarView from './views/main/profile/ChangeAvatarView.vue'
import ChangeNameView from './views/main/profile/ChangeNameView.vue'
import InfomationView from './views/main/profile/InfomationView.vue'
import AboutAppView from './views/main/profile/AboutAppView.vue'
import { userAuthenticated } from './middlewares/auth.middleware'

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
        beforeEnter: userAuthenticated,
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
                name: 'place-layout',
                path: '/places',
                component: RouterLayout,
                children: [
                    {
                        name: 'place:bookmarks',
                        path: 'bookmarks',
                        component: PlaceUserBookmarkView
                    },
                    {
                        name: 'place:detail',
                        path: ':placeId',
                        component: PlaceDetailView
                    }
                ]

            },
            {
                name: 'ar-camera',
                path: '/ar-camera',
                component: ArCameraView
            },
            {
                name: 'contribution-layout',
                path: '/contribution',
                component: RouterLayout,
                children: [
                    {
                        name: 'contribution',
                        path: '',
                        component: ContributionView
                    },
                    {
                        name: 'place:add',
                        path: 'places',
                        component: AddPlaceView
                    },
                    {
                        name: 'place:manage',
                        path: 'places/:placeId',
                        component: ManagePlaceView
                    },
                    {
                        name: 'place:edit',
                        path: 'places/:placeId/edit',
                        component: EditPlaceView
                    }
                ]
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
