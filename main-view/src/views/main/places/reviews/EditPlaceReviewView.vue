<script setup lang="ts">
import classNames from 'classnames'
import HeaderNavbar from '@components/common/HeaderNavbar.vue'
</script>

<template>
    <HeaderNavbar nav-title="Edit Ulasan" />

    <!-- star ratings -->
    <div class="d-flex justify-content-center mt-4 mb-4">
        <div class="rating d-flex gap-3">
            <i
                v-for="i of 5"
                @click="form.data.rating = i"
                :key="i"
                :class="classNames({
                'bi-star': (form.data.rating <= i - 1),
                'bi-star-half': (form.data.rating > i - 1 && form.data.rating < i),
                'bi-star-fill': (form.data.rating >= i),
            })" class="bi text-warning"></i>
        </div>
    </div>

    <!-- content review  -->
    <div class="container-fluid">
        <div class="mb-3">
            <label class="form-label">Jelaskan penilaian anda<span class="text-danger">*</span></label>
            <textarea v-model="form.data.content" class="form-control" rows="4" required placeholder="Bagikan pengalaman anda di tempat ini!"></textarea>
        </div>
    </div>

    <!-- image review  -->
    <div class="container-fluid">
        <div class="mb-4">
            <input ref="fileImageInput" @change="uploadImagePlace"  type="file" class="d-none" multiple accept="image/*">
            <div class="d-grid">
                <button @click="($refs.fileImageInput as HTMLInputElement).click()" type="button" class="btn btn-sm btn-neutral border-base waves-effect waves-dark">
                    <span class="pe-2">
                        <i class="bi bi-images"></i>
                    </span>
                    <span>Tambahkan foto</span>
                </button>
            </div>
        </div>
    </div>
    <div class="mt-2 image-scrollable-x">
        <div class="d-flex gap-2 ps-2">
            <div
                v-for="file of images"
                :key="file.id"
                class="col-auto image-item rounded">
                <div @click="unusedPlaceImage(file.id)" class="close-button">
                    <i class="bi bi-x-circle"></i>
                </div>
                <img alt="..." :src="file.link">
            </div>
            <div class="invisible">xxxx</div>
        </div>
    </div>

    <!-- post button -->
    <div class="container-fluid mt-4">
        <div class="d-grid w-100">
            <button @click="editReview()" :disabled="form.loading" type="button" class="btn btn-md btn-primary waves-effect waves-light">
                <span>Posting</span>
                <span v-if="form.loading">...</span>
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { type AxiosResponse } from 'axios'
import { mapActions, mapState } from 'pinia'
import axios from '@/helpers/axios.helper'
import { type File } from '@/interfaces/File'
import { API_URL_FILE_MAP_CONTENTS, API_URL_PLACE_REVIEWS_ID } from '@/constants/api-url'
import { usePlaceReviewStore } from '@/stores/place-review.store'

export default {

    computed: {
        ...mapState(usePlaceReviewStore, ['myReview']),

        placeId (): string {
            return this.$route.params.placeId as string
        }
    },

    methods: {
        ...mapActions(usePlaceReviewStore, ['getMyPlaceReview']),

        async uploadImagePlace (event: Event) {
            const files = (event.target as HTMLInputElement).files
            if (files === null) return

            for (const file of files) {
                const formData = new FormData()
                formData.append('file', file)
                try {
                    const response: AxiosResponse = await axios.post(API_URL_FILE_MAP_CONTENTS, formData)
                    const fileData = response.data.data as File
                    this.images.push(fileData)
                    this.form.data.imageIds.push(fileData.id as never)
                } catch (error) {
                    console.error(error)
                }
            }
        },

        unusedPlaceImage (fileId: string) {
            this.form.data.imageIds = this.form.data.imageIds.filter((id) => id !== fileId)
            this.images = this.images.filter((file) => file.id !== fileId)
        },

        async editReview () {
            try {
                this.form.loading = true
                const url = API_URL_PLACE_REVIEWS_ID.replace(':placeReviewId', this.placeReviewId as string)
                if (this.form.data.content.trim() === '') {
                    alert('Ulasan harus diisi.')
                    this.form.loading = false
                    return
                }
                await axios.put(url, this.form.data)
                if (window.Android !== undefined) {
                    window.Android.showToast('Ulasan berhasil disimpan.')
                } else {
                    alert('Ulasan berhasil disimpan.')
                }
                this.$router.back()
            } catch (error) {
                alert('Ulasan gagal disimpan.')
                console.error(error)
            }
            this.form.loading = false
        }
    },

    async beforeMount () {
        await this.getMyPlaceReview(this.placeId)
        if (this.myReview === null) {
            this.$router.push({ name: 'explore' })
            return
        }
        this.placeReviewId = this.myReview.id
        this.form.data = {
            rating: this.myReview.rating as number,
            content: this.myReview.content as string,
            imageIds: this.myReview.imageIds as string[]
        }
        this.images = this.myReview.images as File[]
    },

    data () {
        return {
            placeReviewId: '',
            form: {
                data: {
                    rating: 1,
                    content: '',
                    imageIds: [] as string[]
                },
                loading: false
            },
            images: [] as File[]
        }
    }
}
</script>

<style scoped lang="scss">
.rating {
    .bi {
        font-size: 40px;
    }
}
.image-scrollable-x {
    overflow-x: auto;
    white-space: nowrap;
    scroll-behavior: smooth;
    .image-item {
        position: relative;
        display: inline-block;
        width: 140px;
        height: 100px;
        border: 4px solid #fff;
        border-radius: 0.7rem !important;
        overflow: hidden;
        .close-button {
            position: absolute;
            right: 8px;
            top: 2px;
            color: gray;
            font-size: 18px;
        }
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}
</style>
