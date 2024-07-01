<template>
    <section class="ar-camera">
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
                :rotation="`0 ${place.circleBearing} 0`"
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
</template>

<script lang="ts">
import { getDistance, getGreatCircleBearing } from 'geolib'

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
                const distance = getDistance(this.myCoordinates as GeolibInputCoordinates, nearCoordinates)
                const circleBearing = getGreatCircleBearing(this.myCoordinates as GeolibInputCoordinates, nearCoordinates)
                place.latitude = nearCoordinates.latitude
                place.longitude = nearCoordinates.longitude
                place.circleBearing = 360 - circleBearing
                console.log({ distance })
                console.log({ circleBearing })
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
        }
    },

    mounted () {
        window.AFRAME.registerComponent('place-entity', {
            init: function () {
                this.el.addEventListener('click', () => {
                    console.log(this.el)
                    alert('Box clicked!')
                })
            }
        })
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

<style lang="scss">
video {
    display: none;
}
.ar-camera {
    width: 100%;
    height: 800px;
}
</style>
