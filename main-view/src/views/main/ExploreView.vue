<script setup lang="ts">
import MainLayout from '../layouts/MainLayout.vue'
import CardPlaceNearest from '@components/card/CardPlaceNearest.vue'
import CardPlaceCategory from '@components/card/CardPlaceCategory.vue'
import CardPlaceHightlight from '@components/card/CardPlaceHightlight.vue'
</script>

<template>
    <MainLayout>

        <!-- header  -->
        <section class="home-header mb-3">
            <nav class="navbar navbar-light px-0 py-1">
                <div class="container-xl">
                    <a class="navbar-brand" href="#">
                        <img src="/logo/box_logo.png" class="h-8 me-2" alt="...">
                    </a>
                    <div class="text-center">
                        <h2 class="font-bold h3" style="font-style: bold !important;">
                            Explore
                        </h2>
                    </div>
                    <RouterLink :to="{name: 'place:bookmarks'}" class="navbar-toggler text-dark" type="button">
                        <i class="bi bi-bookmarks"></i>
                    </RouterLink>
                </div>
            </nav>
        </section>

        <!-- search  -->
        <section class="pb-4">
            <div class="container-fluid">
                <form class="w-full w-lg-96">
                    <div class="input-group input-group-md input-group-inline shadow-none">
                        <span class="input-group-text pe-2 rounded-start-pill">
                            <i class="bi bi-geo-alt"></i>
                        </span>
                        <input
                            @click="toMapView"
                            type="text"
                            class="form-control text-md shadow-none rounded-end-pill"
                            placeholder="Apa yang sedang anda cari?">
                    </div>
                </form>
            </div>
        </section>

        <!-- highlight  -->
        <section class="mb-4">
            <div class="container-fluid">
                <div class="row mb-3">
                    <div class="col">
                        <h1 class="font-bold h3" style="font-weight: bold;">
                            Highlight
                        </h1>
                        <p class="text-sm text-muted mt-1">
                            Rekomendasi Tempat Wisata untuk Anda
                        </p>
                    </div>
                </div>
            </div>
            <div class="horizontal-scroll">
                <div class="hs-item px-3">
                    <CardPlaceHightlight v-for="place in hightlightPlaces" :key="place.id" :placeId="place.id" />
                </div>
            </div>
            <div v-if="!hightlightPlaces.length" class="no-card-list container-fluid">
                <div class="card">
                    <div class="card-body text-center py-5">
                        <div class="mb-3">
                            <small>
                                Tidak ada daftar tempat wisata. Kontribusi untuk menambahkan tempat baru!
                            </small>
                        </div>
                        <RouterLink :to="{ name: 'contribution' }" class="btn btn-sm font-bold btn-neutral text-nowrap shadow-none">Kontribusi</RouterLink>
                    </div>
                </div>
            </div>
        </section>

        <!-- category  -->
        <section class="mb-4">
            <div class="container-fluid">
                <div class="row mb-3">
                    <div class="col">
                        <h1 class="font-bold h3" style="font-weight: bold;">
                            Kategori Wisata
                        </h1>
                        <p class="text-sm text-muted mt-1">
                            Explore Wisata Berdasarkan Kategori
                        </p>
                    </div>
                </div>
            </div>
            <div class="horizontal-scroll">
                <div class="hs-item px-3">
                    <CardPlaceCategory v-for="category in placePreviewCategoriesWithPopularPlace" :key="category.id" :categoryId="category.id" />
                </div>
            </div>
            <div v-if="!hightlightPlaces.length" class="no-card-list container-fluid">
                <div class="card">
                    <div class="card-body text-center py-5">
                        <div class="mb-3">
                            <small>
                                Tidak ada daftar kategori ditampilkan.
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- nearest tourist location  -->
        <section class="mb-4">
            <div class="container-fluid">
                <div class="row mb-3">
                    <div class="col">
                        <h1 class="font-bold h3" style="font-weight: bold;">
                            Wisata Terdekat
                        </h1>
                        <p class="text-sm text-muted mt-1">
                            Temukan Lokasi Wisata Terdekat dari Lokasi Anda
                        </p>
                    </div>
                </div>
            </div>
            <div class="vertical-infinite-scroll px-2">
                <div class="row w-100">
                    <div  v-for="place in nearestPlaces" :key="place.id" class="col-6 mb-3 px-2">
                        <CardPlaceNearest :placeId="place.id" class="card-place-sm" />
                    </div>
                </div>
            </div>
            <div v-if="!nearestPlaces.length" class="no-card-list container-fluid">
                <div class="card">
                    <div class="card-body text-center py-5">
                        <div class="mb-3">
                            <small>
                                Tidak ada daftar tempat wisata. Kontribusi untuk menambahkan tempat baru!
                            </small>
                        </div>
                        <RouterLink :to="{ name: 'contribution' }" class="btn btn-sm font-bold btn-neutral text-nowrap shadow-none">Kontribusi</RouterLink>
                    </div>
                </div>
            </div>
            <div class="explore-maps container-fluid mt-4 mb-5">
                <div class="d-grid">
                    <RouterLink :to="{ name: 'maps' }" class="btn font-bold btn-neutral text-nowrap shadow-none">Explore via Maps</RouterLink>
                </div>
            </div>
        </section>
    </MainLayout>
</template>

<script lang="ts">
import { mapActions, mapState } from 'pinia'
import { usePlaceStore } from '@/stores/place.store'
import { useGeolocationStore } from '@/stores/geolocation.store'
import { type PlaceCategoryEntity } from '@/interfaces/Place'

export default {

    computed: {
        ...mapState(usePlaceStore, ['hightlightPlaces', 'placePreviewCategories', 'nearestPlaces']),
        ...mapState(useGeolocationStore, ['coordinates']),

        placePreviewCategoriesWithPopularPlace (): PlaceCategoryEntity[] {
            return this.placePreviewCategories.filter((item: PlaceCategoryEntity) => item.popularPlace !== undefined)
        }
    },

    methods: {
        ...mapActions(useGeolocationStore, ['getCurrentGeolocation']),
        ...mapActions(usePlaceStore, ['getHighlightPlaces', 'getPlacePreviewCategories', 'getNearestPlaces']),

        toMapView () {
            this.$router.push({ name: 'maps' })
        }
    },

    async beforeMount () {
        this.getHighlightPlaces()
        this.getPlacePreviewCategories()
        await this.getCurrentGeolocation()
        this.getNearestPlaces(this.coordinates)
    },

    mounted () {
        window.scrollTo({
            top: 0,
            behavior: 'instant'
        })
    }
}
</script>

<style scoped lang="scss">
.navbar {
    .navbar-toggler {
        font-size: 22px;
        box-shadow: none;
        &:focus {
            color: #6B7B93;
        }
    }
}
.navbar-brand {
    img {
        height: 33px;
    }
}
.horizontal-scroll {
    display: flex;
    overflow-x: auto;
    white-space: nowrap;
    scroll-behavior: smooth;

    .hs-item {
        display: flex;
        gap: 12px;
    }
}
.vertical-infinite-scroll {
    display: flex;
    justify-content: center;

    .card {
        width: 100%;
    }
}
</style>
