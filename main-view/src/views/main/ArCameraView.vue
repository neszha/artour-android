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
                rotation-reader
                :gps-new-camera="`gpsMinDistance: 10; simulateLatitude: ${myCoordinates.latitude}; simulateLongitude: ${myCoordinates.longitude};`">
            </a-camera>

            <a-entity
                v-for="place in placesRenderer"
                :key="place.title"
                :gps-new-entity-place="`latitude: ${place.latitude}; longitude: ${place.longitude}`"
                :rotation="`-10 ${place.circleBearing} 0`"
                place-entity
                look-at="[gps-new-camera]"
                scale="1 1 1">
                <a-image
                    src="/dummy-images/place-img-01.jpg"
                    position="-2 0 0.01"
                    scale="1 1 1"
                    width="3.5"
                    height="3.5">
                </a-image>
                <a-text
                    :value="place.title"
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
                    value="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae quidem reprehenderit optio accusantium quaerat laboriosam sapiente harum quasi odio nobis."
                    position="0.1 0.9 0.01"
                    color="#000"
                    width="4"
                    line-height="50"
                    letter-spacing="2"
                    wrap-count="35"
                    align="left"
                    anchor="left"
                    baseline="top"
                    side="double"
                    >
                </a-text>
                <a-text
                    value="20 KM"
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
                    material="color: #fff; opacity: 0.8">
                </a-plane>
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
                    <strong>Lokasi Ditemukan (#)</strong>
                </h5>
                <div class="list-content pb-4">
                    <div class="place-list">
                        <div v-for="i of 10" :key="i" @click="toPlaceDetailView" class="d-flex align-items-center waves-effect waves-dark px-4 py-2">
                            <div class="me-4">
                                <i class="bi bi-globe text-muted" style="font-size: 24px;"></i>
                            </div>
                            <div class="flex-1">
                                <span class="d-block font-semibold text-sm text-dark">Nama Tempat {{ i }}</span>
                                <div class="text-xs text-muted line-clamp-1">
                                    <div class="rating d-flex gap-1 align-items-end">
                                        <i class="bi bi-star-fill text-warning"></i>
                                        <i class="bi bi-star-fill text-warning"></i>
                                        <i class="bi bi-star-half text-warning"></i>
                                        <i class="bi bi-star text-warning"></i>
                                        <i class="bi bi-star text-warning"></i>
                                        <span>(3.4)</span>
                                        <small>12 KM</small>
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
import { getGreatCircleBearing } from 'geolib'

interface GeolibInputCoordinates {
    title?: string
    latitude: number
    longitude: number
    circleBearing?: number
}

export default {
    computed: {
        placesRenderer () {
            return this.places.map((place: GeolibInputCoordinates) => {
                const nearCoordinates: GeolibInputCoordinates = this.moveCloser(this.myCoordinates, place, 10)
                // const distance = getDistance(this.myCoordinates as GeolibInputCoordinates, nearCoordinates)
                const circleBearing = getGreatCircleBearing(this.myCoordinates as GeolibInputCoordinates, nearCoordinates)
                place.latitude = nearCoordinates.latitude
                place.longitude = nearCoordinates.longitude
                place.circleBearing = 360 - circleBearing
                return place
            })
        }
    },

    methods: {
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
            setTimeout(() => {
                window.location.reload()
            }, 10)
        },

        toPlaceDetailView () {
            this.$router.push({ name: 'place:detail', params: { placeId: 'id_task_example' } })
        }
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
            const router = this.$router
            window.AFRAME.registerComponent('place-entity', {
                init: function () {
                    this.el.addEventListener('click', () => {
                        router.push({ name: 'place:detail', params: { placeId: 'id_task_example' } })
                    })
                }
            })
        } catch (error) {
            window.location.reload()
        }
    },

    data () {
        return {
            places: [
                {
                    title: 'Wisata Alam Pantai Marina Lampung Selatan.',
                    latitude: -5.345760,
                    longitude: 105.288434,
                    circleBearing: 0
                },
                {
                    title: 'Wisata Alam Pantai Mutun Lampung Selatan.',
                    latitude: -5.339436,
                    longitude: 105.324334,
                    circleBearing: 0
                },
                {
                    title: 'Universitas Reden Inten Lampung.',
                    latitude: -5.386973,
                    longitude: 105.307916,
                    circleBearing: 0
                }
            ],
            myCoordinates: {
                latitude: -5.363689,
                longitude: 105.315599
            } satisfies GeolibInputCoordinates
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
        height: 150px;
        transition: 0.5s ease;
    }
    .expaned {
        .list-content {
            height: 520px;
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
