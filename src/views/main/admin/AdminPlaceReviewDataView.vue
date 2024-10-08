<script setup lang="ts">
import moment from 'moment'
import HeaderNavbar from '@components/common/HeaderNavbar.vue'
import ModalDeletePlaceReviewFromAdmin from '@/views/components/modals/ModalDeletePlaceReviewFromAdmin.vue'
import { TIME_MOMENT_FORMAT } from '@/constants/global-string'
</script>

<template>
    <HeaderNavbar nav-title="Data Ulasan" />

    <!-- data list  -->
    <section class="container-fluid mt-4 mb-5">
        <div class="card">
            <div class="card-header d-flex align-items-center justify-content-between">
                <h5 class="me-auto">Ulasan Pengguna</h5>
                <div class="float-end">
                    <div class="dropdown">
                        <a class="dropdown-toggle text-reset" href="javascript:void(0)" id="dropdown_menu" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="font-size: 14px;">
                            <span class="fw-semibold">Filter:</span> <span class="text-muted">{{ filter.filterValue }}<i class="mdi mdi-chevron-down ms-1"></i></span>
                        </a>
                        <div class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdown_menu" style="">
                            <a
                                v-for="filter of filterList" :key="filter.key"
                                @click="filterPlaceReviews(filter.key)"
                                class="dropdown-item" href="javascript:void(0)">{{ filter.value }}</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="table-responsive">
                <table class="table table-hover table-nowrap">
                    <thead class="table-light">
                        <tr>
                            <th scope="col">Nama</th>
                            <th scope="col">Konten Ulasan</th>
                            <th scope="col">Rating</th>
                            <th scope="col">Tanggal Posting</th>
                            <th scope="col">Terakhir Update</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="filteredPlaceReviews.length === 0">
                            <td class="text-center" colspan="7">
                                <span>Tidak ada data!</span>
                            </td>
                        </tr>
                        <tr v-for="placeReview of filteredPlaceReviews" :key="placeReview.id">
                            <td>
                                <img
                                v-lazy="placeReview.user?.avatar"
                                alt="..." class="avatar avatar-sm rounded-circle me-2">
                                <span class="me-3">
                                    {{ placeReview.user?.name }}
                                </span>
                            </td>
                            <td>
                                <span v-if="placeReview.content.length > 30">
                                    {{ placeReview.content.slice(0, 30) }}...
                                </span>
                                <span v-else>
                                    {{ placeReview.content }}
                                </span>
                            </td>
                            <td>
                                {{ placeReview.rating }}
                            </td>
                            <td>
                                {{ moment(placeReview.createdAt).format(TIME_MOMENT_FORMAT) }}
                            </td>
                            <td>
                                {{ moment(placeReview.updatedAt).format(TIME_MOMENT_FORMAT) }}
                            </td>
                            <td class="d-flex gap-2">
                                <button
                                    @click="openPlaceReviewDetailView(placeReview)"
                                    type="button" class="btn btn-sm btn-neutral waves-effect waves-dark">
                                    <span>Detail</span>
                                </button>
                                <button
                                    @click="$router.push({name: 'place:detail', params: {placeId: placeReview.placeId}})"
                                    type="button" class="btn btn-sm btn-neutral waves-effect waves-dark">
                                    <span>Wisata</span>
                                </button>
                                <button
                                    @click="openDeleteModal(placeReview.id)"
                                    type="button" class="btn btn-sm btn-square btn-outline-danger waves-effect waves-dark">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="card-footer border-0 py-3">
                <span class="text-muted text-sm">Menampilkan {{ filteredPlaceReviews.length }} dari {{ placeReviewsSearchMeta.total }} total data</span>
            </div>
        </div>
    </section>

    <!-- modals  -->
    <ModalDeletePlaceReviewFromAdmin id="modal_delete_place_review" @deleted="filterPlaceReviews(filter.filterKey)" :place-review-id="modalData.placeReviewId" />
</template>

<script lang="ts">
import { mapActions, mapState } from 'pinia'
import { useAdminStore } from '@/stores/admin.store'
import { type PlaceReviewEntity } from '@/interfaces/PlaceReview'

export default {
    computed: {
        ...mapState(useAdminStore, ['placeReviews', 'placeReviewsSearchMeta']),

        filteredPlaceReviews (): PlaceReviewEntity[] {
            const placeReviews = this.placeReviews as PlaceReviewEntity[]
            // done.
            return placeReviews
        }
    },

    methods: {
        ...mapActions(useAdminStore, ['getPlaceReviews']),

        getTimeString (time: Date): string {
            return moment(time).fromNow()
        },

        filterPlaceReviews (filterKey: string) {
            this.filter.filterKey = filterKey
            this.filter.filterValue = this.filterList.find(x => x.key === filterKey)?.value as string
            void this.getPlaceReviews(this.filter.filterKey as string, 50)
        },

        openPlaceReviewDetailView (placeReview: PlaceReviewEntity) {
            sessionStorage.setItem('place_review_detail', JSON.stringify(placeReview)) // Load data when open place review detail view.
            this.$router.push({
                name: 'review:detail',
                params: {
                    placeId: placeReview.placeId,
                    placeReviewId: placeReview.id
                }
            })
        },

        openDeleteModal (placeReviewId: string) {
            this.modalData.placeReviewId = placeReviewId
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const modal = new bootstrap.Modal(document.getElementById('modal_delete_place_review'))
            modal.show()
        }
    },

    beforeMount () {
        this.getPlaceReviews(this.filter.filterKey, 50)
    },

    data () {
        return {
            filter: {
                keyword: '' as string,
                filterKey: 'newest',
                filterValue: 'Terbaru'
            },
            filterList: [
                { key: 'newest', value: 'Terbaru' },
                { key: 'rating_desc', value: 'Rating Tertinggi' },
                { key: 'rating_asc', value: 'Rating Terendah' },
                { key: 'rating_5', value: 'Rating (5)' },
                { key: 'rating_4', value: 'Rating (4)' },
                { key: 'rating_3', value: 'Rating (3)' },
                { key: 'rating_2', value: 'Rating (2)' },
                { key: 'rating_1', value: 'Rating (1)' }
            ],
            modalData: {
                placeReviewId: ''
            }
        }
    }

}
</script>
