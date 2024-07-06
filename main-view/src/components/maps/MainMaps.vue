<template>
    <div ref="googleMap" class="google-map"></div>
</template>

<script lang="ts">
import { GOOGLE_MAPS_API_KEY } from '@/constants/environment'
import { Loader as GoogleMapsLoader } from '@googlemaps/js-api-loader'

export default {

    methods: {
        async initMap () {
            const mapContainer = this.$refs.googleMap as HTMLElement
            const loader = new GoogleMapsLoader({
                apiKey: GOOGLE_MAPS_API_KEY,
                version: 'weekly',
                libraries: ['places']
            })
            const googleMaps = loader.importLibrary('maps')
            googleMaps.then(({ Map }): void => {
                const map = new Map(mapContainer, this.mapOptions as google.maps.MapOptions)
                console.log(map)
            }).catch((e) => {
                console.error(e)
            })
        }
    },

    mounted () {
        this.initMap()

        // Set hight content.
        const height = window.innerHeight
        const googleMap = this.$refs.googleMap as HTMLElement
        if (googleMap !== undefined) {
            googleMap.style.height = `${height - 70}px`
        }
    },

    data () {
        return {
            mapOptions: {
                center: {
                    lat: 37.7749,
                    lng: -122.4194
                },
                zoom: 10,
                fullscreenControl: false,
                mapTypeControl: false,
                zoomControl: false,
                styles: [
                    {
                        featureType: 'poi',
                        elementType: 'labels',
                        stylers: [
                            {
                                visibility: 'off'
                            }
                        ]
                    }
                ]
            } satisfies google.maps.MapOptions
        }
    }
}
</script>

<style scoped lang="scss">
.google-map {
    width: 100%;
}
</style>

<style>
.gmnoprint {
    display: none;
}
.gm-style-cc {
    display: none;
}
</style>
