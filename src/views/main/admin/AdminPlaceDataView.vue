<script setup lang="ts">
import HeaderNavbar from '@components/common/HeaderNavbar.vue'
import ModalDeletePlaceFromAdmin from '@/views/components/modals/ModalDeletePlaceFromAdmin.vue'
</script>

<template>
    <HeaderNavbar nav-title="Data Tempat Wisata" />

    <!-- filter  -->
    <section class="container-fluid mt-4 mb-4">
        <div class="d-flex flex-column flex-md-row gap-3 justify-content-between">
            <div class="d-flex gap-3">
                <div class="input-group input-group-sm input-group-inline">
                    <span class="input-group-text pe-2">
                        <i class="bi bi-search"></i>
                    </span>
                    <input
                        v-model="filter.keyword"
                        type="text"
                        class="form-control"
                        placeholder="Search"
                        aria-label="Search"
                    />
                </div>
            </div>
        </div>
    </section>

    <!-- data list  -->
    <section class="container-fluid mb-5">
        <div class="card">
            <div class="card-header d-flex align-items-center justify-content-between">
                <h5 class="me-auto">Daftar Tempat Wisata</h5>
            </div>
            <div class="table-responsive">
                <table class="table table-hover table-nowrap">
                    <thead class="table-light">
                        <tr>
                            <th scope="col">Nama</th>
                            <th scope="col">Kategory</th>
                            <th scope="col">User</th>
                            <th scope="col">Lokasi</th>
                            <th scope="col">Alamat</th>
                            <th scope="col">Harga Masuk</th>
                            <th scope="col">Rating</th>
                            <th scope="col">Like</th>
                            <th scope="col">Dislike</th>
                            <th scope="col">Disimpan</th>
                            <th scope="col">Pengunjung</th>
                            <th scope="col">Terdaftar</th>
                            <th scope="col">Diperbaharui</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="filteredPlaces.length === 0">
                            <td class="text-center" colspan="7">
                                <span>Tidak ada data!</span>
                            </td>
                        </tr>
                        <tr v-for="place of filteredPlaces" :key="place.id">
                            <td>
                                <RouterLink :to="{name: 'place:detail', params: {placeId: place.id}}">
                                    {{ place.name }}
                                </RouterLink>
                            </td>
                            <td>
                                {{ place.category?.name }}
                            </td>
                            <td>
                                {{ place.user?.name }}
                            </td>
                            <td>
                                <a
                                    @click="openLocationInGoogleMaps(place.latitude, place.longitude)"
                                    href="javascript:void(0);">
                                    {{ place.latitude }},
                                    <br>
                                    {{ place.longitude }}
                                </a>
                            </td>
                            <td>
                                {{ place.address }}
                            </td>
                            <td>
                                {{ toIdrCurrency(place.price) }}
                            </td>
                            <td>
                                {{ place.rating.toFixed(2) }}
                            </td>
                            <td>
                                {{ place.like }}
                            </td>
                            <td>
                                {{ place.dislike }}
                            </td>
                            <td>
                                {{ place.saved }}
                            </td>
                            <td>
                                {{ place.views }}
                            </td>
                            <td>
                                {{ getTimeString(place.createdAt) }}
                            </td>
                            <td>
                                {{ getTimeString(place.updatedAt) }}
                            </td>
                            <td class="text-end">
                                <button
                                    @click="openDeleteModal(place.id)"
                                    type="button" class="btn btn-sm btn-square btn-outline-danger waves-effect waves-dark">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="card-footer border-0 py-3">
                <span class="text-muted text-sm">Menampilkan {{ filteredPlaces.length }} dari {{ places.length }} total data</span>
            </div>
        </div>
    </section>

    <!-- modals  -->
    <ModalDeletePlaceFromAdmin id="modal_delete_place" :place-id="modalData.placeId" />
</template>

<script lang="ts">
import moment from 'moment'
import { mapActions, mapState } from 'pinia'
import { useAdminStore } from '@/stores/admin.store'
import { type PlaceEntity } from '@/interfaces/Place'
import { toIdrCurrency } from '@/helpers/formater.helper'
import { RouterLink } from 'vue-router'

export default {
    computed: {
        ...mapState(useAdminStore, ['places']),

        filteredPlaces (): PlaceEntity[] {
            let places = this.places as PlaceEntity[]

            // Filter by keyword.
            const lowerKeyword = this.filter.keyword.toLowerCase() as string
            places = places.filter((place: PlaceEntity) => {
                const userName = (place.user !== undefined) ? place.user.name.toLowerCase() : ''
                const matchName = place.name.toLowerCase().includes(lowerKeyword)
                const matchCategory = place.category.name.toLowerCase().includes(lowerKeyword)
                const matchUserName = userName.includes(lowerKeyword)
                const matchAddress = place.address.toLowerCase().includes(lowerKeyword)
                return matchName || matchCategory || matchUserName || matchAddress
            })

            // done.
            return places
        }
    },

    methods: {
        ...mapActions(useAdminStore, ['getPlaces']),

        getTimeString (time: Date): string {
            return moment(time).fromNow()
        },

        openLocationInGoogleMaps (latitude: number, longitude: number) {
            const googleMapLink = `https://maps.google.com?q=${latitude},${longitude}`
            if (window.Android !== undefined) {
                window.Android.openExternalLink(googleMapLink)
                return
            }
            window.open(googleMapLink, '_blank')
        },

        openDeleteModal (placeId: string) {
            this.modalData.placeId = placeId
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const modal = new bootstrap.Modal(document.getElementById('modal_delete_place'))
            modal.show()
        }
    },

    beforeMount () {
        this.getPlaces()
    },

    data () {
        return {
            filter: {
                keyword: '' as string
            },
            modalData: {
                placeId: ''
            }
        }
    }

}
</script>
