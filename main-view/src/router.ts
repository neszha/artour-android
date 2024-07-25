import { adminAuthenticated, userAuthenticated } from './middlewares/auth.middleware'
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

// Maps.
import PlaceMapSearchView from './views/main/maps/PlaceMapSearchView.vue'

// Place
import PlaceDetailView from './views/main/places/PlaceDetailView.vue'
import PlaceImageView from './views/main/places/PlaceImageView.vue'
import PlaceUserBookmarkView from './views/main/places/PlaceUserBookmarkView.vue'

// Place Review.
import AddPlaceReviewView from './views/main/places/reviews/AddPlaceReviewView.vue'
import EditPlaceReviewView from './views/main/places/reviews/EditPlaceReviewView.vue'
import DetailPlaceReviewView from './views/main/places/reviews/DetailPlaceReviewView.vue'

// Contribution
import AddPlaceView from './views/main/contribution/AddPlaceView.vue'
import ManagePlaceView from './views/main/contribution/ManagePlaceView.vue'
import EditPlaceView from './views/main/contribution/EditPlaceView.vue'

// Profile
import ProfileView from './views/main/ProfileView.vue'
import ChangeAvatarView from './views/main/profile/ChangeAvatarView.vue'
import ChangeNameView from './views/main/profile/ChangeNameView.vue'
import MyPlaceReviewView from './views/main/profile/MyPlaceReviewView.vue'
import InfomationView from './views/main/profile/InfomationView.vue'
import AboutAppView from './views/main/profile/AboutAppView.vue'

// Admin Dashboard.
import AdminDashboardView from './views/main/admin/AdminDashboardView.vue'

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
                name: 'maps-layout',
                path: '/maps',
                component: RouterLayout,
                children: [
                    {
                        name: 'maps',
                        path: '',
                        component: MapsView
                    },
                    {
                        name: 'maps:search-list',
                        path: 'search-list',
                        component: PlaceMapSearchView
                    }
                ]
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
                        name: 'place:layout',
                        path: ':placeId',
                        component: RouterLayout,
                        children: [
                            {
                                name: 'place:detail',
                                path: '',
                                component: PlaceDetailView
                            },
                            {
                                name: 'place:images',
                                path: 'images',
                                component: PlaceImageView
                            },
                            {
                                name: 'place:add-review',
                                path: 'reviews',
                                component: AddPlaceReviewView
                            },
                            {
                                name: 'review:edit-review',
                                path: 'edit-reviews',
                                component: EditPlaceReviewView
                            },
                            {
                                name: 'review:detail',
                                path: 'reviews/:placeReviewId',
                                component: DetailPlaceReviewView
                            }
                        ]
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
                        name: 'my-place-reviews',
                        path: 'place-reviews',
                        component: MyPlaceReviewView
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
    },
    {
        name: 'admin-layout',
        path: '/admin',
        beforeEnter: adminAuthenticated,
        component: RouterLayout,
        children: [
            {
                name: 'admin',
                path: '',
                component: AdminDashboardView
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
