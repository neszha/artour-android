<script setup lang="ts">
import { type PlaceEntity } from '@/interfaces/Place'
import { usePlaceStore } from '@/stores/place.store'
import HeaderNavbar from '@components/common/HeaderNavbar.vue'
import CardPlaceInline from '@/views/components/card/CardPlaceInline.vue'
</script>

<template>
    <HeaderNavbar nav-title="Daftar Pencarian" />

    <!-- search  -->
    <section class="pb-4 pt-4">
        <div class="container-fluid">
            <form class="w-full w-lg-96">
                <div class="input-group input-group-md input-group-inline shadow-none">
                    <span class="input-group-text pe-2 rounded-start-pill">
                        <i class="bi bi-geo-alt"></i>
                    </span>
                    <input
                        @click="$router.push({ name: 'maps' })"
                        type="text"
                        class="form-control text-md shadow-none rounded-end-pill"
                        placeholder="Apa yang sedang anda cari?">
                </div>
            </form>
        </div>
    </section>

    <!-- placce list  -->
    <section class="mb-4">
        <div class="container-fluid">
            <div class="scroll-x">
                <div class="search-list d-flex flex-column gap-3">
                    <div v-for="place of placeSearchList" :key="place.id" class="search-item">
                        <CardPlaceInline :placeId="place.id" class="w-100" />
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>

<script lang="ts">
import { mapState } from 'pinia'

export default {
    computed: {
        ...mapState(usePlaceStore, ['placeSearchList'])
    },

    beforeMount () {
        const places: PlaceEntity[] = this.placeSearchList
        if (places.length === 0) {
            this.$router.push({ name: 'maps' })
        }
    }
}
</script>
