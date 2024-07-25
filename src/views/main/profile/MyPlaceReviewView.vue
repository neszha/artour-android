<script setup lang="ts">
import HeaderNavbar from '@components/common/HeaderNavbar.vue'
import CardPlaceReviewInline from '@/views/components/card/review/CardPlaceReviewInline.vue'
</script>

<template>
    <HeaderNavbar nav-title="Ulasan Saya" />

    <!-- content  -->
    <div class="container-fluid mt-3 mb-5">
        <div class="scroll-x">
            <div class="search-list d-flex flex-column gap-3">
                <div v-for="review of myPlaceReviews" :key="review.id" class="search-item">
                    <CardPlaceReviewInline :place-review-data="review" />
                </div>
            </div>
        </div>
        <div v-if="!myPlaceReviews.length" class="no-card-list container-fluid">
            <div class="card">
                <div class="card-body text-center py-5">
                    <div class="mb-3">
                        <small>
                            Tidak ada daftar ulasan.
                        </small>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { type AxiosResponse } from 'axios'
import { type PlaceReviewEntity } from '@/interfaces/PlaceReview'
import axios from '@/helpers/axios.helper'
import { API_URL_PLACE_REVIEWS_MY_REVIEWS } from '@/constants/api-url'

export default {

    methods: {
        async getMyPlaceReviews () {
            try {
                const response: AxiosResponse = await axios.get(API_URL_PLACE_REVIEWS_MY_REVIEWS)
                this.myPlaceReviews = response.data.data as PlaceReviewEntity[]
            } catch (error) {
                alert('Gagal mengambil data.')
                console.error(error)
                this.$router.back()
            }
        }
    },

    beforeMount () {
        this.getMyPlaceReviews()
    },

    data () {
        return {
            myPlaceReviews: [] as PlaceReviewEntity[]
        }
    }
}
</script>
