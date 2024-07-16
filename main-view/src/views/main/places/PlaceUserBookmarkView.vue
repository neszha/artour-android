<script setup lang="ts">
import HeaderNavbar from '@components/common/HeaderNavbar.vue'
import CardPlaceBookmark from '@/views/components/card/CardPlaceBookmark.vue'
</script>

<template>
    <HeaderNavbar nav-title="Tempat Disimpan" />

    <!-- place bookmarks  -->
    <section class="mb-4 pt-3">
        <div class="container-fluid">
            <div class="row mb-3">
                <div class="col">
                    <h1 class="font-bold h3" style="font-weight: bold;">
                        Bookmark
                    </h1>
                    <p class="text-sm text-muted mt-1">
                        Tempat wisata yang anda simpan
                    </p>
                </div>
            </div>
        </div>
        <div class="vertical-infinite-scroll px-2">
            <div class="row w-100">
                <div  v-for="place in placeBookmarks" :key="place.id" class="col-6 mb-3 px-2">
                    <CardPlaceBookmark :placeId="place.id" class="card-place-sm" />
                </div>
            </div>
        </div>
        <div v-if="!placeBookmarks.length" class="no-card-list container-fluid">
            <div class="card">
                <div class="card-body text-center py-5">
                    <div class="mb-3">
                        <small>
                            Daftar tempat disimpan kosong!
                        </small>
                    </div>
                    <RouterLink :to="{ name: 'explore' }" class="btn btn-sm font-bold btn-neutral text-nowrap shadow-none">Explore Tempat Wisata</RouterLink>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { mapState, mapActions } from 'pinia'
import { usePlaceStore } from '@/stores/place.store'

export default {
    computed: {
        ...mapState(usePlaceStore, ['placeBookmarks'])
    },

    methods: {
        ...mapActions(usePlaceStore, ['getPlaceBookmarks'])
    },

    beforeMount () {
        this.getPlaceBookmarks()
    }
}
</script>

<style scoped lang="scss">
.vertical-infinite-scroll {
    display: flex;
    justify-content: center;

    .card {
        width: 100%;
    }
}
</style>
