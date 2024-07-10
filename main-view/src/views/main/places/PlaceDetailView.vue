<script setup lang="ts">
import numeral from 'numeral'
import classNames from 'classnames'
import CardPlaceReview from '@components/card/CardPlaceReview.vue'
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
                    <button class="navbar-toggler text-dark waves-effect waves-dark" type="button">
                        <i class="bi bi-geo-alt"></i>
                    </button>
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
                <span>{{ place.rating || 0 }}</span>
                <i v-for="i of 5" :key="i" :class="classNames({
                    'bi-star': (place.rating <= i - 1),
                    'bi-star-half': (place.rating > i - 1 && place.rating < i),
                    'bi-star-fill': (place.rating >= i),
                })" class="bi text-warning"></i>
                <span>(?)</span>
            </div>
            <small>Jarak {{ placeDistance.toFixed(1) }} KM</small>
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
    <section class="action-button mb-2 pt-1">
        <div class="action-item d-flex gap-2 mb-2">
            <RouterLink
                v-if="isPlaceOwner"
                :to="{ name: 'place:manage', params: { placeId }}"
                class="btn btn-outline-primary border-base waves-effect waves-light"
                style="border-style: dashed;">
                <i class="bi bi-pencil-square Tempat me-2"></i>
                <span>Kelola</span>
            </RouterLink>
            <button class="btn btn-primary border-base waves-effect waves-light">
                <i class="bi bi-sign-turn-right-fill me-2"></i>
                <span>Buka Rute</span>
            </button>
            <button class="btn btn-neutral border-primary text-primary waves-effect waves-dark">
                <i class="bi bi-hand-thumbs-up-fill me-2"></i>
                <span>Like ({{ numeral(place.like || 0).format('0.[0]a').toUpperCase() }})</span>
            </button>
            <button class="btn btn-neutral border-dark waves-effect waves-dark">
                <i class="bi bi-hand-thumbs-down me-2"></i>
                <span>Dislike ({{ numeral(place.dislike || 0).format('0.[0]a').toUpperCase() }})</span>
            </button>
            <button class="btn btn-neutral border-primary text-primary waves-effect waves-dark">
                <i class="bi bi-bookmark-plus-fill me-2"></i>
                <span>Simpan (2)</span>
            </button>
            <button class="btn btn-neutral border-dark waves-effect waves-dark">
                <i class="bi bi-share-fill me-2"></i>
                <span>Bagikan</span>
            </button>
        </div>
    </section>

    <!-- place description -->
    <section class="mb-4">
        <div class="container-fluid">
            <div class="views">
                <small>{{ numeral(place.hit || 0).format('0.[0]a').toUpperCase() }} Pengunjung</small>
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
            <div class="d-flex align-items-center mb-2">
                <i class="bi bi-globe me-2 text-primary"></i>
                <a :href="place.website" target="_blank" class="text-sm text-heading text-primary-hover">
                    {{ place.website }}
                </a>
            </div>
        </div>
    </section>

    <!-- review list -->
    <section class="place-review mb-3">
        <div class="place-review-header container-fluid mb-3">
            <h5 class="mb-0">Ulasan Pengunjung</h5>
        </div>
        <div class="place-review-list">
            <CardPlaceReview />
            <CardPlaceReview />
            <CardPlaceReview />
            <CardPlaceReview />
            <CardPlaceReview />
            <CardPlaceReview />
        </div>
    </section>

</template>

<script lang="ts">
import { getDistance } from 'geolib'
import { mapActions, mapState } from 'pinia'
import { usePlaceStore } from '@/stores/place.store'
import { type OpeningHoursDay, type OpeningHoursStatus, type PlaceEntity } from '@/interfaces/Place'
import { toIdrCurrency } from '@/helpers/formater.helper'
import { useGeolocationStore } from '@/stores/geolocation.store'
import { getPlaceOpenHourStatus } from '@/helpers/time.helper'
import { useUserStore } from '@/stores/user.store'

export default {
    computed: {
        ...mapState(useGeolocationStore, ['coordinates']),
        ...mapState(useUserStore, ['myInfo']),
        ...mapState(usePlaceStore, ['placeDetailObject']),

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
        },

        isPlaceOwner (): boolean {
            return (this.place.user.id === this.myInfo.id)
        }
    },

    methods: {
        ...mapActions(useGeolocationStore, ['getCurrentGeolocation']),
        ...mapActions(usePlaceStore, ['getPlaceDetail'])
    },

    async beforeMount () {
        this.getCurrentGeolocation()
        const getted = await this.getPlaceDetail(this.placeId)
        if (getted === false) {
            this.$router.push({ name: 'explore' })
        }
    },

    mounted () {
        window.scrollTo({
            top: 0,
            behavior: 'instant'
        })
    },

    data () {
        return {
            dayIndex: new Date().getDay()
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
.action-button {
    overflow-x: scroll;
    scroll-behavior: smooth;
    display: grid;
    .action-item {
        padding: 0 1rem;
        .btn{
            display: flex;
            text-wrap: nowrap;
        }
    }
}
</style>
