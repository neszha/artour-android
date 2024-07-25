<script setup lang="ts">
import classNames from 'classnames'
import ModalDeletePlaceReview from '@components/modals/ModalDeletePlaceReview.vue'
</script>

<template>
    <div class="card place-review-item py-4">
        <div class="container-fluid">
            <div class="d-flex justify-content-between">
                <div class="d-flex align-items-center mb-3">
                    <div class="me-2">
                        <div class="avatar avatar-md rounded-circle">
                            <img alt="..." v-lazy="review.user?.avatar">
                        </div>
                    </div>
                    <div class="flex-fill">
                        <div class="d-block h6 font-semibold mb-1">{{ review.user?.name }}</div>
                        <div class="d-flex align-items-center gap-1">
                            <i v-for="i of 5" :key="i" :class="classNames({
                                'bi-star': (review.rating <= i - 1),
                                'bi-star-half': (review.rating > i - 1 && review.rating < i),
                                'bi-star-fill': (review.rating >= i),
                            })" class="bi text-warning"></i>
                            <small>{{ getTimeString(review.updatedAt) }}</small>
                        </div>
                    </div>
                </div>
                <div v-if="myInfo.id === review.user?.id" class="ms-auto text-end">
                    <div class="dropdown">
                        <a class="text-muted ps-3" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="bi bi-three-dots-vertical"></i>
                        </a>
                        <div class="dropdown-menu" style="">
                            <RouterLink :to="{name: 'review:edit-review'}" class="dropdown-item">Edit Ulasan</RouterLink>
                            <a @click="openModalDeletePlaceReview()" href="javascript:void(0);" class="dropdown-item">Hapus Ulasan</a>
                        </div>
                    </div>
                </div>
            </div>
            <div @click="openPlaceReviewDetailView()" class="review-description">
                <p>{{ review.content }}</p>
            </div>
        </div>
        <div class="image-review mt-3">
            <div v-if="review.images?.length === 1" class="d-flex gap-1">
                <div class="image-review-item w-100" style="height: auto;">
                    <img
                        @click="openImageLightbox(0)"
                        v-lazy="getImageLinkIndex(0)"
                        class="w-100" alt="...">
                </div>
            </div>
            <div v-if="review.images?.length === 2" class="d-flex gap-1">
                <div class="image-review-item">
                    <img
                        @click="openImageLightbox(0)"
                        v-lazy="getImageLinkIndex(0)"
                        class="w-100" alt="...">
                </div>
                <div class="image-review-item">
                    <img
                        @click="openImageLightbox(1)"
                        v-lazy="getImageLinkIndex(1)"
                        class="w-100" alt="...">
                </div>
            </div>
            <div v-if="review.images?.length === 3" class="d-flex gap-1">
                <div class="image-review-item">
                    <img
                        @click="openImageLightbox(0)"
                        v-lazy="getImageLinkIndex(0)"
                        class="w-100" alt="...">
                </div>
                <div class="image-review-col">
                    <div class="image-review-item">
                        <img
                            @click="openImageLightbox(1)"
                            v-lazy="getImageLinkIndex(1)"
                            class="w-100" alt="...">
                    </div>
                    <div class="image-review-item">
                        <img
                            @click="openImageLightbox(2)"
                            v-lazy="getImageLinkIndex(2)"
                            class="w-100" alt="...">
                    </div>
                </div>
            </div>
            <div v-if="review.images?.length as number  >= 4" class="d-flex gap-1">
                <div class="image-review-col">
                    <div class="image-review-item">
                        <img
                            @click="openImageLightbox(0)"
                            v-lazy="getImageLinkIndex(0)"
                            class="w-100" alt="...">
                    </div>
                    <div class="image-review-item">
                        <img
                            @click="openImageLightbox(1)"
                            v-lazy="getImageLinkIndex(1)"
                            class="w-100" alt="...">
                    </div>
                </div>
                <div class="image-review-col">
                    <div class="image-review-item">
                        <img
                            @click="openImageLightbox(2)"
                            v-lazy="getImageLinkIndex(2)"
                            class="w-100" alt="...">
                    </div>
                    <div class="image-review-item">
                        <img
                            @click="openImageLightbox(3)"
                            v-lazy="getImageLinkIndex(3)"
                            class="w-100" alt="...">
                        <div
                            v-if="review.images?.length as number > 4"
                            @click="openPlaceReviewDetailView()"
                            class="box-image-overlay d-flex justify-content-center align-items-center">
                            <div class="text-center text-light">
                                <span style="font-size: 22px;">+{{ review.images?.length as number - 4 }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- modal  -->
    <ModalDeletePlaceReview id="modal_delete_place_review" :placeReviewId="review.id" :placeId="review.placeId" />
</template>

<script lang="ts">
import moment from 'moment'
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/user.store'
import { type PlaceReviewEntity } from '@/interfaces/PlaceReview'

export default {
    computed: {
        ...mapState(useUserStore, ['myInfo']),

        review (): PlaceReviewEntity {
            return this.reviewData as PlaceReviewEntity
        }
    },

    methods: {
        getTimeString (updatedAt: Date): string {
            return moment(updatedAt).fromNow()
        },

        getImageLinkIndex (index: number = 0): string {
            if (this.review.images === undefined) return ''
            const file = this.review.images[index]
            return file.link as string
        },

        openImageLightbox (indexOfFile: number) {
            const imageSource = this.getImageLinkIndex(indexOfFile)
            window.$.magnificPopup.open({
                items: {
                    src: imageSource
                },
                type: 'image'
            })
        },

        openModalDeletePlaceReview () {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const modal = new bootstrap.Modal(document.getElementById('modal_delete_place_review'))
            modal.show()
        },

        openPlaceReviewDetailView () {
            sessionStorage.setItem('place_review_detail', JSON.stringify(this.review)) // Load data when open place review detail view.
            this.$router.push({
                name: 'review:detail',
                params: {
                    placeId: this.review.placeId,
                    placeReviewId: this.review.id
                }
            })
        }
    },

    props: {
        reviewData: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped lang="scss">
    .place-review-item {
        border-radius: 0px;
        border-left: 0px;
        border-right: 0px;
    }

    .image-review {
        .image-review-item {
            overflow: hidden;
            width: 50%;
            height: 260px;
            position: relative;
            .box-image-overlay {
                cursor: pointer;
                position: absolute;
                z-index: 2;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.6);
            }
        }

        .image-review-col {
            display: flex;
            flex-direction: column;
            gap: 0.2rem;
            width: 50%;

            .image-review-item {
                width: 100%;
                height: 128px;
            }
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
</style>
