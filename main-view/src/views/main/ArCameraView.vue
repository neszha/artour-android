<script setup lang="ts">
import classNames from 'classnames'
</script>

<template>
    <!-- ar-scene -->
    <section ref="cameraHight" class="ar-camera">
        <div class="close-button">
            <button @click="toExploreView" class="icon icon-shape bg-white text-dark text-lg rounded-circle waves-effect waves-dark">
                <i class="bi bi-x-lg"></i>
            </button>
        </div>
        <a-scene
            vr-mode-ui='enabled: false'
            arjs='sourceType: webcam; videoTexture: true; debugUIEnabled: false'
            renderer='antialias: true; alpha: true'
            cursor='rayOrigin: mouse;'
            raycaster='near: 0; far: 50000;'
            embedded>

            <a-camera
                v-if="coordLoaded"
                rotation-reader
                :gps-new-camera="`gpsMinDistance: 10; simulateLatitude: ${myCoordinates.latitude}; simulateLongitude: ${myCoordinates.longitude};`">
            </a-camera>

            <a-entity
                v-for="(place) in places"
                :placeId="place.id"
                :key="place.id"
                :gps-new-entity-place="`latitude: ${place.latitude}; longitude: ${place.longitude}`"
                place-entity
                look-at="[gps-new-camera]"
                scale="1 1 1">
                <a-entity
                    :placeId="place.id"
                    :rotation="place.rotation"
                    :position="place.position"
                    scale="1 1 1"
                >
                    <a-image
                        :src="place.mapArImageCover?.link"
                        position="-2 0 0.01"
                        scale="1 1 1"
                        width="3.5"
                        height="3.5">
                    </a-image>
                    <a-text
                        :value="place.name"
                        position="0.1 1.55 0.01"
                        color="#000"
                        width="4"
                        line-height="50"
                        letter-spacing="2"
                        wrap-count="30"
                        align="left"
                        anchor="left"
                        baseline="top"
                        side="double"
                        >
                    </a-text>
                    <a-text
                        :value="place.description"
                        position="0.1 0.9 0.01"
                        color="#000"
                        width="4"
                        line-height="50"
                        letter-spacing="2"
                        wrap-count="37"
                        align="left"
                        anchor="left"
                        baseline="top"
                        side="double"
                        >
                    </a-text>
                    <a-text
                        :value="`${place.distance.toFixed(1)} KM`"
                        position="0 -1.6 0.01"
                        color="#000"
                        width="15"
                        line-height="50"
                        letter-spacing="2"
                        align="left"
                        anchor="left"
                        baseline="bottom"
                        side="double"
                        >
                    </a-text>
                    <a-plane
                        width="8"
                        height="4"
                        material="color: #fff; opacity: 0.9">
                    </a-plane>
                </a-entity>
            </a-entity>

        </a-scene>
    </section>

    <!-- absolute info -->
    <section class="absolute-info">
        <div id="absolute-info" class="card">
            <div class="card-body p-0">
                <div @click="expandAbsoluteInfoToggle" class="expand-control text-center">
                    <i class="bi bi-chevron-up" style="font-size: 18px;"></i>
                </div>
                <h5 class="mb-2 pt-0 px-4 text-center">
                    <strong>Lokasi Ditemukan ({{ places.length }})</strong>
                </h5>
                <div class="list-content pb-4">
                    <div class="place-list">
                        <div v-for="place in places" :key="place.id" @click="toPlaceDetailView(place.id)" class="d-flex align-items-center waves-effect waves-dark px-4 py-2">
                            <div class="me-4">
                                <i class="bi bi-globe text-muted" style="font-size: 24px;"></i>
                            </div>
                            <div class="flex-1">
                                <span class="d-block font-semibold text-sm text-dark">{{ place.name }}</span>
                                <div class="text-xs text-muted line-clamp-1">
                                    <div class="rating d-flex gap-1 align-items-end">
                                        <i v-for="i of 5" :key="i" :class="classNames({
                                            'bi-star': (place.rating <= i - 1),
                                            'bi-star-half': (place.rating > i - 1 && place.rating < i),
                                            'bi-star-fill': (place.rating >= i),
                                        })" class="bi text-warning"></i>
                                        <span>({{ place.rating.toFixed(2) }})</span>
                                        <small>{{ place.distance.toFixed(1) }} KM</small>
                                    </div>
                                </div>
                            </div>
                            <div class="ms-auto text-end">
                                <i class="bi bi-chevron-right text-dark" style="font-size: 22px;"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { mapActions, mapState } from 'pinia'
import { getDistance, getGreatCircleBearing } from 'geolib'
import { type PlaceEntity } from '@/interfaces/Place'
import { useGeolocationStore } from '@/stores/geolocation.store'
import { usePlaceStore } from '@/stores/place.store'
import { type Coordinates } from '@/interfaces/Geolocation'

interface GeolibInputCoordinates {
    title?: string
    latitude: number
    longitude: number
    circleBearing?: number
}

interface VrPlace extends PlaceEntity {
    distance: number // in KM
    circleBearing: number
    position: string
    rotation: string
}

export default {
    computed: {
        ...mapState(useGeolocationStore, ['coordinates']),
        ...mapState(usePlaceStore, ['placeArSearchList'])
    },

    methods: {
        ...mapActions(useGeolocationStore, ['getCurrentGeolocation']),
        ...mapActions(usePlaceStore, ['getPlaceArMapSearch']),

        moveCloser (
            start: GeolibInputCoordinates,
            target: GeolibInputCoordinates,
            newDistance: number
        ): GeolibInputCoordinates {
            const toRadians = (degree: number): number => (degree * Math.PI) / 180
            const toDegrees = (radian: number): number => (radian * 180) / Math.PI

            const earthRadius = 6371000 // radius of Earth in meters

            const startLat = toRadians(start.latitude)
            const startLon = toRadians(start.longitude)
            const targetLat = toRadians(target.latitude)
            const targetLon = toRadians(target.longitude)

            const dLat = targetLat - startLat
            const dLon = targetLon - startLon

            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(startLat) *
                Math.cos(targetLat) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2)
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
            const distance = earthRadius * c

            const ratio = newDistance / distance

            const newLat = startLat + dLat * ratio
            const newLon = startLon + dLon * ratio

            return {
                latitude: toDegrees(newLat),
                longitude: toDegrees(newLon)
            }
        },

        expandAbsoluteInfoToggle () {
            const cardElement = document.getElementById('absolute-info')
            cardElement?.classList.toggle('expaned')
        },

        toExploreView () {
            this.$router.push({ name: 'explore' })
        },

        toPlaceDetailView (placeId: string) {
            setTimeout(() => {
                this.$router.push({ name: 'place:detail', params: { placeId } })
            }, 150)
        }
    },

    async beforeMount () {
        // Get my location.
        await this.getCurrentGeolocation()
        this.myCoordinates.latitude = this.coordinates.latitude
        this.myCoordinates.longitude = this.coordinates.longitude
        this.coordLoaded = true
        await this.getPlaceArMapSearch(this.myCoordinates)

        // Render places.
        this.places = this.placeArSearchList.map((place, index) => {
            const distanceInMeter = getDistance(
                { latitude: this.myCoordinates.latitude, longitude: this.myCoordinates.longitude },
                { latitude: place.latitude, longitude: place.longitude }
            )
            const placeCoord: Coordinates = { latitude: place.latitude, longitude: place.longitude }
            const nearDistanceInMeter = 12 + (index)
            const nearCoordinates: GeolibInputCoordinates = this.moveCloser(this.myCoordinates, placeCoord, nearDistanceInMeter)
            // const newNearDistanceInMeter = getDistance(
            //     { latitude: this.myCoordinates.latitude, longitude: this.myCoordinates.longitude },
            //     { latitude: nearCoordinates.latitude, longitude: nearCoordinates.longitude }
            // )
            const circleBearing = 360 - getGreatCircleBearing(this.myCoordinates as GeolibInputCoordinates, nearCoordinates)
            const vrPlace: VrPlace = {
                ...place,
                latitude: nearCoordinates.latitude,
                longitude: nearCoordinates.longitude,
                distance: distanceInMeter / 1000,
                circleBearing,
                position: '0 -4 0',
                rotation: `-20 ${circleBearing} 0`
            }
            if (index === 1) {
                vrPlace.position = '0 0 0'
                vrPlace.rotation = `0 ${circleBearing} 0`
            }
            if (index >= 2) {
                vrPlace.position = '0 4.5 0'
                vrPlace.rotation = `0 ${circleBearing} 0`
            }
            if (place.description.length > 160) {
                vrPlace.description = place.description.slice(0, 160) + '...'
            }
            // console.log(vrPlace.distance, nearDistanceInMeter, newNearDistanceInMeter, vrPlace.position, vrPlace.rotation)
            // console.log({ ...vrPlace })
            return vrPlace
        })
    },

    mounted () {
        // Set hight resolution.
        const mexHight = 800
        const width = window.innerWidth
        const cameraHight = this.$refs.cameraHight as HTMLElement
        let height = (16 / 9 * width)
        if (height > mexHight) {
            height = mexHight
        }
        if (cameraHight !== undefined) {
            cameraHight.style.height = `${height}px`
        }

        // Handle ar-scene.
        try {
            const toPlaceDetailView = this.toPlaceDetailView as any
            window.AFRAME.registerComponent('place-entity', {
                init: function () {
                    this.el.addEventListener('click', (event: Event) => {
                        if (event.target === null) return
                        const parentEl = (event.target as HTMLElement).parentElement
                        const placeId = parentEl?.getAttribute('placeId')
                        if (placeId === null) return
                        toPlaceDetailView(placeId)
                    })
                }
            })
        } catch (error) {
            window.location.reload()
        }
    },

    data () {
        return {
            places: [] as VrPlace[],
            myCoordinates: {
                latitude: 0,
                longitude: 105.2957217
            } satisfies GeolibInputCoordinates,
            coordLoaded: false
        }
    }
}
</script>

<style scoped lang="scss">
.ar-camera {
    position: relative;
    width: 100%;
    .close-button {
        position: fixed;
        z-index: 2;
        right: 16px;
        top: 16px;
        .icon-shape {
            width: 2.5rem;
            height: 2.5rem;
        }
    }
}
.absolute-info {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    .card {
        border-left: 0;
        border-right: 0;
        border-radius: 1rem;
    }
    .list-content {
        overflow-y: scroll;
        height: 140px;
        transition: 0.5s ease;
    }
    .expaned {
        .list-content {
            height: 300px;
        }
        .expand-control {
            i::before {
                transform: rotate(180deg);
            }
        }
    }
}
</style>

<style lang="scss">
video {
    display: none;
}
</style>
