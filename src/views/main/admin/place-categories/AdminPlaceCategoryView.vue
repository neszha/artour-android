<script setup lang="ts">
import HeaderNavbar from '@components/common/HeaderNavbar.vue'
</script>

<template>
    <HeaderNavbar nav-title="Kategori Wisata" >
        <template #right-action>
            <div
                @click="$router.push({ name: 'admin:add-place-category' })"
                class="ps-2" type="button">
                <i class="bi bi-plus" style="font-size: 30px;"></i>
            </div>
        </template>
    </HeaderNavbar>

    <!-- category list  -->
    <div class="container-fluid mt-3">
        <div class="row">
            <div
                v-for="(category) in placeCategories"
                :key="category.id"
                @click="openPlaceCategoryEditView(category.id)"
                class="col-12">
                <div class="card mb-3">
                    <div class="card-body px-0">
                        <div class="d-flex align-items-center">
                            <div class="col-auto">
                                <div class="category-marker px-2">
                                    <img :src="category.mapMarkerLink" class="img-fluid" alt="...">
                                </div>
                            </div>
                            <div class="col text-content pe-2">
                                <h4 class="h4 font-bold mb-1">{{ category.name }}</h4>
                                <div class="mb-2">
                                    <small class="text-xs text-muted">
                                        {{ category.description }}
                                    </small>
                                </div>
                                <div>
                                    <small>Update: {{ getTimeString(category.updatedAt) }}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- empty list  -->
    <div v-if="!placeCategories.length" class="no-card-list container-fluid">
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

    <!-- add button  -->
    <div class="explore-maps container-fluid mt-4 mb-5 pb-5">
        <div class="d-grid">
            <RouterLink :to="{ name: 'admin:add-place-category' }" class="btn font-bold btn-neutral text-nowrap shadow-none">
                Tambah Kategori Wisata
            </RouterLink>
        </div>
    </div>

</template>

<script lang="ts">
import moment from 'moment'
import { mapActions, mapState } from 'pinia'
import { usePlaceCategory } from '@/stores/place-category.store'

export default {
    computed: {
        ...mapState(usePlaceCategory, ['placeCategories'])
    },

    methods: {
        ...mapActions(usePlaceCategory, ['getPlaceCategories']),

        openPlaceCategoryEditView (id: string) {
            const placeCategory = this.placeCategories.find((category) => category.id === id)
            sessionStorage.setItem('place_category_detail', JSON.stringify(placeCategory)) // Load in edit view.
            this.$router.push({ name: 'admin:edit-place-category', params: { placeCategoryId: id } })
        },

        getTimeString (time: Date): string {
            return moment(time).fromNow()
        }
    },

    async beforeMount () {
        await this.getPlaceCategories()
        window.scrollTo({
            top: 0,
            behavior: 'instant'
        })
    }
}
</script>

<style scoped lang="scss">
.text-content {
    word-break: normal;
}
.category-marker {
    img {
        width: 60px;
    }
}
</style>
