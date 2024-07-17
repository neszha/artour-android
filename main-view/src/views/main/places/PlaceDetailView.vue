<script setup lang="ts">
import numeral from 'numeral'
import classNames from 'classnames'
import PlaceActionButton from '@components/place/PlaceActionButton.vue'
import CardCreateReview from '@components/card/review/CardCreateReview.vue'
import CardMyPlaceReview from '@components/card/review/CardMyPlaceReview.vue'
import CardPlaceReview from '@components/card/review/CardPlaceReview.vue'
</script>

<template>
    <!-- header  -->
    <section class="place-detail-header mb-3">
        <nav class="navbar navbar-light px-0 py-1">
            <div class="container-xl py-2 ps-1">
                <button @click="$router.back()" class="navbar-toggler text-dark" type="button">
                    <i class="bi bi-chevron-left"></i>
                </button>
                <div class="d-flex gap-2">
                    <RouterLink :to="{name: 'maps'}" class="navbar-toggler text-dark waves-effect waves-dark" type="button">
                        <i class="bi bi-geo-alt"></i>
                    </RouterLink>
                    <RouterLink :to="{name: 'place:bookmarks'}" class="navbar-toggler text-dark waves-effect waves-dark" type="button">
                        <i class="bi bi-bookmarks"></i>
                    </RouterLink>
                    <button class="navbar-toggler text-dark waves-effect waves-dark" type="button">
                        <i class="bi bi-share-fill"></i>
                    </button>
                </div>
            </div>
        </nav>
    </section>

    <!-- place title -->
    <section class="mb-3" style="margin-top: 70px;">
        <div class="container-fluid">
            <h6 class="mb-1">{{ place.name }}</h6>
            <div class="rating d-flex gap-1">
                <i v-for="i of 5" :key="i" :class="classNames({
                    'bi-star': (place.rating <= i - 1),
                    'bi-star-half': (place.rating > i - 1 && place.rating < i),
                    'bi-star-fill': (place.rating >= i),
                })" class="bi text-warning"></i>
                <span v-if="place.rating !== undefined">({{ place.rating.toFixed(2) || 0 }})</span>
                <span>{{ numeral(placeReviews.length || 0).format('0.[0]a').toUpperCase() }} Ulasan</span>
            </div>
            <small>Jarak {{ placeDistance.toFixed(2) }} KM</small>
        </div>
    </section>

    <!-- place image galery -->
    <section class="place-imae-galery mb-3">
        <div class="horizontal-scroll px-2 mx-1">
            <div v-for="i in Math.floor(place.mapImages.length / 3)" :key="i" class="hs-item d-flex gap-2">
                <div class="single-img">
                    <div class="box-img" data-v-bdb02ee3="">
                        <img :src="place.mapImages[i - 1].link" alt="..." class="card-img" >
                    </div>
                </div>
                <div class="double-img d-flex flex-column gap-2">
                    <div class="box-img" data-v-bdb02ee3="">
                        <img :src="place.mapImages[i].link" alt="..." class="card-img" >
                    </div>
                    <div class="box-img" data-v-bdb02ee3="">
                        <img :src="place.mapImages[i + 1].link" alt="..." class="card-img" >
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- action buttons -->
    <PlaceActionButton v-if="place.id" :placeData="place" />

    <!-- place description -->
    <section class="mb-4">
        <div class="container-fluid">
            <div class="views">
                <small>{{ numeral(place.views || 0).format('0.[0]a').toUpperCase() }} Pengunjung</small>
            </div>
            <p class="description mb-3">
                {{ place.description }}
            </p>
            <div class="d-flex align-items-center mb-2">
                <i class="bi bi-geo-alt me-2 text-primary"></i>
                <span class="text-sm text-heading">
                    {{ place.address }}
                </span>
            </div>
            <div class="d-flex align-items-center mb-2">
                <i class="bi bi-alarm me-2 text-primary"></i>
                <div class="text-sm text-heading">
                    <span :class="classNames({
                            'text-primary': (openingHoursStatus.open === true),
                            'text-danger': (openingHoursStatus.open === false),
                        })">{{ openingHoursStatus.content }}</span>
                </div>
            </div>
            <div class="d-flex align-items-center mb-2">
                <i class="bi bi-currency-dollar me-2 text-primary"></i>
                <span class="text-sm text-heading">
                    {{ toIdrCurrency(place.price || 0) }}
                </span>
            </div>
            <div v-if="place.website" class="d-flex align-items-center mb-2">
                <i class="bi bi-globe me-2 text-primary"></i>
                <a :href="place.website" target="_blank" class="text-sm text-heading text-primary-hover">
                    {{ place.website }}
                </a>
            </div>
        </div>
    </section>

    <!-- my review  -->
    <section class="place-review mb-3">
        <div class="place-review-header container-fluid mb-3">
            <h5 class="mb-0">Ulasan Saya</h5>
        </div>
        <div v-if="myReview === null" class="create-review">
            <CardCreateReview />
        </div>
        <div v-else class="my-place-review">
            <CardMyPlaceReview :review-data="myReview" />
        </div>
    </section>

    <!-- review list -->
    <section class="place-review mb-3">
        <div class="place-review-header container-fluid mb-3">
            <h5 class="mb-0">Ulasan Pengunjung</h5>
        </div>
        <div class="place-review-list">
            <CardPlaceReview v-for="review of placeReviews" :key="review.id" :review-data="review" />
        </div>
        <div v-if="!placeReviews.length" class="no-card-list container-fluid">
            <div class="card mb-5">
                <div class="card-body text-center py-5">
                    <div class="mb-3">
                        <small>
                            Tidak ada ulasan pengunjung lainnya.
                        </small>
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>

<script lang="ts">
import { getDistance } from 'geolib'
import { mapActions, mapState } from 'pinia'
import { usePlaceStore } from '@/stores/place.store'
import axios from '@/helpers/axios.helper'
import { type OpeningHoursDay, type OpeningHoursStatus, type PlaceEntity } from '@/interfaces/Place'
import { toIdrCurrency } from '@/helpers/formater.helper'
import { useGeolocationStore } from '@/stores/geolocation.store'
import { getPlaceOpenHourStatus } from '@/helpers/time.helper'
import { useUserStore } from '@/stores/user.store'
import { API_URL_PLACE_INC_VIEWS } from '@/constants/api-url'
import { usePlaceReviewStore } from '@/stores/place-review.store'

export default {
    computed: {
        ...mapState(useGeolocationStore, ['coordinates']),
        ...mapState(useUserStore, ['myInfo']),
        ...mapState(usePlaceStore, ['placeDetailObject']),
        ...mapState(usePlaceReviewStore, ['myReview', 'placeReviews']),

        placeId (): string {
            return this.$route.params.placeId as string
        },

        place (): PlaceEntity | any {
            const defaultData = {
                user: {
                    id: ''
                },
                mapImages: [],
                latitude: 0,
                longitude: 0
            }
            if (this.placeDetailObject === undefined) return defaultData
            const placeData = this.placeDetailObject[this.placeId] as PlaceEntity | undefined
            if (placeData === undefined) return defaultData
            return placeData
        },

        openingHoursStatus (): OpeningHoursStatus {
            if (this.place.id === undefined) {
                return {
                    open: false,
                    content: 'Tutup'
                } satisfies OpeningHoursStatus
            }
            const openingHours = this.place.openingHours.find((item: OpeningHoursDay) => item.dayIndex === this.dayIndex) as OpeningHoursDay
            return getPlaceOpenHourStatus(openingHours)
        },

        placeDistance (): number {
            const distanceInMater = getDistance(
                { latitude: this.coordinates.latitude, longitude: this.coordinates.longitude },
                { latitude: this.place.latitude, longitude: this.place.longitude }
            )
            return distanceInMater / 1000
        }
    },

    methods: {
        ...mapActions(useGeolocationStore, ['getCurrentGeolocation']),
        ...mapActions(usePlaceStore, ['getPlaceDetail']),
        ...mapActions(usePlaceReviewStore, ['getMyPlaceReview', 'getPlaceReviews']),

        async incPlaceViews () {
            try {
                const url = API_URL_PLACE_INC_VIEWS.replace(':placeId', this.place.id as string)
                await axios.post(url)
            } catch (error) {
                console.error(error)
            }
        }
    },

    async beforeMount () {
        this.getCurrentGeolocation()
        const getted = await this.getPlaceDetail(this.placeId)
        if (getted === false) {
            this.$router.push({ name: 'explore' })
        }
        this.getMyPlaceReview(this.placeId, true)
        this.getPlaceReviews(this.placeId, true)
    },

    mounted () {
        window.scrollTo({
            top: 0,
            behavior: 'instant'
        })
        this.incPlaceViwesTimeout = setTimeout(() => {
            this.incPlaceViews()
        }, 10_000)
    },

    beforeUnmount () {
        if (this.incPlaceViwesTimeout !== null) {
            clearTimeout(this.incPlaceViwesTimeout as NodeJS.Timeout)
        }
    },

    data () {
        return {
            dayIndex: new Date().getDay(),
            incPlaceViwesTimeout: null as NodeJS.Timeout | null
        }
    }
}
</script>

<style scoped lang="scss">
.place-detail-header {
    position: fixed;
    z-index: 3;
    top: 0;
    left: 0;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid var(--x-gray-200);
}
.navbar {
    .navbar-toggler {
        font-size: 22px;
        box-shadow: none;
        &:focus {
            color: #6B7B93;
        }
    }
}
.navbar-brand {
    img {
        height: 33px;
    }
}
.place-imae-galery {
    overflow-x: scroll;
    scroll-behavior: smooth;
    .horizontal-scroll {
        display: flex;
        gap: 0.5rem;
        .hs-item:last-child {
            padding-right: 1rem;
        }
    }
    .box-img {
        overflow: hidden;
        border-radius: 8px;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .single-img {
        .box-img {
            width: 250px;
            height: 368px;
        }
    }
    .double-img {
        .box-img {
            width: 180px;
            aspect-ratio: 1/1;
        }
    }
}
</style>
