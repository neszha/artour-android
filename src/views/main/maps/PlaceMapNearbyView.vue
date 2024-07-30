<script setup lang="ts">
import MainMaps from '@components/maps/MainMaps.vue'
</script>

<template>
    <div class="map-container">

        <!-- maps view  -->
        <MainMaps ref="mainMaps"/>

        <!-- search result list view -->
        <section class="absolute-info">
            <div class="action-button mb-3">
                <div class="d-flex">
                    <div class="col-4">
                        <button
                            @click="$router.back()"
                            class="icon icon-sm icon-shape bg-white rounded-circle waves-effect waves-dark ms-3">
                            <i class="bi bi-x-lg" style="font-size: 20px;"></i>
                        </button>
                    </div>
                    <div class="col-8 text-end">
                        <button
                            @click="zoomToUserLocation()"
                            class="icon icon-sm icon-shape bg-white rounded-circle waves-effect waves-dark me-3">
                            <i class="bi bi-geo-alt-fill text-primary" style="font-size: 20px;"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div id="absolute-info" class="card">
                <div class="card-body p-0">
                    <div @click="expandAbsoluteInfoToggle" class="expand-control text-center">
                        <i class="bi bi-chevron-up" style="font-size: 18px;"></i>
                    </div>
                    <h5 class="mb-2 pt-0 px-4 text-center">
                        <strong>Terdekat dari {{ placeName }}</strong>
                    </h5>
                    <div class="list-content pb-4">
                        <div class="place-list">
                            <div
                                v-for="place in placeSearchList"
                                :key="place.id"
                                @click="$router.push({ name: 'place:detail', params: { placeId: place.id } })"
                                class="d-flex align-items-center waves-effect waves-dark px-4 py-2">
                                <div class="me-3">
                                    <img :src="place.category.mapMarker" alt="..." style="width: 40px;">
                                </div>
                                <div class="flex-1">
                                    <span class="d-block font-semibold text-sm text-dark">{{ place.name }}</span>
                                    <div class="text-xs text-muted line-clamp-1">
                                        <span>{{ getPlaceDistance(place.latitude, place.longitude).toFixed(1) }} KM</span>
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

    </div>
</template>

<script lang="ts">
import { getDistance } from 'geolib'
import { mapActions, mapState } from 'pinia'
import { usePlaceStore } from '@/stores/place.store'

export default {
    computed: {
        ...mapState(usePlaceStore, ['placeSearchList']),

        placeId (): string {
            return this.$route.query.placeId as string
        },

        placeName (): string {
            return this.$route.query.placeName as string
        },

        latitude (): number {
            return Number(this.$route.query.latitude as string)
        },

        longitude (): number {
            return Number(this.$route.query.longitude as string)
        }
    },

    methods: {
        ...mapActions(usePlaceStore, ['getNearestPlacesByPlaceLocation', 'clearPlaceSearchList']),

        expandAbsoluteInfoToggle () {
            const cardElement = document.getElementById('absolute-info')
            cardElement?.classList.toggle('expaned')
        },

        getPlaceDistance (latitude: number, longitude: number): number {
            const distanceInMeter = getDistance(
                { latitude: this.latitude, longitude: this.longitude },
                { latitude, longitude }
            )
            return distanceInMeter / 1_000
        },

        zoomToUserLocation () {
            (this.$refs.mainMaps as InstanceType<typeof MainMaps>).zoomToUserLocation()
        }
    },

    async beforeMount () {
        this.clearPlaceSearchList()
        await this.getNearestPlacesByPlaceLocation(this.placeId as string)
    },

    data () {
        return {
            form: {
                loading: false
            }
        }
    }
}
</script>

<style scoped lang="scss">
.maps-container {
    position: relative;
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
            height: 360px;
        }
        .expand-control {
            i::before {
                transform: rotate(180deg);
            }
        }
    }
}
</style>
