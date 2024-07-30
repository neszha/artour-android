<template>
    <div class="modal fade modal-animate anim-blur" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-body pt-4">
                    <button ref="close" type="button" class="btn-close d-none" data-bs-dismiss="modal" aria-label="Close"></button>
                    <div class="row">
                        <div class="col-12">
                            <span>Yakin ingin mengapus data ulasan ini?</span>
                        </div>
                    </div>
                    <div class="mt-4 d-flex justify-content-end">
                        <button @click="($refs.close as  HTMLElement).click()" type="button" class="btn btn-sm btn-link text-secondary">Batal</button>
                        <button @click="deleteReview()" type="button" class="btn btn-sm btn-link text-danger">Hapus Ulasan</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import axios from '@/helpers/axios.helper'
import { API_URL_PLACE_REVIEWS_ID } from '@/constants/api-url'

export default {

    methods: {

        async deleteReview () {
            try {
                const url = API_URL_PLACE_REVIEWS_ID.replace(':placeReviewId', this.placeReviewId as string)
                await axios.delete(url);
                (this.$refs.close as HTMLElement).click()
                if (window.Android !== undefined) {
                    window.Android.showToast('Data ulasan berhasil dihapus!')
                } else {
                    alert('Data ulasan berhasil dihapus!')
                }
                this.$emit('deleted')
            } catch (error) {
                alert('Gagal menghapus ulasan.')
                console.error(error)
            }
            (this.$refs.close as HTMLElement).click()
        }
    },

    props: {
        placeReviewId: {
            type: String,
            required: true
        }
    }
}
</script>
