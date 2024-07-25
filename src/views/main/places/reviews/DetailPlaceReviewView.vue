<script setup lang="ts">
import classNames from 'classnames'
import HeaderNavbar from '@components/common/HeaderNavbar.vue'
import ModalDeletePlaceReview from '@/views/components/modals/ModalDeletePlaceReview.vue'
</script>

<template>
    <HeaderNavbar nav-title="Ulasan Pengguna" />

    <!-- content header  -->
    <div class="container-fluid mt-3">
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
    </div>

    <!-- review content  -->
    <div class="container-fluid">
        <div class="review-description">
            <p>{{ review.content }}</p>
        </div>
    </div>

    <!-- image contents -->
    <div class="image-review mt-3">
        <div v-for="image of review.images" :key="image.id" class="image-review-item mb-4">
            <img
                v-lazy="image.link"
                class="w-100" alt="...">
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
        ...mapState(useUserStore, ['myInfo'])
    },

    methods: {
        getTimeString (updatedAt: Date): string {
            return moment(updatedAt).fromNow()
        },

        loadReviewFromStorage () {
            const jsonString = sessionStorage.getItem('place_review_detail')
            if (jsonString === null) {
                this.$router.push({ name: 'explore' })
                return
            }
            this.review = JSON.parse(jsonString) as PlaceReviewEntity
        },

        openModalDeletePlaceReview () {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const modal = new bootstrap.Modal(document.getElementById('modal_delete_place_review'))
            modal.show()
        }
    },

    beforeMount () {
        window.scrollTo({
            top: 0,
            behavior: 'instant'
        })
        this.loadReviewFromStorage()
    },

    data () {
        return {
            review: null as PlaceReviewEntity | any
        }
    }
}
</script>

<style scoped lang="scss">
.review-description {
    word-wrap: break-word;
}
</style>
