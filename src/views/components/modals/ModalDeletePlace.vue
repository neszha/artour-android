<template>
    <div class="modal fade modal-animate anim-blur" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-body pt-4">
                    <button ref="close" type="button" class="btn-close d-none" data-bs-dismiss="modal" aria-label="Close"></button>
                    <div class="row">
                        <div class="col-12">
                            <span>Yakin ingin mengapus tempat ini?</span>
                        </div>
                    </div>
                    <div class="mt-4 d-flex justify-content-end">
                        <button @click="($refs.close as  HTMLElement).click()" type="button" class="btn btn-sm btn-link text-secondary">Batal</button>
                        <button @click="deletePlace" type="button" class="btn btn-sm btn-link text-danger">Hapus Tempat</button>
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
import { API_URL_PLACES_ID } from '@/constants/api-url'

export default {

    methods: {
        ...mapActions(usePlaceStore, ['getMyPlaces']),

        async deletePlace () {
            try {
                const url = API_URL_PLACES_ID.replace(':placeId', this.placeId as string)
                await axios.delete(url)
                await this.getMyPlaces();
                (this.$refs.close as HTMLElement).click()
                if (window.Android !== undefined) {
                    window.Android.showToast('Data tempat berhasil dihapus!')
                } else {
                    alert('Data tempat berhasil dihapus!')
                }
                this.$router.push({ name: 'contribution' })
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
        placeId: {
            type: String,
            required: true
        }
    }
}
</script>
