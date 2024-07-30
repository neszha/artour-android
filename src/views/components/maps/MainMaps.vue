<template>
    <div ref="googleMap" class="google-map"></div>

    <!-- popup marker template -->
    <div id="marker-popup" class="d-none" style="position: absolute; top: 0; left: 0; z-index: 100; background-color: white; max-width: 240px;">
        <div class="marker-popup ms-1">
            <div class="col-auto image-item rounded mb-3">
                <img alt="..." src="//:image">
            </div>
            <h5 class="mb-1">:title</h5>
            <p class="mb-2 text-sm" style="font-size: 12px;">:description</p>
            <div class="d-grid">
                <a href=":link" class="btn btn-sm btn-neutral border-dark waves-effect waves-light mb-2">
                    <i class="bi bi-cursor me-2"></i>
                    <span>Detail Wisata</span>
                </a>
                <button onclick="openGoogleMapDirectionLink(':latitude', ':longitude')" class="btn btn-sm btn-primary border-base waves-effect waves-light">
                    <i class="bi bi-sign-turn-right-fill me-2"></i>
                    <span>Buka Rute</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { mapActions, mapState } from 'pinia'
import { getCenter, getDistance } from 'geolib'
import { usePlaceStore } from '@/stores/place.store'
import { type Coordinates } from '@/interfaces/Geolocation'
import { GOOGLE_MAPS_API_KEY } from '@/constants/environment'
import { useGeolocationStore } from '@/stores/geolocation.store'
import { Loader as GoogleMapsLoader } from '@googlemaps/js-api-loader'

let placeMarkers: google.maps.Marker[] = []

/**
 * Open map direction link.
 */
window.openGoogleMapDirectionLink = (latitude: number, longitude: number) => {
    const googleMapLink = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`
    if (window.Android !== undefined) {
        window.Android.openExternalLink(googleMapLink)
        return
    }
    window.open(googleMapLink, '_blank')
}

export default {
    computed: {
        ...mapState(useGeolocationStore, ['coordinates']),
        ...mapState(usePlaceStore, ['placeSearchList']),

        showInfoWindow (): boolean {
            const showInfoWindow = this.$route.query.showInfoWindow
            return showInfoWindow === 'true'
        }
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

                // Info window.
                let placeDescription = place.description
                if (place.description.length > 70) {
                    placeDescription = place.description.substring(0, 70) + '...'
                }
                const markerContent = document.getElementById('marker-popup')
                const htmlContent = markerContent?.innerHTML
                    .replace('//:image', place.mapImageCover?.link as string)
                    .replace(':title', place.name as string)
                    .replace(':description', placeDescription as string)
                    .replace(':link', `/#/places/${place.id}`)
                    .replace(':latitude', place.latitude.toString() as string)
                    .replace(':longitude', place.longitude.toString() as string)
                const infowindow = new google.maps.InfoWindow({
                    content: htmlContent,
                    maxWidth: 250
                })
                if (this.showInfoWindow === true) {
                    infowindow.open(this.googleMap as google.maps.Map, marker)
                }

                // Handle click event.
                marker.addListener('click', () => {
                    if (marker.getAnimation() !== 1) {
                        marker.setAnimation(google.maps.Animation.BOUNCE)
                    }
                    infowindow.open(this.googleMap as google.maps.Map, marker)
                    setTimeout(() => {
                        marker.setAnimation(null)
                    }, 1_500)
                })
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
            const markerDistances: number[] = [] // in KM
            for (const place of this.placeSearchList) {
                const distanceInMeter = getDistance(
                    { latitude: centerCoord.latitude, longitude: centerCoord.longitude },
                    { latitude: place.latitude, longitude: place.longitude }
                )
                markerDistances.push(distanceInMeter / 1000)
            }
            let zoomLevel = 12
            const maxDistance = Math.max(...markerDistances)
            if (maxDistance < 10) {
                zoomLevel = 12
            } else if (maxDistance >= 10 && maxDistance < 20) {
                zoomLevel = 11
            } else if (maxDistance >= 20 && maxDistance < 150) {
                zoomLevel = 8
            } else if (maxDistance >= 150 && maxDistance < 300) {
                zoomLevel = 7
            } else if (maxDistance >= 300 && maxDistance < 1000) {
                zoomLevel = 5
            } else {
                zoomLevel = 4
            }
            this.googleMap.setZoom(zoomLevel)
        },

        zoomToUserLocation () {
            if (this.googleMap === null) return
            this.googleMap.panTo({
                lat: this.coordinates.latitude,
                lng: this.coordinates.longitude
            })
            this.googleMap.setZoom(14)
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

<style lang="scss">
.gmnoprint {
    display: none;
}
.gm-style-cc {
    display: none;
}
.marker-popup {
    img {
        width: 100%;
        border-radius: 8px;
    }
    p {
        font-size: 14px;
        line-height: 22px;
    }
}
</style>
