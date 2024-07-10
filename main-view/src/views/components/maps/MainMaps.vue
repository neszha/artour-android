<template>
    <div ref="googleMap" class="google-map"></div>
</template>

<script lang="ts">
import { mapActions, mapState } from 'pinia'
import { getCenter, isPointWithinRadius } from 'geolib'
import { GOOGLE_MAPS_API_KEY } from '@/constants/environment'
import { useGeolocationStore } from '@/stores/geolocation.store'
import { Loader as GoogleMapsLoader } from '@googlemaps/js-api-loader'
import { usePlaceStore } from '@/stores/place.store'
import { type Coordinates } from '@/interfaces/Geolocation'

let placeMarkers: google.maps.Marker[] = []

export default {
    computed: {
        ...mapState(useGeolocationStore, ['coordinates']),
        ...mapState(usePlaceStore, ['placeSearchList'])
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
                    title: 'Lokasi Saya'
                })
                marker.setMap(this.googleMap as google.maps.Map)
            }
        },

        async renderPlaceSearchList () {
            if (this.googleMap === null) return

            // Remove old marker.
            for (const marker of placeMarkers) {
                marker.setMap(null)
            }
            placeMarkers = []

            // Write marker to maps.
            const { Marker } = await google.maps.importLibrary('marker') as google.maps.MarkerLibrary
            for (const place of this.placeSearchList) {
                const marker = new Marker({
                    position: {
                        lat: place.latitude,
                        lng: place.longitude
                    },
                    icon: {
                        url: place.category.mapMarker,
                        scaledSize: new google.maps.Size(43, 43)
                    },
                    title: place.name
                })
                marker.setMap(this.googleMap as google.maps.Map)
                placeMarkers.push(marker)
            }

            // Set maps center.
            const coords: Coordinates[] = []
            coords.push({ latitude: this.coordinates.latitude, longitude: this.coordinates.longitude })
            for (const place of this.placeSearchList) {
                coords.push({ latitude: place.latitude, longitude: place.longitude })
            }
            const centerCoord = getCenter(coords)
            if (centerCoord === false) return
            this.googleMap.panTo({
                lat: centerCoord.latitude,
                lng: centerCoord.longitude
            })

            // Set map zoom.
            if (coords.length === 1) {
                this.googleMap.setZoom(11)
            } else {
                const zoomLevels: number[] = []
                for (const place of this.placeSearchList) {
                    const coordPlace = { latitude: place.latitude, longitude: place.longitude }
                    let radiusInMeter = 10 * 1000 // 10km
                    let coordInRadius = false
                    let googleMapZoomLevel = 13
                    do {
                        radiusInMeter += 10 * 1000 // 10km
                        coordInRadius = isPointWithinRadius(coordPlace as Coordinates, centerCoord, radiusInMeter)
                        googleMapZoomLevel -= 0.5
                        // console.log(place.name, { radiusInMeter, coordInRadius, googleMapZoomLevel })
                    } while (!coordInRadius)
                    if (googleMapZoomLevel <= 7) googleMapZoomLevel = 7
                    zoomLevels.push(Math.floor(googleMapZoomLevel))
                }
                this.googleMap.setZoom(Math.min(...zoomLevels))
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

    watch: {
        placeSearchList: {
            deep: true,
            handler () {
                this.renderPlaceSearchList()
            }
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
                zoomControl: false,
                styles: [
                    {
                        featureType: 'poi',
                        elementType: 'labels',
                        stylers: [
                            { visibility: 'off' }
                        ]
                    }
                ]
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
