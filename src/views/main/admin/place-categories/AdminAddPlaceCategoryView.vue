<script setup lang="ts">
import HeaderNavbar from '@components/common/HeaderNavbar.vue'
</script>

<template>
    <HeaderNavbar nav-title="Tambah Kategori" />

    <!-- form content -->
    <div class="container-fluid mt-4">
        <form @submit.prevent="createNewPlaceCategory()">
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
                <div
                    v-if="form.mapMarkerPreview"
                    class="d-flex justify-content-center">
                    <div
                        class="image-item rounded p-2">
                        <img :src="form.mapMarkerPreview" alt="..." >
                    </div>
                </div>
                <div>
                    <label class="form-label" for="input_file">Pilih Gambar</label>
                    <input @change="setAndPreviewImage" id="input_file" type="file" class="form-control" accept="image/png">
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
</template>

<script lang="ts">
import axios from '@/helpers/axios.helper'
import { API_URL_PLACE_CATEGORIES } from '@/constants/api-url'

export default {
    computed: {
        //
    },

    methods: {
        setAndPreviewImage (event: Event) {
            const files = (event.target as HTMLInputElement).files
            if (files === null) return
            const singleFile = files[0]
            this.form.mapMarkerPreview = URL.createObjectURL(singleFile)
            this.form.data.mapMarker = singleFile
        },

        async createNewPlaceCategory () {
            this.form.loading = true
            if (this.form.data.mapMarker === null) {
                alert('Pilih Map Marker!')
                return
            }
            try {
                const formData = new FormData()
                formData.append('name', this.form.data.name as string)
                formData.append('description', this.form.data.description as string)
                formData.append('mapMarker', this.form.data.mapMarker as File, 'map-marker.png')
                await axios.post(API_URL_PLACE_CATEGORIES, formData)
                this.$router.push({ name: 'admin:place-category' })
                if (window.Android !== undefined) {
                    window.Android.showToast('Kategory berhasil ditambahkan.')
                } else {
                    alert('Kategory berhasil ditambahkan.')
                }
                this.$router.back()
            } catch (error) {
                console.error(error)
                alert('Kategory gagal ditambahkan.')
            }
            this.form.loading = false
        }
    },

    data () {
        return {
            form: {
                data: {
                    name: '',
                    description: '',
                    mapMarker: null as unknown as File
                },
                mapMarkerPreview: '',
                loading: false
            }
        }
    }
}
</script>

<style scoped lang="scss">
.image-item {
    background-color: var(--x-gray-200);
    img {
        width: 80px;
    }
}
</style>
