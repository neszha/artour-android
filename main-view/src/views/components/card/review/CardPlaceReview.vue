<script setup lang="ts">
import classNames from 'classnames'
</script>

<template>
    <div class="card place-review-item py-4">
        <div class="container-fluid">
            <div class="d-flex align-items-center mb-3">
                <div class="me-2">
                    <div class="avatar avatar-md rounded-circle">
                        <img v-if="review.user !== undefined" alt="..." :src="review.user?.avatar">
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
            <div class="review-description">
                <p>{{ review.content }}</p>
            </div>
        </div>
        <div class="image-review mt-3">
            <div v-if="review.images?.length === 1" class="d-flex gap-1">
                <div class="image-review-item w-100" style="height: auto;">
                    <img class="w-100" v-lazy="getImageLinkIndex(0)" alt="...">
                </div>
            </div>
            <div v-if="review.images?.length === 2" class="d-flex gap-1">
                <div class="image-review-item">
                    <img class="w-100" v-lazy="getImageLinkIndex(0)" alt="...">
                </div>
                <div class="image-review-item">
                    <img class="w-100" v-lazy="getImageLinkIndex(1)" alt="...">
                </div>
            </div>
            <div v-if="review.images?.length === 3" class="d-flex gap-1">
                <div class="image-review-item">
                    <img class="w-100" v-lazy="getImageLinkIndex(0)" alt="...">
                </div>
                <div class="image-review-col">
                    <div class="image-review-item">
                        <img class="w-100" v-lazy="getImageLinkIndex(1)" alt="...">
                    </div>
                    <div class="image-review-item">
                        <img class="w-100" v-lazy="getImageLinkIndex(2)" alt="...">
                    </div>
                </div>
            </div>
            <div v-if="review.images?.length as number >= 4" class="d-flex gap-1">
                <div class="image-review-col">
                    <div class="image-review-item">
                        <img class="w-100" v-lazy="getImageLinkIndex(0)" alt="...">
                    </div>
                    <div class="image-review-item">
                        <img class="w-100" v-lazy="getImageLinkIndex(1)" alt="...">
                    </div>
                </div>
                <div class="image-review-col">
                    <div class="image-review-item">
                        <img class="w-100" v-lazy="getImageLinkIndex(2)" alt="...">
                    </div>
                    <div class="image-review-item">
                        <img class="w-100" v-lazy="getImageLinkIndex(3)" alt="...">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import moment from 'moment'
import { type PlaceReviewEntity } from '@/interfaces/PlaceReview'

export default {

    computed: {
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
.review-description {
    display: inline-block;
}
.image-review {
    .image-review-item {
        overflow: hidden;
        width: 50%;
        height: 260px;
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
