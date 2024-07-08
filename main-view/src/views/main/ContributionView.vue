<script setup lang="ts">
import MainLayout from '../layouts/MainLayout.vue'
import CardMyPlace from '@components/card/CardMyPlace.vue'
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
                            Kontribusi
                        </h2>
                    </div>
                    <button @click="toAddPlaceView" class="navbar-toggler waves-effect waves-dark border border-secondary" type="button">
                        <i class="bi bi-plus"></i>
                    </button>
                </div>
            </nav>
        </section>

        <!-- welcome -->
        <section class="pb-4">
            <div class="container-fluid">
                <h5 class="mb-2">Halo, {{ myInfo.name || '-' }}</h5>
                <p class="text-sm lh-relaxed">
                    Anda dapat berkuntribusi dengan menambahkan tempat wisata yang anda kelola untuk diakses secara publik.
                </p>
            </div>
        </section>

        <!-- my placce list  -->
        <section class="mb-4">
            <div class="container-fluid">
                <div class="row mb-3">
                    <div class="col">
                        <h1 class="font-bold h3" style="font-weight: bold;">
                            Kelola Tempat
                        </h1>
                        <p class="text-sm text-muted mt-1">
                            Daftar Tempat Wisata yang Saya Kelola
                        </p>
                    </div>
                </div>
            </div>
            <div class="vertical-infinite-scroll px-2">
                <div class="row w-100">
                    <div v-for="(place) in myPlaces" :key="place.id" class="col-6 mb-3 px-2">
                        <CardMyPlace :placeId="place.id" class="card-place-sm" />
                    </div>
                </div>
            </div>
            <div v-if="!myPlaces.length" class="no-card-list container-fluid">
                <div class="card">
                    <div class="card-body text-center py-5">
                        <small>
                            Anda belum memiliki tempat untuk dikeloka. Klik ikon plus untuk menambahkan tampat baru!
                        </small>
                    </div>
                </div>
            </div>
        </section>
    </MainLayout>
</template>

<script lang="ts">
import { mapActions, mapState } from 'pinia'
import { useUserStore } from '@/stores/user.store'
import { usePlaceStore } from '@/stores/place.store'

export default {

    computed: {
        ...mapState(useUserStore, ['myInfo']),
        ...mapState(usePlaceStore, ['myPlaces'])
    },

    methods: {
        ...mapActions(usePlaceStore, ['getPlaceCategories', 'getMyPlaces']),

        toAddPlaceView () {
            this.$router.push({ name: 'add-place' })
        }
    },

    async beforeMount () {
        await this.getPlaceCategories()
        await this.getMyPlaces()
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
.vertical-infinite-scroll {
    display: flex;
    justify-content: center;

    .card {
        width: 100%;
    }
}
</style>
