<template>
    <div ref="googleMapPreview" class="google-map-preview-marker"></div>
</template>

<script lang="ts">
import { mapActions, mapState } from 'pinia'
import { GOOGLE_MAPS_API_KEY } from '@/constants/environment'
import { useGeolocationStore } from '@/stores/geolocation.store'
import { Loader as GoogleMapsLoader } from '@googlemaps/js-api-loader'
import { type Coordinates } from '@/interfaces/Geolocation'

export default {
    computed: {
        ...mapState(useGeolocationStore, ['coordinates'])
    },

    methods: {
        ...mapActions(useGeolocationStore, ['getCurrentGeolocation']),

        async initMap () {
            const mapContainer = this.$refs.googleMapPreview as HTMLElement
            const loader = new GoogleMapsLoader({
                apiKey: GOOGLE_MAPS_API_KEY,
                version: 'weekly',
                libraries: ['marker']
            })
            if (this.defaultLocation === undefined) {
                this.location = this.coordinates
            } else {
                this.location = this.defaultLocation as Coordinates
            }
            const { Map } = await loader.importLibrary('maps')
            this.googleMap = new Map(mapContainer, {
                center: {
                    lat: this.location.latitude,
                    lng: this.location.longitude
                },
                zoom: 13,
                fullscreenControl: true
            })
            const marker = new google.maps.Marker({
                position: {
                    lat: this.location.latitude,
                    lng: this.location.longitude
                },
                map: this.googleMap,
                draggable: true
            })
            marker.addListener('dragend', () => {
                const position = marker.getPosition()
                if (position === undefined || position === null) return
                this.location = {
                    latitude: position.lat(),
                    longitude: position.lng()
                }
            })
            this.googleMap.addListener('center_changed', () => {
                const center = this.googleMap?.getCenter()
                marker.setPosition(center as google.maps.LatLng)
                this.location = {
                    latitude: center?.lat() as number,
                    longitude: center?.lng() as number
                }
            })
        }

    },

    async mounted () {
        await this.getCurrentGeolocation()
        await this.initMap()
    },

    watch: {
        location: {
            handler () {
                this.$emit('update:location', this.location)
            }
        }
    },

    data () {
        return {
            location: {
                latitude: 0,
                longitude: 0
            } satisfies Coordinates,
            googleMap: null as google.maps.Map | null
        }
    },

    props: {
        defaultLocation: {
            type: Object
        }
    }
}
</script>

<style scoped lang="scss">
.google-map-preview-marker {
    width: 100%;
    height: 220px;
}
</style>
