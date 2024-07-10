<template>
    <div ref="googleMap" class="google-map"></div>
</template>

<script lang="ts">
import { mapActions, mapState } from 'pinia'
import { GOOGLE_MAPS_API_KEY } from '@/constants/environment'
import { useGeolocationStore } from '@/stores/geolocation.store'
import { Loader as GoogleMapsLoader } from '@googlemaps/js-api-loader'

export default {
    computed: {
        ...mapState(useGeolocationStore, ['coordinates'])
    },

    methods: {
        ...mapActions(useGeolocationStore, ['getCurrentGeolocation']),

        async initMap () {
            const mapContainer = this.$refs.googleMap as HTMLElement
            const loader = new GoogleMapsLoader({
                apiKey: GOOGLE_MAPS_API_KEY,
                version: 'weekly',
                libraries: ['marker']
            })
            const googleMaps = loader.importLibrary('maps')
            await googleMaps.then(({ Map }): void => {
                this.googleMap = new Map(mapContainer, this.mapOptions as google.maps.MapOptions)
                this.setMapCenterAndMarkerToMyLocation().catch(console.error)
            }).catch((e) => {
                console.error(e)
            })
        },

        async setMapCenterAndMarkerToMyLocation () {
            if (this.googleMap !== null) {
                // Set map center to my location.
                this.googleMap.setCenter({
                    lat: this.coordinates.latitude,
                    lng: this.coordinates.longitude
                })

                // Add marker to my location.
                const { Marker } = await google.maps.importLibrary('marker') as google.maps.MarkerLibrary
                const marker = new Marker({
                    position: {
                        lat: this.coordinates.latitude,
                        lng: this.coordinates.longitude
                    },
                    icon: {
                        url: '/maps/marker-my-position.png',
                        scaledSize: new google.maps.Size(30, 30)
                    },
                    title: 'A marker'
                })
                marker.setMap(this.googleMap as google.maps.Map)
            }
        }
    },

    beforeMount () {
        this.getCurrentGeolocation()
        this.locationInterval = setInterval(() => {
            this.getCurrentGeolocation()
        }, 2_500)
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

    beforeUnmount () {
        if (this.locationInterval !== null) {
            clearTimeout(this.locationInterval as NodeJS.Timeout)
        }
    },

    data () {
        return {
            googleMap: null as google.maps.Map | null,
            mapOptions: {
                center: {
                    lat: -6.301308,
                    lng: 106.815842
                },
                zoom: 10,
                fullscreenControl: false,
                mapTypeControl: false,
                zoomControl: false
            } satisfies google.maps.MapOptions,
            locationInterval: null as NodeJS.Timeout | null
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
