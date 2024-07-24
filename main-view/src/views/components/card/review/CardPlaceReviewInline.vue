<script setup lang="ts">
import classNames from 'classnames'
</script>

<template>
    <div
        @click="openReviewInPlaceView()"
        class="card w-100">
        <div class="card-box-img">
            <img
                v-lazy="placeReview.place?.mapImageCover?.link"
                alt="..." class="card-img">
        </div>
        <div class="card-body p-2">
            <div class="head">
                <h3 class="title h4">
                    {{ placeReview.place?.name }}
                </h3>
            </div>
            <div class="review-content my-1">
                <p>
                    {{ placeReview.content }}
                </p>
            </div>
            <div class="rating d-flex gap-1">
                <i v-for="i of 5" :key="i" :class="classNames({
                    'bi-star': (placeReview.rating <= i - 1),
                    'bi-star-half': (placeReview.rating > i - 1 && placeReview.rating < i),
                    'bi-star-fill': (placeReview.rating >= i),
                })" class="bi text-warning"></i>
                <span>({{ placeReview.rating.toFixed(1) }})</span>
            </div>
            <div class="time">
                <small>
                    {{ getTimeString(placeReview.updatedAt) }}
                </small>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import moment from 'moment'
import { type PlaceReviewEntity } from '@/interfaces/PlaceReview'

export default {

    computed: {
        placeReview (): PlaceReviewEntity {
            return this.placeReviewData as PlaceReviewEntity
        }
    },

    methods: {
        getTimeString (updatedAt: Date): string {
            return moment(updatedAt).fromNow()
        },

        openReviewInPlaceView () {
            this.$router.push({
                name: 'place:detail',
                params: { placeId: this.placeReview.place?.id },
                hash: '#my-place-review'
            }
            )
        }
    },

    props: {
        placeReviewData: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped lang="scss">
    .card {
        display: flex !important;
        flex-direction: row !important;
        width: 340px;

        .card-box-img {
            width: 90px;
            height: 108px;
            overflow: hidden;
            flex-shrink: 0;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        .card-body {
            overflow: hidden;

            .title {
                font-size: 14px;
                font-weight: bold;
                overflow: hidden;
                text-overflow: ellipsis;
                text-wrap: nowrap;
            }
        }

        .review-content {
            font-size: 12px;

            p {
                text-wrap: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
        }

        .rating {
            font-size: 12px;
        }
    }
</style>
