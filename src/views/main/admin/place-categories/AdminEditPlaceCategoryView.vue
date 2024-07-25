<script setup lang="ts">
import HeaderNavbar from '@components/common/HeaderNavbar.vue'
import ModalDeletePlaceCategory from '@/views/components/modals/ModalDeletePlaceCategory.vue'
</script>

<template>
    <HeaderNavbar nav-title="Edit Kategori" >
        <template #right-action>
            <div
                @click="openModalDeletePlaceCategory()"
                class="px-2" type="button">
                <i class="bi bi-trash" style="font-size: 20px;"></i>
            </div>
        </template>
    </HeaderNavbar>

    <!-- form content -->
    <div class="container-fluid mt-4">
        <form @submit.prevent="updatePlaceCategory()">
            <div class="mb-3">
                <h4 class="mb-1">Kategory Tempat Wisata</h4>
                <p class="text-sm text-muted">
                    Masukan informasi kategori yang akan digunakan untuk mengelompokkan tempat wisata.
                </p>
            </div>
            <div class="col-12 mb-3">
                <label class="form-label">
                    <span>Nama Kategori</span>
                    <span class="text-danger">*</span>
                </label>
                <input v-model="form.data.name" type="text" class="form-control" placeholder="Masukan nama kategori" required></div>
            <div class="col-12 mb-3">
                <label class="form-label">
                    <span>Deskripsi Kategori</span>
                    <span class="text-danger">*</span>
                </label>
                <textarea v-model="form.data.description" class="form-control" rows="4" required placeholder="Masukan deskripsi kategory"></textarea>
            </div>
            <div class="mb-3 pt-1">
                <h4 class="mb-1">Map Marker</h4>
                <p class="text-sm text-muted mb-3">
                    Pilih gambar marker untuk ditampilkan pada maps.
                </p>
                <select v-model="form.data.mapMarker" class="form-select d-none">
                    <option v-for="(marker) in mapMarkes" :key="marker.mapMarker" :value="marker.mapMarker">{{ marker.mapMarker }}</option>
                </select>
                <div class="mt-2 scroll-x">
                    <div class="d-flex gap-2">
                        <div
                            v-for="(marker) in mapMarkes" :key="marker.mapMarker"
                            @click="form.data.mapMarker = marker.mapMarker"
                            :class="{ 'selected': form.data.mapMarker === marker.mapMarker }"
                            class="col-auto image-item rounded p-2">
                            <img :src="marker.url" alt="..." >
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 pt-4">
                <div class="mb-2">
                    <div class="d-flex gap-3 justify-content-center">
                        <div class="d-grid w-100">
                            <button type="button" class="btn btn-md btn-neutral border-base waves-effect waves-dark" @click="$router.back()">
                                Batal
                            </button>
                        </div>
                        <div class="d-grid w-100">
                            <button :disabled="form.loading" type="submit" class="btn btn-md btn-primary waves-effect waves-light">
                                <span>Kirim</span>
                                <span v-if="form.loading">...</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>

    <!-- modal  -->
    <ModalDeletePlaceCategory id="modal_delete_place_category" :place-category-id="placeCategoryId" />
</template>

<script lang="ts">
import { mapActions, mapState } from 'pinia'
import axios from '@/helpers/axios.helper'
import { usePlaceCategory } from '@/stores/place-category.store'
import { API_URL_PLACE_CATEGORIES_ID } from '@/constants/api-url'

export default {
    computed: {
        ...mapState(usePlaceCategory, ['mapMarkes']),

        placeCategoryId (): string {
            return this.$route.params.placeCategoryId as string
        }
    },

    methods: {
        ...mapActions(usePlaceCategory, ['getMapMarkers']),

        loadPlaceCategoryFromStorage () {
            const dataJsonString = sessionStorage.getItem('place_category_detail')
            if (dataJsonString === null) {
                this.$router.back()
                return
            }
            const { name, description, mapMarker } = JSON.parse(dataJsonString)
            this.form.data = { name, description, mapMarker }
        },

        openModalDeletePlaceCategory () {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const modal = new bootstrap.Modal(document.getElementById('modal_delete_place_category'))
            modal.show()
        },

        async updatePlaceCategory () {
            this.form.loading = true
            if (this.form.data.mapMarker === '') {
                alert('Pilih Map Marker!')
                return
            }
            try {
                const url = API_URL_PLACE_CATEGORIES_ID.replace(':placeCategoryId', this.placeCategoryId as string)
                await axios.put(url, this.form.data)
                this.$router.push({ name: 'admin:place-category' })
                if (window.Android !== undefined) {
                    window.Android.showToast('Kategory berhasil disimpan.')
                } else {
                    alert('Kategory berhasil disimpan.')
                }
                this.$router.back()
            } catch (error) {
                console.error(error)
                alert('Kategory gagal disimpan.')
            }
            this.form.loading = false
        }
    },

    async beforeMount () {
        await this.getMapMarkers()
        this.loadPlaceCategoryFromStorage()
    },

    data () {
        return {
            form: {
                data: {
                    name: '',
                    description: '',
                    mapMarker: ''
                },
                loading: false
            }
        }
    }
}
</script>

<style scoped lang="scss">
.scroll-x {
    overflow-x: auto;
    white-space: nowrap;
    scroll-behavior: smooth;
    .image-item {
        display: inline-block;
        overflow: hidden;
        &.selected {
            background-color: var(--x-gray-300)
        }
        img {
            width: 80px;
        }
    }
}
</style>
