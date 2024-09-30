<script setup lang="ts">
import { type PlaceEntity } from '@/interfaces/Place'
import { usePlaceStore } from '@/stores/place.store'
import HeaderNavbar from '@components/common/HeaderNavbar.vue'
import ModalDeletePlace from '@components/modals/ModalDeletePlace.vue'
</script>

<template>
    <HeaderNavbar nav-title="Kelola Tempat" />

    <!-- main content -->
    <section>
        <div class="card" style="border: none; border-radius: 0;">
            <div class="card-body pb-0">
                <div class="mb-3">
                    <h5 class="h4 mb-2">
                        {{ place.name }}
                    </h5>
                    <p v-html="descriptionHtml"></p>
                </div>
                <div class="list-group list-group-flush">
                    <div class="list-group-item d-flex align-items-center px-0">
                        <div class="flex-fill">
                            <h6 class="d-block h6 font-semibold mb-1">Lihat Detail</h6>
                            <span class="d-block text-sm mb-2">Lihat detail informasi tempat anda</span>
                            <div class="d-flex mx-n1"></div>
                        </div>
                        <div class="ms-auto text-end">
                            <RouterLink :to="{ name: 'place:detail', params: { placeId } }" class="btn btn-sm btn-neutral">Live View</RouterLink>
                        </div>
                    </div>
                    <div class="list-group-item d-flex align-items-center px-0">
                        <div class="flex-fill">
                            <h6 class="d-block h6 font-semibold mb-1">Kelola Informasi</h6>
                            <span class="d-block text-sm mb-2">Ubah informasi tempat anda</span>
                            <div class="d-flex mx-n1"></div>
                        </div>
                        <div class="ms-auto text-end">
                            <RouterLink :to="{ name: 'place:edit', params: { placeId } }" class="btn btn-sm btn-neutral">Edit Tempat</RouterLink>
                        </div>
                    </div>
                    <div class="list-group-item d-flex align-items-center px-0">
                        <div class="flex-fill">
                            <h6 class="d-block h6 font-semibold mb-1">Hapus Tempat</h6>
                            <span class="d-block text-sm mb-2">Hapus tempat ini dari publik</span>
                            <div class="d-flex mx-n1"></div>
                        </div>
                        <div class="ms-auto text-end">
                            <button @click="openModalDeletePlace" type="button" class="btn btn-sm btn-outline-danger waves-effect waves-dark">Hapus</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- modals -->
    <ModalDeletePlace id="modal_delete_place" :placeId="placeId" />
</template>

<script lang="ts">
import { mapActions, mapState } from 'pinia'
import { RouterLink } from 'vue-router'

export default {
    computed: {
        ...mapState(usePlaceStore, ['placeDetailObject']),

        placeId (): string {
            return this.$route.params.placeId as string
        },

        place (): PlaceEntity | any {
            const defaultData = {
                user: {
                    id: ''
                },
                mapImages: [],
                latitude: 0,
                longitude: 0
            }
            if (this.placeDetailObject === undefined) return defaultData
            const placeData = this.placeDetailObject[this.placeId] as PlaceEntity | undefined
            if (placeData === undefined) return defaultData
            return placeData
        },

        descriptionHtml (): string {
            if (this.place.description === undefined) return ''
            return this.place.description.replace(/\n/g, '<br>')
        }
    },

    methods: {
        ...mapActions(usePlaceStore, ['getPlaceDetail']),

        openModalDeletePlace () {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const modal = new bootstrap.Modal(document.getElementById('modal_delete_place'))
            modal.show()
        }
    },

    async beforeMount () {
        const success = await this.getPlaceDetail(this.placeId)
        if (success === false) this.$router.push({ name: 'contribution' })
    }
}
</script>
