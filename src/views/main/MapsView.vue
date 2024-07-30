<script setup lang="ts">
import MainLayout from '../layouts/MainLayout.vue'
import MainMaps from '@components/maps/MainMaps.vue'
import CardPlaceInline from '../components/card/CardPlaceInline.vue'
</script>

<template>
    <MainLayout>
        <div class="map-container">

            <!-- search form  -->
            <div class="map-search">
                <form @submit.prevent="searchPlaces()">
                    <div class="input-group input-group-md input-group-inline shadow border-none" style="height: 50px;">
                        <span class="input-group-text pe-2 rounded-start-pill">
                            <div v-if="form.loading" class="spinner-border spinner-border-sm text-gray" role="status"></div>
                            <i v-else class="bi bi-geo-alt text-dark"></i>
                        </span>
                        <input
                            v-model="form.keyword"
                            ref="inputSearch"
                            type="text"
                            class="form-control text-md shadow-none rounded-end-pill"
                            placeholder="Apa yang sedang anda cari?"
                        />
                    </div>
                </form>
                <div class="category-list">
                    <div class="d-flex gap-2 px-2 ms-1">
                        <div v-for="(category) of placeCategories" :key="category.id" class="category-item">
                            <div
                                @click="searchByCategory(category.name)"
                                :class="{
                                    'bg-primary': category.name.toLowerCase() === form.keyword.toLowerCase(),
                                    'text-white': category.name.toLowerCase() === form.keyword.toLowerCase(),
                                    'bg-white': category.name.toLowerCase() !== form.keyword.toLowerCase(),
                                    'text-dark': category.name.toLowerCase() !== form.keyword.toLowerCase(),
                                }"
                                class="badge border border-gray waves-effect waves-dark">
                                <img :src="category.mapMarkerLink" class="map-marker-image" alt="...">
                                <span>{{ category.name }}</span>
                            </div>
                        </div>
                        <div class="invisible ms-5">......</div>
                    </div>
                </div>
            </div>

            <!-- maps view  -->
            <MainMaps />

            <!-- search result list view -->
            <div v-if="placeSearchList.length" class="search-result-item">
                <div class="action-button mb-3">
                    <div class="d-flex">
                        <div class="col-4">
                            <button @click="clearMapSearch()" class="icon icon-sm icon-shape bg-white rounded-circle waves-effect waves-dark ms-3">
                                <i class="bi bi-x-lg" style="font-size: 20px;"></i>
                            </button>
                        </div>
                        <div class="col-8 text-end">
                            <button
                                @click="$router.push({name: 'maps:search-list' })"
                                class="btn btn-sm btn-neutral border-base waves-effect waves-dark me-3">
                                <i class="bi bi-list-ul me-2"></i>
                                <span>Daftar Pencarian</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="scroll-x-wrapper px-3 pb-3 mb-2">
                    <div class="search-list d-flex gap-3">
                        <div v-for="place of placeSearchList" :key="place.id" class="search-item">
                            <CardPlaceInline :placeId="place.id" />
                        </div>
                        <div class="invisible">.</div>
                    </div>
                </div>
            </div>

        </div>
    </MainLayout>
</template>

<script lang="ts">
import { mapActions, mapState } from 'pinia'
import { usePlaceStore } from '@/stores/place.store'
import { type Coordinates } from '@/interfaces/Geolocation'
import { useGeolocationStore } from '@/stores/geolocation.store'

export default {
    computed: {
        ...mapState(useGeolocationStore, ['coordinates']),
        ...mapState(usePlaceStore, ['placeCategories', 'placeSearchList'])
    },

    methods: {
        ...mapActions(usePlaceStore, ['getPlaceCategories', 'searchPlacesByKeyword', 'clearPlaceSearchList']),

        async searchPlaces () {
            if (this.form.keyword.trim() === '') return
            this.form.loading = true
            this.$router.push({ name: 'maps', query: { keyword: this.form.keyword } })
            await this.searchPlacesByKeyword(this.form.keyword as string, this.coordinates as Coordinates)
            setTimeout(() => {
                (this.$refs.inputSearch as HTMLInputElement).blur()
                this.form.loading = false
            }, 500)
        },

        async searchByCategory (categoryName: string) {
            this.form.keyword = categoryName
            await this.searchPlaces()
        },

        clearMapSearch () {
            this.clearPlaceSearchList()
            this.form.keyword = ''
        }
    },

    async beforeMount () {
        this.clearPlaceSearchList()
        await this.getPlaceCategories()
        const queryKeyword = this.$route.query.keyword as string | undefined
        if (queryKeyword !== undefined) {
            this.form.keyword = queryKeyword
            this.searchPlaces()
        }
    },

    mounted () {
        (this.$refs.inputSearch as HTMLInputElement).focus()
    },

    data () {
        return {
            form: {
                keyword: '',
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
.map-search {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    width: 100%;
    form {
        padding: 14px 12px;
    }
    .form-control {
        font-size: 14px;
    }
}
.category-list {
    overflow-x: scroll;
    .category-item {
        .badge {
            display: flex;
            align-items: center;
            font-size: 12px;
            padding: 6px 10px;
            width: max-content;
        }
        .map-marker-image {
            height: 24px;
            display: block;
            margin-right: 2px;
        }
    }
}
.search-result-item {
    width: 100%;
    position: absolute;
    bottom: 0px;
    .scroll-x-wrapper {
        overflow-x: scroll;
    }
}
</style>

<style lang="scss">
.main-maps-layout {
    position: relative;
    .map-container {
        position: relative;
    }
    .main-content {
        padding-bottom: 0 !important;
    }
    .bottom-navigation-bar {
        position: relative;
    }
}
</style>
