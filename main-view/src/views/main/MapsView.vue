<script setup lang="ts">
import MainLayout from '../layouts/MainLayout.vue'
import MainMaps from '@components/maps/MainMaps.vue'
</script>

<template>
    <MainLayout>
        <div class="map-container">
            <div class="map-search">
                <form @submit.prevent="searchPlaces">
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
                            <span
                                @click="searchByCategory(category.name)"
                                :class="{
                                    'bg-primary': category.name.toLowerCase() === form.keyword.toLowerCase(),
                                    'text-white': category.name.toLowerCase() === form.keyword.toLowerCase(),
                                    'bg-white': category.name.toLowerCase() !== form.keyword.toLowerCase(),
                                    'text-dark': category.name.toLowerCase() !== form.keyword.toLowerCase(),
                                }"
                                class="badge border border-gray waves-effect waves-dark">
                                {{ category.name }}
                            </span>
                        </div>
                        <div class="invisible">..</div>
                    </div>
                </div>
            </div>

            <MainMaps />

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
        ...mapState(usePlaceStore, ['placeCategories']),
        ...mapState(useGeolocationStore, ['coordinates'])
    },

    methods: {
        ...mapActions(usePlaceStore, ['getPlaceCategories', 'searchPlacesByKeyword']),

        async searchPlaces () {
            if (this.form.keyword.trim() === '') return
            this.form.loading = true
            this.$router.push({ name: 'maps', query: { keyword: this.form.keyword } })
            await this.searchPlacesByKeyword(this.form.keyword as string, this.coordinates as Coordinates)
            setTimeout(() => {
                this.form.loading = false
            }, 500)
        },

        async searchByCategory (categoryName: string) {
            this.form.keyword = categoryName
            await this.searchPlaces()
        }
    },

    async beforeMount () {
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
            font-size: 12px;
            padding: 6px 10px;
        }
    }
}
</style>

<style lang="scss">
.main-maps-layout {
    position: relative;
    .main-content {
        padding-bottom: 0 !important;
    }
    .bottom-navigation-bar {
        position: relative;
    }
}
</style>
