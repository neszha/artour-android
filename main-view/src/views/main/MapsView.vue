<script setup lang="ts">
import MainLayout from '../layouts/MainLayout.vue'
import MainMaps from '@components/maps/MainMaps.vue'
</script>

<template>
    <MainLayout>
        <div class="map-container">
            <div class="map-search">
                <form class="">
                    <div class="input-group input-group-md input-group-inline shadow border-none">
                        <span class="input-group-text pe-2 rounded-start-pill">
                            <i class="bi bi-geo-alt text-dark"></i>
                        </span>
                        <input type="text"
                            class="form-control text-md shadow-none rounded-end-pill"
                            placeholder="Apa yang sedang anda cari?" aria-label="Search">
                    </div>
                </form>
                <div class="category-list">
                    <div class="d-flex gap-2 px-2 ms-1">
                        <div v-for="i of 10" :key="i" class="category-item">
                            <span class="badge bg-white text-dark border border-gray waves-effect waves-dark">
                                Wisata Alam
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
