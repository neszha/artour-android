<template>
    <div class="modal fade modal-animate anim-blur" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-body pt-4">
                    <button ref="close" type="button" class="btn-close d-none" data-bs-dismiss="modal" aria-label="Close"></button>
                    <div class="row">
                        <div class="col-12">
                            <span>Yakin ingin mengapus kategori wisata ini?</span>
                        </div>
                    </div>
                    <div class="mt-4 d-flex justify-content-end">
                        <button @click="($refs.close as  HTMLElement).click()" type="button" class="btn btn-sm btn-link text-secondary">Batal</button>
                        <button @click="deletePlaceCategory" type="button" class="btn btn-sm btn-link text-danger">Hapus Kategori</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { mapActions } from 'pinia'
import { isAxiosError } from 'axios'
import axios from '@/helpers/axios.helper'
import { usePlaceStore } from '@/stores/place.store'
import { API_URL_PLACE_CATEGORIES_ID } from '@/constants/api-url'

export default {

    methods: {
        ...mapActions(usePlaceStore, ['getMyPlaces']),

        async deletePlaceCategory () {
            try {
                const url = API_URL_PLACE_CATEGORIES_ID.replace(':placeCategoryId', this.placeCategoryId as string)
                await axios.delete(url);
                (this.$refs.close as HTMLElement).click()
                if (window.Android !== undefined) {
                    window.Android.showToast('Data kategori wisata berhasil dihapus!')
                } else {
                    alert('Data kategori wisata berhasil dihapus!')
                }
                this.$router.back()
            } catch (error) {
                if (isAxiosError(error)) {
                    const message = error.response?.data.message as string
                    alert(message)
                }
                console.error(error)
            }
        }
    },

    props: {
        placeCategoryId: {
            type: String,
            required: true
        }
    }
}
</script>
